"use client";

import { useState, useEffect, useRef } from "react";

// ============================================================
// GEOSCALE DASHBOARD — Exact brand design language
// Ultra-minimal: black + white + single teal accent #10A37F
// No gradients, no shadows on cards, borders only
// 10px border-radius cards, 9px buttons
// ============================================================

// ── Geoscale Logo (Lottie-style static SVG) ──
function GeoscaleLogo({ width = 140 }: { width?: number }) {
  const h = width * (102 / 510);
  const scale = width / 510;
  return (
    <svg width={width} height={h} viewBox="0 0 510 102" fill="none">
      {/* Outer ring (gray) */}
      <circle cx="51" cy="51" r="38" stroke="#ABABAB" strokeWidth="13" fill="none" />
      {/* Inner ring (near-black) */}
      <circle cx="51" cy="51" r="25" stroke="#141414" strokeWidth="13" fill="none" strokeLinecap="round" strokeDasharray="120 40" />
      {/* Wordmark "Geoscale" */}
      <g transform={`translate(115, 28)`} fill="#141414">
        <text fontFamily="Inter, sans-serif" fontSize="46" fontWeight="600" letterSpacing="-1.5">Geoscale</text>
      </g>
    </svg>
  );
}

// Small logo mark only
function GeoscaleLogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 102 102" fill="none">
      <circle cx="51" cy="51" r="38" stroke="#ABABAB" strokeWidth="10" fill="none" />
      <circle cx="51" cy="51" r="25" stroke="#141414" strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray="120 40" />
    </svg>
  );
}

