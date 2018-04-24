import { v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import { SpacingProperties, FlexItemProperties, ColorsProperties } from '../common/interfaces';
import { getSpacingClasses, getFlexItemClasses, getColorsClasses } from '../common/util';

import * as css from './styles/icon.m.css';
import '@fortawesome/fontawesome/styles.css';

export const sizeMap: {[key: string]: string} = {
	'extraSmall': 'fa-xs',
	'small': 'fa-sm',
	'large': 'fa-lg',
	'2x': 'fa-2x',
	'3x': 'fa-3x',
	'4x': 'fa-4x',
	'5x': 'fa-5x',
	'6x': 'fa-6x',
	'7x': 'fa-7x',
	'8x': 'fa-8x',
	'9x': 'fa-9x',
	'10x': 'fa-10x',
	'default': ''
}
/**
 * @type IconProperties
 *
 * Properties that can be set on icon components
 */
export interface IconProperties extends SpacingProperties, FlexItemProperties, ColorsProperties {
	widgetId?: string;
	appearance?: string;
	size?: string;
	alt?: string;
	title?: string;
};

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<IconProperties>({
	tag: 'db-icon',
	childType: CustomElementChildType.TEXT,
	attributes: [
		'widgetId',
		'appearance',
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
		const {
			widgetId,
			appearance,
			size,
			alt,
			title
		} = this.properties;

		return v('span', {
				id: widgetId,
				classes: [
					'd-inline-block',
					...getSpacingClasses(this.properties),
					...getFlexItemClasses(this.properties),
					...getColorsClasses(this.properties)
				],
				title
			},
			[
				v('i',{
					alt,
					classes: [
						appearance ? appearance as string : '',
						size ? sizeMap[size as string] : ''
					]
				}, []
				)
			]
		);
		
	}
}

export default Icon;
