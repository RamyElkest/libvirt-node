const { export_emitter } = require('../../emitters');

export_emitter.registerDefault(func =>
  `DECLARE_NAPI_METHOD("${func.name}", libvirt_${func.name}),`
);
