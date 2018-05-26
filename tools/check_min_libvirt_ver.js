/* Checks minumum libvirt version */
const { pkgconfig } = require('./pkgconfig');

const MIN_LIBVIRT = "0.9.11";

try {
	pkgconfig.getData(['--print-errors',
					   `--atleast-version=${MIN_LIBVIRT}`,
					   'libvirt']);
} catch ( ex ) {
	throw new Error(`minumum libvirt supported version is ${MIN_LIBVIRT}`);
}
