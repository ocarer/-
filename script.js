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
            description: '가장 높은 순위의 챌린지입니다. 2000회 이상의 시도 끝에 클리어된 매우 어려운 챌린지입니다.',
            creator: 'ChallengingCreator',
            verifier: 'GDVerifierPro',
            levelId: '20000001',
            views: 3500,
            completions: 1,
            attempts: 2000,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            imageUrl: './the_hell_challenge.png' // 이미지 경로 변경
        },
        {
            id: '16', rank: 2, // Relief 2 (오늘 깬 맵)
            name: 'Relief 2',
            difficulty: 'insane_demon', // 난이도 추정
            description: '오늘 클리어한 새로운 챌린지입니다. Relief 시리즈의 두 번째 작품입니다.',
            creator: 'PlayerX',
            verifier: 'PlayerX',
            levelId: '16000000',
            views: 50,
            completions: 1,
            attempts: 100,
            videoUrl: 'https://www.youtube.com/embed/relief2_video_url', // 실제 영상 URL로 변경
            imageUrl: './relief_2.png' // 이미지 경로 변경
        },
        {
            id: '102', rank: 3, // Chaos Ship (랭크 조정)
            name: 'Chaos Ship',
            difficulty: 'insane_demon',
            description: '혼란스러운 패턴이 특징인 쉬프 챌린지입니다. 이제 공식 챌린지 목록에 추가되었습니다.',
            creator: 'ShipMaster',
            verifier: 'ChaosV',
            levelId: 'UPCOM002',
            views: 40,
            completions: 0,
            attempts: 0,
            videoUrl: 'https://www.youtube.com/embed/your_chaos_ship_official_video',
            isZre: true,
            zreVideoUrl: 'https://www.youtube.com/embed/chaos_ship_zre_proof_video',
            zreImageUrl: './chaos_ship_zre_proof.png', // 이미지 경로 변경
            imageUrl: './chaos_ship.png' // 이미지 경로 변경
        },
        {
            id: '72591414', rank: 4, // Rebition 2 (랭크 조정)
            name: 'Rebition 2',
            difficulty: 'extreme_demon',
            description: '새롭게 2위로 등극했던 챌린지입니다. 649 어템으로 클리어되었습니다.',
            creator: 'Unknown',
            verifier: 'Unknown',
            levelId: '72591414',
            views: 650,
            completions: 1,
            attempts: 649,
            videoUrl: '',
            imageUrl: './rebition_2.png' // 이미지 경로 변경
        },
        {
            id: '17', rank: 5, // True Sink (오늘 깬 맵)
            name: 'True Sink',
            difficulty: 'hard_demon', // 난이도 추정
            description: '오늘 클리어한 새로운 챌린지입니다. 깊이 가라앉는 듯한 느낌을 줍니다.',
            creator: 'PlayerY',
            verifier: 'PlayerY',
            levelId: '17000000',
            views: 30,
            completions: 1,
            attempts: 80,
            videoUrl: 'https://www.youtube.com/embed/true_sink_video_url', // 실제 영상 URL로 변경
            imageUrl: './true_sink.png' // 이미지 경로 변경
        },
        {
            id: '2', rank: 6, // Gonna Go (랭크 조정)
            name: 'Gonna go',
            difficulty: 'insane_demon',
            description: '매우 높은 순위의 챌린지로, 1125번의 시도 끝에 클리어되었습니다.',
            creator: 'GDMaster',
            verifier: 'OfficialGDV',
            levelId: '11250002',
            views: 2800,
            completions: 3,
            attempts: 1125,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            imageUrl: './gonna_go.png' // 이미지 경로 변경
        },
        {
            id: '7', rank: 7, // Rusttttt (랭크 조정)
            name: 'Rusttttt',
            difficulty: 'hard_demon',
            description: '새롭게 추가된 챌린지입니다. 녹슨 듯한 분위기가 특징입니다.',
            creator: 'NewCreator',
            verifier: 'NewVerifier',
            levelId: '77777777',
            views: 0,
            completions: 0,
            attempts: 0,
            videoUrl: '',
            imageUrl: './rusttttt.png' // 이미지 경로 변경
        },
        {
            id: '8', rank: 8, // Buzori (랭크 조정)
            name: 'Buzori',
            difficulty: 'medium_demon',
            description: '새롭게 추가된 챌린지입니다. 독특한 리듬감이 돋보입니다.',
            creator: 'RhythmMaster',
            verifier: 'SoundPro',
            levelId: '88888888',
            views: 0,
            completions: 0,
            attempts: 0,
            videoUrl: '',
            imageUrl: './buzori.png' // 이미지 경로 변경
        },
        {
            id: '4', rank: 9, // AAAAAAAAAAA (랭크 조정)
            name: 'AAAAAAAAAAAAAAAAAAAAAA',
            difficulty: 'medium_demon',
            description: '445번의 시도 끝에 클리어된 독특한 이름의 챌린지입니다.',
            creator: 'GDFunny',
            verifier: 'RandomVerifier',
            levelId: '04450004',
            views: 1200,
            completions: 8,
            attempts: 445,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            imageUrl: './aaaaaaaaaaa.png' // 이미지 경로 변경
        },
        // Extended List에 포함될 챌린지 (10위부터 19위까지)
        {
            id: '6', rank: 10, // Persephone (랭크 조정, Extended List로 이동)
            name: 'Persephone',
            difficulty: 'extreme_demon',
            description: '새롭게 추가된 익스트림 데몬 챌린지입니다.',
            creator: '레즈',
            verifier: 'GDVerifierPro',
            levelId: '20000006',
            views: 0,
            completions: 0,
            attempts: 0,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            imageUrl: './persephone.png' // 이미지 경로 변경
        },
        {
            id: '3', rank: 11, // Wave Hold (랭크 조정, Extended List로 이동)
            name: 'Wave Hold',
            difficulty: 'hard_demon',
            description: '172번의 시도로 클리어된 챌린지입니다. 웨이브 컨트롤이 중요합니다.',
            creator: 'WavePlayer',
            verifier: 'WaveMasterV',
            levelId: '01720003',
            views: 1500,
            completions: 15,
            attempts: 172,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            imageUrl: './wave_hold.png' // 이미지 경로 변경
        },
        {
            id: '9', rank: 12, // Ship Challenge 10000
            name: 'Ship Challenge 10000',
            difficulty: 'hard_demon',
            description: '10000개의 배 구간을 통과해야 하는 챌린지입니다.',
            creator: 'ShipLover',
            verifier: 'ShipExpert',
            levelId: '10000000',
            views: 0,
            completions: 0,
            attempts: 0,
            videoUrl: '',
            imageUrl: './ship_challenge_10000.png' // 이미지 경로 변경
        },
        {
            id: '10', rank: 13, // Invincible Wave
            name: 'Invincible Wave',
            difficulty: 'insane_demon',
            description: '무적 웨이브를 테마로 한 고난이도 챌린지입니다.',
            creator: 'WaveGod',
            verifier: 'ImmortalV',
            levelId: '99999999',
            views: 0,
            completions: 0,
            attempts: 0,
            videoUrl: '',
            imageUrl: './invincible_wave.png' // 이미지 경로 변경
        },
        {
            id: '11', rank: 14, // Speeeeeeeeeeeeeed
            name: 'Speeeeeeeeeeeeeed',
            difficulty: 'easy_demon',
            description: '매우 빠른 속도감을 자랑하는 챌린지입니다.',
            creator: 'SpeedDemon',
            verifier: 'FastV',
            levelId: '12345678',
            views: 0,
            completions: 0,
            attempts: 0,
            videoUrl: '',
            imageUrl: './speeeeeeeeeeeeeed.png' // 이미지 경로 변경
        },
        {
            id: '12', rank: 15, // Test Challenge Ten (랭크 조정)
            name: 'Test Challenge Ten',
            difficulty: 'easy_demon',
            description: '10위 테스트 챌린지였던 챌린지입니다.',
            creator: 'Test',
            verifier: 'TestV',
            levelId: '10101010',
            views: 10,
            completions: 0,
            attempts: 0,
            videoUrl: '',
            imageUrl: './test_challenge_ten.png' // 이미지 경로 변경
        },
        {
            id: '13', rank: 16, // Test Challenge Eleven (랭크 조정)
            name: 'Test Challenge Eleven',
            difficulty: 'normal',
            description: '11위 테스트 챌린지였던 챌린지입니다.',
            creator: 'Test',
            verifier: 'TestV',
            levelId: '11111111',
            views: 11,
            completions: 0,
            attempts: 0,
            videoUrl: '',
            imageUrl: './test_challenge_eleven.png' // 이미지 경로 변경
        },
        // Legacy List에 포함될 챌린지 (20위부터)
        {
            id: '14', rank: 20,
            name: 'Test Legacy One',
            difficulty: 'easy',
            description: '20위 테스트 레거시 챌린지입니다.',
            creator: 'OldSchool',
            verifier: 'OldV',
            levelId: '20202020',
            views: 5,
            completions: 0,
            attempts: 0,
            videoUrl: '',
            imageUrl: './test_legacy_one.png' // 이미지 경로 변경
        },
        {
            id: '15', rank: 21,
            name: 'Test Legacy Two',
            difficulty: 'normal',
            description: '21위 테스트 레거시 챌린지입니다.',
            creator: 'OldSchool',
            verifier: 'OldV',
            levelId: '21212121',
            views: 6,
            completions: 0,
            attempts: 0,
            videoUrl: '',
            imageUrl: './test_legacy_two.png' // 이미지 경로 변경
        }
    ].sort((a, b) => a.rank - b.rank); // 랭크 기준으로 정렬

    const upcomingChallenges = [
        {
            id: '101',
            name: 'Gonna go FULL',
            difficulty: 'extreme_demon',
            description: '현재 Top 1으로 예상되는 매우 어려운 업커밍 챌린지입니다. 기대해주세요!',
            creator: 'UpcomingDev',
            verifier: 'PendingV',
            levelId: 'UPCOM001',
            views: 50,
            expectedRank: 'Top 1',
            videoUrl: '',
            imageUrl: './gonna_go_full_upcoming.png' // 이미지 경로 변경
        }
    ].sort((a, b) => a.name.localeCompare(b.name));


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
    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || null;
    let users = JSON.parse(localStorage.getItem('users')) || []; // 등록된 사용자 목록

    // 사용자 스코어 관리 (새로 추가)
    // { "user_email": score } 형태로 저장
    let userScores = JSON.parse(localStorage.getItem('userScores')) || {};

    // 임시 업로드 챌린지 데이터
    // 실제 백엔드 연동 시 이 데이터는 백엔드에서 가져와야 합니다.
    let uploadedChallenges = JSON.parse(localStorage.getItem('uploadedChallenges')) || [
        {
            id: 'upl1',
            name: 'My Custom Easy Demon',
            difficulty: 'easy_demon',
            description: '내가 만든 쉬운 데몬 챌린지!',
            creator: 'TestUser',
            verifier: 'GDPro',
            levelId: 'MYLEVEL001',
            views: 100,
            completions: 5,
            attempts: 50,
            videoUrl: '',
            imageUrl: './uploaded_easy_demon.png' // 이미지 경로 변경
        },
        {
            id: 'upl2',
            name: 'Another Hard One',
            difficulty: 'hard_demon',
            description: '매우 어려운 챌린지.',
            creator: 'TestUser',
            verifier: 'ExpertV',
            levelId: 'MYLEVEL002',
            views: 200,
            completions: 1,
            attempts: 300,
            videoUrl: '',
            imageUrl: './uploaded_hard_one.png' // 이미지 경로 변경
        }
    ];

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

    // --- 백엔드에서 제출 기록을 불러오는 함수 (새로 추가) ---
    async function fetchSubmittedRecords(params = {}) {
        let url = `${BACKEND_API_URL}/api/records`;
        const queryParams = new URLSearchParams(params).toString();
        if (queryParams) {
            url += `?${queryParams}`;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const records = await response.json();
            return records;
        } catch (error) {
            console.error('Error fetching submitted records:', error);
            return []; // Return empty array on error
        }
    }

    // --- 내비게이션 바 업데이트 ---
    function updateAuthNavItem() {
        const navMyProfileLink = document.getElementById('nav-my-profile-link');
        const navAuthLink = document.getElementById('nav-auth-link');
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
            if (navAuthLink) {
                navAuthLink.style.display = 'none';
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
            if (navAuthLink) {
                navAuthLink.style.display = 'inline-block';
                navAuthLink.textContent = '로그인/회원가입';
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
        const challengeListContainer = document.getElementById('challenge-list');
        const searchInput = document.getElementById('search-input');
        const difficultyFilter = document.getElementById('difficulty-filter');
        const sortOrder = document.getElementById('sort-order');
        const noResultsMessage = document.querySelector('.no-results');

        function displayChallenges(filteredChallenges) {
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
            // challenge_list.html에서는 1위부터 MAX_RANK_MAIN_LIST (9위)까지의 챌린지만 보여줍니다.
            let currentChallenges = challenges.filter(c => c.rank <= MAX_RANK_MAIN_LIST);

            const searchTerm = searchInput.value.toLowerCase();
            const selectedDifficulty = difficultyFilter.value;
            const selectedSortOrder = sortOrder.value;

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
                    return (difficultyMap[b.difficulty]?.order || 0) - (difficultyMap[a.difficulty]?.order || 0);
                } else if (selectedSortOrder === 'popular') {
                    return (b.views + b.completions) - (a.views + a.completions);
                }
                return 0;
            });

            displayChallenges(currentChallenges);
        }

        searchInput.addEventListener('input', filterAndSortChallenges);
        difficultyFilter.addEventListener('change', filterAndSortChallenges);
        sortOrder.addEventListener('change', filterAndSortChallenges);

        filterAndSortChallenges();

    } else if (currentPage === 'upcoming_challenges.html') {
        const upcomingListContainer = document.getElementById('upcoming-challenge-list');
        const noResultsMessage = document.querySelector('.no-results');
        const loadingMessage = document.querySelector('.loading-message');

        function displayUpcomingChallenges() {
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
        const extendedListContainer = document.getElementById('extended-challenge-list');
        const searchInput = document.getElementById('search-input'); // 추가
        const difficultyFilter = document.getElementById('difficulty-filter'); // 추가
        const sortOrder = document.getElementById('sort-order'); // 추가
        const noResultsMessage = document.querySelector('.no-results');
        const loadingMessage = document.querySelector('.loading-message');

        function displayExtendedChallenges(filteredChallenges) { // 매개변수 추가
            if (loadingMessage) loadingMessage.style.display = 'none';
            if (extendedListContainer) extendedListContainer.innerHTML = '';

            if (filteredChallenges.length === 0) {
                if (noResultsMessage) noResultsMessage.style.display = 'block';
                return;
            } else {
                noResultsMessage.style.display = 'none';
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
            // extended_list.html에서는 MAX_RANK_MAIN_LIST 초과부터 MAX_RANK_EXTENDED_LIST_UPPER_BOUND (19위)까지의 챌린지만 보여줍니다.
            let currentChallenges = challenges.filter(c => c.rank > MAX_RANK_MAIN_LIST && c.rank <= MAX_RANK_EXTENDED_LIST_UPPER_BOUND);

            const searchTerm = searchInput.value.toLowerCase();
            const selectedDifficulty = difficultyFilter.value;
            const selectedSortOrder = sortOrder.value;

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
                    return (difficultyMap[b.difficulty]?.order || 0) - (difficultyMap[a.difficulty]?.order || 0);
                } else if (selectedSortOrder === 'popular') {
                    return (b.views + b.completions) - (a.views + a.completions);
                }
                return 0;
            });

            displayExtendedChallenges(currentChallenges); // 변경된 함수 호출
        }

        // 이벤트 리스너 추가
        if (searchInput) searchInput.addEventListener('input', filterAndSortExtendedChallenges);
        if (difficultyFilter) difficultyFilter.addEventListener('change', filterAndSortExtendedChallenges);
        if (sortOrder) sortOrder.addEventListener('change', filterAndSortExtendedChallenges);

        filterAndSortExtendedChallenges(); // 초기 로드 시 필터링 및 정렬 실행

    } else if (currentPage === 'legacy_list.html') { // Legacy List 페이지 로직
        const legacyListContainer = document.getElementById('legacy-challenge-list');
        const noResultsMessage = document.querySelector('.no-results');
        const loadingMessage = document.querySelector('.loading-message');

        function displayLegacyChallenges() {
            if (loadingMessage) loadingMessage.style.display = 'none';
            if (legacyListContainer) legacyListContainer.innerHTML = '';

            // 20위 이상 챌린지만 필터링
            const filteredChallenges = challenges.filter(c => c.rank > MAX_RANK_EXTENDED_LIST_UPPER_BOUND);

            if (filteredChallenges.length === 0) {
                if (noResultsMessage) noResultsMessage.style.display = 'block';
                return;
            } else {
                noResultsMessage.style.display = 'none';
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
                        <p><strong>조회수:</strong> ${foundChallenge.views}</p>
                        <p><strong>클리어 수:</strong> ${foundChallenge.completions || 0}</p>
                        <div class="challenge-detail-image">
                            <img src="${challengeDetailImageUrl}" alt="${foundChallenge.name} 이미지">
                        </div>
                    </div>
                    ${videoHtml}
                    ${foundChallenge.isZre ? `
                        <div class="detail-item zre-challenge-info">
                            <h3>ZRE 챌린지 정보</h3>
                            <p>이 챌린지는 ZRE 인증이 필요합니다. ZRE 인증은 특정 조건을 만족하는 클리어 기록에만 부여됩니다.</p>
                            ${foundChallenge.zreVideoUrl ? `<p><strong>ZRE 증명 영상:</strong> <a href="${foundChallenge.zreVideoUrl}" target="_blank">${foundChallenge.zreVideoUrl}</a></p>` : ''}
                            ${foundChallenge.zreImageUrl ? `<img src="${foundChallenge.zreImageUrl}" alt="ZRE 증명 이미지" class="zre-proof-image">` : ''}
                        </div>
                    ` : ''}
                    ${submitButtonHtml}

                    <section class="records-section">
                        <h3>클리어 기록</h3>
                        <div id="records-list-container" class="records-grid">
                            <p class="loading-message">기록을 불러오는 중...</p>
                        </div>
                    </section>
                `;
                // 레벨 ID 복사 버튼 이벤트 리스너 재등록
                challengeDetailContent.querySelector('.copy-btn')?.addEventListener('click', (event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    copyToClipboard(event.target.dataset.id, event.target);
                });
            }

            // 클리어 기록 표시 (백엔드에서 데이터 불러오기)
            const recordsListContainer = document.getElementById('records-list-container');
            async function displayChallengeRecords() {
                if (recordsListContainer) recordsListContainer.innerHTML = '<p class="loading-message">기록을 불러오는 중...</p>'; // Show loading message

                try {
                    const challengeRecords = await fetchSubmittedRecords({ challengeId: foundChallenge.id }); // Assuming backend can filter by challengeId

                    if (recordsListContainer) recordsListContainer.innerHTML = ''; // Clear loading message

                    if (challengeRecords.length === 0) {
                        if (recordsListContainer) recordsListContainer.innerHTML = '<p class="no-results-message">아직 제출된 클리어 기록이 없습니다.</p>';
                    } else {
                        challengeRecords.forEach(record => {
                            const recordCard = document.createElement('div');
                            recordCard.classList.add('record-card');
                            recordCard.innerHTML = `
                                <div class="record-header">
                                    <strong>${record.submitter || '알 수 없는 제출자'}</strong>
                                    ${record.isZre ? '<span class="zre-badge">ZRE 인증</span>' : ''}
                                </div>
                                <p class="record-comment">${record.comment || '제출된 기록입니다.'}</p>
                                ${record.videoUrl ? `<div class="record-video"><a href="${record.videoUrl}" target="_blank">영상 보기</a></div>` : ''}
                                ${record.recordImageUrl ? `<img src="${BACKEND_API_URL}${record.recordImageUrl}" alt="클리어 기록 이미지" class="record-thumbnail">` : ''}
                                ${record.isZre && record.zreVideoUrl ? `<div class="record-video"><a href="${record.zreVideoUrl}" target="_blank">ZRE 증명 영상 보기</a></div>` : ''}
                                ${record.isZre && record.zreImageUrl ? `<img src="${BACKEND_API_URL}${record.zreImageUrl}" alt="ZRE 증명 이미지" class="record-thumbnail">` : ''}
                            `;
                            recordsListContainer.appendChild(recordCard);
                        });
                    }
                } catch (error) {
                    console.error('Failed to display challenge records:', error);
                    if (recordsListContainer) {
                        recordsListContainer.innerHTML = '<p class="error-message">기록을 불러오는 데 실패했습니다. 다시 시도해주세요.</p>';
                    }
                }
            }
            displayChallengeRecords();

        } else {
            if (challengeDetailContent) challengeDetailContent.innerHTML = '<p class="error-message">챌린지를 찾을 수 없습니다.</p>';
            if (detailPageTitle) detailPageTitle.textContent = '챌린지 상세';
        }

    } else if (currentPage === 'upload_challenge.html') {
        const uploadChallengeForm = document.getElementById('upload-challenge-form');

        if (uploadChallengeForm) {
            // 현재 로그인된 사용자를 제작자로 자동 설정
            const creatorInput = document.getElementById('creator');
            if (creatorInput && loggedInUser) {
                creatorInput.value = loggedInUser.nickname;
                creatorInput.readOnly = true; // 사용자가 변경하지 못하도록
            }

            uploadChallengeForm.addEventListener('submit', async (event) => {
                event.preventDefault();

                const formData = new FormData();
                formData.append('name', document.getElementById('challenge-name').value);
                formData.append('difficulty', document.getElementById('difficulty').value);
                formData.append('description', document.getElementById('description').value);
                formData.append('creator', document.getElementById('creator').value);
                formData.append('verifier', document.getElementById('verifier').value);
                formData.append('levelId', document.getElementById('level-id').value);
                formData.append('videoUrl', document.getElementById('video-url').value);

                const imageFile = document.getElementById('image-upload').files[0];
                if (imageFile) {
                    formData.append('image', imageFile);
                }

                try {
                    const response = await fetch(`${BACKEND_API_URL}/api/challenges`, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('authToken')}` // 인증 토큰 추가
                        }
                    });

                    if (response.ok) {
                        alert('챌린지가 성공적으로 업로드되었습니다!');
                        uploadChallengeForm.reset(); // 폼 초기화
                        // 선택적으로 챌린지 목록 페이지로 리다이렉트
                        window.location.href = 'challenge_list.html';
                    } else {
                        const errorData = await response.json();
                        alert(`챌린지 업로드 실패: ${errorData.message || response.statusText}`);
                    }
                } catch (error) {
                    console.error('Error uploading challenge:', error);
                    alert('챌린지 업로드 중 오류가 발생했습니다.');
                }
            });
        }
    } else if (currentPage === 'submit_record.html') {
        const recordSubmitForm = document.getElementById('record-submit-form');
        const challengeId = urlParams.get('challengeId');
        const challengeNameElement = document.getElementById('challenge-name-display');

        // 제출할 챌린지 정보 표시
        const challengeToSubmit = challenges.find(c => c.id === challengeId) || upcomingChallenges.find(c => c.id === challengeId);
        if (challengeToSubmit) {
            challengeNameElement.textContent = challengeToSubmit.name;
        } else {
            challengeNameElement.textContent = '알 수 없는 챌린지';
            // 챌린지를 찾을 수 없으면 폼 비활성화
            if (recordSubmitForm) recordSubmitForm.style.display = 'none';
            alert('기록을 제출할 챌린지를 찾을 수 없습니다.');
            return;
        }

        if (recordSubmitForm) {
            // 로그인된 사용자가 제출자로 자동 설정
            const submitterInput = document.getElementById('submitter');
            if (submitterInput && loggedInUser) {
                submitterInput.value = loggedInUser.nickname;
                submitterInput.readOnly = true;
            }

            recordSubmitForm.addEventListener('submit', async (event) => {
                event.preventDefault();

                if (!loggedInUser) {
                    alert('로그인이 필요합니다.');
                    window.location.href = 'auth.html';
                    return;
                }

                const formData = new FormData();
                formData.append('challengeId', challengeId);
                formData.append('challengeName', challengeToSubmit.name); // 챌린지 이름도 함께 제출
                formData.append('submitterEmail', loggedInUser.email); // 이메일로 제출자 식별
                formData.append('submitter', loggedInUser.nickname); // 닉네임도 함께 제출
                formData.append('comment', document.getElementById('record-comment').value);
                formData.append('videoUrl', document.getElementById('video-url').value);
                formData.append('isZre', document.getElementById('is-zre').checked);
                formData.append('zreVideoUrl', document.getElementById('zre-video-url').value);

                const recordImage = document.getElementById('record-image').files[0];
                if (recordImage) {
                    formData.append('recordImage', recordImage);
                }
                const zreImage = document.getElementById('zre-image').files[0];
                if (zreImage) {
                    formData.append('zreImage', zreImage);
                }

                try {
                    const response = await fetch(`${BACKEND_API_URL}/api/records`, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('authToken')}` // 인증 토큰 추가
                        }
                    });

                    if (response.ok) {
                        alert('기록이 성공적으로 제출되었습니다!');
                        recordSubmitForm.reset(); // 폼 초기화
                        // 제출 후 상세 페이지로 이동. 이 리다이렉션 시점에 상세 페이지는 백엔드에서 기록을 다시 불러올 것입니다.
                        window.location.href = `challenge_detail.html?id=${challengeId}`;
                    } else {
                        const errorData = await response.json();
                        alert(`기록 제출 실패: ${errorData.message || response.statusText}`);
                    }
                } catch (error) {
                    console.error('Error submitting record:', error);
                    alert('기록 제출 중 오류가 발생했습니다.');
                }
            });
        }

        // ZRE 인증 체크박스에 따라 ZRE 관련 필드 표시/숨김
        const isZreCheckbox = document.getElementById('is-zre');
        const zreFields = document.getElementById('zre-fields');

        if (isZreCheckbox && zreFields) {
            isZreCheckbox.addEventListener('change', () => {
                zreFields.style.display = isZreCheckbox.checked ? 'block' : 'none';
            });
            // 초기 상태 설정
            zreFields.style.display = isZreCheckbox.checked ? 'block' : 'none';
        }
    } else if (currentPage === 'auth.html') {
        // ... (인증 관련 기존 로직) ...
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const showRegisterLink = document.getElementById('show-register');
        const showLoginLink = document.getElementById('show-login');

        // 회원가입 폼 표시
        if (showRegisterLink && loginForm && registerForm) {
            showRegisterLink.addEventListener('click', (e) => {
                e.preventDefault();
                loginForm.style.display = 'none';
                registerForm.style.display = 'block';
            });
        }

        // 로그인 폼 표시
        if (showLoginLink && loginForm && registerForm) {
            showLoginLink.addEventListener('click', (e) => {
                e.preventDefault();
                loginForm.style.display = 'block';
                registerForm.style.display = 'none';
            });
        }

        if (registerForm) {
            registerForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const nickname = document.getElementById('register-nickname').value;
                const email = document.getElementById('register-email').value;
                const password = document.getElementById('register-password').value;

                try {
                    const response = await fetch(`${BACKEND_API_URL}/api/register`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ nickname, email, password })
                    });

                    if (response.ok) {
                        alert('회원가입이 성공적으로 완료되었습니다! 로그인 해주세요.');
                        registerForm.reset();
                        // 회원가입 후 로그인 폼으로 전환
                        if (loginForm && registerForm) {
                            loginForm.style.display = 'block';
                            registerForm.style.display = 'none';
                        }
                    } else {
                        const errorData = await response.json();
                        alert(`회원가입 실패: ${errorData.message || response.statusText}`);
                    }
                } catch (error) {
                    console.error('Error during registration:', error);
                    alert('회원가입 중 오류가 발생했습니다.');
                }
            });
        }

        if (loginForm) {
            loginForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;

                try {
                    const response = await fetch(`${BACKEND_API_URL}/api/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email, password })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        loggedInUser = { email: data.email, nickname: data.nickname };
                        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
                        localStorage.setItem('authToken', data.token); // 토큰 저장

                        alert('로그인 성공!');
                        window.location.href = 'index.html'; // 로그인 후 메인 페이지로 이동
                    } else {
                        const errorData = await response.json();
                        alert(`로그인 실패: ${errorData.message || response.statusText}`);
                    }
                } catch (error) {
                    console.error('Error during login:', error);
                    alert('로그인 중 오류가 발생했습니다.');
                }
            });
        }

    } else if (currentPage === 'creator_page.html') {
        const creatorListContainer = document.getElementById('creator-list');
        const searchInput = document.getElementById('search-input'); // 검색창 추가
        const noResultsMessage = document.querySelector('.no-results');

        function displayCreators(filteredCreators) {
            if (creatorListContainer) creatorListContainer.innerHTML = '';
            if (filteredCreators.length === 0) {
                if (noResultsMessage) noResultsMessage.style.display = 'block';
            } else {
                if (noResultsMessage) noResultsMessage.style.display = 'none';
                filteredCreators.forEach(creator => {
                    const creatorCard = document.createElement('div');
                    creatorCard.classList.add('creator-card');
                    creatorCard.innerHTML = `
                        <h3>${creator}</h3>
                        <p>이 크리에이터가 만든 챌린지 정보를 여기에 표시할 수 있습니다.</p>
                        <button class="view-creator-challenges-btn button-secondary" data-creator-name="${creator}">챌린지 보기</button>
                    `;
                    if (creatorListContainer) creatorListContainer.appendChild(creatorCard);
                });

                document.querySelectorAll('.view-creator-challenges-btn').forEach(button => {
                    button.addEventListener('click', (event) => {
                        const creatorName = event.target.dataset.creatorName;
                        // 해당 크리에이터의 챌린지를 보여주는 페이지로 이동 또는 모달 띄우기
                        alert(`${creatorName}의 챌린지 목록을 표시하는 로직이 필요합니다.`);
                        // 예: window.location.href = `challenges_by_creator.html?creator=${encodeURIComponent(creatorName)}`;
                    });
                });
            }
        }

        function filterCreators() {
            const searchTerm = searchInput.value.toLowerCase();
            let filtered = creators;

            if (searchTerm) {
                filtered = creators.filter(creator =>
                    creator.toLowerCase().includes(searchTerm)
                );
            }
            displayCreators(filtered);
        }

        if (searchInput) {
            searchInput.addEventListener('input', filterCreators);
        }
        filterCreators(); // 초기 로드 시 크리에이터 목록 표시
    } else if (currentPage === 'user_scores.html') {
        const userScoresListContainer = document.getElementById('user-scores-list-container');
        const noScoresMessage = document.querySelector('.no-scores');

        function displayUserScores() {
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
});
