const { describe, it } = intern.getInterface('bdd');

import harness from '@dojo/framework/testing/harness';
import SplitPane from './../../index';
import { w } from '@dojo/framework/widget-core/d';
import { SplitPaneBase } from '@dojo/widgets/split-pane';

describe('SplitPane', () => {
	it('should construct SplitPane', () => {
		const h = harness(() => w(SplitPane, {}));
		h.expect(() =>
			w(SplitPaneBase, {
				size: undefined,
				onResize: () => {}
			})
		);
	});
});
