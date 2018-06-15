import { v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme, ThemedProperties } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import { SpacingProperties, FlexItemProperties, ColorsProperties, DisplayProperties } from '../common/interfaces';
import { getSpacingClasses, getFlexItemClasses, getColorsClasses, getDisplayClass } from '../common/util';

import * as css from './styles/icon.m.css';

export const sizeMap: { [key: string]: string } = {
	extraSmall: 'fa-xs',
	small: 'fa-sm',
	large: 'fa-lg',
	'2x': 'fa-2x',
	'3x': 'fa-3x',
	'4x': 'fa-4x',
	'5x': 'fa-5x',
	'6x': 'fa-6x',
	'7x': 'fa-7x',
	'8x': 'fa-8x',
	'9x': 'fa-9x',
	'10x': 'fa-10x',
	default: ''
};
/**
 * @type IconProperties
 *
 * Properties that can be set on icon components
 *
 */
export interface IconProperties
	extends SpacingProperties,
		FlexItemProperties,
		ColorsProperties,
		DisplayProperties,
		ThemedProperties {
	widgetId?: string;
	value?: string;
	size?: string;
	alt?: string;
	title?: string;
}

export const ThemedBase = ThemedMixin(WidgetBase);

/**
 * 1. 若使用该部件需要在 package.json 文件中引入 svg-injector(https://github.com/tanem/svg-injector) 依赖或在 html 页面引入 svg-injector.js(https://cdnjs.com/libraries/svg-injector) 文件
 * 1. 从 https://github.com/FortAwesome/Font-Awesome/tree/master/advanced-options/svg-sprites 中下载 fa-brands.svg, fa-regular.svg, fa-solid.svg 到所在项目中，
 *    这三个 sprite 文件嵌入到 html 中之后， 会出现 id 相同的情况，因此当前的处理方式是修改三个文件中的 id
 * 		在 fa-brands.svg 中的 id 前添加 fab-；
 *		在 fa-regular.svg 中的 id 前添加 far-；
 *		在 fa-solid.svg 中的 id 前添加 fas-;
 * 1. 使用 svg-injector 导入 fa-brands.svg, fa-regular.svg, fa-solid.svg 三个文件。
 */
@customElement<IconProperties>({
	tag: 'db-icon',
	childType: CustomElementChildType.TEXT,
	attributes: [
		'widgetId',
		'value',
		'size',
		'alt',
		'title',
		'marginTop',
		'marginBottom',
		'marginLeft',
		'marginRight',
		'paddingTop',
		'paddingBottom',
		'paddingLeft',
		'paddingRight',
		'display',
		'alignSelf',
		'order',
		'textColor',
		'backgroundColor'
	],
	properties: [],
	events: []
})
@theme(css)
export class IconBase<P extends IconProperties = IconProperties> extends ThemedBase<P> {
	protected render(): DNode | DNode[] {
		const { widgetId, value, size, alt, title, display } = this.properties;

		let flexItemClasses: string[] = ['d-inline-block'];

		if (display && (display === 'flex' || display === 'inlineFlex')) {
			flexItemClasses = getFlexItemClasses(this.properties as FlexItemProperties);
		}

		let displayClass = getDisplayClass(this.properties);

		if (displayClass === undefined) {
			displayClass = '';
		}

		const cssClasses: string[] = [
			...getSpacingClasses(this.properties),
			display ? displayClass : '',
			...flexItemClasses,
			...getColorsClasses(this.properties)
		];

		if (size) {
			cssClasses.push(sizeMap[size as string]);
		}

		return v(
			'span',
			{
				id: widgetId,
				key: 'icon',
				classes: [this.theme(css.root), ...cssClasses],
				title
			},
			[
				v(
					'svg',
					{
						classes: ['svg-inline--fa'],
						fill: 'currentColor',
						alt,
						width: '1em',
						height: '1em'
					},
					[
						v('use', {
							href: `#${value}`
						})
					]
				)
			]
		);
	}
}

export default class Icon extends IconBase<IconProperties> {}
