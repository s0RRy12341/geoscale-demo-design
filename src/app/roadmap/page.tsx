"use client";

import { useState } from "react";

// ============================================================
// ROADMAP — ScalePublish Development Plan
// Professional dev roadmap for Aina, visible to client Alexei
// ============================================================

// ── Geoscale Logo ──
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

function GeoscaleLogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 102 102" fill="none">
      <circle cx="51" cy="51" r="41" stroke="#ABABAB" strokeWidth="10" fill="none" />
      <circle cx="51" cy="51" r="41" stroke="#141414" strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray="180 78" />
    </svg>
  );
}

// ── Icons ──
function IconChevronDown({ size = 14, rotated = false }: { size?: number; rotated?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      style={{ transition: "transform 200ms", transform: rotated ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

// ── Types ──
type Status = "not_started" | "in_progress" | "done";
type Priority = "P0" | "P1" | "P2";

interface Feature {
  name: string;
  description: string;
  priority: Priority;
  status: Status;
}

interface Phase {
  id: number;
  title: string;
  features: Feature[];
  color: string;
}

// ── Data ──
const phases: Phase[] = [
  {
    id: 1,
    title: "תשתית ו-UX",
    color: "#000000",
    features: [
      { name: "עיצוב UX ב-Slice", description: "ציור flow בחירת אתרים, קטגוריזציה, סל קניות. אפיון מפורט + אישור לפני dev", priority: "P0", status: "in_progress" },
      { name: "מודל נתונים - Publishers", description: "סכמת DB לאתרים: domain, DR, metrics, category, pricing, status", priority: "P0", status: "not_started" },
      { name: "מודל נתונים - Work Plans", description: "סכמת DB לתוכניות עבודה: brand, duration, speed, articles, budget", priority: "P0", status: "not_started" },
      { name: "API בסיסי - CRUD Publishers", description: "REST endpoints: list, create, update, delete publishers", priority: "P0", status: "not_started" },
    ],
  },
  {
    id: 2,
    title: "מאגר אתרים ודירוג",
    color: "#10A37F",
    features: [
      { name: "ממשק Publisher להכנסת אתרים", description: "Dashboard לpublishers: הכנסת אתרים ידנית/אקסל, ניהול מחירים, צפייה בסטטיסטיקות agencies", priority: "P0", status: "not_started" },
      { name: "מערכת דירוג אוטומטית (SEO)", description: "בדיקה מול DataForSEO/Ahrefs: DR, keywords, organic traffic, Google index", priority: "P0", status: "not_started" },
      { name: "מערכת דירוג אוטומטית (GIO)", description: "בדיקת הופעה ב-ChatGPT, Gemini, Bing Chat. שאילתות רלוונטיות", priority: "P1", status: "not_started" },
      { name: "קטגוריזציה אוטומטית", description: "AI-based categorization של אתרים + אפשרות עריכה ידנית", priority: "P1", status: "not_started" },
      { name: "מאגר אתרים פסולים", description: "שמירת אתרים שנפסלו + סיבות + אפשרות re-check", priority: "P2", status: "not_started" },
      { name: "פורטל Publishers", description: "ממשק ל-publishers להכנסת אתרים ידנית/אקסל, dashboard עם agencies שראו/קנו, הכנסות, סטטיסטיקות", priority: "P0", status: "not_started" },
      { name: "תקנון וחתימה דיגיטלית", description: "חוזה publishers: תנאי שימוש, איסור שינוי מחירים, חתימה דיגיטלית", priority: "P2", status: "not_started" },
    ],
  },
  {
    id: 3,
    title: "Pricing וסל קניות",
    color: "#0D8A6A",
    features: [
      { name: "מערכת Pricing", description: "הגדרת מחירים per publisher, אחוזי רווח לagency (15-20%), rounding", priority: "P0", status: "done" },
      { name: "סל קניות (Cart Widget)", description: "Widget צף: budget, כמות כתבות, שאילתות, אתרים. הוספה/הסרה real-time", priority: "P0", status: "done" },
      { name: "הצעת מחיר אוטומטית", description: "יצירת PDF/דוח מהסל: 3 options (אגרסיבי/בינוני/שמרני), פירוט מחירים", priority: "P1", status: "not_started" },
      { name: "תקנון וחתימה דיגיטלית", description: "חוזה publishers: תנאי שימוש, איסור שינוי מחירים, חתימה דיגיטלית", priority: "P2", status: "not_started" },
      { name: "Agency Markup & Margins", description: "אחוזי רווח 15-20% על מחירי publishers, עריכה ידנית, rounding, חישוב אוטומטי", priority: "P0", status: "done" },
    ],
  },
  {
    id: 4,
    title: "תוכנית עבודה ו-Dashboard",
    color: "#5CCFAA",
    features: [
      { name: "בונה תוכנית עבודה", description: "בחירת משך (3-6 חודשים), מהירות (אגרסיבי/בינוני/שמרני), חלוקה אוטומטית לפי לוח זמנים", priority: "P0", status: "done" },
      { name: "Dashboard משותף SEO+GEO", description: "ממשק אחיד עם toggle/filter: שאילתות <-> keywords, מיקומים, נפח חיפוש", priority: "P1", status: "not_started" },
      { name: "מנגנון המלצות אוטומטי", description: "המלצה על כמות כתבות שבועיות/חודשיות לפי budget ויעדים", priority: "P1", status: "not_started" },
      { name: "Analytics ל-Publishers", description: "Dashboard publishers: agencies שראו/קנו, הכנסות, סטטיסטיקות", priority: "P2", status: "done" },
      { name: "הצעת מחיר SEO/GEO/משולב", description: "3 אופציות pricing נפרדות עם הנחת 15% בחבילה משולבת SEO+GEO", priority: "P1", status: "done" },
    ],
  },
  {
    id: 5,
    title: "UX Dashboard ודרישות אלכסיי",
    color: "#4285F4",
    features: [
      { name: "Tooltips על כל מדד", description: "אייקון עין/מידע ליד כל מספר ומדד עם הסבר מה זה - בכל המסכים", priority: "P0", status: "done" },
      { name: "גרף זמן ראשי (כמו Ahrefs/GA)", description: "גרף time-series גדול בראש כל מסך: שיעור אזכור GPT+Gemini לפי סריקות קודמות, עם סינון לפי זמן", priority: "P0", status: "done" },
      { name: "Hover Effects על כל הכפתורים", description: "כל כפתור אינטראקטיבי צריך להגיב ל-hover עם שינוי ויזואלי ו-transition", priority: "P0", status: "done" },
      { name: "אינדיקטור שינוי (+/-)", description: "ליד כל שיעור אזכור ומיקום ממוצע: חץ עלייה/ירידה עם מספר, בהשוואה לתקופה קודמת", priority: "P0", status: "done" },
      { name: "התראות מוניטין באדום", description: "כשמשהו לא טוב (אתרים פסולים, חוסר אזכור) - צריך להיות צבוע באדום כ-ALERT בכל הטבלאות", priority: "P0", status: "done" },
      { name: "הפרדת מוצרים ושירותים + B2C/B2B", description: "בטאב מוצרים: הפרדה ברורה בין מוצרים לשירותים, עם תגיות B2C / B2B על כל פריט", priority: "P1", status: "done" },
      { name: "משיכת שם ועיצוב מוצר", description: "אם יש מוצרים, למשוך אוטומטית את השם, התמונה והעיצוב מתוך המוצר עצמו", priority: "P1", status: "not_started" },
      { name: "נתונים מכל מנועי AI", description: "הרחבה מעבר ל-GPT וGemini: הוספת Bing Chat, Perplexity, Claude ומנועים נוספים", priority: "P1", status: "not_started" },
      { name: "SEO Dashboard נפרד", description: "דשבורד SEO עצמאי עם נתוני keywords, דירוגים, traffic אורגני - נפרד מ-GEO", priority: "P1", status: "not_started" },
      { name: "גרף סינון לפי זמן (Data Filter)", description: "אפשרות לסנן את כל הנתונים והגרפים לפי טווח זמן מותאם אישית", priority: "P1", status: "not_started" },
      { name: "לוגו Geoscale כמו באתר", description: "עדכון הלוגו שיתאים בדיוק ללוגו באתר geoscale.ai", priority: "P2", status: "not_started" },
    ],
  },
];

const priorityConfig: Record<Priority, { label: string; color: string; bg: string }> = {
  P0: { label: "P0 - קריטי", color: "#DC2626", bg: "#DC262612" },
  P1: { label: "P1 - חשוב", color: "#E07800", bg: "#E0780012" },
  P2: { label: "P2 - רגיל", color: "#727272", bg: "#72727212" },
};

const statusConfig: Record<Status, { label: string; color: string }> = {
  not_started: { label: "לא התחיל", color: "#DC2626" },
  in_progress: { label: "בתהליך", color: "#E07800" },
  done: { label: "הושלם", color: "#10A37F" },
};

// ── Components ──

function StatusDot({ status }: { status: Status }) {
  const cfg = statusConfig[status];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ width: 8, height: 8, borderRadius: 4, background: cfg.color, display: "inline-block", flexShrink: 0 }} />
      <span style={{ fontSize: 12, color: cfg.color, fontWeight: 500 }}>{cfg.label}</span>
    </div>
  );
}

function PriorityBadge({ priority }: { priority: Priority }) {
  const cfg = priorityConfig[priority];
  return (
    <span style={{ fontSize: 11, fontWeight: 600, color: cfg.color, background: cfg.bg, padding: "3px 10px", borderRadius: 20, whiteSpace: "nowrap" }}>
      {cfg.label}
    </span>
  );
}

function PhaseCard({ phase }: { phase: Phase }) {
  const [expanded, setExpanded] = useState(phase.id === 1);
  const featureCount = phase.features.length;
  const inProgressCount = phase.features.filter(f => f.status === "in_progress").length;
  const doneCount = phase.features.filter(f => f.status === "done").length;
  const progressPct = featureCount > 0 ? Math.round(((doneCount + inProgressCount * 0.5) / featureCount) * 100) : 0;

  return (
    <div style={{ border: "1px solid #DDDDDD", borderRadius: 10, background: "#fff", overflow: "hidden" }}>
      {/* Phase Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "auto 1fr auto auto",
          alignItems: "center",
          gap: 16,
          padding: "18px 24px",
          background: "none",
          border: "none",
          cursor: "pointer",
          direction: "rtl",
          textAlign: "right",
        }}
      >
        {/* Phase indicator */}
        <div style={{ width: 6, height: 40, borderRadius: 3, background: phase.color, flexShrink: 0 }} />

        {/* Title block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#000" }}>שלב {phase.id}: {phase.title}</span>
          </div>
          {/* Progress bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 2 }}>
            <div style={{ width: 120, height: 4, borderRadius: 2, background: "#EEEEEE", overflow: "hidden" }}>
              <div style={{ width: `${progressPct}%`, height: "100%", borderRadius: 2, background: phase.color, transition: "width 300ms" }} />
            </div>
            <span style={{ fontSize: 11, color: "#727272" }}>{progressPct}%</span>
          </div>
        </div>

        {/* Feature count */}
        <span style={{ fontSize: 13, color: "#727272" }}>{featureCount} פיצ&apos;רים</span>

        {/* Chevron */}
        <div style={{ color: "#A2A9B0" }}>
          <IconChevronDown size={16} rotated={expanded} />
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div style={{ borderTop: "1px solid #EEEEEE" }}>
          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 3fr 1fr 1fr",
              gap: 12,
              padding: "10px 24px 10px 24px",
              background: "#FAFAFA",
              direction: "rtl",
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 600, color: "#727272", textTransform: "uppercase" }}>פיצ&apos;ר</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#727272", textTransform: "uppercase" }}>תיאור</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#727272", textTransform: "uppercase" }}>עדיפות</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#727272", textTransform: "uppercase" }}>סטטוס</span>
          </div>

          {/* Feature rows */}
          {phase.features.map((feature, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 3fr 1fr 1fr",
                gap: 12,
                padding: "14px 24px",
                direction: "rtl",
                borderTop: i > 0 ? "1px solid #F0F0F0" : "none",
                transition: "background 150ms",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#FAFAFA")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: "#000" }}>{feature.name}</span>
              <span style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>{feature.description}</span>
              <PriorityBadge priority={feature.priority} />
              <StatusDot status={feature.status} />
            </div>
          ))}

          {/* Phase total */}
          <div style={{ display: "flex", justifyContent: "flex-start", padding: "12px 24px", background: "#FAFAFA", borderTop: "1px solid #EEEEEE", direction: "rtl" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#333" }}>שלב {phase.id}: {phase.features.length} פיצ&apos;רים</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Page ──
export default function RoadmapPage() {
  return (
    <div style={{ background: "#F9F9F9", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header className="sticky top-0 z-50" style={{ background: "rgba(255,255,255,0.96)", borderBottom: "1px solid #BFBFBF" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 24px", height: 72, display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, justifySelf: "start" }}>
            <a href="/new-scan" style={{ display: "inline-flex", alignItems: "center", padding: "8px 20px", background: "#000", color: "#fff", fontSize: 13, fontWeight: 600, borderRadius: 9, border: "1px solid #000", textDecoration: "none" }}>סריקה חדשה</a>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#727272" }}>
              <span style={{ width: 8, height: 8, borderRadius: 4, background: "#10A37F", display: "inline-block" }} />
              <span>מחובר</span>
            </div>
          </div>
          <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <a href="/" style={{ fontSize: 14, fontWeight: 400, color: "#727272", textDecoration: "none" }}>דשבורד</a>
            <a href="/scan" style={{ fontSize: 14, fontWeight: 400, color: "#727272", textDecoration: "none" }}>סריקות</a>
            <a href="/scale-publish" style={{ fontSize: 14, fontWeight: 400, color: "#727272", textDecoration: "none" }}>ScalePublish</a>
            <a href="/editor" style={{ fontSize: 14, fontWeight: 400, color: "#727272", textDecoration: "none" }}>עורך תוכן</a>
            <a href="/roadmap" style={{ fontSize: 14, fontWeight: 600, color: "#000", textDecoration: "none" }}>Roadmap</a>
          </nav>
          <div style={{ justifySelf: "end" }}>
            <GeoscaleLogo />
          </div>
        </div>
      </header>

      {/* Content */}
      <main style={{ flex: 1, maxWidth: 1300, margin: "0 auto", padding: "32px 24px 48px", width: "100%" }} dir="rtl">
        {/* Title Section */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#000", marginBottom: 8, fontFamily: "'Inter', sans-serif" }}>
            Roadmap <span style={{ fontWeight: 400, color: "#727272" }}>-</span> ScalePublish Development Plan
          </h1>
          <p style={{ fontSize: 14, color: "#727272", fontFamily: "'Heebo', sans-serif" }}>
            תוכנית פיתוח מפורטת עם אבני דרך
          </p>
        </div>

        {/* Summary Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 32 }}>
          {[
            { label: "פיצ'רים", value: "32", accent: false },
            { label: "שלבים", value: "5", accent: false },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #DDDDDD",
                borderRadius: 10,
                background: "#fff",
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <span style={{ fontSize: 12, color: "#727272", fontWeight: 500 }}>{stat.label}</span>
              <span style={{ fontSize: 24, fontWeight: 700, color: stat.accent ? "#10A37F" : "#000" }}>{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Phase Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
          {phases.map(phase => (
            <PhaseCard key={phase.id} phase={phase} />
          ))}
        </div>

        {/* Bottom Summary */}
        <div style={{ border: "1px solid #DDDDDD", borderRadius: 10, background: "#fff", padding: 24, direction: "rtl" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#000", marginBottom: 16 }}>תלויות וסיכונים</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: 4, background: "#E07800", display: "inline-block", marginTop: 4, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>אישור UX מאלכסיי לפני תחילת פיתוח שלב 2</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: 4, background: "#E07800", display: "inline-block", marginTop: 4, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>גישה ל-DataForSEO/Ahrefs API למערכת הדירוג</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: 4, background: "#E07800", display: "inline-block", marginTop: 4, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>הגדרת אחוזי רווח Agency לפני שלב Pricing</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: 4, background: "#E07800", display: "inline-block", marginTop: 4, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>פורטל Publishers דורש אפיון UX נפרד לממשק publisher</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: 4, background: "#E07800", display: "inline-block", marginTop: 4, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>Agency Markup חייב QA מדוקדק למניעת טעויות מחיר</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #BFBFBF" }}>
        <div className="max-w-[1300px] mx-auto px-6 py-5 flex items-center justify-between" dir="rtl">
          <div className="flex items-center gap-3">
            <GeoscaleLogoMark size={28} />
            <span className="text-sm" style={{ color: "#727272" }}>מונע על ידי AI מתקדם לניתוח הנוכחות שלך בחיפוש</span>
          </div>
          <div className="flex items-center gap-3">
            {[
              { label: "פידבק", color: "#10A37F", bg: "#10A37F15" },
              { label: "דיווח באג", color: "#E07800", bg: "#E0780015" },
              { label: "הצעות לשיפור", color: "#4285F4", bg: "#4285F415" },
              { label: "שימוש API", color: "#10A37F", bg: "#10A37F15" },
            ].map((link, i) => (
              <span key={i} className="text-xs font-medium px-3 py-1.5 cursor-pointer transition-opacity hover:opacity-70" style={{ color: link.color, background: link.bg, borderRadius: 20 }}>
                {link.label}
              </span>
            ))}
          </div>
          <span className="text-xs" style={{ color: "#A2A9B0" }}>GeoScale 2026 &copy;</span>
        </div>
      </footer>
    </div>
  );
}
