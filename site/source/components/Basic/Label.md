---
title: Label
layout: components
footer: false
date: 2018-03-26 10:14:52
tags:
---

标签(辅助部件)

## 基本用法

{% raw %}
<db-label widgetId="random-id" value="标签" forId="input"></db-label>
<input type="text" id="input" class="ml-2"/>
{% endraw %}
```html
<db-label widgetId="random-id" value="标签" forId="input"></db-label>
<db-text-imput widgetId="input" name="name" type="text" marginLeft="2"></db-text-input>
```

## 属性

| 名称  | 显示名 | 默认值 | 可选值 |值类型 |
| ----- | ------ | ----- | ----- | --------- |
| widgetId | 标识 | | | string |
| value | 值 | | | string |
| forId | 目标 id | | | string |