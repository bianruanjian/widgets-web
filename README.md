# dojo2-bootstrap

[![Build Status](https://api.travis-ci.org/bianruanjian/dojo2-bootstrap.svg?branch=master)](https://travis-ci.org/bianruanjian/dojo2-bootstrap)
[![加入QQ群](https://img.shields.io/badge/QQ%E7%BE%A4-631036800-blue.svg)](http://shang.qq.com/wpa/qunwpa?idkey=12359372e3c79a93895f53a95b844fd146a45d143ec20d7496bfe138c17354aa)

本项目存储响应式的小部件，基于 dojo 2 的 [widget-core](https://github.com/dojo/widget-core) 和 [bootstrap 4](https://getbootstrap.com/) 构建。

This project was generated with the [Dojo CLI](https://github.com/dojo/cli) & [Dojo CLI create app command](https://github.com/dojo/cli-create-app).

## 如何创建部件模板

安装创建部件组件 [`@dojo/cli-create-widget`](https://github.com/dojo/cli-create-widget)：

```bash
npm install -g @dojo/cli-create-widget
```

进入 src 文件夹，执行以下命令：

```bash
dojo create widget --name <widget name> --component true
```

完成。



## Build

Run `dojo build --mode dist` (the `mode` option defaults to `dist`) to create a production build for the project. The built artifacts will be stored in the `output/dist` directory.

## Development Build

Run `dojo build --mode dev` to create a development build for the project. The built artifacts will be stored in the `output/dev` directory.

## Development server

Run `dojo build --mode dev --watch memory --serve` to create an in memory development build and start a development server with hot reload. By default the server runs on port `9999`, navigate to `http://localhost:9999/`.

To change the port of the development use the `--port` option.

## Running unit tests

To run units tests in node only use `dojo test` which uses JIT (just in time) compilation.

To run the unit tests against built bundles, first the run a test build with `dojo build --mode test`. The build test artifacts are written to the `output/test` directory.

Then `dojo test -c local` to run the projects unit tests. These tests are located in the `tests/unit` directory. The `--watch` options can be used with the test build which means that `dojo test` can be re-run without needing to re-build the full application each time.

## Running functional tests

To run the functional tests, first the run a test build with `dojo build --mode test` and then `dojo test -f` to run the projects functional tests. These tests are located in the `tests/functional` directory.

## Further help

To get help for these commands and more, run `dojo` on the command line.
