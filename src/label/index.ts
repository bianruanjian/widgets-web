import { v } from '@dojo/framework/widget-core/d';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, theme, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/framework/widget-core/registerCustomElement';

import * as css from './styles/label.m.css';

/**
 * @type LabelProperties
 *
 * Properties that can be set on label components
 */
export interface LabelProperties extends ThemedProperties {
	widgetId?: string;
	value?: string;
	forId?: string;
	classes?: string | string[];
}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<LabelProperties>({
	tag: 'db-label',
	childType: CustomElementChildType.TEXT,
	attributes: ['widgetId', 'value', 'forId'],
	properties: [],
	events: []
})
@theme(css)
export class LabelBase<P extends LabelProperties = LabelProperties> extends ThemedBase<P> {
	protected getKey() {
		return 'label';
	}
	protected render(): DNode | DNode[] {
		let { widgetId, value, forId, classes } = this.properties;

		if (classes && typeof classes === 'string') {
			classes = [classes];
		}

		return v(
			'label',
			{
				id: widgetId,
				key: this.getKey(),
				for: forId,
				classes: classes
					? [this.theme(css.root), css.fontDirection, ...(classes as string[])]
					: [this.theme(css.root), css.fontDirection]
			},
			[value, ...this.children]
		);
	}
}

export default class Label extends LabelBase<LabelProperties> {}
