constructor(conn) {
    this.conn = conn;
}

/**
 * Try to lookup a domain on the given hypervisor based on its name.
 *
 * virDomainFree should be used to free the resources after the
 * domain object is no longer needed.
 *
 * @param {String} name
 * @returns {Object} virDomain
 */
lookupByName(name) {
    let ret = libvirt_native.virDomainLookupByName(this.conn, name);
    if(!ret) throw new Error('virDomainLookupByName() failed');
    return new virDomain(this, ret);
}