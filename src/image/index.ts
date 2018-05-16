import { v } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import { SpacingProperties } from '../common/interfaces';
import { getSpacingClasses, getBorderClasses } from '../common/util';

import * as css from './styles/image.m.css';

/**
 * @type ImageProperties
 *
 * Properties that can be set on image components
 */
export interface ImageProperties extends SpacingProperties, WidgetProperties {
	widgetId?: string;
	fluid?: boolean | string;
	thumbnail?: boolean | string;
	src?: string;
	alt?: string;
	width?: number | string;
	height?: number | string;
	alignment?: string;
	borderRound?: string;
}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<ImageProperties>({
	tag: 'db-img',
	childType: CustomElementChildType.TEXT,
	attributes: [
		'widgetId',
		'fluid',
		'thumbnail',
		'src',
		'alt',
		'width',
		'height',
		'alignment',
		'borderRound',
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
export class Image<P extends ImageProperties = ImageProperties> extends ThemedBase<P> {
	private _getImgClasses(): string[] {
		let { fluid, thumbnail, alignment } = this.properties;
		const cssClasses: string[] = [];
		if (fluid === true || fluid === 'true') {
			cssClasses.push('img-fluid');
		}

		if (thumbnail === true || thumbnail === 'true') {
			cssClasses.push('img-thumbnail');
		}

		if (alignment && alignment !== 'default') {
			if (alignment === 'center') {
				cssClasses.push('mx-auto');
				cssClasses.push('d-block');
			} else {
				cssClasses.push(`float-${alignment}`);
			}
		}

		return cssClasses;
	}

	private _getImgStyles() {
		let { width, height } = this.properties;

		let cssStyles: any = {};

		if (width && width !== 'auto') {
			if (typeof width === 'number' || (width as string).indexOf('%') === -1) {
				cssStyles.width = `${width}px`;
			} else {
				cssStyles.width = `${width}`;
			}
		}

		if (height && height !== 'auto') {
			if (typeof height === 'number' || (height as string).indexOf('%') === -1) {
				cssStyles.height = `${height}px`;
			} else {
				cssStyles.height = `${height}`;
			}
		}

		return cssStyles;
	}

	protected render(): DNode | DNode[] {
		let { widgetId, src, alt } = this.properties;

		return v(
			'img',
			{
				id: widgetId,
				key: 'image',
				src,
				alt,
				classes: [
					...this._getImgClasses(),
					...getBorderClasses(this.properties),
					...getSpacingClasses(this.properties)
				],
				styles: {
					...this._getImgStyles()
				}
			},
			this.children
		);
	}
}

export default Image;
