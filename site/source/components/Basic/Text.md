---
title: Text
layout: components
footer: false
date: 2018-03-26 10:14:52
tags:
---

文本

## 基本用法

### value

{% raw %}
<db-text widgetId="id" value="text"></db-text>
{% endraw%}
```html
<db-text widgetId="id" value="text"></db-text>
```

### type
{% raw %}
<db-text value="h1" type="h1"></db-text>
<db-text value="h2" type="h2"></db-text>
<db-text value="h3" type="h3"></db-text>
<db-text value="h4" type="h4"></db-text>
<db-text value="h5" type="h5"></db-text>
<db-text value="h6" type="h6"></db-text>
<db-text value="p" type="p"></db-text>
<db-text value="text" type="text"></db-text>
<db-text value="lead" type="lead"></db-text>
<db-text value="small" type="small"></db-text>
{% endraw%}
```html
<db-text value="h1" type="h1"></db-text>
<db-text value="h2" type="h2"></db-text>
<db-text value="h3" type="h3"></db-text>
<db-text value="h4" type="h4"></db-text>
<db-text value="h5" type="h5"></db-text>
<db-text value="h6" type="h6"></db-text>
<db-text value="p" type="p"></db-text>
<db-text value="text" type="text"></db-text>
<db-text value="lead" type="lead"></db-text>
<db-text value="small" type="small"></db-text>
```

## 通用属性

1. [Spacing](../Utilities/Spacing.html)
1. [Text](../Utilities/Text.html)
1. [Colors](../Utilities/Colors.html)

## 属性

| 名称  | 显示名 | 默认值 | 可选值 | 值类型 |
| ----- | ------ | --------- | -------- | --------- |
| widgetId | 标识 | | | string |
| value | 值 | 文本 | | string |
| type | 内容类型 | | h1(一级标题), h2(二级标题), h3(三级标题), h4(四级标题), h5(五级标题), h6(六级标题), p(段落), text(纯文本), lead(突出式段落), small(小文本) | string |
