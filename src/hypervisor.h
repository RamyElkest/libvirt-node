#pragma once
#define NAPI_DISABLE_CPP_EXCEPTIONS

#include <napi.h>
#include <libvirt/libvirt.h>

class Hypervisor : public Napi::ObjectWrap<Hypervisor>
{
public:
    Hypervisor(const Napi::CallbackInfo&);
    Napi::Value lookupDomainByName(const Napi::CallbackInfo&);

    static Napi::Object GetClass(Napi::Env, Napi::Object);
	static Napi::FunctionReference constructor;

private:
    virConnectPtr _connection;
};
