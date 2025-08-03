document.addEventListener('DOMContentLoaded', () => {
    // 백엔드 API의 기본 URL을 정의합니다. (챌린지 정보는 이 스크립트 내부에 저장됩니다.)
    const BACKEND_API_URL = 'https://backend-w61z.onrender.com'; // <-- 이 부분은 사용자 인증을 위해 유지됩니다.

    // 챌린지 랭크 기준 상수
    const MAX_RANK_MAIN_LIST = 9;
    const MAX_RANK_EXTENDED_LIST_UPPER_BOUND = 19;

    // 챌린지 데이터 (업데이트된 챌린지 리스트)
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
            imageUrl: './the_hell_challenge.png' // 이미지 경로 변경
        },
        {
            id: '2', rank: 2, // Chaos Ship (랭크 조정)
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
            zreImageUrl: './chaos_ship_zre_proof.png', // 이미지 경로 변경
            imageUrl: './chaos_ship.png' // 이미지 경로 변경
        },
        {
            id: '3', rank: 3, // Relief 2 (오늘 깬 맵)
            name: 'Relief 2',
            difficulty: 'extreme_demon', // 난이도 추정
            description: '잦은 변속과 모드전환이 특징인 맵입니다. 몇 안되는 고퀄맵이기도 합니다.',
            creator: 'PlayerX',
            verifier: 'PlayerX',
            levelId: '100556994',
            views: 50,
            completions: 1,
            attempts: 100,
            videoUrl: 'https://www.youtube.com/embed/relief2_video_url', // 실제 영상 URL로 변경
            imageUrl: './relief_2.png' // 이미지 경로 변경
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
            imageUrl: './rebition_2.png' // 이미지 경로 변경
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
            imageUrl: './gonna_go.png' // 이미지 경로 변경
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
            videoUrl: 'https://www.youtube.com/embed/true_sink_video_url', // 실제 영상 URL로 변경
            imageUrl: './true_sink.png' // 이미지 경로 변경
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
            imageUrl: './aaaaaaaaaaa.png' // 이미지 경로 변경
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
            imageUrl: './persephone.png' // 이미지 경로 변경
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
    ];
    
    // 커스텀 메시지 모달을 위한 함수
    function showCustomMessage(message, type = 'info') {
        const messageBox = document.createElement('div');
        messageBox.classList.add('custom-message-box', `message-${type}`);
        messageBox.innerHTML = `
            <p>${message}</p>
            <button class="close-button">확인</button>
        `;
        document.body.appendChild(messageBox);

        const closeButton = messageBox.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
            document.body.removeChild(messageBox);
        });
    }

    // DOM 요소 캐싱
    const navMyProfileLink = document.getElementById('nav-my-profile-link');
    const navLoginLink = document.getElementById('nav-login-link');
    const navSignupLink = document.getElementById('nav-signup-link');
    const navLogoutButton = document.getElementById('nav-logout-button');
    const mainContent = document.querySelector('main');
    const profilePage = document.querySelector('.profile-page');
    const challengeDetailPage = document.querySelector('.challenge-detail-page');

    // 로그인 상태 확인 및 네비게이션바 업데이트
    function updateNavbar() {
        const token = localStorage.getItem('token');
        if (token) {
            if (navLoginLink) navLoginLink.style.display = 'none';
            if (navSignupLink) navSignupLink.style.display = 'none';
            if (navMyProfileLink) navMyProfileLink.style.display = 'inline-block';
            if (navLogoutButton) navLogoutButton.style.display = 'inline-block';
        } else {
            if (navLoginLink) navLoginLink.style.display = 'inline-block';
            if (navSignupLink) navSignupLink.style.display = 'inline-block';
            if (navMyProfileLink) navMyProfileLink.style.display = 'none';
            if (navLogoutButton) navLogoutButton.style.display = 'none';
        }
    }

    // 로그아웃 이벤트 핸들러
    if (navLogoutButton) {
        navLogoutButton.addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            showCustomMessage('로그아웃되었습니다.');
            window.location.href = 'index.html';
        });
    }

    // 챌린지 카드 생성 함수
    function createChallengeCard(challenge) {
        const card = document.createElement('div');
        card.classList.add('challenge-card', `difficulty-${challenge.difficulty}`);

        // imageUrl이 없을 경우 플레이스홀더 이미지 사용
        const imageUrl = challenge.imageUrl || `https://placehold.co/500x300/e0e0e0/ffffff?text=No+Image`;

        card.innerHTML = `
            <a href="challenge_detail.html?id=${challenge.id}" class="challenge-card-link">
                <div class="challenge-image-preview">
                    <img src="${imageUrl}" alt="${challenge.name} thumbnail" onerror="this.onerror=null; this.src='https://placehold.co/500x300/e0e0e0/ffffff?text=No+Image';">
                </div>
                <div class="challenge-card-main-content">
                    <div class="challenge-card-header">
                        ${challenge.rank ? `<span class="rank">#${challenge.rank}</span>` : ''}
                        <h3>${challenge.name}</h3>
                    </div>
                    <span class="difficulty">${challenge.difficulty.replace(/_/g, ' ')}</span>
                    <p class="description-preview">${challenge.description}</p>
                    <div class="card-footer">
                        <span class="creator">Creator: ${challenge.creator}</span>
                        <span class="verifier">Verifier: ${challenge.verifier}</span>
                    </div>
                </div>
            </a>
        `;
        return card;
    }

    // 챌린지 목록 페이지 렌더링
    function renderChallengeList(listId, filterFunc, sortKey = 'rank') {
        const challengeListContainer = document.getElementById(listId);
        if (!challengeListContainer) return;

        let filteredChallenges = challenges.filter(filterFunc);
        
        // 정렬 적용
        filteredChallenges.sort((a, b) => {
            if (sortKey === 'rank') return (a.rank || 9999) - (b.rank || 9999);
            if (sortKey === 'views') return b.views - a.views;
            if (sortKey === 'completions') return b.completions - a.completions;
        });

        challengeListContainer.innerHTML = '';
        const noResultsMessage = document.createElement('p');
        noResultsMessage.classList.add('no-results-message');
        noResultsMessage.textContent = '검색 결과가 없습니다.';
        noResultsMessage.style.display = 'none';
        challengeListContainer.appendChild(noResultsMessage);

        if (filteredChallenges.length === 0) {
            noResultsMessage.style.display = 'block';
        } else {
            filteredChallenges.forEach(challenge => {
                challengeListContainer.appendChild(createChallengeCard(challenge));
            });
        }
    }

    // 챌린지 목록 페이지 로직
    const challengeListMain = document.getElementById('challenge-list-main');
    if (challengeListMain) {
        const searchInput = document.getElementById('challenge-search');
        const difficultyFilter = document.getElementById('difficulty-filter');
        const sortBy = document.getElementById('sort-by');
        const listContainer = document.getElementById('challenge-list-main');

        function filterAndRender() {
            const searchQuery = searchInput.value.toLowerCase();
            const selectedDifficulty = difficultyFilter.value;
            const selectedSort = sortBy.value;

            let filteredChallenges = challenges.filter(challenge => {
                const matchesSearch = challenge.name.toLowerCase().includes(searchQuery) || (challenge.levelId && challenge.levelId.includes(searchQuery));
                const matchesDifficulty = selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty;
                // Main List에 속하는 챌린지만 표시
                const isMainList = challenge.rank > 0 && challenge.rank <= MAX_RANK_MAIN_LIST;
                return matchesSearch && matchesDifficulty && isMainList;
            });
            
            filteredChallenges.sort((a, b) => {
                if (selectedSort === 'rank') return (a.rank || 9999) - (b.rank || 9999);
                if (selectedSort === 'views') return b.views - a.views;
                if (selectedSort === 'completions') return b.completions - a.completions;
            });

            const noResultsMessage = listContainer.querySelector('.no-results-message');
            listContainer.innerHTML = '';
            if (noResultsMessage) listContainer.appendChild(noResultsMessage);

            if (filteredChallenges.length === 0) {
                if (noResultsMessage) noResultsMessage.style.display = 'block';
            } else {
                if (noResultsMessage) noResultsMessage.style.display = 'none';
                filteredChallenges.forEach(challenge => {
                    listContainer.appendChild(createChallengeCard(challenge));
                });
            }
        }

        if (searchInput) searchInput.addEventListener('input', filterAndRender);
        if (difficultyFilter) difficultyFilter.addEventListener('change', filterAndRender);
        if (sortBy) sortBy.addEventListener('change', filterAndRender);

        filterAndRender(); // 페이지 로드 시 초기 렌더링
    }

    // Extended List 페이지 로직
    const extendedListContainer = document.getElementById('extended-challenge-list');
    if (extendedListContainer) {
        renderChallengeList('extended-challenge-list', challenge => challenge.rank > MAX_RANK_MAIN_LIST && challenge.rank <= MAX_RANK_EXTENDED_LIST_UPPER_BOUND);
    }

    // Legacy List 페이지 로직
    const legacyListContainer = document.getElementById('legacy-challenge-list');
    if (legacyListContainer) {
        renderChallengeList('legacy-challenge-list', challenge => challenge.rank > MAX_RANK_EXTENDED_LIST_UPPER_BOUND);
    }

    // 내 프로필 페이지 로직
    if (profilePage) {
        const profileNicknameSpan = document.getElementById('profile-nickname');
        const profileEmailSpan = document.getElementById('profile-email');
        const uploadedChallengesList = document.getElementById('uploaded-challenges-list');
        const submittedRecordsList = document.getElementById('submitted-records-list');

        function renderProfile() {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                if (profileNicknameSpan) profileNicknameSpan.textContent = user.nickname;
                if (profileEmailSpan) profileEmailSpan.textContent = user.email;

                // 내가 업로드한 챌린지 렌더링
                const myChallenges = challenges.filter(c => c.creator === user.nickname);
                if (uploadedChallengesList) {
                    uploadedChallengesList.innerHTML = '';
                    if (myChallenges.length > 0) {
                        myChallenges.forEach(challenge => {
                            const li = document.createElement('li');
                            li.innerHTML = `<a href="challenge_detail.html?id=${challenge.id}">${challenge.name} (#${challenge.rank})</a>`;
                            uploadedChallengesList.appendChild(li);
                        });
                    } else {
                        uploadedChallengesList.innerHTML = '<li>업로드한 챌린지가 없습니다.</li>';
                    }
                }

                // 내가 제출한 기록 렌더링 (데모 데이터)
                if (submittedRecordsList) {
                    submittedRecordsList.innerHTML = '<li>제출한 기록을 불러오는 중...</li>';
                    // 실제로는 서버에서 데이터를 가져와야 함
                    setTimeout(() => {
                        submittedRecordsList.innerHTML = '<li>제출한 기록이 없습니다.</li>';
                    }, 500);
                }
            } else {
                if (mainContent) mainContent.innerHTML = `<p class="not-found-message">로그인이 필요합니다.</p>`;
            }
        }
        renderProfile();
    }
    
    // 로그인 페이지 로직
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        const messageEl = document.getElementById('login-message');

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = e.target.elements['login-email'].value;
            const password = e.target.elements['login-password'].value;

            try {
                const response = await fetch(`${BACKEND_API_URL}/api/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const result = await response.json();
                if (response.ok) {
                    localStorage.setItem('token', result.token);
                    localStorage.setItem('user', JSON.stringify(result.user));
                    if (messageEl) {
                        messageEl.textContent = '로그인 성공!';
                        messageEl.className = 'alert alert-success';
                        messageEl.style.display = 'block';
                    }
                    window.location.href = 'index.html';
                } else {
                    if (messageEl) {
                        messageEl.textContent = result.message || '로그인 실패';
                        messageEl.className = 'alert alert-error';
                        messageEl.style.display = 'block';
                    }
                }
            } catch (error) {
                console.error('Login error:', error);
                if (messageEl) {
                    messageEl.textContent = '서버 오류가 발생했습니다.';
                    messageEl.className = 'alert alert-error';
                    messageEl.style.display = 'block';
                }
            }
        });
    }

    // 회원가입 페이지 로직
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        const messageEl = document.getElementById('signup-message');

        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nickname = e.target.elements['signup-nickname'].value;
            const email = e.target.elements['signup-email'].value;
            const password = e.target.elements['signup-password'].value;

            try {
                const response = await fetch(`${BACKEND_API_URL}/api/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nickname, email, password })
                });

                const result = await response.json();
                if (response.ok) {
                    if (messageEl) {
                        messageEl.textContent = '회원가입 성공! 이제 로그인해주세요.';
                        messageEl.className = 'alert alert-success';
                        messageEl.style.display = 'block';
                    }
                    window.location.href = 'login.html';
                } else {
                    if (messageEl) {
                        messageEl.textContent = result.message || '회원가입 실패';
                        messageEl.className = 'alert alert-error';
                        messageEl.style.display = 'block';
                    }
                }
            } catch (error) {
                console.error('Signup error:', error);
                if (messageEl) {
                    messageEl.textContent = '서버 오류가 발생했습니다.';
                    messageEl.className = 'alert alert-error';
                    messageEl.style.display = 'block';
                }
            }
        });
    }

    // 챌린지 업로드 페이지 로직
    const uploadForm = document.getElementById('upload-challenge-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const token = localStorage.getItem('token');
            if (!token) {
                showCustomMessage('로그인이 필요합니다.', 'error');
                return;
            }

            const newChallenge = {
                id: crypto.randomUUID(), // 임시 ID 생성
                name: e.target.elements['challenge-name'].value,
                difficulty: e.target.elements['challenge-difficulty'].value,
                description: e.target.elements['challenge-description'].value,
                creator: 'LoggedInUser', // 임시 사용자
                verifier: 'LoggedInUser', // 임시 사용자
                levelId: e.target.elements['challenge-id'].value,
                views: 0,
                completions: 0,
                videoUrl: e.target.elements['challenge-video-url'].value,
                imageUrl: `https://placehold.co/500x300/e0e0e0/ffffff?text=${e.target.elements['challenge-name'].value}`
            };

            // TODO: 실제로는 백엔드 API를 호출해야 합니다.
            // try {
            //     const response = await fetch(`${BACKEND_API_URL}/api/challenges`, {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //             'Authorization': `Bearer ${token}`
            //         },
            //         body: JSON.stringify(newChallenge)
            //     });
            //
            //     if (response.ok) {
            //         showCustomMessage('챌린지가 성공적으로 업로드되었습니다.');
            //         window.location.href = 'challenge_list.html';
            //     } else {
            //         const data = await response.json();
            //         showCustomMessage(`업로드 실패: ${data.message}`, 'error');
            //     }
            // } catch (error) {
            //     showCustomMessage('챌린지 업로드 중 오류가 발생했습니다. 서버가 실행 중인지 확인해주세요.', 'error');
            // }
            
            // 데모용 로직: 챌린지 배열에 추가
            challenges.push(newChallenge);
            showCustomMessage('챌린지가 성공적으로 업로드되었습니다. (데모)');
            window.location.href = 'challenge_list.html';
        });
    }

    // 챌린지 상세 페이지 로직
    if (challengeDetailPage) {
        const urlParams = new URLSearchParams(window.location.search);
        const challengeId = urlParams.get('id');
        const challenge = challenges.find(c => c.id === challengeId);

        if (challenge) {
            document.getElementById('challenge-title').textContent = challenge.name;
            document.getElementById('challenge-rank').textContent = `#${challenge.rank}`;
            document.getElementById('challenge-difficulty').textContent = challenge.difficulty.replace(/_/g, ' ');
            document.getElementById('challenge-description').textContent = challenge.description;
            document.getElementById('challenge-creator').textContent = challenge.creator;
            document.getElementById('challenge-verifier').textContent = challenge.verifier;
            document.getElementById('challenge-level-id').textContent = challenge.levelId;
            document.getElementById('challenge-views').textContent = challenge.views;
            document.getElementById('challenge-completions').textContent = challenge.completions;
            
            if (challenge.videoUrl) {
                document.getElementById('challenge-video').src = challenge.videoUrl;
            } else {
                const videoPlaceholder = document.getElementById('challenge-video-container');
                videoPlaceholder.innerHTML = '<p class="video-placeholder">챌린지 영상이 없습니다.</p>';
            }
        } else {
            if(mainContent) mainContent.innerHTML = `<p class="not-found-message">해당 챌린지를 찾을 수 없습니다.</p>`;
        }
    }

    // 기록 제출 폼 로직
    const submitRecordForm = document.getElementById('submit-record-form');
    if (submitRecordForm) {
        submitRecordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const token = localStorage.getItem('token');
            if (!token) {
                showCustomMessage('로그인이 필요합니다.', 'error');
                return;
            }
            
            // TODO: 실제로는 백엔드 API를 호출하여 기록을 제출해야 합니다.
            showCustomMessage('기록이 성공적으로 제출되었습니다. (데모)');
            submitRecordForm.reset();
        });
    }

    updateNavbar();
});
