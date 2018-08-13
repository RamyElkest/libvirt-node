const { wrapper_emitter } = require('../../emitters');
const { CObjects } = require('../types');

wrapper_emitter.registerDefault(data => {
    let classifyFuncName = (name) => {
      let fn = name.replace(/^vir[A-Z]+[a-z]+/,'');
      return fn[0].toLowerCase() + fn.substr(1);
    }
    let c_arg = (arg) => `${CObjects.hasOwnProperty(arg.type) ? CObjects[arg.type].arg : arg.name}`;
    let out =
       `${classifyFuncName(data.name)}(${data.args.filter(arg => !CObjects.hasOwnProperty(arg.type))
                                                  .map(arg =>  arg.name)
                                                  .join(', ')})
        {
            let ret = libvirt_native.${data.name}(${data.args.map(c_arg).join('\, ')});
            if(ret == null) throw new Error('${data.name}() failed');
            return ${CObjects.hasOwnProperty(data.ret[0].type) ? 'new ' + CObjects[data.ret[0].type].cons : 'ret'};
        }`;
    return out;
});
