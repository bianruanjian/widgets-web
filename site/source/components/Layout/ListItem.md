---
title: ListItem
layout: components
footer: false
date: 2018-04-18 08:28:22
tags:
---

列表项

## 基本用法

### active
{% raw %}
<db-list-group>
  <db-list-item>not active</db-list-item>
  <db-list-item active="true">active</db-list-item>
</db-list-group>
{% endraw %}
```html
<db-list-group>
  <db-list-item>not active</db-list-item>
  <db-list-item active="true">active</db-list-item>
</db-list-group>
```

### disabled
{% raw %}
<db-list-group>
  <db-list-item>normal</db-list-item>
  <db-list-item disabled="true">disabled</db-list-item>
</db-list-group>
{% endraw %}
```html
<db-list-group>
  <db-list-item>normal</db-list-item>
  <db-list-item disabled="true">disabled</db-list-item>
</db-list-group>
```
### appearance
{% raw %}
<db-list-group>
  <db-list-item>normal</db-list-item>
  <db-list-item appearance="primary">primary</db-list-item>
  <db-list-item appearance="secondary">secondary</db-list-item>
  <db-list-item appearance="success">success</db-list-item>
  <db-list-item appearance="danger">danger</db-list-item>
  <db-list-item appearance="warning">warning</db-list-item>
  <db-list-item appearance="info">info</db-list-item>
  <db-list-item appearance="light">light</db-list-item>
  <db-list-item appearance="dark">dark</db-list-item>
</db-list-group>
{% endraw %}
```html
<db-list-group>
  <db-list-item>normal</db-list-item>
  <db-list-item appearance="primary">primary</db-list-item>
  <db-list-item appearance="secondary">secondary</db-list-item>
  <db-list-item appearance="success">success</db-list-item>
  <db-list-item appearance="danger">danger</db-list-item>
  <db-list-item appearance="warning">warning</db-list-item>
  <db-list-item appearance="info">info</db-list-item>
  <db-list-item appearance="light">light</db-list-item>
  <db-list-item appearance="dark">dark</db-list-item>
</db-list-group>
```

### button and link
{% raw %}
<db-list-group>
  <db-list-item><db-button value="button" appearance="primary"></db-button></db-list-item>
  <db-list-item><db-link value="link" target="blank" href="#"></db-link></db-list-item>
</db-list-group>
{% endraw %}
```html
<db-list-group>
  <db-list-item><db-button value="button" appearance="primary"></db-button></db-list-item>
  <db-list-item><db-link value="link" target="blank" href="#"></db-link></db-list-item>
</db-list-group>
```

## 通用属性

1. [Flex](../Utilities/Flex.html) 中的 flex container 相关属性
1. [Text](../Utilities/Text.html)

## 属性

| 名称  | 显示名 | 默认值 | 可选值 |值类型 |
| ----- | ------ | ----- | ----- | --------- |
| widgetId | 标识 | | | string |
| active | 激活 | false | true, false | boolean |
| disabled | 失效 | false | true, false | boolean |
| appearance | 外观 | default | primary, secondary, success, danger, warning, info, light, dark, default | string |