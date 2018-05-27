// napi_value libvirt_virConnectOpen(napi_env env, napi_callback_info info) {
//   napi_status status;
//   napi_value n_retval;
//   napi_valuetype valuetype;

//   size_t argc = 1;
//   napi_value args[1];
//   status = napi_get_cb_info(env, info, &argc, args, NULL, NULL);
//   assert(status == napi_ok);

//   if (argc > 1) {
//     napi_throw_type_error(env, NULL, "Wrong number of arguments");
//     return NULL;
//   }

//   status = napi_typeof(env, args[0], &valuetype);
//   assert(status == napi_ok);

//   if (valuetype != napi_undefined && valuetype != napi_string) {
//     napi_throw_type_error(env, NULL, "Wrong argument type");
//     return NULL;
//   }

//   char* name = NULL;

//   if(valuetype == napi_string) {
//     char buffer[128];
//     size_t buffer_size = 128;
//     size_t copied;
//     status = napi_get_value_string_utf8(env, args[0], buffer, buffer_size, &copied);
//     assert(status == napi_ok);
//     name = buffer;
//   }

//   virConnectPtr c_retval;
//   c_retval = virConnectOpen(name);

//   if(c_retval == NULL) {
//     status = napi_get_null(env, &n_retval);
//     assert(status == napi_ok);
//     return n_retval;
//   }

//   status = napi_create_external(env, c_retval, NULL, NULL, &n_retval);
//   assert(status == napi_ok);

//   return n_retval;
// }
