#include <stdio.h>

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

napi_value libvirt_virConnectClose(napi_env env, napi_callback_info info) {
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

    virConnectPtr conn = NULL;
    status = napi_get_value_external(env, args[0], (void**)&conn);
    assert(status == napi_ok);
    assert(conn);

    unsigned int c_retval = virConnectClose(conn);
    status = napi_create_int32(env, c_retval, &n_retval);
    assert(status == napi_ok);

    return n_retval;
}


static void
libvirt_virConnectDomainEventFreeFunc(void *opaque)
{
    printf("freeing\n");
}

static void
libvirt_virConnectCloseCallbackDispatch(virConnectPtr conn,
                                        int reason,
                                        void *opaque)
{
    printf("called\n");
    napi_env env = NULL;
    napi_value cb_args;
    napi_status status;

    napi_value cb_data = (napi_value)opaque;
    status = napi_get_named_property(env, cb_data, "cb_args", &cb_args);
    assert(status == napi_ok);

    int result;
    status = napi_get_value_int32(env, cb_args, &result);
    assert(status == napi_ok);

    printf("%d\n", result);
}

napi_value libvirt_virConnectRegisterCloseCallback(napi_env env, napi_callback_info info) {
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

    // arg1
    status = napi_typeof(env, args[1], &valuetype);
    assert(status == napi_ok);
    if (valuetype != napi_object) {
      napi_throw_type_error(env, NULL, "Wrong argument type");
      return NULL;
    }

    virConnectPtr conn = NULL;
    status = napi_get_value_external(env, args[0], (void**)&conn);
    assert(status == napi_ok);
    assert(conn);

    unsigned int c_retval = virConnectRegisterCloseCallback(conn,
                                                            libvirt_virConnectCloseCallbackDispatch,
                                                            &args[1],
                                                            libvirt_virConnectDomainEventFreeFunc
                                                            );

    virConnectClose(conn);
    status = napi_create_int32(env, c_retval, &n_retval);
    assert(status == napi_ok);

    return n_retval;
}
