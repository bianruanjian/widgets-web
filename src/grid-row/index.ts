import { v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import * as css from './styles/grid-row.m.css';
import { SpacingProperties, FlexContainerProperties, FlexItemProperties } from '../common/interfaces';
import { getSpacingClasses, getFlexContainerClasses, getFlexItemClasses } from '../common/util';

/**
 * @type GridRowProperties
 *
 * Properties that can be set on GridRow components
 */
export interface GridRowProperties extends SpacingProperties, FlexContainerProperties, FlexItemProperties {
	widgetId?: string;
	gutters?: boolean | string;
};

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<GridRowProperties>({
	tag: 'db-grid-row',
	childType: CustomElementChildType.TEXT,
	attributes: [
		'widgetId',
		'gutters',
		'marginTop',
		'marginBottom',
		'marginLeft',
		'marginRight',
		'paddingTop',
		'paddingBottom',
		'paddingLeft',
		'paddingRight',
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
export class GridRow<P extends GridRowProperties = GridRowProperties> extends ThemedBase<P> {
	
	private _getGuttersClasses() {
		let {
			gutters
		} = this.properties;

		const guttersClasses: string[] = [];

		if(gutters === false || gutters === "false" ){
			guttersClasses.push('no-gutters');
		}
		
		return guttersClasses;
	}

	protected render(): DNode | DNode[] {
		let {
			widgetId
		} = this.properties;
		return v(
			'div',
			{
				id: widgetId,
				classes: ['row', 
					...this._getGuttersClasses(),
					...getSpacingClasses(this.properties),
...getFlexContainerClasses(this.properties),
					...getFlexItemClasses(this.properties)
				]
			},
			this.children
		);
	}
}

export default GridRow;
