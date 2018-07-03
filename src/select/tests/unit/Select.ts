const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/widget-core/d';

import Select, { SelectProperties } from './../../index';
import Label from '../../../label';
import * as css from './../../styles/select.m.css';
import { compareWidgetId, compareKey, createHarness } from '../../../common/tests/test-helpers';

describe('Select', () => {
	const harness = createHarness([compareWidgetId, compareKey]);

	const defaultProperties: SelectProperties = {
		disabled: false,
		required: false,
		readOnly: false,
		labelField: 'label',
		valueField: 'value',
		size: 'default',
		marginTop: 'default',
		marginBottom: 'default',
		marginLeft: 'default',
		marginRight: 'default',
		paddingTop: 'default',
		paddingBottom: 'default',
		paddingLeft: 'default',
		paddingRight: 'default',
		display: 'default',
		alignSelf: 'default',
		order: 'default',
		float: 'default'
	};

	const customProperties: SelectProperties = {
		widgetId: 'random-id',
		name: 'demo',
		value: 'value2',
		label: 'demo',
		disabled: true,
		required: true,
		readOnly: true,
		options: "[{'value': 'value1', 'label': 'label1'}, {'value': 'value2', 'label': 'label2'}]",
		labelField: 'label',
		valueField: 'value',
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
		display: 'table',
		alignSelf: 'start',
		order: '0',
		float: 'none'
	};

	it('should construct Select', () => {
		const h = harness(() => w(Select, {}));
		h.expect(() => [
			null,
			v(
				'select',
				{
					id: '',
					key: 'select',
					name: undefined,
					disabled: false,
					required: false,
					readOnly: false,
					classes: ['form-control', undefined, css.root]
				},
				[]
			)
		]);
	});

	it('default properties', () => {
		const h = harness(() => w(Select, defaultProperties));
		h.expect(() => [
			null,
			v(
				'select',
				{
					id: '',
					key: 'select',
					name: undefined,
					disabled: false,
					required: false,
					readOnly: false,
					classes: ['', 'form-control', undefined, css.root]
				},
				[]
			)
		]);
	});

	it('custom properties', () => {
		const h = harness(() => w(Select, customProperties));
		h.expect(() => [
			w(Label, {
				value: 'demo',
				forId: 'random-id',
				classes: ['col-form-label', 'mr-3']
			}),
			v(
				'select',
				{
					id: 'random-id',
					key: 'select',
					name: 'demo',
					disabled: true,
					required: true,
					readOnly: true,
					classes: [
						'disabled',
						'form-control-sm',
						'form-control',
						'my-0',
						'mx-1',
						'py-0',
						'px-1',
						'd-table',
						'align-self-start',
						'order-0',
						'float-none',
						css.root
					]
				},
				[
					v(
						'option',
						{
							key: '',
							value: 'value1',
							selected: false
						},
						['label1']
					),
					v(
						'option',
						{
							key: '',
							value: 'value2',
							selected: true
						},
						['label2']
					)
				]
			),
			v(
				'div',
				{
					classes: ['invalid-tooltip']
				},
				['invalid-tip']
			)
		]);
	});
});
