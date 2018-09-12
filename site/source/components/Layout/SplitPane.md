---
title: SplitPane
layout: components
footer: false
date: 2018-08-27 10:48:00
tags:
---

滑动条面板部件

## 属性

| 名称  | 说明 | 默认值 | 可选值 | 值类型 |
| ----- | ------ | ----- | ----- | --------- |
| direction | 布局方向 | column | row, column | string |
| size | 主面板的大小 | 100 | | number |
| collapseWidth | 触发折叠的宽度 | 600 | | number |

1. `size`、 `collapseWidth` 属性值的计量单位是 `px`

## 事件

| 名称  | 参数 | 描述 |
| ----- | ------ | ----- |
| onCollapse | 是否已折叠 | 折叠时或取消折叠时触发 |
| onResize | 主面板的大小 | 当拖拽分割线时，更新主面板的大小值 |