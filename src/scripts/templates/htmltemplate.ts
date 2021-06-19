const template: HTMLElement | null = document.querySelector('#mytemplate')  
 

// if(template instanceof HTMLElement) {
 

//   (template as HTMLMetaElement).content.querySelector('img').src = 'logo.png' 

//   const clone = document.importNode((template as HTMLMetaElement).content , true)

//   console.log(clone)

//   document.body.appendChild(clone)
// }

if(template instanceof HTMLElement) {
 

  (template as HTMLMetaElement).content.querySelector('img').src = 'logo.png' 

  const clone = document.importNode((template as HTMLMetaElement).content , true)

  const div = document.createElement('div')

  const root = div.attachShadow({mode: 'open'})

  root.appendChild(clone)
 
  document.body.appendChild(div)
}
