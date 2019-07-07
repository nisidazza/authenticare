const fs = require('fs')
const path = require('path')

module.exports = {
  mergeOptions
}

function mergeOptions (options) {
  return getDefaultOptions()
    .then(defaultOptions => {
      return { options, ...defaultOptions }
    })
}

function getDefaultOptions () {
  return findPackageJsonPath('..')
    .then(packageJson => {
      if (packageJson) {
        const json = require(packageJson)
        const env = process.env.NODE_ENV || 'development'
        return (json.authenticare && json.authenticare[env])
          ? json.authenticare[env]
          : {}
      } else {
        return {}
      }
    })
}

function findPackageJsonPath (start, levelsUp = 3) {
  return new Promise((resolve, reject) => {
    // levelsUp is how far up the directory tree to look. Three
    // will typically be the root of the project using authenticare.
    function getPathFor (dirpath) {
      return path.join(__dirname, dirpath, 'package.json')
    }

    const paths = new Array(levelsUp).fill('..')
    paths.reduce((current, next, idx) => {
      fs.readFile(getPathFor(current), (err, data) => {
        console.log('current path', current)
        if (err && idx + 1 > levelsUp) {
          reject(new Error('Unable to find package.json'))
        }
        if (!err) resolve(data)
        // ignore the error so we can try the next path
      })
      return path.join(current, next)
    }, start)
  })
}
