"use client";

import React, { useState } from "react";

// ============================================================
// GEOSCALE SCAN ANALYSIS — Full Brand Scan Results Page
// Brand: All4Horses | all4horses.co.il | Score: 76%
// Tabs: סקירה (Overview) | שאילתות (Queries) | קהלים (Audiences)
// Design: Ultra-minimal Geoscale brand language
// ============================================================

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
  },
];

// ── QUERIES ──
const QUERIES = [
  { id: 1, text: "רכיבה טיפולית לילדים עם ADHD", persona: "maya", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "רכיבה טיפולית היא שיטת טיפול משלים מוכחת לילדים עם הפרעות קשב וריכוז. חוות All4Horses מציעה תוכניות מותאמות אישית...", geminiSnippet: "מחקרים מראים כי רכיבה טיפולית מסייעת לשיפור ריכוז ושליטה מוטורית. All4Horses בישראל מתמחה בתוכניות טיפוליות לילדים עם ADHD...", gptFull: "רכיבה טיפולית היא שיטת טיפול משלים מוכחת לילדים עם הפרעות קשב וריכוז (ADHD). הטיפול כולל אינטראקציה עם סוסים בסביבה מובנית, כאשר הילד לומד לתקשר עם הסוס, לטפל בו ולרכוב עליו.\n\nהמחקרים מראים שרכיבה טיפולית מסייעת ב:\n• שיפור יכולת הריכוז והקשב — הסוס דורש תשומת לב מתמדת\n• פיתוח שליטה מוטורית ושיווי משקל\n• חיזוק ביטחון עצמי והערכה עצמית\n• שיפור מיומנויות חברתיות ורגשיות\n• הפחתת חרדה ומתח\n\nחוות All4Horses מציעה תוכניות מותאמות אישית לילדים עם ADHD, הכוללות הערכה ראשונית, תוכנית טיפול מובנית ומעקב שוטף. הצוות המקצועי כולל מטפלים מוסמכים בעלי ניסיון רב בעבודה עם ילדים עם הפרעות קשב.\n\nמומלץ להתחיל עם מפגש היכרות ולהתייעץ עם הצוות הטיפולי לגבי תדירות המפגשים המתאימה. רוב התוכניות כוללות מפגש שבועי אחד של 45-60 דקות.", geminiFull: "רכיבה טיפולית נחקרה רבות בשנים האחרונות כטיפול משלים יעיל להפרעות קשב וריכוז (ADHD) בילדים. מחקרים מראים כי האינטראקציה עם הסוס מסייעת לשיפור ריכוז ושליטה מוטורית באופן משמעותי.\n\nAll4Horses בישראל מתמחה בתוכניות טיפוליות לילדים עם ADHD. החווה מציעה:\n\n1. תוכנית טיפולית מובנית — מפגשים שבועיים עם מטפלים מוסמכים\n2. הערכה התפתחותית — מעקב אחר התקדמות הילד\n3. שילוב הורים — הדרכת הורים כחלק מהתהליך\n4. סביבה טבעית — הטיפול מתקיים בחוות סוסים מטופחת\n\nהמחקרים מצביעים על שיפור ב-70-85% מהמטופלים לאחר 12 מפגשים. היתרונות כוללים שיפור בוויסות רגשי, הפחתת אימפולסיביות, ופיתוח תחושת אחריות.\n\nהחווה ממוקמת באזור המרכז ומציעה גם שירותי הסעה לבתי ספר ומוסדות. ניתן לתאם מפגש היכרות ללא התחייבות." },
  { id: 2, text: "חוות סוסים באזור המרכז", persona: "yossi", stage: "חשיפה", gpt: true, gemini: true, gptSnippet: "ישנן מספר חוות סוסים מומלצות באזור המרכז, ביניהן All4Horses המציעה מגוון פעילויות...", geminiSnippet: "באזור המרכז ניתן למצוא חוות סוסים איכותיות. All4Horses היא אחת החוות המובילות...", gptFull: "ישנן מספר חוות סוסים מומלצות באזור המרכז, ביניהן All4Horses המציעה מגוון פעילויות רכיבה, טיפול ופנאי.\n\nחוות סוסים מובילות באזור המרכז:\n\n1. All4Horses — מובילה בתחום הרכיבה הטיפולית, ממוקמת באזור השרון. מציעה שיעורי רכיבה, רכיבה טיפולית, טיולי סוסים וימי כיף.\n2. חוות הזהב — חווה ותיקה המתמחה בשיעורי רכיבה ספורטיבית.\n3. רכיבה טיפולית ישראל — מתמקדת בטיפול באמצעות סוסים.\n\nAll4Horses נחשבת לבחירה מומלצת במיוחד בזכות השילוב בין רכיבה ספורטיבית לטיפולית, צוות מקצועי מנוסה, ומתקנים מודרניים. החווה מציעה שיעורי ניסיון למתחילים וניתן לתאם ביקור היכרות.", geminiFull: "באזור המרכז ניתן למצוא חוות סוסים איכותיות. All4Horses היא אחת החוות המובילות, המציעה מגוון שירותים:\n\n• שיעורי רכיבה למתחילים ומתקדמים\n• רכיבה טיפולית מוסמכת\n• טיולי סוסים וימי גיבוש\n• קייטנות וחוגים לילדים\n\nהחווה ממוקמת באזור השרון, נגישה מכל רחבי אזור המרכז. הצוות כולל מדריכים מוסמכים ומטפלים בעלי ניסיון.\n\nחוות נוספות באזור: חוות הזהב (רמת גן), רכיבה טיפולית ישראל (מודיעין). כל חווה מתמחה בתחום שונה, מומלץ לבדוק איזו מתאימה לצרכים שלכם." },
  { id: 3, text: "טיפול באמצעות סוסים — למי זה מתאים?", persona: "ori", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "טיפול באמצעות סוסים מתאים למגוון רחב של אוכלוסיות, כולל ילדים עם ADHD, אוטיזם, חרדות ועוד. All4Horses מציעה תוכניות מקצועיות...", geminiSnippet: "רכיבה טיפולית מתאימה לילדים ומבוגרים כאחד. בישראל, חוות All4Horses ידועה בגישה המקצועית שלה...", gptFull: "טיפול באמצעות סוסים מתאים למגוון רחב של אוכלוסיות:\n\n• ילדים עם ADHD — שיפור ריכוז ושליטה עצמית\n• ילדים על הספקטרום האוטיסטי — פיתוח מיומנויות חברתיות\n• נוער בסיכון — בניית ביטחון עצמי ותחושת שייכות\n• מבוגרים עם חרדה או דיכאון — הפחתת מתח וויסות רגשי\n• אנשים עם מוגבלויות פיזיות — שיפור מוטוריקה ושיווי משקל\n• ילדים עם שיתוק מוחין — חיזוק שרירים ותיאום\n\nAll4Horses מציעה תוכניות מקצועיות לכל אחת מהאוכלוסיות הללו. הצוות כולל מטפלים בעלי הכשרה ספציפית לכל תחום. בתחילת הטיפול מתבצעת הערכה מקצועית ונבנית תוכנית אישית.\n\nחשוב לציין שרכיבה טיפולית אינה מחליפה טיפולים רפואיים אלא משלימה אותם. מומלץ להתייעץ עם הרופא המטפל לפני תחילת הטיפול.", geminiFull: "רכיבה טיפולית מתאימה לילדים ומבוגרים כאחד. בישראל, חוות All4Horses ידועה בגישה המקצועית שלה לטיפול באמצעות סוסים.\n\nהטיפול מתאים במיוחד ל:\n\n1. ילדים עם הפרעות קשב (ADHD)\n2. ילדים ומבוגרים על הספקטרום האוטיסטי\n3. אנשים הסובלים מחרדות ודיכאון\n4. נוער בסיכון ונושרים ממערכת החינוך\n5. אנשים עם מוגבלויות פיזיות\n6. מתמודדים עם PTSD\n\nAll4Horses מפעילה תוכניות ייעודיות לכל קבוצת גיל ואבחנה. הטיפול מבוסס על מודלים מוכחים מחקרית ומותאם אישית לכל מטופל.\n\nהשלב הראשון הוא תמיד מפגש היכרות והערכה, שבו הצוות המקצועי מכיר את המטופל ובונה תוכנית טיפול מותאמת." },
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
  { name: "חוות הזהב", domain: "havat-hazahav.co.il", score: 68 },
  { name: "רכיבה טיפולית ישראל", domain: "riding-therapy.co.il", score: 54 },
  { name: "סוסים ולב", domain: "susim-valev.co.il", score: 42 },
  { name: "חוות הגליל", domain: "galil-horses.co.il", score: 37 },
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

const TOP_5_QUERIES = QUERIES.slice(0, 5);

// ── CHART MOCK DATA ──
const CHART_DATA = {
  labels: ["08/01", "08/07", "08/14", "08/21", "08/28", "09/04"],
  gpt: [62, 65, 68, 71, 74, 76],
  gemini: [58, 62, 67, 70, 72, 73],
};

// ── TOOLTIP DESCRIPTIONS ──
const METRIC_TOOLTIPS: Record<string, string> = {
  "שיעור אזכור": "אחוז השאילתות בהן המותג שלך מוזכר בתשובות מנועי AI",
  "מיקום ממוצע": "המיקום הממוצע שבו המותג מוזכר בתשובות (נמוך יותר = טוב יותר)",
  "איכות ציטוט": "עד כמה הציטוט של המותג מדויק, רלוונטי ומלא בתשובות AI",
  "סיכון מוניטין": "אחוז התשובות שבהן המותג מוצג באור חיובי או ניטרלי (ללא מידע שלילי)",
};

// ════════════════════════════════════════════════════════════
// COMPONENTS
// ════════════════════════════════════════════════════════════

function Tooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  return (
    <span
      style={{ position: "relative", display: "inline-flex", alignItems: "center", cursor: "help" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B0B7BF" strokeWidth="2" style={{ display: "block", transition: "stroke 150ms" }} onMouseEnter={(e) => { (e.currentTarget as SVGElement).style.stroke = "#666"; }} onMouseLeave={(e) => { (e.currentTarget as SVGElement).style.stroke = "#B0B7BF"; }}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
      <div style={{
        position: "absolute",
        bottom: "calc(100% + 10px)",
        right: "50%",
        transform: "translateX(50%)",
        background: "#1B1F23",
        color: "#FFFFFF",
        fontSize: 12,
        lineHeight: 1.55,
        padding: "8px 12px",
        borderRadius: 6,
        whiteSpace: "nowrap",
        maxWidth: 280,
        zIndex: 100,
        pointerEvents: "none",
        opacity: show ? 1 : 0,
        transition: "opacity 150ms ease",
        boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
        letterSpacing: "-0.01em",
      }}>
        <span style={{ whiteSpace: "normal" }}>{text}</span>
        <div style={{
          position: "absolute",
          bottom: -5,
          right: "50%",
          transform: "translateX(50%)",
          width: 10,
          height: 10,
          background: "#1B1F23",
          borderRadius: 1,
          rotate: "45deg",
        }} />
      </div>
    </span>
  );
}

function ProgressRing({ percent, size = 88, strokeWidth = 6 }: { percent: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#F9F9F9" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#10A37F" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: "all 1s ease" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: Math.round(size * 0.26), fontWeight: 600, color: "#000000" }}>{percent}%</span>
      </div>
    </div>
  );
}

function DonutChart({ data, size = 140, strokeWidth = 20 }: { data: { label: string; value: number; color: string }[]; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let accumulatedOffset = 0;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#F9F9F9" strokeWidth={strokeWidth} />
        {data.map((segment, i) => {
          const segLength = (segment.value / 100) * circumference;
          const rotation = (accumulatedOffset / 100) * 360;
          accumulatedOffset += segment.value;
          return (
            <circle key={i} cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={segment.color} strokeWidth={strokeWidth} strokeDasharray={`${segLength} ${circumference - segLength}`} strokeDashoffset={0} strokeLinecap="butt" transform={`rotate(${rotation} ${size / 2} ${size / 2})`} style={{ transition: "all 0.7s ease" }} />
          );
        })}
      </svg>
    </div>
  );
}

function ChangeIndicator({ value, unit, invertColor }: { value: number; unit: string; invertColor?: boolean }) {
  const isPositive = value > 0;
  // invertColor: for metrics where lower is better (like position), down arrow should be green
  const isGood = invertColor ? !isPositive : isPositive;
  const color = isGood ? "#10A37F" : "#DC2626";
  const arrow = isPositive ? "\u2191" : "\u2193";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 2, fontSize: 12, fontWeight: 600, color }}>
      {arrow}{Math.abs(value)}{unit}
    </span>
  );
}

