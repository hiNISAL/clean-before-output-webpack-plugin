# clean-before-output-webpack-plugin

在webpack输出文件之前删除目录的plugin

## 使用

``` shell
npm i clean-before-output-webpack-plugin -D
```

``` js
// webpack config
const { resolve } = require('path');
const CleanBeforeOutputWebpackPlugin = require('clean-before-output-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    new CleanBeforeOutputWebpackPlugin({
      path: resolve(__dirname, 'dist/'),
    }),
  ],
  // ...
};
```
