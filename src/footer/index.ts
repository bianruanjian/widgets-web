import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme, ThemedProperties } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { SpacingProperties, FlexContainerProperties, DisplayProperties } from '../common/interfaces';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import { v } from '@dojo/widget-core/d';
import { getSpacingClasses, getFlexContainerClasses, getDisplayClass } from '../common/util';

import * as css from './styles/footer.m.css';

/**
 * @type FooterProperties
 *
 * Properties that can be set on footer components
 */
export interface FooterProperties
	extends SpacingProperties,
		FlexContainerProperties,
		DisplayProperties,
		ThemedProperties {
	widgetId?: string;
}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<FooterProperties>({
	tag: 'db-footer',
	childType: CustomElementChildType.TEXT,
	attributes: [
		'widgetId',
		'marginTop',
		'marginBottom',
		'marginLeft',
		'marginRight',
		'paddingTop',
		'paddingBottom',
		'paddingLeft',
		'paddingRight',
		'display',
		'flexDirection',
		'reverse',
		'justifyItems',
		'alignItems',
		'flexWrap',
		'alignContent'
	],
	properties: [],
	events: []
})
@theme(css)
export class FooterBase<P extends FooterProperties = FooterProperties> extends ThemedBase<P> {
	protected getKey() {
		return 'footer';
	}
	protected render(): DNode | DNode[] {
		const { widgetId, display } = this.properties;

		let flexContainerClasses: string[] = [];

		if (display && (display === 'flex' || display === 'inlineFlex')) {
			flexContainerClasses = getFlexContainerClasses(this.properties);
		}

		return v(
			'div',
			{
				id: widgetId,
				key: this.getKey(),
				classes: [
					this.theme(css.root),
					...getSpacingClasses(this.properties),
					display ? getDisplayClass(this.properties) : undefined,
					...flexContainerClasses
				]
			},
			this.children
		);
	}
}

export default class Footer extends FooterBase<FooterProperties> {}
