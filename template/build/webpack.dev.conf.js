var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var md = require('markdown-it')()
var slugify = require('transliteration').slugify
var striptags = require('./strip-tags')

function convert(str) {
  str = str.replace(/(&#x)(\w{4});/gi, function($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16));
  });
  return str;
}
var wrap = function(render) {
  return function() {
    return render.apply(this, arguments)
      .replace('<code class="', '<code class="hljs ')
      .replace('<code v-pre class="', '<code v-pre class="hljs ')
      .replace('<code>', '<code class="hljs">');
  };
};

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

var styleLoaders =  utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
module.exports = merge.smart(baseWebpackConfig, {
  entry: {
    app: './src/main.js'
  },
  module: {
    rules: styleLoaders
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
   //DefinePlugin 是webpack 的内置插件，该插件可以在打包时候替换制定的变量
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      chunks: ['app']
    }),
    new FriendlyErrorsPlugin()
  ]
})
