/* 게임 요소 그물 네트워크 — 데이터 모듈
   모든 라벨은 [ko, en] 쌍. */

export const C = {
  bg: "#0F1418", surface: "#161D23", surface2: "#1D262D", border: "#2A353D",
  text: "#DCE3E7", muted: "#7A8992", faint: "#4C5A62", accent: "#E0A33E",
  blue: "#6E9BC4", blueTint: "rgba(110,155,196,0.16)", teal: "#5BB784", tealTint: "rgba(91,183,132,0.14)",
  warn: "#CB6A54", warnTint: "rgba(203,106,84,0.12)",
  violet: "#9B8BC4", violetTint: "rgba(155,139,196,0.14)",
};

/* ================= 축 ================= */
export const AXES = [
  { id: "verb", name: ["핵심 동사", "Core Verb"], hint: ["매 순간 무엇을 하는가", "what you do moment-to-moment"], multi: true, els: [
    ["shoot", ["쏘기", "Shoot"]], ["melee", ["근접 전투", "Melee"]], ["platform", ["점프·이동", "Platforming"]],
    ["aim", ["정밀 조준", "Precision Aim"]], ["unit", ["부대 관리", "Unit Command"]], ["puzzle", ["퍼즐·정렬", "Puzzle"]],
    ["rhythm", ["리듬 입력", "Rhythm"]], ["drive", ["운전", "Driving"]], ["dialogue", ["대화·선택", "Dialogue"]],
    ["search", ["탐색·관찰", "Explore/Observe"]], ["build", ["건설·배치", "Build/Place"]], ["manage", ["경영·할당", "Manage"]],
    ["card", ["카드·덱", "Cards/Deck"]], ["collect", ["수집·포획", "Collect/Capture"]], ["deduce", ["설득·추리", "Deduce/Persuade"]],
  ]},
  { id: "time", name: ["시간 흐름", "Time"], hint: ["", ""], els: [
    ["realtime", ["실시간", "Real-Time"]], ["turn", ["턴제", "Turn-Based"]], ["atb", ["반턴제", "ATB"]],
    ["rtwp", ["일시정지 실시간", "RTwP"]], ["idle", ["방치", "Idle"]],
  ]},
  { id: "goal", name: ["목표", "Goal"], hint: ["한 판이 끝나는 이유", "how a session ends"], multi: true, els: [
    ["clear", ["클리어", "Clear"]], ["score", ["점수", "Score"]], ["survive", ["생존", "Survive"]],
    ["conquer", ["정복", "Conquer"]], ["narrative", ["서사 완결", "Narrative"]], ["infinite", ["무한", "Endless"]],
    ["extract", ["탈출·반출", "Extraction"]],
  ]},
  { id: "growth", name: ["성장", "Growth"], hint: ["판을 거듭할 때 남는 것", "what persists across runs"], multi: true, els: [
    ["none", ["성장 없음", "None"]], ["inrun", ["판내 성장", "In-Run"]], ["perm", ["영구 스탯", "Permanent"]],
    ["equip", ["장비 축적", "Gear"]], ["skilltree", ["스킬트리", "Skill Tree"]], ["meta", ["메타 성장", "Meta"]],
  ]},
  { id: "fail", name: ["실패 처리", "Failure"], hint: ["죽으면 무엇을 잃는가", "what death costs"], els: [
    ["retry", ["무한 재시도", "Infinite Retry"]], ["lives", ["라이프제", "Lives"]], ["checkpoint", ["체크포인트", "Checkpoint"]], ["save", ["자유 세이브", "Free Save"]], ["permadeath", ["퍼머데스", "Perma-Death"]], ["soft", ["소프트 실패", "Soft Fail"]],
  ]},
  { id: "world", name: ["월드 생성", "World Gen"], hint: ["", ""], els: [
    ["fixed", ["수제작 맵", "Handcrafted"]], ["procedural", ["절차적 생성", "Procedural"]], ["hybrid", ["하이브리드", "Hybrid"]],
  ]},
  { id: "space", name: ["공간", "Space"], hint: ["세계의 규모와 형태", "scale & shape"], els: [
    ["single", ["단일 화면", "Single Screen"]], ["linear", ["선형 스테이지", "Linear"]], ["hub", ["허브", "Hub"]], ["zoned", ["구역·존", "Zoned"]], ["open", ["오픈월드", "Open World"]], ["grid", ["그리드·타일", "Grid/Tile"]],
  ]},
  { id: "view", name: ["시점", "Viewpoint"], hint: ["", ""], els: [
    ["first", ["1인칭", "First-Person"]], ["third", ["3인칭", "Third-Person"]], ["topdown", ["탑다운", "Top-Down"]], ["side", ["사이드뷰", "Side"]], ["iso", ["아이소메트릭", "Isometric"]],
  ]},
  { id: "dim", name: ["차원", "Dimension"], hint: ["", ""], els: [
    ["2d", ["2D", "2D"]], ["25d", ["2.5D", "2.5D"]], ["3d", ["3D", "3D"]],
  ]},
  { id: "social", name: ["플레이어", "Players"], hint: ["누구와 함께하는가", "who you play with"], multi: true, els: [
    ["solo", ["싱글", "Singleplayer"]], ["local", ["로컬 멀티", "Local Multi"]], ["coop", ["온라인 협력", "Online Co-op"]], ["team", ["팀 기반", "Team-Based"]], ["pvp", ["경쟁", "PvP"]], ["mmo", ["MMO", "MMO"]], ["async", ["비동기", "Async"]],
  ]},
  { id: "econ", name: ["경제·수익", "Economy"], hint: ["재화를 어떻게 다루는가", "how currency works"], multi: true, els: [
    ["free", ["없음·단품", "None"]], ["shop", ["인게임 상점", "In-Game Shop"]], ["gacha", ["뽑기·가챠", "Gacha"]], ["market", ["유저 거래소", "Player Market"]], ["pass", ["시즌 패스", "Season Pass"]], ["ads", ["광고 보상", "Ad Reward"]],
  ]},
];

export const LABEL = {};
export const AXIS_OF = {};
AXES.forEach((ax) => ax.els.forEach(([id, lbl]) => { const k = `${ax.id}.${id}`; LABEL[k] = lbl; AXIS_OF[k] = ax.id; }));

