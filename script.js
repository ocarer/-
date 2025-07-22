document.addEventListener('DOMContentLoaded', () => {
    // 백엔드 API의 기본 URL을 정의합니다.
    // 실제 배포 시에는 백엔드 서버의 실제 도메인으로 변경해야 합니다.
    const BACKEND_API_URL = 'https://당신의-vercel-백엔드-도메인.vercel.app'; // <--- 이 부분을 Vercel에서 발급받은 URL로 변경하세요!

    // 챌린지 데이터 (업커밍 챌린지 분리)
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
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
        },
        // Chaos Ship (업커밍에서 일반 챌린지로 이동, 2등, 즈레 인증 추가)
        {
            id: '102', rank: 2, // 기존 upcoming ID 유지, 새로운 랭크
            name: 'Chaos Ship',
            difficulty: 'insane_demon',
            description: '혼란스러운 패턴이 특징인 쉬프 챌린지입니다. 이제 공식 챌린지 목록에 추가되었습니다.',
            creator: 'ShipMaster',
            verifier: 'ChaosV',
            levelId: 'UPCOM002',
            views: 40,
            completions: 0, // 챌린지로 이동 시 초기 완료/시도 횟수는 0으로 설정
            attempts: 0,
            videoUrl: 'https://www.youtube.com/embed/your_chaos_ship_official_video', // 공식 영상 URL (필요시 업데이트)
            isZre: true, // 즈레 인증됨
            zreVideoUrl: 'https://www.youtube.com/embed/chaos_ship_zre_proof_video', // 즈레 인증 영상 예시
            zreImageUrl: 'https://placehold.co/300x200/000/FFF?text=Chaos+Ship+Zre+Proof' // 즈레 인증 이미지 예시
        },
        // Persephone (새로운 챌린지 추가, 3등)
        {
            id: '6', rank: 3, // 새로운 ID, 요청된 랭크
            name: 'Persephone',
            difficulty: 'extreme_demon',
            description: '새롭게 추가된 익스트림 데몬 챌린지입니다.', // 설명 추가
            creator: '레즈',
            verifier: 'GDVerifierPro',
            levelId: '20000006', // 중복되지 않는 새로운 레벨 ID
            views: 0, // 초기 조회수
            completions: 0, // 초기 완료 횟수
            attempts: 0, // 초기 시도 횟수
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // 예시 유튜브 링크
        },
        {
            id: '2', rank: 4, // 기존 'Gonna go' 랭크 조정
            name: 'Gonna go',
            difficulty: 'insane_demon',
            description: '매우 높은 순위의 챌린지로, 1125번의 시도 끝에 클리어되었습니다.',
            creator: 'GDMaster',
            verifier: 'OfficialGDV',
            levelId: '11250002',
            views: 2800,
            completions: 3,
            attempts: 1125,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
        },
        {
            id: '3', rank: 5, // 기존 'Wave Hold' 랭크 조정
            name: 'Wave Hold',
            difficulty: 'hard_demon',
            description: '172번의 시도로 클리어된 챌린지입니다. 웨이브 컨트롤이 중요합니다.',
            creator: 'WavePlayer',
            verifier: 'WaveMasterV',
            levelId: '01720003',
            views: 1500,
            completions: 15,
            attempts: 172,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
        },
        {
            id: '4', rank: 6, // 기존 'AAAAAAAAAAAAAAAAAAAAAA' 랭크 조정
            name: 'AAAAAAAAAAAAAAAAAAAAAA',
            difficulty: 'medium_demon',
            description: '445번의 시도 끝에 클리어된 독특한 이름의 챌린지입니다.',
            creator: 'GDFunny',
            verifier: 'RandomVerifier',
            levelId: '04450004',
            views: 1200,
            completions: 8,
            attempts: 445,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
        },
        {
            id: '5', rank: 7, // 기존 'Unnamed 0' 랭크 조정
            name: 'Unnamed 0',
            difficulty: 'easy_demon',
            description: '264번의 시도로 클리어된 챌린지입니다. 심플하지만 난이도가 있습니다.',
            creator: 'MysteryPlayer',
            verifier: 'TheUnnamer',
            levelId: '02640005',
            views: 900,
            completions: 12,
            attempts: 264,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
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
            videoUrl: ''
        },
        // id: '102' Chaos Ship은 challenges 배열로 이동했으므로 여기서는 제거됩니다.
        {
            id: '103',
            name: 'Quantum on track',
            difficulty: 'extreme_demon',
            description: 'Top 1으로 예상되는 새로운 트랙 기반 챌린지입니다. 곧 공개됩니다!',
            creator: 'TrackBuilder',
            verifier: 'QuantumV',
            levelId: 'UPCOM003',
            views: 30,
            expectedRank: 'Top 1',
            videoUrl: ''
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

    // --- 가상의 사용자 데이터 및 세션 관리 (백엔드 연동) ---
    // 로그인된 사용자 정보와 JWT 토큰을 localStorage에서 가져옵니다.
    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || null;
    let authToken = localStorage.getItem('authToken') || null;

    // 임시 제출 기록 (모든 챌린지 클리어 기록, 사진 포함)
    // 이 데이터는 백엔드와 연동될 때 서버에서 가져오고 저장해야 합니다.
    let submittedRecords = JSON.parse(localStorage.getItem('submittedRecords')) || [
        { id: 'rec1', challengeId: '1', challengeName: 'The Hell Challenge', videoUrl: 'https://www.youtube.com/embed/2X_2IdXT_gE', recordImageUrl: 'https://via.placeholder.com/200x150?text=Clear+Image+1', comment: '간신히 깼습니다!', submitter: 'NormalUser', isZre: false, zreVideoUrl: '', zreImageUrl: '' },
        { id: 'rec2', challengeId: '1', challengeName: 'The Hell Challenge', videoUrl: 'https://www.youtube.com/embed/3Y_pP4sVdss', recordImageUrl: 'http://googleusercontent.com/file_content/10', comment: '제가 Zre입니다! 확인해주세요!', submitter: 'ZreKing', isZre: true, zreVideoUrl: 'https://www.youtube.com/embed/zure_proof_video', zreImageUrl: 'https://via.placeholder.com/300x200?text=Zre+Proof+Image' },
        { id: 'rec3', challengeId: '3', challengeName: 'Wave Hold', videoUrl: 'https://www.youtube.com/embed/4W_pP4sVdss', recordImageUrl: 'https://via.placeholder.com/200x150?text=Clear+Image+3', comment: '깔끔하게 클리어!', submitter: 'WavePro', isZre: false, zreVideoUrl: '', zreImageUrl: '' },
        { id: 'rec4', challengeId: '2', challengeName: 'Gonna go', videoUrl: 'https://www.youtube.com/embed/g_H2rUqL1qE0', recordImageUrl: 'https://via.placeholder.com/200x150?text=Gonna+go+Clear', comment: '간신히 통과! 다음 레벨로!', submitter: 'FastRunner', isZre: false, zreVideoUrl: '', zreImageUrl: '' },
        // Chaos Ship Zre 인증 기록 추가
        { id: 'rec5', challengeId: '102', challengeName: 'Chaos Ship', videoUrl: 'https://www.youtube.com/embed/chaos_ship_clear_video', recordImageUrl: 'https://placehold.co/200x150/000/FFF?text=Chaos+Ship+Clear', comment: 'Chaos Ship Zre 인증 클리어!', submitter: 'ZreMaster', isZre: true, zreVideoUrl: 'https://www.youtube.com/embed/chaos_ship_zre_proof_video', zreImageUrl: 'https://placehold.co/300x200/000/FFF?text=Chaos+Ship+Zre+Proof' }
    ];

    // 임시 업로드 챌린지 데이터
    // 이 데이터도 백엔드와 연동될 때 서버에서 가져오고 저장해야 합니다.
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
            videoUrl: ''
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
            videoUrl: ''
        }
    ];


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

    // --- 내비게이션 바 업데이트 ---
    function updateAuthNavItem() {
        const navMyProfileLink = document.getElementById('nav-my-profile-link');
        const navAuthLink = document.getElementById('nav-auth-link');
        const navLogoutButton = document.getElementById('nav-logout-button');

        if (loggedInUser && authToken) { // 토큰도 함께 확인
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
                    authToken = null;
                    localStorage.removeItem('loggedInUser');
                    localStorage.removeItem('authToken');
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
    }
    updateAuthNavItem(); // 페이지 로드 시 내비게이션 바 업데이트

    // --- 페이지별 로직 ---

    // --- 메인 페이지 로직 (`index.html`) ---
    if (currentPage === 'index.html' || currentPage === '') {
        const topChallengesContainer = document.getElementById('top-challenges-container');
        const upcomingChallengesContainer = document.getElementById('upcoming-challenges-container');

        if (topChallengesContainer) {
            topChallengesContainer.innerHTML = '';
            challenges.slice(0, 5).forEach(challenge => {
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

        function createChallengeCard(challenge, isUpcoming) {
            const card = document.createElement('div');
            card.classList.add('challenge-card');

            const difficultyInfo = difficultyMap[challenge.difficulty] || { name: challenge.difficulty, class: '', order: 0 };
            const attemptsInfo = challenge.attempts > 0 ? ` (${challenge.attempts} att Clear)` : '';
            const verifierInfo = challenge.verifier ? `<span class="verifier">검증: ${challenge.verifier}</span>` : '';
            const rankDisplay = challenge.rank ? `<span class="rank">#${challenge.rank}</span>` : '';
            const expectedRankDisplay = isUpcoming && challenge.expectedRank ? `<p class="expected-rank"><strong>예상 랭크:</strong> ${challenge.expectedRank}</p>` : '';

            const firstRecord = submittedRecords.find(record => record.challengeId === challenge.id);
            let imagePreviewHtml = '';
            if (!isUpcoming && firstRecord && firstRecord.recordImageUrl) {
                imagePreviewHtml = `
                    <div class="challenge-image-preview">
                        <img src="${firstRecord.recordImageUrl}" alt="${challenge.name} 클리어 이미지">
                    </div>
                `;
            }

            card.innerHTML = `
                <a href="challenge_detail.html?id=${challenge.id}${isUpcoming ? '&upcoming=true' : ''}" class="challenge-card-link">
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
                    ${imagePreviewHtml}
                </a>
            `;
            card.querySelector('.copy-btn')?.addEventListener('click', (event) => {
                event.stopPropagation();
                event.preventDefault();
                copyToClipboard(event.target.dataset.id, event.target);
            });
            return card;
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
                const card = document.createElement('div');
                card.classList.add('challenge-card');

                const difficultyInfo = difficultyMap[challenge.difficulty] || { name: challenge.difficulty, class: '', order: 0 };
                const attemptsInfo = challenge.attempts > 0 ? ` (${challenge.attempts} att Clear)` : '';
                const verifierInfo = challenge.verifier ? `<span class="verifier">검증: ${challenge.verifier}</span>` : '';

                const firstRecord = submittedRecords.find(record => record.challengeId === challenge.id && record.recordImageUrl);
                let imagePreviewHtml = '';
                if (firstRecord && firstRecord.recordImageUrl) {
                    imagePreviewHtml = `
                        <div class="challenge-image-preview">
                            <img src="${firstRecord.recordImageUrl}" alt="${challenge.name} 클리어 이미지">
                        </div>
                    `;
                }

                card.innerHTML = `
                    <a href="challenge_detail.html?id=${challenge.id}" class="challenge-card-link">
                        <div class="challenge-card-main-content">
                            <div class="challenge-card-header">
                                <span class="rank">#${challenge.rank}</span>
                                <h3>${challenge.name}${attemptsInfo}</h3>
                            </div>
                            <p class="difficulty ${difficultyInfo.class}">${difficultyInfo.name}</p>
                            <p class="description-preview">${challenge.description.length > 100 ? challenge.description.substring(0, 100) + '...' : challenge.description}</p>
                            <div class="level-id-group">
                                <span>ID: ${challenge.levelId}</span>
                                <button class="copy-btn" data-id="${challenge.levelId}" type="button">복사</button>
                            </div>
                            <div class="card-footer">
                                <span class="creator">제작: ${challenge.creator}</span>
                                ${verifierInfo}
                                <span class="stats">조회수: ${challenge.views} | 완료: ${challenge.completions}</span>
                            </div>
                        </div>
                        ${imagePreviewHtml}
                    </a>
                `;
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
            let currentChallenges = [...challenges];

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
                const card = document.createElement('div');
                card.classList.add('challenge-card');

                const difficultyInfo = difficultyMap[challenge.difficulty] || { name: challenge.difficulty, class: '', order: 0 };
                const verifierInfo = challenge.verifier ? `<span class="verifier">검증: ${challenge.verifier}</span>` : '';
                const expectedRankInfo = challenge.expectedRank ? `<p><strong>예상 랭크:</strong> ${challenge.expectedRank}</p>` : '';

                card.innerHTML = `
                    <a href="challenge_detail.html?id=${challenge.id}&upcoming=true" class="challenge-card-link">
                        <div class="challenge-card-main-content">
                            <div class="challenge-card-header">
                                <span class="rank">#${challenge.id}</span>
                                <h3>${challenge.name}</h3>
                            </div>
                            <p class="difficulty ${difficultyInfo.class}">${difficultyInfo.name}</p>
                            ${expectedRankInfo}
                            <p class="description-preview">${challenge.description.length > 100 ? challenge.description.substring(0, 100) + '...' : challenge.description}</p>
                            <div class="level-id-group">
                                <span>ID: ${challenge.levelId}</span>
                                <button class="copy-btn" data-id="${challenge.levelId}" type="button">복사</button>
                            </div>
                            <div class="card-footer">
                                <span class="creator">제작: ${challenge.creator}</span>
                                ${verifierInfo}
                                <span class="stats">조회수: ${challenge.views}</span>
                            </div>
                        </div>
                    </a>
                `;
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
                                    ${record.zreImageUrl && record.zreImageUrl !== '' ? `<p><strong>인증 사진:</strong> <a href="${record.zreImageUrl}" target="_blank">사진 보기</a></p><img src="${record.zreImageUrl}" alt="Zre Proof Image" style="max-width: 100%; height: auto; border-radius: 4px; margin-top: 10px;">` : ''}
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
                            ${record.recordImageUrl && record.recordImageUrl !== '' ? `<div class="record-image"><img src="${record.recordImageUrl}" alt="클리어 이미지"></div>` : ''}
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

            uploadForm.addEventListener('submit', (event) => {
                event.preventDefault();

                const isUpcomingChecked = document.getElementById('is-upcoming').checked;
                const newChallenge = {
                    id: String(challenges.length + upcomingChallenges.length + uploadedChallenges.length + 1),
                    name: document.getElementById('challenge-name').value,
                    difficulty: document.getElementById('difficulty').value,
                    description: document.getElementById('description').value,
                    creator: loggedInUser.nickname,
                    verifier: document.getElementById('verifier').value,
                    levelId: document.getElementById('gd-level-id').value,
                    views: 0,
                    videoUrl: document.getElementById('video-url').value,
                };

                if (isUpcomingChecked) {
                    newChallenge.expectedRank = document.getElementById('expected-rank').value;
                    newChallenge.completions = 0;
                    newChallenge.attempts = 0;
                    upcomingChallenges.push(newChallenge);
                    upcomingChallenges.sort((a, b) => a.name.localeCompare(b.name));
                } else {
                    newChallenge.rank = challenges.length + 1;
                    newChallenge.completions = 0;
                    newChallenge.attempts = 0;
                    challenges.push(newChallenge);
                    challenges.sort((a,b) => a.rank - b.rank);
                }

                uploadedChallenges.push(newChallenge);
                localStorage.setItem('uploadedChallenges', JSON.stringify(uploadedChallenges));

                alert('챌린지가 성공적으로 업로드되었습니다! (새로고침 시 데이터 초기화)');
                console.log('새 챌린지:', newChallenge);

                uploadForm.reset();
                document.getElementById('expected-rank-group').style.display = 'none';
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
                authToken = null;
                localStorage.removeItem('loggedInUser');
                localStorage.removeItem('authToken');
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
            authForm.addEventListener('submit', async (event) => {
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
                            authToken = data.token;
                            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
                            localStorage.setItem('authToken', authToken);
                            updateAuthNavItem();
                            window.location.href = 'my_profile.html';
                        } else {
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
                submitRecordForm.addEventListener('submit', async (event) => {
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
                        id: 'rec' + (submittedRecords.length + 1),
                        challengeId: targetChallenge.id,
                        challengeName: targetChallenge.name,
                        videoUrl: recordVideoUrl,
                        recordImageUrl: recordImageUrl,
                        comment: recordComment,
                        submitter: loggedInUser.nickname,
                        date: new Date().toLocaleDateString('ko-KR'),
                        isZre: isZre,
                        zreVideoUrl: zreVideoUrl,
                        zreImageUrl: zreImageUrl
                    };

                    // 실제로는 백엔드 API를 통해 기록을 제출해야 합니다. (예시)
                    // try {
                    //     const response = await fetch(`${BACKEND_API_URL}/api/records`, {
                    //         method: 'POST',
                    //         headers: {
                    //             'Content-Type': 'application/json',
                    //             'Authorization': `Bearer ${authToken}` // 인증 토큰 포함
                    //         },
                    //         body: JSON.stringify(newRecord),
                    //     });
                    //     const data = await response.json();
                    //     if (response.ok) {
                    //         alert(data.message);
                    //         // 실제 데이터베이스에 저장된 기록으로 submittedRecords 업데이트
                    //         // submittedRecords.push(data.record);
                    //         // localStorage.setItem('submittedRecords', JSON.stringify(submittedRecords));
                    //         window.location.href = `challenge_detail.html?id=${targetChallenge.id}`;
                    //     } else {
                    //         alert(`기록 제출 실패: ${data.message}`);
                    //     }
                    // } catch (error) {
                    //     console.error('기록 제출 오류:', error);
                    //     alert('기록 제출 중 오류가 발생했습니다.');
                    // }

                    // 현재는 로컬 스토리지에만 저장 (데모용)
                    submittedRecords.push(newRecord);
                    localStorage.setItem('submittedRecords', JSON.stringify(submittedRecords));

                    alert(`${targetChallenge.name} 챌린지 기록이 성공적으로 제출되었습니다! (새로고침 시 데이터 초기화)`);
                    console.log('새 기록:', newRecord);

                    submitRecordForm.reset();
                    zreProofFields.style.display = 'none';
                    isZreCheckbox.checked = false;
                    window.location.href = `challenge_detail.html?id=${targetChallenge.id}`;
                });
            }

        } else {
            if (recordChallengeInfo) recordChallengeInfo.style.display = 'none';
            if (submitRecordForm) submitRecordForm.style.display = 'none';
            if (recordNotFound) recordNotFound.style.display = 'block';
            if (submitPageTitle) submitPageTitle.textContent = `기록 제출 오류`;
        }
    }
});
