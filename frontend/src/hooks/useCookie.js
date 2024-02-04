import Cookies from "js-cookie";

export const useCookie = (cookieName) => {
  const getCookie = () => Cookies.get(cookieName);
  const setCookie = (value, options) => Cookies.set(cookieName, value, options);
  const removeCookie = () => Cookies.remove(cookieName);

  return { getCookie, setCookie, removeCookie };
};