/* ================= 기능 태그 ================= */
export const FEATURES = [
  { id: "turnbasedcombat", name: ["턴제 전투", "Turn-Based Combat"], ui: [[["턴 순서·이니셔티브", "Turn Order"], ["행동 순서", "order"]], [["행동 포인트", "Action Points"], ["AP 예산", "AP budget"]], [["스킬 타겟팅", "Skill Targeting"], ["대상 지정", "targeting"]]] },
  { id: "hacknslash", name: ["핵앤슬래시", "Hack & Slash"], ui: [[["콤보 카운터", "Combo Counter"], ["연계", "chains"]], [["데미지 팝업", "Damage Popup"], ["타격감", "hit numbers"]], [["스킬 쿨다운", "Skill Cooldowns"], ["재사용 대기", "CDs"]]] },
  { id: "stealth", name: ["잠입", "Stealth"], ui: [[["감지·소음 게이지", "Detection Meter"], ["발각 위험", "awareness"]], [["시야 콘 표시", "Vision Cones"], ["적 시야", "enemy sight"]]] },
  { id: "gridmove", name: ["그리드 이동", "Grid Movement"], ui: [[["그리드 오버레이", "Grid Overlay"], ["이동 범위", "move range"]]] },
  { id: "bossrush", name: ["보스 러시", "Boss Rush"], ui: [[["보스 체력바", "Boss Health Bar"], ["페이즈 표시", "phases"]], [["보스 목록", "Boss List"], ["관문", "gauntlet"]]] },
  { id: "difficult", name: ["고난도", "Difficult"], ui: [[["난이도 선택", "Difficulty Select"], ["모드", "mode"]], [["사망 카운터", "Death Counter"], ["시도 횟수", "attempts"]]] },
  { id: "crafting", name: ["제작", "Crafting"], ui: [[["제작 화면", "Crafting Screen"], ["레시피·재료", "recipes/materials"]]] },
  { id: "inventory", name: ["인벤토리 관리", "Inventory Mgmt"], ui: [[["인벤토리 그리드", "Inventory Grid"], ["소지품·정렬", "items/sort"]], [["아이템 툴팁", "Item Tooltip"], ["상세", "details"]]] },
  { id: "loot", name: ["전리품", "Loot"], ui: [[["루팅 팝업", "Loot Popup"], ["획득 알림", "pickup toast"]], [["등급 색상", "Rarity Colors"], ["희귀도", "rarity"]], [["비교 툴팁", "Compare Tooltip"], ["장착 대비", "vs equipped"]]] },
  { id: "resourcemgmt", name: ["자원 관리", "Resource Mgmt"], ui: [[["자원 표시줄", "Resource Bar"], ["수급 현황", "supply"]], [["수급 대시보드", "Supply Dashboard"], ["생산·소비", "in/out"]]] },
  { id: "basebuild", name: ["거점 건설", "Base Building"], ui: [[["건설 팔레트", "Build Palette"], ["배치 목록", "placeables"]], [["배치 프리뷰", "Placement Ghost"], ["미리보기", "preview"]]] },
  { id: "trading", name: ["교역", "Trading"], ui: [[["거래 창", "Trade Window"], ["교환", "exchange"]], [["시세 표시", "Price Info"], ["가치", "values"]]] },
  { id: "timemgmt", name: ["시간 관리", "Time Mgmt"], ui: [[["일정·타이머", "Schedule/Timer"], ["시간 압박", "time pressure"]], [["주문·대기열", "Order Queue"], ["대기 목록", "queue"]]] },
  { id: "scoreattack", name: ["점수 공략", "Score Attack"], ui: [[["점수판", "Score HUD"], ["콤보·배수", "combo/multiplier"]], [["랭킹", "Leaderboard"], ["기록", "records"]]] },
  { id: "charcustom", name: ["캐릭터 커스텀", "Char. Customization"], ui: [[["커스터마이즈 화면", "Customization"], ["외형·파츠", "appearance/parts"]], [["프리셋 저장", "Presets"], ["저장·불러오기", "save/load"]]] },
  { id: "classbased", name: ["클래스 기반", "Class-Based"], ui: [[["클래스 선택", "Class Select"], ["역할", "roles"]], [["역할 표시", "Role Indicator"], ["파티 역할", "party role"]]] },
  { id: "dialogueheavy", name: ["대사 중심", "Dialogue Heavy"], ui: [[["대화 박스·선택지", "Dialogue UI"], ["대사·선택", "lines/choices"]], [["대화 로그", "Dialogue Log"], ["지난 대사", "backlog"]]] },
  { id: "choices", name: ["선택 반영", "Choices Matter"], ui: [[["선택 결과 표시", "Choice Feedback"], ["결과 반영", "consequences"]], [["관계·평판 지표", "Reputation"], ["관계 수치", "standing"]]] },
  { id: "multipleendings", name: ["다중 엔딩", "Multiple Endings"], ui: [[["엔딩 분기·수집", "Endings List"], ["엔딩 목록", "ending tracker"]]] },
  { id: "guncustom", name: ["총기 커스텀", "Gun Customization"], ui: [[["무기 조립", "Weapon Modding"], ["부착물", "attachments"]]] },
  { id: "vehcombat", name: ["차량 전투", "Vehicular Combat"], ui: [[["차량 상태·부위", "Vehicle Status"], ["내구·부위", "durability/parts"]], [["무기 전환", "Weapon Switch"], ["장착 무기", "mounted weapons"]]] },
  { id: "navalcombat", name: ["해상 전투", "Naval Combat"], ui: [[["함선 전투 HUD", "Ship Combat HUD"], ["조준·사거리", "aim/range"]], [["나침반", "Compass"], ["방위", "bearing"]]] },
  { id: "leveleditor", name: ["레벨 에디터", "Level Editor"], ui: [[["레벨 에디터", "Level Editor"], ["배치·저장·공유", "place/save/share"]]] },
  { id: "controller", name: ["컨트롤러 지원", "Controller"], ui: [[["컨트롤러 프롬프트", "Controller Prompts"], ["버튼 안내", "button glyphs"]], [["포커스 네비게이션", "Focus Nav"], ["패드 이동", "pad navigation"]]] },
  { id: "splitscreen", name: ["화면 분할", "Split Screen"], ui: [[["분할 뷰포트", "Split Viewport"], ["다중 화면", "multi view"]], [["플레이어별 HUD", "Per-Player HUD"], ["개별 HUD", "individual"]]] },
  { id: "qte", name: ["퀵타임 이벤트", "Quick-Time Events"], ui: [[["QTE 프롬프트", "QTE Prompt"], ["버튼 타이밍", "button timing"]]] },
  { id: "codex", name: ["도감·코덱스", "Codex/Bestiary"], ui: [[["도감 화면", "Codex Screen"], ["수집·정보", "collection/info"]], [["수집 진행률", "Collection Progress"], ["완성도", "completion"]]] },
  { id: "fasttravel", name: ["빠른 이동", "Fast Travel"], ui: [[["이동 지점 목록", "Travel Points"], ["해금 지점", "unlocked spots"]], [["지도 마커", "Map Markers"], ["목적지 선택", "pick destination"]]] },
  { id: "weather", name: ["날씨·주야", "Weather/Day-Night"], ui: [[["시간대·날씨 표시", "Time/Weather"], ["환경 상태", "environment"]], [["시계·달력", "Clock/Calendar"], ["주기 표시", "cycle"]]] },
  { id: "hotbar", name: ["스킬 단축바", "Action Bar"], ui: [[["스킬 슬롯 바", "Skill Slot Bar"], ["단축 배치", "hotkeys"]], [["쿨다운 오버레이", "Cooldown Overlay"], ["재사용 표시", "CD sweep"]]] },
  { id: "achievements", name: ["도전 과제", "Achievements"], ui: [[["업적 목록", "Achievement List"], ["잠금·해금", "locked/unlocked"]], [["진행률·보상", "Progress/Reward"], ["달성도", "completion"]]] },
  { id: "tutorial", name: ["튜토리얼", "Tutorial"], ui: [[["안내 오버레이", "Guide Overlay"], ["조작 안내", "control hints"]], [["힌트 팝업", "Hint Popup"], ["상황 안내", "contextual tips"]]] },
  { id: "mount", name: ["탈것·펫", "Mount/Companion"], ui: [[["소환·탈것 단축", "Summon/Mount"], ["호출 키", "call key"]], [["펫·탈것 상태", "Companion Status"], ["상태·명령", "status/commands"]]] },
  { id: "cover", name: ["엄폐", "Cover System"], ui: [[["엄폐 지점 표시", "Cover Indicator"], ["엄폐 가능", "cover prompt"]], [["피격 방향 표시", "Damage Direction"], ["피격 방위", "hit direction"]]] },
  { id: "photomode", name: ["포토 모드", "Photo Mode"], ui: [[["카메라·필터", "Camera/Filters"], ["구도·효과", "framing/effects"]], [["프레임·스티커", "Frame/Sticker"], ["꾸미기", "decorate"]]] },
  { id: "faction", name: ["팩션·평판", "Faction/Reputation"], ui: [[["세력 평판 미터", "Reputation Meter"], ["세력별 호감", "faction standing"]], [["세력 관계 목록", "Faction List"], ["동맹·적대", "ally/hostile"]]] },
  { id: "romance", name: ["로맨스·호감도", "Romance"], ui: [[["호감도 미터", "Affinity Meter"], ["관계 진전", "relationship level"]], [["관계 이벤트 목록", "Relationship Events"], ["이벤트 해금", "unlocked scenes"]]] },
];
export const FEAT_BY = {}; FEATURES.forEach((f) => (FEAT_BY[f.id] = f));

