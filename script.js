document.addEventListener('DOMContentLoaded', () => {
    // 백엔드 API의 기본 URL을 정의합니다.
    const BACKEND_API_URL = 'https://backend-w61z.onrender.com'; // <-- 이 부분을 Render에서 발급받은 실제 URL로 변경하세요!

    // 챌린지 랭크 기준 상수
    const MAX_RANK_MAIN_LIST = 9;
    const MAX_RANK_EXTENDED_LIST_UPPER_BOUND = 19;

    // DOM 요소 캐싱
    const navMyProfileLink = document.getElementById('nav-my-profile-link');
    const navLoginLink = document.getElementById('nav-login-link');
    const navSignupLink = document.getElementById('nav-signup-link');
    const navLogoutButton = document.getElementById('nav-logout-button');
    const mainContent = document.querySelector('main');

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
            alert('로그아웃되었습니다.');
            window.location.href = 'index.html';
        });
    }
    
    // 챌린지 카드 생성 함수
    function createChallengeCard(challenge) {
        const card = document.createElement('div');
        card.classList.add('challenge-card', `difficulty-${challenge.difficulty}`);
        if (challenge.isUpcoming) {
            card.classList.add('is_upcoming');
        }
        
        // 랜덤 이미지 URL 생성 (유니크한 이미지 제공을 위해)
        const imageUrl = `https://picsum.photos/500/300?random=${challenge.id}`;

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
    async function renderChallengeList(listId, filterFunc, sortKey = 'rank') {
        const challengeListContainer = document.getElementById(listId);
        if (!challengeListContainer) return;

        challengeListContainer.innerHTML = `<p class="loading-message">챌린지를 불러오는 중...</p>`;
        const noResultsMessage = challengeListContainer.querySelector('.no-results');

        try {
            const response = await fetch(`${BACKEND_API_URL}/challenges`);
            if (!response.ok) throw new Error('챌린지 데이터를 불러오는 데 실패했습니다.');
            let challenges = await response.json();

            // 필터링 적용
            challenges = challenges.filter(filterFunc);
            
            // 정렬 적용
            challenges.sort((a, b) => {
                if (sortKey === 'rank') return (a.rank || 9999) - (b.rank || 9999);
                if (sortKey === 'views') return b.views - a.views;
                if (sortKey === 'completions') return b.completions - a.completions;
            });
            
            challengeListContainer.innerHTML = '';
            if (challenges.length === 0) {
                if (noResultsMessage) noResultsMessage.style.display = 'block';
            } else {
                if (noResultsMessage) noResultsMessage.style.display = 'none';
                challenges.forEach(challenge => {
                    challengeListContainer.appendChild(createChallengeCard(challenge));
                });
            }
        } catch (error) {
            console.error('Error fetching challenges:', error);
            if (challengeListContainer) challengeListContainer.innerHTML = `<p class="error-message">챌린지를 불러오는 중 오류가 발생했습니다.</p>`;
        }
    }
    
    // 챌린지 목록 페이지 로직
    if (document.getElementById('challenge-list-main')) {
        const searchInput = document.getElementById('challenge-search');
        const difficultyFilter = document.getElementById('difficulty-filter');
        const sortBy = document.getElementById('sort-by');
        const listContainer = document.getElementById('challenge-list-main');
        const noResultsMessage = listContainer.querySelector('.no-results-message');

        let allChallenges = [];

        async function fetchChallengesAndRender() {
            try {
                const response = await fetch(`${BACKEND_API_URL}/challenges`);
                if (!response.ok) throw new Error('챌린지 데이터를 불러오는 데 실패했습니다.');
                allChallenges = await response.json();
                filterAndRender();
            } catch (error) {
                console.error('Error fetching challenges:', error);
                if (listContainer) listContainer.innerHTML = `<p class="error-message">챌린지를 불러오는 중 오류가 발생했습니다.</p>`;
            }
        }

        function filterAndRender() {
            const searchQuery = searchInput.value.toLowerCase();
            const selectedDifficulty = difficultyFilter.value;
            const selectedSort = sortBy.value;

            let filteredChallenges = allChallenges.filter(challenge => {
                const matchesSearch = challenge.name.toLowerCase().includes(searchQuery) || (challenge.levelId && challenge.levelId.includes(searchQuery));
                const matchesDifficulty = selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty;
                const isMainList = challenge.rank > 0 && challenge.rank <= MAX_RANK_MAIN_LIST && !challenge.isUpcoming;
                return matchesSearch && matchesDifficulty && isMainList;
            });

            filteredChallenges.sort((a, b) => {
                if (selectedSort === 'rank') return (a.rank || 9999) - (b.rank || 9999);
                if (selectedSort === 'views') return b.views - a.views;
                if (selectedSort === 'completions') return b.completions - a.completions;
            });

            listContainer.innerHTML = '';
            if (filteredChallenges.length === 0) {
                if (noResultsMessage) noResultsMessage.style.display = 'block';
            } else {
                if (noResultsMessage) noResultsMessage.style.display = 'none';
                filteredChallenges.forEach(challenge => {
                    listContainer.appendChild(createChallengeCard(challenge));
                });
            }
        }

        searchInput.addEventListener('input', filterAndRender);
        difficultyFilter.addEventListener('change', filterAndRender);
        sortBy.addEventListener('change', filterAndRender);

        fetchChallengesAndRender();
    }


    // 업커밍 챌린지 페이지 로직
    if (document.getElementById('upcoming-challenge-list')) {
        renderChallengeList('upcoming-challenge-list', challenge => challenge.isUpcoming);
    }

    // Extended List 페이지 로직
    if (document.getElementById('extended-challenge-list')) {
        renderChallengeList('extended-challenge-list', challenge => challenge.rank > MAX_RANK_MAIN_LIST && challenge.rank <= MAX_RANK_EXTENDED_LIST_UPPER_BOUND && !challenge.isUpcoming);
    }

    // Legacy List 페이지 로직
    if (document.getElementById('legacy-challenge-list')) {
        renderChallengeList('legacy-challenge-list', challenge => challenge.rank > MAX_RANK_EXTENDED_LIST_UPPER_BOUND && !challenge.isUpcoming);
    }

    // 내 프로필 페이지 로직
    if (document.querySelector('.profile-page')) {
        const profileNicknameSpan = document.getElementById('profile-nickname');
        const profileEmailSpan = document.getElementById('profile-email');

        function renderProfile() {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                if (profileNicknameSpan) profileNicknameSpan.textContent = user.nickname;
                if (profileEmailSpan) profileEmailSpan.textContent = user.email;
            } else {
                if (mainContent) mainContent.innerHTML = `<p class="not-found-message">로그인이 필요합니다.</p>`;
            }
        }
        renderProfile();
    }
    
    // 로그인 페이지 로직
    if (document.getElementById('login-form')) {
        const loginForm = document.getElementById('login-form');
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
    if (document.getElementById('signup-form')) {
        const signupForm = document.getElementById('signup-form');
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

    updateNavbar();
});
