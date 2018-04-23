---
title: TextInput
layout: components
footer: false
date: 2018-03-22 20:10:52
tags:
---

用于创建文本输入框，支持输入普通文本或限定范围的字符，如数字、密码和邮箱等。

## 基本用法


### normal
{% raw %}
<db-container>
    <db-text-input name="val" widgetId="random-id" marginTop="2" alignSelf="start" type="text" password="true" label="normal" placeholder="write down" required="true" maxLength="6"   invalidMessage="error" focus="true"></db-text-input>
</db-container>
{% endraw %}
```html
<db-container>
    <db-text-input name="val" widgetId="random-id" alignSelf="start" marginTop="2"
    type="text" password="true" label="normal" placeholder="write down" 
    required="true" maxLength="6" invalidMessage="error" focus="true">
    </db-text-input>
</db-container>
```

### readOnly
{% raw %}
<db-container>
    <db-text-input name="val" widgetId="random-id" marginTop="2" type="text" label="readOnly" readOnly="true"
    placeholder="write down" invalidMessage="error" value="readOnly value"></db-text-input>
</db-container>
{% endraw %}
```html
<db-container>
    <db-text-input name="val" widgetId="random-id" marginTop="2" readOnly="true"
    type="text" label="readOnly" placeholder="write down" 
    invalidMessage="error" value="readOnly value">
    </db-text-input>
</db-container>
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
| type | 类型 | default | text, email, number, idCard, digit(必须带小数点), default | string |
| password | 密码 | false | true, false | boolean |
| value | 值 | | | string |
| label | 文本 | | | string |
| placeholder | 占位符 | | | string |
| placeholderAppearance | 占位符外观 | default | default | string |
| required | 必填 | false | true, false | boolean |
| disabled | 失效 | false | true, false | boolean |
| readOnly | 只读 | false | true, false | boolean |
| size | 尺寸 | default | small, large, default | string |
| focus | 获取焦点 | false | true, false | boolean |
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