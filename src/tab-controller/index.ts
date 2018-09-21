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

	private _activeIndex: number = 0;

	// -1 表示创建部件时初始值
	private _oldInitActiveIndex: number = -1;

	private _requestTabChange(index: number, key: string) {
		const { onRequestTabChange } = this.properties;
		this._activeIndex = index;
		onRequestTabChange && onRequestTabChange(index, key);
		this.invalidate();
	}

	render(): DNode {
		// 用户修改 activeIndex 默认值时，要给 _activeIndex 赋值启用该选项卡;
		const { activeIndex } = this.properties;
		if (this._oldInitActiveIndex !== activeIndex) {
			this._oldInitActiveIndex = activeIndex;
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
