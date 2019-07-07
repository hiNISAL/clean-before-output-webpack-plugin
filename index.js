const {
  existsSync,
  readdirSync,
  statSync,
  unlinkSync,
  rmdirSync,
} = require('fs');

const delDir = (path) => {
  let files = [];

  if(existsSync(path)){
    files = readdirSync(path);
    files.forEach((file) => {
      let curPath = `${path}/${file}`;
      if(statSync(curPath).isDirectory()){
        delDir(curPath);
      } else {
        unlinkSync(curPath);
      }
    });
    rmdirSync(path);
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
