import * as css from './styles/accordion-pane.m.css';
import { AccordionPaneProperties, AccordionPaneBase } from '@dojo/widgets/accordion-pane/index';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
import { theme } from '@dojo/framework/widget-core/mixins/Themed';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { w } from '@dojo/framework/widget-core/d';
import { from } from '@dojo/framework/shim/array';
import { Set } from '@dojo/framework/shim/Set';

@customElement<AccordionPaneProperties>({
	tag: 'db-accordion-pane',
	properties: ['openKeys', 'theme', 'extraClasses'],
	events: ['onRequestClose', 'onRequestOpen']
})
@theme(css)
export class AccordionPaneWidgetBase extends AccordionPaneBase<AccordionPaneProperties> {
	protected getKey() {
		return 'accordion-pane';
	}

	private _openKeys = new Set<string>();
	private oldOpenKeyArray: string[] = [];

	private _requestOpen(key: string) {
		const { onRequestOpen } = this.properties;
		this._openKeys.add(key);
		onRequestOpen && onRequestOpen(key);
		this.invalidate();
	}

	private _requestClose(key: string) {
		const { onRequestClose } = this.properties;
		this._openKeys.delete(key);
		onRequestClose && onRequestClose(key);
		this.invalidate();
	}

	protected render(): DNode {
		// 用户修改 openKeys 默认值时,要给 this._openKeys 重新赋值
		const { openKeys = [] } = this.properties;
		// 判断是否为用户修改 openKeys 默认值操作
		let isNotSameOpenKeys: boolean = false;
		if (this.oldOpenKeyArray.length !== openKeys.length) {
			isNotSameOpenKeys = true;
		} else {
			for (let i = 0; i < openKeys.length; i++) {
				if (this.oldOpenKeyArray[i] !== openKeys[i]) {
					isNotSameOpenKeys = true;
					break;
				}
			}
		}
		if (isNotSameOpenKeys) {
			this._openKeys = new Set<string>();
			openKeys.forEach((openKey) => {
				this._openKeys.add(openKey);
			});
			this.oldOpenKeyArray = openKeys;
		}

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
