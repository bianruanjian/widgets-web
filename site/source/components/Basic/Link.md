---
title: Link
layout: components
footer: false
date: 2018-04-19 13:49:55
tags:
---

超链接

## 基本用法

{% raw %}
<db-link href="https://www.baidu.com/" target="blank" value="baidu"></db-link>
{% endraw %}
```html
<db-link href="https://www.baidu.com/" target="blank" value="baidu"></db-link>
```

## 通用属性

1. [Spacing](../Utilities/Spacing.html)
1. [Display](../Utilities/Display.html)
1. [Flex](../Utilities/Flex.html) 中的 Flex item 相关属性
1. [Text](../Utilities/Text.html)
1. [Colors](../Utilities/Colors.html)

## 属性

| 名称  | 说明 | 默认值 | 可选值 | 值类型 |
| ----- | ------ | ----- | ----- | --------- |
| widgetId | 标识 | | | string |
| href | 链接地址 | | | string |
| target | 目标 | self | self, blank, {iframeId} | string |
| value | 值 | | | string |
| valuePosition | 值位置 | right | left, right | string |

1. `valuePosition` 描述所有子部件与 `value` 的排列顺序。如果 `Link` 中包含子部件，则使用此属性控制 `value` 与所有子部件的顺序，默认所有子部件在前，`value` 在后，将 `valuePosition` 设置为 `left` 之后，则`value` 在前，所有子部件在后。