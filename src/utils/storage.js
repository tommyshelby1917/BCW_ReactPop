const storage = {
  get(key) {
    const value = localStorage.getItem(key) || sessionStorage.getItems(key);
    if (!value) {
      return null;
    }
    return JSON.parse(value);
  },

  set(key, value, local) {
    // local
    //   ? localStorage.setItem(key, JSON.stringify(value))
    //   : sessionStorage.setItem(key, JSON.stringify(value));
    sessionStorage.setItem(key, JSON.stringify(value));
  },

  remove(key) {
    localStorage.removeItem(key);
  },
};

export default storage;
