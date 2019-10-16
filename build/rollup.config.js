const path = require('path');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const json = require('rollup-plugin-json');
const { eslint } = require('rollup-plugin-eslint');
const merge = require('webpack-merge');

const getRoot = () => path.resolve(__dirname, '../axios');

const getDefaultInput = (root) => {
  return { input: path.resolve(root, 'index.js') };
};

const getEslintPlugin = () =>
  eslint({
    throwOnError: true,
    formatter: 'eslint-formatter-friendly',
  });

const getNodePlugins = () => [
  nodeResolve({ preferBuiltins: true }),
  commonjs(),
];

const getBabelPlugin = async () => {
  const options = { exclude: 'node_modules/**', runtimeHelpers: true };
  return babel(options);
};

const getConfig = async () => {
  const root = getRoot();
  const { name } = await require(path.resolve(root, 'package.json')); // eslint-disable-line import/no-dynamic-require
  console.log(`打包目标:${name}, 位于${root}`);

  const common = {
    output: {
      dir: path.resolve(root, 'dist'),
      format: 'umd',
      name,
    },
    plugins: [
      getEslintPlugin(),
      ...getNodePlugins(),
      await getBabelPlugin(root),
      json(),
    ],
  };

  let config;
  try {
    // eslint-disable-next-line import/no-dynamic-require
    const extra = await require(path.resolve(
      root,
      './build/rollup.config.js',
    ))();

    if (!extra.input) {
      console.log('未配置input, 使用默认配置...');
      Object.assign(extra, getDefaultInput(root));
    }

    config = merge(common, extra);
  } catch (e) {
    console.log('未配置rollup, 使用默认打包配置...');
    config = Object.assign(common, getDefaultInput(root));
  }

  console.log('打包配置:', config);
  return config;
};

module.exports = getConfig;
