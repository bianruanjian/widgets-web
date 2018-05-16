import { v } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';

import * as css from './styles/label.m.css';

/**
 * @type LabelProperties
 *
 * Properties that can be set on label components
 */
export interface LabelProperties extends WidgetProperties {
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
export class Label<P extends LabelProperties = LabelProperties> extends ThemedBase<P> {
	protected render(): DNode | DNode[] {
		let { widgetId, value, forId, classes } = this.properties;
		return v(
			'label',
			{
				id: widgetId,
				key: 'label',
				for: forId,
				classes
			},
			value ? [value, ...this.children] : this.children
		);
	}
}

export default Label;
