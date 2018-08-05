#include "libvirt.h"
#include <assert.h>

#define DECLARE_NAPI_METHOD(name, func)                          \
  { name, 0, func, 0, 0, 0, napi_default, 0 }

napi_value Init(napi_env env, napi_value exports) {
  napi_status status;
  napi_property_descriptor descs[] = {
      DECLARE_NAPI_METHOD("virConnectOpen", libvirt_virConnectOpen),
      DECLARE_NAPI_METHOD("virConnectClose", libvirt_virConnectClose),
      DECLARE_NAPI_METHOD("virConnectGetURI", libvirt_virConnectGetURI),
      DECLARE_NAPI_METHOD("virDomainLookupByName", libvirt_virDomainLookupByName),
      DECLARE_NAPI_METHOD("virDomainGetID", libvirt_virDomainGetID),
  };
  status = napi_define_properties(env, exports, sizeof(descs)/sizeof(descs[0]), descs);
  assert(status == napi_ok);
  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
