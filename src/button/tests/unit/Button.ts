const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import Button, { ButtonProperties } from './../../index';
import * as css from './../../styles/button.m.css';

describe('Button', () => {
	const defaultProperties: ButtonProperties = {
		appearance: 'default',
		size: 'default',
		disabled: false,
		type: 'button',
		fluid: false,
		active: false,
		target: 'self'
	};

	const customProperties: ButtonProperties = {
		widgetId: 'random-id',
		value: 'val',
		appearance: 'primary',
		size: 'small',
		disabled: true,
		type: 'button',
		fluid: true,
		active: true,
		href: '#',
		target: 'self'
	};

	it('should construct button', () => {
		const h = harness(() => w(Button, {}));
		h.expect(() =>
			v(
				'button',
				{
					id: undefined,
					key: 'button',
					classes: [css.root, 'btn', undefined, undefined, undefined, undefined],
					disabled: false,
					type: undefined,
					onclick: () => {}
				},
				['按钮']
			)
		);
	});

	it('default properties', () => {
		const h = harness(() => w(Button, defaultProperties));
		h.expect(() =>
			v(
				'button',
				{
					id: undefined,
					key: 'button',
					classes: [css.root, 'btn', undefined, undefined, undefined, undefined],
					disabled: false,
					type: 'button',
					onclick: () => {}
				},
				['按钮']
			)
		);
	});

	it('custom properties', () => {
		const h = harness(() => w(Button, customProperties));
		h.expect(() =>
			v(
				'a',
				{
					id: 'random-id',
					key: 'button',
					href: '#',
					target: '_self',
					classes: [css.root, 'btn', 'btn-primary', 'btn-sm', 'btn-block', 'active'],
					role: 'button'
				},
				['val']
			)
		);
	});

	it('isListItem', () => {
		const h = harness(() => w(Button, { isListItem: true, appearance: 'primary' }));
		h.expect(() =>
			v(
				'button',
				{
					id: undefined,
					key: 'button',
					classes: [
						css.root,
						'list-group-item',
						'list-group-item-action',
						'list-group-item-primary',
						undefined
					],
					disabled: false,
					type: undefined,
					onclick: () => {}
				},
				['按钮']
			)
		);
	});
});
