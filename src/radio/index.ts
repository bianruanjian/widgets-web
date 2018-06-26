import { v, w } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme, ThemedProperties } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import uuid from '@dojo/core/uuid';
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

import * as css from './styles/radio.m.css';
import Label from '../label';

/**
 * @type RadioProperties
 *
 * Properties that can be set on radio components
 */
export interface RadioProperties
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
	checked?: boolean | string;
	label?: string;
	labelAfter?: boolean | string;
	fluid?: boolean | string;
	size?: string;
}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<RadioProperties>({
	tag: 'db-radio',
	attributes: [
		'widgetId',
		'name',
		'value',
		'checked',
		'label',
		'labelAfter',
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
		'display',
		'alignSelf',
		'order',
		'float'
	],
	properties: [],
	events: []
})
@theme(css)
export class RadioBase<P extends RadioProperties = RadioProperties> extends ThemedBase<P> {
	private _uuid: string;

	protected getKey() {
		return 'radio';
	}

	constructor() {
		super();
		this._uuid = uuid();
	}

	protected renderRadio(): DNode {
		let { widgetId = this._uuid, name, value, checked, disabled, readOnly } = this.properties;

		const cssClasses: string[] = [];

		if (disabled === true || disabled === 'true') {
			cssClasses.push('disabled');
		}

		return v('input', {
			type: 'radio',
			id: widgetId,
			name,
			value,
			checked: checked === true || checked === 'true',
			disabled: disabled === true || disabled === 'true',
			readOnly: readOnly === true || readOnly === 'true',
			classes: ['form-check-input']
		});
	}

	protected render(): DNode | DNode[] {
		const { widgetId = this._uuid, label, size, labelAfter, fluid, display } = this.properties;

		let children: DNode[] = [
			this.renderRadio(),
			label ? w(Label, { value: label, forId: widgetId, classes: 'form-check-label' }) : null
		];
		if (labelAfter === false || labelAfter === 'false') {
			children = children.reverse();
		}
		children.push(renderMessageNode(this.properties));
		return v(
			'div',
			{
				key: this.getKey(),
				classes: [
					this.theme(css.root),
					'form-check',
					size ? formSizeMap[size as string] : undefined,
					fluid === true || fluid === 'true' ? undefined : 'form-check-inline',
					...getSpacingClasses(this.properties),
					display ? getDisplayClass(this.properties) : undefined,
					...getFlexItemClasses(this.properties as FlexItemProperties),
					...getFloatClass(this.properties)
				]
			},
			children
		);
	}
}

export default class Radio extends RadioBase<RadioProperties> {}
