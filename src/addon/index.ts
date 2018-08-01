import { v } from '@dojo/framework/widget-core/d';
import { find } from '@dojo/framework/shim/array';
import { DNode, VNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, theme, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/framework/widget-core/registerCustomElement';
import { ColorsProperties } from '../common/interfaces';
import { getColorsClasses } from '../common/util';

import * as css from './styles/addon.m.css';

export type positionType = 'prepend' | 'append' | 'default';
/**
 * @type AddonProperties
 *
 * Properties that can be set on addon components
 */
export interface AddonProperties extends ColorsProperties, ThemedProperties {
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
export class AddonBase<P extends AddonProperties = AddonProperties> extends ThemedBase<P> {
	protected getKey() {
		return 'addon';
	}

	protected isCheckboxOrRadio(node: VNode): boolean {
		const childKey = node.properties.key;
		if (childKey === 'checkbox' || childKey === 'radio') {
			return true;
		} else {
			return false;
		}
	}

	protected render(): DNode | DNode[] {
		const { widgetId, value, position } = this.properties;

		let cssClass: string[] = ['input-group-prepend'];

		if (position && position === 'append') {
			cssClass = ['input-group-append'];
		}

		let children: DNode[] = [];

		if (value) {
			children.push(
				v(
					'span',
					{
						classes: ['input-group-text', ...getColorsClasses(this.properties)]
					},
					[value]
				)
			);
		} else {
			const checkboxOrRadioNode = find(this.children, (child: DNode) => {
				if (child) {
					return this.isCheckboxOrRadio(child as VNode);
				}
				return false;
			});
			if (checkboxOrRadioNode) {
				children.push(
					v('div', { classes: ['input-group-text', ...getColorsClasses(this.properties)] }, this.children)
				);
			} else {
				cssClass = cssClass.concat(getColorsClasses(this.properties));
				children = this.children;
			}
		}

		return v(
			'div',
			{
				id: widgetId,
				key: this.getKey(),
				classes: [this.theme(css.root), ...cssClass]
			},
			children
		);
	}
}

export default class Addon extends AddonBase<AddonProperties> {}
