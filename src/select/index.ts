import { v, w } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import { Label } from '../label';
import {
	SpacingProperties,
	FlexItemProperties,
	FloatProperties,
	FormProperties,
	MessageProperties,
	DisplayProperties
} from '../common/interfaces';
import {
	formSizeMap,
	getSpacingClasses,
	getFlexItemClasses,
	getFloatClass,
	renderMessageNode,
	getDisplayClass
} from '../common/util';

import * as css from './styles/select.m.css';

/**
 * @type SelectProperties
 *
 * Properties that can be set on select components
 */
export interface SelectProperties
	extends SpacingProperties,
		FlexItemProperties,
		FloatProperties,
		FormProperties,
		MessageProperties,
		DisplayProperties,
		WidgetProperties {
	widgetId?: string;
	name?: string;
	value?: string;
	label?: string;
	labelPosition?: string;
	// TODO: 使用 string 类型还是 any[] 类型
	options?: string;
	labelField?: string;
	valueField?: string;
	dataPath?: string;
	size?: string;
}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<SelectProperties>({
	tag: 'db-select',
	childType: CustomElementChildType.TEXT,
	attributes: [
		'widgetId',
		'name',
		'value',
		'label',
		'labelPosition',
		'disabled',
		'required',
		'readOnly',
		'options',
		'labelField',
		'valueField',
		'dataPath',
		'size',
		'invalidMessage',
		'validMessage',
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
export class Select<P extends SelectProperties = SelectProperties> extends ThemedBase<P> {
	protected renderSelect(): DNode {
		const {
			widgetId,
			name,
			value,
			disabled,
			required,
			readOnly,
			options,
			labelField,
			valueField,
			dataPath,
			size,
			display
		} = this.properties;

		const cssClasses: string[] = [];

		if (disabled === true || disabled === 'true') {
			cssClasses.push('disabled');
		}

		if (size) {
			cssClasses.push(formSizeMap[size as string]);
		}

		cssClasses.push('form-control');

		let children: DNode[] = [];

		if (options) {
			// 不使用 JSON.parse() 将 json 转为数组的原因是 JSON.parse() 不支持单引号,且不支持转义符
			let optionJson: any[] = eval(options as string);
			children = optionJson.map((option, index) => {
				return v(
					'option',
					{
						value: option[valueField],
						selected: value && value === option[valueField]
					},
					[option[labelField]]
				);
			});
		}

		if (dataPath) {
			//TODO: 发送请求，获取数据，暂时不处理
		}

		let flexItemClasses: string[] = [];

		if (display && (display === 'flex' || display === 'inlineFlex')) {
			flexItemClasses = getFlexItemClasses(this.properties as FlexItemProperties);
		}

		return v(
			'select',
			{
				id: widgetId,
				key: 'select',
				name,
				disabled: disabled === true || disabled === 'true',
				required: required === true || required === 'true',
				readOnly: readOnly === true || readOnly === 'true',
				classes: [
					...cssClasses,
					...getSpacingClasses(this.properties),
					display ? getDisplayClass(this.properties) : undefined,
					...flexItemClasses,
					...getFloatClass(this.properties)
				]
			},
			children
		);
	}

	protected renderSelectWrapper(): DNode[] {
		const { widgetId, label } = this.properties;

		return [
			label
				? w(
						Label,
						{
							value: label,
							forId: widgetId,
							classes: ['col-form-label', 'mr-3']
						},
						[]
				  )
				: null,
			this.renderSelect(),
			renderMessageNode(this.properties)
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
				this.renderSelectWrapper()
			);
		}

		return this.renderSelectWrapper();
	}
}

export default Select;
