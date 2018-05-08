---
title: Addon
layout: components
footer: false
date: 2018-04-16 11:10:52
tags:
---

前缀/后缀插件

## 基本用法

因为当前浏览器不支持使用 Custom Elements 定义内置的部件，如 <button is='my-button'></button> 所以不能使用 Custom Elements，只能使用编程式开发。

### prepend
{% raw %}
<div class="input-group">
    <div class="input-group-prepend">
        <div class="input-group-text">
            $
        </div>
    </div>
    <input type="number" class="form-control">
</div>
{% endraw %}
```TypeScript
import { w } from '@dojo/widget-core/d';
import InputGroup from 'widgets-web/input-group/index';
import Addon from 'widgets-web/addon/index';
import TextInput from 'widgets-web/text-input/index';

w(InputGroup, {}, [
    w(Addon, {value: '$'});
    w(TextInput, {type: 'number'});
]);
```

### append
{% raw %}
<div class="input-group">
    <input type="number" class="form-control">
    <div class="input-group-append">
        <div class="input-group-text">
            $
        </div>
    </div>
</div>
{% endraw %}
```TypeScript
import { w } from '@dojo/widget-core/d';
import InputGroup from 'widgets-web/input-group/index';
import Addon from 'widgets-web/addon/index';
import TextInput from 'widgets-web/text-input/index';

w(InputGroup, {}, [
    w(TextInput, {type: 'number'});
    w(Addon, {value: '$', position:'append'});
]);
```

### Multiple addons
{% raw %}
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
    <input type="number" class="form-control">
</div>
<div class="input-group mt-3">
    <input type="number" class="form-control">
    <div class="input-group-append">
        <div class="input-group-text">
            $
        </div>
    </div>
    <div class="input-group-append">
        <div class="input-group-text">
            0.00
        </div>
    </div>
</div>
<div class="input-group mt-3">
    <div class="input-group-prepend">
        <div class="input-group-text">
            $
        </div>
    </div>
    <input type="number" class="form-control">
    <div class="input-group-append">
        <div class="input-group-text">
            0.00
        </div>
    </div>
</div>
{% endraw %}
```TypeScript
import { w } from '@dojo/widget-core/d';
import InputGroup from 'widgets-web/input-group/index';
import Addon from 'widgets-web/addon/index';
import TextInput from 'widgets-web/text-input/index';

w(InputGroup, {}, [
    w(Addon, {value: '$'});
    w(Addon, {value: '0.00'});
    w(TextInput, {type: 'number'});
]);
w(InputGroup, {}, [
    w(TextInput, {type: 'number'});
    w(Addon, {value: '$', position:'append'});
    w(Addon, {value: '0.00', position:'append'});
]);
w(InputGroup, {}, [
    w(Addon, {value: '$'});
    w(TextInput, {type: 'number'});
    w(Addon, {value: '0.00', position:'append'});
]);
```

### With textarea
{% raw %}
<div class="input-group">
  <div class="input-group-prepend">
    <span class="input-group-text">With textarea</span>
  </div>
  <textarea class="form-control"></textarea>
</div>
{% endraw %}
```TypeScript
import { w } from '@dojo/widget-core/d';
import InputGroup from 'widgets-web/input-group/index';
import Addon from 'widgets-web/addon/index';
import Textarea from 'widgets-web/textarea/index';

w(InputGroup, {}, [
    w(Addon, {value: 'With textarea'});
    w(Textarea, {});
]);
```

### With Checkbox and Radio
{% raw %}
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <div class="input-group-text">
        <input type="checkbox">
    </div>
  </div>
  <input type="text" class="form-control">
</div>

<div class="input-group">
  <div class="input-group-prepend">
    <div class="input-group-text">
        <input type="radio">
    </div>
  </div>
  <input type="text" class="form-control">
</div>
{% endraw %}
```ts
import { w } from '@dojo/widget-core/d';
import InputGroup from 'widgets-web/input-group/index';
import Addon from 'widgets-web/addon/index';
import TextInput from 'widgets-web/text-input/index';
import CheckBox from 'widgets-web/checkbox/index';
import Radio from 'widgets-web/radio/index';

w(InputGroup, {}, [
    w(Addon, {}, [
        w(CheckBox, {});
    ]);
    w(TextInput, {});
]);
w(InputGroup, {}, [
    w(Addon, {}, [
        w(Radio, {});
    ]);
    w(TextInput, {});
]);
```

### Button addons
{% raw %}
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <button class="btn btn-outline-secondary" type="button">Button</button>
  </div>
  <input type="text" class="form-control">
</div>

<div class="input-group">
  <input type="text" class="form-control">
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button">Button</button>
  </div>
</div>
{% endraw %}
```ts
import { w } from '@dojo/widget-core/d';
import InputGroup from 'widgets-web/input-group/index';
import Addon from 'widgets-web/addon/index';
import TextInput from 'widgets-web/text-input/index';
import Button from 'widgets-web/button/index';

w(InputGroup, {}, [
    w(Addon, {}, [
        w(Button, { appearance: 'outline-secondary', value: 'Button'});
    ]);
    w(TextInput, {});
]);
w(InputGroup, {}, [
    w(TextInput, {});
    w(Addon, { position:'append' }, [
        w(Button, { appearance: 'outline-secondary', value: 'Button'});
    ]);
]);
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