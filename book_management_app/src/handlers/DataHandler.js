export default class DataHandler {
  static setToSession(name, value) {
    sessionStorage.setItem(name, value);
    localStorage.setItem(name, value);
  }

  static getFromSession(name) {
    return localStorage.getItem(name);
  }

  static clearSession() {
    sessionStorage.clear();
    localStorage.clear();
  }
}
