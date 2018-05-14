import { v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
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
		ColorsProperties {
	widgetId?: string;
	active?: boolean | string;
	disabled?: boolean | string;
	appearance?: string;
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
export class ListItem<P extends ListItemProperties = ListItemProperties> extends ThemedBase<P> {
	protected render(): DNode | DNode[] {
		const { widgetId, active, disabled, appearance, display } = this.properties;

		let flexContainerClasses: string[] = [];

		if (display && (display === 'flex' || display === 'inlineFlex')) {
			flexContainerClasses = getFlexContainerClasses(this.properties);
		}

		return v(
			'li',
			{
				id: widgetId,
				key: 'list-item',
				disabled: disabled === true || disabled === 'true',
				classes: [
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

export default ListItem;
