import { challenges, upcomingChallenges } from '../data.js';
import { difficultyMap } from '../config.js';
import { copyToClipboard } from '../ui.js';

export function initChallengeDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const challengeId = urlParams.get('id');
    const isUpcoming = urlParams.get('upcoming') === 'true';
    const challengeDetailContent = document.getElementById('challenge-detail-content');
    const detailPageTitle = document.getElementById('detail-page-title');
    let foundChallenge;
    if (isUpcoming) {
        foundChallenge = upcomingChallenges.find(c => c.id === challengeId);
    } else {
        foundChallenge = challenges.find(c => c.id === challengeId);
    }
    if (foundChallenge) {
        const difficultyInfo = difficultyMap[foundChallenge.difficulty] || { name: foundChallenge.difficulty, class: '', order: 0 };
        if (detailPageTitle) detailPageTitle.textContent = `${foundChallenge.name} - 챌린지 상세`;
        let videoHtml = '';
        if (foundChallenge.videoUrl) {
            let embedUrl = foundChallenge.videoUrl;
            if (foundChallenge.videoUrl.includes('watch?v=')) {
                embedUrl = foundChallenge.videoUrl.replace('watch?v=', 'embed/');
            }
            videoHtml = `<div class="detail-item"><h3>공식 플레이 영상</h3><div class="video-container"><iframe src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div>`;
        } else {
            videoHtml = '<div class="detail-item"><p>이 챌린지의 공식 플레이 영상은 아직 없습니다.</p></div>';
        }
        const attemptsDisplay = foundChallenge.attempts > 0 ? `<p><strong>클리어 시도 횟수:</strong> ${foundChallenge.attempts}회</p>` : '';
        const verifierDisplay = foundChallenge.verifier ? `<p><strong>베리파이어:</strong> ${foundChallenge.verifier}</p>` : '';
        const expectedRankDisplay = foundChallenge.expectedRank ? `<p><strong>예상 랭크:</strong> ${foundChallenge.expectedRank}</p>` : '';
        const challengeDetailImageUrl = foundChallenge.imageUrl || 'https://placehold.co/400x300/E0E0E0/333333?text=No+Image';
        let submitButtonHtml = '';
        if (!isUpcoming) {
             submitButtonHtml = `<a href="submit_record.html?challengeId=${foundChallenge.id}" class="button-primary" style="margin-top: 20px;">기록 제출하기</a>`;
        } else {
            submitButtonHtml = `<p style="color: var(--light-text-color); margin-top: 20px;">이 챌린지는 업커밍 상태입니다. 클리어 기록을 제출할 수 없습니다.</p>`;
        }
        if (challengeDetailContent) {
            challengeDetailContent.innerHTML = `
                <h2>${foundChallenge.name}</h2>
                <div class="detail-item">
                    <p class="difficulty-display ${difficultyInfo.class}"><strong>난이도:</strong> ${difficultyInfo.name}</p>
                    ${foundChallenge.rank ? `<p><strong>순위:</strong> #${foundChallenge.rank}</p>` : ''}
                    ${expectedRankDisplay}
                    <p><strong>설명:</strong> ${foundChallenge.description}</p>
                    <p><strong>제작자:</strong> ${foundChallenge.creator}</p>
                    ${verifierDisplay}
                    <p><strong>레벨 ID:</strong> ${foundChallenge.levelId} <button class="copy-btn button-primary" data-id="${foundChallenge.levelId}" type="button">복사</button></p>
                    ${attemptsDisplay}
                    <p><strong>조회수:</strong> ${foundChallenge.views} | <strong>완료 횟수:</strong> ${foundChallenge.completions || 0}</p>
                    <div class="challenge-main-image">
                        <img src="${challengeDetailImageUrl}" alt="${foundChallenge.name} 메인 이미지" onerror="this.onerror=null;this.src='https://placehold.co/400x300/E0E0E0/333333?text=No+Image';">
                    </div>
                    ${submitButtonHtml}
                </div>
                ${videoHtml}
                <section class="submitted-records-section">
                    <h3>클리어 기록</h3>
                    <div id="records-list-container" class="records-list"></div>
                </section>
                <a href="${isUpcoming ? 'upcoming_challenges.html' : 'challenge_list.html'}" class="go-back-link">← ${isUpcoming ? '업커밍 챌린지' : '챌린지'} 목록으로 돌아가기</a>
            `;
        }
        document.querySelector('.challenge-detail-page .copy-btn')?.addEventListener('click', (event) => {
            copyToClipboard(event.target.dataset.id, event.target);
        });
        const recordsListContainer = document.getElementById('records-list-container');
        const submittedRecords = JSON.parse(localStorage.getItem('submittedRecords')) || [];
        const relevantRecords = submittedRecords.filter(record => record.challengeId === foundChallenge.id);
        if (recordsListContainer) {
            if (relevantRecords.length > 0) {
                recordsListContainer.innerHTML = '';
                relevantRecords.forEach(record => {
                    const recordCard = document.createElement('div');
                    recordCard.classList.add('record-card');
                    if (record.isZre) recordCard.classList.add('zre-verified');
                    let zreProofHtml = '';
                    if (record.isZre) {
                        zreProofHtml = `
                            <div class="zre-proof">
                                <h4>✅ Zre 인증됨</h4>
                                ${record.zreVideoUrl && record.zreVideoUrl !== '' ? `<p><strong>인증 영상:</strong> <a href="${record.zreVideoUrl}" target="_blank">${record.zreVideoUrl}</a></p>` : ''}
                                ${record.zreImageUrl && record.zreImageUrl !== '' ? `<p><strong>인증 사진:</strong> <a href="${record.zreImageUrl}" target="_blank">사진 보기</a></p><img src="${record.zreImageUrl}" alt="Zre Proof Image" style="max-width: 100%; height: auto; border-radius: 4px; margin-top: 10px;" onerror="this.onerror=null;this.src='https://placehold.co/300x200/E0E0E0/333333?text=No+Image';">` : ''}
                            </div>
                        `;
                    }
                    recordCard.innerHTML = `
                        <div class="record-header">
                            <span class="record-submitter">${record.submitter}</span>
                            <span class="record-date">${record.date}</span>
                        </div>
                        <p class="record-comment">${record.comment}</p>
                        <p class="record-video"><a href="${record.videoUrl}" target="_blank">플레이 영상 보기</a></p>
                        ${record.recordImageUrl && record.recordImageUrl !== '' ? `<div class="record-image"><img src="${record.recordImageUrl}" alt="클리어 이미지" onerror="this.onerror=null;this.src='https://placehold.co/200x150/E0E0E0/333333?text=No+Image';"></div>` : ''}
                        ${zreProofHtml}
                    `;
                    recordsListContainer.appendChild(recordCard);
                });
            } else {
                recordsListContainer.innerHTML = '<p class="no-records-message">아직 이 챌린지에 대한 클리어 기록이 없습니다.</p>';
            }
        }
    } else {
        const loadingMessage = document.querySelector('.loading-message');
        const notFoundMessage = document.querySelector('.not-found-message');
        if (loadingMessage) loadingMessage.style.display = 'none';
        if (notFoundMessage) notFoundMessage.style.display = 'block';
        if (detailPageTitle) detailPageTitle.textContent = `챌린지 없음 - Zre Challenge List`;
    }
}