// ── Minimal SVG Icons ──
function IconSearch({ size = 16, color = "#A2A9B0" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function IconGrid({ size = 18, color = "#000" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function IconBolt({ size = 18, color = "#000" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function IconChart({ size = 18, color = "#000" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
      <path d="M18 20V10M12 20V4M6 20v-6" />
    </svg>
  );
}

function IconCalendar({ size = 14, color = "#A2A9B0" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function IconCheck({ size = 14, color = "#10A37F" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function IconChevron({ size = 14, color = "#A2A9B0", direction = "down" }: { size?: number; color?: string; direction?: "down" | "left" }) {
  const d = direction === "left" ? "M15 18l-6-6 6-6" : "M6 9l6 6 6-6";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <path d={d} />
    </svg>
  );
}

function IconDot({ size = 8, color = "#10A37F" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill={color} /></svg>
  );
}

function IconArrowUp({ size = 12, color = "#10A37F" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

function IconArrowDown({ size = 12, color = "#EF4444" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  );
}

// ── Progress Ring (minimal) ──
function ProgressRing({ percent, size = 56, strokeWidth = 4 }: { percent: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#F9F9F9" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke="#10A37F"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-semibold" style={{ color: "#000" }}>{percent}%</span>
      </div>
    </div>
  );
}

// ── Brand Card (clean, minimal per Geoscale) ──
function BrandCard({ brand, onSelect }: {
  brand: typeof MOCK_BRANDS[0];
  onSelect: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);

  useEffect(() => {
    if (contentRef.current) setH(contentRef.current.scrollHeight);
  }, [expanded]);

  return (
    <div
      className="bg-white overflow-hidden transition-all duration-200 cursor-pointer"
      style={{ border: "1px solid #BFBFBF", borderRadius: 10 }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <ProgressRing percent={brand.score} />
            <div className="min-w-0">
              <h3 className="text-base font-semibold truncate" style={{ color: "#000" }}>{brand.name}</h3>
              <p className="text-xs" style={{ color: "#727272", direction: "ltr", textAlign: "right" }}>{brand.domain}</p>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(); }}
            className="text-xs font-medium px-3 py-1.5 transition-all"
            style={{ background: "#000", color: "#fff", borderRadius: 9 }}
          >
            צפה בסריקה
          </button>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-xs" style={{ color: "#727272" }}>
          <span className="flex items-center gap-1"><IconCalendar size={12} /> {brand.lastScan}</span>
          <span>{brand.scans} סריקות</span>
          <span>{brand.queries} שאילתות</span>
        </div>

        {/* Quick metrics */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="text-center py-2" style={{ background: "#F9F9F9", borderRadius: 8 }}>
            <div className="text-sm font-semibold" style={{ color: "#000" }}>{brand.articles}</div>
            <div className="text-[11px]" style={{ color: "#727272" }}>מאמרים</div>
          </div>
          <div className="text-center py-2" style={{ background: "#F9F9F9", borderRadius: 8 }}>
            <div className="text-sm font-semibold" style={{ color: "#000" }}>{brand.pendingArticles}</div>
            <div className="text-[11px]" style={{ color: "#727272" }}>ממתינים</div>
          </div>
          <div className="text-center py-2" style={{ background: "#F9F9F9", borderRadius: 8 }}>
            <div className="text-sm font-semibold" style={{ color: brand.score >= 70 ? "#10A37F" : "#000" }}>{brand.score}%</div>
            <div className="text-[11px]" style={{ color: "#727272" }}>ציון</div>
          </div>
        </div>

        {/* Expandable section */}
        <div
          className="overflow-hidden transition-all duration-400 ease-in-out"
          style={{ maxHeight: expanded ? `${h}px` : 0, opacity: expanded ? 1 : 0 }}
        >
          <div ref={contentRef}>
            <div className="mt-4 pt-4" style={{ borderTop: "1px solid #DDDDDD" }}>
              {/* Actions */}
              <p className="text-xs font-semibold mb-2" style={{ color: "#000" }}>פעולות נדרשות</p>
              <div className="space-y-1.5">
                {brand.actions.map((a, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    {a.done ? (
                      <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: "#10A37F15" }}>
                        <IconCheck size={10} />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full shrink-0" style={{ border: "1.5px solid #BFBFBF" }} />
                    )}
                    <span style={{ color: a.done ? "#A2A9B0" : "#333", textDecoration: a.done ? "line-through" : "none" }}>
                      {a.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Top query */}
              <div className="mt-3 p-2.5" style={{ background: "#F9F9F9", borderRadius: 8 }}>
                <p className="text-[11px] font-medium mb-0.5" style={{ color: "#10A37F" }}>שאילתה מובילה</p>
                <p className="text-xs" style={{ color: "#333" }}>"{brand.topQuery}"</p>
              </div>
            </div>
          </div>
        </div>

        {/* Expand chevron */}
        <div className="flex justify-center mt-3">
          <div className="transition-transform duration-300" style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}>
            <IconChevron size={14} />
          </div>
        </div>
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
    queries: 35,
    topQuery: "רכיבה טיפולית לילדים עם ADHD",
    articles: 12,
    pendingArticles: 3,
    actions: [
      { label: "פרסום 3 מאמרים ב-WordPress", done: false },
      { label: "עדכון meta tags לעמודי שירות", done: false },
      { label: "הוספת Schema markup", done: true },
    ],
    clientSince: "ינואר 2026",
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
    clientSince: "פברואר 2026",
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
    clientSince: "דצמבר 2025",
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
    clientSince: "אוקטובר 2025",
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
    clientSince: "מרץ 2026",
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
    clientSince: "נובמבר 2025",
  },
];

const RECENT_ACTIVITY = [
  { brand: "כלכליסט", score: 88, time: "10:30, 25.03" },
  { brand: "All4Horses", score: 76, time: "20:12, 25.03" },
  { brand: "לחם ארטיזן", score: 71, time: "11:09, 25.03" },
  { brand: "תכום הדברות", score: 82, time: "09:30, 24.03" },
  { brand: "Just In Time", score: 52, time: "14:22, 23.03" },
];

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

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [displayedBrands, setDisplayedBrands] = useState(MOCK_BRANDS);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (searchQuery === "") {
      setIsSearching(false);
      setDisplayedBrands(MOCK_BRANDS);
      return;
    }
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
    <div className="min-h-screen" style={{ background: "#FFFFFF" }} dir="rtl">
      {/* ── Header (matches geoscale.ai exactly) ── */}
      <header
        className="sticky top-0 z-50"
        style={{ background: "rgba(255,255,255,0.96)", borderBottom: "1px solid #BFBFBF" }}
      >
        <div className="max-w-[1300px] mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo — left side visually (LTR inside RTL) */}
          <div style={{ direction: "ltr" }}>
            <GeoscaleLogo width={150} />
          </div>

          {/* Nav tabs */}
          <div className="flex items-center gap-6">
            <button className="text-sm font-medium" style={{ color: "#000" }}>דשבורד</button>
            <button onClick={() => window.location.href = "/scan"} className="text-sm font-medium" style={{ color: "#727272" }}>סריקות</button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs" style={{ color: "#727272" }}>
              <IconDot size={6} />
              <span>מחובר</span>
            </div>
            <button
              onClick={() => window.location.href = "/new-scan"}
              className="text-sm font-semibold px-5 py-2.5 transition-all"
              style={{ background: "#000", color: "#fff", borderRadius: 9, border: "1px solid #000" }}
            >
              סריקה חדשה
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <div className="max-w-[1300px] mx-auto px-6 py-8">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-1" style={{ color: "#000", letterSpacing: "-0.5px" }}>ניטור מותגים</h1>
          <p className="text-sm" style={{ color: "#727272" }}>ניטור נוכחות מותגים במנועי AI</p>
        </div>

        {/* Top metrics — clean minimal cards with border only */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "מותגים", value: totalBrands.toString(), change: "+2", up: true },
            { label: "סריקות", value: totalScans.toString() },
            { label: "שאילתות", value: totalQueries.toString() },
            { label: "ציון ממוצע", value: `${avgScore}%`, change: "+3.2%", up: true },
          ].map((m, i) => (
            <div key={i} className="p-4" style={{ border: "1px solid #BFBFBF", borderRadius: 10, background: "#fff" }}>
              <p className="text-xs font-medium mb-1" style={{ color: "#727272" }}>{m.label}</p>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-semibold" style={{ color: "#000" }}>{m.value}</span>
                {m.change && (
                  <span className="flex items-center gap-0.5 text-xs font-medium" style={{ color: m.up ? "#10A37F" : "#EF4444" }}>
                    {m.up ? <IconArrowUp size={10} /> : <IconArrowDown size={10} />}
                    {m.change}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Brands section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold" style={{ color: "#000" }}>המותגים שלך</h2>
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="חיפוש מותג..."
                className="w-56 px-4 py-2 pr-10 text-sm focus:outline-none transition-all"
                style={{ border: "1px solid #BFBFBF", borderRadius: 9, background: "#fff" }}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <IconSearch size={14} />
              </div>
            </div>
          </div>

          {isSearching ? (
            <SearchLoader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedBrands.map((brand) => (
                <BrandCard
                  key={brand.domain}
                  brand={brand}
                  onSelect={() => window.location.href = "/scan"}
                />
              ))}
            </div>
          )}

          {!isSearching && displayedBrands.length === 0 && (
            <div className="text-center py-12" style={{ border: "1px solid #BFBFBF", borderRadius: 10 }}>
              <p className="text-sm" style={{ color: "#727272" }}>לא נמצאו מותגים עבור "{searchQuery}"</p>
            </div>
          )}
        </div>

        {/* Bottom: Actions + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Pending Actions */}
          <div className="p-5" style={{ border: "1px solid #BFBFBF", borderRadius: 10, background: "#fff" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: "#000" }}>פעולות ממתינות</h3>
              <span className="text-xs font-medium px-2 py-1" style={{ background: "#F9F9F9", borderRadius: 6, color: "#333" }}>
                {totalPending} ממתינות
              </span>
            </div>
            <div className="space-y-2">
              {MOCK_BRANDS.filter(b => b.actions.some(a => !a.done)).slice(0, 4).map((brand) => {
                const pending = brand.actions.filter(a => !a.done).length;
                return (
                  <div key={brand.domain} className="flex items-center gap-3 p-2.5 transition-colors cursor-pointer hover:bg-[#F9F9F9]" style={{ borderRadius: 8 }}>
                    <ProgressRing percent={brand.score} size={36} strokeWidth={3} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate" style={{ color: "#000" }}>{brand.name}</p>
                      <p className="text-[11px]" style={{ color: "#727272" }}>{pending} פעולות</p>
                    </div>
                    <IconChevron size={12} direction="left" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="p-5" style={{ border: "1px solid #BFBFBF", borderRadius: 10, background: "#fff" }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: "#000" }}>פעילות אחרונה</h3>
            <div className="space-y-2">
              {RECENT_ACTIVITY.map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 transition-colors cursor-pointer hover:bg-[#F9F9F9]" style={{ borderRadius: 8 }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#F9F9F9" }}>
                    <IconChart size={14} color="#10A37F" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate" style={{ color: "#000" }}>{a.brand}</p>
                    <p className="text-[11px]" style={{ color: "#727272" }}>סריקה הושלמה</p>
                  </div>
                  <div className="text-left shrink-0">
                    <span className="text-xs font-semibold" style={{ color: "#10A37F" }}>{a.score}%</span>
                    <p className="text-[11px]" style={{ color: "#A2A9B0", direction: "ltr" }}>{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
