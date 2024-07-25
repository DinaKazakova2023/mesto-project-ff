// функция открытия модального окна
export function openPopup(popup) {
  popup.classList.add("popup_is-animated");
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 1);
  popup.addEventListener("click", closePopupOverlay);
  document.addEventListener("keydown", closePopupEsc);
}

// функция закрытия модального окна
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("click", closePopupOverlay);
  document.removeEventListener("keydown", closePopupEsc);
}

// функция-обработчик события нажатия Esc
export function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector(".popup_is-opened");
    closePopup(popupOpen);
  }
}

// функция-обработчик события клика по оверлею
export function closePopupOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.currentTarget);
  }
}
