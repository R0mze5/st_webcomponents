export class InclineCircle extends HTMLElement{


  constructor(){
    super()


    // this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    this.style.display = 'inline-block';
    this.style.borderRadius = '50%';
    this.style.border = '1px solid black';
    this.style.transform = 'translateY(10%)';

    if(!this.style.width) {
      this.style.width = '0.8em';
      this.style.height = '0.8em';
    }
  }

  disconnectedCallback() {}

  static get observedAttributes () {
    return ["diameter", 'color']
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string){
    switch(name){
      case "diameter": {
        this.style.width = newValue;
        this.style.height = newValue;
        break;
      }
      case "color": {
        this.style.backgroundColor = newValue;
        break;
      }
    }
  }

  get diameter (): string | undefined {
    return this.getAttribute('diameter') || undefined
  }
  set diameter (diameter: string | undefined) {
    if(diameter){
     this.setAttribute('diameter', diameter)
     } else {
      this.removeAttribute('diameter')
     }
  }

  get color (): string | undefined {
    return this.getAttribute('color') || undefined
  }
  set color (color: string | undefined) {
    if(color){
     this.setAttribute('color', color)
     } else {
      this.removeAttribute('color')
     }
  }
}

customElements.define('inline-circle', InclineCircle)