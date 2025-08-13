import { challenges, upcomingChallenges } from '../data.js';
import { createChallengeCard } from '../ui.js';

export function initMainPage() {
    const topChallengesContainer = document.getElementById('top-challenges-container');
    const upcomingChallengesContainer = document.getElementById('upcoming-challenges-container');

    if (topChallengesContainer) {
        topChallengesContainer.innerHTML = '';
        challenges.filter(c => c.rank <= 5).forEach(challenge => {
            const card = createChallengeCard(challenge, false);
            topChallengesContainer.appendChild(card);
        });
    }
    // This part is commented out as there is no upcoming challenges data.
    // if (upcomingChallengesContainer) {
    //     upcomingChallengesContainer.innerHTML = '';
    //     const latestUpcoming = [...upcomingChallenges].sort((a,b) => parseInt(b.id.replace('UPCOM', '')) - parseInt(a.id.replace('UPCOM', ''))).slice(0, 3);
    //     latestUpcoming.forEach(challenge => {
    //         const card = createChallengeCard(challenge, true);
    //         upcomingChallengesContainer.appendChild(card);
    //     });
    // }
}
