import { v, w } from '@dojo/framework/widget-core/d';
import { DNode, VNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, theme, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/framework/widget-core/registerCustomElement';
import { SpacingProperties, FlexItemProperties, FloatProperties, DisplayProperties } from '../common/interfaces';
import Label from '../label/index';

import * as css from './styles/input-group.m.css';
import { getSpacingClasses, getFlexItemClasses, getFloatClass, getDisplayClass } from '../common/util';

export const sizeMap: { [key: string]: string } = {
	small: 'sm',
	large: 'lg'
};

/**
 * @type InputGroupProperties
 *
 * Properties that can be set on input-group components
 */
export interface InputGroupProperties
	extends SpacingProperties,
		FlexItemProperties,
		FloatProperties,
		DisplayProperties,
		ThemedProperties {
	widgetId?: string;
	size?: string;
	label?: string;
	labelPosition?: string;
}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<InputGroupProperties>({
	tag: 'db-input-group',
	childType: CustomElementChildType.TEXT,
	attributes: [
		'widgetId',
		'size',
		'label',
		'labelPosition',
		'marginTop',
		'marginBottom',
		'marginLeft',
		'marginRight',
		'paddingTop',
		'paddingBottom',
		'paddingLeft',
		'paddingRight',
		'display',
		'alignSelf',
		'order',
		'float'
	],
	properties: [],
	events: []
})
@theme(css)
export class InputGroupBase<P extends InputGroupProperties = InputGroupProperties> extends ThemedBase<P> {
	protected getKey() {
		return 'input-group';
	}
	protected renderInputGroup(key: string | undefined): DNode[] {
		const { widgetId, size, label, display, labelPosition } = this.properties;

		let sizeClass: string = '';

		if (size && size !== 'default') {
			sizeClass = `input-group-${sizeMap[size as string]}`;
		}

		let classes =
			key === undefined
				? ['input-group', sizeClass]
				: [
						'input-group',
						sizeClass,
						...getSpacingClasses(this.properties),
						display ? getDisplayClass(this.properties) : undefined,
						...getFlexItemClasses(this.properties as FlexItemProperties),
						...getFloatClass(this.properties)
				  ];

		if (!(label && labelPosition && labelPosition === 'left')) {
			classes.push(this.theme(css.root) as string);
		}

		return [
			label
				? w(Label, {
						value: label,
						classes: ['col-form-label', 'mr-3']
				  })
				: null,
			v(
				'div',
				{
					id: widgetId,
					key,
					classes
				},
				this.reOrderChildren()
			)
		];
	}

	protected reOrderChildren() {
		// 属性 position 需要结合子部件的位置来实现效果，故在此由程序根据 position 的值来自动调整子部件的位置
		const prependChildren: VNode[] = [];
		const inputChildren: VNode[] = [];
		const appendChildren: VNode[] = [];
		this.children.forEach((child, index) => {
			if (child) {
				const childNode = child as VNode;
				const childKey = childNode.properties.key;
				const position = childNode.properties.position;

				if (childKey === 'addon') {
					if (position && position === 'append') {
						appendChildren.push(childNode);
					} else {
						prependChildren.push(childNode);
					}
				} else {
					inputChildren.push(childNode);
				}
			}
		});
		return [...prependChildren, ...inputChildren, ...appendChildren];
	}

	protected render(): DNode | DNode[] {
		const { label, labelPosition, display } = this.properties;

		/**
		 * bootstrap 中有三种 inline 实现：
		 * 1. inline forms, 在 form 表单外放一个 inline form 布局管理器实现的,相当于 android 的水平 linearlayout；
		 * 2. checkbox inline，直接处理每个 form 表单和 label；
		 * 3. Form Grid 中的 Horizontal form，使用 Grid 布局，但是 Label 的宽度无法动态调整为任意值。
		 *
		 * 现在使用 第二种实现，当有更好的实现时，再完善此处代码。
		 */
		if (label && labelPosition && labelPosition === 'left') {
			return v(
				'div',
				{
					key: this.getKey(),
					classes: [
						this.theme(css.root),
						'form-group',
						'form-check-inline',
						'w-100',
						...getSpacingClasses(this.properties),
						display ? getDisplayClass(this.properties) : undefined,
						...getFlexItemClasses(this.properties as FlexItemProperties),
						...getFloatClass(this.properties)
					]
				},
				this.renderInputGroup(undefined)
			);
		}

		return this.renderInputGroup(this.getKey());
	}
}

export default class InputGroup extends InputGroupBase<InputGroupProperties> {}
