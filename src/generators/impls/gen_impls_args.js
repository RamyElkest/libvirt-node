module.exports = new class {
  constructor() {
    this.argGens = {
      'napi_string': this.genString,
      'napi_int32': this.genInt32,
      'napi_uint32': this.genUint32,
      'napi_int64': this.genInt64,
      'napi_uint64': this.genInt64,
      'napi_external': this.genExternal,
    }
  }

  getGen(napiType) {
    if(this.argGens[napiType] == null) {
      throw new Error(`GenImplArgs does not support napi_type ${napiType}`);
    }
    return this.argGens[napiType];
  }

  genString(arg, idx) {
    return `
      size_t arg${idx}_len;
  
      status = napi_get_value_string_utf8(env, args[${idx}], NULL, 0, &arg${idx}_len);
      assert(status == napi_ok);
  
      char arg${idx}[arg${idx}_len+1];
      status = napi_get_value_string_utf8(env, args[${idx}], arg${idx}, sizeof(arg${idx}), NULL);
      assert(status == napi_ok);
    `;
  }

  genInt32(arg, idx) {
    return `
      ${arg.type} arg${idx} = 0;

      status = napi_get_value_int32(env, args[${idx}], &arg${idx});
      assert(status == napi_ok);
    `;
  }

  genUint32(arg, idx) {
    return `
      ${arg.type} arg${idx} = 0;

      status = napi_get_value_uint32(env, args[${idx}], &arg${idx});
      assert(status == napi_ok);
    `;
  }

  genInt64(arg, idx) {
    return `
      ${arg.type} arg${idx} = 0;
      status = napi_get_value_int64(env, args[${idx}], (int64_t *)&arg${idx});
      assert(status == napi_ok);
    `;
  }

  genExternal(arg, idx) {
    return `
      ${arg.type} arg${idx} = NULL;

      status = napi_get_value_external(env, args[${idx}], (void**)&arg${idx});
      assert(status == napi_ok);
    `;
  }
};