import { v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

import { customElement } from '@dojo/widget-core/decorators/customElement';
import * as css from './styles/container.m.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * @type ContainerProperties
 *
 * Properties that can be set on Container components
 */
export interface ContainerProperties { 
	fluidWidth?: boolean;
};

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement({
	tag: 'brj-container',
	attributes: [],
	properties: ['fluidWidth'],
	events: []
})
@theme(css)
export class ContainerBase<P extends ContainerProperties = ContainerProperties> extends ThemedBase<P> {
	protected render(): DNode | DNode[] {
		const { fluidWidth } = this.properties;

		const cssClass = fluidWidth ? 'container-fluid' : 'container';

		return v(
			'div',
			{
				key: 'root',
				classes: [cssClass]
			},
			this.children
		);
	}
}

export default class Container extends ContainerBase<ContainerProperties>{};
