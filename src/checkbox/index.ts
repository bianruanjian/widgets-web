import { v, w } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
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
	renderMessageNode,
	formSizeMap,
	getSpacingClasses,
	getFlexItemClasses,
	getFloatClass,
	getDisplayClass
} from '../common/util';

import * as css from './styles/checkbox.m.css';
import { Label } from '../label';

/**
 * @type CheckboxProperties
 *
 * Properties that can be set on checkbox components
 */
export interface CheckboxProperties
	extends SpacingProperties,
		FlexItemProperties,
		FloatProperties,
		FormProperties,
		MessageProperties,
		DisplayProperties {
	widgetId?: string;
	name?: string;
	value?: string;
	checked?: boolean | string;
	label?: string;
	labelAfter?: boolean | string;
	fluid?: boolean | string;
	size?: string;
}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<CheckboxProperties>({
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
		'display',
		'float'
	],
	properties: [],
	events: []
})
@theme(css)
export class Checkbox<P extends CheckboxProperties = CheckboxProperties> extends ThemedBase<P> {
	protected renderCheckbox(): DNode {
		let { widgetId, name, value, checked, disabled, required, readOnly } = this.properties;

		const cssClasses: string[] = [];

		if (disabled === true || disabled === 'true') {
			cssClasses.push('disabled');
		}

		return v('input', {
			type: 'checkbox',
			id: widgetId,
			name,
			value,
			checked: checked === true || checked === 'true',
			disabled: disabled === true || disabled === 'true',
			required: required === true || required === 'true',
			readOnly: readOnly === true || readOnly === 'true',
			classes: ['form-check-input']
		});
	}

	protected render(): DNode | DNode[] {
		const { widgetId, label, size, labelAfter, fluid, display } = this.properties;

		let children: DNode[] = [
			this.renderCheckbox(),
			label ? w(Label, { value: label, forId: widgetId, classes: 'form-check-label' }) : null
		];
		if (labelAfter === false || labelAfter === 'false') {
			children = children.reverse();
		}
		children.push(renderMessageNode(this.properties));

		let flexItemClasses: string[] = [];

		if (display && (display === 'flex' || display === 'inlineFlex')) {
			flexItemClasses = getFlexItemClasses(this.properties as FlexItemProperties);
		}

		return v(
			'div',
			{
				key: 'checkbox',
				classes: [
					'form-check',
					size ? formSizeMap[size as string] : undefined,
					fluid === true || fluid === 'true' ? undefined : 'form-check-inline',
					...getSpacingClasses(this.properties),
					display ? getDisplayClass(this.properties) : undefined,
					...flexItemClasses,
					...getFloatClass(this.properties)
				]
			},
			children
		);
	}
}

export default Checkbox;
