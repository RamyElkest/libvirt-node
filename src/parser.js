let fs = require('fs');
let xml2js = require('xml2js');
let api_files = require('../tools/api_xml_files');

class ApiParser {
	constructor(api_xml) {
		this.raw_xml = fs.readFileSync(api_xml);
		xml2js.parseString(this.raw_xml, (err, res) => {
			if(err) throw err;
			this.raw_json = res;
		});

		this.functions = {}; // exported functions
	}

	parseAll() {
		this.parseFunctions(this.raw_json.api.symbols[0].function)

		console.log('loaded', this.raw_json.api.files[0].file[0].$.name)
		return this;
	}

	parseFunctions(funcDescriptors) {
		funcDescriptors.forEach(funcDesc => {
			this.functions[funcDesc.$.name] = {
				...funcDesc.$,
				info: funcDesc.info[0],
				args: (funcDesc.arg || []).map(f => f.$),
				ret: (funcDesc.return || []).map(f => f.$),
			};
		});
	}
}

module.exports = {
	libvirt_parser:      (new ApiParser(api_files.libvirt_api)).parseAll(),
	libvirt_qemu_parser: (new ApiParser(api_files.libvirt_qemu_api)).parseAll(),
	libvirt_lxc_parser:  (new ApiParser(api_files.libvirt_lxc_api)).parseAll(),
}