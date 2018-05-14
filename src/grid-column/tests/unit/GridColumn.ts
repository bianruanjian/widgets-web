const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import { GridColumn, GridColumnProperties } from './../../index';
import * as css from '../../../common/base.m.css';
import { textDecorationMap } from '../../../common/util';

describe('GridColumn', () => {
	let defaultProperties: GridColumnProperties = {
		offset: 'default',
		colspan: 'default',
		borderLeft: false,
		borderTop: false,
		borderRight: false,
		borderBottom: false,
		borderColor: 'default',
		borderRound: 'default',
		marginTop: 'default',
		marginBottom: 'default',
		marginLeft: 'default',
		marginRight: 'default',
		paddingTop: 'default',
		paddingBottom: 'default',
		paddingLeft: 'default',
		paddingRight: 'default',
		fontWeight: 'default',
		fontItalic: false,
		textDecoration: 'default',
		alignment: 'default',
		transform: 'default',
		truncate: 'default',
		wrap: 0,
		display: 'default',
		flexDirection: 'default',
		reverse: false,
		justifyItems: 'default',
		alignItems: 'default',
		flexWrap: 'default',
		alignContent: 'default',
		alignSelf: 'default',
		order: 'default'
	};

	let customProperties: GridColumnProperties = {
		widgetId: 'random-id',
		offset: 1,
		colspan: 2,
		borderLeft: true,
		borderTop: true,
		borderRight: true,
		borderBottom: true,
		borderColor: 'primary',
		borderRound: 'top',
		marginTop: '0',
		marginBottom: '0',
		marginLeft: '1',
		marginRight: '1',
		paddingTop: '0',
		paddingBottom: '0',
		paddingLeft: '1',
		paddingRight: '1',
		fontWeight: 'light',
		fontItalic: true,
		textDecoration: 'underline',
		alignment: 'left',
		transform: 'lowerCase',
		truncate: 40,
		wrap: 1,
		display: 'flex',
		flexDirection: 'row',
		reverse: true,
		justifyItems: 'start',
		alignItems: 'start',
		flexWrap: 'nowrap',
		alignContent: 'start',
		alignSelf: 'start',
		order: 0
	};

	type baseCssType = keyof typeof css;

	it('should construct GridColumn', () => {
		const h = harness(() => w(GridColumn, {}));
		h.expect(() =>
			v(
				'div',
				{
					id: undefined,
					key: 'grid-column',
					classes: ['col', undefined],
					styles: {}
				},
				[]
			)
		);
	});

	it('default properties', () => {
		const h = harness(() => w(GridColumn, defaultProperties));
		h.expect(() =>
			v(
				'div',
				{
					id: undefined,
					key: 'grid-column',
					classes: ['col', undefined],
					styles: {}
				},
				[]
			)
		);
	});

	it('custom properties', () => {
		const h = harness(() => w(GridColumn, customProperties));
		const textDecorationClass = textDecorationMap['underline'];
		h.expect(() =>
			v(
				'div',
				{
					id: 'random-id',
					key: 'grid-column',
					classes: [
						'col-2',
						'offset-1',
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
						'd-flex',
						'flex-row-reverse',
						'justify-content-start',
						'align-items-start',
						'flex-nowrap',
						'align-content-start',
						'align-self-start',
						'order-0',
						css[textDecorationClass as baseCssType]
					],
					styles: {
						maxWidth: '40px',
						width: '1rem'
					}
				},
				[]
			)
		);
	});

	it('textDecoration', () => {
		const h = harness(() => w(GridColumn, { textDecoration: 'overline' }));
		let textDecorationClass = textDecorationMap['overline'];
		h.expect(() =>
			v(
				'div',
				{
					id: undefined,
					key: 'grid-column',
					classes: ['col', undefined, css[textDecorationClass as baseCssType]],
					styles: {}
				},
				[]
			)
		);
		const h1 = harness(() => w(GridColumn, { textDecoration: 'lineThrough' }));
		textDecorationClass = textDecorationMap['lineThrough'];
		h1.expect(() =>
			v(
				'div',
				{
					id: undefined,
					key: 'grid-column',
					classes: ['col', undefined, css[textDecorationClass as baseCssType]],
					styles: {}
				},
				[]
			)
		);
	});

	it('offset is zero', () => {
		const h = harness(() => w(GridColumn, { offset: 0 }));
		h.expect(() =>
			v(
				'div',
				{
					id: undefined,
					key: 'grid-column',
					classes: ['col', 'offset-0', undefined],
					styles: {}
				},
				[]
			)
		);
	});
});
