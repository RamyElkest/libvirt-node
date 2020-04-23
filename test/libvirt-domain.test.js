const libvirt = require('../lib');
const assert = require('assert');

let test_xml = `
    <domain type='test'>
      <name>domtest</name>
      <memory>128000</memory>
      <currentMemory>64000</currentMemory>
      <vcpu placement='static'>1</vcpu>
      <os>
        <type arch='i686'>hvm</type>
        <boot dev='hd'/>
      </os>
      <clock offset='utc'/>
      <on_poweroff>destroy</on_poweroff>
      <on_reboot>restart</on_reboot>
      <on_crash>destroy</on_crash>
      <devices>
      </devices>
    </domain>`;

describe('libvirt-domain', function() {
    before(function() {
        this.conn = libvirt.open('test:///default');
    });

    describe('domain lookups', function() {
        it('should lookup by name', function() {
            assert.doesNotThrow(() => this.conn.lookupByName('test'));
        });
        it('should lookup by ID', function() {
            assert.doesNotThrow(() => this.conn.lookupByID(1));
        });
        it('should lookup with too many arguments', function() {
            assert.doesNotThrow(() => this.conn.lookupByName('test', 2, 'Three', 4));
        });
        it('should fail to lookup with incorrect name', function() {
            assert.throws(() => this.conn.lookupByName('lasttest'));
        });
        it('should fail to lookup with wrong argument type', function() {
            assert.throws(() => this.conn.lookupByName(false));
        });
    });

    it('should list all domains', function() {
        assert.strictEqual(this.conn.listAllDomains().length, 1);
    });

    it('should create and destroy domain from xml', function() {
        let domain = this.conn.createXML(test_xml, 0);
        assert.strictEqual(domain.getName(), "domtest");
        assert.doesNotThrow(() => this.conn.lookupByName('domtest'));
        assert.strictEqual(domain.destroy(), 0);
        assert.throws(() => this.conn.lookupByName('domtest'));
    });

    describe('domain setters/getters', function() {
        before(function() {
            this.domain = this.conn.lookupByName('test');
        })

        it('should get the domain ID', function() {
            assert.strictEqual(this.domain.getID(), 1);
        });

        it('should get the OS type', function() {
            assert.strictEqual(this.domain.getOSType(), "linux");
        });
        it('should set/get vCPUs', function() {
            assert.strictEqual(this.domain.setVcpus(1), 0);
            assert.strictEqual(this.domain.getVcpusFlags(0), 1);
        });
        it('should not set MaxMemory while active', function() {
            assert.strictEqual(this.domain.setMaxMemory(150000), -1);
        });
        it('should set/get MaxMemory while shut down', function() {
            assert.strictEqual(this.domain.shutdown(), 0);
            assert.strictEqual(this.domain.setMaxMemory(100000), 0);
            assert.strictEqual(this.domain.getMaxMemory(0), 100000);
            assert.strictEqual(this.domain.create(), 0);
        });
    });

    describe('domain actions', function() {
        before(function() {
            this.domain = this.conn.lookupByName('test');
        })

        it('should reboot the domain', function() {
            assert.strictEqual(this.domain.reboot(0), 0);
        });
        it('should suspend and resume the domain', function() {
            assert.strictEqual(this.domain.suspend(), 0);
            assert.strictEqual(this.domain.resume(), 0);
        });
    });
});
