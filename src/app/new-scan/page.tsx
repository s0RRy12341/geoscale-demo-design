"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// ============================================================
// GEOSCALE DEMO — 4-Screen Flow
// Screen 1: Brand Input (domain + brand name)
// Screen 2: Analyzing Animation (1-2 min processing)
// Screen 3: Personas Display (static result)
// Screen 4: The Scan Process (queries → ChatGPT → Gemini → Analysis)
// ============================================================

// ── Brand Constants (Geoscale exact palette) ──
const BRAND = {
  teal: "#10A37F",
  tealLight: "#10A37F",
  tealDark: "#0D8C6D",
  black: "#000000",
  nearBlack: "#141414",
  gray50: "#F9F9F9",
  gray100: "#F9F9F9",
  gray200: "#DDDDDD",
  gray300: "#BFBFBF",
  gray400: "#A2A9B0",
  gray500: "#727272",
  gray600: "#54595F",
  gray700: "#333333",
  gray800: "#141414",
};

// ── Geoscale Logo SVG (actual brand) ──
function GeoscaleLogo({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 102 102" fill="none" className={className}>
      <circle cx="51" cy="51" r="38" stroke="#ABABAB" strokeWidth="10" fill="none" />
      <circle cx="51" cy="51" r="25" stroke="#141414" strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray="120 40" />
    </svg>
  );
}

// ── SVG Check icon for step indicator ──
function StepCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

