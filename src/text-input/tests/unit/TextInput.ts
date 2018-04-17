const { describe, it } = intern.getInterface('bdd');

import { w } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import TextInput from './../../index';

describe('TextInput', () => {

	it('should construct TextInput', () => {
		const h = harness(() => w(TextInput, {}));
		h.expect(() => null);
	});
});