/* ================= 축 → UI 매핑 ================= */
export const UI_MAP = {
  "verb.shoot": [[["조준점", "Crosshair"], ["화면 중앙 조준", "center reticle"]], [["탄약·재장전 표시", "Ammo/Reload"], ["남은 탄", "rounds & reload"]], [["히트마커·데미지", "Hitmarker/Damage"], ["명중 피드백", "hit feedback"]]],
  "verb.melee": [[["타겟 하이라이트", "Target Highlight"], ["대상 아웃라인", "lock-on outline"]], [["스태미나 바", "Stamina Bar"], ["공격·회피 자원", "attack/dodge"]], [["데미지 숫자", "Damage Numbers"], ["순차·누적", "sequential/cumulative"]], [["피격 연출", "Hit Feedback"], ["흔들기·넉백", "shake/knockback"]]],
  "verb.platform": [[["잔여 목숨·체력", "Lives/Health"], ["실패 여유", "failure margin"]], [["수집품 카운터", "Collectible Counter"], ["스테이지 수집", "stage pickups"]]],
  "verb.aim": [[["스코프 확대", "Scope/Zoom"], ["정밀 조준", "precision overlay"]]],
  "verb.unit": [[["미니맵", "Minimap"], ["전장 개요", "battlefield overview"]], [["유닛 선택 박스", "Unit Selection Box"], ["드래그 다중 선택", "drag multi-select"]], [["명령·능력 패널", "Command Panel"], ["이동·공격·스킬", "move/attack/skills"]], [["생산·건설 큐", "Build Queue"], ["대기열", "production queue"]], [["부대원 명단", "Roster"], ["유닛·크루 관리", "units/crew"]]],
  "verb.puzzle": [[["보드·격자 뷰", "Board/Grid View"], ["퍼즐 판", "puzzle board"]], [["다음 미리보기", "Next Preview"], ["예측", "upcoming"]], [["힌트·되돌리기", "Hint/Undo"], ["막힘 해소", "unstuck aids"]]],
  "verb.rhythm": [[["노트 레인", "Note Lane"], ["떨어지는 노트", "falling notes"]], [["판정 표시", "Judgment"], ["Perfect·Good·Miss", "timing grade"]], [["콤보 카운터", "Combo Counter"], ["연속 성공", "streak"]]],
  "verb.drive": [[["속도계", "Speedometer"], ["현재 속도", "current speed"]], [["랩·순위", "Lap/Position"], ["경기 상태", "race status"]], [["트랙 미니맵", "Track Minimap"], ["코스 개요", "course overview"]], [["고스트·베스트랩", "Ghost/Best Lap"], ["기록 비교", "record compare"]]],
  "verb.dialogue": [[["대화 박스", "Dialogue Box"], ["대사 출력", "lines"]], [["선택지 버튼", "Choice Buttons"], ["분기 선택", "branch pick"]], [["화자 초상·이름", "Speaker Portrait"], ["발화자", "who speaks"]]],
  "verb.search": [[["상호작용 프롬프트", "Interaction Prompt"], ["조사·줍기", "inspect/pick"]], [["단서 하이라이트", "Clue Highlight"], ["조사 대상", "interactables"]]],
  "verb.build": [[["건설 팔레트", "Build Palette"], ["배치 목록", "placeable list"]], [["배치 프리뷰", "Placement Ghost"], ["미리보기", "preview"]], [["회전·격자 스냅", "Rotate/Snap"], ["정렬 보조", "alignment"]]],
  "verb.manage": [[["자원 표시줄", "Resource Bar"], ["보유 현황", "holdings"]], [["통계 대시보드", "Stats Dashboard"], ["생산·소비", "production/consumption"]], [["할당·배치 패널", "Assignment Panel"], ["인력·시설", "labor/facilities"]]],
  "verb.card": [[["카드 핸드", "Card Hand"], ["보유 카드", "held cards"]], [["덱·버린 더미", "Deck/Discard"], ["남은·소모", "draw/discard"]], [["카드 툴팁·조합", "Card Tooltip"], ["효과·콤보", "effect/combo"]]],
  "verb.collect": [[["도감·수집 목록", "Collection Log"], ["보유·미보유", "owned/missing"]], [["포획·수집 인터페이스", "Capture UI"], ["획득 시도", "capture attempt"]]],
  "verb.deduce": [[["단서·증거 보드", "Evidence Board"], ["정보 정리", "clue tracking"]], [["지목·투표 UI", "Accuse/Vote"], ["대상 지목", "point/vote"]]],

  "time.realtime": [[["일시정지·배속", "Pause/Speed"], ["시간 조절", "time control"]]],
  "time.turn": [[["턴 종료 버튼", "End Turn"], ["다음 턴", "advance"]], [["턴 순서", "Turn Order"], ["이니셔티브", "initiative"]]],
  "time.atb": [[["ATB 게이지", "ATB Gauge"], ["행동 충전", "action charge"]]],
  "time.rtwp": [[["일시정지 토글", "Pause Toggle"], ["전술 포즈", "tactical pause"]], [["명령 큐", "Command Queue"], ["예약 명령", "queued orders"]]],
  "time.idle": [[["오프라인 수익", "Idle Earnings"], ["방치 보상", "away gains"]], [["자동화 표시", "Automation"], ["누적 생산", "auto production"]]],

  "goal.clear": [[["목표 표시", "Objective"], ["현재 과제", "current task"]], [["클리어 화면", "Clear Screen"], ["결과 요약", "results"]]],
  "goal.score": [[["점수판", "Scoreboard"], ["현재 점수", "current score"]], [["하이스코어", "High Score"], ["기록", "ranking"]]],
  "goal.survive": [[["생존 타이머", "Survival Timer"], ["경과 시간", "elapsed"]], [["웨이브 카운터", "Wave Counter"], ["진행 단계", "stage"]]],
  "goal.conquer": [[["영토 현황", "Territory"], ["점령 상태", "control"]], [["정복 목표", "Conquest Goal"], ["승리 조건", "win condition"]]],
  "goal.narrative": [[["퀘스트 로그", "Quest Log"], ["진행 서사", "story progress"]], [["챕터 표시", "Chapter"], ["이야기 단계", "story stage"]]],
  "goal.infinite": [[["성과·마일스톤", "Milestones"], ["장기 목표", "long-term"]], [["통계 대시보드", "Stats Dashboard"], ["누적 지표", "cumulative"]]],
  "goal.extract": [[["반출 지점 표시", "Extraction Point"], ["탈출 위치", "exfil location"]], [["소지 위험 표시", "At-Risk Loot"], ["잃을 것 경고", "loss on death"]]],

  "growth.inrun": [[["런 강화 목록", "Run Upgrades"], ["이번 판 획득", "this run"]]],
  "growth.perm": [[["스탯 시트", "Stat Sheet"], ["능력치", "attributes"]], [["레벨·경험치 바", "Level/XP Bar"], ["성장 진행", "progress"]], [["레벨업 화면", "Level-Up Screen"], ["드래그 분배", "drag allocate"]]],
  "growth.equip": [[["인벤토리 그리드", "Inventory Grid"], ["소지품", "items"]], [["장비 슬롯", "Equipment Slots"], ["착용 부위", "gear slots"]], [["아이템 툴팁", "Item Tooltip"], ["상세", "details"]]],
  "growth.skilltree": [[["스킬트리 화면", "Skill Tree"], ["해금 구조", "unlock graph"]], [["스킬 포인트", "Skill Points"], ["투자 자원", "points"]]],
  "growth.meta": [[["메타 언락", "Meta Unlocks"], ["영구 개방", "permanent"]], [["계승 재화", "Meta Currency"], ["런 간 화폐", "between-run"]]],

  "fail.retry": [[["즉시 재시작", "Instant Retry"], ["빠른 반복", "quick restart"]]],
  "fail.lives": [[["목숨 표시", "Lives Counter"], ["잔여 목숨", "remaining lives"]], [["컨티뉴 화면", "Continue Screen"], ["이어하기", "continue"]]],
  "fail.soft": [[["경고·적자 표시", "Warning/Deficit"], ["파산 위험", "bankruptcy risk"]]],
  "fail.checkpoint": [[["체크포인트 알림", "Checkpoint"], ["저장 지점", "save point"]]],
  "fail.save": [[["세이브·로드", "Save/Load Menu"], ["슬롯 관리", "slots"]]],
  "fail.permadeath": [[["사망 화면", "Death Screen"], ["런 종료", "run end"]], [["런 요약 통계", "Run Summary"], ["성과 정리", "stats"]]],

  "world.procedural": [[["시드 표시·입력", "Seed I/O"], ["재현·공유", "repro/share"]], [["층·구역 표시", "Floor/Zone"], ["현재 위치", "location"]]],

  "space.linear": [[["스테이지 선택", "Stage Select"], ["레벨 진입", "level entry"]], [["진행도 표시", "Progress"], ["클리어 현황", "cleared"]]],
  "space.open": [[["월드맵", "World Map"], ["전체 지도", "full map"]], [["나침반·웨이포인트", "Compass/Waypoint"], ["방향·목적지", "direction/target"]]],
  "space.grid": [[["그리드 오버레이", "Grid Overlay"], ["좌표 표시", "coordinates"]], [["이동·사거리 범위", "Range Overlay"], ["타일 하이라이트", "tile highlight"]]],
  "space.hub": [[["허브 이동 메뉴", "Hub Navigation"], ["구역 진입", "zone entry"]]],
  "space.zoned": [[["구역 지도", "Zone Map"], ["연결·잠금", "links/locks"]], [["잠금·해금 표시", "Lock/Unlock"], ["진입 조건", "gating"]]],

  "view.first": [[["크로스헤어", "Crosshair"], ["조준", "aim"]], [["체력·상태 HUD", "Health HUD"], ["생존 정보", "vitals"]]],
  "view.third": [[["체력·상태 HUD", "Health HUD"], ["생존 정보", "vitals"]], [["카메라 컨트롤", "Camera Control"], ["시점 조작", "camera"]]],
  "view.topdown": [[["미니맵", "Minimap"], ["위치 개요", "overview"]]],
  "view.side": [[["체력·목숨 HUD", "Health/Lives HUD"], ["생존 정보", "vitals"]]],
  "view.iso": [[["아이소 그리드", "Iso Grid"], ["대각 좌표", "diagonal coords"]]],

  "social.local": [[["화면 분할 뷰", "Split-Screen"], ["플레이어별 HUD", "per-player HUD"]], [["참가·조작 안내", "Join Prompt"], ["로컬 참가", "local join"]]],
  "social.coop": [[["파티 프레임", "Party Frames"], ["동료 상태", "allies"]], [["핑·신호", "Ping/Signal"], ["간단 소통", "quick comms"]], [["로그인·계정 연동", "Login/Account"], ["온라인 인증", "auth (guest ok)"]]],
  "social.team": [[["팀 편성", "Team Setup"], ["역할 배분", "roles"]], [["팀 스코어", "Team Score"], ["팀 현황", "team status"]]],
  "social.pvp": [[["스코어보드", "Scoreboard"], ["양측 현황", "both sides"]], [["매치 타이머·로비", "Match/Lobby"], ["대전 흐름", "match flow"]], [["로그인·계정 연동", "Login/Account"], ["온라인 인증", "auth"]]],
  "social.mmo": [[["채팅창", "Chat"], ["실시간 대화", "live chat"]], [["파티·길드 프레임", "Party/Guild"], ["그룹 관리", "groups"]], [["친구 목록", "Friends List"], ["소셜", "social"]], [["거래·상점창", "Trade/Shop"], ["경제", "economy"]], [["로그인·계정 연동", "Login/Account"], ["온라인 인증", "auth"]]],
  "social.async": [[["비동기 알림", "Async Notifications"], ["대기 결과", "pending results"]], [["유령·메시지 표시", "Ghost/Message"], ["타 유저 흔적", "other-player traces"]]],

  "econ.shop": [[["상점 화면", "Shop Screen"], ["구매·나가기", "buy/exit"]], [["보유 재화", "Currency"], ["필요 재화 수량", "A/B amounts"]], [["상품 카드·태그", "Item Cards"], ["New·Hot·Sale·품절", "tags"]], [["상품 상세·비교", "Item Detail"], ["성능 비교", "stat compare"]], [["착용 프리뷰", "Preview"], ["장착샷·확대", "try-on/zoom"]]],
  "econ.gacha": [[["뽑기 연출", "Gacha Roll"], ["결과 공개", "reveal"]], [["확률·천장", "Rates/Pity"], ["확률·보장", "odds/guarantee"]], [["획득 결과", "Result Screen"], ["신규·중복", "new/dupe"]]],
  "econ.market": [[["거래소 목록", "Market List"], ["검색·필터", "search/filter"]], [["등록·판매 창", "Sell Listing"], ["가격 설정", "set price"]], [["시세·거래 내역", "Price History"], ["가격 추이", "trends"]]],
  "econ.pass": [[["시즌 패스 트랙", "Season Pass Track"], ["등급·보상", "tiers/rewards"]], [["시즌 타이머", "Season Timer"], ["잔여 기간", "time left"]]],
  "econ.ads": [[["광고 보상 버튼", "Ad Reward Button"], ["시청 보상", "watch-to-earn"]]],
};

