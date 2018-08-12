Libvirt bindings for NodeJS
=============

[![Build Status](https://travis-ci.com/RamyElkest/libvirt-node.svg?branch=master)](https://travis-ci.com/RamyElkest/libvirt-node)
[![Dependency Status](https://david-dm.org/ramyelkest/libvirt-node.svg)](https://david-dm.org/ramyelkest/libvirt-node)
[![npm version](https://badge.fury.io/js/libvirt-node.svg)](http://badge.fury.io/js/libvirt-node)

Node bindings for [Libvirt][libvirt_home]

The bindings are generated from libvirt's exported api

## Stability
Experimental. This library is still under active development and subject to non-backwards compatible changes in any future version. Use of this library is not recommended in production environments until version 1.0.0 is released.

## Pre-requisites
* libvirt-dev must be installed and in your include path
* Node version that supports [napi][napi] >= 8
* gcc installed

## Installation (linux)
Install libvirt-node through npm

    sudo apt-get install libvirt-dev
    npm install libvirt-node

## Usage
    const libvirt = require('libvirt-node');

    let connection = libvirt.open('qemu:///system');
    let domains = connection.listAllDomains(libvirt.VIR_CONNECT_LIST_DOMAINS_RUNNING);
    console.log(`My running domains: ${domains.map(domain => domain.getName())}`);

More examples can be found in the tests

## API
libvirt-node loosly mirrors the official [libvirt docs][libvirt_docs] with minor corrections (mainly without the virModule prefix)

### Coverage
The API is still under development and not all libvirt functions are supported.

The [whitelist][whitelist] has the supported (and not yet supported) functions.

## Development

For development documentation please refer to [DEVELOPMENT.md][development]

## License

libvirt-node is released under LGPL-2.1

[libvirt_home]: http://www.libvirt.org
[libvirt_docs]: https://libvirt.org/html/index.html
[whitelist]: https://github.com/RamyElkest/libvirt-node/blob/master/src/whitelist.js
[development]: https://github.com/RamyElkest/libvirt-node/blob/master/src/DEVELOPMENT.md
[debug]: https://www.npmjs.com/package/debug
[napi]: https://nodejs.org/api/n-api.html
