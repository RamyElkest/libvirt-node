let fs = require('fs');

// Create generated folder
let generated_path = 'generated';
try {
	fs.statSync(generated_path);
} catch ( ex ) {
	fs.mkdirSync(generated_path);
}

// libvirt.h

let hpp = 
`#pragma once

#include <node_api.h>

napi_value libvirt_virConnectOpen(napi_env env, napi_callback_info info);

napi_value libvirt_virDomainLookupByName(napi_env env, napi_callback_info info);
napi_value libvirt_virDomainGetID(napi_env env, napi_callback_info info);
`;

fs.writeFileSync(`${generated_path}/libvirt.h`, hpp);

// libvirt.c

let cpp = 
`
#include "libvirt.h"
#include <assert.h>
#include <libvirt/libvirt.h>

napi_value libvirt_virConnectOpen(napi_env env, napi_callback_info info) {
  napi_status status;
  napi_value n_retval;
  napi_valuetype valuetype;

  size_t argc = 1;
  napi_value args[1];
  status = napi_get_cb_info(env, info, &argc, args, NULL, NULL);
  assert(status == napi_ok);

  if (argc > 1) {
    napi_throw_type_error(env, NULL, "Wrong number of arguments");
    return NULL;
  }

  status = napi_typeof(env, args[0], &valuetype);
  assert(status == napi_ok);

  if (valuetype != napi_undefined && valuetype != napi_string) {
    napi_throw_type_error(env, NULL, "Wrong argument type");
    return NULL;
  }

  char* name = NULL;

  if(valuetype == napi_string) {
    char buffer[128];
    size_t buffer_size = 128;
    size_t copied;
    status = napi_get_value_string_utf8(env, args[0], buffer, buffer_size, &copied);
    assert(status == napi_ok);
    name = buffer;
  }

  virConnectPtr c_retval;
  c_retval = virConnectOpen(name);

  if(c_retval == NULL) {
    status = napi_get_null(env, &n_retval);
    assert(status == napi_ok);
    return n_retval;
  }

  status = napi_create_external(env, c_retval, NULL, NULL, &n_retval);
  assert(status == napi_ok);

  return n_retval;
}

napi_value libvirt_virDomainLookupByName(napi_env env, napi_callback_info info) {
  napi_status status;
  napi_value n_retval;
  napi_valuetype valuetype;

  size_t argc = 2;
  napi_value args[2];
  status = napi_get_cb_info(env, info, &argc, args, NULL, NULL);
  assert(status == napi_ok);

  if (argc != 2) {
    napi_throw_type_error(env, NULL, "Wrong number of arguments");
    return NULL;
  }

  // arg0
  status = napi_typeof(env, args[0], &valuetype);
  assert(status == napi_ok);
  if (valuetype != napi_external) {
    napi_throw_type_error(env, NULL, "Wrong argument type");
    return NULL;
  }

  virConnectPtr conn = NULL;
  status = napi_get_value_external(env, args[0], (void**)&conn);
  assert(status == napi_ok);
  assert(conn);

  // arg1
  status = napi_typeof(env, args[1], &valuetype);
  assert(status == napi_ok);

  if (valuetype != napi_string) {
    napi_throw_type_error(env, NULL, "Wrong argument type");
    return NULL;
  }

  char name[128];
  size_t name_size = 128;
  size_t copied;
  status = napi_get_value_string_utf8(env, args[1], name, name_size, &copied);
  assert(status == napi_ok);

  virDomainPtr c_retval;
  c_retval = virDomainLookupByName(conn, name);

  if(c_retval == NULL) {
    status = napi_get_null(env, &n_retval);
    assert(status == napi_ok);
    return n_retval;
  }

  status = napi_create_external(env, c_retval, NULL, NULL, &n_retval);
  assert(status == napi_ok);

  return n_retval;
}

napi_value libvirt_virDomainGetID(napi_env env, napi_callback_info info) {
    napi_status status;
    napi_value n_retval;
    napi_valuetype valuetype;

    size_t argc = 1;
    napi_value args[1];
    status = napi_get_cb_info(env, info, &argc, args, NULL, NULL);
    assert(status == napi_ok);

    if (argc != 1) {
      napi_throw_type_error(env, NULL, "Wrong number of arguments");
      return NULL;
    }

    // arg0
    status = napi_typeof(env, args[0], &valuetype);
    assert(status == napi_ok);
    if (valuetype != napi_external) {
      napi_throw_type_error(env, NULL, "Wrong argument type");
      return NULL;
    }

    virDomainPtr domain = NULL;
    status = napi_get_value_external(env, args[0], (void**)&domain);
    assert(status == napi_ok);
    assert(domain);

    unsigned int c_retval = virDomainGetID(domain);
    status = napi_create_int32(env, c_retval, &n_retval);
    assert(status == napi_ok);

    return n_retval;
}

#define DECLARE_NAPI_METHOD(name, func)                          \
  { name, 0, func, 0, 0, 0, napi_default, 0 }

napi_value Init(napi_env env, napi_value exports) {
  napi_status status;
  napi_property_descriptor descs[] = {
      DECLARE_NAPI_METHOD("virConnectOpen", libvirt_virConnectOpen),
      DECLARE_NAPI_METHOD("virDomainLookupByName", libvirt_virDomainLookupByName),
      DECLARE_NAPI_METHOD("virDomainGetID", libvirt_virDomainGetID)
  };
  status = napi_define_properties(env, exports, 3, descs);
  assert(status == napi_ok);
  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)

`;

fs.writeFileSync(`${generated_path}/libvirt.c`, cpp);
