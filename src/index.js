import './style.css';
import App from './app';

function compo(){

    const element = document.createElement('div');
    let app = new App(element)
    return element;
    
}

document.body.appendChild( compo( ) );

