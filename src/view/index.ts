import { v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { endsWith } from '@dojo/shim/string';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import { BorderProperties, SpacingProperties, TextProperties } from '../common/interfaces';
import { getSpacingClasses, getBorderClasses, getTextClasses, getTextStyles } from '../common/util';

import * as css from './styles/view.m.css';

/**
 * @type viewProperties
 *
 * Properties that can be set on view components
 */
export interface ViewProperties extends BorderProperties, SpacingProperties, TextProperties {
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
		'wrap'
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
		let { widgetId } = this.properties;

		return v(
			'div',
			{
				id: widgetId,
				classes: [
					...getBorderClasses(this.properties),
					...getSpacingClasses(this.properties),
					...getTextClasses(this.properties)
				],
				styles: { ...getTextStyles(this.properties), ...this._getMaxWidthStyles() }
			},
			this.children
		);
	}
}

export default View;
