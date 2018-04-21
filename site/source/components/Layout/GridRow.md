---
title: GridRow
layout: components
footer: false
date: 2018-03-26 10:14:52
tags:
---

网格行

## 基本用法

### gutters

{% raw %}
<div class="container" style="max-length: 90%">
    <div id="row" class="bg-primary border" >
        <div class="bg-success text-light m-2" style="height:30px">存在间隔</div>
    </div>
</div>
{% endraw %}
{% raw %}
<div class="container" style="max-length: 90%">
    <div id="row" class="bg-primary border">
        <div class="bg-success text-light my-2" style="height:30px">不存在间隔</div>
    </div>
</div>
{% endraw %}

```html
<db-container>
    <db-grid-row widgetId="row">存在间隔</db-grid-row>
</db-container>
```
```html
<db-container>
    <db-grid-row widgetId="row" gutters="false">不存在间隔</db-grid-row>
</db-container>
```

## 通用属性

1. [Spacing](../Utilities/Spacing.html)
1. [Flex](../Utilities/Flex.html)

## 属性

| 名称  | 显示名 | 默认值 | 可选值 |值类型 |
| ----- | ------ | ----- | ----- | --------- |
| widgetId | 标识 | | | string |
| gutters | 间隔 | true | true, false| boolean |
