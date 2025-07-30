import Cookies from 'js-cookie';

export const AUTH_TOKEN = 'token';

export const getAuthToken = () => {
  return Cookies.get(AUTH_TOKEN);
};

export const setAuthToken = (token: string) => {
  Cookies.set(AUTH_TOKEN, token);
};

export const removeAuthToken = () => {
  Cookies.remove(AUTH_TOKEN);
};