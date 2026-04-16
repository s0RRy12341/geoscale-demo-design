"use client";

import { useState, useMemo, useCallback, useEffect } from "react";

// ============================================================
// SCALEPUBLISH — Publisher Marketplace
// Browse external publisher sites, view SEO/GIO metrics,
// add to cart, build work plans, publisher portal
// ============================================================

// ── Logo Components ──
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

// ── SVG Icons ──
function IconSearch({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#A2A9B0" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>;
}
function IconCheck({ size = 12 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>;
}
function IconX({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>;
}
function IconCart({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" /></svg>;
}
function IconTrash({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>;
}
function IconChevronDown({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>;
}
function IconRefresh({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M23 4v6h-6M1 20v-6h6" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" /></svg>;
}
function IconFilter({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>;
}
function IconExternalLink({ size = 12 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>;
}

// ── Tooltip (Ahrefs-style) ──
function Tooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  return (
    <span
      style={{ position: "relative", display: "inline-flex", alignItems: "center", cursor: "help" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A2A9B0" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
      {show && (
        <span style={{
          position: "absolute",
          bottom: "calc(100% + 8px)",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#1B1F23",
          color: "#fff",
          fontSize: 11,
          fontWeight: 400,
          lineHeight: 1.5,
          padding: "8px 12px",
          borderRadius: 6,
          whiteSpace: "nowrap",
          zIndex: 999,
          boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
          animation: "fadeIn 120ms ease",
          pointerEvents: "none",
        }}>
          {text}
          <span style={{
            position: "absolute",
            bottom: -4,
            left: "50%",
            transform: "translateX(-50%) rotate(45deg)",
            width: 8,
            height: 8,
            background: "#1B1F23",
          }} />
        </span>
      )}
    </span>
  );
}

// ── Favicon helper ──
function Favicon({ domain, size = 24 }: { domain: string; size?: number }) {
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      alt=""
      width={size}
      height={size}
      style={{ width: size, height: size, borderRadius: 4, flexShrink: 0, objectFit: "contain", background: "#fff", border: "1px solid #F0F0F0" }}
      onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = "hidden"; }}
    />
  );
}

// ── Types ──
interface Publisher {
  id: number;
  name: string;
  domain: string;
  category: string;
  dr: number;
  traffic: number;
  seoScore: number;
  gioScore: number;
  gptPresent: boolean;
  geminiPresent: boolean;
  googleIndex: boolean;
  pricePerArticle: number;
  status: "approved" | "rejected" | "pending";
  rejectionReason?: string;
  queries?: number;
}

// ── Mock Data ──
const PUBLISHERS: Publisher[] = [
  { id: 1, name: "Ynet", domain: "ynet.co.il", category: "חדשות", dr: 91, traffic: 14200000, seoScore: 94, gioScore: 88, gptPresent: true, geminiPresent: true, googleIndex: true, pricePerArticle: 4800, status: "approved", queries: 18 },
  { id: 2, name: "כלכליסט", domain: "calcalist.co.il", category: "פיננסים", dr: 85, traffic: 6800000, seoScore: 89, gioScore: 81, gptPresent: true, geminiPresent: true, googleIndex: true, pricePerArticle: 3600, status: "approved", queries: 14 },
  { id: 3, name: "GeekTime", domain: "geektime.co.il", category: "טכנולוגיה", dr: 72, traffic: 820000, seoScore: 82, gioScore: 78, gptPresent: true, geminiPresent: true, googleIndex: true, pricePerArticle: 2400, status: "approved", queries: 11 },
  { id: 4, name: "mako", domain: "mako.co.il", category: "לייפסטייל", dr: 88, traffic: 9500000, seoScore: 91, gioScore: 76, gptPresent: true, geminiPresent: true, googleIndex: true, pricePerArticle: 4200, status: "approved", queries: 16 },
  { id: 5, name: "TheMarker", domain: "themarker.com", category: "עסקים", dr: 84, traffic: 4300000, seoScore: 87, gioScore: 82, gptPresent: true, geminiPresent: true, googleIndex: true, pricePerArticle: 3900, status: "approved", queries: 15 },
  { id: 6, name: "מדלן", domain: "madlan.co.il", category: 'נדל"ן', dr: 68, traffic: 1900000, seoScore: 79, gioScore: 62, gptPresent: false, geminiPresent: true, googleIndex: true, pricePerArticle: 2100, status: "approved", queries: 9 },
  { id: 7, name: "פורטל דוקטורס", domain: "doctors.co.il", category: "בריאות", dr: 66, traffic: 720000, seoScore: 78, gioScore: 71, gptPresent: true, geminiPresent: true, googleIndex: true, pricePerArticle: 1800, status: "approved", queries: 10 },
  { id: 8, name: "גלובס", domain: "globes.co.il", category: "עסקים", dr: 82, traffic: 3700000, seoScore: 86, gioScore: 79, gptPresent: true, geminiPresent: true, googleIndex: true, pricePerArticle: 3500, status: "approved", queries: 13 },
  { id: 9, name: "Zap", domain: "zap.co.il", category: "אוכל", dr: 74, traffic: 2100000, seoScore: 81, gioScore: 70, gptPresent: true, geminiPresent: true, googleIndex: true, pricePerArticle: 2200, status: "approved", queries: 11 },
  { id: 10, name: "BizPortal", domain: "bizportal.co.il", category: "פיננסים", dr: 70, traffic: 950000, seoScore: 77, gioScore: 68, gptPresent: true, geminiPresent: false, googleIndex: true, pricePerArticle: 1950, status: "approved", queries: 9 },
  { id: 11, name: "Walla", domain: "walla.co.il", category: "לייפסטייל", dr: 89, traffic: 8100000, seoScore: 92, gioScore: 80, gptPresent: true, geminiPresent: true, googleIndex: true, pricePerArticle: 4100, status: "pending", queries: 15 },
  { id: 12, name: "PC.co.il", domain: "pc.co.il", category: "טכנולוגיה", dr: 38, traffic: 52000, seoScore: 48, gioScore: 31, gptPresent: false, geminiPresent: false, googleIndex: false, pricePerArticle: 450, status: "rejected", rejectionReason: "DR נמוך, אינו מופיע ב-AI engines", queries: 5 },
  { id: 13, name: "HealthLine IL", domain: "healthline.co.il", category: "בריאות", dr: 29, traffic: 12000, seoScore: 31, gioScore: 15, gptPresent: false, geminiPresent: false, googleIndex: false, pricePerArticle: 350, status: "rejected", rejectionReason: "אתר לא מאונדקס בגוגל, תנועה אורגנית זניחה", queries: 6 },
];

const CATEGORIES = ["הכל", "חדשות", "טכנולוגיה", "בריאות", "עסקים", "לייפסטייל", "פיננסים", 'נדל"ן', "אוכל"];
const SORT_OPTIONS = [
  { value: "rating", label: "דירוג" },
  { value: "price", label: "מחיר" },
  { value: "dr", label: "DR" },
];

type TabKey = "marketplace" | "planner" | "publishers" | "rejected";
type PlanType = "combined" | "seo" | "geo";

// ── Plan data ──
interface PlanRow {
  month: number;
  seoArticles: number;
  geoArticles: number;
  sites: number;
  budget: number;
}

function getPlanData(speed: "fast" | "medium" | "slow", duration: 3 | 6, planType: PlanType): PlanRow[] {
  const configs = {
    fast:   { seo: 8, geo: 4, sites: 6, seoBudget: 8500, geoBudget: 7100 },
    medium: { seo: 5, geo: 3, sites: 4, seoBudget: 5600, geoBudget: 4700 },
    slow:   { seo: 3, geo: 2, sites: 3, seoBudget: 3500, geoBudget: 2900 },
  };
  const c = configs[speed];
  return Array.from({ length: duration }, (_, i) => {
    let seo = c.seo;
    let geo = c.geo;
    let budget: number;
    if (planType === "seo") {
      geo = 0;
      budget = c.seoBudget;
    } else if (planType === "geo") {
      seo = 0;
      budget = c.geoBudget;
    } else {
      // Combined = 15% discount vs buying separately
      budget = Math.round((c.seoBudget + c.geoBudget) * 0.85);
    }
    return {
      month: i + 1,
      seoArticles: seo,
      geoArticles: geo,
      sites: c.sites,
      budget,
    };
  });
}

function getDiscountInfo(speed: "fast" | "medium" | "slow", duration: 3 | 6) {
  const configs = {
    fast:   { seoBudget: 8500, geoBudget: 7100 },
    medium: { seoBudget: 5600, geoBudget: 4700 },
    slow:   { seoBudget: 3500, geoBudget: 2900 },
  };
  const c = configs[speed];
  const separateMonthly = c.seoBudget + c.geoBudget;
  const combinedMonthly = Math.round(separateMonthly * 0.85);
  const savingsMonthly = separateMonthly - combinedMonthly;
  return {
    separateTotal: separateMonthly * duration,
    combinedTotal: combinedMonthly * duration,
    savingsTotal: savingsMonthly * duration,
    savingsPercent: 15,
    separateMonthly,
    combinedMonthly,
    savingsMonthly,
  };
}

// ── Number formatting ──
function fmtNum(n: number): string {
  return n.toLocaleString("he-IL");
}
function fmtCurrency(n: number): string {
  return `${fmtNum(n)} \u20AA`;
}

// ── Score color ──
function scoreColor(score: number, isRejected = false): string {
  if (isRejected) return "#E53E3E";
  if (score >= 70) return "#10A37F";
  if (score >= 50) return "#E07800";
  return "#E53E3E";
}

// ── Publisher Portal Data ──
interface PublisherSite {
  domain: string;
  category: string;
  dr: number;
  status: "approved" | "pending" | "rejected";
  agenciesViewed: number;
  articlesSold: number;
  revenue: number | null;
}

const PUBLISHER_SITES: PublisherSite[] = [
  { domain: "techil.co.il", category: "טכנולוגיה", dr: 62, status: "approved", agenciesViewed: 8, articlesSold: 12, revenue: 14400 },
  { domain: "medical-portal.co.il", category: "בריאות", dr: 55, status: "approved", agenciesViewed: 12, articlesSold: 18, revenue: 27000 },
  { domain: "foodtaste.co.il", category: "אוכל", dr: 38, status: "approved", agenciesViewed: 5, articlesSold: 9, revenue: 6120 },
  { domain: "wellbeing.co.il", category: "בריאות", dr: 44, status: "pending", agenciesViewed: 3, articlesSold: 0, revenue: null },
  { domain: "digitech.co.il", category: "טכנולוגיה", dr: 34, status: "rejected", agenciesViewed: 0, articlesSold: 0, revenue: null },
];

interface AgencyActivity {
  agency: string;
  action: string;
  site: string;
  time: string;
}

const AGENCY_ACTIVITIES: AgencyActivity[] = [
  { agency: "Just In Time", action: "צפו ב-", site: "techil.co.il", time: "לפני 2 שעות" },
  { agency: "All4Horses", action: "רכשו מאמר ב-", site: "medical-portal.co.il", time: "לפני 5 שעות" },
  { agency: "כלכליסט", action: "הוסיפו לסל ", site: "techil.co.il", time: "היום" },
  { agency: "לחם ארטיזן", action: "צפו ב-", site: "foodtaste.co.il", time: "אתמול" },
];

// ── Main Page Component ──
export default function BestLinksPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("marketplace");
  const [cart, setCart] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("הכל");
  const [sortBy, setSortBy] = useState("rating");
  const [approvedOnly, setApprovedOnly] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [flashId, setFlashId] = useState<number | null>(null);
  const [agencyMargin, setAgencyMargin] = useState(20);
  const [priceOverrides, setPriceOverrides] = useState<Record<number, number>>({});

  // Plan builder state
  const [planSpeed, setPlanSpeed] = useState<"fast" | "medium" | "slow">("medium");
  const [planDuration, setPlanDuration] = useState<3 | 6>(6);
  const [planType, setPlanType] = useState<PlanType>("combined");

  // Auto open cart when items added
  useEffect(() => {
    if (cart.length > 0) setCartOpen(true);
  }, [cart.length]);

  const addToCart = useCallback((id: number) => {
    setCart(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      return [...prev, id];
    });
    setFlashId(id);
    setTimeout(() => setFlashId(null), 600);
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart(prev => prev.filter(x => x !== id));
  }, []);

  const cartPublishers = useMemo(() => PUBLISHERS.filter(p => cart.includes(p.id)), [cart]);
  const getPrice = useCallback((pub: Publisher) => priceOverrides[pub.id] ?? pub.pricePerArticle, [priceOverrides]);
  const cartTotal = useMemo(() => cartPublishers.reduce((s, p) => s + (priceOverrides[p.id] ?? p.pricePerArticle), 0), [cartPublishers, priceOverrides]);
  const cartQueries = useMemo(() => cartPublishers.reduce((s, p) => s + (p.queries || 8), 0), [cartPublishers]);
  const marginAmount = useMemo(() => Math.round(cartTotal * agencyMargin / 100), [cartTotal, agencyMargin]);
  const clientTotal = useMemo(() => cartTotal + marginAmount, [cartTotal, marginAmount]);

  // Filtered and sorted publishers for marketplace
  const filteredPublishers = useMemo(() => {
    let list = PUBLISHERS.filter(p => p.status === "approved" || (!approvedOnly && p.status === "pending"));
    if (approvedOnly) list = list.filter(p => p.status === "approved");
    if (selectedCategory !== "הכל") list = list.filter(p => p.category === selectedCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.domain.toLowerCase().includes(q));
    }
    list.sort((a, b) => {
      if (sortBy === "price") return a.pricePerArticle - b.pricePerArticle;
      if (sortBy === "dr") return b.dr - a.dr;
      return (b.seoScore + b.gioScore) - (a.seoScore + a.gioScore);
    });
    return list;
  }, [searchQuery, selectedCategory, sortBy, approvedOnly]);

  const rejectedPublishers = PUBLISHERS.filter(p => p.status === "rejected");
  const pendingPublishers = PUBLISHERS.filter(p => p.status === "pending");

  // Plan data
  const planData = useMemo(() => getPlanData(planSpeed, planDuration, planType), [planSpeed, planDuration, planType]);
  const planTotals = useMemo(() => ({
    articles: planData.reduce((s, r) => s + r.seoArticles + r.geoArticles, 0),
    budget: planData.reduce((s, r) => s + r.budget, 0),
  }), [planData]);

  const TABS: { key: TabKey; label: string; tooltip: string }[] = [
    { key: "marketplace", label: "מאגר אתרים", tooltip: "מאגר אתרים מאומתים לפרסום תוכן SEO ו-GEO" },
    { key: "planner", label: "בונה תוכנית", tooltip: "בנו תוכנית עבודה חודשית והפיקו הצעת מחיר" },
    { key: "publishers", label: "פורטל Publishers", tooltip: "ניהול אתרים שלכם כ-Publisher בפלטפורמה" },
    { key: "rejected", label: "אתרים פסולים", tooltip: "אתרים שלא עמדו בקריטריוני האיכות" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "'Inter', 'Heebo', sans-serif" }} dir="rtl">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50" style={{ background: "rgba(255,255,255,0.96)", borderBottom: "1px solid #BFBFBF" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 24px", height: 56, display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center" }}>
          {/* RIGHT in RTL = Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, justifySelf: "start" }}>
            <a href="/new-scan" style={{ display: "inline-flex", alignItems: "center", padding: "8px 20px", background: "#000", color: "#fff", fontSize: 13, fontWeight: 600, borderRadius: 9, border: "1px solid #000", textDecoration: "none" }}>סריקה חדשה</a>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#727272" }}>
              <span style={{ width: 8, height: 8, borderRadius: 4, background: "#10A37F", display: "inline-block" }} />
              <span>מחובר</span>
            </div>
          </div>
          {/* CENTER = Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <a href="/" style={{ fontSize: 14, fontWeight: 400, color: "#727272", textDecoration: "none" }}>דשבורד</a>
            <a href="/scan" style={{ fontSize: 14, fontWeight: 400, color: "#727272", textDecoration: "none" }}>סריקות</a>
            <a href="/scale-publish" style={{ fontSize: 14, fontWeight: 600, color: "#000", textDecoration: "none" }}>ScalePublish</a>
            <a href="/editor" style={{ fontSize: 14, fontWeight: 400, color: "#727272", textDecoration: "none" }}>עורך תוכן</a>
            <a href="/roadmap" style={{ fontSize: 14, fontWeight: 400, color: "#727272", textDecoration: "none" }}>Roadmap</a>
          </nav>
          {/* LEFT in RTL = Logo */}
          <div style={{ justifySelf: "end" }}>
            <GeoscaleLogo width={150} />
          </div>
        </div>
      </header>

      {/* ── Sub-tabs ── */}
      <div style={{ borderBottom: "1px solid #DDDDDD", background: "#fff" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: 0 }}>
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: "14px 24px",
                fontSize: 13,
                fontWeight: activeTab === tab.key ? 600 : 400,
                color: activeTab === tab.key ? "#000" : "#727272",
                background: "none",
                border: "none",
                borderBottom: activeTab === tab.key ? "2px solid #000" : "2px solid transparent",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>{tab.label} <Tooltip text={tab.tooltip} /></span>
              {tab.key === "rejected" && rejectedPublishers.length > 0 && (
                <span style={{ marginRight: 6, background: "#E53E3E15", color: "#E53E3E", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20 }}>{rejectedPublishers.length}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "24px 24px 60px" }}>
        {activeTab === "marketplace" && (
          <MarketplaceTab
            publishers={filteredPublishers}
            cart={cart}
            flashId={flashId}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            approvedOnly={approvedOnly}
            setApprovedOnly={setApprovedOnly}
            onAddToCart={addToCart}
            getPrice={getPrice}
            setPriceOverrides={setPriceOverrides}
          />
        )}
        {activeTab === "planner" && (
          <PlannerTab
            planSpeed={planSpeed}
            setPlanSpeed={setPlanSpeed}
            planDuration={planDuration}
            setPlanDuration={setPlanDuration}
            planData={planData}
            planTotals={planTotals}
            planType={planType}
            setPlanType={setPlanType}
            cartSiteCount={cart.length}
            cartQueries={cartQueries}
            cartTotal={cartTotal}
            goToMarketplace={() => setActiveTab("marketplace")}
          />
        )}
        {activeTab === "publishers" && <PublishersTab />}
        {activeTab === "rejected" && <RejectedTab publishers={rejectedPublishers} pendingCount={pendingPublishers.length} />}
      </div>

      {/* ── Cart Sidebar ── */}
      {cart.length > 0 && (
        <>
          {/* Cart toggle button */}
          {!cartOpen && (
            <button
              onClick={() => setCartOpen(true)}
              style={{
                position: "fixed",
                bottom: 24,
                left: 24,
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "#000",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 100,
              }}
            >
              <IconCart size={20} />
              <span style={{ position: "absolute", top: -4, right: -4, width: 22, height: 22, borderRadius: 11, background: "#10A37F", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{cart.length}</span>
            </button>
          )}

          {/* Cart panel */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: 360,
              height: "100vh",
              background: "#fff",
              borderRight: "1px solid #BFBFBF",
              zIndex: 200,
              transform: cartOpen ? "translateX(0)" : "translateX(-100%)",
              transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #DDDDDD", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <IconCart size={18} />
                <span style={{ fontSize: 16, fontWeight: 600 }}>סל התוכנית</span>
                <span style={{ fontSize: 12, color: "#727272" }}>({cart.length} אתרים)</span>
              </div>
              <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#727272", padding: 4 }}>
                <IconX size={18} />
              </button>
            </div>
            <div style={{ padding: "10px 24px", background: "#10A37F08", borderBottom: "1px solid #10A37F20", fontSize: 11, color: "#10A37F", lineHeight: 1.5 }}>
              האתרים בסל מתווספים אוטומטית ל-<strong>הצעת המחיר</strong> שנבנית בבונה התוכנית
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "12px 24px" }}>
              {cartPublishers.map(pub => (
                <div key={pub.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #F0F0F0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                    <Favicon domain={pub.domain} size={28} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{pub.name}</div>
                      <div style={{ fontSize: 11, color: "#727272" }}>{pub.domain}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ textAlign: "left" }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{fmtCurrency(priceOverrides[pub.id] ?? pub.pricePerArticle)}</span>
                      <div style={{ fontSize: 10, color: "#727272" }}>~{pub.queries || 8} שאילתות</div>
                    </div>
                    <button onClick={() => removeFromCart(pub.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#A2A9B0", padding: 2 }}>
                      <IconTrash size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Agency Margin Section */}
            <div style={{ padding: "16px 24px", borderTop: "1px solid #DDDDDD", background: "#F9F9F9" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#333", marginBottom: 10, display: "flex", alignItems: "center", gap: 4 }}>אחוזי רווח Agency <Tooltip text="אחוז הרווח שלכם כסוכנות - מתווסף לעלות הבסיס ומוצג ללקוח" /></div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <input
                  type="range"
                  min={0}
                  max={50}
                  value={agencyMargin}
                  onChange={e => setAgencyMargin(Number(e.target.value))}
                  style={{ flex: 1, accentColor: "#10A37F" }}
                />
                <span style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#10A37F",
                  background: "#10A37F15",
                  padding: "4px 12px",
                  borderRadius: 20,
                  minWidth: 48,
                  textAlign: "center",
                }}>{agencyMargin}%</span>
              </div>
            </div>

            <div style={{ padding: "20px 24px", borderTop: "1px solid #DDDDDD" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
                <span style={{ color: "#727272", display: "flex", alignItems: "center", gap: 4 }}>סה&quot;כ אתרים <Tooltip text="מספר האתרים שנבחרו לתוכנית" /></span>
                <span style={{ fontWeight: 600 }}>{cart.length}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
                <span style={{ color: "#727272", display: "flex", alignItems: "center", gap: 4 }}>סה&quot;כ שאילתות <Tooltip text="כמות השאילתות שהאתרים הנבחרים מכסים" /></span>
                <span style={{ fontWeight: 600 }}>{cartQueries}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
                <span style={{ color: "#727272", display: "flex", alignItems: "center", gap: 4 }}>מחיר בסיס <Tooltip text="העלות שלכם לפני תוספת רווח Agency" /></span>
                <span style={{ fontWeight: 600 }}>{fmtCurrency(cartTotal)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
                <span style={{ color: "#727272", display: "flex", alignItems: "center", gap: 4 }}>רווח Agency ({agencyMargin}%) <Tooltip text="הרווח שלכם - מחושב כאחוז ממחיר הבסיס" /></span>
                <span style={{ fontWeight: 600, color: "#10A37F" }}>{fmtCurrency(marginAmount)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, fontSize: 14, paddingTop: 8, borderTop: "1px solid #F0F0F0" }}>
                <span style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>סה&quot;כ ללקוח <Tooltip text="הסכום שהלקוח ישלם - מחיר בסיס + רווח Agency" /></span>
                <span style={{ fontWeight: 700, fontSize: 16 }}>{fmtCurrency(clientTotal)}</span>
              </div>
              <button style={{ width: "100%", padding: "12px 0", background: "#000", color: "#fff", fontSize: 14, fontWeight: 600, borderRadius: 9, border: "none", cursor: "pointer" }}>
                צור הצעת מחיר
              </button>
            </div>
          </div>
          {/* Click-away area (no visual overlay, doesn't block page) */}
        </>
      )}

      {/* ── Footer ── */}
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

// ============================================================
// TAB 1: Marketplace
// ============================================================
function MarketplaceTab({
  publishers, cart, flashId, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory,
  sortBy, setSortBy, approvedOnly, setApprovedOnly, onAddToCart, getPrice, setPriceOverrides,
}: {
  publishers: Publisher[];
  cart: number[];
  flashId: number | null;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
  approvedOnly: boolean;
  setApprovedOnly: (v: boolean) => void;
  getPrice: (pub: Publisher) => number;
  setPriceOverrides: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  onAddToCart: (id: number) => void;
}) {
  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#000", marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>
          ScalePublish <span style={{ fontWeight: 400, fontSize: 20 }}>— פלטפורמת תוכן לסוכנויות</span> <Tooltip text="פלטפורמה לבחירת אתרים, בניית תוכניות עבודה והפקת הצעות מחיר ללקוחות" />
        </h1>
        <p style={{ fontSize: 14, color: "#727272", lineHeight: 1.6 }}>
          בחרו אתרים, בנו תוכנית עבודה והפיקו הצעות מחיר — SEO ו-GEO במקום אחד
        </p>
      </div>

      {/* Filter bar */}
      <div style={{ background: "#F9F9F9", borderRadius: 10, border: "1px solid #DDDDDD", padding: "16px 20px", marginBottom: 24, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
        {/* Search */}
        <div style={{ position: "relative", minWidth: 220 }}>
          <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}>
            <IconSearch size={15} />
          </span>
          <input
            type="text"
            placeholder="חיפוש אתר..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "9px 38px 9px 14px",
              fontSize: 13,
              border: "1px solid #DDDDDD",
              borderRadius: 8,
              background: "#fff",
              outline: "none",
              color: "#333",
            }}
          />
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 28, background: "#DDDDDD" }} />

        {/* Categories */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, flex: 1 }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: selectedCategory === cat ? 600 : 400,
                color: selectedCategory === cat ? "#fff" : "#333",
                background: selectedCategory === cat ? "#000" : "#fff",
                border: `1px solid ${selectedCategory === cat ? "#000" : "#DDDDDD"}`,
                borderRadius: 20,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 28, background: "#DDDDDD" }} />

        {/* Sort */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: "#727272" }}>מיון:</span>
          <div style={{ position: "relative" }}>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{
                appearance: "none",
                padding: "7px 28px 7px 10px",
                fontSize: 12,
                fontWeight: 500,
                border: "1px solid #DDDDDD",
                borderRadius: 8,
                background: "#fff",
                cursor: "pointer",
                color: "#333",
                outline: "none",
              }}
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <span style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#A2A9B0" }}>
              <IconChevronDown size={12} />
            </span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 28, background: "#DDDDDD" }} />

        {/* Approved only toggle */}
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 12, color: "#333", whiteSpace: "nowrap" }}>
          <div
            onClick={() => setApprovedOnly(!approvedOnly)}
            style={{
              width: 36,
              height: 20,
              borderRadius: 10,
              background: approvedOnly ? "#10A37F" : "#DDDDDD",
              position: "relative",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            <div style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              background: "#fff",
              position: "absolute",
              top: 2,
              transition: "all 0.2s",
              ...(approvedOnly ? { left: 18 } : { left: 2 }),
            }} />
          </div>
          אתרים מאושרים בלבד
        </label>
      </div>

      {/* Results count */}
      <div style={{ fontSize: 13, color: "#727272", marginBottom: 16 }}>
        {publishers.length} אתרים נמצאו
      </div>

      {/* Publisher Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {publishers.map(pub => (
          <PublisherCard
            key={pub.id}
            publisher={pub}
            inCart={cart.includes(pub.id)}
            isFlashing={flashId === pub.id}
            onToggleCart={() => onAddToCart(pub.id)}
            price={getPrice(pub)}
            onPriceChange={(p) => setPriceOverrides(prev => ({ ...prev, [pub.id]: p }))}
          />
        ))}
      </div>

      {publishers.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#727272" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>0</div>
          <div style={{ fontSize: 14 }}>לא נמצאו אתרים התואמים את החיפוש</div>
        </div>
      )}
    </div>
  );
}

// ── Publisher Card ──
function PublisherCard({ publisher: pub, inCart, isFlashing, onToggleCart, price, onPriceChange }: {
  publisher: Publisher;
  inCart: boolean;
  isFlashing: boolean;
  onToggleCart: () => void;
  price: number;
  onPriceChange: (newPrice: number) => void;
}) {
  return (
    <div
      style={{
        border: `1px solid ${inCart ? "#10A37F" : "#DDDDDD"}`,
        borderRadius: 10,
        padding: 20,
        background: isFlashing ? "#10A37F08" : "#fff",
        transition: "all 0.3s",
        position: "relative",
      }}
    >
      {/* Status badge */}
      {pub.status === "pending" && (
        <span style={{ position: "absolute", top: 12, left: 12, fontSize: 10, fontWeight: 600, color: "#E07800", background: "#E0780015", padding: "3px 10px", borderRadius: 20 }}>
          בבדיקה
        </span>
      )}

      {/* Header */}
      <div style={{ marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
        <Favicon domain={pub.domain} size={36} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#000" }}>{pub.name}</span>
            <a href={`https://${pub.domain}`} target="_blank" rel="noopener noreferrer" style={{ color: "#A2A9B0", display: "inline-flex" }}>
              <IconExternalLink size={11} />
            </a>
          </div>
          <div style={{ fontSize: 12, color: "#727272" }}>{pub.domain}</div>
        </div>
      </div>

      {/* Category */}
      <span style={{ display: "inline-block", fontSize: 11, fontWeight: 500, color: "#333", background: "#F9F9F9", border: "1px solid #DDDDDD", padding: "3px 12px", borderRadius: 20, marginBottom: 14 }}>
        {pub.category}
      </span>

      {/* Recommended badge + persuasion */}
      {pub.seoScore + pub.gioScore >= 170 && pub.gptPresent && pub.geminiPresent && (
        <div style={{ marginBottom: 10, padding: "8px 10px", background: "#10A37F08", border: "1px solid #10A37F30", borderRadius: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10A37F" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#10A37F" }}>מומלץ עבור All4Horses</span>
          </div>
          <p style={{ fontSize: 11, color: "#555", margin: 0, lineHeight: 1.5 }}>
            {pub.category === "בריאות" ? "מתאים לתחום הטיפולי — קהל יעד רלוונטי לרכיבה טיפולית ובריאות ילדים"
            : pub.category === "חדשות" ? "חשיפה מקסימלית — אתר חדשות מוביל עם נוכחות גבוהה במנועי AI"
            : pub.category === "לייפסטייל" ? "מתאים לתחום הפנאי והטבע — קהל המחפש פעילויות חוץ ופנאי"
            : `התאמה גבוהה — ציון SEO ${pub.seoScore} וציון GEO ${pub.gioScore}, נוכחות מלאה ב-ChatGPT ו-Gemini`}
          </p>
        </div>
      )}

      {/* Metrics row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
        <MetricBox label="SEO Score" value={pub.seoScore} color={scoreColor(pub.seoScore)} tooltip="ציון איכות SEO מבוסס DR, תנועה ואינדוקס" />
        <MetricBox label="GIO Score" value={pub.gioScore} color={scoreColor(pub.gioScore)} tooltip="ציון נוכחות במנועי AI - GPT, Gemini" />
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
        <StatItem label="DR" value={String(pub.dr)} tooltip="Domain Rating - ציון סמכות הדומיין" />
        <StatItem label="תנועה חודשית" value={fmtNum(pub.traffic)} tooltip="תנועה אורגנית חודשית משוערת" />
        <StatItem
          label="Google Index"
          value={
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: pub.googleIndex ? "#10A37F" : "#E53E3E", display: "inline-block" }} />
              <span style={{ fontSize: 11 }}>{pub.googleIndex ? "פעיל" : "לא"}</span>
            </span>
          }
          tooltip="האם האתר מאונדקס בגוגל"
        />
      </div>

      {/* AI Presence */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <AiBadge engine="GPT" present={pub.gptPresent} />
        <AiBadge engine="Gemini" present={pub.geminiPresent} />
      </div>

      {/* Footer: Price + CTA */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid #F0F0F0" }}>
        <div>
          <div style={{ fontSize: 11, color: "#727272", marginBottom: 2 }}>מחיר למאמר</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 14, color: "#727272" }}>₪</span>
            <input
              type="number"
              value={price}
              onChange={(e) => onPriceChange(Number(e.target.value))}
              onClick={(e) => e.stopPropagation()}
              style={{ width: 80, fontSize: 18, fontWeight: 700, color: "#000", border: "none", borderBottom: "1px dashed #BFBFBF", background: "transparent", outline: "none", padding: "0 0 2px", textAlign: "right" }}
            />
          </div>
        </div>
        <button
          onClick={onToggleCart}
          style={{
            padding: "9px 20px",
            fontSize: 13,
            fontWeight: 600,
            borderRadius: 9,
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            ...(inCart
              ? { background: "#10A37F", color: "#fff" }
              : { background: "#000", color: "#fff" }
            ),
          }}
        >
          {inCart ? (
            <>
              <IconCheck size={13} />
              נוסף
            </>
          ) : (
            "הוסף לתוכנית"
          )}
        </button>
      </div>
    </div>
  );
}

function MetricBox({ label, value, color, tooltip }: { label: string; value: number; color: string; tooltip?: string }) {
  return (
    <div style={{ background: "#F9F9F9", borderRadius: 8, padding: "10px 12px", border: "1px solid #F0F0F0" }}>
      <div style={{ fontSize: 10, color: "#727272", marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}>{label} {tooltip && <Tooltip text={tooltip} />}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
    </div>
  );
}

function StatItem({ label, value, tooltip }: { label: string; value: React.ReactNode; tooltip?: string }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: "#A2A9B0", marginBottom: 2, display: "flex", alignItems: "center", gap: 4 }}>{label} {tooltip && <Tooltip text={tooltip} />}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>{value}</div>
    </div>
  );
}

