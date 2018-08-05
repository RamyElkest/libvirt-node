let fs = require('fs');
let header_generator = require('./generators/headers');
let impl_generator = require('./generators/impls');
let wrapper_generator = require('./generators/wrappers');
let exports_generator = require('./generators/exports');

// Create generated folder
let src_path = 'src';
let generated_path = 'generated';

try {
	fs.statSync(generated_path);
} catch ( ex ) {
	fs.mkdirSync(generated_path);
}

// Generate exports / entry point
exports_generator.generate()

// Generate functions
let files = [
    "domain",
    "domain-snapshot",
    "event",
    "host",
    "interface",
    "network",
    "nodedev",
    "nwfilter",
    "secret",
    "storage",
    "stream",
];

files.forEach(file => {
  header_generator.generate(file);
  impl_generator.generate(file);
  wrapper_generator.generate(file);
});
