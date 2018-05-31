const { wrapper_emitter } = require('../../emitters');
const { CObjects } = require('../types');

function classifyFuncName(name) {
  let fn = name.replace(/^vir[A-Z]+[a-z]+/,'');
  return fn[0].toLowerCase() + fn.substr(1);
}

wrapper_emitter.register('vir[\\w]+ListAll[\\w]+', data => {
    let classType = data.args[1].type.replace(' **', '');
    let out =
       `${classifyFuncName(data.name)}(flags)
        {
            let retList = libvirt_native.${data.name}(this.${data.args[0].name}, flags = 0);
            if(retList == null) throw new Error('${data.name}() failed');

            return retList.map(ret => new ${CObjects[classType].cons});
        }`;
    return out;
});

wrapper_emitter.registerDefault(data => {
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
