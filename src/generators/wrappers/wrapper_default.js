const { wrapper_emitter } = require('../../emitters');
const { CObjects } = require('../types');

wrapper_emitter.register('vir[\\w]+ListAll[\\w]+', data => {
    let classType = data.args[1].type.replace(' **', '');
    let out =
       `${data.iname}(flags = 0)
        {
            let retList = libvirt_native.${data.name}(this.${data.args[0].name}, flags);
            if(retList == null) throw new Error('${data.name}() failed');

            return retList.map(ret => new ${CObjects[classType].cons});
        }`;
    return out;
});

wrapper_emitter.registerDefault(data => {
    let c_arg = (arg) => `${CObjects.hasOwnProperty(arg.type) ? 'this.'+CObjects[arg.type].name : arg.name}`;
    let out =
       `${data.iname}(${data.args.filter(arg => !CObjects.hasOwnProperty(arg.type))
                                                  .map(arg =>  arg.name)
                                                  .join(', ')})
        {
            let ret = libvirt_native.${data.name}(${data.args.map(c_arg).join('\, ')});
            if(ret == null) throw new Error('${data.name}() failed');
            return ${CObjects.hasOwnProperty(data.ret[0].type) ? 'new ' + CObjects[data.ret[0].type].cons : 'ret'};
        }`;
    return out;
});
