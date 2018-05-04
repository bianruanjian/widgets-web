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
	// 当将 Button 作为 ListGroup 的子部件时，要设置 isListItem 为 true, 默认为 false
	isListItem?: boolean;
	// 在实现层面，list-group-item-xx 是同时设置了背景颜色和字体颜色，
	// 但是 Link 部件只单独提供了 backgroundColor 和 textColor 两个属性，
	// 没有提供可同时设置此两个颜色的属性，可考虑增加一个 appearance 属性，
	// 此属性不对外公开，只是当父部件为 ListGroup 时使用
	appearance?: string;
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
		let { widgetId, href, target, value, isListItem = false, appearance } = this.properties;

		if (target && target === 'self') {
			target = '_self';
		}

		return v(
			'a',
			{
				id: widgetId,
				href,
				target,
				classes: isListItem
					? [
							'list-group-item',
							'list-group-item-action',
							...getSpacingClasses(this.properties),
							...getFlexItemClasses(this.properties),
							...getTextClasses(this.properties),
							appearance && appearance !== 'default' ? `list-group-item-${appearance}` : undefined,
							...getTextDecorationClass(this.properties)
					  ]
					: [
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
