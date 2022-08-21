import HelloWorldElement from './components/HelloWorldComponent'
import PlasticButton from './components/PlasticButtonComponent'
import CustomLabel  from './components/CustomLabelComponent'

window.customElements.define("hello-world-element", HelloWorldElement);
window.customElements.define("plastic-button", PlasticButton, {
  extends: "button",
});



window.customElements.define("custom-label", CustomLabel, {
  extends: "label",
});

console.assert(Array instanceof Object)


const host = document.createElement('div')
const shadowRoot = host.attachShadow({mode:'open'})

shadowRoot.innerHTML = '<h1>Shadow</h1>'

document.body.appendChild(host)