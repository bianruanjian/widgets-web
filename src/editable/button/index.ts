import { v } from '@dojo/widget-core/d';

import EditableWidgetBase from '../EditableWidgetBase';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as css from './styles/Button.m.css';

export default class Button extends EditableWidgetBase {
	protected render() {
		const { widget, activeWidgetId, onFocus } = this.properties;

		this.tryFocus(widget, activeWidgetId, onFocus);

		const { value, 
			appearance, 
			size, 
			disabled,
			fluidWidth,
			active } = widget.properties;

		if (this.children.length === 0) {
			this.children.push(value || '按钮');
		}

		// 需要添加遮盖层的部件是明确的，因此这里不需要传入是否显示遮盖层的参数。
		return v(
			// 这里没有使用 button，因为
			// 1. 如果使用 button 按钮，则需要在上面添加遮盖层，以屏蔽默认事件，但这样就无法选中子节点了
			// 2. 绑定在 button 子节点（如 icon) 上的事件在 chrome 中可以触发，但是在 firefox 中无法触发
			// button -> div
			// 而使用 div 则可以解决上述两个问题，并且也可以看到相同的按钮样式。
			'div',
			{
				key: this.rootKey,
				classes: [
					'btn',
					css.root,
					appearance !== '' ? `btn-${appearance}`: undefined,
					size !== '' ? `btn-${size}` : undefined,
					active? 'active': undefined,
					fluidWidth? 'btn-block': undefined
				],
				disabled: disabled ? true : false,
				onmouseup: this.onMouseUp
			},
			this.children
		);
	}
}
