const { describe, it } = intern.getInterface('bdd');

import { w,v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import Button from './../../index';

describe('button', () => {

	it('should construct button', () => {
		const h = harness(() => w(Button, {}));
		h.expect(() => v(
						'button',
						{
							classes:['btn']
						},
						[]));
	});
});
