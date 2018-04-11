import { v } from '@dojo/widget-core/d';
import { DNode} from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import * as css from './styles/view.m.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BorderProperties, SpacingProperties, TextProperties} from '../common/interfaces';
/**
 * @type viewProperties
 *
 * Properties that can be set on view components
 */
export interface ViewProperties extends BorderProperties, SpacingProperties, TextProperties { 
	widgetId?: string;
	maxWidth?: number;
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
		}=this.properties;
		
		let cssClass = [];
		let cssStyle :any= {};
		let borderPropertyExist:boolean = false;

		if(maxWidth){
			cssStyle.maxWidth = `${maxWidth}px`;
		}

		if(borderLeft){
			cssClass.push('border-left');
			borderPropertyExist = true;
		}

		if(borderTop){
			cssClass.push('border-top');
			borderPropertyExist = true;
		}

		if(borderRight){
			cssClass.push('border-right');
			borderPropertyExist = true;
		}

		if(borderBottom){
			cssClass.push('border-bottom');
			borderPropertyExist = true;
		}

		if(borderColor && borderColor != "default"){
			if(!borderPropertyExist){
				cssClass.push('border');
			}
			cssClass.push(`border-${borderColor}`);
		}

		if(borderRadius && borderRadius != "default"){
			cssClass.push(`rounded-${borderRadius}`);
		}

		if(marginTop && marginTop != "default"){
			cssClass.push(`mt-${marginTop}`);
		}

		if(marginBottom && marginBottom != "default"){
			cssClass.push(`mb-${marginBottom}`);
		}

		if(marginLeft && marginLeft != "default"){
			cssClass.push(`ml-${marginLeft}`);
		}

		if(marginRight && marginRight != "default"){
			cssClass.push(`mr-${marginRight}`);
		}

		if(paddingTop && paddingTop != "default"){
			cssClass.push(`pt-${paddingTop}`);
		}

		if(paddingBottom && paddingBottom != "default"){
			cssClass.push(`pb-${paddingBottom}`);
		}

		if(paddingLeft && paddingLeft != "default"){
			cssClass.push(`pl-${paddingLeft}`);
		}

		if(paddingRight && paddingRight != "default"){
			cssClass.push(`pr-${paddingRight}`);
		}

		if(fontWeight && fontWeight != "default"){
			cssClass.push(`font-weight-${fontWeight}`);
		}

		if(fontItalic){
			cssClass.push('font-italic');
		}

		if(alignment && alignment != "default"){
			cssClass.push(`text-${alignment}`);
		}

		if(transform && transform != "default"){
			cssClass.push(`text-${transform}`);
		}

		if(truncate && truncate != "default"){
			cssClass.push('text-truncate');
			if(typeof truncate == "number"){
				cssStyle.maxWidth = `${truncate}px`;
			}else{
				cssStyle.maxWidth = `${truncate}`;
			}
		}

		if(wrap){
			cssClass.push('text-nowrap');
			cssStyle.width = `${wrap}px`;
		}

		return v(
			'div',
			{
				id: widgetId,
				classes: cssClass,
				styles: cssStyle
			},
			this.children			
		);
	}
}

export default View;
