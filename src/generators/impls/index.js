let fs = require('fs');
let gen_impl = require('./gen_impls');
let {libvirt_parser} = require('../../parser');

let src_path = 'src';
let generated_path = 'generated';
let override_path = `${src_path}/override`;

module.exports = new class {
  generate(impl_file) {
    let generated_impl = gen_impl.generate(libvirt_parser, impl_file);
    let override_impl = fs.readFileSync(`${override_path}/${impl_file}.c`);

    let cpp = `
#include "${impl_file}.h"
#include <assert.h>
#include <string.h>
#include <libvirt/libvirt.h>

/* The following implementations are generated */
${generated_impl}

/* The following implementations are overridden */
${override_impl}
`;

    fs.writeFileSync(`${generated_path}/${impl_file}.c`, cpp);
  }
};