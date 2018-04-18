import { v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import * as css from './styles/grid-column.m.css';
import { BorderProperties, SpacingProperties, TextProperties, FlexContainerProperties, FlexItemProperties } from '../common/interfaces';
import { getBorderClasses, getSpacingClasses, getTextClasses, getFlexContainerClasses, getFlexItemClasses, getTextStyles, getTextDecorationClass } from '../common/util';

/**
 * 
 * @type GridColumnProperties
 *
 * Properties that can be set on grid-column components
 */
export interface GridColumnProperties extends BorderProperties,
	SpacingProperties, TextProperties,FlexContainerProperties,
	FlexItemProperties {
	widgetId?: string;
	offset? : number | string;
};

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<GridColumnProperties>({
	tag: 'db-grid-column',
	childType: CustomElementChildType.TEXT,
	attributes: [
		'widgetId',
		'offset',
		'borderLeft',
		'borderTop',
		'borderRight',
		'borderBottom',
		'borderColor',
		'borderRadius',
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
export class GridColumn<P extends GridColumnProperties = GridColumnProperties> extends ThemedBase<P> {
	
	private _getOffsetClasses(): string[] {
		let {
			offset
		} = this.properties;

		const offsetClasses: string[] = [];

		if(offset && (offset != "default" || offset == 0)){
			offsetClasses.push(`offset-${offset}`);
		}

		return offsetClasses;
	}

	protected render(): DNode | DNode[] {
		let {
			widgetId
		} = this.properties;

		return v(
			'div',
			{
				id: widgetId,
				classes: [
					'col',
					...this._getOffsetClasses(),
					...getBorderClasses(this.properties),
					...getSpacingClasses(this.properties),
					...getTextClasses(this.properties),
					...getFlexContainerClasses(this.properties),
					...getFlexItemClasses(this.properties),
					...getTextDecorationClass(this.properties)
				],
				styles: {
					...getTextStyles(this.properties)
				}
			},
			this.children
		);
	}
}

export default GridColumn;
