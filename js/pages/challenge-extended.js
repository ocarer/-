import { challenges } from '../data.js';
import { createChallengeCard } from '../ui.js';
import { MAX_RANK_MAIN_LIST, MAX_RANK_EXTENDED_LIST_UPPER_BOUND, difficultyMap } from '../config.js';
import { copyToClipboard } from '../ui.js';

export function initExtendedListPage() {
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

    if (searchInput) searchInput.addEventListener('input', filterAndSortExtendedChallenges);
    if (difficultyFilter) difficultyFilter.addEventListener('change', filterAndSortExtendedChallenges);
    if (sortOrder) sortOrder.addEventListener('change', filterAndSortExtendedChallenges);
    
    filterAndSortExtendedChallenges();
}
