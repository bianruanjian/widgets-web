import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { SpacingProperties, TextProperties, ColorsProperties, BorderProperties } from '../common/interfaces';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import { v } from '@dojo/widget-core/d';
import { getSpacingClasses, getTextClasses, getTextDecorationClass, getColorsClasses, getBorderClasses, getTextStyles } from '../common/util';

import * as css from './styles/card.m.css';
import { indexOf } from 'benchmark';

/**
 * @type CardProperties
 *
 * Properties that can be set on card components
 */
export interface CardProperties extends SpacingProperties, TextProperties, ColorsProperties, BorderProperties {
	widgetId?: string;
	width?: number | string;
	height?: number | string;
};

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
	private _getSelfStyle() {
		const {
			width,
			height
		} = this.properties;

		const cssStyles: any = {};

		if(width && width !=='auto'){
			if(typeof width === 'number'){
				cssStyles.width = `${width}px`;
			}else{
				if((width as string).indexOf('%') === -1){
					cssStyles.width = `${width}px`;
				}else{
					cssStyles.width = width;
				}
			}
		}

		if(height && height !=='auto'){
			if(typeof height === 'number'){
				cssStyles.height = `${height}px`;
			}else{
				if((height as string).indexOf('%') === -1){
					cssStyles.height = `${height}px`;
				}else{
					cssStyles.height = height;
				}
			}
		}

		return cssStyles;
	}
	
	protected render(): DNode | DNode[] {
		const {
			widgetId
		} = this.properties;

		return v('div', {
			id: widgetId,
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
				...this._getSelfStyle()
			}
		}, this.children);
	}
}

export default Card;
