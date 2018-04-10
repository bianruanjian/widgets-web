---
title: Container
date: 2018-04-09 14:23:33
layout: components
footer: false
tags:
---

页面布局容器，可按固定的宽度居中显示，或铺满全屏。

## 属性

| 名称 | 说明 | 默认值 | 可选值 | 值类型 |
| ----- | ------ | ----- | ----- | --------- |
| widgetId| 标识 | | | string |
| fluidWidth | 水平铺满 | false | true, false | boolean |

## 示例

固定宽度

<db-container>水平居中</db-container>

```html
<db-container>
水平居中
</db-container>
```

铺满全屏

```html
<db-container fluidWidth="true">
铺满全屏
</db-container>
```

