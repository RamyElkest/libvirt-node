const { wrapper_emitter } = require('../../emitters');
const { fileToClass, CObjects } = require('../types');

wrapper_emitter.register('libvirt:constructor', filename => '');
wrapper_emitter.register('libvirt-connect:constructor', filename =>
   `constructor(conn) {
        this.conn = conn;
    }`
);
wrapper_emitter.register('libvirt-domain-snapshot:constructor', filename =>
   `constructor(domain, snapshot) {
        this.conn = conn;
        this.domain = domain;
        this.snapshot = snapshot
    }`
);
wrapper_emitter.register('[\\w-]+:constructor', filename => {
    // TODO(ramyelkest@gmail.com): Remove Ptr hack..
    const member = CObjects[fileToClass[filename]+'Ptr'].name;
    return `constructor(conn, ${member}) {
                this.conn = conn;
                this.${member} = ${member}
            }`;
});
