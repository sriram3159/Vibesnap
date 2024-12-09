import { STORAGE_UTIL_KEYWORDS } from "../../constants/keywords";

const LocalStorage = {
  isLoggedIn: () => {
    const isLoggedIn = localStorage.getItem(STORAGE_UTIL_KEYWORDS.IS_LOGGED_IN);
    return isLoggedIn === 'true';
  },
  getUserData: () => {
    return localStorage.getItem(STORAGE_UTIL_KEYWORDS.USER_DATA);
  },
  getToken: () => {
    return localStorage.getItem(STORAGE_UTIL_KEYWORDS.TOKEN);
  },

  login: responseData => {
    localStorage.setItem(STORAGE_UTIL_KEYWORDS.IS_LOGGED_IN, true);
    localStorage.setItem(STORAGE_UTIL_KEYWORDS.USER_DATA, JSON.stringify(responseData));
    localStorage.setItem(STORAGE_UTIL_KEYWORDS.TOKEN, responseData.accessToken);
  },
  logout: () => {
    localStorage.removeItem(STORAGE_UTIL_KEYWORDS.IS_LOGGED_IN);
    localStorage.removeItem(STORAGE_UTIL_KEYWORDS.USER_DATA);
    localStorage.removeItem(STORAGE_UTIL_KEYWORDS.TOKEN);
  },
};

export default LocalStorage;
