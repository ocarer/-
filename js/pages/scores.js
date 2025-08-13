import { users } from '../auth.js';

export function initUserScoresPage() {
    const userScoresListContainer = document.getElementById('user-scores-list');
    const noScoresMessage = document.querySelector('.no-scores');
    const userScores = JSON.parse(localStorage.getItem('userScores')) || {};

    function displayUserScores() {
        if (userScoresListContainer) userScoresListContainer.innerHTML = '';
        const sortedScores = Object.entries(userScores)
            .map(([email, score]) => {
                const user = users.find(u => u.email === email);
                return {
                    nickname: user ? user.nickname : email.split('@')[0],
                    score: score
                };
            })
            .sort((a, b) => b.score - a.score);
        if (sortedScores.length === 0) {
            if (noScoresMessage) noScoresMessage.style.display = 'block';
        } else {
            if (noScoresMessage) noScoresMessage.style.display = 'none';
            sortedScores.forEach((user, index) => {
                const scoreCard = document.createElement('div');
                scoreCard.classList.add('score-card');
                scoreCard.innerHTML = `
                    <span class="score-rank">#${index + 1}</span>
                    <span class="score-nickname">${user.nickname}</span>
                    <span class="score-value">${user.score}점</span>
                `;
                userScoresListContainer.appendChild(scoreCard);
            });
        }
    }
    displayUserScores();
}
