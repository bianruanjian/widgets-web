import { v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme, ThemedProperties } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import * as css from './styles/container.m.css';

/**
 * @type ContainerProperties
 *
 * Properties that can be set on Container components
 */
export interface ContainerProperties extends ThemedProperties {
	widgetId?: string;
	fluid?: boolean | string;
}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<ContainerProperties>({
	tag: 'db-container',
	childType: CustomElementChildType.TEXT,
	attributes: ['widgetId', 'fluid'],
	properties: [],
	events: []
})
@theme(css)
export class ContainerBase<P extends ContainerProperties = ContainerProperties> extends ThemedBase<P> {
	protected getKey() {
		return 'container';
	}
	protected render(): DNode | DNode[] {
		let { widgetId, fluid } = this.properties;

		const cssClass = fluid === true || fluid === 'true' ? 'container-fluid' : 'container';

		return v(
			'div',
			{
				id: widgetId,
				key: this.getKey(),
				classes: [this.theme(css.root), cssClass]
			},
			this.children
		);
	}
}

export default class Container extends ContainerBase<ContainerProperties> {}
