"use client";

import { useState, useEffect, useRef } from "react";

// ============================================================
// GEOSCALE DASHBOARD — Exact brand design
// Header: logo LEFT, nav center, actions RIGHT
// Footer matching geoscale.ai
// Metrics like example10.png (big numbers)
// Clean minimal cards, proper RTL
// ============================================================

// ── Geoscale Logo (rendered as img from actual site) ──
function GeoscaleLogo({ width = 150 }: { width?: number }) {
  return (
    <div style={{ direction: "ltr", width }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://www.geoscale.ai/wp-content/uploads/2025/09/data.json"
        alt="Geoscale"
        width={width}
        height={width * 0.2}
        style={{ display: "none" }}
      />
      {/* Static SVG matching the Lottie render */}
      <svg width={width} height={width * 0.2} viewBox="0 0 510 102" fill="none">
        {/* Gray ring */}
        <circle cx="51" cy="51" r="41" stroke="#ABABAB" strokeWidth="13" fill="none" />
        {/* Dark ring (partial - animated in real logo) */}
        <circle cx="51" cy="51" r="41" stroke="#141414" strokeWidth="13" fill="none" strokeLinecap="round" strokeDasharray="180 78" />
        {/* "Geoscale" wordmark */}
        <g fill="#141414">
          <text x="120" y="66" fontFamily="'Inter', sans-serif" fontSize="52" fontWeight="600" letterSpacing="-2">Geoscale</text>
        </g>
      </svg>
    </div>
  );
}

// ── Geoscale Logo Mark (circle only, for footer) ──
function GeoscaleLogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 102 102" fill="none">
      <circle cx="51" cy="51" r="41" stroke="#ABABAB" strokeWidth="10" fill="none" />
      <circle cx="51" cy="51" r="41" stroke="#141414" strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray="180 78" />
    </svg>
  );
}

