import HelloWorld from './widgets/HelloWorld';
import Container from './container/index';
import TextInput from './text-input/index';

console.log(HelloWorld);
console.log(Container);
console.log(TextInput);

// Create a projector to convert the virtual DOM produced by the application into the rendered page.
// For more information on starting up a Dojo 2 application, take a look at
// https://dojo.io/tutorials/002_creating_an_application/
// const Projector = ProjectorMixin(HelloWorld);
// const projector = new Projector();

// By default, append() will attach the rendered content to document.body.  To insert this application
// into existing HTML content, pass the desired root node to append().
//projector.append();