export const BASE_UI = [
  [["타이틀 화면", "Title Screen"], ["로고·시작·로그인 진입", "logo/start/login"]],
  [["메인 메뉴", "Main Menu"], ["시작·이어하기·설정", "start/continue/settings"]],
  [["설정·옵션", "Settings"], ["그래픽·사운드·조작", "graphics/audio/controls"]],
  [["일시정지 메뉴", "Pause Menu"], ["중단·복귀", "pause/resume"]],
  [["크레딧", "Credits"], ["제작진·라이선스", "staff/licenses"]],
];

/* ================= 장르 ================= */
export const GENRES = [
  { name: ["RTS", "RTS"], tag: ["실시간 전략", "Real-Time Strategy"], prof: { "verb.unit": 1.0, "time.realtime": 1.0, "goal.conquer": 0.85, "space.grid": 0.35, "view.topdown": 0.6, "growth.inrun": 0.5, "social.pvp": 0.45, "world.fixed": 0.3 }, feats: ["resourcemgmt"] },
  { name: ["턴제 전략", "Turn-Based Strategy"], tag: ["TBS", "TBS"], prof: { "verb.unit": 1.0, "time.turn": 1.0, "goal.conquer": 0.6, "space.grid": 0.7, "view.topdown": 0.5, "growth.inrun": 0.4 }, feats: ["turnbasedcombat", "gridmove"] },
  { name: ["4X", "4X"], tag: ["문명류", "Civ-like"], prof: { "verb.unit": 0.9, "time.turn": 0.85, "goal.conquer": 0.9, "space.grid": 0.6, "growth.perm": 0.4, "world.procedural": 0.3 }, feats: ["resourcemgmt", "trading"] },
  { name: ["FPS", "FPS"], tag: ["1인칭 슈터", "First-Person Shooter"], prof: { "verb.shoot": 1.0, "view.first": 1.0, "time.realtime": 0.85, "space.linear": 0.4, "social.pvp": 0.4, "goal.clear": 0.4 }, feats: ["guncustom"] },
  { name: ["TPS", "TPS"], tag: ["3인칭 슈터", "Third-Person Shooter"], prof: { "verb.shoot": 1.0, "view.third": 1.0, "time.realtime": 0.85, "space.linear": 0.4 }, feats: [] },
  { name: ["탄막 슈팅", "Bullet Hell"], tag: ["슈뮤", "Shmup"], prof: { "verb.shoot": 1.0, "goal.score": 0.9, "view.side": 0.5, "time.realtime": 0.8, "fail.retry": 0.5 }, feats: ["scoreattack"] },
  { name: ["로그라이크", "Roguelike"], tag: ["", ""], prof: { "fail.permadeath": 1.0, "world.procedural": 1.0, "growth.inrun": 0.6, "verb.melee": 0.4, "space.grid": 0.4, "time.turn": 0.4 }, feats: ["loot"] },
  { name: ["로그라이트", "Roguelite"], tag: ["메타 로그", "Meta Rogue"], prof: { "fail.permadeath": 0.9, "world.procedural": 0.9, "growth.meta": 1.0, "verb.melee": 0.4, "time.realtime": 0.4 }, feats: ["loot"] },
  { name: ["소울라이크", "Souls-like"], tag: ["", ""], prof: { "verb.melee": 1.0, "fail.checkpoint": 1.0, "time.realtime": 0.7, "view.third": 0.6, "growth.equip": 0.5, "space.linear": 0.4 }, feats: ["inventory", "difficult"] },
  { name: ["액션 RPG", "Action RPG"], tag: ["", ""], prof: { "verb.melee": 0.75, "time.realtime": 0.7, "growth.equip": 0.85, "view.third": 0.5, "space.open": 0.5, "goal.narrative": 0.4 }, feats: ["inventory", "charcustom", "loot", "hacknslash"] },
  { name: ["턴제 RPG", "JRPG"], tag: ["JRPG류", "JRPG"], prof: { "time.turn": 0.9, "growth.perm": 0.9, "goal.narrative": 0.7, "verb.melee": 0.3, "fail.save": 0.5 }, feats: ["turnbasedcombat", "inventory", "classbased"] },
  { name: ["MMORPG", "MMORPG"], tag: ["", ""], prof: { "social.mmo": 1.0, "growth.perm": 1.0, "space.open": 0.7, "time.realtime": 0.6, "goal.infinite": 0.5, "verb.melee": 0.3, "econ.market": 0.55 }, feats: ["charcustom", "inventory", "trading", "loot", "classbased"] },
  { name: ["비주얼 노벨", "Visual Novel"], tag: ["", ""], prof: { "verb.dialogue": 1.0, "goal.narrative": 1.0, "growth.none": 0.6, "fail.save": 0.4 }, feats: ["dialogueheavy", "choices", "multipleendings"] },
  { name: ["워킹 시뮬", "Walking Sim"], tag: ["", ""], prof: { "verb.search": 1.0, "goal.narrative": 0.9, "growth.none": 0.5, "view.first": 0.5, "space.linear": 0.4 }, feats: [] },
  { name: ["경영 시뮬", "Management Sim"], tag: ["", ""], prof: { "verb.manage": 1.0, "goal.infinite": 0.9, "time.realtime": 0.5, "view.topdown": 0.4, "growth.none": 0.3, "fail.save": 0.4 }, feats: ["resourcemgmt", "timemgmt"] },
  { name: ["샌드박스 건설", "Sandbox Builder"], tag: ["", ""], prof: { "verb.build": 1.0, "goal.infinite": 0.85, "world.procedural": 0.4, "growth.none": 0.3, "space.open": 0.4 }, feats: ["basebuild", "crafting"] },
  { name: ["생존 크래프트", "Survival Craft"], tag: ["", ""], prof: { "verb.build": 0.7, "goal.survive": 0.85, "growth.equip": 0.6, "world.procedural": 0.5, "time.realtime": 0.6, "fail.permadeath": 0.4 }, feats: ["crafting", "inventory", "basebuild"] },
  { name: ["플랫포머", "Platformer"], tag: ["", ""], prof: { "verb.platform": 1.0, "space.linear": 0.7, "view.side": 0.8, "time.realtime": 0.7, "goal.clear": 0.6 }, feats: [] },
  { name: ["리듬게임", "Rhythm"], tag: ["", ""], prof: { "verb.rhythm": 1.0, "goal.score": 0.7, "time.realtime": 0.6 }, feats: ["scoreattack"] },
  { name: ["레이싱", "Racing"], tag: ["", ""], prof: { "verb.drive": 1.0, "goal.score": 0.5, "time.realtime": 0.7, "view.third": 0.4 }, feats: [] },
  { name: ["타워 디펜스", "Tower Defense"], tag: ["", ""], prof: { "verb.build": 0.8, "goal.survive": 0.9, "time.realtime": 0.8, "space.grid": 0.6, "view.topdown": 0.6, "growth.inrun": 0.5 }, feats: ["resourcemgmt"] },
  { name: ["덱빌딩", "Deckbuilder"], tag: ["로그라이크 덱", "Roguelike Deck"], prof: { "verb.card": 1.0, "time.turn": 0.9, "world.procedural": 0.6, "fail.permadeath": 0.5, "growth.inrun": 0.7, "goal.clear": 0.4 }, feats: [] },
  { name: ["메트로배니아", "Metroidvania"], tag: ["", ""], prof: { "verb.platform": 0.9, "view.side": 0.8, "space.open": 0.6, "growth.skilltree": 0.7, "fail.checkpoint": 0.7, "time.realtime": 0.7, "goal.clear": 0.5 }, feats: [] },
  { name: ["격투", "Fighting"], tag: ["대전 액션", "Versus"], prof: { "verb.melee": 1.0, "time.realtime": 0.9, "view.side": 0.8, "social.pvp": 0.7, "goal.score": 0.5, "space.single": 0.5 }, feats: ["classbased"] },
  { name: ["퍼즐", "Puzzle"], tag: ["", ""], prof: { "verb.puzzle": 1.0, "goal.clear": 0.6, "space.single": 0.5, "growth.none": 0.4 }, feats: [] },
  { name: ["시티 빌더", "City Builder"], tag: ["", ""], prof: { "verb.build": 0.9, "goal.infinite": 0.85, "view.topdown": 0.6, "time.realtime": 0.6, "world.fixed": 0.3 }, feats: ["resourcemgmt"] },
  { name: ["콜로니 심", "Colony Sim"], tag: ["", ""], prof: { "verb.manage": 0.9, "goal.survive": 0.7, "view.topdown": 0.6, "time.realtime": 0.6, "world.procedural": 0.4 }, feats: ["resourcemgmt", "crafting"] },
  { name: ["그랜드 전략", "Grand Strategy"], tag: ["", ""], prof: { "verb.unit": 0.9, "time.rtwp": 0.8, "goal.conquer": 0.9, "space.grid": 0.4, "growth.perm": 0.3 }, feats: ["resourcemgmt", "trading"] },
  { name: ["배틀로얄", "Battle Royale"], tag: ["", ""], prof: { "verb.shoot": 0.9, "social.pvp": 1.0, "goal.survive": 0.9, "space.open": 0.6, "view.third": 0.5 }, feats: ["loot"] },
  { name: ["MOBA", "MOBA"], tag: ["", ""], prof: { "verb.melee": 0.6, "view.topdown": 0.8, "social.pvp": 1.0, "time.realtime": 0.8, "goal.conquer": 0.5 }, feats: ["classbased"] },
  { name: ["오토배틀러", "Auto Battler"], tag: ["", ""], prof: { "verb.unit": 0.7, "time.realtime": 0.5, "social.pvp": 0.8, "growth.inrun": 0.7, "goal.clear": 0.4 }, feats: [] },
  { name: ["던전 크롤러", "Dungeon Crawler"], tag: ["", ""], prof: { "verb.melee": 0.7, "space.grid": 0.7, "world.procedural": 0.6, "growth.equip": 0.7, "view.first": 0.5, "fail.permadeath": 0.4 }, feats: ["inventory", "loot"] },
  { name: ["라이프 심", "Life Sim"], tag: ["", ""], prof: { "verb.manage": 0.7, "goal.infinite": 0.9, "time.realtime": 0.6, "growth.perm": 0.4, "social.solo": 0.4 }, feats: [] },
  { name: ["데이팅 심", "Dating Sim"], tag: ["", ""], prof: { "verb.dialogue": 1.0, "goal.narrative": 0.9, "growth.perm": 0.4, "fail.save": 0.4 }, feats: ["dialogueheavy", "romance", "multipleendings"] },
  { name: ["팜 시뮬", "Farming Sim"], tag: ["", ""], prof: { "verb.manage": 0.75, "verb.build": 0.5, "goal.infinite": 0.8, "growth.perm": 0.5, "time.realtime": 0.6, "world.fixed": 0.3, "view.topdown": 0.4 }, feats: ["crafting", "codex", "weather", "faction"] },
  { name: ["서바이버라이크", "Survivors-like"], tag: ["뱀서류", "Bullet Heaven"], prof: { "verb.shoot": 0.6, "goal.survive": 0.9, "growth.inrun": 0.9, "view.topdown": 0.6, "time.realtime": 0.8, "world.procedural": 0.4, "fail.permadeath": 0.4 }, feats: ["loot", "scoreattack"] },
  { name: ["방치형", "Idle/Incremental"], tag: ["", ""], prof: { "verb.manage": 0.6, "time.idle": 1.0, "goal.infinite": 0.9, "growth.meta": 0.7, "view.topdown": 0.2 }, feats: ["resourcemgmt", "achievements"] },
  { name: ["포인트앤클릭", "Point & Click"], tag: ["", ""], prof: { "verb.search": 0.9, "verb.dialogue": 0.6, "goal.narrative": 0.8, "growth.none": 0.5, "space.zoned": 0.4 }, feats: ["dialogueheavy", "inventory"] },
  { name: ["매치3", "Match-3"], tag: ["", ""], prof: { "verb.puzzle": 1.0, "goal.score": 0.7, "goal.clear": 0.5, "space.single": 0.6, "time.realtime": 0.4 }, feats: ["scoreattack"] },
  { name: ["소셜 추리", "Social Deduction"], tag: ["어몽어스류", "Among-like"], prof: { "verb.deduce": 0.9, "social.team": 0.8, "social.pvp": 0.5, "time.realtime": 0.6, "goal.clear": 0.4 }, feats: ["classbased"] },
  { name: ["벨트스크롤", "Beat 'em up"], tag: ["", ""], prof: { "verb.melee": 0.9, "view.side": 0.7, "space.linear": 0.6, "time.realtime": 0.8, "social.local": 0.4, "goal.clear": 0.5 }, feats: ["hacknslash"] },
  { name: ["이머시브 심", "Immersive Sim"], tag: ["", ""], prof: { "verb.search": 0.7, "verb.shoot": 0.4, "view.first": 0.8, "space.zoned": 0.5, "growth.equip": 0.4, "time.realtime": 0.7 }, feats: ["stealth", "choices", "inventory"] },
  { name: ["크리처 컬렉터", "Creature Collector"], tag: ["포켓몬류", "Pokémon-like"], prof: { "verb.collect": 0.9, "verb.melee": 0.3, "time.turn": 0.6, "growth.perm": 0.7, "goal.narrative": 0.5 }, feats: ["turnbasedcombat", "codex", "classbased"] },
  { name: ["추출 슈터", "Extraction Shooter"], tag: ["타르코프류", "Tarkov-like"], prof: { "verb.shoot": 0.9, "goal.extract": 1.0, "social.pvp": 0.6, "growth.equip": 0.5, "view.first": 0.6, "world.procedural": 0.3 }, feats: ["loot", "inventory", "guncustom"] },
];

