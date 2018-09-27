import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, theme, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';

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
		'target'
	],
	properties: [],
	events: ['onClick']
})
@theme(css)
export class ButtonBase<P extends ButtonProperties = ButtonProperties> extends ThemedBase<P> {
	protected getKey() {
		return 'button';
	}

	private _onClick(event: MouseEvent) {
		event.stopPropagation();
		this.properties.onClick && this.properties.onClick();
	}

	protected renderChildren(): DNode[] {
		let { value, valuePosition } = this.properties;

		if (!value || value === '') {
			return this.children;
		}

		if (!valuePosition || valuePosition === '') {
			return [...this.children, value];
		}

		if (valuePosition === 'left') {
			return [value, ...this.children];
		}

		if (valuePosition === 'top') {
			return [
				v(
					'span',
					{
						classes: ['d-block']
					},
					[value]
				),
				...this.children
			];
		}

		if (valuePosition === 'bottom') {
			return [
				...this.children,
				v(
					'span',
					{
						classes: ['d-block']
					},
					[value]
				)
			];
		}

		return [...this.children, value];
	}

	protected render(): DNode | DNode[] {
		let {
			widgetId,
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

		let sizeClass: string = sizeMap[size as string];

		if (target) {
			target = targetMap[target as string] || target;
		}

		const children: DNode[] = this.renderChildren();

		if (href) {
			// 使用a标签
			return v(
				'a',
				{
					id: widgetId,
					key: this.getKey(),
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
					key: this.getKey(),
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
