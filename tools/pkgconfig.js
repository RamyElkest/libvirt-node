/* pkg-config utilities wrapper */
const which = require('which');
const { execSync } = require('child_process');

class PkgConfig {
	/* find pkg-config binary */
	constructor() {
		try {
			this._bin = process.env.PKG_CONFIG ||
						which.sync('pkg-config');
		} catch ( ex ) {
			throw new Error("pkg-config binary is required to compile libvirt-node");
		}
	}

    /* Run pkg-config with args and return content associated with it */
	getData(args) {
		let data = '';
		let cmd = [this._bin, ...args].join(' ');

		try {
			data = String(execSync(cmd)).trim();
		} catch ( ex ) {
			throw new Error(`'${cmd}' returned non-zero exit code`);
		}

		return data;
	}
}

module.exports = {
	pkgconfig: new PkgConfig
};