const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const { isDev } = require('./utils/modes');
const { rootPath } = require('./utils/root-path');
const { generatePluginsArray } = require('./utils/generate-plugins-array');
const { getCleanFilePath } = require('./utils/get-clean-file-path');
const { OUTPUT_PATH, PAGES_PATH, ASSET_PATH, TEMPLATES_PATH } = require('./scripts/constants');

module.exports = {
  entry: {
    index: {
      import: rootPath('src/index.ts'),
      dependOn: ['utils'],
    },
    utils: ['nanoid'],
  },
  output: {
    path: rootPath(OUTPUT_PATH),
    filename: 'js/[name].bundle.js',
    publicPath: '/',
    crossOriginLoading: 'anonymous',
    module: true,
    assetModuleFilename: 'public/[hash][ext][query]',
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
    modules: [rootPath('node_modules')],
    alias: {
      '@': rootPath('src'),
      public: rootPath(ASSET_PATH),
      handlebars: 'handlebars/dist/handlebars.min.js',
    },
    extensions: ['.hbs', '.js', '.ts', '.json'],
  },
  experiments: {
    topLevelAwait: true,
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
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
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              sources: isDev,
              esModule: false,
              attrs: [
                ':srcset',
                ':data-srcset',
                'img:data-src',
                'img:src',
                'audio:src',
                'video:src',
                'track:src',
                'embed:src',
                'source:src',
                'input:src',
                'object:data',
                'script:src',
              ],
            },
          },
        ],
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          inlineRequires: /\/public\//gi,
          partialDirs: [rootPath(TEMPLATES_PATH)],
        },
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
    new ForkTsCheckerWebpackPlugin(),
    new webpack.ProgressPlugin(),
    ...generatePluginsArray(PAGES_PATH, next => {
      const cleanFilename = getCleanFilePath(next, PAGES_PATH);

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
