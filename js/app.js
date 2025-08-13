import { updateAuthNavItem, handleLoginForm, handleSignupForm } from './auth.js';
import { initMainPage } from './pages/main.js';
import { initChallengeListPage } from './pages/challenge-list.js';
import { initExtendedListPage } from './pages/challenge-extended.js';
import { initLegacyListPage } from './pages/challenge-legacy.js';
import { initChallengeDetailPage } from './pages/challenge-detail.js';
import { initSubmitRecordPage } from './pages/submit-record.js';
import { initCreatorPage } from './pages/creator.js';
import { initUserScoresPage } from './pages/scores.js';
import { initMyProfilePage } from './pages/my_profile.js';

document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();

    updateAuthNavItem();

    if (currentPage === 'index.html' || currentPage === '') {
        initMainPage();
    } else if (currentPage === 'challenge_list.html') {
        initChallengeListPage();
    } else if (currentPage === 'extended_list.html') {
        initExtendedListPage();
    } else if (currentPage === 'legacy_list.html') {
        initLegacyListPage();
    } else if (currentPage === 'challenge_detail.html') {
        initChallengeDetailPage();
    } else if (currentPage === 'submit_record.html') {
        initSubmitRecordPage();
    } else if (currentPage === 'login.html') {
        handleLoginForm();
    } else if (currentPage === 'signup.html') {
        handleSignupForm();
    } else if (currentPage === 'creator_page.html') {
        initCreatorPage();
    } else if (currentPage === 'user_scores.html') {
        initUserScoresPage();
    } else if (currentPage === 'my_profile.html') {
        initMyProfilePage();
    }
});