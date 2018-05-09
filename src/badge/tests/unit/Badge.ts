const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import Badge, { BadgeProperties } from './../../index';

describe('Badge', () => {
	const defaultProperties: BadgeProperties = {
		appearance: 'default',
		pill: false,
		target: 'self',
		marginTop: 'default',
		marginBottom: 'default',
		marginLeft: 'default',
		marginRight: 'default',
		paddingTop: 'default',
		paddingBottom: 'default',
		paddingLeft: 'default',
		alignSelf: 'default',
		order: 'default'
	};

	const customProperties: BadgeProperties = {
		widgetId: 'random-id',
		value: 'val',
		appearance: 'primary',
		pill: true,
		href: 'https://badge.com',
		target: 'iframeId',
		marginTop: '0',
		marginBottom: '0',
		marginLeft: '1',
		marginRight: '1',
		paddingTop: '0',
		paddingBottom: '0',
		paddingLeft: '1',
		paddingRight: '1',
		alignSelf: 'start',
		order: 0
	};

	it('should construct Badge', () => {
		const h = harness(() => w(Badge, {}));
		h.expect(() =>
			v(
				'span',
				{
					id: undefined,
					key: 'badge',
					classes: ['badge'],
					href: undefined,
					target: undefined
				},
				[]
			)
		);
	});

	it('default properties', () => {
		const h = harness(() => w(Badge, defaultProperties));
		h.expect(() =>
			v(
				'span',
				{
					id: undefined,
					key: 'badge',
					classes: ['badge'],
					href: undefined,
					target: 'self'
				},
				[]
			)
		);
	});

	it('custom properties', () => {
		const h = harness(() => w(Badge, customProperties));
		h.expect(() =>
			v(
				'a',
				{
					id: 'random-id',
					key: 'badge',
					classes: [
						'badge',
						'badge-primary',
						'badge-pill',
						'my-0',
						'mx-1',
						'py-0',
						'px-1',
						'align-self-start',
						'order-0'
					],
					href: 'https://badge.com',
					target: 'iframeId'
				},
				['val']
			)
		);
	});
});
