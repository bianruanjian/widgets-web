---
title: Textarea
layout: components
footer: false
date: 2018-04-18 10:48:06
tags:
---

文本域部件

## 基本用法

### default
{% raw %}
<db-textarea widgetId="default-id" name="demo" label="demo" rows="3" cols="2" noResize="false" shouldFocus="true" marginTop="3" marginBottom="2"></db-textarea>
{% endraw %}
```html
<db-textarea widgetId="default-id" name="demo" label="demo" rows="3" cols="2" noResize="false" shouldFocus="true"></db-textarea>
```

### noRisize
{% raw %}
<db-textarea widgetId="noRisize-id" name="demo" label="demo" rows="3" cols="2" noResize="true" marginTop="3" marginBottom="2"></db-textarea>
{% endraw %}
```html
<db-textarea widgetId="noRisize-id" name="demo" label="demo" rows="3" cols="2" noResize="true"></db-textarea>
```

### disabled
{% raw %}
<db-textarea widgetId="disabled-id" name="demo" label="demo" rows="3" cols="2" noResize="false" disabled="true" marginTop="3" marginBottom="2"></db-textarea>
{% endraw %}
```html
<db-textarea widgetId="disabled-id" name="demo" label="demo" rows="3" cols="2" noResize="false" disabled="true"></db-textarea>
```

### readOnly
{% raw %}
<db-textarea widgetId="readOnly-id" name="demo" label="demo" rows="3" cols="2" noResize="false" readOnly="true" value="readOnly value" marginTop="3" marginBottom="2"></db-textarea>
{% endraw %}
```html
<db-textarea widgetId="readOnly-id" name="demo" label="demo" rows="3" cols="2" noResize="false" readOnly="true" value="readOnly value"></db-textarea>
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
| label | 文本 | | | string |
| rows | 行数 | | | number |
| cols | 列数 | | | number |
| size | 尺寸 | default | small, large, default | string |
| placeholder | 占位符 | | | string |
| placeholderAppearance | 占位符外观 | default | default | string |
| required | 必填 | false | true, false | boolean |
| disabled | 失效 | false | true, false | boolean |
| readOnly | 只读 | false | true, false | boolean |
| noResize | 禁止调节大小 | false | true，false | boolean |
| shouldFocus | 获取焦点 | false | true, false | boolean |
| plainText | 纯文本(无边框文本) | false | true, false | boolean |
| maxLength | 最大字符个数 | | | number |
| minLength | 最小字符个数 | | | number |
| invalidMessage | 无效提示 | | | string |
| validMessage | 有效提示 | | | string |