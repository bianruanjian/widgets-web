import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v } from '@dojo/widget-core/d';

import 'bootstrap/dist/css/bootstrap.min.css';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import * as css from './styles/button.m.css';

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
	onClick?(): void;
};

export const ThemedBase = ThemedMixin(WidgetBase);


@customElement<ButtonProperties>({
	tag: 'brj-button',
	attributes: ['id',
				'value',
				'appearance',
				'size',
				'disabled',
				'type',
				'fluidWidth',
				'active',
				'href',
				'target'],
	properties: [],
	events: ['onClick']
})
@theme(css)
export class Button<P extends ButtonProperties = ButtonProperties> extends ThemedBase<P> {

	private _onClick (event: MouseEvent) {
		event.stopPropagation();
		this.properties.onClick && this.properties.onClick();
	}

	protected render(): DNode | DNode[] {
		let{
			id,
			value,
			appearance,
			size,
			disabled,
			type,
			fluidWidth,
			active,
			href,
			target
		}=this.properties;
		if (this.children.length === 0) {
			this.children.push(value || '按钮');
		}
		if(size) {
			if(size === "large") {
				size = 'lg';
			}else if(size === "small") {
				size ='sm';
			}else {
				size = '';
			}
		}

		if(appearance === "default") {
			appearance = "";
		}

		if(href){//使用a标签
			return v(
				'a', 
				{
					href: `${href}`, 
					target: target != null ? `${target}` : '_self',
					classes:[
						'btn',
						appearance !== '' ? `btn-${appearance}`: undefined,
						size !== '' ? `btn-${size}` : undefined,
						fluidWidth ? 'btn-block' : undefined,
						active ? 'active' : undefined
					],
					role: "button"
				}, this.children);
		}else{
			return v(
				'button', 
				{
					id: id, 
					classes: [
						'btn',
						appearance !== '' ? `btn-${appearance}`: undefined,
						size !== '' ? `btn-${size}` : undefined,
						fluidWidth ? 'btn-block' : undefined,
						active ? 'active' : undefined
						], 
					disabled: disabled,
					type: type,
					onclick:this._onClick,
				}, 
				this.children);
		}
	}
}

export default Button;
