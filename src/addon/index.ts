import { v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import { ColorsProperties } from '../common/interfaces';
import { getColorsClasses } from '../common/util';

import * as css from './styles/addon.m.css';

/**
 * @type AddonProperties
 *
 * Properties that can be set on addon components
 */
export interface AddonProperties extends ColorsProperties{
	widgetId?: string;
	value?: string;
	position?: string;
};

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<AddonProperties>({
	tag: 'db-addon',
	childType: CustomElementChildType.TEXT,
	attributes: [
		'widgetId',
		'value',
		'position',
		'textColor',
		'backgroundColor'
	],
	properties: [],
	events: []
})
@theme(css)
export class Addon<P extends AddonProperties = AddonProperties> extends ThemedBase<P> {
	protected render(): DNode | DNode[] {
		const {
			widgetId,
			value,
			position
		} = this.properties;

		let cssClass:string = 'input-group-prepend';

		if(position && position === 'append'){
			cssClass = 'input-group-append';
		}

		return v('div',{
			id: widgetId,
			classes: [
				cssClass,
				...getColorsClasses(this.properties)
			]
		}, [
			v('div',{
					classes: ['input-group-text']
				}, 
				value ? [value] : this.children
			)
		]);
	}
}

export default Addon;
