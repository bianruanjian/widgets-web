---
title: Image
date: 2018-04-10 11:24:36
layout: components
footer: false
tags:
---

图片部件

## 通用属性

1. [Border](../Utilities/Border.html) 中的`borderRound`属性
1. [Spacing](../Utilities/Spacing.html)

## 属性

| 名称 | 说明 | 默认值 | 可选值 | 值类型 |
| ----- | ------ | ----- | ----- | --------- |
| widgetId| 标识 | | | string |
| fluidWidth | 水平铺满 | false | true, false | boolean |
| thumbnail | 缩略图 | false | true, false | boolean |
| src | 资源路径 | | | string |
| alt | 替代文本 | | | string |
| width | 宽度 | | auto, 数字, 百分数 | number/string |
| height | 高度 | | auto, 数字, 百分数 | number/string |
| alignment | 排列方式 | default | default, left, center, right | string |

1. `width`和`height`属性值为数字时计量单位是`px`
