let {allowed_functions} = require('../../whitelist');

module.exports = new class {
	generate(parser, filename) {
		let out = ``;
		for (let func of Object.values(parser.functions)) {
			if(allowed_functions[func.name] === filename) {
				out += `napi_value libvirt_${func.name}(napi_env env, napi_callback_info info);\n`;
			}
		}
		return out;
	}
};