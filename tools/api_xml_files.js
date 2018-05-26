/* Extracts API xml paths using libvirt's pkg-config */
const { pkgconfig } = require('./pkgconfig');

let libvirt_api      = pkgconfig.getData(['--variable', 'libvirt_api', 'libvirt']),
    libvirt_qemu_api = libvirt_api.replace('-api.xml', '-qemu-api.xml'),
    libvirt_lxc_api  = libvirt_api.replace('-api.xml', '-lxc-api.xml');

if(!libvirt_api) {
	throw new Error('Failed to get libvirt_api.xml path');
}

module.exports = {
	libvirt_api,
	libvirt_qemu_api,
	libvirt_lxc_api
};
