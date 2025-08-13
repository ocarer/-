import { BACKEND_API_URL } from './config.js';

let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || null;
let users = JSON.parse(localStorage.getItem('users')) || [];

function updateAuthNavItem() {
    const navMyProfileLink = document.getElementById('nav-my-profile-link');
    const navLoginLink = document.getElementById('nav-login-link');
    const navSignupLink = document.getElementById('nav-signup-link');
    const navLogoutButton = document.getElementById('nav-logout-button');

    if (loggedInUser) {
        if (navMyProfileLink) {
            navMyProfileLink.textContent = `내 프로필 (${loggedInUser.nickname})`;
            navMyProfileLink.style.display = 'inline-block';
        }
        if (navLoginLink) navLoginLink.style.display = 'none';
        if (navSignupLink) navSignupLink.style.display = 'none';
        if (navLogoutButton) {
            navLogoutButton.style.display = 'inline-block';
            navLogoutButton.onclick = () => {
                loggedInUser = null;
                localStorage.removeItem('loggedInUser');
                localStorage.removeItem('authToken');
                alert('로그아웃 되었습니다.');
                window.location.href = 'index.html';
            };
        }
    } else {
        if (navMyProfileLink) navMyProfileLink.style.display = 'none';
        if (navLoginLink) navLoginLink.style.display = 'inline-block';
        if (navSignupLink) navSignupLink.style.display = 'inline-block';
        if (navLogoutButton) navLogoutButton.style.display = 'none';
    }
}

function handleLoginForm() {
    const loginForm = document.getElementById('login-form');
    if (loggedInUser) {
        alert('이미 로그인되어 있습니다. 프로필 페이지로 이동합니다.');
        window.location.href = 'my_profile.html';
        return;
    }
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            try {
                const response = await fetch(`${BACKEND_API_URL}/api/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert(data.message);
                    loggedInUser = data.user;
                    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
                    localStorage.setItem('authToken', data.token);
                    updateAuthNavItem();
                    window.location.href = 'my_profile.html';
                } else {
                    alert(`오류: ${data.message || '알 수 없는 오류가 발생했습니다.'}`);
                }
            } catch (error) {
                console.error('네트워크 또는 서버 통신 오류:', error);
                alert('서버와 통신하는 중 오류가 발생했습니다. 서버가 실행 중인지 확인해주세요.');
            }
        });
    }
}

function handleSignupForm() {
    const signupForm = document.getElementById('signup-form');

    if (loggedInUser) {
        alert('이미 로그인되어 있습니다. 프로필 페이지로 이동합니다.');
        window.location.href = 'my_profile.html';
        return;
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const nickname = document.getElementById('nickname').value;

            try {
                const response = await fetch(`${BACKEND_API_URL}/api/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nickname, email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert(data.message);
                    const newUser = { email, password, nickname };
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));
                    window.location.href = 'login.html';
                } else {
                    alert(`오류: ${data.message || '알 수 없는 오류가 발생했습니다.'}`);
                }
            } catch (error) {
                console.error('네트워크 또는 서버 통신 오류:', error);
                alert('서버와 통신하는 중 오류가 발생했습니다. 서버가 실행 중인지 확인해주세요.');
            }
        });
    }
}

export { loggedInUser, users, updateAuthNavItem, handleLoginForm, handleSignupForm };
