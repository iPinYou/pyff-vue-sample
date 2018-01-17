var buildRoutes = function () {
  const fs = require('fs');
  const render = require('json-templater/string');
  const camelCase = require('camelcase');
  const upperCamelCase = require('uppercamelcase')
  const path = require('path');
  const endOfLine = require('os').EOL;
  const utils = require('./utils')
  let MAIN_TEMPLATE = require('../src/routes-temple').temple

  let IMPORT_TEMPLATE = 'import {{name}} from \'{{package}}\';';

//需要自动处理Import的目录
  let importDir = path.join(__dirname, '../src/views');
//输出文件的目录
  let outputPathDir = path.join(__dirname, '../src');
//输出文件
  let outputPath = outputPathDir + '/routes.js';
  let total = 0, routeFiles = {};
  utils.eachDir(importDir, {
    callback(file) {
      let curRealPath = file.path;
      let ret = file.name.match(/\.(\w+$)/);
      let strFileName = file.name.replace(/(.*\/)*([^.]+).*/ig, "$2");
      let dirName = path.dirname(curRealPath);
      let fileName = path.basename(curRealPath, '.vue');
      let parentUrl = '/' + path.relative(importDir, dirName);
      let fullUrl = '';
      if (parentUrl == '/') {
        fullUrl = parentUrl + camelCase(fileName);
      } else {
        fullUrl = parentUrl + '/' + camelCase(fileName);
      }
      //模块名称为目录加文件名称的组合
      let optionName = upperCamelCase(fullUrl.replace(/\\/ig, "/").replace(/\//g, '_'));
      if (optionName == '404') {//对404做特别处理
        optionName = 'NotFound';
      }
      if (ret && ret[1] == 'vue') {//必须是vue,
        routeFiles[optionName] = curRealPath.replace(/\\/ig, "/");
        total++;
      }
    },
    done() {
      var routeNames = Object.keys(routeFiles);
      var includeComponentTemplate = [];
      let listTemplate = '';
      let lastPath = '/';//上次的路径
      routeNames.forEach(name => {
        let curRealPath = routeFiles[name];
        includeComponentTemplate.push(render(IMPORT_TEMPLATE, {
          name: name,
          package: './' + path.relative(outputPathDir, curRealPath).replace(/\\/ig, "/")
        }));
        //TODO 路由配置希望自动配置,但这样可能导致不灵活,后惯再考虑
      });
      var template = render(MAIN_TEMPLATE, {
        include: includeComponentTemplate.join(endOfLine),
        list: listTemplate//.join(',' + endOfLine)
      });
      // console.log(template);
      fs.writeFileSync(outputPath, template);
      console.log('[build routes entry] DONE:', outputPath);
    },
    fail(err) {
      console.log(err);
    }
  });
}
module.exports=buildRoutes;




