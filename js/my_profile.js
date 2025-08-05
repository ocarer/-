// js/my_profile.js
document.addEventListener('DOMContentLoaded', () => {
    // 로그인 정보 가져오기
    let loggedInUser;
    try {
        loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    } catch (e) {
        loggedInUser = null;
    }

    let uploadedChallenges = [];
    try {
        uploadedChallenges = JSON.parse(localStorage.getItem('uploadedChallenges')) || [];
    } catch (e) {}

    let submittedRecords = [];
    try {
        submittedRecords = JSON.parse(localStorage.getItem('submittedRecords')) || [];
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
        recordsList.innerHTML = '';
        const myRecords = submittedRecords.filter(r => r.submitter === loggedInUser.nickname);
        if (myRecords.length === 0) {
            recordsList.innerHTML = '<li>제출한 기록이 없습니다.</li>';
        } else {
            myRecords.forEach(record => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="challenge_detail.html?id=${record.challengeId}">${record.challengeId} 기록</a>`;
                recordsList.appendChild(li);
            });
        }
    }
});
