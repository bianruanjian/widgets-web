const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import { GridColumn, GridColumnProperties}  from './../../index';

describe('GridColumn', () => {

	let defaultProperties: GridColumnProperties = {
		offset: "default",
		borderLeft: false,
		borderTop: false,
		borderRight: false,
		borderBottom: false,
		borderColor: "default",
		borderRadius: "default",
		marginTop: "default",
		marginBottom: "default",
		marginLeft: "default",
		marginRight: "default",
		paddingTop: "default",
		paddingBottom: "default",
		paddingLeft: "default",
		paddingRight: "default",
		fontWeight: "default",
		fontItalic: false,
		textDecoration: "default",
		alignment: "default",
		transform: "default",
		truncate: "default",
		wrap: 0,
		flexDirection: "default",
		reverse: false,
		justifyItems: "default",
		alignItems: "default",
		flexWrap: "default",
		alignContent: "default",
		alignSelf: "default",
		order: "default"
	};

	let customProperties: GridColumnProperties = {
		widgetId: "random-id",
		offset: 1,
		borderLeft: true,
		borderTop: true,
		borderRight: true,
		borderBottom: true,
		borderColor: "primary",
		borderRadius: "top",
		marginTop: "0",
		marginBottom: "0",
		marginLeft: "1",
		marginRight: "1",
		paddingTop: "0",
		paddingBottom: "0",
		paddingLeft: "1",
		paddingRight: "1",
		fontWeight: "light",
		fontItalic: true,
		textDecoration: "underline",
		alignment: "left",
		transform: "lowerCase",
		truncate: 40,
		wrap: 1,
		flexDirection: "row",
		reverse: true,
		justifyItems: "start",
		alignItems: "start",
		flexWrap: "nowrap",
		alignContent: "start",
		alignSelf: "start",
		order: 0
	};

	it('should construct GridColumn', () => {
		const h = harness(() => w(GridColumn, {}));
		h.expect(() => v('div',{ id: undefined, classes: [
			'col'
		], styles: {}}, []));
	});

	it('default properties', () => {
		const h = harness(() => w(GridColumn, defaultProperties));
		h.expect(() => v('div',{ id: undefined, classes: [
			'col'
		], styles: {}}, []));
	});

	it('custom properties', () => {
		const h = harness(() => w(GridColumn, customProperties));
		h.expect(() => v('div',{ id: "random-id", classes: [
			'col',
			"offset-1",
			'border',
			'border-primary',
			'rounded-top',
			'my-0',
			'mx-1',
			'py-0',
			'px-1',
			'font-weight-light',
			'font-italic',
			'text-left',
			'text-lowerCase',
			'text-truncate',
			'text-nowrap',
			'flex-row-reverse',
			'justify-content-start',
			'align-items-start',
			'flex-nowrap',
			'align-content-start',
			'align-self-start',
			'order-0',
			'_src_common_base_m__textDecorationUnderline'
		], styles: {
			"maxWidth": "40px",
			"width": "1rem"
		}}, []));
	});

	it('textDecoration', () => {
		const h = harness(() => w(GridColumn, {textDecoration: "overline"}));
		h.expect(() => v('div',{ id: undefined, classes: [
			'col',
			'_src_common_base_m__textDecorationOverline'
		], styles: {
		}}, []));
		const h1 = harness(() => w(GridColumn, {textDecoration: "lineThrough"}));
		h1.expect(() => v('div',{ id: undefined, classes: [
			'col',
			'_src_common_base_m__textDecorationLineThrough'
		], styles: {
		}}, []));
	});
});
