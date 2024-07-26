import "./pages/index.css";
import { openPopup, closePopup } from "./scripts/modal.js";
import { createCard, removeCard, likeCard } from "./scripts/card.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import {
  getAddNewCard,
  getInfoUser,
  addCardServer,
  getUserDataServer,
  changeAvatar,
} from "./scripts/api.js";

// DOM
const placesList = document.querySelector(".places__list");
const profileAddButton = document.querySelector(".profile__add-button"); // кнопка добавить карточку
const profileTitle = document.querySelector(".profile__title"); // имя
const profileDescription = document.querySelector(".profile__description"); // профессия
const profileEditButton = document.querySelector(".profile__edit-button"); // кнопка редактировать профиль
const popupTypeEdit = document.querySelector(".popup_type_edit"); // модалка редактировать профиль
const inputName = popupTypeEdit.querySelector(".popup__input_type_name"); // инпут имя в модалке
const inputDescription = popupTypeEdit.querySelector(
  ".popup__input_type_description"
); // инпут профессия в модалке
const popupTypeNewCard = document.querySelector(".popup_type_new-card"); // модалка добавления новой карточки
const popupFormNewCard = popupTypeNewCard.querySelector(".popup__form"); // форма добавления карточки
const popupTypeImage = document.querySelector(".popup_type_image"); //модалка карточки
const popupImage = document.querySelector(".popup__image"); // картинка в модалке
const popupCaption = document.querySelector(".popup__caption"); // название карточки
const closeButton = document.querySelectorAll(".popup__close"); // кнопка закрыть модалку
const popupTypeAvatar = document.querySelector(".popup_type_avatar"); // модалка редактирования аватарки
const formEditAvatar = document.forms["profile-edit-avatar"]; // форма редактирования аватарки
const formAddCard = document.forms["new-place"]; // добавление новой карточки
const nameInputCard = formAddCard.elements["place-name"]; // название новой карточки
const inputEditAvatar = formEditAvatar.querySelector(".popup__input_type_url");
const profileForm = popupTypeEdit.querySelector(".popup__form"); // форма редактирования профиля
const profileImage = document.querySelector(".profile__image"); // фото аватарки
const linkInputCard = formAddCard.elements.link; // ссылка на картинку добавленной карточки
const buttonFormCard = formAddCard.querySelector(".popup__button"); // кнопка добавления новой карточки
const buttonFormProfile = popupTypeEdit.querySelector(".popup__button"); // кнопка добавления имени и профессии
const buttonFormAvatar = popupTypeAvatar.querySelector(".popup__button"); // кнопка смены фото в модалке

// валидация
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "error_active",
};
enableValidation(validationConfig);

// api
let userId = "";
Promise.all([getInfoUser(), getAddNewCard()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.setAttribute(
      "style",
      `background-image: url('${userData.avatar}')`
    );
    initialCards.forEach((item) => {
      const cardElm = createCard(
        item,
        removeCard,
        likeCard,
        handleImageClick,
        userId
      );
      placesList.append(cardElm);
    });
  })
  .catch((err) => {
    console.log("Ошибка при получении данных:", err);
  });

// функция редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // эта строчка отменяет стандартную отправку формы
  saveButton(true, buttonFormProfile);
  const name = inputName.value;
  const job = inputDescription.value;
  getUserDataServer(name, job)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(popupTypeEdit);
      profileForm.reset();
    })
    .catch((err) => {
      console.log("Oшибка при изменении информации профиля:", err);
    })
    .finally(() => {
      saveButton(false, buttonFormProfile);
    });
}
profileForm.addEventListener("submit", handleProfileFormSubmit);

// функция добавления карточки
function addCardNew(evt) {
  evt.preventDefault();
  const newCard = {
    link: linkInputCard.value,
    name: nameInputCard.value,
  };
  saveButton(true, buttonFormCard);
  addCardServer(newCard)
    .then((item) => {
      const cardElm = createCard(
        item,
        removeCard,
        likeCard,
        handleImageClick,
        userId
      );
      placesList.prepend(cardElm);
      closePopup(popupTypeNewCard);
      formAddCard.reset();
    })
    .catch((err) => {
      console.log("Oшибка при добавлении новой карточки:", err);
    })
    .finally(() => {
      saveButton(false, buttonFormCard);
    });
}
popupFormNewCard.addEventListener("submit", addCardNew);

// функция изменения состояния кнопки "сохранить"
function saveButton(loader, button) {
  if (loader) {
    button.textContent = "Сохранение...";
  } else if (!loader) {
    button.textContent = "Сохранить";
  }
}

// функция редактирования фото (аватарки)
function editAvatar(evt) {
  evt.preventDefault();
  saveButton(true, buttonFormAvatar);
  const avatar = inputEditAvatar.value;
  changeAvatar(avatar)
    .then((item) => {
      profileImage.style.backgroundImage = `url(${item.avatar})`;
      closePopup(popupTypeAvatar);
      formEditAvatar.reset();
    })
    .catch((err) => {
      console.log("Oшибка при изменении фотки аватара:", err);
    })
    .finally(() => {
      saveButton(false, buttonFormAvatar);
    });
}

formEditAvatar.addEventListener("submit", editAvatar);

// функция открытия карточки
function handleImageClick(item) {
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupCaption.textContent = item.name;
  openPopup(popupTypeImage);
}

//открытие модалки на кнопку редактировать профиль
profileEditButton.addEventListener("click", () => {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupTypeEdit);
});

// модалка для редактирования фото кликом на аватарку
profileImage.addEventListener("click", () => {
  openPopup(popupTypeAvatar);
});

//открытие модалки по кнопке добавить новую карточку
profileAddButton.addEventListener("click", () => {
  openPopup(popupTypeNewCard);
});

// закрытие модалки
closeButton.forEach((button) => {
  button.addEventListener("click", function () {
    closePopup(button.closest(".popup_is-opened"));
  });
});
