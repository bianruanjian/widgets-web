import { v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme, ThemedProperties } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import { SpacingProperties } from '../common/interfaces';
import { getSpacingClasses } from '../common/util';

import * as css from './styles/badge.m.css';

/**
 * @type BadgeProperties
 *
 * Properties that can be set on badge components
 */
export interface BadgeProperties extends SpacingProperties, ThemedProperties {
	widgetId?: string;
	value?: string;
	valuePosition?: string;
	appearance?: string;
	pill?: boolean | string;
	href?: string;
	target?: string;
}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<BadgeProperties>({
	tag: 'db-badge',
	childType: CustomElementChildType.TEXT,
	attributes: [
		'widgetId',
		'value',
		'valuePosition',
		'appearance',
		'pill',
		'href',
		'target',
		'marginTop',
		'marginBottom',
		'marginLeft',
		'marginRight',
		'paddingTop',
		'paddingBottom',
		'paddingLeft',
		'paddingRight'
	],
	properties: [],
	events: []
})
@theme(css)
export class BadgeBase<P extends BadgeProperties = BadgeProperties> extends ThemedBase<P> {
	protected render(): DNode | DNode[] {
		const { widgetId, value, valuePosition, appearance, pill, href, target } = this.properties;

		let tag: string = 'span';
		const cssClasses: string[] = [];

		if (href) {
			tag = 'a';
		}

		if (appearance && appearance !== 'default') {
			cssClasses.push(`badge-${appearance}`);
		}

		if (pill === true || pill === 'true') {
			cssClasses.push('badge-pill');
		}

		let children: DNode[];

		if (value && valuePosition && valuePosition === 'left') {
			children = [value, ...this.children];
		} else {
			children = [...this.children, value];
		}

		return v(
			tag,
			{
				id: widgetId,
				key: 'badge',
				classes: [this.theme(css.root), 'badge', ...cssClasses, ...getSpacingClasses(this.properties)],
				href,
				target
			},
			children
		);
	}
}

export default class Badge extends BadgeBase<BadgeProperties> {}
