#include <libvirt/libvirt.h>


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

/**
 * \param returns virDomain napi_object
 */
napi_value lvnode_virDomain_create_object(napi_env env, virConnectPtr conn, virDomainPtr dom) {
    napi_status status;
    napi_value obj, conn_val, dom_val;

    status = napi_create_object(env, &obj);
    assert(status == napi_ok);

    status = napi_create_external(env, conn, NULL, NULL, &conn_val);
    assert(status == napi_ok);

    status = napi_create_external(env, dom, NULL, NULL, &dom_val);
    assert(status == napi_ok);

    napi_property_descriptor descs[] = {
        { "conn", 0, 0, 0, 0, conn_val, napi_default, 0 },
        { "dom", 0, 0, 0, 0, dom_val, napi_default, 0 },
        { "ID", 0, libvirt_virDomainGetID, 0, 0, 0, napi_default, 0 },
    };
    status = napi_define_properties(env, obj, 3, descs);
    assert(status == napi_ok);

    return obj;
}