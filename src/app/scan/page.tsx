"use client";

import { useState } from "react";

// ============================================================
// GEOSCALE SCAN ANALYSIS — Full Brand Scan Results Page
// Brand: All4Horses | all4horses.co.il | Score: 76%
// Tabs: סקירה (Overview) | שאילתות (Queries) | קהלים (Audiences)
// ============================================================

const C = {
  teal: "#0D9488",
  tealLight: "#14B8A6",
  tealDark: "#0F766E",
  black: "#111111",
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2937",
  green: "#22C55E",
  greenBg: "#ECFDF5",
  greenText: "#059669",
  red: "#EF4444",
  redBg: "#FEF2F2",
  redText: "#DC2626",
  amber: "#F59E0B",
  amberBg: "#FEF3C7",
  amberText: "#D97706",
};

// ── PERSONAS ──
const PERSONAS = [
  {
    id: "maya",
    name: "מאיה",
    role: "אם לילד עם ADHD",
    fullTitle: "אם לילד בן 8 עם הפרעות קשב וריכוז",
    description: "מחפשת טיפול משלים לילד שלה דרך רכיבה טיפולית. מעוניינת בהוכחות מדעיות ובמלצות מהורים אחרים.",
    tags: ["גיל 35-45", "מרכז הארץ", "אם", "חינוך מיוחד"],
    score: 82,
    queries: 9,
    mentions: 7,
    color: "#8B5CF6",
  },
  {
    id: "yossi",
    name: "יוסי",
    role: "מתבגר חובב סוסים",
    fullTitle: "בן 16, חובב סוסים ומתעניין ברכיבה",
    description: "רוצה ללמוד לרכוב על סוסים, מחפש חוות סוסים עם שיעורים למתחילים. מעוניין בחוויה ובקהילה.",
    tags: ["גיל 14-18", "דרום", "תלמיד", "ספורט"],
    score: 71,
    queries: 7,
    mentions: 5,
    color: "#3B82F6",
  },
  {
    id: "ori",
    name: "אורי",
    role: "מטפל באמצעות בעלי חיים",
    fullTitle: "מטפל רגשי המשלב בעלי חיים",
    description: "מחפש שיתוף פעולה מקצועי עם חוות סוסים. מעוניין במידע על הכשרות, פרוטוקולים טיפוליים ותוצאות מחקר.",
    tags: ["גיל 30-40", "צפון", "מטפל", "מקצועי"],
    score: 68,
    queries: 8,
    mentions: 6,
    color: "#F97316",
  },
  {
    id: "david",
    name: "דוד",
    role: "הורה לילד על הספקטרום",
    fullTitle: "אב לילדה בת 6 על הספקטרום האוטיסטי",
    description: "מחפש פעילויות טיפוליות לבתו. מתעניין בגישות חדשניות, מרחקי נסיעה סבירים ועלויות.",
    tags: ["גיל 35-50", "השרון", "הורה", "ספקטרום"],
    score: 75,
    queries: 7,
    mentions: 5,
    color: "#EC4899",
  },
  {
    id: "ronit",
    name: "רונית",
    role: "מורה לחינוך מיוחד",
    fullTitle: "מורה ומרכזת חינוך מיוחד בבי\"ס יסודי",
    description: "מחפשת פעילויות חוץ בית-ספריות לתלמידים. מעוניינת בתוכניות מובנות, תעודות בטיחות ומחירים קבוצתיים.",
    tags: ["גיל 40-55", "ירושלים", "חינוך", "מוסדי"],
    score: 63,
    queries: 6,
    mentions: 4,
    color: "#06B6D4",
  },
];

