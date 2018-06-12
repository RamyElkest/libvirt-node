#pragma once
#define NAPI_DISABLE_CPP_EXCEPTIONS

#include <napi.h>
#include <libvirt/libvirt.h>

class Domain : public Napi::ObjectWrap<Domain>
{
public:
    Domain(const Napi::CallbackInfo&);
    Napi::Value getId(const Napi::CallbackInfo&);

    static Napi::Object GetClass(Napi::Env, Napi::Object exports);
	static Napi::FunctionReference constructor;

private:
    virConnectPtr _connection;
    virDomainPtr _domain;
};
