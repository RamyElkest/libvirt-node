// TODO: refactor into single structure

let CObjects = {
    'virConnectPtr': { cons: 'virConnect(ret)', arg: 'this.conn' },
    'virDomainPtr' : { cons: 'virDomain(this, ret)', arg: 'this.domain' },
}

let CNumbers = {
    'int'          : 'napi_int32',
    'long'         : 'napi_int64',
    'unsigned int' : 'napi_uint32',
    'unsigned long': 'napi_uint64',
}

let CTypes = {
    'char *'       : 'napi_string',
    'const char *' : 'napi_string',
}

let NapiCreateFuncs = {
    'napi_external': 'napi_create_external(env, c_retval, NULL, NULL, &n_retval)',
    'napi_int32': 'napi_create_int32(env, c_retval, &n_retval)',
    'napi_uint32': 'napi_create_uint32(env, c_retval, &n_retval)',
    'napi_string': 'napi_create_string_utf8(env, c_retval, strlen(c_retval), &n_retval)',
};

let isPtrType = function(type) {
  return /(Ptr|\*)$/.test(type);
};
let getNapiValueType = function(type) {
    if (CObjects.hasOwnProperty(type)) {
      return 'napi_external';
    }
    if (CNumbers.hasOwnProperty(type)) {
      return CNumbers[type];
    }
    if (CTypes.hasOwnProperty(type)) {
      return CTypes[type];
    }
    throw new Error(`Type '${type}' is not mapped to a napi type`);
};
let getNapiType = function(type) {
    if (CObjects.hasOwnProperty(type)) {
      return 'napi_external';
    }
    if (CNumbers.hasOwnProperty(type)) {
      return 'napi_number';
    }
    if (CTypes.hasOwnProperty(type)) {
      return CTypes[type];
    }
    throw new Error(`Type '${type}' is not mapped to a napi type`);
};
let getNapiCreateFunc = function(type) {
    if (NapiCreateFuncs[getNapiValueType(type)] == null) {
      throw new Error(`Type '${type}' is not mapped to a napi create function`)
    }
    return NapiCreateFuncs[getNapiValueType(type)];
};

module.exports = {
	CObjects,
	CNumbers,
	CTypes,
	isPtrType,
	getNapiValueType,
	getNapiType,
	getNapiCreateFunc,
}
