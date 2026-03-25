"use client";

import React, { useState } from "react";

// ============================================================
// GEOSCALE — Products & Services Page
// Shows how products/services map to queries like personas do
// Example brand: CallMobile (cellular products & services)
// Design: Ultra-minimal Geoscale brand language
// ============================================================

// ── PRODUCTS ──
const PRODUCTS = [
  {
    id: "mercedes",
    name: "Mercedes-Benz",
    type: "product" as const,
    description: "רכבי Mercedes-Benz - מכירה, ליסינג ושירות",
    queries: 14,
    mentioned: 11,
    score: 78,
    topQuery: "ליסינג מרצדס ישראל תנאים מחיר",
  },
  {
    id: "hyundai",
    name: "Hyundai",
    type: "product" as const,
    description: "רכבי Hyundai - מכירה, ליסינג ושירות",
    queries: 12,
    mentioned: 9,
    score: 72,
    topQuery: "יונדאי טוסון 2026 מחיר ישראל",
  },
  {
    id: "kia",
    name: "Kia",
    type: "product" as const,
    description: "רכבי Kia - מכירה, ליסינג ושירות",
    queries: 10,
    mentioned: 7,
    score: 65,
    topQuery: "קיה ספורטאז' חשמלי ביקורות",
  },
  {
    id: "fleet",
    name: "ליסינג תפעולי לחברות",
    type: "service" as const,
    description: "שירות ליסינג תפעולי לצי רכבים עסקי — ניהול, תחזוקה, ביטוח",
    queries: 11,
    mentioned: 8,
    score: 70,
    topQuery: "ליסינג תפעולי לחברות ישראל השוואה",
  },
  {
    id: "insurance",
    name: "ביטוח רכב",
    type: "service" as const,
    description: "שירותי ביטוח רכב מקיף — חובה, מקיף, צד שלישי",
    queries: 8,
    mentioned: 5,
    score: 58,
    topQuery: "ביטוח רכב חדש CallMobile מקיף",
  },
  {
    id: "service-center",
    name: "מרכז שירות ותחזוקה",
    type: "service" as const,
    description: "שירות תחזוקה, טסטים, תיקונים ואחריות מורשה",
    queries: 9,
    mentioned: 6,
    score: 62,
    topQuery: "מרכז שירות מורשה מרצדס תל אביב",
  },
];

