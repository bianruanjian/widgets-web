import * as css from './styles/tab-controller.m.css';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
import { theme } from '@dojo/framework/widget-core/mixins/Themed';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { TabControllerBase, TabControllerProperties } from '@dojo/widgets/tab-controller/index';
import { w } from '@dojo/framework/widget-core/d';

@customElement<TabControllerProperties>({
	tag: 'db-tab-controller',
	properties: ['theme', 'aria', 'extraClasses', 'activeIndex'],
	attributes: ['alignButtons'],
	events: ['onRequestTabChange', 'onRequestTabClose']
})
@theme(css)
export class TabControllerWidgetBase extends TabControllerBase<TabControllerProperties> {
	protected getKey() {
		return 'tab-controller';
	}

	// 通过 this.properties 传入的 _activeIndexFromProperties 会赋给该变量。
	// -1 表示 properties 中没有传入 activeIndex 的值
	private _activeIndexFromProperties: number = -1;

	// 通过 onRequestXXX 事件修改的值会赋给该变量；
	// render 方法中只使用该变量来重绘部件，
	// 所以如果通过 this.properties 修改了 _activeIndexFromProperties 后也要同步修改此变量。
	private _activeIndex: number = 0;

	private _requestTabChange(index: number, key: string) {
		const { onRequestTabChange } = this.properties;
		this._activeIndex = index;
		onRequestTabChange && onRequestTabChange(index, key);
		this.invalidate();
	}

	render(): DNode {
		const { activeIndex = -1 } = this.properties;

		if (this._activeIndexFromProperties !== activeIndex) {
			this._activeIndexFromProperties = activeIndex;
			this._activeIndex = activeIndex;
		}

		return w(
			TabControllerBase,
			{
				...this.properties,
				activeIndex: this._activeIndex,
				onRequestTabChange: this._requestTabChange
			},
			this.children
		);
	}
}

export default class TabController extends TabControllerWidgetBase {}
