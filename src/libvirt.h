#pragma once

#include <node_api.h>

napi_value libvirt_virConnectOpen(napi_env env, napi_callback_info info);

napi_value libvirt_virDomainLookupByName(napi_env env, napi_callback_info info);
napi_value libvirt_virDomainGetID(napi_env env, napi_callback_info info);