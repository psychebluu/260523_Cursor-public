# 직관 승률 농장 (KBO)

스타듀밸리 감성과 토스 스타일 UI를 결합한 **KBO 야구 직관 승률 기록 앱**입니다.  
직접 경기장에 가서 본 경기를 기록하고, 내가 있을 때의 팀 승률을 확인할 수 있습니다.

## 주요 기능

- KBO 10개 구단 직관 경기 기록 (승/패/무)
- 전체·연도별 직관 승률 통계
- 연승/연패 배지, 최근 경기, 월별 승률 차트
- 브라우저 localStorage 저장 (로그인 불필요)

## 기술 스택

- Next.js 16 (App Router)
- TypeScript, Tailwind CSS
- Zustand (persist), Framer Motion, Recharts
- Pretendard, shadcn/ui

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 빌드

```bash
npm run build
npm run start
```

## GitHub 배포 준비

```bash
git init
git add .
git commit -m "Initial commit: KBO 직관 승률 앱"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

## Vercel 배포

1. [Vercel](https://vercel.com)에 GitHub 계정으로 로그인
2. **Add New Project** → GitHub 저장소 선택
3. Framework Preset: **Next.js** (자동 감지)
4. Build Command: `npm run build` / Output: `.next` (기본값)
5. Deploy

### GitHub 저장소 자동 연결 (push 시 자동 배포)

Vercel 프로젝트와 GitHub 저장소를 연결하려면:

1. [Vercel GitHub App 설치](https://github.com/apps/vercel/installations/new)
2. `psychebluu` 계정 선택 → `260523_Cursor-public` 저장소 접근 허용
3. 터미널에서 `npx vercel git connect https://github.com/psychebluu/260523_Cursor-public --yes`

또는 GitHub Actions 사용 (`.github/workflows/deploy.yml`):

- GitHub 저장소 **Settings → Secrets → Actions** 에 `VERCEL_TOKEN` 추가
- [Vercel Account Tokens](https://vercel.com/account/tokens)에서 토큰 생성

배포 후 환경 변수(선택):

| 변수 | 설명 |
|------|------|
| `NEXT_PUBLIC_APP_URL` | 배포 URL (예: `https://your-app.vercel.app`) |

## 프로젝트 구조

```
src/
├── app/              # 페이지 (/, /games, /games/new)
├── components/       # UI 컴포넌트
└── lib/              # 타입, KBO 팀, 승률 계산, store
```

## 라이선스

Private project
