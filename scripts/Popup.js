;
export function openPopup(modal) {
    modal.classList.add("popup_opened");
    document.addEventListener('keydown', closePopupEsc);
  }
  
  export function closePopup(modal) {
    modal.classList.remove("popup_opened");
    document.removeEventListener('keydown', closePopupEsc);
  }

function closePopupEsc(evt) {
    console.log(evt.key)
    if (evt.key === 'Escape') {  
        const popup = document.querySelector('.popup_opened')   
      closePopup(popup);
    }
  }