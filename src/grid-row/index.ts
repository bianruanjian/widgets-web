import { v } from '@dojo/framework/widget-core/d';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, theme, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';

import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/framework/widget-core/registerCustomElement';
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
		FlexItemProperties,
		ThemedProperties {
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
export class GridRowBase<P extends GridRowProperties = GridRowProperties> extends ThemedBase<P> {
	protected getKey() {
		return 'grid-row';
	}
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

		if (display && (display === 'flex' || display === 'inlineFlex')) {
			flexContainerClasses = getFlexContainerClasses(this.properties);
		}

		return v(
			'div',
			{
				id: widgetId,
				key: this.getKey(),
				classes: [
					this.theme(css.root),
					'row',
					...this._getGuttersClasses(),
					...getSpacingClasses(this.properties),
					display ? getDisplayClass(this.properties) : undefined,
					...flexContainerClasses,
					...getFlexItemClasses(this.properties)
				]
			},
			this.children
		);
	}
}

export default class GridRow extends GridRowBase<GridRowProperties> {}
