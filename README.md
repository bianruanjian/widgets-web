# widgets-web

[![Build Status](https://api.travis-ci.org/bianruanjian/widgets-web.svg?branch=master)](https://travis-ci.org/bianruanjian/widgets-web)
[![npm version](https://badge.fury.io/js/widgets-web.svg)](https://badge.fury.io/js/widgets-web)
[![Join the chat at https://gitter.im/bianruanjian/bianruanjian](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/bianruanjian/bianruanjian)
[![加入QQ群](https://img.shields.io/badge/QQ%E7%BE%A4-631036800-blue.svg)](http://shang.qq.com/wpa/qunwpa?idkey=12359372e3c79a93895f53a95b844fd146a45d143ec20d7496bfe138c17354aa)

Widgets-web 是一套响应式、语义化的 UI 部件库，基于 dojo 2 的 [widget-core](https://github.com/dojo/widget-core) 和 [bootstrap 4](https://getbootstrap.com/) 构建。

部件可供界面开发人员直接使用（[参考部件使用手册](https://bianruanjian.github.io/widgets-web/components/)），也可集成到[编软件平台](www.bianruanjian.com)的界面设计器中。

## 如何使用

在应用程序中使用 `widgets-web` 时,需先使用 `npm` 安装此包：

```bash
npm install widgets-web
```

在应用程序中使用一个部件时，需单独导入此部件，如：

```ts
import Button from 'widgets-web/button';
```

详细用法，请参考 dojo2 的 `widget-core` 的 [README.md](https://github.com/dojo/widget-core/blob/master/README.md) 文件。

## 功能

* 支持最新主流浏览器 Firefox、Chrome、Edge、Safari 和 IE11+

## 部件

以下为当前支持的部件列表，若需新增部件，请在 [Issues](https://github.com/bianruanjian/widgets-web/issues) 中提交您宝贵的建议。

### 表单部件

* Button
* Checkbox
* Radio
* TextInput
* Select
* Textarea
* InputGroup
* Addon

### 布局部件

* View
* Container
* Card
* GridRow
* GridColumn
* ListGroup
* ListItem
* Footer

### 其他部件

* Text
* Label
* Badge
* Icon
* Link
* Image

## 如何开发

### 创建部件模板

安装创建部件组件 [`@dojo/cli-create-widget`](https://github.com/dojo/cli-create-widget)：

```bash
npm install -g @dojo/cli-create-widget
```

进入 src 文件夹，执行以下命令：

```bash
dojo create widget --name <widget name> --component true
```

完成。

### 运行单元测试

在根目录下运行以下命令：

```bash
dojo test
```

### 运行 hexo

本项目的部件使用手册使用 [hexo](https://hexo.io/) 搭建。运行以下命令生成 hexo 网站。

```bash
cd site
hexo server
```