const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/framework/widget-core/d';
import harness from '@dojo/framework/testing/harness';

import Badge, { BadgeProperties } from './../../index';
import * as css from './../../styles/badge.m.css';
import Text from '../../../text';

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
		paddingLeft: 'default'
	};

	const customProperties: BadgeProperties = {
		widgetId: 'random-id',
		value: 'val',
		valuePosition: 'left',
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
		paddingRight: '1'
	};

	it('should construct Badge', () => {
		const h = harness(() => w(Badge, {}));
		h.expect(() =>
			v(
				'span',
				{
					id: undefined,
					key: 'badge',
					classes: [css.root, 'badge'],
					href: undefined,
					target: undefined
				},
				[undefined]
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
					classes: [css.root, 'badge'],
					href: undefined,
					target: '_self'
				},
				[undefined]
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
					classes: [css.root, 'badge', 'badge-primary', 'badge-pill', 'my-0', 'mx-1', 'py-0', 'px-1'],
					href: 'https://badge.com',
					target: 'iframeId'
				},
				['val']
			)
		);
	});

	it('valuePosition is left', () => {
		const h = harness(() => w(Badge, { value: 'val', valuePosition: 'left' }, [w(Text, { value: 'abc' })]));
		h.expect(() =>
			v(
				'span',
				{
					id: undefined,
					key: 'badge',
					classes: [css.root, 'badge'],
					href: undefined,
					target: undefined
				},
				['val', w(Text, { value: 'abc' })]
			)
		);
	});
});
