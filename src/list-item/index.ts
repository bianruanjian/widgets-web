import { v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import { FlexContainerProperties, TextProperties, ColorsProperties } from '../common/interfaces';
import {
	getFlexContainerClasses,
	getTextClasses,
	getTextDecorationClass,
	getTextStyles,
	getColorsClasses
} from '../common/util';

import * as css from './styles/list-item.m.css';

/**
 * @type ListItemProperties
 *
 * Properties that can be set on ListItem components
 */
export interface ListItemProperties extends FlexContainerProperties, TextProperties, ColorsProperties {
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
		const { widgetId, active, disabled, appearance } = this.properties;

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
					...getFlexContainerClasses(this.properties),
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
