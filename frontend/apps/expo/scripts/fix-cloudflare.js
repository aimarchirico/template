const shell = require('shelljs');
const replace = require('replace-in-file');

// Move directory and replace paths
if (shell.test('-d', 'dist/assets/node_modules')) {
  shell.mv('dist/assets/node_modules', 'dist/assets/nodemodules');
  replace.sync({ files: 'dist/**/*', from: /assets\/node_modules/g, to: 'assets/nodemodules' });
}

// Copy functions and routes
shell.cp('-r', 'functions', 'dist/functions');
shell.cp('public/_routes.json', 'dist/_routes.json');
