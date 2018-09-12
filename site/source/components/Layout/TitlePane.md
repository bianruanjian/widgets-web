---
title: TitlePane
layout: components
footer: false
date: 2018-08-27 12:00:00
tags:
---

标题面板部件

## 属性

| 名称  | 说明 | 默认值 | 可选值 | 值类型 |
| ----- | ------ | ----- | ----- | --------- |
| closeable | 是否可关闭 | true | true, false | boolean |
| headingLevel | 为标题的 dom 节点设置 `aria-level` 属性 | | | number |
| open | 是否打开 | true | true, false | boolean |
| title | 标题 | | | string |

## 事件

| 名称  | 参数 | 描述 |
| ----- | ------ | ----- |
| onRequestClose | TitlePane key | 关闭 TitlePane 时触发 |
| onRequestOpen | TitlePane key | 打开 TitlePane 时触发 |