

interface Tree {
  id: number
  items?: Array<Tree>
}

const treeStructure:Tree = {
  id: 1,
  items: [{
    id: 2,
    items: [{
      id: 3
    }]
  }]
}


class TreeComponent extends HTMLElement {
  protected _tree: Tree | undefined;

  constructor() {
    super()
    // state, defaultValues, listeners, shadow root

    this.attachShadow({mode: 'open'})
  }

  static get observedAttributes() {
    return ['data-tree']
  }

  attributeChangedCallback(_name:string, _oldValue:null, newValue:string) {

    if(typeof newValue === 'string') {

      try {
        const tree = JSON.parse(newValue)
        

        if(typeof tree?.id === 'number') {
        
          this._tree = tree

          this.render()
        }
      } catch (error) {
        console.log(error)
      }
  
    }
  }

  renderTree(tree: Tree, level = 0) {
    const currentLevel = level + 1;

    const wrapper = document.createDocumentFragment()

    const treeElement = document.createElement('div');

    treeElement.innerHTML = `<div>${'-'.repeat(level )} tree:${tree.id}</div><br/>`

    wrapper.appendChild(treeElement)

    if(tree?.items?.length) {
      const leaf = document.createElement('div')

      leaf.textContent = ` ${'-'.repeat(currentLevel)} items:`

      tree.items.forEach(leafItem => leaf.appendChild(this.renderTree(leafItem, currentLevel)))

      wrapper.appendChild(leaf)

    }

    return wrapper
  }

  render() {

    if(this.shadowRoot && this._tree) {
      this.shadowRoot.appendChild(this.renderTree(this._tree)) 
    }
   
  }
}


window.customElements.define("tree-component", TreeComponent);