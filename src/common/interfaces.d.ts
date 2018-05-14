/**
 * @type BorderProperties
 *
 * Border(边框)属性
 *
 * @property borderLeft     左边框
 * @property borderTop      上边框
 * @property borderRight    右边框
 * @property borderBottom   下边框
 * @property borderColor    颜色
 * @property borderRound    圆角
 */
export interface BorderProperties {
	borderLeft?: boolean | string;
	borderTop?: boolean | string;
	borderRight?: boolean | string;
	borderBottom?: boolean | string;
	borderColor?: string;
	borderRound?: string;
}

/**
 * @type SpacingProperties
 *
 * Spacing(边距)属性
 *
 * @property marginTop          顶外边距
 * @property marginBottom       底外边距
 * @property marginLeft         左外边距
 * @property marginRight        右外边距
 * @property paddingTop         顶内边距
 * @property paddingBottom      底内边距
 * @property paddingLeft        左内边距
 * @property paddingRight       右内边距
 */
export interface SpacingProperties {
	marginTop?: string;
	marginBottom?: string;
	marginLeft?: string;
	marginRight?: string;
	paddingTop?: string;
	paddingBottom?: string;
	paddingLeft?: string;
	paddingRight?: string;
}

/**
 * @type TextProperties
 *
 * Text(文本)属性
 *
 * @property fontWeight        粗细
 * @property fontItalic        斜体
 * @property textDecoration    文本修饰
 * @property alignment         对齐方式
 * @property transform         转化
 * @property truncate          截取长度
 * @property wrap              包装长度
 */
export interface TextProperties {
	fontWeight?: string;
	fontItalic?: boolean | string;
	textDecoration?: string;
	alignment?: string;
	transform?: string;
	truncate?: number | string;
	wrap?: number;
}

/**
 * @type FlexContainerProperties
 *
 * Flex Container(容器弹性)属性
 *
 * @property flexDirection     主轴方向
 * @property reverse           翻转
 * @property justifyItems      主轴排列方式
 * @property alignItems        侧轴排列方式
 * @property flexWrap          换行
 * @property alignContent      多轴排列方式
 */
export interface FlexContainerProperties {
	flexDirection?: string;
	reverse?: boolean | string;
	justifyItems?: string;
	alignItems?: string;
	flexWrap?: string;
	alignContent?: string;
}

/**
 * @type FlexItemProperties
 *
 * Flex Item(非容器弹性)属性
 *
 * @property alignSelf         侧轴排列方式
 * @property order             排序
 */
export interface FlexItemProperties {
	alignSelf?: string;
	order?: number | string;
}

/**
 * @type ColorsProperties
 *
 * Color(颜色)属性
 *
 * @property textColor         文本颜色
 * @property backgroundColor   背景色
 */
export interface ColorsProperties {
	textColor?: string;
	backgroundColor?: string;
}

/**
 * @type FloatProperties
 *
 * Float(浮动方向)属性
 *
 * @property float         浮动方向
 */
export interface FloatProperties {
	float?: string;
}

/**
 * @type FormProperties
 *
 * Form(表单)属性
 *
 * @property required         必填
 * @property disabled         失效
 * @property readOnly         只读
 */
export interface FormProperties {
	required?: boolean | string;
	disabled?: boolean | string;
	readOnly?: boolean | string;
}

/**
 * @type MessageProperties
 *
 * Message(消息)属性
 *
 * @property invalidMessage         无效提示
 * @property validMessage           有效提示
 */
export interface MessageProperties {
	invalidMessage?: string;
	validMessage?: string;
}

/**
 * @type DisplayProperties
 *
 * Display(显示类型)属性
 *
 * @property display         显示类型
 */
export interface DisplayProperties {
	display?: string;
}
