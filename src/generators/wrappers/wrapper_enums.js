const { wrapper_emitter } = require('../../emitters');

wrapper_emitter.register('enum:[\\w_]+:docs', data => {
   let out = '';
   if(data.info) {
       out = `/**
               * ${data.info.replace(/\n/g,'\n * ')}
               */`;
    }
    return out;
});

wrapper_emitter.register('enum:[\\w_]+', data =>
    `get ${data.name}() { return ${isNaN(data.value) ? 'this.' : ''}${data.value}; }`
);