---
title: "UHF RFID in der Bierproduktion: CIP/SIP-Beständigkeit, KEG-Tracking und EHEDG"
slug: uhf-rfid-in-der-bierproduktion-cip-sip-bestandigkeit-keg-tracking-und-ehedg
description: "Technische Analyse von UHF RFID in der Brauerei: PEEK/PPS-Kapseln
  auf Edelstahl 316L für CIP/SIP (2 % NaOH bei 80 °C, 1 % HNO₃, IP69K), passive
  Tags mit User-Memory im 98 °C Sudhaus vs. semi-passive BAP-Logger im
  Gärkeller, GS1 GRAI/EPCIS 2.0 für 50.000 Mehrweg-KEGs, EHEDG, VO (EG)
  1935/2004 und TCO-Vergleich."
date: 2026-06-09T22:00:00.000Z
image: industrial_uhf_rfid_applications-1_4.jpg
categories:
  - RFID Solutions
tags:
  - Bierproduktion
  - CIP/SIP
  - PEEK/PPS
  - GS1 GRAI
  - EHEDG
  - KEG Tracking
translationKey: beer-production-uhf-rfid-cip-keg-tracking
---
In einer bayerischen Brauerei mit rund 400 000 hl Jahresausstoß entscheidet 2026 nicht mehr die bloße Existenz eines RFID-Systems über die Wettbewerbsfähigkeit, sondern die Frage, ob die Chargenrückverfolgbarkeit vom Sudhaus bis zum KEG im Handel lückenlos funktioniert – und zwar unter Bedingungen, die für consumer-grade Elektronik tödlich sind: 98 °C heiße Würze im Sudhaus, 8 °C und 95 % relative Luftfeuchte im Gärkeller, tägliche CIP-Reinigung mit 2 % NaOH bei 80 °C und 1 % HNO₃, Hochdruckreinigung nach IP69K und 50 000 Mehrweg-KEGs im Umlauf. UHF RFID nach ISO/IEC 18000-63:2021 löst diese Aufgabe, wenn drei Dinge zusammenkommen: CIP-beständige PEEK/PPS-Kapseln auf Edelstahl 316L, eine saubere Trennung zwischen passiver User-Memory-Beschreibung und semi-passiven BAP-Temperaturloggern sowie die KEG-Identifikation über GS1 GRAI und EPCIS 2.0. Dieser Beitrag zeigt die ingenieurtechnischen Grundlagen, korrigiert vier typische Fehler und liefert eine TCO-Betrachtung für 50 000 Mehrwegbehälter.

## Normen und Funktechnik: ISO/IEC 18000-63:2021 und ETSI EN 302 208

Die Funktechnik folgt dem EPC-Gen2v2-Standard ISO/IEC 18000-63:2021 mit adaptivem Q-Algorithmus und Miller-Modulation (M=4 für dichte Gruppen, M=2 für schnelle Linien). Im europäischen Band 865–868 MHz nach ETSI EN 302 208 stehen maximal 2 W ERP (33 dBm ERP) zur Verfügung; in der Praxis werden Leser mit 27–30 dBm Port-Leistung und 6–9 dBi Antennengewinn betrieben. Der Q-Parameter sollte im Sudhaus bei 50 Metallen pro Charge Q=6 (64 Slots) oder Q=7 (128 Slots) betragen, in der Abfülllinie mit 300 KEGs Q=8 (256 Slots) – Q=12 (4 096 Slots) verlängert den Inventarlauf durch leere Slots und bringt in der Brauerei keinen Vorteil.

## Sudhaus 98 °C: Warum passive Tags keine Temperatur messen

Ein häufiges Missverständnis betrifft die Rolle der UHF-Tags im Sudhaus. Passive UHF-Transponder enthalten keine Batterie und keinen eigenen Temperatursensor – sie können die 98 °C heiße Würze nicht selbst messen und aufzeichnen. Was sie tun: Sie tragen in ihrer User Memory (typisch 512 Bit bis 2 KB) die vom Sudhaus-MES über OPC UA geschriebenen Daten – Sudnummer, Stammwürze, Hopfengabe, Hefestamm und CIP-Zähler. Jede Charge (etwa 50 Metallen pro Sud) wird beim Passieren des Sudhaus-Portals mit einer Leserate von 99,8 % erfasst, und die Tags bleiben während der gesamten Würzeverarbeitung unbeschädigt.

