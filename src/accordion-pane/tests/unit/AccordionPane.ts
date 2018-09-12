const { describe, it } = intern.getInterface('bdd');

import AccordionPane from './../../index';
import { w } from '@dojo/framework/widget-core/d';
import { harness } from '@dojo/framework/testing/harness';
import { AccordionPaneBase } from '@dojo/widgets/accordion-pane';

describe('accordion-pane', () => {
	it('should construct accordion-pane', () => {
		const h = harness(() => w(AccordionPane, {}));
		h.expect(() =>
			w(AccordionPaneBase, {
				onRequestOpen: () => {},
				onRequestClose: () => {},
				openKeys: []
			})
		);
	});
});
