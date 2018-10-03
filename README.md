NVJS_Modal
==========

<!-- [![Greenkeeper badge](https://badges.greenkeeper.io/nolimits4web/Swiper.svg)](https://greenkeeper.io/) -->

NVJS_Modal - is the free and responsive script, which allow create, show/hide modal windows and tracked events on it

- **No dependencies**
- All modern browsers are supported
- Fully **responsive**

NVJS_Modal is not compatible with all platforms, because it used ES6. it is a modern menu which is focused only on modern apps/platforms to bring the best experience and simplicity.

## [Example on Codepen](https://codepen.io/r0mzes/pen/OBMqEj)

<!-- _Read documentation in other languages:_
[_Русский_](documentation/README.ru-Ru.md) -->

# Supported Browsers

 - Edge
 - Chrome
 - Safari
 - Mobile Safari
 - Android Default Browser

# API

API description is available on [API documentation](documentation/api.md).



# Get Started

## Include NVJS_Modal Files To Website/App

```html
<!DOCTYPE html>
<html lang="en">
<head>
    ...
    <link rel="stylesheet" href="path/to/NVJS_Modal.css">
</head>
<body>
    ...
    <script src="path/to/NVJS_Modal.js"></script>
</body>
</html>
```


## Add NVJS_Modal HTML Layout

```html
  <div class="modal" data-call="modal">
    <div class="modal__container">
      <div class="modal__close">
        <svg xmlns="http://www.w3.org/2000/svg">
          <use xlink:href="#svg-close"></use>
        </svg>
      </div>
      <h1>Modal title</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident quia enim, eos esse expedita repellat sed
        voluptatibus similique beatae quae magni totam repellendus, voluptatem adipisci, commodi optio ratione.
        Possimus, cumque.</p>
    </div>
  </div>


  <div class="svg-root" style="position: absolute; width: 0; height: 0; visibility: hidden;">
    <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" display="none" aria-hidden="true">
      <symbol id="svg-close" viewbox="0 0 21 21">
        <title>close</title>
        <path d="M2.592.044l18.364 18.364-2.548 2.548L.044 2.592z" />
        <path d="M0 18.364L18.364 0l2.548 2.548L2.548 20.912z" />
      </symbol>
    </svg>
  </div>
```

## Initialize NVJS_Modal

```js
    new NVJSModal('.modal[data-call="modal"]', {
        modalShowClass: 'open',
        modalShowButtons: '.show_modal',
        modalBody: '.modal__container',
        lockBody: true,
        modalCloseButton: '.modal__close'
    });
```


# Changelog

Changelog is available on [Changelog documentation](documentation/changelog.md).


# License

 NVJS_Modal is licensed [WTFPL](http://www.wtfpl.net/about/). You can use it **for free** and **without any attribution**, in any personal or commercial project. You may also fork the project and re-release it under another license you prefer.