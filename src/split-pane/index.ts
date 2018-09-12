import * as css from './styles/split-pane.m.css';
import { SplitPaneProperties, SplitPaneBase } from '@dojo/widgets/split-pane/index';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
import { theme } from '@dojo/framework/widget-core/mixins/Themed';
import { w } from '@dojo/framework/widget-core/d';

@customElement<SplitPaneProperties>({
	tag: 'dojo-split-pane',
	properties: ['theme', 'extraClasses', 'size', 'collapseWidth'],
	attributes: ['direction'],
	events: ['onCollapse', 'onResize']
})
@theme(css)
export class SplitPaneWidgetBase extends SplitPaneBase<SplitPaneProperties> {
	protected getKey() {
		return 'split-pane';
	}

	private _size = 100;

	private onResize(size: number) {
		const { onResize } = this.properties;
		this._size = size;
		onResize && onResize(size);
		this.invalidate();
	}

	private _onCollapse(collapsed: boolean) {
		const { onCollapse } = this.properties;
		onCollapse && onCollapse(collapsed);
		this.invalidate();
	}

	protected render(): DNode {
		return w(
			SplitPaneBase,
			{
				...this.properties,
				size: this._size,
				onResize: this.onResize,
				onCollapse: this._onCollapse
			},
			this.children
		);
	}
}

export default class SplitPane extends SplitPaneWidgetBase {}
