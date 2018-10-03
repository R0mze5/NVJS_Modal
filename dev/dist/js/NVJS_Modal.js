'use strict';

function NVJSModal(config, ...configAtributes) {
  const self = this;
  
	let autoInitialize = true;
  let logErrors = false;
  let lockBody = true;
  let closingElements = [];
  let preventedElements = [];

  let _initialized = false;
  let _isShow = false;
  let _bodyFlowStatus;
  
  //this.modal;
  //this.buttons

  let buttons;

  let modalShowClass = 'open'; //className showed modal


  let modalBody;
  let modalBodyClass;
	let modalBodyDefaults = '.modal__container'; //modal mainContainer for stopPropagination

	let modalCloseButton; //buttons for close modal
	let modalCloseButtonClass; //buttons for close modal
	let modalCloseButtonDefaults = '.modal__close'; //buttons for close modal



	function parseDataModal(configData) {
    if(document.querySelector(this)){
      self.modal = document.querySelector(this);
    }

    if(configData){
      buttons = configData.callButtons;

      modalBodyClass = configData.modalBody ? configData.modalBody : modalBodyDefaults;
      modalCloseButtonClass = configData.modalCloseButton ? configData.modalCloseButton : modalCloseButtonDefaults;
      modalCloseButton = self.modal.querySelector(modalCloseButtonClass);

      modalShowClass = configData.modalShowClass ? configData.modalShowClass : modalShowClass;
      logErrors = configData.logErrors ? configData.logErrors : logErrors;
      lockBody = configData.lockBody != undefined ? configData.lockBody : lockBody;

      autoInitialize = configData.autoInitialize ? configData.autoInitialize : autoInitialize;

      buttons = configData.modalShowButtons;
    }

		if(autoInitialize) initialize();
	}



  
  function initialize(){
    
    if (buttons){
      self.buttons = parseButtonsArray(buttons);
    }

    if(modalCloseButton){
      closingElements.push(modalCloseButton);
    }

    if (self.modal.querySelector(modalBodyClass)){
      modalBody = self.modal.querySelector(modalBodyClass);
      preventedElements.push(modalBody);
      closingElements.push(self.modal);
    } else if (Array.prototype.slice.call(document.querySelectorAll(modalBodyClass), 0).some(element => element == self.modal)){
      preventedElements.push(self.modal);
      closingElements.push(document.body);
    }

    setEvents();
  }



	function setEvents(){

    preventedElements.forEach(element => element.addEventListener('click', (event) => {
        event.cancelBubble = true;
    }));

    if(closingElements){
      self.modal.addEventListener('show', () => {
        closingElements.forEach(element => element.addEventListener('click', hide));

        // привязать скрытие модалки только для одного элемента за раз
        // document.addEventListener('keyup', elementOnKeyPressHandler);
      });
      self.modal.addEventListener('hide', () => {
        closingElements.forEach(element => element.removeEventListener('click', hide));
      });
    }


    if(self.buttons){
      self.buttons.forEach(button => {
          button.addEventListener('click', (event) => {
          if(!_isShow){
            event.stopPropagation();
          }
          event.preventDefault();
          self.show();
        });
      });
    }


    function elementOnKeyPressHandler(event){
      if(event.key == "Escape"){
        hide();
        document.removeEventListener('keyup', elementOnKeyPressHandler);
      }
    }

	}


	function show() {
    activeClassHandler.call(self.modal, 'add', modalShowClass);
    bodyLock.call(self.body, 'lock');
		self.modal.dispatchEvent(new Event ('show'));
    _isShowInverse();
	}

	function hide() {
    bodyLock.call(self.body, 'unlock');
    activeClassHandler.call(self.modal, 'remove', modalShowClass);
		self.modal.dispatchEvent(new Event ('hide'));
		_isShowInverse();
  }

  function bodyLock(status){
    if(lockBody) {
      if (status == 'lock'){
        _bodyFlowStatus = document.body.style.overflow;  
        document.body.style.overflow = 'hidden';
      } else if (status == 'unlock'){
        document.body.style.overflow = _bodyFlowStatus;
        _bodyFlowStatus = undefined;
      }
    }
  }
  


  function parseButtonsArray(buttonsArray){
    let allbuttonsArray = [];
    if(typeof buttonsArray == 'object'){
      buttonsArray.map(element => {
        parseButtonsArray(element).forEach(element => allbuttonsArray.push(element));
      });
      return allbuttonsArray;

    } else if(typeof buttonsArray == 'string'){
      return Array.prototype.slice.call(document.querySelectorAll(buttonsArray), 0);
    }
  }
  
	function activeClassHandler(action, className){
		if ((action == 'add' && !this.classList.contains(className)) || (action == 'remove' && this.classList.contains(className))){
			this.classList[action](className);
		} 
	}

	function _isShowInverse() {
		_isShow = !_isShow;
	}


	this.toggle = () => {
		!_isShow ? show() : hide();
	};

  this.hide = function(){
    if(_isShow){
      hide();
    }
  };


  this.show = function(){
    if(!_isShow){
      show();
    }
  };

  this.initialize = function(){
    if(!_initialized){
      initialize();
    }
  };

	function parseConfig() {
		switch(typeof config){
      case 'string': {
        if (document.body.querySelectorAll(config)){
          let modals = document.body.querySelectorAll(config);
          if (modals.length == 1){
            if (configAtributes.length == 1 && configAtributes[0] instanceof Object){
              parseDataModal.call(config, configAtributes[0]);
            } else {
              showError('configuration is not object');
            }
          } else if(modals.length > 1){
            //! обработчик, если доступно модалок по селектору больше одной
          }
        } else {
          showError(`${config} not found on this page`);
        }
        break;
      }
      case 'object': {
        if(config instanceof Array){
          // parseData align on button or modal
        } else {
          // parseData align on button or modal
        }
        break;
      }
      case 'undefined': {
          showError(`no data to configurate modal`);
          break;
      }
    }
  }
  
  function showError(textError) {
    if (logErrors){
      throw new Error(textError);
    }
  }

	parseConfig();
}


