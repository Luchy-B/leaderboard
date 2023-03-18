const inputName = document.querySelector('#name');
const inputScore = document.querySelector('#score');

const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
const endPoint = 'games/';
const id = 'Zl4d7IVkemOTTVg2f';
const scoreEndPoint = '/scores/';

const person = {
  user: String,
  score: Number,
};

const gameName = {
  name: 'bubbles',
};

export default class Request {
    static createGame = async () => {
      try {
        const response = await fetch(baseUrl + endPoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(gameName),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        return error;
      }
    }

    static createScore = async () => {
      if (inputScore.value.length !== 0 && inputName.value.length !== 0) {
        person.user = inputName.value;
        person.score = inputScore.value;
      }
      try {
        const response = await fetch(baseUrl + endPoint + id + scoreEndPoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(person),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        return error;
      }
    }

    static getScore = async () => {
      try {
        const response = await fetch(baseUrl + endPoint + id + scoreEndPoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        return data;
      } catch (error) {
        return error;
      }
    }

    static displayScores = () => {
      const scoresContent = document.querySelector('#scores-Content');
      Request.getScore().then((data) => {
        let result = '';
        const scores = data.result;
        scores.map((score) => {
          result += `
                    <li>${score.user}:${score.score}</li>
                    `;
          return result;
        });
        scoresContent.innerHTML = result;
        return result;
      });
    }

    static clear() {
      inputName.value = '';
      inputScore.value = '';
    }
}
