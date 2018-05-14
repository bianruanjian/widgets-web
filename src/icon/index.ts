import { v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import { SpacingProperties, FlexItemProperties, ColorsProperties, DisplayProperties } from '../common/interfaces';
import { getSpacingClasses, getFlexItemClasses, getColorsClasses, getDisplayClass } from '../common/util';

import * as css from './styles/icon.m.css';

export const sizeMap: { [key: string]: string } = {
	extraSmall: 'fa-xs',
	small: 'fa-sm',
	large: 'fa-lg',
	'2x': 'fa-2x',
	'3x': 'fa-3x',
	'4x': 'fa-4x',
	'5x': 'fa-5x',
	'6x': 'fa-6x',
	'7x': 'fa-7x',
	'8x': 'fa-8x',
	'9x': 'fa-9x',
	'10x': 'fa-10x',
	default: ''
};
/**
 * @type IconProperties
 *
 * Properties that can be set on icon components
 *
 */
export interface IconProperties extends SpacingProperties, FlexItemProperties, ColorsProperties, DisplayProperties {
	widgetId?: string;
	value?: string;
	size?: string;
	alt?: string;
	title?: string;
}

export const ThemedBase = ThemedMixin(WidgetBase);

/**
 * 若使用该部件需要先引入 fontawesome 的 js 文件（SVG with JavaScript）
 * 如：<script src="https://use.fontawesome.com/releases/v5.0.10/js/all.js"></script>
 */
@customElement<IconProperties>({
	tag: 'db-icon',
	childType: CustomElementChildType.TEXT,
	attributes: [
		'widgetId',
		'value',
		'size',
		'alt',
		'title',
		'marginTop',
		'marginBottom',
		'marginLeft',
		'marginRight',
		'paddingTop',
		'paddingBottom',
		'paddingLeft',
		'paddingRight',
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
export class Icon<P extends IconProperties = IconProperties> extends ThemedBase<P> {
	protected render(): DNode | DNode[] {
		const { widgetId, value, size, alt, title, display } = this.properties;

		let flexItemClasses: string[] = [];

		if (display && (display === 'flex' || display === 'inlineFlex')) {
			flexItemClasses = getFlexItemClasses(this.properties as FlexItemProperties);
		}

		let displayClass = getDisplayClass(this.properties);

		if (displayClass === undefined) {
			displayClass = '';
		}

		const cssClasses: string[] = [
			...getSpacingClasses(this.properties),
			display ? displayClass : '',
			...flexItemClasses,
			...getColorsClasses(this.properties)
		];

		const iconClasses: string[] = [];

		if (value) {
			iconClasses.push(value as string);
		}

		if (size) {
			iconClasses.push(sizeMap[size as string]);
		}

		if (cssClasses.length === 0 || (cssClasses.length === 1 && cssClasses[0] === '')) {
			return v('i', {
				id: widgetId,
				key: 'icon',
				alt,
				title,
				classes: iconClasses
			});
		}

		return v(
			'span',
			{
				id: widgetId,
				key: 'icon',
				classes: cssClasses,
				title
			},
			[
				v('i', {
					alt,
					classes: [value ? (value as string) : '', size ? sizeMap[size as string] : '']
				})
			]
		);
	}
}

export default Icon;
