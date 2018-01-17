module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  "plugins": [
    "babel",
    'html',
    "promise"
  ],
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  // add your custom rules here
  'rules': {
    'no-console': 0,
    'import/no-unresolved': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
