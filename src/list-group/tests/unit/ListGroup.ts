const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import ListGroup, { ListGroupProperties } from './../../index';
import { Button } from '../../../button';
import { ListItem } from '../../../list-item';
import { Link } from '../../../link';
import { DNode } from '@dojo/widget-core/interfaces';

describe('ListGroup', () => {
	const defaultProperties: ListGroupProperties = {
		flush: false,
		marginTop: 'default',
		marginBottom: 'default',
		marginLeft: 'default',
		marginRight: 'default',
		paddingTop: 'default',
		paddingBottom: 'default',
		paddingLeft: 'default',
		paddingRight: 'default'
	};

	const customProperties: ListGroupProperties = {
		widgetId: 'random-id',
		flush: true,
		marginTop: '0',
		marginBottom: '0',
		marginLeft: '1',
		marginRight: '1',
		paddingTop: '0',
		paddingBottom: '0',
		paddingLeft: '1',
		paddingRight: '1'
	};

	it('should construct ListGroup', () => {
		const h = harness(() => w(ListGroup, {}));
		h.expect(() =>
			v(
				'ul',
				{
					id: undefined,
					classes: ['list-group', undefined]
				},
				[]
			)
		);
	});

	it('default properties', () => {
		const h = harness(() => w(ListGroup, defaultProperties));
		h.expect(() =>
			v(
				'ul',
				{
					id: undefined,
					classes: ['list-group', undefined]
				},
				[]
			)
		);
	});

	it('custom properties', () => {
		const h = harness(() => w(ListGroup, customProperties));
		h.expect(() =>
			v(
				'ul',
				{
					id: 'random-id',
					classes: ['list-group', 'list-group-flush', 'my-0', 'mx-1', 'py-0', 'px-1']
				},
				[]
			)
		);
	});

	it('test children', () => {
		const buttonH = harness(() => w(Button, {}));
		const linkH = harness(() => w(Link, {}));
		const listItemH = harness(() => w(ListItem, {}));
		const h = harness(() =>
			w(ListGroup, {}, [buttonH.getRender() as DNode, linkH.getRender() as DNode, listItemH.getRender() as DNode])
		);
		h.expect(() =>
			v(
				'ul',
				{
					id: undefined,
					classes: ['list-group', undefined]
				},
				[
					v(
						'button',
						{
							id: undefined,
							classes: ['btn', undefined, undefined, undefined, undefined],
							disabled: false,
							type: undefined,
							onclick: () => {}
						},
						[undefined]
					),
					v('a', {
						classes: [],
						href: undefined,
						id: undefined,
						styles: {},
						target: undefined
					}),
					v('li', {
						classes: ['list-group-item', undefined, undefined, undefined],
						disabled: false,
						id: undefined,
						styles: {}
					})
				]
			)
		);
	});
});
