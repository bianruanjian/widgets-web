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
	disabled?: boolean | string;
	type?: string;
	fluidWidth?: boolean | string;
	active?: boolean | string;
	href?: string;
	target?: string;
	onClick?(): void;
}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<ButtonProperties>({
	tag: 'db-button',
	attributes: ['id', 'value', 'appearance', 'size', 'disabled', 'type', 'fluidWidth', 'active', 'href', 'target'],
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
		let { id, value, appearance, size, disabled, type, fluidWidth, active, href, target } = this.properties;
		if (this.children.length === 0) {
			this.children.push(value || '按钮');
		}
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
					classes: [
						'btn',
						appearance !== '' ? `btn-${appearance}` : undefined,
						sizeClass !== '' ? sizeClass : undefined,
						fluidWidth === true || fluidWidth === 'true' ? 'btn-block' : undefined,
						active === true || active === 'true' ? 'active' : undefined
					],
					role: 'button'
				},
				this.children
			);
		} else {
			return v(
				'button',
				{
					id: id,
					classes: [
						'btn',
						appearance !== '' ? `btn-${appearance}` : undefined,
						size !== '' ? `btn-${size}` : undefined,
						fluidWidth === true || fluidWidth === 'true' ? 'btn-block' : undefined,
						active === true || active === 'true' ? 'active' : undefined
					],
					disabled: disabled === true || disabled === 'true',
					type: type,
					onclick: this._onClick
				},
				this.children
			);
		}
	}
}

export default Button;
