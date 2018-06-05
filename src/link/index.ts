import { v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme, ThemedProperties } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import {
	SpacingProperties,
	FlexItemProperties,
	TextProperties,
	ColorsProperties,
	DisplayProperties
} from '../common/interfaces';
import {
	getSpacingClasses,
	getFlexItemClasses,
	getTextClasses,
	getTextStyles,
	getColorsClasses,
	getTextDecorationClass,
	getDisplayClass
} from '../common/util';

import * as css from './styles/link.m.css';
import { targetMap } from '../button';

/**
 * @type LinkProperties
 *
 * Properties that can be set on link components
 */
export interface LinkProperties
	extends SpacingProperties,
		DisplayProperties,
		FlexItemProperties,
		TextProperties,
		ColorsProperties,
		ThemedProperties {
	widgetId?: string;
	href?: string;
	target?: string;
	value?: string;
	// 当将 Link 作为 ListGroup 的子部件时，要设置 isListItem 为 true, 默认为 false
	isListItem?: boolean;
	// 在实现层面，list-group-item-xx 是同时设置了背景颜色和字体颜色，
	// 但是 Link 部件只单独提供了 backgroundColor 和 textColor 两个属性，
	// 没有提供可同时设置此两个颜色的属性，增加一个 appearance 属性，
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
		'appearance',
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
		'display',
		'alignSelf',
		'order',
		'textColor',
		'backgroundColor'
	],
	properties: [],
	events: []
})
@theme(css)
export class LinkBase<P extends LinkProperties = LinkProperties> extends ThemedBase<P> {
	protected render(): DNode | DNode[] {
		let { widgetId, href, target, value, isListItem = false, appearance, display } = this.properties;

		if (target) {
			target = targetMap[target as string] || target;
		}

		let flexItemClasses: string[] = [];

		if (display && (display === 'flex' || display === 'inlineFlex')) {
			flexItemClasses = getFlexItemClasses(this.properties as FlexItemProperties);
		}

		return v(
			'a',
			{
				id: widgetId,
				key: 'link',
				href,
				target,
				classes: isListItem
					? [
							this.theme(css.root),
							'list-group-item',
							'list-group-item-action',
							...getSpacingClasses(this.properties),
							display ? getDisplayClass(this.properties) : undefined,
							...flexItemClasses,
							...getTextClasses(this.properties),
							appearance && appearance !== 'default' ? `list-group-item-${appearance}` : undefined,
							...getTextDecorationClass(this.properties)
					  ]
					: [
							this.theme(css.root),
							...getSpacingClasses(this.properties),
							display ? getDisplayClass(this.properties) : undefined,
							...flexItemClasses,
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

export default class Link extends LinkBase<LinkProperties> {}
