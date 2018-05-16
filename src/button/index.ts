import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v } from '@dojo/widget-core/d';
import { customElement } from '@dojo/widget-core/decorators/customElement';

import * as css from './styles/button.m.css';

export const sizeMap: { [key: string]: string } = {
	large: 'btn-lg',
	small: 'btn-sm',
	default: ''
};

export const targetMap: { [key: string]: string } = {
	self: '_self',
	blank: '_blank'
};

/**
 * @type buttonProperties
 *
 * Properties that can be set on button components
 */
export interface ButtonProperties extends WidgetProperties {
	widgetId?: string;
	value?: string;
	appearance?: string;
	size?: string;
	disabled?: boolean | string;
	type?: string;
	fluid?: boolean | string;
	active?: boolean | string;
	href?: string;
	target?: string;
	isListItem?: boolean; // 当将 Button 作为 ListGroup 的子部件时，要设置 isListItem 为 true, 默认为 false
	onClick?(): void;
}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<ButtonProperties>({
	tag: 'db-button',
	attributes: [
		'widgetId',
		'value',
		'appearance',
		'size',
		'disabled',
		'type',
		'fluid',
		'active',
		'href',
		'target',
		'isListItem'
	],
	properties: [],
	events: ['onClick']
})
@theme(css)
export class Button<P extends ButtonProperties = ButtonProperties> extends ThemedBase<P> {
	private _onClick(event: MouseEvent) {
		event.stopPropagation();
		this.properties.onClick && this.properties.onClick();
	}

	protected render(): DNode | DNode[] {
		let {
			widgetId,
			value,
			appearance,
			size,
			disabled,
			type,
			fluid,
			active,
			href,
			target,
			isListItem = false
		} = this.properties;
		const children: any[] = value ? [value, ...this.children] : this.children;
		let sizeClass: string = sizeMap[size as string];

		if (target) {
			target = targetMap[target as string] || target;
		}

		if (href) {
			// 使用a标签
			return v(
				'a',
				{
					id: widgetId,
					key: 'button',
					href: `${href}`,
					target,
					classes: isListItem
						? [
								'list-group-item',
								'list-group-item-action',
								appearance && appearance !== 'default' ? `list-group-item-${appearance}` : undefined,
								active === true || active === 'true' ? 'active' : undefined
						  ]
						: [
								'btn',
								appearance && appearance !== 'default' ? `btn-${appearance}` : undefined,
								sizeClass !== '' ? sizeClass : undefined,
								fluid === true || fluid === 'true' ? 'btn-block' : undefined,
								active === true || active === 'true' ? 'active' : undefined
						  ],
					role: 'button'
				},
				children
			);
		} else {
			return v(
				'button',
				{
					id: widgetId,
					key: 'button',
					classes: isListItem
						? [
								'list-group-item',
								'list-group-item-action',
								appearance && appearance !== 'default' ? `list-group-item-${appearance}` : undefined,
								active === true || active === 'true' ? 'active' : undefined
						  ]
						: [
								'btn',
								appearance && appearance !== 'default' ? `btn-${appearance}` : undefined,
								sizeClass !== '' ? sizeClass : undefined,
								fluid === true || fluid === 'true' ? 'btn-block' : undefined,
								active === true || active === 'true' ? 'active' : undefined
						  ],
					disabled: disabled === true || disabled === 'true',
					type: type,
					onclick: this._onClick
				},
				children
			);
		}
	}
}

export default Button;
