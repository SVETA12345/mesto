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
    const popup = document.querySelector('.popup_opened')
    if (evt.key === 'Escape') {     
      closePopup(popup);
    }
  }