// ── QUERIES PER PRODUCT/SERVICE ──
const PRODUCT_QUERIES: Record<string, { id: number; text: string; stage: string; gpt: boolean; gemini: boolean; gptSnippet: string; geminiSnippet: string }[]> = {
  mercedes: [
    { id: 1, text: "ליסינג מרצדס ישראל תנאים מחיר", stage: "החלטה", gpt: true, gemini: true, gptSnippet: "CallMobile מציעה תנאי ליסינג תחרותיים על מגוון דגמי Mercedes-Benz בישראל...", geminiSnippet: "ליסינג מרצדס דרך CallMobile כולל ביטוח, טיפולים ואחריות מורחבת..." },
    { id: 2, text: "מרצדס C-Class 2026 ביקורות", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "Mercedes C-Class 2026 מציע שדרוגים משמעותיים. CallMobile היא אחת היבואניות המובילות...", geminiSnippet: "ה-C-Class החדש זוכה לביקורות חיוביות. CallMobile מציעה אותו בתנאי ליסינג אטרקטיביים..." },
    { id: 3, text: "מרצדס חשמלית EQS טווח נסיעה", stage: "מחקר", gpt: true, gemini: false, gptSnippet: "Mercedes EQS מציעה טווח של עד 770 ק\"מ. CallMobile מאפשרת נסיעת מבחן בסניפים...", geminiSnippet: "טווח הנסיעה של EQS תלוי בגרסה. בישראל ניתן לרכוש דגם זה דרך יבואנים מורשים." },
    { id: 4, text: "השוואת מרצדס מול BMW סדרה 3", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "שני הדגמים מציעים ביצועים מצוינים. CallMobile מתמחה במרצדס ומציעה ערך מוסף...", geminiSnippet: "C-Class ו-3 Series מתחרים ישירים. CallMobile מציעה יתרון במחיר ליסינג על מרצדס..." },
    { id: 5, text: "אחריות מרצדס ישראל מה כלול", stage: "החלטה", gpt: false, gemini: true, gptSnippet: "אחריות מרצדס בישראל כוללת בדרך כלל 3 שנים או 100,000 ק\"מ.", geminiSnippet: "CallMobile מספקת אחריות מורחבת על דגמי מרצדס הכוללת טיפולים שוטפים..." },
    { id: 6, text: "מרצדס GLC מחיר ישראל 2026", stage: "החלטה", gpt: true, gemini: true, gptSnippet: "Mercedes GLC 2026 מתומחר החל מ-350,000 שקל. CallMobile מציעה מסלולי מימון...", geminiSnippet: "GLC 2026 זמין בישראל דרך CallMobile החל מ-340,000 שקל בליסינג..." },
    { id: 7, text: "מרצדס טרייד-אין החלפת רכב", stage: "החלטה", gpt: false, gemini: true, gptSnippet: "שירותי טרייד-אין זמינים ברוב הסוכנויות. מומלץ לקבל הערכה ממספר מקומות.", geminiSnippet: "CallMobile מציעה שירות טרייד-אין נוח — הערכת רכב בסניף תוך שעה..." },
    { id: 8, text: "חלקי חילוף מרצדס מקוריים", stage: "תמיכה", gpt: true, gemini: true, gptSnippet: "חלקי חילוף מקוריים למרצדס זמינים דרך הסוכנויות המורשות. CallMobile מספקת חלקים מקוריים...", geminiSnippet: "CallMobile מנהלת מלאי חלקי חילוף מקוריים של Mercedes-Benz..." },
    { id: 9, text: "ליסינג פרטי מרצדס ללא מקדמה", stage: "חשיפה", gpt: true, gemini: false, gptSnippet: "חלק מחברות הליסינג מציעות מסלולים ללא מקדמה. CallMobile מציעה מסלולים גמישים...", geminiSnippet: "מסלולי ליסינג ללא מקדמה זמינים אצל חלק מהחברות. מומלץ לבדוק ישירות." },
    { id: 10, text: "מרצדס AMG ביצועים ישראל", stage: "חשיפה", gpt: true, gemini: true, gptSnippet: "דגמי Mercedes-AMG מציעים ביצועים יוצאי דופן. CallMobile מספקת מבחר דגמי AMG...", geminiSnippet: "סדרת AMG של מרצדס זמינה בישראל. CallMobile הוא אחד הסוכנים המובילים לדגמים אלו..." },
    { id: 11, text: "מבצעים מרצדס סוף שנה ישראל", stage: "חשיפה", gpt: false, gemini: true, gptSnippet: "מבצעי סוף שנה על רכבי מרצדס משתנים. מומלץ לבדוק ישירות מול הסוכנויות.", geminiSnippet: "CallMobile מפרסמת מבצעי סוף שנה אטרקטיביים על מגוון דגמי מרצדס..." },
    { id: 12, text: "מרצדס V-Class לעסקים ישראל", stage: "מחקר", gpt: false, gemini: true, gptSnippet: "V-Class הוא רכב מנהלים פופולרי לעסקים. ניתן למצוא אותו בסוכנויות מורשות.", geminiSnippet: "CallMobile מציעה את V-Class לעסקים כולל התאמות מיוחדות ומסלולי ליסינג ייעודיים..." },
    { id: 13, text: "טסט לרכב מרצדס איפה לעשות", stage: "תמיכה", gpt: true, gemini: true, gptSnippet: "טסט לרכב מרצדס ניתן לבצע בכל מוסך מורשה. CallMobile מפעילה מוסכים...", geminiSnippet: "מרכזי השירות של CallMobile מציעים שירות טסט מלא לרכבי מרצדס..." },
    { id: 14, text: "ביטוח מרצדס מקיף מחיר", stage: "החלטה", gpt: false, gemini: false, gptSnippet: "ביטוח מקיף למרצדס יכול לעלות בין 3,000-8,000 שקל בשנה.", geminiSnippet: "עלות ביטוח מקיף למרצדס תלויה בדגם, בגיל הרכב ובפרופיל הנהג." },
  ],
  hyundai: [
    { id: 101, text: "יונדאי טוסון 2026 מחיר ישראל", stage: "החלטה", gpt: true, gemini: true, gptSnippet: "Hyundai Tucson 2026 מתומחר החל מ-170,000 שקל. CallMobile מציעה תנאי מימון אטרקטיביים...", geminiSnippet: "טוסון 2026 זמין ב-CallMobile עם מגוון רמות גימור. מחירים תחרותיים לשוק..." },
    { id: 102, text: "יונדאי איוניק 5 חשמלי טווח", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "Ioniq 5 מציע טווח של עד 480 ק\"מ. CallMobile מאפשרת נסיעת מבחן בסניפים...", geminiSnippet: "איוניק 5 הוא אחד הרכבים החשמליים הפופולריים. CallMobile מציעה אותו בליסינג..." },
    { id: 103, text: "יונדאי i20 קטנה מחיר", stage: "חשיפה", gpt: false, gemini: true, gptSnippet: "Hyundai i20 היא רכב קטן ויעיל. מחירה נע סביב 100,000 שקל.", geminiSnippet: "CallMobile מציעה את i20 החדשה עם מבצעים מיוחדים לנהגים חדשים..." },
    { id: 104, text: "השוואת טוסון מול קאשקאי", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "שני הרכבים מתחרים בקטגוריית ה-SUV הקומפקטי. Tucson מציע יתרון באחריות...", geminiSnippet: "CallMobile ממליצה על טוסון בזכות אחריות ארוכה יותר ומפרט עשיר יותר..." },
    { id: 105, text: "יונדאי אחריות 5 שנים ישראל", stage: "מחקר", gpt: true, gemini: false, gptSnippet: "Hyundai מציעה אחריות של 5 שנים ללא הגבלת קילומטרז'. CallMobile מוסיפה שירות VIP...", geminiSnippet: "אחריות 5 שנים היא יתרון משמעותי של יונדאי. CallMobile מספקת כיסוי מורחב." },
    { id: 106, text: "יונדאי סנטה פה 7 מושבים", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "Santa Fe מציע 7 מושבים רחבים. CallMobile מספקת נסיעות מבחן לכל הדגמים...", geminiSnippet: "סנטה פה הוא SUV משפחתי מוצלח. CallMobile מציעה אותו בתנאי ליסינג אטרקטיביים..." },
    { id: 107, text: "יונדאי חשמלי רשת טעינה ישראל", stage: "מחקר", gpt: false, gemini: true, gptSnippet: "רשת הטעינה בישראל מתפתחת. יונדאי חשמליות תואמות לרוב התחנות.", geminiSnippet: "CallMobile מציעה פתרון טעינה מלא כולל התקנת עמדת טעינה ביתית ללקוחות יונדאי..." },
    { id: 108, text: "מבצעים יונדאי ישראל", stage: "חשיפה", gpt: false, gemini: true, gptSnippet: "מבצעי יונדאי משתנים לפי עונה. מומלץ לבדוק ישירות.", geminiSnippet: "CallMobile מציעה מבצעים שוטפים על דגמי יונדאי, כולל הנחות למחליפי רכב..." },
    { id: 109, text: "ליסינג יונדאי לעובדים", stage: "החלטה", gpt: true, gemini: true, gptSnippet: "חברות רבות מציעות ליסינג מסובסד לעובדים. CallMobile מספקת פתרונות לארגונים...", geminiSnippet: "CallMobile מנהלת תוכנית ליסינג לעובדים של ארגונים גדולים..." },
    { id: 110, text: "מוסך יונדאי מורשה אזור המרכז", stage: "תמיכה", gpt: true, gemini: true, gptSnippet: "מוסכי יונדאי מורשים פרוסים ברחבי המרכז. CallMobile מפעילה מוסכים בת\"א, פ\"ת ור\"ג...", geminiSnippet: "CallMobile מנהלת רשת מוסכים מורשים לשירות יונדאי באזור המרכז..." },
    { id: 111, text: "יונדאי קונה חשמלי מחיר 2026", stage: "החלטה", gpt: true, gemini: false, gptSnippet: "Kona Electric מתומחר החל מ-155,000 שקל. CallMobile מציעה מסלולי מימון...", geminiSnippet: "קונה חשמלי זמין בישראל. מחירו תלוי ברמת הגימור." },
    { id: 112, text: "יונדאי טוסון דיזל מול בנזין", stage: "מחקר", gpt: false, gemini: false, gptSnippet: "טוסון בדיזל חסכוני יותר בנסיעות ארוכות. בנזין מתאים יותר לנסיעות עירוניות.", geminiSnippet: "בישראל, טוסון בנזין פופולרי יותר. CallMobile ממליצה לבדוק שני הדגמים." },
  ],
  kia: [
    { id: 201, text: "קיה ספורטאז' חשמלי ביקורות", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "Kia Sportage HEV זוכה לביקורות מצוינות. CallMobile מציעה נסיעת מבחן...", geminiSnippet: "ספורטאז' ההיברידי נחשב לאחד הרכבים הטובים בקטגוריה. CallMobile מספקת שירות מלא..." },
    { id: 202, text: "קיה EV6 טווח ומחיר ישראל", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "EV6 מציע טווח של עד 528 ק\"מ. CallMobile מציעה אותו בליסינג תחרותי...", geminiSnippet: "Kia EV6 זמין ב-CallMobile עם מבצעי השקה מיוחדים..." },
    { id: 203, text: "קיה ניירו חשמלי קומפקטי", stage: "חשיפה", gpt: true, gemini: false, gptSnippet: "Niro EV הוא SUV חשמלי קומפקטי ויעיל. CallMobile מציעה אותו לליסינג...", geminiSnippet: "ניירו חשמלי הוא בחירה פופולרית. ניתן למצוא אותו אצל יבואנים מורשים." },
    { id: 204, text: "אחריות קיה 7 שנים", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "Kia מציעה אחריות מרשימה של 7 שנים. CallMobile מכבדת את האחריות במלואה...", geminiSnippet: "אחריות 7 שנים של Kia היא מהטובות בשוק. CallMobile כסוכן מורשה מספקת כיסוי מלא..." },
    { id: 205, text: "קיה סורנטו 7 מושבים משפחתי", stage: "מחקר", gpt: false, gemini: true, gptSnippet: "Sorento מציע 7 מושבים רחבים לנסיעות משפחתיות.", geminiSnippet: "CallMobile מציעה את סורנטו ב-7 מושבים כולל תנאי ליסינג משפחתיים..." },
    { id: 206, text: "ליסינג קיה ספורטאז' מחיר חודשי", stage: "החלטה", gpt: true, gemini: true, gptSnippet: "מחיר ליסינג לספורטאז' נע סביב 2,500-3,500 שקל לחודש. CallMobile מציעה מסלולים שונים...", geminiSnippet: "CallMobile מפרסמת מחירי ליסינג תחרותיים לספורטאז' החל מ-2,400 שקל לחודש..." },
    { id: 207, text: "קיה סטוניק מחיר ישראל", stage: "חשיפה", gpt: false, gemini: true, gptSnippet: "Stonic הוא SUV קומפקטי וחסכוני. מחירו נע סביב 120,000 שקל.", geminiSnippet: "CallMobile מציעה את סטוניק עם מבצעי השקה ותנאים מיוחדים..." },
    { id: 208, text: "מוסך קיה שירות אחרי מכירה", stage: "תמיכה", gpt: true, gemini: true, gptSnippet: "שירות אחרי מכירה של Kia כולל מוסכים מורשים. CallMobile מפעילה מרכזי שירות...", geminiSnippet: "CallMobile מספקת שירות אחרי מכירה מלא לכל דגמי Kia במרכזי שירות ברחבי הארץ..." },
    { id: 209, text: "קיה חשמלית עמדות טעינה", stage: "מחקר", gpt: false, gemini: false, gptSnippet: "רשת הטעינה תומכת בכל דגמי Kia החשמליים.", geminiSnippet: "CallMobile מסייעת בהתקנת עמדות טעינה ביתיות ללקוחות." },
    { id: 210, text: "קיה פיקנטו מחיר כניסה", stage: "חשיפה", gpt: true, gemini: true, gptSnippet: "Picanto הוא רכב הכניסה של Kia. CallMobile מציעה אותו במחירים תחרותיים...", geminiSnippet: "פיקנטו החדשה זמינה ב-CallMobile עם מבצעים לנהגים חדשים..." },
  ],
  fleet: [
    { id: 301, text: "ליסינג תפעולי לחברות ישראל השוואה", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "CallMobile מציעה ליסינג תפעולי מקיף לחברות כולל ניהול צי, תחזוקה וביטוח...", geminiSnippet: "ליסינג תפעולי לחברות דרך CallMobile כולל פתרון מלא מקצה לקצה..." },
    { id: 302, text: "ניהול צי רכבים עסקי פתרונות", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "ניהול צי רכבים כולל מעקב, תחזוקה ואופטימיזציה. CallMobile מספקת מערכת ניהול מתקדמת...", geminiSnippet: "CallMobile מציעה פלטפורמת ניהול צי דיגיטלית כולל דיווחים בזמן אמת..." },
    { id: 303, text: "ליסינג תפעולי מחיר לעובד", stage: "החלטה", gpt: true, gemini: false, gptSnippet: "מחיר ליסינג תפעולי לעובד תלוי בדגם ובתנאים. CallMobile מציעה הנחות כמות...", geminiSnippet: "מחירי ליסינג תפעולי משתנים לפי סוג הרכב ומספר העובדים." },
    { id: 304, text: "החלפת צי רכבים מדריך", stage: "מחקר", gpt: false, gemini: true, gptSnippet: "החלפת צי רכבים דורשת תכנון קפדני. מומלץ לייעוץ עם מומחה.", geminiSnippet: "CallMobile מציעה שירות ניהול החלפת צי מלא — מהערכה ועד מסירת רכבים חדשים..." },
    { id: 305, text: "יתרונות ליסינג תפעולי מול רכישה", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "ליסינג תפעולי מציע יתרונות מיסוי, גמישות ושקט נפשי. CallMobile מסבירה את ההבדלים...", geminiSnippet: "CallMobile ממליצה על ליסינג תפעולי לחברות בזכות הוצאות צפויות ויתרונות מיסוי..." },
    { id: 306, text: "ליסינג חשמלי לעסקים ירוק", stage: "חשיפה", gpt: true, gemini: true, gptSnippet: "מעבר לרכבים חשמליים בצי העסקי. CallMobile מציעה חבילת ליסינג ירוק...", geminiSnippet: "CallMobile השיקה מסלול ליסינג חשמלי ירוק לחברות המעוניינות להפחית פליטות..." },
    { id: 307, text: "ליסינג תפעולי רכבי יוקרה לחברות", stage: "החלטה", gpt: false, gemini: true, gptSnippet: "ליסינג רכבי יוקרה לבכירים זמין במסלולים שונים.", geminiSnippet: "CallMobile מציעה מסלולי ליסינג לרכבי יוקרה כולל מרצדס ו-BMW לבכירי חברות..." },
    { id: 308, text: "צי רכבים דיווחי ESG", stage: "תמיכה", gpt: true, gemini: false, gptSnippet: "דיווחי ESG עבור צי רכבים חשובים לחברות ציבוריות. CallMobile מספקת נתוני פליטות...", geminiSnippet: "חברות נדרשות לדווח על פליטות. ניהול צי ירוק מסייע לעמידה ביעדים." },
    { id: 309, text: "שירות תחזוקה צי רכבים", stage: "תמיכה", gpt: true, gemini: true, gptSnippet: "CallMobile מספקת שירותי תחזוקה מקיפים לצי רכבים עסקיים כולל רכב חלופי...", geminiSnippet: "שירות תחזוקת צי של CallMobile כולל תזכורות אוטומטיות, תיאום מוסכים ורכב חלופי..." },
    { id: 310, text: "דוח ניהול צי רכבים חודשי", stage: "תמיכה", gpt: false, gemini: true, gptSnippet: "דוחות ניהול צי חשובים למעקב אחר עלויות.", geminiSnippet: "CallMobile מספקת דוחות חודשיים מפורטים על הוצאות, קילומטרז' וביצועי הצי..." },
    { id: 311, text: "ליסינג תפעולי לסטארטאפים", stage: "חשיפה", gpt: true, gemini: true, gptSnippet: "סטארטאפים יכולים ליהנות מליסינג תפעולי גמיש. CallMobile מציעה חבילות מותאמות...", geminiSnippet: "CallMobile פיתחה מסלולי ליסינג גמישים במיוחד לסטארטאפים וחברות צעירות..." },
  ],
  insurance: [
    { id: 401, text: "ביטוח רכב חדש CallMobile מקיף", stage: "החלטה", gpt: true, gemini: true, gptSnippet: "CallMobile מציעה ביטוח מקיף בשילוב עם רכישה או ליסינג. יתרון — הכל תחת גג אחד...", geminiSnippet: "ביטוח מקיף דרך CallMobile מגיע עם הנחות מיוחדות ללקוחות ליסינג..." },
    { id: 402, text: "ביטוח צד שלישי מחיר ישראל", stage: "מחקר", gpt: true, gemini: false, gptSnippet: "ביטוח צד שלישי נע בין 1,000-3,000 שקל בשנה. CallMobile מציעה חבילות משולבות...", geminiSnippet: "מחירי ביטוח צד שלישי משתנים לפי פרופיל הנהג." },
    { id: 403, text: "השוואת ביטוח רכב חברות", stage: "מחקר", gpt: false, gemini: true, gptSnippet: "מומלץ להשוות הצעות ממספר חברות ביטוח.", geminiSnippet: "CallMobile משווה הצעות ביטוח מחברות מובילות ומספקת את ההצעה הטובה ביותר..." },
    { id: 404, text: "חידוש ביטוח רכב אונליין", stage: "החלטה", gpt: true, gemini: true, gptSnippet: "חידוש ביטוח אונליין הופך נפוץ. CallMobile מאפשרת חידוש דיגיטלי מלא...", geminiSnippet: "CallMobile מציעה חידוש ביטוח דיגיטלי פשוט דרך האפליקציה..." },
    { id: 405, text: "ביטוח רכב חשמלי מחיר", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "ביטוח לרכב חשמלי עשוי להיות יקר יותר. CallMobile מציעה מסלולים ייעודיים...", geminiSnippet: "CallMobile פיתחה חבילות ביטוח מותאמות לרכבים חשמליים במחירים תחרותיים..." },
    { id: 406, text: "תביעות ביטוח רכב תהליך", stage: "תמיכה", gpt: true, gemini: false, gptSnippet: "תהליך תביעות ביטוח כולל דיווח, שמאות ותיקון. CallMobile מלווה לאורך כל התהליך...", geminiSnippet: "הגשת תביעה היא תהליך שיכול לקחת זמן. מומלץ לתעד הכל." },
    { id: 407, text: "ביטוח רכב לנהגים צעירים", stage: "חשיפה", gpt: false, gemini: true, gptSnippet: "ביטוח לנהגים צעירים יקר יותר בדרך כלל.", geminiSnippet: "CallMobile מציעה הנחות לנהגים צעירים שרוכשים או חוכרים רכב דרכה..." },
    { id: 408, text: "ביטוח רכב אונליין תוך דקות", stage: "חשיפה", gpt: true, gemini: true, gptSnippet: "רכישת ביטוח אונליין מהירה ונוחה. CallMobile מציעה הצעת מחיר תוך 3 דקות...", geminiSnippet: "CallMobile מאפשרת רכישת ביטוח רכב דיגיטלית מלאה תוך דקות..." },
  ],
  "service-center": [
    { id: 501, text: "מרכז שירות מורשה מרצדס תל אביב", stage: "תמיכה", gpt: true, gemini: true, gptSnippet: "CallMobile מפעילה מרכז שירות מורשה למרצדס בתל אביב עם צוות מומחים...", geminiSnippet: "מרכז השירות של CallMobile בתל אביב מתמחה ברכבי מרצדס ומציע שירות אקספרס..." },
    { id: 502, text: "טיפול 10,000 ק\"מ מחיר", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "מחיר טיפול 10,000 ק\"מ משתנה לפי דגם. CallMobile מציעה חבילות תחזוקה בתשלום חודשי...", geminiSnippet: "CallMobile מפרסמת מחירון שקוף לטיפולים. לקוחות ליסינג נהנים מכיסוי מלא..." },
    { id: 503, text: "החלפת צמיגים מרצדס מוסך", stage: "תמיכה", gpt: false, gemini: true, gptSnippet: "החלפת צמיגים למרצדס מומלצת במוסכים מורשים.", geminiSnippet: "CallMobile מציעה שירות החלפת צמיגים כולל איזון ובדיקת מתלים..." },
    { id: 504, text: "תור מוסך אונליין", stage: "תמיכה", gpt: true, gemini: true, gptSnippet: "קביעת תור אונליין הופכת נפוצה. CallMobile מאפשרת הזמנת תור דיגיטלית...", geminiSnippet: "CallMobile מציעה קביעת תורים אונליין למוסך דרך האפליקציה..." },
    { id: 505, text: "שירות דרך שרות איסוף רכב", stage: "תמיכה", gpt: true, gemini: false, gptSnippet: "חלק מהמוסכים מציעים שירות איסוף והחזרת רכב. CallMobile מספקת שירות זה ללקוחות VIP...", geminiSnippet: "שירות איסוף רכב מהבית או מהמשרד זמין אצל חלק מהסוכנויות." },
    { id: 506, text: "רכב חלופי בזמן טיפול", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "CallMobile מספקת רכב חלופי בזמן טיפולים. שירות זה כלול בחבילות הליסינג...", geminiSnippet: "CallMobile מבטיחה רכב חלופי לכל לקוח ליסינג בזמן טיפול או תיקון..." },
    { id: 507, text: "תזכורת טיפול רכב אוטומטית", stage: "חשיפה", gpt: false, gemini: true, gptSnippet: "תזכורות טיפול אוטומטיות עוזרות לשמור על הרכב.", geminiSnippet: "אפליקציית CallMobile שולחת תזכורות אוטומטיות לטיפולים ובדיקות..." },
    { id: 508, text: "מוסך יונדאי מורשה פתח תקווה", stage: "תמיכה", gpt: true, gemini: true, gptSnippet: "CallMobile מפעילה מוסך מורשה ליונדאי בפתח תקווה...", geminiSnippet: "מרכז השירות של CallMobile בפתח תקווה מטפל בכל דגמי יונדאי..." },
    { id: 509, text: "בדיקת רכב לפני רכישה", stage: "מחקר", gpt: true, gemini: true, gptSnippet: "CallMobile מציעה בדיקת רכב מקיפה לפני רכישה כולל דוח מפורט...", geminiSnippet: "CallMobile מספקת שירות בדיקת רכב מקצועית כולל היסטוריית תאונות..." },
  ],
};