function AILogo({ engine, size = 16 }: { engine: string; size?: number }) {
  const src = engine === "GPT" ? "/logos/chatgpt.svg" : engine === "Gemini" ? "/logos/gemini.svg" : "/logos/perplexity.svg";
  return <img src={src} width={size} height={size} alt={engine} style={{ display: "inline-block" }} />;
}

function AiBadge({ engine, present }: { engine: string; present: boolean }) {
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontSize: 11,
      fontWeight: 500,
      padding: "4px 10px",
      borderRadius: 20,
      border: `1px solid ${present ? "#10A37F40" : "#E53E3E30"}`,
      color: present ? "#10A37F" : "#E53E3E",
      background: present ? "#10A37F08" : "#E53E3E08",
    }}>
      <AILogo engine={engine} size={14} />
      {present ? "\u2713" : "\u2717"}
    </span>
  );
}

// ── Projection Panel: shows forecasted query appearances + exposure growth ──
function ProjectionPanel({
  speed, duration, planType, cartSiteCount, cartQueries,
}: {
  speed: "fast" | "medium" | "slow";
  duration: 3 | 6;
  planType: PlanType;
  cartSiteCount: number;
  cartQueries: number;
}) {
  const speedBase = { fast: 42, medium: 26, slow: 14 };
  const typeFactor: Record<PlanType, number> = { combined: 1, seo: 0.7, geo: 0.65 };
  const baseStart = Math.round(speedBase[speed] * typeFactor[planType]);
  const cartBoost = Math.round(cartQueries * 0.6);
  const startQ = baseStart + Math.round(cartBoost * 0.25);
  const endMultiplier = duration === 6 ? 4.1 : 2.3;
  const endQ = Math.round((baseStart * endMultiplier) + cartBoost);
  const exposureGrowthMap = {
    fast: { 3: 140, 6: 245 }, medium: { 3: 95, 6: 160 }, slow: { 3: 45, 6: 80 },
  } as const;
  const baseGrowth = exposureGrowthMap[speed][duration];
  const totalGrowth = Math.round(baseGrowth + cartSiteCount * 12);

  const points: number[] = Array.from({ length: duration }, (_, i) => {
    const progress = i / (duration - 1);
    const eased = Math.pow(progress, 1.35);
    return Math.round(startQ + (endQ - startQ) * eased);
  });

  const W = 620, H = 170, PAD_L = 36, PAD_R = 20, PAD_T = 20, PAD_B = 30;
  const maxY = Math.max(...points, 10) * 1.1;
  const pointCoords = points.map((v, i) => {
    const x = PAD_L + ((W - PAD_L - PAD_R) * i) / Math.max(1, points.length - 1);
    const y = H - PAD_B - ((H - PAD_T - PAD_B) * v) / maxY;
    return { x, y, v, i };
  });
  const pathD = "M " + pointCoords.map(p => `${p.x},${p.y}`).join(" L ");
  const areaD = pathD + ` L ${pointCoords[pointCoords.length - 1].x},${H - PAD_B} L ${pointCoords[0].x},${H - PAD_B} Z`;

  return (
    <div style={{ border: "1px solid #DDDDDD", borderRadius: 10, padding: 24, marginBottom: 20, background: "#fff" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, marginBottom: 20, flexWrap: "wrap" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 20, background: "#10A37F15", color: "#10A37F", fontSize: 11, fontWeight: 600, marginBottom: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: "#10A37F" }} />
            תחזית חזון
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#000", margin: "0 0 4px" }}>מה התוכנית הזו תביא לכם</h3>
          <p style={{ fontSize: 12, color: "#727272", margin: 0 }}>הופעה צפויה בשאילתות AI וצמיחה לאורך {duration} חודשים</p>
        </div>
        {/* KPIs */}
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ padding: "12px 18px", borderRadius: 10, background: "#F9F9F9", border: "1px solid #F0F0F0", minWidth: 140 }}>
            <div style={{ fontSize: 10, color: "#727272", marginBottom: 4, fontWeight: 500 }}>הופעות בשאילתות - בסוף תקופה</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span style={{ fontSize: 26, fontWeight: 700, color: "#000" }}>~{endQ}</span>
              <span style={{ fontSize: 12, color: "#727272" }}>שאילתות/חודש</span>
            </div>
            <div style={{ fontSize: 11, color: "#10A37F", fontWeight: 600, marginTop: 2 }}>מ-{startQ} ← {endQ}</div>
          </div>
          <div style={{ padding: "12px 18px", borderRadius: 10, background: "#10A37F08", border: "1px solid #10A37F30", minWidth: 140 }}>
            <div style={{ fontSize: 10, color: "#10A37F", marginBottom: 4, fontWeight: 500 }}>גידול חשיפה צפוי</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span style={{ fontSize: 26, fontWeight: 700, color: "#10A37F" }}>+{totalGrowth}%</span>
            </div>
            <div style={{ fontSize: 11, color: "#727272", marginTop: 2 }}>בנוכחות במנועי AI</div>
          </div>
        </div>
      </div>

      {/* SVG Chart */}
      <div style={{ position: "relative" }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: "block" }}>
          <defs>
            <linearGradient id="projFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10A37F" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#10A37F" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Gridlines */}
          {[0.25, 0.5, 0.75, 1].map((f, i) => {
            const y = H - PAD_B - (H - PAD_T - PAD_B) * f;
            return <line key={i} x1={PAD_L} x2={W - PAD_R} y1={y} y2={y} stroke="#F0F0F0" strokeWidth="1" />;
          })}
          {/* Y axis labels */}
          {[0, 0.5, 1].map((f, i) => {
            const y = H - PAD_B - (H - PAD_T - PAD_B) * f;
            const val = Math.round(maxY * f);
            return <text key={i} x={PAD_L - 8} y={y + 3} fontSize="10" fill="#A2A9B0" textAnchor="end">{val}</text>;
          })}
          {/* Area + line */}
          <path d={areaD} fill="url(#projFill)" />
          <path d={pathD} fill="none" stroke="#10A37F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Points */}
          {pointCoords.map((p) => (
            <g key={p.i}>
              <circle cx={p.x} cy={p.y} r="4" fill="#fff" stroke="#10A37F" strokeWidth="2" />
              <text x={p.x} y={p.y - 10} fontSize="11" fill="#000" fontWeight="600" textAnchor="middle">{p.v}</text>
            </g>
          ))}
          {/* X axis labels */}
          {pointCoords.map((p) => (
            <text key={`x-${p.i}`} x={p.x} y={H - 10} fontSize="10" fill="#727272" textAnchor="middle">חודש {p.i + 1}</text>
          ))}
        </svg>
      </div>

      {/* Bottom: explanation + marketplace CTA */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginTop: 16, padding: "14px 16px", borderRadius: 10, background: "#F9F9F9", border: "1px dashed #DDDDDD", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10A37F" strokeWidth="2" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
          <div style={{ fontSize: 13, color: "#333" }}>
            {cartSiteCount > 0 ? (
              <span><strong style={{ color: "#10A37F" }}>{cartSiteCount} אתרים בסל</strong> - מוסיפים ~{cartQueries} שאילתות לתחזית. הגרף עודכן.</span>
            ) : (
              <span>הוסיפו אתרי פרסום מה-Marketplace כדי להגדיל את התחזית</span>
            )}
          </div>
        </div>
        <div style={{ fontSize: 11, color: "#A2A9B0" }}>כל אתר נוסף מעלה את התקרה ב-~10-15%</div>
      </div>
    </div>
  );
}

