let { header_emitter } = require('../../emitters');

header_emitter.registerDefault((func) =>
	`napi_value libvirt_${func.name}(napi_env env, napi_callback_info info);`
);