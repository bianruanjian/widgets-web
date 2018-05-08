---
title: Checkbox
layout: components
footer: false
date: 2018-04-18 10:48:06
tags:
---

复选框部件

## 基本用法

### default
{% raw %}
<db-checkbox widgetId="defaultDemo" name="demo" value="1" label="default"></db-checkbox>
{% endraw%}
```html
<db-checkbox widgetId="default" name="demo" value="1" label="default"></db-checkbox>
```

### disabled
{% raw %}
<db-checkbox widgetId="disabled" name="demo" value="1" label="disabled" disabled="true"></db-checkbox>
{% endraw%}
```html
<db-checkbox widgetId="disabled" name="demo" value="1" label="disabled" disabled="true"></db-checkbox>
```

### fluid
{% raw %}
<db-checkbox widgetId="fluidcheckbox1" name="demo" value="1" fluid="true" label="fluid demo1"></db-checkbox>
<db-checkbox widgetId="fluidcheckbox2" name="demo" value="1" fluid="true" label="fluid demo2"></db-checkbox>
<db-checkbox widgetId="normal1" name="demo" value="2" fluid="false" label="default demo1"></db-checkbox>
<db-checkbox widgetId="normal2" name="demo" value="2" fluid="false" label="default demo2"></db-checkbox>
{% endraw%}
```html
<db-checkbox widgetId="fluid1" name="demo" value="1" fluid="true" label="fluid demo1"></db-checkbox>
<db-checkbox widgetId="fluid2" name="demo" value="1" fluid="true" label="fluid demo2"></db-checkbox>
<db-checkbox widgetId="normal1" name="demo" value="2" fluid="false" label="default demo1"></db-checkbox>
<db-checkbox widgetId="normal2" name="demo" value="2" fluid="false" label="default demo2"></db-checkbox>
```

### without label
{% raw %}
<db-checkbox name="demo" value="1"></db-checkbox>
{% endraw%}
```html
<db-checkbox name="demo" value="1"></db-checkbox>
```

## 通用属性

1. [Spacing](../Utilities/Spacing.html)
1. [Flex](../Utilities/Flex.html) 中的 Flex item 相关属性
1. [Float](../Utilities/Float.html)

## 属性

| 名称  | 说明 | 默认值 | 可选值 | 值类型 |
| ----- | ------ | ----- | ----- | --------- |
| widgetId | 标识 | | | string |
| name | 名称 | | | string |
| value | 值 | | | string |
| checked | 是否选中 | false | true, false | boolean |
| label | 文本 | | | string |
| labelAfter | 文本后置 | true | true, false | boolean |
| disabled | 失效 | false | true, false | boolean |
| required | 必填 | false | true, false | boolean |
| readOnly | 只读 | false | true, false | boolean |
| fluid | 水平铺满 | false | true, false | boolean |
| size | 尺寸 | default | small, large, default | string |
| invalidMessage | 无效提示 | | | string |
| validMessage | 有效提示 | | | string |

1. `fluid` 为 `false` 时对应 bootstrap 中的 `.form-check-inline`