/* 게임 요소 그물 네트워크 — Game Designer's Mechanic Mesh v2.0 */
import React, { useState, useMemo, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  C, AXES, LABEL, AXIS_OF, FEATURES, FEAT_BY, UI_MAP, BASE_UI, GENRES,
  CONFLICTS, SYNERGIES, TAG_GROUPS, TAG_BY, SUB_DETAILS, SCREENS_DEF, screenOf,
  genreTemplate, fullSig, scoreGenres, deriveUI,
} from "./data.js";

const SITE = "https://zondug.github.io/game-tools/";
const VERSION = "v2.0";

// 이중언어: [ko,en] 배열이면 로케일 선택
let IDX = 0;
const T = (p) => (Array.isArray(p) ? p[IDX] : p);

/* URL 해시 직렬화 */
const encodeState = (st) => {
  try { return btoa(unescape(encodeURIComponent(JSON.stringify(st)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
  catch (e) { return ""; }
};
const decodeState = (s) => {
  try { return JSON.parse(decodeURIComponent(escape(atob(s.replace(/-/g, "+").replace(/_/g, "/"))))); }
  catch (e) { return null; }
};
const readHash = () => {
  const m = location.hash.match(/^#z=(.+)$/);
  return m ? decodeState(m[1]) : null;
};

const PRIO_ORDER = [null, "P0", "P1", "P2"];
const PRIO_COLOR = { P0: "#D4674E", P1: "#E0A33E", P2: "#6E9BC4" };

function App() {
  const boot = useRef(readHash()).current || {};
  const [locale, setLocale] = useState(boot.lc || "ko");
  IDX = locale === "ko" ? 0 : 1;
  const ko = locale === "ko";

  const [sel, setSel] = useState(boot.s || {});
  const [feats, setFeats] = useState(new Set(boot.f || []));
  const [tags, setTags] = useState(new Set(boot.g || []));
  const [unchecked, setUnchecked] = useState(new Set(boot.u || []));
  const [title, setTitle] = useState(boot.t || "");
  const [customUI, setCustomUI] = useState(boot.c || []); // [{n:이름, d:메모, screen}]
  const [prio, setPrio] = useState(boot.p || {});         // key -> P0|P1|P2
  const [templates, setTemplates] = useState(() => { try { return JSON.parse(localStorage.getItem("gemm_templates_v1") || "{}"); } catch (e) { return {}; } });
  const [activeTpl, setActiveTpl] = useState(null);
  const [tplName, setTplName] = useState("");
  const [q, setQ] = useState("");                         // 검색 필터
  const [custName, setCustName] = useState("");
  const [custScreen, setCustScreen] = useState("hud");
  const [copied, setCopied] = useState("");               // 복사 피드백

  const selKeys = useMemo(() => new Set(Object.entries(sel).flatMap(([a, arr]) => (arr || []).map((e) => `${a}.${e}`))), [sel]);
  const uiList = useMemo(() => deriveUI(selKeys, feats), [selKeys, feats]);
  const allItems = useMemo(() => [
    ...BASE_UI.map((u) => ({ nm: u[0], desc: u[1], src: [], base: true, screen: screenOf(u[0][1]) })),
    ...uiList.map((u) => ({ nm: u.n, desc: u.d, src: u.src, screen: screenOf(u.n[1]) })),
    ...customUI.map((cu, i) => ({ nm: [cu.n, cu.n], desc: [cu.d || "", cu.d || ""], src: [], custom: true, ci: i, screen: cu.screen || "hud" })),
  ], [uiList, customUI]);
  const itemsByScreen = (sid) => allItems.filter((it) => it.screen === sid);
  const chosenCount = selKeys.size + feats.size;

  const sig = useMemo(() => fullSig(sel, feats), [sel, feats]);
  const exactGenre = useMemo(() => GENRES.find((g) => g._sig === sig && selKeys.size) || null, [sig, selKeys]);
  const derived = useMemo(() => scoreGenres(selKeys).filter((x) => x.p > 0.02).slice(0, 4), [selKeys]);

  // 요소 관계
  const { relMap, activeRels } = useMemo(() => {
    const rm = {}; const active = [];
    const flag = (k, t) => { (rm[k] = rm[k] || {})[t] = true; };
    CONFLICTS.forEach(([a, b, r]) => {
      const sa = selKeys.has(a), sb = selKeys.has(b);
      if (sa && sb) { active.push({ type: "conflict", r }); flag(a, "conflict"); flag(b, "conflict"); }
      else if (sa) flag(b, "conflict"); else if (sb) flag(a, "conflict");
    });
    SYNERGIES.forEach(([a, b, r]) => {
      const sa = selKeys.has(a), sb = selKeys.has(b);
      if (sa && sb) active.push({ type: "synergy", r });
      else if (sa) flag(b, "synergy"); else if (sb) flag(a, "synergy");
    });
    return { relMap: rm, activeRels: active };
  }, [selKeys]);

  /* ── URL 해시 동기화 ── */
  useEffect(() => {
    const st = { lc: locale, s: sel, f: [...feats], g: [...tags], u: [...unchecked], t: title, c: customUI, p: prio };
    const empty = !selKeys.size && !feats.size && !tags.size && !unchecked.size && !title && !customUI.length;
    history.replaceState(null, "", empty ? location.pathname + location.search : "#z=" + encodeState(st));
  }, [locale, sel, feats, tags, unchecked, title, customUI, prio]);

  /* ── Undo ── */
  const histRef = useRef([]);
  const restoringRef = useRef(false);
  const coreState = () => ({ sel, feats: [...feats], tags: [...tags], unchecked: [...unchecked], title, customUI, prio });
  useEffect(() => {
    if (restoringRef.current) { restoringRef.current = false; return; }
    histRef.current.push(JSON.stringify(coreState()));
    if (histRef.current.length > 60) histRef.current.shift();
  }, [sel, feats, tags, unchecked, title, customUI, prio]);
  const applyState = (d) => {
    restoringRef.current = true;
    setSel(d.sel || {}); setFeats(new Set(d.feats || [])); setTags(new Set(d.tags || []));
    setUnchecked(new Set(d.unchecked || [])); setTitle(d.title || ""); setCustomUI(d.customUI || d.c || []); setPrio(d.prio || d.p || {});
  };
  const undo = () => {
    const h = histRef.current;
    if (h.length < 2) return;
    h.pop();
    applyState(JSON.parse(h[h.length - 1]));
  };
  useEffect(() => {
    const onKey = (e) => { if ((e.metaKey || e.ctrlKey) && e.key === "z" && !e.shiftKey && document.activeElement.tagName !== "INPUT") { e.preventDefault(); undo(); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const MULTI = { verb: 1, goal: 1, growth: 1, social: 1, econ: 1 };
  const pickGenre = (g) => { setSel(genreTemplate(g)); setFeats(new Set(g.feats || [])); };
  const toggle = (axisId, elId) => setSel((p) => {
    const cur = p[axisId] ? [...p[axisId]] : [];
    const i = cur.indexOf(elId);
    let next;
    if (MULTI[axisId]) { if (i >= 0) cur.splice(i, 1); else cur.push(elId); next = cur; }
    else next = (i >= 0 && cur.length === 1) ? [] : [elId];
    const n = { ...p };
    if (next.length) n[axisId] = next; else delete n[axisId];
    return n;
  });
  const toggleSet = (setter) => (id) => setter((p) => { const n = new Set(p); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const toggleFeat = toggleSet(setFeats);
  const toggleTag = toggleSet(setTags);
  const toggleCheck = toggleSet(setUnchecked);
  const checked = (key) => !unchecked.has(key);
  const cyclePrio = (key) => setPrio((p) => {
    const cur = p[key] || null;
    const next = PRIO_ORDER[(PRIO_ORDER.indexOf(cur) + 1) % PRIO_ORDER.length];
    const n = { ...p };
    if (next) n[key] = next; else delete n[key];
    return n;
  });
  const reset = () => { setSel({}); setFeats(new Set()); setTags(new Set()); setUnchecked(new Set()); setTitle(""); setCustomUI([]); setPrio({}); };

  /* ── 커스텀 UI ── */
  const addCustom = () => {
    const nm = custName.trim();
    if (!nm) return;
    setCustomUI((p) => [...p, { n: nm, d: "", screen: custScreen }]);
    setCustName("");
  };
  const removeCustom = (i) => setCustomUI((p) => p.filter((_, j) => j !== i));

  /* ── 템플릿 ── */
  const persistTpl = (obj) => { try { localStorage.setItem("gemm_templates_v1", JSON.stringify(obj)); } catch (e) {} };
  const snapshot = () => ({ sel, feats: [...feats], tags: [...tags], unchecked: [...unchecked], title, customUI, prio });
  const saveTpl = (name) => { const nm = (name || "").trim(); if (!nm) return; const next = { ...templates, [nm]: snapshot() }; setTemplates(next); persistTpl(next); setActiveTpl(nm); setTplName(""); };
  const loadTpl = (name) => { const d = templates[name]; if (!d) return; applyState(d); restoringRef.current = false; setActiveTpl(name); };
  const toggleTpl = (name) => { if (activeTpl === name) { reset(); setActiveTpl(null); } else loadTpl(name); };
  const updateTpl = () => { if (!activeTpl) return; const next = { ...templates, [activeTpl]: snapshot() }; setTemplates(next); persistTpl(next); };
  const deleteTpl = (name) => { const next = { ...templates }; delete next[name]; setTemplates(next); persistTpl(next); if (activeTpl === name) setActiveTpl(null); };
  const exportTpls = () => {
    const b = new Blob([JSON.stringify(templates, null, 2)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "gemm-templates.json"; a.click(); URL.revokeObjectURL(a.href);
  };
  const importTpls = (file) => {
    const r = new FileReader();
    r.onload = () => { try { const obj = JSON.parse(r.result); if (obj && typeof obj === "object") { const next = { ...templates, ...obj }; setTemplates(next); persistTpl(next); } } catch (e) {} };
    r.readAsText(file);
  };

  /* ── 검색 매칭 ── */
  const matches = (lbl) => {
    if (!q.trim()) return true;
    const s = q.trim().toLowerCase();
    return T(lbl).toLowerCase().includes(s) || (Array.isArray(lbl) && (lbl[0].toLowerCase().includes(s) || lbl[1].toLowerCase().includes(s)));
  };

  /* ── 스타일 ── */
  const axisChipStyle = (isSel, dim, rel, dimSearch) => {
    let border = C.border, bg = C.surface2, color = C.text, weight = 400, dash = false, op = 1;
    if (dim && !isSel) { color = C.faint; bg = "transparent"; }
    if (rel && rel.synergy && !isSel) { border = C.teal; bg = C.tealTint; color = "#CDE8D9"; }
    if (rel && rel.conflict && !isSel) { border = C.warn; bg = C.warnTint; color = "#E7B6A6"; dash = true; }
    if (isSel) { border = (rel && rel.conflict) ? C.warn : C.blue; bg = C.blueTint; color = "#CFE0EE"; weight = 700; }
    if (dimSearch) op = 0.25;
    return { border: `1px ${dash ? "dashed" : "solid"} ${border}`, background: bg, color, fontWeight: weight, opacity: op, borderRadius: 6, padding: "7px 11px", fontSize: 13.5, lineHeight: 1.2, cursor: "pointer", transition: "all .12s", userSelect: "none", WebkitTapHighlightColor: "transparent" };
  };
  const multiChipStyle = (on, col, tint, dimSearch) => ({
    border: `1px solid ${on ? col : C.border}`, background: on ? tint : C.surface2, color: on ? "#EAF1EE" : C.text,
    fontWeight: on ? 700 : 400, opacity: dimSearch ? 0.25 : 1, borderRadius: 6, padding: "7px 11px", fontSize: 13, lineHeight: 1.2, cursor: "pointer", transition: "all .12s", userSelect: "none",
  });
  const exportBtn = { cursor: "pointer", flex: 1, minWidth: 90, background: C.surface2, border: `1px solid ${C.border}`, color: C.text, borderRadius: 7, padding: "8px", fontSize: 12.5 };
  const smallBtn = { cursor: "pointer", background: C.surface2, border: `1px solid ${C.border}`, color: C.text, borderRadius: 6, padding: "5px 11px", fontSize: 12.5 };

  const genreName = (g) => T(g.name);
  const summaryChips = [
    ...Object.entries(sel).flatMap(([a, arr]) => (arr || []).map((e) => ({ kind: "axis", key: `${a}.${e}`, label: LABEL[`${a}.${e}`], on: () => toggle(a, e) }))),
    ...[...feats].map((id) => ({ kind: "feat", key: "f:" + id, label: FEAT_BY[id].name, on: () => toggleFeat(id) })),
    ...[...tags].map((id) => ({ kind: "tag", key: "t:" + id, label: TAG_BY[id].name, on: () => toggleTag(id) })),
  ];

  /* ── 흐름도 데이터 (체크된 항목이 있는 화면) ── */
  const flowScreens = SCREENS_DEF.filter(([sid]) => itemsByScreen(sid).some((it) => checked(it.nm[1])));

  const mermaidFlow = () => {
    const nid = (sid) => sid.toUpperCase();
    const L = ["```mermaid", "flowchart LR"];
    L.push(`  TITLE[${ko ? "타이틀" : "Title"}] --> MAIN[${ko ? "메인 메뉴" : "Main Menu"}]`);
    const hasHud = flowScreens.some(([sid]) => sid === "hud");
    if (hasHud) L.push(`  MAIN --> HUD[${T(SCREENS_DEF.find(([s]) => s === "hud")[1])}]`);
    flowScreens.forEach(([sid, snm]) => {
      if (sid === "hud") return;
      const label = T(snm);
      if (sid === "system" || sid === "result") L.push(`  MAIN --- ${nid(sid)}[${label}]`);
      else L.push(`  ${hasHud ? "HUD" : "MAIN"} <--> ${nid(sid)}[${label}]`);
    });
    L.push("```");
    return L.join("\n");
  };

  /* ── 내보내기 ── */
  const axesSel = AXES.map((ax) => ({ name: T(ax.name), els: (sel[ax.id] || []).map((id) => T(LABEL[`${ax.id}.${id}`])) })).filter((a) => a.els.length);
  const featSel = FEATURES.filter((f) => feats.has(f.id)).map((f) => T(f.name));
  const tagSel = [...tags].map((id) => T(TAG_BY[id].name));
  const prioTag = (key) => (prio[key] ? `[${prio[key]}] ` : "");

  const buildMd = () => {
    const L = [];
    if (title.trim()) L.push("# " + title.trim(), "", "_" + (ko ? "게임 UI 스펙 시트" : "Game UI Spec Sheet") + "_", "");
    else L.push("# " + (ko ? "게임 UI 스펙 시트" : "Game UI Spec Sheet"), "");
    L.push("- " + (ko ? "장르" : "Genre") + ": " + (exactGenre ? T(exactGenre.name) : (ko ? "커스텀 조합" : "Custom")));
    if (derived.length) L.push("- " + (ko ? "가까운 장르" : "Closest") + ": " + derived.map((d) => T(d.g.name) + " " + Math.round(d.p * 100) + "%").join(", "));
    L.push("", "## " + (ko ? "선택 요소" : "Elements"));
    axesSel.forEach((a) => L.push("- **" + a.name + "**: " + a.els.join(", ")));
    if (featSel.length) { L.push("", "## " + (ko ? "기능" : "Features")); featSel.forEach((f) => L.push("- " + f)); }
    if (activeRels.length) { L.push("", "## " + (ko ? "관계" : "Relations")); activeRels.forEach((r) => L.push("- " + (r.type === "conflict" ? "⚠ " : "✦ ") + T(r.r))); }
    if (tagSel.length) { L.push("", "## " + (ko ? "테마 태그" : "Theme Tags"), tagSel.join(", ")); }
    const pushSubs = (key) => (SUB_DETAILS[key] || []).forEach((sub) => { if (checked(key + "::" + sub[1])) L.push("  - " + T(sub)); });
    L.push("", "## " + (ko ? "필요 UI 요소" : "Required UI"));
    SCREENS_DEF.forEach(([sid, snm]) => {
      const items = allItems.filter((it) => it.screen === sid && checked(it.nm[1]));
      if (!items.length) return;
      L.push("", "### " + T(snm));
      items.forEach((it) => {
        L.push("- " + prioTag(it.nm[1]) + T(it.nm) + (T(it.desc) ? " — " + T(it.desc) : "") + (it.src && it.src.length ? " (" + (ko ? "유래" : "from") + ": " + it.src.map((s) => T(s)).join(", ") + ")" : "") + (it.custom ? (ko ? " (직접 추가)" : " (custom)") : ""));
        pushSubs(it.nm[1]);
      });
    });
    if (flowScreens.length) { L.push("", "## " + (ko ? "화면 흐름도" : "Screen Flow"), "", mermaidFlow()); }
    L.push("", "---", `[Game Designer's Mechanic Mesh](${SITE}), 2026 Wissen & Ferme · zondug@me.com`);
    return L.join("\n");
  };
  const flash = (k) => { setCopied(k); setTimeout(() => setCopied(""), 1500); };
  const copyMd = () => { navigator.clipboard.writeText(buildMd()); flash("md"); };
  const dlMd = () => { const b = new Blob([buildMd()], { type: "text/markdown" }); const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "game-ui-spec.md"; a.click(); URL.revokeObjectURL(a.href); };
  const copyLink = () => { navigator.clipboard.writeText(location.href); flash("link"); };

  /* ── UI 항목 렌더 ── */
  const box = (on, sz) => ({ width: sz || 14, height: sz || 14, flexShrink: 0, borderRadius: 3, border: `1px solid ${on ? C.blue : C.faint}`, background: on ? C.blue : "transparent", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#161D23", fontWeight: 900 });
  const UIItem = ({ it }) => {
    const key = it.nm[1], on = checked(key), subs = SUB_DETAILS[key] || [];
    const pv = prio[key];
    return (
      <div style={{ borderLeft: `2px solid ${it.base ? C.faint : it.custom ? C.violet : C.blue}`, paddingLeft: 10, opacity: on ? 1 : 0.5 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <button onClick={() => toggleCheck(key)} style={{ display: "flex", alignItems: "center", gap: 7, background: "transparent", border: "none", padding: 0, cursor: "pointer", textAlign: "left", flex: 1, minWidth: 0 }}>
            <span style={box(on)}>{on ? "✓" : ""}</span>
            <span style={{ fontSize: 13.5, color: C.text, fontWeight: 600, textDecoration: on ? "none" : "line-through" }}>{T(it.nm)}</span>
            {it.src && it.src.length > 1 && <span style={{ font: "10px ui-monospace,monospace", color: C.blue }}>×{it.src.length}</span>}
          </button>
          <button onClick={() => cyclePrio(key)} title={ko ? "우선순위 (클릭 순환)" : "priority (click to cycle)"}
            style={{ cursor: "pointer", flexShrink: 0, fontSize: 10, fontWeight: 700, borderRadius: 4, padding: "1px 6px",
              border: `1px solid ${pv ? PRIO_COLOR[pv] : C.border}`, background: "transparent",
              color: pv ? PRIO_COLOR[pv] : C.faint }}>{pv || "P?"}</button>
          {it.custom && <button onClick={() => removeCustom(it.ci)} style={{ cursor: "pointer", flexShrink: 0, background: "transparent", border: "none", color: C.faint, fontSize: 13, fontWeight: 700, padding: 0 }}>×</button>}
        </div>
        {T(it.desc) ? <div style={{ fontSize: 11, color: C.faint, padding: "2px 0 0 21px" }}>{T(it.desc)}</div> : null}
        {it.src && it.src.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: 4, padding: "3px 0 0 21px" }}>{it.src.map((s) => <span key={s[1]} style={{ fontSize: 10, color: C.muted, background: C.surface2, borderRadius: 3, padding: "1px 5px" }}>{T(s)}</span>)}</div>}
        {subs.map((sub) => { const sk = key + "::" + sub[1], son = checked(sk); return (
          <button key={sk} onClick={() => toggleCheck(sk)} style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: "none", padding: "3px 0 0 21px", cursor: "pointer", textAlign: "left", width: "100%" }}>
            <span style={box(son, 12)}>{son ? "✓" : ""}</span>
            <span style={{ fontSize: 11.5, color: C.muted, textDecoration: son ? "none" : "line-through" }}>{T(sub)}</span>
          </button>
        ); })}
      </div>
    );
  };

  /* ── 인쇄용 SVG 흐름도 (허브-스포크) ── */
  const FlowSVG = () => {
    if (!flowScreens.length) return null;
    const others = flowScreens.filter(([sid]) => sid !== "hud");
    const hasHud = flowScreens.length !== others.length;
    const W = 640, H = 90 + Math.ceil(others.length / 3) * 74;
    const cx = W / 2;
    const hubY = 46;
    return (
      <svg width={W} height={H} style={{ maxWidth: "100%" }}>
        <rect x={cx - 70} y={hubY - 18} width={140} height={34} rx={7} fill="none" stroke="#333" strokeWidth="1.5" />
        <text x={cx} y={hubY + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="#111">{hasHud ? T(SCREENS_DEF.find(([s]) => s === "hud")[1]) : (ko ? "메인 메뉴" : "Main Menu")}</text>
        {others.map(([sid, snm, col], i) => {
          const colN = i % 3, row = Math.floor(i / 3);
          const bx = 40 + colN * ((W - 80) / 3) + ((W - 80) / 6) - 80;
          const by = 100 + row * 74;
          return (
            <g key={sid}>
              <line x1={cx} y1={hubY + 17} x2={bx + 80} y2={by} stroke="#bbb" strokeWidth="1" />
              <rect x={bx} y={by} width={160} height={32} rx={6} fill="none" stroke={col} strokeWidth="1.5" />
              <text x={bx + 80} y={by + 20} textAnchor="middle" fontSize="11" fill="#111">{T(snm)}</text>
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text }}>
      <div className="no-print" style={{ maxWidth: 1120, margin: "0 auto", padding: "22px 20px 60px" }}>
        {/* 헤더 */}
        <header style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, flexWrap: "wrap" }}>
            <div style={{ font: "600 11px ui-monospace,Menlo,monospace", color: C.accent, letterSpacing: 2, marginBottom: 6 }}>GENRE ↔ ELEMENTS → UI</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button onClick={undo} title="Cmd/Ctrl+Z" style={{ ...smallBtn, padding: "4px 10px" }}>↶ {ko ? "되돌리기" : "Undo"}</button>
              <button onClick={copyLink} style={{ ...smallBtn, padding: "4px 10px", borderColor: copied === "link" ? C.teal : C.border, color: copied === "link" ? "#CDE8D9" : C.text }}>{copied === "link" ? (ko ? "복사됨!" : "Copied!") : (ko ? "🔗 링크 공유" : "🔗 Share Link")}</button>
              <div style={{ display: "flex", border: `1px solid ${C.border}`, borderRadius: 7, overflow: "hidden" }}>
                {[["ko", "한국어"], ["en", "EN"]].map(([lc, lbl]) => (
                  <button key={lc} onClick={() => setLocale(lc)}
                    style={{ cursor: "pointer", border: "none", padding: "5px 11px", fontSize: 12, fontWeight: 700,
                      background: locale === lc ? C.accent : "transparent", color: locale === lc ? "#1A130A" : C.muted }}>{lbl}</button>
                ))}
              </div>
            </div>
          </div>
          <h1 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 700, letterSpacing: -0.3 }}>{ko ? "게임 요소 그물 네트워크" : "Game Designer's Mechanic Mesh"} <span style={{ fontSize: 12, fontWeight: 600, color: C.accent, verticalAlign: "middle", border: `1px solid ${C.accent}`, borderRadius: 5, padding: "1px 6px", marginLeft: 4 }}>{VERSION}</span></h1>
          <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
            {ko
              ? <>장르를 고르면 표준 요소가 채워지고, 요소를 손보면 <b style={{ color: C.text }}>필요 UI 요소</b>가 화면별로 나온다. 조합 전체가 URL에 실려 <b style={{ color: C.text }}>링크 공유</b>로 그대로 전달된다.</>
              : <>Pick a genre to load its template, tweak elements to get the <b style={{ color: C.text }}>required UI</b> grouped by screen. The whole build lives in the URL — <b style={{ color: C.text }}>share the link</b> to hand it over.</>}
          </p>
        </header>

        {/* 템플릿 바 */}
        <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", marginBottom: 14 }}>
          <span style={{ fontSize: 11.5, color: C.faint, flexShrink: 0 }}>{ko ? "템플릿" : "Templates"}</span>
          {Object.keys(templates).map((name) => {
            const on = activeTpl === name;
            return (
              <span key={name} style={{ display: "inline-flex", alignItems: "center", gap: 4, border: `1px solid ${on ? C.accent : C.border}`, background: on ? "rgba(224,163,62,0.16)" : C.surface2, color: on ? "#F2DDAE" : C.text, borderRadius: 6, padding: "3px 4px 3px 9px", fontSize: 12.5 }}>
                <button onClick={() => toggleTpl(name)} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer", fontSize: 12.5, padding: 0, fontWeight: on ? 700 : 400 }}>{name}</button>
                <button onClick={() => deleteTpl(name)} title={ko ? "삭제" : "delete"} style={{ background: "transparent", border: "none", color: C.faint, cursor: "pointer", fontSize: 13, padding: "0 2px", fontWeight: 700 }}>×</button>
              </span>
            );
          })}
          {Object.keys(templates).length === 0 && <span style={{ fontSize: 11.5, color: C.faint }}>{ko ? "아직 없음" : "none yet"}</span>}
          <input value={tplName} onChange={(e) => setTplName(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") saveTpl(tplName); }} placeholder={ko ? "이름" : "name"}
            style={{ width: 110, marginLeft: 6, background: C.surface2, border: `1px solid ${C.border}`, color: C.text, borderRadius: 6, padding: "5px 8px", fontSize: 12.5 }} />
          <button onClick={() => saveTpl(tplName)} style={smallBtn}>{ko ? "저장" : "Save"}</button>
          <button onClick={updateTpl} disabled={!activeTpl} style={{ ...smallBtn, background: "transparent", borderColor: activeTpl ? C.accent : C.border, color: activeTpl ? "#F2DDAE" : C.faint, opacity: activeTpl ? 1 : 0.5, cursor: activeTpl ? "pointer" : "default" }}>{ko ? "업데이트" : "Update"}</button>
          <button onClick={exportTpls} style={smallBtn} title={ko ? "템플릿 JSON 내보내기" : "export templates JSON"}>⬇ JSON</button>
          <label style={{ ...smallBtn, display: "inline-block" }} title={ko ? "템플릿 JSON 가져오기" : "import templates JSON"}>⬆ JSON
            <input type="file" accept="application/json" style={{ display: "none" }} onChange={(e) => { if (e.target.files[0]) importTpls(e.target.files[0]); e.target.value = ""; }} />
          </label>
        </div>

        {/* 상단 고정 바 */}
        <div className="sticky-bar" style={{ position: "sticky", top: 0, zIndex: 20, background: C.bg, paddingTop: 8, paddingBottom: 12, marginBottom: 16, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: C.accent }}>{ko ? "장르 ↔ 요소 (양방향)" : "Genre ↔ Elements"}</span>
            {chosenCount > 0 && (
              <span style={{ font: "11px ui-monospace,monospace", color: C.muted }}>
                {exactGenre ? <>{ko ? "현재" : "now"}: <b style={{ color: "#F2DDAE" }}>{genreName(exactGenre)}</b></> : <span style={{ color: C.faint }}>{ko ? "커스텀 조합" : "custom"}</span>}
              </span>
            )}
          </div>
          <div className="genre-list" style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {GENRES.map((g) => {
              const on = exactGenre && g._sig === exactGenre._sig;
              return (
                <button key={g.name[1]} onClick={() => pickGenre(g)}
                  style={{ cursor: "pointer", borderRadius: 7, padding: "6px 11px", fontSize: 13,
                    border: `1px solid ${on ? C.accent : C.border}`, background: on ? "rgba(224,163,62,0.16)" : C.surface2,
                    color: on ? "#F2DDAE" : C.text, fontWeight: on ? 700 : 500 }}>{genreName(g)}</button>
              );
            })}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, minHeight: 32 }}>
            <span style={{ fontSize: 11.5, color: C.faint, flexShrink: 0 }}>{ko ? "선택" : "sel"} {summaryChips.length}</span>
            <div style={{ display: "flex", gap: 6, overflowX: "auto", flex: 1 }}>
              {summaryChips.length === 0 ? (
                <span style={{ fontSize: 12.5, color: C.faint }}>{ko ? "장르를 고르거나 아래에서 직접 골라라." : "Pick a genre or choose below."}</span>
              ) : summaryChips.map((c) => {
                const teal = c.kind === "tag";
                return (
                  <button key={c.key} onClick={c.on}
                    style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 5, cursor: "pointer",
                      border: `1px solid ${teal ? C.teal : C.blue}`, background: teal ? C.tealTint : C.blueTint, color: teal ? "#CDE8D9" : "#CFE0EE",
                      borderRadius: 6, padding: "4px 8px", fontSize: 12.5, lineHeight: 1.2 }}>
                    {T(c.label)}<span style={{ color: C.muted, fontWeight: 700 }}>×</span>
                  </button>
                );
              })}
            </div>
            {(chosenCount + tags.size + customUI.length) > 0 && <button onClick={reset} style={{ flexShrink: 0, background: "transparent", border: "none", color: C.faint, fontSize: 11.5, cursor: "pointer" }}>{ko ? "초기화" : "reset"}</button>}
          </div>

          {derived.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, minHeight: 26 }}>
              <span style={{ fontSize: 11.5, color: C.faint, flexShrink: 0 }}>{ko ? "가까운 장르" : "closest"}</span>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {derived.map((d) => {
                  const on = exactGenre && d.g._sig === exactGenre._sig;
                  return (
                    <button key={d.g.name[1]} onClick={() => pickGenre(d.g)}
                      style={{ cursor: "pointer", borderRadius: 6, padding: "3px 9px", fontSize: 12,
                        border: `1px solid ${on ? C.accent : C.border}`, background: on ? "rgba(224,163,62,0.16)" : C.surface2, color: on ? "#F2DDAE" : C.text }}>
                      {genreName(d.g)} <span style={{ color: C.muted, font: "10px ui-monospace,monospace" }}>{Math.round(d.p * 100)}%</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeRels.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11.5, color: C.faint, flexShrink: 0 }}>{ko ? "관계" : "relations"}</span>
              {activeRels.map((r, i) => (
                <span key={i} style={{ fontSize: 11.5, borderRadius: 5, padding: "2px 8px",
                  border: `1px solid ${r.type === "conflict" ? C.warn : C.teal}`,
                  background: r.type === "conflict" ? C.warnTint : C.tealTint,
                  color: r.type === "conflict" ? "#E7B6A6" : "#CDE8D9" }}>
                  {r.type === "conflict" ? "⚠ " : "✦ "}{T(r.r)}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="main-cols" style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
          {/* 왼쪽 */}
          <div style={{ flex: "1 1 480px", minWidth: 320 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: C.accent }}>{ko ? "축 · 요소 조정" : "Axes"} <span style={{ color: C.faint, fontWeight: 400 }}>{ko ? "(택1 = 배타 · 다중 = 동시 선택)" : "(one = exclusive · multi = stackable)"}</span></span>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={ko ? "🔍 요소 검색" : "🔍 search"}
                style={{ marginLeft: "auto", width: 150, background: C.surface2, border: `1px solid ${C.border}`, color: C.text, borderRadius: 6, padding: "5px 9px", fontSize: 12.5 }} />
            </div>
            {AXES.map((ax) => {
              const arr = sel[ax.id] || [];
              const filled = arr.length > 0;
              return (
                <div key={ax.id} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 7 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: filled ? C.blue : C.text }}>{T(ax.name)}</span>
                    {ax.multi
                      ? <span style={{ fontSize: 10.5, color: C.teal, border: `1px solid ${C.teal}`, borderRadius: 4, padding: "0 5px" }}>{ko ? "다중" : "multi"}</span>
                      : <span style={{ fontSize: 10.5, color: C.faint, border: `1px solid ${C.border}`, borderRadius: 4, padding: "0 5px" }}>{ko ? "택1" : "one"}</span>}
                    {T(ax.hint) && <span style={{ fontSize: 11.5, color: C.faint }}>{T(ax.hint)}</span>}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {ax.els.map(([id, lbl]) => {
                      const key = `${ax.id}.${id}`;
                      return (
                        <button key={id} onClick={() => toggle(ax.id, id)} style={axisChipStyle(arr.includes(id), filled && !ax.multi, relMap[key], q.trim() && !matches(lbl))}>{T(lbl)}</button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div style={{ fontSize: 12.5, fontWeight: 600, color: C.accent, margin: "22px 0 10px" }}>{ko ? "기능 태그" : "Feature Tags"} <span style={{ color: C.faint, fontWeight: 400 }}>{ko ? "(다중 선택 · UI를 만든다)" : "(multi · drives UI)"}</span></div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {FEATURES.map((f) => (
                <button key={f.id} onClick={() => toggleFeat(f.id)} style={multiChipStyle(feats.has(f.id), C.blue, C.blueTint, q.trim() && !matches(f.name))}>{T(f.name)}</button>
              ))}
            </div>

            <div style={{ fontSize: 12.5, fontWeight: 600, color: C.teal, margin: "22px 0 4px" }}>{ko ? "스팀 테마 태그" : "Steam Theme Tags"} <span style={{ color: C.faint, fontWeight: 400 }}>{ko ? "(직교 · UI 무관 · 숫자=스팀 태그 수)" : "(orthogonal · no UI · # = Steam count)"}</span></div>
            {TAG_GROUPS.map((grp) => (
              <div key={grp.name[1]} style={{ marginTop: 12 }}>
                <div style={{ fontSize: 11.5, color: C.muted, marginBottom: 6 }}>{T(grp.name)}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {grp.tags.map(([id, kolbl, enlbl, n]) => {
                    const on = tags.has(id);
                    const dimS = q.trim() && !(kolbl.toLowerCase().includes(q.trim().toLowerCase()) || enlbl.toLowerCase().includes(q.trim().toLowerCase()));
                    return (
                      <button key={id} onClick={() => toggleTag(id)} style={{ ...multiChipStyle(on, C.teal, C.tealTint, dimS), fontSize: 12, padding: "5px 9px", display: "flex", alignItems: "center", gap: 5 }}>
                        {ko ? kolbl : enlbl}<span style={{ font: "9.5px ui-monospace,monospace", color: on ? "#9BC9AE" : C.faint }}>{n >= 1000 ? (n / 1000).toFixed(0) + "k" : n}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* 오른쪽: 필요 UI (화면별) */}
          <div style={{ flex: "1 1 320px", minWidth: 300 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#F2DDAE" }}>{ko ? "필요 UI 요소 · 화면별" : "Required UI · by Screen"}</span>
              <span style={{ font: "11px ui-monospace,monospace", color: C.faint }}>{allItems.filter((it) => checked(it.nm[1])).length}</span>
            </div>
            <div style={{ fontSize: 11.5, color: C.faint, marginBottom: 12, lineHeight: 1.5 }}>{ko ? "체크 = 포함 · P? 클릭 = 우선순위 · 하위는 세부 옵션" : "check = include · P? = priority · sub-items are details"}</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {SCREENS_DEF.map(([sid, snm, col]) => {
                const items = itemsByScreen(sid);
                if (!items.length) return null;
                return (
                  <div key={sid} style={{ background: C.surface, border: `1px solid ${col}`, borderLeft: `4px solid ${col}`, borderRadius: 10, padding: "12px 14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 9 }}>
                      <span style={{ fontSize: 12.5, fontWeight: 700, color: col }}>{T(snm)}</span>
                      <span style={{ font: "10px ui-monospace,monospace", color: C.faint }}>{items.filter((it) => checked(it.nm[1])).length}/{items.length}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {items.map((it) => <UIItem key={it.nm[1]} it={it} />)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 커스텀 UI 추가 */}
            <div style={{ background: C.surface, border: `1px dashed ${C.violet}`, borderRadius: 10, padding: "12px 14px", marginTop: 12 }}>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: C.violet, marginBottom: 8 }}>{ko ? "커스텀 UI 항목 추가" : "Add Custom UI Item"}</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <input value={custName} onChange={(e) => setCustName(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") addCustom(); }} placeholder={ko ? "항목 이름" : "item name"}
                  style={{ flex: 1, minWidth: 120, background: C.surface2, border: `1px solid ${C.border}`, color: C.text, borderRadius: 6, padding: "6px 9px", fontSize: 12.5 }} />
                <select value={custScreen} onChange={(e) => setCustScreen(e.target.value)}
                  style={{ background: C.surface2, border: `1px solid ${C.border}`, color: C.text, borderRadius: 6, padding: "6px 8px", fontSize: 12.5 }}>
                  {SCREENS_DEF.map(([sid, snm]) => <option key={sid} value={sid}>{T(snm)}</option>)}
                </select>
                <button onClick={addCustom} style={smallBtn}>{ko ? "추가" : "Add"}</button>
              </div>
            </div>

            {tags.size > 0 && (
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", marginTop: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.teal, marginBottom: 8, letterSpacing: 0.5 }}>{ko ? "테마·태그 (UI 무관)" : "Themes (no UI)"}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {[...tags].map((id) => <span key={id} style={{ fontSize: 12, color: "#CDE8D9", background: C.tealTint, border: `1px solid ${C.teal}`, borderRadius: 5, padding: "2px 7px" }}>{T(TAG_BY[id].name)}</span>)}
                </div>
              </div>
            )}

            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={ko ? "게임 제목 (선택) — 출력 맨 위 # 제목" : "Game title (optional) — top # heading"}
              style={{ width: "100%", marginTop: 16, boxSizing: "border-box", background: C.surface2, border: `1px solid ${C.border}`, color: C.text, borderRadius: 7, padding: "9px 11px", fontSize: 13 }} />

            <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
              <button onClick={copyMd} style={{ ...exportBtn, borderColor: copied === "md" ? C.teal : C.border }}>{copied === "md" ? (ko ? "복사됨!" : "Copied!") : (ko ? "MD 복사" : "Copy MD")}</button>
              <button onClick={dlMd} style={exportBtn}>{ko ? ".md 저장" : "Save .md"}</button>
              <button onClick={() => window.print()} style={{ ...exportBtn, borderColor: C.accent, color: "#F2DDAE" }}>{ko ? "PDF 인쇄" : "Print PDF"}</button>
            </div>
            <div style={{ fontSize: 10.5, color: C.faint, marginTop: 6, lineHeight: 1.5 }}>{ko ? "PDF 인쇄 → 대상을 'PDF로 저장' 선택 · MD에 mermaid 흐름도 포함" : "Print → 'Save as PDF' · MD includes mermaid flow"}</div>
          </div>
        </div>
        <div style={{ textAlign: "center", color: C.faint, fontSize: 11.5, marginTop: 36, paddingTop: 16, borderTop: `1px solid ${C.border}` }}><a href={SITE} target="_blank" rel="noopener" style={{ color: C.muted, textDecoration: "none", borderBottom: `1px solid ${C.border}` }}>Game Designer's Mechanic Mesh</a>, 2026 Wissen &amp; Ferme · <a href="mailto:zondug@me.com" style={{ color: C.muted, textDecoration: "none", borderBottom: `1px solid ${C.border}` }}>zondug@me.com</a></div>
      </div>

      {/* 인쇄 전용 리포트 */}
      <div className="report-only" style={{ padding: "28px 32px", color: "#111", background: "#fff", fontFamily: "system-ui,sans-serif", lineHeight: 1.5 }}>
        {title.trim()
          ? <><h1 style={{ fontSize: 22, margin: "0 0 2px" }}>{title.trim()}</h1><p style={{ fontSize: 12, color: "#888", margin: "0 0 12px" }}>{ko ? "게임 UI 스펙 시트" : "Game UI Spec Sheet"}</p></>
          : <h1 style={{ fontSize: 20, margin: "0 0 4px" }}>{ko ? "게임 UI 스펙 시트" : "Game UI Spec Sheet"}</h1>}
        <p style={{ fontSize: 13, margin: "0 0 16px" }}>
          <b>{ko ? "장르" : "Genre"}:</b> {exactGenre ? T(exactGenre.name) : (ko ? "커스텀 조합" : "Custom")}
          {derived.length ? <span style={{ color: "#555" }}> · {ko ? "가까운" : "closest"}: {derived.map((d) => T(d.g.name) + " " + Math.round(d.p * 100) + "%").join(", ")}</span> : null}
        </p>
        <h2 style={{ fontSize: 15, borderBottom: "1px solid #ccc", paddingBottom: 3 }}>{ko ? "선택 요소" : "Elements"}</h2>
        <ul style={{ fontSize: 13, marginTop: 6 }}>{axesSel.map((a) => <li key={a.name}><b>{a.name}</b>: {a.els.join(", ")}</li>)}</ul>
        {featSel.length ? <><h2 style={{ fontSize: 15, borderBottom: "1px solid #ccc", paddingBottom: 3 }}>{ko ? "기능" : "Features"}</h2><p style={{ fontSize: 13 }}>{featSel.join(", ")}</p></> : null}
        {tagSel.length ? <><h2 style={{ fontSize: 15, borderBottom: "1px solid #ccc", paddingBottom: 3 }}>{ko ? "테마 태그" : "Theme Tags"}</h2><p style={{ fontSize: 13 }}>{tagSel.join(", ")}</p></> : null}
        <h2 style={{ fontSize: 15, borderBottom: "1px solid #ccc", paddingBottom: 3 }}>{ko ? "필요 UI 요소" : "Required UI"}</h2>
        {SCREENS_DEF.map(([sid, snm]) => {
          const items = allItems.filter((it) => it.screen === sid && checked(it.nm[1]));
          if (!items.length) return null;
          return (
            <div key={sid}>
              <p style={{ fontSize: 12.5, fontWeight: 700, margin: "10px 0 2px" }}>{T(snm)}</p>
              <ul style={{ fontSize: 13, margin: 0 }}>{items.map((it) => {
                const subs = (SUB_DETAILS[it.nm[1]] || []).filter((sub) => checked(it.nm[1] + "::" + sub[1]));
                return <li key={it.nm[1]}>{prio[it.nm[1]] ? <b style={{ color: PRIO_COLOR[prio[it.nm[1]]] }}>[{prio[it.nm[1]]}] </b> : null}{T(it.nm)}{T(it.desc) ? <span style={{ color: "#555" }}> — {T(it.desc)}</span> : null}{it.src && it.src.length ? <span style={{ color: "#555" }}> ({it.src.map((s) => T(s)).join(", ")})</span> : null}{subs.length ? <ul>{subs.map((sub) => <li key={sub[1]} style={{ color: "#555" }}>{T(sub)}</li>)}</ul> : null}</li>;
              })}</ul>
            </div>
          );
        })}
        {flowScreens.length ? <><h2 style={{ fontSize: 15, borderBottom: "1px solid #ccc", paddingBottom: 3, marginTop: 14 }}>{ko ? "화면 흐름도" : "Screen Flow"}</h2><FlowSVG /></> : null}
        <p style={{ fontSize: 11, color: "#888", marginTop: 22, borderTop: "1px solid #ccc", paddingTop: 8 }}><a href={SITE} style={{ color: "#888" }}>Game Designer's Mechanic Mesh</a>, 2026 Wissen &amp; Ferme · zondug@me.com</p>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
