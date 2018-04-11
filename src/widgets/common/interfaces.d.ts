/**
 * Border(边框)属性
 */
export interface BorderProperties{
    borderLeft?: boolean;
    borderTop?: boolean;
    borderRight?: boolean;
    borderBottom?: boolean;
    borderColor?: string;
    borderRadius?: string;
}

/**
 * Spacing(边距)属性
 */
export interface SpacingProperties{
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
 * Text(文本)属性
 */
export interface TextProperties{
    fontWeight?: string;
    fontItalic?: boolean;
    textDecoration?: string;
    alignment?: string;
    transform?: string;
    truncate?: number | string;
    wrap?: number;
}
