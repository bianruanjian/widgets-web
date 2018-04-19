---
title: Image
date: 2018-04-10 11:24:36
layout: components
footer: false
tags:
---

图片部件

## 通用属性

1. [Border](../Utilities/Border.html) 中的`borderRound`属性
1. [Spacing](../Utilities/Spacing.html)

## 属性

| 名称 | 说明 | 默认值 | 可选值 | 值类型 |
| ----- | ------ | ----- | ----- | --------- |
| widgetId| 标识 | | | string |
| fluid | 水平铺满 | false | true, false | boolean |
| thumbnail | 缩略图 | false | true, false | boolean |
| src | 资源路径 | | | string |
| alt | 替代文本 | | | string |
| width | 宽度 | | auto, 数字, 百分数 | number/string |
| height | 高度 | | auto, 数字, 百分数 | number/string |
| alignment | 排列方式 | default | default, left, center, right | string |

1. `width`和`height`属性值为数字时计量单位是`px`

## 示例

### fluid

{% raw %}
<div style="height:200px;">
    <db-img src="https://lorempixel.com/300/150/" fluid="true" alt="demo" width="100%" height="90%"></db-img>
</div>
{% endraw %}
```html
<db-img src="..." fluid="true" alt="demo"></db-img>
```

### thumbnail

{% raw %}
<div style="height:200px;">
    <db-img src="https://lorempixel.com/300/150/" thumbnail="true" alt="demo"></db-img>
</div>
{% endraw %}
```html
<db-img src="..." thumbnail="true" alt="demo"></db-img>
```

### width and height

{% raw %}
<div style="height:200px;">
    <db-img src="https://lorempixel.com/300/150/" alt="demo" width="400" height="90%"></db-img>
</div>
{% endraw %}
```html
<db-img src="..." thumbnail="true" alt="demo" width="400" height="90%"></db-img>
```

### alignment

{% raw %}
<div style="height:200px;">
    <db-img src="https://lorempixel.com/300/150/" alt="demo" alignment="left" height="90%"></db-img>
</div>
{% endraw %}
```html
<db-img src="..." thumbnail="true" alt="demo" alignment="left"></db-img>
```

### borderRound

{% raw %}
<div style="height:200px;">
    <db-img src="https://lorempixel.com/300/150/" alt="demo" borderRound="circle" height="90%"></db-img>
</div>
{% endraw %}
```html
<db-img src="..." thumbnail="true" alt="demo" borderRound="circle"></db-img>
```