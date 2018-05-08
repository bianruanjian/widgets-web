const { describe, it } = intern.getInterface('bdd');
import { w, v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';
import Card, { CardProperties } from './../../index';

import * as css from '../../../common/base.m.css';
import { textDecorationMap } from '../../../common/util';

describe('Card', () => {
	const defaultProperties: CardProperties = {
		borderLeft: false,
		borderTop: false,
		borderRight: false,
		borderBottom: false,
		borderColor: 'default',
		borderRound: 'default',
		marginTop: 'default',
		marginBottom: 'default',
		marginLeft: 'default',
		marginRight: 'default',
		paddingTop: 'default',
		paddingBottom: 'default',
		paddingLeft: 'default',
		paddingRight: 'default',
		fontWeight: 'default',
		fontItalic: false,
		textDecoration: 'default',
		alignment: 'default',
		transform: 'default',
		truncate: 'default',
		wrap: 0,
		textColor: 'default',
		backgroundColor: 'default'
	};

	const customProperties: CardProperties = {
		widgetId: 'random-id',
		width: 40,
		height: '40%',
		borderLeft: true,
		borderTop: true,
		borderRight: true,
		borderBottom: true,
		borderColor: 'primary',
		borderRound: 'top',
		marginTop: '0',
		marginBottom: '0',
		marginLeft: '1',
		marginRight: '1',
		paddingTop: '0',
		paddingBottom: '0',
		paddingLeft: '1',
		paddingRight: '1',
		fontWeight: 'light',
		fontItalic: true,
		textDecoration: 'underline',
		alignment: 'left',
		transform: 'lowerCase',
		truncate: '50%',
		wrap: 1,
		textColor: 'primary',
		backgroundColor: 'primary'
	};

	it('should construct Card', () => {
		const h = harness(() => w(Card, {}));
		h.expect(() =>
			v(
				'div',
				{
					id: undefined,
					key: 'card',
					classes: ['card'],
					styles: {}
				},
				[]
			)
		);
	});

	it('default properties', () => {
		const h = harness(() => w(Card, defaultProperties));
		h.expect(() =>
			v(
				'div',
				{
					id: undefined,
					key: 'card',
					classes: ['card'],
					styles: {}
				},
				[]
			)
		);
	});

	it('custom properties', () => {
		const h = harness(() => w(Card, customProperties));
		h.expect(() =>
			v(
				'div',
				{
					id: 'random-id',
					key: 'card',
					classes: [
						'card',
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
						css[textDecorationMap['underline'] as keyof typeof css],
						'text-primary',
						'bg-primary',
						'border',
						'border-primary',
						'rounded-top'
					],
					styles: {
						maxWidth: '50%',
						width: '40px',
						height: '40%'
					}
				},
				[]
			)
		);
	});

	it('width and height value is auto', () => {
		const h = harness(() => w(Card, { width: 'auto', height: 'auto' }));
		h.expect(() =>
			v(
				'div',
				{
					id: undefined,
					key: 'card',
					classes: ['card'],
					styles: {
						width: 'auto',
						height: 'auto'
					}
				},
				[]
			)
		);
	});
});
