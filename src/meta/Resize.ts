import { Base } from '@dojo/widget-core/meta/Base';
import ResizeObserver from 'resize-observer-polyfill';

export class Resize extends Base {
	private _observer: ResizeObserver;
	private _observeDom: Element;
	private _targetResized: boolean = false;

	private _changeObservedDom(element: Element) {
		if (this._observeDom != null && this._observeDom !== element) {
			this._observer.unobserve(this._observeDom);
		}

		// 注意，一定不能重复为同一个元素绑定监听事件，
		// 因为每绑定一次都会触发监听回调函数，
		// 从而进入无限循环。
		if (this._observeDom !== element) {
			this._observeDom = element;
			// 如果节点没有变化，则不用再次绑定

			this._observer.observe(this._observeDom);
		}
	}

	public get(key: string | number): boolean {
		const node = this.getNode(key);
		if (!node) {
			this._targetResized = false;
			return this._targetResized;
		}
		if (!this._observer) {
			this._observer = new ResizeObserver((entries, observer) => {
				for (const entry of entries) {
					console.log('resize:', entry.contentRect);
					if (entry.target === node) {
						this._targetResized = true;
						break;
					}
				}
				this.invalidate();
			});
		}

		this._changeObservedDom(node);
		return this._targetResized;
	}
}

export default ResizeObserver;