// ── SVG Icons ──
function IconCalendar({ size = 13 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#A2A9B0" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>;
}
function IconCheck({ size = 12 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#10A37F" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>;
}
function IconChevronDown({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#A2A9B0" strokeWidth="2" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>;
}
function IconChevronLeft({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#A2A9B0" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>;
}
function IconSearch({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#A2A9B0" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>;
}
function IconChart({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#10A37F" strokeWidth="1.5" strokeLinecap="round"><path d="M18 20V10M12 20V4M6 20v-6" /></svg>;
}
function IconArrowUp() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10A37F" strokeWidth="2.5" strokeLinecap="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>;
}
function IconScan({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#A2A9B0" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>;
}

// ── Brand Card ──
function BrandCard({ brand, onSelect }: { brand: typeof MOCK_BRANDS[0]; onSelect: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);
  useEffect(() => { if (ref.current) setH(ref.current.scrollHeight); }, [expanded]);

  return (
    <div
      className="bg-white overflow-hidden transition-all duration-200 cursor-pointer"
      style={{ border: "1px solid #BFBFBF", borderRadius: 10 }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-5">
        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {/* Score - bigger, bolder */}
            <div className="flex items-center justify-center shrink-0" style={{ width: 48, height: 48, borderRadius: 10, background: brand.score >= 70 ? "#10A37F12" : "#F9F9F9" }}>
              <span className="text-lg font-bold" style={{ color: brand.score >= 70 ? "#10A37F" : "#000" }}>{brand.score}%</span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold truncate" style={{ color: "#000" }}>{brand.name}</h3>
              <p className="text-xs" style={{ color: "#727272", direction: "ltr", textAlign: "right" }}>{brand.domain}</p>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(); }}
            className="text-xs font-semibold px-4 py-2 shrink-0 transition-all hover:opacity-80"
            style={{ background: "#000", color: "#fff", borderRadius: 9 }}
          >
            צפה בסריקה
          </button>
        </div>

        {/* Info row */}
        <div className="flex items-center gap-4 text-xs mb-4" style={{ color: "#727272" }}>
          <span className="flex items-center gap-1"><IconCalendar /> {brand.lastScan}</span>
          <span>{brand.scans} סריקות</span>
          <span>{brand.queries} שאילתות</span>
        </div>

        {/* Quick metrics - 3 boxes */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center py-3" style={{ background: "#F9F9F9", borderRadius: 8 }}>
            <div className="text-lg font-bold" style={{ color: "#000" }}>{brand.articles}</div>
            <div className="text-[11px]" style={{ color: "#727272" }}>מאמרים</div>
          </div>
          <div className="text-center py-3" style={{ background: brand.pendingArticles > 0 ? "#FFF8F0" : "#F9F9F9", borderRadius: 8 }}>
            <div className="text-lg font-bold" style={{ color: brand.pendingArticles > 0 ? "#E07800" : "#000" }}>{brand.pendingArticles}</div>
            <div className="text-[11px]" style={{ color: "#727272" }}>ממתינים</div>
          </div>
          <div className="text-center py-3" style={{ background: "#F9F9F9", borderRadius: 8 }}>
            <div className="text-lg font-bold" style={{ color: "#10A37F" }}>{brand.score}%</div>
            <div className="text-[11px]" style={{ color: "#727272" }}>ציון נוכחות</div>
          </div>
        </div>

        {/* Expandable section with smooth transition */}
        <div className="overflow-hidden transition-all duration-400 ease-in-out" style={{ maxHeight: expanded ? `${h}px` : 0, opacity: expanded ? 1 : 0 }}>
          <div ref={ref}>
            <div className="mt-4 pt-4" style={{ borderTop: "1px solid #DDDDDD" }}>
              <p className="text-sm font-semibold mb-3" style={{ color: "#000" }}>פעולות נדרשות</p>
              <div className="space-y-2 mb-4">
                {brand.actions.map((a, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    {a.done ? (
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "#10A37F15" }}>
                        <IconCheck size={12} />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full shrink-0" style={{ border: "1.5px solid #BFBFBF" }} />
                    )}
                    <span style={{ color: a.done ? "#A2A9B0" : "#333", textDecoration: a.done ? "line-through" : "none" }}>{a.label}</span>
                  </div>
                ))}
              </div>

              {/* Top query - full width, not cut off */}
              <div className="p-4" style={{ background: "#F9F9F9", borderRadius: 10, border: "1px solid #DDDDDD" }}>
                <p className="text-xs font-semibold mb-1" style={{ color: "#10A37F" }}>שאילתה מובילה</p>
                <p className="text-sm leading-relaxed" style={{ color: "#333" }}>"{brand.topQuery}"</p>
              </div>
            </div>
          </div>
        </div>

        {/* Expand indicator */}
        <div className="flex justify-center mt-3">
          <div className="transition-transform duration-300" style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}>
            <IconChevronDown />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Footer (matching example11 / geoscale.ai) ──
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #BFBFBF" }}>
      <div className="max-w-[1300px] mx-auto px-6 py-5 flex items-center justify-between" dir="rtl">
        {/* Right: Logo + tagline */}
        <div className="flex items-center gap-3">
          <GeoscaleLogoMark size={28} />
          <span className="text-sm" style={{ color: "#727272" }}>מונע על ידי AI מתקדם לניתוח הנוכחות שלך בחיפוש</span>
        </div>

        {/* Center: Links */}
        <div className="flex items-center gap-3">
          {[
            { label: "פידבק", color: "#10A37F", bg: "#10A37F15" },
            { label: "דיווח באג", color: "#E07800", bg: "#E0780015" },
            { label: "הצעות לשיפור", color: "#4285F4", bg: "#4285F415" },
            { label: "שימוש API", color: "#10A37F", bg: "#10A37F15" },
          ].map((link, i) => (
            <span
              key={i}
              className="text-xs font-medium px-3 py-1.5 cursor-pointer transition-opacity hover:opacity-70"
              style={{ color: link.color, background: link.bg, borderRadius: 20 }}
            >
              {link.label}
            </span>
          ))}
        </div>

        {/* Left: Copyright */}
        <span className="text-xs" style={{ color: "#A2A9B0" }}>GeoScale 2026 &copy;</span>
      </div>
    </footer>
  );
}

// ── Search Loader ──
function SearchLoader() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full animate-spin" style={{ border: "2px solid #F9F9F9", borderTopColor: "#10A37F" }} />
        <span className="text-xs" style={{ color: "#727272" }}>מחפש...</span>
      </div>
    </div>
  );
}

// ── Mock Data ──
const MOCK_BRANDS = [
  {
    name: "All4Horses",
    domain: "all4horses.co.il",
    score: 76,
    scans: 3,
    lastScan: "25.03.2026",
    queries: 37,
    topQuery: "רכיבה טיפולית לילדים עם ADHD",
    articles: 12,
    pendingArticles: 3,
    actions: [
      { label: "פרסום 3 מאמרים ב-WordPress", done: false },
      { label: "עדכון meta tags לעמודי שירות", done: false },
      { label: "הוספת Schema markup", done: true },
    ],
  },
  {
    name: "לחם ארטיזן",
    domain: "artisan-bread.co.il",
    score: 71,
    scans: 2,
    lastScan: "25.03.2026",
    queries: 28,
    topQuery: "לחם מחמצת אורגני משלוח עד הבית",
    articles: 8,
    pendingArticles: 5,
    actions: [
      { label: "פרסום 5 מאמרים ב-WordPress", done: false },
      { label: "אופטימיזציה לשאילתות Gemini", done: false },
      { label: "בדיקת נראות מול מתחרים", done: true },
    ],
  },
  {
    name: "מכללת אורין שפלטר",
    domain: "orin-college.co.il",
    score: 64,
    scans: 1,
    lastScan: "20.03.2026",
    queries: 42,
    topQuery: "לימודי עיצוב פנים במכללה מוכרת",
    articles: 15,
    pendingArticles: 0,
    actions: [
      { label: "סריקה חוזרת - חלפו 5 ימים", done: false },
      { label: "יצירת תוכן לשאילתות חדשות", done: false },
      { label: "הוספת FAQ Schema", done: true },
    ],
  },
  {
    name: "כלכליסט",
    domain: "calcalist.co.il",
    score: 88,
    scans: 5,
    lastScan: "25.03.2026",
    queries: 65,
    topQuery: "חדשות כלכלה ישראל היום",
    articles: 32,
    pendingArticles: 2,
    actions: [
      { label: "פרסום 2 מאמרי GEO חדשים", done: false },
      { label: "עדכון Schema - NewsArticle", done: true },
      { label: "דוח חודשי ללקוח", done: true },
    ],
  },
  {
    name: "Just In Time",
    domain: "justintime.co.il",
    score: 52,
    scans: 1,
    lastScan: "23.03.2026",
    queries: 22,
    topQuery: "ניהול פרויקטים לעסקים קטנים",
    articles: 6,
    pendingArticles: 4,
    actions: [
      { label: "פרסום 4 מאמרים ראשוניים", done: false },
      { label: "יצירת פרסונות קהל יעד", done: true },
      { label: "בניית אסטרטגיית GEO", done: false },
    ],
  },
  {
    name: "תכום הדברות",
    domain: "techom-pest.co.il",
    score: 82,
    scans: 4,
    lastScan: "24.03.2026",
    queries: 50,
    topQuery: "הדברת ג׳וקים בבית - שיטות טבעיות",
    articles: 18,
    pendingArticles: 1,
    actions: [
      { label: "פרסום מאמר על נמלים", done: false },
      { label: "עדכון Schema - LocalBusiness", done: true },
      { label: "דוח חודשי ללקוח", done: true },
    ],
  },
];

const RECENT_ACTIVITY = [
  { brand: "כלכליסט", score: 88, time: "10:30, 25.03" },
  { brand: "All4Horses", score: 76, time: "20:12, 25.03" },
  { brand: "לחם ארטיזן", score: 71, time: "11:09, 25.03" },
  { brand: "תכום הדברות", score: 82, time: "09:30, 24.03" },
  { brand: "Just In Time", score: 52, time: "14:22, 23.03" },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [displayedBrands, setDisplayedBrands] = useState(MOCK_BRANDS);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (!searchQuery) { setIsSearching(false); setDisplayedBrands(MOCK_BRANDS); return; }
    setIsSearching(true);
    searchTimeout.current = setTimeout(() => {
      setDisplayedBrands(MOCK_BRANDS.filter(b => b.name.includes(searchQuery) || b.domain.includes(searchQuery.toLowerCase())));
      setIsSearching(false);
    }, 700);
    return () => { if (searchTimeout.current) clearTimeout(searchTimeout.current); };
  }, [searchQuery]);

  const totalBrands = MOCK_BRANDS.length;
  const totalScans = MOCK_BRANDS.reduce((s, b) => s + b.scans, 0);
  const totalQueries = MOCK_BRANDS.reduce((s, b) => s + b.queries, 0);
  const avgScore = Math.round(MOCK_BRANDS.reduce((s, b) => s + b.score, 0) / MOCK_BRANDS.length);
  const totalPending = MOCK_BRANDS.reduce((s, b) => s + b.pendingArticles, 0);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FFFFFF" }} dir="rtl">
      {/* ═══ HEADER — 3-column grid: actions | nav | logo ═══ */}
      <header className="sticky top-0 z-50" style={{ background: "rgba(255,255,255,0.96)", borderBottom: "1px solid #BFBFBF" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 24px", height: 72, display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center" }}>
          {/* RIGHT in RTL (grid col 1) = Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, justifySelf: "start" }}>
            <a href="/new-scan" style={{ display: "inline-flex", alignItems: "center", padding: "8px 20px", background: "#000", color: "#fff", fontSize: 13, fontWeight: 600, borderRadius: 9, border: "1px solid #000", textDecoration: "none" }}>סריקה חדשה</a>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#727272" }}>
              <span style={{ width: 8, height: 8, borderRadius: 4, background: "#10A37F", display: "inline-block" }} />
              <span>מחובר</span>
            </div>
          </div>

          {/* CENTER (grid col 2) = Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <a href="/" style={{ fontSize: 14, fontWeight: 600, color: "#000", textDecoration: "none" }}>דשבורד</a>
            <a href="/scan" style={{ fontSize: 14, fontWeight: 400, color: "#727272", textDecoration: "none" }}>סריקות</a>
            <a href="/scale-publish" style={{ fontSize: 14, fontWeight: 400, color: "#727272", textDecoration: "none" }}>ScalePublish</a>
            <a href="/editor" style={{ fontSize: 14, fontWeight: 400, color: "#727272", textDecoration: "none" }}>עורך תוכן</a>
            <a href="/roadmap" style={{ fontSize: 14, fontWeight: 400, color: "#727272", textDecoration: "none" }}>Roadmap</a>
          </nav>

          {/* LEFT in RTL (grid col 3) = Logo */}
          <div style={{ justifySelf: "end" }}>
            <GeoscaleLogo width={150} />
          </div>
        </div>
      </header>

      {/* ═══ MAIN CONTENT ═══ */}
      <main className="flex-1">
        <div className="max-w-[1300px] mx-auto px-6 py-6">
          {/* Page title */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold mb-0.5" style={{ color: "#000", letterSpacing: "-0.5px" }}>ניטור מותגים</h1>
            <p className="text-sm" style={{ color: "#727272" }}>ניטור נוכחות מותגים במנועי AI</p>
          </div>

          {/* ── Top Metrics — compact GA style ── */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
            {[
              { label: "מותגים", value: totalBrands, change: "+2" },
              { label: "סריקות", value: totalScans },
              { label: "שאילתות", value: totalQueries },
              { label: "ציון ממוצע", value: `${avgScore}%`, change: "+3.2%" },
              { label: "ממתינים לפרסום", value: totalPending, color: totalPending > 0 ? "#E07800" : undefined },
            ].map((m, i) => (
              <div key={i} className="p-3" style={{ border: "1px solid #E5E5E5", borderRadius: 8 }}>
                <div className="text-xs mb-1" style={{ color: "#727272" }}>{m.label}</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold" style={{ color: (m as any).color || "#000", letterSpacing: "-0.5px" }}>{m.value}</span>
                  {m.change && <span className="text-xs font-semibold" style={{ color: "#10A37F" }}><IconArrowUp /> {m.change}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* ── Top 5 Trending Up / Needs Attention ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            <div className="p-5" style={{ border: "1px solid #E5E5E5", borderRadius: 10 }}>
              <div className="flex items-center gap-2 mb-4">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10A37F" strokeWidth="2.5" strokeLinecap="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
                <h3 className="text-sm font-semibold" style={{ color: "#000" }}>טופ 5 אתרים שהתקדמו</h3>
              </div>
              {[
                { name: "כלכליסט", domain: "calcalist.co.il", score: 88, change: "+6.2%" },
                { name: "תכום הדברות", domain: "techom-pest.co.il", score: 82, change: "+4.8%" },
                { name: "All4Horses", domain: "all4horses.co.il", score: 76, change: "+4.2%" },
                { name: "לחם ארטיזן", domain: "artisan-bread.co.il", score: 71, change: "+2.1%" },
                { name: "מכללת אורין שפלטר", domain: "orin-college.co.il", score: 64, change: "+1.5%" },
              ].map((b, i) => (
                <a key={i} href="/scan" className="flex items-center gap-3 py-2.5 px-2 transition-colors hover:bg-[#F9F9F9]" style={{ borderRadius: 6, textDecoration: "none", borderBottom: i < 4 ? "1px solid #F0F0F0" : "none" }}>
                  <span className="text-xs font-medium w-5 text-center" style={{ color: "#A2A9B0" }}>{i + 1}</span>
                  <img src={`https://www.google.com/s2/favicons?domain=${b.domain}&sz=64`} alt="" width={20} height={20} style={{ borderRadius: 4, flexShrink: 0, border: "1px solid #F0F0F0" }} />
                  <span className="text-sm font-medium flex-1 truncate" style={{ color: "#000" }}>{b.name}</span>
                  <span className="text-sm font-bold" style={{ color: "#10A37F" }}>{b.score}%</span>
                  <span className="text-xs font-semibold" style={{ color: "#10A37F" }}>{b.change}</span>
                </a>
              ))}
            </div>
            <div className="p-5" style={{ border: "1px solid #E5E5E5", borderRadius: 10, background: "#FFFBFA" }}>
              <div className="flex items-center gap-2 mb-4">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                <h3 className="text-sm font-semibold" style={{ color: "#DC2626" }}>טופ 5 אתרים שצריכים טיפול</h3>
              </div>
              {[
                { name: "Just In Time", domain: "justintime.co.il", score: 52, change: "-5.1%" },
                { name: "מכללת אורין שפלטר", domain: "orin-college.co.il", score: 64, change: "-3.2%" },
                { name: "לחם ארטיזן", domain: "artisan-bread.co.il", score: 71, change: "-1.8%" },
              ].map((b, i) => (
                <a key={i} href="/scan" className="flex items-center gap-3 py-2.5 px-2 transition-colors hover:bg-[#FEF2F2]" style={{ borderRadius: 6, textDecoration: "none", borderBottom: i < 2 ? "1px solid #FEE2E2" : "none" }}>
                  <span className="text-xs font-medium w-5 text-center" style={{ color: "#A2A9B0" }}>{i + 1}</span>
                  <img src={`https://www.google.com/s2/favicons?domain=${b.domain}&sz=64`} alt="" width={20} height={20} style={{ borderRadius: 4, flexShrink: 0, border: "1px solid #F0F0F0" }} />
                  <span className="text-sm font-medium flex-1 truncate" style={{ color: "#000" }}>{b.name}</span>
                  <span className="text-sm font-bold" style={{ color: "#DC2626" }}>{b.score}%</span>
                  <span className="text-xs font-semibold" style={{ color: "#DC2626" }}>{b.change}</span>
                </a>
              ))}
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={`empty-${i}`} className="flex items-center gap-3 py-2.5 px-2" style={{ borderBottom: i < 1 ? "1px solid #FEE2E2" : "none" }}>
                  <span className="text-xs" style={{ color: "#D1D5DB" }}>—</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── AI Traffic & Bot Activity Row ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
            <div className="p-5" style={{ border: "1px solid #E5E5E5", borderRadius: 10 }}>
              <h3 className="text-xs font-semibold mb-1" style={{ color: "#000" }}>AI vs Traditional SEO</h3>
              <p className="text-[11px] mb-3" style={{ color: "#727272" }}>חלוקת תנועה</p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-bold" style={{ color: "#10A37F" }}>13.3%</span>
                <span className="text-xs font-semibold" style={{ color: "#10A37F" }}>+28.4%</span>
              </div>
              <div className="flex h-2 overflow-hidden mb-2" style={{ borderRadius: 20 }}>
                <div style={{ width: "13.3%", background: "#10A37F" }} />
                <div style={{ width: "86.7%", background: "#E5E5E5" }} />
              </div>
              <div className="flex items-center justify-between text-[11px]" style={{ color: "#727272" }}>
                <span>AI · 23,847</span>
                <span>SEO · 156,234</span>
              </div>
            </div>
            <div className="p-5" style={{ border: "1px solid #E5E5E5", borderRadius: 10 }}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xs font-semibold" style={{ color: "#000" }}>Bot Crawl Activity</h3>
                <span className="text-[10px] font-semibold px-2 py-0.5" style={{ background: "#10A37F15", color: "#10A37F", borderRadius: 20 }}>live</span>
              </div>
              <div className="flex flex-col gap-2 mt-3">
                {[
                  { bot: "GPTBot", domain: "openai.com", pages: "1,247", ago: "2h" },
                  { bot: "PerplexityBot", domain: "perplexity.ai", pages: "892", ago: "15m" },
                  { bot: "Claude-Web", domain: "anthropic.com", pages: "456", ago: "4h" },
                  { bot: "BingBot", domain: "bing.com", pages: "2,134", ago: "1h" },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <img src={`https://www.google.com/s2/favicons?domain=${b.domain}&sz=64`} alt="" width={16} height={16} style={{ borderRadius: 3, flexShrink: 0 }} />
                    <span className="text-xs font-medium flex-1" style={{ color: "#333" }}>{b.bot}</span>
                    <span className="text-[11px]" style={{ color: "#727272" }}>{b.pages}</span>
                    <span className="text-[10px]" style={{ color: "#A2A9B0" }}>{b.ago}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5" style={{ border: "1px solid #E5E5E5", borderRadius: 10 }}>
              <h3 className="text-xs font-semibold mb-3" style={{ color: "#000" }}>Engine Coverage</h3>
              <div className="flex flex-col gap-2.5">
                {[
                  { engine: "Google AIO", domain: "google.com", score: 78 },
                  { engine: "Bing Copilot", domain: "bing.com", score: 82 },
                  { engine: "ChatGPT", domain: "openai.com", score: 71 },
                  { engine: "Gemini", domain: "gemini.google.com", score: 69 },
                  { engine: "Perplexity", domain: "perplexity.ai", score: 85 },
                ].map((e, i) => {
                  const color = e.score >= 80 ? "#10A37F" : e.score >= 70 ? "#E07800" : "#DC2626";
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-0.5">
                        <div className="flex items-center gap-1.5">
                          <img src={`https://www.google.com/s2/favicons?domain=${e.domain}&sz=64`} alt="" width={12} height={12} style={{ borderRadius: 2, flexShrink: 0 }} />
                          <span className="text-[11px] font-medium" style={{ color: "#333" }}>{e.engine}</span>
                        </div>
                        <span className="text-[11px] font-bold" style={{ color }}>{e.score}%</span>
                      </div>
                      <div style={{ height: 4, borderRadius: 2, background: "#F0F0F0", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${e.score}%`, background: color, borderRadius: 2 }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Brands Table (rows, not cards) ── */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold" style={{ color: "#000" }}>המותגים שלך</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="חיפוש..." className="w-48 px-3 py-2 pr-9 text-xs focus:outline-none" style={{ border: "1px solid #E5E5E5", borderRadius: 8 }} />
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2"><IconSearch /></div>
                </div>
                <select className="text-xs px-3 py-2" style={{ border: "1px solid #E5E5E5", borderRadius: 8, color: "#333", background: "#fff" }}>
                  <option>מיון: לפי דחיפות</option>
                  <option>מיון: ציון גבוה ← נמוך</option>
                  <option>מיון: ציון נמוך ← גבוה</option>
                  <option>מיון: שם א-ת</option>
                </select>
              </div>
            </div>

            {isSearching ? <SearchLoader /> : (
              <div style={{ border: "1px solid #E5E5E5", borderRadius: 10, overflow: "hidden" }}>
                <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#FAFAFA", borderBottom: "1px solid #E5E5E5" }}>
                      <th style={{ textAlign: "right", padding: "10px 14px", fontWeight: 600, color: "#727272", fontSize: 11 }}>מותג</th>
                      <th style={{ textAlign: "right", padding: "10px 14px", fontWeight: 600, color: "#727272", fontSize: 11 }}>GEO Score</th>
                      <th style={{ textAlign: "right", padding: "10px 14px", fontWeight: 600, color: "#727272", fontSize: 11 }}>סריקות</th>
                      <th style={{ textAlign: "right", padding: "10px 14px", fontWeight: 600, color: "#727272", fontSize: 11 }}>שאילתות</th>
                      <th style={{ textAlign: "right", padding: "10px 14px", fontWeight: 600, color: "#727272", fontSize: 11 }}>ממתינים</th>
                      <th style={{ textAlign: "right", padding: "10px 14px", fontWeight: 600, color: "#727272", fontSize: 11 }}>שאילתה מובילה</th>
                      <th style={{ width: 40 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedBrands.sort((a, b) => a.score - b.score).map((brand) => {
                      const scoreColor = brand.score >= 80 ? "#10A37F" : brand.score >= 65 ? "#E07800" : "#DC2626";
                      return (
                        <tr key={brand.domain} onClick={() => window.location.href = "/scan"} className="cursor-pointer transition-colors hover:bg-[#FAFAFA]" style={{ borderBottom: "1px solid #F0F0F0" }}>
                          <td style={{ padding: "10px 14px" }}>
                            <div className="flex items-center gap-3">
                              <img src={`https://www.google.com/s2/favicons?domain=${brand.domain}&sz=64`} alt="" width={22} height={22} style={{ borderRadius: 5, flexShrink: 0, border: "1px solid #F0F0F0" }} />
                              <div>
                                <div className="text-sm font-medium" style={{ color: "#000" }}>{brand.name}</div>
                                <div className="text-[11px]" style={{ color: "#A2A9B0", direction: "ltr", textAlign: "right" }}>{brand.domain}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: "10px 14px" }}>
                            <span className="text-sm font-bold" style={{ color: scoreColor }}>{brand.score}%</span>
                          </td>
                          <td style={{ padding: "10px 14px" }}>
                            <span className="text-sm" style={{ color: "#333" }}>{brand.scans}</span>
                          </td>
                          <td style={{ padding: "10px 14px" }}>
                            <span className="text-sm" style={{ color: "#333" }}>{brand.queries}</span>
                          </td>
                          <td style={{ padding: "10px 14px" }}>
                            <span className="text-sm font-medium" style={{ color: brand.pendingArticles > 0 ? "#E07800" : "#333" }}>{brand.pendingArticles}</span>
                          </td>
                          <td style={{ padding: "10px 14px", maxWidth: 220 }}>
                            <span className="text-xs truncate block" style={{ color: "#727272" }}>{brand.topQuery}</span>
                          </td>
                          <td style={{ padding: "10px 14px", textAlign: "center" }}><IconChevronLeft /></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* ═══ FOOTER ═══ */}
      <Footer />
    </div>
  );
}
