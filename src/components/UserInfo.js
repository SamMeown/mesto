export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent
    }
  }

  setUserInfo(info) {
    this._nameElement.textContent = info.name;
    this._aboutElement.textContent = info.about;
  }

  setAvatar(link) {
    this._avatarElement.src = link;
  }
}
