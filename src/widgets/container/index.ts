import { v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import * as css from './styles/container.m.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * @type ContainerProperties
 *
 * Properties that can be set on Container components
 */
export interface ContainerProperties {
	widgetId?: string;
	fluidWidth?: boolean;
};

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<ContainerProperties>({
	tag: 'db-container',
	childType: CustomElementChildType.TEXT,
	attributes: [
		'widgetId',
		"fluidWidth"
	],
	properties: [],
	events: []
})
@theme(css)
export class ContainerBase<P extends ContainerProperties = ContainerProperties> extends ThemedBase<P> {
	protected render(): DNode | DNode[] {
		let {
			widgetId, 
			fluidWidth
		} = this.properties;
		
		const cssClass = fluidWidth ? 'container-fluid' : 'container';

		return v(
			'div',
			{
				id: widgetId,
				key: 'root',
				classes: [cssClass]
			},
			this.children
		);
	}
}

export default class Container extends ContainerBase<ContainerProperties>{};
