---
title: Card
layout: components
footer: false
date: 2018-04-18 10:48:06
tags:
---

卡片部件

## 基本用法

{% raw %}
<db-container>
    <db-card width="300" height="200" backgroundColor="info"></db-card>
</db-container>
{% endraw %}
```html
<db-container>
    <db-card width="300" height="200" backgroundColor="info"></db-card>
</db-container>
```

## 通用属性

1. [Spacing](../Utilities/Spacing.html)
1. [Text](../Utilities/Text.html)
1. [Colors](../Utilities/Colors.html)
1. [Border](../Utilities/Border.html)

## 属性

| 名称  | 说明 | 默认值 | 可选值 | 值类型 |
| ----- | ------ | ----- | ----- | --------- |
| widgetId | 标识 | | | string |
| width | 宽度 | | auto, 数字, 百分数 | number/string |
| height | 高度 | | auto, 数字, 百分数 | number/string |

1. `width`和`height`属性值为数字时计量单位是`px`