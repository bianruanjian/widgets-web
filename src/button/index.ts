import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme, ThemedProperties } from '@dojo/widget-core/mixins/Themed';
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
export interface ButtonProperties extends ThemedProperties {
	widgetId?: string;
	value?: string;
	valuePosition?: string;
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
		'valuePosition',
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
export class ButtonBase<P extends ButtonProperties = ButtonProperties> extends ThemedBase<P> {
	private _onClick(event: MouseEvent) {
		event.stopPropagation();
		this.properties.onClick && this.properties.onClick();
	}

	protected render(): DNode | DNode[] {
		let {
			widgetId,
			value,
			valuePosition,
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

		let children: DNode[];

		if (value && valuePosition && valuePosition === 'left') {
			children = [value, ...this.children];
		} else if (value && valuePosition && valuePosition === 'top') {
			children = [
				v(
					'span',
					{
						classes: ['d-block']
					},
					[value]
				),
				...this.children
			];
		} else if (value && valuePosition && valuePosition === 'top') {
			children = [
				...this.children,
				v(
					'span',
					{
						classes: ['d-block']
					},
					[value]
				)
			];
		} else {
			children = [...this.children, value];
		}

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
								this.theme(css.root),
								'list-group-item',
								'list-group-item-action',
								appearance && appearance !== 'default' ? `list-group-item-${appearance}` : undefined,
								active === true || active === 'true' ? 'active' : undefined
						  ]
						: [
								this.theme(css.root),
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
								this.theme(css.root),
								'list-group-item',
								'list-group-item-action',
								appearance && appearance !== 'default' ? `list-group-item-${appearance}` : undefined,
								active === true || active === 'true' ? 'active' : undefined
						  ]
						: [
								this.theme(css.root),
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

export default class Button extends ButtonBase<ButtonProperties> {}
