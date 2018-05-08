const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import Radio, { RadioProperties } from './../../index';
import { Label } from '../../../label';

describe('Radio', () => {
	const defaultProperties: RadioProperties = {
		checked: false,
		labelAfter: true,
		disabled: false,
		readOnly: false,
		fluid: false,
		size: 'default',
		marginTop: 'default',
		marginBottom: 'default',
		marginLeft: 'default',
		marginRight: 'default',
		paddingTop: 'default',
		paddingBottom: 'default',
		paddingLeft: 'default',
		paddingRight: 'default',
		alignSelf: 'default',
		order: 'default',
		float: 'default'
	};

	const customProperties: RadioProperties = {
		widgetId: 'random-id',
		name: 'demo',
		value: 'val',
		checked: true,
		label: 'demo',
		labelAfter: false,
		disabled: true,
		readOnly: true,
		fluid: true,
		size: 'small',
		invalidMessage: 'invalid-tip',
		validMessage: 'valid-tip',
		marginTop: '0',
		marginBottom: '0',
		marginLeft: '1',
		marginRight: '1',
		paddingTop: '0',
		paddingBottom: '0',
		paddingLeft: '1',
		paddingRight: '1',
		alignSelf: 'start',
		order: '0',
		float: 'none'
	};

	it('should construct Radio', () => {
		const h = harness(() => w(Radio, {}));
		h.expect(() =>
			v(
				'div',
				{
					key: 'radio',
					classes: ['form-check', undefined, 'form-check-inline']
				},
				[
					v('input', {
						type: 'radio',
						id: undefined,
						name: undefined,
						value: undefined,
						checked: false,
						disabled: false,
						readOnly: false,
						classes: ['form-check-input']
					}),
					null,
					null
				]
			)
		);
	});

	it('default properties', () => {
		const h = harness(() => w(Radio, defaultProperties));
		h.expect(() =>
			v(
				'div',
				{
					key: 'radio',
					classes: ['form-check', '', 'form-check-inline']
				},
				[
					v('input', {
						type: 'radio',
						id: undefined,
						name: undefined,
						value: undefined,
						checked: false,
						disabled: false,
						readOnly: false,
						classes: ['form-check-input']
					}),
					null,
					null
				]
			)
		);
	});

	it('custom properties', () => {
		const h = harness(() => w(Radio, customProperties));
		h.expect(() =>
			v(
				'div',
				{
					key: 'radio',
					classes: [
						'form-check',
						'form-control-sm',
						undefined,
						'my-0',
						'mx-1',
						'py-0',
						'px-1',
						'align-self-start',
						'order-0',
						'float-none'
					]
				},
				[
					w(Label, {
						classes: 'form-check-label',
						forId: 'random-id',
						value: 'demo'
					}),
					v('input', {
						type: 'radio',
						id: 'random-id',
						name: 'demo',
						value: 'val',
						checked: true,
						disabled: true,
						readOnly: true,
						classes: ['form-check-input']
					}),
					v(
						'div',
						{
							classes: ['invalid-tooltip']
						},
						['invalid-tip']
					)
				]
			)
		);
	});
});