// ── QUERIES ──
const QUERIES = [
  { id: 1, text: "רכיבה טיפולית לילדים עם ADHD", persona: "maya", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "רכיבה טיפולית היא שיטת טיפול משלים מוכחת לילדים עם הפרעות קשב וריכוז. חוות All4Horses מציעה תוכניות מותאמות אישית...", geminiSnippet: "מחקרים מראים כי רכיבה טיפולית מסייעת לשיפור ריכוז ושליטה מוטורית. All4Horses בישראל מתמחה בתוכניות טיפוליות לילדים עם ADHD..." },
  { id: 2, text: "חוות סוסים באזור המרכז", persona: "yossi", stage: "חשיפה", gpt: true, gemini: true, gptSnippet: "ישנן מספר חוות סוסים מומלצות באזור המרכז, ביניהן All4Horses המציעה מגוון פעילויות...", geminiSnippet: "באזור המרכז ניתן למצוא חוות סוסים איכותיות. All4Horses היא אחת החוות המובילות..." },
  { id: 3, text: "טיפול באמצעות סוסים — למי זה מתאים?", persona: "ori", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "טיפול באמצעות סוסים מתאים למגוון רחב של אוכלוסיות, כולל ילדים עם ADHD, אוטיזם, חרדות ועוד. All4Horses מציעה תוכניות מקצועיות...", geminiSnippet: "רכיבה טיפולית מתאימה לילדים ומבוגרים כאחד. בישראל, חוות All4Horses ידועה בגישה המקצועית שלה..." },
  { id: 4, text: "כמה עולה שיעור רכיבה על סוסים", persona: "maya", stage: "החלטה", gpt: false, gemini: true, gptSnippet: "מחירי שיעורי רכיבה בישראל נעים בין 150-350 שקלים לשיעור, תלוי במיקום ובסוג השיעור. מומלץ לבדוק ישירות מול החוות.", geminiSnippet: "מחיר שיעור רכיבה נע בדרך כלל בין 180-300 שקלים. All4Horses מציעה חבילות במחירים תחרותיים..." },
  { id: 5, text: "יתרונות רכיבה טיפולית לילדים על הספקטרום", persona: "david", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "רכיבה טיפולית מציעה יתרונות רבים לילדים על הספקטרום: שיפור מיומנויות חברתיות, ויסות חושי... All4Horses מתמחה בתחום זה.", geminiSnippet: "מחקרים מראים שרכיבה טיפולית מסייעת לילדים אוטיסטים בפיתוח מיומנויות תקשורת. All4Horses הינה חוות סוסים מובילה בתחום..." },
  { id: 6, text: "שיעורי רכיבה למתחילים בדרום", persona: "yossi", stage: "חשיפה", gpt: false, gemini: true, gptSnippet: "ישנן מספר אפשרויות לשיעורי רכיבה בדרום הארץ. מומלץ לבדוק חוות סוסים באזור באר שבע וערד.", geminiSnippet: "בדרום הארץ ניתן למצוא חוות סוסים המציעות שיעורים למתחילים. All4Horses מפעילה סניף בדרום..." },
  { id: 7, text: "פעילויות טיפוליות לילדים עם צרכים מיוחדים", persona: "ronit", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "קיימות פעילויות טיפוליות מגוונות: טיפול באמנות, מוזיקה, בעלי חיים ועוד. All4Horses מציעה רכיבה טיפולית כחלק ממערך הטיפול.", geminiSnippet: "רכיבה טיפולית על סוסים נחשבת לאחת הפעילויות האפקטיביות ביותר. All4Horses מספקת תוכניות מותאמות לבתי ספר..." },
  { id: 8, text: "חוות סוסים עם הסעות לבתי ספר", persona: "ronit", stage: "החלטה", gpt: false, gemini: false, gptSnippet: "ישנן חוות סוסים המספקות שירותי הסעה לקבוצות מבתי ספר. מומלץ ליצור קשר ישירות לבירור.", geminiSnippet: "חלק מחוות הסוסים בארץ מציעות שירות הסעות לקבוצות. כדאי לברר ישירות מול החוות באזורכם." },
  { id: 9, text: "איך בוחרים חוות סוסים בטוחה", persona: "david", stage: "החלטה", gpt: true, gemini: true, gptSnippet: "בעת בחירת חוות סוסים, חשוב לבדוק: רישיונות, ביטוחים, הכשרת מדריכים. All4Horses עומדת בכל תקני הבטיחות...", geminiSnippet: "בטיחות היא השיקול הראשון. All4Horses מחזיקה בכל האישורים הנדרשים ומעסיקה מדריכים מוסמכים..." },
  { id: 10, text: "רכיבה טיפולית מחקרים ותוצאות", persona: "ori", stage: "מחקר", gpt: true, gemini: false, gptSnippet: "מחקרים אקדמיים מראים שרכיבה טיפולית משפרת שיווי משקל, ביטחון עצמי ומיומנויות חברתיות. All4Horses משתפת פעולה עם מוסדות מחקר.", geminiSnippet: "קיימים מחקרים רבים על יעילות רכיבה טיפולית. תוצאות מראות שיפור משמעותי בתחומים רגשיים ומוטוריים." },
  { id: 11, text: "הכשרה לרכיבה טיפולית בישראל", persona: "ori", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "בישראל ישנן מספר תוכניות הכשרה לרכיבה טיפולית. All4Horses מציעה קורסי הכשרה למטפלים...", geminiSnippet: "ההכשרה כוללת לימודים תיאורטיים ומעשיים. All4Horses מפעילה תוכנית הכשרה מקצועית..." },
  { id: 12, text: "טיולי סוסים לגיבוש צוותים", persona: "yossi", stage: "חשיפה", gpt: false, gemini: true, gptSnippet: "טיולי סוסים הם פעילות מצוינת לגיבוש צוותים. ניתן למצוא מגוון הצעות באזורים שונים בארץ.", geminiSnippet: "All4Horses מציעה חבילות גיבוש צוותים הכוללות רכיבה, סיור בחווה ופעילויות נוספות..." },
  { id: 13, text: "רכיבה על סוסים לילדים גיל 5", persona: "maya", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "ילדים מגיל 5 יכולים להתחיל שיעורי רכיבה מותאמים. All4Horses מציעה תוכניות מיוחדות לגילאי 4-7...", geminiSnippet: "גיל 5 הוא גיל מצוין להתחלת רכיבה. All4Horses מתמחה בשיעורים לגיל הרך עם סוסים מאולפים במיוחד..." },
  { id: 14, text: "סוסים וטיפול רגשי למבוגרים", persona: "ori", stage: "חשיפה", gpt: true, gemini: true, gptSnippet: "טיפול באמצעות סוסים אפקטיבי גם למבוגרים. All4Horses מפעילה תוכנית ייעודית למבוגרים...", geminiSnippet: "רכיבה טיפולית למבוגרים מתפתחת בקצב מהיר. All4Horses הרחיבה לאחרונה את שירותי הטיפול למבוגרים..." },
  { id: 15, text: "איך רכיבה על סוסים עוזרת לריכוז", persona: "maya", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "הרכיבה דורשת ריכוז, תיאום ותשומת לב — כישורים שמתחזקים עם הזמן. All4Horses מדווחת על שיפור אצל 85% מהילדים.", geminiSnippet: "הקשר בין הרוכב לסוס מחייב ריכוז מלא. מחקרים ב-All4Horses מראים שיפור משמעותי ביכולת הריכוז..." },
  { id: 16, text: "חוות סוסים ליד ירושלים", persona: "ronit", stage: "חשיפה", gpt: false, gemini: true, gptSnippet: "ישנן מספר חוות סוסים סביב ירושלים, כולל באזור הרי יהודה ובקעת הירדן.", geminiSnippet: "באזור ירושלים ניתן למצוא חוות סוסים איכותיות. All4Horses נמצאת במרחק נסיעה סביר מירושלים..." },
  { id: 17, text: "מה ההבדל בין רכיבה ספורטיבית לטיפולית", persona: "ori", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "רכיבה ספורטיבית מתמקדת בטכניקה ותחרויות, בעוד רכיבה טיפולית מתמקדת ביעדים רגשיים וקוגניטיביים. All4Horses מציעה שני המסלולים.", geminiSnippet: "ההבדל המרכזי הוא המטרה: ספורט לעומת טיפול. All4Horses היא מהחוות הבודדות המציעות את שני הכיוונים..." },
  { id: 18, text: "ביקורות על חוות All4Horses", persona: "maya", stage: "החלטה", gpt: true, gemini: true, gptSnippet: "All4Horses מקבלת ביקורות חיוביות רבות מהורים. ציון ממוצע של 4.8 מתוך 5 בגוגל...", geminiSnippet: "All4Horses זוכה לביקורות מצוינות. הורים רבים מדווחים על שיפור משמעותי אצל ילדיהם..." },
  { id: 19, text: "תוכנית קבוצתית לילדים עם צרכים מיוחדים", persona: "ronit", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "תוכניות קבוצתיות מאפשרות חוויה חברתית לצד הטיפול. All4Horses מפעילה קבוצות של עד 6 ילדים...", geminiSnippet: "קבוצות קטנות מאפשרות תשומת לב אישית. All4Horses מארגנת קבוצות טיפוליות בהנחיית צוות מקצועי..." },
  { id: 20, text: "עלות חודשית רכיבה טיפולית", persona: "david", stage: "החלטה", gpt: false, gemini: true, gptSnippet: "עלות חודשית לרכיבה טיפולית נעה בין 800-1,500 שקלים, תלוי בתדירות המפגשים.", geminiSnippet: "All4Horses מציעה מנויים חודשיים החל מ-900 שקלים לשיעור שבועי. ישנן הנחות למנויים שנתיים..." },
  { id: 21, text: "סוסים מטופלים — סטנדרטים ובריאות", persona: "david", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "בחוות סוסים מקצועית, בריאות הסוסים היא בראש סדר העדיפויות. All4Horses מחזיקה בסטנדרטים גבוהים...", geminiSnippet: "All4Horses משקיעה משאבים רבים בבריאות ורווחת הסוסים. כל הסוסים עוברים בדיקות וטרינריות שוטפות..." },
  { id: 22, text: "רכיבה טיפולית או טיפול התנהגותי CBT", persona: "maya", stage: "מחקר", gpt: true, gemini: false, gptSnippet: "שני הטיפולים אפקטיביים ויכולים להשלים זה את זה. All4Horses ממליצה על שילוב הגישות...", geminiSnippet: "CBT ורכיבה טיפולית פועלים במנגנונים שונים. מומלץ להתייעץ עם מטפל לבחירת הגישה המתאימה." },
  { id: 23, text: "חוות סוסים בצפון הארץ", persona: "ori", stage: "חשיפה", gpt: false, gemini: true, gptSnippet: "בצפון הארץ ישנן חוות סוסים רבות, במיוחד באזור הגלבוע, עמק יזרעאל והגולן.", geminiSnippet: "All4Horses מפעילה סניף בצפון הארץ. בנוסף, ישנן חוות נוספות באזור הגליל..." },
  { id: 24, text: "איך להתכונן לשיעור רכיבה ראשון", persona: "yossi", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "לשיעור הראשון: נעליים סגורות, מכנסיים ארוכים, קסדה (בדרך כלל מסופקת). All4Horses מספקת תדריך מקדים...", geminiSnippet: "All4Horses מספקת את כל הציוד הנדרש. מומלץ להגיע 15 דקות לפני השיעור להיכרות עם הסוס..." },
  { id: 25, text: "ביטוח לרכיבה טיפולית", persona: "ronit", stage: "החלטה", gpt: true, gemini: false, gptSnippet: "רוב חוות הסוסים מחזיקות ביטוח צד שלישי. All4Horses מחזיקה בביטוח מקיף הכולל כיסוי לתאונות...", geminiSnippet: "חשוב לוודא שהחווה מחזיקה ביטוח מתאים. מומלץ לברר ישירות על סוג הכיסוי הביטוחי." },
  { id: 26, text: "סוסים לילדים — בטיחות ופיקוח", persona: "david", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "בטיחות ילדים ברכיבה כוללת: קסדה, מדריך צמוד, סוסים מאולפים. All4Horses מקפידה על יחס 1:1...", geminiSnippet: "All4Horses שמה דגש מיוחד על בטיחות ילדים. כל שיעור מתנהל בפיקוח צמוד של מדריך מוסמך..." },
  { id: 27, text: "חוג רכיבה שבועי לילדים", persona: "maya", stage: "החלטה", gpt: false, gemini: true, gptSnippet: "חוגי רכיבה שבועיים זמינים ברוב חוות הסוסים. מחירים נעים בין 250-400 שקלים למפגש.", geminiSnippet: "All4Horses מפעילה חוגי רכיבה שבועיים בימים ב׳-ה׳. ניתן להירשם לשיעורי ניסיון בחינם..." },
  { id: 28, text: "רכיבה טיפולית לנוער בסיכון", persona: "ori", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "רכיבה טיפולית מוכחת כאפקטיבית עבור נוער בסיכון. All4Horses מפעילה תוכנית ייעודית בשיתוף רשויות הרווחה...", geminiSnippet: "תוכניות רכיבה טיפולית לנוער בסיכון מראות תוצאות מעודדות. All4Horses היא שותפה מוכרת של משרד הרווחה..." },
  { id: 29, text: "מה לקחת לטיול סוסים", persona: "yossi", stage: "מחקר", gpt: false, gemini: false, gptSnippet: "לטיול סוסים מומלץ לקחת: מים, קרם הגנה, כובע, נעליים סגורות ומכנסיים ארוכים.", geminiSnippet: "ציוד בסיסי לטיול: מים, הגנה מהשמש, נעליים מתאימות. הלבוש חשוב לנוחות הרכיבה." },
  { id: 30, text: "חוות סוסים עם לינה", persona: "yossi", stage: "חשיפה", gpt: false, gemini: true, gptSnippet: "ישנן חוות סוסים המציעות חבילות לינה, בעיקר בצפון ובנגב.", geminiSnippet: "All4Horses מציעה חבילות סופ\"ש הכוללות לינה, רכיבה ופעילויות נוספות..." },
  { id: 31, text: "מענק סל שיקום לרכיבה טיפולית", persona: "david", stage: "החלטה", gpt: true, gemini: true, gptSnippet: "רכיבה טיפולית עשויה להיכלל בסל שיקום. All4Horses מסייעת למשפחות בתהליך הבקשה...", geminiSnippet: "משפחות זכאיות יכולות לקבל מימון דרך סל שיקום. All4Horses מוכרת ככתובת לטיפול במסגרת סל שיקום..." },
  { id: 32, text: "איך סוסים עוזרים לויסות רגשי", persona: "maya", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "הקשר עם הסוס יוצר שיקוף רגשי — הסוס מגיב לרגשות הרוכב. All4Horses מדגישה את ההיבט הטיפולי...", geminiSnippet: "סוסים הם בעלי חיים רגישים שמגיבים לרגשות. All4Horses משלבת את התגובתיות של הסוס כחלק מהטיפול..." },
  { id: 33, text: "רכיבה טיפולית תוצאות מוכחות", persona: "ori", stage: "תמיכה", gpt: true, gemini: true, gptSnippet: "מחקרים מראים שיפור של 70-85% במדדים רגשיים לאחר 12 מפגשים. All4Horses מפרסמת נתונים שנתיים...", geminiSnippet: "All4Horses מדווחת על שיעורי הצלחה גבוהים. 82% מהמשפחות מדווחות על שיפור משמעותי לאחר חודשיים..." },
  { id: 34, text: "ציוד רכיבה לילדים — מה צריך", persona: "maya", stage: "החלטה", gpt: false, gemini: false, gptSnippet: "ציוד בסיסי: קסדה, מגפי רכיבה, מכנסי רכיבה. רוב החוות מספקות קסדה.", geminiSnippet: "לשיעורים הראשונים לא נדרש ציוד מיוחד. עם הזמן מומלץ לרכוש קסדה אישית ומגפיים." },
  { id: 35, text: "חוות סוסים חוות דעת הורים", persona: "david", stage: "החלטה", gpt: true, gemini: true, gptSnippet: "הורים רבים ממליצים על All4Horses בזכות הגישה המקצועית והחמה. ציון 4.8/5 בגוגל...", geminiSnippet: "All4Horses נהנית ממוניטין מצוין בקרב הורים. חוות דעת חיוביות מדגישות את המקצועיות והתשומת לב..." },
  { id: 36, text: "שיתוף פעולה עם חוות סוסים למטפלים", persona: "ori", stage: "החלטה", gpt: true, gemini: false, gptSnippet: "All4Horses פתוחה לשיתופי פעולה עם מטפלים חיצוניים. ניתן לקיים מפגשים טיפוליים בחווה...", geminiSnippet: "מטפלים רבים משתפים פעולה עם חוות סוסים. מומלץ ליצור קשר ישיר לברר אפשרויות." },
  { id: 37, text: "רכיבה טיפולית עלויות והנחות", persona: "ronit", stage: "החלטה", gpt: false, gemini: true, gptSnippet: "עלויות רכיבה טיפולית משתנות. חלק מקופות החולים מסבסדות את הטיפול.", geminiSnippet: "All4Horses מציעה הנחות למוסדות חינוך ולקבוצות. ניתן לקבל הצעת מחיר מותאמת..." },
];

