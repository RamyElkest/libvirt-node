const { impl_emitter } = require('../../emitters');
const args_generator = require('./gen_impls_args');
const { getNapiType,
        getNapiValueType } = require('../types');

impl_emitter.register('vir[\\w]+ListAll[\\w]+', (func) => {
    let outputArgIdxs = [1];
    let out =
       `napi_value libvirt_${func.name}(napi_env env, napi_callback_info info) {
            napi_status status;
            napi_value temp_val, n_retval;
            napi_valuetype valuetype;
       `;

    out += `
        // get callback_info
        size_t argc = ${func.args.length - outputArgIdxs.length};
        napi_value args[argc];
        status = napi_get_cb_info(env, info, &argc, args, NULL, NULL);
        assert(status == napi_ok);

        // Check args length
        if (argc != ${func.args.length - outputArgIdxs.length}) {
          napi_throw_type_error(env, NULL, "Wrong number of arguments");
          return NULL;
        }
    `;

    {
        let napiType = getNapiType(func.args[0].type);
        let napiValueType = getNapiValueType(func.args[0].type);

        out += `
            // check arg0's type
            status = napi_typeof(env, args[0], &valuetype);
            assert(status == napi_ok);

            if (valuetype != ${napiType}) {
                napi_throw_type_error(env, NULL, "Wrong argument type 0");
                return NULL;
            }
        `;

        out += args_generator.getGen(napiValueType)(func.args[0], 0);
    }

    {
        let napiType = getNapiType(func.args[2].type);
        let napiValueType = getNapiValueType(func.args[2].type);

        out += `
            // check arg1's type
            status = napi_typeof(env, args[1], &valuetype);
            assert(status == napi_ok);

            if (valuetype != ${napiType}) {
                napi_throw_type_error(env, NULL, "Wrong argument type 1");
                return NULL;
            }
        `;

        out += args_generator.getGen(napiValueType)(func.args[2], 2);
    }

    // perform C call
    out += `
        ${func.args[1].type.replace('**', '*')} arg1 = NULL;
        ${func.ret[0].type} c_retval = ${func.name}(arg0, &arg1, arg2);
    `;

    // return if null ptr
    out += `
        if(c_retval < 0) {
            status = napi_get_null(env, &n_retval);
            assert(status == napi_ok);
            return n_retval;
        }
       `;

    out += `
        status = napi_create_array_with_length(env, c_retval, &n_retval);
        assert(status == napi_ok);

        int i = 0;
        for(; i < c_retval; ++i) {
            status = napi_create_external(env, arg1[i], NULL, NULL, &temp_val);
            assert(status == napi_ok);  

            status = napi_set_element(env, n_retval, i, temp_val);
            assert(status == napi_ok);
        }

        return n_retval;
    }`;

    return out;
  }
);