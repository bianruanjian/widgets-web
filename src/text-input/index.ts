import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

import { customElement } from '@dojo/widget-core/decorators/customElement';
import * as css from './styles/textinput.m.css';
import { v } from '@dojo/widget-core/d';

/**
 * @type TextInputProperties
 *
 * Properties that can be set on TextInput components
 */
export interface TextInputProperties { };

export const ThemedBase = ThemedMixin(WidgetBase);


@customElement({
	tag: 'brj-text-input',
	attributes: [],
	properties: [],
	events: []
})
@theme(css)
export class TextInput<P extends TextInputProperties = TextInputProperties> extends ThemedBase<P> {
	protected render(): DNode | DNode[] {
		return v('input', {}, []);
	}
}

export default TextInput;
