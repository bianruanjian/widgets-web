const { describe, it } = intern.getInterface('bdd');
import { w, v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';
import Checkbox, { CheckboxProperties } from './../../index';
import Label from '../../../label';
import * as css from './../../styles/checkbox.m.css';

describe('Checkbox', () => {
	const defaultProperties: CheckboxProperties = {
		checked: false,
		labelAfter: true,
		disabled: false,
		required: false,
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
		display: 'default',
		float: 'default'
	};

	const customProperties: CheckboxProperties = {
		widgetId: 'random-id',
		name: 'demo',
		value: 'val',
		checked: true,
		label: 'demo',
		labelAfter: false,
		disabled: true,
		required: true,
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
		display: 'flex',
		float: 'none'
	};

	it('should construct Checkbox', () => {
		const h = harness(() => w(Checkbox, {}));
		h.expect(() =>
			v(
				'div',
				{
					key: 'checkbox',
					classes: [css.root, 'form-check', undefined, 'form-check-inline', undefined]
				},
				[
					v('input', {
						type: 'checkbox',
						id: undefined,
						name: undefined,
						value: undefined,
						checked: false,
						disabled: false,
						required: false,
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
		const h = harness(() => w(Checkbox, defaultProperties));
		h.expect(() =>
			v(
				'div',
				{
					key: 'checkbox',
					classes: [css.root, 'form-check', '', 'form-check-inline', undefined]
				},
				[
					v('input', {
						type: 'checkbox',
						id: undefined,
						name: undefined,
						value: undefined,
						checked: false,
						disabled: false,
						required: false,
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
		const h = harness(() => w(Checkbox, customProperties));
		h.expect(() =>
			v(
				'div',
				{
					key: 'checkbox',
					classes: [
						css.root,
						'form-check',
						'form-control-sm',
						undefined,
						'my-0',
						'mx-1',
						'py-0',
						'px-1',
						'd-flex',
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
						type: 'checkbox',
						id: 'random-id',
						name: 'demo',
						value: 'val',
						checked: true,
						disabled: true,
						required: true,
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
