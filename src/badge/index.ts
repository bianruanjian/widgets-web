import { v } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import { SpacingProperties, FlexItemProperties, DisplayProperties } from '../common/interfaces';
import { getSpacingClasses, getFlexItemClasses, getDisplayClass } from '../common/util';

import * as css from './styles/badge.m.css';

/**
 * @type BadgeProperties
 *
 * Properties that can be set on badge components
 */
export interface BadgeProperties extends SpacingProperties, FlexItemProperties, DisplayProperties, WidgetProperties {
	widgetId?: string;
	value?: string;
	appearance?: string;
	pill?: boolean;
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
		'paddingRight',
		'alignSelf',
		'order',
		'display'
	],
	properties: [],
	events: []
})
@theme(css)
export class Badge<P extends BadgeProperties = BadgeProperties> extends ThemedBase<P> {
	protected render(): DNode | DNode[] {
		const { widgetId, value, appearance, pill, href, target, display } = this.properties;

		let tag: string = 'span';
		const cssClasses: string[] = [];

		if (href) {
			tag = 'a';
		}

		if (appearance && appearance !== 'default') {
			cssClasses.push(`badge-${appearance}`);
		}

		if (pill) {
			cssClasses.push('badge-pill');
		}

		let flexItemClasses: string[] = [];

		if (display && (display === 'flex' || display === 'inlineFlex')) {
			flexItemClasses = getFlexItemClasses(this.properties as FlexItemProperties);
		}

		return v(
			tag,
			{
				id: widgetId,
				key: 'badge',
				classes: [
					'badge',
					...cssClasses,
					...getSpacingClasses(this.properties),
					display ? getDisplayClass(this.properties) : undefined,
					...flexItemClasses
				],
				href,
				target
			},
			value ? [value] : this.children
		);
	}
}

export default Badge;
