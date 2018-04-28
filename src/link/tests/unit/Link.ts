const { describe, it } = intern.getInterface('bdd');
import { w, v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';
import Link, { LinkProperties } from './../../index';
import { textDecorationMap } from '../../../common/util';

import * as css from '../../../common/base.m.css';

describe('Link', () => {
	const defaultProperties: LinkProperties = {
		target: 'self',
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
		wrap: 0,
		textColor: 'default',
		backgroundColor: 'default'
	};

	const customProperties: LinkProperties = {
		widgetId: 'random-id',
		href: 'https://link.com/',
		target: 'iframeId',
		value: 'val',
		marginTop: "0",
		marginBottom: "0",
		marginLeft: "1",
		marginRight: "1",
		paddingTop: "0",
		paddingBottom: "0",
		paddingLeft: "1",
		paddingRight: "1",
		fontWeight: "light",
		fontItalic: true,
		textDecoration: "underline",
		alignment: "left",
		transform: "lowerCase",
		truncate: 40,
		wrap: 1,
		textColor: 'primary',
		backgroundColor: 'primary'
	};

	it('should construct Link', () => {
		const h = harness(() => w(Link, {}));
		h.expect(() => v('a', {
			id: undefined,
			href: undefined,
			target: undefined,
			classes: [],
			styles: {}
		}, []));
	});

	it('default properties', () => {
		const h = harness(() => w(Link, defaultProperties));
		h.expect(() => v('a', {
			id: undefined,
			href: undefined,
			target: 'self',
			classes: [],
			styles: {}
		}, []));
	});

	type textDecorationType = keyof typeof css;

	it('custom properties', () => {
		const h = harness(() => w(Link, customProperties));
		h.expect(() => v('a', {
			id: 'random-id',
			href: 'https://link.com/',
			target: 'iframeId',
			classes: [
				'my-0',
				'mx-1',
				'py-0',
				'px-1',
				'font-weight-light',
				'font-italic',
				'text-left',
				'text-lowerCase',
				'text-truncate',
				'text-nowrap',
				'text-primary',
				'bg-primary',
				css[textDecorationMap['underline'] as textDecorationType]
			],
			styles: {
				'maxWidth': '40px',
				'width': '1rem'
			}
		}, ['val']));
	});
});