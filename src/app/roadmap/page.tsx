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
  ref: string;
}

interface Phase {
  id: number;
  title: string;
  features: Feature[];
  color: string;
}

// ── SEO Multi-Query Prompt (for copy) ──
const multiQueryPrompt = `## Multi-Query Architecture (NON-NEGOTIABLE)

Every article must target ONE umbrella keyword AND capture 5-10 related sub-queries within it. Each H2 section should independently answer a distinct search intent that people search for.

### How It Works
1. Before writing: For the given primary keyword, identify 5-10 related sub-queries that users also search. These become your H2 sections.
2. Each H2 = a standalone answer: Every section must be self-contained enough that Google could extract it as a featured snippet or PAA answer for its sub-query.
3. FAQ captures remaining long-tail: The FAQ section at the end targets 3-5 additional queries that didn't fit as H2 sections.

### Sub-Query Mapping Table
Before writing, create this mapping (do NOT include it in the output - this is your internal planning):
| Section (H2) | Sub-Query It Answers | Search Intent Type |
|---|---|---|
| H2 #1 | [related query] | informational / commercial / navigational |
| H2 #2 | [related query] | ... |
| FAQ Q1 | [long-tail query] | ... |

### Rules
- The primary keyword is the umbrella. Sub-queries are naturally related - never force unrelated topics.
- Each H2 section title should reflect its sub-query naturally (not verbatim keyword-stuffed).
- At least 3 of the sub-queries should be different intent types (informational, commercial, comparison, how-to, etc.).
- The article flows as one cohesive piece - readers should NOT feel like they're reading separate articles glued together.
- Include the primary keyword in the opening paragraph AND weave it through at least 2 H2 headings, but the sub-query keywords dominate their respective sections.
- Think of it like an umbrella page: one URL captures traffic from 8-15 different search queries.

### Example
Primary keyword: "רכיבה טיפולית"
| H2 Section | Sub-Query |
|---|---|
| מה זה רכיבה טיפולית ולמי היא מתאימה | "מה זה רכיבה טיפולית" |
| היתרונות שהמחקר כבר הוכיח | "יתרונות רכיבה טיפולית" |
| רכיבה טיפולית לילדים עם ADHD | "רכיבה טיפולית ADHD" |
| ההבדל בין רכיבה ספורטיבית לטיפולית | "הבדל רכיבה ספורטיבית טיפולית" |
| איך בוחרים חוות סוסים לטיפול | "איך לבחור חוות סוסים" |
| FAQ: כמה עולה / מגיל כמה / כמה זמן לוקח | long-tail queries |`;

