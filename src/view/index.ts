import { v } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { endsWith } from '@dojo/shim/string';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import {
	BorderProperties,
	SpacingProperties,
	TextProperties,
	FlexContainerProperties,
	FlexItemProperties,
	DisplayProperties
} from '../common/interfaces';
import {
	getSpacingClasses,
	getBorderClasses,
	getTextClasses,
	getTextStyles,
	getFlexContainerClasses,
	getFlexItemClasses,
	getDisplayClass
} from '../common/util';

import * as css from './styles/view.m.css';

/**
 * @type viewProperties
 *
 * Properties that can be set on view components
 */
export interface ViewProperties
	extends BorderProperties,
		SpacingProperties,
		TextProperties,
		DisplayProperties,
		FlexContainerProperties,
		FlexItemProperties,
		WidgetProperties {
	widgetId?: string;
	maxWidth?: number | string;
}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<ViewProperties>({
	tag: 'db-view',
	childType: CustomElementChildType.TEXT,
	attributes: [
		'widgetId',
		'maxWidth',
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
export class View<P extends ViewProperties = ViewProperties> extends ThemedBase<P> {
	private _getMaxWidthStyles() {
		let { maxWidth } = this.properties;

		let maxWidthStyles: any = {};

		if (maxWidth) {
			if (typeof maxWidth == 'number') {
				maxWidthStyles.maxWidth = `${maxWidth}px`;
			} else if (endsWith(maxWidth as string, '%')) {
				maxWidthStyles.maxWidth = maxWidth;
			} else {
				maxWidthStyles.maxWidth = `${maxWidth}px`;
			}
		}

		return maxWidthStyles;
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
				key: 'view',
				classes: [
					...getBorderClasses(this.properties),
					...getSpacingClasses(this.properties),
					...getTextClasses(this.properties),
					display ? getDisplayClass(this.properties) : undefined,
					...flexContainerClasses,
					...flexItemClasses
				],
				styles: { ...getTextStyles(this.properties), ...this._getMaxWidthStyles() }
			},
			this.children
		);
	}
}

export default View;
