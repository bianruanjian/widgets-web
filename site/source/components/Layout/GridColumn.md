---
title: GridColumn
layout: components
footer: false
date: 2018-03-26 10:14:52
tags:
---

网格列

## 基本用法

## 通用属性

1. [Border](../Utilities/Border.html)
1. [Spacing](../Utilities/Spacing.html)
1. [Text](../Utilities/Text.html)
1. [Flex](../Utilities/Flex.html)

## 属性

| 名称  | 显示名 | 默认值 | 可选值 |值类型 |
| ----- | ------ | ----- | ----- | --------- |
| widgetId | 标识 | | | string |
| offset | 右偏移列数 | default | 0~11, default | number/string |

## 示例

### offset

{% raw %}
<div class="container" style="max-length: 90%">
    <div id="row" class="row bg-primary border" >
        <div class="col bg-success text-light" style="height:30px">没有偏移</div>
        <div class="col bg-info text-light" style="height:30px">没有偏移</div>
    </div>
</div>
{% endraw %}
{% raw %}
<div class="container" style="max-length: 90%">
    <div id="row" class="row bg-primary border" >
        <div class="col offset-1 bg-success text-light" style="height:30px">偏移1</div>
        <div class="col offset-2 bg-info text-light" style="height:30px">偏移2</div>
    </div>
</div>
{% endraw %}

```html
<db-container>
    <db-grid-row widgetId="row">
        <db-grid-column>没有偏移</db-grid-column>
        <db-grid-column>没有偏移</db-grid-column>
    </db-grid-row>
</db-container>
```
```html
<db-container>
    <db-grid-row widgetId="row">
        <db-grid-column offset="1">偏移1</db-grid-column>
        <db-grid-column offset="2">偏移2</db-grid-column>
    </db-grid-row>
</db-container>
```

### text decoration

{% raw %}
<db-container>
    <db-grid-row widgetId="row">
        <db-grid-column textDecoration="overline">上划线</db-grid-column>
        <db-grid-column textDecoration="lineThrough">删除线</db-grid-column>
        <db-grid-column textDecoration="underline">下划线</db-grid-column>
    </db-grid-row>
</db-container>
{% endraw %}
```html
<db-container>
    <db-grid-row widgetId="row">
        <db-grid-column textDecoration="overline">上划线</db-grid-column>
        <db-grid-column textDecoration="lineThrough">删除线</db-grid-column>
        <db-grid-column textDecoration="underline">下划线</db-grid-column>
    </db-grid-row>
</db-container>
```