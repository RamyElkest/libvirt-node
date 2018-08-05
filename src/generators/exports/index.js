let fs = require('fs');
let { allowed_functions } = require('../../whitelist');

let src_path = 'src';
let generated_path = 'generated';
let override_path = `${src_path}/override`;

module.exports = new class {
	genHeader() {
		let header = `
#pragma once

#include "host.h"
#include "domain.h"
`;

    fs.writeFileSync(`${generated_path}/libvirt.h`, header);
	}

	genImpl() {

		let method_decls = Object.keys(allowed_functions).map(method =>
      `DECLARE_NAPI_METHOD("${method}", libvirt_${method})`
  	 ).join(',\n');

    let impl = `
#include "libvirt.h"
#include <assert.h>

#define DECLARE_NAPI_METHOD(name, func)                          \
  { name, 0, func, 0, 0, 0, napi_default, 0 }

napi_value Init(napi_env env, napi_value exports) {
  napi_status status;
  napi_property_descriptor descs[] = {
  	  ${method_decls}
  };
  status = napi_define_properties(env, exports, sizeof(descs)/sizeof(descs[0]), descs);
  assert(status == napi_ok);
  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
`;

    fs.writeFileSync(`${generated_path}/libvirt.c`, impl);
	}

  generate() {
  	this.genHeader();
  	this.genImpl();
  }
};