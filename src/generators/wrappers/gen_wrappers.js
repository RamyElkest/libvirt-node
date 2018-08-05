let { allowed_functions } = require('../../whitelist');
let { CObjects } = require('../types');

function classifyFuncName(name) {
  let fn = name.replace(/^vir[A-Z]+[a-z]+/,'');
  fn = fn[0].toLowerCase() + fn.substr(1);
  return fn;
}

module.exports = new class {
  genConstructor(filename) {
    let memberName = filename.replace('.*-', '');
    switch(filename) {
      case 'host': // todo should be connect
        return `
          constructor(conn) {
            this.conn = conn;
          }
        `;
      case 'domain-snapshot ':
        return `
          constructor(domain, snapshot) {
            this.conn = conn;
            this.domain = domain;
            this.snapshot = snapshot
          }
        `;
      default:
        return `
          constructor(conn, ${memberName}) {
            this.conn = conn;
            this.${memberName} = ${memberName}
          }
        `;
    }
  }
  genWrapper(data) {
    let c_arg = (arg) => `${CObjects.hasOwnProperty(arg.type) ? CObjects[arg.type].arg : arg.name}`;
    let out = `
      /**
       * ${data.info.replace(/\n/g,'\n       * ')}
       *
       * TODO: params / returns
       */
      ${classifyFuncName(data.name)}(${data.args.filter(arg => !CObjects.hasOwnProperty(arg.type))
                                                .map(arg =>  arg.name)
                                                .join(', ')})
      {
        let ret = libvirt_native.${data.name}(${data.args.map(c_arg).join('\, ')});
        if(ret == null) throw new Error('${data.name}() failed');
        return ${CObjects.hasOwnProperty(data.ret[0].type) ? 'new ' + CObjects[data.ret[0].type].cons : 'ret'};
      }
    `;
    return out;
  }

  generate(parser, filename) {
    let out = ``;
    out += this.genConstructor(filename);
    for (let func of Object.values(parser.functions)) {
      if(allowed_functions[func.name] === filename) {
        out += this.genWrapper(func);
      }
    }
    return out;
  }
};