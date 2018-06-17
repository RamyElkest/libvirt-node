'use strict';

let libvirt = require('../lib');
let assert = require('assert');

// virConnect
function test_virConnectOpen(...args) {
  let conn = libvirt.open(...args);
}

assert.doesNotThrow(() => test_virConnectOpen(), 'connect with no uri');
assert.doesNotThrow(() => test_virConnectOpen('test:///default'), 'connect with default uri');
assert.doesNotThrow(() => test_virConnectOpen('test:///default', 2, 'Three', 4), 'connect with too many arguments');
assert.throws(() => test_virConnectOpen('malformed'), 'connect with malformed uri');
assert.throws(() => test_virConnectOpen(7), 'connect with wrong argument type');

// virDomain
function test_virDomainLookupByName(...args) {
  let conn = libvirt.open('test:///default'),
      dom  = conn.lookupByName(...args);
}
function test_virDomainGetId() {
  let conn = libvirt.open('test:///default'),
      dom  = conn.lookupByName('test'),
      id   = dom.getId();
  console.log("domain id is", id);
  return id;
}

assert.doesNotThrow(() => test_virDomainLookupByName('test'), 'domain lookup with correct name');
assert.doesNotThrow(() => test_virDomainLookupByName('test', 2, 'Three', 4), 'domain lookup with too many arguments');
assert.throws(() => test_virDomainLookupByName('lasttest'), 'domain lookup with incorrect name');
assert.throws(() => test_virDomainLookupByName(false), 'domain lookup with wrong argument type');
assert.strictEqual(test_virDomainGetId(), 1);

console.log('All tests passed!');
