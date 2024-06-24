
const arkhyzImage = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg", import.meta.url);
const chelyabinskoblastImage = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg", import.meta.url);
const ivanovoImage = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg", import.meta.url);
const kamchatkaImage = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg", import.meta.url);
const kholmogorskyrayonImage = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg", import.meta.url);
const baikalImage = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg", import.meta.url)

const initialCards = [
    {
      name: "Архыз",
      link: arkhyzImage,
    },
    {
      name: "Челябинская область",
      link: chelyabinskoblastImage,
    },
    {
      name: "Иваново",
      link: ivanovoImage,
    },
    {
      name: "Камчатка",
      link: kamchatkaImage,
    },
    {
      name: "Холмогорский район",
      link: kholmogorskyrayonImage,
    },
    {
      name: "Байкал",
      link: baikalImage,
    }
];

export { arkhyzImage, chelyabinskoblastImage, ivanovoImage, kamchatkaImage, kholmogorskyrayonImage, baikalImage, initialCards };
