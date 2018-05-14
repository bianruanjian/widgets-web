const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import { View, ViewProperties } from './../../index';

describe('View', () => {
	let defaultProperties: ViewProperties = {
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

	let customProperties: ViewProperties = {
		widgetId: 'random-id',
		maxWidth: 40,
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
		truncate: '50%',
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

	it('should construct view', () => {
		const h = harness(() => w(View, {}));
		h.expect(() => v('div', { id: undefined, key: 'view', classes: [undefined], styles: {} }, []));
	});

	it('default properties', () => {
		const h = harness(() => w(View, defaultProperties));
		h.expect(() => v('div', { id: undefined, key: 'view', classes: [''], styles: {} }));
	});

	it('custom properties', () => {
		const h = harness(() => w(View, customProperties));
		h.expect(() =>
			v('div', {
				id: 'random-id',
				key: 'view',
				classes: [
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
					'order-0'
				],
				styles: {
					maxWidth: '40px',
					width: '1rem'
				}
			})
		);
	});

	it('border', () => {
		const h = harness(() => w(View, { borderTop: true, borderLeft: true }));
		h.expect(() =>
			v('div', {
				id: undefined,
				key: 'view',
				classes: ['border-left', 'border-top', undefined],
				styles: {}
			})
		);
		const h2 = harness(() => w(View, { borderTop: true, borderLeft: true, borderBottom: true, borderRight: true }));
		h2.expect(() =>
			v('div', {
				id: undefined,
				key: 'view',
				classes: ['border', undefined],
				styles: {}
			})
		);
	});

	it('margin x y blank', () => {
		const h = harness(() => w(View, { marginTop: '1', marginBottom: '2', marginRight: '3', marginLeft: '4' }));
		h.expect(() =>
			v('div', {
				id: undefined,
				key: 'view',
				classes: ['mt-1', 'mb-2', 'ml-4', 'mr-3', undefined],
				styles: {}
			})
		);
		const h1 = harness(() => w(View, { marginTop: '1', marginBottom: '1' }));
		h1.expect(() =>
			v('div', {
				id: undefined,
				key: 'view',
				classes: ['my-1', undefined],
				styles: {}
			})
		);
		const h2 = harness(() => w(View, { marginRight: '1', marginLeft: '1' }));
		h2.expect(() =>
			v('div', {
				id: undefined,
				key: 'view',
				classes: ['mx-1', undefined],
				styles: {}
			})
		);
		const h3 = harness(() => w(View, { marginTop: '1', marginBottom: '1', marginRight: '1', marginLeft: '1' }));
		h3.expect(() =>
			v('div', {
				id: undefined,
				key: 'view',
				classes: ['m-1', undefined],
				styles: {}
			})
		);
	});

	it('padding x y blank', () => {
		const h = harness(() => w(View, { paddingTop: '1', paddingBottom: '2', paddingRight: '3', paddingLeft: '4' }));
		h.expect(() =>
			v('div', {
				id: undefined,
				key: 'view',
				classes: ['pt-1', 'pb-2', 'pl-4', 'pr-3', undefined],
				styles: {}
			})
		);
		const h1 = harness(() => w(View, { paddingTop: '1', paddingBottom: '1' }));
		h1.expect(() =>
			v('div', {
				id: undefined,
				key: 'view',
				classes: ['py-1', undefined],
				styles: {}
			})
		);
		const h2 = harness(() => w(View, { paddingRight: '1', paddingLeft: '1' }));
		h2.expect(() =>
			v('div', {
				id: undefined,
				key: 'view',
				classes: ['px-1', undefined],
				styles: {}
			})
		);
		const h3 = harness(() => w(View, { paddingTop: '1', paddingBottom: '1', paddingRight: '1', paddingLeft: '1' }));
		h3.expect(() =>
			v('div', {
				id: undefined,
				key: 'view',
				classes: ['p-1', undefined],
				styles: {}
			})
		);
	});

	it('truncate', () => {
		const h = harness(() => w(View, { truncate: 50 }));
		h.expect(() =>
			v('div', {
				id: undefined,
				key: 'view',
				classes: ['text-truncate', undefined],
				styles: {
					maxWidth: '50px'
				}
			})
		);
		const h2 = harness(() => w(View, { truncate: '50%' }));
		h2.expect(() =>
			v('div', {
				id: undefined,
				key: 'view',
				classes: ['text-truncate', undefined],
				styles: {
					maxWidth: '50%'
				}
			})
		);
	});

	it('wrap', () => {
		const h = harness(() => w(View, { wrap: 0 }));
		h.expect(() =>
			v('div', {
				id: undefined,
				key: 'view',
				classes: [undefined],
				styles: {}
			})
		);
		const h2 = harness(() => w(View, { wrap: 5 }));
		h2.expect(() =>
			v('div', {
				id: undefined,
				key: 'view',
				classes: ['text-nowrap', undefined],
				styles: {
					width: '5rem'
				}
			})
		);
	});
});
