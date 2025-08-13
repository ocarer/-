import { challenges, upcomingChallenges } from '../data.js';
import { difficultyMap } from '../config.js';
import { loggedInUser } from '../auth.js';

export function initSubmitRecordPage() {
    if (!loggedInUser) {
        alert('기록을 제출하려면 로그인이 필요합니다.');
        window.location.href = 'login.html';
        return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const challengeId = urlParams.get('challengeId');
    const recordChallengeInfo = document.getElementById('record-challenge-info');
    const recordNotFoundMessage = document.getElementById('record-not-found');
    const submitRecordForm = document.getElementById('submit-record-form');
    const isZreVerifiedCheckbox = document.getElementById('is-zre-verified');
    const zreProofFields = document.getElementById('zre-proof-fields');
    let targetChallenge = challenges.find(c => c.id === challengeId);
    if (!targetChallenge) {
        targetChallenge = upcomingChallenges.find(c => c.id === challengeId);
        if (targetChallenge && targetChallenge.isUpcoming) {
            alert('업커밍 챌린지에는 기록을 제출할 수 없습니다.');
            window.location.href = 'challenge_detail.html?id=' + challengeId + '&upcoming=true';
            return;
        }
    }
    if (targetChallenge) {
        // 챌린지 정보 표시
        if (recordChallengeInfo) {
            recordChallengeInfo.innerHTML = `
                <h3>${targetChallenge.name}</h3>
                <p><strong>난이도:</strong> ${(difficultyMap[targetChallenge.difficulty]?.name) || targetChallenge.difficulty}</p>
                <p><strong>제작자:</strong> ${targetChallenge.creator}</p>
            `;
        }
        if (recordNotFoundMessage) recordNotFoundMessage.style.display = 'none';
        if (submitRecordForm) {
            // Zre 인증 체크박스에 따라 필드 노출
            if (isZreVerifiedCheckbox && zreProofFields) {
                isZreVerifiedCheckbox.addEventListener('change', () => {
                    zreProofFields.style.display = isZreVerifiedCheckbox.checked ? 'block' : 'none';
                });
            }
            submitRecordForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const videoUrl = document.getElementById('record-video-url').value.trim();
                const comment = document.getElementById('record-comment').value.trim();
                const recordImageUrl = document.getElementById('record-image-url')?.value.trim() || '';
                const isZre = isZreVerifiedCheckbox && isZreVerifiedCheckbox.checked;
                const zreVideoUrl = isZre ? document.getElementById('zre-video-url')?.value.trim() : '';
                const zreImageUrl = isZre ? document.getElementById('zre-image-url')?.value.trim() : '';

                if (!videoUrl) {
                    alert('플레이 영상 URL을 입력해주세요.');
                    return;
                }
                // 날짜 포맷: YYYY-MM-DD HH:mm
                const now = new Date();
                const dateStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

                const newRecord = {
                    challengeId: targetChallenge.id,
                    submitter: loggedInUser.nickname,
                    videoUrl,
                    comment,
                    recordImageUrl,
                    isZre,
                    zreVideoUrl,
                    zreImageUrl,
                    date: dateStr
                };
                fetch('https://backend-w61z.onrender.com/api/records', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
        // 로그인한 경우, 토큰이 있으면 Authorization 헤더 추가(선택)
                        ...(localStorage.getItem('authToken') ? { Authorization: 'Bearer ' + localStorage.getItem('authToken') } : {})
                    },
                    body: JSON.stringify(newRecord)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            alert('기록이 성공적으로 제출되었습니다!');
                            window.location.href = `challenge_detail.html?id=${targetChallenge.id}`;
                        } else {
                            alert('기록 제출 중 오류: ' + (data.message || '알 수 없는 오류'));
                        }
                    })
                    .catch(err => {
                        alert('서버 통신 오류: ' + err);
                    });
            });
        }
    } else {
        if (recordChallengeInfo) recordChallengeInfo.innerHTML = '';
        if (recordNotFoundMessage) recordNotFoundMessage.style.display = 'block';
        if (submitRecordForm) submitRecordForm.style.display = 'none';
    }
}
