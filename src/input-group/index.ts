import { v, w } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import { SpacingProperties, FlexItemProperties, FloatProperties } from '../common/interfaces';
import { Label } from '../label/index';

import * as css from './styles/input-group.m.css';
import { getSpacingClasses, getFlexItemClasses, getFloatClass } from '../common/util';

export const sizeMap: {[key: string]: string} = {
	'small': 'sm',
	'large': 'lg'
};

/**
 * @type InputGroupProperties
 *
 * Properties that can be set on input-group components
 */
export interface InputGroupProperties extends SpacingProperties, FlexItemProperties, FloatProperties {
	widgetId?: string,
	size?: string,
	label?: string
};

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<InputGroupProperties>({
	tag: 'db-input-group',
	childType: CustomElementChildType.TEXT,
	attributes: [
		'widgetId',
		'size',
		'label',
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
export class InputGroup<P extends InputGroupProperties = InputGroupProperties> extends ThemedBase<P> {

	protected render(): DNode | DNode[] {
		const {
			widgetId,
			size,
			label
		} = this.properties;

		let sizeClass:string = '';

		if(size && size !== 'default'){
			sizeClass = `input-group-${sizeMap[size as string]}`;
		}

		const children:any[] = [
			label ? w(Label, {
				value: label
			}) : null,
			...this.children
		];

		return v('div',{
			id: widgetId,
			classes: [
				'input-group', 
				sizeClass,
				...getSpacingClasses(this.properties),
				...getFlexItemClasses(this.properties),
				...getFloatClass(this.properties)
			]
		}, children);
	}
}

export default InputGroup;
