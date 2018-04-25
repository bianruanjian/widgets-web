import { v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { SpacingProperties, FlexItemProperties, FloatProperties, FormProperties, MessageProperties } from '../common/interfaces';
import { renderMessageNode, formSizeMap, getSpacingClasses, getFlexItemClasses, getFloatClass } from '../common/util';

import * as css from './styles/checkbox.m.css';

/**
 * @type CheckboxProperties
 *
 * Properties that can be set on checkbox components
 */
export interface CheckboxProperties extends SpacingProperties, FlexItemProperties, FloatProperties, FormProperties, MessageProperties {
	widgetId?: string;
	name?: string;
	value?: string;
	checked?: boolean | string;
	label?: string;
	labelAfter?: boolean | string;
	fluid?: boolean | string;
	size?: string;
};

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement({
	tag: 'db-checkbox',
	attributes: [
		'widgetId',
		'name',
		'value',
		'checked',
		'label',
		'labelAfter',
		'required',
		'disabled',
		'readOnly',
		'fluid',
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
		'alignSelf',
		'order',
		'float'
	],
	properties: [],
	events: []
})
@theme(css)
export class Checkbox<P extends CheckboxProperties = CheckboxProperties> extends ThemedBase<P> {
	protected renderCheckbox(): DNode {
		let {
			widgetId,
			name,
			value,
			checked,
			disabled,
			required,
			readOnly
		} = this.properties;

		const cssClasses: string[] = [];

		if(disabled){
			cssClasses.push('disabled');
		}

		return v('input', {
			type: 'checkbox',
			id: widgetId,
			name,
			value,
			checked: (checked === true || checked === 'true'),
			disabled: (disabled === true || disabled === 'true'),
			required: (required === true || required === 'true'),
			readOnly: (readOnly === true || readOnly === 'true'),
			classes: ['form-check-input']
		});
	}

	protected render(): DNode | DNode[] {
		const {
			widgetId,
			label,
			size,
			labelAfter = true,
			fluid
		} = this.properties;

		const children:DNode[] = 
		( labelAfter === true || labelAfter === 'true') ?
		[  
			this.renderCheckbox(),
			label ? v(
			'label',
			{
				for: widgetId,
				classes: ['form-check-label']
			},
			[label]) : null,
			renderMessageNode(this.properties)
		] :
		[   
			label ? v(
			'label',
			{
				for: widgetId,
				classes: ['form-check-label']
			},
			[label]) : null,
			renderMessageNode(this.properties),
			this.renderCheckbox()
		];

		return v('div',{
			classes: [
				'form-check',
				size ? formSizeMap[size as string] : '',
				(fluid === true || fluid === 'true') ? '' : 'form-check-inline',
				...getSpacingClasses(this.properties),
				...getFlexItemClasses(this.properties),
				...getFloatClass(this.properties)
			]
		}, children);
	}
}

export default Checkbox;