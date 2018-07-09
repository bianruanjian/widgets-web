const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import Container from '../../index';
import * as css from './../../styles/container.m.css';

describe('Container', () => {
	it('should construct container', () => {
		const h = harness(() => w(Container, {}));
		h.expect(() =>
			v('div', {
				id: undefined,
				key: 'container',
				classes: [css.root, 'container'],
				styles: {}
			})
		);
	});

	it('custom properties', () => {
		const h = harness(() => w(Container, { widgetId: 'random-id', fluid: true, maxWidth: '10' }));
		h.expect(() =>
			v(
				'div',
				{
					id: 'random-id',
					key: 'container',
					classes: [css.root, 'container-fluid'],
					styles: { maxWidth: '10px' }
				},
				[]
			)
		);
	});

	it('children', () => {
		const h = harness(() => w(Container, {}, ['Content']));
		h.expect(() =>
			v(
				'div',
				{
					id: undefined,
					key: 'container',
					classes: [css.root, 'container'],
					styles: {}
				},
				['Content']
			)
		);
	});
});
