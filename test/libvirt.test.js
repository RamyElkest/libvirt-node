'use strict';

let libvirt = require('../lib');
let assert = require('assert');

// virConnect
function test_virConnectOpen(name) {
  let conn = libvirt.open(name);
}

assert.doesNotThrow(() => test_virConnectOpen(), 'with no uri');
assert.doesNotThrow(() => test_virConnectOpen('qemu:///system'), 'with default uri');
assert.strictEqual(test_virConnectOpen('malformed'), undefined, 'with malformed uri');


// virDomain
function test_virDomainLookupByName(name) {
  let conn = libvirt.open(),
      dom  = conn.lookupByName(conn.conn, name);
}
function test_virDomainGetId() {
  let conn = libvirt.open(),
      dom  = conn.lookupByName(conn.conn, 'firsttest'),
      id   = dom.ID(dom.dom);
  console.log("domain id is", id);
  return id;
}

assert.doesNotThrow(() => test_virDomainLookupByName('firsttest'), 'with correct name');
assert.strictEqual(test_virDomainLookupByName('lasttest'), undefined, 'with incorrect name');
assert.strictEqual(test_virDomainGetId(), 6);

console.log('All tests passed!');
