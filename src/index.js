import "./pages/index.css";
import {
  arkhyzImage,
  chelyabinskoblastImage,
  ivanovoImage,
  kamchatkaImage,
  kholmogorskyrayonImage,
  baikalImage,
  initialCards,
} from "./scripts/cards.js";
import { openPopup, closePopup } from "./scripts/modal.js";
import { createCard, removeCard, likeCard } from "./scripts/card.js";

const placesList = document.querySelector(".places__list");

initialCards.forEach(function (item) {
  placesList.append(createCard(item, removeCard, likeCard, handleImageClick));
});

const profileTitle = document.querySelector(".profile__title"); // имя
const profileDescription = document.querySelector(".profile__description"); // профессия
const profileEditButton = document.querySelector(".profile__edit-button"); // кнопка редактировать профиль
const popupTypeEdit = document.querySelector(".popup_type_edit"); // модалка редактировать профиль
const profileForm = popupTypeEdit.querySelector(".popup__form"); // форма редактирования профиля
const inputName = popupTypeEdit.querySelector(".popup__input_type_name"); // инпут имя в модалке
const inputDescription = popupTypeEdit.querySelector(
  ".popup__input_type_description"
); // инпут профессия в модалке

//открытие модалки на кнопку редактировать профиль
profileEditButton.addEventListener("click", () => {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupTypeEdit);
});

// обработчик отправки формы, хотя пока она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // эта строчка отменяет стандартную отправку формы
  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupTypeEdit);
}

// прикрепляем обработчик к форме: он будет следить за событием submit - отправка
profileForm.addEventListener("submit", handleProfileFormSubmit);

const popupTypeNewCard = document.querySelector(".popup_type_new-card"); // модалка добавления новой карточки
const popupFormNewCard = popupTypeNewCard.querySelector(".popup__form"); // форма добавления карточки
const inputNameNewCard = popupTypeNewCard.querySelector(
  ".popup__input_type_card-name"
); // инпут названия
const inputUrlImageNewCard = popupFormNewCard.querySelector(
  ".popup__input_type_url"
); // инпут ссылки
const profileAddButton = document.querySelector(".profile__add-button"); // кнопка добавить карточку

//открытие модалки по кнопке добавить новую карточку
profileAddButton.addEventListener("click", () => {
  openPopup(popupTypeNewCard);
});

// функция добавления новой карточки
function addCardNew(evt) {
  evt.preventDefault();
  const newCard = {
    link: inputUrlImageNewCard.value,
    name: inputNameNewCard.value,
  };
  placesList.prepend(
    createCard(newCard, removeCard, likeCard, handleImageClick)
  );
  popupFormNewCard.reset();
  closePopup(popupTypeNewCard);
}

popupFormNewCard.addEventListener("submit", addCardNew);

const popupTypeImage = document.querySelector(".popup_type_image"); //модалка карточки
const popupImage = document.querySelector(".popup__image"); // картинка
const popupCaption = document.querySelector(".popup__caption"); // название карточки

// функция открытия карточки
function handleImageClick(item) {
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupCaption.textContent = item.name;
  openPopup(popupTypeImage);
}

const closeButton = document.querySelectorAll(".popup__close"); // кнопка закрыть модалку

// закрытие модалки на иконку крестик
closeButton.forEach((button) => {
  button.addEventListener("click", function () {
    closePopup(button.closest(".popup_is-opened"));
  });
});
