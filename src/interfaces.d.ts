import { WidgetProperties } from '@dojo/widget-core/interfaces';
import { DimensionResults } from '@dojo/widget-core/meta/Dimensions';

/**
 * @type UIWidget
 *
 * UI 部件信息
 *
 * @property widgetId			部件标识
 * @property widgetName 		部件名称
 * @property props 				部件属性
 * @property isContainer		是否容器部件，如果是容器部件，则可在此部件中放置子部件；
 * 								如果不是容器部件，则不可在部件中放置子部件
 * @property iconClass  		部件图标样式类
 * @property label				部件显示名
 */
export interface UIWidget {
	widgetId: number;
	widgetName: string;
	properties: UIWidgetProperty[];
	isContainer: boolean;
	iconClass?: string;
	label?: string;
}

/**
 * @type UIWidgetProperty
 *
 * 通用 UI 模型部件的属性信息
 *
 * @property propId		属性标识
 * @property name		属性名
 * @property label		属性显示名
 * @property value		属性值
 * @property valueType	属性值类型,支持 string、int、float、date、boolean 类型
 * @property nls		是否支持国际化
 * @property options	属性可选值列表
 */
export interface UIWidgetProperty {
	propId: string;
	name: string;
	label: string;
	value: string;
	valueType: string;
	nls: boolean;
	options?: PropertyValueOption[];
}

/**
 * 属性值可选项
 *
 * @property value		可选值
 * @property label		可选值的显示值
 * @property iconClass	用图标表示可选值
 */
export interface PropertyValueOption {
	value: string;
	label?: string;
	iconClass: string;
}

/**
 * @type AttachedUIWidget
 *
 * 通用 UI 模型部件，将部件添加到模块的 UI 模型中后，用于描述组成页面的部件信息。
 *
 * @property id			关联到模块的部件标识
 * @property parentId	父标识，对应 id 属性
 */
export interface AttachedUIWidget extends UIWidget {
	id: string;
	parentId?: string;
}

/**
 * @type AttachedUIWidgetProperty
 *
 * 将部件关联到模块后，部件属性的标识
 *
 * @property id			归属于模块中部件的属性标识
 * @property parentId 	对属性做分组管理，指属性分组的 id
 */
export interface AttachedUIWidgetProperty extends UIWidgetProperty {
	id: string;
	parentId?: string;
}

/**
 * @type UIInstWidget
 *
 * 编辑器专用的 UI 实例部件，在渲染时使用
 *
 * @property id                 归属于模块的部件标识
 * @property widgetId           实例部件标识
 * @property widgetName         实例部件名称，此名称用作动态加载模块的注册 Label
 * @property widgetModuleName   实例部件模块名
 * @property properties         实例部件属性
 * @property overlay            是否在部件上添加遮盖层，默认为 false
 * @property parentId           模块中父部件标识，根部件的父标识为 -1
 */
export interface UIInstWidget {
	id: string;
	widgetId: number;
	widgetName: string;
	widgetModuleName?: string;
	properties: UIInstWidgetProperties;
	parentId: string;
}

export interface UIInstWidgetProperties extends WidgetProperties {
	id: string;
	value: string;
	[propName: string]: any;
}

/**
 * @type EditableWidgetProperties
 *
 * 编辑器专用部件属性
 */
export interface EditableWidgetProperties extends WidgetProperties {
	widget: UIInstWidget;
	onMouseUp?: (event: MouseEvent) => void;
	onFocus: (
		payload: {
			activeWidgetDimensions: Readonly<DimensionResults>;
			activeWidgetId: string | number;
		}
	) => void;
	activeWidgetId: string | number;
}
