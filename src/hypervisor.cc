#include "hypervisor.h"
#include "domain.h"
#include <libvirt/libvirt.h>

Napi::FunctionReference Hypervisor::constructor;

Hypervisor::Hypervisor(const Napi::CallbackInfo& info) : ObjectWrap(info) {
    Napi::Env env = info.Env();

    if (info.Length() < 1) {
        Napi::TypeError::New(env, "Wrong number of arguments")
          .ThrowAsJavaScriptException();
        return;
    }

    if (!info[0].IsString()) {
        Napi::TypeError::New(env, "You need to name yourself")
          .ThrowAsJavaScriptException();
        return;
    }

    std::string uri = info[0].As<Napi::String>().Utf8Value();
    this->_connection = virConnectOpen(uri.c_str());
}

Napi::Value Hypervisor::lookupDomainByName(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (info.Length() < 1) {
        Napi::TypeError::New(env, "Wrong number of arguments")
          .ThrowAsJavaScriptException();
        return env.Null();
    }

    if (!info[0].IsString()) {
        Napi::TypeError::New(env, "You need to name yourself")
          .ThrowAsJavaScriptException();
        return env.Null();
    }

    std::string domainName = info[0].As<Napi::String>().Utf8Value();


    virDomainPtr domain = virDomainLookupByName(_connection, domainName.c_str());

    Napi::Value n_domain = Napi::External<virDomainPtr>::New(env, &domain);

    return Domain::constructor.New({ n_domain });
}

Napi::Object Hypervisor::GetClass(Napi::Env env, Napi::Object exports) {
    Napi::HandleScope scope(env);

    Napi::Function func = DefineClass(env, "Hypervisor", {
        Hypervisor::InstanceMethod("lookupDomainByName", &Hypervisor::lookupDomainByName),
    });

    constructor = Napi::Persistent(func);
    constructor.SuppressDestruct();

    exports.Set("Hypervisor", func);
    return exports;
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    Hypervisor::GetClass(env, exports);
    return exports;
}

NODE_API_MODULE(addon, Init)
