let {allowed_functions} = require('./whitelist');
let assert = require('assert');

let CToNapiTypes = {
    'virConnectPtr': 'napi_external',
    'const char *': 'napi_string',
};
let NapiCreateFuncs = {
    'napi_external': 'napi_create_external'
};
function getNapiType(type) {
    if (CToNapiTypes[type] == null) {
      throw new Error(`Type ${type} is not mapped to a napi type`)
    }
    return CToNapiTypes[type];
}
function getNapiCreateFunc(type) {
    if (NapiCreateFuncs[getNapiType(type)] == null) {
      throw new Error(`Type ${type} is not mapped to a napi create function`)
    }
    return NapiCreateFuncs[getNapiType(type)];
}

class GenImpl {
    constructor() {
      this.genGetArgValue = {
        'napi_string': this.genGetArgValueString,
      }
    }

    genDecls(data) {
        let out = '';

        out += `
            napi_status status;
            napi_value n_retval;
            napi_valuetype valuetype;
        `;

        if(data.ret.length) {
          out += `
            ${data.ret[0].type} c_retval;
          `;
        }

        return out;
    }

    genGetArgValueString(idx) {
      let out = '';

      out += `
        char* arg${idx} = NULL;

        if(valuetype == napi_string) {
          char buffer[128];
          size_t buffer_size = 128;
          size_t copied;
          status = napi_get_value_string_utf8(env, args[${idx}], buffer, buffer_size, &copied);
          assert(status == napi_ok);
          arg${idx} = buffer;
        }
      `;

      return out;
    }

    genArgs(data) {
      let out = '';

      if(data.args.length === 0)
          return out;

      // get callback_info
      out += `
          size_t argc = ${data.args.length};
          napi_value args[argc];
          status = napi_get_cb_info(env, info, &argc, args, NULL, NULL);
          assert(status == napi_ok);
      `;

      // Check args length
      out += `
          if (argc != ${data.args.length}) {
            napi_throw_type_error(env, NULL, "Wrong number of arguments");
            return NULL;
          }
      `;


      data.args.forEach((arg, idx) => {
          let napiType = getNapiType(arg.type);
          // Type Check
          out += `
            status = napi_typeof(env, args[${idx}], &valuetype);
            assert(status == napi_ok);

            if (valuetype != ${napiType}) {
              napi_throw_type_error(env, NULL, "Wrong argument type ${idx}");
              return NULL;
            }
          `;

          out += this.genGetArgValue[napiType](idx);
      });

      // perform C call
      out += `
        c_retval = ${data.name}(${data.args.map((a,i) => 'arg'+i).join(', ')});
      `;

      // Assign return value
      out += `
        status = ${getNapiCreateFunc(data.ret[0].type)}(env, c_retval, NULL, NULL, &n_retval);
        assert(status == napi_ok);
      `;

      // Return
      out += `
        return n_retval;
      `;

      return out;
}

    genFunction(data) {
        let out = ``;

        out += `napi_value libvirt_${data.name}(napi_env env, napi_callback_info info) {`;
        out += this.genDecls(data);
        out += this.genArgs(data);
        out += `}`;

        return out;

// "return": [
//     {
//         "$": {
//             "type": "virConnectPtr",
//             "info": "a pointer to the hypervisor connection or NULL in case of error"
//         }
//     }
// ],
// "arg": [
//     {
//             "name": "name",
//             "type": "const char *",
//             "info": "(optional) URI of the hypervisor"
//     }
// ]

// napi_value libvirt_virConnectOpen(napi_env env, napi_callback_info info) {
//   napi_status status;
//   napi_value n_retval;
//   napi_valuetype valuetype;

//   size_t argc = 1;
//   napi_value args[1];
//   status = napi_get_cb_info(env, info, &argc, args, NULL, NULL);
//   assert(status == napi_ok);

//   if (argc > 1) {
//     napi_throw_type_error(env, NULL, "Wrong number of arguments");
//     return NULL;
//   }

//   status = napi_typeof(env, args[0], &valuetype);
//   assert(status == napi_ok);

//   if (valuetype != napi_undefined && valuetype != napi_string) {
//     napi_throw_type_error(env, NULL, "Wrong argument type");
//     return NULL;
//   }

//   char* name = NULL;

//   if(valuetype == napi_string) {
//     char buffer[128];
//     size_t buffer_size = 128;
//     size_t copied;
//     status = napi_get_value_string_utf8(env, args[0], buffer, buffer_size, &copied);
//     assert(status == napi_ok);
//     name = buffer;
//   }

//   virConnectPtr c_retval;
//   c_retval = virConnectOpen(name);

//   if(c_retval == NULL) {
//     status = napi_get_null(env, &n_retval);
//     assert(status == napi_ok);
//     return n_retval;
//   }

//   status = napi_create_external(env, c_retval, NULL, NULL, &n_retval);
//   assert(status == napi_ok);

//   return n_retval;
// }

    }

    generate(parser, filename) {
        let out = ``;
        for (let func of Object.values(parser.functions).filter(f => f.file === `libvirt-${filename}`)) {
            if(allowed_functions[func.name]) {
                out += this.genFunction(func);
            }
        }
        return out;
    }
}

module.exports = new GenImpl();