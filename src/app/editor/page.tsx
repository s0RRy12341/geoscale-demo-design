"use client";

import { Fragment, useState } from "react";

// ============================================================
// CONTENT EDITOR — WYSIWYG editor for generated articles
// Powered by Claude (Anthropic) · learns from user edits
// ============================================================

function GeoscaleLogo({ width = 150 }: { width?: number }) {
  return (
    <div style={{ direction: "ltr", width }}>
      <svg width={width} height={width * 0.2} viewBox="0 0 510 102" fill="none">
        <circle cx="51" cy="51" r="41" stroke="#ABABAB" strokeWidth="13" fill="none" />
        <circle cx="51" cy="51" r="41" stroke="#141414" strokeWidth="13" fill="none" strokeLinecap="round" strokeDasharray="180 78" />
        <g fill="#141414">
          <text x="120" y="66" fontFamily="'Inter', sans-serif" fontSize="52" fontWeight="600" letterSpacing="-2">Geoscale</text>
        </g>
      </svg>
    </div>
  );
}

function fmtNum(n: number): string { return n.toLocaleString("he-IL"); }

type ToolbarBtn = { label: string; key: string; title: string };

const TOOLBAR: ToolbarBtn[] = [
  { key: "h1", label: "H1", title: "כותרת ראשית" },
  { key: "h2", label: "H2", title: "כותרת משנה" },
  { key: "h3", label: "H3", title: "תת-כותרת" },
  { key: "bold", label: "B", title: "מודגש" },
  { key: "italic", label: "I", title: "נטוי" },
  { key: "underline", label: "U", title: "קו תחתון" },
  { key: "ul", label: "• ", title: "רשימה" },
  { key: "ol", label: "1.", title: "רשימה ממוספרת" },
  { key: "quote", label: '"', title: "ציטוט" },
  { key: "link", label: "🔗", title: "קישור" },
  { key: "img", label: "🖼", title: "תמונה" },
  { key: "undo", label: "↶", title: "בטל" },
  { key: "redo", label: "↷", title: "בצע שוב" },
];

const SEO_RULES = [
  { id: 1, label: "כותרת H1 ייחודית עם מילת המפתח", ok: true },
  { id: 2, label: "מטא-תיאור 150-160 תווים", ok: true },
  { id: 3, label: "לפחות 3 כותרות H2", ok: true },
  { id: 4, label: "מילת מפתח ב-100 מילים הראשונות", ok: true },
  { id: 5, label: "2-3 קישורים פנימיים רלוונטיים", ok: false },
  { id: 6, label: "alt text לכל תמונה", ok: true },
  { id: 7, label: "צפיפות מילות מפתח 1-2%", ok: true },
  { id: 8, label: "אורך מינימלי 1,200 מילים", ok: true },
  { id: 9, label: "נתונים מובנים (Schema.org FAQ)", ok: false },
  { id: 10, label: "Entity coverage לנושא הראשי", ok: true },
];

