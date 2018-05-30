const { wrapper_emitter } = require('../../emitters');
const { CObjects, classToFile } = require('../types');

wrapper_emitter.register('[\\w-]+:dependencies', data => {
    let dependency = '';
    if(CObjects.hasOwnProperty(data.ret[0].type)) {
        let retType = CObjects[data.ret[0].type].type;
        let filename = classToFile[retType];
        dependency = `const ${retType} = require('./${filename}')`;
    }
    return dependency;
});
