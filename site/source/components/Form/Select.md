---
title: Select
layout: components
footer: false
date: 2018-03-22 20:10:52
tags:
---

下拉框部件

## 基本用法

## 通用属性

1. [Spacing](../Utilities/Spacing.html)
1. [Flex](../Utilities/Flex.html) 中的 Flex item 相关属性
1. [Float](../Utilities/Float.html)

## 属性

| 名称  | 说明 | 默认值 | 可选值 | 值类型 |
| ----- | ------ | ----- | ----- | --------- |
| widgetId | 标识 | | | string |
| value | 值 | | | string |
| label | 文本 | | | string |
| disabled | 失效 | false | true, false | boolean |
| required | 必填 | false | true, false | boolean |
| readOnly | 只读 | false | true, false | boolean |
| options | 选项 | | | json array |
| labelField | 显示字段 | label | | string |
| valueField | 隐藏字段 | value | | string |
| dataPath | 数据路径 | | | string |
| size | 尺寸 | default | small, large, default | string |
| invalidMessage | 无效提示 | | | string |
| validMessage | 有效提示 | | | string |

1. options 格式
```json
[{"value": "value1", "label": "label1"}]
```