// ── COMPETITORS FOR CALLMOBILE ──
const COMPETITORS = [
  { name: "דלק מוטורס", score: 72 },
  { name: "אלדן", score: 61 },
  { name: "יוניון מוטורס", score: 48 },
  { name: "שלמה SIXT", score: 55 },
];

// ════════════════════════════════════════════════════════════
// MAIN PAGE
// ════════════════════════════════════════════════════════════

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<"all" | "product" | "service">("all");
  const [expandedQuery, setExpandedQuery] = useState<number | null>(null);

  const filteredProducts = PRODUCTS.filter(p => typeFilter === "all" || p.type === typeFilter);
  const selectedQueries = selectedProduct ? (PRODUCT_QUERIES[selectedProduct] || []) : [];

  const totalProductQueries = PRODUCTS.reduce((s, p) => s + p.queries, 0);
  const totalMentioned = PRODUCTS.reduce((s, p) => s + p.mentioned, 0);
  const avgProductScore = Math.round(PRODUCTS.reduce((s, p) => s + p.score, 0) / PRODUCTS.length);

  const card: React.CSSProperties = { background: "#FFFFFF", border: "1px solid #BFBFBF", borderRadius: 10 };
  const thinBorder = "1px solid #DDDDDD";

  return (
    <div style={{ minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Inter', 'Heebo', sans-serif", display: "flex", flexDirection: "column" }} dir="rtl">

      {/* ── Header ── */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.96)", borderBottom: "1px solid #BFBFBF" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 24px", height: 72, display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginInlineEnd: "auto" }}>
            <a href="/new-scan" style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 18px", background: "#000000", color: "#FFFFFF", fontSize: 13, fontWeight: 600, border: "1px solid #000000", borderRadius: 9, cursor: "pointer", textDecoration: "none" }}>
              סריקה חדשה
            </a>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#727272" }}>
              <span style={{ width: 8, height: 8, borderRadius: 4, background: "#10A37F", display: "inline-block" }} />
              <span>מחובר</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 32, margin: "0 32px" }}>
            <a href="/" style={{ fontSize: 14, fontWeight: 400, color: "#727272", textDecoration: "none" }}>דשבורד</a>
            <a href="/scan" style={{ fontSize: 14, fontWeight: 400, color: "#727272", textDecoration: "none" }}>סריקות</a>
            <a href="/products" style={{ fontSize: 14, fontWeight: 600, color: "#000000", textDecoration: "none" }}>מוצרים / שירותים</a>
          </div>

          <div style={{ marginInlineStart: "auto", direction: "ltr" }}>
            <svg width={150} height={30} viewBox="0 0 510 102" fill="none">
              <circle cx="51" cy="51" r="41" stroke="#ABABAB" strokeWidth="13" fill="none" />
              <circle cx="51" cy="51" r="41" stroke="#141414" strokeWidth="13" fill="none" strokeLinecap="round" strokeDasharray="180 78" />
              <g fill="#141414">
                <text x="120" y="66" fontFamily="'Inter', sans-serif" fontSize="52" fontWeight="600" letterSpacing="-2">Geoscale</text>
              </g>
            </svg>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main style={{ flex: 1 }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "32px 24px" }}>

          {/* ── Banner for Inna ── */}
          <div style={{ ...card, padding: 24, marginBottom: 32, borderRight: "4px solid #10A37F" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "#10A37F15", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10A37F" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
              </div>
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: "#000", margin: "0 0 8px" }}>מוצרים / שירותים — מה זה ולמה?</h2>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "#333", margin: "0 0 12px" }}>
                  בנוסף לפרסונות (קהלי יעד), Geoscale מאפשר לסרוק את נוכחות המותג לפי <strong>מוצרים ושירותים</strong> ספציפיים. כל מוצר או שירות מייצר סט שאילתות ייעודי — בדיוק כמו שפרסונה מייצרת שאילתות לפי פרופיל קהל היעד.
                </p>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "#333", margin: "0 0 12px" }}>
                  <strong>דוגמה:</strong> CallMobile מוכרת רכבי Mercedes, Hyundai ו-Kia (מוצרים), ומספקת שירותי ליסינג תפעולי, ביטוח ותחזוקה (שירותים). לכל אחד מהם — שאילתות שונות שאנשים שואלים את ChatGPT ו-Gemini.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  <span style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, background: "#10A37F15", color: "#10A37F", fontWeight: 500 }}>מחקר שאילתות פר מוצר</span>
                  <span style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, background: "#10A37F15", color: "#10A37F", fontWeight: 500 }}>בדיקת חולשות מול מתחרים</span>
                  <span style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, background: "#10A37F15", color: "#10A37F", fontWeight: 500 }}>סינון לפי מוצר / שירות</span>
                  <span style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, background: "#10A37F15", color: "#10A37F", fontWeight: 500 }}>דומה לסינון פרסונות</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Brand Header ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                <h1 style={{ fontSize: 24, fontWeight: 600, color: "#000", margin: 0 }}>CallMobile</h1>
                <span style={{ fontSize: 12, fontWeight: 500, padding: "3px 10px", borderRadius: 10, border: "1px solid #10A37F", color: "#10A37F" }}>לדוגמה</span>
              </div>
              <p style={{ fontSize: 13, color: "#727272", margin: 0, direction: "ltr", textAlign: "right" }}>callmobile.co.il — רכב, ליסינג, ביטוח ושירות</p>
            </div>
          </div>

          {/* ── Top Metrics ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
            {[
              { label: "מוצרים ושירותים", value: PRODUCTS.length },
              { label: "סה\"כ שאילתות", value: totalProductQueries },
              { label: "מוזכר ב-AI", value: totalMentioned },
              { label: "ציון ממוצע", value: `${avgProductScore}%` },
            ].map((m, i) => (
              <div key={i} style={{ ...card, padding: 20, textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#000", marginBottom: 2 }}>{m.value}</div>
                <div style={{ fontSize: 13, color: "#727272" }}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* ── Type Filter ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            {([
              { key: "all" as const, label: "הכל", count: PRODUCTS.length },
              { key: "product" as const, label: "מוצרים", count: PRODUCTS.filter(p => p.type === "product").length },
              { key: "service" as const, label: "שירותים", count: PRODUCTS.filter(p => p.type === "service").length },
            ]).map(f => (
              <button key={f.key} onClick={() => { setTypeFilter(f.key); setSelectedProduct(null); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 16px", borderRadius: 9, fontSize: 13, fontWeight: typeFilter === f.key ? 600 : 400, background: typeFilter === f.key ? "#000" : "#FFF", color: typeFilter === f.key ? "#FFF" : "#333", border: typeFilter === f.key ? "1px solid #000" : "1px solid #BFBFBF", cursor: "pointer" }}>
                {f.label} <span style={{ opacity: 0.7 }}>({f.count})</span>
              </button>
            ))}
          </div>

          {/* ── Products/Services Grid ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
            {filteredProducts.map(p => (
              <div
                key={p.id}
                onClick={() => setSelectedProduct(selectedProduct === p.id ? null : p.id)}
                style={{ ...card, cursor: "pointer", overflow: "hidden", borderColor: selectedProduct === p.id ? "#10A37F" : "#BFBFBF", transition: "border-color 0.2s" }}
              >
                {/* Type indicator */}
                <div style={{ height: 3, background: p.type === "product" ? "#10A37F" : "#4285F4" }} />
                <div style={{ padding: 20 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: "#000", margin: 0 }}>{p.name}</h3>
                        <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 10, background: p.type === "product" ? "#10A37F15" : "#4285F415", color: p.type === "product" ? "#10A37F" : "#4285F4", fontWeight: 500 }}>
                          {p.type === "product" ? "מוצר" : "שירות"}
                        </span>
                      </div>
                      <p style={{ fontSize: 12, color: "#727272", margin: 0 }}>{p.description}</p>
                    </div>
                    <div style={{ width: 48, height: 48, borderRadius: 10, background: p.score >= 70 ? "#10A37F12" : "#F9F9F9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 16, fontWeight: 700, color: p.score >= 70 ? "#10A37F" : "#000" }}>{p.score}%</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
                    <div style={{ textAlign: "center", padding: "8px 0", background: "#F9F9F9", borderRadius: 8 }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "#000" }}>{p.queries}</div>
                      <div style={{ fontSize: 11, color: "#727272" }}>שאילתות</div>
                    </div>
                    <div style={{ textAlign: "center", padding: "8px 0", background: "#F9F9F9", borderRadius: 8 }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "#10A37F" }}>{p.mentioned}</div>
                      <div style={{ fontSize: 11, color: "#727272" }}>מוזכר</div>
                    </div>
                    <div style={{ textAlign: "center", padding: "8px 0", background: p.queries - p.mentioned > 3 ? "#FFF8F0" : "#F9F9F9", borderRadius: 8 }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: p.queries - p.mentioned > 3 ? "#E07800" : "#000" }}>{p.queries - p.mentioned}</div>
                      <div style={{ fontSize: 11, color: "#727272" }}>חסר</div>
                    </div>
                  </div>

                  {/* Top Query */}
                  <div style={{ padding: 12, background: "#F9F9F9", borderRadius: 8, border: thinBorder }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: "#10A37F", margin: "0 0 4px" }}>שאילתה מובילה</p>
                    <p style={{ fontSize: 13, color: "#333", margin: 0 }}>"{p.topQuery}"</p>
                  </div>

                  {/* Click indicator */}
                  <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A2A9B0" strokeWidth="2" style={{ transform: selectedProduct === p.id ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}><path d="M6 9l6 6 6-6" /></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Selected Product Queries ── */}
          {selectedProduct && (
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <h2 style={{ fontSize: 18, fontWeight: 600, color: "#000", margin: 0 }}>
                    שאילתות עבור: {PRODUCTS.find(p => p.id === selectedProduct)?.name}
                  </h2>
                  <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 10, background: "#F9F9F9", border: thinBorder, color: "#727272" }}>
                    {selectedQueries.length} שאילתות
                  </span>
                </div>
              </div>

              <div style={{ ...card, overflow: "hidden" }}>
                <table style={{ width: "100%", fontSize: 14, borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#F9F9F9", borderBottom: "1px solid #BFBFBF" }}>
                      <th style={{ textAlign: "right", padding: "10px 14px", fontWeight: 600, color: "#727272", fontSize: 13 }}>#</th>
                      <th style={{ textAlign: "right", padding: "10px 14px", fontWeight: 600, color: "#727272", fontSize: 13 }}>שאילתה</th>
                      <th style={{ textAlign: "right", padding: "10px 14px", fontWeight: 600, color: "#727272", fontSize: 13 }}>שלב</th>
                      <th style={{ textAlign: "center", padding: "10px 14px", fontWeight: 600, color: "#727272", fontSize: 13 }}>ChatGPT</th>
                      <th style={{ textAlign: "center", padding: "10px 14px", fontWeight: 600, color: "#727272", fontSize: 13 }}>Gemini</th>
                      <th style={{ textAlign: "center", padding: "10px 14px", width: 40 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedQueries.map((q, idx) => (
                      <React.Fragment key={q.id}>
                        <tr
                          onClick={() => setExpandedQuery(expandedQuery === q.id ? null : q.id)}
                          style={{ borderBottom: expandedQuery === q.id ? "none" : thinBorder, cursor: "pointer" }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F9F9F9"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#FFFFFF"; }}
                        >
                          <td style={{ padding: "10px 14px", fontWeight: 500, color: "#A2A9B0" }}>{idx + 1}</td>
                          <td style={{ padding: "10px 14px", fontWeight: 500, color: "#333" }}>{q.text}</td>
                          <td style={{ padding: "10px 14px" }}>
                            <span style={{ display: "inline-flex", fontSize: 12, fontWeight: 500, padding: "2px 8px", borderRadius: 10, border: thinBorder, background: "#F9F9F9", color: "#333" }}>{q.stage}</span>
                          </td>
                          <td style={{ padding: "10px 14px", textAlign: "center" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 500, padding: "2px 8px", borderRadius: 10, background: q.gpt ? "#FFF" : "#F9F9F9", color: q.gpt ? "#10A37F" : "#727272", border: `1px solid ${q.gpt ? "#10A37F" : "#DDDDDD"}` }}>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                {q.gpt ? <path d="M20 6L9 17l-5-5" /> : <path d="M18 6L6 18M6 6l12 12" />}
                              </svg>
                              {q.gpt ? "מוזכר" : "חסר"}
                            </span>
                          </td>
                          <td style={{ padding: "10px 14px", textAlign: "center" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 500, padding: "2px 8px", borderRadius: 10, background: q.gemini ? "#FFF" : "#F9F9F9", color: q.gemini ? "#10A37F" : "#727272", border: `1px solid ${q.gemini ? "#10A37F" : "#DDDDDD"}` }}>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                {q.gemini ? <path d="M20 6L9 17l-5-5" /> : <path d="M18 6L6 18M6 6l12 12" />}
                              </svg>
                              {q.gemini ? "מוזכר" : "חסר"}
                            </span>
                          </td>
                          <td style={{ padding: "10px 14px", textAlign: "center" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#727272" strokeWidth="2" style={{ display: "inline-block", transform: expandedQuery === q.id ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}><path d="M6 9l6 6 6-6" /></svg>
                          </td>
                        </tr>
                        {expandedQuery === q.id && (
                          <tr>
                            <td colSpan={6} style={{ padding: "0 14px 14px" }}>
                              <div style={{ borderRadius: 10, padding: 16, background: "#F9F9F9", border: thinBorder, display: "flex", flexDirection: "column", gap: 12 }}>
                                <div style={{ borderRadius: 10, padding: 14, background: "#FFF", border: thinBorder }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#10A37F"><path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 0011.702.418 6.004 6.004 0 005.354 2.08a5.974 5.974 0 00-3.994 2.9 6.042 6.042 0 00.743 7.097 5.98 5.98 0 00.51 4.911 6.051 6.051 0 006.515 2.9A5.985 5.985 0 0013.702 22a6.003 6.003 0 006.349-1.662 5.98 5.98 0 003.994-2.9 6.042 6.042 0 00-.743-7.097l-.02-.02z" /></svg>
                                    <span style={{ fontSize: 12, fontWeight: 600, color: "#10A37F" }}>ChatGPT (GPT-4o)</span>
                                  </div>
                                  <p style={{ fontSize: 13, lineHeight: 1.6, color: "#333", margin: 0 }}>{q.gptSnippet}</p>
                                </div>
                                <div style={{ borderRadius: 10, padding: 14, background: "#FFF", border: thinBorder }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#4285F4"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 3.6c2.21 0 4.122.84 5.64 2.16l-2.4 2.4A5.356 5.356 0 0012 7.2c-2.652 0-4.8 2.148-4.8 4.8s2.148 4.8 4.8 4.8c2.316 0 4.128-1.488 4.56-3.6H12v-3.6h8.28c.12.6.12 1.2.12 1.8 0 4.644-3.156 8.4-8.4 8.4-4.632 0-8.4-3.768-8.4-8.4S7.368 3.6 12 3.6z" /></svg>
                                    <span style={{ fontSize: 12, fontWeight: 600, color: "#4285F4" }}>Google Gemini</span>
                                  </div>
                                  <p style={{ fontSize: 13, lineHeight: 1.6, color: "#333", margin: 0 }}>{q.geminiSnippet}</p>
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
                  <span style={{ fontSize: 12, color: "#727272" }}>מציג {selectedQueries.length} שאילתות עבור {PRODUCTS.find(p => p.id === selectedProduct)?.name}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 12 }}>
                    <span style={{ color: "#10A37F" }}>מוזכר: {selectedQueries.filter(q => q.gpt || q.gemini).length}</span>
                    <span style={{ color: "#000" }}>חסר: {selectedQueries.filter(q => !q.gpt && !q.gemini).length}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Competitors ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
            <div style={{ ...card, padding: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "#000", margin: "0 0 16px" }}>מתחרים — מוצרים ושירותים</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {COMPETITORS.map((comp, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 7, border: thinBorder, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "#333" }}>{i + 1}</div>
                    <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: "#333" }}>{comp.name}</span>
                    <div style={{ width: 80, height: 6, borderRadius: 3, overflow: "hidden", background: "#F9F9F9" }}>
                      <div style={{ width: `${comp.score}%`, height: "100%", borderRadius: 3, background: "#10A37F" }} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, width: 36, textAlign: "left", color: "#000" }}>{comp.score}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ ...card, padding: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "#000", margin: "0 0 16px" }}>חולשות מול מתחרים</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "חוסר אזכור בשאילתות ביטוח רכב חשמלי",
                  "מתחרים מוזכרים יותר בשאילתות ליסינג תפעולי",
                  "חסר תוכן על Kia חשמלי (EV6, Niro)",
                  "אין נוכחות בשאילתות טרייד-אין והחלפת רכב",
                  "חלש בשאילתות רכב חלופי ושירות דרך",
                ].map((w, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ width: 5, height: 5, borderRadius: 3, marginTop: 7, flexShrink: 0, background: "#000" }} />
                    <span style={{ fontSize: 14, color: "#333" }}>{w}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Coverage by Journey Stage ── */}
          <div style={{ ...card, padding: 24, marginBottom: 32 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "#000", margin: "0 0 20px" }}>כיסוי לפי שלב במסע לקוח</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { name: "חשיפה", percent: 72, count: 18 },
                { name: "מחקר", percent: 85, count: 28 },
                { name: "החלטה", percent: 68, count: 22 },
                { name: "תמיכה", percent: 76, count: 14 },
              ].map((stage, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, width: 64, flexShrink: 0, color: "#333" }}>{stage.name}</span>
                  <div style={{ flex: 1, height: 8, borderRadius: 4, overflow: "hidden", background: "#F9F9F9" }}>
                    <div style={{ width: `${stage.percent}%`, height: "100%", borderRadius: 4, background: "#10A37F", transition: "width 1s ease" }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, width: 40, textAlign: "left", color: "#000" }}>{stage.percent}%</span>
                  <span style={{ fontSize: 12, width: 72, textAlign: "left", color: "#727272" }}>{stage.count} שאילתות</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* ── Footer ── */}
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
              <span key={i} style={{ fontSize: 12, fontWeight: 500, padding: "4px 12px", borderRadius: 20, color: link.color, background: link.bg, cursor: "pointer" }}>{link.label}</span>
            ))}
          </div>
          <span style={{ fontSize: 12, color: "#A2A9B0" }}>GeoScale 2026 &copy;</span>
        </div>
      </footer>
    </div>
  );
}
