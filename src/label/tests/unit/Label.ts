const { describe, it } = intern.getInterface('bdd');

import { v, w } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import { Label, LabelProperties } from './../../index';

describe('Label', () => {
	let customProperties: LabelProperties = {
		widgetId: 'random-id',
		value: 'label',
		forId: 'id'
	};

	it('should construct label', () => {
		const h = harness(() => w(Label, {}));
		h.expect(() => v('label',{
			id:undefined,
			for: undefined
		},[]));
	});

	it('custom properties', () => {
		const h = harness(() => w(Label, customProperties));
		h.expect(() => v('label',{
			id:'random-id',
			for: 'id'
		},['label']));
	});
});
