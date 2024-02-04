import Cookies from "js-cookie";

const getCookie = (cookieName) => Cookies.get(cookieName);
const setCookie = (cookieName, value, options) =>
  Cookies.set(cookieName, value, options);
const removeCookie = (cookieName) => Cookies.remove(cookieName);

export { getCookie, setCookie, removeCookie };
