const { describe, it } = intern.getInterface('bdd');
import { v, w } from '@dojo/framework/widget-core/d';
import harness from '@dojo/framework/testing/harness';
import Text, { TextWidgetProperties } from './../../index';
import { textDecorationMap } from '../../../common/util';

import * as css from '../../../common/base.m.css';
import * as cssText from './../../styles/text.m.css';

describe('Text', () => {
	let defaultProperties: TextWidgetProperties = {
		type: 'text',
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
		backgroundColor: 'default',
		display: 'default',
		flexDirection: 'default',
		reverse: false,
		justifyItems: 'default',
		alignItems: 'default',
		flexWrap: 'default',
		alignContent: 'default',
		alignSelf: 'default',
		order: 'default'
	};

	let customProperties: TextWidgetProperties = {
		widgetId: 'random-id',
		value: 'test',
		type: 'h1',
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
		truncate: 40,
		wrap: 1,
		textColor: 'primary',
		backgroundColor: 'primary',
		display: 'flex',
		flexDirection: 'row',
		reverse: true,
		justifyItems: 'start',
		alignItems: 'start',
		flexWrap: 'nowrap',
		alignContent: 'start',
		alignSelf: 'start',
		order: 0
	};

	it('should construct text', () => {
		const h = harness(() => w(Text, {}));
		h.expect(() =>
			v(
				'span',
				{
					id: undefined,
					key: 'text',
					classes: [cssText.root, undefined],
					styles: {}
				},
				[undefined]
			)
		);
	});

	it('default properties', () => {
		const h = harness(() => w(Text, defaultProperties));
		h.expect(() =>
			v(
				'span',
				{
					id: undefined,
					key: 'text',
					classes: [cssText.root, undefined],
					styles: {}
				},
				[undefined]
			)
		);
	});

	type baseCssType = keyof typeof css;

	it('custom properties', () => {
		const h = harness(() => w(Text, customProperties));
		const textDecorationClass = textDecorationMap['underline'];
		h.expect(() =>
			v(
				'h1',
				{
					id: 'random-id',
					key: 'text',
					classes: [
						cssText.root,
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
						css[textDecorationClass as baseCssType],
						'text-primary',
						'bg-primary',
						'd-flex',
						'flex-row-reverse',
						'justify-content-start',
						'align-items-start',
						'flex-nowrap',
						'align-content-start',
						'align-self-start',
						'order-0'
					],
					styles: {
						maxWidth: '40px',
						width: '1rem'
					}
				},
				['test']
			)
		);
	});

	it('lead', () => {
		const h = harness(() => w(Text, { type: 'lead' }));
		h.expect(() =>
			v(
				'p',
				{
					id: undefined,
					key: 'text',
					classes: [cssText.root, 'lead', undefined],
					styles: {}
				},
				[undefined]
			)
		);
	});

	it('valuePosition is left', () => {
		const h = harness(() => w(Text, { value: 'val', valuePosition: 'left' }, [w(Text, { value: 'abc' })]));
		h.expect(() =>
			v(
				'span',
				{
					id: undefined,
					key: 'text',
					classes: [cssText.root, undefined],
					styles: {}
				},
				['val', w(Text, { value: 'abc' })]
			)
		);
	});
});
