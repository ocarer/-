import { loggedInUser } from '../auth.js';
import { BACKEND_API_URL } from '../config.js';

export async function initMyProfilePage() {
    if (!loggedInUser) {
        alert('프로필을 보려면 로그인이 필요합니다.');
        window.location.href = 'login.html';
        return;
    }

    let uploadedChallenges = [];
    try {
        uploadedChallenges = JSON.parse(localStorage.getItem('uploadedChallenges')) || [];
    } catch (e) {}

    // 프로필 정보 표시
    if (loggedInUser) {
        document.getElementById('profile-nickname').textContent = loggedInUser.nickname || '';
        document.getElementById('profile-email').textContent = loggedInUser.email || '';
    }

    // 로그아웃 버튼
    document.getElementById('logout-button').onclick = function () {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('authToken');
        alert('로그아웃 되었습니다.');
        window.location.href = 'index.html';
    };

    // 내가 업로드한 챌린지 표시
    const uploadedList = document.getElementById('uploaded-challenges-list');
    if (uploadedList) {
        uploadedList.innerHTML = '';
        const myChallenges = uploadedChallenges.filter(c => c.creator === loggedInUser.nickname);
        if (myChallenges.length === 0) {
            uploadedList.innerHTML = '<li>업로드한 챌린지가 없습니다.</li>';
        } else {
            myChallenges.forEach(challenge => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="challenge_detail.html?id=${challenge.id}">${challenge.name}</a>`;
                uploadedList.appendChild(li);
            });
        }
    }

    // 내가 제출한 기록 표시
    const recordsList = document.getElementById('submitted-records-list');
    if (recordsList) {
        recordsList.innerHTML = '<p class="loading-message">기록을 불러오는 중...</p>';
        try {
            const response = await fetch(`${BACKEND_API_URL}/api/records?submitter=${loggedInUser.nickname}`);
            const records = await response.json();
            const myRecords = records.data || [];

            if (myRecords.length === 0) {
                recordsList.innerHTML = '<li>제출한 기록이 없습니다.</li>';
            } else {
                recordsList.innerHTML = '';
                myRecords.forEach(record => {
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="challenge_detail.html?id=${record.challengeId}">${record.challengeId} 기록</a> ${record.frame ? `(${record.frame})` : ''}`;
                    recordsList.appendChild(li);
                });
            }
        } catch (error) {
            console.error('Error fetching records:', error);
            recordsList.innerHTML = '<li>기록을 불러오는 중 오류가 발생했습니다.</li>';
        }
    }
}