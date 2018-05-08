---
title: Addon
layout: components
footer: false
date: 2018-04-16 11:10:52
tags:
---

前缀/后缀插件

## 基本用法

{% raw %}
<db-container>
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
        <input name="addon" type="number" class="form-control">
    </div>
</db-container>
{% endraw %}
```html
<db-container>
    <db-addon value="$"></db-addon>
    <db-addon value="0.00"></db-addon>
    <db-text-input name="addon" type="number"></db-text-input>
</db-container>
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