// ============================================================
// TAB 2: Plan Builder
// ============================================================
function PlannerTab({
  planSpeed, setPlanSpeed, planDuration, setPlanDuration, planData, planTotals, planType, setPlanType,
  cartSiteCount, cartQueries, cartTotal, goToMarketplace,
}: {
  planSpeed: "fast" | "medium" | "slow";
  setPlanSpeed: (v: "fast" | "medium" | "slow") => void;
  planDuration: 3 | 6;
  setPlanDuration: (v: 3 | 6) => void;
  planData: PlanRow[];
  planTotals: { articles: number; budget: number };
  planType: PlanType;
  setPlanType: (v: PlanType) => void;
  cartSiteCount: number;
  cartQueries: number;
  cartTotal: number;
  goToMarketplace: () => void;
}) {
  const discount = getDiscountInfo(planSpeed, planDuration);

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#000", marginBottom: 6 }}>בונה תוכנית עבודה</h1>
        <p style={{ fontSize: 14, color: "#727272" }}>הגדירו מותג, משך ומהירות - ותקבלו תוכנית עבודה מותאמת אישית עם הצעת מחיר</p>
      </div>

      {/* Configuration row */}
      <div style={{ background: "#F9F9F9", borderRadius: 10, border: "1px solid #DDDDDD", padding: "20px 24px", marginBottom: 20, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 24 }}>
        {/* Brand selector */}
        <div>
          <div style={{ fontSize: 11, color: "#727272", marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}>מותג <Tooltip text="בחרו את המותג שעבורו נבנית התוכנית" /></div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 16px",
            border: "1px solid #DDDDDD",
            borderRadius: 8,
            background: "#fff",
            fontSize: 13,
            fontWeight: 600,
            minWidth: 180,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: 4, background: "#10A37F", display: "inline-block" }} />
            All4Horses
            <span style={{ marginRight: "auto", color: "#A2A9B0" }}><IconChevronDown size={12} /></span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 48, background: "#DDDDDD" }} />

        {/* Duration */}
        <div>
          <div style={{ fontSize: 11, color: "#727272", marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}>משך תוכנית <Tooltip text="3 חודשים לתוצאות מהירות, 6 חודשים לעומק ושליטה" /></div>
          <div style={{ display: "flex", gap: 0, border: "1px solid #DDDDDD", borderRadius: 8, overflow: "hidden" }}>
            {([3, 6] as const).map(d => (
              <button
                key={d}
                onClick={() => setPlanDuration(d)}
                style={{
                  padding: "9px 20px",
                  fontSize: 13,
                  fontWeight: planDuration === d ? 600 : 400,
                  background: planDuration === d ? "#000" : "#fff",
                  color: planDuration === d ? "#fff" : "#333",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {d} חודשים
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 48, background: "#DDDDDD" }} />

        {/* Speed */}
        <div>
          <div style={{ fontSize: 11, color: "#727272", marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}>מהירות <Tooltip text="אגרסיבי = 8 מאמרים/חודש, בינוני = 5, שמרני = 3" /></div>
          <div style={{ display: "flex", gap: 0, border: "1px solid #DDDDDD", borderRadius: 8, overflow: "hidden" }}>
            {([
              { key: "fast" as const, label: "אגרסיבי" },
              { key: "medium" as const, label: "בינוני" },
              { key: "slow" as const, label: "שמרני" },
            ]).map(s => (
              <button
                key={s.key}
                onClick={() => setPlanSpeed(s.key)}
                style={{
                  padding: "9px 20px",
                  fontSize: 13,
                  fontWeight: planSpeed === s.key ? 600 : 400,
                  background: planSpeed === s.key ? "#000" : "#fff",
                  color: planSpeed === s.key ? "#fff" : "#333",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Images / Assets */}
      <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #DDDDDD", padding: "16px 20px", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#000" }}>תמונות וחומרים מצורפים</div>
            <div style={{ fontSize: 11, color: "#727272", marginTop: 2 }}>הוסיפו תמונות מוצר, לוגו או חומרי מותג - ישולבו אוטומטית בתוכן</div>
          </div>
          <span style={{ fontSize: 11, color: "#A2A9B0" }}>3 פריטים</span>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            { bg: "linear-gradient(135deg,#FEF3C7,#FCD34D)", label: "לוגו" },
            { bg: "linear-gradient(135deg,#DBEAFE,#93C5FD)", label: "סוס-1.jpg" },
            { bg: "linear-gradient(135deg,#D1FAE5,#6EE7B7)", label: "חווה.png" },
          ].map((img, i) => (
            <div key={i} style={{ position: "relative", width: 84, height: 84, borderRadius: 8, background: img.bg, border: "1px solid #DDDDDD", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
              <div style={{ width: "100%", padding: "4px 6px", background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: 10, fontWeight: 500, textAlign: "center" }}>{img.label}</div>
              <button aria-label="הסר" style={{ position: "absolute", top: 4, left: 4, width: 18, height: 18, borderRadius: 9, background: "rgba(0,0,0,0.6)", color: "#fff", border: "none", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
            </div>
          ))}
          <label style={{ width: 84, height: 84, borderRadius: 8, border: "1.5px dashed #A2A9B0", background: "#F9F9F9", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", gap: 4, color: "#727272", transition: "all 0.15s" }}>
            <span style={{ fontSize: 22, lineHeight: 1, fontWeight: 300 }}>+</span>
            <span style={{ fontSize: 10, fontWeight: 500 }}>הוסף תמונה</span>
            <input type="file" accept="image/*" multiple style={{ display: "none" }} />
          </label>
        </div>
      </div>

      {/* Plan Type Cards — SEO / GEO / Combined with discount */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
        {/* SEO Only */}
        {(() => {
          const seoPrices: Record<string, number> = { fast: 8500, medium: 5600, slow: 3500 };
          const geoPrices: Record<string, number> = { fast: 7100, medium: 4700, slow: 2900 };
          const seoPrice = seoPrices[planSpeed];
          const geoPrice = geoPrices[planSpeed];
          return (
            <>
              <button
                onClick={() => setPlanType("seo")}
                style={{
                  padding: 20,
                  borderRadius: 10,
                  border: planType === "seo" ? "2px solid #000" : "1px solid #DDDDDD",
                  background: planType === "seo" ? "#F9F9F9" : "#fff",
                  cursor: "pointer",
                  textAlign: "right",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 600, color: "#000", marginBottom: 4 }}>SEO בלבד</div>
                <div style={{ fontSize: 12, color: "#727272", marginBottom: 10 }}>מאמרים ממוקדים לקידום אורגני</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#000" }}>{fmtCurrency(seoPrice)}</div>
                <div style={{ fontSize: 11, color: "#A2A9B0" }}>{fmtCurrency(seoPrice)} / חודש</div>
              </button>

              {/* GEO Only */}
              <button
                onClick={() => setPlanType("geo")}
                style={{
                  padding: 20,
                  borderRadius: 10,
                  border: planType === "geo" ? "2px solid #000" : "1px solid #DDDDDD",
                  background: planType === "geo" ? "#F9F9F9" : "#fff",
                  cursor: "pointer",
                  textAlign: "right",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 600, color: "#000", marginBottom: 4 }}>GEO בלבד</div>
                <div style={{ fontSize: 12, color: "#727272", marginBottom: 10 }}>תוכן ממוקד למנועי AI</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#000" }}>{fmtCurrency(geoPrice)}</div>
                <div style={{ fontSize: 11, color: "#A2A9B0" }}>{fmtCurrency(geoPrice)} / חודש</div>
              </button>
            </>
          );
        })()}

        {/* Combined — with discount badge */}
        <button
          onClick={() => setPlanType("combined")}
          style={{
            position: "relative",
            padding: 20,
            borderRadius: 10,
            border: planType === "combined" ? "2px solid #10A37F" : "1px solid #DDDDDD",
            background: planType === "combined" ? "#10A37F08" : "#fff",
            cursor: "pointer",
            textAlign: "right",
            transition: "all 0.2s",
          }}
        >
          {/* Discount badge */}
          <div style={{
            position: "absolute",
            top: -10,
            left: 16,
            padding: "3px 12px",
            borderRadius: 20,
            background: "#10A37F",
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
          }}>
            חיסכון {discount.savingsPercent}%
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#000" }}>SEO + GEO</div>
            <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: "#10A37F15", color: "#10A37F", fontWeight: 600 }}>מומלץ</span>
          </div>
          <div style={{ fontSize: 12, color: "#727272", marginBottom: 10 }}>חבילה משולבת - קידום אורגני + נוכחות AI</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: "#10A37F" }}>{fmtCurrency(discount.combinedMonthly)}</span>
            <span style={{ fontSize: 13, color: "#A2A9B0", textDecoration: "line-through" }}>{fmtCurrency(discount.separateMonthly)}</span>
          </div>
          <div style={{ fontSize: 11, color: "#10A37F", fontWeight: 500 }}>
            חיסכון של {fmtCurrency(discount.savingsMonthly)} בחודש
          </div>
        </button>
      </div>

      {/* Discount banner when combined is selected */}
      {planType === "combined" && (
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderRadius: 10, background: "#10A37F08", border: "1px solid #10A37F30", marginBottom: 20 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10A37F" strokeWidth="2" strokeLinecap="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
          <div>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#10A37F" }}>הנחה פעילה: </span>
            <span style={{ fontSize: 13, color: "#333" }}>חיסכון של {fmtCurrency(discount.savingsTotal)} לאורך כל התוכנית ({planDuration} חודשים) בבחירת חבילה משולבת</span>
          </div>
        </div>
      )}

      {/* Projection / Vision Panel */}
      <ProjectionPanel
        speed={planSpeed}
        duration={planDuration}
        planType={planType}
        cartSiteCount={cartSiteCount}
        cartQueries={cartQueries}
      />

      {/* Plan table */}
      <div style={{ border: "1px solid #DDDDDD", borderRadius: 10, overflow: "hidden", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#F9F9F9" }}>
              <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: 600, color: "#333", borderBottom: "1px solid #DDDDDD" }}>חודש</th>
              <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#333", borderBottom: "1px solid #DDDDDD" }}>מאמרי SEO</th>
              <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#333", borderBottom: "1px solid #DDDDDD" }}>מאמרי GEO</th>
              <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#333", borderBottom: "1px solid #DDDDDD" }}>אתרים</th>
              <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#333", borderBottom: "1px solid #DDDDDD" }}>תקציב חודשי</th>
            </tr>
          </thead>
          <tbody>
            {planData.map(row => (
              <tr key={row.month} style={{ borderBottom: "1px solid #F0F0F0" }}>
                <td style={{ padding: "14px 16px", fontWeight: 600 }}>חודש {row.month}</td>
                <td style={{ padding: "14px 16px", textAlign: "center", color: planType === "geo" ? "#A2A9B0" : undefined }}>{planType === "geo" ? "—" : row.seoArticles}</td>
                <td style={{ padding: "14px 16px", textAlign: "center", color: planType === "seo" ? "#A2A9B0" : undefined }}>{planType === "seo" ? "—" : row.geoArticles}</td>
                <td style={{ padding: "14px 16px", textAlign: "center" }}>{row.sites}</td>
                <td style={{ padding: "14px 16px", textAlign: "left", fontWeight: 600 }}>{fmtCurrency(row.budget)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ background: "#F9F9F9", fontWeight: 700 }}>
              <td style={{ padding: "14px 16px", borderTop: "1px solid #DDDDDD" }}>סה&quot;כ</td>
              <td style={{ padding: "14px 16px", textAlign: "center", borderTop: "1px solid #DDDDDD", color: planType === "geo" ? "#A2A9B0" : undefined }}>{planType === "geo" ? "—" : planData.reduce((s, r) => s + r.seoArticles, 0)}</td>
              <td style={{ padding: "14px 16px", textAlign: "center", borderTop: "1px solid #DDDDDD", color: planType === "seo" ? "#A2A9B0" : undefined }}>{planType === "seo" ? "—" : planData.reduce((s, r) => s + r.geoArticles, 0)}</td>
              <td style={{ padding: "14px 16px", textAlign: "center", borderTop: "1px solid #DDDDDD" }}>{planData.reduce((s, r) => s + r.sites, 0)}</td>
              <td style={{ padding: "14px 16px", textAlign: "left", borderTop: "1px solid #DDDDDD" }}>
                <span>{fmtCurrency(planTotals.budget)}</span>
                {planType === "combined" && (
                  <span style={{ fontSize: 11, color: "#A2A9B0", textDecoration: "line-through", marginRight: 8 }}>{fmtCurrency(discount.separateTotal)}</span>
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
        <SummaryCard label={'סה"כ מאמרים'} value={String(planTotals.articles)} accent={false} />
        <SummaryCard label="תקציב כולל" value={fmtCurrency(planTotals.budget)} accent={false} />
        {planType === "combined" ? (
          <div style={{ border: "1px solid #10A37F30", borderRadius: 10, padding: 20, background: "#10A37F08" }}>
            <div style={{ fontSize: 12, color: "#10A37F", marginBottom: 8, fontWeight: 500 }}>חיסכון כולל</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#10A37F" }}>{fmtCurrency(discount.savingsTotal)}</div>
          </div>
        ) : (
          <SummaryCard label="עלייה צפויה בתנועה" value={planSpeed === "fast" ? "+180%" : planSpeed === "medium" ? "+120%" : "+65%"} accent={true} />
        )}
        <SummaryCard label="אתרי פרסום בסל" value={String(cartSiteCount)} accent={cartSiteCount > 0} />
      </div>

      {/* Proposal Builder — connects SEO plan + Marketplace cart */}
      <div style={{ border: "1px solid #DDDDDD", borderRadius: 10, padding: 24, background: "#FFFFFF", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20, marginBottom: 18, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 11, color: "#727272", fontWeight: 600, marginBottom: 4, letterSpacing: 0.3 }}>הצעת מחיר כוללת</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#000", margin: 0 }}>מה כלול בהצעת המחיר</h3>
            <p style={{ fontSize: 12, color: "#727272", margin: "4px 0 0" }}>התוכנית מחלקת את ההצעה לשני רכיבים שמתחברים אוטומטית</p>
          </div>
        </div>

        {/* Two columns: SEO/GEO plan + External publisher cart */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
          {/* Left: content plan */}
          <div style={{ padding: 18, borderRadius: 10, border: "1px solid #F0F0F0", background: "#F9F9F9" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ width: 28, height: 28, borderRadius: 6, background: "#000", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>1</span>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#000" }}>
                תוכנית תוכן {planType === "seo" ? "SEO" : planType === "geo" ? "GEO" : "SEO + GEO"}
              </div>
            </div>
            <div style={{ fontSize: 12, color: "#727272", marginBottom: 12, lineHeight: 1.6 }}>
              {planTotals.articles} מאמרים לאורך {planDuration} חודשים במהירות {planSpeed === "fast" ? "אגרסיבית" : planSpeed === "medium" ? "בינונית" : "שמרנית"}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid #E5E5E5", fontSize: 13 }}>
              <span style={{ color: "#333" }}>סה&quot;כ</span>
              <span style={{ fontWeight: 700, color: "#000" }}>{fmtCurrency(planTotals.budget)}</span>
            </div>
          </div>

          {/* Right: external publishers from cart */}
          <div style={{ padding: 18, borderRadius: 10, border: cartSiteCount > 0 ? "1px solid #10A37F30" : "1px dashed #DDDDDD", background: cartSiteCount > 0 ? "#10A37F08" : "#FAFAFA" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ width: 28, height: 28, borderRadius: 6, background: cartSiteCount > 0 ? "#10A37F" : "#A2A9B0", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>2</span>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#000" }}>הגברה חיצונית - פרסום באתרי Publishers</div>
            </div>
            {cartSiteCount > 0 ? (
              <>
                <div style={{ fontSize: 12, color: "#727272", marginBottom: 12, lineHeight: 1.6 }}>
                  {cartSiteCount} אתרים מה-Marketplace · כיסוי ~{cartQueries} שאילתות AI נוספות
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid #10A37F30", fontSize: 13 }}>
                  <span style={{ color: "#333" }}>סה&quot;כ</span>
                  <span style={{ fontWeight: 700, color: "#10A37F" }}>{fmtCurrency(cartTotal)}</span>
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 12, color: "#727272", marginBottom: 12, lineHeight: 1.6 }}>
                  עוד לא נבחרו אתרים. הוסיפו אתרים מה-Marketplace כדי לכלול פרסום חיצוני בהצעה.
                </div>
                <button
                  onClick={goToMarketplace}
                  style={{ padding: "8px 16px", fontSize: 12, fontWeight: 600, borderRadius: 8, border: "1px solid #000", background: "#fff", color: "#000", cursor: "pointer" }}
                >
                  + הוסף אתרים מה-Marketplace
                </button>
              </>
            )}
          </div>
        </div>

        {/* Validation warnings */}
        {cartSiteCount === 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", borderRadius: 8, background: "#FFF7ED", border: "1px solid #F59E0B40", marginBottom: 14 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
            <span style={{ fontSize: 12, color: "#92400E" }}>טרם נבחרו אתרי פרסום — הוסיפו אתרים מה-Marketplace להצעה מלאה</span>
          </div>
        )}
        {cartSiteCount > 0 && cartSiteCount < 3 && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", borderRadius: 8, background: "#EFF6FF", border: "1px solid #3B82F640", marginBottom: 14 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
            <span style={{ fontSize: 12, color: "#1E40AF" }}>מומלץ לבחור לפחות 3 אתרים לכיסוי אופטימלי של שאילתות AI</span>
          </div>
        )}

        {/* Grand total + CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", borderRadius: 10, background: "#000", color: "#fff", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: "#A2A9B0", marginBottom: 2, fontWeight: 500 }}>סה&quot;כ הצעת מחיר ללקוח</div>
            <div style={{ fontSize: 26, fontWeight: 700 }}>{fmtCurrency(planTotals.budget + cartTotal)}</div>
            <div style={{ fontSize: 11, color: "#A2A9B0", marginTop: 2 }}>
              תוכן {fmtCurrency(planTotals.budget)} + פרסום חיצוני {fmtCurrency(cartTotal)}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {cartTotal > 0 && (
              <div style={{ textAlign: "left", padding: "8px 16px", background: "rgba(16,163,127,0.15)", borderRadius: 8 }}>
                <div style={{ fontSize: 10, color: "#A2A9B0", marginBottom: 2 }}>רווח Agency (20%)</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#10A37F" }}>+{fmtCurrency(Math.round(cartTotal * 0.2))}</div>
              </div>
            )}
            <button style={{ padding: "14px 36px", background: "#10A37F", color: "#fff", fontSize: 14, fontWeight: 600, borderRadius: 9, border: "none", cursor: "pointer", transition: "opacity 0.2s" }} onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")} onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              צור הצעת מחיר מלאה
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, accent }: { label: string; value: string; accent: boolean }) {
  return (
    <div style={{ border: "1px solid #DDDDDD", borderRadius: 10, padding: 20 }}>
      <div style={{ fontSize: 12, color: "#727272", marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: accent ? "#10A37F" : "#000" }}>{value}</div>
    </div>
  );
}

// ============================================================
// TAB 3: Publishers Portal
// ============================================================
function PublishersTab() {
  const [newDomain, setNewDomain] = useState("");
  const [newCategory, setNewCategory] = useState("טכנולוגיה");
  const [newPrice, setNewPrice] = useState("");

  const stats = [
    { label: "אתרים פעילים", value: "9", color: "#10A37F" },
    { label: "agencies שצפו", value: "24", color: "#333" },
    { label: "מאמרים שנמכרו", value: "47", color: "#333" },
    { label: "הכנסות החודש", value: "32,400 \u20AA", color: "#10A37F" },
  ];

  const statusDot = (status: "approved" | "pending" | "rejected") => {
    const colors = { approved: "#10A37F", pending: "#E07800", rejected: "#E53E3E" };
    const labels = { approved: "מאושר", pending: "בבדיקה", rejected: "נפסל" };
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: colors[status], display: "inline-block" }} />
        <span style={{ fontSize: 12, color: colors[status], fontWeight: 500 }}>{labels[status]}</span>
      </span>
    );
  };

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#000", marginBottom: 6 }}>פורטל Publishers</h1>
        <p style={{ fontSize: 14, color: "#727272" }}>נהלו את האתרים שלכם, עקבו אחרי מכירות וצפו בפעילות agencies</p>
      </div>

      {/* Stats bar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ border: "1px solid #DDDDDD", borderRadius: 10, padding: "16px 20px" }}>
            <div style={{ fontSize: 11, color: "#727272", marginBottom: 6 }}>{stat.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Add new site */}
      <div style={{ border: "1px solid #DDDDDD", borderRadius: 10, padding: "20px 24px", marginBottom: 20, background: "#F9F9F9" }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#000", marginBottom: 16 }}>הוסף אתר חדש</div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: 16 }}>
          <div style={{ flex: "1 1 200px" }}>
            <div style={{ fontSize: 11, color: "#727272", marginBottom: 6 }}>דומיין</div>
            <input
              type="text"
              placeholder="example.co.il"
              value={newDomain}
              onChange={e => setNewDomain(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 14px",
                fontSize: 13,
                border: "1px solid #DDDDDD",
                borderRadius: 8,
                background: "#fff",
                outline: "none",
                color: "#333",
              }}
            />
          </div>
          <div style={{ flex: "0 1 160px" }}>
            <div style={{ fontSize: 11, color: "#727272", marginBottom: 6 }}>קטגוריה</div>
            <div style={{ position: "relative" }}>
              <select
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                style={{
                  width: "100%",
                  appearance: "none",
                  padding: "9px 28px 9px 14px",
                  fontSize: 13,
                  border: "1px solid #DDDDDD",
                  borderRadius: 8,
                  background: "#fff",
                  cursor: "pointer",
                  color: "#333",
                  outline: "none",
                }}
              >
                {CATEGORIES.filter(c => c !== "הכל").map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <span style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#A2A9B0" }}>
                <IconChevronDown size={12} />
              </span>
            </div>
          </div>
          <div style={{ flex: "0 1 140px" }}>
            <div style={{ fontSize: 11, color: "#727272", marginBottom: 6 }}>מחיר למאמר &#8362;</div>
            <input
              type="number"
              placeholder="1,200"
              value={newPrice}
              onChange={e => setNewPrice(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 14px",
                fontSize: 13,
                border: "1px solid #DDDDDD",
                borderRadius: 8,
                background: "#fff",
                outline: "none",
                color: "#333",
              }}
            />
          </div>
          <button style={{
            padding: "9px 24px",
            background: "#000",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            borderRadius: 9,
            border: "none",
            cursor: "pointer",
          }}>
            הוסף אתר
          </button>
        </div>
        <div style={{ marginTop: 10 }}>
          <span style={{ fontSize: 12, color: "#10A37F", cursor: "pointer", fontWeight: 500 }}>העלה אקסל</span>
        </div>
      </div>

      {/* Publisher sites table */}
      <div style={{ border: "1px solid #DDDDDD", borderRadius: 10, overflow: "hidden", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#F9F9F9" }}>
              <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: 600, color: "#333", borderBottom: "1px solid #DDDDDD" }}>אתר</th>
              <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#333", borderBottom: "1px solid #DDDDDD" }}>קטגוריה</th>
              <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#333", borderBottom: "1px solid #DDDDDD" }}>DR</th>
              <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#333", borderBottom: "1px solid #DDDDDD" }}>סטטוס</th>
              <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#333", borderBottom: "1px solid #DDDDDD" }}>agencies שצפו</th>
              <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#333", borderBottom: "1px solid #DDDDDD" }}>מאמרים שנמכרו</th>
              <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#333", borderBottom: "1px solid #DDDDDD" }}>הכנסות</th>
            </tr>
          </thead>
          <tbody>
            {PUBLISHER_SITES.map((site, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #F0F0F0" }}>
                <td style={{ padding: "14px 16px", fontWeight: 600 }}>{site.domain}</td>
                <td style={{ padding: "14px 16px", textAlign: "center" }}>
                  <span style={{ fontSize: 11, background: "#F9F9F9", border: "1px solid #DDDDDD", padding: "3px 10px", borderRadius: 20 }}>{site.category}</span>
                </td>
                <td style={{ padding: "14px 16px", textAlign: "center", fontWeight: 600 }}>{site.dr}</td>
                <td style={{ padding: "14px 16px", textAlign: "center" }}>{statusDot(site.status)}</td>
                <td style={{ padding: "14px 16px", textAlign: "center" }}>{site.agenciesViewed}</td>
                <td style={{ padding: "14px 16px", textAlign: "center" }}>{site.articlesSold}</td>
                <td style={{ padding: "14px 16px", textAlign: "left", fontWeight: 600 }}>{site.revenue !== null ? fmtCurrency(site.revenue) : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Agency Interest */}
      <div style={{ border: "1px solid #DDDDDD", borderRadius: 10, padding: "20px 24px", marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#000", marginBottom: 16 }}>agencies שהתעניינו לאחרונה</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {AGENCY_ACTIVITIES.map((activity, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: i < AGENCY_ACTIVITIES.length - 1 ? "1px solid #F0F0F0" : "none" }}>
              <div style={{ fontSize: 13 }}>
                <span style={{ fontWeight: 600 }}>{activity.agency}</span>
                <span style={{ color: "#727272" }}> — {activity.action}</span>
                <span style={{ fontWeight: 500, color: "#10A37F" }}>{activity.site}</span>
              </div>
              <span style={{ fontSize: 12, color: "#A2A9B0", whiteSpace: "nowrap" }}>{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contract / Terms */}
      <div style={{ border: "1px solid #DDDDDD", borderRadius: 10, padding: "20px 24px" }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#000", marginBottom: 16 }}>תקנון ותנאי שימוש</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
          {[
            "מחירים קבועים — אין אפשרות לשנות מחירים ללא עדכון במערכת",
            "בלעדיות מחירים — אסור למכור במחירים שונים מחוץ לפלטפורמה",
            "איכות תוכן — מחויבות לפרסום תוכן איכותי בלוח זמנים שנקבע",
            "דיווח שקוף — שיתוף אנליטיקס עם agencies לפי דרישה",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "#333" }}>
              <span style={{ color: "#10A37F", fontWeight: 600, marginTop: 1 }}>
                <IconCheck size={14} />
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button style={{
            padding: "10px 24px",
            background: "#000",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            borderRadius: 9,
            border: "none",
            cursor: "pointer",
          }}>
            חתימה דיגיטלית
          </button>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12,
            fontWeight: 600,
            color: "#10A37F",
            background: "#10A37F15",
            padding: "6px 14px",
            borderRadius: 20,
          }}>
            <IconCheck size={12} />
            חתום
          </span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// TAB 4: Rejected Sites
// ============================================================
function RejectedTab({ publishers, pendingCount }: { publishers: Publisher[]; pendingCount: number }) {
  const totalPublishers = PUBLISHERS.length;
  const approvedCount = PUBLISHERS.filter(p => p.status === "approved").length;
  const rejectedCount = publishers.length;

  const stats = [
    { label: 'סה"כ במערכת', value: totalPublishers, color: "#333" },
    { label: "מאושרים", value: approvedCount, color: "#10A37F" },
    { label: "נפסלו", value: rejectedCount, color: "#E53E3E" },
    { label: "ממתינים לבדיקה", value: pendingCount, color: "#E07800" },
  ];

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#000", marginBottom: 6 }}>אתרים פסולים</h1>
        <p style={{ fontSize: 14, color: "#727272" }}>אתרים שנבדקו ולא עמדו בקריטריונים לאיכות</p>
      </div>

      {/* Stats bar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ border: "1px solid #DDDDDD", borderRadius: 10, padding: "16px 20px" }}>
            <div style={{ fontSize: 11, color: "#727272", marginBottom: 6 }}>{stat.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Rejected cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {publishers.map(pub => (
          <div key={pub.id} style={{ border: "1px solid #DDDDDD", borderRadius: 10, padding: "18px 24px", display: "flex", alignItems: "center", gap: 24, background: "#fff" }}>
            {/* Info */}
            <div style={{ flex: "0 0 180px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#000", marginBottom: 2 }}>{pub.name}</div>
              <div style={{ fontSize: 12, color: "#727272" }}>{pub.domain}</div>
            </div>

            {/* Rejection reason */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: "#A2A9B0", marginBottom: 2 }}>סיבת פסילה</div>
              <div style={{ fontSize: 13, color: "#E53E3E", fontWeight: 500 }}>{pub.rejectionReason}</div>
            </div>

            {/* Scores */}
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 10, color: "#A2A9B0", marginBottom: 2 }}>SEO</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#E53E3E" }}>{pub.seoScore}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 10, color: "#A2A9B0", marginBottom: 2 }}>GIO</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#E53E3E" }}>{pub.gioScore}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 10, color: "#A2A9B0", marginBottom: 2 }}>DR</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#E53E3E" }}>{pub.dr}</div>
              </div>
            </div>

            {/* Date */}
            <div style={{ flex: "0 0 100px", textAlign: "center" }}>
              <div style={{ fontSize: 10, color: "#A2A9B0", marginBottom: 2 }}>תאריך פסילה</div>
              <div style={{ fontSize: 12, color: "#727272", fontWeight: 500 }}>12.03.2026</div>
            </div>

            {/* Action */}
            <button style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 18px",
              fontSize: 12,
              fontWeight: 600,
              border: "1px solid #DDDDDD",
              borderRadius: 9,
              background: "#fff",
              color: "#333",
              cursor: "pointer",
              transition: "all 0.15s",
              whiteSpace: "nowrap",
            }}>
              <IconRefresh size={13} />
              בדוק שוב
            </button>
          </div>
        ))}
      </div>

      {publishers.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#727272" }}>
          <div style={{ fontSize: 14 }}>אין אתרים פסולים כרגע</div>
        </div>
      )}
    </div>
  );
}
