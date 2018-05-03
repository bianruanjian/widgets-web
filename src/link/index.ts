import { v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import { SpacingProperties, FlexItemProperties, TextProperties, ColorsProperties } from '../common/interfaces';
import {
	getSpacingClasses,
	getFlexItemClasses,
	getTextClasses,
	getTextStyles,
	getColorsClasses,
	getTextDecorationClass
} from '../common/util';

import * as css from './styles/link.m.css';

/**
 * @type LinkProperties
 *
 * Properties that can be set on link components
 */
export interface LinkProperties extends SpacingProperties, FlexItemProperties, TextProperties, ColorsProperties {
	widgetId?: string;
	href?: string;
	target?: string;
	value?: string;
	isListItem?: boolean;
}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement({
	tag: 'db-link',
	childType: CustomElementChildType.TEXT,
	attributes: [
		'widgetId',
		'href',
		'target',
		'value',
		'isListItem',
		'marginTop',
		'marginBottom',
		'marginLeft',
		'marginRight',
		'paddingTop',
		'paddingBottom',
		'paddingLeft',
		'paddingRight',
		'fontWeight',
		'fontItalic',
		'textDecoration',
		'alignment',
		'transform',
		'truncate',
		'wrap',
		'alignSelf',
		'order',
		'textColor',
		'backgroundColor'
	],
	properties: [],
	events: []
})
@theme(css)
export class Link<P extends LinkProperties = LinkProperties> extends ThemedBase<P> {
	protected render(): DNode | DNode[] {
		const { widgetId, href, target, value, isListItem } = this.properties;

		return v(
			'a',
			{
				id: widgetId,
				href,
				target,
				classes: [
					isListItem ? 'list-group-item list-group-item-action' : undefined,
					...getSpacingClasses(this.properties),
					...getFlexItemClasses(this.properties),
					...getTextClasses(this.properties),
					...getColorsClasses(this.properties),
					...getTextDecorationClass(this.properties)
				],
				styles: getTextStyles(this.properties)
			},
			value ? [value, ...this.children] : this.children
		);
	}
}

export default Link;
