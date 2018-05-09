import { v } from '@dojo/widget-core/d';
import { find } from '@dojo/shim/array';
import { DNode, VNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import { ColorsProperties } from '../common/interfaces';
import { getColorsClasses } from '../common/util';

import * as css from './styles/addon.m.css';

export type positionType = 'prepend' | 'append' | 'default';
/**
 * @type AddonProperties
 *
 * Properties that can be set on addon components
 */
export interface AddonProperties extends ColorsProperties {
	widgetId?: string;
	value?: string;
	position?: positionType;
}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<AddonProperties>({
	tag: 'db-addon',
	childType: CustomElementChildType.TEXT,
	attributes: ['widgetId', 'value', 'position', 'textColor', 'backgroundColor'],
	properties: [],
	events: []
})
@theme(css)
export class Addon<P extends AddonProperties = AddonProperties> extends ThemedBase<P> {
	protected render(): DNode | DNode[] {
		const { widgetId, value, position } = this.properties;

		let cssClass: string = 'input-group-prepend';

		if (position && position === 'append') {
			cssClass = 'input-group-append';
		}

		const children: any[] = [];
		if (value) {
			children.push(
				v(
					'span',
					{
						classes: ['input-group-text']
					},
					[value]
				)
			);
		} else {
			let existCheckboxOrRadio: boolean = false;
			find(this.children, (child: DNode) => {
				if (child) {
					const childTag: string = (child as VNode).tag;
					const childKey = (child as VNode).properties.key;
					if (
						childTag === 'db-checkbox' ||
						childTag === 'db-radio' ||
						childKey === 'checkbox' ||
						childKey === 'radio'
					) {
						existCheckboxOrRadio = true;
					}
				}
				return existCheckboxOrRadio;
			});
			if (existCheckboxOrRadio) {
				children.push(v('div', { classes: ['input-group-text'] }, this.children));
			} else {
				children.push(v('div', {}, this.children));
			}
		}

		return v(
			'div',
			{
				id: widgetId,
				key: 'addon',
				classes: [cssClass, ...getColorsClasses(this.properties)]
			},
			children
		);
	}
}

export default Addon;
