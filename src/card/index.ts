import { endsWith } from '@dojo/shim/string';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { SpacingProperties, TextProperties, ColorsProperties, BorderProperties } from '../common/interfaces';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import { v } from '@dojo/widget-core/d';
import {
	getSpacingClasses,
	getTextClasses,
	getTextDecorationClass,
	getColorsClasses,
	getBorderClasses,
	getTextStyles
} from '../common/util';

import * as css from './styles/card.m.css';

/**
 * @type CardProperties
 *
 * Properties that can be set on card components
 */
export interface CardProperties extends SpacingProperties, TextProperties, ColorsProperties, BorderProperties {
	widgetId?: string;
	width?: number | string;
	height?: number | string;
}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<CardProperties>({
	tag: 'db-card',
	childType: CustomElementChildType.TEXT,
	attributes: [
		'widgetId',
		'width',
		'height',
		'borderLeft',
		'borderTop',
		'borderRight',
		'borderBottom',
		'borderColor',
		'borderRound',
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
		'backgroundColor'
	],
	properties: [],
	events: []
})
@theme(css)
export class Card<P extends CardProperties = CardProperties> extends ThemedBase<P> {
	private _getStyles() {
		const { width, height } = this.properties;

		const cssStyles: any = {};

		if (width) {
			if (typeof width === 'number') {
				cssStyles.width = `${width}px`;
			} else if (endsWith(width as string, '%') || width === 'auto') {
				cssStyles.width = width;
			} else {
				cssStyles.width = `${width}px`;
			}
		}

		if (height) {
			if (typeof height === 'number') {
				cssStyles.height = `${height}px`;
			} else if (endsWith(height as string, '%') || height === 'auto') {
				cssStyles.height = height;
			} else {
				cssStyles.height = `${height}px`;
			}
		}

		return cssStyles;
	}

	protected render(): DNode | DNode[] {
		const { widgetId } = this.properties;

		return v(
			'div',
			{
				id: widgetId,
				key: 'card',
				classes: [
					'card',
					...getSpacingClasses(this.properties),
					...getTextClasses(this.properties),
					...getTextDecorationClass(this.properties),
					...getColorsClasses(this.properties),
					...getBorderClasses(this.properties)
				],
				styles: {
					...getTextStyles(this.properties),
					...this._getStyles()
				}
			},
			this.children
		);
	}
}

export default Card;
