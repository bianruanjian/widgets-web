import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v } from '@dojo/widget-core/d';
import { customElement } from '@dojo/widget-core/decorators/customElement';

import * as css from './styles/button.m.css';

const sizeMap: { [key: string]: string } = {
	large: 'btn-lg',
	small: 'btn-sm',
	default: ''
};

/**
 * @type buttonProperties
 *
 * Properties that can be set on button components
 */
export interface ButtonProperties {
	id?: string;
	value?: string;
	appearance?: string;
	size?: string;
	disabled?: boolean;
	type?: string;
	fluidWidth?: boolean;
	active?: boolean;
	href?: string;
	target?: string;
	isListItem?: boolean;
	onClick?(): void;
}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<ButtonProperties>({
	tag: 'db-button',
	attributes: [
		'id',
		'value',
		'appearance',
		'size',
		'disabled',
		'type',
		'fluidWidth',
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
			id,
			value,
			appearance,
			size,
			disabled,
			type,
			fluidWidth,
			active,
			href,
			target,
			isListItem
		} = this.properties;
		const children: any[] = [value, ...this.children];
		let sizeClass: string = sizeMap[size as string];

		if (appearance === 'default') {
			appearance = '';
		}

		if (href) {
			//使用a标签
			return v(
				'a',
				{
					href: `${href}`,
					target: target != null ? `${target}` : '_self',
					classes: isListItem
						? [
								'list-group-item',
								'list-group-item-action',
								appearance !== '' ? `list-group-item-${appearance}` : undefined,
								active ? 'active' : undefined
						  ]
						: [
								'btn',
								appearance !== '' ? `btn-${appearance}` : undefined,
								sizeClass !== '' ? sizeClass : undefined,
								fluidWidth ? 'btn-block' : undefined,
								active ? 'active' : undefined
						  ],
					role: 'button'
				},
				children
			);
		} else {
			return v(
				'button',
				{
					id: id,
					classes: isListItem
						? [
								'list-group-item',
								'list-group-item-action',
								appearance !== '' ? `list-group-item-${appearance}` : undefined,
								active ? 'active' : undefined
						  ]
						: [
								'btn',
								appearance !== '' ? `btn-${appearance}` : undefined,
								sizeClass !== '' ? sizeClass : undefined,
								fluidWidth ? 'btn-block' : undefined,
								active ? 'active' : undefined
						  ],
					disabled: disabled,
					type: type,
					onclick: this._onClick
				},
				children
			);
		}
	}
}

export default Button;
