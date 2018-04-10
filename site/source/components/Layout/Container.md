---
title: Container
date: 2018-04-09 14:23:33
layout: components
footer: false
tags:
---

页面布局容器

## 属性

| 名称  | 说明 | 默认值 | 可选值 |值类型 |
| ----- | ------ | ----- | ----- | --------- |
| widgetId| 标识 |  |  | string |
| fluidWidth | 水平铺满 | false |          | boolean |
| maxWidth | 宽度 |  |          | number/undefined |

## 示例

固定宽度

<db-container>水平居中</db-container>

```html
<db-Container>
水平居中
</db-Container>
```

铺满全屏

```html
<db-Container fluidWidth="true">
铺满全屏
</db-Container>
```

