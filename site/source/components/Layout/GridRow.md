---
title: GridRow
layout: components
footer: false
date: 2018-03-26 10:14:52
tags:
---

网格行

## 基本用法

## 通用属性

1. [Spacing](../Utilities/Spacing.html)
1. [Flex](../Utilities/Flex.html)

## 属性

| 名称  | 显示名 | 默认值 | 可选值 |值类型 |
| ----- | ------ | ----- | ----- | --------- |
| widgetId | 标识 | | | string |
| gutters | 间隔 | true | true, false| boolean |

## 示例

存在间隔

{% raw %}
<div class="container bg-primary text-dark">
    <db-grid-row widgetId="row">存在间隔</db-grid-row>
</div>
{% endraw %}

```html
<db-container>
    <db-view maxWidth="90%">
        <db-grid-row widgetId="row">存在间隔</db-grid-row>
    </db-view>
</db-container>
```

不存在间隔

{% raw %}
<div class="container bg-primary text-dark">
    <db-grid-row widgetId="row" gutters="false">不存在间隔</db-grid-row>
</div>
{% endraw %}

```html
<db-container>
    <db-view maxWidth="90%">
        <db-grid-row widgetId="row" gutters="false">不存在间隔</db-grid-row>
    </db-view>
</db-container>
```

