import { difficultyMap } from './config.js';

function copyToClipboard(text, buttonElement) {
    navigator.clipboard.writeText(text).then(() => {
        if (buttonElement) {
            const originalText = buttonElement.textContent;
            buttonElement.textContent = '복사됨!';
            setTimeout(() => {
                buttonElement.textContent = originalText;
            }, 1500);
        }
    }).catch(err => {
        console.error('클립보드 복사 실패:', err);
        alert('클립보드 복사에 실패했습니다. 수동으로 복사해주세요: ' + text);
    });
}

function createChallengeCard(challenge, isUpcoming) {
    const card = document.createElement('div');
    card.classList.add('challenge-card');

    const difficultyInfo = difficultyMap[challenge.difficulty] || { name: challenge.difficulty, class: '', order: 0 };
    const attemptsInfo = challenge.attempts > 0 ? ` (${challenge.attempts} att Clear)` : '';
    const verifierInfo = challenge.verifier ? `<span class="verifier">검증: ${challenge.verifier}</span>` : '';
    const rankDisplay = challenge.rank ? `<span class="rank">#${challenge.rank}</span>` : '';
    const expectedRankDisplay = isUpcoming && challenge.expectedRank ? `<p class="expected-rank"><strong>예상 랭크:</strong> ${challenge.expectedRank}</p>` : '';

    const challengeImageUrl = challenge.imageUrl || 'https://placehold.co/200x150/E0E0E0/333333?text=No+Image';

    card.innerHTML = `
        <a href="challenge_detail.html?id=${challenge.id}${isUpcoming ? '&upcoming=true' : ''}" class="challenge-card-link">
            <div class="challenge-image-preview">
                <img src="${challengeImageUrl}" alt="${challenge.name} 이미지" onerror="this.onerror=null;this.src='https://placehold.co/200x150/E0E0E0/333333?text=No+Image';">
            </div>
            <div class="challenge-card-main-content">
                <div class="challenge-card-header">
                    ${rankDisplay}
                    <h3>${challenge.name}${attemptsInfo}</h3>
                </div>
                <p class="difficulty ${difficultyInfo.class}">${difficultyInfo.name}</p>
                ${expectedRankDisplay}
                <p class="description-preview">${challenge.description.length > 100 ? challenge.description.substring(0, 100) + '...' : challenge.description}</p>
                <div class="level-id-group">
                    <span>ID: ${challenge.levelId}</span>
                    <button class="copy-btn" data-id="${challenge.levelId}" type="button">복사</button>
                </div>
                <div class="card-footer">
                    <span class="creator">제작: ${challenge.creator}</span>
                    ${verifierInfo}
                    <span class="stats">조회수: ${challenge.views} | 완료: ${challenge.completions || 0}</span>
                </div>
            </div>
        </a>
    `;
    card.querySelector('.copy-btn')?.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();
        copyToClipboard(event.target.dataset.id, event.target);
    });
    return card;
}

export { copyToClipboard, createChallengeCard };
