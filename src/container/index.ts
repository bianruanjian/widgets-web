import { v } from '@dojo/framework/widget-core/d';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, theme, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';

import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/framework/widget-core/registerCustomElement';
import * as css from './styles/container.m.css';
import { endsWith } from '@dojo/framework/shim/string';

/**
 * @type ContainerProperties
 *
 * Properties that can be set on Container components
 */
export interface ContainerProperties extends ThemedProperties {
	widgetId?: string;
	fluid?: boolean | string;
	maxWidth?: string | number;
}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<ContainerProperties>({
	tag: 'db-container',
	childType: CustomElementChildType.TEXT,
	attributes: ['widgetId', 'fluid', 'maxWidth'],
	properties: [],
	events: []
})
@theme(css)
export class ContainerBase<P extends ContainerProperties = ContainerProperties> extends ThemedBase<P> {
	protected getKey() {
		return 'container';
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
		} else {
			maxWidthStyles.maxWidth = undefined;
		}

		return maxWidthStyles;
	}

	protected render(): DNode | DNode[] {
		let { widgetId, fluid } = this.properties;

		const cssClass = fluid === true || fluid === 'true' ? 'container-fluid' : 'container';

		return v(
			'div',
			{
				id: widgetId,
				key: this.getKey(),
				classes: [this.theme(css.root), cssClass],
				styles: this._getMaxWidthStyles()
			},
			this.children
		);
	}
}

export default class Container extends ContainerBase<ContainerProperties> {}
