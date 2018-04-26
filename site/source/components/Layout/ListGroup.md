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

## 通用属性

1. [Spacing](../Utilities/Spacing.html)

## 属性

| 名称  | 显示名 | 默认值 | 可选值 |值类型 |
| ----- | ------ | ----- | ----- | --------- |
| widgetId | 标识 | | | string |
| flush | 无边框 | false | true, false| boolean |

1. `ListGroup`下支持放`Button`、`Link`和`ListItem`部件