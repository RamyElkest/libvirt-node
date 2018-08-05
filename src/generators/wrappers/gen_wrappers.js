let { allowed_functions } = require('../../whitelist');
let { CObjects } = require('../types');

function classifyFuncName(name) {
  let fn = name.replace(/^vir[A-Z]+[a-z]+/,'');
  fn = fn[0].toLowerCase() + fn.substr(1);
  return fn;
}

module.exports = new class {
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
      }`;
    return out;
  }

  generate(parser, filename) {
    let out = ``;
    for (let func of Object.values(parser.functions)) {
      if(allowed_functions[func.name] === filename) {
        out += this.genWrapper(func);
      }
    }
    return out;
  }
};