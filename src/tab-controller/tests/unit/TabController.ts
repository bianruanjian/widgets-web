const { describe, it } = intern.getInterface('bdd');
import TabController from './../../index';
import { w } from '@dojo/framework/widget-core/d';
import { harness } from '@dojo/framework/testing/harness';
import { TabControllerBase } from '@dojo/widgets/tab-controller';

describe('TabController', () => {
	it('should construct tab-controller', () => {
		const h = harness(() => w(TabController, { activeIndex: 0 }));
		h.expect(() =>
			w(TabControllerBase, {
				activeIndex: 0,
				onRequestTabChange: () => {}
			})
		);
	});
});
