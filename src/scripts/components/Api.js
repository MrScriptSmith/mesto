export default class Api {
  constructor({ url, key, userUrl, cardUrl }) {
    this._generalUrl = url;
    this._userUrl = userUrl;
    this._privateKey = key;
    this._cardUrl = cardUrl;
  }

  _checkResponse(response) {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }

  async pullProfileInfo() {
    const response = await fetch(`${this._generalUrl}${this._userUrl}`, {
      headers: {
        authorization: this._privateKey
      }
    });

    const jsonAnswer = await this._checkResponse(response);
    return jsonAnswer;
  }

  async pullCardInfo() {
    const response = await fetch(`${this._generalUrl}${this._cardUrl}`, {
      headers: {
        authorization: this._privateKey
      }
    });

    const jsonAnswer = await this._checkResponse(response);
    return jsonAnswer;
  }

  async patchProfileInfo(data) {
    const response = await fetch(`${this._generalUrl}${this._userUrl}`, {
      method: 'PATCH',
      headers: {
        authorization: this._privateKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.username,
        about: data.useractivity
      })
    });

    const jsonAnswer = await this._checkResponse(response);
    return jsonAnswer;
  }

  async pushCardInfo(data) {
    const response = await fetch(`${this._generalUrl}${this._cardUrl}`, {
      method: 'POST',
      headers: {
        authorization: this._privateKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });

    const jsonAnswer = await this._checkResponse(response);
    return jsonAnswer;
  }
}


