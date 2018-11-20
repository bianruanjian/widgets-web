import CheckoutForm from './widgets/CheckoutForm';
import { w } from '@dojo/framework/widget-core/d';
import renderer from '@dojo/framework/widget-core/vdom';

// Create a projector to convert the virtual DOM produced by the application into the rendered page.
// For more information on starting up a Dojo 2 application, take a look at
// https://dojo.io/tutorials/002_creating_an_application/
const root = document.querySelector('checkout-app');
if (root) {
	const r = renderer(() => w(CheckoutForm, { }));
	r.mount();
}
