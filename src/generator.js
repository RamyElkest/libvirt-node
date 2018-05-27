let fs = require('fs');
let {libvirt_parser} = require('./parser');
let gen_headers = require('./gen_headers');
let gen_impl = require('./gen_impl');

// Create generated folder
let src_path = 'src';
let generated_path = 'generated';
let override_path = `${src_path}/override`;
let manual_path = `${src_path}/manual`;

try {
	fs.statSync(generated_path);
} catch ( ex ) {
	fs.mkdirSync(generated_path);
}

// Copy manual files
let manual_files = fs.readdirSync(`${manual_path}`);
manual_files.forEach((manual_file) => {
  fs.copyFileSync(`${manual_path}/${manual_file}`, `${generated_path}/${manual_file}`);
});

let files = [
  'host',
  'domain'
]

/* Write header files */
files.forEach((header_file) => {
  let generated_headers = gen_headers.generate(libvirt_parser, header_file);
  let override_headers = fs.readFileSync(`${override_path}/${header_file}.h`);

  let hpp = `
#pragma once

#include <node_api.h>

/* The following declarations are generated */
${generated_headers}

/* The following declarations are overridden */
${override_headers}
`;

  fs.writeFileSync(`${generated_path}/${header_file}.h`, hpp);
});


/* Write implementation files */
files.forEach((impl_file) => {

  let generated_impl = gen_impl.generate(libvirt_parser, impl_file);
  let override_impl = fs.readFileSync(`${override_path}/${impl_file}.c`);

  let cpp = `
#include "${impl_file}.h"
#include <assert.h>
#include <libvirt/libvirt.h>

/* The following implementations are generated */
${generated_impl}

/* The following implementations are overridden */
${override_impl}
`;

  fs.writeFileSync(`${generated_path}/${impl_file}.c`, cpp);

});


/* Write js wrapper files */
files.forEach((js_file) => {

  let class_name = 'vir' + js_file[0].toUpperCase() + js_file.slice(1);
  let generated_js = '';
  let override_js = fs.readFileSync(`${override_path}/${js_file}.js`);

  let cpp = `
let libvirt_native = require('bindings')('libvirt');
${js_file !== 'domain' ? "let virDomain = require('./domain');" : ''} // TODO: remove require virDomain hack

class ${class_name} {

/* The following functions are generated */
${generated_js}

/* The following functions are overridden */
${override_js}

}

module.exports = ${class_name}
`;

  fs.writeFileSync(`${generated_path}/${js_file}.js`, cpp);

});
