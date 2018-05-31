const libvirt = require('../lib');
const assert = require('assert');

describe('libvirt-connect', function() {
  before(function() {
    this.conn = libvirt.open('test:///default');
  });

  it('should get the uri', function() {
    assert.strictEqual(this.conn.getURI(), 'test:///default');
  });
  it('should check if connection is alive', function() {
    assert.strictEqual(this.conn.isAlive(), 1);
  });
  it('should get capabilities', function() {
    assert.ok(this.conn.getCapabilities().startsWith('<capabilities>'));
  });
});