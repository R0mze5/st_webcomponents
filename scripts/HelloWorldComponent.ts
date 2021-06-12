/**
 * light Dom - user
 * Shadow - developer
 * Flattened - developer result (with links in slot)
 */

class HelloWorldElement extends HTMLElement {
  protected _name: any

  constructor() {
    super()
    // state, defaultValues, listeners, shadow root

    this.attachShadow({mode: 'open'})
  }

  static get observedAttributes() {
    return ['name']
  }

  attributeChangedCallback(_name:any, _oldValue:any, newValue:any) {
    this._name = newValue
  }

  // all work here
  connectedCallback() {
    this.name = this.getAttribute('name') || 'Component'
  }

  disconnectedCallback() {
    console.log('disconnected')
  }

  adoptedCallback() {
    console.log('disconnected')
  }


  // custom logic

  get name() {
    return this._name
  }

  set name(name) {
    this.setAttribute('name', name)
    this.render()
  }

  render() {
    // this.textContent = `Hello ${this.name}`;
    if(this.shadowRoot) {
      this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          color: blue;
        }
        :host-context(.some) { 
          color: red;
        }
    
      </style>
      <p><slot name='my-text'>default text</slot></p><slot>default</slot>
      `
    }
   
  }
}


export default HelloWorldElement

