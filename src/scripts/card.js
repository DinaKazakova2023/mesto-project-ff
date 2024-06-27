const cardTemplate = document.querySelector("#card-template").content; // темплейт карточки

export function createCard(item, removeCard, likeCard, handleImageClick) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardDeleteButton = card.querySelector(".card__delete-button");
  const cardLikeButton = card.querySelector(".card__like-button");

  card.querySelector(".card__title").textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardDeleteButton.addEventListener("click", () => removeCard(card));
  cardLikeButton.addEventListener("click", likeCard);
  cardImage.addEventListener("click", () => {
    handleImageClick(item);
  });
  return card;
}

// функция удаления карточки
export function removeCard(card) {
  card.remove();
}

// функция лайка
export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
