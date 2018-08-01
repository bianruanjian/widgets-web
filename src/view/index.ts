import { v } from '@dojo/framework/widget-core/d';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { endsWith } from '@dojo/framework/shim/string';
import { ThemedMixin, theme, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/framework/widget-core/registerCustomElement';
import {
	BorderProperties,
	SpacingProperties,
	TextProperties,
	FlexContainerProperties,
	FlexItemProperties,
	DisplayProperties,
	ColorsProperties,
	FloatProperties
} from '../common/interfaces';
import {
	getSpacingClasses,
	getBorderClasses,
	getTextClasses,
	getTextStyles,
	getFlexContainerClasses,
	getFlexItemClasses,
	getDisplayClass,
	getColorsClasses,
	getFloatClass
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
		ThemedProperties,
		ColorsProperties,
		FloatProperties {
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
		'order',
		'textColor',
		'backgroundColor',
		'float'
	],
	properties: [],
	events: []
})
@theme(css)
export class ViewBase<P extends ViewProperties = ViewProperties> extends ThemedBase<P> {
	protected getKey() {
		return 'view';
	}
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
					...getBorderClasses(this.properties),
					...getSpacingClasses(this.properties),
					...getTextClasses(this.properties),
					display ? getDisplayClass(this.properties) : undefined,
					...flexContainerClasses,
					...getFlexItemClasses(this.properties),
					...getColorsClasses(this.properties),
					...getFloatClass(this.properties)
				],
				styles: { ...getTextStyles(this.properties), ...this._getMaxWidthStyles() }
			},
			this.children
		);
	}
}

export default class View extends ViewBase<ViewProperties> {}
