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
<db-container>
    <div class="input-group input-group-sm">
        <input id="small" name="small" type="text" class="form-control mt-3" value="value">
    </div>
    <div class="input-group">
        <input id="default" name="default" type="text" class="form-control mt-3" value="default">
    </div>
    <div class="input-group input-group-lg">
        <input id="large" name="large" type="text" class="form-control mt-3" value="value">
    </div>
</db-container>
{% endraw %}
```html
<db-container>
    <db-input-group size="small">
        <db-text-input name="small" widgetId="small" value="small" type="text" marginTop="3"></db-text-input>
    </db-input-group>
    <db-input-group size="default">
        <db-text-input name="default" widgetId="default" value="default" type="text" marginTop="3"></db-text-input>
    </db-input-group>
    <db-input-group size="large">
        <db-text-input name="large" widgetId="large" value="large" type="text" marginTop="3"></db-text-input>
    </db-input-group>
</db-container>  
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