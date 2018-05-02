const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import ListGroup, { ListGroupProperties } from './../../index';

describe('ListGroup', () => {
	const defaultProperties: ListGroupProperties = {
		flush: false,
		marginTop: "default",
		marginBottom: "default",
		marginLeft: "default",
		marginRight: "default",
		paddingTop: "default",
		paddingBottom: "default",
		paddingLeft: "default",
		paddingRight: "default"
	};

	const customProperties: ListGroupProperties = {
		widgetId: 'random-id',
		flush: true,
		marginTop: "0",
		marginBottom: "0",
		marginLeft: "1",
		marginRight: "1",
		paddingTop: "0",
		paddingBottom: "0",
		paddingLeft: "1",
		paddingRight: "1"
	};

	it('should construct ListGroup', () => {
		const h = harness(() => w(ListGroup, {}));
		h.expect(() => v('ul', {
			id: undefined,
			classes: [
				'list-group',
				''
			]
		}, []));
	});

	it('default properties', () => {
		const h = harness(() => w(ListGroup, defaultProperties));
		h.expect(() => v('ul', {
			id: undefined,
			classes: [
				'list-group',
				''
			]
		}, []));
	});

	it('custom properties', () => {
		const h = harness(() => w(ListGroup, customProperties));
		h.expect(() => v('ul', {
			id: 'random-id',
			classes: [
				'list-group',
				'list-group-flush',
				'my-0',
				'mx-1',
				'py-0',
				'px-1'
			]
		}, []));
	});
});
