const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import InputGroup, { InputGroupProperties } from './../../index';
import { Label } from '../../../label';

describe('InputGroup', () => {

	const customProperties: InputGroupProperties = {
		widgetId: 'random-id',
		size: 'small',
		label: 'hello',
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
	}

	it('should construct InputGroup', () => {
		const h = harness(() => w(InputGroup, {}));
		h.expect(() => v('div', {
			id: undefined,
			classes: ['input-group','']
		}, [null]));
	});

	it('custom properties', () => {
		const h = harness(() => w(InputGroup, customProperties));
		h.expect(() => v('div', {
			id: 'random-id',
			classes: [
				'input-group',
				'input-group-sm',
				'my-0',
				'mx-1',
				'py-0',
				'px-1',
				'align-self-start',
				'order-0',
				'float-none'
			]
		}, [
			w(Label, {value: 'hello'})
		]));
	});
});