function TimeSeriesChart({ period }: { period: "7" | "30" | "90" }) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const chartW = 1000;
  const chartH = 260;
  const padTop = 20;
  const padBottom = 30;
  const padLeft = 40;
  const padRight = 20;
  const innerW = chartW - padLeft - padRight;
  const innerH = chartH - padTop - padBottom;

  const data = CHART_DATA;
  const allValues = [...data.gpt, ...data.gemini];
  const maxVal = Math.max(...allValues);
  const minVal = Math.min(...allValues) - 5;
  const range = maxVal - minVal;

  const getX = (i: number) => padLeft + (i / (data.labels.length - 1)) * innerW;
  const getY = (v: number) => padTop + innerH - ((v - minVal) / range) * innerH;

  const gptPoints = data.gpt.map((v, i) => `${getX(i)},${getY(v)}`).join(" ");
  const geminiPoints = data.gemini.map((v, i) => `${getX(i)},${getY(v)}`).join(" ");

  const gptAreaPoints = `${getX(0)},${getY(data.gpt[0])} ${gptPoints} ${getX(data.gpt.length - 1)},${padTop + innerH} ${getX(0)},${padTop + innerH}`;
  const geminiAreaPoints = `${getX(0)},${getY(data.gemini[0])} ${geminiPoints} ${getX(data.gemini.length - 1)},${padTop + innerH} ${getX(0)},${padTop + innerH}`;

  const gridLines = 5;
  const gridValues = Array.from({ length: gridLines }, (_, i) => minVal + (range / (gridLines - 1)) * i);

  return (
    <div style={{ position: "relative" }}>
      <svg width="100%" height={chartH} viewBox={`0 0 ${chartW} ${chartH}`} preserveAspectRatio="xMidYMid meet">
        {gridValues.map((v, i) => (
          <g key={i}>
            <line x1={padLeft} y1={getY(v)} x2={chartW - padRight} y2={getY(v)} stroke="#F0F0F0" strokeWidth="1" />
            <text x={padLeft - 8} y={getY(v) + 4} textAnchor="end" fill="#A2A9B0" fontSize="11" fontFamily="Inter, sans-serif">{Math.round(v)}%</text>
          </g>
        ))}
        <polygon points={geminiAreaPoints} fill="#4285F4" opacity="0.06" />
        <polygon points={gptAreaPoints} fill="#10A37F" opacity="0.08" />
        <polyline points={geminiPoints} fill="none" stroke="#4285F4" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        <polyline points={gptPoints} fill="none" stroke="#10A37F" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        {hoverIdx !== null && (
          <line x1={getX(hoverIdx)} y1={padTop} x2={getX(hoverIdx)} y2={padTop + innerH} stroke="#BFBFBF" strokeWidth="1" strokeDasharray="4 3" />
        )}
        {data.gpt.map((v, i) => (
          <circle key={`gpt-${i}`} cx={getX(i)} cy={getY(v)} r={hoverIdx === i ? 6 : 3.5} fill="#10A37F" stroke="#fff" strokeWidth={hoverIdx === i ? 2 : 0} style={{ transition: "r 150ms" }} />
        ))}
        {data.gemini.map((v, i) => (
          <circle key={`gem-${i}`} cx={getX(i)} cy={getY(v)} r={hoverIdx === i ? 6 : 3.5} fill="#4285F4" stroke="#fff" strokeWidth={hoverIdx === i ? 2 : 0} style={{ transition: "r 150ms" }} />
        ))}
        {data.labels.map((label, i) => (
          <text key={i} x={getX(i)} y={chartH - 5} textAnchor="middle" fill="#A2A9B0" fontSize="11" fontFamily="Inter, sans-serif">{label}</text>
        ))}
        {data.labels.map((_, i) => (
          <rect key={`hover-${i}`} x={getX(i) - (innerW / data.labels.length) / 2} y={padTop} width={innerW / data.labels.length} height={innerH} fill="transparent" onMouseEnter={() => setHoverIdx(i)} onMouseLeave={() => setHoverIdx(null)} />
        ))}
      </svg>
      {hoverIdx !== null && (
        <div style={{
          position: "absolute",
          top: 10,
          left: `${(getX(hoverIdx) / chartW) * 100}%`,
          transform: "translateX(-50%)",
          background: "#1B1F23",
          color: "#fff",
          padding: "10px 14px",
          borderRadius: 8,
          fontSize: 12,
          lineHeight: 1.6,
          zIndex: 10,
          pointerEvents: "none",
          boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
          whiteSpace: "nowrap",
        }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{data.labels[hoverIdx]}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: 4, background: "#10A37F", display: "inline-block" }} />
            ChatGPT: {data.gpt[hoverIdx]}%
            {hoverIdx > 0 && <span style={{ color: data.gpt[hoverIdx] >= data.gpt[hoverIdx - 1] ? "#4ADE80" : "#F87171", fontSize: 11 }}>{data.gpt[hoverIdx] >= data.gpt[hoverIdx - 1] ? "+" : ""}{data.gpt[hoverIdx] - data.gpt[hoverIdx - 1]}%</span>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: 4, background: "#4285F4", display: "inline-block" }} />
            Gemini: {data.gemini[hoverIdx]}%
            {hoverIdx > 0 && <span style={{ color: data.gemini[hoverIdx] >= data.gemini[hoverIdx - 1] ? "#4ADE80" : "#F87171", fontSize: 11 }}>{data.gemini[hoverIdx] >= data.gemini[hoverIdx - 1] ? "+" : ""}{data.gemini[hoverIdx] - data.gemini[hoverIdx - 1]}%</span>}
          </div>
        </div>
      )}
    </div>
  );
}

function PersonaBadge({ personaId }: { personaId: string }) {
  const p = PERSONAS.find((pp) => pp.id === personaId);
  if (!p) return null;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 500, padding: "2px 8px", borderRadius: 10, border: "1px solid #DDDDDD", background: "#FFFFFF", color: "#333333" }}>
      {p.name}
    </span>
  );
}

function StageBadge({ stage }: { stage: string }) {
  return (
    <span style={{ display: "inline-flex", fontSize: 12, fontWeight: 500, padding: "2px 8px", borderRadius: 10, border: "1px solid #DDDDDD", background: "#F9F9F9", color: "#333333" }}>
      {stage}
    </span>
  );
}

function AIEngineLogo({ engine, size = 18 }: { engine: "gpt" | "gemini" | "perplexity"; size?: number }) {
  const src = engine === "gpt" ? "/logos/chatgpt.svg" : engine === "gemini" ? "/logos/gemini.svg" : "/logos/perplexity.svg";
  return <img src={src} width={size} height={size} alt={engine === "gpt" ? "ChatGPT" : engine === "gemini" ? "Gemini" : "Perplexity"} style={{ display: "inline-block" }} />;
}

function MentionIcon({ mentioned, engine }: { mentioned: boolean; engine: "gpt" | "gemini" | "perplexity" }) {
  const [hover, setHover] = useState(false);
  const engineNames = { gpt: "ChatGPT", gemini: "Gemini", perplexity: "Perplexity" };
  return (
    <span
      style={{ position: "relative", display: "inline-flex", alignItems: "center", opacity: mentioned ? 1 : 0.25, cursor: "default" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <AIEngineLogo engine={engine} size={20} />
      <div style={{
        position: "absolute",
        bottom: "calc(100% + 8px)",
        right: "50%",
        transform: "translateX(50%)",
        background: "#1B1F23",
        color: "#fff",
        fontSize: 11,
        padding: "5px 10px",
        borderRadius: 5,
        whiteSpace: "nowrap",
        zIndex: 100,
        pointerEvents: "none",
        opacity: hover ? 1 : 0,
        transition: "opacity 150ms ease",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}>
        {mentioned ? `מוזכר ב-${engineNames[engine]}` : `לא מוזכר ב-${engineNames[engine]}`}
        <div style={{ position: "absolute", bottom: -4, right: "50%", transform: "translateX(50%)", width: 8, height: 8, background: "#1B1F23", rotate: "45deg", borderRadius: 1 }} />
      </div>
    </span>
  );
}

function MentionBadge({ mentioned }: { mentioned: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 500, padding: "2px 8px", borderRadius: 10, background: mentioned ? "#FFFFFF" : "#F9F9F9", color: mentioned ? "#10A37F" : "#727272", border: `1px solid ${mentioned ? "#10A37F" : "#DDDDDD"}` }}>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        {mentioned ? <path d="M20 6L9 17l-5-5" /> : <path d="M18 6L6 18M6 6l12 12" />}
      </svg>
      {mentioned ? "מוזכר" : "לא מוזכר"}
    </span>
  );
}

function HoverButton({ children, style, filled, onClick, href }: { children: React.ReactNode; style: React.CSSProperties; filled?: boolean; onClick?: (e: React.MouseEvent) => void; href?: string }) {
  const [hovered, setHovered] = useState(false);
  const hoverStyle: React.CSSProperties = filled
    ? { opacity: hovered ? 0.85 : 1 }
    : { background: hovered ? "#F9F9F9" : style.background || "#FFFFFF" };

  if (href) {
    return (
      <a
        href={href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ ...style, ...hoverStyle, transition: "all 150ms", textDecoration: "none" }}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ ...style, ...hoverStyle, transition: "all 150ms" }}
    >
      {children}
    </button>
  );
}

// ════════════════════════════════════════════════════════════
// MAIN PAGE
// ════════════════════════════════════════════════════════════