Für die autonome Temperaturaufzeichnung im Gärkeller (+4…+12 °C) sind dagegen **semi-passive BAP-Logger** mit Lithiumbatterie zuständig (CAEN RFID qLog, Identiv). Sie schreiben alle 15 Minuten einen Messwert in den internen Speicher und werden nach Abschluss der Gärung über UHF ausgelesen. Der entscheidende Punkt: BAP-Logger werden nie im 98 °C heißen Sudhaus eingesetzt – dort sind sie thermisch zerstört. Die saubere Trennung lautet also: passive Tags für Identität und User-Memory im Sudhaus, BAP-Logger für die kontinuierliche Temperaturhistorie im Gärkeller.

## CIP-beständige Kapselung: PEEK/PPS und Edelstahl 316L

CIP- und SIP-beständige Transponder für Brauereien bestehen aus einem radioprozessen Gehäuse aus lebensmittelechtem **PEEK oder PPS**. Die Materialien erfüllen die Anforderungen der Verordnung (EG) 1935/2004, der Verordnung (EU) 10/2011 und – für PEEK – FDA 21 CFR 177.2415. Der Anschluss an Tanks und Rohrleitungen aus Edelstahl **316L** erfolgt über einen hygienegerechten Schweißhalter oder eine Klemmverbindung ohne Spalte und Toträume gemäß EHEDG-Richtlinien. Die Kapsel muss die alkalische Reinigung (2 % NaOH, 80 °C), die saure Reinigung (1 % HNO₃) und die Dampfsterilisation bis +140 °C überstehen – ohne Aufquellen, Verfärbung oder Ablösung, und mit IP69K nach ISO 20653 / IEC 60529 auch bei Hochdruckreinigung.

## KEG- und Kastenrückverfolgung nach GS1 GRAI

Für die 50 000 Mehrwegbehälter (Edelstahl-KEGs und Plastikkästen) ist die eindeutige Identifikation über GS1 GRAI (Global Returnable Asset Identifier) der Schlüssel: Jedes Fass und jeder Kasten trägt eine weltweit eindeutige Nummer, die in EPCIS 2.0-Ereignissen mit jeder Abfüllung, jedem Rücklauf und jeder Reinigung verknüpft wird. Auf metallischen KEGs werden niedrigprofilige On-Metal-Transponder mit keramischem oder ferritischem Sockel in einer Schutzmanschette eingesetzt (Xerafy, HID Global). Auf Plastikkästen kommen ultraschallverschweißte oder eingegossene IP69K-Kapseln zum Einsatz. Die Leser (Siemens SIMATIC RF600, Impinj R700) mit zirkular polarisierten Antennen erfassen die Behälter automatisch an der Rampe und in der Abfülllinie, ohne manuelles Scannen von Barcodes.

## Vier technische Fehler älterer Brauerei-Lösungen

### Fehler 1: Passive Tags als Temperaturlogger missverstanden

Passive UHF-Tags messen keine Temperatur. Im Sudhaus schreibt das MES über OPC UA Sudnummer, Stammwürze und CIP-Zähler in die User Memory. Autonome Temperaturaufzeichnung im Gärkeller erfolgt ausschließlich über BAP-Logger.

### Fehler 2: Metallgehäuse für CIP-Tags

Ein geschlossenes Metallgehäuse würde das UHF-Signal abschirmen. Die korrekte Bauform ist eine radioprozesse PEEK/PPS-Kapsel mit keramischem Resonator und Edelstahl-316L-Halterung nach EHEDG.

### Fehler 3: KEG-Tracking ohne GRAI

Ohne GRAI ist eine eindeutige Identifikation jedes Fasses über den gesamten Lebenszyklus nicht möglich. Barcode-Scans an der Rampe sind langsam und fehleranfällig. GRAI + EPCIS 2.0 sind der einzige standardkonforme Weg.

### Fehler 4: Fehlende OPC-UA-Integration

Die RFID-Leser müssen über OPC UA in das Brauerei-MES integriert werden, damit jede User-Memory-Beschreibung im Audit-Trail erscheint. Standalone-Lösungen ohne MES-Anbindung erzeugen Datensilos.

## TCO/ROI für 50 000 KEGs und Plastikkästen

Die folgende Matrix vergleicht drei Identifikationsoptionen für einen bayerischen Brauereibetrieb mit 50 000 Mehrwegbehältern. Die Preise sind gerundete Marktwerte für 2026 und dienen als ingenieurtechnische Orientierung.

