import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { EditableWidgetProperties, UIInstWidget } from '../interfaces';
import { Dimensions, DimensionResults } from '@dojo/widget-core/meta/Dimensions';
import { Resize } from '../meta/Resize';

export default class EditableWidgetBase extends WidgetBase<EditableWidgetProperties> {
	protected rootKey = 'root';

	// 注意：这个变量的默认值必须是 undefined，不能是默认都为0，
	// 不然在第一次新增 input 等部件时，遮盖层会不生效。
	private _dimensions: DimensionResults | undefined;

	// 1. 当获取焦点后，通知聚焦框
	protected onMouseUp(event: MouseEvent) {
		event.stopImmediatePropagation();
		const { onFocus, widget } = this.properties;
		const dimensions = this.meta(Dimensions).get(this.rootKey);
		onFocus && onFocus({ activeWidgetDimensions: dimensions, activeWidgetId: widget.id });
	}

	protected tryFocus(
		widget: UIInstWidget,
		activeWidgetId: string | number,
		onFocus: (
			payload: { activeWidgetDimensions: Readonly<DimensionResults>; activeWidgetId: string | number }
		) => void
	) {
		if (this._isFocus(widget, activeWidgetId)) {
			this._focus(onFocus, activeWidgetId);
		}
	}

	protected get dimensions() {
		if (this._dimensions) {
			return this._dimensions;
		}
		return this.meta(Dimensions).get(this.rootKey);
	}

	private _focus(
		onFocus:
			| ((
					payload: { activeWidgetDimensions: Readonly<DimensionResults>; activeWidgetId: string | number }
				) => void)
			| undefined,
		activeWidgetId: string | number
	) {
		const activeWidgetDimensions = this.meta(Dimensions).get(this.rootKey);
		// 2. 当 page 的大小发生变化后，通知聚焦框
		this.meta(Resize).get(this.rootKey);
		onFocus && onFocus({ activeWidgetDimensions, activeWidgetId });

		this._dimensions = activeWidgetDimensions;
	}

	private _isFocus(widget: UIInstWidget, activeWidgetId: string | number) {
		return widget.id === activeWidgetId;
	}
}
