const { describe, it } = intern.getInterface('bdd');
import { v, w } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';
import { TextInput, TextInputProperties } from './../../index';
import * as root from './../../styles/text-input.m.css';
import Label from './../../../label/index';

describe('TextInput', () => {

	const defaultProperties: TextInputProperties = {
		type: 'default',
		password: false,
		placeholderAppearance: 'default',
		required: false,
		disabled: false,
		readOnly: false,
		size: 'default',
		focus: false,
		plainText: false,
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

	const customProperties: TextInputProperties = {
		widgetId: 'random-id',
		name: 'textInput',
		type: 'text',
		password: true,
		value: 'val',
		label: 'tag',
		placeholder: 'hold on',
		placeholderAppearance: 'default',
		required: true,
		disabled: true,
		readOnly: true,
		size: 'small',
		focus: true,
		plainText: true,
		maxLength: 5,
		minLength: 5,
		invalidMessage: 'invalid message',
		validMessage: 'valid message',
		onInput: () => {'1'},
		onChange: () => {'2'},
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

	it('should construct TextInput', () => {
		const h = harness(() => w(TextInput, {}));
		h.expect(() => v('div', {
			classes: [
				root['root'],
				'form-group',
				null,
				null,
				null
			],
		}, [
			null,
			v('div', {
				classes: ['input-group']
			}, [
				v('input',{
					id: undefined,
					name: undefined,
					type: '',
					value: undefined,
					placeholder: undefined,
					disabled: undefined,
					required: undefined,
					readOnly: undefined,
					maxlength: null,
					minlength: null,
					classes: ['form-control'],
					autofocus: undefined,
					oninput: () => {},
					onchange: () => {}
				}),
				null
			])
		]));
	});

	it('default properties', () => {
		const h = harness(() => w(TextInput, defaultProperties));
		h.expect(() => v('div', {
			classes: [
				root['root'],
				'form-group',
				null,
				null,
				null
			],
		}, [
			null,
			v('div', {
				classes: ['input-group']
			}, [
				v('input',{
					id: undefined,
					name: undefined,
					type: '',
					value: undefined,
					placeholder: undefined,
					disabled: false,
					required: false,
					readOnly: false,
					maxlength: null,
					minlength: null,
					classes: ['form-control'],
					autofocus: false,
					oninput: () => {},
					onchange: () => {}
				}),
				null
			])
		]));
	});

	it('custom properties', () => {
		const h = harness(() => w(TextInput, customProperties));
		h.expect(() => v('div', {
			classes: [
				root['root'],
				'form-group',
				'disabled',
				'form-control-plaintext',
				'form-control-small'
			],
		}, [
			w(Label, {
				value: 'tag',
				forId: 'random-id'
			}, []),
			v('div', {
				classes: [
					'input-group',
					'my-0',
					'mx-1',
					'py-0',
					'px-1',
					'align-self-start',
					'order-0',
					'float-none'
				]
			}, [
				v('input',{
					id: 'random-id',
					name: 'textInput',
					type: 'password',
					value: 'val',
					placeholder: 'hold on',
					disabled: true,
					required: true,
					readOnly: true,
					maxlength: '5',
					minlength: '5',
					classes: [
						'disabled',
						'form-control-small',
						'form-control-plaintext'
					],
					autofocus: true,
					oninput: () => {'1'},
					onchange: () => {'2'}
				}),
				v('div',{
					classes: ['invalid-tooltip']
				}, ['invalid message'])
			])
		]));
	});
});