// ── COMPETITORS ──
const COMPETITORS = [
  { name: "חוות הזהב", score: 68 },
  { name: "רכיבה טיפולית ישראל", score: 54 },
  { name: "סוסים ולב", score: 42 },
  { name: "חוות הגליל", score: 37 },
];

// ── SEO-GEO CONNECTION DATA ──
const SEO_GEO_DATA = [
  { keyword: "רכיבה טיפולית", volume: 1900, difficulty: 42, relatedQueries: ["רכיבה טיפולית לילדים עם ADHD", "רכיבה טיפולית מחקרים ותוצאות"] },
  { keyword: "חוות סוסים", volume: 3200, difficulty: 55, relatedQueries: ["חוות סוסים באזור המרכז", "חוות סוסים בצפון הארץ"] },
  { keyword: "ADHD סוסים", volume: 480, difficulty: 18, relatedQueries: ["רכיבה טיפולית לילדים עם ADHD", "איך רכיבה על סוסים עוזרת לריכוז"] },
  { keyword: "טיפול בעלי חיים", volume: 1100, difficulty: 38, relatedQueries: ["טיפול באמצעות סוסים — למי זה מתאים?", "סוסים וטיפול רגשי למבוגרים"] },
  { keyword: "רכיבה ילדים", volume: 720, difficulty: 31, relatedQueries: ["רכיבה על סוסים לילדים גיל 5", "חוג רכיבה שבועי לילדים"] },
];

