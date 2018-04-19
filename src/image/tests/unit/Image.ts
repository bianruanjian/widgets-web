const { describe, it } = intern.getInterface('bdd');

import { v, w } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import { Image, ImageProperties } from './../../index';

describe('Image', () => {

	let defaultProperties: ImageProperties = {
		fluid: false,
		thumbnail: false,
		alignment: "default",
		borderRound: "default",
		marginTop: "default",
		marginBottom: "default",
		marginLeft: "default",
		marginRight: "default",
		paddingTop: "default",
		paddingBottom: "default",
		paddingLeft: "default",
		paddingRight: "default"
	}

	let customProperties: ImageProperties = {
		widgetId: 'random-id',
		fluid: true,
		thumbnail: true,
		src: 'http://img.jpg',
		alt: 'beauty',
		width: 60,
		height: '60%',
		alignment: 'left',
		borderRound: 'circle',
		marginTop: "0",
		marginBottom: "0",
		marginLeft: "1",
		marginRight: "1",
		paddingTop: "0",
		paddingBottom: "0",
		paddingLeft: "1",
		paddingRight: "1"
	}

	it('should construct image', () => {
		const h = harness(() => w(Image, {}));
		h.expect(() => v('img',{
			id: undefined,
			src: undefined,
			alt: undefined,
			classes: [],
			styles: {}
		}, []));
	});

	it('default properties', () => {
		const h = harness(() => w(Image, defaultProperties));
		h.expect(() => v('img',{
			id: undefined,
			src: undefined,
			alt: undefined,
			classes: [],
			styles: {}
		}, []));
	});

	it('custom properties', () => {
		const h = harness(() => w(Image, customProperties));
		h.expect(() => v('img',{
			id: 'random-id',
			src: 'http://img.jpg',
			alt: 'beauty',
			classes: [
				'img-fluid',
				'img-thumbnail',
				'float-left',
				'rounded-circle',
				'my-0',
				'mx-1',
				'py-0',
				'px-1'
			],
			styles: {
				"width": "60px",
				"height": "60%"
			}
		}, []));
	});

	it('alignment is center', () => {
		const h = harness(() => w(Image, {alignment : 'center'}));
		h.expect(() => v('img',{
			id: undefined,
			src: undefined,
			alt: undefined,
			classes: [
				'mx-auto',
				'd-block'
			],
			styles: {}
		}, []));
	});

});
