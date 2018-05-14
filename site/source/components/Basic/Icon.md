---
title: Icon
layout: components
footer: false
date: 2018-04-19 13:49:55
tags:
---

图标

## 基本用法

{% raw %}
<db-icon value="far fa-smile" alt="smile" title="微笑"></db-icon>
<db-icon value="far fa-smile" alt="smile" title="微笑" size="large"></db-icon>
{% endraw %}
```html
<db-icon value="far fa-smile" alt="smile" title="微笑"></db-icon>
<db-icon value="far fa-smile" alt="smile" title="微笑" size="large"></db-icon>
```

## 通用属性

1. [Spacing](../Utilities/Spacing.html)
1. [Display](../Utilities/Display.html)
1. [Flex](../Utilities/Flex.html) 中的 Flex item 相关属性
1. [Colors](../Utilities/Colors.html)

## 属性

| 名称  | 说明 | 默认值 | 可选值 | 值类型 |
| ----- | ------ | ----- | ----- | --------- |
| widgetId | 标识 | | | string |
| value | 值 | far fa-smile | | string |
| size | 尺寸 | default | extraSmall, small, large, 2x-10x, default | string |
| alt | 替代文本 | | | string |
| title | 提示文本 | | | string |

1. 支持 [Font Awesome 5.0](https://fontawesome.com/icons)
