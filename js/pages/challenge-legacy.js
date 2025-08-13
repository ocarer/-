import { challenges } from '../data.js';
import { createChallengeCard } from '../ui.js';
import { MAX_RANK_EXTENDED_LIST_UPPER_BOUND } from '../config.js';
import { copyToClipboard } from '../ui.js';

export function initLegacyListPage() {
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