/* ================= 요소 ↔ 요소 관계 ================= */
export const CONFLICTS = [
  ["time.turn", "verb.rhythm", ["턴제 ↔ 리듬 입력 충돌", "turn-based ✗ rhythm"]],
  ["time.turn", "verb.drive", ["턴제 ↔ 운전 충돌", "turn-based ✗ driving"]],
  ["time.turn", "verb.platform", ["턴제 ↔ 점프 액션 충돌", "turn-based ✗ platforming"]],
  ["time.turn", "verb.aim", ["턴제 ↔ 실시간 조준 충돌", "turn-based ✗ real-time aim"]],
  ["time.atb", "verb.rhythm", ["반턴제 ↔ 리듬 충돌", "ATB ✗ rhythm"]],
  ["time.atb", "verb.platform", ["반턴제 ↔ 점프 충돌", "ATB ✗ platforming"]],
  ["time.idle", "verb.rhythm", ["방치 ↔ 실시간 조작 배타", "idle ✗ active input"]],
  ["time.idle", "verb.drive", ["방치 ↔ 실시간 조작 배타", "idle ✗ active input"]],
  ["time.idle", "verb.platform", ["방치 ↔ 실시간 조작 배타", "idle ✗ active input"]],
  ["time.idle", "verb.aim", ["방치 ↔ 실시간 조작 배타", "idle ✗ active input"]],
  ["time.idle", "verb.shoot", ["방치 ↔ 실시간 조작 배타", "idle ✗ active input"]],
  ["time.idle", "verb.melee", ["방치 ↔ 실시간 조작 배타", "idle ✗ active input"]],
  ["social.mmo", "fail.permadeath", ["MMO ↔ 퍼머데스 거의 배타", "MMO ✗ permadeath"]],
  ["social.mmo", "growth.none", ["MMO ↔ 성장 없음 충돌", "MMO ✗ no growth"]],
  ["goal.infinite", "fail.permadeath", ["무한 ↔ 퍼머데스 긴장", "endless ✗ permadeath"]],
];
export const SYNERGIES = [
  ["fail.permadeath", "world.procedural", ["퍼머데스 + 절차 생성 = 로그라이크", "permadeath + procedural → roguelike"]],
  ["world.procedural", "growth.meta", ["절차 생성 + 메타 성장 = 로그라이트", "procedural + meta → roguelite"]],
  ["view.first", "dim.3d", ["1인칭 + 3D", "first-person + 3D"]],
  ["view.side", "dim.2d", ["사이드뷰 + 2D", "side + 2D"]],
  ["view.topdown", "space.grid", ["탑다운 + 그리드", "top-down + grid"]],
  ["verb.unit", "space.grid", ["부대 관리 + 그리드", "unit command + grid"]],
  ["verb.shoot", "view.first", ["쏘기 + 1인칭 = FPS", "shoot + first-person → FPS"]],
  ["verb.card", "time.turn", ["카드 + 턴제", "cards + turn-based"]],
  ["growth.equip", "goal.narrative", ["장비 축적 + 서사 = RPG", "gear + narrative → RPG"]],
  ["econ.gacha", "growth.perm", ["가챠 + 영구 성장", "gacha + permanent growth"]],
];

