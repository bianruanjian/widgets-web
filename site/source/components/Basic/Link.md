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