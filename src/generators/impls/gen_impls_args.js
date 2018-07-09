module.exports = new class {
  constructor() {
    this.argGens = {
      'napi_string': this.genString,
      'napi_external': this.genExternal,
    }
  }

  getGen(napiType) {
    if(this.argGens[napiType] == null) {
      throw new Error(`GenImplArgs does not support napi_type ${napiType}`);
    }
    return this.argGens[napiType];
  }

  /* TODO: move to new style string retrieval -- lost during merge */
  genString(arg, idx) {
    return `
      size_t buffer_size = 128;
      char arg${idx}[buffer_size];
      size_t copied;
      status = napi_get_value_string_utf8(env, args[${idx}], arg${idx}, buffer_size, &copied);
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