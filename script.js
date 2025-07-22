document.addEventListener('DOMContentLoaded', () => {
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
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // 예시 유튜브 링크 (embed 형식)
        },
        {
            id: '2', rank: 2,
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
            id: '3', rank: 3,
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
            id: '4', rank: 4,
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
            id: '5', rank: 5,
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
    ].sort((a, b) => a.rank - b.rank); // 실제 랭킹 챌린지만 정렬

    // 업커밍 챌린지 데이터
    const upcomingChallenges = [
        {
            id: '101', // ID는 기존 챌린지와 겹치지 않게 변경
            name: 'Gonna go FULL',
            difficulty: 'extreme_demon',
            description: '현재 Top 1으로 예상되는 매우 어려운 업커밍 챌린지입니다. 기대해주세요!',
            creator: 'UpcomingDev',
            verifier: 'PendingV',
            levelId: 'UPCOM001',
            views: 50,
            expectedRank: 'Top 1', // 예상 랭크 추가
            videoUrl: ''
        },
        {
            id: '102',
            name: 'Chaos Ship',
            difficulty: 'insane_demon',
            description: 'Top 1~2로 예상되는 쉬프 챌린지입니다. 혼란스러운 패턴이 특징입니다.',
            creator: 'ShipMaster',
            verifier: 'ChaosV',
            levelId: 'UPCOM002',
            views: 40,
            expectedRank: 'Top 1~2',
            videoUrl: ''
        },
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
    ].sort((a, b) => a.name.localeCompare(b.name)); // 이름순으로 정렬 (혹은 원하는 기준으로)


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

    // 임시 제출 기록 (모든 챌린지 클리어 기록, 사진 포함)
    // challenge_list.html 에서 미리보기로도 사용됨
    const submittedRecords = [
        { id: 'rec1', challengeId: '1', challengeName: 'The Hell Challenge', videoUrl: 'https://www.youtube.com/embed/2X_2IdXT_gE', recordImageUrl: 'https://via.placeholder.com/200x150?text=Clear+Image+1', comment: '간신히 깼습니다!', submitter: 'NormalUser', isZre: false, zreVideoUrl: '', zreImageUrl: '' },
        { id: 'rec2', challengeId: '1', challengeName: 'The Hell Challenge', videoUrl: 'https://www.youtube.com/embed/3Y_pP4sVdss', recordImageUrl: 'http://googleusercontent.com/file_content/10', comment: '제가 Zre입니다! 확인해주세요!', submitter: 'Zre', isZre: true, zreVideoUrl: 'https://www.youtube.com/embed/zure_proof_video', zreImageUrl: 'https://via.placeholder.com/300x200?text=Zre+Proof+Image' },
        { id: 'rec3', challengeId: '3', challengeName: 'Wave Hold', videoUrl: 'https://www.youtube.com/embed/4W_pP4sVdss', recordImageUrl: 'https://via.placeholder.com/200x150?text=Clear+Image+3', comment: '깔끔하게 클리어!', submitter: 'WavePro', isZre: false, zreVideoUrl: '', zreImageUrl: '' },
        { id: 'rec4', challengeId: '2', challengeName: 'Gonna go', videoUrl: 'https://www.youtube.com/embed/g_H2rUqL1qE0', recordImageUrl: 'https://via.placeholder.com/200x150?text=Gonna+go+Clear', comment: '간신히 통과! 다음 레벨로!', submitter: 'FastRunner', isZre: false, zreVideoUrl: '', zreImageUrl: '' }
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

                // 해당 챌린지의 첫 번째 기록 이미지 가져오기
                const firstRecord = submittedRecords.find(record => record.challengeId === challenge.id);
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
                        <div class="challenge-card-main-content"> <div class="challenge-card-header">
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

    // --- 업커밍 챌린지 페이지 로직 (`upcoming_challenges.html`) ---
    } else if (currentPage === 'upcoming_challenges.html') {
        const upcomingListContainer = document.getElementById('upcoming-challenge-list');
        const noResultsMessage = document.querySelector('.not-found-message');
        const loadingMessage = document.querySelector('.loading-message');

        function displayUpcomingChallenges() {
            loadingMessage.style.display = 'none';
            upcomingListContainer.innerHTML = '';

            if (upcomingChallenges.length === 0) {
                noResultsMessage.style.display = 'block';
                return;
            } else {
                noResultsMessage.style.display = 'none';
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
                upcomingListContainer.appendChild(card);
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

    // --- 챌린지 상세 페이지 로직 (`challenge_detail.html`) ---
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
            detailPageTitle.textContent = `${foundChallenge.name} - 챌린지 상세`;

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
                        </div>
                </section>
                <a href="${isUpcoming ? 'upcoming_challenges.html' : 'challenge_list.html'}" class="go-back-link">← ${isUpcoming ? '업커밍 챌린지' : '챌린지'} 목록으로 돌아가기</a>
            `;

            document.querySelector('.challenge-detail-page .copy-btn')?.addEventListener('click', (event) => {
                copyToClipboard(event.target.dataset.id, event.target);
            });

            // 해당 챌린지의 기록만 필터링하여 표시
            const relevantRecords = submittedRecords.filter(record => record.challengeId === foundChallenge.id);
            const recordsListDiv = document.getElementById('records-list-container');
            if (relevantRecords.length > 0) {
                recordsListDiv.innerHTML = '';
                relevantRecords.forEach(record => {
                    const recordCard = document.createElement('div');
                    recordCard.classList.add('record-card');
                    if (record.isZre) { // Zre로 철자 변경
                        recordCard.classList.add('zre-verified');
                    }

                    let zreProofHtml = ''; // Zre로 철자 변경
                    if (record.isZre) { // Zre로 철자 변경
                        zreProofHtml = `
                            <div class="zre-proof">
                                <h4>✅ Zre 인증됨</h4>
                                ${record.zreVideoUrl ? `<p><strong>인증 영상:</strong> <a href="${record.zreVideoUrl}" target="_blank">${record.zreVideoUrl}</a></p>` : ''}
                                ${record.zreImageUrl ? `<p><strong>인증 사진:</strong> <a href="${record.zreImageUrl}" target="_blank">사진 보기</a></p><img src="${record.zreImageUrl}" alt="Zre Proof Image" style="max-width: 100%; height: auto; border-radius: 4px; margin-top: 10px;">` : ''}
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
                        ${record.recordImageUrl ? `<div class="record-image"><img src="${record.recordImageUrl}" alt="클리어 이미지"></div>` : ''}
                        ${zreProofHtml}
                    `;
                    recordsListDiv.appendChild(recordCard);
                });
            } else {
                recordsListDiv.innerHTML = '<p class="no-records-message">아직 이 챌린지에 대한 클리어 기록이 없습니다.</p>';
            }

        } else {
            document.querySelector('.loading-message').style.display = 'none';
            document.querySelector('.not-found-message').style.display = 'block';
            detailPageTitle.textContent = `챌린지 없음 - Geometry Dash Challenge List`;
        }

    // --- 챌린지 업로드 페이지 로직 (`upload_challenge.html`) ---
    } else if (currentPage === 'upload_challenge.html') {
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
                    id: String(challenges.length + upcomingChallenges.length + 1),
                    name: document.getElementById('challenge-name').value,
                    difficulty: document.getElementById('difficulty').value,
                    description: document.getElementById('description').value,
                    creator: currentUser.nickname,
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

                alert('챌린지가 성공적으로 업로드되었습니다! (실제 저장되지 않음)');
                console.log('새 챌린지:', newChallenge);

                uploadForm.reset();
                document.getElementById('expected-rank-group').style.display = 'none';
            });
        }

    // --- 내 프로필 페이지 로직 (`my_profile.html`) ---
    } else if (currentPage === 'my_profile.html') {
        const profileNickname = document.getElementById('profile-nickname');
        const profileEmail = document.getElementById('profile-email');
        const uploadedChallengesList = document.getElementById('uploaded-challenges-list');
        const submittedRecordsList = document.getElementById('submitted-records-list');

        const currentUser = {
            isLoggedIn: true,
            nickname: 'TestUser',
            email: 'test@example.com',
            uploadedChallenges: [...challenges.filter(c => c.creator === 'TestUser'), ...upcomingChallenges.filter(c => c.creator === 'TestUser')],
            // 여기서는 실제 유저가 제출한 기록을 위한 임시 더미 데이터를 사용 (즈레인증 포함)
            submittedRecords: submittedRecords.filter(r => r.submitter === 'TestUser') // TestUser의 기록만 가져옴
        };

        if (currentUser.isLoggedIn) {
            profileNickname.textContent = currentUser.nickname;
            profileEmail.textContent = currentUser.email;

            if (currentUser.uploadedChallenges.length > 0) {
                uploadedChallengesList.innerHTML = '';
                currentUser.uploadedChallenges.forEach(challenge => {
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

            if (currentUser.submittedRecords.length > 0) {
                submittedRecordsList.innerHTML = '';
                currentUser.submittedRecords.forEach(record => {
                    const li = document.createElement('li');
                    const zreTag = record.isZre ? ' <span class="zre-tag">Zre 인증</span>' : ''; // Zre로 철자 변경
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

        } else {
            alert('로그인이 필요합니다.');
            window.location.href = 'auth.html';
        }

    // --- 로그인/회원가입 페이지 로직 (`auth.html`) ---
    } else if (currentPage === 'auth.html') {
        const authHeading = document.getElementById('auth-heading');
        const authButton = document.getElementById('auth-button');
        const switchAuthModeLink = document.getElementById('switch-auth-mode');
        const nicknameGroup = document.getElementById('nickname-group');
        const authForm = document.getElementById('auth-form');
        const authPageTitle = document.getElementById('auth-page-title');

        let isLoginMode = true;

        function updateAuthMode() {
            if (isLoginMode) {
                authHeading.textContent = '로그인';
                authButton.textContent = '로그인';
                document.getElementById('switch-text').innerHTML = '계정이 없으신가요? <a href="#" id="switch-auth-mode">회원가입</a>';
                nicknameGroup.style.display = 'none';
                authPageTitle.textContent = '로그인';
            } else {
                authHeading.textContent = '회원가입';
                authButton.textContent = '회원가입';
                document.getElementById('switch-text').innerHTML = '이미 계정이 있으신가요? <a href="#" id="switch-auth-mode">로그인</a>';
                nicknameGroup.style.display = 'block';
                authPageTitle.textContent = '회원가입';
            }
            document.getElementById('switch-auth-mode').addEventListener('click', (e) => {
                e.preventDefault();
                isLoginMode = !isLoginMode;
                updateAuthMode();
            });
        }

        updateAuthMode();

        authForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.getElementById('auth-email').value;
            const password = document.getElementById('auth-password').value;
            const nickname = document.getElementById('auth-nickname').value;

            const tempUser = {
                email: 'test@example.com',
                password: 'password'
            };

            if (isLoginMode) {
                if (email === tempUser.email && password === tempUser.password) {
                    alert('로그인 성공!');
                    window.location.href = 'my_profile.html';
                } else {
                    alert('이메일 또는 비밀번호가 올바르지 않습니다.');
                }
            } else {
                if (email && password && nickname) {
                    alert(`${nickname}님, 회원가입을 환영합니다! (실제 저장되지 않음)`);
                    isLoginMode = true;
                    updateAuthMode();
                    authForm.reset();
                } else {
                    alert('모든 필드를 채워주세요.');
                }
            }
        });

    // --- 기록 제출 페이지 로직 (`submit_record.html`) ---
    } else if (currentPage === 'submit_record.html') {
        const challengeIdToSubmit = urlParams.get('challengeId');
        const recordChallengeInfo = document.getElementById('record-challenge-info');
        const submitRecordForm = document.getElementById('submit-record-form');
        const recordNotFound = document.getElementById('record-not-found');
        const submitRecordHeading = document.getElementById('submit-record-heading');
        const submitPageTitle = document.getElementById('submit-page-title');

        const isZreCheckbox = document.getElementById('is-zre-verified'); // Zre로 철자 변경
        const zreProofFields = document.getElementById('zre-proof-fields'); // Zre로 철자 변경
        const recordImageUrlInput = document.getElementById('record-image-url'); // 일반 클리어 이미지 URL 입력 필드

        // Zre 인증 체크박스 변경 이벤트 리스너
        if (isZreCheckbox) {
            isZreCheckbox.addEventListener('change', () => {
                if (isZreCheckbox.checked) {
                    zreProofFields.style.display = 'block';
                } else {
                    zreProofFields.style.display = 'none';
                    // 체크 해제 시 필드 초기화 (선택 사항)
                    document.getElementById('zre-video-url').value = '';
                    document.getElementById('zre-image-url').value = '';
                }
            });
        }


        const targetChallenge = challenges.find(c => c.id === challengeIdToSubmit);

        // 임시 더미 사용자 데이터 (이 페이지에서만 사용되는 임시 데이터)
        const currentUser = {
            isLoggedIn: true,
            nickname: 'TestUser',
            submittedRecords: [] // 이 배열은 실제 제출 시에만 사용되므로 비워둠
        };

        if (targetChallenge) {
            submitRecordHeading.textContent = `${targetChallenge.name} - 기록 제출`;
            submitPageTitle.textContent = `기록 제출 - ${targetChallenge.name}`;
            recordChallengeInfo.innerHTML = `
                <p><strong>챌린지 이름:</strong> ${targetChallenge.name}</p>
                <p><strong>난이도:</strong> <span class="${difficultyMap[targetChallenge.difficulty].class}">${difficultyMap[targetTargetChallenge.difficulty].name}</span></p>
                <p><strong>레벨 ID:</strong> ${targetChallenge.levelId}</p>
            `;
            submitRecordForm.style.display = 'block';

            submitRecordForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const recordVideoUrl = document.getElementById('record-video-url').value;
                const recordImageUrl = recordImageUrlInput.value; // 일반 클리어 이미지 URL 가져오기
                const recordComment = document.getElementById('record-comment').value;
                const isZre = document.getElementById('is-zre-verified').checked; // Zre로 철자 변경
                const zreVideoUrl = document.getElementById('zre-video-url').value; // Zre로 철자 변경
                const zreImageUrl = document.getElementById('zre-image-url').value; // Zre로 철자 변경

                if (!recordVideoUrl) {
                    alert('플레이 영상 URL을 입력해주세요.');
                    return;
                }
                
                // Zre 인증 체크 시, 인증 영상 또는 인증 사진 중 하나는 필수
                if (isZre && (!zreVideoUrl && !zreImageUrl)) {
                    alert('Zre 인증 시에는 인증 영상 또는 인증 사진 중 하나를 반드시 입력해야 합니다.');
                    return;
                }

                const newRecord = {
                    id: 'rec' + (submittedRecords.length + 1), // submittedRecords의 길이에 기반하여 새 ID 생성
                    challengeId: targetChallenge.id,
                    challengeName: targetChallenge.name,
                    videoUrl: recordVideoUrl,
                    recordImageUrl: recordImageUrl, // 일반 클리어 이미지 URL 저장
                    comment: recordComment,
                    submitter: currentUser.nickname,
                    date: new Date().toLocaleDateString('ko-KR'),
                    isZre: isZre,
                    zreVideoUrl: zreVideoUrl,
                    zreImageUrl: zreImageUrl
                };

                // 실제로는 서버에 전송되어야 하며, 데이터가 영구적으로 저장됩니다.
                // 여기서는 임시로 콘솔에 출력하고, submittedRecords 배열에 추가하여 다음 페이지 로드 시 반영되도록 함 (데모용)
                submittedRecords.push(newRecord);
                console.log('새 기록:', newRecord);
                alert(`${targetChallenge.name} 챌린지 기록이 성공적으로 제출되었습니다! (실제 저장되지 않음)`);

                submitRecordForm.reset();
                zreProofFields.style.display = 'none'; // 필드 숨기기
                isZreCheckbox.checked = false; // 체크박스 해제
                window.location.href = `challenge_detail.html?id=${targetChallenge.id}`; // 상세 페이지로 이동
            });
        } else {
            recordChallengeInfo.style.display = 'none';
            submitRecordForm.style.display = 'none';
            recordNotFound.style.display = 'block';
            submitPageTitle.textContent = `기록 제출 오류`;
        }
    }
});