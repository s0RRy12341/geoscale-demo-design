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
// Sorted by criticality — NO dates, just priority order
const phases: Phase[] = [
  {
    id: 1,
    title: "קריטי - חובה עכשיו",
    color: "#DC2626",
    features: [
      { name: "מנוע כתיבת תוכן Multi-Query", description: "כל מאמר שהמערכת מייצרת חייב לכלול מספר שאילתות משנה תחת שאילתה ראשית אחת. כמו adsgpt.io - כל H2/H3 עונה על שאילתה עצמאית, FAQ תופס long-tail נוספים. פרומפט הכתיבה חייב עדכון", priority: "P0", status: "not_started" },
      { name: "גרף זמן ראשי (כמו Ahrefs/GA)", description: "גרף time-series גדול בראש דף סקירה: שיעור אזכור GPT+Gemini לאורך זמן, עם סינון 7/30/90 ימים. קיים בדמו, חסר בפרודקשן", priority: "P0", status: "not_started" },
      { name: "אינדיקטור שינוי (+/-) על כל מדד", description: "ליד כל שיעור אזכור, מיקום ממוצע ואיכות ציטוט: חץ ירוק/אדום עם מספר השינוי בהשוואה לסריקה קודמת. קיים בדמו, חסר בפרודקשן", priority: "P0", status: "not_started" },
      { name: "AI Strategy Box (המלצות אוטומטיות)", description: "בלוק צהוב/בולט בדף סקירה עם 3-5 המלצות אסטרטגיות מבוססות נתוני הסריקה. כמו בדמו - מה לעשות כדי להשתפר. חסר לגמרי בפרודקשן", priority: "P0", status: "not_started" },
      { name: "What Worked / What's Missing", description: "שתי קופסאות ירוק/אדום עם bullet points: מה עבד (אזכורים חיוביים, ציטוטים) ומה חסר (שאילתות ללא אזכור, אזורים חלשים). קיים בדמו, חסר בפרודקשן", priority: "P0", status: "not_started" },
      { name: "AI Summary (ChatGPT + Gemini)", description: "שני בלוקים זה-ליד-זה עם סיכום טקסטואלי של מה כל מנוע AI אומר על המותג. קיים בדמו, חסר בפרודקשן", priority: "P0", status: "not_started" },
      { name: "טבלת קשר SEO-GEO", description: "טבלה שמקשרת keywords מסורתיים לשאילתות AI: keyword, נפח חיפוש, קושי, שאילתות קשורות עם toggle SEO/GEO. קיים בדמו, חסר בפרודקשן", priority: "P0", status: "not_started" },
      { name: "לוגו מותג במקום אחוז ליד שם", description: "במסך סריקות/דשבורד - להחליף את העיגול עם ה-% שליד שם המותג בלוגו המותג בפועל (favicon/logo). ה-% יעבור למיקום אחר בכרטיס", priority: "P0", status: "not_started" },
      { name: "Tooltips על כל מדד", description: "אייקון מידע (i) ליד כל מספר ומדד עם popup הסבר. קיים בדמו, חסר בפרודקשן", priority: "P0", status: "not_started" },
    ],
  },
  {
    id: 2,
    title: "חשוב - משפיע על חוויה ומכירה",
    color: "#E07800",
    features: [
      { name: "ניתוח מתחרים ויזואלי", description: "גרף בר אופקי של 4-5 מתחרים עם אחוז אזכור, ליד כל אחד שם ודומיין. קיים בדמו, חסר בפרודקשן - כרגע אין השוואה למתחרים כלל", priority: "P0", status: "not_started" },
      { name: "Donut Charts - סנטימנט ואיכות ציטוט", description: "שני גרפי donut: (1) סנטימנט - חיובי/ניטרלי/שלילי (2) איכות ציטוט - גבוה/בינוני/נמוך. בפרודקשן יש בר פשוט, בדמו יש donut מקצועי יותר", priority: "P1", status: "not_started" },
      { name: "הפרדת מוצרים/שירותים + B2C/B2B", description: "בטאב מוצרים: תגיות מוצר/שירות ו-B2C/B2B על כל פריט. כרגע הטאב ריק עם 'טרם זוהו מוצרים'", priority: "P1", status: "not_started" },
      { name: "משיכת לוגו ותמונת מוצר אוטומטית", description: "למשוך favicon/logo מהדומיין של המותג + תמונות מוצר מהאתר אוטומטית", priority: "P1", status: "not_started" },
      { name: "Hover Effects ו-Transitions", description: "כל כפתור, כרטיס ושורה בטבלה צריכים להגיב ל-hover עם שינוי צבע/shadow חלק. הפרודקשן מרגיש סטטי", priority: "P1", status: "not_started" },
      { name: "עורך תוכן (Content Editor)", description: "ממשק WYSIWYG לעריכת מאמרים שהמערכת מייצרת, עם תצוגה מקדימה ואפשרות לפרסם ישירות. קיים בדמו כ-editor, בפרודקשן רק 'צור רעיונות תוכן'", priority: "P1", status: "not_started" },
      { name: "גרף סינון לפי זמן (Date Range Filter)", description: "אפשרות לסנן כל הנתונים לפי טווח זמן מותאם אישית: 7 ימים, 30 ימים, 90 ימים, custom", priority: "P1", status: "not_started" },
      { name: "התראות מוניטין באדום", description: "צביעה אדומה אוטומטית על שורות בטבלאות כשיש חוסר אזכור, אתרים פסולים, או ירידה חדה. כרגע אין אינדיקציה ויזואלית לבעיות", priority: "P1", status: "not_started" },
      { name: "Dashboard משותף SEO+GEO", description: "מסך dashboard אחיד עם toggle/filter: שאילתות AI <-> keywords מסורתיים, מיקומים, נפח חיפוש", priority: "P1", status: "not_started" },
      { name: "הצעת מחיר SEO/GEO/משולב", description: "3 אופציות pricing נפרדות: SEO בלבד, GEO בלבד, חבילה משולבת עם הנחת 15%. לקוח בוחר מה רלוונטי", priority: "P1", status: "not_started" },
      { name: "עד 10 פרסונות לכל מותג", description: "הרחבת מערכת הפרסונות מ-5 ל-10 פרסונות. כל פרסונה עם שאילתות ייחודיות, שלבי מסע לקוח, ואנליטיקס נפרד", priority: "P1", status: "not_started" },
      { name: "שאילתות ותוכן per-site בסל", description: "בסל הקניות של ScalePublish: לכל אתר שנבחר, הצגת השאילתות הרלוונטיות שהתוכן צריך לטרגט", priority: "P1", status: "not_started" },
    ],
  },
  {
    id: 3,
    title: "שיפור - מוסיף ערך משמעותי",
    color: "#10A37F",
    features: [
      { name: "נתונים מכל מנועי AI", description: "הרחבה מעבר ל-GPT וGemini: הוספת Bing Chat, Perplexity, Claude ומנועים נוספים לסריקה", priority: "P1", status: "not_started" },
      { name: "SEO Dashboard נפרד", description: "דשבורד SEO עצמאי עם נתוני keywords, דירוגים, traffic אורגני - נפרד מ-GEO. כולל חיבור ל-GSC/Ahrefs", priority: "P1", status: "not_started" },
      { name: "הצעת מחיר אוטומטית (PDF)", description: "יצירת PDF/דוח מתוכנית העבודה: 3 אופציות (אגרסיבי/בינוני/שמרני), פירוט מחירים, שליחה ללקוח", priority: "P1", status: "not_started" },
      { name: "מנגנון המלצות אוטומטי", description: "המלצה על כמות כתבות שבועיות/חודשיות לפי budget ויעדים, מבוססת נתוני סריקה", priority: "P1", status: "not_started" },
      { name: "ScalePublish - מאגר אתרים לפרסום", description: "מרקטפלייס של publishers עם דירוגים, מחירים, קטגוריות. סל קניות לבחירת אתרים לפרסום מאמרים", priority: "P1", status: "not_started" },
      { name: "מערכת דירוג אוטומטית (SEO)", description: "בדיקת publishers מול DataForSEO/Ahrefs: DR, keywords, organic traffic, Google index", priority: "P1", status: "not_started" },
      { name: "מערכת דירוג אוטומטית (GIO)", description: "בדיקת הופעה של publishers ב-ChatGPT, Gemini, Bing Chat בשאילתות רלוונטיות", priority: "P1", status: "not_started" },
      { name: "קטגוריזציה אוטומטית", description: "AI-based categorization של אתרי publishers + אפשרות עריכה ידנית", priority: "P1", status: "not_started" },
    ],
  },
  {
    id: 4,
    title: "תשתית - נדרש לשלבים הבאים",
    color: "#4285F4",
    features: [
      { name: "מודל נתונים - Publishers", description: "סכמת DB לאתרי publishers: domain, DR, metrics, category, pricing, status", priority: "P0", status: "not_started" },
      { name: "מודל נתונים - Work Plans", description: "סכמת DB לתוכניות עבודה: brand, duration, speed, articles, budget - מחובר לתוכנית עבודה הקיימת", priority: "P0", status: "not_started" },
      { name: "API בסיסי - CRUD Publishers", description: "REST endpoints: list, create, update, delete publishers. תשתית ל-ScalePublish", priority: "P0", status: "not_started" },
      { name: "ממשק Publisher להכנסת אתרים", description: "Dashboard לpublishers: הכנסת אתרים ידנית/אקסל, ניהול מחירים, סטטיסטיקות", priority: "P0", status: "not_started" },
      { name: "פורטל Publishers", description: "ממשק עצמאי ל-publishers: הכנסת אתרים, dashboard עם agencies שראו/קנו, הכנסות", priority: "P1", status: "not_started" },
    ],
  },
  {
    id: 5,
    title: "עתידי - Nice to Have",
    color: "#727272",
    features: [
      { name: "לוגו Geoscale כמו באתר", description: "עדכון הלוגו שיתאים בדיוק ללוגו באתר geoscale.ai בכל המסכים", priority: "P2", status: "not_started" },
      { name: "מאגר אתרים פסולים", description: "שמירת אתרים שנפסלו + סיבות + אפשרות re-check עתידי", priority: "P2", status: "not_started" },
      { name: "תקנון וחתימה דיגיטלית", description: "חוזה publishers: תנאי שימוש, איסור שינוי מחירים, חתימה דיגיטלית", priority: "P2", status: "not_started" },
      { name: "Agency Markup & Margins UI", description: "ממשק ניהול אחוזי רווח 15-20% על מחירי publishers, עריכה ידנית, rounding", priority: "P2", status: "not_started" },
      { name: "Analytics ל-Publishers", description: "Dashboard publishers מורחב: agencies שראו/קנו, הכנסות, סטטיסטיקות מפורטות", priority: "P2", status: "not_started" },
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
            Roadmap <span style={{ fontWeight: 400, color: "#727272" }}>-</span> Geoscale Feature Plan
          </h1>
          <p style={{ fontSize: 14, color: "#727272", fontFamily: "'Heebo', sans-serif" }}>
            פיצ&apos;רים ממוינים לפי רמת קריטיות — מה חסר בפרודקשן לעומת הדמו ומה הלקוחות צריכים
          </p>
        </div>

        {/* Summary Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 32 }}>
          {[
            { label: "פיצ'רים", value: "39", accent: false },
            { label: "רמות קריטיות", value: "5", accent: false },
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
              <span style={{ width: 8, height: 8, borderRadius: 4, background: "#DC2626", display: "inline-block", marginTop: 4, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>פרומפט Multi-Query חייב אישור מאלכסיי לפני שילוב במערכת הייצור</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: 4, background: "#DC2626", display: "inline-block", marginTop: 4, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>כל הפיצ&apos;רים הויזואליים (גרפים, tooltips, alerts) מוכנים בדמו - חסר רק מעבר לפרודקשן</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: 4, background: "#E07800", display: "inline-block", marginTop: 4, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>גישה ל-DataForSEO/Ahrefs API למערכת דירוג Publishers ולדשבורד SEO</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: 4, background: "#E07800", display: "inline-block", marginTop: 4, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>פורטל Publishers דורש אפיון UX נפרד + תקנון משפטי</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: 4, background: "#E07800", display: "inline-block", marginTop: 4, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>הרחבת מנועי AI (Perplexity, Claude, Bing) תלויה ב-API access ותמחור</span>
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
