import { ParsedRumor } from "./types";

export async function parseRumorWithGemini(
  apiKey: string,
  rawText: string
): Promise<ParsedRumor | null> {
  // 기본 모델은 gemini-1.5-flash 또는 gemini-2.0-flash-lite / gemini-3.5-flash-lite
  const model = "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const systemInstruction = `당신은 League of Legends(LCK/LPL/글로벌) e스포츠 스토브리그 및 이적시장 전문 분석가입니다.
제공된 텍스트(한국어, 중국어, 영어)를 읽고 선수 이적, 재계약, FA 관련 루머인지 분석하세요.
반드시 제공된 JSON 스키마 규격으로만 응답해야 합니다.

[판단 기준]
1. is_roster_rumor: 특정 선수나 팀의 이적, 계약 종료, 재계약, 협상 소식에 관한 내용이면 true, 단순 일상 잡담/경기 감상이면 false.
2. player_name: 언급된 핵심 선수의 공식 영문 소환사명(예: Faker, Chovy, Zeus, Viper, Canyon 등). 없으면 null.
3. target_team: 이적 예상 또는 거론된 행선지 팀명(예: T1, Gen.G, HLE, DK, KT, KDF, FOX, DRX, NS, BRO, BLG, WBG, TES 등). 없으면 null.
4. status: 이적 유력(TRANSFER), 재계약(RENEWAL), FA신분(FA), 잔류(STAY), 미정(UNKNOWN).
5. confidence: 루머 확신도 0~100 (오피셜 발표=100, 기자/유명썰쟁이 유력 언급=80, 단순 찌라시/썰=50).
6. one_line_summary: 한국어로 작성된 명확하고 간결한 1줄 요약.`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: `[찌라시 원문]\n"${rawText}"\n\n위 원문을 분석하여 JSON 스키마에 맞춰 정보를 추출하세요.`,
          },
        ],
      },
    ],
    generationConfig: {
      response_mime_type: "application/json",
      temperature: 0.1,
    },
    system_instruction: {
      parts: [{ text: systemInstruction }],
    },
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
      console.error(`[Gemini] API error ${res.status}:`, await res.text());
      return null;
    }

    const data = await res.json<any>();
    const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textOutput) return null;

    const parsed: ParsedRumor = JSON.parse(textOutput);
    return parsed;
  } catch (err) {
    console.error("[Gemini] Failed to parse rumor:", err);
    return null;
  }
}

