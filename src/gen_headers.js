let {allowed_functions} = require('./whitelist');
let assert = require('assert');

class GenHeaders {
	constructor() {
	}

	generate(parser, filename) {
		let out = ``;
		for (let func of Object.values(parser.functions).filter(f => f.file === `libvirt-${filename}`)) {
			if(allowed_functions[func.name]) {
				out += `napi_value libvirt_${func.name}(napi_env env, napi_callback_info info);\n`;
			}
		}
		return out;
	}
}

module.exports = new GenHeaders();