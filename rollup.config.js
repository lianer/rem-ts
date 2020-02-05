const path = require('path');
const babel = require('rollup-plugin-babel');
const rimraf = require('rimraf');
const nodeResolve = require('@rollup/plugin-node-resolve');
const pkg = require('./package.json');

const extensions = ['.js', '.ts'];

const resolve = function(...args) {
  return path.resolve(__dirname, ...args);
};

rimraf.sync(resolve('lib'));

module.exports = {
  input: resolve('./src/index.ts'),
  output: {
    file: resolve('./', pkg.main),
    format: 'esm',
  },
  plugins: [
    nodeResolve({
      extensions,
      modulesOnly: true,
    }),
    babel({
      exclude: 'node_modules/**',
      extensions,
    }),
  ],
};
