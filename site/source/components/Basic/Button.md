---
title: Button
layout: components
date: 2018-03-26 10:14:52
tags:
---

用于对表单，对话框等的操作，支持设置外观、大小和状态等属性。

## 基本用法

### 填充

{% raw %}
<div class="btn-group" role="group" aria-label="Basic example">
<brj-button appearance="primary" value="primary"></brj-button>
<brj-button appearance="secondary" value="secondary"></brj-button>
</div>
<brj-button appearance="danger" value="danger"></brj-button>
<brj-button appearance="warning" value="warning"></brj-button>
<brj-button appearance="info" value="info"></brj-button>
<brj-button appearance="light" value="light"></brj-button>
<brj-button appearance="dark" value="dark"></brj-button>
<brj-button appearance="link" value="link"></brj-button>
{% endraw %}

```html
<brj-button appearance="primary" value="primary"></brj-button>
<brj-button appearance="secondary" value="secondary"></brj-button>
<brj-button appearance="danger" value="danger"></brj-button>
<brj-button appearance="warning" value="warning"></brj-button>
<brj-button appearance="info" value="info"></brj-button>
<brj-button appearance="light" value="light"></brj-button>
<brj-button appearance="dark" value="dark"></brj-button>
<brj-button appearance="link" value="link"></brj-button>
```

### 镂空

{% raw %}
<brj-button appearance="outline-primary" value="outline-primary"></brj-button>
<brj-button appearance="outline-secondary" value="outline-secondary"></brj-button>
<brj-button appearance="outline-success" value="outline-success"></brj-button>
<brj-button appearance="outline-danger" value="outline-danger"></brj-button>
<brj-button appearance="outline-warning" value="outline-warning"></brj-button>
<brj-button appearance="outline-info" value="outline-info"></brj-button>
<brj-button appearance="outline-light" value="outline-light"></brj-button>
<brj-button appearance="outline-dark" value="outline-dark"></brj-button>
{% endraw %}

```html
<brj-button appearance="outline-primary" value="outline-primary"></brj-button>
<brj-button appearance="outline-secondary" value="outline-secondary"></brj-button>
<brj-button appearance="outline-success" value="outline-success"></brj-button>
<brj-button appearance="outline-danger" value="outline-danger"></brj-button>
<brj-button appearance="outline-warning" value="outline-warning"></brj-button>
<brj-button appearance="outline-info" value="outline-info"></brj-button>
<brj-button appearance="outline-light" value="outline-light"></brj-button>
<brj-button appearance="outline-dark" value="outline-dark"></brj-button>
```

### 尺寸

{% raw %}
<brj-button appearance="primary" size="large" value="Large button"></brj-button>
<brj-button appearance="secondary" size="large" value="Large button"></brj-button>
{% endraw %}

```html
<brj-button appearance="primary" size="large" value="Large button"></brj-button>
<brj-button appearance="secondary" size="large" value="Large button"></brj-button>
```

{% raw %}
<brj-button appearance="primary" size="small" value="Small button"></brj-button>
<brj-button appearance="secondary" size="small" value="Small button"></brj-button>
{% endraw %}

```html
<brj-button appearance="primary" size="small" value="Small button"></brj-button>
<brj-button appearance="secondary" size="small" value="Small button"></brj-button>
```

### 失效

设置`disabled`状态为`true`按钮即可失效

{% raw %}
<brj-button appearance="primary" disabled="true" value="Disabled button"></brj-button>
<brj-button appearance="primary" value="Notdisabled button"></brj-button>
{% endraw %}

```html
<brj-button appearance="primary" disabled="true" value="Disabled button"></brj-button>
<brj-button appearance="primary" value="Notdisabled button"></brj-button>
```

### 水平铺满

设置`fluidWidth`属性`true`可以创建水平铺满的块级按钮

{% raw %}
<brj-button appearance="primary" fluidWidth="true" value="Block level button"></brj-button>
<brj-button appearance="secondary" fluidWidth="true" value="Block level button"></brj-button>
{% endraw %}

```html
<brj-button appearance="primary" disabled="true" value="Block level button"></brj-button>
<brj-button appearance="secondary" value="Block level button"></brj-button>
```

### 激活

设置`active`状态为`true`按钮即可激活

{% raw %}
<brj-button appearance="primary" active="true" value="active button"></brj-button>
<brj-button appearance="primary" value="Notactive button"></brj-button>
{% endraw %}

```html
<brj-button appearance="primary" active="true" value="active button"></brj-button>
<brj-button appearance="primary" value="Notactive button"></brj-button>
```

### 超链接

{% raw %}
<brj-button appearance="primary" active="true" value="超链接" href="#"></brj-button>
{% endraw %}

```html
<brj-button appearance="primary" active="true" value="超链接" href="#"></brj-button>
```


## 属性

| 名称  | 说明 | 默认值 | 可选值 |值类型 |
| ----- | ------ | ----- | ----- | --------- |
| id    | 标识   |       |       | string |
| value | 值     | 按钮  |          | string    |
| appearance | 外观 |  default  |primary,secondary,success,danger,warning,info,light,dark,link,outline-primary,outline-secondary,outline-success,outline-danger,outline-warning,outline-info,outline-light,outline-dark,default          | string    |
| size | 尺寸     |   default    |   small,default,large       | string     |
|  disabled |   失效   |   false    |   true, false       |  boolean    |
|  type  |   类型   |  button    |     button, submit, reset     |   string   |
|  fluidWidth  |   水平铺满   |  false    |   true, false       |  boolean    |
|  active |   激活   |   false    |   true, false       |  boolean    |
|  href  |   链接地址   |     |      |  string  |
|  target  |  目标  |  self  |   self, blank, {iframeId}  |  string  |

## 事件

| 名称  | 参数 | 描述 |
| ----- | ------ | ----- |
| onClick |   | 点击按钮时触发 |