---
title: View
date: 2018-04-09 14:23:33
layout: components
footer: false
tags:
---

页面布局容器，可灵活设置容器的宽度、边框样式、内间距、外间距和字体样式等。

## 通用属性

1. [Border](../Utilities/Border.html)
1. [Spacing](../Utilities/Spacing.html)
1. [Text](../Utilities/Text.html)

## 属性

| 名称  | 说明 | 默认值 | 可选值 | 值类型 |
| ----- | ------ | ----- | ----- | --------- |
| widgetId | 标识 | | | string |
| maxWidth | 最大宽度 | | | number/undefined |

1. `maxWidth`属性的值为数字时，设置最大宽度；不设置值时铺满全屏。

## 示例

铺满全屏

{% raw %}
<div style="background-color:white;height:100px; border: 1px solid;" class="container-fluid">
    <div id="id" style="background-color:#80bdff;height:90%; border: 1px solid blue;" class="mt-1">
        铺满全屏
    </div>
</div>

{% endraw %}

```html
<db-view widgetId="id">铺满全屏</db-view>
```

限定宽度

{% raw %}
<div style="background-color:white;height:100px; border: 1px solid; " class="container-fluid">
    <div style="background-color:#80bdff;height:90%; border: 1px solid blue; max-width:75%;" class="mt-1">
        限定宽度
    </div>
</div>
{% endraw %}

```html
<db-view maxWidth="250">限定宽度</db-view>
```