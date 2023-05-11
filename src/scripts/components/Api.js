export default class Api {
  constructor(options) {
    this.options = options;
  }

  _checkResponse(response) {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }

  async updateInfoForUser() {
    const response = await fetch(this.options, {
      headers: {
        authorization: '608096ab-91fa-4cd3-8368-f20c618391fd'
      }
    });

    const jsonAnswer = await this._checkResponse(response);
    return jsonAnswer;
  }
}


