const storagePrefix = 'mono_test_';

export const storage = {
  // access token
  getToken: () => {
    return window.localStorage.getItem(`${storagePrefix}token`) as string;
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, token);
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  }
};
