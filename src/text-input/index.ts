import { v, w } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { SpacingProperties, FlexItemProperties, FloatProperties, FormProperties } from '../common/interfaces';
import { Label } from '../label';
import { getSpacingClasses, getFlexItemClasses, getFloatClass } from '../common/util';

import * as css from './styles/text-input.m.css';

export type TextInputType = 'text' | 'email' | 'number' | 'password' | 'idCard' | 'digit' | 'default';
/**
 * @type TextInputProperties
 *
 * Properties that can be set on TextInput components
 */
export interface TextInputProperties extends FormProperties, SpacingProperties, FlexItemProperties, FloatProperties{
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
	invalidMessage?: string;
	validMessage?: string;
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

	protected getRootClasses(): (string | null)[] {
		const {
			disabled,
			readOnly,
			size
		} = this.properties;
		return [
			css.root,
			'form-group',
			disabled ? 'disabled' : null,
			readOnly ? 'form-control-plaintext' : null,
			(size && size !== 'default') ? `form-control-${size}` : null
		];
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

		if(size && size !== "default"){
			cssClasses.push(`form-control-${size}`);
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
			disabled,
			required,
			readOnly,
			maxlength: maxLength ? `${maxLength}` : null,
			minlength: minLength ? `${minLength}` : null,
			classes: cssClasses,
			autofocus: focus,
			oninput: this._onInput,
			onchange: this._onChange
		}, []);
	}

	private _renderTooltip(): DNode {
		let {
			invalidMessage,
			validMessage
		} = this.properties;

		if(!invalidMessage && !validMessage){
			return null;
		}
		
		return v('div',{
			classes: [invalidMessage ? 'invalid-tooltip' : (validMessage ? 'valid-tooltip' : '')]
		},[invalidMessage ? invalidMessage : (validMessage ? validMessage : '')]);
	}

	protected renderInputWrapper(): DNode {
		return v('div', { 
			classes: [
				'input-group',
				...getSpacingClasses(this.properties),
				...getFlexItemClasses(this.properties),
				...getFloatClass(this.properties)
			] 
		}, [this.renderInput(), this._renderTooltip()]);
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
			this.renderInputWrapper()
		];

		return v('div',{
			classes: this.getRootClasses()
		}, children);
	}
}

export default TextInput;
