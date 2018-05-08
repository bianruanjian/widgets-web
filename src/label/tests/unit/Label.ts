const { describe, it } = intern.getInterface('bdd');

import { v, w } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import { Label, LabelProperties } from './../../index';

describe('Label', () => {
	let customProperties: LabelProperties = {
		widgetId: 'random-id',
		value: 'label',
		forId: 'id',
		classes: 'test'
	};

	it('should construct label', () => {
		const h = harness(() => w(Label, {}));
		h.expect(() =>
			v(
				'label',
				{
					id: undefined,
					key: 'label',
					for: undefined,
					classes: undefined
				},
				[]
			)
		);
	});

	it('custom properties', () => {
		const h = harness(() => w(Label, customProperties));
		h.expect(() =>
			v(
				'label',
				{
					id: 'random-id',
					key: 'label',
					for: 'id',
					classes: ['test']
				},
				['label']
			)
		);
	});
});