// ── SVG Arrow icons ──
function ArrowLeft({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

function ArrowRight({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

// ── Geoscale Wordmark ──
function GeoscaleWordmark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <GeoscaleLogo size={36} />
      <span className="text-2xl font-semibold tracking-tight" style={{ color: BRAND.black }}>
        Geoscale
      </span>
    </div>
  );
}

// ── Step Indicator ──
function StepIndicator({ current, steps }: { current: number; steps: string[] }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-500"
              style={{
                background: i <= current ? BRAND.teal : BRAND.gray200,
                color: i <= current ? "#fff" : BRAND.gray500,
              }}
            >
              {i < current ? <StepCheck /> : i + 1}
            </div>
            <span
              className="text-xs mt-1 font-medium"
              style={{ color: i <= current ? BRAND.teal : BRAND.gray400 }}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className="w-16 h-0.5 mb-5 transition-all duration-500"
              style={{ background: i < current ? BRAND.teal : BRAND.gray200 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════
// SCREEN 1: Brand Input
// ════════════════════════════════════════════
function Screen1({ onSubmit }: { onSubmit: (domain: string, brand: string) => void }) {
  const [domain, setDomain] = useState("");
  const [brandName, setBrandName] = useState("");

  return (
    <div className="screen-enter min-h-screen flex flex-col" dir="rtl">
      {/* Header */}
      <header style={{ background: "rgba(255,255,255,0.96)", borderBottom: "1px solid #BFBFBF" }}>
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
            <a href="/products" style={{ fontSize: 14, fontWeight: 400, color: "#727272", textDecoration: "none" }}>מוצרים / שירותים</a>
          </nav>
          <div style={{ justifySelf: "end", direction: "ltr" }}>
            <svg width={150} height={30} viewBox="0 0 510 102" fill="none">
              <circle cx="51" cy="51" r="41" stroke="#ABABAB" strokeWidth="13" fill="none" />
              <circle cx="51" cy="51" r="41" stroke="#141414" strokeWidth="13" fill="none" strokeLinecap="round" strokeDasharray="180 78" />
              <g fill="#141414"><text x="120" y="66" fontFamily="'Inter', sans-serif" fontSize="52" fontWeight="600" letterSpacing="-2">Geoscale</text></g>
            </svg>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div
        className="relative py-12 px-4"
        style={{
          background: "#F9F9F9",
        }}
      >
        {/* Subtle dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: BRAND.black }}>
            בדיקת נוכחות ב-AI
          </h1>
          <p className="text-lg" style={{ color: BRAND.gray600 }}>
            בדקו איך מודלי AI (GPT, Gemini) מכירים וממליצים על המותג שלכם — לכל קהל יעד
          </p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="max-w-2xl mx-auto w-full px-4 mt-8">
        <StepIndicator current={0} steps={["פרטים", "קהלים", "סריקה"]} />
      </div>

      {/* Form Card */}
      <div className="max-w-2xl mx-auto w-full px-4 flex-1 pb-16">
        <div className="bg-white rounded-[10px] border border-gray-200 p-8">
          {/* Card Header */}
          <div className="flex items-center gap-2 mb-8">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BRAND.teal} strokeWidth="2">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
              <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
            <span className="font-semibold text-lg">פרטי המותג</span>
          </div>

          {/* Domain Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" style={{ color: BRAND.gray700 }}>
              כתובת האתר
            </label>
            <div className="relative">
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:border-[#10A37F] focus:ring-1 focus:ring-[#10A37F]/20 transition-all"
                style={{ direction: "ltr", textAlign: "left" }}
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BRAND.gray400} strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
              </div>
            </div>
            <p className="text-xs mt-1.5" style={{ color: BRAND.gray400 }}>
              הזינו את הדומיין בלי https://
            </p>
          </div>

          {/* Brand Name Field */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2" style={{ color: BRAND.gray700 }}>
              שם המותג
            </label>
            <div className="relative">
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="שם המותג שלכם"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:border-[#10A37F] focus:ring-1 focus:ring-[#10A37F]/20 transition-all"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BRAND.gray400} strokeWidth="2">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={() => onSubmit(domain || "example.com", brandName || "המותג שלי")}
            className="w-full py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
            style={{
              background: "#000",
            }}
          >
            <span className="flex items-center justify-center gap-2">המשך לבחירת קהלים <ArrowLeft size={18} color="white" /></span>
          </button>
        </div>

        {/* What's New Box */}
        <div className="mt-6 bg-white rounded-[10px] border border-gray-200 p-6">
          <h3 className="font-semibold mb-3" style={{ color: BRAND.teal }}>
            מה חדש?
          </h3>
          <ul className="space-y-2 text-sm" style={{ color: BRAND.gray600 }}>
            <li>המערכת מייצרת <strong>קהלי יעד רלוונטיים</strong> למותג</li>
            <li>תבחרו אילו קהלים לבדוק</li>
            <li>הסריקה תותאם <strong>לכל קהל בנפרד</strong></li>
            <li>תראו תוצאות מפורטות לפי קהל</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════
// SCREEN 2: Analyzing Animation
// ════════════════════════════════════════════
function Screen2({ domain, brandName, onComplete }: { domain: string; brandName: string; onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("מתחבר לאתר...");
  const [dots, setDots] = useState("");

  useEffect(() => {
    // Animate dots
    const dotInterval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 400);

    // Progress simulation
    const stages = [
      { at: 5, text: "מתחבר לאתר" },
      { at: 15, text: "סורק את תוכן האתר" },
      { at: 30, text: "מנתח את המותג" },
      { at: 45, text: "מזהה קהלי יעד פוטנציאליים" },
      { at: 60, text: "מייצר פרסונות רלוונטיות" },
      { at: 75, text: "מתאים שאילתות לכל קהל" },
      { at: 90, text: "מסיים ניתוח" },
      { at: 100, text: "הניתוח הושלם!" },
    ];

    const progressInterval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + 0.5 + Math.random() * 1.5, 100);
        const stage = stages.filter((s) => s.at <= next).pop();
        if (stage) setStatusText(stage.text);
        if (next >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 800);
        }
        return next;
      });
    }, 120);

    return () => {
      clearInterval(dotInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="screen-enter min-h-screen flex flex-col" dir="rtl">
      {/* Header */}
      <header style={{ background: "rgba(255,255,255,0.96)", borderBottom: "1px solid #BFBFBF" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="flex items-center gap-3">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BRAND.gray600} strokeWidth="2">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 00-3-3.87" />
            <path d="M16 3.13a4 4 0 010 7.75" />
          </svg>
          <span className="font-semibold">בחירת קהלי יעד</span>
        </div>
        <span className="flex items-center gap-1 text-sm cursor-pointer" style={{ color: BRAND.gray500 }}>
          <ArrowRight size={14} color={BRAND.gray500} />
          חזרה
        </span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 -mt-16">
        {/* Animated Orb */}
        <div className="relative w-48 h-48 mb-8">
          {/* Outer pulse rings */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: `2px solid ${BRAND.teal}`,
              opacity: 0.15,
              animation: "pulse-ring 2s ease-in-out infinite",
            }}
          />
          <div
            className="absolute inset-[-10px] rounded-full"
            style={{
              border: `1.5px solid ${BRAND.teal}`,
              opacity: 0.1,
              animation: "pulse-ring 2s ease-in-out infinite 0.5s",
            }}
          />
          <div
            className="absolute inset-[-20px] rounded-full"
            style={{
              border: `1px solid ${BRAND.teal}`,
              opacity: 0.05,
              animation: "pulse-ring 2s ease-in-out infinite 1s",
            }}
          />

          {/* Orbiting particles */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2"
              style={{
                width: "8px",
                height: "8px",
                marginTop: "-4px",
                marginLeft: "-4px",
                animation: `${i % 2 === 0 ? "orbit" : "orbit-reverse"} ${3 + i * 0.7}s linear infinite`,
              }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: i % 2 === 0 ? BRAND.teal : BRAND.tealLight,
                  opacity: 0.6 + (i * 0.05),
                }}
              />
            </div>
          ))}

          {/* Center morphing blob */}
          <div className="absolute inset-8 flex items-center justify-center">
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: "#F9F9F9",
                animation: "morph-circle 8s ease-in-out infinite",
              }}
            >
              {/* Geoscale icon in center */}
              <svg width="48" height="48" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={BRAND.gray600}
                  strokeWidth="5"
                  fill="none"
                  strokeDasharray="8 4"
                  style={{ animation: "spin-slow 8s linear infinite" }}
                />
                {/* Inner scanning element */}
                <circle
                  cx="50"
                  cy="50"
                  r="20"
                  stroke={BRAND.teal}
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="20 60"
                  style={{ animation: "spin-reverse 2s linear infinite" }}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Status Text */}
        <h2 className="text-2xl font-bold mb-2" style={{ color: BRAND.black }}>
          מנתח את האתר{dots}
        </h2>
        <p className="text-base mb-8" style={{ color: BRAND.teal }}>
          המערכת מנתחת את המותג ויוצרת פרסונות רלוונטיות
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-md">
          <div className="h-2.5 rounded-full overflow-hidden" style={{ background: BRAND.gray200 }}>
            <div
              className="h-full rounded-full progress-shimmer transition-all duration-300 ease-out"
              style={{
                width: `${progress}%`,
                background: "#10A37F",
              }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs" style={{ color: BRAND.gray400 }}>
              {Math.round(progress)}%
            </span>
            <span className="text-xs font-medium" style={{ color: BRAND.gray500 }}>
              {statusText}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 text-center">
        <p className="text-sm" style={{ color: BRAND.gray400 }}>
          הסריקה אורכת כ-3-5 דקות ובודקת GPT + Gemini לכל קהל יעד
        </p>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════
// SCREEN 3: Personas Display
// ════════════════════════════════════════════

const MOCK_PERSONAS = [
  {
    name: "יוסי",
    title: "מתבגר חובב סוסים",
    desc: "יוסי, בן 16, תלמיד תיכון, חובב סוסי.",
    age: "15-19",
    location: "מרכז הארץ",
    tags: ["#סוסים", "#מתבגר"],
    match: 90,
    iconColor: "#0D9488",
  },
  {
    name: "מאיה",
    title: "אם לילד עם בעיות קשב וריכוז",
    desc: "מאיה, בת 38, גרה בירושלים, מחפשת טיפול משלים.",
    age: "35-44",
    location: "ירושלים",
    tags: ["#הורים", "#חינוך מיוחד"],
    match: 95,
    iconColor: "#8B5CF6",
  },
  {
    name: "דוד",
    title: "הורה לילד על הספקטרום",
    desc: "דוד, בן 47, מחפש פעילויות טיפוליות לבתו.",
    age: "45-54",
    location: "רמת גן",
    tags: ["#הורה", "#ספקטרום"],
    match: 88,
    iconColor: "#EC4899",
  },
  {
    name: "אורי",
    title: "מטפל באמצעות בעלי חיים",
    desc: "אורי, בן 32, מטפל רגשי המשלב בעלי חיים.",
    age: "30-40",
    location: "תל אביב",
    tags: ["#מטפל", "#מקצועי"],
    match: 88,
    iconColor: "#F97316",
  },
  {
    name: "רונית",
    title: "מורה לחינוך מיוחד",
    desc: "רונית, בת 52, מרכזת חינוך מיוחד בבי\"ס.",
    age: "50-59",
    location: "חיפה",
    tags: ["#חינוך", "#מוסדי"],
    match: 82,
    iconColor: "#06B6D4",
  },
];

function PersonaCard({ persona, index }: { persona: typeof MOCK_PERSONAS[0]; index: number }) {
  return (
    <div
      className="bg-white rounded-[10px] border border-gray-200 p-6 hover:border-[#A2A9B0] transition-all duration-300 cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s`, animation: "fade-in-up 0.5s ease-out forwards", opacity: 0 }}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: BRAND.gray100, color: BRAND.gray500 }}>
          פרסונה
        </span>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${persona.iconColor}15` }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={persona.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-1" style={{ color: BRAND.black }}>
        {persona.name} — {persona.title}
      </h3>
      <p className="text-sm mb-4" style={{ color: BRAND.gray500 }}>
        {persona.desc}
      </p>

      {/* Match Score */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: BRAND.gray100 }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${persona.match}%`,
              background: persona.match >= 90 ? BRAND.teal : persona.match >= 85 ? BRAND.tealLight : BRAND.gray400,
            }}
          />
        </div>
        <span
          className="text-sm font-bold"
          style={{ color: persona.match >= 90 ? BRAND.teal : BRAND.gray600 }}
        >
          {persona.match}%
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-xs px-2 py-1 rounded-full" style={{ background: "#F9F9F9", color: BRAND.tealDark }}>
          {persona.age}
        </span>
        <span className="text-xs px-2 py-1 rounded-full" style={{ background: BRAND.gray100, color: BRAND.gray600 }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill={BRAND.gray500} stroke="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>
          {persona.location}
        </span>
        {persona.tags.map((tag) => (
          <span key={tag} className="text-xs px-2 py-1 rounded-full" style={{ background: BRAND.gray100, color: BRAND.gray600 }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function Screen3({ onStartScan }: { onStartScan: () => void }) {
  return (
    <div className="screen-enter min-h-screen flex flex-col" dir="rtl">
      {/* Header with gradient */}
      <div
        className="py-8 px-4"
        style={{
          background: "#F9F9F9",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: BRAND.black }}>
            בדיקת נוכחות ב-AI
          </h1>
          <p className="text-sm" style={{ color: BRAND.gray500 }}>
            בדקו איך מודלי AI (GPT, Gemini) מכירים וממליצים על המותג שלכם — לכל קהל יעד
          </p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="max-w-4xl mx-auto w-full px-4 mt-4">
        <StepIndicator current={1} steps={["פרטים", "קהלים", "סריקה"]} />
      </div>

      {/* Sub-header */}
      <div className="max-w-4xl mx-auto w-full px-4 mt-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BRAND.gray600} strokeWidth="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87" />
              <path d="M16 3.13a4 4 0 010 7.75" />
            </svg>
            <span className="font-semibold">בחירת קהלי יעד</span>
          </div>
          <span className="flex items-center gap-1 text-sm cursor-pointer" style={{ color: BRAND.gray500 }}>
            <ArrowRight size={14} color={BRAND.gray500} />
            חזרה
          </span>
        </div>

        {/* Info box */}
        <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
          <h4 className="font-semibold text-sm mb-1" style={{ color: BRAND.teal }}>
            למה זה חשוב?
          </h4>
          <p className="text-xs" style={{ color: BRAND.gray500 }}>
            כל קהל יעד מחפש אחרת. הסריקה בודקת איך מנועי AI מציגים את המותג שלכם עבור סוגי משתמשים שונים. בחרו את הרלוונטיים לכם.
          </p>
        </div>

        {/* Counter */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs" style={{ color: BRAND.gray400 }}>
            ~ 35 שאילתות יבדקו
          </span>
          <span
            className="text-sm font-semibold px-3 py-1 rounded-full"
            style={{ background: "#F9F9F9", color: BRAND.tealDark }}
          >
            5 / 5 נבחר
          </span>
        </div>
      </div>

      {/* Persona Grid */}
      <div className="max-w-4xl mx-auto w-full px-4 flex-1 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_PERSONAS.map((persona, i) => (
            <PersonaCard key={persona.name} persona={persona} index={i} />
          ))}
        </div>

        {/* Start Scan Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onStartScan}
            className="flex items-center gap-3 px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "#000",
            }}
          >
            <span>התחלת סריקה</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs mt-4" style={{ color: BRAND.gray400 }}>
          5 קהלים | הסריקה אורכת כ-3-5 דקות ובודקת GPT + Gemini לכל קהל יעד
        </p>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════
// SCREEN 4: The Scan Process (THE BIG ONE)
// ════════════════════════════════════════════

type ScanPhase = "queries" | "chatgpt" | "gemini" | "analysis" | "complete";

const SCAN_PHASES: { id: ScanPhase; label: string; icon: string }[] = [
  { id: "queries", label: "שאילתות", icon: "Q" },
  { id: "chatgpt", label: "GPT", icon: "G" },
  { id: "gemini", label: "Gemini", icon: "Ge" },
  { id: "analysis", label: "ניתוח", icon: "A" },
];

const MOCK_QUERIES = [
  "מה הטיפול הכי טוב לילד עם הפרעת קשב?",
  "רכיבה טיפולית לילדים — יתרונות וחסרונות",
  "חוות סוסים מומלצות במרכז הארץ",
  "פעילויות חוץ לילדים עם ADHD",
  "טיפול באמצעות בעלי חיים — מה המדע אומר?",
  "חוגים לילדים עם קשיי ריכוז",
  "רכיבה על סוסים — מחירים ומיקומים",
  "תרפיה עם סוסים לנוער בסיכון",
  "יתרונות הרכיבה הטיפולית",
  "סוסים וטיפול רגשי — מדריך להורים",
];

// Audio Waveform visualization
function AudioWaveform({ active, color }: { active: boolean; color: string }) {
  return (
    <div className="flex items-center gap-0.5 h-8">
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className="w-1 rounded-full transition-all duration-150"
          style={{
            height: active ? `${12 + Math.sin(Date.now() / 200 + i * 0.5) * 12}px` : "4px",
            background: color,
            opacity: active ? 0.4 + Math.sin(Date.now() / 300 + i) * 0.3 : 0.15,
            animation: active ? `wave ${0.5 + (i % 5) * 0.1}s ease-in-out infinite ${i * 0.05}s` : "none",
          }}
        />
      ))}
    </div>
  );
}

// Neural Network Background
function NeuralBackground({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      <svg className="w-full h-full">
        {Array.from({ length: 15 }).map((_, i) => (
          <line
            key={i}
            x1={`${10 + (i * 6)}%`}
            y1={`${20 + Math.sin(i) * 30}%`}
            x2={`${30 + (i * 5)}%`}
            y2={`${50 + Math.cos(i) * 20}%`}
            stroke={BRAND.teal}
            strokeWidth="1"
            strokeDasharray="5 10"
            style={{
              animation: `neural-pulse ${2 + i * 0.3}s ease-in-out infinite ${i * 0.2}s`,
              strokeDashoffset: 1000,
            }}
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <circle
            key={`c${i}`}
            cx={`${15 + i * 10}%`}
            cy={`${30 + Math.sin(i * 2) * 25}%`}
            r="3"
            fill={BRAND.teal}
            opacity={0.3}
          >
            <animate attributeName="opacity" values="0.1;0.5;0.1" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
            <animate attributeName="r" values="2;5;2" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  );
}

// Live query display with typing effect
function QueryStream({ queries, currentIndex }: { queries: string[]; currentIndex: number }) {
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= queries.length) return;
    setDisplayText("");
    setCharIndex(0);
  }, [currentIndex, queries.length]);

  useEffect(() => {
    if (currentIndex >= queries.length) return;
    const current = queries[currentIndex];
    if (charIndex < current.length) {
      const timer = setTimeout(() => {
        setDisplayText(current.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 30 + Math.random() * 40);
      return () => clearTimeout(timer);
    }
  }, [charIndex, currentIndex, queries]);

  return (
    <div className="space-y-2 max-h-48 overflow-hidden">
      {/* Previously completed queries */}
      {queries.slice(Math.max(0, currentIndex - 3), currentIndex).map((q, i) => (
        <div
          key={i}
          className="flex items-center gap-2 text-sm py-1.5 px-3 rounded-lg transition-all"
          style={{
            background: BRAND.gray50,
            color: BRAND.gray400,
            opacity: 0.5 + (i * 0.15),
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={BRAND.teal} stroke="none">
            <path d="M20 6L9 17l-5-5" stroke={BRAND.teal} strokeWidth="3" fill="none" />
          </svg>
          <span dir="rtl">{q}</span>
        </div>
      ))}

      {/* Current typing query */}
      {currentIndex < queries.length && (
        <div
          className="flex items-center gap-2 text-sm py-2 px-3 rounded-lg border"
          style={{
            background: "white",
            borderColor: BRAND.teal,
            color: BRAND.black,
          }}
        >
          <div
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: BRAND.teal, animation: "ping-dot 1s ease-in-out infinite" }}
          />
          <span dir="rtl">
            {displayText}
            <span style={{ animation: "typing-cursor 0.8s infinite" }}>|</span>
          </span>
        </div>
      )}
    </div>
  );
}

// AI Engine Card with scanning animation
function AIEngineCard({
  name,
  icon,
  color,
  active,
  progress,
  currentQuery,
}: {
  name: string;
  icon: React.ReactNode;
  color: string;
  active: boolean;
  progress: number;
  currentQuery?: string;
}) {
  return (
    <div
      className="relative rounded-[10px] border-2 p-5 transition-all duration-500 overflow-hidden"
      style={{
        borderColor: active ? color : BRAND.gray200,
        background: active ? `${color}08` : "white",
        boxShadow: active ? `0 0 30px ${color}20` : "none",
        animation: active ? "glow-pulse 2s ease-in-out infinite" : "none",
      }}
    >
      <NeuralBackground active={active} />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
              style={{
                background: active ? color : BRAND.gray200,
                color: active ? "white" : BRAND.gray500,
                transition: "all 0.5s",
              }}
            >
              {icon}
            </div>
            <div>
              <h3 className="font-bold text-base">{name}</h3>
              <p className="text-xs" style={{ color: active ? color : BRAND.gray400 }}>
                {active ? "סורק..." : progress >= 100 ? <span className="flex items-center gap-1">הושלם <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg></span> : "ממתין"}
              </p>
            </div>
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-1.5">
            {active && (
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: color,
                      animation: `float-particle 1s ease-in-out infinite ${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            )}
            {progress >= 100 && (
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: color }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Waveform */}
        <AudioWaveform active={active} color={color} />

        {/* Progress */}
        <div className="mt-3">
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: `${color}20` }}>
            <div
              className="h-full rounded-full progress-shimmer transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${color}80, ${color})`,
              }}
            />
          </div>
        </div>

        {/* Current query being tested */}
        {active && currentQuery && (
          <div className="mt-3 text-xs py-2 px-3 rounded-lg" style={{ background: `${color}10`, color: BRAND.gray600 }} dir="rtl">
            <span style={{ color }}>שאילתה נוכחית: </span>
            {currentQuery}
          </div>
        )}
      </div>
    </div>
  );
}

function Screen4({ brandName }: { brandName: string }) {
  const [phase, setPhase] = useState<ScanPhase>("queries");
  const [overallProgress, setOverallProgress] = useState(0);
  const [queryIndex, setQueryIndex] = useState(0);
  const [gptProgress, setGptProgress] = useState(0);
  const [geminiProgress, setGeminiProgress] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentQueryForEngine, setCurrentQueryForEngine] = useState("");
  const [statusMessage, setStatusMessage] = useState("יוצר שאילתות מותאמות...");
  const phaseRef = useRef(phase);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Phase progression logic
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    if (phase === "queries") {
      setStatusMessage("יוצר שאילתות מותאמות...");
      timer = setInterval(() => {
        setQueryIndex((prev) => {
          if (prev >= MOCK_QUERIES.length - 1) {
            clearInterval(timer);
            setTimeout(() => setPhase("chatgpt"), 1000);
            return prev;
          }
          setOverallProgress(((prev + 1) / MOCK_QUERIES.length) * 25);
          return prev + 1;
        });
      }, 2500);
    }

    if (phase === "chatgpt") {
      setStatusMessage("סורק ב-ChatGPT...");
      timer = setInterval(() => {
        setGptProgress((prev) => {
          const next = Math.min(prev + 1 + Math.random() * 2, 100);
          setOverallProgress(25 + (next / 100) * 25);
          setCurrentQueryForEngine(MOCK_QUERIES[Math.floor((next / 100) * (MOCK_QUERIES.length - 1))]);
          if (next >= 100) {
            clearInterval(timer);
            setTimeout(() => setPhase("gemini"), 800);
          }
          return next;
        });
      }, 150);
    }

    if (phase === "gemini") {
      setStatusMessage("סורק ב-Gemini...");
      timer = setInterval(() => {
        setGeminiProgress((prev) => {
          const next = Math.min(prev + 1 + Math.random() * 2, 100);
          setOverallProgress(50 + (next / 100) * 25);
          setCurrentQueryForEngine(MOCK_QUERIES[Math.floor((next / 100) * (MOCK_QUERIES.length - 1))]);
          if (next >= 100) {
            clearInterval(timer);
            setTimeout(() => setPhase("analysis"), 800);
          }
          return next;
        });
      }, 150);
    }

    if (phase === "analysis") {
      setStatusMessage("מנתח תוצאות...");
      timer = setInterval(() => {
        setAnalysisProgress((prev) => {
          const next = Math.min(prev + 1 + Math.random() * 3, 100);
          setOverallProgress(75 + (next / 100) * 25);
          if (next >= 100) {
            clearInterval(timer);
            setTimeout(() => {
              setPhase("complete");
              setStatusMessage("הסריקה הושלמה!");
            }, 500);
          }
          return next;
        });
      }, 100);
    }

    return () => clearInterval(timer);
  }, [phase]);

  return (
    <div className="screen-enter min-h-screen flex flex-col bg-white" dir="rtl">
      {/* Top Bar */}
      <div
        className="py-6 px-4"
        style={{
          background: "#F9F9F9",
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-1" style={{ color: BRAND.black }}>
            בדיקת נוכחות ב-AI
          </h1>
          <p className="text-sm" style={{ color: BRAND.gray500 }}>
            בדקו איך מודלי AI (GPT, Gemini) מכירים וממליצים על המותג שלכם — לכל קהל יעד
          </p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="max-w-3xl mx-auto w-full px-4 mt-4">
        <StepIndicator current={2} steps={["פרטים", "קהלים", "סריקה"]} />
      </div>

      {/* Main Scan Area */}
      <div className="max-w-3xl mx-auto w-full px-4 flex-1 pb-12">
        {/* Scan Status Card */}
        <div className="bg-white rounded-[10px] border border-gray-200 p-8 relative overflow-hidden">
          {/* Animated corner accent */}
          {phase !== "complete" && (
            <div
              className="absolute top-0 right-0 w-32 h-32 opacity-10"
              style={{
                background: `radial-gradient(circle at top right, ${BRAND.teal}, transparent)`,
              }}
            />
          )}

          {/* Center animation */}
          <div className="flex flex-col items-center mb-8">
            {/* Spinning scan icon */}
            <div className="relative w-20 h-20 mb-4">
              {phase !== "complete" ? (
                <>
                  {/* Outer ring */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 80 80" style={{ animation: "spin-slow 4s linear infinite" }}>
                    <circle cx="40" cy="40" r="36" fill="none" stroke={BRAND.teal} strokeWidth="2" strokeDasharray="12 8" opacity={0.3} />
                  </svg>
                  {/* Inner ring */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 80 80" style={{ animation: "spin-reverse 3s linear infinite" }}>
                    <circle cx="40" cy="40" r="26" fill="none" stroke={BRAND.teal} strokeWidth="2.5" strokeDasharray="20 40" opacity={0.6} />
                  </svg>
                  {/* Center dot */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{
                        background: BRAND.teal,
                        animation: "ping-dot 2s ease-in-out infinite",
                      }}
                    />
                    <div
                      className="absolute w-3 h-3 rounded-full"
                      style={{ background: BRAND.teal }}
                    />
                  </div>
                </>
              ) : (
                /* Complete state — checkmark */
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center animate-fade-in-up"
                  style={{ background: "#000" }}
                >
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
              )}
            </div>

            {/* Status Text */}
            <h2 className="text-xl font-bold mb-1" style={{ color: BRAND.black }}>
              {statusMessage}
            </h2>
            <p className="text-sm" style={{ color: BRAND.gray500 }}>
              {Math.round(overallProgress)}% הושלם
            </p>

            {/* Main Progress Bar */}
            <div className="w-full max-w-sm mt-4">
              <div className="h-3 rounded-full overflow-hidden" style={{ background: BRAND.gray100 }}>
                <div
                  className="h-full rounded-full progress-shimmer transition-all duration-300"
                  style={{
                    width: `${overallProgress}%`,
                    background: "#10A37F",
                  }}
                />
              </div>
            </div>

            {/* Scanning for X audiences */}
            <p className="text-xs mt-3" style={{ color: BRAND.gray400 }}>
              סורק עבור 5 קהלי יעד
            </p>
          </div>

          {/* Phase Tabs */}
          <div className="flex items-center justify-center gap-1 mb-6 flex-wrap" dir="ltr">
            {[
              { id: "queries" as ScanPhase, label: "שאילתות" },
              { id: "chatgpt" as ScanPhase, label: "GPT" },
              { id: "gemini" as ScanPhase, label: "Gemini" },
              { id: "analysis" as ScanPhase, label: "ניתוח" },
            ].map((tab) => {
              const isActive = phase === tab.id;
              const isPast =
                (tab.id === "queries" && ["chatgpt", "gemini", "analysis", "complete"].includes(phase)) ||
                (tab.id === "chatgpt" && ["gemini", "analysis", "complete"].includes(phase)) ||
                (tab.id === "gemini" && ["analysis", "complete"].includes(phase)) ||
                (tab.id === "analysis" && phase === "complete");

              return (
                <div
                  key={tab.id}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                  style={{
                    background: isActive ? BRAND.teal : isPast ? BRAND.gray100 : "transparent",
                    color: isActive ? "white" : isPast ? BRAND.teal : BRAND.gray400,
                    border: `1.5px solid ${isActive ? BRAND.teal : isPast ? BRAND.gray200 : BRAND.gray200}`,
                  }}
                >
                  <span className="flex items-center gap-1">{isPast && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>}{tab.label}</span>
                </div>
              );
            })}

            {/* Additional inactive tabs for context */}
            {["קהלים", "אתר"].map((label) => (
              <div
                key={label}
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: "transparent",
                  color: BRAND.gray300,
                  border: `1.5px solid ${BRAND.gray200}`,
                }}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Phase-specific content */}
          <div className="min-h-[200px]">
            {/* QUERIES PHASE */}
            {phase === "queries" && (
              <div className="animate-fade-in-up">
                <h3 className="text-sm font-semibold mb-3" style={{ color: BRAND.gray600 }}>
                  שאילתות נוצרות ({queryIndex + 1}/{MOCK_QUERIES.length})
                </h3>
                <QueryStream queries={MOCK_QUERIES} currentIndex={queryIndex} />
              </div>
            )}

            {/* CHATGPT PHASE */}
            {phase === "chatgpt" && (
              <div className="animate-fade-in-up">
                <AIEngineCard
                  name="ChatGPT"
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 0011.11.584 6.047 6.047 0 004.626 3.6a5.985 5.985 0 00-3.998 2.9 6.046 6.046 0 00.743 7.097 5.98 5.98 0 00.51 4.911 6.051 6.051 0 006.515 2.9A5.985 5.985 0 0012.89 23.4a6.046 6.046 0 006.483-3.017 5.986 5.986 0 003.998-2.9 6.046 6.046 0 00-.743-7.097" />
                    </svg>
                  }
                  color="#10A37F"
                  active={true}
                  progress={gptProgress}
                  currentQuery={currentQueryForEngine}
                />
              </div>
            )}

            {/* GEMINI PHASE */}
            {phase === "gemini" && (
              <div className="animate-fade-in-up">
                <AIEngineCard
                  name="ChatGPT"
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 0011.11.584 6.047 6.047 0 004.626 3.6a5.985 5.985 0 00-3.998 2.9 6.046 6.046 0 00.743 7.097 5.98 5.98 0 00.51 4.911 6.051 6.051 0 006.515 2.9A5.985 5.985 0 0012.89 23.4a6.046 6.046 0 006.483-3.017 5.986 5.986 0 003.998-2.9 6.046 6.046 0 00-.743-7.097" />
                    </svg>
                  }
                  color="#10A37F"
                  active={false}
                  progress={100}
                  currentQuery={undefined}
                />
                <div className="mt-4">
                  <AIEngineCard
                    name="Gemini"
                    icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z"/></svg>}
                    color="#4285F4"
                    active={true}
                    progress={geminiProgress}
                    currentQuery={currentQueryForEngine}
                  />
                </div>
              </div>
            )}

            {/* ANALYSIS PHASE */}
            {phase === "analysis" && (
              <div className="animate-fade-in-up">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <AIEngineCard
                    name="ChatGPT"
                    icon={
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                        <path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 0011.11.584 6.047 6.047 0 004.626 3.6a5.985 5.985 0 00-3.998 2.9 6.046 6.046 0 00.743 7.097 5.98 5.98 0 00.51 4.911 6.051 6.051 0 006.515 2.9A5.985 5.985 0 0012.89 23.4a6.046 6.046 0 006.483-3.017 5.986 5.986 0 003.998-2.9 6.046 6.046 0 00-.743-7.097" />
                      </svg>
                    }
                    color="#10A37F"
                    active={false}
                    progress={100}
                    currentQuery={undefined}
                  />
                  <AIEngineCard
                    name="Gemini"
                    icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z"/></svg>}
                    color="#4285F4"
                    active={false}
                    progress={100}
                    currentQuery={undefined}
                  />
                </div>

                {/* Analysis specific content */}
                <div
                  className="rounded-xl p-5 border"
                  style={{
                    borderColor: BRAND.teal,
                    background: `${BRAND.teal}08`,
                    animation: "glow-pulse 2s ease-in-out infinite",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: BRAND.teal }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="0">
                        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0022 16z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">מנתח תוצאות</h4>
                      <p className="text-xs" style={{ color: BRAND.gray500 }}>
                        משווה בין מודלים ומחשב ציוני נוכחות
                      </p>
                    </div>
                  </div>

                  {/* Analysis items appearing one by one */}
                  <div className="space-y-2">
                    {[
                      { label: "סיווג אזכורים", done: analysisProgress > 20 },
                      { label: "ניתוח סנטימנט", done: analysisProgress > 40 },
                      { label: "השוואת מודלים", done: analysisProgress > 60 },
                      { label: "חישוב ציון נוכחות", done: analysisProgress > 80 },
                      { label: "הפקת תובנות", done: analysisProgress >= 100 },
                    ].map((item, i) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-2 text-sm"
                        style={{
                          opacity: analysisProgress > i * 20 ? 1 : 0.3,
                          transition: "opacity 0.5s",
                        }}
                      >
                        {item.done ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BRAND.teal} strokeWidth="2.5">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        ) : (
                          <div
                            className="w-4 h-4 rounded-full border-2"
                            style={{
                              borderColor: BRAND.teal,
                              borderTopColor: "transparent",
                              animation: "spin-slow 1s linear infinite",
                            }}
                          />
                        )}
                        <span style={{ color: item.done ? BRAND.gray700 : BRAND.gray400 }}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* COMPLETE */}
            {phase === "complete" && (
              <div className="animate-fade-in-up text-center py-8">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: `${BRAND.teal}15` }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={BRAND.teal} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                      <path d="M22 4L12 14.01l-3-3" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: BRAND.black }}>
                  הסריקה הושלמה!
                </h3>
                <p className="mb-6" style={{ color: BRAND.gray500 }}>
                  נסרקו 10 שאילתות על פני 5 קהלי יעד ב-ChatGPT וב-Gemini
                </p>
                <button
                  className="px-8 py-3 rounded-xl text-white font-semibold transition-all hover:scale-[1.02]"
                  style={{ background: "#000" }}
                >
                  <span className="flex items-center justify-center gap-2">צפייה בתוצאות <ArrowLeft size={16} color="white" /></span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-4 text-center border-t border-gray-100">
        <p className="text-xs" style={{ color: BRAND.gray400 }}>
          הסריקה אורכת כ-3-5 דקות ובודקת GPT + Gemini לכל קהל יעד
        </p>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════
// MAIN APP — Screen Router
// ════════════════════════════════════════════
export default function Home() {
  const [screen, setScreen] = useState<1 | 2 | 3 | 4>(1);
  const [domain, setDomain] = useState("example.com");
  const [brandName, setBrandName] = useState("המותג שלי");

  const handleScreen1Submit = useCallback((d: string, b: string) => {
    setDomain(d);
    setBrandName(b);
    setScreen(2);
  }, []);

  const handleScreen2Complete = useCallback(() => {
    setScreen(3);
  }, []);

  const handleStartScan = useCallback(() => {
    setScreen(4);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Dev Navigation — for Inna to switch between screens */}
      <div className="fixed bottom-4 left-4 z-50 flex gap-2" dir="ltr">
        {[1, 2, 3, 4].map((s) => (
          <button
            key={s}
            onClick={() => setScreen(s as 1 | 2 | 3 | 4)}
            className="w-10 h-10 rounded-full text-sm font-bold transition-all hover:scale-110"
            style={{
              background: screen === s ? BRAND.teal : "white",
              color: screen === s ? "white" : BRAND.gray600,
              border: `2px solid ${screen === s ? BRAND.teal : BRAND.gray300}`,
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {screen === 1 && <Screen1 onSubmit={handleScreen1Submit} />}
      {screen === 2 && <Screen2 domain={domain} brandName={brandName} onComplete={handleScreen2Complete} />}
      {screen === 3 && <Screen3 onStartScan={handleStartScan} />}
      {screen === 4 && <Screen4 brandName={brandName} />}
    </main>
  );
}
