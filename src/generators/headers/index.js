let fs = require('fs');
let { libvirt_parser } = require('../../parser');
let { headers_emitter } = require('../../emitters');
let { allowed_functions } = require('../../whitelist');

let src_path = 'src';
let generated_path = 'generated';

require('./default');

module.exports = new class {
    generate(header_file) {
        let out = `
            #pragma once
            #include <node_api.h>
        `;
        for (let func of Object.values(libvirt_parser.functions)) {
            if(allowed_functions[func.name] === header_file) {
                out += headers_emitter.emit(func.name, func);
            }
        }
        fs.writeFileSync(`${generated_path}/${header_file}.h`, out);
    }
};