constructor(conn, domain) {
    this.conn = conn;
    this.domain = domain;
}

/**
 * Get the hypervisor ID number for the domain
 *
 * @return {Integer}
 */
getId() {
    let ret = libvirt_native.virDomainGetID(this.domain);
    if(ret == -1) throw new Error("virDomainGetID() failed");
    return ret;
}