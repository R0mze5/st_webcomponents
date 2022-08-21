class CustomLabel extends HTMLLabelElement {
  private boundLink: HTMLElement | null = null

  constructor() {
    super();

    document.addEventListener("DOMContentLoaded", () => {
      this.setAttribute('tabindex', '1');
      this.setAttribute('style', 'display: block;')
    })

    this.addEventListener('click', () => {
      this.boundLink = document.querySelector('#' + this.getAttribute('for'));
      if(this.boundLink) {
        this.boundLink.focus()
      }
    })

    this.addEventListener('keydown', (e) => {
      if (e.keyCode === 32 || e.keyCode === 13) {
        this.dispatchEvent(new MouseEvent('click', {
          bubbles: true, cancelable: true
        }))
      }
    })
  }

  connectedCallback() {
    
  }
}

export default CustomLabel