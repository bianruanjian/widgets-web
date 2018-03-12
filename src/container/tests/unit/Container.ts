const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import Container from '../../index';

describe('Container', () => {

	it('should construct Container', () => {
		const h = harness(() => w(Container, {}));
		h.expect(() => v('div', {
			key: 'root',
			classes: ['container']
		}, []));
	});

	it('custom properties', () => {
		const h = harness(() => w(Container, {fluidWidth: true}));
		h.expect(() => v('div', {
			key: 'root',
			classes: ['container-fluid']
		}, []));
	});

	it('children', () => {
		const h = harness(() => w(Container, {}, ['Content']));
		h.expect(() => v('div', {
			key: 'root',
			classes: ['container']
		}, ['Content']));
	});

});
