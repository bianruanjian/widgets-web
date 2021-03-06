import { v } from '@dojo/framework/widget-core/d';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, theme, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/framework/widget-core/registerCustomElement';
import { FlexContainerProperties, TextProperties, ColorsProperties, DisplayProperties } from '../common/interfaces';
import {
	getFlexContainerClasses,
	getTextClasses,
	getTextDecorationClass,
	getTextStyles,
	getColorsClasses,
	getDisplayClass
} from '../common/util';

import * as css from './styles/list-item.m.css';

/**
 * @type ListItemProperties
 *
 * Properties that can be set on ListItem components
 */
export interface ListItemProperties
	extends DisplayProperties,
		FlexContainerProperties,
		TextProperties,
		ColorsProperties,
		ThemedProperties {
	widgetId?: string;
	active?: boolean | string;
	disabled?: boolean | string;
	appearance?: string;
	orientation?: string;
}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<ListItemProperties>({
	tag: 'db-list-item',
	childType: CustomElementChildType.TEXT,
	attributes: [
		'widgetId',
		'active',
		'disabled',
		'appearance',
		'display',
		'flexDirection',
		'reverse',
		'justifyItems',
		'alignItems',
		'flexWrap',
		'alignContent',
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
export class ListItemBase<P extends ListItemProperties = ListItemProperties> extends ThemedBase<P> {
	protected getKey() {
		return 'list-item';
	}
	protected render(): DNode | DNode[] {
		const { widgetId, active, disabled, appearance, display, orientation = 'vertical' } = this.properties;

		let flexContainerClasses: string[] = [];

		if (display && (display === 'flex' || display === 'inlineFlex')) {
			flexContainerClasses = getFlexContainerClasses(this.properties);
		}

		if (orientation === 'horizontal') {
			return v(
				'li',
				{
					id: widgetId,
					key: this.getKey(),
					disabled: disabled === true || disabled === 'true',
					classes: [
						this.theme(css.root),
						'list-inline-item',
						appearance && appearance !== 'default' ? `list-group-item-${appearance}` : undefined,
						display ? getDisplayClass(this.properties) : undefined,
						...flexContainerClasses,
						...getTextClasses(this.properties),
						...getTextDecorationClass(this.properties),
						...getColorsClasses(this.properties)
					],
					styles: getTextStyles(this.properties)
				},
				this.children
			);
		}

		return v(
			'li',
			{
				id: widgetId,
				key: this.getKey(),
				disabled: disabled === true || disabled === 'true',
				classes: [
					this.theme(css.root),
					'list-group-item',
					appearance && appearance !== 'default' ? `list-group-item-${appearance}` : undefined,
					disabled === true || disabled === 'true' ? 'disabled' : undefined,
					active === true || active === 'true' ? 'active' : undefined,
					display ? getDisplayClass(this.properties) : undefined,
					...flexContainerClasses,
					...getTextClasses(this.properties),
					...getTextDecorationClass(this.properties),
					...getColorsClasses(this.properties)
				],
				styles: getTextStyles(this.properties)
			},
			this.children
		);
	}
}

export default class ListItem extends ListItemBase<ListItemProperties> {}
