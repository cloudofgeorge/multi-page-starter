const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const { isDev } = require('./utils/modes');
const { rootPath } = require('./utils/root-path');
const { generatePluginsArray } = require('./utils/generate-plugins-array');

module.exports = {
  entry: {
    index: {
      import: rootPath('src/index.js'),
      dependOn: ['utils'],
    },
    utils: ['nanoid'],
  },
  output: {
    path: rootPath('dist'),
    filename: 'js/[name].bundle.js',
    publicPath: '/',
    crossOriginLoading: 'anonymous',
    module: true,
    assetModuleFilename: 'assets/[hash][ext][query]',
    environment: {
      arrowFunction: true,
      bigIntLiteral: false,
      const: true,
      destructuring: true,
      dynamicImport: false,
      forOf: true,
    },
  },
  resolve: {
    alias: {
      '@': rootPath('src/app'),
    },
    extensions: ['.mjs', '.js', 'jsx', '.json'],
  },
  experiments: {
    topLevelAwait: true,
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              sources: true,
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico|webp|avif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[hash][ext][query]',
        },
      },
      {
        test: /\.mp4$/,
        type: 'asset/resource',
        generator: {
          filename: 'video/[hash][ext][query]',
        },
      },
      {
        test: /\.(xml)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'resources/[hash][ext][query]',
        },
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1, sourceMap: isDev },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDev,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    ...generatePluginsArray('public/templates', next => {
      const newPath = rootPath('public/templates');
      const pathWithoutAbsolute = next.replace(`${newPath}/`, '');
      const bringEverythingToHTML = value => value.replace(/\.(.*)$/g, '.html');
      const cleanFilename = bringEverythingToHTML(pathWithoutAbsolute);

      return new HtmlWebpackPlugin({
        filename: cleanFilename,
        template: next,
        inject: 'body',
        scriptLoading: 'defer',
        publicPath: '/',
      });
    }),
    new CircularDependencyPlugin(),
    new DuplicatePackageCheckerPlugin(),
    new Dotenv({
      path: rootPath('.env'),
      allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true, // hide any errors
      defaults: false, // load '.env.defaults' as the default values if empty.
    }),
  ],
};