// let modal = new NVJSModal('.modal[data-call="agreement_modal"]', {
//   modalShowClass: 'open',
//   modalShowButtons: ['.agreement__link', '.confidential__link'],
// 	modalBody: '.modal__container',
// 	modalCloseButton: '.modal__close'
// });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJOVkpTX01vZGFsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gTlZKU01vZGFsKGNvbmZpZywgLi4uY29uZmlnQXRyaWJ1dGVzKSB7XG4gIGNvbnN0IHNlbGYgPSB0aGlzO1xuICBcblx0bGV0IGF1dG9Jbml0aWFsaXplID0gdHJ1ZTtcbiAgbGV0IGxvZ0Vycm9ycyA9IGZhbHNlO1xuICBsZXQgbG9ja0JvZHkgPSB0cnVlO1xuICBsZXQgY2xvc2luZ0VsZW1lbnRzID0gW107XG4gIGxldCBwcmV2ZW50ZWRFbGVtZW50cyA9IFtdO1xuXG4gIGxldCBfaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgbGV0IF9pc1Nob3cgPSBmYWxzZTtcbiAgbGV0IF9ib2R5Rmxvd1N0YXR1cztcbiAgXG4gIC8vdGhpcy5tb2RhbDtcbiAgLy90aGlzLmJ1dHRvbnNcblxuICBsZXQgYnV0dG9ucztcblxuICBsZXQgbW9kYWxTaG93Q2xhc3MgPSAnb3Blbic7IC8vY2xhc3NOYW1lIHNob3dlZCBtb2RhbFxuXG5cbiAgbGV0IG1vZGFsQm9keTtcbiAgbGV0IG1vZGFsQm9keUNsYXNzO1xuXHRsZXQgbW9kYWxCb2R5RGVmYXVsdHMgPSAnLm1vZGFsX19jb250YWluZXInOyAvL21vZGFsIG1haW5Db250YWluZXIgZm9yIHN0b3BQcm9wYWdpbmF0aW9uXG5cblx0bGV0IG1vZGFsQ2xvc2VCdXR0b247IC8vYnV0dG9ucyBmb3IgY2xvc2UgbW9kYWxcblx0bGV0IG1vZGFsQ2xvc2VCdXR0b25DbGFzczsgLy9idXR0b25zIGZvciBjbG9zZSBtb2RhbFxuXHRsZXQgbW9kYWxDbG9zZUJ1dHRvbkRlZmF1bHRzID0gJy5tb2RhbF9fY2xvc2UnOyAvL2J1dHRvbnMgZm9yIGNsb3NlIG1vZGFsXG5cblxuXG5cdGZ1bmN0aW9uIHBhcnNlRGF0YU1vZGFsKGNvbmZpZ0RhdGEpIHtcbiAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMpKXtcbiAgICAgIHNlbGYubW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMpO1xuICAgIH1cblxuICAgIGlmKGNvbmZpZ0RhdGEpe1xuICAgICAgYnV0dG9ucyA9IGNvbmZpZ0RhdGEuY2FsbEJ1dHRvbnM7XG5cbiAgICAgIG1vZGFsQm9keUNsYXNzID0gY29uZmlnRGF0YS5tb2RhbEJvZHkgPyBjb25maWdEYXRhLm1vZGFsQm9keSA6IG1vZGFsQm9keURlZmF1bHRzO1xuICAgICAgbW9kYWxDbG9zZUJ1dHRvbkNsYXNzID0gY29uZmlnRGF0YS5tb2RhbENsb3NlQnV0dG9uID8gY29uZmlnRGF0YS5tb2RhbENsb3NlQnV0dG9uIDogbW9kYWxDbG9zZUJ1dHRvbkRlZmF1bHRzO1xuICAgICAgbW9kYWxDbG9zZUJ1dHRvbiA9IHNlbGYubW9kYWwucXVlcnlTZWxlY3Rvcihtb2RhbENsb3NlQnV0dG9uQ2xhc3MpO1xuXG4gICAgICBtb2RhbFNob3dDbGFzcyA9IGNvbmZpZ0RhdGEubW9kYWxTaG93Q2xhc3MgPyBjb25maWdEYXRhLm1vZGFsU2hvd0NsYXNzIDogbW9kYWxTaG93Q2xhc3M7XG4gICAgICBsb2dFcnJvcnMgPSBjb25maWdEYXRhLmxvZ0Vycm9ycyA/IGNvbmZpZ0RhdGEubG9nRXJyb3JzIDogbG9nRXJyb3JzO1xuICAgICAgbG9ja0JvZHkgPSBjb25maWdEYXRhLmxvY2tCb2R5ICE9IHVuZGVmaW5lZCA/IGNvbmZpZ0RhdGEubG9ja0JvZHkgOiBsb2NrQm9keTtcblxuICAgICAgYXV0b0luaXRpYWxpemUgPSBjb25maWdEYXRhLmF1dG9Jbml0aWFsaXplID8gY29uZmlnRGF0YS5hdXRvSW5pdGlhbGl6ZSA6IGF1dG9Jbml0aWFsaXplO1xuXG4gICAgICBidXR0b25zID0gY29uZmlnRGF0YS5tb2RhbFNob3dCdXR0b25zO1xuICAgIH1cblxuXHRcdGlmKGF1dG9Jbml0aWFsaXplKSBpbml0aWFsaXplKCk7XG5cdH1cblxuXG5cbiAgXG4gIGZ1bmN0aW9uIGluaXRpYWxpemUoKXtcbiAgICBcbiAgICBpZiAoYnV0dG9ucyl7XG4gICAgICBzZWxmLmJ1dHRvbnMgPSBwYXJzZUJ1dHRvbnNBcnJheShidXR0b25zKTtcbiAgICB9XG5cbiAgICBpZihtb2RhbENsb3NlQnV0dG9uKXtcbiAgICAgIGNsb3NpbmdFbGVtZW50cy5wdXNoKG1vZGFsQ2xvc2VCdXR0b24pO1xuICAgIH1cblxuICAgIGlmIChzZWxmLm1vZGFsLnF1ZXJ5U2VsZWN0b3IobW9kYWxCb2R5Q2xhc3MpKXtcbiAgICAgIG1vZGFsQm9keSA9IHNlbGYubW9kYWwucXVlcnlTZWxlY3Rvcihtb2RhbEJvZHlDbGFzcyk7XG4gICAgICBwcmV2ZW50ZWRFbGVtZW50cy5wdXNoKG1vZGFsQm9keSk7XG4gICAgICBjbG9zaW5nRWxlbWVudHMucHVzaChzZWxmLm1vZGFsKTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwobW9kYWxCb2R5Q2xhc3MpLCAwKS5zb21lKGVsZW1lbnQgPT4gZWxlbWVudCA9PSBzZWxmLm1vZGFsKSl7XG4gICAgICBwcmV2ZW50ZWRFbGVtZW50cy5wdXNoKHNlbGYubW9kYWwpO1xuICAgICAgY2xvc2luZ0VsZW1lbnRzLnB1c2goZG9jdW1lbnQuYm9keSk7XG4gICAgfVxuXG4gICAgc2V0RXZlbnRzKCk7XG4gIH1cblxuXG5cblx0ZnVuY3Rpb24gc2V0RXZlbnRzKCl7XG5cbiAgICBwcmV2ZW50ZWRFbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICAgIH0pKTtcblxuICAgIGlmKGNsb3NpbmdFbGVtZW50cyl7XG4gICAgICBzZWxmLm1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ3Nob3cnLCAoKSA9PiB7XG4gICAgICAgIGNsb3NpbmdFbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhpZGUpKTtcblxuICAgICAgICAvLyDQv9GA0LjQstGP0LfQsNGC0Ywg0YHQutGA0YvRgtC40LUg0LzQvtC00LDQu9C60Lgg0YLQvtC70YzQutC+INC00LvRjyDQvtC00L3QvtCz0L4g0Y3Qu9C10LzQtdC90YLQsCDQt9CwINGA0LDQt1xuICAgICAgICAvLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGVsZW1lbnRPbktleVByZXNzSGFuZGxlcik7XG4gICAgICB9KTtcbiAgICAgIHNlbGYubW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignaGlkZScsICgpID0+IHtcbiAgICAgICAgY2xvc2luZ0VsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGlkZSkpO1xuICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBpZihzZWxmLmJ1dHRvbnMpe1xuICAgICAgc2VsZi5idXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICBpZighX2lzU2hvdyl7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBzZWxmLnNob3coKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGVsZW1lbnRPbktleVByZXNzSGFuZGxlcihldmVudCl7XG4gICAgICBpZihldmVudC5rZXkgPT0gXCJFc2NhcGVcIil7XG4gICAgICAgIGhpZGUoKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlbGVtZW50T25LZXlQcmVzc0hhbmRsZXIpO1xuICAgICAgfVxuICAgIH1cblxuXHR9XG5cblxuXHRmdW5jdGlvbiBzaG93KCkge1xuICAgIGFjdGl2ZUNsYXNzSGFuZGxlci5jYWxsKHNlbGYubW9kYWwsICdhZGQnLCBtb2RhbFNob3dDbGFzcyk7XG4gICAgYm9keUxvY2suY2FsbChzZWxmLmJvZHksICdsb2NrJyk7XG5cdFx0c2VsZi5tb2RhbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCAoJ3Nob3cnKSk7XG4gICAgX2lzU2hvd0ludmVyc2UoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGhpZGUoKSB7XG4gICAgYm9keUxvY2suY2FsbChzZWxmLmJvZHksICd1bmxvY2snKTtcbiAgICBhY3RpdmVDbGFzc0hhbmRsZXIuY2FsbChzZWxmLm1vZGFsLCAncmVtb3ZlJywgbW9kYWxTaG93Q2xhc3MpO1xuXHRcdHNlbGYubW9kYWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQgKCdoaWRlJykpO1xuXHRcdF9pc1Nob3dJbnZlcnNlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBib2R5TG9jayhzdGF0dXMpe1xuICAgIGlmKGxvY2tCb2R5KSB7XG4gICAgICBpZiAoc3RhdHVzID09ICdsb2NrJyl7XG4gICAgICAgIF9ib2R5Rmxvd1N0YXR1cyA9IGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3c7ICBcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT0gJ3VubG9jaycpe1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gX2JvZHlGbG93U3RhdHVzO1xuICAgICAgICBfYm9keUZsb3dTdGF0dXMgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuXG5cbiAgZnVuY3Rpb24gcGFyc2VCdXR0b25zQXJyYXkoYnV0dG9uc0FycmF5KXtcbiAgICBsZXQgYWxsYnV0dG9uc0FycmF5ID0gW107XG4gICAgaWYodHlwZW9mIGJ1dHRvbnNBcnJheSA9PSAnb2JqZWN0Jyl7XG4gICAgICBidXR0b25zQXJyYXkubWFwKGVsZW1lbnQgPT4ge1xuICAgICAgICBwYXJzZUJ1dHRvbnNBcnJheShlbGVtZW50KS5mb3JFYWNoKGVsZW1lbnQgPT4gYWxsYnV0dG9uc0FycmF5LnB1c2goZWxlbWVudCkpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gYWxsYnV0dG9uc0FycmF5O1xuXG4gICAgfSBlbHNlIGlmKHR5cGVvZiBidXR0b25zQXJyYXkgPT0gJ3N0cmluZycpe1xuICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYnV0dG9uc0FycmF5KSwgMCk7XG4gICAgfVxuICB9XG4gIFxuXHRmdW5jdGlvbiBhY3RpdmVDbGFzc0hhbmRsZXIoYWN0aW9uLCBjbGFzc05hbWUpe1xuXHRcdGlmICgoYWN0aW9uID09ICdhZGQnICYmICF0aGlzLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB8fCAoYWN0aW9uID09ICdyZW1vdmUnICYmIHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpKXtcblx0XHRcdHRoaXMuY2xhc3NMaXN0W2FjdGlvbl0oY2xhc3NOYW1lKTtcblx0XHR9IFxuXHR9XG5cblx0ZnVuY3Rpb24gX2lzU2hvd0ludmVyc2UoKSB7XG5cdFx0X2lzU2hvdyA9ICFfaXNTaG93O1xuXHR9XG5cblxuXHR0aGlzLnRvZ2dsZSA9ICgpID0+IHtcblx0XHQhX2lzU2hvdyA/IHNob3coKSA6IGhpZGUoKTtcblx0fTtcblxuICB0aGlzLmhpZGUgPSBmdW5jdGlvbigpe1xuICAgIGlmKF9pc1Nob3cpe1xuICAgICAgaGlkZSgpO1xuICAgIH1cbiAgfTtcblxuXG4gIHRoaXMuc2hvdyA9IGZ1bmN0aW9uKCl7XG4gICAgaWYoIV9pc1Nob3cpe1xuICAgICAgc2hvdygpO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLmluaXRpYWxpemUgPSBmdW5jdGlvbigpe1xuICAgIGlmKCFfaW5pdGlhbGl6ZWQpe1xuICAgICAgaW5pdGlhbGl6ZSgpO1xuICAgIH1cbiAgfTtcblxuXHRmdW5jdGlvbiBwYXJzZUNvbmZpZygpIHtcblx0XHRzd2l0Y2godHlwZW9mIGNvbmZpZyl7XG4gICAgICBjYXNlICdzdHJpbmcnOiB7XG4gICAgICAgIGlmIChkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoY29uZmlnKSl7XG4gICAgICAgICAgbGV0IG1vZGFscyA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvckFsbChjb25maWcpO1xuICAgICAgICAgIGlmIChtb2RhbHMubGVuZ3RoID09IDEpe1xuICAgICAgICAgICAgaWYgKGNvbmZpZ0F0cmlidXRlcy5sZW5ndGggPT0gMSAmJiBjb25maWdBdHJpYnV0ZXNbMF0gaW5zdGFuY2VvZiBPYmplY3Qpe1xuICAgICAgICAgICAgICBwYXJzZURhdGFNb2RhbC5jYWxsKGNvbmZpZywgY29uZmlnQXRyaWJ1dGVzWzBdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNob3dFcnJvcignY29uZmlndXJhdGlvbiBpcyBub3Qgb2JqZWN0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmKG1vZGFscy5sZW5ndGggPiAxKXtcbiAgICAgICAgICAgIC8vISDQvtCx0YDQsNCx0L7RgtGH0LjQuiwg0LXRgdC70Lgg0LTQvtGB0YLRg9C/0L3QviDQvNC+0LTQsNC70L7QuiDQv9C+INGB0LXQu9C10LrRgtC+0YDRgyDQsdC+0LvRjNGI0LUg0L7QtNC90L7QuVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzaG93RXJyb3IoYCR7Y29uZmlnfSBub3QgZm91bmQgb24gdGhpcyBwYWdlYCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdvYmplY3QnOiB7XG4gICAgICAgIGlmKGNvbmZpZyBpbnN0YW5jZW9mIEFycmF5KXtcbiAgICAgICAgICAvLyBwYXJzZURhdGEgYWxpZ24gb24gYnV0dG9uIG9yIG1vZGFsXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gcGFyc2VEYXRhIGFsaWduIG9uIGJ1dHRvbiBvciBtb2RhbFxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAndW5kZWZpbmVkJzoge1xuICAgICAgICAgIHNob3dFcnJvcihgbm8gZGF0YSB0byBjb25maWd1cmF0ZSBtb2RhbGApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgZnVuY3Rpb24gc2hvd0Vycm9yKHRleHRFcnJvcikge1xuICAgIGlmIChsb2dFcnJvcnMpe1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHRleHRFcnJvcik7XG4gICAgfVxuICB9XG5cblx0cGFyc2VDb25maWcoKTtcbn1cblxuXG4vLyBsZXQgbW9kYWwgPSBuZXcgTlZKU01vZGFsKCcubW9kYWxbZGF0YS1jYWxsPVwiYWdyZWVtZW50X21vZGFsXCJdJywge1xuLy8gICBtb2RhbFNob3dDbGFzczogJ29wZW4nLFxuLy8gICBtb2RhbFNob3dCdXR0b25zOiBbJy5hZ3JlZW1lbnRfX2xpbmsnLCAnLmNvbmZpZGVudGlhbF9fbGluayddLFxuLy8gXHRtb2RhbEJvZHk6ICcubW9kYWxfX2NvbnRhaW5lcicsXG4vLyBcdG1vZGFsQ2xvc2VCdXR0b246ICcubW9kYWxfX2Nsb3NlJ1xuLy8gfSk7Il0sImZpbGUiOiJOVkpTX01vZGFsLmpzIn0=
