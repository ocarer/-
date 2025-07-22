// server.js

// Express.js 모듈을 가져옵니다.
const express = require('express');
// dotenv 모듈을 사용하여 .env 파일의 환경 변수를 로드합니다.
require('dotenv').config();
// bcryptjs 모듈을 가져옵니다. 비밀번호 해싱에 사용됩니다.
const bcrypt = require('bcryptjs');
// jsonwebtoken 모듈을 가져옵니다. 사용자 인증 토큰 생성에 사용됩니다.
const jwt = require('jsonwebtoken');

// Express 애플리케이션을 생성합니다.
const app = express();
// 서버가 사용할 포트 번호를 정의합니다. 환경 변수에서 가져오거나 기본값 3000을 사용합니다.
const PORT = process.env.PORT || 3000;
// JWT 비밀 키를 환경 변수에서 가져옵니다. (매우 중요: 실제 운영 시에는 복잡한 키 사용)
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey'; // 기본값은 개발용, 실제로는 .env에 설정

// 미들웨어 설정:
// JSON 형식의 요청 본문(body)을 파싱하기 위해 express.json() 미들웨어를 사용합니다.
app.use(express.json());

// CORS(Cross-Origin Resource Sharing) 설정:
// 프론트엔드와 백엔드가 다른 도메인에서 실행될 때 통신을 허용하기 위해 필요합니다.
// 실제 운영 환경에서는 특정 도메인만 허용하도록 설정해야 합니다.
app.use((req, res, next) => {
    // 모든 도메인에서의 요청을 허용합니다. (개발 시 편리, 운영 시 보안 취약)
    res.setHeader('Access-Control-Allow-Origin', '*');
    // 허용할 HTTP 메서드를 정의합니다.
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // 허용할 HTTP 헤더를 정의합니다.
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // OPTIONS 요청에 대한 응답을 즉시 보냅니다 (CORS preflight 요청 처리).
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    // 다음 미들웨어 또는 라우트 핸들러로 요청을 전달합니다.
    next();
});

// --- 가상의 사용자 데이터베이스 (메모리 내 배열) ---
// 실제 앱에서는 이 부분이 MongoDB, PostgreSQL 등의 데이터베이스와 연동됩니다.
// 서버가 재시작되면 데이터는 초기화됩니다.
let users = [];
// 예시 사용자 데이터 (테스트용)
// users.push({ id: 'user1', nickname: 'TestUser', email: 'test@example.com', passwordHash: bcrypt.hashSync('password123', 10) });


// --- API 라우트 정의 ---

// 기본 라우트: 서버가 정상 작동하는지 확인하기 위한 간단한 엔드포인트입니다.
app.get('/', (req, res) => {
    res.send('Zre Challenge List Backend is running!');
});

// 회원가입 라우트
app.post('/api/signup', async (req, res) => {
    const { nickname, email, password } = req.body;

    // 입력값 유효성 검사
    if (!nickname || !email || !password) {
        return res.status(400).json({ message: '닉네임, 이메일, 비밀번호를 모두 입력해주세요.' });
    }

    // 이메일 중복 확인
    if (users.some(user => user.email === email)) {
        return res.status(409).json({ message: '이미 사용 중인 이메일 주소입니다.' });
    }

    try {
        // 비밀번호 해싱 (보안을 위해 필수)
        const salt = await bcrypt.genSalt(10); // 솔트 생성 (보안 강도 10)
        const passwordHash = await bcrypt.hash(password, salt); // 비밀번호 해싱

        // 새 사용자 객체 생성
        const newUser = {
            id: `user${users.length + 1}`, // 간단한 ID 생성 (실제 DB에서는 자동 생성)
            nickname,
            email,
            passwordHash // 해싱된 비밀번호 저장
        };

        // 사용자 배열에 추가 (가상 데이터베이스)
        users.push(newUser);
        console.log('새 사용자 등록:', newUser);

        // 회원가입 성공 응답
        res.status(201).json({ message: '회원가입이 성공적으로 완료되었습니다.', user: { id: newUser.id, nickname: newUser.nickname, email: newUser.email } });

    } catch (error) {
        console.error('회원가입 오류:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다. 다시 시도해주세요.' });
    }
});

// 로그인 라우트
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // 입력값 유효성 검사
    if (!email || !password) {
        return res.status(400).json({ message: '이메일과 비밀번호를 입력해주세요.' });
    }

    // 사용자 찾기
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(400).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    }

    try {
        // 비밀번호 일치 여부 확인
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
        }

        // JWT 토큰 생성
        // 토큰에는 사용자를 식별할 수 있는 정보를 포함합니다. (예: id, nickname, email)
        const token = jwt.sign(
            { id: user.id, nickname: user.nickname, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' } // 토큰 유효 기간 1시간 설정
        );

        // 로그인 성공 응답 (토큰과 사용자 정보 반환)
        res.status(200).json({
            message: '로그인 성공!',
            token,
            user: {
                id: user.id,
                nickname: user.nickname,
                email: user.email
            }
        });

    } catch (error) {
        console.error('로그인 오류:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다. 다시 시도해주세요.' });
    }
});


// --- 서버 시작 ---
// 정의된 포트에서 서버를 시작하고, 서버가 시작되면 콜백 함수를 실행합니다.
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
    console.log(`http://localhost:${PORT}`);
    console.log(`회원가입 API: http://localhost:${PORT}/api/signup (POST)`);
    console.log(`로그인 API: http://localhost:${PORT}/api/login (POST)`);
});
