require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.prod.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
// var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.prod.conf.js')

// default port where prod server listens for incoming traffic
var port = process.env.PORT || config.prod.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.prod.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.prod.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var prodMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

// var hotMiddleware = require('webpack-hot-middleware')(compiler, {
//   log: () => {}
// })
// force page reload when html-webpack-plugin template changes
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

// proxy api requests
// Object.keys(proxyTable).forEach(function (context) {
//   var options = proxyTable[context]
//   if (typeof options === 'string') {
//     options = { target: options }
//   }
//   app.use(proxyMiddleware(options.filter || context, options))
// })

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(prodMiddleware)

// enable hot-reload and state-preserving
// compilation error display
// app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.prod.assetsPublicPath, config.prod.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting prod server...')
prodMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
