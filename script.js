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

    // 임시 제출 기록 (모든 챌린지 클리어 기록, 사진 포함)
    // 실제 백엔드 연동 시 이 데이터는 백엔드에서 가져와야 합니다.
    let submittedRecords = JSON.parse(localStorage.getItem('submittedRecords')) || [
        { id: 'rec1', challengeId: '1', challengeName: 'The Hell Challenge', videoUrl: 'https://www.youtube.com/embed/2X_2IdXT_gE', recordImageUrl: './the_hell_challenge_clear.png', comment: '간신히 깼습니다!', submitter: 'NormalUser', isZre: false, zreVideoUrl: '', zreImageUrl: '' },
        { id: 'rec2', challengeId: '1', challengeName: 'The Hell Challenge', videoUrl: 'https://www.youtube.com/embed/3Y_pP4sVdss', recordImageUrl: './the_hell_challenge_zre.png', comment: '제가 Zre입니다! 확인해주세요!', submitter: 'ZreKing', isZre: true, zreVideoUrl: 'https://www.youtube.com/embed/zure_proof_video', zreImageUrl: './the_hell_challenge_zre_proof.png' },
        { id: 'rec3', challengeId: '3', challengeName: 'Wave Hold', videoUrl: 'https://www.youtube.com/embed/4W_pP4sVdss', recordImageUrl: './wave_hold_clear.png', comment: '깔끔하게 클리어!', submitter: 'WavePro', isZre: false, zreVideoUrl: '', zreImageUrl: '' },
        { id: 'rec4', challengeId: '2', challengeName: 'Gonna go', videoUrl: 'https://www.youtube.com/embed/g_H2rUqL1qE0', recordImageUrl: './gonna_go_clear.png', comment: '간신히 통과! 다음 레벨로!', submitter: 'FastRunner', isZre: false, zreVideoUrl: '', zreImageUrl: '' },
        // Chaos Ship Zre 인증 기록 추가
        { id: 'rec5', challengeId: '102', challengeName: 'Chaos Ship', videoUrl: 'https://www.youtube.com/embed/chaos_ship_clear_video', recordImageUrl: './chaos_ship_clear.png', comment: 'Chaos Ship Zre 인증 클리어!', submitter: 'ZreMaster', isZre: true, zreVideoUrl: 'https://www.youtube.com/embed/chaos_ship_zre_proof_video', zreImageUrl: './chaos_ship_zre_proof.png' },
        { id: 'rec6', challengeId: '72591414', challengeName: 'Rebition 2', videoUrl: 'https://www.youtube.com/embed/rebition2_clear_video', recordImageUrl: './rebition2_clear.png', comment: 'Rebition 2 클리어!', submitter: 'RebitionPlayer', isZre: false, zreVideoUrl: '', zreImageUrl: '' },
        { id: 'rec7', challengeId: '16', challengeName: 'Relief 2', videoUrl: 'https://www.youtube.com/embed/relief2_sample_video', recordImageUrl: './relief2_clear.png', comment: 'Relief 2 클리어!', submitter: 'PlayerX', isZre: false, zreVideoUrl: '', zreImageUrl: '' },
        { id: 'rec8', challengeId: '17', challengeName: 'True Sink', videoUrl: 'https://www.youtube.com/embed/true_sink_sample_video', recordImageUrl: './true_sink_clear.png', comment: 'True Sink 클리어!', submitter: 'PlayerY', isZre: false, zreVideoUrl: '', zreImageUrl: '' }
    ];

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
            // 모든 챌린지를 보여주도록 필터링 조건을 제거했습니다.
            let currentChallenges = challenges; // 이 줄을 수정했습니다.

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
        // 로그인 여부 확인
        if (!loggedInUser) {
            alert('챌린지를 업로드하려면 로그인이 필요합니다.');
            window.location.href = 'auth.html';
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
        if (!loggedInUser) {
            alert('프로필을 보려면 로그인이 필요합니다.');
            window.location.href = 'auth.html';
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


        const userSubmittedRecords = submittedRecords.filter(r => r.submitter === loggedInUser.nickname);

        if (submittedRecordsList) {
            if (userSubmittedRecords.length > 0) {
                submittedRecordsList.innerHTML = '';
                userSubmittedRecords.forEach(record => {
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


        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                loggedInUser = null;
                localStorage.removeItem('loggedInUser');
                localStorage.removeItem('authToken'); // 토큰도 제거
                alert('로그아웃 되었습니다.');
                window.location.href = 'index.html';
            });
        }


    } else if (currentPage === 'auth.html') {
        const authHeading = document.getElementById('auth-heading');
        const authButton = document.getElementById('auth-button');
        const switchAuthModeLink = document.getElementById('switch-auth-mode');
        const nicknameGroup = document.getElementById('nickname-group');
        const authForm = document.getElementById('auth-form');
        const authPageTitle = document.getElementById('auth-page-title');

        let isLoginMode = true; // 초기 모드: 로그인

        if (loggedInUser) {
            alert('이미 로그인되어 있습니다. 프로필 페이지로 이동합니다.');
            window.location.href = 'my_profile.html';
            return;
        }

        function updateAuthMode() {
            if (authHeading) authHeading.textContent = isLoginMode ? '로그인' : '회원가입';
            if (authButton) authButton.textContent = isLoginMode ? '로그인' : '회원가입';
            if (document.getElementById('switch-text')) {
                document.getElementById('switch-text').innerHTML = isLoginMode ?
                    '계정이 없으신가요? <a href="#" id="switch-auth-mode">회원가입</a>' :
                    '이미 계정이 있으신가요? <a href="#" id="switch-auth-mode">로그인</a>';
            }
            if (nicknameGroup) nicknameGroup.style.display = isLoginMode ? 'none' : 'block';
            if (authPageTitle) authPageTitle.textContent = isLoginMode ? '로그인' : '회원가입';

            const authNicknameInput = document.getElementById('auth-nickname');
            if (authNicknameInput) {
                if (isLoginMode) {
                    authNicknameInput.removeAttribute('required');
                } else {
                    authNicknameInput.setAttribute('required', 'required');
                }
            }

            // 스위치 링크 이벤트 리스너는 항상 재등록
            if (document.getElementById('switch-auth-mode')) {
                document.getElementById('switch-auth-mode').addEventListener('click', (e) => {
                    e.preventDefault();
                    isLoginMode = !isLoginMode;
                    updateAuthMode();
                });
            }
        }

        updateAuthMode();

        if (authForm) {
            authForm.addEventListener('submit', async (event) => { // async 키워드 추가
                event.preventDefault();
                const email = document.getElementById('auth-email').value;
                const password = document.getElementById('auth-password').value;
                const nickname = document.getElementById('auth-nickname').value;

                let apiUrl = '';
                let requestBody = {};

                if (isLoginMode) {
                    apiUrl = `${BACKEND_API_URL}/api/login`;
                    requestBody = { email, password };
                } else {
                    apiUrl = `${BACKEND_API_URL}/api/signup`;
                    requestBody = { nickname, email, password };
                }

                try {
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestBody),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        alert(data.message);
                        if (isLoginMode) {
                            loggedInUser = data.user;
                            // authToken은 백엔드에서 받아오므로, 로컬 스토리지에 저장
                            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
                            localStorage.setItem('authToken', data.token); // 토큰 저장
                            updateAuthNavItem();
                            window.location.href = 'my_profile.html';
                        } else {
                            // 회원가입 성공 후, users 배열에 추가 (데모용 로컬 스토리지 유지)
                            const newUser = { email, password, nickname };
                            users.push(newUser);
                            localStorage.setItem('users', JSON.stringify(users));

                            isLoginMode = true;
                            updateAuthMode();
                            authForm.reset();
                        }
                    } else {
                        alert(`오류: ${data.message || '알 수 없는 오류가 발생했습니다.'}`);
                    }
                } catch (error) {
                    console.error('네트워크 또는 서버 통신 오류:', error);
                    alert('서버와 통신하는 중 오류가 발생했습니다. 서버가 실행 중인지 확인해주세요.');
                }
            });
        }


    } else if (currentPage === 'submit_record.html') {
        if (!loggedInUser) {
            alert('기록을 제출하려면 로그인이 필요합니다.');
            window.location.href = 'auth.html';
            return;
        }

        const challengeIdToSubmit = urlParams.get('challengeId');
        const recordChallengeInfo = document.getElementById('record-challenge-info');
        const submitRecordForm = document.getElementById('submit-record-form');
        const recordNotFound = document.getElementById('record-not-found');
        const submitRecordHeading = document.getElementById('submit-record-heading');
        const submitPageTitle = document.getElementById('submit-page-title');

        const isZreCheckbox = document.getElementById('is-zre-verified');
        const zreProofFields = document.getElementById('zre-proof-fields');
        const recordImageUrlInput = document.getElementById('record-image-url');

        if (isZreCheckbox) {
            isZreCheckbox.addEventListener('change', () => {
                if (isZreCheckbox.checked) {
                    zreProofFields.style.display = 'block';
                } else {
                    zreProofFields.style.display = 'none';
                    document.getElementById('zre-video-url').value = '';
                    document.getElementById('zre-image-url').value = '';
                }
            });
        }

        const targetChallenge = challenges.find(c => c.id === challengeIdToSubmit);

        if (targetChallenge) {
            if (submitRecordHeading) submitRecordHeading.textContent = `${targetChallenge.name} - 기록 제출`;
            if (submitPageTitle) submitPageTitle.textContent = `기록 제출 - ${targetChallenge.name}`;
            if (recordChallengeInfo) {
                recordChallengeInfo.innerHTML = `
                    <p><strong>챌린지 이름:</strong> ${targetChallenge.name}</p>
                    <p><strong>난이도:</strong> <span class="${difficultyMap[targetChallenge.difficulty].class}">${difficultyMap[targetChallenge.difficulty].name}</span></p>
                    <p><strong>레벨 ID:</strong> ${targetChallenge.levelId}</p>
                `;
            }
            if (submitRecordForm) submitRecordForm.style.display = 'block';

            if (submitRecordForm) {
                submitRecordForm.addEventListener('submit', async (event) => { // async 키워드 유지
                    event.preventDefault();
                    const recordVideoUrl = document.getElementById('record-video-url').value;
                    const recordImageUrl = recordImageUrlInput.value;
                    const recordComment = document.getElementById('record-comment').value;
                    const isZre = document.getElementById('is-zre-verified').checked;
                    const zreVideoUrl = document.getElementById('zre-video-url').value;
                    const zreImageUrl = document.getElementById('zre-image-url').value;

                    if (!recordVideoUrl) {
                        alert('플레이 영상 URL을 입력해주세요.');
                        return;
                    }

                    if (isZre && (!zreVideoUrl && !zreImageUrl)) {
                        alert('Zre 인증 시에는 인증 영상 또는 인증 사진 중 하나를 반드시 입력해야 합니다.');
                        return;
                    }

                    const newRecord = {
                        // id: 'rec' + (submittedRecords.length + 1), // 백엔드에서 ID 생성
                        challengeId: targetChallenge.id,
                        challengeName: targetChallenge.name,
                        videoUrl: recordVideoUrl,
                        recordImageUrl: recordImageUrl, // 로컬 경로 그대로 사용
                        comment: recordComment,
                        submitter: loggedInUser.nickname,
                        date: new Date().toLocaleDateString('ko-KR'), // 백엔드에서 생성하는 것이 더 정확
                        isZre: isZre,
                        zreVideoUrl: zreVideoUrl,
                        zreImageUrl: zreImageUrl // 로컬 경로 그대로 사용
                    };

                    // 백엔드 API를 통해 기록을 제출
                    try {
                        const authToken = localStorage.getItem('authToken'); // 저장된 토큰 가져오기
                        const response = await fetch(`${BACKEND_API_URL}/api/records`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${authToken}` // 인증 토큰 포함
                            },
                            body: JSON.stringify(newRecord),
                        });
                        const data = await response.json();
                        if (response.ok) {
                            alert(data.message);
                            // 백엔드에서 반환된 기록을 임시 배열에 추가 (실제 앱에서는 백엔드에서 모든 기록을 다시 가져와야 함)
                            submittedRecords.push(data.record);
                            localStorage.setItem('submittedRecords', JSON.stringify(submittedRecords)); // 데모용 로컬 저장

                            // 사용자 스코어 업데이트 (로컬 스토리지 기반 유지)
                            const scoreEarned = getScoreByRank(targetChallenge.rank);
                            if (loggedInUser && loggedInUser.email) {
                                userScores[loggedInUser.email] = (userScores[loggedInUser.email] || 0) + scoreEarned;
                                localStorage.setItem('userScores', JSON.stringify(userScores));
                                alert(`${targetChallenge.name} 챌린지 기록이 성공적으로 제출되었습니다! (+${scoreEarned}점)`);
                            } else {
                                alert(`${targetChallenge.name} 챌린지 기록이 성공적으로 제출되었습니다!`);
                            }

                            console.log('새 기록:', data.record);
                            console.log('업데이트된 사용자 스코어:', userScores);

                            submitRecordForm.reset();
                            zreProofFields.style.display = 'none';
                            isZreCheckbox.checked = false;
                            window.location.href = `challenge_detail.html?id=${targetChallenge.id}`;
                        } else {
                            alert(`기록 제출 실패: ${data.message || '알 수 없는 오류가 발생했습니다.'}`);
                        }
                    } catch (error) {
                        console.error('기록 제출 오류:', error);
                        alert('기록 제출 중 오류가 발생했습니다. 서버가 실행 중인지 확인해주세요.');
                    }
                });
            }

        } else {
            if (recordChallengeInfo) recordChallengeInfo.style.display = 'none';
            if (submitRecordForm) submitRecordForm.style.display = 'none';
            if (recordNotFound) recordNotFound.style.display = 'block';
            if (submitPageTitle) submitPageTitle.textContent = `기록 제출 오류`;
        }
    } else if (currentPage === 'creator_page.html') {
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
        const userScoresListContainer = document.getElementById('user-scores-list');
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
                if (noScoresMessage) noScoresMessage.style.display = 'none';
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
