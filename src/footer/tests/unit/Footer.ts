const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import Footer, { FooterProperties } from './../../index';

describe('Footer', () => {
	const defaultProperties: FooterProperties = {
		marginTop: 'default',
		marginBottom: 'default',
		marginLeft: 'default',
		marginRight: 'default',
		paddingTop: 'default',
		paddingBottom: 'default',
		paddingLeft: 'default',
		paddingRight: 'default',
		display: 'default',
		flexDirection: 'default',
		reverse: false,
		justifyItems: 'default',
		alignItems: 'default',
		flexWrap: 'default',
		alignContent: 'default'
	};

	const customProperties: FooterProperties = {
		widgetId: 'random-id',
		marginTop: '0',
		marginBottom: '0',
		marginLeft: '1',
		marginRight: '1',
		paddingTop: '0',
		paddingBottom: '0',
		paddingLeft: '1',
		paddingRight: '1',
		display: 'flex',
		flexDirection: 'row',
		reverse: true,
		justifyItems: 'start',
		alignItems: 'start',
		flexWrap: 'nowrap',
		alignContent: 'start'
	};

	it('should construct Footer', () => {
		const h = harness(() => w(Footer, {}));
		h.expect(() =>
			v(
				'div',
				{
					id: undefined,
					key: 'footer',
					classes: [undefined]
				},
				[]
			)
		);
	});

	it('default properties', () => {
		const h = harness(() => w(Footer, defaultProperties));
		h.expect(() =>
			v(
				'div',
				{
					id: undefined,
					key: 'footer',
					classes: ['']
				},
				[]
			)
		);
	});

	it('custom properties', () => {
		const h = harness(() => w(Footer, customProperties));
		h.expect(() =>
			v(
				'div',
				{
					id: 'random-id',
					key: 'footer',
					classes: [
						'my-0',
						'mx-1',
						'py-0',
						'px-1',
						'd-flex',
						'flex-row-reverse',
						'justify-content-start',
						'align-items-start',
						'flex-nowrap',
						'align-content-start'
					]
				},
				[]
			)
		);
	});
});
