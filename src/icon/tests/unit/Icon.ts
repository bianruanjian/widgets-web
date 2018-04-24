const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import Icon, { IconProperties } from './../../index';

describe('Icon', () => {
	const defaultProperties: IconProperties = {
		appearance: 'fas fa-smile',
		size: 'default',
		marginTop: "default",
		marginBottom: "default",
		marginLeft: "default",
		marginRight: "default",
		paddingTop: "default",
		paddingBottom: "default",
		paddingLeft: "default",
		paddingRight: "default",
		alignSelf: "default",
		order: "default",
		textColor: "default",
		backgroundColor: 'default'
	};

	const customProperties: IconProperties = {
		widgetId: 'random-id',
		appearance: 'fas fa-smile',
		size: 'extraSmall',
		alt: 'alt',
		title: 'smile',
		marginTop: "0",
		marginBottom: "0",
		marginLeft: "1",
		marginRight: "1",
		paddingTop: "0",
		paddingBottom: "0",
		paddingLeft: "1",
		paddingRight: "1",
		alignSelf: "start",
		order: 0,
		textColor: 'primary',
		backgroundColor: 'primary'
	}

	it('should construct Icon', () => {
		const h = harness(() => w(Icon, {}));
		h.expect(() => v('span', {
			id: undefined,
			classes: [
				'd-inline-block'
			],
			title: undefined
		}, [
			v('i',{
				alt: undefined,
				classes: [
					'',
					''
				]
			}, [])
		]));
	});

	it('default properties', () => {
		const h = harness(() => w(Icon, defaultProperties));
		h.expect(() => v('span', {
			id: undefined,
			classes: [
				'd-inline-block'
			],
			title: undefined
		}, [
			v('i',{
				alt: undefined,
				classes: [
					'fas fa-smile',
					''
				]
			}, [])
		]));
	});

	it('custom properties', () => {
		const h = harness(() => w(Icon, customProperties));
		h.expect(() => v('span', {
			id: 'random-id',
			classes: [
				'd-inline-block',
				'my-0',
				'mx-1',
				'py-0',
				'px-1',
				'align-self-start',
				'order-0',
				'text-primary',
				'bg-primary'
			],
			title: 'smile'
		}, [
			v('i',{
				alt: 'alt',
				classes: [
					'fas fa-smile',
					'fa-xs'
				]
			}, [])
		]));
	});
});
