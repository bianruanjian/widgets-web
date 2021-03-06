const { describe, it } = intern.getInterface('bdd');
import { w, v } from '@dojo/framework/widget-core/d';
import harness from '@dojo/framework/testing/harness';
import ListItem, { ListItemProperties } from './../../index';
import * as css from '../../../common/base.m.css';
import { textDecorationMap } from '../../../common/util';
import * as cssListItem from './../../styles/list-item.m.css';

describe('ListItem', () => {
	const defaultProperties: ListItemProperties = {
		active: false,
		disabled: false,
		appearance: 'default',
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
		alignContent: 'default',
		textColor: 'default',
		backgroundColor: 'default'
	};

	const customProperties: ListItemProperties = {
		widgetId: 'random-id',
		active: true,
		disabled: true,
		appearance: 'primary',
		fontWeight: 'light',
		fontItalic: true,
		textDecoration: 'underline',
		alignment: 'left',
		transform: 'lowerCase',
		truncate: 40,
		wrap: 1,
		display: 'flex',
		flexDirection: 'row',
		reverse: true,
		justifyItems: 'start',
		alignItems: 'start',
		flexWrap: 'nowrap',
		alignContent: 'start',
		textColor: 'primary',
		backgroundColor: 'primary'
	};

	it('should construct ListItem', () => {
		const h = harness(() => w(ListItem, {}));
		h.expect(() =>
			v(
				'li',
				{
					id: undefined,
					key: 'list-item',
					disabled: false,
					classes: [cssListItem.root, 'list-group-item', undefined, undefined, undefined, undefined],
					styles: {}
				},
				[]
			)
		);
	});

	it('default properties', () => {
		const h = harness(() => w(ListItem, defaultProperties));
		h.expect(() =>
			v(
				'li',
				{
					id: undefined,
					key: 'list-item',
					disabled: false,
					classes: [cssListItem.root, 'list-group-item', undefined, undefined, undefined, undefined],
					styles: {}
				},
				[]
			)
		);
	});

	type baseCssType = keyof typeof css;

	it('custom properties', () => {
		const h = harness(() => w(ListItem, customProperties));
		h.expect(() =>
			v(
				'li',
				{
					id: 'random-id',
					key: 'list-item',
					disabled: true,
					classes: [
						cssListItem.root,
						'list-group-item',
						'list-group-item-primary',
						'disabled',
						'active',
						'd-flex',
						'flex-row-reverse',
						'justify-content-start',
						'align-items-start',
						'flex-nowrap',
						'align-content-start',
						'font-weight-light',
						'font-italic',
						'text-left',
						'text-lowerCase',
						'text-truncate',
						'text-nowrap',
						css[textDecorationMap['underline'] as baseCssType],
						'text-primary',
						'bg-primary'
					],
					styles: {
						maxWidth: '40px',
						width: '1rem'
					}
				},
				[]
			)
		);
	});
});
