# 게임 요소 그물 네트워크 — Game Designer's Mechanic Mesh

**Live: https://zondug.github.io/game-tools/**

장르 ↔ 요소를 양방향으로 오가며 게임에 **필요한 UI 요소를 화면별로 도출**하는 기획 도구.
장르를 고르면 표준 요소 템플릿이 채워지고, 요소를 손보면 가까운 장르가 역산된다.
결과는 화면(HUD·전투·인벤토리·상점…) 단위로 정리되고 MD/PDF 스펙 시트로 내보낸다.

## 기능

- **장르 ↔ 요소 양방향** — 44개 장르 템플릿, softmax 기반 장르 역산
- **11개 축 + 기능 태그 + 스팀 테마 태그** — 축은 배타(택1)/중첩(다중) 구분
- **요소 관계** — 충돌(⚠ 턴제↔리듬)·시너지(✦ 퍼머데스+절차생성=로그라이크) 실시간 표시
- **필요 UI 도출 · 화면별 12박스** — 항목 체크 포함/제외, 우선순위(P0/P1/P2), 하위 세부 옵션
- **커스텀 UI 항목** — 도출 밖 위젯 직접 추가
- **URL 공유** — 조합 전체가 `#z=` 해시에 실림. 링크 하나로 스펙 전달
- **템플릿** — localStorage 저장/로드/업데이트 + JSON export/import
- **내보내기** — MD(mermaid 화면 흐름도 포함) 복사/다운로드, 인쇄용 리포트(PDF, SVG 흐름도)
- **한/영 로케일**, 검색 필터, Undo(⌘Z), 모바일 대응

## 개발

```bash
npm install
npm run build   # src/ → dist/app.js (esbuild, React 번들)
python3 -m http.server  # 로컬 확인
```

- `src/data.js` — 축·장르·UI 매핑·태그·관계 데이터 (편집은 대부분 여기)
- `src/app.jsx` — 앱 로직·렌더
- `dist/app.js` — 커밋되는 빌드 산출물 (GitHub Pages가 정적 서빙)

## 로드맵

- 장르 프로파일 가중치 객관화 — Steam 태그 공동출현 데이터 기반 자동 산출 (현재는 수동 추정치)
- game-feature-planning 역분해 연계 — 이 스펙 시트가 기능 트리 분해의 입력

---
Game Designer's Mechanic Mesh, 2026 Wissen & Ferme · zondug@me.com
