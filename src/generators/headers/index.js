let fs = require('fs');
let gen_headers = require('./gen_headers');
let {libvirt_parser} = require('../../parser');

let src_path = 'src';
let generated_path = 'generated';
let override_path = `${src_path}/override`;

module.exports = new class {
  generate(header_file) {
    let generated_headers = gen_headers.generate(libvirt_parser, header_file);
    let override_headers = fs.readFileSync(`${override_path}/${header_file}.h`);

    let h_file = `
    #pragma once

    #include <node_api.h>

    /* The following declarations are generated */
    ${generated_headers}

    /* The following declarations are overridden */
    ${override_headers}
    `;

    fs.writeFileSync(`${generated_path}/${header_file}.h`, h_file);
  };
}