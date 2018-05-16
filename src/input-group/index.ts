import { v, w } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import { SpacingProperties, FlexItemProperties, FloatProperties, DisplayProperties } from '../common/interfaces';
import { Label } from '../label/index';

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
		WidgetProperties {
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
export class InputGroup<P extends InputGroupProperties = InputGroupProperties> extends ThemedBase<P> {
	protected renderInputGroup(): DNode[] {
		const { widgetId, size, label, display } = this.properties;

		let sizeClass: string = '';

		if (size && size !== 'default') {
			sizeClass = `input-group-${sizeMap[size as string]}`;
		}

		let flexItemClasses: string[] = [];

		if (display && (display === 'flex' || display === 'inlineFlex')) {
			flexItemClasses = getFlexItemClasses(this.properties as FlexItemProperties);
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
					key: 'input-group',
					classes: [
						'input-group',
						sizeClass,
						...getSpacingClasses(this.properties),
						display ? getDisplayClass(this.properties) : undefined,
						...flexItemClasses,
						...getFloatClass(this.properties)
					]
				},
				this.children
			)
		];
	}

	protected render(): DNode | DNode[] {
		const { label, labelPosition } = this.properties;

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
					classes: ['form-group', 'form-check-inline', 'w-100']
				},
				this.renderInputGroup()
			);
		}

		return this.renderInputGroup();
	}
}

export default InputGroup;