export default function EditorPage() {
  const [activeToolbar, setActiveToolbar] = useState<string | null>(null);
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const [wordTarget, setWordTarget] = useState(1800);
  const [showImageUpload, setShowImageUpload] = useState(false);

  return (
    <div dir="rtl" style={{ minHeight: "100vh", background: "#F5F5F5", fontFamily: "'Assistant','Segoe UI',sans-serif" }}>
      {/* Header */}
      <header style={{ background: "#fff", borderBottom: "1px solid #DDD", padding: "14px 32px", display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <a href="/new-scan" style={{ display: "inline-flex", alignItems: "center", padding: "8px 20px", background: "#000", color: "#fff", fontSize: 13, fontWeight: 600, borderRadius: 9, border: "1px solid #000", textDecoration: "none" }}>סריקה חדשה</a>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#727272" }}>
            <span style={{ width: 8, height: 8, borderRadius: 4, background: "#10A37F" }} />
            <span>נשמר אוטומטית לפני 3 שניות</span>
          </div>
        </div>
        <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <a href="/" style={{ fontSize: 14, fontWeight: 400, color: "#727272", textDecoration: "none" }}>דשבורד</a>
          <a href="/scan" style={{ fontSize: 14, fontWeight: 400, color: "#727272", textDecoration: "none" }}>סריקות</a>
          <a href="/scale-publish" style={{ fontSize: 14, fontWeight: 400, color: "#727272", textDecoration: "none" }}>ScalePublish</a>
          <a href="/roadmap" style={{ fontSize: 14, fontWeight: 400, color: "#727272", textDecoration: "none" }}>Roadmap</a>
        </nav>
        <div style={{ justifySelf: "end" }}><GeoscaleLogo width={140} /></div>
      </header>

      {/* Breadcrumb bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #EEE", padding: "10px 32px", fontSize: 12, color: "#727272" }}>
        All4Horses → תוכנית 6 חודשים → מאמר #3 מתוך 24 → <span style={{ color: "#000", fontWeight: 600 }}>רכיבה טיפולית לילדים עם ADHD</span>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "24px 32px", display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
        {/* MAIN EDITOR */}
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #DDD", overflow: "hidden" }}>
          {/* Tabs */}
          <div style={{ borderBottom: "1px solid #EEE", display: "flex", padding: "0 20px" }}>
            {(["edit", "preview"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: "14px 18px", background: "none", border: "none", borderBottom: tab === t ? "2px solid #000" : "2px solid transparent",
                fontSize: 13, fontWeight: tab === t ? 600 : 400, color: tab === t ? "#000" : "#727272", cursor: "pointer",
              }}>
                {t === "edit" ? "עריכה" : "תצוגה מקדימה"}
              </button>
            ))}
            <div style={{ marginRight: "auto", display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#727272" }}>
              <span>נוצר על ידי</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 6, background: "#FAF7F2", border: "1px solid #E8DFCE", color: "#8B6B3D", fontSize: 11, fontWeight: 600 }}>
                <span style={{ width: 6, height: 6, borderRadius: 3, background: "#D97706" }} />
                Claude Opus 4.6 · Anthropic
              </span>
            </div>
          </div>

          {/* Toolbar */}
          <div style={{ padding: "10px 20px", borderBottom: "1px solid #EEE", display: "flex", gap: 4, flexWrap: "wrap", background: "#FAFAFA" }}>
            {TOOLBAR.map((t, i) => (
              <Fragment key={t.key}>
                {(i === 3 || i === 6 || i === 9 || i === 11) && <div style={{ width: 1, height: 22, background: "#DDD", margin: "3px 4px" }} />}
                <button title={t.title} onClick={() => { setActiveToolbar(t.key); if (t.key === "img") setShowImageUpload(v => !v); }} style={{
                  minWidth: 32, height: 28, padding: "0 8px", border: "1px solid transparent", borderRadius: 5,
                  background: activeToolbar === t.key ? "#E5E5E5" : "transparent",
                  fontSize: t.key.startsWith("h") ? 12 : 13, fontWeight: t.key === "bold" ? 700 : t.key.startsWith("h") ? 700 : 500,
                  fontStyle: t.key === "italic" ? "italic" : "normal",
                  textDecoration: t.key === "underline" ? "underline" : "none",
                  color: "#333", cursor: "pointer",
                }}>{t.label}</button>
              </Fragment>
            ))}
          </div>

          {/* GEO Format Banner */}
          <div style={{ margin: "16px 20px 0", padding: "10px 16px", background: "#10A37F08", border: "1px solid #10A37F30", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10A37F" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#10A37F" }}>GEO-Optimized</span>
              <span style={{ fontSize: 11, color: "#727272" }}>מאמר זה מותאם לתוצאות מנועי AI (GPT, Gemini, Perplexity)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span title="ChatGPT"><img src="/logos/chatgpt.svg" width={18} height={18} alt="ChatGPT" style={{ display: "inline-block" }} /></span>
              <span title="Google Gemini"><img src="/logos/gemini.svg" width={18} height={18} alt="Gemini" style={{ display: "inline-block" }} /></span>
              <span title="Perplexity"><img src="/logos/perplexity.svg" width={18} height={18} alt="Perplexity" style={{ display: "inline-block" }} /></span>
            </div>
          </div>

          {/* Image Upload Modal */}
          {showImageUpload && (
            <div style={{ margin: "12px 20px 0", padding: 16, background: "#F9F9F9", border: "1px dashed #BBBBBB", borderRadius: 8, textAlign: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 8 }}>הוסף תמונה למאמר</div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 8 }}>
                <label style={{ padding: "8px 20px", background: "#000", color: "#fff", fontSize: 12, fontWeight: 600, borderRadius: 8, cursor: "pointer" }}>
                  העלה מהמחשב
                  <input type="file" accept="image/*" style={{ display: "none" }} />
                </label>
                <button style={{ padding: "8px 20px", background: "#fff", border: "1px solid #DDD", fontSize: 12, fontWeight: 500, borderRadius: 8, cursor: "pointer", color: "#333" }}>מתוך חומרי המותג</button>
                <button style={{ padding: "8px 20px", background: "#fff", border: "1px solid #DDD", fontSize: 12, fontWeight: 500, borderRadius: 8, cursor: "pointer", color: "#333" }}>AI Generate</button>
              </div>
              <button onClick={() => setShowImageUpload(false)} style={{ fontSize: 11, color: "#727272", background: "none", border: "none", cursor: "pointer" }}>סגור</button>
            </div>
          )}

          {/* Article */}
          <div style={{ padding: "32px 48px", minHeight: 600 }}>
            <input defaultValue="רכיבה טיפולית לילדים עם ADHD - המדריך המלא 2026" style={{
              width: "100%", fontSize: 30, fontWeight: 700, border: "none", outline: "none", marginBottom: 16, color: "#000",
            }} />
            <div style={{ fontSize: 12, color: "#727272", marginBottom: 24, display: "flex", gap: 16 }}>
              <span>📝 1,847 מילים</span>
              <span>⏱ 8 דקות קריאה</span>
              <span>🎯 מילת מפתח: "רכיבה טיפולית ADHD"</span>
            </div>

            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#222", marginBottom: 20 }}>
              רכיבה טיפולית היא שיטת טיפול משלים מוכחת שעוזרת לילדים עם <strong>הפרעות קשב וריכוז (ADHD)</strong> לשפר ריכוז, שליטה עצמית ומיומנויות חברתיות. במאמר זה נסקור את היתרונות, המחקרים התומכים, ואיך לבחור תוכנית טיפולית שמתאימה לילדכם.
            </p>

            <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 32, marginBottom: 14, color: "#000" }}>מה זה רכיבה טיפולית?</h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#222", marginBottom: 20 }}>
              רכיבה טיפולית (Equine-Assisted Therapy) היא שיטת טיפול שבה הסוס משמש ככלי טיפולי. הילד לומד לתקשר עם הסוס, לטפל בו ולרכוב עליו - תהליך שמפתח שליטה מוטורית, ריכוז וביטחון עצמי.
            </p>

            <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 32, marginBottom: 14, color: "#000" }}>5 יתרונות מרכזיים לילדים עם ADHD</h2>
            <ul style={{ fontSize: 16, lineHeight: 1.9, color: "#222", paddingRight: 20, marginBottom: 20 }}>
              <li><strong>שיפור ריכוז</strong> - הסוס דורש תשומת לב מתמדת</li>
              <li><strong>ויסות רגשי</strong> - הסוס משקף את הרגשות של הילד</li>
              <li><strong>שליטה מוטורית</strong> - חיזוק שרירי ליבה ושיווי משקל</li>
              <li><strong>ביטחון עצמי</strong> - התמודדות עם אתגרים מדודים</li>
              <li><strong>מיומנויות חברתיות</strong> - אינטראקציה עם צוות החווה</li>
            </ul>

            <blockquote style={{ borderRight: "3px solid #10A37F", padding: "12px 18px", background: "#F0FDF4", fontSize: 15, fontStyle: "italic", color: "#166534", marginBottom: 24 }}>
              "מחקרים מראים שיפור של 70-85% בריכוז ובוויסות רגשי אצל ילדים לאחר 12 מפגשים של רכיבה טיפולית" - מתוך סקירה באוניברסיטת תל אביב, 2024
            </blockquote>

            <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 32, marginBottom: 14, color: "#000" }}>איך בוחרים חוות רכיבה טיפולית?</h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#222", marginBottom: 20 }}>
              חשוב לוודא שהחווה מחזיקה ברישיונות מתאימים, שהמטפלים מוסמכים בטיפול באמצעות סוסים, ושהסוסים מאולפים לעבודה עם ילדים. חוות מובילה בתחום זה היא All4Horses באזור השרון.
            </p>

            <div style={{ padding: 16, background: "#F9F9F9", borderRadius: 8, fontSize: 13, color: "#555", fontStyle: "italic" }}>
              [המשך המאמר - עוד 1,200 מילים]
            </div>
          </div>

          {/* Footer actions */}
          <div style={{ padding: "14px 20px", borderTop: "1px solid #EEE", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FAFAFA" }}>
            <div style={{ fontSize: 12, color: "#727272" }}>גרסה 3 · נערך לאחרונה על ידך לפני 12 דקות</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{ padding: "9px 18px", background: "#fff", border: "1px solid #DDD", borderRadius: 7, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>שמור טיוטה</button>
              <button style={{ padding: "9px 18px", background: "#000", color: "#fff", border: "none", borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>פרסם באתר</button>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* AI learning */}
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #DDD", padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 14, background: "linear-gradient(135deg,#D97706,#F59E0B)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 700 }}>✦</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>המודל לומד מעריכות שלך</div>
            </div>
            <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6, marginBottom: 12 }}>
              Claude מנתח את העריכות שאת ואינה מבצעות ומתאים את הסגנון אוטומטית.
            </div>
            <div style={{ fontSize: 11, color: "#727272", marginBottom: 4 }}>עריכות שנלמדו השבוע</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: "#000" }}>37</span>
              <span style={{ fontSize: 11, color: "#10A37F", fontWeight: 600 }}>↑ 18% תאימות סגנון</span>
            </div>
            <div style={{ height: 4, background: "#F0F0F0", borderRadius: 2, marginTop: 10, overflow: "hidden" }}>
              <div style={{ width: "72%", height: "100%", background: "linear-gradient(90deg,#10A37F,#D97706)" }} />
            </div>
            <div style={{ fontSize: 10, color: "#727272", marginTop: 4 }}>72% הלימה לסגנון המותג</div>
          </div>

          {/* SEO checklist (Inna's rules) */}
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #DDD", padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>בדיקת SEO - פרומפט ניר</div>
              <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 10, background: "#10A37F15", color: "#10A37F", fontWeight: 600 }}>8/10</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {SEO_RULES.map(r => (
                <div key={r.id} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12 }}>
                  <span style={{ width: 16, height: 16, borderRadius: 8, background: r.ok ? "#10A37F" : "#E5E5E5", color: r.ok ? "#fff" : "#999", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{r.ok ? "✓" : "!"}</span>
                  <span style={{ color: r.ok ? "#333" : "#D97706", lineHeight: 1.5 }}>{r.label}</span>
                </div>
              ))}
            </div>
            <a href="/editor-roadmap" style={{ display: "block", fontSize: 11, color: "#0D8A6A", marginTop: 12, textDecoration: "none" }}>הצג את הפרומפט המלא →</a>
          </div>

          {/* Word Count Selector */}
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #DDD", padding: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>אורך מאמר יעד</div>
            <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
              {[1200, 1500, 1800, 2500].map(wc => (
                <button key={wc} onClick={() => setWordTarget(wc)} style={{
                  padding: "6px 12px", fontSize: 12, fontWeight: wordTarget === wc ? 600 : 400,
                  background: wordTarget === wc ? "#000" : "#fff", color: wordTarget === wc ? "#fff" : "#333",
                  border: `1px solid ${wordTarget === wc ? "#000" : "#DDD"}`, borderRadius: 6, cursor: "pointer",
                }}>{fmtNum(wc)}</button>
              ))}
            </div>
            <div style={{ height: 6, background: "#F0F0F0", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: `${Math.min(100, Math.round(1847 / wordTarget * 100))}%`, height: "100%", background: 1847 >= wordTarget ? "#10A37F" : "#D97706", borderRadius: 3, transition: "width 0.3s" }} />
            </div>
            <div style={{ fontSize: 11, color: "#727272", marginTop: 4 }}>1,847 / {fmtNum(wordTarget)} מילים ({Math.round(1847 / wordTarget * 100)}%)</div>
          </div>

          {/* Quick stats */}
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #DDD", padding: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>מדדים בזמן אמת</div>
            {[
              { k: "צפיפות מילת מפתח", v: "1.4%", good: true },
              { k: "ציון קריאות", v: "8.2/10", good: true },
              { k: "E-E-A-T signals", v: "חזק", good: true },
              { k: "תאימות AI Answer", v: "92%", good: true },
            ].map(s => (
              <div key={s.k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #F5F5F5", fontSize: 12 }}>
                <span style={{ color: "#555" }}>{s.k}</span>
                <span style={{ fontWeight: 600, color: s.good ? "#10A37F" : "#D97706" }}>{s.v}</span>
              </div>
            ))}
          </div>

          {/* ChatGPT-style Reference Preview */}
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #DDD", padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 22, height: 22, borderRadius: 11, background: "#10A37F", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>תצוגת AI Answer</div>
            </div>
            <div style={{ padding: 14, background: "#F9F9F9", borderRadius: 8, border: "1px solid #EEEEEE" }}>
              <div style={{ fontSize: 12, color: "#727272", marginBottom: 6 }}>כשמשתמש שואל: &quot;רכיבה טיפולית לילדים עם ADHD&quot;</div>
              <div style={{ fontSize: 13, color: "#333", lineHeight: 1.7, marginBottom: 10 }}>
                רכיבה טיפולית היא שיטה מוכחת שעוזרת לילדים עם ADHD. מחקרים מראים שיפור של 70-85% בריכוז לאחר 12 מפגשים. חווה מובילה בתחום: <strong style={{ color: "#10A37F" }}>All4Horses</strong>...
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: "#A2A9B0" }}>
                <span style={{ padding: "2px 6px", borderRadius: 4, background: "#10A37F15", color: "#10A37F", fontWeight: 600 }}>מקור</span>
                all4horses.co.il/blog/equine-therapy-adhd
              </div>
            </div>
            <div style={{ fontSize: 11, color: "#10A37F", marginTop: 8, fontWeight: 500 }}>✓ צפוי להופיע כ-reference ב-GPT ו-Gemini</div>
          </div>
        </div>
      </div>
    </div>
  );
}