/* ================= 스팀 테마 태그 ================= */
export const TAG_GROUPS = [
  { name: ["테마·무드", "Themes & Moods"], tags: [
    ["atmospheric", "분위기 있는", "Atmospheric", 46532], ["relaxing", "힐링", "Relaxing", 29102], ["funny", "웃긴", "Funny", 26454],
    ["horror", "호러", "Horror", 25048], ["dark", "다크", "Dark", 18307], ["mystery", "미스터리", "Mystery", 18213],
    ["psyhorror", "심리 호러", "Psychological Horror", 16796], ["comedy", "코미디", "Comedy", 16571], ["emotional", "감성적", "Emotional", 11047],
    ["surreal", "초현실", "Surreal", 8425], ["psychological", "심리", "Psychological", 6594], ["cozy", "아늑한", "Cozy", 4124],
    ["psychedelic", "사이키델릭", "Psychedelic", 4111], ["memes", "밈", "Memes", 3309], ["noir", "느와르", "Noir", 2495],
    ["wholesome", "훈훈한", "Wholesome", 2007], ["parody", "패러디", "Parody", 1981], ["satire", "풍자", "Satire", 1787], ["nostalgia", "노스탤지어", "Nostalgia", 571],
  ]},
  { name: ["세계관·설정", "Setting"], tags: [
    ["fantasy", "판타지", "Fantasy", 39835], ["scifi", "SF", "Sci-fi", 23034], ["magic", "마법", "Magic", 15470],
    ["medieval", "중세", "Medieval", 11319], ["darkfantasy", "다크 판타지", "Dark Fantasy", 10944], ["space", "우주", "Space", 10794],
    ["futuristic", "미래적", "Futuristic", 10649], ["nature", "자연", "Nature", 9308], ["postapoc", "포스트아포칼립스", "Post-apocalyptic", 7720],
    ["war", "전쟁", "War", 6915], ["historical", "역사", "Historical", 6701], ["military", "밀리터리", "Military", 5773],
    ["cyberpunk", "사이버펑크", "Cyberpunk", 5458], ["supernatural", "초자연", "Supernatural", 5610], ["modern", "현대", "Modern", 4495],
    ["dystopian", "디스토피아", "Dystopian", 4378], ["mythology", "신화", "Mythology", 3429], ["lovecraftian", "러브크래프트풍", "Lovecraftian", 2347],
    ["steampunk", "스팀펑크", "Steampunk", 1372], ["timetravel", "시간여행", "Time Travel", 1372], ["western", "서부극", "Western", 1003],
  ]},
  { name: ["소재", "Subject"], tags: [
    ["zombies", "좀비", "Zombies", 6438], ["demons", "악마", "Demons", 5252], ["aliens", "외계인", "Aliens", 4985],
    ["robots", "로봇", "Robots", 4904], ["cats", "고양이", "Cats", 4174], ["dragons", "드래곤", "Dragons", 4018],
    ["mechs", "메카", "Mechs", 1653], ["ninja", "닌자", "Ninja", 1630], ["dogs", "강아지", "Dogs", 1527],
    ["pirates", "해적", "Pirates", 1408], ["vampires", "뱀파이어", "Vampires", 1362], ["dinosaurs", "공룡", "Dinosaurs", 1036],
    ["superhero", "슈퍼히어로", "Superhero", 967], ["werewolves", "늑대인간", "Werewolves", 475], ["samurai", "사무라이", "Samurai", 105],
  ]},
  { name: ["그래픽 스타일", "Visual Style"], tags: [
    ["colorful", "컬러풀", "Colorful", 41784], ["pixel", "픽셀아트", "Pixel Graphics", 38753], ["cute", "귀여운", "Cute", 38598],
    ["anime", "애니메", "Anime", 25978], ["stylized", "스타일라이즈드", "Stylized", 25901], ["retro", "레트로", "Retro", 21173],
    ["realistic", "사실적", "Realistic", 20378], ["cartoony", "카투니", "Cartoony", 17716], ["handdrawn", "핸드드로잉", "Hand-drawn", 14445],
    ["minimalist", "미니멀", "Minimalist", 13673], ["cinematic", "시네마틱", "Cinematic", 7395], ["abstract", "추상적", "Abstract", 5290],
    ["voxel", "복셀", "Voxel", 1582], ["textbased", "텍스트 기반", "Text-Based", 7688],
  ]},
  { name: ["소재·활동", "Subject/Activity"], tags: [
    ["driving", "드라이빙", "Driving", 5048], ["flight", "비행", "Flight", 3582], ["cooking", "요리", "Cooking", 2820],
    ["mining", "채굴", "Mining", 1858], ["fishing", "낚시", "Fishing", 1665], ["gambling", "도박", "Gambling", 1515],
    ["trains", "기차", "Trains", 1377], ["hunting", "사냥", "Hunting", 1183], ["hacking", "해킹", "Hacking", 1181],
    ["programming", "프로그래밍", "Programming", 1052], ["sailing", "항해", "Sailing", 815], ["farming", "농사", "Farming", 576],
  ]},
  { name: ["수위·자극", "Mature"], tags: [
    ["sexual", "성적 콘텐츠", "Sexual Content", 19040], ["nudity", "노출", "Nudity", 17677], ["violent", "폭력적", "Violent", 16150],
    ["adult", "성인 콘텐츠", "Adult Content", 14034], ["gore", "고어", "Gore", 13491], ["hentai", "헨타이", "Hentai", 7996],
  ]},
];
export const TAG_BY = {};
TAG_GROUPS.forEach((grp) => grp.tags.forEach(([id, ko, en, n]) => (TAG_BY[id] = { id, name: [ko, en], n })));

