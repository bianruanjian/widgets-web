const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/framework/widget-core/d';
import harness from '@dojo/framework/testing/harness';

import InputGroup, { InputGroupProperties } from './../../index';
import Label from '../../../label';
import * as css from './../../styles/input-group.m.css';

describe('InputGroup', () => {
	const customProperties: InputGroupProperties = {
		widgetId: 'random-id',
		size: 'small',
		label: 'hello',
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

	it('should construct InputGroup', () => {
		const h = harness(() => w(InputGroup, {}));
		h.expect(() => [
			null,
			v(
				'div',
				{
					id: undefined,
					key: 'input-group',
					classes: ['input-group', '', undefined, css.root]
				},
				[]
			)
		]);
	});

	it('custom properties', () => {
		const h = harness(() => w(InputGroup, customProperties));
		h.expect(() => [
			w(Label, {
				value: 'hello',
				classes: ['col-form-label', 'mr-3']
			}),
			v(
				'div',
				{
					id: 'random-id',
					key: 'input-group',
					classes: [
						'input-group',
						'input-group-sm',
						'my-0',
						'mx-1',
						'py-0',
						'px-1',
						'd-flex',
						'align-self-start',
						'order-0',
						'float-none',
						css.root
					]
				},
				[]
			)
		]);
	});
});
