import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import {
	SpacingProperties,
	FlexItemProperties,
	FloatProperties,
	FormProperties,
	MessageProperties
} from '../common/interfaces';
import { formSizeMap, getSpacingClasses, getFlexItemClasses, getFloatClass, renderMessageNode } from '../common/util';
import { v, w } from '@dojo/widget-core/d';

import * as css from './styles/textarea.m.css';
import { Label } from '../label';

/**
 * @type TextareaProperties
 *
 * Properties that can be set on textarea components
 */
export interface TextareaProperties
	extends SpacingProperties,
		FlexItemProperties,
		FloatProperties,
		FormProperties,
		MessageProperties {
	widgetId?: string;
	name?: string;
	value?: string;
	label?: string;
	rows?: number;
	cols?: number;
	size?: string;
	placeholder?: string;
	placeholderAppearance?: string;
	noResize?: boolean | string;
	autofocus?: boolean | string;
	plainText?: boolean | string;
	maxLength?: number;
	minLength?: number;
}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<TextareaProperties>({
	tag: 'db-textarea',
	attributes: [
		'widgetId',
		'name',
		'value',
		'label',
		'rows',
		'cols',
		'placeholder',
		'placeholderAppearance',
		'required',
		'disabled',
		'readOnly',
		'size',
		'autofocus',
		'plainText',
		'noResize',
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
	events: []
})
@theme(css)
export class Textarea<P extends TextareaProperties = TextareaProperties> extends ThemedBase<P> {
	protected renderTextarea(): DNode {
		const {
			widgetId,
			name,
			value,
			rows,
			cols,
			placeholder,
			disabled,
			required,
			readOnly,
			maxLength,
			minLength,
			size,
			autofocus,
			plainText,
			noResize
		} = this.properties;

		const cssClasses: string[] = [];
		let cssStyles: any = {};

		if (disabled === true || disabled === 'true') {
			cssClasses.push('disabled');
		}

		if (size) {
			cssClasses.push(formSizeMap[size as string]);
		}

		if (plainText === true || plainText === 'true' || (readOnly === true || readOnly === 'true')) {
			cssClasses.push('form-control-plaintext');
		} else {
			cssClasses.push('form-control');
		}

		if (noResize === true || noResize === 'true') {
			cssStyles.resize = 'none';
		}

		return v('textarea', {
			id: widgetId,
			name,
			value,
			rows,
			cols,
			placeholder,
			disabled: disabled === true || disabled === 'true',
			required: required === true || required === 'true',
			readOnly: readOnly === true || readOnly === 'true',
			maxlength: maxLength ? maxLength : null,
			minlength: minLength ? minLength : null,
			classes: [
				...cssClasses,
				...getSpacingClasses(this.properties),
				...getFlexItemClasses(this.properties),
				...getFloatClass(this.properties)
			],
			autofocus: autofocus === true || autofocus === 'true',
			styles: cssStyles
		});
	}

	protected renderInputWrapper(): DNode[] {
		return [this.renderTextarea(), renderMessageNode(this.properties)];
	}

	protected render(): DNode | DNode[] {
		const { widgetId, label } = this.properties;

		const children = [
			label
				? w(
						Label,
						{
							value: label,
							forId: widgetId
						},
						[]
				  )
				: null,
			...this.renderInputWrapper()
		];

		return children;
	}
}

export default Textarea;
