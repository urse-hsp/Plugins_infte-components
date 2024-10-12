# infte-components

[![NPM version](https://img.shields.io/npm/v/infte-components.svg?style=flat)](https://npmjs.org/package/infte-components)
[![NPM downloads](http://img.shields.io/npm/dm/infte-components.svg?style=flat)](https://npmjs.org/package/infte-components)

A react library developed with dumi

## Usage

TODO

## Options

TODO

## Development

```bash
# install dependencies
$ yarn install

# develop library by docs demo
$ yarn start

# build library source code
$ yarn run build

# build library source code in watch mode
$ yarn run build:watch

# build docs
$ yarn run docs:build

# check your project for potential problems
$ yarn run doctor
```

## LICENSE

MIT

远程仓库的 master 分支下有了 docs-dist 这个文件夹，里面就是打包编译之后的文件。我们接着在终端输入以下命令：

# From 1.0.0 -> 1.0.1

npm version patch

# From 1.0.1 -> 1.1.0

npm version minor

# From 1.1.0 -> 2.0.0

npm version major

npm publish --access public 发包

npm login 登录

运行 npm unpublish 包名 --force 命令，即可从 npm 删除已发布的包。

shaoping ggshaoping@gmail.com

/\*\* \*/

<!-- scripts脚本命令 -->

<!-- 方法一：根据docs-dist 创建gh-pages分支。 -->

1. 打包
   npm run build

2. 提交代码到 github 远程仓库
   git add .
   git commit -m "test gh-pages"
   git push origin master
3. 生成 gh-pages 分支
   git subtree push --prefix=docs-dist origin gh-pages

<!-- 方法二：通关gh-pages创建分支 -->

"deploy": "gh-pages -d docs-dist", // 上传到 githunPage
"docs:build": "dumi build", // 打包文档
"update docs": "npm run docs:build && npm run deploy" // 打包文档并且更新 github 页面
