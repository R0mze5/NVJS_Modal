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

  this.initializeModal = function() {
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
        element.onclick = self.toggleModal.bind(this, event);
      });

      setEvents.call(_modal);
    }
  }

/*   function parse(){

  } */

  function setEvents(){
    let container = this.querySelector(_modalBody);
    let modalClose = this.querySelector(_modalClose);

    this.addEventListener('click', e => {
      if (e.target == modalClose){
        self.hide();
      } else if (e.target == this && container){
        self.hide();
      } else if (e.target == this && !container){
        e.preventDefault()
      } else if (e.target == container){
        e.preventDefault()
      }
    })
  }

  function error(type){
    const undefine = 'main tag of modal is error or undefined'
    if (type === 'undefined'){
      console.error(undefine);
    }
  }

  function findModal(){
    let modal;
    modal = document.querySelector(_modalClass+'[data-call='+_callButtonsData.split('.')[1]+']')
    return modal;
  }

  function isShowInverse() {
    self.isShow = !self.isShow;
  }


  self.toggleModal = () => {
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



  this.initializeModal();
}