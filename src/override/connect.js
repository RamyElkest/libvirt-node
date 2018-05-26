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
    if(ret == null) throw new Error('virDomainLookupByName() failed');
    return new virDomain(this, ret);
}

/**
 * This function closes the connection to the Hypervisor. This should
 * not be called if further interaction with the Hypervisor are needed
 * especially if there is running domain which need further monitoring by
 * the application.
 *
 * Connections are reference counted; the count is explicitly
 * increased by the initial open (virConnectOpen, virConnectOpenAuth,
 * and the like) as well as virConnectRef; it is also temporarily
 * increased by other API that depend on the connection remaining
 * alive.  The open and every virConnectRef call should have a
 * matching virConnectClose, and all other references will be released
 * after the corresponding operation completes.
 *
 * @returns {Number} a positive number if at least 1 reference remains
                     on success. The returned value should not be assumed
                     to be the total reference count. A return of 0
                     implies no references remain and the connection is
                     closed and memory has been freed. A return of -1
                     implies a failure.  It is possible for the last
                     virConnectClose to return a positive value if
                     some other object still has a temporary reference
                     to the connection, but the application should not
                     try to further use a connection after the virConnectClose
                     that matches the initial open.
 */
close() {
    let ret = libvirt_native.virConnectClose(this.conn);
    if(ret == null) throw new Error('virConnectClose() failed');
    return ret;
}

/**
 * Registers a callback to be invoked when the connection
 * is closed. This callback is invoked when there is any
 * condition that causes the socket connection to the
 * hypervisor to be closed.
 *
 * This function is only applicable to hypervisor drivers
 * which maintain a persistent open connection. Drivers
 * which open a new connection for every operation will
 * not invoke this.
 *
 * The @freecb must not invoke any other libvirt public
 * APIs, since it is not called from a re-entrant safe
 * context.
 *
 * @param {Function} Callback to be invoked
 * @param {Array} callback parameters
 * @return {Integer} 0 on success, -1 on error
 *
 */
registerCloseCallback(callback, params) {
    let cbData = {
        'conn': this.conn,
        'cb': () => {console.log('YES!');},
        'cb_args': 9999
    }
    let ret = libvirt_native.virConnectRegisterCloseCallback(this.conn, cbData);
    if(ret === null) throw new Error('virConnectClose() failed');
    return ret;
}
