import '/Users/dinakazakova/mesto-project-ff/src/pages/index.css';
import { arkhyzImage, chelyabinskoblastImage, ivanovoImage, kamchatkaImage, kholmogorskyrayonImage, baikalImage, initialCards } from './cards.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
 const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(item, deleteCard) {
  const itemCard = cardTemplate.querySelector(".places__item").cloneNode(true);
  const deleteButton = itemCard.querySelector(".card__delete-button");
  itemCard.querySelector(".card__image").src = item.link;
  itemCard.querySelector(".card__image").alt = item.name;
  itemCard.querySelector(".card__title").textContent = item.name;
  deleteButton.addEventListener("click", deleteCard);
  return itemCard;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  const cardElement = createCard(item, deleteCard);
  placesList.append(cardElement);
});

//import { likeCard, createCard, deleteCard } from "./card.js";
// import { openPopup, closePopup } from "./modal.js";
//import { initialCards } from './cards.js';

// DOM узлы
//const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button"); // кнопка редактировать профиль
const profileEddButton = document.querySelector(".profile__add-button"); // кнопка добавить новую карточку
const popup = document.querySelectorAll(".popup"); // ?
const popupTypeEdit = document.querySelector(".popup_type_edit"); // попап редактировать профиль
const popupTypeNewCard = document.querySelector(".popup_type_new-card"); // попап добавления новой карточки
const popupTypeImage = document.querySelector(".popup_type_image"); // попап открытия картинки
const popupImage = document.querySelector(".popup__image"); // попап открытой картинки
const popupCaption = document.querySelector(".popup__caption"); // попап с названием карточки
const popupClose = document.querySelectorAll(".popup__close"); // кнопка закрыть попап
const profileTitle = document.querySelector(".profile__title"); // имя
const profileDescription = document.querySelector(".profile__description"); // текст исследователь океана
