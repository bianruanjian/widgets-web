import { v } from '@dojo/widget-core/d';
import { DNode} from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import * as css from './styles/view.m.css';
import { BorderProperties, SpacingProperties, TextProperties } from '../common/interfaces';
import { mixin } from '@dojo/core/lang';
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

	private _getBorderClasses(){
		let{
			borderLeft,
			borderTop,
			borderRight,
			borderBottom,
			borderColor,
			borderRadius
		} = this.properties;

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

		if(borderColor && borderColor != "default"){
			borderClasses.push(`border-${borderColor}`);
		}

		if(borderRadius && borderRadius != "default"){
			borderClasses.push(`rounded-${borderRadius}`);
		}

		return borderClasses;
	}

	private _getSpacingClasses() {
		let{
			marginTop,
			marginBottom,
			marginLeft,
			marginRight,
			paddingTop,
			paddingBottom,
			paddingLeft,
			paddingRight
		} = this.properties;

		let spacingClasses: any[] = [];

		if (
			marginTop && marginTop != "default" && 
			marginTop === marginBottom &&
			marginTop === marginLeft &&
			marginTop === marginRight
		) {
			spacingClasses.push(`m-${marginTop}`);
		} else {
			if (marginTop && marginTop != "default" && marginTop === marginBottom) {
				spacingClasses.push(`my-${marginTop}`);
			} else {
				if(marginTop && marginTop != "default"){
					spacingClasses.push(`mt-${marginTop}`);
				}

				if(marginBottom && marginBottom != "default"){
					spacingClasses.push(`mb-${marginBottom}`);
				}
			}

			if ( marginLeft && marginLeft != "default" && marginLeft === marginRight ) {
				spacingClasses.push(`mx-${marginLeft}`);
			} else {
				if(marginLeft && marginLeft != "default"){
					spacingClasses.push(`ml-${marginLeft}`);
				}

				if(marginRight && marginRight != "default"){
					spacingClasses.push(`mr-${marginRight}`);
				}
			}
		}

		if (
			paddingTop && paddingTop != "default" && 
			paddingTop === paddingBottom &&
			paddingTop === paddingLeft &&
			paddingTop === paddingRight
		) {
			spacingClasses.push(`p-${paddingTop}`);
		} else {
			if (paddingTop && paddingTop != "default" && paddingTop === paddingBottom) {
				spacingClasses.push(`py-${paddingTop}`);
			} else {
				if(paddingTop && paddingTop != "default"){
					spacingClasses.push(`pt-${paddingTop}`);
				}

				if(paddingBottom && paddingBottom != "default"){
					spacingClasses.push(`pb-${paddingBottom}`);
				}
			}

			if ( paddingLeft && paddingLeft != "default" && paddingLeft === paddingRight ) {
				spacingClasses.push(`px-${paddingLeft}`);
			} else {
				if(paddingLeft && paddingLeft != "default"){
					spacingClasses.push(`pl-${paddingLeft}`);
				}

				if(paddingRight && paddingRight != "default"){
					spacingClasses.push(`pr-${paddingRight}`);
				}
			}
		}

		return spacingClasses;

	}

	private _getTextClasses() {
		let{
			fontWeight,
			fontItalic,
			alignment,
			transform,
			truncate,
			wrap
		} = this.properties;

		let textClasses: any[] = [];

		if(fontWeight && fontWeight != "default"){
			textClasses.push(`font-weight-${fontWeight}`);
		}

		if(fontItalic){
			textClasses.push('font-italic');
		}

		if(alignment && alignment != "default"){
			textClasses.push(`text-${alignment}`);
		}

		if(transform && transform != "default"){
			textClasses.push(`text-${transform}`);
		}

		if(truncate && truncate != "default"){
			textClasses.push('text-truncate');
		}

		if(wrap){
			textClasses.push('text-nowrap');
		}

		return textClasses;
	}

	private _getTextStyles() {
		let{
			truncate,
			wrap
		} = this.properties;

		let textStyles: any = {};

		if(truncate && truncate != "default"){
			if(typeof truncate == "number"){
				textStyles.maxWidth = `${truncate}px`;
			}else{
				textStyles.maxWidth = `${truncate}`;
			}
		}

		if(wrap){
			textStyles.width = `${wrap}rem`;
		}

		return textStyles;
	}

	protected render(): DNode | DNode[] {
		
		let{
			widgetId,
			maxWidth,
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

		cssClasses = cssClasses.concat(this._getBorderClasses());

		cssClasses = cssClasses.concat(this._getSpacingClasses());

		cssClasses = cssClasses.concat(this._getTextClasses());

		mixin(cssStyles, this._getTextStyles());
		
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
