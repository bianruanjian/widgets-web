---
title: Flex
date: 2018-04-09 14:23:53
layout: components
footer: false
tags:
---

Flex 布局

## 基本用法

## 公共属性

1. 将 [Display](../Utilities/Display.html) 中的`display`属性值设置为`flex`或`flexInline`时可以使用 flex 相关功能。

## 属性

### Flex container

| 名称  | 说明 | 默认值 | 可选值 | 值类型 |
| ----- | ------ | ----- | ----- | --------- |
| flexDirection | 主轴方向 | default | row, column, default | string |
| reverse | 翻转 | false | true, false | boolean |
| justifyItems   | 主轴排列方式 | default | start, end, center, between, around, default | string |
| alignItems | 侧轴排列方式 | default | start, end, center, baseline, stretch, default | string |
| flexWrap | 换行 | default | nowrap, wrap, reverseWrap, default | string |
| alignContent | 多轴排列方式 | default | start, end, center, around, stretch, default | string |

### Flex item

| 名称  | 说明 | 默认值 | 可选值 | 值类型 |
| ----- | ------ | ----- | ----- | --------- |
| alignSelf | 侧轴排列方式 | default | start, end, center, baseline, stretch, default | string |
| order | 排序 | default | 0~12, default | number/string |

当前部件是容器时可以使用 Flex container 相关属性，否则只能使用 Flex item 相关属性。


