const fs = require('fs');
const { libvirt_parser } = require('./parser');
const { dispatcher } = require('./dispatcher');
require('./generators');

// Create generated folder
const generated_path = 'generated';

try {
    fs.statSync(generated_path);
} catch ( ex ) {
    fs.mkdirSync(generated_path);
}

const files = [
    "libvirt",
    "libvirt-connect",
    "libvirt-domain",
    "libvirt-domain-snapshot",
    "libvirt-interface",
    "libvirt-network",
    "libvirt-nodedev",
    "libvirt-nwfilter",
    "libvirt-secret",
    "libvirt-storage-pool",
    "libvirt-storage-vol",
    "libvirt-stream",
];

dispatcher.open(files);
dispatcher.run(libvirt_parser);
dispatcher.closeAll();
