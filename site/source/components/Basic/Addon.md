---
title: Addon
layout: components
footer: false
date: 2018-04-16 11:10:52
tags:
---

前缀/后缀插件

## 基本用法

### prepend
{% raw %}
<div class="input-group">
    <div class="input-group-prepend">
        <div class="input-group-text">
            $
        </div>
    </div>
    <input type="number" class="form-control">
</div>
{% endraw %}
```html
<db-input-group>
    <db-addon value="$"></db-addon>
    <db-text-input type="number"></db-text-input>
</db-input-group>
```

### append
{% raw %}
<div class="input-group">
    <input type="number" class="form-control">
    <div class="input-group-append">
        <div class="input-group-text">
            $
        </div>
    </div>
</div>
{% endraw %}
```html
<db-input-group>
    <db-text-input type="number"></db-text-input>
    <db-addon value="$" position="append"></db-addon>
</db-input-group>
```

### Multiple addons
{% raw %}
<div class="input-group">
    <div class="input-group-prepend">
        <div class="input-group-text">
            $
        </div>
    </div>
    <div class="input-group-prepend">
        <div class="input-group-text">
            0.00
        </div>
    </div>
    <input type="number" class="form-control">
</div>
<div class="input-group mt-3">
    <input type="number" class="form-control">
    <div class="input-group-append">
        <div class="input-group-text">
            $
        </div>
    </div>
    <div class="input-group-append">
        <div class="input-group-text">
            0.00
        </div>
    </div>
</div>
<div class="input-group mt-3">
    <div class="input-group-prepend">
        <div class="input-group-text">
            $
        </div>
    </div>
    <input type="number" class="form-control">
    <div class="input-group-append">
        <div class="input-group-text">
            0.00
        </div>
    </div>
</div>
{% endraw %}
```html
<db-input-group>
    <db-addon value="$"></db-addon>
    <db-addon value="0.00"></db-addon>
    <db-text-input type="number"></db-text-input>
</db-input-group>
<db-input-group>
    <db-text-input type="number"></db-text-input>
    <db-addon value="$" position="append"></db-addon>
    <db-addon value="0.00" position="append"></db-addon>
</db-input-group>
<db-input-group>
    <db-addon value="$"></db-addon>
    <db-text-input type="number"></db-text-input>
    <db-addon value="0.00" position="append"></db-addon>
</db-input-group>
```

### With textarea
{% raw %}
<div class="input-group">
  <div class="input-group-prepend">
    <span class="input-group-text">With textarea</span>
  </div>
  <textarea class="form-control"></textarea>
</div>
{% endraw %}
```html
<db-input-group>
    <db-addon value="With textarea"></db-addon>
    <db-textarea></db-textarea>
</db-input-group>
```

### With Checkbox and Radio
{% raw %}
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <div class="input-group-text">
        <input type="checkbox">
    </div>
  </div>
  <input type="text" class="form-control">
</div>

<div class="input-group">
  <div class="input-group-prepend">
    <div class="input-group-text">
        <input type="radio">
    </div>
  </div>
  <input type="text" class="form-control">
</div>
{% endraw %}
```html
<db-input-group>
    <db-addon>
        <db-checkbox></db-checkbox>
    </db-addon>
    <db-text-input></db-text-input>
</db-input-group>
<db-input-group>
    <db-addon>
        <db-radio></db-radio>
    </db-addon>
    <db-text-input></db-text-input>
</db-input-group>
```

### Button addons
{% raw %}
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <button class="btn btn-outline-secondary" type="button">Button</button>
  </div>
  <input type="text" class="form-control">
</div>

<div class="input-group">
  <input type="text" class="form-control">
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button">Button</button>
  </div>
</div>
{% endraw %}
```html
<db-input-group>
    <db-addon>
        <db-button appearance="outline-secondary" value="Button"></db-button>
    </db-addon>
    <db-text-input></db-text-input>
</db-input-group>
<db-input-group>
    <db-text-input></db-text-input>
    <db-addon position="append">
        <db-button appearance="outline-secondary" value="Button"></db-button>
    </db-addon>
</db-input-group>
```

## 通用属性

1. [Colors](../Utilities/Colors.html)

## 属性

| 名称  | 说明 | 默认值 | 可选值 | 值类型 |
| ----- | ------ | ----- | ----- | --------- |
| widgetId | 标识 | | | string |
| value | 值 | | | string |
| position | 位置 | default | prepend, append, default | string |

1. 支持子部件
1. 只能放在 InputGroup 中