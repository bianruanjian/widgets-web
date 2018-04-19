---
title: Components
layout: components
footer: false
---

基于 dojo2 和 bootstrap 编写的一套组件。

1. 属性值设置为`default`, 等同于不设置该属性。
1. 在部件的设计中发现以下属性都在描述“是否水平铺满显示”，需考虑能否统一名称：
    1. `Container` 的 `fluidWidth` -> `Container` 的 `fluid`
    1. `Button` 的 `block` -> `Button` 的 `fluid`
    1. `Checkbox` 的 `inline` -> `Checkbox` 的 `fluid`
    1. `Radio` 的 `inline` -> `Radio` 的 `fluid`
    1. `Image` 的 `fluid` -> `Image` 的 `fluid`