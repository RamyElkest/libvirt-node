let {allowed_functions} = require('../../whitelist');
let args_generator = require('./gen_impls_args');
let assert = require('assert');

let CToNapiTypes = {
    'virConnectPtr': 'napi_external',
    'virDomainPtr' : 'napi_external',
    'char *'       : 'napi_string',
    'const char *' : 'napi_string',
    'int'          : 'napi_number',
    'unsigned int' : 'napi_number',
};
let NapiCreateFuncs = {
    'napi_external': 'napi_create_external(env, c_retval, NULL, NULL, &n_retval)',
    'napi_number': 'napi_create_int32(env, c_retval, &n_retval)',
    'napi_string': 'napi_create_string_utf8(env, c_retval, strlen(c_retval), &n_retval)',
};
function isPtrType(type) {
  return /(Ptr|\*)$/.test(type);
}
function getNapiType(type) {
    if (CToNapiTypes[type] == null) {
      throw new Error(`Type ${type} is not mapped to a napi type`);
    }
    return CToNapiTypes[type];
}
function getNapiCreateFunc(type) {
    if (NapiCreateFuncs[getNapiType(type)] == null) {
      throw new Error(`Type ${type} is not mapped to a napi create function`)
    }
    return NapiCreateFuncs[getNapiType(type)];
}


module.exports = new class {
  genFunction(data) {
    let out = `
      napi_value libvirt_${data.name}(napi_env env, napi_callback_info info) {
    `;

    out += `
        napi_status status;
        napi_value n_retval;
        napi_valuetype valuetype;
    `;

    if(data.args.length) {

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
            // arg${idx}

            status = napi_typeof(env, args[${idx}], &valuetype);
            assert(status == napi_ok);

            if (valuetype != ${napiType}) {
              napi_throw_type_error(env, NULL, "Wrong argument type ${idx}");
              return NULL;
            }
          `;

          out += args_generator.getGen(napiType)(arg, idx);
      });
    }

    // perform C call
    out += `
      ${data.ret[0].type} c_retval = ${data.name}(${data.args.map((a,i) => 'arg'+i).join(', ')});
    `;

    // return if null ptr
    if(isPtrType(data.ret[0].type)) {
      out += `   
      if(c_retval == NULL) {
        status = napi_get_null(env, &n_retval);
        assert(status == napi_ok);
        return n_retval;
      }
    `;
    }

    // Assign return value
    out += `
      status = ${getNapiCreateFunc(data.ret[0].type)};
      assert(status == napi_ok);
    `;

    // Return
    out += `
      return n_retval;
    `;

    // Close function
    out += `
  }
  `;

    return out;
  }

  generate(parser, filename) {
      let out = ``;
      for (let func of Object.values(parser.functions).filter(f => f.file === `libvirt-${filename}`)) {
          if(allowed_functions.has(func.name)) {
              out += this.genFunction(func);
          }
      }
      return out;
  }
};