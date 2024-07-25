export {
  getAddNewCard,
  getInfoUser,
  addCardServer,
  getUserDataServer,
  likeCardApi,
  deleteLikeCardApi,
  deleteCardApi,
  changeAvatar,
};

const PATH = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-18",
  headers: {
    authorization: "fdb489d0-600f-441e-bd33-26cc5e423a5c",
    "Content-Type": "application/json",
  },
};

const handleRes = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }
};

const getAddNewCard = () => {
  return fetch(`${PATH.baseUrl}/cards`, {
    headers: PATH.headers,
  }).then(handleRes);
};

const getInfoUser = () => {
  return fetch(`${PATH.baseUrl}/users/me`, {
    headers: PATH.headers,
  }).then(handleRes);
};

const addCardServer = (name, link) => {
  return fetch(`${PATH.baseUrl}/cards`, {
    method: "POST",
    headers: PATH.headers,
    body: JSON.stringify(name, link),
  }).then(handleRes);
};

const getUserDataServer = (name, about) => {
  return fetch(`${PATH.baseUrl}/users/me`, {
    method: "PATCH",
    headers: PATH.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(handleRes);
};

const changeAvatar = (avatar) => {
  return fetch(`${PATH.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: PATH.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then(handleRes);
};

const likeCardApi = (cardId) => {
  return fetch(`${PATH.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: PATH.headers,
  }).then(handleRes);
};

const deleteLikeCardApi = (cardId) => {
  return fetch(`${PATH.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: PATH.headers,
  }).then(handleRes);
};

const deleteCardApi = (cardId) => {
  return fetch(`${PATH.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: PATH.headers,
  }).then(handleRes);
};
