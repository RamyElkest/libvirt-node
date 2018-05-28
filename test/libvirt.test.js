'use strict';

let libvirt = require('../lib');
let assert = require('assert');

// virConnect
function test_virConnectOpen(name) {
  let conn = libvirt.open(name);
}

assert.doesNotThrow(() => test_virConnectOpen(), 'with no uri');
assert.doesNotThrow(() => test_virConnectOpen('qemu:///system'), 'with default uri');
assert.throws(() => test_virConnectOpen('malformed'), 'with malformed uri');


// virDomain
function test_virDomainLookupByName(name) {
  let conn = libvirt.open(),
      dom  = conn.lookupByName(name);
}
function test_virDomainGetId() {
  let conn = libvirt.open(),
      dom  = conn.lookupByName('firsttest'),
      id   = dom.getId();
  console.log("domain id is", id);
  return id;
}

assert.doesNotThrow(() => test_virDomainLookupByName('firsttest'), 'with correct name');
assert.throws(() => test_virDomainLookupByName('lasttest'), 'with incorrect name');
assert.strictEqual(test_virDomainGetId(), 3);

console.log('All tests passed!');
