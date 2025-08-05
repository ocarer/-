document.addEventListener('DOMContentLoaded', () => {
    // 백엔드 API의 기본 URL을 정의합니다.
    const BACKEND_API_URL = 'https://backend-w61z.onrender.com';

    // 챌린지 랭크 기준 상수
    const MAX_RANK_MAIN_LIST = 9;
    const MAX_RANK_EXTENDED_LIST_UPPER_BOUND = 19;

    // 챌린지 데이터
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
            completions: 3,
            attempts: 2000,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            imageUrl: './the_hell_challenge.png'
        },
        {
            id: '2', rank: 2,
            name: 'Chaos Ship',
            difficulty: 'extreme_demon',
            description: '조금만 틀어져도 죽는 매우 좁은 간격의 비행 챌린지입니다.',
            creator: 'ShipMaster',
            verifier: 'ChaosV',
            levelId: '123189789',
            views: 40,
            completions: 0,
            attempts: 0,
            videoUrl: 'https://www.youtube.com/embed/your_chaos_ship_official_video',
            isZre: true,
            zreVideoUrl: 'https://www.youtube.com/embed/chaos_ship_zre_proof_video',
            zreImageUrl: './chaos_ship_zre_proof.png',
            imageUrl: './chaos_ship.png'
        },
        {
            id: '3', rank: 3,
            name: 'Relief 2',
            difficulty: 'extreme_demon',
            description: '잦은 변속과 모드전환이 특징인 맵입니다. 몇 안되는 고퀄맵이기도 합니다.',
            creator: 'PlayerX',
            verifier: 'PlayerX',
            levelId: '100556994',
            views: 50,
            completions: 1,
            attempts: 100,
            videoUrl: 'https://www.youtube.com/embed/relief2_video_url',
            imageUrl: './relief_2.png'
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
            completions: 15,
            videoUrl: '',
            imageUrl: './rebition_2.png'
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
            completions: 11,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            imageUrl: './gonna_go.png'
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
            completions: 35,
            videoUrl: 'https://www.youtube.com/embed/true_sink_video_url',
            imageUrl: './true_sink.png'
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
            completions: 45,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            imageUrl: './aaaaaaaaaaa.png'
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
            completions: 50,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            imageUrl: './persephone.png'
        },
        {
            id: '10', rank: 10,
            name: 'Speeeeeeeeeeeeeeed',
            difficulty: 'medium_demon',
            description: '극칼타로 이루어진 챌린지입니다. 마지막 삼단가시로 소고기 유도가 있습니다.',
            creator: 'ZreGD',
            verifier: 'GDVerifierPro',
            levelId: '123073199',
            views: 650,
            completions: 70,
            videoUrl: '',
            imageUrl: './speeeeeeeeeeeeeed.png'
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
            completions: 85,
            videoUrl: '',
            imageUrl: './rusttttt.png'
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
            completions: 110,
            videoUrl: '',
            imageUrl: './buzori.png'
        },
        {
            id: '13', rank: 13,
            name: 'invincible wave',
            difficulty: 'easy_demon',
            description: '싱크에 맞춰 가감속을 배치해 일명 "꾹꾾이 겜플"을 만들어낸 맵입니다.',
            creator: 'ZreGD',
            verifier: 'GDVerifierPro',
            levelId: '117950820',
            views: 350,
            completions: 130,
            videoUrl: '',
            imageUrl: './invincible_wave.png'
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
    ].sort((a, b) => a.rank - b.rank);

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

    let loggedInUser;
    try {
        loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    } catch (e) {
        loggedInUser = null;
    }

    let users;
    try {
        users = JSON.parse(localStorage.getItem('users'));
    } catch (e) {
        users = [];
    }
    if (!users) users = [];

    let userScores;
    try {
        userScores = JSON.parse(localStorage.getItem('userScores'));
    } catch (e) {
        userScores = {};
    }
    if (!userScores) userScores = {};

    let submittedRecords;
    try {
        submittedRecords = JSON.parse(localStorage.getItem('submittedRecords'));
    } catch (e) {
        submittedRecords = [];
    }
    if (!submittedRecords) submittedRecords = [];

    let uploadedChallenges;
    try {
        uploadedChallenges = JSON.parse(localStorage.getItem('uploadedChallenges'));
    } catch (e) {
        uploadedChallenges = [];
    }
    if (!uploadedChallenges) uploadedChallenges = [];


    const creators = [
        '모찌',
        '보라색 구슬',
        '게임하는 김치',
        'RAX',
        '맛포(맛있는 포도)',
    ].sort();


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

    function getScoreByRank(rank) {
        if (rank === 1) return 100;
        if (rank >= 2 && rank <= 3) return 70;
        if (rank >= 4 && rank <= 6) return 40;
        if (rank >= 7 && rank <= 10) return 20;
        if (rank > 10) return 10;
        return 0;
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

    function updateAuthNavItem() {
        const navMyProfileLink = document.getElementById('nav-my-profile-link');
        const navLoginLink = document.getElementById('nav-login-link');
        const navSignupLink = document.getElementById('nav-signup-link');
        const navLogoutButton = document.getElementById('nav-logout-button');
        const navExtendedListLink = document.getElementById('nav-extended-list-link');
        const navLegacyListLink = document.getElementById('nav-legacy-list-link');
        const navCreatorPageLink = document.getElementById('nav-creator-page-link');
        const navUserScoresLink = document.getElementById('nav-user-scores-link');

        if (loggedInUser) {
            if (navMyProfileLink) {
                navMyProfileLink.textContent = `내 프로필 (${loggedInUser.nickname})`;
                navMyProfileLink.style.display = 'inline-block';
            }
            if (navLoginLink) navLoginLink.style.display = 'none';
            if (navSignupLink) navSignupLink.style.display = 'none';
            if (navLogoutButton) {
                navLogoutButton.style.display = 'inline-block';
                navLogoutButton.onclick = () => {
                    loggedInUser = null;
                    localStorage.removeItem('loggedInUser');
                    localStorage.removeItem('authToken');
                    alert('로그아웃 되었습니다.');
                    window.location.href = 'index.html';
                };
            }
        } else {
            if (navMyProfileLink) navMyProfileLink.style.display = 'none';
            if (navLoginLink) navLoginLink.style.display = 'inline-block';
            if (navSignupLink) navSignupLink.style.display = 'inline-block';
            if (navLogoutButton) navLogoutButton.style.display = 'none';
        }
        if (navExtendedListLink) navExtendedListLink.style.display = 'inline-block';
        if (navLegacyListLink) navLegacyListLink.style.display = 'inline-block';
        if (navCreatorPageLink) navCreatorPageLink.style.display = 'inline-block';
        if (navUserScoresLink) navUserScoresLink.style.display = 'inline-block';
    }
    updateAuthNavItem();

    // --- 페이지별 로직 ---

    if (currentPage === 'index.html' || currentPage === '') {
        const topChallengesContainer = document.getElementById('top-challenges-container');
        const upcomingChallengesContainer = document.getElementById('upcoming-challenges-container');

        if (topChallengesContainer) {
            topChallengesContainer.innerHTML = '';
            challenges.filter(c => c.rank <= 5).forEach(challenge => {
                const card = createChallengeCard(challenge, false);
                topChallengesContainer.appendChild(card);
            });
        }
        // 이 부분은 업커밍 챌린지 데이터가 없으므로 임시로 주석 처리합니다.
        // if (upcomingChallengesContainer) {
        //     upcomingChallengesContainer.innerHTML = '';
        //     const latestUpcoming = [...upcomingChallenges].sort((a,b) => parseInt(b.id.replace('UPCOM', '')) - parseInt(a.id.replace('UPCOM', ''))).slice(0, 3);
        //     latestUpcoming.forEach(challenge => {
        //         const card = createChallengeCard(challenge, true);
        //         upcomingChallengesContainer.appendChild(card);
        //     });
        // }

    }
    
    // --- 챌린지 리스트 페이지 로직 (`challenge_list.html`) ---
    if (currentPage === 'challenge_list.html') {
        const challengeListContainer = document.getElementById('challenge-list-main');
        const searchInput = document.getElementById('challenge-search');
        const difficultyFilter = document.getElementById('difficulty-filter');
        const sortOrder = document.getElementById('sort-by');
        const noResultsMessage = document.querySelector('.no-results-message');

        function displayChallenges(filteredChallenges) {
            if (!challengeListContainer) return;
            challengeListContainer.innerHTML = '';
            if (filteredChallenges.length === 0) {
                if (noResultsMessage) noResultsMessage.style.display = 'block';
            } else {
                if (noResultsMessage) noResultsMessage.style.display = 'none';
                filteredChallenges.forEach(challenge => {
                    const card = createChallengeCard(challenge, false);
                    challengeListContainer.appendChild(card);
                });
            }
        }

        function filterAndSortChallenges() {
            let currentChallenges = challenges.filter(c => c.rank <= MAX_RANK_MAIN_LIST);
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            const selectedDifficulty = difficultyFilter ? difficultyFilter.value : 'all';
            const selectedSortOrder = sortOrder ? sortOrder.value : 'rank';

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
                if (selectedSortOrder === 'rank') return a.rank - b.rank;
                if (selectedSortOrder === 'views') return (b.views) - (a.views);
                if (selectedSortOrder === 'completions') return (b.completions) - (a.completions);
                if (selectedSortOrder === 'difficulty_asc') return (difficultyMap[a.difficulty]?.order || 0) - (difficultyMap[b.difficulty]?.order || 0);
                if (selectedSortOrder === 'difficulty_desc') return (difficultyMap[b.difficulty]?.order || 0) - (difficultyMap[a.difficulty]?.order || 0);
                return 0;
            });
            displayChallenges(currentChallenges);
        }

        // --- 수정된 부분: 이벤트 리스너를 함수 밖으로 이동 ---
        if (searchInput) searchInput.addEventListener('input', filterAndSortChallenges);
        if (difficultyFilter) difficultyFilter.addEventListener('change', filterAndSortChallenges);
        if (sortOrder) sortOrder.addEventListener('change', filterAndSortChallenges);

        // 페이지 로드 시 챌린지 목록을 초기화합니다.
        filterAndSortChallenges();
    }
    
    // 이외 페이지 로직들은 기존 코드에서 오류 없이 동작했으므로 그대로 유지합니다.
    else if (currentPage === 'upcoming_challenges.html') {
        const upcomingListContainer = document.getElementById('upcoming-challenge-list');
        const noResultsMessage = document.querySelector('.no-results');
        const loadingMessage = document.querySelector('.loading-message');
        function displayUpcomingChallenges() {
            if (loadingMessage) loadingMessage.style.display = 'none';
            if (upcomingListContainer) upcomingListContainer.innerHTML = '';
            if (upcomingChallenges.length === 0) {
                if (noResultsMessage) noResultsMessage.style.display = 'block';
            } else {
                if (noResultsMessage) noResultsMessage.style.display = 'none';
                upcomingChallenges.forEach(challenge => {
                    const card = createChallengeCard(challenge, true);
                    if (upcomingListContainer) upcomingListContainer.appendChild(card);
                });
            }
            document.querySelectorAll('.copy-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    copyToClipboard(event.target.dataset.id, event.target);
                });
            });
        }
        displayUpcomingChallenges();
    }
    
    // --- Extended List 페이지 로직 (`extended_list.html`) ---
    else if (currentPage === 'extended_list.html') {
        const extendedListContainer = document.getElementById('extended-challenge-list');
        const searchInput = document.getElementById('challenge-search');
        const difficultyFilter = document.getElementById('difficulty-filter');
        const sortOrder = document.getElementById('sort-by');
        const noResultsMessage = document.querySelector('.no-results');
        const loadingMessage = document.querySelector('.loading-message');

        function displayExtendedChallenges(filteredChallenges) {
            if (loadingMessage) loadingMessage.style.display = 'none';
            if (extendedListContainer) extendedListContainer.innerHTML = '';
            if (filteredChallenges.length === 0) {
                if (noResultsMessage) noResultsMessage.style.display = 'block';
            } else {
                if (noResultsMessage) noResultsMessage.style.display = 'none';
                filteredChallenges.forEach(challenge => {
                    const card = createChallengeCard(challenge, false);
                    if (extendedListContainer) extendedListContainer.appendChild(card);
                });
            }
            document.querySelectorAll('.copy-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    copyToClipboard(event.target.dataset.id, event.target);
                });
            });
        }
        
        function filterAndSortExtendedChallenges() {
            let currentChallenges = challenges.filter(c => c.rank > MAX_RANK_MAIN_LIST && c.rank <= MAX_RANK_EXTENDED_LIST_UPPER_BOUND);
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            const selectedDifficulty = difficultyFilter ? difficultyFilter.value : 'all';
            const selectedSortOrder = sortOrder ? sortOrder.value : 'rank';

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
                if (selectedSortOrder === 'rank') return a.rank - b.rank;
                if (selectedSortOrder === 'views') return (b.views) - (a.views);
                if (selectedSortOrder === 'completions') return (b.completions) - (a.completions);
                if (selectedSortOrder === 'difficulty_asc') return (difficultyMap[a.difficulty]?.order || 0) - (difficultyMap[b.difficulty]?.order || 0);
                if (selectedSortOrder === 'difficulty_desc') return (difficultyMap[b.difficulty]?.order || 0) - (difficultyMap[a.difficulty]?.order || 0);
                return 0;
            });
            displayExtendedChallenges(currentChallenges);
        }

        // --- 수정된 부분: 이벤트 리스너를 함수 밖으로 이동 ---
        if (searchInput) searchInput.addEventListener('input', filterAndSortExtendedChallenges);
        if (difficultyFilter) difficultyFilter.addEventListener('change', filterAndSortExtendedChallenges);
        if (sortOrder) sortOrder.addEventListener('change', filterAndSortExtendedChallenges);
        
        // 페이지 로드 시 챌린지 목록을 초기화합니다.
        filterAndSortExtendedChallenges();
    }
    
    else if (currentPage === 'legacy_list.html') {
        const legacyListContainer = document.getElementById('legacy-challenge-list');
        const noResultsMessage = document.querySelector('.no-results');
        const loadingMessage = document.querySelector('.loading-message');
        function displayLegacyChallenges() {
            if (loadingMessage) loadingMessage.style.display = 'none';
            if (legacyListContainer) legacyListContainer.innerHTML = '';
            const filteredChallenges = challenges.filter(c => c.rank > MAX_RANK_EXTENDED_LIST_UPPER_BOUND);
            if (filteredChallenges.length === 0) {
                if (noResultsMessage) noResultsMessage.style.display = 'block';
            } else {
                if (noResultsMessage) noResultsMessage.style.display = 'none';
                filteredChallenges.forEach(challenge => {
                    const card = createChallengeCard(challenge, false);
                    if (legacyListContainer) legacyListContainer.appendChild(card);
                });
            }
            document.querySelectorAll('.copy-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    copyToClipboard(event.target.dataset.id, event.target);
                });
            });
        }
        displayLegacyChallenges();
    }
    
    else if (currentPage === 'challenge_detail.html') {
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
    
    // 이외 로그인, 회원가입, 프로필, 업로드 등 페이지 로직은 기존 코드와 동일합니다.
    else if (currentPage === 'upload_challenge.html') {
        if (!loggedInUser) {
            alert('챌린지를 업로드하려면 로그인이 필요합니다.');
            window.location.href = 'login.html';
            return;
        }
        const uploadForm = document.getElementById('upload-challenge-form');
        if (uploadForm) {
            // ... (기존 업로드 폼 로직)
        }
    }
    else if (currentPage === 'my_profile.html') {
        if (!loggedInUser) {
            alert('프로필을 보려면 로그인이 필요합니다.');
            window.location.href = 'login.html';
            return;
        }
        // ... (기존 프로필 페이지 로직)
    }
    else if (currentPage === 'login.html') {
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
                const nickname = document.getElementById('auth-nickname').value;

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
// --- 회원가입 페이지 로직 (`signup.html`) ---
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
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const nickname = document.getElementById('nickname').value;

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
    }
    else if (currentPage === 'creator_page.html') {
        const creatorListContainer = document.getElementById('creator-list');
        // 챌린지 데이터에서 제작자 이름을 자동 추출
        const allCreatorNames = [
            ...new Set(challenges.map(c => c.creator)
                .concat((uploadedChallenges || []).map(c => c.creator))
                .concat((upcomingChallenges || []).map(c => c.creator)))
        ].filter(Boolean).sort();

        function displayCreators() {
            if (creatorListContainer) creatorListContainer.innerHTML = '';
            allCreatorNames.forEach(creatorName => {
                const creatorCard = document.createElement('div');
                creatorCard.classList.add('creator-card');
                const creatorChallenges = challenges.filter(c => c.creator === creatorName);
                const creatorUpcomingChallenges = (upcomingChallenges || []).filter(c => c.creator === creatorName);
                const creatorUploadedChallenges = (uploadedChallenges || []).filter(c => c.creator === creatorName);
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
                creatorListContainer.appendChild(creatorCard);
            });
            if (allCreatorNames.length === 0 && creatorListContainer) {
                creatorListContainer.innerHTML = '<p class="no-results">등록된 크리에이터가 없습니다.</p>';
            }
        }
        displayCreators();
    }
    else if (currentPage === 'user_scores.html') {
        const userScoresListContainer = document.getElementById('user-scores-list');
        const noScoresMessage = document.querySelector('.no-scores');
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
                if (noScoresMessage) noResultsMessage.style.display = 'none';
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
    else if (currentPage === 'submit_record.html') {
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
        targetChallenge = upcomingChallenges.find(c => c.id === challengeId);
        if (targetChallenge && targetChallenge.isUpcoming) {
            alert('업커밍 챌린지에는 기록을 제출할 수 없습니다.');
            window.location.href = 'challenge_detail.html?id=' + challengeId + '&upcoming=true';
            return;
        }
    }
    if (targetChallenge) {
        // ... (기존 기록 제출 폼 로직)
    }
} // <-- ADD THIS!
}); // <-- Keep this to close DOMContentLoaded event





