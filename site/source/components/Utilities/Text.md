---
title: Text
date: 2018-04-09 14:23:53
layout: components
footer: false
tags:
---

## 属性

| 名称  | 说明 | 默认值 | 可选值 | 值类型 |
| ----- | ------ | ----- | ----- | --------- |
| fontWeight | 粗细 | default | light, normal, bold, default | string |
| fontItalic | 斜体 | false | true, false | boolean |
| underLine | 下划线 | false | true, false | boolean |
| strikeThrough | 删除线 | false | true, false | boolean |
| alignment | 对齐方式 | default | left, center, right, default | string |
| transform | 转化 | default | lowerCase, upperCase, capitalize, default | string |
| truncate | 截取长度 | default | default, 数字, 百分数 | number/string |
| wrap | 包装长度 | 0 | | number |

truncate
1. `truncate`的值为`0`时，表示超过父容器宽度时截取;
1. `truncate`的值可有`default`, 表示不设置该样式;
1. `truncate`的值为数字时单位是`px`.

wrap
1. `wrap`的值为数字时单位是`rem`.