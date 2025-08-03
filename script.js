document.addEventListener('DOMContentLoaded', () => {
    // 백엔드 API의 기본 URL을 정의합니다.
    // Render에 배포된 백엔드 서비스의 실제 URL로 변경해야 합니다.
    const BACKEND_API_URL = 'https://backend-w61z.onrender.com'; // <-- 이 부분을 Render에서 발급받은 실제 URL로 변경하세요!

    // 챌린지 랭크 기준 상수
    // 챌린지 목록 (challenge_list.html)에 표시될 최대 랭크
    const MAX_RANK_MAIN_LIST = 9;
    // Extended List (extended_list.html)에 표시될 최대 랭크 (이 랭크를 초과하는 챌린지는 Legacy List로)
    const MAX_RANK_EXTENDED_LIST_UPPER_BOUND = 19;

    // 챌린지 데이터 (업커밍 챌린지 분리)
    // 요청하신 새로운 랭킹 순서와 챌린지 정보로 재구성
    const challenges = [
        {
            id: '1', rank: 1,
            name: 'The Hell Challenge',
            difficulty: 'extreme_demon',
            description: '비대칭 듀얼, 좁은 간격의 웨이브, 일자비행, 삼단가시가 맵에 도배되어있는 극악무도한 맵입니다.',
            creator: 'ZreGD',
            verifier: 'GDVerifierPro',
            levelId: '123150415',
            views: 4500,
            completions: 3
        },
        {
            id: '2', rank: 2,
            name: 'Chaos Ship',
            difficulty: 'extreme_demon',
            description: '조금만 틀어져도 죽는 매우 좁은 간격의 비행 챌린지입니다.',
            creator: 'ZreGD',
            verifier: 'GDVerifierPro',
            levelId: '123189789',
            views: 3800,
            completions: 6
        },
        {
            id: '3', rank: 3,
            name: 'ReLief 2',
            difficulty: 'extreme_demon',
            description: '잦은 변속과 모드전환이 특징인 맵입니다. 몇 안되는 고퀄맵이기도 합니다.',
            creator: 'ZreGD',
            verifier: 'GDVerifierPro',
            levelId: '100556994',
            views: 5100,
            completions: 4
        },
        {
            id: '4', rank: 4,
            name: 'Rebition 2',
            difficulty: 'insane_demon',
            description: '유명 익스트림 데몬 The Golden 의 노래를 사용한 웨이브 챌린지 맵입니다.',
            creator: 'ZreGD',
            verifier: 'GDVerifierPro',
            levelId: '72591414',
            views: 2500,
            completions: 15
        },
        {
            id: '5', rank: 5,
            name: 'Gonna Go',
            difficulty: 'insane_demon',
            description: '즈레 챌린지 리스트의 난이도가 급격하게 오르게 만든 맵입니다. 극칼타로 이루어진 맵이며 프퍼펙이 있는 것이 특징입니다.',
            creator: 'ZreGD',
            verifier: 'GDVerifierPro',
            levelId: '122035043',
            views: 1800,
            completions: 11
        },
        {
            id: '6', rank: 6,
            name: 'NEVADA',
            difficulty: 'insane_demon',
            description: '싱크 기반의 챌린지입니다. 마지막에 투명 상태로 좁은 간격을 지나가야하는 악독한 소고기 유도가 있는 것이 특징입니다.',
            creator: 'ZreGD',
            verifier: 'GDVerifierPro',
            levelId: '123872401',
            views: 1200,
            completions: 22
        },
        {
            id: '7', rank: 7,
            name: 'True Sink',
            difficulty: 'hard_demon',
            description: '싱크 기반의 챌린지입니다. 마지막에 공점 칼타로 1칸 간격을 지나야 하는 것이 특징입니다.',
            creator: 'ZreGD',
            verifier: 'GDVerifierPro',
            levelId: '123362423',
            views: 900,
            completions: 35
        },
        {
            id: '8', rank: 8,
            name: 'AAAAAAAAAAAAAAAAAAAA',
            difficulty: 'hard_demon',
            description: '좁은 간격과 칼타, 타이밍을 잡기 어려운 비행기가 특징인 맵입니다.',
            creator: 'ZreGD',
            verifier: 'GDVerifierPro',
            levelId: '122654332',
            views: 850,
            completions: 45
        },
        {
            id: '9', rank: 9,
            name: 'Persephone',
            difficulty: 'hard_demon',
            description: '극칼타로 이루어진 챌린지입니다. 현재는 업데이트 버전의 등장으로 플레이 할 수 없습니다.',
            creator: 'ZreGD',
            verifier: 'GDVerifierPro',
            levelId: '123358917',
            views: 700,
            completions: 50
        },
        // Extended List에 포함될 챌린지 (10위부터 19위까지)
                {
            id: '10', rank: 10,
            name: 'Speeeeeeeeeeeeeeed',
            difficulty: 'medium_demon',
            description: '극칼타로 이루어진 챌린지입니다. 마지막 삼단가시로 소고기 유도가 있습니다.',
            creator: 'ZreGD',
            verifier: 'GDVerifierPro',
            levelId: '123073199',
            views: 650,
            completions: 70
        },
        {
            id: '11', rank: 11,
            name: 'Rusttttt',
            difficulty: 'medium_demon',
            description: '약 5초의 매우 짧은 웨이브 챌린지입니다. 짧은 길이를 좁은 간격으로 보완한 챌린지입니다.',
            creator: 'ZreGD',
            verifier: 'GDVerifierPro',
            levelId: '123417172',
            views: 550,
            completions: 85
        },
        {
            id: '12', rank: 12,
            name: 'Buzori',
            difficulty: 'easy_demon',
            description: '대시링을 이용하여 극칼타를 만들어낸 챌린지입니다.',
            creator: 'ZreGD',
            verifier: 'GDVerifierPro',
            levelId: '114207036',
            views: 400,
            completions: 110
        },
        {
            id: '13', rank: 13,
            name: 'invincible wave',
            difficulty: 'easy_demon',
            description: '싱크에 맞춰 가감속을 배치해 일명 "꾹꾹이 겜플"을 만들어낸 맵입니다.',
            creator: 'ZreGD',
            verifier: 'GDVerifierPro',
            levelId: '117950820',
            views: 350,
            completions: 130
        },
        {
            id: '14', rank: 14,
            name: 'Epilogue',
            difficulty: 'easy_demon',
            description: '싱크 기반의 칼타 챌린지입니다.',
            creator: 'ZreGD',
            verifier: 'GDVerifierPro',
            levelId: '123780214',
            views: 300,
            completions: 150
        },
        {
            id: '15', rank: 15,
            name: 'Yescubed',
            difficulty: 'easy_demon',
            description: '싱크 기반의 웨이브 챌린지입니다.',
            creator: 'ZreGD',
            verifier: 'GDVerifierPro',
            levelId: '115388205',
            views: 280,
            completions: 165
        },
        {
            id: '16', rank: 16,
            name: 'Extreme jump',
            difficulty: 'easy_demon',
            description: '저속 큐브 칼타 챌린지입니다. 후반에 급발진 4배속 웨이브가 있는 것이 특징입니다.',
            creator: 'ZreGD',
            verifier: 'GDVerifierPro',
            levelId: '111094992',
            views: 250,
            completions: 180
        },
        {
            id: '17', rank: 17,
            name: 'JK Chall Rm',
            difficulty: 'easy_demon',
            description: '웨이브 챌린지입니다. 마지막에 D블럭을 이용한 버그성 겜플이 있는 것이 특징입니다.',
            creator: 'ZreGD',
            verifier: 'GDVerifierPro',
            levelId: '117995228',
            views: 220,
            completions: 195
        }
    ].sort((a, b) => a.rank - b.rank); // 랭크 기준으로 정렬

    const difficultyMap = {
        'easy': { name: 'Easy', class: 'difficulty-easy', order: 1 },
        'normal': { name: 'Normal', class: 'difficulty-normal', order: 2 },
        'hard': { name: 'Hard', class: 'difficulty-hard', order: 3 },
        'insane': { name: 'Insane', class: 'difficulty-insane', order: 4 },
        'easy_demon': { name: 'Easy Demon', class: 'difficulty-easy_demon', order: 5 },
        'medium_demon': { name: 'Medium Demon', class: 'difficulty-medium_demon', order: 6 },
        'hard_demon': { name: 'Hard Demon', class: 'difficulty-hard_demon', order: 7 },
        'insane_demon': { name: 'Insane Demon', class: 'difficulty-insane_demon', order: 8 },
        'extreme_demon': { name: 'Extreme Demon', class: 'difficulty-extreme_demon', order: 9 }
    };

    const currentPage = window.location.pathname.split('/').pop();
    const urlParams = new URLSearchParams(window.location.search);

    // --- 가상의 사용자 데이터 및 세션 관리 (로컬 스토리지) ---
    // 사용자 정보를 localStorage에서 가져옵니다.
    let loggedInUser;
    try {
        loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    } catch (e) {
        console.error("Error parsing loggedInUser from localStorage:", e);
        loggedInUser = null;
    }

    let users;
    try {
        users = JSON.parse(localStorage.getItem('users'));
    } catch (e) {
        console.error("Error parsing users from localStorage:", e);
        users = [];
    }
    if (!users) users = []; // Fallback if parsing results in null

    // 사용자 스코어 관리 (새로 추가)
    // { "user_email": score } 형태로 저장
    let userScores;
    try {
        userScores = JSON.parse(localStorage.getItem('userScores'));
    } catch (e) {
        console.error("Error parsing userScores from localStorage:", e);
        userScores = {};
    }
    if (!userScores) userScores = {}; // Fallback if parsing results in null

    // 임시 제출 기록 (모든 챌린지 클리어 기록, 사진 포함)
    // 실제 백엔드 연동 시 이 데이터는 백엔드에서 가져와야 합니다.
    let submittedRecords;
    try {
        submittedRecords = JSON.parse(localStorage.getItem('submittedRecords'));
    } catch (e) {
        console.error("Error parsing submittedRecords from localStorage:", e);
        submittedRecords = [];
    }
    if (!submittedRecords) submittedRecords = []; // Fallback if parsing results in null

    // 임시 업로드 챌린지 데이터
    // 실제 백엔드 연동 시 이 데이터는 백엔드에서 가져와야 합니다.
    let uploadedChallenges;
    try {
        uploadedChallenges = JSON.parse(localStorage.getItem('uploadedChallenges'));
    } catch (e) {
        console.error("Error parsing uploadedChallenges from localStorage:", e);
        uploadedChallenges = [];
    }
    if (!uploadedChallenges) uploadedChallenges = []; // Fallback if parsing results in null


    // 크리에이터 목록을 직접 정의 (요청에 따라 추가)
    const creators = [
        'ChallengingCreator',
        'PlayerX',
        'ShipMaster',
        'Unknown', // Rebition 2 제작자
        'PlayerY',
        'GDMaster',
        'NewCreator', // Rusttttt 제작자
        'RhythmMaster', // Buzori 제작자
        'GDFunny', // AAAAAAAAAAA 제작자
        '레즈', // Persephone 제작자
        'WavePlayer', // Wave Hold 제작자
        'ShipLover', // Ship Challenge 10000 제작자
        'WaveGod', // Invincible Wave 제작자
        'SpeedDemon', // Speeeeeeeeeeeeeed 제작자
        'Test', // Test Challenge Ten, Eleven 제작자
        'OldSchool', // Test Legacy One, Two 제작자
        'TestUser' // 업로드 챌린지 제작자
    ].sort(); // 알파벳 순으로 정렬


    // --- Helper Functions ---
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

    // 챌린지 랭크에 따른 점수 계산 함수
    function getScoreByRank(rank) {
        if (rank === 1) return 100;
        if (rank >= 2 && rank <= 3) return 70;
        if (rank >= 4 && rank <= 6) return 40;
        if (rank >= 7 && rank <= 10) return 20;
        if (rank > 10) return 10; // 10위 초과는 모두 10점
        return 0; // 랭크가 없거나 유효하지 않은 경우
    }

    // createChallengeCard 함수를 전역 스코프로 이동 (모든 페이지에서 사용 가능하도록)
    function createChallengeCard(challenge, isUpcoming) {
        const card = document.createElement('div');
        card.classList.add('challenge-card');

        const difficultyInfo = difficultyMap[challenge.difficulty] || { name: challenge.difficulty, class: '', order: 0 };
        const attemptsInfo = challenge.attempts > 0 ? ` (${challenge.attempts} att Clear)` : '';
        const verifierInfo = challenge.verifier ? `<span class="verifier">검증: ${challenge.verifier}</span>` : '';
        const rankDisplay = challenge.rank ? `<span class="rank">#${challenge.rank}</span>` : '';
        const expectedRankDisplay = isUpcoming && challenge.expectedRank ? `<p class="expected-rank"><strong>예상 랭크:</strong> ${challenge.expectedRank}</p>` : '';

        // challenge.imageUrl을 사용하여 이미지 표시
        const challengeImageUrl = challenge.imageUrl || 'https://placehold.co/200x150/E0E0E0/333333?text=No+Image'; // 기본 이미지

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

    // --- 내비게이션 바 업데이트 ---
    function updateAuthNavItem() {
        console.log('updateAuthNavItem 함수 호출됨. 현재 loggedInUser:', loggedInUser); // 디버깅 로그
        const navMyProfileLink = document.getElementById('nav-my-profile-link');
        const navLoginLink = document.getElementById('nav-login-link'); // 변경
        const navSignupLink = document.getElementById('nav-signup-link'); // 추가
        const navLogoutButton = document.getElementById('nav-logout-button');
        const navExtendedListLink = document.getElementById('nav-extended-list-link');
        const navLegacyListLink = document.getElementById('nav-legacy-list-link');
        const navCreatorPageLink = document.getElementById('nav-creator-page-link');
        const navUserScoresLink = document.getElementById('nav-user-scores-link');

        if (loggedInUser) { // 로그인 여부만 확인
            if (navMyProfileLink) {
                navMyProfileLink.textContent = `내 프로필 (${loggedInUser.nickname})`;
                navMyProfileLink.style.display = 'inline-block';
            }
            if (navLoginLink) { // 변경
                navLoginLink.style.display = 'none';
            }
            if (navSignupLink) { // 추가
                navSignupLink.style.display = 'none';
            }
            if (navLogoutButton) {
                navLogoutButton.style.display = 'inline-block';
                navLogoutButton.onclick = () => {
                    loggedInUser = null;
                    localStorage.removeItem('loggedInUser');
                    localStorage.removeItem('authToken'); // 토큰도 제거
                    alert('로그아웃 되었습니다.');
                    window.location.href = 'index.html';
                };
            }
        } else {
            if (navMyProfileLink) {
                navMyProfileLink.style.display = 'none';
            }
            if (navLoginLink) { // 변경
                navLoginLink.style.display = 'inline-block';
                navLoginLink.textContent = '로그인';
            }
            if (navSignupLink) { // 추가
                navSignupLink.style.display = 'inline-block';
                navSignupLink.textContent = '회원가입';
            }
            if (navLogoutButton) {
                navLogoutButton.style.display = 'none';
            }
        }
        if (navExtendedListLink) navExtendedListLink.style.display = 'inline-block';
        if (navLegacyListLink) navLegacyListLink.style.display = 'inline-block';
        if (navCreatorPageLink) navCreatorPageLink.style.display = 'inline-block';
        if (navUserScoresLink) navUserScoresLink.style.display = 'inline-block';
    }
    updateAuthNavItem(); // 페이지 로드 시 내비게이션 바 업데이트

    // --- 페이지별 로직 ---

    // --- 메인 페이지 로직 (`index.html`) ---
    if (currentPage === 'index.html' || currentPage === '') {
        const topChallengesContainer = document.getElementById('top-challenges-container');
        const upcomingChallengesContainer = document.getElementById('upcoming-challenges-container');

        if (topChallengesContainer) {
            topChallengesContainer.innerHTML = '';
            challenges.filter(c => c.rank <= 5).forEach(challenge => { // TOP 5만 표시
                const card = createChallengeCard(challenge, false);
                topChallengesContainer.appendChild(card);
            });
        }

        if (upcomingChallengesContainer) {
            upcomingChallengesContainer.innerHTML = '';
            const latestUpcoming = [...upcomingChallenges].sort((a,b) => parseInt(b.id.replace('UPCOM', '')) - parseInt(a.id.replace('UPCOM', ''))).slice(0, 3);

            latestUpcoming.forEach(challenge => {
                const card = createChallengeCard(challenge, true);
                upcomingChallengesContainer.appendChild(card);
            });
        }
    }

    // --- 챌린지 리스트 페이지 로직 (`challenge_list.html`) ---
    if (currentPage === 'challenge_list.html') {
        console.log('--- challenge_list.html 페이지 로직 시작 ---'); // Debugging log
        const challengeListContainer = document.getElementById('challenge-list');
        const searchInput = document.getElementById('search-input');
        const difficultyFilter = document.getElementById('difficulty-filter');
        const sortOrder = document.getElementById('sort-order');
        const noResultsMessage = document.querySelector('.no-results');

        function displayChallenges(filteredChallenges) {
            console.log('displayChallenges 함수 호출됨. 필터링된 챌린지 수:', filteredChallenges.length); // Debugging log
            challengeListContainer.innerHTML = '';
            if (filteredChallenges.length === 0) {
                noResultsMessage.style.display = 'block';
                return;
            } else {
                noResultsMessage.style.display = 'none';
            }

            filteredChallenges.forEach(challenge => {
                const card = createChallengeCard(challenge, false);
                challengeListContainer.appendChild(card);
            });

            document.querySelectorAll('.copy-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    copyToClipboard(event.target.dataset.id, event.target);
                });
            });
        }

        function filterAndSortChallenges() {
            console.log('filterAndSortChallenges 함수 호출됨.'); // Debugging log
            // challenge_list.html에서는 1위부터 MAX_RANK_MAIN_LIST (9위)까지의 챌린지만 보여줍니다.
            let currentChallenges = challenges.filter(c => c.rank <= MAX_RANK_MAIN_LIST);
            console.log('초기 challenges 배열:', challenges); // Debugging log
            console.log('MAX_RANK_MAIN_LIST:', MAX_RANK_MAIN_LIST); // Debugging log
            console.log('랭크 필터링 후 currentChallenges (main list):', currentChallenges); // Debugging log

            const searchTerm = searchInput.value.toLowerCase();
            const selectedDifficulty = difficultyFilter.value;
            const selectedSortOrder = sortOrder.value;

            console.log('검색어:', searchTerm); // Debugging log
            console.log('선택된 난이도:', selectedDifficulty); // Debugging log
            console.log('선택된 정렬 순서:', selectedSortOrder); // Debugging log


            if (searchTerm) {
                currentChallenges = currentChallenges.filter(challenge =>
                    challenge.name.toLowerCase().includes(searchTerm) ||
                    challenge.levelId.includes(searchTerm) ||
                    (challenge.verifier && challenge.verifier.toLowerCase().includes(searchTerm))
                );
                console.log('검색어 필터링 후 currentChallenges:', currentChallenges); // Debugging log
            }

            if (selectedDifficulty !== 'all') {
                currentChallenges = currentChallenges.filter(challenge =>
                    challenge.difficulty === selectedDifficulty
                );
                console.log('난이도 필터링 후 currentChallenges:', currentChallenges); // Debugging log
            }

            currentChallenges.sort((a, b) => {
                if (selectedSortOrder === 'rank') {
                    return a.rank - b.rank;
                } else if (selectedSortOrder === 'latest') {
                    return parseInt(b.id) - parseInt(a.id);
                } else if (selectedSortOrder === 'difficulty_asc') {
                    return (difficultyMap[a.difficulty]?.order || 0) - (difficultyMap[b.difficulty]?.order || 0);
                } else if (selectedSortOrder === 'difficulty_desc') {
                    return (difficultyMap[b.difficulty]?.order || 0) - (difficultyMap[a.difficulty]?.order || 0);
                } else if (selectedSortOrder === 'popular') {
                    return (b.views + b.completions) - (a.views + a.completions);
                }
                return 0;
            });
            console.log('최종 필터링 및 정렬 후 currentChallenges:', currentChallenges); // Debugging log

            displayChallenges(currentChallenges);
        }

        searchInput.addEventListener('input', filterAndSortChallenges);
        difficultyFilter.addEventListener('change', filterAndSortChallenges);
        sortOrder.addEventListener('change', filterAndSortChallenges);

        filterAndSortChallenges();

    } else if (currentPage === 'upcoming_challenges.html') {
        console.log('--- upcoming_challenges.html 페이지 로직 시작 ---'); // 디버깅 로그
        const upcomingListContainer = document.getElementById('upcoming-challenge-list');
        const noResultsMessage = document.querySelector('.no-results');
        const loadingMessage = document.querySelector('.loading-message');

        function displayUpcomingChallenges() {
            console.log('displayUpcomingChallenges 함수 호출됨. 업커밍 챌린지 수:', upcomingChallenges.length); // 디버깅 로그
            if (loadingMessage) loadingMessage.style.display = 'none';
            if (upcomingListContainer) upcomingListContainer.innerHTML = '';

            if (upcomingChallenges.length === 0) {
                if (noResultsMessage) noResultsMessage.style.display = 'block';
                return;
            } else {
                if (noResultsMessage) noResultsMessage.style.display = 'none';
            }

            upcomingChallenges.forEach(challenge => {
                const card = createChallengeCard(challenge, true);
                if (upcomingListContainer) upcomingListContainer.appendChild(card);
            });

            document.querySelectorAll('.copy-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    copyToClipboard(event.target.dataset.id, event.target);
                });
            });
        }

        displayUpcomingChallenges();

    } else if (currentPage === 'extended_list.html') { // Extended List 페이지 로직
        console.log('--- extended_list.html 페이지 로직 시작 ---'); // 디버깅 로그
        const extendedListContainer = document.getElementById('extended-challenge-list');
        const searchInput = document.getElementById('search-input'); // 추가
        const difficultyFilter = document.getElementById('difficulty-filter'); // 추가
        const sortOrder = document.getElementById('sort-order'); // 추가
        const noResultsMessage = document.querySelector('.no-results');
        const loadingMessage = document.querySelector('.loading-message');

        function displayExtendedChallenges(filteredChallenges) { // 매개변수 추가
            console.log('displayExtendedChallenges 함수 호출됨. 필터링된 챌린지 수:', filteredChallenges.length); // 디버깅 로그
            if (loadingMessage) loadingMessage.style.display = 'none';
            if (extendedListContainer) extendedListContainer.innerHTML = '';

            if (filteredChallenges.length === 0) {
                if (noResultsMessage) noResultsMessage.style.display = 'block';
                return;
            } else {
                if (noResultsMessage) noResultsMessage.style.display = 'none';
            }

            filteredChallenges.forEach(challenge => {
                const card = createChallengeCard(challenge, false);
                if (extendedListContainer) extendedListContainer.appendChild(card);
            });

            document.querySelectorAll('.copy-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    copyToClipboard(event.target.dataset.id, event.target);
                });
            });
        }

        function filterAndSortExtendedChallenges() { // 함수 이름 변경
            console.log('filterAndSortExtendedChallenges 함수 호출됨.'); // 디버깅 로그
            console.log('초기 challenges 배열:', challenges); // 디버깅 로그
            console.log('MAX_RANK_MAIN_LIST:', MAX_RANK_MAIN_LIST); // 디버깅 로그
            console.log('MAX_RANK_EXTENDED_LIST_UPPER_BOUND:', MAX_RANK_EXTENDED_LIST_UPPER_BOUND); // 디버깅 로그

            // extended_list.html에서는 MAX_RANK_MAIN_LIST 초과부터 MAX_RANK_EXTENDED_LIST_UPPER_BOUND (19위)까지의 챌린지만 보여줍니다.
            let currentChallenges = challenges.filter(c => c.rank > MAX_RANK_MAIN_LIST && c.rank <= MAX_RANK_EXTENDED_LIST_UPPER_BOUND);
            console.log('랭크 필터링 후 currentChallenges (extended list):', currentChallenges); // 디버깅 로그

            const searchTerm = searchInput ? searchInput.value.toLowerCase() : ''; // searchInput이 null일 경우 대비
            const selectedDifficulty = difficultyFilter ? difficultyFilter.value : 'all'; // difficultyFilter가 null일 경우 대비
            const selectedSortOrder = sortOrder ? sortOrder.value : 'rank'; // sortOrder가 null일 경우 대비

            if (searchTerm) {
                currentChallenges = currentChallenges.filter(challenge =>
                    challenge.name.toLowerCase().includes(searchTerm) ||
                    challenge.levelId.includes(searchTerm) ||
                    (challenge.verifier && challenge.verifier.toLowerCase().includes(searchTerm))
                );
            }

            if (selectedDifficulty !== 'all') {
                currentChallenges = currentChallenges.filter(challenge =>
                    challenge.difficulty === selectedDifficulty
                );
            }

            currentChallenges.sort((a, b) => {
                if (selectedSortOrder === 'rank') {
                    return a.rank - b.rank;
                } else if (selectedSortOrder === 'latest') {
                    return parseInt(b.id) - parseInt(a.id);
                } else if (selectedSortOrder === 'difficulty_asc') {
                    return (difficultyMap[a.difficulty]?.order || 0) - (difficultyMap[b.difficulty]?.order || 0);
                } else if (selectedSortOrder === 'difficulty_desc') {
                    return (difficultyMap[b.difficulty]?.order || 0) - (difficultyMap[b.difficulty]?.order || 0);
                } else if (selectedSortOrder === 'popular') {
                    return (b.views + b.completions) - (a.views + a.completions);
                }
                return 0;
            });
            console.log('최종 필터링 및 정렬 후 currentChallenges (extended list):', currentChallenges); // 디버깅 로그

            // 이벤트 리스너 추가
            // searchInput, difficultyFilter, sortOrder 요소가 존재할 때만 이벤트 리스너를 추가합니다.
            if (searchInput) searchInput.addEventListener('input', filterAndSortExtendedChallenges);
            if (difficultyFilter) difficultyFilter.addEventListener('change', filterAndSortExtendedChallenges);
            if (sortOrder) sortOrder.addEventListener('change', filterAndSortExtendedChallenges);

            displayExtendedChallenges(currentChallenges); // 변경된 함수 호출
        }

        filterAndSortExtendedChallenges(); // 초기 로드 시 필터링 및 정렬 실행

    } else if (currentPage === 'legacy_list.html') { // Legacy List 페이지 로직
        console.log('--- legacy_list.html 페이지 로직 시작 ---'); // 디버깅 로그
        const legacyListContainer = document.getElementById('legacy-challenge-list');
        const noResultsMessage = document.querySelector('.no-results');
        const loadingMessage = document.querySelector('.loading-message');

        function displayLegacyChallenges() {
            console.log('displayLegacyChallenges 함수 호출됨.'); // 디버깅 로그
            if (loadingMessage) loadingMessage.style.display = 'none';
            if (legacyListContainer) legacyListContainer.innerHTML = '';

            // 20위 이상 챌린지만 필터링
            const filteredChallenges = challenges.filter(c => c.rank > MAX_RANK_EXTENDED_LIST_UPPER_BOUND);
            console.log('랭크 필터링 후 filteredChallenges (legacy list):', filteredChallenges); // 디버깅 로그

            if (filteredChallenges.length === 0) {
                if (noResultsMessage) noResultsMessage.style.display = 'block';
                return;
            } else {
                if (noResultsMessage) noResultsMessage.style.display = 'none';
            }

            filteredChallenges.forEach(challenge => {
                const card = createChallengeCard(challenge, false);
                if (legacyListContainer) legacyListContainer.appendChild(card);
            });

            document.querySelectorAll('.copy-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    copyToClipboard(event.target.dataset.id, event.target);
                });
            });
        }
        displayLegacyChallenges();

    } else if (currentPage === 'challenge_detail.html') {
        console.log('--- challenge_detail.html 페이지 로직 시작 ---'); // 디버깅 로그
        const challengeId = urlParams.get('id');
        const isUpcoming = urlParams.get('upcoming') === 'true';
        const challengeDetailContent = document.getElementById('challenge-detail-content');
        const detailPageTitle = document.getElementById('detail-page-title');
        const recordsListContainer = document.getElementById('records-list-container');

        let foundChallenge;
        if (isUpcoming) {
            foundChallenge = upcomingChallenges.find(c => c.id === challengeId);
        } else {
            foundChallenge = challenges.find(c => c.id === challengeId);
        }
        console.log('상세 페이지 - 찾은 챌린지:', foundChallenge); // 디버깅 로그

        if (foundChallenge) {
            const difficultyInfo = difficultyMap[foundChallenge.difficulty] || { name: foundChallenge.difficulty, class: '', order: 0 };
            if (detailPageTitle) detailPageTitle.textContent = `${foundChallenge.name} - 챌린지 상세`;

            let videoHtml = '';
            if (foundChallenge.videoUrl) {
                let embedUrl = foundChallenge.videoUrl;
                if (foundChallenge.videoUrl.includes('watch?v=')) {
                    embedUrl = foundChallenge.videoUrl.replace('watch?v=', 'embed/');
                }
                videoHtml = `
                    <div class="detail-item">
                        <h3>공식 플레이 영상</h3>
                        <div class="video-container">
                            <iframe src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                `;
            } else {
                videoHtml = '<div class="detail-item"><p>이 챌린지의 공식 플레이 영상은 아직 없습니다.</p></div>';
            }

            const attemptsDisplay = foundChallenge.attempts > 0 ? `<p><strong>클리어 시도 횟수:</strong> ${foundChallenge.attempts}회</p>` : '';
            const verifierDisplay = foundChallenge.verifier ? `<p><strong>베리파이어:</strong> ${foundChallenge.verifier}</p>` : '';
            const expectedRankDisplay = foundChallenge.expectedRank ? `<p><strong>예상 랭크:</strong> ${foundChallenge.expectedRank}</p>` : '';

            // challenge.imageUrl을 사용하여 상세 페이지에 이미지 표시
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
                        <div id="records-list-container" class="records-list">
                            <!-- 클리어 기록이 여기에 로드됩니다 -->
                        </div>
                    </section>
                    <a href="${isUpcoming ? 'upcoming_challenges.html' : 'challenge_list.html'}" class="go-back-link">← ${isUpcoming ? '업커밍 챌린지' : '챌린지'} 목록으로 돌아가기</a>
                `;
            }

            document.querySelector('.challenge-detail-page .copy-btn')?.addEventListener('click', (event) => {
                copyToClipboard(event.target.dataset.id, event.target);
            });

            // 기록 가져오기 (백엔드 연동 시 여기에 fetch 로직 추가)
            const relevantRecords = submittedRecords.filter(record => record.challengeId === foundChallenge.id);
            console.log('상세 페이지 - 해당 챌린지의 관련 기록:', relevantRecords); // 디버깅 로그

            if (recordsListContainer) { // recordsListContainer가 존재하는지 확인
                if (relevantRecords.length > 0) {
                    recordsListContainer.innerHTML = '';
                    relevantRecords.forEach(record => {
                        const recordCard = document.createElement('div');
                        recordCard.classList.add('record-card');
                        if (record.isZre) {
                            recordCard.classList.add('zre-verified');
                        }

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

    } else if (currentPage === 'upload_challenge.html') {
        console.log('--- upload_challenge.html 페이지 로직 시작 ---'); // 디버깅 로그
        // 로그인 여부 확인
        if (!loggedInUser) {
            alert('챌린지를 업로드하려면 로그인이 필요합니다.');
            window.location.href = 'login.html'; // auth.html 대신 login.html로 변경
            return;
        }

        const uploadForm = document.getElementById('upload-challenge-form');
        if (uploadForm) {
            const verifierInputHtml = `
                <div class="form-group">
                    <label for="verifier">베리파이어 (Verifier)</label>
                    <input type="text" id="verifier" name="verifier" placeholder="챌린지를 검증한 플레이어 이름">
                </div>
            `;
            document.getElementById('gd-level-id').closest('.form-group').insertAdjacentHTML('afterend', verifierInputHtml);

            const isUpcomingCheckboxHtml = `
                <div class="form-group">
                    <input type="checkbox" id="is-upcoming" name="is-upcoming">
                    <label for="is-upcoming" style="display: inline; margin-left: 10px;">이 챌린지를 업커밍으로 등록</label>
                </div>
            `;
            document.getElementById('verifier').closest('.form-group').insertAdjacentHTML('afterend', isUpcomingCheckboxHtml);

            const expectedRankInputHtml = `
                <div class="form-group" id="expected-rank-group" style="display: none;">
                    <label for="expected-rank">예상 랭크 (Upcoming)</label>
                    <input type="text" id="expected-rank" name="expected-rank" placeholder="예: Top 1, Top 1-2 등">
                </div>
            `;
            document.getElementById('is-upcoming').closest('.form-group').insertAdjacentHTML('afterend', expectedRankInputHtml);

            document.getElementById('is-upcoming').addEventListener('change', (event) => {
                document.getElementById('expected-rank-group').style.display = event.target.checked ? 'block' : 'none';
            });

            uploadForm.addEventListener('submit', async (event) => { // async 추가
                event.preventDefault();

                const isUpcomingChecked = document.getElementById('is-upcoming').checked;
                const newChallenge = {
                    // id: String(challenges.length + upcomingChallenges.length + uploadedChallenges.length + 1), // 백엔드에서 ID 생성
                    name: document.getElementById('challenge-name').value,
                    difficulty: document.getElementById('difficulty').value,
                    description: document.getElementById('description').value,
                    creator: loggedInUser.nickname,
                    verifier: document.getElementById('verifier').value,
                    levelId: document.getElementById('gd-level-id').value,
                    views: 0,
                    videoUrl: document.getElementById('video-url').value,
                    imageUrl: `./uploaded_challenge_${Date.now()}.png`, // 업로드 시 더미 이미지 경로 생성 (실제 이미지 업로드 기능 필요)
                    isUpcoming: isUpcomingChecked, // 백엔드에 업커밍 여부 전달
                    expectedRank: isUpcomingChecked ? document.getElementById('expected-rank').value : null,
                    completions: 0,
                    attempts: 0,
                };

                try {
                    const authToken = localStorage.getItem('authToken'); // 저장된 토큰 가져오기
                    const response = await fetch(`${BACKEND_API_URL}/api/challenges`, { // 새 챌린지 업로드 엔드포인트 (예시)
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${authToken}` // 인증 토큰 포함
                        },
                        body: JSON.stringify(newChallenge),
                    });
                    const data = await response.json();
                    if (response.ok) {
                        alert(data.message);
                        // 백엔드에서 챌린지 데이터를 성공적으로 저장했으므로,
                        // 프론트엔드 임시 배열에 추가하는 로직은 실제 배포 시에는 백엔드에서 데이터를 다시 가져오는 것으로 대체되어야 합니다.
                        // 여기서는 데모를 위해 임시로 추가
                        if (isUpcomingChecked) {
                            upcomingChallenges.push(data.challenge); // 백엔드에서 반환된 챌린지 데이터 사용
                            upcomingChallenges.sort((a, b) => a.name.localeCompare(b.name));
                        } else {
                            challenges.push(data.challenge); // 백엔드에서 반환된 챌린지 데이터 사용
                            challenges.sort((a,b) => a.rank - b.rank);
                        }
                        uploadedChallenges.push(data.challenge); // 사용자 업로드 목록에도 추가
                        localStorage.setItem('uploadedChallenges', JSON.stringify(uploadedChallenges)); // 데모용 로컬 저장

                        console.log('새 챌린지:', data.challenge);
                        uploadForm.reset();
                        document.getElementById('expected-rank-group').style.display = 'none';
                        // 챌린지 목록 페이지로 리다이렉트 (선택 사항)
                        window.location.href = 'challenge_list.html';
                    } else {
                        alert(`챌린지 업로드 실패: ${data.message || '알 수 없는 오류가 발생했습니다.'}`);
                    }
                } catch (error) {
                    console.error('챌린지 업로드 오류:', error);
                    alert('챌린지 업로드 중 오류가 발생했습니다. 서버가 실행 중인지 확인해주세요.');
                }
            });
        }

    } else if (currentPage === 'my_profile.html') {
        console.log('--- my_profile.html 페이지 로직 시작 ---'); // 디버깅 로그
        if (!loggedInUser) {
            alert('프로필을 보려면 로그인이 필요합니다.');
            window.location.href = 'login.html'; // auth.html 대신 login.html로 변경
            return;
        }

        const profileNickname = document.getElementById('profile-nickname');
        const profileEmail = document.getElementById('profile-email');
        const uploadedChallengesList = document.getElementById('uploaded-challenges-list');
        const submittedRecordsList = document.getElementById('submitted-records-list');
        const logoutButton = document.getElementById('logout-button');

        if (profileNickname) profileNickname.textContent = loggedInUser.nickname;
        if (profileEmail) profileEmail.textContent = loggedInUser.email;

        const userUploadedChallenges = uploadedChallenges.filter(c => c.creator === loggedInUser.nickname);
        console.log('사용자가 업로드한 챌린지:', userUploadedChallenges); // 디버깅 로그

        if (uploadedChallengesList) {
            if (userUploadedChallenges.length > 0) {
                uploadedChallengesList.innerHTML = '';
                userUploadedChallenges.forEach(challenge => {
                    const li = document.createElement('li');
                    const linkTarget = challenge.expectedRank ? `challenge_detail.html?id=${challenge.id}&upcoming=true` : `challenge_detail.html?id=${challenge.id}`;
                    const challengeType = challenge.expectedRank ? ' (업커밍)' : '';

                    li.innerHTML = `
                        <a href="${linkTarget}">${challenge.name}${challengeType}</a>
                        <div class="actions">
                            <button>수정</button>
                            <button>삭제</button>
                        </div>
                    `;
                    uploadedChallengesList.appendChild(li);
                });
            } else {
                uploadedChallengesList.innerHTML = '<li><p>아직 업로드한 챌린지가 없습니다.</p></li>';
            }
        }

        // Function to fetch and display submitted records from backend
        async function fetchAndDisplaySubmittedRecords() {
            console.log('fetchAndDisplaySubmittedRecords 함수 호출됨.'); // 디버깅 로그
            if (!loggedInUser || !loggedInUser.email) {
                console.warn('로그인된 사용자 정보가 없어 기록을 불러올 수 없습니다.');
                if (submittedRecordsList) submittedRecordsList.innerHTML = '<li><p>로그인 정보가 없어 기록을 불러올 수 없습니다.</p></li>';
                return;
            }

            if (submittedRecordsList) submittedRecordsList.innerHTML = '<li><p class="loading-message">제출한 기록을 불러오는 중...</p></li>';

            try {
                const authToken = localStorage.getItem('authToken');
                if (!authToken) {
                    console.warn('인증 토큰이 없어 기록을 불러올 수 없습니다.');
                    if (submittedRecordsList) submittedRecordsList.innerHTML = '<li><p>로그인 정보가 유효하지 않아 기록을 불러올 수 없습니다. 다시 로그인해주세요.</p></li>';
                    return;
                }

                // Assuming backend has an endpoint like /api/records/my that returns records for the authenticated user
                // The backend should filter by the user associated with the authToken
                const response = await fetch(`${BACKEND_API_URL}/api/records/my`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    const fetchedRecords = data.records; // Assuming the backend returns an object with a 'records' array
                    console.log('백엔드에서 불러온 기록:', fetchedRecords); // 디버깅 로그

                    if (submittedRecordsList) {
                        if (fetchedRecords && fetchedRecords.length > 0) {
                            submittedRecordsList.innerHTML = ''; // Clear loading message
                            fetchedRecords.forEach(record => {
                                const li = document.createElement('li');
                                const zreTag = record.isZre ? ' <span class="zre-tag">Zre 인증</span>' : '';
                                li.innerHTML = `
                                    <a href="challenge_detail.html?id=${record.challengeId}">${record.challengeName}</a>
                                    <span>(내 기록)${zreTag}</span>
                                    <div class="actions">
                                        <button>보기</button>
                                        <button>삭제</button>
                                    </div>
                                `;
                                submittedRecordsList.appendChild(li);
                            });
                        } else {
                            submittedRecordsList.innerHTML = '<li><p>아직 제출한 기록이 없습니다.</p></li>';
                        }
                    }
                } else {
                    const errorData = await response.json();
                    console.error('기록 불러오기 실패:', errorData.message);
                    if (submittedRecordsList) submittedRecordsList.innerHTML = `<li><p>기록을 불러오는 데 실패했습니다: ${errorData.message || '알 수 없는 오류'}</p></li>`;
                }
            } catch (error) {
                console.error('기록 불러오기 중 네트워크 오류:', error);
                if (submittedRecordsList) submittedRecordsList.innerHTML = '<li><p>기록을 불러오는 중 네트워크 오류가 발생했습니다.</p></li>';
            }
        }

        // Call the function to fetch and display records
        fetchAndDisplaySubmittedRecords();


        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                loggedInUser = null;
                localStorage.removeItem('loggedInUser');
                localStorage.removeItem('authToken'); // 토큰도 제거
                alert('로그아웃 되었습니다.');
                window.location.href = 'index.html';
            });
        }


    } else if (currentPage === 'login.html') { // 로그인 페이지 로직 (auth.html에서 분리)
        console.log('--- login.html 페이지 로직 시작 ---'); // 디버깅 로그
        const loginForm = document.getElementById('login-form');

        if (loggedInUser) {
            alert('이미 로그인되어 있습니다. 프로필 페이지로 이동합니다.');
            window.location.href = 'my_profile.html';
            return;
        }

        if (loginForm) {
            loginForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const email = document.getElementById('auth-email').value;
                const password = document.getElementById('auth-password').value;

                try {
                    const response = await fetch(`${BACKEND_API_URL}/api/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, password }),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        alert(data.message);
                        loggedInUser = data.user;
                        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
                        localStorage.setItem('authToken', data.token);
                        updateAuthNavItem();
                        window.location.href = 'my_profile.html';
                    } else {
                        alert(`오류: ${data.message || '알 수 없는 오류가 발생했습니다.'}`);
                    }
                } catch (error) {
                    console.error('네트워크 또는 서버 통신 오류:', error);
                    alert('서버와 통신하는 중 오류가 발생했습니다. 서버가 실행 중인지 확인해주세요.');
                }
            });
        }
    } else if (currentPage === 'signup.html') { // 회원가입 페이지 로직 (auth.html에서 분리)
        console.log('--- signup.html 페이지 로직 시작 ---'); // 디버깅 로그
        const signupForm = document.getElementById('signup-form');

        if (loggedInUser) {
            alert('이미 로그인되어 있습니다. 프로필 페이지로 이동합니다.');
            window.location.href = 'my_profile.html';
            return;
        }

        if (signupForm) {
            signupForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const email = document.getElementById('auth-email').value;
                const password = document.getElementById('auth-password').value;
                const nickname = document.getElementById('auth-nickname').value;

                try {
                    const response = await fetch(`${BACKEND_API_URL}/api/signup`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ nickname, email, password }),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        alert(data.message);
                        // 회원가입 성공 후, users 배열에 추가 (데모용 로컬 스토리지 유지)
                        const newUser = { email, password, nickname };
                        users.push(newUser);
                        localStorage.setItem('users', JSON.stringify(users));
                        // 회원가입 성공 후 로그인 페이지로 리다이렉트
                        window.location.href = 'login.html';
                    } else {
                        alert(`오류: ${data.message || '알 수 없는 오류가 발생했습니다.'}`);
                    }
                } catch (error) {
                    console.error('네트워크 또는 서버 통신 오류:', error);
                    alert('서버와 통신하는 중 오류가 발생했습니다. 서버가 실행 중인지 확인해주세요.');
                }
            });
        }
    } else if (currentPage === 'creator_page.html') {
        console.log('--- creator_page.html 페이지 로직 시작 ---'); // 디버깅 로그
        const creatorListContainer = document.getElementById('creator-list');

        function displayCreators() {
            if (creatorListContainer) creatorListContainer.innerHTML = '';

            // 정의된 크리에이터 목록을 순회하며 표시
            creators.forEach(creatorName => {
                const creatorCard = document.createElement('div');
                creatorCard.classList.add('creator-card');

                // 해당 크리에이터가 제작한 챌린지 필터링
                const creatorChallenges = challenges.filter(c => c.creator === creatorName);
                const creatorUpcomingChallenges = upcomingChallenges.filter(c => c.creator === creatorName);
                const creatorUploadedChallenges = uploadedChallenges.filter(c => c.creator === creatorName);

                console.log(`크리에이터 ${creatorName}의 챌린지:`, {
                    main: creatorChallenges,
                    upcoming: creatorUpcomingChallenges,
                    uploaded: creatorUploadedChallenges
                }); // 디버깅 로그

                creatorCard.innerHTML = `
                    <h3>${creatorName}</h3>
                    <div class="creator-challenges">
                        <h4>제작한 챌린지 (${creatorChallenges.length + creatorUpcomingChallenges.length + creatorUploadedChallenges.length}개)</h4>
                        <ul>
                            ${creatorChallenges.map(c => `<li><a href="challenge_detail.html?id=${c.id}">${c.name} (#${c.rank})</a></li>`).join('')}
                            ${creatorUpcomingChallenges.map(c => `<li><a href="challenge_detail.html?id=${c.id}&upcoming=true">${c.name} (업커밍)</a></li>`).join('')}
                            ${creatorUploadedChallenges.map(c => `<li><a href="challenge_detail.html?id=${c.id}">${c.name} (업로드)</a></li>`).join('')}
                        </ul>
                    </div>
                `;
                if (creatorListContainer) creatorListContainer.appendChild(creatorCard);
            });

            // 크리에이터 목록이 비어있을 경우 메시지 표시 (현재는 하드코딩된 목록이므로 거의 발생하지 않음)
            if (creators.length === 0 && creatorListContainer) {
                creatorListContainer.innerHTML = '<p class="no-results">등록된 크리에이터가 없습니다.</p>';
            }
        }
        displayCreators();
    } else if (currentPage === 'user_scores.html') { // 사용자 스코어 페이지 로직
        console.log('--- user_scores.html 페이지 로직 시작 ---'); // 디버깅 로그
        const userScoresListContainer = document.getElementById('user-scores-list');
        const noScoresMessage = document.querySelector('.no-scores');

        function displayUserScores() {
            console.log('displayUserScores 함수 호출됨.'); // 디버깅 로그
            if (userScoresListContainer) userScoresListContainer.innerHTML = '';

            const sortedScores = Object.entries(userScores)
                .map(([email, score]) => {
                    const user = users.find(u => u.email === email);
                    return {
                        nickname: user ? user.nickname : email.split('@')[0], // 닉네임이 없으면 이메일 앞부분 사용
                        score: score
                    };
                })
                .sort((a, b) => b.score - a.score); // 점수 내림차순 정렬
            console.log('정렬된 사용자 스코어:', sortedScores); // 디버깅 로그

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
                    <span class="score-rank">#${index + 1}</span>
                    <span class="score-nickname">${user.nickname}</span>
                    <span class="score-value">${user.score}점</span>
                `;
                userScoresListContainer.appendChild(scoreCard);
            });
        }
        displayUserScores();
    }
    // --- 기록 제출 페이지 로직 (`submit_record.html`) ---
    else if (currentPage === 'submit_record.html') {
        console.log('--- submit_record.html 페이지 로직 시작 ---'); // 디버깅 로그
        if (!loggedInUser) {
            alert('기록을 제출하려면 로그인이 필요합니다.');
            window.location.href = 'login.html';
            return;
        }

        const challengeId = urlParams.get('challengeId');
        const recordChallengeInfo = document.getElementById('record-challenge-info');
        const recordNotFoundMessage = document.getElementById('record-not-found');
        const submitRecordForm = document.getElementById('submit-record-form');
        const isZreVerifiedCheckbox = document.getElementById('is-zre-verified');
        const zreProofFields = document.getElementById('zre-proof-fields');

        let targetChallenge = challenges.find(c => c.id === challengeId);
        if (!targetChallenge) {
            // 업커밍 챌린지에서도 찾아봅니다.
            targetChallenge = upcomingChallenges.find(c => c.id === challengeId);
            if (targetChallenge && targetChallenge.isUpcoming) {
                alert('업커밍 챌린지에는 기록을 제출할 수 없습니다.');
                window.location.href = 'challenge_detail.html?id=' + challengeId + '&upcoming=true';
                return;
            }
        }

        if (targetChallenge) {
            recordChallengeInfo.innerHTML = `
                <h3>${targetChallenge.name}</h3>
                <p class="difficulty ${difficultyMap[targetChallenge.difficulty]?.class}">난이도: ${difficultyMap[targetChallenge.difficulty]?.name}</p>
                <p>제작자: ${targetChallenge.creator}</p>
                <p>레벨 ID: ${targetChallenge.levelId}</p>
                <img src="${targetChallenge.imageUrl || 'https://placehold.co/200x150/E0E0E0/333333?text=No+Image'}" alt="${targetChallenge.name} 이미지" style="max-width: 100%; height: auto; border-radius: 8px; margin-top: 15px;" onerror="this.onerror=null;this.src='https://placehold.co/200x150/E0E0E0/333333?text=No+Image';">
            `;
            submitRecordForm.style.display = 'block';
        } else {
            recordChallengeInfo.style.display = 'none';
            recordNotFoundMessage.style.display = 'block';
        }

        isZreVerifiedCheckbox.addEventListener('change', (event) => {
            zreProofFields.style.display = event.target.checked ? 'block' : 'none';
        });

        submitRecordForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const newRecord = {
                challengeId: challengeId,
                challengeName: targetChallenge.name,
                videoUrl: document.getElementById('record-video-url').value,
                recordImageUrl: document.getElementById('record-image-url').value,
                comment: document.getElementById('record-comment').value,
                isZre: isZreVerifiedCheckbox.checked,
                zreVideoUrl: document.getElementById('zre-video-url').value,
                zreImageUrl: document.getElementById('zre-image-url').value,
                submitter: loggedInUser.nickname,
                date: new Date().toISOString().slice(0, 10) // YYYY-MM-DD 형식
            };

            // Zre 인증 기록인데 증명 자료가 없는 경우
            if (newRecord.isZre && !newRecord.zreVideoUrl && !newRecord.zreImageUrl) {
                alert('Zre 인증 기록을 제출하려면 인증 영상 URL 또는 인증 이미지 URL 중 하나 이상을 입력해야 합니다.');
                return;
            }

            try {
                const authToken = localStorage.getItem('authToken');
                const response = await fetch(`${BACKEND_API_URL}/api/records`, { // 기록 제출 엔드포인트 (예시)
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    },
                    body: JSON.stringify(newRecord),
                });
                const data = await response.json();

                if (response.ok) {
                    alert(data.message);
                    // 로컬 스토리지에 임시로 추가 (실제 배포 시에는 백엔드에서 다시 가져오는 로직 필요)
                    submittedRecords.push(data.record);
                    localStorage.setItem('submittedRecords', JSON.stringify(submittedRecords));

                    // 챌린지 완료 횟수 및 점수 업데이트 (데모용)
                    if (targetChallenge && targetChallenge.completions !== undefined) {
                        targetChallenge.completions += 1;
                        // 사용자 점수 업데이트
                        userScores[loggedInUser.email] = (userScores[loggedInUser.email] || 0) + getScoreByRank(targetChallenge.rank);
                        localStorage.setItem('userScores', JSON.stringify(userScores));
                    }
                    localStorage.setItem('challenges', JSON.stringify(challenges)); // challenges 배열도 업데이트 (completions 반영)


                    window.location.href = `challenge_detail.html?id=${challengeId}`;
                } else {
                    alert(`기록 제출 실패: ${data.message || '알 수 없는 오류가 발생했습니다.'}`);
                }
            } catch (error) {
                console.error('기록 제출 오류:', error);
                alert('기록 제출 중 오류가 발생했습니다. 서버가 실행 중인지 확인해주세요.');
            }
        });
    }
});
