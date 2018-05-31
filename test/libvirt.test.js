const libvirt = require('../lib');
const assert = require('assert');

describe('libvirt', function() {
  describe('open', function() {
    it('should connect with default uri', function() {
      assert.doesNotThrow(() => libvirt.open('test:///default'));
    });
    it('should connect with too many arguments', function() {
      assert.doesNotThrow(() => libvirt.open('test:///default', 2, 'Three', 4));
    });
    it('should fail to connect with malformed uri', function() {
      assert.throws(() => libvirt.open('malformed'));
    });
    it('should fail to connect with wrong argument type', function() {
      assert.throws(() => libvirt.open(7));
    });
    it('should close and return 0', function() {
      assert.strictEqual(libvirt.open('test:///default').close(), 0);
    });
  });
  it('should openReadOnly', function() {
    assert.doesNotThrow(() => libvirt.openReadOnly('test:///default'));
  });
});