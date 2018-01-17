var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const fs = require('fs');

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      // importLoaders:1,
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }
    //默认会使用postcss处理
    loaders.push({
      loader:"postcss-loader"
    })

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {//返回css类型对应的loader组成的对象 generateLoaders()来生成loader
    css: generateLoaders('sass'),
    postcss: generateLoaders('sass'),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}


exports.eachDir = function() {
  let queue = [];
  let eachFiles = (options) => {
    if (queue.length) {
      let curPath = queue.shift();
      fs.readdir(curPath, (err, files) => {
        if (err) {
          options.fail(err);
          return;
        }

        files.forEach((file, i) => {
          let url = curPath + '/' + file;
          let stats = fs.statSync(url);

          if (stats.isDirectory()) {
            queue.push(url);
          } else {
            options.callback && options.callback.call(stats, {
              name: file,
              size: stats.size,
              path: url
            });
          }
        });

        eachFiles(options);
      });
    } else {
      options.done();
    }
  };

  return (path, options) => {
    let stats = fs.statSync(path);
    if (stats.isDirectory()) {
      queue.push(path);
    }
    eachFiles(options);
  };
}();
