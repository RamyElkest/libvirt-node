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

        this.enums = {}; // exported enums
        this.functions = {}; // exported functions
    }

    parseAll() {
        if(this.raw_json.api.symbols[0].enum) {
            this.parseEnums(this.raw_json.api.symbols[0].enum);
            Object.values(this.enums).forEach(enumArr => {
                enumArr.sort((a, b) => a.value - b.value)
            });
        }

        this.parseFunctions(this.raw_json.api.symbols[0].function);

        console.log('loaded', this.raw_json.api.files[0].file[0].$.name);
        return this;
    }

    parseEnums(enumDescs) {
        for(let enumDesc of enumDescs) {
            if(!this.enums[enumDesc.$.type]) {
                this.enums[enumDesc.$.type] = [enumDesc.$];
            } else {
                this.enums[enumDesc.$.type].push(enumDesc.$);
            }
        };
    }

    parseFunctions(funcDescs) {
        funcDescs.forEach(funcDesc => {
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