export default function ScanPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "queries" | "keywords" | "audiences" | "products" | "content">("overview");
  const [expandedQuery, setExpandedQuery] = useState<number | null>(null);
  const [fullAnswerView, setFullAnswerView] = useState<{ queryId: number; engine: "gpt" | "gemini" } | null>(null);
  const [queryFilter, setQueryFilter] = useState<"all" | "mentioned" | "missing" | "negative">("all");
  const [personaFilter, setPersonaFilter] = useState<string>("all");
  const [seoToggle, setSeoToggle] = useState(true);
  const [geoToggle, setGeoToggle] = useState(true);
  const [showPersonaForm, setShowPersonaForm] = useState(false);
  const [chartPeriod, setChartPeriod] = useState<"7" | "30" | "90">("30");
  const [productFilter, setProductFilter] = useState<"all" | "service" | "product">("all");
  const [contentQueue, setContentQueue] = useState<number[]>([]);

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

  const card: React.CSSProperties = { background: "#FFFFFF", border: "1px solid #BFBFBF", borderRadius: 10 };
  const sectionTitle: React.CSSProperties = { fontSize: 15, fontWeight: 600, color: "#000000", margin: 0 };
  const bodyText: React.CSSProperties = { fontSize: 14, color: "#333333" };
  const thinBorder = "1px solid #DDDDDD";

  // Reputation risk value
  const reputationValue = 100;
  const reputationColor = reputationValue < 80 ? "#DC2626" : "#000000";

  return (
    <div style={{ minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Inter', 'Heebo', sans-serif", display: "flex", flexDirection: "column" }} dir="rtl">

      {/* -- Sticky Header -- 3-column grid: actions | nav | logo -- */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.96)", borderBottom: "1px solid #BFBFBF" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 24px", height: 56, display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center" }}>
          {/* RIGHT in RTL (grid col 1) = Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, justifySelf: "start" }}>
            <HoverButton filled href="/new-scan" style={{ display: "inline-flex", alignItems: "center", padding: "8px 20px", background: "#000", color: "#fff", fontSize: 13, fontWeight: 600, borderRadius: 9, border: "1px solid #000" }}>
              סריקה חדשה
            </HoverButton>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#727272" }}>
              <span style={{ width: 8, height: 8, borderRadius: 4, background: "#10A37F", display: "inline-block" }} />
              <span>מחובר</span>
            </div>
          </div>

          {/* CENTER (grid col 2) = Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <a href="/" style={{ fontSize: 14, fontWeight: 400, color: "#727272", textDecoration: "none", transition: "all 150ms" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#000"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#727272"; }}>דשבורד</a>
            <a href="/scan" style={{ fontSize: 14, fontWeight: 600, color: "#000", textDecoration: "none" }}>סריקות</a>
            <a href="/scale-publish" style={{ fontSize: 14, fontWeight: 400, color: "#727272", textDecoration: "none", transition: "all 150ms" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#000"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#727272"; }}>ScalePublish</a>
            <a href="/editor" style={{ fontSize: 14, fontWeight: 400, color: "#727272", textDecoration: "none", transition: "all 150ms" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#000"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#727272"; }}>עורך תוכן</a>
            <a href="/roadmap" style={{ fontSize: 14, fontWeight: 400, color: "#727272", textDecoration: "none", transition: "all 150ms" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#000"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#727272"; }}>Roadmap</a>
          </nav>

          {/* LEFT in RTL (grid col 3) = Logo */}
          <div style={{ justifySelf: "end", direction: "ltr" }}>
            <svg width={150} height={30} viewBox="0 0 510 102" fill="none">
              <circle cx="51" cy="51" r="41" stroke="#ABABAB" strokeWidth="13" fill="none" />
              <circle cx="51" cy="51" r="41" stroke="#141414" strokeWidth="13" fill="none" strokeLinecap="round" strokeDasharray="180 78" />
              <g fill="#141414"><text x="120" y="66" fontFamily="'Inter', sans-serif" fontSize="52" fontWeight="600" letterSpacing="-2">Geoscale</text></g>
            </svg>
          </div>
        </div>
      </header>

      {/* -- Brand Header (centered like Ahrefs) -- */}
      <div style={{ background: "#FFFFFF", borderBottom: "1px solid #BFBFBF" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "20px 24px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <img src="https://www.google.com/s2/favicons?domain=all4horses.co.il&sz=64" alt="" width={36} height={36} style={{ borderRadius: 8, border: "1px solid #E5E5E5" }} />
              <div style={{ textAlign: "center" }}>
                <h1 style={{ fontSize: 22, fontWeight: 600, color: "#000000", margin: 0 }}>All4Horses</h1>
                <p style={{ fontSize: 13, color: "#727272", margin: "2px 0 0", direction: "ltr" }}>all4horses.co.il</p>
              </div>
              <ProgressRing percent={76} size={48} strokeWidth={4} />
            </div>
            <p style={{ fontSize: 12, color: "#999", margin: 0, textAlign: "center" }}>החברה המובילה לרכיבה טיפולית ופעילויות סוסים בישראל</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
              <HoverButton href="/" style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 16px", background: "#FFFFFF", color: "#333333", fontSize: 12, fontWeight: 500, border: "1px solid #BFBFBF", borderRadius: 8, cursor: "pointer" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                לוח בקרה
              </HoverButton>
              <HoverButton filled href="/new-scan" style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 16px", background: "#000000", color: "#FFFFFF", fontSize: 12, fontWeight: 600, border: "1px solid #000000", borderRadius: 8, cursor: "pointer" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                סריקה חדשה
              </HoverButton>
            </div>
          </div>
        </div>
      </div>

      {/* -- Tab Bar -- */}
      <div style={{ background: "#FFFFFF", borderBottom: "1px solid #BFBFBF" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", gap: 0 }}>
            {([
              { key: "overview" as const, label: "סקירה", iconPath: <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" /> },
              { key: "queries" as const, label: "שאילתות", iconPath: <><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></>, count: totalQueries },
              { key: "keywords" as const, label: "מילות מפתח", iconPath: <><path d="M15 7h3a5 5 0 015 5 5 5 0 01-5 5h-3m-6 0H6a5 5 0 01-5-5 5 5 0 015-5h3" /><path d="M8 12h8" /></>, count: 12 },
              { key: "audiences" as const, label: "קהלים", iconPath: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></>, count: PERSONAS.length },
              { key: "products" as const, label: "מוצרים / שירותים", iconPath: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></> },
              { key: "content" as const, label: "יצירת תוכן", iconPath: <><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></> },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", fontSize: 14,
                  fontWeight: activeTab === tab.key ? 600 : 400,
                  color: activeTab === tab.key ? "#000000" : "#727272",
                  background: "transparent", border: "none",
                  borderBottom: activeTab === tab.key ? "2px solid #000000" : "2px solid transparent",
                  marginBottom: -1, cursor: "pointer",
                  transition: "all 150ms",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{tab.iconPath}</svg>
                {tab.label}
                {tab.count !== undefined && (
                  <span style={{ fontSize: 11, padding: "1px 6px", borderRadius: 10, background: "#F9F9F9", color: "#727272", border: "1px solid #DDDDDD" }}>{tab.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* -- Main Content -- */}
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "24px 24px" }}>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* BIG TIME-SERIES CHART */}
            <div style={{ ...card, padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <h3 style={{ ...sectionTitle }}>שיעור אזכור לאורך זמן</h3>
                  <Tooltip text="מעקב אחר אחוז האזכורים של המותג במנועי AI לאורך זמן" />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                  {(["7", "30", "90"] as const).map((p) => (
                    <HoverButton
                      key={p}
                      onClick={() => setChartPeriod(p)}
                      style={{
                        padding: "6px 14px",
                        fontSize: 12,
                        fontWeight: chartPeriod === p ? 600 : 400,
                        background: chartPeriod === p ? "#000000" : "#FFFFFF",
                        color: chartPeriod === p ? "#FFFFFF" : "#333333",
                        border: chartPeriod === p ? "1px solid #000000" : "1px solid #BFBFBF",
                        borderRadius: p === "7" ? "0 9px 9px 0" : p === "90" ? "9px 0 0 9px" : "0",
                        cursor: "pointer",
                        marginRight: p !== "7" ? -1 : 0,
                      }}
                      filled={chartPeriod === p}
                    >
                      {p} ימים
                    </HoverButton>
                  ))}
                </div>
              </div>
              {/* Legend */}
              <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 12, height: 3, borderRadius: 2, background: "#10A37F" }} />
                  <span style={{ fontSize: 12, color: "#333333" }}>ChatGPT</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 12, height: 3, borderRadius: 2, background: "#4285F4" }} />
                  <span style={{ fontSize: 12, color: "#333333" }}>Gemini</span>
                </div>
              </div>
              <div style={{ height: 240 }}>
                <TimeSeriesChart period={chartPeriod} />
              </div>
            </div>

            {/* 4 Stat Cards — compact GA style */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {[
                { label: "שיעור אזכור", value: "76%", change: 4.2, unit: "%", invertColor: false },
                { label: "מיקום ממוצע", value: "9.7", change: -1.3, unit: "", invertColor: true },
                { label: "איכות ציטוט", value: "70%", change: -3.8, unit: "%", invertColor: false },
                { label: "סיכון מוניטין", value: `${reputationValue}%`, change: 0, unit: "%", invertColor: false },
              ].map((stat, i) => (
                <div key={i} style={{ ...card, padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: "#727272", fontWeight: 500 }}>{stat.label}</span>
                    <Tooltip text={METRIC_TOOLTIPS[stat.label] || ""} />
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontSize: 28, fontWeight: 700, color: stat.label === "סיכון מוניטין" ? reputationColor : "#000000", letterSpacing: "-1px" }}>{stat.value}</span>
                    {stat.change !== 0 && <ChangeIndicator value={stat.change} unit={stat.unit} invertColor={stat.invertColor} />}
                  </div>
                </div>
              ))}
            </div>

            {/* GPT vs Gemini */}
            <div style={{ ...card, padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <h3 style={{ ...sectionTitle }}>השוואת מנועי AI</h3>
                <Tooltip text="השוואת אחוזי האזכור של המותג בין ChatGPT ל-Google Gemini" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                <div style={{ border: thinBorder, borderRadius: 10, padding: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <img src="/logos/chatgpt.svg" width={18} height={18} alt="ChatGPT" style={{ display: "inline-block" }} />
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#000000" }}>ChatGPT (GPT-4o)</span>
                    </div>
                    <span style={{ fontSize: 20, fontWeight: 600, color: "#10A37F" }}>57%</span>
                  </div>
                  <div style={{ width: "100%", height: 6, borderRadius: 3, background: "#F9F9F9", overflow: "hidden" }}>
                    <div style={{ width: "57%", height: "100%", borderRadius: 3, background: "#10A37F", transition: "width 1s ease" }} />
                  </div>
                  <p style={{ fontSize: 12, color: "#727272", marginTop: 8 }}>{gptMentioned} / {totalQueries} שאילתות מוזכר</p>
                </div>
                <div style={{ border: thinBorder, borderRadius: 10, padding: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <img src="/logos/gemini.svg" width={18} height={18} alt="Gemini" style={{ display: "inline-block" }} />
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#000000" }}>Google Gemini</span>
                    </div>
                    <span style={{ fontSize: 20, fontWeight: 600, color: "#4285F4" }}>73%</span>
                  </div>
                  <div style={{ width: "100%", height: 6, borderRadius: 3, background: "#F9F9F9", overflow: "hidden" }}>
                    <div style={{ width: "73%", height: "100%", borderRadius: 3, background: "#4285F4", transition: "width 1s ease" }} />
                  </div>
                  <p style={{ fontSize: 12, color: "#727272", marginTop: 8 }}>{geminiMentioned} / {totalQueries} שאילתות מוזכר</p>
                </div>
              </div>
            </div>

            {/* Customer Journey -- compact cards */}
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${JOURNEY_STAGES.length}, 1fr)`, gap: 12 }}>
              {JOURNEY_STAGES.map((stage, i) => {
                const journeyTooltips: Record<string, string> = {
                  "חשיפה": "אחוז הנוכחות בשאילתות גילוי ראשוני של המותג",
                  "מחקר": "אחוז הנוכחות בשאילתות מחקר והשוואה",
                  "החלטה": "אחוז הנוכחות בשאילתות שלב קבלת ההחלטה",
                  "תמיכה": "אחוז הנוכחות בשאילתות שירות ותמיכה",
                  "מוניטין": "אחוז הנוכחות בשאילתות חוות דעת וביקורות",
                };
                return (
                  <div key={i} style={{ ...card, padding: 16, textAlign: "center" }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: stage.percent >= 80 ? "#10A37F" : "#000000", marginBottom: 4 }}>{stage.percent}%</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, fontSize: 13, fontWeight: 600, color: "#000000", marginBottom: 2 }}>
                      {stage.name}
                      <Tooltip text={journeyTooltips[stage.name] || "שלב במסע הלקוח"} />
                    </div>
                    <div style={{ fontSize: 12, color: "#727272" }}>{stage.count} שאילתות</div>
                  </div>
                );
              })}
            </div>

            {/* Persona + Competitors */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ ...card, padding: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <h3 style={{ ...sectionTitle }}>פרסונה שזוהתה</h3>
                  <Tooltip text="פרופיל קהל היעד שזוהה מתוך ניתוח השאילתות ותשובות מנועי AI" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { label: "קהל יעד:", value: "הורים לילדים עם צרכים מיוחדים, מטפלים, מורים לחינוך מיוחד ובני נוער" },
                    { label: "תעשייה:", value: "רכיבה טיפולית, חוות סוסים, טיפול משלים" },
                    { label: "מיקום גיאוגרפי:", value: "ישראל" },
                    { label: "ערך ייחודי:", value: "שילוב רכיבה טיפולית מקצועית עם גישה אישית ומחקרית" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 500, flexShrink: 0, color: "#727272" }}>{item.label}</span>
                      <span style={{ ...bodyText }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ ...card, padding: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <h3 style={{ ...sectionTitle }}>מתחרים</h3>
                  <Tooltip text="ציון הנוכחות של מתחרים מובילים לעומת המותג שלך" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {COMPETITORS.map((comp, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 6, border: "1px solid #DDDDDD", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "#333333", flexShrink: 0 }}>{i + 1}</div>
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${comp.domain}&sz=64`}
                        alt=""
                        width={24}
                        height={24}
                        style={{ borderRadius: 5, flexShrink: 0, border: "1px solid #F0F0F0", background: "#fff" }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 500, color: "#333333" }}>{comp.name}</div>
                        <div style={{ fontSize: 11, color: "#A2A9B0" }}>{comp.domain}</div>
                      </div>
                      <div style={{ width: 80, height: 6, borderRadius: 3, overflow: "hidden", background: "#F9F9F9" }}>
                        <div style={{ width: `${comp.score}%`, height: "100%", borderRadius: 3, background: "#10A37F" }} />
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, width: 36, textAlign: "left", color: "#000000" }}>{comp.score}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sentiment + Citation Quality */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ ...card, padding: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "#000000", margin: 0 }}>סנטימנט</h3>
                  <Tooltip text="הטון הכללי שבו מנועי AI מציגים את המותג שלך - חיובי, ניטרלי או שלילי" />
                </div>
                <p style={{ fontSize: 12, color: "#727272", margin: "0 0 16px" }}>איך ה-AI מדבר עליכם</p>
                <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                  <DonutChart size={110} strokeWidth={16} data={[{ label: "חיובי", value: 80, color: "#10A37F" }, { label: "ניטרלי", value: 20, color: "#BFBFBF" }]} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 10, height: 10, borderRadius: 5, background: "#10A37F" }} /><span style={{ fontSize: 13, color: "#333333" }}>חיובי</span><span style={{ fontSize: 13, fontWeight: 600, color: "#000000" }}>80%</span></div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 10, height: 10, borderRadius: 5, background: "#BFBFBF" }} /><span style={{ fontSize: 13, color: "#333333" }}>ניטרלי</span><span style={{ fontSize: 13, fontWeight: 600, color: "#000000" }}>20%</span></div>
                  </div>
                </div>
              </div>
              <div style={{ ...card, padding: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "#000000", margin: 0 }}>איכות ציטוט</h3>
                  <Tooltip text="עד כמה מנועי AI מצטטים את המותג בצורה מדויקת ומלאה" />
                </div>
                <p style={{ fontSize: 12, color: "#727272", margin: "0 0 16px" }}>כמה טוב ה-AI מקשר אליכם</p>
                <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                  <DonutChart size={110} strokeWidth={16} data={[{ label: "גבוה", value: 35, color: "#10A37F" }, { label: "בינוני", value: 30, color: "#BFBFBF" }, { label: "נמוך", value: 35, color: "#000000" }]} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 10, height: 10, borderRadius: 5, background: "#10A37F" }} /><span style={{ fontSize: 13, color: "#333333" }}>גבוה</span><span style={{ fontSize: 13, fontWeight: 600, color: "#000000" }}>35%</span></div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 10, height: 10, borderRadius: 5, background: "#BFBFBF" }} /><span style={{ fontSize: 13, color: "#333333" }}>בינוני</span><span style={{ fontSize: 13, fontWeight: 600, color: "#000000" }}>30%</span></div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 10, height: 10, borderRadius: 5, background: "#000000" }} /><span style={{ fontSize: 13, color: "#333333" }}>נמוך</span><span style={{ fontSize: 13, fontWeight: 600, color: "#000000" }}>35%</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Signals */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ ...card, padding: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10A37F" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "#000000", margin: 0 }}>מה עבד</h3>
                  <Tooltip text="נקודות חוזק - תחומים שבהם המותג מקבל אזכור חיובי במנועי AI" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {POSITIVE_SIGNALS.map((signal, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <div style={{ width: 5, height: 5, borderRadius: 3, marginTop: 7, flexShrink: 0, background: "#10A37F" }} />
                      <span style={{ ...bodyText }}>{signal}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* "מה חסר" styled as RED ALERTS */}
              <div style={{ ...card, padding: 24, background: "#DC262608", borderColor: "#BFBFBF" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "#DC2626", margin: 0 }}>מה חסר</h3>
                  <Tooltip text="התראות סיכון - תחומים שבהם חסר אזכור ויש סיכון מוניטיני" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {NEGATIVE_SIGNALS.map((signal, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 12px", background: "#DC262608", borderRight: "3px solid #DC2626", borderRadius: 8 }}>
                      <div style={{ width: 6, height: 6, borderRadius: 3, marginTop: 6, flexShrink: 0, background: "#DC2626" }} />
                      <span style={{ ...bodyText }}>{signal}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI INSIGHTS (1.11) */}
            <div style={{ ...card, padding: 24, background: "#FAFBFC", borderRight: "4px solid #10A37F" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10A37F" strokeWidth="2"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#000", margin: 0 }}>תובנות AI</h3>
                <Tooltip text="תובנות שנוצרו אוטומטית מניתוח הסריקה האחרונה" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { type: "warning", text: "שים לב — יש ירידה ב-3 ביטויים מרכזיים (\"שיעורי רכיבה למתחילים\", \"ציוד רכיבה לילדים\", \"חוות סוסים עם לינה\"). מומלץ לחזק את התוכן בנושאים אלה." },
                  { type: "opportunity", text: "יש לך 4 שאילתות שאתה לא מופיע בטופ 5 — צור תכנים ייעודיים לשאילתות: \"מענק סל שיקום לרכיבה טיפולית\", \"חוות סוסים ליד ירושלים\", \"חוג רכיבה שבועי\", \"רכיבה טיפולית עלויות\"." },
                  { type: "insight", text: "יש עלייה בגרף GEO (+4.2%) שמקבילה ליציבות ב-SEO — תשקיע ב-SEO כדי לקדם GEO, כי GEO תלוי ב-SEO. ביטויים חזקים ב-SEO מגדילים את הסיכוי לאזכור ב-AI." },
                  { type: "positive", text: "הציון שלך ב-Gemini (73%) גבוה מהממוצע בתחום (52%). המשך בפעילות התוכן הנוכחית — זה עובד." },
                ].map((insight, i) => {
                  const colors = { warning: { bg: "#FEF3C7", border: "#F59E0B", icon: "⚠" }, opportunity: { bg: "#DBEAFE", border: "#3B82F6", icon: "🎯" }, insight: { bg: "#F3E8FF", border: "#8B5CF6", icon: "💡" }, positive: { bg: "#D1FAE5", border: "#10B981", icon: "✓" } };
                  const c = colors[insight.type as keyof typeof colors];
                  return (
                    <div key={i} style={{ padding: "10px 14px", background: c.bg + "40", borderRight: `3px solid ${c.border}`, borderRadius: 8, fontSize: 13, lineHeight: 1.6, color: "#333" }}>
                      {insight.text}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI SUMMARY (1.12) */}
            <div style={{ ...card, padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#000", margin: 0 }}>AI Summary — מה המנועים אומרים עליכם</h3>
                <Tooltip text="סיכום התשובות שמנועי AI מחזירים כשנשאלים על המותג שלך" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ border: thinBorder, borderRadius: 10, padding: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <AIEngineLogo engine="gpt" size={18} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#10A37F" }}>ChatGPT Summary</span>
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: "#333", margin: 0 }}>
                    &ldquo;All4Horses היא חוות סוסים מובילה בישראל, המתמחה ברכיבה טיפולית לילדים עם צרכים מיוחדים. החווה מציעה תוכניות מותאמות אישית לילדים עם ADHD ואוטיזם, בהנחיית צוות מטפלים מוסמכים. ציון 4.8/5 בביקורות גוגל.&rdquo;
                  </p>
                </div>
                <div style={{ border: thinBorder, borderRadius: 10, padding: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <AIEngineLogo engine="gemini" size={18} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#4285F4" }}>Gemini Summary</span>
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: "#333", margin: 0 }}>
                    &ldquo;All4Horses מספקת שירותי רכיבה טיפולית ופעילויות סוסים באזור המרכז. החווה ידועה בגישה המקצועית שלה ובשילוב מחקר מדעי בתוכניות הטיפול. מציעה שיעורי רכיבה, טיולים, קייטנות וימי גיבוש.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* ── COMPETITORS ── */}
            <div style={{ ...card, padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <h3 style={{ ...sectionTitle }}>מתחרים</h3>
                  <Tooltip text="מתחרים עיקריים שזוהו לפי חפיפה בשאילתות ונוכחות במנועי AI" />
                </div>
              </div>
              <table style={{ width: "100%", fontSize: 14, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #BFBFBF" }}>
                    <th style={{ textAlign: "right", padding: "8px 12px", fontWeight: 600, color: "#727272", fontSize: 13 }}>מתחרה</th>
                    <th style={{ textAlign: "right", padding: "8px 12px", fontWeight: 600, color: "#727272", fontSize: 13 }}>ציון GEO</th>
                    <th style={{ textAlign: "right", padding: "8px 12px", fontWeight: 600, color: "#727272", fontSize: 13 }}>חפיפת שאילתות</th>
                    <th style={{ textAlign: "center", padding: "8px 12px", fontWeight: 600, color: "#727272", fontSize: 13 }}><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><AIEngineLogo engine="gpt" size={14} /> <AIEngineLogo engine="gemini" size={14} /></span></th>
                    <th style={{ textAlign: "right", padding: "8px 12px", fontWeight: 600, color: "#727272", fontSize: 13 }}>מגמה</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "סוסים בגליל", domain: "susim-galil.co.il", geo: 68, overlap: 14, gpt: true, gemini: true, trend: 3.2 },
                    { name: "חוות רכיבה ישראל", domain: "ride-il.co.il", geo: 61, overlap: 11, gpt: true, gemini: false, trend: -2.1 },
                    { name: "טיפול בסוסים מרכז", domain: "horse-therapy.co.il", geo: 55, overlap: 9, gpt: false, gemini: true, trend: 1.8 },
                    { name: "רכיבה ספורטיבית IL", domain: "sport-ride.co.il", geo: 42, overlap: 7, gpt: false, gemini: false, trend: -4.5 },
                  ].map((c, i) => (
                    <tr key={i} style={{ borderBottom: thinBorder }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F9F9F9"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#FFFFFF"; }}>
                      <td style={{ padding: "10px 12px" }}>
                        <div>
                          <span style={{ fontWeight: 500, color: "#000" }}>{c.name}</span>
                          <span style={{ display: "block", fontSize: 11, color: "#999", direction: "ltr" as const }}>{c.domain}</span>
                        </div>
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: c.geo >= 60 ? "#10A37F" : "#000" }}>{c.geo}%</span>
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        <span style={{ fontSize: 13, color: "#333" }}>{c.overlap} שאילתות</span>
                      </td>
                      <td style={{ padding: "10px 12px", textAlign: "center" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                          <MentionIcon mentioned={c.gpt} engine="gpt" />
                          <MentionIcon mentioned={c.gemini} engine="gemini" />
                        </span>
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        <ChangeIndicator value={c.trend} unit="%" invertColor={false} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* SEO + GEO */}
            <div style={{ ...card, padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "#000000", margin: 0 }}>קשר בין SEO ל-GEO</h3>
                  <Tooltip text="הקשר בין ביצועי SEO אורגני לנוכחות במנועי AI (GEO)" />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 500, color: "#333333" }}>SEO</span>
                    <button onClick={() => setSeoToggle(!seoToggle)} style={{ position: "relative", width: 36, height: 20, borderRadius: 10, border: "1px solid #BFBFBF", background: seoToggle ? "#10A37F" : "#F9F9F9", cursor: "pointer", transition: "background 0.3s ease" }}>
                      <div style={{ position: "absolute", width: 16, height: 16, borderRadius: 8, background: "#FFFFFF", top: 1, left: seoToggle ? 17 : 1, transition: "left 0.3s ease", border: "1px solid #DDDDDD" }} />
                    </button>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 500, color: "#333333" }}>GEO</span>
                    <button onClick={() => setGeoToggle(!geoToggle)} style={{ position: "relative", width: 36, height: 20, borderRadius: 10, border: "1px solid #BFBFBF", background: geoToggle ? "#10A37F" : "#F9F9F9", cursor: "pointer", transition: "background 0.3s ease" }}>
                      <div style={{ position: "absolute", width: 16, height: 16, borderRadius: 8, background: "#FFFFFF", top: 1, left: geoToggle ? 17 : 1, transition: "left 0.3s ease", border: "1px solid #DDDDDD" }} />
                    </button>
                  </div>
                </div>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", fontSize: 14, borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #BFBFBF" }}>
                      <th style={{ textAlign: "right", padding: "10px 12px", fontWeight: 600, color: "#727272", fontSize: 13 }}>מילת מפתח</th>
                      {seoToggle && <><th style={{ textAlign: "right", padding: "10px 12px", fontWeight: 600, color: "#727272", fontSize: 13 }}>נפח חיפוש</th><th style={{ textAlign: "right", padding: "10px 12px", fontWeight: 600, color: "#727272", fontSize: 13 }}>קושי</th></>}
                      {geoToggle && <th style={{ textAlign: "right", padding: "10px 12px", fontWeight: 600, color: "#727272", fontSize: 13 }}>שאילתות קשורות</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {SEO_GEO_DATA.map((row, i) => (
                      <tr key={i} style={{ borderBottom: thinBorder }}>
                        <td style={{ padding: "10px 12px" }}><span style={{ fontWeight: 500, color: "#000000" }}>{row.keyword}</span></td>
                        {seoToggle && <>
                          <td style={{ padding: "10px 12px" }}><span style={{ fontSize: 14, fontWeight: 500, color: "#333333" }}>{row.volume.toLocaleString()}</span></td>
                          <td style={{ padding: "10px 12px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div style={{ width: 40, height: 4, borderRadius: 2, overflow: "hidden", background: "#F9F9F9" }}><div style={{ width: `${row.difficulty}%`, height: "100%", borderRadius: 2, background: "#10A37F" }} /></div>
                              <span style={{ fontSize: 12, color: "#333333" }}>{row.difficulty}</span>
                            </div>
                          </td>
                        </>}
                        {geoToggle && <td style={{ padding: "10px 12px" }}>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {row.relatedQueries.map((q, j) => (<span key={j} style={{ display: "inline-flex", fontSize: 12, padding: "3px 8px", borderRadius: 7, border: thinBorder, background: "#F9F9F9", color: "#333333" }}>{q}</span>))}
                          </div>
                        </td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top 5 Queries */}
            <div style={{ ...card, padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "#000000", margin: 0 }}>5 שאילתות מובילות</h3>
                  <Tooltip text="השאילתות עם הנוכחות הגבוהה ביותר של המותג במנועי AI" />
                </div>
                <HoverButton onClick={() => setActiveTab("queries")} style={{ fontSize: 13, fontWeight: 500, color: "#10A37F", background: "transparent", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                  הצג את כל {totalQueries} השאילתות
                </HoverButton>
              </div>
              <table style={{ width: "100%", fontSize: 14, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #BFBFBF" }}>
                    <th style={{ textAlign: "right", padding: "8px 10px", fontWeight: 600, color: "#727272", fontSize: 13 }}><span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>שאילתה <Tooltip text="השאילתה שנבדקה מול מנועי AI" /></span></th>
                    <th style={{ textAlign: "right", padding: "8px 10px", fontWeight: 600, color: "#727272", fontSize: 13 }}><span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>פרסונה <Tooltip text="פרופיל קהל היעד שהשאילתה שייכת אליו" /></span></th>
                    <th style={{ textAlign: "right", padding: "8px 10px", fontWeight: 600, color: "#727272", fontSize: 13 }}><span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>תהליך החיפוש של הלקוח <Tooltip text="השלב במסע הלקוח: חשיפה, מחקר, החלטה, תמיכה" /></span></th>
                    <th style={{ textAlign: "center", padding: "8px 10px", fontWeight: 600, color: "#727272", fontSize: 13 }}><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><AIEngineLogo engine="gpt" size={16} /> <AIEngineLogo engine="gemini" size={16} /> <AIEngineLogo engine="perplexity" size={16} /></span></th>
                  </tr>
                </thead>
                <tbody>
                  {TOP_5_QUERIES.map((q) => (
                    <tr key={q.id} style={{ borderBottom: thinBorder }}>
                      <td style={{ padding: "10px 10px", fontWeight: 500, color: "#333333" }}>{q.text}</td>
                      <td style={{ padding: "10px 10px" }}><PersonaBadge personaId={q.persona} /></td>
                      <td style={{ padding: "10px 10px" }}><StageBadge stage={q.stage} /></td>
                      <td style={{ padding: "10px 10px", textAlign: "center" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                          <MentionIcon mentioned={q.gpt} engine="gpt" />
                          <MentionIcon mentioned={q.gemini} engine="gemini" />
                          <MentionIcon mentioned={false} engine="perplexity" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: QUERIES */}
        {activeTab === "queries" && (
          <div>
            <div style={{ ...card, padding: 16, marginBottom: 16 }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {([{ key: "all" as const, label: "הכל" }, { key: "mentioned" as const, label: "מוזכר" }, { key: "missing" as const, label: "חסר" }, { key: "negative" as const, label: "שלילי" }]).map((f) => (
                    <HoverButton
                      key={f.key}
                      onClick={() => setQueryFilter(f.key)}
                      filled={queryFilter === f.key}
                      style={{
                        display: "flex", alignItems: "center", gap: 4, padding: "5px 12px", borderRadius: 9, fontSize: 12,
                        fontWeight: queryFilter === f.key ? 600 : 400,
                        background: queryFilter === f.key ? "#000000" : "#FFFFFF",
                        color: queryFilter === f.key ? "#FFFFFF" : "#333333",
                        border: queryFilter === f.key ? "1px solid #000000" : "1px solid #BFBFBF",
                        cursor: "pointer",
                      }}
                    >
                      {f.label} <span style={{ opacity: 0.7 }}>({filterCounts[f.key]})</span>
                    </HoverButton>
                  ))}
                </div>
                <div style={{ width: 1, height: 24, background: "#BFBFBF" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <HoverButton
                    onClick={() => setPersonaFilter("all")}
                    filled={personaFilter === "all"}
                    style={{
                      padding: "5px 12px", borderRadius: 9, fontSize: 12,
                      fontWeight: personaFilter === "all" ? 600 : 400,
                      background: personaFilter === "all" ? "#000000" : "#FFFFFF",
                      color: personaFilter === "all" ? "#FFFFFF" : "#333333",
                      border: personaFilter === "all" ? "1px solid #000000" : "1px solid #BFBFBF",
                      cursor: "pointer",
                    }}
                  >
                    כל הפרסונות
                  </HoverButton>
                  {PERSONAS.map((p) => (
                    <HoverButton
                      key={p.id}
                      onClick={() => setPersonaFilter(p.id)}
                      filled={personaFilter === p.id}
                      style={{
                        padding: "5px 12px", borderRadius: 9, fontSize: 12,
                        fontWeight: personaFilter === p.id ? 600 : 400,
                        background: personaFilter === p.id ? "#000000" : "#FFFFFF",
                        color: personaFilter === p.id ? "#FFFFFF" : "#333333",
                        border: personaFilter === p.id ? "1px solid #000000" : "1px solid #BFBFBF",
                        cursor: "pointer",
                      }}
                    >
                      {p.name} - {p.role}
                    </HoverButton>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ ...card, overflow: "hidden" }}>
              <table style={{ width: "100%", fontSize: 14, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#F9F9F9", borderBottom: "1px solid #BFBFBF" }}>
                    <th style={{ textAlign: "right", padding: "10px 14px", fontWeight: 600, color: "#727272", fontSize: 13 }}>#</th>
                    <th style={{ textAlign: "right", padding: "10px 14px", fontWeight: 600, color: "#727272", fontSize: 13 }}>שאילתה</th>
                    <th style={{ textAlign: "right", padding: "10px 14px", fontWeight: 600, color: "#727272", fontSize: 13 }}>פרסונה</th>
                    <th style={{ textAlign: "right", padding: "10px 14px", fontWeight: 600, color: "#727272", fontSize: 13 }}>תהליך החיפוש של הלקוח</th>
                    <th style={{ textAlign: "center", padding: "10px 14px", fontWeight: 600, color: "#727272", fontSize: 13 }}><span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><AIEngineLogo engine="gpt" size={16} /> <AIEngineLogo engine="gemini" size={16} /> <AIEngineLogo engine="perplexity" size={16} /></span></th>
                    <th style={{ textAlign: "center", padding: "10px 14px", width: 40 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQueries.map((q) => (
                    <React.Fragment key={q.id}>
                      <tr onClick={() => setExpandedQuery(expandedQuery === q.id ? null : q.id)} style={{ borderBottom: expandedQuery === q.id ? "none" : thinBorder, cursor: "pointer", transition: "all 150ms" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F9F9F9"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#FFFFFF"; }}>
                        <td style={{ padding: "10px 14px", fontWeight: 500, color: "#A2A9B0" }}>{q.id}</td>
                        <td style={{ padding: "10px 14px", fontWeight: 500, color: "#333333", maxWidth: 320 }}>{q.text}</td>
                        <td style={{ padding: "10px 14px" }}><PersonaBadge personaId={q.persona} /></td>
                        <td style={{ padding: "10px 14px" }}><StageBadge stage={q.stage} /></td>
                        <td style={{ padding: "10px 14px", textAlign: "center" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                            <MentionIcon mentioned={q.gpt} engine="gpt" />
                            <MentionIcon mentioned={q.gemini} engine="gemini" />
                            <MentionIcon mentioned={false} engine="perplexity" />
                          </span>
                        </td>
                        <td style={{ padding: "10px 14px", textAlign: "center" }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#727272" strokeWidth="2" style={{ display: "inline-block", transform: expandedQuery === q.id ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}><path d="M6 9l6 6 6-6" /></svg>
                        </td>
                      </tr>
                      {expandedQuery === q.id && (
                        <tr key={`${q.id}-detail`}>
                          <td colSpan={6} style={{ padding: "0 14px 14px" }}>
                            <div style={{ borderRadius: 10, padding: 16, background: "#F9F9F9", border: thinBorder, display: "flex", flexDirection: "column", gap: 12 }}>
                              {/* ChatGPT Card */}
                              <div style={{ borderRadius: 10, padding: 14, background: "#FFFFFF", border: thinBorder }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                  <img src="/logos/chatgpt.svg" width={14} height={14} alt="ChatGPT" style={{ display: "inline-block" }} />
                                  <span style={{ fontSize: 12, fontWeight: 600, color: "#10A37F" }}>ChatGPT (GPT-4o)</span>
                                  <MentionBadge mentioned={q.gpt} />
                                </div>
                                {fullAnswerView?.queryId === q.id && fullAnswerView?.engine === "gpt" ? (
                                  <div>
                                    <div style={{ fontSize: 13, lineHeight: 1.8, color: "#333333", whiteSpace: "pre-line" }}>{(q as any).gptFull || q.gptSnippet}</div>
                                    <HoverButton onClick={(e) => { e.stopPropagation(); setFullAnswerView(null); }} style={{ marginTop: 10, padding: "4px 12px", fontSize: 12, fontWeight: 500, color: "#10A37F", background: "none", border: "1px solid #10A37F", borderRadius: 9, cursor: "pointer" }}>
                                      הסתר תשובה מלאה
                                    </HoverButton>
                                  </div>
                                ) : (
                                  <div>
                                    <p style={{ fontSize: 13, lineHeight: 1.6, color: "#333333", margin: 0 }}>{q.gptSnippet}</p>
                                    {(q as any).gptFull && (
                                      <HoverButton onClick={(e) => { e.stopPropagation(); setFullAnswerView({ queryId: q.id, engine: "gpt" }); }} style={{ marginTop: 8, padding: "4px 12px", fontSize: 12, fontWeight: 500, color: "#10A37F", background: "none", border: "1px solid #10A37F", borderRadius: 9, cursor: "pointer" }}>
                                        הצג תשובה מלאה
                                      </HoverButton>
                                    )}
                                  </div>
                                )}
                              </div>
                              {/* Gemini Card */}
                              <div style={{ borderRadius: 10, padding: 14, background: "#FFFFFF", border: thinBorder }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                  <img src="/logos/gemini.svg" width={14} height={14} alt="Gemini" style={{ display: "inline-block" }} />
                                  <span style={{ fontSize: 12, fontWeight: 600, color: "#4285F4" }}>Google Gemini</span>
                                  <MentionBadge mentioned={q.gemini} />
                                </div>
                                {fullAnswerView?.queryId === q.id && fullAnswerView?.engine === "gemini" ? (
                                  <div>
                                    <div style={{ fontSize: 13, lineHeight: 1.8, color: "#333333", whiteSpace: "pre-line" }}>{(q as any).geminiFull || q.geminiSnippet}</div>
                                    <HoverButton onClick={(e) => { e.stopPropagation(); setFullAnswerView(null); }} style={{ marginTop: 10, padding: "4px 12px", fontSize: 12, fontWeight: 500, color: "#4285F4", background: "none", border: "1px solid #4285F4", borderRadius: 9, cursor: "pointer" }}>
                                      הסתר תשובה מלאה
                                    </HoverButton>
                                  </div>
                                ) : (
                                  <div>
                                    <p style={{ fontSize: 13, lineHeight: 1.6, color: "#333333", margin: 0 }}>{q.geminiSnippet}</p>
                                    {(q as any).geminiFull && (
                                      <HoverButton onClick={(e) => { e.stopPropagation(); setFullAnswerView({ queryId: q.id, engine: "gemini" }); }} style={{ marginTop: 8, padding: "4px 12px", fontSize: 12, fontWeight: 500, color: "#4285F4", background: "none", border: "1px solid #4285F4", borderRadius: 9, cursor: "pointer" }}>
                                        הצג תשובה מלאה
                                      </HoverButton>
                                    )}
                                  </div>
                                )}
                              </div>

                              {/* ── Generate Content Action ── */}
                              <div style={{ borderRadius: 10, padding: 14, background: "#FFFFFF", border: "1px solid #10A37F40" }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10A37F" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                                    <div>
                                      <span style={{ fontSize: 13, fontWeight: 600, color: "#000" }}>יצירת תוכן GEO עבור שאילתה זו</span>
                                      <p style={{ fontSize: 11, color: "#727272", margin: "2px 0 0" }}>צור מאמר אופטימיזלי עם פורמט GEO כדי להופיע בתשובות AI</p>
                                    </div>
                                  </div>
                                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    {contentQueue.includes(q.id) ? (
                                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <span style={{ fontSize: 11, fontWeight: 600, color: "#10A37F", padding: "4px 12px", background: "#10A37F15", borderRadius: 20 }}>✓ נוסף לתור יצירת תוכן</span>
                                        <HoverButton onClick={(e) => { e.stopPropagation(); window.location.href = "/editor"; }} style={{ padding: "6px 14px", fontSize: 12, fontWeight: 600, color: "#fff", background: "#000", border: "1px solid #000", borderRadius: 8, cursor: "pointer" }}>
                                          ערוך בעורך תוכן
                                        </HoverButton>
                                      </div>
                                    ) : (
                                      <HoverButton filled onClick={(e) => { e.stopPropagation(); setContentQueue([...contentQueue, q.id]); }} style={{ padding: "6px 14px", fontSize: 12, fontWeight: 600, color: "#fff", background: "#10A37F", border: "1px solid #10A37F", borderRadius: 8, cursor: "pointer" }}>
                                        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
                                          צור תוכן
                                        </span>
                                      </HoverButton>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #BFBFBF", background: "#F9F9F9" }}>
                <span style={{ fontSize: 12, color: "#727272" }}>מציג {filteredQueries.length} מתוך {totalQueries} שאילתות</span>
                <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 12 }}>
                  <span style={{ color: "#10A37F" }}>מוזכר: {filterCounts.mentioned}</span>
                  <span style={{ color: "#000000" }}>חסר: {filterCounts.missing}</span>
                  <span style={{ color: "#727272" }}>שלילי: 0</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: KEYWORDS (SEO) */}
        {activeTab === "keywords" && (
          <div>
            <div style={{ ...card, padding: "14px 20px", marginBottom: 16, background: "#F9FAFB" }}>
              <p style={{ fontSize: 13, color: "#333", margin: 0 }}>
                <span style={{ fontWeight: 600 }}>מילות מפתח SEO</span> — הביטויים שבהם All4Horses מדורגת בגוגל, כולל הקשר למנועי AI.
                <span style={{ display: "block", fontSize: 12, color: "#727272", marginTop: 4 }}>
                  שיפור בדירוגי SEO משפיע ישירות על הנוכחות במנועי AI (GEO).
                </span>
              </p>
            </div>

            <div style={{ ...card, overflow: "hidden" }}>
              <table style={{ width: "100%", fontSize: 14, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#F9F9F9", borderBottom: "1px solid #BFBFBF" }}>
                    <th style={{ textAlign: "right", padding: "10px 14px", fontWeight: 600, color: "#727272", fontSize: 13 }}>#</th>
                    <th style={{ textAlign: "right", padding: "10px 14px", fontWeight: 600, color: "#727272", fontSize: 13 }}>מילת מפתח</th>
                    <th style={{ textAlign: "right", padding: "10px 14px", fontWeight: 600, color: "#727272", fontSize: 13 }}>דירוג</th>
                    <th style={{ textAlign: "right", padding: "10px 14px", fontWeight: 600, color: "#727272", fontSize: 13 }}>שינוי</th>
                    <th style={{ textAlign: "right", padding: "10px 14px", fontWeight: 600, color: "#727272", fontSize: 13 }}>נפח חודשי</th>
                    <th style={{ textAlign: "right", padding: "10px 14px", fontWeight: 600, color: "#727272", fontSize: 13 }}>קושי</th>
                    <th style={{ textAlign: "center", padding: "10px 14px", fontWeight: 600, color: "#727272", fontSize: 13 }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><AIEngineLogo engine="gpt" size={14} /> <AIEngineLogo engine="gemini" size={14} /></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { kw: "רכיבה טיפולית", rank: 3, change: 2, vol: 2400, diff: 35, gpt: true, gemini: true },
                    { kw: "חוות סוסים מרכז", rank: 5, change: -1, vol: 1800, diff: 42, gpt: true, gemini: true },
                    { kw: "רכיבה טיפולית ADHD", rank: 2, change: 3, vol: 880, diff: 28, gpt: true, gemini: true },
                    { kw: "שיעורי רכיבה על סוסים", rank: 7, change: 0, vol: 1200, diff: 38, gpt: false, gemini: true },
                    { kw: "טיפול בעזרת סוסים", rank: 4, change: 5, vol: 720, diff: 31, gpt: true, gemini: false },
                    { kw: "חוות סוסים ילדים", rank: 8, change: -3, vol: 960, diff: 33, gpt: false, gemini: true },
                    { kw: "רכיבה ספורטיבית ישראל", rank: 12, change: -2, vol: 590, diff: 45, gpt: false, gemini: false },
                    { kw: "קייטנת סוסים", rank: 6, change: 4, vol: 1100, diff: 29, gpt: true, gemini: true },
                    { kw: "סוסים טיפוליים ילדים אוטיזם", rank: 1, change: 1, vol: 480, diff: 22, gpt: true, gemini: true },
                    { kw: "טיולי סוסים גיבוש", rank: 9, change: 0, vol: 640, diff: 36, gpt: true, gemini: false },
                    { kw: "חווית סוסים יום הולדת", rank: 15, change: -5, vol: 520, diff: 25, gpt: false, gemini: false },
                    { kw: "all4horses ביקורות", rank: 1, change: 0, vol: 110, diff: 8, gpt: true, gemini: true },
                  ].map((kw, i) => (
                    <tr key={i} style={{ borderBottom: thinBorder }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F9F9F9"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#FFFFFF"; }}>
                      <td style={{ padding: "10px 14px", fontWeight: 500, color: "#A2A9B0" }}>{i + 1}</td>
                      <td style={{ padding: "10px 14px", fontWeight: 500, color: "#333" }}>{kw.kw}</td>
                      <td style={{ padding: "10px 14px" }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: kw.rank <= 3 ? "#10A37F" : kw.rank <= 10 ? "#000" : "#DC2626" }}>{kw.rank}</span>
                      </td>
                      <td style={{ padding: "10px 14px" }}>
                        {kw.change !== 0 ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: kw.change > 0 ? "#10A37F" : "#DC2626" }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <path d={kw.change > 0 ? "M12 19V5M5 12l7-7 7 7" : "M12 5v14M5 12l7 7 7-7"} />
                            </svg>
                            {Math.abs(kw.change)}
                          </span>
                        ) : (
                          <span style={{ fontSize: 12, color: "#999" }}>—</span>
                        )}
                      </td>
                      <td style={{ padding: "10px 14px", fontSize: 13, color: "#333" }}>{kw.vol.toLocaleString()}</td>
                      <td style={{ padding: "10px 14px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ width: 40, height: 4, borderRadius: 2, overflow: "hidden", background: "#F0F0F0" }}>
                            <div style={{ width: `${kw.diff}%`, height: "100%", borderRadius: 2, background: kw.diff < 30 ? "#10A37F" : kw.diff < 50 ? "#E07800" : "#DC2626" }} />
                          </div>
                          <span style={{ fontSize: 12, color: "#333" }}>{kw.diff}</span>
                        </div>
                      </td>
                      <td style={{ padding: "10px 14px", textAlign: "center" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                          <MentionIcon mentioned={kw.gpt} engine="gpt" />
                          <MentionIcon mentioned={kw.gemini} engine="gemini" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #BFBFBF", background: "#F9F9F9" }}>
                <span style={{ fontSize: 12, color: "#727272" }}>מציג 12 מילות מפתח</span>
                <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 12 }}>
                  <span style={{ color: "#10A37F" }}>טופ 3: 3</span>
                  <span style={{ color: "#000" }}>טופ 10: 9</span>
                  <span style={{ color: "#DC2626" }}>מתחת ל-10: 3</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AUDIENCES */}
        {activeTab === "audiences" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 600, color: "#000000", margin: "0 0 4px" }}>קהלי יעד שזוהו</h2>
                <p style={{ fontSize: 13, color: "#727272", margin: 0 }}>{PERSONAS.length} פרסונות זוהו בסריקה האחרונה</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 12, color: "#727272" }}>כמות פרסונות:</span>
                  <div style={{ display: "flex", gap: 0, border: "1px solid #DDDDDD", borderRadius: 8, overflow: "hidden" }}>
                    {[1, 2, 3, 4, 5].map(n => (
                      <button key={n} style={{
                        width: 32, height: 30, fontSize: 12, fontWeight: n === PERSONAS.length ? 600 : 400,
                        background: n === PERSONAS.length ? "#000" : "#fff", color: n === PERSONAS.length ? "#fff" : "#333",
                        border: "none", cursor: "pointer",
                      }}>{n}</button>
                    ))}
                  </div>
                </div>
                <HoverButton filled onClick={() => setShowPersonaForm(!showPersonaForm)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 18px", background: "#000000", color: "#FFFFFF", fontSize: 13, fontWeight: 600, border: "1px solid #000000", borderRadius: 9, cursor: "pointer" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
                  הצע פרסונה
                </HoverButton>
              </div>
            </div>

            {showPersonaForm && (
              <div style={{ ...card, padding: 24, marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10A37F" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "#000000", margin: 0 }}>הצעת פרסונה חדשה</h3>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6, color: "#333333" }}>שם הפרסונה</label>
                    <input type="text" placeholder="לדוגמה: שרה" style={{ width: "100%", padding: "8px 12px", borderRadius: 10, fontSize: 14, border: "1px solid #BFBFBF", color: "#000000", outline: "none", background: "#FFFFFF", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6, color: "#333333" }}>תפקיד / תיאור</label>
                    <input type="text" placeholder="לדוגמה: פיזיותרפיסטית המחפשת שיתוף פעולה" style={{ width: "100%", padding: "8px 12px", borderRadius: 10, fontSize: 14, border: "1px solid #BFBFBF", color: "#000000", outline: "none", background: "#FFFFFF", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ gridColumn: "span 2" }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6, color: "#333333" }}>תיאור מפורט</label>
                    <textarea rows={3} placeholder="תאר/י את הפרסונה, מה היא מחפשת, מהם הצרכים שלה..." style={{ width: "100%", padding: "8px 12px", borderRadius: 10, fontSize: 14, border: "1px solid #BFBFBF", color: "#000000", outline: "none", resize: "none", background: "#FFFFFF", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6, color: "#333333" }}>תגיות</label>
                    <input type="text" placeholder="גיל, מיקום, תחום - מופרדים בפסיקים" style={{ width: "100%", padding: "8px 12px", borderRadius: 10, fontSize: 14, border: "1px solid #BFBFBF", color: "#000000", outline: "none", background: "#FFFFFF", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <HoverButton filled onClick={() => setShowPersonaForm(false)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 20px", background: "#000000", color: "#FFFFFF", fontSize: 13, fontWeight: 600, border: "1px solid #000000", borderRadius: 9, cursor: "pointer" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                      שלח הצעה
                    </HoverButton>
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {PERSONAS.map((p) => (
                <div key={p.id} style={{ ...card, overflow: "hidden" }}>
                  <div style={{ height: 3, background: "#10A37F" }} />
                  <div style={{ padding: 20 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, border: "1px solid #BFBFBF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 600, color: "#000000", flexShrink: 0 }}>{p.name.charAt(0)}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: "#000000", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</h3>
                        <p style={{ fontSize: 13, color: "#727272", margin: "2px 0 0" }}>{p.role}</p>
                      </div>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontSize: 20, fontWeight: 600, color: "#000000" }}>{p.score}%</div>
                        <div style={{ fontSize: 11, color: "#A2A9B0" }}>רלוונטיות</div>
                      </div>
                    </div>
                    <p style={{ fontSize: 13, lineHeight: 1.6, color: "#333333", margin: "0 0 14px" }}>{p.description}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                      {p.tags.map((tag, i) => (<span key={i} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 10, border: thinBorder, background: "#F9F9F9", color: "#333333" }}>{tag}</span>))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, paddingTop: 14, borderTop: thinBorder }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#727272" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                        <span style={{ fontSize: 12, color: "#727272" }}>{p.queries} שאילתות</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#727272" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
                        <span style={{ fontSize: 12, color: "#727272" }}>{p.mentions} אזכורים</span>
                      </div>
                      <div style={{ flex: 1 }} />
                      <HoverButton onClick={() => { setPersonaFilter(p.id); setActiveTab("queries"); }} style={{ fontSize: 12, fontWeight: 500, color: "#10A37F", background: "transparent", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                        הצג שאילתות
                      </HoverButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PRODUCTS / SERVICES */}
        {activeTab === "products" && (
          <div>
            {/* Explainer */}
            <div style={{ ...card, padding: "14px 20px", marginBottom: 16, background: "#F9FAFB" }}>
              <p style={{ fontSize: 13, color: "#333", margin: 0 }}>
                <span style={{ fontWeight: 600 }}>GeoScale זיהה</span> במערכת <span style={{ fontWeight: 600 }}>5 שירותים ו-1 מוצרים</span> מתוך סריקה באתר <span style={{ direction: "ltr", display: "inline", fontWeight: 500 }}>all4horses.co.il</span>.
                <span style={{ display: "block", fontSize: 12, color: "#727272", marginTop: 4 }}>
                  <strong>שירותים</strong> — פעילויות שהעסק מספק ללקוח (רכיבה, טיפול, טיולים). <strong>מוצרים</strong> — פריטים פיזיים למכירה (ציוד, אביזרים).
                </span>
              </p>
            </div>

            {/* Filter tabs */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              {([{ key: "all" as const, label: "הכל", count: 6 }, { key: "service" as const, label: "שירותים", count: 5 }, { key: "product" as const, label: "מוצרים", count: 1 }]).map((f) => (
                <HoverButton key={f.key} onClick={() => setProductFilter(f.key)} filled={productFilter === f.key} style={{
                  padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: productFilter === f.key ? 600 : 400,
                  background: productFilter === f.key ? "#000" : "#fff", color: productFilter === f.key ? "#fff" : "#333",
                  border: productFilter === f.key ? "1px solid #000" : "1px solid #BFBFBF", cursor: "pointer",
                }}>
                  {f.label} ({f.count})
                </HoverButton>
              ))}
            </div>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 600, color: "#000000", margin: "0 0 4px" }}>
                  {productFilter === "all" ? "מוצרים ושירותים של All4Horses" : productFilter === "service" ? "שירותים של All4Horses" : "מוצרים של All4Horses"}
                </h2>
              </div>
            </div>

            {/* Products grouped: שירותים then מוצרים */}
            {(() => {
              const allProducts = [
                { name: "רכיבה טיפולית", type: "שירות", audience: "B2C", score: 82, queries: 15, mentioned: 12, topQuery: "רכיבה טיפולית לילדים עם ADHD" },
                { name: "קייטנת סוסים", type: "שירות", audience: "B2C", score: 68, queries: 8, mentioned: 5, topQuery: "קייטנת סוסים קיץ 2026 מרכז" },
                { name: "שיעורי רכיבה", type: "שירות", audience: "B2C", score: 75, queries: 11, mentioned: 9, topQuery: "שיעורי רכיבה למתחילים מחיר" },
                { name: "אביזרי רכיבה", type: "מוצר", audience: "B2C", score: 45, queries: 6, mentioned: 2, topQuery: "ציוד רכיבה לילדים -- מה צריך" },
                { name: "טיולי סוסים", type: "שירות", audience: "B2B+B2C", score: 71, queries: 9, mentioned: 7, topQuery: "טיולי סוסים לגיבוש צוותים" },
                { name: "אירועים בחווה", type: "שירות", audience: "B2B+B2C", score: 58, queries: 7, mentioned: 4, topQuery: "יום הולדת בחוות סוסים" },
              ];
              const filtered = productFilter === "all" ? allProducts : productFilter === "service" ? allProducts.filter(p => p.type === "שירות") : allProducts.filter(p => p.type === "מוצר");
              const services = filtered.filter((p) => p.type === "שירות");
              const products = filtered.filter((p) => p.type === "מוצר");

              const renderProductCard = (p: typeof allProducts[0], i: number) => (
                <div key={i} style={{ ...card, overflow: "hidden" }}>
                  <div style={{ height: 3, background: p.type === "מוצר" ? "#10A37F" : "#4285F4" }} />
                  <div style={{ padding: 20 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#000000", margin: 0 }}>{p.name}</h3>
                          <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 10, background: p.type === "מוצר" ? "#10A37F15" : "#4285F415", color: p.type === "מוצר" ? "#10A37F" : "#4285F4", fontWeight: 500 }}>{p.type}</span>
                          <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 10, background: p.audience.includes("B2B") ? "#E0780015" : "#F9F9F9", color: p.audience.includes("B2B") ? "#E07800" : "#727272", fontWeight: 500, border: `1px solid ${p.audience.includes("B2B") ? "#E0780030" : "#DDDDDD"}` }}>{p.audience}</span>
                        </div>
                      </div>
                      <div style={{ width: 44, height: 44, borderRadius: 10, background: p.score >= 70 ? "#10A37F12" : "#F9F9F9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: p.score >= 70 ? "#10A37F" : "#000000" }}>{p.score}%</span>
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
                      <div style={{ textAlign: "center", padding: "6px 0", background: "#F9F9F9", borderRadius: 8 }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "#000000" }}>{p.queries}</div>
                        <div style={{ fontSize: 11, color: "#727272" }}>שאילתות</div>
                      </div>
                      <div style={{ textAlign: "center", padding: "6px 0", background: "#F9F9F9", borderRadius: 8 }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "#10A37F" }}>{p.mentioned}</div>
                        <div style={{ fontSize: 11, color: "#727272" }}>מוזכר</div>
                      </div>
                      <div style={{ textAlign: "center", padding: "6px 0", background: (p.queries - p.mentioned) > 3 ? "#FFF8F0" : "#F9F9F9", borderRadius: 8 }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: (p.queries - p.mentioned) > 3 ? "#E07800" : "#000000" }}>{p.queries - p.mentioned}</div>
                        <div style={{ fontSize: 11, color: "#727272" }}>חסר</div>
                      </div>
                    </div>
                    <div style={{ padding: 10, background: "#F9F9F9", borderRadius: 8, border: thinBorder }}>
                      <p style={{ fontSize: 11, fontWeight: 600, color: "#10A37F", margin: "0 0 4px" }}>שאילתה מובילה</p>
                      <p style={{ fontSize: 13, color: "#333333", margin: 0 }}>"{p.topQuery}"</p>
                    </div>
                  </div>
                </div>
              );

              return (
                <>
                  {/* Services section */}
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 600, color: "#000000", margin: 0 }}>שירותים</h3>
                      <span style={{ fontSize: 12, padding: "2px 8px", borderRadius: 10, background: "#F9F9F9", color: "#727272", border: thinBorder }}>{services.length}</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                      {services.map((p, i) => renderProductCard(p, i))}
                    </div>
                  </div>

                  {/* Products section */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 600, color: "#000000", margin: 0 }}>מוצרים</h3>
                      <span style={{ fontSize: 12, padding: "2px 8px", borderRadius: 10, background: "#F9F9F9", color: "#727272", border: thinBorder }}>{products.length}</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                      {products.map((p, i) => renderProductCard(p, i))}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* ═══ CONTENT CREATION TAB ═══ */}
        {activeTab === "content" && (
          <div>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#000", margin: 0 }}>יצירת תוכן</h2>
                <span style={{ fontSize: 11, padding: "2px 10px", borderRadius: 10, background: "#F9F9F9", color: "#727272", border: thinBorder }}>{contentQueue.length} פריטים</span>
              </div>
              <HoverButton filled onClick={() => setActiveTab("queries")} style={{ padding: "6px 14px", fontSize: 12, fontWeight: 600, color: "#fff", background: "#000", border: "1px solid #000", borderRadius: 8, cursor: "pointer" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
                  הוסף שאילתה
                </span>
              </HoverButton>
            </div>

            {/* GEO Format Banner */}
            <div style={{ ...card, padding: "14px 20px", marginBottom: 20, background: "#F0FDF4", border: "1px solid #10A37F30" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <AIEngineLogo engine="gpt" size={16} />
                  <AIEngineLogo engine="gemini" size={16} />
                  <AIEngineLogo engine="perplexity" size={16} />
                </div>
                <p style={{ fontSize: 12, color: "#333", margin: 0 }}>
                  <span style={{ fontWeight: 600 }}>פורמט GEO-Optimized</span> — התוכן נבנה כדי להופיע בתשובות מנועי AI. כל מאמר מותאם לשאילתה ספציפית.
                </p>
              </div>
            </div>

            {contentQueue.length === 0 ? (
              <div style={{ ...card, padding: 48, textAlign: "center" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#BFBFBF" strokeWidth="1.5" style={{ margin: "0 auto 16px" }}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#333", margin: "0 0 6px" }}>אין תכנים בתור</p>
                <p style={{ fontSize: 13, color: "#727272", margin: "0 0 16px" }}>עבור ללשונית <strong>שאילתות</strong>, פתח שאילתה ולחץ <strong>"צור תוכן"</strong> כדי להתחיל.</p>
                <HoverButton onClick={() => setActiveTab("queries")} style={{ padding: "8px 20px", fontSize: 13, fontWeight: 600, color: "#10A37F", background: "#10A37F10", border: "1px solid #10A37F30", borderRadius: 8, cursor: "pointer" }}>
                  עבור לשאילתות
                </HoverButton>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {contentQueue.map((qId) => {
                  const q = QUERIES.find((x) => x.id === qId);
                  if (!q) return null;
                  return (
                    <div key={qId} style={{ ...card, overflow: "hidden" }}>
                      <div style={{ height: 3, background: "linear-gradient(90deg, #10A37F, #4285F4)" }} />
                      <div style={{ padding: 20 }}>
                        {/* Content header */}
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                              <h3 style={{ fontSize: 15, fontWeight: 600, color: "#000", margin: 0 }}>{q.text}</h3>
                              <PersonaBadge personaId={q.persona} />
                              <StageBadge stage={q.stage} />
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                              <MentionIcon mentioned={q.gpt} engine="gpt" />
                              <MentionIcon mentioned={q.gemini} engine="gemini" />
                              <MentionIcon mentioned={false} engine="perplexity" />
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <HoverButton filled onClick={() => window.location.href = "/editor"} style={{ padding: "6px 14px", fontSize: 12, fontWeight: 600, color: "#fff", background: "#10A37F", border: "1px solid #10A37F", borderRadius: 8, cursor: "pointer" }}>
                              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                                ערוך בעורך תוכן
                              </span>
                            </HoverButton>
                            <HoverButton onClick={() => setContentQueue(contentQueue.filter((id) => id !== qId))} style={{ padding: "6px 10px", fontSize: 12, color: "#DC2626", background: "#fff", border: "1px solid #BFBFBF", borderRadius: 8, cursor: "pointer" }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                            </HoverButton>
                          </div>
                        </div>

                        {/* Content generation settings */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 14 }}>
                          {[
                            { label: "אורך מילים", value: "1,500" },
                            { label: "פורמט", value: "GEO-Optimized" },
                            { label: "שפה", value: "עברית" },
                            { label: "סטטוס", value: "ממתין ליצירה" },
                          ].map((s, i) => (
                            <div key={i} style={{ textAlign: "center", padding: "8px 0", background: "#F9F9F9", borderRadius: 8 }}>
                              <div style={{ fontSize: 11, color: "#727272", marginBottom: 2 }}>{s.label}</div>
                              <div style={{ fontSize: 13, fontWeight: 600, color: "#000" }}>{s.value}</div>
                            </div>
                          ))}
                        </div>

                        {/* AI Answer Preview */}
                        <div style={{ padding: "12px 16px", background: "#F9F9F9", borderRadius: 8, border: thinBorder }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                            <AIEngineLogo engine="gpt" size={14} />
                            <span style={{ fontSize: 12, fontWeight: 600, color: "#333" }}>תצוגה מקדימה — תשובת AI</span>
                          </div>
                          <p style={{ fontSize: 12, lineHeight: 1.6, color: "#555", margin: 0 }}>{q.gptSnippet}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* -- Footer -- */}
      <footer style={{ borderTop: "1px solid #BFBFBF", marginTop: "auto" }}>
        <div dir="rtl" style={{ maxWidth: 1300, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <svg width={28} height={28} viewBox="0 0 102 102" fill="none">
              <circle cx="51" cy="51" r="41" stroke="#ABABAB" strokeWidth="10" fill="none" />
              <circle cx="51" cy="51" r="41" stroke="#141414" strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray="180 78" />
            </svg>
            <span style={{ fontSize: 14, color: "#727272" }}>מונע על ידי AI מתקדם לניתוח הנוכחות שלך בחיפוש</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {[
              { label: "פידבק", color: "#10A37F", bg: "#10A37F15" },
              { label: "דיווח באג", color: "#E07800", bg: "#E0780015" },
              { label: "הצעות לשיפור", color: "#4285F4", bg: "#4285F415" },
              { label: "שימוש API", color: "#10A37F", bg: "#10A37F15" },
            ].map((link, i) => (
              <span key={i} style={{ fontSize: 12, fontWeight: 500, padding: "4px 12px", borderRadius: 20, color: link.color, background: link.bg, cursor: "pointer", transition: "all 150ms" }}>{link.label}</span>
            ))}
          </div>
          <span style={{ fontSize: 12, color: "#A2A9B0" }}>GeoScale 2026 &copy;</span>
        </div>
      </footer>
    </div>
  );
}
