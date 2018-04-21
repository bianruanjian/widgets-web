---
title: Button
layout: components
footer: false
date: 2018-03-26 10:14:52
tags:
---

按钮, 用于对表单，对话框等的操作，支持设置外观、大小和状态等属性。

## 基本用法

### 填充

{% raw %}
<db-button appearance="primary" value="primary"></db-button>
<db-button appearance="secondary" value="secondary"></db-button>
<db-button appearance="danger" value="danger"></db-button>
<db-button appearance="warning" value="warning"></db-button>
<db-button appearance="info" value="info"></db-button>
<db-button appearance="light" value="light"></db-button>
<db-button appearance="dark" value="dark"></db-button>
<db-button appearance="link" value="link"></db-button>
{% endraw %}

```html
<db-button appearance="primary" value="primary"></db-button>
<db-button appearance="secondary" value="secondary"></db-button>
<db-button appearance="danger" value="danger"></db-button>
<db-button appearance="warning" value="warning"></db-button>
<db-button appearance="info" value="info"></db-button>
<db-button appearance="light" value="light"></db-button>
<db-button appearance="dark" value="dark"></db-button>
<db-button appearance="link" value="link"></db-button>
```

### 镂空

{% raw %}
<db-button appearance="outline-primary" value="outline-primary"></db-button>
<db-button appearance="outline-secondary" value="outline-secondary"></db-button>
<db-button appearance="outline-success" value="outline-success"></db-button>
<db-button appearance="outline-danger" value="outline-danger"></db-button>
<db-button appearance="outline-warning" value="outline-warning"></db-button>
<db-button appearance="outline-info" value="outline-info"></db-button>
<db-button appearance="outline-light" value="outline-light"></db-button>
<db-button appearance="outline-dark" value="outline-dark"></db-button>
{% endraw %}

```html
<db-button appearance="outline-primary" value="outline-primary"></db-button>
<db-button appearance="outline-secondary" value="outline-secondary"></db-button>
<db-button appearance="outline-success" value="outline-success"></db-button>
<db-button appearance="outline-danger" value="outline-danger"></db-button>
<db-button appearance="outline-warning" value="outline-warning"></db-button>
<db-button appearance="outline-info" value="outline-info"></db-button>
<db-button appearance="outline-light" value="outline-light"></db-button>
<db-button appearance="outline-dark" value="outline-dark"></db-button>
```

### 尺寸

{% raw %}
<db-button appearance="primary" size="large" value="Large button"></db-button>
<db-button appearance="secondary" size="large" value="Large button"></db-button>
{% endraw %}

```html
<db-button appearance="primary" size="large" value="Large button"></db-button>
<db-button appearance="secondary" size="large" value="Large button"></db-button>
```

{% raw %}
<db-button appearance="primary" size="small" value="Small button"></db-button>
<db-button appearance="secondary" size="small" value="Small button"></db-button>
{% endraw %}

```html
<db-button appearance="primary" size="small" value="Small button"></db-button>
<db-button appearance="secondary" size="small" value="Small button"></db-button>
```

### 失效

设置`disabled`状态为`true`按钮即可失效

{% raw %}
<db-button appearance="primary" disabled="true" value="Disabled button"></db-button>
<db-button appearance="primary" value="Notdisabled button"></db-button>
{% endraw %}

```html
<db-button appearance="primary" disabled="true" value="Disabled button"></db-button>
<db-button appearance="primary" value="Notdisabled button"></db-button>
```

### 水平铺满

设置`fluidWidth`属性`true`可以创建水平铺满的块级按钮

{% raw %}
<db-button appearance="primary" fluidWidth="true" value="Block level button"></db-button>
<db-button appearance="secondary" fluidWidth="true" value="Block level button"></db-button>
{% endraw %}

```html
<db-button appearance="primary" fluidWidth="true" value="Block level button"></db-button>
<db-button appearance="secondary" fluidWidth="true" value="Block level button"></db-button>
```

### 激活

设置`active`状态为`true`按钮即可激活

{% raw %}
<db-button appearance="primary" active="true" value="active button"></db-button>
<db-button appearance="primary" value="Notactive button"></db-button>
{% endraw %}

```html
<db-button appearance="primary" active="true" value="active button"></db-button>
<db-button appearance="primary" value="Notactive button"></db-button>
```

### 超链接

{% raw %}
<db-button appearance="link" active="true" value="超链接" href="#"></db-button>
{% endraw %}

```html
<db-button appearance="link" active="true" value="超链接" href="#"></db-button>
```

## 属性

| 名称  | 说明 | 默认值 | 可选值 | 值类型 |
| ----- | ------ | ----- | ----- | --------- |
| id | 标识 | | | string |
| value | 值 | 按钮 | | string |
| appearance | 外观 | default | primary, secondary, success, danger, warning, info, light, dark, link, outline-primary, outline-secondary, outline-success, outline-danger, outline-warning, outline-info, outline-light, outline-dark, default | string |
| size | 尺寸 | default | small, default, large | string |
| disabled | 失效 | false | true, false | boolean |
| type | 类型 | button | button, submit, reset | string |
| fluid | 水平铺满 | false | true, false | boolean |
| active | 激活 | false | true, false | boolean |
| href | 链接地址 | | | string |
| target | 目标 | self | self, blank, {iframeId} | string |

## 事件

| 名称  | 参数 | 描述 |
| ----- | ------ | ----- |
| onClick | | 点击按钮时触发 |