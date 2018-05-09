import { v } from '@dojo/widget-core/d';
import { DNode, VNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import { SpacingProperties } from '../common/interfaces';
import { getSpacingClasses } from '../common/util';

import * as css from './styles/list-group.m.css';

/**
 * @type ListGroupProperties
 *
 * Properties that can be set on list-group components
 */
export interface ListGroupProperties extends SpacingProperties {
	widgetId?: string;
	flush?: boolean | string;
}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<ListGroupProperties>({
	tag: 'db-list-group',
	childType: CustomElementChildType.NODE,
	attributes: ['widgetId', 'flush'],
	properties: [],
	events: []
})
@theme(css)
export class ListGroup<P extends ListGroupProperties = ListGroupProperties> extends ThemedBase<P> {
	protected render(): DNode | DNode[] {
		const { widgetId, flush } = this.properties;
		let tag: string = 'ul';
		let existListItem: boolean = false;
		let existButtonOrLink: boolean = false;

		this.children.forEach((child, index) => {
			if (child) {
				const childKey = (child as VNode).properties.key;

				if (childKey === 'link' || childKey === 'button') {
					tag = 'div';
					existButtonOrLink = true;
				}
				if (childKey === 'list-item') {
					existListItem = true;
				}
			}
		});

		if (existButtonOrLink && existListItem) {
			console.error('ListItem and Button/Link can not be allowed at the same time in the ListGroup widget');
		}

		return v(
			tag,
			{
				id: widgetId,
				key: 'list-group',
				classes: [
					'list-group',
					flush === true || flush === 'true' ? 'list-group-flush' : undefined,
					...getSpacingClasses(this.properties)
				]
			},
			this.children
		);
	}
}

export default ListGroup;
