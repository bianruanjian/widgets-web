import { v, w } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { SpacingProperties, FlexItemProperties, FloatProperties, FormProperties, MessageProperties } from '../common/interfaces';
import { Label } from '../label';
import { getSpacingClasses, getFlexItemClasses, getFloatClass, renderMessageNode, formSizeMap } from '../common/util';

import * as css from './styles/text-input.m.css';

export type TextInputType = 'text' | 'email' | 'number' | 'password' | 'idCard' | 'digit' | 'default';
/**
 * @type TextInputProperties
 *
 * Properties that can be set on TextInput components
 */
export interface TextInputProperties extends FormProperties, SpacingProperties, FlexItemProperties, FloatProperties, MessageProperties{
	widgetId?: string;
	name?: string;
	type?: TextInputType;
	password?: boolean;
	value?: string;
	label?: string;
	placeholder?: string;
	placeholderAppearance?: string;
	size?: string;
	focus?: boolean;
	plainText?: boolean;
	maxLength?: number;
	minLength?: number;
	onInput?(value: string): void;
	onChange?(value: string): void;
};

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
		'placeholder',
		'placeholderAppearance',
		'required',
		'disabled',
		'readOnly',
		'size',
		'focus',
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
	events: [
		'onInput',
		'onChange'
	]
})
@theme(css)
export class TextInput<P extends TextInputProperties = TextInputProperties> extends ThemedBase<P, null> {
	private _onInput(event: Event){
		event.stopPropagation();
		this.properties.onInput && this.properties.onInput((event.target as HTMLInputElement).value);
	}

	private _onChange(event: Event){
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
			focus,
			plainText
		} = this.properties;

		const cssClasses: string[] = [];

		if(password){
			type = 'password';
		}

		if(disabled){
			cssClasses.push('disabled');
		}

		if(size){
			cssClasses.push(formSizeMap[size as string]);
		}

		if(plainText || readOnly){
			cssClasses.push('form-control-plaintext');
		} else {
			cssClasses.push('form-control');
		} 

		return v('input', {
			id: widgetId,
			name,
			type: (type && type !== 'default') ? type : '',
			value,
			placeholder,
			disabled: (disabled === true || disabled === 'true'),
			required: (required === true || required === 'true'),
			readOnly: (readOnly === true || readOnly === 'true'),
			maxlength: maxLength ? `${maxLength}` : null,
			minlength: minLength ? `${minLength}` : null,
			classes: [
				...cssClasses,
				...getSpacingClasses(this.properties),
				...getFlexItemClasses(this.properties),
				...getFloatClass(this.properties)
			],
			autofocus: focus ? true : false,
			oninput: this._onInput,
			onchange: this._onChange
		}, []);
	}

	protected renderInputWrapper(): DNode[] {
		return [this.renderInput(), renderMessageNode(this.properties)];
	}

	protected render(): DNode | DNode[] {
		const {
			widgetId,
			label
		} = this.properties;

		const children = [
			label ? w(Label, {
				value: label,
				forId: widgetId
			}, []) : null,
			...this.renderInputWrapper()
		];

		return children;
	}
}

export default TextInput;
