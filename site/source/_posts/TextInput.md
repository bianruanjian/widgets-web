---
title: TextInput
date: 2018-03-22 20:10:52
tags:
---

用于创建文本输入框，支持输入普通文本或限定范围的字符，如数字、密码和邮箱等。

## 基本用法

```html

```


## 属性

| 名称  | 说明 | 默认值 | 可选值 |值类型 |
| ----- | ------ | ----- | ----- | --------- |
| id    | 标识   |       |       | string |
| name  | 名称   |       |       | string |
| type  | 类型   | text  | text、password、email、number         | string |
| value | 值     |       |          | string     |
| label | 文本     |       |          | string     |
| placeholder | 占位符   |       |          | string     |
| required | 必填   | false  | true, false    | boolean     |
| disabled | 失效   | false  | true, false    | boolean     |
| readOnly | 只读   | false  | true, false    | boolean     |
| size | 尺寸     |       |   sm, lg       | string     |
| state | 状态     |       |   valid, invalid       | string     |
| plainText | 纯文本   | false  | true, false    | boolean     |


输入框有4种状态
1. 默认状态
2. 获取焦点
3. 数值有效
4. 数值无效

## 事件

