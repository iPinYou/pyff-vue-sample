var chalk = require('chalk')
var semver = require('semver')
var packageConfig = require('../package.json')
var shell = require('shelljs')
function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

var versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),//例子：semver.clean('  =v1.2.3   ') // '1.2.3'
    versionRequirement: packageConfig.engines.node
  },
]
if (shell.which('npm')) {//判断当前环境是否有安装npm
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}
if (shell.which('npm') && !shell.which('yarn')) {//判断当前环境是否有安装yarn,若没有则会自行安装
  exec('npm install -g yarn')
}
if (shell.which('npm') && !shell.which('gulp')) {//判断当前环境是否有安装gulp,若没有则会自行安装
  exec('npm install -g gulp')
}
module.exports = function () {
  var warnings = []
  //检查版本信息
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i]
    //例子：semver.satisfies('1.2.3', '1.x || >=2.5.0 || 5.0.0 - 7.2.3') // true
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }
  //TODO 可检查端口被占用情况

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    for (var i = 0; i < warnings.length; i++) {
      var warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    process.exit(1)
  }
}
