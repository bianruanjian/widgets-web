---
title: TextInput
layout: components
footer: false
date: 2018-03-22 20:10:52
tags:
---

用于创建文本输入框，支持输入普通文本或限定范围的字符，如数字、密码和邮箱等。

## 基本用法


### default
{% raw %}
<db-text-input name="val" widgetId="defaultDemo" marginTop="2" alignSelf="start" type="text" label="default" placeholder="demo" required="true" maxLength="6"   invalidMessage="error" shouldFocus="true"></db-text-input>
{% endraw %}
```html
<db-text-input name="val" widgetId="default" marginTop="2" alignSelf="start" type="text" 
label="default" placeholder="demo" required="true" maxLength="6" 
invalidMessage="error" shouldFocus="true"></db-text-input>
```

### type
{% raw %}
<db-text-input name="val" type="text" label="text" value="text"></db-text-input>
<db-text-input name="val" type="text" password="true" label="password" value="password"></db-text-input>
<db-text-input name="val" type="email" label="email" value="support@bianruanjian.com"></db-text-input>
<db-text-input name="val" type="number" label="number" value="666"></db-text-input>
<db-text-input name="val" type="file" label="choose file"></db-text-input>
<db-text-input name="val" type="idCard" label="idCard"></db-text-input>
<db-text-input name="val" type="digit" label="digit" value='1.1'></db-text-input>
{% endraw %}
```html
<db-text-input name="val" type="text" label="text" value="text"></db-text-input>
<db-text-input name="val" type="text" password="true" label="password" value="password"></db-text-input>
<db-text-input name="val" type="email" label="email" value="support@bianruanjian.com"></db-text-input>
<db-text-input name="val" type="number" label="number" value="666"></db-text-input>
<db-text-input name="val" type="file" label="choose file"></db-text-input>
<db-text-input name="val" type="idCard" label="idCard"></db-text-input>
<db-text-input name="val" type="digit" label="digit" value='1.1'></db-text-input>
```

### size
{% raw %}
<db-text-input name="val" type="text" label="small" value="small" size="small"></db-text-input>
<db-text-input name="val" type="text" label="default" value="default" size="default"></db-text-input>
<db-text-input name="val" type="text" label="large" value="large" size="large"></db-text-input>
{% endraw %}
```html
<db-text-input name="val" type="text" label="small" value="small" size="small"></db-text-input>
<db-text-input name="val" type="text" label="default" value="default" size="default"></db-text-input>
<db-text-input name="val" type="text" label="large" value="large" size="large"></db-text-input>
```

### readOnly
{% raw %}
<db-text-input name="val" widgetId="readOnly-id" marginTop="2" type="text" label="readOnly" readOnly="true"
    invalidMessage="error" value="readOnly value"></db-text-input>
{% endraw %}
```html
<db-text-input name="val" widgetId="readOnly-id" marginTop="2" type="text" label="readOnly" readOnly="true"
    invalidMessage="error" value="readOnly value"></db-text-input>
```

### plain text
{% raw %}
<db-text-input name="val" widgetId="plain-text-id" marginTop="2" type="text" label="plainText" readOnly="true"
     plainText="true" invalidMessage="error" value="plainText value"></db-text-input>
{% endraw %}
```html
<db-text-input name="val" widgetId="plain-text-id" marginTop="2" type="text" label="plainText" readOnly="true"
     plainText="true" invalidMessage="error" value="plainText value"></db-text-input>
```

### labelPosition is left
{% raw %}
<db-text-input name="val" widgetId="label-position-id" type="text" label="Label" labelPosition="left"></db-text-input>
{% endraw %}
```html
<db-text-input name="val" widgetId="label-position-id" type="text" label="Label" labelPosition="left"></db-text-input>
```

## 通用属性

1. [Spacing](../Utilities/Spacing.html)
1. [Flex](../Utilities/Flex.html) 中的 Flex item 相关属性
1. [Float](../Utilities/Float.html)

## 属性

| 名称  | 说明 | 默认值 | 可选值 |值类型 |
| ----- | ------ | ----- | ----- | --------- |
| widgetId | 标识 | | | string |
| name | 名称 | | | string |
| type | 类型 | default | text, email, number, file, idCard, digit(必须带小数点), default | string |
| password | 密码 | false | true, false | boolean |
| value | 值 | | | string |
| label | 文本 | | | string |
| labelPosition | 文本位置 | top | top, left | string |
| placeholder | 占位符 | | | string |
| placeholderAppearance | 占位符外观 | default | default | string |
| required | 必填 | false | true, false | boolean |
| disabled | 失效 | false | true, false | boolean |
| readOnly | 只读 | false | true, false | boolean |
| size | 尺寸 | default | small, large, default | string |
| shouldFocus | 获取焦点 | false | true, false | boolean |
| plainText | 纯文本(无边框文本) | false | true, false | boolean |
| maxLength | 最大字符个数 | | | number |
| minLength | 最小字符个数 | | | number |
| invalidMessage | 无效提示 | | | string |
| validMessage | 有效提示 | | | string |

## 事件

| 名称  | 参数 | 描述 |
| ----- | ------ | ----- |
| onInput | | 输入时触发 |
| onChange | | 修改后触发 |

## 待讨论

密码强度：低、中、高

## 注意事项

textInput 有四个状态
1. 获取焦点 focus,
1. 输入有效 valid,
1. 输入无效 invalid,
1. 默认状态 default。

focus 属性包含页面加载完后自动获取焦点(`autoFocus`)、手动调用获取焦点(`focus()`)两个情况