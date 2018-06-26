const { describe, it } = intern.getInterface('bdd');
import { v, w } from '@dojo/widget-core/d';
import TextInput, { TextInputProperties } from './../../index';
import Label from './../../../label/index';
import * as css from './../../styles/text-input.m.css';
import { compareWidgetId, createHarness } from '../../../common/tests/test-helpers';

describe('TextInput', () => {
	const harness = createHarness([compareWidgetId]);

	const defaultProperties: TextInputProperties = {
		type: 'default',
		password: false,
		placeholderAppearance: 'default',
		required: false,
		disabled: false,
		readOnly: false,
		size: 'default',
		shouldFocus: false,
		plainText: false,
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
		shouldFocus: true,
		plainText: true,
		maxLength: 5,
		minLength: 5,
		invalidMessage: 'invalid message',
		validMessage: 'valid message',
		onInput: () => {
			'1';
		},
		onChange: () => {
			'2';
		},
		marginTop: '0',
		marginBottom: '0',
		marginLeft: '1',
		marginRight: '1',
		paddingTop: '0',
		paddingBottom: '0',
		paddingLeft: '1',
		paddingRight: '1',
		display: 'flex',
		alignSelf: 'start',
		order: '0',
		float: 'none'
	};

	it('should construct TextInput', () => {
		const h = harness(() => w(TextInput, {}));
		h.expect(() => [
			null,
			v('input', {
				id: '',
				key: 'text-input',
				name: undefined,
				type: '',
				value: undefined,
				placeholder: undefined,
				disabled: false,
				required: false,
				readOnly: false,
				maxlength: null,
				minlength: null,
				classes: ['form-control', undefined, css.root],
				oninput: () => {},
				onchange: () => {}
			}),
			null
		]);
	});

	it('default properties', () => {
		const h = harness(() => w(TextInput, defaultProperties));
		h.expect(() => [
			null,
			v('input', {
				id: '',
				key: 'text-input',
				name: undefined,
				type: '',
				value: undefined,
				placeholder: undefined,
				disabled: false,
				required: false,
				readOnly: false,
				maxlength: null,
				minlength: null,
				classes: ['', 'form-control', undefined, css.root],
				oninput: () => {},
				onchange: () => {}
			}),
			null
		]);
	});

	it('custom properties', () => {
		const h = harness(() => w(TextInput, customProperties));
		h.expect(() => [
			w(
				Label,
				{
					value: 'tag',
					forId: 'random-id',
					classes: ['col-form-label', 'mr-3']
				},
				[]
			),
			v('input', {
				id: 'random-id',
				key: 'text-input',
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
					'form-control-sm',
					'form-control-plaintext',
					'my-0',
					'mx-1',
					'py-0',
					'px-1',
					'd-flex',
					'align-self-start',
					'order-0',
					'float-none',
					css.root
				],
				oninput: () => {
					'1';
				},
				onchange: () => {
					'2';
				}
			}),
			v(
				'div',
				{
					classes: ['invalid-tooltip']
				},
				['invalid message']
			)
		]);
	});

	it('type is file', () => {
		const h = harness(() => w(TextInput, { type: 'file' }));
		h.expect(() =>
			v(
				'div',
				{
					key: 'text-input',
					classes: [css.root, 'custom-file', undefined]
				},
				[
					v('input', {
						id: '',
						name: undefined,
						type: 'file',
						disabled: false,
						classes: ['custom-file-input'],
						onchange: () => {}
					}),
					null,
					null
				]
			)
		);
	});
});
