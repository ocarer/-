import { challenges, upcomingChallenges } from '../data.js';

export function initCreatorPage() {
    const creatorListContainer = document.getElementById('creator-list');
    const uploadedChallenges = JSON.parse(localStorage.getItem('uploadedChallenges')) || [];
    // 챌린지 데이터에서 제작자 이름을 자동 추출
    const allCreatorNames = [
        ...new Set(challenges.map(c => c.creator)
            .concat((uploadedChallenges || []).map(c => c.creator))
                  )
    ].filter(Boolean).sort();

    function displayCreators() {
        if (creatorListContainer) creatorListContainer.innerHTML = '';
        allCreatorNames.forEach(creatorName => {
            const creatorCard = document.createElement('div');
            creatorCard.classList.add('creator-card');
            const creatorChallenges = challenges.filter(c => c.creator === creatorName);
            const creatorUploadedChallenges = (uploadedChallenges || []).filter(c => c.creator === creatorName);
            creatorCard.innerHTML = `
                <h3>${creatorName}</h3>
                <div class="creator-challenges">
                    <h4>제작한 챌린지 (${creatorChallenges.length + creatorUploadedChallenges.length}개)</h4>
                    <ul>
                        ${creatorChallenges.map(c => `<li><a href="challenge_detail.html?id=${c.id}">${c.name} (#${c.rank})</a></li>`).join('')}
                        ${creatorUploadedChallenges.map(c => `<li><a href="challenge_detail.html?id=${c.id}">${c.name} (업로드)</a></li>`).join('')}
                    </ul>
                </div>
            `;
            creatorListContainer.appendChild(creatorCard);
        });
        if (allCreatorNames.length === 0 && creatorListContainer) {
            creatorListContainer.innerHTML = '<p class="no-results">등록된 크리에이터가 없습니다.</p>';
        }
    }
    displayCreators();
}
