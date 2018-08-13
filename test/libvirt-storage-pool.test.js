const libvirt = require('../lib');
const assert = require('assert');

let test_xml = `
    <pool type="dir">
      <name>storage_pool_test</name>
      <target>
        <path>./test/temp</path>
      </target>
    </pool>`;

describe('libvirt-storage-pool', function() {
    before(function() {
        this.conn = libvirt.open('test:///default');
        this.domain = this.conn.lookupByName('test');
    });

    it('should lookup by name', function() {
        assert.doesNotThrow(() => this.conn.storagePoolLookupByName('default-pool'));
    });

    it('should list all storage pools', function() {
        assert.strictEqual(this.conn.listAllStoragePools().length, 1);
    });

    it('should create and destroy storagePool from xml', function() {
        let storagePool = this.conn.storagePoolCreateXML(test_xml, 0);
        assert.strictEqual(storagePool.getName(), "storage_pool_test");
        assert.doesNotThrow(() => this.conn.storagePoolLookupByName('storage_pool_test'));
        assert.strictEqual(storagePool.destroy(), 0);
        assert.throws(() => this.conn.storagePoolLookupByName('storage_pool_test'));
    });

    describe('storagePool actions', function() {
        before(function() {
            this.storagePool = this.conn.storagePoolLookupByName('default-pool');
        });

        it('should get number of volumes', function() {
            assert.strictEqual(this.storagePool.numOfVolumes(), 0);
        });

        it('should refresh the list of volumes', function() {
            assert.strictEqual(this.storagePool.refresh(0), 0);
        });
    });
});