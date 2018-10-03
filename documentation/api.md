# API

## Initialize NVJS_Modal

``` js
// initialize modal with options:
new NVJS_Modal(modalContainer, parameters);
```

- `modalContainer` - string (with CSS Selector) of NVJS_Modal container HTML element. Required;
- `parameters` - object with NVJS_Modal parameters. Optional.


## NVJS_Modal Parameters


**example:**
``` js
new NVJS_Modal({
    modalShowClass: 'open',
    modalShowButtons: '.show_modal'
})
``` 

> **`modalShowButtons`** \
> Used for set `show modal` on click this elements. May be string (with CSS Selector) or Array of strings (with CSS Selector) \
> **type**  `String` or `Array` \

> **`modalBody`** \
> String with CSS Selector of childNode of `modalConteiner`, which used for close modal. If `modalBody`is `modalContainer`, closing element is `document.body`  \
> **type**  `String`\
> **default**  `'.modal__container'`

> **`modalCloseButton`** \
> Used for set `close modal` on click this elements. May be string (with CSS Selector) or Array of strings (with CSS Selector) \
> **type**  `String` or `Array` \
> **default**  `'.modal__close'`

> **`modalShowClass`** \
> CSS class name added to modal elements when it becomes opened \
> **type**  `String`\
> **default**  `'open'`

> **`autoInitialize`** \
> Whether NVJS_Modal should be initialised automatically when you create an instance. If disabled, then you need to init it manually by calling mymodal.initialize() \
> **type**  `Boolean`\
> **default**  `true`

> **`lockBody`** \
> If enable, you can't scroll body, while modal is openned \
> **type**  `Boolean`\
> **default**  `true`

> **`logErrors`** \
> Show errors in console \
> **type**  `Boolean`\
> **default**  `false`


## NVJS_Modal Methods & Properties


**example:**
``` js
    let myModal = new NVJS_Modal('.modal');
    myModal.show()
``` 

> **`.initialize();`** \
> Initialize NVJS_Modal if autoinitialize false in config 

> **`.toggle();`** \
> Hide modal  if it was open and conversely

> **`.hide();`** \
> Hide modal 

> **`.show();`** \
> Open modal 

> **`.header;`** \
> Header Element

## Events

**example:**
``` js
    let myModal = new NVJS_Modal('.modal');
    myModal.modal(addEventListener('show', () => {console.log('modal show')}))
``` 


> **`show`** \
> When modal is open

> **`hide`** \
> When modal is hide
