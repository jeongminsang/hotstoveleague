# HotStove League Draft Harvester (Cloudflare Worker)

Cloudflare Worker 환경에서 실행되는 LoL 스토브리그 이적 루머 초안(`rumor_drafts`) 자동 수집 파이프라인입니다.

## 동작 방식
1. **Cron 트리거**: 6시간마다 1회(`0 */6 * * *`) 자동 실행 (하루 4회, Gemini 무료 티어 할당량 준수)
2. **Gemini Grounded Search**: 공식 구단 발표 및 신뢰도 높은 인사이더(Sheep Esports, @LEC_Wooloo, 웨이보 涵艺, 恋恋红茶 등) 출처의 최신 이적 루머를 실시간 웹 검색 기반으로 발굴
3. **Draft 격리 보관**: 수집된 데이터는 공개 피드에 노출되지 않으며, `rumor_drafts` 테이블에 `status = 'pending'` 상태로만 안전하게 저장됩니다.
4. **로컬 승인**: 사용자가 로컬 AI 검증 CLI (`pnpm drafts:review`)를 통해 교차 검증 후 승인(`approved`)해야 실제 사이트에 반영됩니다.

## 환경 변수 및 Secret 설정

`wrangler.toml`의 `[vars]`에 Supabase URL을 입력하고, 키는 `wrangler secret`으로 등록합니다:

```bash
# 1. Supabase Project URL (NEXT_PUBLIC_SUPABASE_URL 값)
npx wrangler secret put SUPABASE_URL

# 2. Supabase Key (NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY 값)
npx wrangler secret put SUPABASE_KEY

# 3. Google Gemini API Key (GEMINI_API_KEY 값)
npx wrangler secret put GEMINI_API_KEY
```

## 로컬 테스트 및 배포

```bash
# 로컬 개발 서버 실행
pnpm dev

# 수동 수집 트리거 테스트 (브라우저 또는 curl)
curl http://localhost:8787/harvest

# Cloudflare 배포
pnpm deploy
```