/* ================= UI 항목별 하위 옵션 ================= */
export const SUB_DETAILS = {
  "Title Screen": [["메인·시작 메뉴", "Main/Start Menu"]],
  "Settings": [["카메라 설정", "Camera"], ["비디오·사운드", "Video/Audio"], ["옵션 초기화", "Reset Defaults"]],
  "Inventory Grid": [["보유 재화 확인", "Currency"]],
  "Quest Log": [["목표(Objectives)", "Objectives"], ["일일 미션", "Daily Missions"]],
  "World Map": [["전화면 맵", "Full-Screen"], ["던전 직링크", "Dungeon Warp"]],
  "Stat Sheet": [["코스튬", "Costume"]],
  "Codex Screen": [["인물 도감", "Characters"], ["펫 도감", "Pets"], ["몬스터 도감", "Monsters"], ["아이템 도감", "Items"]],
  "Party Frames": [["파티 구성 화면", "Party Formation"]],
  "Friends List": [["우편함", "Mailbox"]],
};

/* ================= 화면별 분류 ================= */
export const SCREENS_DEF = [
  ["system", ["메뉴·시스템", "Menus & System"], "#8C9BAB"],
  ["hud", ["기본 게임 화면 (HUD)", "In-Game HUD"], "#E0A33E"],
  ["combat", ["전투 오버레이", "Combat Overlay"], "#D4674E"],
  ["character", ["캐릭터·성장", "Character & Growth"], "#9B8BC4"],
  ["inventory", ["인벤토리·제작", "Inventory & Crafting"], "#C89B5A"],
  ["map", ["맵 화면", "Map"], "#5BB784"],
  ["quest", ["퀘스트·진행", "Quests & Progress"], "#6E9BC4"],
  ["achieve", ["업적", "Achievements"], "#E0C64E"],
  ["codex", ["도감·수집", "Codex & Collection"], "#5FB3B3"],
  ["shop", ["상점·경제", "Shop & Economy"], "#C77DBB"],
  ["social", ["소셜·멀티", "Social & Multiplayer"], "#5A9BD4"],
  ["result", ["결과·전환", "Results & Transitions"], "#CB6A54"],
];
const _SCREEN_GROUPS = {
  system: ["Title Screen", "Main Menu", "Settings", "Pause Menu", "Credits", "Save/Load Menu", "Seed I/O", "Difficulty Select", "Level Editor", "Controller Prompts", "Focus Nav", "Split Viewport", "Split-Screen", "Stage Select", "Camera Control", "Login/Account"],
  combat: ["Target Highlight", "End Turn", "Turn Order", "ATB Gauge", "Pause Toggle", "Command Queue", "Action Points", "Skill Targeting", "Boss Health Bar", "Range Overlay", "Grid Overlay", "Evidence Board", "Accuse/Vote"],
  character: ["Roster", "Run Upgrades", "Stat Sheet", "Level-Up Screen", "Skill Tree", "Skill Points", "Meta Unlocks", "Meta Currency", "Customization", "Presets", "Class Select", "Reputation"],
  inventory: ["Inventory Grid", "Equipment Slots", "Item Tooltip", "Crafting Screen", "Rarity Colors", "Compare Tooltip", "Weapon Modding"],
  map: ["World Map", "Hub Navigation", "Zone Map", "Lock/Unlock", "Travel Points", "Map Markers"],
  quest: ["Quest Log", "Chapter", "Stats Dashboard", "Conquest Goal", "Progress", "Boss List", "Supply Dashboard"],
  achieve: ["Achievement List", "Progress/Reward", "Milestones"],
  codex: ["Codex Screen", "Collection Progress", "Collection Log", "Endings List"],
  shop: ["Shop Screen", "Currency", "Item Cards", "Item Detail", "Preview", "Gacha Roll", "Rates/Pity", "Result Screen", "Market List", "Sell Listing", "Price History", "Trade Window", "Price Info", "Trade/Shop", "Season Pass Track", "Season Timer", "Ad Reward Button"],
  social: ["Party Frames", "Join Prompt", "Team Setup", "Team Score", "Match/Lobby", "Chat", "Party/Guild", "Friends List", "Async Notifications", "Leaderboard"],
  result: ["Clear Screen", "High Score", "Death Screen", "Run Summary", "Instant Retry", "Continue Screen", "Idle Earnings"],
};
const SCREEN_OF = {};
Object.entries(_SCREEN_GROUPS).forEach(([sid, names]) => names.forEach((n) => (SCREEN_OF[n] = sid)));
export const screenOf = (enName) => SCREEN_OF[enName] || "hud";

