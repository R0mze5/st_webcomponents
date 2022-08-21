class SearchBox extends HTMLElement {

  static template: HTMLTemplateElement | undefined

  static observedAttributes = ['disabled', 'placeholder', 'size', 'value'] as const

  input: HTMLInputElement | null = null

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })

    if (this.shadowRoot) {
      if (SearchBox.template) {
        this.shadowRoot.append(SearchBox.template.content.cloneNode(true))
      };

      this.input = this.shadowRoot.querySelector('#input')
      let leftSlot = this.shadowRoot.querySelector('slot[name="left"]')
      let rightSlot = this.shadowRoot.querySelector('slot[name="right"]')

      if (this.input) {
        this.input.onfocus = () => { this.setAttribute("focused", "") }
        this.input.onblur = () => { this.removeAttribute("focused") }

        if (leftSlot instanceof HTMLElement) {
          leftSlot.onclick = this.input.onchange = (event) => {
            event.stopPropagation();
            if (this.disabled) {
              return
            }
            this.dispatchEvent(new CustomEvent("search", {
              detail: this.input?.value || ''
            }))
          }
        }


        if (rightSlot instanceof HTMLElement) {
          rightSlot.onclick = (event) => {
            event.stopPropagation();
            if (this.disabled) {
              return
            }

            const clearEvent = new CustomEvent('clear', { cancelable: true })

            this.dispatchEvent(clearEvent)

            if (!clearEvent.defaultPrevented && this.input) {
              this.input.value = ''
            }
          }
        }
      }
    }
  }

  attributeChangedCallback(name: typeof SearchBox.observedAttributes[number], oldValue: number | string | null, newValue: number | string | null) {
    if (this.input) {
      switch (name) {
        case 'disabled':
          this.input.disabled = newValue !== null
          break;
        case 'placeholder': {
          if (typeof newValue === 'string') {
            this.input.placeholder = newValue
          }
        }
          break;
        case 'size': {
          if (typeof newValue === 'number') {
            this.input.size = newValue
          }
        }
          break;
        case 'value': {
          if (typeof newValue === 'string') {
            this.input.value = newValue
          }
        }
          break;

        default:
          break;
      }
    }
  }

  get placeholder() {
    return this.getAttribute('placeholder') || ''
  }

  get size() {
    return this.getAttribute('size') || ''
  }

  get value() {
    return this.getAttribute('value') || ''
  }

  get disabled() {
    return this.getAttribute('disabled')
  }

  get hidden() {
    return !!this.getAttribute('hidden')
  }

  set placeholder(value: string) {
    this.setAttribute('placeholder', value)
  }

  set size(value: string) {
    this.setAttribute('size', value)
  }

  set value(text: string) {
    this.setAttribute('value', text)
  }

  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', "")
    } else {
      this.removeAttribute("disabled")
    }
  }

  set hidden(value) {
    if (value) {
      this.setAttribute('hidden', "")
    } else {
      this.removeAttribute("hidden")
    }
  }

}


SearchBox.template = document.createElement('template');
SearchBox.template.innerHTML = `
<style>
:host{
  display: inline-block;
  border: 1px solid black;
  border-radius: 5px;
  padding: 4px 6px;
}

:host([hidden]) {
  display: none;
}

:host([disabled]) {
  opacity: 0.5;
}

:host([focused]) {
  box-shadow: 0 0 2px 2px #6AE;
}

input {
  border-width: 0px;
  outline: none;
  font: inherit;
  background: inherit;
}

slot {
  cursor: default;
  user-select: none;
}
</style> 

<div>
<slot name="left">\u{1f50d}</slot>
<input type='text' id='input'/>
<slot name="right">\u{2573}</slot>
`

customElements.define('search-box', SearchBox)