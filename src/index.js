import './styles.css';
import Request from './api.js';

const refreshBtn = document.querySelector('#refresh-Btn');
const leaderboardForm = document.querySelector('#form');

document.addEventListener('DOMContentLoaded', () => {
  Request.displayScores();
});

leaderboardForm.addEventListener('submit', (e) => {
  e.preventDefault();
  Request.createScore();
  Request.clear();
});
refreshBtn.addEventListener('click', () => {
  Request.displayScores();
});