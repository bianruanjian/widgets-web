---
title: ListGroup
layout: components
footer: false
date: 2018-04-18 08:28:22
tags:
---

列表

## 基本用法

### flush
{% raw %}
<db-list-group widgetId="not-flush">
  <li class="list-group-item">Dapibus ac facilisis in</li>
  <li class="list-group-item list-group-item-primary">This is a primary list group item</li>
</db-list-group>
<db-list-group widgetId="flush" flush="true">
  <li class="list-group-item">Dapibus ac facilisis in</li>
  <li class="list-group-item list-group-item-primary">This is a primary list group item</li>
</db-list-group>
{% endraw %}
```html
<db-list-group widgetId="not-flush">
  <li class="list-group-item">Dapibus ac facilisis in</li>
  <li class="list-group-item list-group-item-primary">This is a primary list group item</li>
</db-list-group>
<db-list-group widgetId="flush" flush="true">
  <li class="list-group-item">Dapibus ac facilisis in</li>
  <li class="list-group-item list-group-item-primary">This is a primary list group item</li>
</db-list-group>
```

### orientation
{% raw %}
<db-list-group widgetId="vertical">
  <li class="list-group-item">orientation is vertical</li>
  <li class="list-group-item list-group-item-primary">This is a primary list group item</li>
</db-list-group>
<db-list-group widgetId="horizontal" orientation="horizontal">
  <li class="list-inline-item">orientation is horizontal</li>
  <li class="list-inline-item">This is a inline list group item</li>
</db-list-group>
{% endraw %}
```html
<db-list-group widgetId="vertical">
  <li class="list-group-item">orientation is vertical</li>
  <li class="list-group-item list-group-item-primary">This is a primary list group item</li>
</db-list-group>
<db-list-group widgetId="horizontal" orientation="horizontal">
  <li class="list-inline-item">orientation is horizontal</li>
  <li class="list-inline-item">This is a inline list group item</li>
</db-list-group>
```

## 通用属性

1. [Spacing](../Utilities/Spacing.html)

## 属性

| 名称  | 显示名 | 默认值 | 可选值 |值类型 |
| ----- | ------ | ----- | ----- | --------- |
| widgetId | 标识 | | | string |
| flush | 无边框 | false | true, false| boolean |
| orientation | 布局方向 | vertical | horizontal, vertical| string |

1. `ListGroup`下支持放`Button`、`Link`和`ListItem`部件
1. `ListGroup`的布局方向选择了`horizontal`方向，则只支持`ListItem`部件，`Button`、`Link`部件必须置于`ListItem`部件下面