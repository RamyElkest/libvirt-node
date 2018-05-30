const { wrapper_emitter } = require('../../emitters');

wrapper_emitter.register('[\\w-]+:docs', data => 
   `/**
     * ${data.info.replace(/\n/g,'\n * ')}
     *
     * TODO: params / returns
     */`
);