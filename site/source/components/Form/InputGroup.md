---
title: InputGroup
layout: components
footer: false
date: 2018-03-22 20:10:52
tags:
---

输入框组

## 基本用法

### size
{% raw %}
<div class="input-group input-group-sm mt-3">
    <div class="input-group-prepend">
        <div class="input-group-text">
            Small
        </div>
    </div>
    <input id="small" name="small" type="text" class="form-control" value="value">
</div>
<div class="input-group mt-3">
    <div class="input-group-prepend">
        <div class="input-group-text">
            Default
        </div>
    </div>
    <input id="default" name="default" type="text" class="form-control" value="default">
</div>
<div class="input-group input-group-lg mt-3">
    <div class="input-group-prepend">
        <div class="input-group-text">
            Large
        </div>
    </div>
    <input id="large" name="large" type="text" class="form-control" value="value">
</div>
{% endraw %}
```html
<db-input-group size="small">
    <db-addon>Small</db-addon>
    <db-text-input name="small" widgetId="small" value="small" type="text"></db-text-input>
</db-input-group>
<db-input-group size="default">
    <db-addon>Default</db-addon>
    <db-text-input name="default" widgetId="default" value="default" type="text"></db-text-input>
</db-input-group>
<db-input-group size="large">
    <db-addon>Large</db-addon>
    <db-text-input name="large" widgetId="large" value="large" type="text"></db-text-input>
</db-input-group>
```

### Multiple inputs
{% raw %}
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="">First and last name</span>
  </div>
  <input type="text" class="form-control">
  <input type="text" class="form-control">
</div>
{% endraw %}
```html
<db-input-group>
    <db-addon>First and last name</db-addon>
    <db-text-input type="text"></db-text-input>
    <db-text-input type="text"></db-text-input>
</db-input-group>
```

## 通用属性

1. [Spacing](../Utilities/Spacing.html)
1. [Flex](../Utilities/Flex.html) 中的 Flex item 相关属性
1. [Float](../Utilities/Float.html)

## 属性

| 名称  | 说明 | 默认值 | 可选值 | 值类型 |
| ----- | ------ | ----- | ----- | --------- |
| widgetId | 标识 | | | string |
| size | 尺寸 | default | small, large, default | string |
| label | 文本 | | | string |

1. `InputGroup`的`label`会覆盖`TextInput`的`label`属性值