const { describe, it} = intern.getInterface('bdd');

import { w,v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import View from './../../index';

describe('view', () => {

	let defaultAttributes:any = {
		borderLeft: false,
		borderTop: false,
		borderRight: false,
		borderBottom: false,
		borderColor: "default",
		borderRadius: "default",
		marginTop: "default",
		marginBottom: "default",
		marginLeft: "default",
		marginRight: "default",
		paddingTop: "default",
		paddingBottom: "default",
		paddingLeft: "default",
		paddingRight: "default",
		fontWeight: "default",
		fontItalic: false,
		textDecoration: "default",
		alignment: "default",
		transform: "default",
		truncate: "default",
		wrap: 0
	};
	
	it('no attributes', () => {
		const h = harness(() => w(View, {}));
		h.expect(() => v('div',{ id: undefined, classes: [], styles: {} },[]));
	});

	it('self attributes', () => {
		const h = harness(() => w(View, { widgetId: "random-id", maxWidth: 100}));
		h.expect(() => v('div', { id: "random-id", classes: [], 
		styles: {
			"maxWidth": "100px"
			}
		}, []));
	});

	it('default attributes', () => {
		const h = harness(() => w(View, defaultAttributes));
		h.expect(() => v('div', { id: undefined, classes: [], styles: {}}));
	});

	it('custom truncate and wrap attribute', () => {
		const h = harness(() => w(View, {truncate: 101, wrap: 101}));
		h.expect(() => v('div',{
			id: undefined,
			classes: [
				'text-truncate',
				'text-nowrap'
			],
			styles: {
				"maxWidth": "101px",
		       	"width": "101px"
			}
		}));
	});
});
