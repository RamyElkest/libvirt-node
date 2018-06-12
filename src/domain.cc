#include "domain.h"
#include <libvirt/libvirt.h>

Napi::FunctionReference Domain::constructor;

Domain::Domain(const Napi::CallbackInfo& info) : ObjectWrap(info) {
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

Napi::Value Domain::getId(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    unsigned int c_retval = virDomainGetID(_domain);

    return Napi::Number::New(env, c_retval);
}

Napi::Object Domain::GetClass(Napi::Env env, Napi::Object exports) {
    Napi::HandleScope scope(env);

    Napi::Function func = DefineClass(env, "Domain", {
        Domain::InstanceMethod("getId", &Domain::getId),
    });

	constructor = Napi::Persistent(func);
	constructor.SuppressDestruct();

	exports.Set("Domain", func);
	return exports;
}
