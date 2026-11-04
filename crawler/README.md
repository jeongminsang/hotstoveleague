# 🕷️ HotStove Crawler (Cloudflare Worker)

LCK 스토브리그 인사이더(웨이보, 트위터) 실시간 수집 및 Gemini AI 정제 엔진입니다.

## 🚀 배포 및 설정 가이드

### 1. Cloudflare 로그인
```bash
cd crawler
pnpm dlx wrangler login
```

### 2. Secrets 등록 (민감 정보 환경변수)
```bash
# Supabase 서비스 롤 키 등록 (쓰기 권한 필요)
pnpm dlx wrangler secret put SUPABASE_SERVICE_ROLE_KEY

# Google Gemini API 키 등록 (무료)
pnpm dlx wrangler secret put GEMINI_API_KEY
```

### 3. wrangler.toml 변수 설정
`crawler/wrangler.toml`의 `[vars]`에 Supabase 프로젝트 URL을 입력합니다:
```toml
[vars]
SUPABASE_URL = "https://your-project.supabase.co"
WEIBO_SUB_COOKIE = "선택사항"
```

### 4. Cloudflare Worker 배포
```bash
pnpm run deploy
```
배포되면 **1분 주기 Cron Trigger (`* * * * *`)**가 자동으로 활성화되어 상시 감시가 시작됩니다.

### 5. 수동 테스트 및 실시간 로그 모니터링
* **수동 트리거**: 배포된 Worker URL의 `GET /crawl` 또는 `GET /health` 호출
* **실시간 로그 보기**:
  ```bash
  pnpm dlx wrangler tail
  ```

