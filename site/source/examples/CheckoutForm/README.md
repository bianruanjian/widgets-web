---
title: README
date: 2018-07-10 14:23:53
layout: examples
footer: false
---

## 页面结构

1. 页面级内容区(Container, 最大宽度 960px)
    1. 标题区(View 文本居中，顶内边距5号，底内边距5号)
        1. Logo(Image 宽72px，高72px，左右居中，底外边距4号)
        1. 标题(Text h2) `Checkout form`
        1. 说明(Text lead) `Below is an example form built entirely with Bootstrap's form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.`
    1. 内容区(GridRow)
        1. 左栏（GridColumn 8列）
            1. 左栏标题(Text h4，底外边距3号) `Billing address`
            1. Form 容器(暂使用 View 代替)
                1. 第一行(GridRow)
                    1. 第一列(GridColumn 6列，底外边距3号) 
                        1. TextInput label `First Name`
                    1. 第二列(GridColumn 6列，底外边距3号) 
                        1. TextInput label `Last Name`
                1. 第二行(View 底外边距3号) 
                    1. InputGroup label `UserName`
                        1. 前缀 `@`
                        1. 输入框提示信息 `UserName`
                1. 第三行(View 底外边距3号)
                    1. TextInput label `Email(Optional)`
                        1. 输入框提示信息 `you@example.com`
                1. 第四行(View 底外边距3号)
                    1. TextInput label `Address`
                        1. 输入框提示信息 `1234 Main St`
                1. 第五行(View 底外边距3号)
                    1. TextInput label `Address 2(Optional)`
                        1. 输入框提示信息 `Apartment or suite`
                1. 第六行(GridRow)
                    1. 第一列(GridColumn 5列，底外边距3号) 
                        1. Select label `Country`
                            1. 选项 `Choose...`,`United States`
                    1. 第二列(GridColumn 4列，底外边距3号) 
                        1. Select label `State`
                            1. 选项 `Choose...`,`California`
                    1. 第三列(GridColumn 3列，底外边距3号) 
                        1. TextInput label `Zip`
                1. 第七行 分割线(View 底外边距4号)
                1. 第八行 Checkbox  `Shipping address is the same as my billing address`
                1. 第九行 Checkbox  `Save this information for next time`
                1. 第十行 分割线(View 底外边距4号, 顶外边距4号)
                1. 第十一行 支付方式标题(Text h4, 底外边距3号) `Payment`
                1. 第十二行 支付方式区(View block, 顶边距3号，底边距3号)
                    1. 第一项 信用卡(Radio, name:paymentMethod, id:credit, 单行显示) `Credit card` 
                    1. 第二项 借记卡(Radio, name:paymentMethod, id:debit, 单行显示) `Debit card`
                    1. 第三项(Radio, name:paymentMethod, id:paypal, 单行显示) `PayPal` 
                1. 第十三行 信用卡信息区(GridRow)
                    1. 第一列 持卡人姓名(GridColumn，6列,底外边距3号) 
                        1. TextInput label `Name on card`
                            1. 帮助文本 `Full name as displayed on card`
                    1. 第二列 信用卡号码(GridColumn，6列,底外边距3号) 
                        1. TextInput label `Credit card number`
                1. 第十四行 信用卡校验区(GridRow)
                    1. 第一列 信用卡有效期(GridColumn 3列,底外边距3号)
                        1. TextInput label `Expiration` 
                    1. 第二列 信用卡验证码(GridColumn 3列,底外边距3号)
                        1. TextInput label `CVV` 
                1. 第十五行 分割线(View 底外边距4号)
                1. 第十六行 继续支付按钮(Button 主色，大，铺满父容器) `Continue to checkout`
        1. 右栏（GridColumn 4列，底外边距4号）
            1. 右栏标题区(Text h4,左右布局，底外边距3号)
                1. 标题(颜色：text-muted) `Your cart`
                1. 徽标(Badge 圆形) `3`
            1. 购物清单区(ListGroup 底外边距3号)
                1. 清单1(ListItem 左右布局)
                    1. 物品信息区(View)
                        1. 物品名称(Text h6,顶外边距0，底外边距0) `Product name`
                        1. 物品描述(Text small,text-muted) `Brief description`
                    1. 物品价格区(Text text-muted) `$12`
                1. 清单2(ListItem 左右布局)
                    1. 物品信息区(View)
                        1. 物品名称(Text h6,顶外边距0，底外边距0) `Second product`
                        1. 物品描述(Text small,text-muted) `Brief description`
                    1. 物品价格区(Text text-muted) `$8`
                1. 清单3(ListItem 左右布局)
                    1. 物品信息区(View)
                        1. 物品名称(Text h6,顶外边距0，底外边距0) `Third item`
                        1. 物品描述(Text small,text-muted) `Brief description`
                    1. 物品价格区(Text text-muted)`$5`
                1. 优惠码(ListItem 左右布局)
                    1. 物品信息区(View text-success)
                        1. 物品名称(Text h6,顶外边距0，底外边距0) `Promo code`
                        1. 物品描述(Text small) `EXAMPLECODE`
                    1. 物品价格区(Text text-success) `-$5`
                1. 合计(ListItem 左右布局)
                    1. 合计文本(Text) `Total (USD)`
                    1. 总价(Text 加粗) `$20`
            1. 优惠码添加区 (Card p-2)
                1. 优惠码输入(InputGroup)
                    1. TextInput 提示信息 `Promo code`
                    1. 后缀按钮文本(Button 颜色：secondary) `Redeem`
    1. 底部区(Footer 顶外边距5号，底外边距5号，顶内边距5号,文字居中，灰色，字体小号)
        1. 版权说明(Text p,底外边距1号)  `© 2017-2018 Company Name`
        1. 底部链接区(ListGroup)
            1. ListItem
                1. Link `Privacy`
            1. ListItem
                1. Link `Terms`
            1. ListItem 
                1. Link `Support`