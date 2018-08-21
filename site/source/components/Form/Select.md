---
title: Select
layout: components
footer: false
date: 2018-03-22 20:10:52
tags:
---

下拉框部件

## 基本用法

### default
{% raw %}
<db-select options="[{'value': 'value1', 'label': 'label1'}, {'value': 'value2', 'label': 'label2'}]"
    widgetId="random-id" name="demo" label="demo" disabled="false" 
    labelField="label" valueField="value" marginTop="3" marginBottom="3"></db-select>
{% endraw %}
```html
<db-select options="[{'value': 'value1', 'label': 'label1'}, {'value': 'value2', 'label': 'label2'}]"
    widgetId="random-id" name="demo" label="demo" disabled="false" 
    labelField="label" valueField="value" marginTop="3"></db-select>
```

### disabled
{% raw %}
<db-select options="[{'value': 'value1', 'label': 'label1'}, {'value': 'value2', 'label': 'label2'}]"
    widgetId="disabled" name="demo" label="disabled" disabled="true" 
    labelField="label" valueField="value" marginTop="3" marginBottom="3"></db-select>
{% endraw %}
```html
<db-select options="[{'value': 'value1', 'label': 'label1'}, {'value': 'value2', 'label': 'label2'}]"
    widgetId="disabled" name="demo" label="disabled" disabled="true" 
    labelField="label" valueField="value" marginTop="3" marginBottom="3"></db-select>
```

### labelPosition is left
{% raw %}
<db-select options="[{'value': 'value1', 'label': 'label1'}, {'value': 'value2', 'label': 'label2'}]"
    widgetId="label-position-id" name="demo" label="Label" 
    labelField="label" valueField="value" labelPosition="left"></db-select>
{% endraw %}
```html
<db-select options="[{'value': 'value1', 'label': 'label1'}, {'value': 'value2', 'label': 'label2'}]"
    widgetId="label-position-id" name="demo" label="Label" 
    labelField="label" valueField="value" labelPosition="left"></db-select>
```

## 通用属性

1. [Spacing](../Utilities/Spacing.html)
1. [Display](../Utilities/Display.html)
1. [Flex](../Utilities/Flex.html) 中的 Flex item 相关属性
1. [Float](../Utilities/Float.html)

## 属性

| 名称  | 说明 | 默认值 | 可选值 | 值类型 |
| ----- | ------ | ----- | ----- | --------- |
| widgetId | 标识 | | | string |
| name | 名称 | | | string |
| value | 值 | | | string |
| label | 文本 | | | string |
| labelPosition | 文本位置 | top | top, left | string |
| disabled | 失效 | false | true, false | boolean |
| required | 必填 | false | true, false | boolean |
| readOnly | 只读 | false | true, false | boolean |
| options | 选项 | | | json array |
| labelField | 显示字段 | label | | string |
| valueField | 隐藏字段 | value | | string |
| dataPath | 数据路径 | | | string |
| size | 尺寸 | default | small, large, default | string |
| invalidMessage | 无效提示 | | | string |
| validMessage | 有效提示 | | | string |

1. options 格式
```json
[{"value": "value1", "label": "label1"}]
```

## 事件

| 名称  | 参数 | 描述 |
| ----- | ------ | ----- |
| onInput | `value: string | number | boolean` 用户输入的值 | 输入时触发 |
