import { v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import * as css from './styles/grid-row.m.css';
import {
	SpacingProperties,
	FlexContainerProperties,
	FlexItemProperties,
	DisplayProperties
} from '../common/interfaces';
import { getSpacingClasses, getFlexContainerClasses, getFlexItemClasses, getDisplayClass } from '../common/util';

/**
 * @type GridRowProperties
 *
 * Properties that can be set on GridRow components
 */
export interface GridRowProperties
	extends SpacingProperties,
		DisplayProperties,
		FlexContainerProperties,
		FlexItemProperties {
	widgetId?: string;
	gutters?: boolean | string;
}

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
		'display',
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
		let { gutters } = this.properties;

		const guttersClasses: string[] = [];

		if (gutters === false || gutters === 'false') {
			guttersClasses.push('no-gutters');
		}

		return guttersClasses;
	}

	protected render(): DNode | DNode[] {
		let { widgetId, display } = this.properties;

		let flexContainerClasses: string[] = [];
		let flexItemClasses: string[] = [];

		if ((display && display === 'flex') || display === 'inlineFlex') {
			flexContainerClasses = getFlexContainerClasses(this.properties);
			flexItemClasses = getFlexItemClasses(this.properties);
		}

		return v(
			'div',
			{
				id: widgetId,
				key: 'grid-row',
				classes: [
					'row',
					...this._getGuttersClasses(),
					...getSpacingClasses(this.properties),
					display ? getDisplayClass(this.properties) : undefined,
					...flexContainerClasses,
					...flexItemClasses
				]
			},
			this.children
		);
	}
}

export default GridRow;
