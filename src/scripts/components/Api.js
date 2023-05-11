export default class Api {
  constructor({ url, key, userUrl, cardUrl }) {
    this._generalUrl = url;
    this._userUrl = userUrl;
    this._privateKey = key;
    this._cardUrl - cardUrl;
  }

  _checkResponse(response) {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }

  async updateInfoForUser() {
    const response = await fetch(`${this._generalUrl}${this._userUrl}`, {
      headers: {
        authorization: this._privateKey
      }
    });

    const jsonAnswer = await this._checkResponse(response);
    return jsonAnswer;
  }

  // async updateCard() {
  //   const response = await fetch(this.options, {
  //     headers: {
  //       authorization: '608096ab-91fa-4cd3-8368-f20c618391fd'
  //     }
  //   });


  // }
}


