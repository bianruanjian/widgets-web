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
<ul class="list-group">
  <li class="list-group-item">not active</li>
  <li class="list-group-item active">active</li>
</ul>
{% endraw %}
```TypeScript
import { w } from '@dojo/widget-core/d';
import ListGroup from 'dojo2-bootstrap/list-group/index';
import ListItem from 'dojo2-bootstrap/list-item/index';

w(ListGroup, {}, [
  w(ListItem, {}, ['not active']);
  w(ListItem, { active: true }, ['active']);
]);
```

### disabled
{% raw %}
<ul class="list-group">
  <li class="list-group-item">default</li>
  <li class="list-group-item disabled">disabled</li>
</ul>
{% endraw %}
```TypeScript
import { w } from '@dojo/widget-core/d';
import ListGroup from 'dojo2-bootstrap/list-group/index';
import ListItem from 'dojo2-bootstrap/list-item/index';

w(ListGroup, {}, [
  w(ListItem, {}, ['default']);
  w(ListItem, { disabled: true }, ['disabled']);
]);
```
### appearance
{% raw %}
<ul class="list-group">
  <li class="list-group-item">default</li>
  <li class="list-group-item list-group-item-primary">primary</li>
  <li class="list-group-item list-group-item-secondary">secondary</li>
  <li class="list-group-item list-group-item-success">success</li>
  <li class="list-group-item list-group-item-danger">danger</li>
  <li class="list-group-item list-group-item-warning">warning</li>
  <li class="list-group-item list-group-item-info">info</li>
  <li class="list-group-item list-group-item-light">light</li>
  <li class="list-group-item list-group-item-dark">dark</li>
</ul>
{% endraw %}
```TypeScript
import { w } from '@dojo/widget-core/d';
import ListGroup from 'dojo2-bootstrap/list-group/index';
import ListItem from 'dojo2-bootstrap/list-item/index';

w(ListGroup, {}, [
  w(ListItem, {}, ['default']);
  w(ListItem, { appearance: 'primary' }, ['primary']);
  w(ListItem, { appearance: 'secondary' }, ['secondary']);
  w(ListItem, { appearance: 'success' }, ['success']);
  w(ListItem, { appearance: 'danger' }, ['danger']);
  w(ListItem, { appearance: 'warning' }, ['warning']);
  w(ListItem, { appearance: 'info' }, ['info']);
  w(ListItem, { appearance: 'light' }, ['light']);
  w(ListItem, { appearance: 'dark' }, ['dark']);
]);
```

### button and link
{% raw %}
<div class="list-group">
  <button type="button" class="list-group-item list-group-item-primary">button</button>
  <a href="#" class="list-group-item" target="_self">link</a>
</div>
{% endraw %}
```TypeScript
import { w } from '@dojo/widget-core/d';
import Button from 'dojo2-bootstrap/button/index';
import Link from 'dojo2-bootstrap/link/index';

w(ListGroup, {}, [
  w(Button, { value: 'button', appearance: 'primary' });
  w(Link, { value: 'link', href: '#', target: 'self' });
]);
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