const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import Addon, { AddonProperties } from './../../index';

describe('Addon', () => {
	const customProperties: AddonProperties = {
		widgetId: 'random-id',
		value: 'prepare',
		position: 'append'
	};

	it('should construct Addon', () => {
		const h = harness(() => w(Addon, {}));
		h.expect(() => v('div', {
			id: undefined,
			classes: ['input-group-prepend']
		}, [v('div', {
			classes: ['input-group-text']
		}, [])]));
	});

	it('custom properties', () => {
		const h = harness(() => w(Addon, customProperties));
		h.expect(() => v('div', {
			id: 'random-id',
			classes: ['input-group-append']
		}, [v('div', {
			classes: ['input-group-text']
		}, ['prepare'])]));
	});
});
