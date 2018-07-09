---
title: Container
date: 2018-04-09 14:23:33
layout: components
footer: false
tags:
---

页面布局容器，可按固定的宽度居中显示，或铺满全屏。

## 基本用法

固定宽度

{% raw %}
<div style="background-color:white;height:100px;border: 1px solid;">
    <div style="background-color:#80bdff;height:90%; border: 1px solid blue;" class="container mt-1">水平居中</div>
</div>
{% endraw %}

```html
<db-container>
    水平居中
</db-container>
```

铺满全屏

{% raw %}
<div style="background-color:white;height:100px; border: 1px solid;" class="container-fluid">
    <div id="id" style="background-color:#80bdff;height:90%; border: 1px solid blue;" class="mt-1">
        铺满全屏
    </div>
</div>
{% endraw %}

```html
<db-container fluidWidth="true">
铺满全屏
</db-container>
```

最大宽度

{% raw %}
<div style="background-color:white;height:100px;border: 1px solid;">
    <div style="background-color:#80bdff;height:90%; border: 1px solid blue; max-width:90%" class="container mt-1">最大宽度 90%</div>
</div>
{% endraw %}

```html
<db-container maxWidth="90%">
    最大宽度 90%
</db-container>
```

## 属性

| 名称 | 说明 | 默认值 | 可选值 | 值类型 |
| ----- | ------ | ----- | ----- | --------- |
| widgetId| 标识 | | | string |
| fluid | 水平铺满 | false | true, false | boolean |
| maxWidth | 最大宽度 | | 数字, 百分数 | number/string |