// ── Data ──
// Sorted by criticality — NO dates, just priority order
// ref field = where the implementation reference exists
const phases: Phase[] = [
  {
    id: 1,
    title: "קריטי - חובה עכשיו",
    color: "#DC2626",
    features: [
      { name: "מנוע כתיבת תוכן Multi-Query", description: "כל מאמר שהמערכת מייצרת חייב לכלול מספר שאילתות משנה תחת שאילתה ראשית אחת. כל H2/H3 עונה על שאילתה עצמאית, FAQ תופס long-tail נוספים", ref: "ראו פרומפט מלא למטה בעמוד | דוגמה חיה: adsgpt.io/blog/social-media-marketing-strategy", priority: "P0", status: "not_started" },
      { name: "גרף זמן ראשי (Time-Series Chart)", description: "גרף time-series גדול בראש דף סקירה: שיעור אזכור GPT+Gemini לאורך זמן, עם כפתורי סינון 7/30/90 ימים", ref: "דמו: /scan → בלוק 'מגמת אזכור' | פרודקשן: חסר לגמרי בדף סקירה", priority: "P0", status: "not_started" },
      { name: "אינדיקטור שינוי (+/-) על שיעור אזכור", description: "חץ ירוק/אדום + מספר שינוי ליד אחוז האזכור בהשוואה לסריקה קודמת", ref: "דמו: /scan → כרטיסי מדדים עליונים (↑2.3%) | פרודקשן: מציג מספר בלבד ללא השוואה", priority: "P0", status: "not_started" },
      { name: "אינדיקטור שינוי (+/-) על מיקום ממוצע", description: "חץ ירוק/אדום + מספר שינוי ליד מיקום ממוצע בהשוואה לסריקה קודמת", ref: "דמו: /scan → כרטיס 'מיקום ממוצע' | פרודקשן: מציג מספר בלבד", priority: "P0", status: "not_started" },
      { name: "אינדיקטור שינוי (+/-) על איכות ציטוט", description: "חץ ירוק/אדום + מספר שינוי ליד ציון איכות הציטוט בהשוואה לסריקה קודמת", ref: "דמו: /scan → כרטיס 'איכות ציטוט' | פרודקשן: מציג מספר בלבד", priority: "P0", status: "not_started" },
      { name: "AI Strategy Box - המלצות אסטרטגיות", description: "בלוק צהוב/בולט בדף סקירה עם 3-5 המלצות מבוססות נתוני סריקה: מה לעשות כדי להשתפר", ref: "דמו: /scan → בלוק 'אסטרטגיית AI מומלצת' (צהוב) | פרודקשן: לא קיים", priority: "P0", status: "not_started" },
      { name: "What Worked - מה עבד (בלוק ירוק)", description: "קופסה ירוקה עם bullet points: אזכורים חיוביים, ציטוטים, שאילתות שהמותג מופיע בהן", ref: "דמו: /scan → בלוק ירוק 'מה עובד' | פרודקשן: לא קיים", priority: "P0", status: "not_started" },
      { name: "What's Missing - מה חסר (בלוק אדום)", description: "קופסה אדומה עם bullet points: שאילתות ללא אזכור, אזורים חלשים, הזדמנויות שהוחמצו", ref: "דמו: /scan → בלוק אדום 'מה חסר' | פרודקשן: לא קיים", priority: "P0", status: "not_started" },
      { name: "AI Summary - סיכום ChatGPT", description: "בלוק עם סיכום טקסטואלי של מה ChatGPT אומר על המותג בתשובות AI", ref: "דמו: /scan → בלוק 'ChatGPT אומר' עם לוגו | פרודקשן: לא קיים", priority: "P0", status: "not_started" },
      { name: "AI Summary - סיכום Gemini", description: "בלוק עם סיכום טקסטואלי של מה Gemini אומר על המותג בתשובות AI", ref: "דמו: /scan → בלוק 'Gemini אומר' עם לוגו | פרודקשן: לא קיים", priority: "P0", status: "not_started" },
      { name: "טבלת קשר SEO-GEO", description: "טבלה שמקשרת keywords מסורתיים לשאילתות AI: keyword, נפח חיפוש, קושי, שאילתות קשורות עם toggle SEO/GEO", ref: "דמו: /scan → טאב 'SEO-GEO קשרים' | פרודקשן: לא קיים", priority: "P0", status: "not_started" },
      { name: "לוגו מותג במקום עיגול אחוז", description: "במסך סריקות/דשבורד - להחליף את העיגול עם ה-% שליד שם המותג בלוגו המותג (favicon/logo מהדומיין)", ref: "פרודקשן: scale.geoscale.ai → דשבורד + רשימת סריקות - העיגול עם % ליד שם המותג", priority: "P0", status: "not_started" },
      { name: "Tooltips על כל מדד", description: "אייקון מידע (i) ליד כל מספר ומדד עם popup שמסביר מה המדד אומר ואיך הוא מחושב", ref: "דמו: /scan → כל כרטיס מדד יש (i) עם hover | פרודקשן: אין tooltips כלל", priority: "P0", status: "not_started" },
    ],
  },
  {
    id: 2,
    title: "חשוב - משפיע על חוויה ומכירה",
    color: "#E07800",
    features: [
      { name: "ניתוח מתחרים - גרף בר אופקי", description: "גרף בר אופקי של 4-5 מתחרים עם אחוז אזכור, שם ודומיין ליד כל אחד", ref: "דמו: /scan → בלוק 'ניתוח מתחרים' עם בר צבעוני | פרודקשן: אין השוואה למתחרים כלל", priority: "P0", status: "not_started" },
      { name: "Donut Chart - סנטימנט", description: "גרף donut שמציג חלוקת סנטימנט: חיובי (ירוק), ניטרלי (אפור), שלילי (אדום)", ref: "דמו: /scan → donut בבלוק 'סנטימנט' | פרודקשן: בר פשוט בלבד", priority: "P1", status: "not_started" },
      { name: "Donut Chart - איכות ציטוט", description: "גרף donut שמציג חלוקת איכות ציטוט: גבוה, בינוני, נמוך", ref: "דמו: /scan → donut בבלוק 'איכות ציטוט' | פרודקשן: בר פשוט בלבד", priority: "P1", status: "not_started" },
      { name: "תגיות מוצר/שירות בטאב מוצרים", description: "בטאב מוצרים: badge מוצר/שירות על כל פריט שזוהה", ref: "פרודקשן: /scan → טאב 'מוצרים/שירותים' → כרגע 'טרם זוהו מוצרים'", priority: "P1", status: "not_started" },
      { name: "תגיות B2C/B2B בטאב מוצרים", description: "בטאב מוצרים: badge B2C או B2B על כל פריט לפי סוג הקהל", ref: "פרודקשן: /scan → טאב 'מוצרים/שירותים'", priority: "P1", status: "not_started" },
      { name: "משיכת לוגו מותג אוטומטית", description: "שליפת favicon/logo מהדומיין של המותג אוטומטית בסריקה", ref: "חדש - אין בדמו ולא בפרודקשן | Google Favicon API: google.com/s2/favicons?domain=X", priority: "P1", status: "not_started" },
      { name: "משיכת תמונות מוצר אוטומטית", description: "שליפת תמונות מוצר מאתר המותג אוטומטית דרך scraping/OG tags", ref: "חדש - אין בדמו ולא בפרודקשן | og:image meta tag מהאתר", priority: "P1", status: "not_started" },
      { name: "Hover Effects על כפתורים וכרטיסים", description: "כל כפתור וכרטיס צריך להגיב ל-hover עם שינוי צבע/shadow חלק", ref: "דמו: קיים על רוב האלמנטים | פרודקשן: מרגיש סטטי - חסר על רוב הכפתורים", priority: "P1", status: "not_started" },
      { name: "Hover Effects על שורות טבלה", description: "כל שורה בטבלאות (שאילתות, קהלים) צריכה להגיב ל-hover עם highlight רקע", ref: "דמו: שורות מגיבות ל-hover | פרודקשן: טבלאות סטטיות", priority: "P1", status: "not_started" },
      { name: "עורך תוכן (Content Editor) - WYSIWYG", description: "ממשק WYSIWYG לעריכת מאמרים שהמערכת מייצרת, עם תצוגה מקדימה", ref: "דמו: /editor → עורך מלא | פרודקשן: /scan → טאב 'תוכן' → רק 'צור רעיונות תוכן'", priority: "P1", status: "not_started" },
      { name: "פרסום ישיר מהעורך", description: "כפתור 'פרסם' בעורך התוכן ששולח ישירות לאתר היעד (WordPress API / custom)", ref: "חדש - אין בדמו ולא בפרודקשן", priority: "P1", status: "not_started" },
      { name: "סינון לפי 7 ימים", description: "כפתור סינון 7 ימים על כל הנתונים והגרפים", ref: "דמו: /scan → כפתורי 7/30/90 בגרף מגמות | פרודקשן: אין סינון זמן", priority: "P1", status: "not_started" },
      { name: "סינון לפי 30 ימים", description: "כפתור סינון 30 ימים על כל הנתונים והגרפים", ref: "דמו: /scan → כפתורי 7/30/90 | פרודקשן: אין סינון זמן", priority: "P1", status: "not_started" },
      { name: "סינון לפי 90 ימים", description: "כפתור סינון 90 ימים על כל הנתונים והגרפים", ref: "דמו: /scan → כפתורי 7/30/90 | פרודקשן: אין סינון זמן", priority: "P1", status: "not_started" },
      { name: "סינון לפי טווח מותאם אישית", description: "Date picker עם from/to לסינון נתונים בטווח חופשי", ref: "חדש - אין בדמו ולא בפרודקשן", priority: "P1", status: "not_started" },
      { name: "התראות מוניטין - צביעה אדומה", description: "צביעה אדומה אוטומטית על שורות בטבלאות כשיש חוסר אזכור או ירידה חדה", ref: "פרודקשן: טבלת שאילתות → שורות עם 'חסר' לא מודגשות כלל", priority: "P1", status: "not_started" },
      { name: "התראות מוניטין - אתרים פסולים", description: "צביעה אדומה על אתרים שנפסלו או בעלי מוניטין נמוך", ref: "חדש - רלוונטי לטאב ScalePublish", priority: "P1", status: "not_started" },
      { name: "Dashboard SEO+GEO משולב", description: "מסך dashboard אחיד עם toggle: שאילתות AI ↔ keywords מסורתיים, מיקומים, נפח חיפוש", ref: "פרודקשן: /dashboard → מציג רק GEO | דמו: /scan → יש toggle SEO/GEO", priority: "P1", status: "not_started" },
      { name: "הצעת מחיר - אופציית SEO בלבד", description: "אופציית pricing עבור SEO בלבד: keywords, content, backlinks", ref: "חדש - אין בדמו ולא בפרודקשן", priority: "P1", status: "not_started" },
      { name: "הצעת מחיר - אופציית GEO בלבד", description: "אופציית pricing עבור GEO בלבד: AI optimization, brand mentions, citations", ref: "חדש - אין בדמו ולא בפרודקשן", priority: "P1", status: "not_started" },
      { name: "הצעת מחיר - חבילה משולבת", description: "חבילת SEO+GEO משולבת עם הנחת 15%, השוואה ויזואלית לאופציות הנפרדות", ref: "חדש - אין בדמו ולא בפרודקשן", priority: "P1", status: "not_started" },
      { name: "הרחבה ל-10 פרסונות לכל מותג", description: "הרחבת מערכת הפרסונות מ-5 ל-10 פרסונות עם שאילתות ייחודיות לכל אחת", ref: "פרודקשן: /scan → טאב 'קהלים' → כרגע 5 פרסונות | דמו: 5 פרסונות", priority: "P1", status: "not_started" },
      { name: "שאילתות per-site בסל ScalePublish", description: "בסל הקניות: לכל אתר שנבחר, הצגת השאילתות הרלוונטיות שהתוכן צריך לטרגט", ref: "דמו: /scale-publish → סל קניות עם אתרים | פרודקשן: אין ScalePublish", priority: "P1", status: "not_started" },
    ],
  },
  {
    id: 3,
    title: "שיפור - מוסיף ערך משמעותי",
    color: "#10A37F",
    features: [
      { name: "סריקת Bing Chat / Copilot", description: "הוספת Bing Chat/Copilot כמנוע AI נוסף לסריקה", ref: "חדש - כרגע רק GPT + Gemini", priority: "P1", status: "not_started" },
      { name: "סריקת Perplexity", description: "הוספת Perplexity כמנוע AI נוסף לסריקה", ref: "חדש - לוגו כבר קיים: /public/logos/perplexity.svg", priority: "P1", status: "not_started" },
      { name: "סריקת Claude", description: "הוספת Claude כמנוע AI נוסף לסריקה", ref: "חדש - דורש Anthropic API access", priority: "P1", status: "not_started" },
      { name: "SEO Dashboard - דירוגי keywords", description: "דשבורד SEO עצמאי: טבלת keywords עם position, volume, difficulty", ref: "חדש - נפרד מ-GEO | חיבור ל-GSC API / Ahrefs API", priority: "P1", status: "not_started" },
      { name: "SEO Dashboard - traffic אורגני", description: "גרף traffic אורגני לאורך זמן, מחובר ל-Google Search Console", ref: "חדש - חיבור ל-GSC API", priority: "P1", status: "not_started" },
      { name: "הצעת מחיר אוטומטית - PDF", description: "יצירת PDF מתוכנית העבודה: 3 רמות (אגרסיבי/בינוני/שמרני), פירוט מחירים", ref: "פרודקשן: /scan → טאב 'תוכנית עבודה' → יש תוכנית אבל אין ייצוא PDF", priority: "P1", status: "not_started" },
      { name: "שליחת הצעת מחיר ללקוח", description: "כפתור 'שלח ללקוח' שמייל את ה-PDF ללקוח ישירות מהמערכת", ref: "חדש - מעל ייצוא PDF", priority: "P1", status: "not_started" },
      { name: "מנגנון המלצת כתבות", description: "המלצה אוטומטית על כמות כתבות שבועיות/חודשיות לפי budget ויעדים", ref: "חדש - מבוסס נתוני סריקה + תוכנית עבודה", priority: "P1", status: "not_started" },
      { name: "ScalePublish - רשימת publishers", description: "טבלת publishers עם דירוג, קטגוריה, מחיר, DR, סטטוס", ref: "דמו: /scale-publish → טבלה עם publishers | פרודקשן: לא קיים", priority: "P1", status: "not_started" },
      { name: "ScalePublish - סל קניות", description: "סל קניות לבחירת אתרים לפרסום עם סיכום מחיר וכמות", ref: "דמו: /scale-publish → סל קניות | פרודקשן: לא קיים", priority: "P1", status: "not_started" },
      { name: "ScalePublish - דירוגים וביקורות", description: "מערכת דירוג כוכבים וביקורות על publishers מ-agencies", ref: "דמו: /scale-publish → כוכבים ליד כל publisher | פרודקשן: לא קיים", priority: "P1", status: "not_started" },
      { name: "דירוג SEO אוטומטי ל-publishers", description: "בדיקת publishers מול DataForSEO/Ahrefs: DR, keywords, organic traffic, Google index", ref: "חדש - API: DataForSEO domain_metrics + Ahrefs domain_rating", priority: "P1", status: "not_started" },
      { name: "דירוג GEO אוטומטי ל-publishers", description: "בדיקת הופעה של publishers ב-ChatGPT, Gemini, Bing Chat בשאילתות רלוונטיות", ref: "חדש - שימוש ב-Geoscale scanning engine על דומיין ה-publisher", priority: "P1", status: "not_started" },
      { name: "קטגוריזציה אוטומטית של publishers", description: "AI-based categorization של אתרי publishers לפי נושא + אפשרות עריכה ידנית", ref: "חדש - LLM classification על meta/content של ה-publisher", priority: "P1", status: "not_started" },
      { name: "פרסום חיצוני - בחירת אתר יעד", description: "בטאב תוכן: בחירת אתר publisher יעד לפרסום המאמר", ref: "פרודקשן: /scan → טאב 'תוכן' → כרגע רק 'צור רעיונות' | צריך workflow מלא", priority: "P1", status: "not_started" },
      { name: "פרסום חיצוני - העלאת תוכן", description: "workflow העלאת מאמר לאתר publisher: API/email/manual", ref: "חדש - מעל בחירת אתר יעד", priority: "P1", status: "not_started" },
      { name: "פרסום חיצוני - מעקב סטטוס", description: "מעקב סטטוס פרסום: ממתין, פורסם, נדחה - עם timestamps", ref: "חדש - טבלת סטטוסים", priority: "P1", status: "not_started" },
      { name: "ייצוא סקירה כ-PDF", description: "כפתור ייצוא דף סקירה כ-PDF מעוצב", ref: "פרודקשן: /scan → טאב 'סקירה' → אין כפתור ייצוא", priority: "P1", status: "not_started" },
      { name: "ייצוא שאילתות כ-CSV", description: "כפתור ייצוא טבלת שאילתות כ-CSV", ref: "פרודקשן: /scan → טאב 'שאילתות' → אין כפתור ייצוא", priority: "P1", status: "not_started" },
      { name: "ייצוא קהלים כ-CSV", description: "כפתור ייצוא טבלת קהלים/פרסונות כ-CSV", ref: "פרודקשן: /scan → טאב 'קהלים' → אין כפתור ייצוא", priority: "P1", status: "not_started" },
      { name: "שיתוף דוח עם לקוח - הזמנה", description: "ממשק הזמנת לקוח לצפייה בדוחות שלו: הכנסת אימייל, שליחת לינק", ref: "חדש - דורש מערכת הרשאות", priority: "P1", status: "not_started" },
      { name: "שיתוף דוח עם לקוח - White Label", description: "תצוגת read-only ללקוח עם לוגו הסוכנות ו-branding מותאם", ref: "חדש - דורש theming + branding settings", priority: "P1", status: "not_started" },
      { name: "התראות אימייל על שינויים", description: "שליחת אימייל אוטומטית כשיש ירידה באזכורים, מתחרה חדש, או אזכור שלילי", ref: "חדש - דורש email service (SendGrid/Resend) + trigger logic", priority: "P1", status: "not_started" },
      { name: "התראות SMS על שינויים", description: "שליחת SMS אוטומטי על שינויים קריטיים (ירידה חדה, אזכור שלילי)", ref: "חדש - דורש SMS service (Twilio) + trigger logic", priority: "P1", status: "not_started" },
    ],
  },
  {
    id: 4,
    title: "תשתית - נדרש לשלבים הבאים",
    color: "#4285F4",
    features: [
      { name: "DB Schema - טבלת Publishers", description: "סכמת DB: domain, DR, metrics, category, pricing, status, created_at, updated_at", ref: "חדש - prerequisite ל-ScalePublish | Supabase/Postgres", priority: "P0", status: "not_started" },
      { name: "DB Schema - טבלת Work Plans", description: "סכמת DB: brand_id, duration, speed, articles_count, budget, status", ref: "פרודקשן: /scan → טאב 'תוכנית עבודה' → יש UI אבל צריך DB schema", priority: "P0", status: "not_started" },
      { name: "API - CRUD Publishers", description: "REST endpoints: GET/POST/PUT/DELETE /api/publishers - תשתית ל-ScalePublish", ref: "חדש - Next.js API routes | prerequisite ל-ScalePublish UI", priority: "P0", status: "not_started" },
      { name: "ממשק הכנסת publishers", description: "Dashboard admin: הכנסת אתרים ידנית + העלאת Excel, ניהול מחירים", ref: "חדש - admin panel | prerequisite ל-ScalePublish", priority: "P0", status: "not_started" },
      { name: "פורטל Publishers עצמאי", description: "ממשק נפרד ל-publishers: הוספת אתרים, dashboard הכנסות, agencies שראו/קנו", ref: "חדש - דורש אפיון UX נפרד + auth system", priority: "P1", status: "not_started" },
    ],
  },
  {
    id: 5,
    title: "עתידי - Nice to Have",
    color: "#727272",
    features: [
      { name: "לוגו Geoscale - התאמה לאתר", description: "עדכון הלוגו בכל המסכים שיתאים בדיוק ללוגו באתר geoscale.ai", ref: "אתר: geoscale.ai → לוגו header | פרודקשן: scale.geoscale.ai → לוגו שונה", priority: "P2", status: "not_started" },
      { name: "מאגר אתרים פסולים", description: "שמירת אתרים שנפסלו + סיבות פסילה + אפשרות re-check עתידי", ref: "חדש - מעל מערכת ScalePublish", priority: "P2", status: "not_started" },
      { name: "תקנון publishers - תנאי שימוש", description: "חוזה publishers עם תנאי שימוש ואיסור שינוי מחירים", ref: "חדש - דורש ייעוץ משפטי", priority: "P2", status: "not_started" },
      { name: "תקנון publishers - חתימה דיגיטלית", description: "מנגנון חתימה דיגיטלית על התקנון בתוך פורטל Publishers", ref: "חדש - DocuSign API / custom", priority: "P2", status: "not_started" },
      { name: "Agency Markup - אחוזי רווח", description: "ממשק ניהול אחוזי רווח 15-20% על מחירי publishers", ref: "חדש - settings UI | מעל ScalePublish pricing", priority: "P2", status: "not_started" },
      { name: "Agency Markup - עריכה ידנית", description: "אפשרות לערוך מחיר סופי ידנית per-publisher עם rounding", ref: "חדש - מעל Agency Markup", priority: "P2", status: "not_started" },
      { name: "Analytics ל-Publishers", description: "Dashboard publishers מורחב: agencies שראו/קנו, הכנסות, סטטיסטיקות מפורטות", ref: "חדש - מעל פורטל Publishers", priority: "P2", status: "not_started" },
      { name: "Mobile Responsive - דשבורד", description: "התאמת מסך דשבורד למובייל וטאבלט", ref: "פרודקשן: scale.geoscale.ai/dashboard → לא responsive", priority: "P2", status: "not_started" },
      { name: "Mobile Responsive - סריקות", description: "התאמת מסך סריקות וטבלאות שאילתות למובייל", ref: "פרודקשן: scale.geoscale.ai/scan → טבלאות לא responsive", priority: "P2", status: "not_started" },
      { name: "Mobile Responsive - גרפים", description: "התאמת כל הגרפים (time-series, donut, bar) למובייל", ref: "חדש - מעל הגרפים שייבנו", priority: "P2", status: "not_started" },
      { name: "Multi-Language - toggle עברית/English", description: "כפתור toggle שפה בממשק עם תרגום מלא של כל הטקסטים", ref: "כרגע: דמו נפרד לכל שפה (demo-geoscale / demo-geoscale-en)", priority: "P2", status: "not_started" },
      { name: "Multi-Language - דוחות מתורגמים", description: "ייצוא דוחות בשפה שהלקוח בחר (עברית/אנגלית)", ref: "חדש - מעל ייצוא PDF/CSV", priority: "P2", status: "not_started" },
      { name: "דשבורד שימוש API", description: "מעקב אחר credits, קריאות API, rate limiting עם גרפים", ref: "פרודקשן: לינק 'שימוש API' בפוטר → מוביל לעמוד ריק", priority: "P2", status: "not_started" },
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
              gridTemplateColumns: "2fr 2.5fr 2.5fr 0.8fr 0.8fr",
              gap: 12,
              padding: "10px 24px 10px 24px",
              background: "#FAFAFA",
              direction: "rtl",
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 600, color: "#727272", textTransform: "uppercase" }}>פיצ&apos;ר</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#727272", textTransform: "uppercase" }}>תיאור</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#727272", textTransform: "uppercase" }}>איפה קיים / מה ליישם</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#727272", textTransform: "uppercase" }}>עדיפות</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#727272", textTransform: "uppercase" }}>סטטוס</span>
          </div>

          {/* Feature rows */}
          {phase.features.map((feature, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 2.5fr 2.5fr 0.8fr 0.8fr",
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
              <span style={{ fontSize: 11, color: "#4285F4", lineHeight: 1.5, fontFamily: "monospace", background: "#4285F408", padding: "2px 6px", borderRadius: 4 }}>{feature.ref}</span>
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
            { label: "פיצ'רים", value: "78", accent: false },
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

        {/* Multi-Query SEO Prompt — Copy Section */}
        <div style={{ border: "2px solid #E07800", borderRadius: 10, background: "#FFFBF0", padding: 24, direction: "rtl", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 20 }}>📋</span>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#000", margin: 0 }}>פרומפט Multi-Query לכתיבת תוכן — להעתקה לפרודקשן</h3>
          </div>
          <p style={{ fontSize: 12, color: "#555", marginBottom: 12, lineHeight: 1.6 }}>
            זהו הפרומפט שצריך להוסיף למנוע כתיבת התוכן של Geoscale. הרעיון: כל מאמר שהמערכת מייצרת לא מטרגט רק שאילתה אחת - אלא שאילתה ראשית + 5-10 שאילתות משנה. כל H2 עונה על שאילתה נפרדת שאנשים מחפשים, וה-FAQ תופס long-tail נוספים. ככה URL אחד תופס תנועה מ-8-15 שאילתות שונות.
          </p>
          <p style={{ fontSize: 12, color: "#555", marginBottom: 16, lineHeight: 1.6 }}>
            <strong>דוגמה חיה:</strong> ראו איך adsgpt.io בונה את המאמרים שלהם — <span style={{ color: "#4285F4" }}>adsgpt.io/blog/social-media-marketing-strategy</span> — כל section עונה על שאילתה עצמאית, והמאמר כולו מדורג על עשרות שאילתות קשורות.
          </p>
          <div style={{ background: "#1a1a2e", borderRadius: 8, padding: 20, overflow: "auto", maxHeight: 500 }}>
            <pre style={{ fontSize: 11, color: "#e0e0e0", lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap", fontFamily: "'Courier New', monospace", direction: "ltr", textAlign: "left" }}>
              {multiQueryPrompt}
            </pre>
          </div>
          <p style={{ fontSize: 11, color: "#727272", marginTop: 12 }}>
            * העתיקו את הפרומפט הזה והוסיפו אותו ל-system prompt של מנוע כתיבת התוכן, אחרי ההגדרות הבסיסיות (אורך מאמר, סגנון כתיבה) ולפני הוראות הפורמט.
          </p>
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
