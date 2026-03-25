export default function InnaSpecPage() {
  return (
    <div dir="rtl" style={{ fontFamily: "'Heebo', 'Inter', sans-serif", background: "#FAFAFA", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ background: "#000", color: "#fff", padding: "40px 24px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontSize: 13, color: "#10A37F", fontWeight: 600, letterSpacing: 1, marginBottom: 8 }}>GEOSCALE DESIGN SPEC</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 8px" }}>מסמך אפיון עיצובי מלא</h1>
          <p style={{ fontSize: 15, color: "#999", margin: 0 }}>עבור אינה — כיוון עיצובי למוצר Geoscale</p>
          <div style={{ marginTop: 16, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://geoscale-demo-design.vercel.app" target="_blank" style={{ padding: "8px 20px", background: "#10A37F", color: "#fff", borderRadius: 9, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>צפי בדמו החי</a>
            <a href="https://github.com/s0RRy12341/geoscale-demo-design" target="_blank" style={{ padding: "8px 20px", background: "transparent", color: "#fff", borderRadius: 9, fontSize: 13, fontWeight: 600, textDecoration: "none", border: "1px solid #555" }}>קוד מקור</a>
          </div>
        </div>
      </header>

      {/* Intro */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 0" }}>
        <Card>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#333", margin: 0 }}>
            המסמך הזה מתאר את כל המסכים ב-Demo Design של Geoscale — פלטפורמה לניטור נוכחות מותגים במנועי AI (ChatGPT, Gemini).
            הדמו בנוי ב-Next.js כ-clickable prototype עם דאטה סטטי. כל מה שמוצג כאן הוא <strong>כיוון עיצובי</strong> ולא מוצר סופי.
          </p>
          <p style={{ fontSize: 14, color: "#727272", marginTop: 8, marginBottom: 0 }}>
            <strong>חשוב:</strong> כל העיצוב הוא RTL (עברית, ימין-לשמאל). כל סקשיין מלווה בצילום מסך מתוך הדמו החי.
          </p>
        </Card>

        {/* TOC */}
        <div style={{ margin: "24px 0" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>תוכן עניינים</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              ["#design-language", "1. שפה עיצובית"],
              ["#header-footer", "2. הדר ופוטר"],
              ["#dashboard", "3. דשבורד ראשי"],
              ["#scan-overview", "4. סריקה — סקירה"],
              ["#scan-queries", "5. סריקה — שאילתות"],
              ["#scan-audiences", "6. סריקה — קהלים"],
              ["#scan-products", "7. סריקה — מוצרים"],
              ["#new-scan", "8. סריקה חדשה (4 מסכים)"],
              ["#products-page", "9. דף מוצרים מלא"],
              ["#changelog", "10. שינויים שבוצעו"],
              ["#priorities", "11. סדר עדיפויות"],
            ].map(([href, label]) => (
              <a key={href} href={href} style={{ display: "block", padding: "8px 12px", background: "#fff", border: "1px solid #E0E0E0", borderRadius: 8, color: "#333", textDecoration: "none", fontSize: 14 }}>{label}</a>
            ))}
          </div>
        </div>

        {/* 1. Design Language */}
        <Section id="design-language" number={1} title="שפה עיצובית (Design Language)">
          <h3 style={h3Style}>צבעים — צבעי המותג המדויקים</h3>
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>שם</th>
                  <th style={thStyle}>קוד HEX</th>
                  <th style={thStyle}>דוגמה</th>
                  <th style={thStyle}>שימוש</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["שחור", "#000000", "כותרות ראשיות, טקסט ראשי"],
                  ["שחור-כמעט", "#141414", "לוגו wordmark, רקע כהה"],
                  ["לבן", "#FFFFFF", "רקע ראשי, כרטיסים"],
                  ["רקע חלופי", "#F9F9F9", "רקע משני (expanded rows, hover)"],
                  ["טורקיז (Teal)", "#10A37F", "צבע המותג היחיד — CTA, אחוזים גבוהים"],
                  ["בורדר", "#BFBFBF", "גבול כרטיסים, קווים מפרידים"],
                  ["בורדר דק", "#DDDDDD", "גבולות משניים, בדג׳ים"],
                  ["טקסט גוף", "#333333", "טקסט תוכן רגיל"],
                  ["טקסט מעומעם", "#727272", "טקסט משני, תיאורים"],
                  ["טקסט בהיר", "#777777", "טקסט עזר"],
                  ["אייקונים אפורים", "#A2A9B0", "אייקונים, מספרי שורות"],
                  ["טבעת לוגו", "#ABABAB", "הטבעת האפורה של הלוגו"],
                  ["כחול Gemini", "#4285F4", "רק לאייקון Google Gemini"],
                ].map(([name, hex, usage]) => (
                  <tr key={hex}>
                    <td style={tdStyle}><strong>{name}</strong></td>
                    <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: 13 }}>{hex}</td>
                    <td style={tdStyle}><span style={{ display: "inline-block", width: 28, height: 28, borderRadius: 6, background: hex, border: "1px solid #DDD", verticalAlign: "middle" }} /></td>
                    <td style={tdStyle}>{usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Alert type="warning">
            <strong>כללים חשובים:</strong> אין גרדיאנטים בכלל. אין צלליות (box-shadow) בכלל. צבע אחד בלבד מלבד שחור/לבן/אפור: <code style={codeStyle}>#10A37F</code>. הכל שטוח (flat), מינימלי, נקי.
          </Alert>

          <h3 style={h3Style}>טיפוגרפיה</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div style={{ padding: 16, background: "#fff", border: "1px solid #E0E0E0", borderRadius: 10 }}>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Inter</div>
              <div style={{ fontSize: 13, color: "#727272" }}>UI ראשי — כפתורים, ניווט, מספרים, תוויות</div>
            </div>
            <div style={{ padding: 16, background: "#fff", border: "1px solid #E0E0E0", borderRadius: 10 }}>
              <div style={{ fontFamily: "Heebo, sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Heebo</div>
              <div style={{ fontSize: 13, color: "#727272" }}>טקסט עברי — כותרות, תוכן, תיאורים</div>
            </div>
          </div>
          <table style={tableStyle}>
            <thead><tr><th style={thStyle}>אלמנט</th><th style={thStyle}>גודל</th><th style={thStyle}>משקל</th></tr></thead>
            <tbody>
              {[
                ["כותרת עמוד", "26px", "700"],
                ["כותרת סקשיין", "15-18px", "600"],
                ["טקסט גוף", "14px", "400"],
                ["טקסט קטן / בדג׳ים", "12-13px", "—"],
                ["מספרים גדולים (מטריקות)", "36-40px", "700"],
              ].map(([el, size, weight]) => (
                <tr key={el}><td style={tdStyle}>{el}</td><td style={tdStyle}>{size}</td><td style={tdStyle}>{weight}</td></tr>
              ))}
            </tbody>
          </table>

          <h3 style={h3Style}>מרכיבים בסיסיים</h3>
          <table style={tableStyle}>
            <thead><tr><th style={thStyle}>מרכיב</th><th style={thStyle}>מפרט</th></tr></thead>
            <tbody>
              {[
                ["כרטיס (Card)", "border: 1px solid #BFBFBF, border-radius: 10px, background: #FFFFFF"],
                ["כפתור ראשי", "background: #000, color: #FFF, border-radius: 9px, font-size: 13px, font-weight: 600"],
                ["כפתור משני", "background: transparent, border: 1px solid #BFBFBF, border-radius: 9px"],
                ["בדג׳ (Badge)", "border: 1px solid #DDD, border-radius: 10px, padding: 2px 8px, font-size: 12px"],
                ["בדג׳ ״מוזכר״", "border: 1px solid #10A37F, color: #10A37F + אייקון V"],
                ["בדג׳ ״לא מוזכר״", "border: 1px solid #DDD, color: #727272 + אייקון X"],
                ["Progress Ring", "עיגול SVG, stroke: #10A37F על רקע #F9F9F9"],
              ].map(([name, spec]) => (
                <tr key={name}><td style={tdStyle}><strong>{name}</strong></td><td style={{ ...tdStyle, fontFamily: "monospace", fontSize: 12 }}>{spec}</td></tr>
              ))}
            </tbody>
          </table>
        </Section>

        {/* 2. Header & Footer */}
        <Section id="header-footer" number={2} title="הדר ופוטר — אחידים בכל הדפים">
          <h3 style={h3Style}>הדר (Header)</h3>
          <div style={{ padding: 16, background: "#1a1a1a", borderRadius: 10, color: "#ccc", fontFamily: "monospace", fontSize: 13, lineHeight: 1.8, marginBottom: 16, direction: "ltr", textAlign: "center" }}>
            ┌─────────────────────────────────────────────────────┐<br/>
            │ &nbsp;[סריקה חדשה + מחובר] &nbsp;&nbsp; [דשבורד | סריקות] &nbsp;&nbsp; [לוגו Geoscale] │<br/>
            │ &nbsp;justifySelf: start &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; auto-center &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; justifySelf: end &nbsp;&nbsp;│<br/>
            └─────────────────────────────────────────────────────┘
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            {[
              ["גובה", "72px"],
              ["רוחב מקסימלי", "1300px, ממורכז"],
              ["פדינג", "0 24px"],
              ["רקע", "rgba(255,255,255,0.96)"],
              ["בורדר תחתון", "1px solid #BFBFBF"],
              ["Position", "sticky, top: 0"],
            ].map(([k, v]) => (
              <div key={k} style={{ padding: "8px 12px", background: "#fff", border: "1px solid #E0E0E0", borderRadius: 8, fontSize: 13 }}>
                <strong>{k}:</strong> <code style={codeStyle}>{v}</code>
              </div>
            ))}
          </div>
          <Alert type="info">ניווט: 2 לשוניות בלבד — <strong>דשבורד</strong> | <strong>סריקות</strong>. אין &ldquo;מוצרים / שירותים&rdquo; בתפריט העליון!</Alert>

          <h3 style={h3Style}>פוטר (Footer)</h3>
          <p style={pStyle}>בורדר עליון: <code style={codeStyle}>1px solid #BFBFBF</code>, רוחב מקסימלי: 1300px</p>
          <ul style={ulStyle}>
            <li>צד ימין: לוגו מעגלי + תיאור &ldquo;מונע על ידי AI מתקדם...&rdquo;</li>
            <li>מרכז: 4 קישורים — פידבק | דיווח באג | הצעות לשיפור | שימוש API</li>
            <li>צד שמאל: © GeoScale 2026</li>
          </ul>
        </Section>

        {/* 3. Dashboard */}
        <Section id="dashboard" number={3} title="דף 1: דשבורד ראשי ( / )">
          <Screenshot src="/spec-screenshots/01-dashboard-header.png" caption="דשבורד — חלק עליון (הדר + מטריקות + כרטיסים)" />
          <Screenshot src="/spec-screenshots/01-dashboard-full.png" caption="דשבורד — דף מלא כולל פעולות ממתינות ופעילות" />

          <h3 style={h3Style}>כותרת + מטריקות ראשיות</h3>
          <ul style={ulStyle}>
            <li>כותרת: <strong>&ldquo;ניטור מותגים&rdquo;</strong> — fontSize: 26px, fontWeight: 700</li>
            <li>תת-כותרת: &ldquo;ניטור נוכחות מותגים במנועי AI&rdquo; — fontSize: 14px, color: #727272</li>
            <li><strong>4 כרטיסי מטריקה</strong> בשורה: מותגים (6), סריקות (16), שאילתות (244), ציון ממוצע (72%)</li>
          </ul>

          <h3 style={h3Style}>כרטיסי מותגים</h3>
          <ul style={ulStyle}>
            <li>כותרת: <strong>&ldquo;המותגים שלך&rdquo;</strong> + שדה חיפוש</li>
            <li>כל מותג: שם + דומיין + ציון Progress Ring + כפתור &ldquo;צפה בסריקה&rdquo; (שחור)</li>
            <li>3 מטריקות קטנות: מאמרים | ממתינים | ציון נוכחות</li>
            <li>פעולות נדרשות — רשימת action items (קישורים בטורקיז)</li>
            <li>שאילתה מובילה — ציטוט בגרשיים</li>
          </ul>
          <p style={{ ...pStyle, color: "#727272" }}>6 מותגי דוגמה: All4Horses, לחם ארטיזן, מכללת אורין שפלטר, כלכליסט, Just In Time, תכום הדברות</p>

          <h3 style={h3Style}>פאנל תחתון — שני כרטיסים</h3>
          <ul style={ulStyle}>
            <li><strong>&ldquo;פעולות ממתינות&rdquo;</strong> (15 ממתינות) — רשימת מותגים עם ציון + סיכום פעולות</li>
            <li><strong>&ldquo;פעילות אחרונה&rdquo;</strong> — רשימת סריקות שהושלמו עם תאריך + ציון</li>
          </ul>
        </Section>

        {/* 4. Scan Overview */}
        <Section id="scan-overview" number={4} title="דף 2: סריקה — טאב סקירה ( /scan )">
          <Screenshot src="/spec-screenshots/02-scan-overview-top.png" caption="סקירה — חלק עליון (הדר + מותג + לשוניות + מטריקות)" />
          <Screenshot src="/spec-screenshots/02-scan-overview-full.png" caption="סקירה — דף מלא" />

          <h3 style={h3Style}>כותרת מותג (Brand Header)</h3>
          <ul style={ulStyle}>
            <li>Progress Ring גדול עם ציון (76%)</li>
            <li>שם מותג: <strong>All4Horses</strong> — fontSize: 26px, fontWeight: 700</li>
            <li>בדג׳ <strong>&ldquo;נוכחות חזקה&rdquo;</strong> (בורדר טורקיז)</li>
            <li>כפתורים: &ldquo;לוח בקרה&rdquo; (משני) + &ldquo;סריקה חדשה&rdquo; (שחור)</li>
          </ul>

          <h3 style={h3Style}>ארבע לשוניות (Tabs)</h3>
          <div style={{ padding: 12, background: "#fff", border: "1px solid #E0E0E0", borderRadius: 10, fontFamily: "monospace", fontSize: 14, textAlign: "center", marginBottom: 16 }}>
            [סקירה] &nbsp;&nbsp; [שאילתות 37] &nbsp;&nbsp; [קהלים 5] &nbsp;&nbsp; [מוצרים / שירותים]
          </div>
          <Alert type="warning">&ldquo;מוצרים / שירותים&rdquo; היא לשונייה רביעית בדף /scan — לא בניווט הראשי! כל מותג יש לו את המוצרים שלו.</Alert>

          <h3 style={h3Style}>שורת מטריקות — 4 כרטיסים</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 16 }}>
            {[
              ["76%", "שיעור אזכור"],
              ["#9.7", "מיקום ממוצע"],
              ["70%", "איכות ציטוט"],
              ["100%", "סיכון מוניטין"],
            ].map(([val, label]) => (
              <div key={label} style={{ padding: 12, background: "#fff", border: "1px solid #E0E0E0", borderRadius: 10, textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{val}</div>
                <div style={{ fontSize: 12, color: "#727272" }}>{label}</div>
              </div>
            ))}
          </div>

          <h3 style={h3Style}>השוואת מנועי AI — שני כרטיסים</h3>
          <ul style={ulStyle}>
            <li><strong>ChatGPT (GPT-4o):</strong> 57% — progress bar טורקיז — &ldquo;25 / 37 שאילתות מוזכר&rdquo;</li>
            <li><strong>Google Gemini:</strong> 73% — progress bar כחול <code style={codeStyle}>#4285F4</code> — &ldquo;30 / 37 שאילתות מוזכר&rdquo;</li>
          </ul>
          <Alert type="info"><strong>אין</strong> stacked bars, <strong>אין</strong> bar charts — רק שני כרטיסים נקיים!</Alert>

          <h3 style={h3Style}>שלבי מסע לקוח — כרטיסים קומפקטיים</h3>
          <p style={pStyle}>5 כרטיסים בשורה אופקית (grid 5 עמודות). ציון &gt;= 80% מוצג בטורקיז, מתחת בשחור.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginBottom: 16 }}>
            {[
              ["חשיפה", "85%", true],
              ["מחקר", "78%", false],
              ["החלטה", "62%", false],
              ["תמיכה", "90%", true],
              ["מוניטין", "95%", true],
            ].map(([name, pct, isTeal]) => (
              <div key={name as string} style={{ padding: 10, background: "#fff", border: "1px solid #E0E0E0", borderRadius: 10, textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: isTeal ? "#10A37F" : "#000" }}>{pct}</div>
                <div style={{ fontSize: 12, color: "#727272" }}>{name as string}</div>
              </div>
            ))}
          </div>

          <h3 style={h3Style}>עוד סקשיינים בטאב סקירה</h3>
          <ul style={ulStyle}>
            <li><strong>פרסונה שזוהתה + מתחרים</strong> — שני כרטיסים זה לצד זה</li>
            <li><strong>סנטימנט + איכות ציטוט</strong> — שני כרטיסים עם Donut Charts</li>
            <li><strong>מה עבד + מה חסר</strong> — V ירוק / X אפור + bullet points</li>
            <li><strong>קשר בין SEO ל-GEO</strong> — Toggle buttons + טבלה</li>
            <li><strong>Top 5 שאילתות מובילות</strong> — טבלה מינימלית</li>
          </ul>
        </Section>

        {/* 5. Scan Queries */}
        <Section id="scan-queries" number={5} title="דף 2: סריקה — טאב שאילתות">
          <Screenshot src="/spec-screenshots/03-scan-queries-tab.png" caption="טאב שאילתות — טבלה + פילטרים" />
          <Screenshot src="/spec-screenshots/04-scan-query-expanded-snippet.png" caption="שאילתה פתוחה עם snippets + כפתור ״הצג תשובה מלאה״" />
          <Screenshot src="/spec-screenshots/05-scan-query-full-answer.png" caption="תשובה מלאה מ-ChatGPT (אחרי לחיצה)" />

          <h3 style={h3Style}>פילטרים</h3>
          <ul style={ulStyle}>
            <li><strong>סטטוס:</strong> הכל (37) | מוזכר (34) | חסר (3) | שלילי (0)</li>
            <li><strong>פרסונה:</strong> כל הפרסונות | מאיה | יוסי | אורי | דוד | רונית</li>
          </ul>

          <h3 style={h3Style}>טבלת שאילתות</h3>
          <p style={pStyle}>עמודות: # | שאילתה | פרסונה (badge) | שלב (badge) | ChatGPT (V/X) | Gemini (V/X) | חץ</p>
          <p style={pStyle}><strong>לחיצה על שורה</strong> → נפתח panel מתחתיה עם רקע <code style={codeStyle}>#F9F9F9</code></p>

          <h3 style={h3Style}>Panel פתוח — תשובות מנועים</h3>
          <ul style={ulStyle}>
            <li><strong>ChatGPT (GPT-4o):</strong> אייקון ירוק + badge &ldquo;מוזכר&rdquo;/&ldquo;לא מוזכר&rdquo; + snippet מקוצר</li>
            <li><strong>Google Gemini:</strong> אייקון כחול + badge + snippet</li>
          </ul>

          <Alert type="info">
            <strong>כפתור &ldquo;הצג תשובה מלאה&rdquo;</strong> — לוחצים → ה-snippet מתחלף לתשובה המלאה (טקסט ארוך עם bullet points).<br/>
            <strong>כפתור &ldquo;הסתר תשובה מלאה&rdquo;</strong> — חוזר ל-snippet.<br/><br/>
            כפתור GPT: בורדר <code style={codeStyle}>#10A37F</code> | כפתור Gemini: בורדר <code style={codeStyle}>#4285F4</code>
          </Alert>
        </Section>

        {/* 6. Scan Audiences */}
        <Section id="scan-audiences" number={6} title="דף 2: סריקה — טאב קהלים">
          <Screenshot src="/spec-screenshots/06-scan-audiences-tab.png" caption="טאב קהלים — 5 כרטיסי פרסונות" />

          <h3 style={h3Style}>כרטיסי פרסונות (grid 3 עמודות)</h3>
          <ul style={ulStyle}>
            <li>אות ראשונה של השם (עיגול מלא בצבע) + <strong>שם</strong> + <strong>תפקיד</strong></li>
            <li><strong>אחוז רלוונטיות</strong> (גדול, בצד שמאל)</li>
            <li>תיאור + תגיות (badges): גיל, מיקום, תחום, סוג</li>
            <li>שורת נתונים: X שאילתות | X אזכורים</li>
            <li>כפתור <strong>&ldquo;הצג שאילתות&rdquo;</strong> (טורקיז)</li>
          </ul>
          <p style={{ ...pStyle, color: "#727272" }}>5 פרסונות: מאיה (82%), יוסי (71%), אורי (68%), דוד (75%), רונית (63%)</p>
          <Alert type="warning">בורדר עליון של כרטיס פרסונה: <code style={codeStyle}>3px solid #10A37F</code> (ירוק — רק בצד עליון)</Alert>
        </Section>

        {/* 7. Scan Products Tab */}
        <Section id="scan-products" number={7} title="דף 2: סריקה — טאב מוצרים / שירותים">
          <Screenshot src="/spec-screenshots/07-scan-products-tab.png" caption="טאב מוצרים/שירותים — 6 כרטיסי מוצרים" />

          <h3 style={h3Style}>באנר הסבר</h3>
          <p style={pStyle}>כרטיס עם אייקון info, כותרת <strong>&ldquo;מוצרים / שירותים — מה זה ולמה?&rdquo;</strong></p>

          <h3 style={h3Style}>כרטיסי מוצרים (grid 3 עמודות)</h3>
          <p style={pStyle}>6 כרטיסים: רכיבה טיפולית (82%), קייטנת סוסים (68%), שיעורי רכיבה (75%), אביזרי רכיבה (45%), טיולי סוסים (71%), אירועים בחווה (58%)</p>
          <p style={pStyle}>כל כרטיס: שם + badge סוג (מוצר/שירות) + ציון + 3 מטריקות + שאילתה מובילה</p>
          <Alert type="info"><strong>חשוב:</strong> הטאב הזה מופיע בתוך דף /scan — לא בניווט הראשי! כל מותג יש לו את המוצרים שלו.</Alert>
        </Section>

        {/* 8. New Scan */}
        <Section id="new-scan" number={8} title="דף 3: סריקה חדשה ( /new-scan ) — 4 מסכים">
          <h3 style={h3Style}>מסך 1: הזנת פרטי מותג</h3>
          <Screenshot src="/spec-screenshots/08-newscan-screen1.png" caption="מסך 1 — הזנת פרטים (טופס מותג)" />
          <ul style={ulStyle}>
            <li>באנר ירוק: &ldquo;בדיקת נוכחות ב-AI&rdquo;</li>
            <li>Step indicator: 3 שלבים — 1.פרטים (פעיל) → 2.קהלים → 3.סריקה</li>
            <li>טופס: שדה &ldquo;כתובת האתר&rdquo; + שדה &ldquo;שם המותג&rdquo;</li>
            <li>כפתור &ldquo;המשך לבחירת קהלים&rdquo; (שחור, רוחב מלא)</li>
          </ul>

          <h3 style={h3Style}>מסך 2: אנימציית ניתוח</h3>
          <Screenshot src="/spec-screenshots/09-newscan-screen2.png" caption="מסך 2 — אנימציית ניתוח אתר" />
          <ul style={ulStyle}>
            <li>אנימציית לוגו מסתובב עם pulse rings</li>
            <li>&ldquo;מנתח את האתר..&rdquo; + progress bar עם shimmer</li>
          </ul>

          <h3 style={h3Style}>מסך 3: בחירת פרסונות/קהלי יעד</h3>
          <Screenshot src="/spec-screenshots/10-newscan-screen3.png" caption="מסך 3 — בחירת פרסונות (grid 2 עמודות)" />
          <ul style={ulStyle}>
            <li>Step indicator: שלב 2 פעיל</li>
            <li>כרטיסי פרסונות (grid 2 עמודות) עם checkbox</li>
            <li>סטטיסטיקה: &ldquo;~ 35 שאילתות יבדקו&rdquo; | &ldquo;5 / 5 נבחר&rdquo;</li>
            <li>כפתור &ldquo;התחלת סריקה&rdquo; (שחור)</li>
          </ul>

          <h3 style={h3Style}>מסך 4: תהליך הסריקה</h3>
          <Screenshot src="/spec-screenshots/11-newscan-screen4.png" caption="מסך 4 — תהליך סריקה עם שאילתות" />
          <ul style={ulStyle}>
            <li>אנימציית לוגו מסתובב + progress bar</li>
            <li>Tabs: שאילתות | GPT | Gemini | ניתוח | קהלים | אתר</li>
            <li>רשימת שאילתות עם V ירוק + שאילתה נוכחית עם typing cursor</li>
          </ul>

          <Alert type="info">
            <strong>אנימציות מוגדרות ב-globals.css:</strong> spin-slow, spin-reverse (גלגלי שיניים), wave (עמודות אודיו), shimmer (progress bar), typing-cursor (קרסור מהבהב)
          </Alert>
        </Section>

        {/* 9. Products Page */}
        <Section id="products-page" number={9} title="דף 4: מוצרים ושירותים ( /products )">
          <Screenshot src="/spec-screenshots/12-products-page-full.png" caption="דף מוצרים/שירותים מלא" />

          <h3 style={h3Style}>באנר הסבר</h3>
          <p style={pStyle}>כרטיס info עם הסבר מפורט ודוגמה (CallMobile) + 4 badges</p>

          <h3 style={h3Style}>כותרת מותג</h3>
          <p style={pStyle}><strong>CallMobile</strong> (badge &ldquo;לדוגמה&rdquo;) — callmobile.co.il — 4 מטריקות: מוצרים (6) | שאילתות (64) | מוזכר (46) | ציון (68%)</p>

          <h3 style={h3Style}>פילטר סוג</h3>
          <p style={pStyle}>3 כפתורים: <strong>הכל (6)</strong> | מוצרים (3) | שירותים (3) — כפתור פעיל: רקע שחור</p>

          <h3 style={h3Style}>כרטיסי מוצרים (grid 3 עמודות)</h3>
          <p style={pStyle}>6 כרטיסים: Mercedes-Benz (78%) | Hyundai (72%) | Kia (65%) | ליסינג תפעולי (70%) | ביטוח רכב (58%) | מרכז שירות (62%)</p>
          <Alert type="warning">
            בורדר עליון כרטיסי <strong>מוצרים:</strong> <code style={codeStyle}>3px solid #4285F4</code> (כחול)<br/>
            בורדר עליון כרטיסי <strong>שירותים:</strong> <code style={codeStyle}>3px solid #10A37F</code> (טורקיז)
          </Alert>

          <h3 style={h3Style}>עוד סקשיינים</h3>
          <ul style={ulStyle}>
            <li><strong>מתחרים:</strong> דלק מוטורס, אלדן, יוניון מוטורס, שלמה SIXT — עם progress bars</li>
            <li><strong>חולשות מול מתחרים:</strong> 5 bullet points</li>
            <li><strong>כיסוי לפי שלב במסע לקוח:</strong> חשיפה (72%) | מחקר (85%) | החלטה (68%) | תמיכה (76%)</li>
          </ul>
        </Section>

        {/* 10. Changelog */}
        <Section id="changelog" number={10} title="שינויים שבוצעו לאחר פידבק">
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>שינוי</th>
                <th style={thStyle}>מה היה</th>
                <th style={thStyle}>מה עכשיו</th>
                <th style={thStyle}>סיבה</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["הדר — CSS Grid", "Flexbox", "Grid 3 עמודות 1fr auto 1fr", "יישור אחיד בכל הדפים"],
                ["מוצרים/שירותים", "בתפריט העליון", "לשונייה 4 בדף /scan", "זה פר-מותג, לא גלובלי"],
                ["שלבי מסע לקוח", "Progress bars אופקיים", "כרטיסים קומפקטיים", "פידבק — תופס מלא מקום"],
                ["השוואת AI", "Stacked bars", "2 כרטיסים נקיים", "לא נראה טוב"],
                ["תשובה מלאה", "לא היה", "כפתור הצג תשובה מלאה", "בקשה להציג תשובות מלאות"],
                ["הדר+פוטר ב-new-scan", "לא היו", "נוספו לכל 4 המסכים", "עקביות"],
              ].map(([change, was, now, reason]) => (
                <tr key={change}>
                  <td style={tdStyle}><strong>{change}</strong></td>
                  <td style={tdStyle}>{was}</td>
                  <td style={tdStyle}>{now}</td>
                  <td style={tdStyle}>{reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        {/* 11. Priorities */}
        <Section id="priorities" number={11} title="מה צריך לעצב — סדר עדיפויות">
          <h3 style={{ ...h3Style, color: "#c0392b" }}>עדיפות גבוהה</h3>
          <ul style={ulStyle}>
            <li>דשבורד ראשי — כרטיסי מותגים + מטריקות + פעולות ממתינות</li>
            <li>דף סריקה — טאב סקירה (מטריקות, AI comparison, journey stages, signals)</li>
            <li>דף סריקה — טאב שאילתות (טבלה + expanded row + full answer)</li>
            <li>דף סריקה — טאב קהלים (כרטיסי פרסונות)</li>
            <li>הדר ופוטר (template אחיד)</li>
          </ul>
          <h3 style={{ ...h3Style, color: "#e67e22" }}>עדיפות בינונית</h3>
          <ul style={ulStyle}>
            <li>תהליך סריקה חדשה — 4 מסכים</li>
            <li>דף סריקה — טאב מוצרים/שירותים</li>
            <li>דף מוצרים מלא (/products)</li>
          </ul>
          <h3 style={{ ...h3Style, color: "#27ae60" }}>עדיפות נמוכה</h3>
          <ul style={ulStyle}>
            <li>אנימציות תהליך הסריקה (ניתן לפשט)</li>
            <li>States שונים (loading, empty, error)</li>
          </ul>
        </Section>

        {/* Footer */}
        <div style={{ textAlign: "center", padding: "32px 0 48px", color: "#999", fontSize: 13 }}>
          נבנה על ידי Claude Code (Opus 4.6) — עבור אינה (מעצבת) — כיוון עיצובי למוצר Geoscale
        </div>
      </div>
    </div>
  );
}

/* ---- Reusable Components ---- */

function Section({ id, number, title, children }: { id: string; number: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingTop: 24 }}>
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", background: "#10A37F", color: "#fff", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>{number}</span>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, background: "#fff", border: "1px solid #E0E0E0", borderRadius: 10, marginBottom: 16 }}>
      {children}
    </div>
  );
}

function Screenshot({ src, caption }: { src: string; caption: string }) {
  return (
    <figure style={{ margin: "16px 0" }}>
      <div style={{ border: "1px solid #E0E0E0", borderRadius: 10, overflow: "hidden", background: "#fff" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={caption} style={{ width: "100%", display: "block" }} />
      </div>
      <figcaption style={{ fontSize: 12, color: "#999", textAlign: "center", marginTop: 6 }}>{caption}</figcaption>
    </figure>
  );
}

function Alert({ type, children }: { type: "info" | "warning"; children: React.ReactNode }) {
  const colors = type === "warning"
    ? { bg: "#FFF8E1", border: "#FFD54F", icon: "⚠" }
    : { bg: "#E8F5E9", border: "#10A37F", icon: "ℹ" };
  return (
    <div style={{ padding: "12px 16px", background: colors.bg, borderRight: `3px solid ${colors.border}`, borderRadius: 8, marginBottom: 16, fontSize: 14, lineHeight: 1.7 }}>
      <span style={{ marginLeft: 6 }}>{colors.icon}</span> {children}
    </div>
  );
}

/* ---- Shared Styles ---- */

const h3Style: React.CSSProperties = { fontSize: 16, fontWeight: 600, margin: "20px 0 8px" };
const pStyle: React.CSSProperties = { fontSize: 14, lineHeight: 1.7, color: "#333", margin: "0 0 12px" };
const ulStyle: React.CSSProperties = { fontSize: 14, lineHeight: 1.8, color: "#333", margin: "0 0 16px", paddingRight: 20 };
const tableStyle: React.CSSProperties = { width: "100%", borderCollapse: "collapse", marginBottom: 16, fontSize: 13, background: "#fff", borderRadius: 10, overflow: "hidden" };
const thStyle: React.CSSProperties = { padding: "10px 12px", textAlign: "right", background: "#F5F5F5", borderBottom: "1px solid #E0E0E0", fontWeight: 600 };
const tdStyle: React.CSSProperties = { padding: "8px 12px", borderBottom: "1px solid #F0F0F0", verticalAlign: "top" };
const codeStyle: React.CSSProperties = { background: "#F5F5F5", padding: "1px 6px", borderRadius: 4, fontFamily: "monospace", fontSize: 12 };
