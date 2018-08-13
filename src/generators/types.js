// TODO: refactor into single structure

let CObjects = {
    'virConnectPtr': { cons: 'virConnect(ret)',                          name: 'conn',           type: 'virConnect' },
    'virDomainPtr' : { cons: 'virDomain(this.conn, ret)',                name: 'domain',         type: 'virDomain' },
    'virNetworkPtr': { cons: 'virNetwork(this.conn, ret)',               name: 'network',        type: 'virNetwork' },
    'virInterfacePtr': { cons: 'virInterface(this.conn, ret)',           name: 'iface',          type: 'virInterface' },
    'virStoragePoolPtr': { cons: 'virStoragePool(this.conn, ret)',       name: 'storagePool',    type: 'virStoragePool' },
    'virStorageVolPtr': { cons: 'virStorageVol(this.conn, ret)',         name: 'storageVol',     type: 'virStorageVol' },
    'virNodeDevicePtr': { cons: 'virNodeDevice(this.conn, ret)',         name: 'nodedevice',     type: 'virNodeDevice' },
    'virSecretPtr': { cons: 'virSecret(this.conn, ret)',                 name: 'secret',         type: 'virSecret' },
    'virNWFilterPtr': { cons: 'virNWFilter(this.conn, ret)',             name: 'nwfilter',       type: 'virNWFilter' },
    'virStreamPtr': { cons: 'virStream(this.conn, ret)',                 name: 'stream',         type: 'virStream' },
    'virDomainSnapshotPtr': { cons: 'virDomainSnapshot(this.conn, this.domain, ret)',
                                                                         name: 'snapshot',       type: 'virDomainSnapshot' }
};

let CNumbers = {
    'int'               : 'napi_int32',
    'long'              : 'napi_int64',
    'long long'         : 'napi_int64',
    'unsigned int'      : 'napi_uint32',
    'unsigned long'     : 'napi_uint64',
    'unsigned long long': 'napi_uint64',
}

let CTypes = {
    'char *'       : 'napi_string',
    'const char *' : 'napi_string',
}

let NapiCreateFuncs = {
    'napi_external': 'napi_create_external(env, c_retval, NULL, NULL, &n_retval)',
    'napi_int32': 'napi_create_int32(env, c_retval, &n_retval)',
    'napi_uint32': 'napi_create_uint32(env, c_retval, &n_retval)',
    'napi_uint64': 'napi_create_int64(env, c_retval, &n_retval)',
    'napi_string': 'napi_create_string_utf8(env, c_retval, strlen(c_retval), &n_retval)',
};

const classToFile = {
    'virConnect': 'libvirt-connect',
    'virDomain': 'libvirt-domain',
    'virDomainSnapshot': 'libvirt-domain-snapshot',
    'virInterface': 'libvirt-interface',
    'virNetwork': 'libvirt-network',
    'virNodeDevice': 'libvirt-nodedev',
    'virNWFilter': 'libvirt-nwfilter',
    'virSecret': 'libvirt-secret',
    'virStoragePool': 'libvirt-storage-pool',
    'virStorageVol': 'libvirt-storage-vol',
    'virStream': 'libvirt-stream',
};

const fileToClass = {
    'libvirt-connect': 'virConnect',
    'libvirt-domain': 'virDomain',
    'libvirt-domain-snapshot': 'virDomainSnapshot',
    'libvirt-interface': 'virInterface',
    'libvirt-network': 'virNetwork',
    'libvirt-nodedev': 'virNodeDevice',
    'libvirt-nwfilter': 'virNWFilter',
    'libvirt-secret': 'virSecret',
    'libvirt-storage-pool': 'virStoragePool',
    'libvirt-storage-vol': 'virStorageVol',
    'libvirt-stream': 'virStream',
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
  classToFile,
  fileToClass,
}
