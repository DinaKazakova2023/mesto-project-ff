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
