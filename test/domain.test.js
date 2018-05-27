'use strict';

let libvirt = require('../lib');
let assert = require('assert');

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
</domain>
`;

(function test_allDomain(xml) {
  let conn = libvirt.open('test:///default');
  let domain = conn.createXML(xml, 0);
  assert.strictEqual(domain.getOSType(), "linux");
  assert.strictEqual(domain.getVcpusFlags(0), 1);
})(test_xml);