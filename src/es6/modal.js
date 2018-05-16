'use strict';

function Modal(config) {
  let _callButtonsData = undefined; //data to find buttons
  let _callButtons;
  let _modalClass = '.modal'; //modal className
  let _modal;
  let _modalBody = '.modal__container'; //modal mainContainer for stopPropagination
  let _modalClose = '.modal__close'; //buttons for close modal
  let _modalShowClass = 'open'; //className showed modal
  this.isShow = false;

  const self = this;

  this.initialize = function() {
    if (typeof(config) == 'undefined') {
      _callButtonsData =  undefined;
    } else if (typeof(config) == 'string'){ 
      _callButtonsData = config;
    } else if (typeof(config) == 'object') {
      _callButtonsData = config.callButtons || _callButtonsData;
      _modalClass = config.modalClass || _modalClass;
      _modalShowClass = config.modalShowClass || _modalShowClass;
      _modalBody = config.modalBody || _modalBody;
      _modalClose = config.modalClose || _modalClose;
    }

    _callButtons = document.querySelectorAll(_callButtonsData);
    _modal = findModal();

    if (_callButtonsData == null || _callButtonsData === undefined) {
      error('undefined');
    } else {

      _callButtons.forEach( function(element, index) {
        element.onclick = configModal.bind(this, event);
      });

      if (typeof(_modalClose) !== 'string'){ 
        _modalClose.forEach( function(element, index) {
          document.querySelector(element).onclick = configModal.bind(this, event);
        });
      } else {
        document.querySelector(_modalClose).onclick = configModal.bind(this, event);
      }

      if(_modal !== document.querySelector(_modalBody)){
        _modal.onclick = configModal.bind(this, event);
        document.querySelector(_modalBody).onclick = accentModal.bind(this, event);
      }
    }
  }

  function error(type){
    const undefine = 'main tag of modal is error or undefined'
    if (type === 'undefined'){
      console.error(undefine);
    }
  }

  function findModal(){
    let modal;
    /* document.querySelectorAll(_modalClass).forEach( function(element, index) {
      if(document.querySelector(_callButtonsData).className.indexOf(element.getAttribute('data-call'))) modal = element;
    }); */
    modal = document.querySelector(_modalClass+'[data-call='+_callButtonsData.split('.')[1]+']')
    return modal;
  }

  function isShowInverse() {
    self.isShow = !self.isShow;
  }

  function accentModal() {
    event.stopPropagation();
  }

  function configModal() {
    event.preventDefault();
    if(!self.isShow){
      self.show();
    } else {
      self.hide();
    }
  }

  this.show = function() {
    _modal.classList.add(_modalShowClass);
    document.body.style.overflow = 'hidden';
    isShowInverse()
    
  }

  this.hide = function() {
    document.body.style.overflow = 'inherit';
    _modal.classList.remove(_modalShowClass);
    isShowInverse()
  }



  this.initialize();
}


