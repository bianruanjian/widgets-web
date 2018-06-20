---
title: Badge
layout: components
footer: false
date: 2018-04-18 10:48:06
tags:
---

徽章

## 基本用法

### Example
{% raw %}
<h4>Example heading<db-badge value="New" appearance="secondary"></db-badge></h4>
{% endraw %}
```html
<db-text type="h4" value="Example heading"><db-badge value="New" appearance="secondary"></db-badge></db-text>
```

### button
{% raw %}
<db-button value="Notifications " appearance="primary" >
    <db-badge value="4" appearance="light" pill="true"></db-badge>
</db-button>
{% endraw %}
```html
<db-button value="Notifications " appearance="primary">
    <db-badge value="4" appearance="light" pill="true"></db-badge>
</db-button>
```

### Contextual variations
{% raw %}
<db-badge value="warning" appearance="warning"></db-badge>
{% endraw %}
```html
<db-badge value="warning" appearance="warning"></db-badge>
```

### Pill badges
{% raw %}
<db-badge value="warning" appearance="warning" pill="true"></db-badge>
{% endraw %}
```html
<db-badge value="warning" appearance="warning" pill="true"></db-badge>
```

### Links
{% raw %}
<db-badge value="baidu" appearance="warning" marginBottom="3" pill="true" href="https://wwww.baidu.com" target="blank"></db-badge>
{% endraw %}
```html
<db-badge value="baidu" appearance="warning" pill="true" href="https://wwww.baidu.com" target="blank"></db-badge>
```

## 通用属性

1. [Spacing](../Utilities/Spacing.html)
1. [Display](../Utilities/Display.html)
1. [Flex](../Utilities/Flex.html) 中的 Flex item 相关属性

## 属性

| 名称  | 说明 | 默认值 | 可选值 | 值类型 |
| ----- | ------ | ----- | ----- | --------- |
| widgetId | 标识 | | | string |
| value | 值 | | | string |
| valuePosition | 值位置 | right | left, right | string |
| appearance | 外观 | default | primary, secondary, success, danger, warning, info, light, dark, default | string |
| pill | 椭圆 | false | true, false | boolean |
| href | 链接地址 | | | string |
| target | 目标 | self | self, blank, {iframeId} | string |

1. `valuePosition` 描述所有子部件与 `value` 的排列顺序。如果 `Badge` 中包含子部件，则使用此属性控制 `value` 与所有子部件的顺序，默认所有子部件在前，`value` 在后，将 `valuePosition` 设置为 `left` 之后，则`value` 在前，所有子部件在后。