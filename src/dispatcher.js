const { whitelist } = require('./whitelist');
const { main_emitter } = require('./emitters');
const { CObjects } = require('./generators/types');
const debug = require('debug')('dispatcher');
let { WrapperDescriptor,
      HeaderDescriptor,
      ImplDescriptor,
      ExportDescriptor } = require('./descriptors'); 

const classFiles = {
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

class Dispatcher {
    constructor() {
        this.descriptors = {};
    }

    /**
     * Initialises a file descriptor for each file
     *
     * {array} files to be initialised
     */
    open(files) {
        files.forEach(file => {
            this.descriptors[file] = {
                impl: new ImplDescriptor({name: file}),
                header: new HeaderDescriptor({name: file}),
                wrapper: new WrapperDescriptor({name: file}),
            }
        });
        this.descriptors['libvirt-exports'] = {
            export: new ExportDescriptor({ name: 'libvirt-exports', files })
        };
    }

    /**
     * Closes the file descriptors
     */
    closeAll() {
        Object.values(this.descriptors).forEach(file_desc => {
            Object.values(file_desc).forEach(descriptor => {
                descriptor.write();
            });
        });
    }

    /**
     * Resolves which file the function belongs to
     *
     * @param {Object} The function metadata from the parser
     */
    getModule(func) {
        if(func.args.length >= 1 && CObjects.hasOwnProperty(func.args[0].type))
        {
            debug(`Assigning ${func.name} to ${classFiles[CObjects[func.args[0].type].type]}`);
            return classFiles[CObjects[func.args[0].type].type];
        }
        else if(func.args.length >= 2 && CObjects.hasOwnProperty(func.args[1].type))
        {
            debug(`Assigning ${func.name} to ${classFiles[CObjects[func.args[0].type].type]}`);
            return classFiles[CObjects[func.args[0].type].type];
        }
        
        return 'libvirt';
    }

    /**
     * Iterates through the parser and emits generation
     *
     * @param {object} parser
     */
    run(parser) {
        Object.values(parser.functions).forEach(func => {
            if(whitelist.has(func.name)) {
                let module = this.getModule(func);
 
                debug(`processing '${module}':${func.name}`);
                Object.values(this.descriptors[module]).forEach(descriptor => {
                    descriptor.process(func);
                });
                this.descriptors['libvirt-exports'].export.process(func);
            }
        });
    }
}

module.exports = {
    dispatcher: new Dispatcher(),
};