const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import Textarea, { TextareaProperties } from './../../index';
import Label from '../../../label';
import * as css from './../../styles/textarea.m.css';

describe('Textarea', () => {
	const defaultProperties: TextareaProperties = {
		widgetId: '1',
		size: 'default',
		placeholderAppearance: 'default',
		required: false,
		disabled: false,
		readOnly: false,
		noResize: false,
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

	const customProperties: TextareaProperties = {
		widgetId: 'random-id',
		name: 'textInput',
		value: 'val',
		label: 'tag',
		rows: 3,
		cols: 3,
		placeholder: 'hold on',
		placeholderAppearance: 'default',
		required: true,
		disabled: true,
		readOnly: true,
		size: 'small',
		shouldFocus: true,
		plainText: true,
		noResize: true,
		maxLength: 5,
		minLength: 5,
		invalidMessage: 'invalid message',
		validMessage: 'valid message',
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

	it('should construct Textarea', () => {
		const h = harness(() => w(Textarea, { widgetId: '1' }));
		h.expect(() => [
			null,
			v('textarea', {
				id: '1',
				key: 'textarea',
				name: undefined,
				value: undefined,
				rows: undefined,
				cols: undefined,
				placeholder: undefined,
				disabled: false,
				required: false,
				readOnly: false,
				maxlength: null,
				minlength: null,
				classes: ['form-control', undefined, css.root],
				styles: {
					resize: 'both'
				}
			}),
			null
		]);
	});

	it('default properties', () => {
		const h = harness(() => w(Textarea, defaultProperties));
		h.expect(() => [
			null,
			v('textarea', {
				id: '1',
				key: 'textarea',
				name: undefined,
				value: undefined,
				rows: undefined,
				cols: undefined,
				placeholder: undefined,
				disabled: false,
				required: false,
				readOnly: false,
				maxlength: null,
				minlength: null,
				classes: ['', 'form-control', undefined, css.root],
				styles: {
					resize: 'both'
				}
			}),
			null
		]);
	});

	it('custom properties', () => {
		const h = harness(() => w(Textarea, customProperties));
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
			v('textarea', {
				id: 'random-id',
				key: 'textarea',
				name: 'textInput',
				value: 'val',
				rows: 3,
				cols: 3,
				placeholder: 'hold on',
				disabled: true,
				required: true,
				readOnly: true,
				maxlength: 5,
				minlength: 5,
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
				styles: {
					resize: 'none'
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
});