| Kostenposition | Barcode / manuelles Scannen | Standard-UHF-Tag (nicht CIP-fest) | CIP/SIP-Transponder (PEEK/PPS) |
|---|---|---|---|
| Kosten pro Behälter | 0,01–0,03 € (Etikett) | 1–3 € | 8–20 € |
| Lebensdauer bei 2 % NaOH / 80 °C und 1 % HNO₃ | Etikett löst sich nach wenigen Zyklen | Tag zerstört (Kleber angelöst, Antenne verstimmt) | > 5 Jahre bei korrekter EHEDG-Montage |
| Erfassung an der Rampe | Manuell, pro Behälter | nur mit Portal, aber Tag fällt aus | Automatisch, 300 Behälter/Stunde/Portal |
| Reduktion der Behälterverluste | Keine | Gering | −15–20 % pro Jahr |
| Gesamtkosten (50 000 Behälter, 3 Jahre) | 500–1 500 € Etiketten + hoher Personal-OPEX | 50 000–150 000 € + jährlicher Ersatz | 400 000–1 000 000 € (einmalig, dann wartungsarm) |

Die Matrix zeigt: CIP-feste Transponder sind pro Stück deutlich teurer, aber die einzige Option, die über hunderte Reinigungszyklen ohne Ausfall überlebt. Bei einem KEG-Wert im mittleren dreistelligen Euro-Bereich amortisiert sich die Investition über die Reduktion der Behälterverluste (−15–20 %/Jahr) und die eingesparte manuelle Rampenzeit innerhalb von 2–4 Jahren.

## Fazit: Durchgängige Chargen- und KEG-Rückverfolgbarkeit in deutschen Brauereien 2026–2027

Für deutsche Brauereien ergibt sich 2026–2027 eine klare Architektur: Das Sudhaus wird mit passiven CIP-beständigen UHF-Tags (PEEK/PPS, Edelstahl 316L, EHEDG-konform) ausgerüstet, die vom MES über OPC UA mit Sudnummer und CIP-Zähler beschrieben werden. Der Gärkeller wird durch semi-passive BAP-Logger für die kontinuierliche Temperaturhistorie (+4…+12 °C) ergänzt. Die 50 000 Mehrwegbehälter erhalten einen GRAI-basierten Transponder, der zusammen mit EPCIS 2.0 eine lückenlose Rückverfolgbarkeit vom Fass bis zum Handel ermöglicht. Damit werden die Hygieneanforderungen nach EHEDG und IFS Food, die lebensmittelrechtliche Konformität nach 1935/2004 und 10/2011 sowie die betriebswirtschaftlichen Vorteile eines automatisierten Behältermanagements gleichzeitig erfüllt.

## Häufig gestellte Fragen (FAQ)

### Messen passive UHF-Tags die Temperatur im Sudhaus?

Nein. Passive Tags haben keine Batterie und keinen Temperatursensor. Sie tragen in ihrer User Memory die vom MES über OPC UA geschriebenen Daten (Sudnummer, Stammwürze, CIP-Zähler). Autonome Temperaturaufzeichnung erfolgt nur über semi-passive BAP-Logger – und die werden nicht im 98 °C heißen Sudhaus eingesetzt.

### Wie wird die CIP-Beständigkeit nachgewiesen?

Durch Materialkonformität nach (EG) 1935/2004 und (EU) 10/2011 (PEEK/PPS), Montage nach EHEDG ohne Toträume und Schutzart IP69K nach ISO 20653 / IEC 60529. Der Hersteller muss die Beständigkeit gegen 2 % NaOH bei 80 °C, 1 % HNO₃ und Dampf bis +140 °C dokumentieren.

### Warum GS1 GRAI für KEGs und Kästen?

GRAI (Global Returnable Asset Identifier) liefert eine weltweit eindeutige Nummer für jedes Mehrwegfass und jeden Kasten. Zusammen mit EPCIS 2.0 wird jede Abfüllung, jeder Rücklauf und jede Reinigung als standardisiertes Ereignis dokumentiert – Barcodes können das nicht leisten.

### Welche Rolle spielt OPC UA in der Brauerei?

OPC UA verbindet die RFID-Leser mit dem Brauerei-MES. Jede User-Memory-Beschreibung und jeder Statuswechsel wird als Datensatz im Audit-Trail dokumentiert, sodass die Chargenrückverfolgbarkeit von der Sudnummer bis zum KEG revisionssicher ist.

**Autor:** Yurii Kasian, RFID-Ingenieur · RFID Ukraine · Aktualisiert: 14. November 2026
