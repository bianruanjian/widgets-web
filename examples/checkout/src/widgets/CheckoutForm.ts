import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { WidgetProperties } from '@dojo/framework/widget-core/interfaces';
import { w } from '@dojo/framework/widget-core/d';
import Container from 'widgets-web/container/index';
import View from 'widgets-web/view/index';
import Image from 'widgets-web/image/index';
import Text from 'widgets-web/text/index';
import GridRow from 'widgets-web/grid-row/index';
import GridColumn from 'widgets-web/grid-column/index';
import TextInput from 'widgets-web/text-input/index';
import InputGroup from 'widgets-web/input-group/index';
import Addon from 'widgets-web/addon/index';
import Select from 'widgets-web/select/index';
import Checkbox from 'widgets-web/checkbox/index';
import Radio from 'widgets-web/radio/index';
import Button from 'widgets-web/button/index';
import Badge from 'widgets-web/badge/index';
import ListGroup from 'widgets-web/list-group/index';
import ListItem from 'widgets-web/list-item/index';
import Card from 'widgets-web/card/index';
import Footer from 'widgets-web/footer/index';
import Link from 'widgets-web/link/index';

export class CheckoutFormBase extends WidgetBase<WidgetProperties> {
	protected render() {
		return w(Container, { maxWidth: 960 }, [
			w(View, { alignment: 'center', paddingTop: '5', paddingBottom: '5' }, [
				w(Image, {
					width: 72,
					height: 72,
					marginLeft: 'auto',
					marginRight: 'auto',
					marginBottom: '4',
					src: 'https://getbootstrap.com/docs/4.1/assets/brand/bootstrap-solid.svg'
				}),
				w(Text, { type: 'h2', value: 'Checkout form' }),
				w(Text, {
					type: 'lead',
					value:
						"Below is an example form built entirely with Bootstrap's form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it."
				})
			]),
			w(GridRow, {}, [
				w(GridColumn, { colspan: 8 }, [
					w(Text, { type: 'h4', marginBottom: '3', value: 'Billing address' }),
					w(View, {}, [
						w(GridRow, {}, [
							w(GridColumn, { colspan: 6, marginBottom: '3' }, [w(TextInput, { label: 'First Name' })]),
							w(GridColumn, { colspan: 6, marginBottom: '3' }, [w(TextInput, { label: 'Last Name' })])
						]),
						w(View, { marginBottom: '3' }, [
							w(InputGroup, { label: 'UserName' }, [
								w(Addon, { value: '@' }),
								w(TextInput, { placeholder: 'UserName' })
							])
						]),
						w(View, { marginBottom: '3' }, [
							w(TextInput, { label: 'Email(Optional)', placeholder: 'you@example.com' })
						]),
						w(View, { marginBottom: '3' }, [
							w(TextInput, { label: 'Address', placeholder: '1234 Main St' })
						]),
						w(View, { marginBottom: '3' }, [
							w(TextInput, { label: 'Address 2(Optional)', placeholder: 'Apartment or suite' })
						]),
						w(GridRow, {}, [
							w(GridColumn, { colspan: 5, marginBottom: '3' }, [
								w(Select, {
									label: 'Country',
									options:
										'[{"value": "1", "label": "Choose..."}, {"value": "2", "label": "United States"}]',
									valueField: 'value',
									labelField: 'label'
								})
							]),
							w(GridColumn, { colspan: 4, marginBottom: '3' }, [
								w(Select, {
									label: 'State',
									options:
										'[{"value": "1", "label": "Choose..."}, {"value": "2", "label": "California"}]',
									valueField: 'value',
									labelField: 'label'
								})
							]),
							w(GridColumn, { colspan: 3, marginBottom: '3' }, [w(TextInput, { label: 'Zip' })])
						]),
						w(View, { borderBottom: true, marginBottom: '4' }),
						w(Checkbox, { label: 'Shipping address is the same as my billing address' }),
						w(Checkbox, { label: 'Save this information for next time' }),
						w(View, { borderBottom: true, marginBottom: '4', marginTop: '4' }),
						w(Text, { type: 'h4', marginBottom: '3', value: 'Payment' }),
						w(View, { display: 'block', marginTop: '3', marginBottom: '3' }, [
							w(Radio, { name: 'paymentMethod', widgetId: 'credit', label: 'Credit card', fluid: true }),
							w(Radio, { name: 'paymentMethod', widgetId: 'debit', label: 'Debit card', fluid: true }),
							w(Radio, { name: 'paymentMethod', widgetId: 'paypal', label: 'PayPal', fluid: true })
						]),
						w(GridRow, {}, [
							w(GridColumn, { colspan: 6, marginBottom: '3' }, [
								w(TextInput, { label: 'Name on card' }),
								w(Text, { type: 'small', value: 'Full name as displayed on card' })
							]),
							w(GridColumn, { colspan: 6, marginBottom: '3' }, [
								w(TextInput, { label: 'Credit card number' })
							])
						]),
						w(GridRow, {}, [
							w(GridColumn, { colspan: 3, marginBottom: '3' }, [w(TextInput, { label: 'Expiration' })]),
							w(GridColumn, { colspan: 3, marginBottom: '3' }, [w(TextInput, { label: 'CVV' })])
						]),
						w(View, { borderBottom: true, marginBottom: '4' }),
						w(Button, { appearance: 'primary', fluid: true, size: 'large', value: 'Continue to checkout' })
					])
				]),
				w(GridColumn, { colspan: '4', marginBottom: '4' }, [
					w(
						Text,
						{
							type: 'h4',
							display: 'flex',
							alignment: 'center',
							justifyItems: 'between',
							marginBottom: '3'
						},
						[
							w(Text, { textColor: 'secondary', value: 'Your cart' }),
							w(Badge, { pill: true, value: '3', appearance: 'secondary' })
						]
					),
					w(ListGroup, { marginBottom: '3' }, [
						w(ListItem, { display: 'flex', justifyItems: 'between' }, [
							w(View, {}, [
								w(Text, { type: 'h6', marginTop: '0', marginBottom: '0', value: 'Product name' }),
								w(Text, { textColor: 'secondary', type: 'small', value: 'Brief description' })
							]),
							w(Text, { textColor: 'secondary', value: '$12' })
						]),
						w(ListItem, { display: 'flex', justifyItems: 'between' }, [
							w(View, {}, [
								w(Text, { type: 'h6', marginTop: '0', marginBottom: '0', value: 'Second product' }),
								w(Text, { textColor: 'secondary', type: 'small', value: 'Brief description' })
							]),
							w(Text, { textColor: 'secondary', value: '$8' })
						]),
						w(ListItem, { display: 'flex', justifyItems: 'between' }, [
							w(View, {}, [
								w(Text, { type: 'h6', marginTop: '0', marginBottom: '0', value: 'Third item' }),
								w(Text, { textColor: 'secondary', type: 'small', value: 'Brief description' })
							]),
							w(Text, { textColor: 'secondary', value: '$5' })
						]),
						w(ListItem, { display: 'flex', justifyItems: 'between' }, [
							w(View, { textColor: 'success' }, [
								w(Text, { type: 'h6', marginTop: '0', marginBottom: '0', value: 'Promo code' }),
								w(Text, { type: 'small', value: 'EXAMPLECODE' })
							]),
							w(Text, { textColor: 'success', value: '-$5' })
						]),
						w(ListItem, { display: 'flex', justifyItems: 'between' }, [
							w(Text, { value: 'Total (USD)' }),
							w(Text, { fontWeight: 'bold', value: '$20' })
						])
					]),
					w(Card, { paddingLeft: '2', paddingRight: '2', paddingTop: '2', paddingBottom: '2' }, [
						w(InputGroup, {}, [
							w(TextInput, { placeholder: 'Promo code' }),
							w(Addon, {}, [w(Button, { appearance: 'secondary', value: 'Redeem' })])
						])
					])
				])
			]),
			w(Footer, { marginTop: '5', marginBottom: '5', paddingTop: '5', alignment: 'center' }, [
				w(Text, { type: 'p', marginBottom: '1', value: '© 2017-2018 Company Name', textColor: 'secondary' }),
				w(ListGroup, { orientation: 'horizontal' }, [
					w(ListItem, { orientation: 'horizontal' }, [w(Link, { value: 'Privacy' })]),
					w(ListItem, { orientation: 'horizontal' }, [w(Link, { value: 'Terms' })]),
					w(ListItem, { orientation: 'horizontal' }, [w(Link, { value: 'Support' })])
				])
			])
		]);
	}
}

export default class CheckoutForm extends CheckoutFormBase {}
