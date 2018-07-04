const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import Footer, { FooterProperties } from './../../index';
import * as css from './../../styles/footer.m.css';
import { textDecorationMap } from '../../../common/util';
import * as baseCss from '../../../common/base.m.css';

describe('Footer', () => {
	const defaultProperties: FooterProperties = {
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
		display: 'default',
		flexDirection: 'default',
		reverse: false,
		justifyItems: 'default',
		alignItems: 'default',
		flexWrap: 'default',
		alignContent: 'default'
	};

	const customProperties: FooterProperties = {
		widgetId: 'random-id',
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
		display: 'flex',
		flexDirection: 'row',
		reverse: true,
		justifyItems: 'start',
		alignItems: 'start',
		flexWrap: 'nowrap',
		alignContent: 'start'
	};

	it('should construct Footer', () => {
		const h = harness(() => w(Footer, {}));
		h.expect(() =>
			v(
				'div',
				{
					id: undefined,
					key: 'footer',
					classes: [css.root, undefined],
					styles: {}
				},
				[]
			)
		);
	});

	it('default properties', () => {
		const h = harness(() => w(Footer, defaultProperties));
		h.expect(() =>
			v(
				'div',
				{
					id: undefined,
					key: 'footer',
					classes: [css.root, undefined],
					styles: {}
				},
				[]
			)
		);
	});

	type baseCssType = keyof typeof baseCss;

	it('custom properties', () => {
		const h = harness(() => w(Footer, customProperties));
		const textDecorationClass = textDecorationMap['underline'];
		h.expect(() =>
			v(
				'div',
				{
					id: 'random-id',
					key: 'footer',
					classes: [
						css.root,
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
						baseCss[textDecorationClass as baseCssType],
						'd-flex',
						'flex-row-reverse',
						'justify-content-start',
						'align-items-start',
						'flex-nowrap',
						'align-content-start'
					],
					styles: {
						maxWidth: '50%',
						width: '1rem'
					}
				},
				[]
			)
		);
	});
});
