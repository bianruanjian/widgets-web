import { v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme, ThemedProperties } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import * as css from './styles/grid-column.m.css';
import {
	BorderProperties,
	SpacingProperties,
	TextProperties,
	FlexContainerProperties,
	FlexItemProperties,
	DisplayProperties
} from '../common/interfaces';
import {
	getBorderClasses,
	getSpacingClasses,
	getTextClasses,
	getFlexContainerClasses,
	getFlexItemClasses,
	getTextStyles,
	getTextDecorationClass,
	getDisplayClass
} from '../common/util';

/**
 *
 * @type GridColumnProperties
 *
 * Properties that can be set on grid-column components
 */
export interface GridColumnProperties
	extends BorderProperties,
		SpacingProperties,
		TextProperties,
		DisplayProperties,
		FlexContainerProperties,
		FlexItemProperties,
		ThemedProperties {
	widgetId?: string;
	offset?: number | string;
	colspan?: number | string;
}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<GridColumnProperties>({
	tag: 'db-grid-column',
	childType: CustomElementChildType.TEXT,
	attributes: [
		'widgetId',
		'offset',
		'colspan',
		'borderLeft',
		'borderTop',
		'borderRight',
		'borderBottom',
		'borderColor',
		'borderRound',
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
export class GridColumnBase<P extends GridColumnProperties = GridColumnProperties> extends ThemedBase<P> {
	private _getClasses(): string[] {
		let { offset, colspan } = this.properties;

		const cssClasses: string[] = [];

		if (colspan && colspan !== 'default' && colspan !== 1) {
			cssClasses.push(`col-${colspan}`);
		} else {
			cssClasses.push('col');
		}

		if ((offset && offset !== 'default') || offset === 0) {
			cssClasses.push(`offset-${offset}`);
		}

		return cssClasses;
	}

	protected render(): DNode | DNode[] {
		let { widgetId, display } = this.properties;

		let flexContainerClasses: string[] = [];
		let flexItemClasses: string[] = [];

		if (display && (display === 'flex' || display === 'inlineFlex')) {
			flexContainerClasses = getFlexContainerClasses(this.properties);
			flexItemClasses = getFlexItemClasses(this.properties);
		}

		return v(
			'div',
			{
				id: widgetId,
				key: 'grid-column',
				classes: [
					this.theme(css.root),
					...this._getClasses(),
					...getBorderClasses(this.properties),
					...getSpacingClasses(this.properties),
					...getTextClasses(this.properties),
					display ? getDisplayClass(this.properties) : undefined,
					...flexContainerClasses,
					...flexItemClasses,
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

export default class GridColumn extends GridColumnBase<GridColumnProperties> {}
