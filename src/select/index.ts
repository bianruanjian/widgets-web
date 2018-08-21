import { v, w } from '@dojo/framework/widget-core/d';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, theme, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/framework/widget-core/registerCustomElement';
import uuid from '@dojo/framework/core/uuid';
import Label from '../label';
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
		ThemedProperties {
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
	onInput?(value?: string | number | boolean): void;
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
	events: ['onInput']
})
@theme(css)
export class SelectBase<P extends SelectProperties = SelectProperties> extends ThemedBase<P> {
	private _uuid: string;

	protected getKey() {
		return 'select';
	}

	constructor() {
		super();
		this._uuid = uuid();
	}

	private _onInput(event: Event) {
		event.stopPropagation();
		this.properties.onInput && this.properties.onInput((event.target as HTMLInputElement).value);
	}

	protected renderSelect(key: string | undefined): DNode {
		const {
			widgetId = this._uuid,
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
			display,
			label,
			labelPosition
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
						key: index + uuid(),
						value: option[valueField],
						selected: option[valueField] === value
					},
					[option[labelField]]
				);
			});
		}

		if (dataPath) {
			//TODO: 发送请求，获取数据，暂时不处理
		}

		let classes =
			key === undefined
				? cssClasses
				: [
						...cssClasses,
						...getSpacingClasses(this.properties),
						display ? getDisplayClass(this.properties) : undefined,
						...getFlexItemClasses(this.properties as FlexItemProperties),
						...getFloatClass(this.properties)
				  ];

		if (!(label && labelPosition && labelPosition === 'left')) {
			classes.push(this.theme(css.root) as string);
		}

		return v(
			'select',
			{
				id: widgetId,
				key,
				name,
				disabled: disabled === true || disabled === 'true',
				required: required === true || required === 'true',
				readOnly: readOnly === true || readOnly === 'true',
				classes,
				oninput: this._onInput
			},
			children
		);
	}

	protected renderSelectWrapper(key: string | undefined): DNode[] {
		const { widgetId = this._uuid, label } = this.properties;

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
			this.renderSelect(key),
			renderMessageNode(this.properties)
		];
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
				this.renderSelectWrapper(undefined)
			);
		}

		return this.renderSelectWrapper(this.getKey());
	}
}

export default class Select extends SelectBase<SelectProperties> {}
