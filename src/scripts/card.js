import { deleteLikeCardApi, likeCardApi, deleteCardApi } from "./api";

const cardTemplate = document.querySelector("#card-template").content; // темплейт карточки

export function createCard(
  item,
  removeCard,
  likeCard,
  handleImageClick,
  userId
) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardDeleteButton = card.querySelector(".card__delete-button");
  const cardLikeButton = card.querySelector(".card__like-button");
  const cardLikeNumber = card.querySelector(".card__like-number");

  card.querySelector(".card__title").textContent = item.name;
  const cardId = item._id;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardLikeNumber.textContent = item.likes.length;
  const likeId = item.likes.some(function (likes) {
    return likes._id === userId;
  });
  if (likeId) {
    cardLikeButton.classList.add("card__like-button_is-active");
  } else {
    cardLikeButton.classList.remove("card__like-button_is-active");
  }

  // обработчик удаления карточки
  cardDeleteButton.addEventListener("click", () => removeCard(card, cardId));

  // обработчик открытия картинки
  cardImage.addEventListener("click", () => {
    handleImageClick(item);
  });

  // обработчик лайка
  cardLikeButton.addEventListener("click", () => {
    likeCard(cardLikeButton, cardLikeNumber, cardId);
  });
  if (item.owner._id !== userId) {
    cardDeleteButton.remove();
  }
  return card;
}

// функция поставить и убрать лайк
export function likeCard(cardLikeButton, cardLikeNumber, cardId) {
  if (cardLikeButton.classList.contains("card__like-button_is-active")) {
    deleteLikeCardApi(cardId)
      .then((res) => {
        cardLikeButton.classList.remove("card__like-button_is-active");
        cardLikeNumber.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(`Ошибка снятия лайка:`, err);
      });
  } else {
    likeCardApi(cardId)
      .then((res) => {
        cardLikeButton.classList.add("card__like-button_is-active");
        cardLikeNumber.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(`Ошибка постановки лайка:`, err);
      });
  }
}

// функция удаления карточки
export function removeCard(card, cardId) {
  deleteCardApi(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.log(`Ошибка удаления карточки:`, err);
    });
}