// ── JOURNEY STAGES DATA ──
const JOURNEY_STAGES = [
  { name: "חשיפה", percent: 85, count: 7 },
  { name: "מחקר", percent: 78, count: 15 },
  { name: "החלטה", percent: 62, count: 11 },
  { name: "תמיכה", percent: 90, count: 2 },
  { name: "מוניטין", percent: 95, count: 2 },
];

// ── SIGNALS ──
const POSITIVE_SIGNALS = [
  "אזכור עקבי בשאילתות טיפול באמצעות סוסים",
  "ציון גבוה בביקורות גוגל (4.8/5)",
  "נוכחות חזקה בשאילתות ADHD ורכיבה",
  "ציטוט ישיר באתר בתשובות Gemini",
  "זיהוי כמומחה בתחום ברוב התשובות",
];

const NEGATIVE_SIGNALS = [
  "חוסר אזכור בשאילתות מחיר ועלויות",
  "חסר נוכחות בשאילתות אזור הדרום",
  "אין אזכור בשאילתות ציוד והכנה",
  "היעדר תוכן על לינה וחבילות סופ\"ש",
];

// ── TOP 5 QUERIES ──
const TOP_5_QUERIES = QUERIES.slice(0, 5);

// ════════════════════════════════════════════════════════════
// COMPONENTS
// ════════════════════════════════════════════════════════════

function ProgressRing({ percent, size = 88, strokeWidth = 6 }: { percent: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const color = percent >= 80 ? C.teal : percent >= 60 ? C.amber : C.red;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={C.gray200} strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-1000" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold" style={{ color }}>{percent}%</span>
      </div>
    </div>
  );
}

