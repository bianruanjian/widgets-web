# @dojo/test-extras

[![Build Status](https://travis-ci.org/dojo/test-extras.svg?branch=master)](https://travis-ci.org/dojo/test-extras)  
[![codecov](https://codecov.io/gh/dojo/test-extras/branch/master/graph/badge.svg)](https://codecov.io/gh/dojo/test-extras)  
[![npm version](https://badge.fury.io/js/%40dojo%2Ftest-extras.svg)](http://badge.fury.io/js/%40dojo%2Ftest-extras)  

为测试以及断言 Dojo2 部件的预期虚拟 dom 节点和行为提供一个简单的应用程序接口

## 功能

 * 简单的, 熟悉的 和 最短的 应用程序接口
 * 专注于测试 Dojo2 虚拟 dom 结构
 * 没有默认的 dom 必要条件
 * 全功能以及 tsx 支持

## harness

与 `@dojo/test-extras` 一起工作时 `harness()` 是最主要的 API, 本质上创建每个测试并且提供一个上下文去执行虚拟 dom 节点断言和交互。
设计 `harness()` 是为了当更新属性、子部件和部件失效，以及没有特定的或者自定义的必要逻辑的时候，反映部件的核心行为。

### API

```ts
harness(renderFunction: () => WNode, customComparators?: CustomComparator[]): Harness;
```

* `renderFunction`: 一个在测试时为部件返回一个 WNode 的方法
* `customComparators`: 自定义比较的描述器数组。  每个描述器提供一个比较当用一个选择器选择部件的属性名称与属性做比较的方法。

harness 返回一个提供一个小的为了与测试时部件交互的 API 的 `Harness` 对象：

`Harness`

* `expect`: 执行一个在测试时不需要为部件整个渲染输出的断言。
* `expectPartial`: 执行一个在测试时不需要为部件渲染输出一部分的断言。
* `trigger`: 被用来在测试的 API 中在部件的一个节点上触发一个方法。
* `getRender`: 根据提供的索引从 harness 返回一个渲染器

从 `@dojo/widget-core` 用 `w()` 方法创建一个测试用的部件是简单、熟悉的：

```ts
class MyWidget extends WidgetBase<{foo: string; }> {
	protected render() {
		const { foo } = this.properties;
		return v('div', { foo }, this.children);
	}
}

const h = harness(() => w(MyWidget, { foo: 'bar'}, [ 'child' ]));
```
harness 也支持 `tsx` ，好处下面展示。本文档剩余部分，例子会使用编程式的 `w()` API，在[单元测试]里有更多的 `tsx` 例子。

```ts
const h = harness(() => <MyWidget foo='bar'>child</MyWidget>);
```

`renderFunction` 使用延迟执行的，因此它可以包含额外的逻辑去在断言中操作部件的 `properties` 和 `children`。

```ts
let foo = 'bar';
const h = harness(() => {
	return w(MyWidget, { foo }, [ 'child' ]);
});

h.expect(/** assertion that includes bar **/);
// update the property that is passed to the widget
foo = 'foo';
h.expect(/** assertion that includes foo **/);
```

### 自定义比较器

在测试时某些情况下一个属性的精确值是不能知道的，因此将需要自定义的比较描述器。

这些描述器有一个定位虚拟节点来检查的 `selector` ，自定义的比较方法通过一个属性名称收到这实际值并为断言返回一个布尔值。

```ts
const compareId = {
	selector: '*', //all nodes
	property: 'id',
	comparator: (value: any) => typeof value === 'string' // checks the property value is a string
};

const h = harness(() => w(MyWidget, {}), [ compareId ]);
```

为所有断言，使用该 `comparator` 而不是标准的比较器，使用返回的 `harness` API 现在将只测试识别的 `id` 属性

## 选择器

为了断言和操作，`harness` APIs 通常在目标节点包括虚拟节点支持一个概念的 CSS 样式。复习[full list of supported selectors](https://github.com/fb55/css-select#supported-selectors)来获取更多信息.

另外，在标准API中:

* `@` 标志针对一个节点的 `key` 属性作为速记被支持
* 当用标准速记 `.` 针对类时 `classes` 属性被用来替代 `class`

## `harness.expect`

最一般的方法来测试断言一个部件的 `render` 方法的结构输出。在测试时 `expect` 接受一个从部件中返回期望的输出的渲染方法。

API

```ts
expect(expectedRenderFunction: () => DNode | DNode[], actualRenderFunction?: () => DNode | DNode[]);
```

* `expectedRenderFunction`: 一个从查询的节点中返回期望的 `DNode` 结构的方法
* `actualRenderFunction`: 一个可选的返回断言的实际 `DNode` 结构的方法

```ts
h.expect(() => v('div', { key: 'foo'}, [
	w(Widget, { key: 'child-widget' }),
	'text node',
	v('span', { classes: [ 'class' ] })
]));
```

可选地 `expect` 可以接受一个第二参数的返回一个断言对立的渲染结果的方法。

```ts
h.expect(() => v('div', { key: 'foo'}), () => v('div', { key: 'foo' }));
```

如果实际的渲染输出与期望的渲染输出是不同的，一个以一个结构化的以 `(A)` (实际值)和 `(E)` (期望值)来指示所有的不同的可视器的异常会被抛出。

Example assertion failure output:

```ts
v("div", {
	"classes": [
		"root",
(A)		"other",
(E)		"another"
	],
	"onclick": "function"
}, [
	v("span", {
		"classes": "span",
		"id": "random-id",
		"key": "label",
		"onclick": "function",
		"style": "width: 100px"
	}, [
		"hello 0"
	]),
	w(ChildWidget, {
		"id": "random-id",
		"key": "widget"
	}),
	w("registry-item", {
		"id": "random-id",
		"key": "registry"
	})
]);
```

### `harness.expectPartial`

`expectPartial` 断言了基于一个 `selector` 的部件的渲染输出的一部分。

API

```ts
expectPartial(selector: string, expectedRenderFunction: () => DNode | DNode[]);
```

* `selector`: 选择查询出目标节点
* `expectedRenderFunction`: 一个从查询的节点中返回期望的 `DNode` 结构的方法
* `actualRenderFunction`: 一个可选的返回断言的实际 `DNode` 结构的方法

示例:

```ts
h.expectPartial('@child-widget', () => w(Widget, { key: 'child-widget' }));
```

#### `harness.trigger`

`harness.trigger()` 调用了一个被 `selector` 选中的节点名称的方法。

```ts
interface FunctionalSelector {
	(node: VNode | WNode): undefined | Function;
}

trigger(Selector: string, functionSelector: string | FunctionalSelector: ...args: any[]): any;
```

* `selector`: 选择器选择查询出目标节点
* `functionSelector`: 不管来自节点的属性的被调用方法的名称，还是一个功能性的返回来自一个节点属性的方法的选择器
* `args`: 调用选择的方法的参数

如果这方法返回的话，返回该方法的结果。

实例:

```ts
// 调用第一个有 key 为 `foo` 的节点的 `onclick` 方法
h.trigger('@foo', 'onclick');
```

```ts
// 调用第一个有 key 为 `bar` 并且 传递 `100` 的参数的 `customFunction` 方法
// 并且接收被调用方法的结果
const result = h.trigger('@bar', 'customFunction', 100);
```

#### `harness.getRender`

`harness.getRender()` 返回给定的索引的渲染，当没有索引时，返回最后的渲染。

```ts
getRender(index?: number);
```

* `index`: 返回渲染结果的索引

示例:

```ts
// 返回最后一个渲染的结果
const render = h.getRender();
```

```ts
// 返回给定索引的渲染结果
h.getRender(1);
```


## 我该怎么贡献?

我们欢迎您的参与！ 请参考 [Dojo Meta Repository](https://github.com/dojo/meta#readme) 来作为贡献指导方针。

### 编码风格

本仓库使用 `prettier` 作为编码风格以及格式化。一个预先提交的 hook 会被自动安装并且配置去运行 `prettier` 组织所有的排版好的文件作为预先配置好的项目的 `package.json`。

一个特定的 npm 脚本来执行 `prettier` (默认设置 `true`) 组织所有的 `src` 和 `test` 项目文件通过运行是可见的：

```bash
npm run prettier
```

### 安装

为了开始与该包工作，复制该仓库并且运行 `npm install`。

为了编译该项目，执行 `grunt dev` 或 `grunt dist`。

## 测试

测试用例必须通过 Intern 通过对象测试接口以及断言断言接口编写。

所有提交到该仓库的代码必须达到90% 的分支覆盖率，因为为所有支持的平台通过 istanbul 的包含覆盖率结果 会被报告。

为了在节点上本地测试，执行：

`grunt test`

以一个本地服务来测试支持的浏览器，执行：

`grunt test:local`

为了测试支持的浏览器栈或者移动平台，执行：

`grunt test:browserstack`

或者

`grunt test:saucelabs`

## 许可证信息

© 2018 [JS Foundation](https://js.foundation/). [New BSD](http://opensource.org/licenses/BSD-3-Clause) license.