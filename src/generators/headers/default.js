let { headers_emitter } = require('../../emitters');

headers_emitter.registerDefault({
  module: 'header_default',
  callback: (func) =>
	`napi_value libvirt_${func.name}(napi_env env, napi_callback_info info);\n`
});