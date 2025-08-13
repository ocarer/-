
const BACKEND_API_URL = 'https://backend-w61z.onrender.com';

// 챌린지 랭크 기준 상수
const MAX_RANK_MAIN_LIST = 9;
const MAX_RANK_EXTENDED_LIST_UPPER_BOUND = 19;

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

export { BACKEND_API_URL, MAX_RANK_MAIN_LIST, MAX_RANK_EXTENDED_LIST_UPPER_BOUND, difficultyMap };
