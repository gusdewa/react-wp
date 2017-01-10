window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: function () {},
    removeListener: function () {}
  };
};

let localStorageStore = {};
window.localStorage = window.localStorage || {
  getItem: (key) => localStorageStore[key],
  setItem: (key, value) => { localStorageStore[key] = value; },
  removeItem: (key) => { delete localStorageStore[key]; },
  clear: () => { localStorageStore = {}; },
};

let cookieStore = {};
document.cookie = document.cookie || {
  getItem: (key) => cookieStore[key],
  setItem: (key, value) => { cookieStore[key] = value; },
  removeItem: (key) => { delete cookieStore[key]; },
  hasItem: (key) => key in cookieStore,
  keys: () => Object.keys(cookieStore),
};

document.location.replace = document.location.replace || function () {};
