const { describe, it, } = intern.getInterface('bdd');

import { w } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import Button from './../../index';

describe('Button', () => {

	it('should construct Button', () => {
		const h = harness(() => w(Button, {}));
		h.expect(() => null);
	});
});
