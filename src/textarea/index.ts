import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme, ThemedProperties } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
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
import { v, w } from '@dojo/widget-core/d';

import * as css from './styles/textarea.m.css';
import Label from '../label';
import { Focus } from '@dojo/widget-core/meta/Focus';

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
		MessageProperties,
		DisplayProperties,
		ThemedProperties {
	widgetId?: string;
	name?: string;
	value?: string;
	label?: string;
	labelPosition?: string;
	rows?: number;
	cols?: number;
	size?: string;
	placeholder?: string;
	placeholderAppearance?: string;
	noResize?: boolean | string;
	shouldFocus?: boolean | string;
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
		'labelPosition',
		'rows',
		'cols',
		'placeholder',
		'placeholderAppearance',
		'required',
		'disabled',
		'readOnly',
		'size',
		'shouldFocus',
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
		'display',
		'alignSelf',
		'order',
		'float'
	],
	properties: [],
	events: []
})
@theme(css)
export class TextareaBase<P extends TextareaProperties = TextareaProperties> extends ThemedBase<P> {
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
			shouldFocus,
			plainText,
			noResize,
			display,
			label,
			labelPosition
		} = this.properties;

		const cssClasses: string[] = [];
		let cssStyles: any = {};

		if (shouldFocus) {
			this.meta(Focus).set('textarea');
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

		if (noResize === true || noResize === 'true') {
			cssStyles.resize = 'none';
		}

		let flexItemClasses: string[] = [];

		if (display && (display === 'flex' || display === 'inlineFlex')) {
			flexItemClasses = getFlexItemClasses(this.properties as FlexItemProperties);
		}

		let textareaClasses = [
			...cssClasses,
			...getSpacingClasses(this.properties),
			display ? getDisplayClass(this.properties) : undefined,
			...flexItemClasses,
			...getFloatClass(this.properties)
		];

		if (!(label && labelPosition && labelPosition === 'left')) {
			textareaClasses.push(this.theme(css.root) as string);
		}

		return v('textarea', {
			id: widgetId,
			key: 'textarea',
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
			classes: textareaClasses,
			styles: cssStyles
		});
	}

	protected renderTextareaWrapper(): DNode[] {
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
			this.renderTextarea(),
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
					classes: [this.theme(css.root), 'form-group', 'form-check-inline', 'w-100']
				},
				this.renderTextareaWrapper()
			);
		}

		return this.renderTextareaWrapper();
	}
}

export default class Textarea extends TextareaBase<TextareaProperties> {}
