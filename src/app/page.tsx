"use client";

import { useState, useEffect, useRef } from "react";

// ============================================================
// GEOSCALE DASHBOARD — Redesigned Demo for Inna
// All SVG icons, no emojis, proper Geoscale branding
// Smooth transitions, search loading, RTL throughout
// ============================================================

const BRAND = {
  teal: "#0D9488",
  tealLight: "#14B8A6",
  tealDark: "#0F766E",
  black: "#111111",
  darkBg: "#141414",
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2937",
};

// ── Geoscale Logo (actual brand SVG) ──
function GeoscaleLogo({ size = 36 }: { size?: number }) {
  const scale = size / 102;
  return (
    <svg width={size} height={size} viewBox="0 0 102 102" fill="none">
      <circle cx="51" cy="51" r="44" stroke="#ABABAB" strokeWidth="5" fill="none" />
      <circle cx="51" cy="51" r="34" stroke={BRAND.darkBg} strokeWidth="6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// ── SVG Icon Components ──
function IconSearch({ size = 16, color = BRAND.gray400 }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function IconScan({ size = 16, color = BRAND.teal }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function IconGrid({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function IconUsers({ size = 20, color = BRAND.teal }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function IconChat({ size = 20, color = BRAND.teal }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}

function IconEye({ size = 20, color = BRAND.teal }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconBolt({ size = 16, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function IconGlobe({ size = 24, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}

function IconCalendar({ size = 14, color = BRAND.gray400 }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function IconFolder({ size = 14, color = BRAND.gray400 }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
    </svg>
  );
}

function IconTrendUp({ size = 12, color = "#059669" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function IconTrendDown({ size = 12, color = "#DC2626" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  );
}

function IconChevronDown({ size = 16, color = BRAND.gray400 }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function IconChevronLeft({ size = 16, color = BRAND.gray400 }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function IconCheck({ size = 14, color = "#059669" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function IconBarChart({ size = 20, color = BRAND.teal }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20V10M18 20V4M6 20v-4" />
    </svg>
  );
}

// ── Circular Progress Ring ──
function ProgressRing({ percent, size = 72, strokeWidth = 5 }: { percent: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const color = percent >= 80 ? BRAND.teal : percent >= 60 ? "#F59E0B" : "#EF4444";

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={BRAND.gray200} strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold" style={{ color }}>{percent}%</span>
      </div>
    </div>
  );
}

// ── Stat Card ──
function StatCard({ icon, value, label, trend }: { icon: React.ReactNode; value: string; label: string; trend?: { value: string; up: boolean } }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${BRAND.teal}12` }}
        >
          {icon}
        </div>
        {trend && (
          <span
            className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              background: trend.up ? "#ECFDF5" : "#FEF2F2",
              color: trend.up ? "#059669" : "#DC2626",
            }}
          >
            {trend.up ? <IconTrendUp size={10} /> : <IconTrendDown size={10} />}
            {trend.value}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold mb-0.5" style={{ color: BRAND.black }}>{value}</div>
      <div className="text-sm" style={{ color: BRAND.gray500 }}>{label}</div>
    </div>
  );
}

// ── Brand Card ──
function BrandCard({ brand }: {
  brand: {
    name: string;
    domain: string;
    score: number;
    scans: number;
    lastScan: string;
    status: string;
    queries: number;
    topQuery: string;
    articles: number;
    pendingArticles: number;
    actions: { label: string; done: boolean }[];
    clientSince: string;
    category: string;
  }
}) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [expanded]);

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      {/* Top accent bar */}
      <div className="h-1" style={{ background: `linear-gradient(90deg, ${BRAND.teal}, ${BRAND.tealLight})` }} />

      <div className="p-5">
        {/* Header Row */}
        <div className="flex items-start gap-4">
          <ProgressRing percent={brand.score} />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold truncate" style={{ color: BRAND.black }}>{brand.name}</h3>
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full shrink-0"
                style={{
                  background: brand.status === "נוכחות חזקה" ? "#ECFDF5" : brand.status === "נוכחות בינונית" ? "#FEF3C7" : "#FEF2F2",
                  color: brand.status === "נוכחות חזקה" ? "#059669" : brand.status === "נוכחות בינונית" ? "#D97706" : "#DC2626",
                }}
              >
                {brand.status}
              </span>
            </div>
            <p className="text-sm mb-1.5" style={{ color: BRAND.gray400, direction: "ltr", textAlign: "right" }}>
              {brand.domain}
            </p>
            <div className="flex items-center gap-4 text-xs" style={{ color: BRAND.gray500 }}>
              <span className="flex items-center gap-1">
                <IconScan size={12} color={BRAND.gray400} />
                {brand.scans} סריקות
              </span>
              <span className="flex items-center gap-1">
                <IconCalendar size={12} />
                {brand.lastScan}
              </span>
              <span className="flex items-center gap-1">
                <IconFolder size={12} />
                {brand.category}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="text-center py-2.5 rounded-xl" style={{ background: BRAND.gray50 }}>
            <div className="text-base font-bold" style={{ color: BRAND.black }}>{brand.queries}</div>
            <div className="text-xs" style={{ color: BRAND.gray500 }}>שאילתות</div>
          </div>
          <div className="text-center py-2.5 rounded-xl" style={{ background: BRAND.gray50 }}>
            <div className="text-base font-bold" style={{ color: BRAND.black }}>{brand.articles}</div>
            <div className="text-xs" style={{ color: BRAND.gray500 }}>מאמרים</div>
          </div>
          <div className="text-center py-2.5 rounded-xl" style={{ background: brand.pendingArticles > 0 ? "#FFF7ED" : BRAND.gray50 }}>
            <div className="text-base font-bold" style={{ color: brand.pendingArticles > 0 ? "#EA580C" : BRAND.black }}>
              {brand.pendingArticles}
            </div>
            <div className="text-xs" style={{ color: BRAND.gray500 }}>ממתינים לפרסום</div>
          </div>
        </div>

        {/* Client Since */}
        <div className="mt-3 text-xs" style={{ color: BRAND.gray400 }}>
          לקוח מאז {brand.clientSince}
        </div>

        {/* Expandable Actions Section with smooth transition */}
        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            maxHeight: expanded ? `${contentHeight}px` : "0px",
            opacity: expanded ? 1 : 0,
          }}
        >
          <div ref={contentRef}>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="text-sm font-semibold mb-2" style={{ color: BRAND.gray700 }}>
                פעולות נדרשות
              </h4>
              <div className="space-y-2">
                {brand.actions.map((action, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    {action.done ? (
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "#ECFDF5" }}>
                        <IconCheck size={12} />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 shrink-0" style={{ borderColor: BRAND.gray300 }} />
                    )}
                    <span style={{ color: action.done ? BRAND.gray400 : BRAND.gray700, textDecoration: action.done ? "line-through" : "none" }}>
                      {action.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Top Query */}
              <div className="mt-3 p-3 rounded-xl" style={{ background: `${BRAND.teal}08`, border: `1px solid ${BRAND.teal}20` }}>
                <p className="text-xs font-medium mb-1" style={{ color: BRAND.teal }}>שאילתה מובילה</p>
                <p className="text-sm" style={{ color: BRAND.gray700 }}>"{brand.topQuery}"</p>
              </div>
            </div>
          </div>
        </div>

        {/* Expand indicator */}
        <div className="flex justify-center mt-3">
          <div
            className="transition-transform duration-500 ease-in-out"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <IconChevronDown />
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
    status: "נוכחות חזקה",
    queries: 35,
    topQuery: "רכיבה טיפולית לילדים עם ADHD",
    articles: 12,
    pendingArticles: 3,
    actions: [
      { label: "פרסום 3 מאמרים ב-WordPress", done: false },
      { label: "עדכון meta tags לעמודי שירות", done: false },
      { label: "הוספת Schema markup", done: true },
      { label: "סריקה חוזרת אחרי פרסום", done: false },
    ],
    clientSince: "ינואר 2026",
    category: "חוות סוסים / טיפול",
  },
  {
    name: "לחם ארטיזן",
    domain: "artisan-bread.co.il",
    score: 71,
    scans: 2,
    lastScan: "25.03.2026",
    status: "נוכחות חזקה",
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
    category: "מזון / מאפייה",
  },
  {
    name: "מכללת אורין שפלטר",
    domain: "orin-college.co.il",
    score: 64,
    scans: 1,
    lastScan: "20.03.2026",
    status: "נוכחות בינונית",
    queries: 42,
    topQuery: "לימודי עיצוב פנים במכללה מוכרת",
    articles: 15,
    pendingArticles: 0,
    actions: [
      { label: "סריקה חוזרת - חלפו 5 ימים", done: false },
      { label: "יצירת תוכן לשאילתות חדשות", done: false },
      { label: "עדכון דף נחיתה ראשי", done: true },
      { label: "הוספת FAQ Schema", done: true },
    ],
    clientSince: "דצמבר 2025",
    category: "חינוך / מכללה",
  },
  {
    name: "כלכליסט",
    domain: "calcalist.co.il",
    score: 88,
    scans: 5,
    lastScan: "25.03.2026",
    status: "נוכחות חזקה",
    queries: 65,
    topQuery: "חדשות כלכלה ישראל היום",
    articles: 32,
    pendingArticles: 2,
    actions: [
      { label: "פרסום 2 מאמרי GEO חדשים", done: false },
      { label: "עדכון Schema - NewsArticle", done: true },
      { label: "דוח חודשי ללקוח", done: true },
      { label: "סריקת מתחרים - גלובס, דה מרקר", done: false },
    ],
    clientSince: "אוקטובר 2025",
    category: "מדיה / חדשות כלכלה",
  },
  {
    name: "Just In Time",
    domain: "justintime.co.il",
    score: 52,
    scans: 1,
    lastScan: "23.03.2026",
    status: "נוכחות בינונית",
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
    category: "טכנולוגיה / SaaS",
  },
  {
    name: "תכום הדברות",
    domain: "techom-pest.co.il",
    score: 82,
    scans: 4,
    lastScan: "24.03.2026",
    status: "נוכחות חזקה",
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
    category: "שירותים / הדברה",
  },
];

const RECENT_ACTIVITY = [
  { brand: "All4Horses", domain: "all4horses.co.il", score: 76, time: "20:12 ,25.03", type: "סריקה הושלמה" },
  { brand: "לחם ארטיזן", domain: "artisan-bread.co.il", score: 71, time: "11:09 ,25.03", type: "סריקה הושלמה" },
  { brand: "כלכליסט", domain: "calcalist.co.il", score: 88, time: "10:30 ,25.03", type: "סריקה הושלמה" },
  { brand: "תכום הדברות", domain: "techom-pest.co.il", score: 82, time: "09:30 ,24.03", type: "סריקה הושלמה" },
  { brand: "Just In Time", domain: "justintime.co.il", score: 52, time: "14:22 ,23.03", type: "סריקה הושלמה" },
];

// ── Search Loading Spinner ──
function SearchLoader() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-10 h-10">
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
            style={{ borderTopColor: BRAND.teal, borderRightColor: BRAND.teal }}
          />
          <div className="absolute inset-1 flex items-center justify-center">
            <IconSearch size={16} color={BRAND.teal} />
          </div>
        </div>
        <span className="text-sm" style={{ color: BRAND.gray400 }}>מחפש...</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [displayedBrands, setDisplayedBrands] = useState(MOCK_BRANDS);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Search with loading animation
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchQuery === "") {
      setIsSearching(false);
      setDisplayedBrands(MOCK_BRANDS);
      return;
    }

    setIsSearching(true);

    searchTimeoutRef.current = setTimeout(() => {
      const filtered = MOCK_BRANDS.filter(
        (b) =>
          b.name.includes(searchQuery) ||
          b.domain.includes(searchQuery.toLowerCase())
      );
      setDisplayedBrands(filtered);
      setIsSearching(false);
    }, 800);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const totalPending = MOCK_BRANDS.reduce((sum, b) => sum + b.pendingArticles, 0);
  const avgScore = (MOCK_BRANDS.reduce((sum, b) => sum + b.score, 0) / MOCK_BRANDS.length).toFixed(1);

  return (
    <div className="min-h-screen" style={{ background: BRAND.gray50 }} dir="rtl">
      {/* ── Top Navigation Bar ── */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo — visually on LEFT (in RTL, use direction: ltr and order) */}
          <div className="flex items-center gap-3" style={{ direction: "ltr" }}>
            <GeoscaleLogo size={36} />
            <span className="text-xl font-bold tracking-tight" style={{ color: BRAND.black, fontFamily: "'Inter', 'Heebo', sans-serif" }}>
              Geoscale
            </span>
          </div>

          {/* Center: Nav Tabs */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: "white",
                color: BRAND.black,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <IconGrid size={16} />
              דשבורד
            </button>
            <button
              onClick={() => window.location.href = "/scan"}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: "transparent",
                color: BRAND.gray500,
              }}
            >
              <IconSearch size={16} color={BRAND.gray500} />
              סריקה
            </button>
          </div>

          {/* User indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm" style={{ color: BRAND.gray500 }}>
              <div className="w-2 h-2 rounded-full" style={{ background: "#22C55E" }} />
              <span>מחובר</span>
            </div>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium"
              style={{ background: `${BRAND.teal}15`, color: BRAND.teal }}
            >
              A
            </div>
          </div>
        </div>
      </nav>

      {/* ── Sub-header ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: BRAND.black }}
            >
              <IconGlobe size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold" style={{ color: BRAND.black }}>ניטור מותגים</h1>
              <p className="text-sm" style={{ color: BRAND.gray500 }}>ניטור נוכחות מותגים במנועי AI</p>
            </div>
          </div>

          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: BRAND.black }}
            onClick={() => window.location.href = "/new-scan"}
          >
            <IconBolt size={16} />
            סריקה חדשה
          </button>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<IconUsers />}
            value={MOCK_BRANDS.length.toString()}
            label="מותגים"
            trend={{ value: "+2 החודש", up: true }}
          />
          <StatCard
            icon={<IconScan size={20} />}
            value={MOCK_BRANDS.reduce((s, b) => s + b.scans, 0).toString()}
            label="סריקות"
          />
          <StatCard
            icon={<IconChat />}
            value={MOCK_BRANDS.reduce((s, b) => s + b.queries, 0).toString()}
            label="שאילתות"
          />
          <StatCard
            icon={<IconEye />}
            value={`${avgScore}%`}
            label="אזכור ממוצע"
            trend={{ value: "+3.2%", up: true }}
          />
        </div>

        {/* Section: Brands */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold" style={{ color: BRAND.black }}>המותגים שלך</h2>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="חיפוש מותג או דומיין..."
                className="w-64 px-4 py-2 pr-10 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 transition-all"
                style={{ "--tw-ring-color": `${BRAND.teal}40` } as React.CSSProperties}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <IconSearch size={16} />
              </div>
            </div>
          </div>

          {/* Brand Cards Grid or Loading */}
          {isSearching ? (
            <SearchLoader />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedBrands.map((brand) => (
                  <BrandCard key={brand.domain} brand={brand} />
                ))}
              </div>

              {displayedBrands.length === 0 && !isSearching && (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                  <p className="text-lg" style={{ color: BRAND.gray400 }}>לא נמצאו מותגים עבור "{searchQuery}"</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom Section: Actions Overview + Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Actions Summary */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: BRAND.black }}>פעולות ממתינות</h3>
              <span
                className="text-sm font-bold px-3 py-1 rounded-full"
                style={{ background: totalPending > 0 ? "#FFF7ED" : "#ECFDF5", color: totalPending > 0 ? "#EA580C" : "#059669" }}
              >
                {totalPending} ממתינות
              </span>
            </div>

            <div className="space-y-2">
              {MOCK_BRANDS.filter(b => b.pendingArticles > 0 || b.actions.some(a => !a.done)).slice(0, 5).map((brand) => {
                const pendingActions = brand.actions.filter(a => !a.done);
                return (
                  <div key={brand.domain} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer">
                    <ProgressRing percent={brand.score} size={40} strokeWidth={3} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: BRAND.black }}>{brand.name}</p>
                      <p className="text-xs" style={{ color: BRAND.gray400 }}>
                        {pendingActions.length} פעולות · {brand.pendingArticles} מאמרים ממתינים
                      </p>
                    </div>
                    <IconChevronLeft size={16} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="text-lg font-bold mb-4" style={{ color: BRAND.black }}>פעילות אחרונה</h3>

            <div className="space-y-2">
              {RECENT_ACTIVITY.map((activity, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${BRAND.teal}10` }}
                  >
                    <IconScan size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate" style={{ color: BRAND.black }}>{activity.brand}</p>
                      <span className="text-xs" style={{ color: BRAND.gray400, direction: "ltr" }}>{activity.domain}</span>
                    </div>
                    <p className="text-xs" style={{ color: BRAND.gray400 }}>{activity.type}</p>
                  </div>
                  <div className="text-left shrink-0">
                    <span
                      className="text-sm font-bold"
                      style={{ color: activity.score >= 70 ? BRAND.teal : activity.score >= 60 ? "#F59E0B" : "#EF4444" }}
                    >
                      {activity.score}%
                    </span>
                    <p className="text-xs" style={{ color: BRAND.gray400, direction: "ltr" }}>{activity.time}</p>
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
