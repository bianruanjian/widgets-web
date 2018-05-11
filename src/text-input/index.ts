import { v, w } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import Focus from '@dojo/widget-core/meta/Focus';
import {
	SpacingProperties,
	FlexItemProperties,
	FloatProperties,
	FormProperties,
	MessageProperties
} from '../common/interfaces';
import { Label } from '../label';
import { getSpacingClasses, getFlexItemClasses, getFloatClass, renderMessageNode, formSizeMap } from '../common/util';

import * as css from './styles/text-input.m.css';

export type TextInputType = 'text' | 'email' | 'number' | 'file' | 'password' | 'idCard' | 'digit' | 'default';
/**
 * @type TextInputProperties
 *
 * Properties that can be set on TextInput components
 */
export interface TextInputProperties
	extends FormProperties,
		SpacingProperties,
		FlexItemProperties,
		FloatProperties,
		MessageProperties {
	widgetId?: string;
	name?: string;
	type?: TextInputType;
	password?: boolean | string;
	value?: string;
	label?: string;
	labelPosition?: string;
	placeholder?: string;
	placeholderAppearance?: string;
	size?: string;
	shouldFocus?: boolean | string;
	plainText?: boolean | string;
	maxLength?: number;
	minLength?: number;
	onInput?(value: string): void;
	onChange?(value: string): void;
}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<TextInputProperties>({
	tag: 'db-text-input',
	attributes: [
		'widgetId',
		'name',
		'type',
		'password',
		'value',
		'label',
		'labelPosition',
		'placeholder',
		'placeholderAppearance',
		'required',
		'disabled',
		'readOnly',
		'size',
		'shouldFocus',
		'plainText',
		'maxLength',
		'minLength',
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
		'alignSelf',
		'order',
		'float'
	],
	properties: [],
	events: ['onInput', 'onChange']
})
@theme(css)
export class TextInput<P extends TextInputProperties = TextInputProperties> extends ThemedBase<P, null> {
	private _onInput(event: Event) {
		event.stopPropagation();
		this.properties.onInput && this.properties.onInput((event.target as HTMLInputElement).value);
	}

	private _onChange(event: Event) {
		event.stopPropagation();
		this.properties.onChange && this.properties.onChange((event.target as HTMLInputElement).value);
	}

	protected renderInput(): DNode {
		let {
			widgetId,
			name,
			type,
			value,
			password,
			placeholder,
			disabled,
			required,
			readOnly,
			maxLength,
			minLength,
			size,
			shouldFocus,
			plainText
		} = this.properties;

		const cssClasses: string[] = [];

		if (shouldFocus) {
			this.meta(Focus).set('text-input');
		}

		if (password === true || password === 'true') {
			type = 'password';
		}

		if (disabled === true || disabled === 'true') {
			cssClasses.push('disabled');
		}

		if (size) {
			cssClasses.push(formSizeMap[size as string]);
		}

		if (plainText === true || plainText === 'true') {
			cssClasses.push('form-control-plaintext');
		} else {
			cssClasses.push('form-control');
		}

		return v(
			'input',
			{
				id: widgetId,
				key: 'text-input',
				name,
				type: type && type !== 'default' ? type : '',
				value,
				placeholder,
				disabled: disabled === true || disabled === 'true',
				required: required === true || required === 'true',
				readOnly: readOnly === true || readOnly === 'true',
				maxlength: maxLength ? `${maxLength}` : null,
				minlength: minLength ? `${minLength}` : null,
				classes: [
					...cssClasses,
					...getSpacingClasses(this.properties),
					...getFlexItemClasses(this.properties),
					...getFloatClass(this.properties)
				],
				oninput: this._onInput,
				onchange: this._onChange
			},
			[]
		);
	}

	protected renderTextInput(): DNode[] {
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
			this.renderInput(),
			renderMessageNode(this.properties)
		];
	}

	protected renderFileInput(): DNode {
		const { widgetId, label, disabled, name } = this.properties;

		return v(
			'div',
			{
				classes: [
					'custom-file',
					...getSpacingClasses(this.properties),
					...getFlexItemClasses(this.properties),
					...getFloatClass(this.properties)
				]
			},
			[
				v('input', {
					id: widgetId,
					key: 'text-input',
					name,
					type: 'file',
					disabled: disabled === true || disabled === 'true',
					classes: ['custom-file-input'],
					onchange: this._onChange
				}),
				label
					? w(Label, {
							value: label,
							forId: widgetId,
							classes: 'custom-file-label'
					  })
					: null,
				renderMessageNode(this.properties)
			]
		);
	}

	protected render(): DNode | DNode[] {
		const { type, label, labelPosition } = this.properties;

		if (type && type === 'file') {
			return this.renderFileInput();
		}

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
				this.renderTextInput()
			);
		}

		return this.renderTextInput();
	}
}

export default TextInput;