/* ================= 순수 로직 ================= */
export function genreTemplate(g) {
  const best = {};
  Object.entries(g.prof).forEach(([k, w]) => { const ax = AXIS_OF[k]; if (!best[ax] || w > best[ax].w) best[ax] = { el: k.split(".")[1], w }; });
  const sel = {};
  Object.entries(best).forEach(([ax, o]) => (sel[ax] = [o.el]));
  return sel;
}
export function axisSig(sel) {
  return Object.keys(sel).filter((a) => sel[a] && sel[a].length).sort()
    .map((a) => `${a}.${[...sel[a]].sort().join("+")}`).join("|");
}
export function fullSig(sel, featArr) { return axisSig(sel) + "#" + [...featArr].sort().join(","); }

GENRES.forEach((g) => {
  const m = {};
  Object.entries(g.prof).forEach(([k, w]) => { const ax = AXIS_OF[k]; m[ax] = Math.max(m[ax] || 0, w); });
  g._axisMax = m;
  g._sig = fullSig(genreTemplate(g), g.feats || []);
});

export function scoreGenres(selKeys) {
  const raws = GENRES.map((g) => {
    let raw = 0;
    selKeys.forEach((k) => {
      if (g.prof[k] != null) raw += g.prof[k];
      else { const ax = AXIS_OF[k]; if (g._axisMax[ax]) raw -= 0.55 * g._axisMax[ax]; }
    });
    return { g, raw };
  });
  const pos = raws.filter((r) => r.raw > 0.01);
  if (!pos.length) return [];
  const mx = Math.max(...pos.map((r) => r.raw));
  const exps = pos.map((r) => ({ g: r.g, e: Math.exp((r.raw - mx) * 1.7) }));
  const sum = exps.reduce((a, b) => a + b.e, 0);
  return exps.map((x) => ({ g: x.g, p: x.e / sum })).sort((a, b) => b.p - a.p);
}

export function deriveUI(axisKeys, featSet) {
  const map = {};
  const add = (item, src) => {
    const key = item[0][1];
    if (!map[key]) map[key] = { n: item[0], d: item[1], src: [] };
    if (src && !map[key].src.some((s) => s[1] === src[1])) map[key].src.push(src);
  };
  axisKeys.forEach((k) => (UI_MAP[k] || []).forEach((it) => add(it, LABEL[k])));
  FEATURES.forEach((f) => { if (featSet.has(f.id)) f.ui.forEach((it) => add(it, f.name)); });
  return Object.values(map).sort((a, b) => b.src.length - a.src.length);
}
