const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import Select, { SelectProperties } from './../../index';
import { Label } from '../../../label';

describe('Select', () => {
	const defaultProperties: SelectProperties = {
		disabled: false,
		required: false,
		readOnly: false,
		plainText: false,
		labelField: 'label',
		valueField: 'value',
		size: 'default',
		marginTop: "default",
		marginBottom: "default",
		marginLeft: "default",
		marginRight: "default",
		paddingTop: "default",
		paddingBottom: "default",
		paddingLeft: "default",
		paddingRight: "default",
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
		plainText: true,
		options: "[{'value': 'value1', 'label': 'label1'}, {'value': 'value2', 'label': 'label2'}]",
		labelField: 'label',
		valueField: 'value',
		size: 'small',
		invalidMessage: 'invalid-tip',
		validMessage: 'valid-tip',
		marginTop: "0",
		marginBottom: "0",
		marginLeft: "1",
		marginRight: "1",
		paddingTop: "0",
		paddingBottom: "0",
		paddingLeft: "1",
		paddingRight: "1",
		alignSelf: 'start',
		order: '0',
		float: 'none'
	};

	it('should construct Select', () => {
		const h = harness(() => w(Select, {}));
		h.expect(() => [
			null,
			v('select', {
				id: undefined,
				name: undefined,
				disabled: false,
				required: false,
				readOnly: false,
				classes: ['form-control']
			}, [])
		]);
	});

	it('default properties', () => {
		const h = harness(() => w(Select, defaultProperties));
		h.expect(() => [
			null,
			v('select', {
				id: undefined,
				name: undefined,
				disabled: false,
				required: false,
				readOnly: false,
				classes: ['','form-control']
			}, [])
		]);
	});

	it('custom properties', () => {
		const h = harness(() => w(Select, customProperties));
		h.expect(() => [
			w(Label, { value: 'demo', forId: 'random-id' }),
			v('select', {
				id: 'random-id',
				name: 'demo',
				disabled: true,
				required: true,
				readOnly: true,
				classes: [
					'disabled',
					'form-control-sm',
					'form-control-plaintext',
					'my-0',
					'mx-1',
					'py-0',
					'px-1',
					'align-self-start',
					'order-0',
					'float-none'
				]
			}, [
				v('option', {
					value: 'value1',
					selected: false
				}, ['label1']),
				v('option', {
					value: 'value2',
					selected: true
				}, ['label2'])
			]),
			v('div',{
				classes: ['invalid-tooltip']
			}, ['invalid-tip'])
		]);
	});
});
