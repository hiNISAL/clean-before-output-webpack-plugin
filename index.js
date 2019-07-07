const fs = require('fs');

const delDir = (path) => {
  let files = [];
  if(fs.existsSync(path)){
    files = fs.readdirSync(path);
    files.forEach((file) => {
      let curPath = path + "/" + file;
      if(fs.statSync(curPath).isDirectory()){
        delDir(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

class CleanBeforeOutputWebpackPlugin {
  constructor(opts) {
    this.path = opts.path || '';
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('CleanDistWebpackPlugin', (compilation, cb) => {
      if (!this.path) cb();

      delDir(this.path);
      cb();
    });
  }
}

module.exports = CleanBeforeOutputWebpackPlugin;