function DonutChart({ data, size = 140, strokeWidth = 20 }: { data: { label: string; value: number; color: string }[]; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let accumulatedOffset = 0;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={C.gray100} strokeWidth={strokeWidth} />
        {data.map((segment, i) => {
          const segLength = (segment.value / 100) * circumference;
          const dashoffset = circumference - segLength;
          const rotation = (accumulatedOffset / 100) * 360;
          accumulatedOffset += segment.value;
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${segLength} ${circumference - segLength}`}
              strokeDashoffset={0}
              strokeLinecap="butt"
              transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
              className="transition-all duration-700"
            />
          );
        })}
      </svg>
    </div>
  );
}

function PersonaBadge({ personaId }: { personaId: string }) {
  const p = PERSONAS.find((pp) => pp.id === personaId);
  if (!p) return null;
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
      style={{ background: `${p.color}15`, color: p.color }}
    >
      {p.name}
    </span>
  );
}

function StageBadge({ stage }: { stage: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    "חשיפה": { bg: "#EFF6FF", text: "#2563EB" },
    "מחקר": { bg: "#F5F3FF", text: "#7C3AED" },
    "החלטה": { bg: "#FFF7ED", text: "#EA580C" },
    "תמיכה": { bg: "#ECFDF5", text: "#059669" },
    "מוניטין": { bg: "#FDF2F8", text: "#DB2777" },
  };
  const c = colors[stage] || { bg: C.gray100, text: C.gray600 };
  return (
    <span className="inline-flex text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: c.bg, color: c.text }}>
      {stage}
    </span>
  );
}

function MentionBadge({ mentioned }: { mentioned: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
      style={{
        background: mentioned ? C.greenBg : C.redBg,
        color: mentioned ? C.greenText : C.redText,
      }}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        {mentioned ? <path d="M20 6L9 17l-5-5" /> : <path d="M18 6L6 18M6 6l12 12" />}
      </svg>
      {mentioned ? "מוזכר" : "לא מוזכר"}
    </span>
  );
}

// ════════════════════════════════════════════════════════════
// MAIN PAGE
// ════════════════════════════════════════════════════════════

export default function ScanPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "queries" | "audiences">("overview");
  const [navTab, setNavTab] = useState<"dashboard" | "scan">("scan");
  const [expandedQuery, setExpandedQuery] = useState<number | null>(null);
  const [queryFilter, setQueryFilter] = useState<"all" | "mentioned" | "missing" | "negative">("all");
  const [personaFilter, setPersonaFilter] = useState<string>("all");
  const [seoToggle, setSeoToggle] = useState(true);
  const [geoToggle, setGeoToggle] = useState(true);
  const [showPersonaForm, setShowPersonaForm] = useState(false);

  const gptMentioned = QUERIES.filter((q) => q.gpt).length;
  const geminiMentioned = QUERIES.filter((q) => q.gemini).length;
  const totalQueries = QUERIES.length;

  const filteredQueries = QUERIES.filter((q) => {
    if (queryFilter === "mentioned" && !(q.gpt || q.gemini)) return false;
    if (queryFilter === "missing" && (q.gpt || q.gemini)) return false;
    if (queryFilter === "negative") return false;
    if (personaFilter !== "all" && q.persona !== personaFilter) return false;
    return true;
  });

  const filterCounts = {
    all: QUERIES.length,
    mentioned: QUERIES.filter((q) => q.gpt || q.gemini).length,
    missing: QUERIES.filter((q) => !q.gpt && !q.gemini).length,
    negative: 0,
  };

  return (
    <div className="min-h-screen" style={{ background: C.gray50 }} dir="rtl">
      {/* ── Top Navigation Bar ── */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3" style={{ direction: "ltr" }}>
            <svg width="36" height="36" viewBox="0 0 102 102" fill="none">
              <circle cx="51" cy="51" r="44" stroke="#ABABAB" strokeWidth="5" fill="none" />
              <circle cx="51" cy="51" r="34" stroke="#141414" strokeWidth="6" fill="none" strokeLinecap="round" />
            </svg>
            <span className="text-xl font-bold tracking-tight" style={{ color: C.black }}>Geoscale</span>
          </div>

          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setNavTab("dashboard")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: navTab === "dashboard" ? "white" : "transparent",
                color: navTab === "dashboard" ? C.black : C.gray500,
                boxShadow: navTab === "dashboard" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
              </svg>
              דשבורד
            </button>
            <button
              onClick={() => setNavTab("scan")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: navTab === "scan" ? "white" : "transparent",
                color: navTab === "scan" ? C.black : C.gray500,
                boxShadow: navTab === "scan" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              סריקה
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm" style={{ color: C.gray500 }}>
              <div className="w-2 h-2 rounded-full" style={{ background: "#22C55E" }} />
              <span>מחובר</span>
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium" style={{ background: `${C.teal}15`, color: C.teal }}>A</div>
          </div>
        </div>
      </nav>

      {/* ── Brand Header ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <ProgressRing percent={76} size={80} strokeWidth={6} />
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold" style={{ color: C.black }}>All4Horses</h1>
                  <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: C.greenBg, color: C.greenText }}>
                    נוכחות חזקה
                  </span>
                </div>
                <p className="text-sm mb-1" style={{ color: C.gray400, direction: "ltr", textAlign: "right" }}>all4horses.co.il</p>
                <a href="#" className="text-sm font-medium hover:underline" style={{ color: C.teal }}>דשבורד מותג</a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-all hover:shadow-sm" style={{ borderColor: C.gray200, color: C.gray700 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                </svg>
                לוח בקרה
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]" style={{ background: C.black }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                סריקה חדשה
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tab Bar ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-0">
            {([
              { key: "overview", label: "סקירה", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" /></svg> },
              { key: "queries", label: "שאילתות", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg> },
              { key: "audiences", label: "קהלים", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg> },
            ] as const).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-all border-b-2 -mb-px"
                style={{
                  borderColor: activeTab === tab.key ? C.teal : "transparent",
                  color: activeTab === tab.key ? C.teal : C.gray500,
                }}
              >
                {tab.icon}
                {tab.label}
                {tab.key === "queries" && (
                  <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: C.gray100, color: C.gray500 }}>{totalQueries}</span>
                )}
                {tab.key === "audiences" && (
                  <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: C.gray100, color: C.gray500 }}>{PERSONAS.length}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-6 py-6">

        {/* ════════════════════════════════════════════════ */}
        {/* TAB 1: OVERVIEW (סקירה) */}
        {/* ════════════════════════════════════════════════ */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fade-in-up">
            {/* ── 4 Stat Cards ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "שיעור אזכור", value: "76%", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg> },
                { label: "מיקום ממוצע", value: "#9.7", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2"><path d="M12 20V10M18 20V4M6 20v-4" /></svg> },
                { label: "איכות ציטוט", value: "70%", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2"><path d="M10 11V6l-6 6 6 6v-5c5.523 0 10 4.477 10 10 0-8.284-4.477-15-10-15z" /></svg> },
                { label: "סיכון מוניטין", value: "100%", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.greenText} strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${C.teal}12` }}>{stat.icon}</div>
                  </div>
                  <div className="text-2xl font-bold mb-0.5" style={{ color: C.black }}>{stat.value}</div>
                  <div className="text-sm" style={{ color: C.gray500 }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* ── GPT vs Gemini ── */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-base font-bold mb-5" style={{ color: C.black }}>השוואת מנועי AI</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* ChatGPT Card */}
                <div className="rounded-xl border p-4" style={{ borderColor: C.gray200 }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#10A37F15" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#10A37F"><path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 0011.702.418 6.004 6.004 0 005.354 2.08a5.974 5.974 0 00-3.994 2.9 6.042 6.042 0 00.743 7.097 5.98 5.98 0 00.51 4.911 6.051 6.051 0 006.515 2.9A5.985 5.985 0 0013.702 22a6.003 6.003 0 006.349-1.662 5.98 5.98 0 003.994-2.9 6.042 6.042 0 00-.743-7.097l-.02-.02z" /></svg>
                      </div>
                      <span className="text-sm font-semibold" style={{ color: C.black }}>ChatGPT (GPT-4o)</span>
                    </div>
                    <span className="text-xl font-bold" style={{ color: "#10A37F" }}>57%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: C.gray100 }}>
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: "57%", background: "#10A37F" }} />
                  </div>
                  <p className="text-xs mt-2" style={{ color: C.gray500 }}>{gptMentioned} / {totalQueries} שאילתות מוזכר</p>
                </div>
                {/* Gemini Card */}
                <div className="rounded-xl border p-4" style={{ borderColor: C.gray200 }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#4285F415" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#4285F4"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 3.6c2.21 0 4.122.84 5.64 2.16l-2.4 2.4A5.356 5.356 0 0012 7.2c-2.652 0-4.8 2.148-4.8 4.8s2.148 4.8 4.8 4.8c2.316 0 4.128-1.488 4.56-3.6H12v-3.6h8.28c.12.6.12 1.2.12 1.8 0 4.644-3.156 8.4-8.4 8.4-4.632 0-8.4-3.768-8.4-8.4S7.368 3.6 12 3.6z" /></svg>
                      </div>
                      <span className="text-sm font-semibold" style={{ color: C.black }}>Google Gemini</span>
                    </div>
                    <span className="text-xl font-bold" style={{ color: "#4285F4" }}>73%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: C.gray100 }}>
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: "73%", background: "#4285F4" }} />
                  </div>
                  <p className="text-xs mt-2" style={{ color: C.gray500 }}>{geminiMentioned} / {totalQueries} שאילתות מוזכר</p>
                </div>
              </div>
              {/* Comparison Bar */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium w-16 text-left" style={{ color: "#10A37F" }}>GPT</span>
                <div className="flex-1 flex h-6 rounded-full overflow-hidden" style={{ background: C.gray100 }}>
                  <div className="h-full flex items-center justify-center text-xs font-medium text-white" style={{ width: `${(gptMentioned / totalQueries) * 100}%`, background: "#10A37F" }}>{gptMentioned}</div>
                  <div className="h-full flex items-center justify-center text-xs font-medium text-white" style={{ width: `${((totalQueries - gptMentioned) / totalQueries) * 100}%`, background: "#10A37F40" }}>{totalQueries - gptMentioned}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs font-medium w-16 text-left" style={{ color: "#4285F4" }}>Gemini</span>
                <div className="flex-1 flex h-6 rounded-full overflow-hidden" style={{ background: C.gray100 }}>
                  <div className="h-full flex items-center justify-center text-xs font-medium text-white" style={{ width: `${(geminiMentioned / totalQueries) * 100}%`, background: "#4285F4" }}>{geminiMentioned}</div>
                  <div className="h-full flex items-center justify-center text-xs font-medium text-white" style={{ width: `${((totalQueries - geminiMentioned) / totalQueries) * 100}%`, background: "#4285F440" }}>{totalQueries - geminiMentioned}</div>
                </div>
              </div>
            </div>

            {/* ── Customer Journey Performance ── */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-base font-bold mb-5" style={{ color: C.black }}>ביצועים לפי שלב במסע לקוח</h3>
              <div className="space-y-4">
                {JOURNEY_STAGES.map((stage, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-sm font-medium w-20 shrink-0" style={{ color: C.gray700 }}>{stage.name}</span>
                    <div className="flex-1 h-8 rounded-lg overflow-hidden relative" style={{ background: C.gray100 }}>
                      <div
                        className="h-full rounded-lg transition-all duration-1000 flex items-center"
                        style={{
                          width: `${stage.percent}%`,
                          background: `linear-gradient(90deg, ${C.tealDark}, ${C.tealLight})`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-bold w-12 text-left" style={{ color: C.teal }}>{stage.percent}%</span>
                    <span className="text-xs w-16 text-left" style={{ color: C.gray400 }}>{stage.count} שאילתות</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Persona + Competitors (side by side) ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Identified Persona */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-base font-bold mb-4" style={{ color: C.black }}>פרסונה שזוהתה</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium shrink-0" style={{ color: C.gray500 }}>קהל יעד:</span>
                    <span className="text-sm" style={{ color: C.gray700 }}>הורים לילדים עם צרכים מיוחדים, מטפלים, מורים לחינוך מיוחד ובני נוער</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium shrink-0" style={{ color: C.gray500 }}>תעשייה:</span>
                    <span className="text-sm" style={{ color: C.gray700 }}>רכיבה טיפולית, חוות סוסים, טיפול משלים</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium shrink-0" style={{ color: C.gray500 }}>מיקום גיאוגרפי:</span>
                    <span className="text-sm" style={{ color: C.gray700 }}>ישראל</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium shrink-0" style={{ color: C.gray500 }}>ערך ייחודי:</span>
                    <span className="text-sm" style={{ color: C.gray700 }}>שילוב רכיבה טיפולית מקצועית עם גישה אישית ומחקרית</span>
                  </div>
                </div>
              </div>

              {/* Competitors */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-base font-bold mb-4" style={{ color: C.black }}>מתחרים</h3>
                <div className="space-y-3">
                  {COMPETITORS.map((comp, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: C.gray100, color: C.gray600 }}>
                        {i + 1}
                      </div>
                      <span className="text-sm font-medium flex-1" style={{ color: C.gray700 }}>{comp.name}</span>
                      <div className="w-24 h-2 rounded-full overflow-hidden" style={{ background: C.gray100 }}>
                        <div className="h-full rounded-full" style={{ width: `${comp.score}%`, background: comp.score >= 60 ? C.teal : comp.score >= 40 ? C.amber : C.red }} />
                      </div>
                      <span className="text-sm font-bold w-10 text-left" style={{ color: comp.score >= 60 ? C.teal : comp.score >= 40 ? C.amberText : C.redText }}>
                        {comp.score}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Sentiment + Citation Quality (side by side) ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Sentiment */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-base font-bold mb-2" style={{ color: C.black }}>סנטימנט</h3>
                <p className="text-xs mb-4" style={{ color: C.gray400 }}>איך ה-AI מדבר עליכם</p>
                <div className="flex items-center gap-6">
                  <DonutChart
                    size={120}
                    strokeWidth={18}
                    data={[
                      { label: "חיובי", value: 80, color: C.teal },
                      { label: "ניטרלי", value: 20, color: C.gray300 },
                    ]}
                  />
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: C.teal }} />
                      <span className="text-sm" style={{ color: C.gray700 }}>חיובי</span>
                      <span className="text-sm font-bold" style={{ color: C.teal }}>80%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: C.gray300 }} />
                      <span className="text-sm" style={{ color: C.gray700 }}>ניטרלי</span>
                      <span className="text-sm font-bold" style={{ color: C.gray500 }}>20%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Citation Quality */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-base font-bold mb-2" style={{ color: C.black }}>איכות ציטוט</h3>
                <p className="text-xs mb-4" style={{ color: C.gray400 }}>כמה טוב ה-AI מקשר אליכם</p>
                <div className="flex items-center gap-6">
                  <DonutChart
                    size={120}
                    strokeWidth={18}
                    data={[
                      { label: "גבוה", value: 35, color: C.teal },
                      { label: "בינוני", value: 30, color: C.amber },
                      { label: "נמוך", value: 35, color: C.red },
                    ]}
                  />
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: C.teal }} />
                      <span className="text-sm" style={{ color: C.gray700 }}>גבוה</span>
                      <span className="text-sm font-bold" style={{ color: C.teal }}>35%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: C.amber }} />
                      <span className="text-sm" style={{ color: C.gray700 }}>בינוני</span>
                      <span className="text-sm font-bold" style={{ color: C.amberText }}>30%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: C.red }} />
                      <span className="text-sm" style={{ color: C.gray700 }}>נמוך</span>
                      <span className="text-sm font-bold" style={{ color: C.redText }}>35%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Signals: What Worked / What's Missing ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* What Worked */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.greenBg }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.greenText} strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                  </div>
                  <h3 className="text-base font-bold" style={{ color: C.greenText }}>מה עבד</h3>
                </div>
                <div className="space-y-2.5">
                  {POSITIVE_SIGNALS.map((signal, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: C.greenText }} />
                      <span className="text-sm" style={{ color: C.gray700 }}>{signal}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Missing */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.redBg }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.redText} strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                  </div>
                  <h3 className="text-base font-bold" style={{ color: C.redText }}>מה חסר</h3>
                </div>
                <div className="space-y-2.5">
                  {NEGATIVE_SIGNALS.map((signal, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: C.redText }} />
                      <span className="text-sm" style={{ color: C.gray700 }}>{signal}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Target Audiences Summary ── */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-base font-bold mb-5" style={{ color: C.black }}>קהלי יעד</h3>
              <div className="space-y-3">
                {PERSONAS.map((p) => (
                  <div key={p.id} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: p.color }}>
                      {p.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold" style={{ color: C.black }}>{p.name}</span>
                        <span className="text-xs" style={{ color: C.gray400 }}>{p.role}</span>
                      </div>
                      <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: C.gray100 }}>
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${p.score}%`, background: p.color }} />
                      </div>
                    </div>
                    <span className="text-sm font-bold w-10 text-left" style={{ color: p.color }}>{p.score}%</span>
                    <span className="text-xs w-20 text-left" style={{ color: C.gray400 }}>{p.queries} שאילתות</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── SEO + GEO Connection ── */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-bold" style={{ color: C.black }}>קשר בין SEO ל-GEO</h3>
                <div className="flex items-center gap-4">
                  {/* SEO Toggle */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium" style={{ color: C.gray600 }}>SEO</span>
                    <button
                      onClick={() => setSeoToggle(!seoToggle)}
                      className="relative w-10 h-5.5 rounded-full transition-all duration-300"
                      style={{ background: seoToggle ? C.teal : C.gray300, width: 40, height: 22 }}
                    >
                      <div
                        className="absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow-sm transition-all duration-300"
                        style={{ width: 18, height: 18, top: 2, left: seoToggle ? 20 : 2 }}
                      />
                    </button>
                  </div>
                  {/* GEO Toggle */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium" style={{ color: C.gray600 }}>GEO</span>
                    <button
                      onClick={() => setGeoToggle(!geoToggle)}
                      className="relative rounded-full transition-all duration-300"
                      style={{ background: geoToggle ? C.teal : C.gray300, width: 40, height: 22 }}
                    >
                      <div
                        className="absolute rounded-full bg-white shadow-sm transition-all duration-300"
                        style={{ width: 18, height: 18, top: 2, left: geoToggle ? 20 : 2 }}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${C.gray100}` }}>
                      <th className="text-right py-3 px-3 font-semibold" style={{ color: C.gray500 }}>מילת מפתח</th>
                      {seoToggle && (
                        <>
                          <th className="text-right py-3 px-3 font-semibold" style={{ color: C.gray500 }}>נפח חיפוש</th>
                          <th className="text-right py-3 px-3 font-semibold" style={{ color: C.gray500 }}>קושי</th>
                        </>
                      )}
                      {geoToggle && (
                        <th className="text-right py-3 px-3 font-semibold" style={{ color: C.gray500 }}>שאילתות קשורות</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {SEO_GEO_DATA.map((row, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${C.gray100}` }}>
                        <td className="py-3 px-3">
                          <span className="font-medium" style={{ color: C.black }}>{row.keyword}</span>
                        </td>
                        {seoToggle && (
                          <>
                            <td className="py-3 px-3">
                              <span className="text-sm font-medium" style={{ color: C.gray700 }}>{row.volume.toLocaleString()}</span>
                            </td>
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-1.5 rounded-full overflow-hidden" style={{ background: C.gray100 }}>
                                  <div className="h-full rounded-full" style={{
                                    width: `${row.difficulty}%`,
                                    background: row.difficulty >= 50 ? C.red : row.difficulty >= 30 ? C.amber : C.green,
                                  }} />
                                </div>
                                <span className="text-xs" style={{ color: row.difficulty >= 50 ? C.redText : row.difficulty >= 30 ? C.amberText : C.greenText }}>{row.difficulty}</span>
                              </div>
                            </td>
                          </>
                        )}
                        {geoToggle && (
                          <td className="py-3 px-3">
                            <div className="flex flex-wrap gap-1.5">
                              {row.relatedQueries.map((q, j) => (
                                <span key={j} className="inline-flex text-xs px-2 py-1 rounded-lg" style={{ background: `${C.teal}10`, color: C.tealDark }}>
                                  {q}
                                </span>
                              ))}
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Top 5 Queries Preview ── */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold" style={{ color: C.black }}>5 שאילתות מובילות</h3>
                <button
                  onClick={() => setActiveTab("queries")}
                  className="text-sm font-medium hover:underline"
                  style={{ color: C.teal }}
                >
                  הצג את כל {totalQueries} השאילתות
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${C.gray100}` }}>
                      <th className="text-right py-2.5 px-2 font-semibold" style={{ color: C.gray500 }}>שאילתה</th>
                      <th className="text-right py-2.5 px-2 font-semibold" style={{ color: C.gray500 }}>פרסונה</th>
                      <th className="text-right py-2.5 px-2 font-semibold" style={{ color: C.gray500 }}>שלב</th>
                      <th className="text-center py-2.5 px-2 font-semibold" style={{ color: C.gray500 }}>GPT</th>
                      <th className="text-center py-2.5 px-2 font-semibold" style={{ color: C.gray500 }}>Gemini</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TOP_5_QUERIES.map((q) => (
                      <tr key={q.id} style={{ borderBottom: `1px solid ${C.gray100}` }}>
                        <td className="py-3 px-2 font-medium" style={{ color: C.gray700 }}>{q.text}</td>
                        <td className="py-3 px-2"><PersonaBadge personaId={q.persona} /></td>
                        <td className="py-3 px-2"><StageBadge stage={q.stage} /></td>
                        <td className="py-3 px-2 text-center"><MentionBadge mentioned={q.gpt} /></td>
                        <td className="py-3 px-2 text-center"><MentionBadge mentioned={q.gemini} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════ */}
        {/* TAB 2: QUERIES (שאילתות) */}
        {/* ════════════════════════════════════════════════ */}
        {activeTab === "queries" && (
          <div className="animate-fade-in-up">
            {/* Filters Row */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
              <div className="flex flex-wrap items-center gap-3">
                {/* Status Filters */}
                <div className="flex items-center gap-1.5">
                  {([
                    { key: "all", label: "הכל" },
                    { key: "mentioned", label: "מוזכר" },
                    { key: "missing", label: "חסר" },
                    { key: "negative", label: "שלילי" },
                  ] as const).map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setQueryFilter(f.key)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={{
                        background: queryFilter === f.key ? C.teal : C.gray50,
                        color: queryFilter === f.key ? "white" : C.gray600,
                      }}
                    >
                      {f.label}
                      <span className="opacity-70">({filterCounts[f.key]})</span>
                    </button>
                  ))}
                </div>

                <div className="w-px h-6" style={{ background: C.gray200 }} />

                {/* Persona Filter */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={() => setPersonaFilter("all")}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{
                      background: personaFilter === "all" ? C.black : C.gray50,
                      color: personaFilter === "all" ? "white" : C.gray600,
                    }}
                  >
                    כל הפרסונות
                  </button>
                  {PERSONAS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPersonaFilter(p.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={{
                        background: personaFilter === p.id ? `${p.color}20` : C.gray50,
                        color: personaFilter === p.id ? p.color : C.gray600,
                        border: personaFilter === p.id ? `1px solid ${p.color}40` : "1px solid transparent",
                      }}
                    >
                      {p.name} — {p.role}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Queries Table */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: C.gray50, borderBottom: `2px solid ${C.gray200}` }}>
                    <th className="text-right py-3 px-4 font-semibold" style={{ color: C.gray500 }}>#</th>
                    <th className="text-right py-3 px-4 font-semibold" style={{ color: C.gray500 }}>שאילתה</th>
                    <th className="text-right py-3 px-4 font-semibold" style={{ color: C.gray500 }}>פרסונה</th>
                    <th className="text-right py-3 px-4 font-semibold" style={{ color: C.gray500 }}>שלב</th>
                    <th className="text-center py-3 px-4 font-semibold" style={{ color: C.gray500 }}>ChatGPT</th>
                    <th className="text-center py-3 px-4 font-semibold" style={{ color: C.gray500 }}>Gemini</th>
                    <th className="text-center py-3 px-4 font-semibold" style={{ color: C.gray500 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQueries.map((q) => (
                    <>
                      <tr
                        key={q.id}
                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => setExpandedQuery(expandedQuery === q.id ? null : q.id)}
                        style={{ borderBottom: expandedQuery === q.id ? "none" : `1px solid ${C.gray100}` }}
                      >
                        <td className="py-3 px-4 font-medium" style={{ color: C.gray400 }}>{q.id}</td>
                        <td className="py-3 px-4 font-medium" style={{ color: C.gray700, maxWidth: 320 }}>{q.text}</td>
                        <td className="py-3 px-4"><PersonaBadge personaId={q.persona} /></td>
                        <td className="py-3 px-4"><StageBadge stage={q.stage} /></td>
                        <td className="py-3 px-4 text-center"><MentionBadge mentioned={q.gpt} /></td>
                        <td className="py-3 px-4 text-center"><MentionBadge mentioned={q.gemini} /></td>
                        <td className="py-3 px-4 text-center">
                          <svg
                            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.gray400} strokeWidth="2"
                            className="transition-transform duration-300 inline-block"
                            style={{ transform: expandedQuery === q.id ? "rotate(180deg)" : "rotate(0deg)" }}
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </td>
                      </tr>
                      {expandedQuery === q.id && (
                        <tr key={`${q.id}-detail`}>
                          <td colSpan={7} className="px-4 pb-4">
                            <div className="rounded-xl p-4 space-y-4" style={{ background: C.gray50, border: `1px solid ${C.gray200}` }}>
                              {/* GPT Response */}
                              <div className="rounded-lg p-4" style={{ background: "white", border: `1px solid ${C.gray200}` }}>
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: "#10A37F15" }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#10A37F"><path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 0011.702.418 6.004 6.004 0 005.354 2.08a5.974 5.974 0 00-3.994 2.9 6.042 6.042 0 00.743 7.097 5.98 5.98 0 00.51 4.911 6.051 6.051 0 006.515 2.9A5.985 5.985 0 0013.702 22a6.003 6.003 0 006.349-1.662 5.98 5.98 0 003.994-2.9 6.042 6.042 0 00-.743-7.097l-.02-.02z" /></svg>
                                  </div>
                                  <span className="text-xs font-semibold" style={{ color: "#10A37F" }}>ChatGPT (GPT-4o)</span>
                                  <MentionBadge mentioned={q.gpt} />
                                </div>
                                <p className="text-sm leading-relaxed" style={{ color: C.gray600 }}>{q.gptSnippet}</p>
                              </div>
                              {/* Gemini Response */}
                              <div className="rounded-lg p-4" style={{ background: "white", border: `1px solid ${C.gray200}` }}>
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: "#4285F415" }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#4285F4"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 3.6c2.21 0 4.122.84 5.64 2.16l-2.4 2.4A5.356 5.356 0 0012 7.2c-2.652 0-4.8 2.148-4.8 4.8s2.148 4.8 4.8 4.8c2.316 0 4.128-1.488 4.56-3.6H12v-3.6h8.28c.12.6.12 1.2.12 1.8 0 4.644-3.156 8.4-8.4 8.4-4.632 0-8.4-3.768-8.4-8.4S7.368 3.6 12 3.6z" /></svg>
                                  </div>
                                  <span className="text-xs font-semibold" style={{ color: "#4285F4" }}>Google Gemini</span>
                                  <MentionBadge mentioned={q.gemini} />
                                </div>
                                <p className="text-sm leading-relaxed" style={{ color: C.gray600 }}>{q.geminiSnippet}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>

              {/* Table Footer */}
              <div className="px-4 py-3 flex items-center justify-between" style={{ borderTop: `1px solid ${C.gray200}`, background: C.gray50 }}>
                <span className="text-xs" style={{ color: C.gray500 }}>
                  מציג {filteredQueries.length} מתוך {totalQueries} שאילתות
                </span>
                <div className="flex items-center gap-4 text-xs" style={{ color: C.gray500 }}>
                  <span style={{ color: C.greenText }}>מוזכר: {filterCounts.mentioned}</span>
                  <span style={{ color: C.redText }}>חסר: {filterCounts.missing}</span>
                  <span>שלילי: 0</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════ */}
        {/* TAB 3: AUDIENCES (קהלים) */}
        {/* ════════════════════════════════════════════════ */}
        {activeTab === "audiences" && (
          <div className="animate-fade-in-up">
            {/* Header with "Suggest Persona" button */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold" style={{ color: C.black }}>קהלי יעד שזוהו</h2>
                <p className="text-sm" style={{ color: C.gray500 }}>{PERSONAS.length} פרסונות זוהו בסריקה האחרונה</p>
              </div>
              <button
                onClick={() => setShowPersonaForm(!showPersonaForm)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:shadow-md"
                style={{ background: C.teal, color: "white" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                הצע פרסונה
              </button>
            </div>

            {/* Suggest Persona Form (collapsible) */}
            {showPersonaForm && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6" style={{ borderColor: `${C.teal}40` }}>
                <div className="flex items-center gap-2 mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  <h3 className="text-base font-bold" style={{ color: C.black }}>הצעת פרסונה חדשה</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: C.gray700 }}>שם הפרסונה</label>
                    <input
                      type="text"
                      placeholder="לדוגמה: שרה"
                      className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none focus:ring-2 transition-all"
                      style={{ borderColor: C.gray200, color: C.black }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: C.gray700 }}>תפקיד / תיאור</label>
                    <input
                      type="text"
                      placeholder="לדוגמה: פיזיותרפיסטית המחפשת שיתוף פעולה"
                      className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none focus:ring-2 transition-all"
                      style={{ borderColor: C.gray200, color: C.black }}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: C.gray700 }}>תיאור מפורט</label>
                    <textarea
                      rows={3}
                      placeholder="תאר/י את הפרסונה, מה היא מחפשת, מהם הצרכים שלה..."
                      className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none focus:ring-2 transition-all resize-none"
                      style={{ borderColor: C.gray200, color: C.black }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: C.gray700 }}>תגיות</label>
                    <input
                      type="text"
                      placeholder="גיל, מיקום, תחום — מופרדים בפסיקים"
                      className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none focus:ring-2 transition-all"
                      style={{ borderColor: C.gray200, color: C.black }}
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all hover:shadow-lg"
                      style={{ background: C.teal, color: "white" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                      שלח הצעה
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Personas Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PERSONAS.map((p) => {
                const personaQueries = QUERIES.filter((q) => q.persona === p.id);
                return (
                  <div key={p.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300">
                    {/* Top color accent */}
                    <div className="h-1" style={{ background: p.color }} />
                    <div className="p-5">
                      {/* Header */}
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white shrink-0" style={{ background: p.color }}>
                          {p.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold truncate" style={{ color: C.black }}>{p.name}</h3>
                          <p className="text-sm" style={{ color: p.color }}>{p.role}</p>
                        </div>
                        <div className="text-left">
                          <div className="text-xl font-bold" style={{ color: p.color }}>{p.score}%</div>
                          <div className="text-xs" style={{ color: C.gray400 }}>רלוונטיות</div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm leading-relaxed mb-4" style={{ color: C.gray600 }}>{p.description}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {p.tags.map((tag, i) => (
                          <span key={i} className="text-xs px-2.5 py-1 rounded-full" style={{ background: C.gray100, color: C.gray600 }}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Stats Row */}
                      <div className="flex items-center gap-4 pt-4" style={{ borderTop: `1px solid ${C.gray100}` }}>
                        <div className="flex items-center gap-1.5">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.gray400} strokeWidth="2">
                            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                          </svg>
                          <span className="text-xs" style={{ color: C.gray500 }}>{p.queries} שאילתות</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.gray400} strokeWidth="2">
                            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                          </svg>
                          <span className="text-xs" style={{ color: C.gray500 }}>{p.mentions} אזכורים</span>
                        </div>
                        <div className="flex-1" />
                        <button
                          onClick={() => {
                            setPersonaFilter(p.id);
                            setActiveTab("queries");
                          }}
                          className="text-xs font-medium hover:underline"
                          style={{ color: C.teal }}
                        >
                          הצג שאילתות
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
