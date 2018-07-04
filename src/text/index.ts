import { v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme, ThemedProperties } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import {
	SpacingProperties,
	TextProperties,
	ColorsProperties,
	DisplayProperties,
	FlexContainerProperties,
	FlexItemProperties
} from '../common/interfaces';
import {
	getSpacingClasses,
	getTextClasses,
	getTextDecorationClass,
	getColorsClasses,
	getTextStyles,
	getFlexContainerClasses,
	getDisplayClass,
	getFlexItemClasses
} from '../common/util';

import * as css from './styles/text.m.css';
/**
 * @type TextWidgetProperties
 *
 * Properties that can be set on text components
 */
export interface TextWidgetProperties
	extends SpacingProperties,
		TextProperties,
		ColorsProperties,
		DisplayProperties,
		FlexContainerProperties,
		FlexItemProperties,
		ThemedProperties {
	widgetId?: string;
	value?: string;
	valuePosition?: boolean | string;
	type?: string;
}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<TextWidgetProperties>({
	tag: 'db-text',
	childType: CustomElementChildType.TEXT,
	attributes: [
		'widgetId',
		'value',
		'valuePosition',
		'type',
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
		'textColor',
		'backgroundColor',
		'display',
		'flexDirection',
		'reverse',
		'justifyItems',
		'alignItems',
		'flexWrap',
		'alignContent',
		'alignSelf',
		'order'
	],
	properties: [],
	events: []
})
@theme(css)
export class TextBase<P extends TextWidgetProperties = TextWidgetProperties> extends ThemedBase<P> {
	protected getKey() {
		return 'text';
	}
	protected render(): DNode | DNode[] {
		let { widgetId, value, valuePosition, type, display } = this.properties;

		let tag: string;
		let cssClasses: string[] = [];

		if (!type) {
			tag = 'span';
		} else if (type === 'text') {
			tag = 'span';
		} else if (type === 'lead') {
			tag = 'p';
			cssClasses.push('lead');
		} else {
			tag = type as string;
		}

		let children: DNode[];
		if (value && valuePosition && valuePosition === 'left') {
			children = [value, ...this.children];
		} else {
			children = [...this.children, value];
		}

		let flexContainerClasses: string[] = [];

		if (display && (display === 'flex' || display === 'inlineFlex')) {
			flexContainerClasses = getFlexContainerClasses(this.properties);
		}

		return v(
			tag,
			{
				id: widgetId,
				key: this.getKey(),
				classes: [
					this.theme(css.root),
					...cssClasses,
					...getSpacingClasses(this.properties),
					...getTextClasses(this.properties),
					...getTextDecorationClass(this.properties),
					...getColorsClasses(this.properties),
					display ? getDisplayClass(this.properties) : undefined,
					...flexContainerClasses,
					...getFlexItemClasses(this.properties)
				],
				styles: {
					...getTextStyles(this.properties)
				}
			},
			children
		);
	}
}

export default class Text extends TextBase<TextWidgetProperties> {}
