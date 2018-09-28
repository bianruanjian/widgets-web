import { v } from '@dojo/framework/widget-core/d';
import { assign } from '@dojo/framework/shim/object';
import { DNode, WNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, theme, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/framework/widget-core/registerCustomElement';
import { SpacingProperties } from '../common/interfaces';
import { getSpacingClasses } from '../common/util';

import * as css from './styles/list-group.m.css';
import Button from '../button';
import ListItem from '../list-item';
import Link from '../link';

/**
 * @type ListGroupProperties
 *
 * Properties that can be set on list-group components
 */
export interface ListGroupProperties extends SpacingProperties, ThemedProperties {
	widgetId?: string;
	flush?: boolean | string;
	orientation?: string;
}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<ListGroupProperties>({
	tag: 'db-list-group',
	childType: CustomElementChildType.NODE,
	attributes: [
		'widgetId',
		'flush',
		'orientation',
		'marginTop',
		'marginBottom',
		'marginLeft',
		'marginRight',
		'paddingTop',
		'paddingBottom',
		'paddingLeft',
		'paddingRight'
	],
	properties: [],
	events: []
})
@theme(css)
export class ListGroupBase<P extends ListGroupProperties = ListGroupProperties> extends ThemedBase<P, WNode<Button|ListItem|Link>> {
	protected getKey() {
		return 'list-group';
	}

	protected getTagNameByChildNode(): string {
		let tag: string = 'ul';
		let existListItem: boolean = false;
		let existButtonOrLink: boolean = false;
		this.children.forEach((child, index) => {
			if (child) {
				const childKey = child.properties.key;

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

		return tag;
	}

	protected renderChildren(): DNode[] {
		const { orientation } = this.properties;
		return this.children.map((child)=>{
			assign(child!.properties, {
				isListItem: true,
				orientation
			});
			return child;
		});
	}

	protected render(): DNode | DNode[] {
		const { widgetId, flush, orientation } = this.properties;

		if (orientation === 'horizontal') {
			return v(
				'ul',
				{
					id: widgetId,
					key: this.getKey(),
					classes: [this.theme(css.root), 'list-inline', ...getSpacingClasses(this.properties)]
				},
				this.renderChildren()
			);
		}

		const tag = this.getTagNameByChildNode();

		return v(
			tag,
			{
				id: widgetId,
				key: this.getKey(),
				classes: [
					this.theme(css.root),
					'list-group',
					flush === true || flush === 'true' ? 'list-group-flush' : undefined,
					...getSpacingClasses(this.properties)
				]
			},
			this.renderChildren()
		);
	}
}

export default class ListGroup extends ListGroupBase<ListGroupProperties> {}
