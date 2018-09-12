import * as css from './styles/accordion-pane.m.css';
import { AccordionPaneProperties, AccordionPaneBase } from '@dojo/widgets/accordion-pane/index';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
import { theme } from '@dojo/framework/widget-core/mixins/Themed';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { w } from '@dojo/framework/widget-core/d';
import { from } from '@dojo/framework/shim/array';
import { Set } from '@dojo/framework/shim/Set';

@customElement<AccordionPaneProperties>({
	tag: 'dojo-accordion-pane',
	properties: ['openKeys', 'theme', 'extraClasses'],
	events: ['onRequestClose', 'onRequestOpen']
})
@theme(css)
export class AccordionPaneWidgetBase extends AccordionPaneBase<AccordionPaneProperties> {
	protected getKey() {
		return 'accordion-pane';
	}

	private _openKeys = new Set<string>();

	private _requestOpen(key: string) {
		this._openKeys.add(key);
		this.invalidate();
	}

	private _requestClose(key: string) {
		this._openKeys.delete(key);
		this.invalidate();
	}

	protected render(): DNode {
		return w(
			AccordionPaneBase,
			{
				...this.properties,
				onRequestOpen: this._requestOpen,
				onRequestClose: this._requestClose,
				openKeys: from(this._openKeys)
			},
			this.children
		);
	}
}

export default class AccordionPane extends AccordionPaneWidgetBase {}