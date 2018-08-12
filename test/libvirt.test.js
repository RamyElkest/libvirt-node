'use strict';

let libvirt = require('../lib');
let assert = require('assert');

// virConnect
function test_virConnectOpen(...args) {
  let conn = libvirt.open(...args);
}

function test_virConnectGetURI(...args) {
  let conn = libvirt.open(...args);
  return conn.getURI();
}

assert.doesNotThrow(() => test_virConnectOpen('test:///default'), 'connect with default uri');
assert.doesNotThrow(() => test_virConnectOpen('test:///default', 2, 'Three', 4), 'connect with too many arguments');
assert.throws(() => test_virConnectOpen('malformed'), 'connect with malformed uri');
assert.throws(() => test_virConnectOpen(7), 'connect with wrong argument type');
assert.strictEqual(libvirt.open('test:///default').close(), 0);
assert.strictEqual(test_virConnectGetURI('test:///default'), 'test:///default');


// virDomain
function test_virDomainLookupByName(...args) {
  let conn = libvirt.open('test:///default'),
      dom  = conn.lookupByName(...args);
}
function test_virDomainGetID() {
  let conn = libvirt.open('test:///default'),
      dom  = conn.lookupByName('test'),
      id   = dom.getID();
  console.log("domain id is", id);
  return id;
}
function test_virConnectListAllDomains() {
  let conn = libvirt.open('test:///default'),
      doms  = conn.listAllDomains();
  console.log("listAllDomains has", doms.length, "domain(s)");
  return doms;
}

assert.doesNotThrow(() => test_virDomainLookupByName('test'), 'domain lookup with correct name');
assert.doesNotThrow(() => test_virDomainLookupByName('test', 2, 'Three', 4), 'domain lookup with too many arguments');
assert.throws(() => test_virDomainLookupByName('lasttest'), 'domain lookup with incorrect name');
assert.throws(() => test_virDomainLookupByName(false), 'domain lookup with wrong argument type');
assert.strictEqual(test_virDomainGetID(), 1);
assert.strictEqual(test_virConnectListAllDomains()[0].getID(), 1);

console.log('All tests passed!');
