# Development

### Installation

libvirt-node provides a thin `Makefile` on top of npm for convenience.

    make clean && make && make check
  
to clean, generate code and run tests respectively.

### Architecture

Please refer to the [wiki](https://github.com/RamyElkest/libvirt-node/wiki/Architecture---Overview).

### File structure

* `lib/` entry into the libvirt-node library
* `tests/` mocha tests for the generated interface
* `tools/` build system scripts
* `src/` top level source files with `main.js` as the entry script
* `src/generators/` code generators for XML API entries
* `src/generators/wrappers` code genenrators for JS interfaces
* `src/generators/headers` code genenrators for napi headers
* `src/generators/impls` code genenrators for napi implementation
* `src/generators/exports` code genenrators for napi exports

### Scripts

There are three main scripts that run during make
* `check_min_libvirt_ver.js` checks the installed libvirt version is `>= 0.9.11`
* `api_xml_files.js` exports libvirt-api xmls retrieved using pkg-config
* `sanitytest.js` reports the number and % of implemented API relative to available API 

### Adding a new manual implementation

To add a new implementation

1. Add it to `src/whitelist.js`
2. override the implementation by registering your custom implementation
    
    `wrapper_emitter.register('virMyFunction', data => 'myImplementation(){}');`

### Debugging

libvirt-node utilizes http://npmjs.com/package/debug for debugging.

To enable all debugs `export DEBUG=*`
