const fs = require('fs');
const debug = require('debug');
const { impl_emitter,
        header_emitter,
        wrapper_emitter,
        export_emitter } = require('./emitters');

class FileDescriptor {
    constructor(args, options) {
        this.args = Object.assign({
            ext: '',
            name: undefined,
            type: undefined,
            destination: 'generated',
        }, args);
        this.options = Object.assign({
            dependencies: [],
            content: [],
            opening: '',
            closing: '',
            separator: '\n',
            emitter: undefined,
            static: args.name === 'libvirt' ? 'static' : '',
        }, options);
    }

    /**
     * Returns descriptor as a formatted string
     */
    getAsString() {
        return `
            ${[...new Set(this.options.dependencies)]
                .join('\n')}

            ${this.options.opening}

            ${this.options.content.join(this.options.separator)}

            ${this.options.closing}
        `;
    }

    /**
     * Processes parsed function metadata to generate content
     *
     * @param {object} function metadata from parser
     */
    process(func) {
        debug(`descriptors:${this.args.name}`)(`Processing ${func.name}`);

        this.addContent(
            this.options.emitter.emit(func.name, func)
        );
    }

    /**
     * Adds file dependency (at the top of the file)
     *
     * @param {string} Dependency as a string
     *      eg. "#include <assert.h>" or "const assert = require('assert');"
     */
    addDependency(str) {
        this.options.dependencies.push(str);
    }

    /**
     * Adds function content as a string to the file buffer
     *
     * @param {string} function content
     *      eg. function header / impl / wrapper (including docs)
     */
    addContent(str) {
        this.options.content.push(str);
    }

    /**
     * Writes the contents to file
     */
    write() {
        debug(`descriptors:${this.args.name}`)
             (`Writing to ${this.args.destination}/${this.args.name}${this.args.ext}`);

        fs.writeFileSync(
            `${this.args.destination}/${this.args.name}${this.args.ext}`,
            this.getAsString()
        );
    }

};

class HeaderDescriptor extends FileDescriptor {
    constructor(args, options) {
        super (
            Object.assign(
                {
                    ext: '.h',
                    type: 'header'
                },
                args
            ),
            Object.assign(
                {
                    dependencies: [
                        '#pragma once',
                        '#include <node_api.h>',
                    ],
                    emitter: header_emitter
                }, options
            )
        );
    }
}

// let hd = new HeaderDescriptor({name: 'domain'});
// hd.addContent('napi_value libvirt_virDomainGetID(napi_env env, napi_callback_info info);')
// hd.addContent('napi_value libvirt_virDomainGetOSType(napi_env env, napi_callback_info info);')
// console.log(hd.getAsString());

class WrapperDescriptor extends FileDescriptor {
    constructor(args, options) {
        super (
            Object.assign(
                {
                    ext: '.js',
                    type: 'wrapper'
                },
                args
            ),
            Object.assign(
                {
                    dependencies: [
                        `const libvirt_native = require('bindings')('libvirt');`,
                    ],
                    opening: `module.exports = class {`,
                    closing: `}`,
                    separator: '\n\n',
                    emitter: wrapper_emitter
                }, options
            )
        );

        this.addContent(this.options.emitter.emit(`${this.args.name}:constructor`, this.args.name));
    }

    /**
     * Processes parsed function metadata to generate docs and content
     *
     * @param {object} function metadata from parser
     */
    process(func) {
        debug(`descriptors:${this.args.name}:${this.args.type}`)(`Processing ${func.name}`);

        super.addDependency(
            this.options.emitter.emit(func.name+':dependencies', func)
        );

        this.addContent(
            `${this.options.emitter.emit(func.name+':docs', func)}
             ${this.options.static} ${this.options.emitter.emit(func.name, func)}`
        );
    }
}

// let wd = new WrapperDescriptor({name: 'domain'});
// wd.addContent(`
//   constructor(conn, domain) {
//     this.conn = conn;
//     this.domain = domain
//   }
// `);
// wd.addContent(`
//   /**
//    * Get the hypervisor ID number for the domain
//    *
//    * TODO: params / returns
//    */
//   getID() {
//     let ret = libvirt_native.virDomainGetID(this.domain);
//     if (ret == null) throw new Error('virDomainGetID() failed');
//     return ret;
//   }
// `);
// wd.addContent(`
//   /**
//    * Get the type of domain operation system.
//    *
//    * TODO: params / returns
//    */
//   getOSType() {
//     let ret = libvirt_native.virDomainGetOSType(this.domain);
//     if (ret == null) throw new Error('virDomainGetOSType() failed');
//     return ret;
//   }`);
// console.log(wd.getAsString());


class ImplDescriptor extends FileDescriptor {
    constructor(args, options) {
        super (
            Object.assign(
                {
                    ext: '.c',
                    type: 'impl'
                },
                args
            ),
            Object.assign(
                {
                    dependencies: [
                        `#include "${args.name}.h"`,
                        `#include <libvirt/libvirt.h>`,
                        `#include <assert.h>`,
                        `#include <string.h>`,
                    ],
                    separator: '\n\n',
                    emitter: impl_emitter
                }, options
            )
        );
    }
}

// let id = new ImplDescriptor({name: 'domain'});
// id.addContent(`
// /* The following implementations are generated */
// napi_value libvirt_virDomainGetID(napi_env env, napi_callback_info info) {
//   napi_status status;
//   napi_value n_retval;

//   return n_retval;
// }`);
// console.log(id.getAsString());

class ExportDescriptor extends FileDescriptor {
    constructor(args, options) {
        super (
            Object.assign(
                {
                    ext: '.c',
                    type: 'export',
                    files: undefined
                },
                args
            ),
            Object.assign(
                {
                    dependencies: [
                        `#include <assert.h>`,
                    ],
                    emitter: export_emitter,
                    opening: `#define DECLARE_NAPI_METHOD(name, func) \\
                                  { name, 0, func, 0, 0, 0, napi_default, 0 }

                              napi_value Init(napi_env env, napi_value exports) {
                                  napi_status status;
                                  napi_property_descriptor descs[] = {`,
                    closing: `    };
                                status = napi_define_properties(env, exports, sizeof(descs)/sizeof(descs[0]), descs);
                                assert(status == napi_ok);
                                return exports;
                              }

                              NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)`,
                    separator: '',
                }, options
            )
        );

        args.files.forEach(file => this.addDependency(file));
    }

    addDependency(dependency) {
        super.addDependency(`#include "${dependency}.h"`);
    }
}

module.exports = {
    WrapperDescriptor,
    HeaderDescriptor,
    ImplDescriptor,
    ExportDescriptor,
}