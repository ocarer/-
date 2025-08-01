document.addEventListener('DOMContentLoaded', () => {
    // 백엔드 API의 기본 URL을 정의합니다.
    const BACKEND_API_URL = 'https://backend-w61z.onrender.com';

    // 챌린지 랭크 기준 상수
    const MAX_RANK_MAIN_LIST = 9;
    const MAX_RANK_EXTENDED_LIST_UPPER_BOUND = 19;

    let allChallenges = []; // 백엔드에서 가져온 모든 챌린지 데이터를 저장할 배열
    let upcomingChallenges = []; // 백엔드에서 가져온 모든 업커밍 챌린지 데이터를 저장할 배열
    let users = []; // 백엔드에서 가져온 유저 데이터를 저장할 배열
    let userRecords = []; // 백엔드에서 가져온 유저 기록 데이터를 저장할 배열

    const challengeListContainer = document.getElementById('challenge-list');
    const extendedChallengeListContainer = document.getElementById('extended-challenge-list');
    const legacyChallengeListContainer = document.getElementById('legacy-challenge-list');
    const upcomingChallengeListContainer = document.getElementById('upcoming-challenge-list');
    const userScoresListContainer = document.getElementById('user-scores-list');

    // API로부터 챌린지 데이터를 가져오는 비동기 함수
    async function fetchChallenges() {
        try {
            // 로딩 메시지 표시
            if (challengeListContainer) challengeListContainer.innerHTML = '<p class="loading-message">챌린지를 불러오는 중...</p>';
            if (extendedChallengeListContainer) extendedChallengeListContainer.innerHTML = '<p class="loading-message">챌린지를 불러오는 중...</p>';
            if (legacyChallengeListContainer) legacyChallengeListContainer.innerHTML = '<p class="loading-message">챌린지를 불러오는 중...</p>';
            if (upcomingChallengeListContainer) upcomingChallengeListContainer.innerHTML = '<p class="loading-message">업커밍 챌린지를 불러오는 중...</p>';

            const response = await fetch(`${BACKEND_API_URL}/challenges`);
            if (!response.ok) {
                throw new Error('네트워크 응답이 올바르지 않습니다.');
            }
            const data = await response.json();
            
            // 데이터 분류 및 저장
            allChallenges = data.filter(c => !c.isUpcoming);
            upcomingChallenges = data.filter(c => c.isUpcoming);

            // 데이터가 성공적으로 로드되면 각 페이지에 챌린지 목록 표시
            displayMainChallenges(allChallenges);
            displayExtendedChallenges(allChallenges);
            displayLegacyChallenges(allChallenges);
            displayUpcomingChallenges(upcomingChallenges);

        } catch (error) {
            console.error('챌린지 데이터를 가져오는 중 오류 발생:', error);
            const errorMessage = '<p class="error-message">챌린지를 불러오는 데 실패했습니다. 다시 시도해 주세요.</p>';
            if (challengeListContainer) challengeListContainer.innerHTML = errorMessage;
            if (extendedChallengeListContainer) extendedChallengeListContainer.innerHTML = errorMessage;
            if (legacyChallengeListContainer) legacyChallengeListContainer.innerHTML = errorMessage;
            if (upcomingChallengeListContainer) upcomingChallengeListContainer.innerHTML = errorMessage;
        }
    }

    // 메인 챌린지 목록을 렌더링하는 함수 (1위 ~ 10위)
    function displayMainChallenges(challenges) {
        if (!challengeListContainer) return;

        const mainList = challenges.filter(c => c.rank <= MAX_RANK_MAIN_LIST);

        if (mainList.length === 0) {
            challengeListContainer.innerHTML = '<p>아직 등록된 챌린지가 없습니다.</p>';
            return;
        }

        challengeListContainer.innerHTML = '';
        mainList.forEach(challenge => {
            const challengeCard = document.createElement('div');
            challengeCard.classList.add('challenge-card');
            challengeCard.innerHTML = `
                <div class="card-rank">#${challenge.rank}</div>
                <h3 class="card-title">${challenge.name}</h3>
                <p class="card-difficulty">난이도: <span class="${challenge.difficulty}">${getDifficultyText(challenge.difficulty)}</span></p>
                <p class="card-description">${challenge.description}</p>
                <div class="card-meta">
                    <span>크리에이터: ${challenge.creator}</span>
                    <span>뷰: ${challenge.views}</span>
                    <span>클리어: ${challenge.completions}</span>
                </div>
                <button class="card-button" onclick="window.location.href='challenge_detail.html?id=${challenge.id}'">자세히 보기</button>
            `;
            challengeListContainer.appendChild(challengeCard);
        });
    }

    // Extended 챌린지 목록을 렌더링하는 함수 (10위 초과 ~ 20위)
    function displayExtendedChallenges(challenges) {
        if (!extendedChallengeListContainer) return;

        const extendedList = challenges.filter(c => c.rank > MAX_RANK_MAIN_LIST && c.rank <= MAX_RANK_EXTENDED_LIST_UPPER_BOUND);

        if (extendedList.length === 0) {
            extendedChallengeListContainer.innerHTML = '<p>아직 등록된 Extended 챌린지가 없습니다.</p>';
            return;
        }

        extendedChallengeListContainer.innerHTML = '';
        extendedList.forEach(challenge => {
            const challengeCard = document.createElement('div');
            challengeCard.classList.add('challenge-card');
            challengeCard.innerHTML = `
                <div class="card-rank">#${challenge.rank}</div>
                <h3 class="card-title">${challenge.name}</h3>
                <p class="card-difficulty">난이도: <span class="${challenge.difficulty}">${getDifficultyText(challenge.difficulty)}</span></p>
                <div class="card-meta">
                    <span>크리에이터: ${challenge.creator}</span>
                    <span>클리어: ${challenge.completions}</span>
                </div>
                <button class="card-button" onclick="window.location.href='challenge_detail.html?id=${challenge.id}'">자세히 보기</button>
            `;
            extendedChallengeListContainer.appendChild(challengeCard);
        });
    }

    // Legacy 챌린지 목록을 렌더링하는 함수 (20위 초과)
    function displayLegacyChallenges(challenges) {
        if (!legacyChallengeListContainer) return;

        const legacyList = challenges.filter(c => c.rank > MAX_RANK_EXTENDED_LIST_UPPER_BOUND);

        if (legacyList.length === 0) {
            legacyChallengeListContainer.innerHTML = '<p>아직 등록된 Legacy 챌린지가 없습니다.</p>';
            return;
        }

        legacyChallengeListContainer.innerHTML = '';
        legacyList.forEach(challenge => {
            const challengeCard = document.createElement('div');
            challengeCard.classList.add('challenge-card');
            challengeCard.innerHTML = `
                <div class="card-rank">#${challenge.rank}</div>
                <h3 class="card-title">${challenge.name}</h3>
                <p class="card-difficulty">난이도: <span class="${challenge.difficulty}">${getDifficultyText(challenge.difficulty)}</span></p>
                <div class="card-meta">
                    <span>크리에이터: ${challenge.creator}</span>
                    <span>클리어: ${challenge.completions}</span>
                </div>
                <button class="card-button" onclick="window.location.href='challenge_detail.html?id=${challenge.id}'">자세히 보기</button>
            `;
            legacyChallengeListContainer.appendChild(challengeCard);
        });
    }

    // 업커밍 챌린지 목록을 렌더링하는 함수
    function displayUpcomingChallenges(challenges) {
        if (!upcomingChallengeListContainer) return;

        if (challenges.length === 0) {
            upcomingChallengeListContainer.innerHTML = '<p>아직 등록된 업커밍 챌린지가 없습니다.</p>';
            return;
        }

        upcomingChallengeListContainer.innerHTML = '';
        challenges.forEach(challenge => {
            const challengeCard = document.createElement('div');
            challengeCard.classList.add('challenge-card');
            challengeCard.innerHTML = `
                <div class="card-rank">#${challenge.rank}</div>
                <h3 class="card-title">${challenge.name}</h3>
                <p class="card-description">${challenge.description}</p>
                <div class="card-meta">
                    <span>크리에이터: ${challenge.creator}</span>
                </div>
            `;
            upcomingChallengeListContainer.appendChild(challengeCard);
        });
    }

    // 난이도 텍스트를 반환하는 헬퍼 함수
    function getDifficultyText(difficulty) {
        switch (difficulty) {
            case 'easy_demon': return 'Easy Demon';
            case 'medium_demon': return 'Medium Demon';
            case 'hard_demon': return 'Hard Demon';
            case 'insane_demon': return 'Insane Demon';
            case 'extreme_demon': return 'Extreme Demon';
            default: return '미정';
        }
    }

    // 랭킹 순위표를 렌더링하는 함수
    function displayUserScores() {
        const noScoresMessage = document.querySelector('.no-scores');
        
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
            return;
        } else {
            if (noScoresMessage) noResultsMessage.style.display = 'none';
        }

        sortedScores.forEach((user, index) => {
            const scoreCard = document.createElement('div');
            scoreCard.classList.add('score-card');
            scoreCard.innerHTML = `
                <span class=\"score-rank\">#${index + 1}</span>
                <span class=\"score-nickname\">${user.nickname}</span>
                <span class=\"score-value\">${user.score}점</span>
            `;
            userScoresListContainer.appendChild(scoreCard);
        });
    }

    // 초기 데이터 로드 시작
    fetchChallenges();
});
