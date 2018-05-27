let fs = require('fs');
let header_generator = require('./generators/headers');
let impl_generator = require('./generators/impls');
let wrapper_generator = require('./generators/wrappers');

// Create generated folder
let src_path = 'src';
let generated_path = 'generated';
let manual_path = `${src_path}/manual`;

try {
	fs.statSync(generated_path);
} catch ( ex ) {
	fs.mkdirSync(generated_path);
}

// Copy manual files
let manual_files = fs.readdirSync(`${manual_path}`);
manual_files.forEach((manual_file) => {
  fs.copyFileSync(`${manual_path}/${manual_file}`, `${generated_path}/${manual_file}`);
});

let files = [
  'host',
  'domain'
];

files.forEach(file => {
  header_generator.generate(file);
  impl_generator.generate(file);
  wrapper_generator.generate(file);
});
