import { v } from '@dojo/widget-core/d';
import { DNode} from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import * as css from './styles/view.m.css';
import {BorderProperties, SpacingProperties, TextProperties} from '../common/interfaces';
/**
 * @type viewProperties
 *
 * Properties that can be set on view components
 */
export interface ViewProperties extends BorderProperties, SpacingProperties, TextProperties { 
	widgetId?: string;
	maxWidth?: number | string;
};

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<ViewProperties>({
	tag: 'db-view',
	childType: CustomElementChildType.TEXT,
	attributes: [
		'widgetId',
		'maxWidth',
		'borderLeft',
		'borderTop',
		'borderRight',
		'borderBottom',
		'borderColor',
		'borderRadius',
		'marginTop',
		'marginBottom',
		'marginLeft',
		'marginRight',
		'paddingTop',
		'paddingBottom',
		'paddingLeft',
		'paddingRight',
		'fontWeight',
		'fontItalic',
		'textDecoration',
		'alignment',
		'transform',
		'truncate',
		'wrap'
	],
	properties: [],
	events: []
})
@theme(css)
export class View<P extends ViewProperties = ViewProperties> extends ThemedBase<P> {
	protected render(): DNode | DNode[] {
		let{
			widgetId,
			maxWidth,
			borderLeft,
			borderTop,
			borderRight,
			borderBottom,
			borderColor,
			borderRadius,
			marginTop,
			marginBottom,
			marginLeft,
			marginRight,
			paddingTop,
			paddingBottom,
			paddingLeft,
			paddingRight,
			fontWeight,
			fontItalic,
			alignment,
			transform,
			truncate,
			wrap
		} = this.properties;
		
		let cssClasses: any[] = [];
		let cssStyles: any = {};

		if(maxWidth){
			if(typeof maxWidth == "number"){
				cssStyles.maxWidth = `${maxWidth}px`;
			}else{
				cssStyles.maxWidth = `${maxWidth}`;
			}
		}

		let borderClasses = [];

		if(borderLeft){
			borderClasses.push('border-left');
		}

		if(borderTop){
			borderClasses.push('border-top');
		}

		if(borderRight){
			borderClasses.push('border-right');
		}

		if(borderBottom){
			borderClasses.push('border-bottom');
		}

		if(borderClasses.length === 4){
			borderClasses = ['border'];
		}

		cssClasses = cssClasses.concat(borderClasses);

		if(borderColor && borderColor != "default"){
			cssClasses.push(`border-${borderColor}`);
		}

		if(borderRadius && borderRadius != "default"){
			cssClasses.push(`rounded-${borderRadius}`);
		}

		if (
			marginTop && marginTop != "default" && 
			marginTop === marginBottom &&
			marginTop === marginLeft &&
			marginTop === marginRight
		) {
			cssClasses.push(`m-${marginTop}`);
		} else {
			if (marginTop && marginTop != "default" && marginTop === marginBottom) {
				cssClasses.push(`my-${marginTop}`);
			} else {
				if(marginTop && marginTop != "default"){
					cssClasses.push(`my-${marginTop}`);
				}

				if(marginBottom && marginBottom != "default"){
					cssClasses.push(`mb-${marginBottom}`);
				}
			}

			if ( marginLeft && marginLeft != "default" && marginLeft === marginRight ) {
				cssClasses.push(`mx-${marginLeft}`);
			} else {
				if(marginLeft && marginLeft != "default"){
					cssClasses.push(`ml-${marginLeft}`);
				}

				if(marginRight && marginRight != "default"){
					cssClasses.push(`mr-${marginRight}`);
				}
			}
		}

		if (
			paddingTop && paddingTop != "default" && 
			paddingTop === paddingBottom &&
			paddingTop === paddingLeft &&
			paddingTop === paddingRight
		) {
			cssClasses.push(`p-${paddingTop}`);
		} else {
			if (paddingTop && paddingTop != "default" && paddingTop === paddingBottom) {
				cssClasses.push(`py-${paddingTop}`);
			} else {
				if(paddingTop && paddingTop != "default"){
					cssClasses.push(`py-${paddingTop}`);
				}

				if(paddingBottom && paddingBottom != "default"){
					cssClasses.push(`pb-${paddingBottom}`);
				}
			}

			if ( paddingLeft && paddingLeft != "default" && paddingLeft === paddingRight ) {
				cssClasses.push(`px-${paddingLeft}`);
			} else {
				if(paddingLeft && paddingLeft != "default"){
					cssClasses.push(`pl-${paddingLeft}`);
				}

				if(paddingRight && paddingRight != "default"){
					cssClasses.push(`pr-${paddingRight}`);
				}
			}
		}

		if(fontWeight && fontWeight != "default"){
			cssClasses.push(`font-weight-${fontWeight}`);
		}

		if(fontItalic){
			cssClasses.push('font-italic');
		}

		if(alignment && alignment != "default"){
			cssClasses.push(`text-${alignment}`);
		}

		if(transform && transform != "default"){
			cssClasses.push(`text-${transform}`);
		}

		if(truncate && truncate != "default"){
			cssClasses.push('text-truncate');
			if(typeof truncate == "number"){
				cssStyles.maxWidth = `${truncate}px`;
			}else{
				cssStyles.maxWidth = `${truncate}`;
			}
		}

		if(wrap){
			cssClasses.push('text-nowrap');
			cssStyles.width = `${wrap}rem`;
		}

		return v(
			'div',
			{
				id: widgetId,
				classes: cssClasses,
				styles: cssStyles
			},
			this.children			
		);
	}
}

export default View;
