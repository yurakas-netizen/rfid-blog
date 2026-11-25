---
title: "UHF-RFID in der Recycling-Sortierung: 99 % Sortiergenauigkeit bei 200 °C
  und Shredder-Bedingungen"
slug: uhf-rfid-in-der-recycling-sortierung-99-sortiergenauigkeit-bei-200-c-und
description: "Technische Analyse von UHF-RFID in deutschen Sortier- und
  Recyclinganlagen: HF-Physik bei 3 m/s und 200–220 °C, Q = 4–6 und FM0/Miller
  M=2, PPS-Hardtags und Keramik-On-Metal-Transponder (Al₂O₃) mit gesintertem
  Ferrit, Wirbelstrom-Störungen in WEEE-Linien sowie Hybrid-TCO für 100.000
  Tonnen Jahresdurchsatz."
date: 2026-06-08T22:00:00.000Z
image: industry_4.0_identification-2_3.jpg
categories:
  - RFID Solutions
tags:
  - Recycling
  - Hochtemperatur-RFID
  - WEEE
  - PPS-Keramik-Transponder
  - Wirbelstrom
  - ESPR DPP
translationKey: recycling-sorting-uhf-rfid-high-temp
---
In deutschen Sortier- und Recyclinganlagen für Verpackungen, Elektro- und Elektronik-Altgeräte (WEEE) und Mehrweg-Kunststoffe treffen zwei extrem gegensätzliche Welten aufeinander: Hochgeschwindigkeits-Förderbänder mit 2,8–3,0 m/s und Thermoprozesse in Trocknungs- und Heißwaschzonen mit bis zu 200–220 °C. Ein passiver UHF-Transponder kann unter diesen Bedingungen nur dann zuverlässig identifiziert werden, wenn die HF-Physik, die Materialauswahl und die Lese-Strategie exakt auf den jeweiligen Prozessschritt abgestimmt sind. Die zentrale ingenieurtechnische Erkenntnis lautet: Ein UHF-Tag überlebt keinen Shredder – er wird entweder vor der Zerkleinerung (Pre-Sorting) oder nach der Fraktionierung auf den nachgelagerten Förderbändern gelesen. Für die thermisch hochbelasteten Zonen (200 °C auf Metall) sind spezielle Hochtemperatur-Transponder mit gesinterten Ferriten (Curie-Temperatur > 250 °C), PPS-, PEEK- oder Keramik-Gehäusen (Al₂O₃) erforderlich. Dieser Artikel liefert die ingenieurtechnischen Grundlagen, zwei anonymisierte Referenzszenarien für den DACH-Raum, eine Vergleichsmatrix der Transponderklassen sowie eine TCO/ROI-Betrachtung für eine Anlage mit 100.000 Tonnen Jahresdurchsatz.

## Systemarchitektur und HF-Physik bei 200 °C und 3 m/s Bandgeschwindigkeit

Die Luftschnittstelle nach **ISO/IEC 18000-63:2021** (EPC Gen2v2) definiert für UHF-RFID im 860–960 MHz-Band die Modulationsformate **FM0** und **Miller M=2** (sowie M=4 und M=8) sowie den dynamischen Q-Algorithmus zur Kollisionsauflösung. Auf einem Förderband mit 2,8–3,0 m/s und einer Lesezone von 200–330 ms ist die Anzahl der verfügbaren Slots pro Inventarrunde entscheidend: **Q = 4–6** (16–64 Slots) ist der realistische Bereich, um die zur Verfügung stehende Zeit optimal zu nutzen. Ein Q von 8–12 (256–4096 Slots) würde die Inventarrunde so weit verlängern, dass ein erheblicher Teil der Tags das Lesefenster unerkannt passiert. FM0 bietet die höchste Datenrate und eignet sich für schnelle Förderbänder, während Miller M=2 durch die Subträger-Modulation eine höhere Störfestigkeit gegenüber Reflexionen von Metallkonstruktionen bietet – ein relevanter Kompromiss in Recyclingumgebungen mit vielen metallischen Störkörpern.

Die Sendeleistung ist in Europa durch **ETSI EN 302 208** auf **2 W ERP (33 dBm ERP)** im Band 865–868 MHz begrenzt. In der Praxis werden Portal-Leser mit 27–30 dBm Port-Leistung und 6–9 dBi Antennengewinn betrieben, um diese Grenze einzuhalten. Für Hochtemperaturzonen (200–220 °C) ist die wesentliche physikalische Einschränkung nicht die Sendeleistung, sondern die Materialstabilität des Transponders: Herkömmliche polymerbasierte Ferritfolien degradieren oberhalb von 125–150 °C. Für den dauerhaften Einsatz bei 200 °C auf metallischen Oberflächen sind **gesinterte Ferritplatten** mit einer Curie-Temperatur von über 250–300 °C oder **Keramikträger aus Al₂O₃** mit Gold-/Platin-Metallisierung erforderlich. Diese Materialien gewährleisten, dass die Antenne auch nach zahlreichen Thermozyklen ihre Impedanz und damit ihre Lesbarkeit behält.

## Referenzszenarien in deutschen Sortier- und Recyclinganlagen

### Szenario A: Hochtemperatur-Kunststoff- und Mehrweg-Sortierlinie

In einer Anlage für PET- und HDPE-Mehrwegverpackungen durchlaufen die Kunststoffflakes nach der Heißwäsche einen Trocknungstunnel bei 200–220 °C. Die Transponder auf den Mehrwegbehältern und auf den Flakes-Gebinden müssen diese Zone überstehen, ohne ihre Lesbarkeit zu verlieren. Die Identifikation erfolgt **vor** dem Trocknungstunnel (Pre-Sorting, z. B. zur Steuerung der Sortierfraktionen) und **nach** der Abkühlung auf < 80 °C auf dem Fraktionsförderband. Die Lesezone am Portal ist auf 200–330 ms bei 3,0 m/s ausgelegt; mit Q = 4–6 und FM0 werden die Tags zuverlässig erfasst. Die eingesetzten Transponder sind PPS-Hardtags (dauerhaft 200 °C, kurzzeitig 220 °C) mit gesintertem Ferrit für die Metallentkopplung.

### Szenario B: WEEE- und Metallseparationslinie nahe Wirbelstromscheidern

In einer WEEE-Sortierlinie werden Elektroaltgeräte und metallhaltige Fraktionen durch Magnet- und **Wirbelstromscheider** (Eddy-Current-Abscheider) getrennt. Der rotierende Magnetrotor erzeugt ein starkes niederfrequentes Magnetfeld (1–3 kHz), das als Störquelle auf die UHF-Kommunikation einwirkt. Die Portalantennen werden daher in einem Abstand von mindestens 2,0 m zum Wirbelstromscheider positioniert, und die Koaxialkabel werden doppelt geschirmt ausgeführt, um Einkopplungen zu minimieren. Die Transponder auf den WEEE-Fraktionen sind keramische On-Metal-Tags (Al₂O₃), die sowohl die mechanische Belastung auf dem Förderband als auch die thermischen Spitzen (z. B. bei der Trocknung von Kondensatoren) überstehen. Die Identifikation dient der Erfassung von Stoffströmen für die WEEE-Rücknahmebilanz nach Richtlinie 2012/19/EU sowie der Vorbereitung für den Digitalen Produktpass nach ESPR (EU) 2024/1781.

## Vergleichsmatrix: Standard-UHF vs. Hochtemperatur-Polyimid vs. Keramik/PPS On-Metal

| Transponderklasse | Temperaturbereich (Dauer / Spitze) | Montage / Material | Stückpreis (2026) | Typische Anwendung |
|---|---|---|---|---|
| Standard-UHF (Polymer-Ferrit) | bis 85 °C / 125 °C | Klebefolie, flexibel | 0,35–0,80 € | Kunststoff- und Glasbehälter, Pre-Sorting |
| Hochtemperatur-Polyimid (Kapton) | bis 150 °C / 200 °C | Klebefolie, flexibel | 0,90–1,80 € | Trocknungszonen, nicht-metallische Träger |
| PPS-Hardtag (gesinterter Ferrit) | 200 °C dauerhaft / 220 °C Spitze | Schraub- oder Klebemontage, IP69K | 2,50–4,50 € | Metallische Mehrwegbehälter, Heißwäsche |
| Keramik On-Metal (Al₂O₃) | 250–300 °C Spitze | Hochtemperatur-Keramikkleber, IP69K | 4,00–6,50 € | Turbinenschaufeln, WEEE-Metallfraktionen, 200–220 °C |

Die Matrix macht die ingenieurtechnische Entscheidungskette deutlich: Für Kunststoff- und Glasbehälter im Pre-Sorting reichen Standard-UHF-Tags (0,35–0,80 €). Für Trocknungszonen bis 150 °C sind Polyimid-Tags (Kapton) die wirtschaftliche Wahl. Für metallische Mehrwegbehälter mit Heißwäsche bis 200 °C sind PPS-Hardtags mit gesintertem Ferrit erforderlich. Für die extremsten Zonen (200–220 °C, Metall, IP69K) kommen ausschließlich keramische On-Metal-Transponder (Al₂O₃) in Frage, deren Preis von 4,00–6,50 € angesichts der Belastung und der geforderten Lebensdauer gerechtfertigt ist.

## TCO- und ROI-Kalkulation für eine Sortieranlage (100.000 Tonnen/Jahr, 5 Jahre)

Die folgende Kalkulation vergleicht zwei Identifikationsstrategien für eine Sortieranlage mit 100.000 Tonnen Jahresdurchsatz und einer Laufzeit von fünf Jahren. Die Preise sind gerundete Marktwerte für 2026 und dienen als ingenieurtechnische Orientierung.

| Kostenposition | Nur Standard-UHF (Pre-Sorting, Kunststoff/Glas) | Hybrid: Standard + PPS/Keramik (Hochtemperaturzonen) |
|---|---|---|
| Transponderkosten (einmalig) | 50.000 € (ca. 100.000 Tags à 0,50 €) | 120.000 € (gemischt: 80.000 Standard + 8.000 PPS/Keramik à 5,00 €) |
| Leser- und Antenneninfrastruktur (CAPEX) | 80.000 € | 120.000 € (zusätzliche Portale in Hochtemperaturzonen) |
| Wartung und Ersatz (5 Jahre) | 15.000 € | 25.000 € (Hochtemperatur-Tags haben längere Lebensdauer) |
| Einsparung durch Fehlerreduktion (5 Jahre) | 200.000 € (weniger manuelle Nacharbeit) | 350.000 € (zusätzliche Einsparung in Hochtemperaturzonen) |
| **Netto-Gesamtkosten (5 Jahre)** | **-55.000 €** (Einsparung übersteigt CAPEX) | **-85.000 €** (Einsparung übersteigt CAPEX) |

Die Hybridstrategie erfordert eine höhere Anfangsinvestition (120.000 € statt 50.000 € für Transponder), erzielt aber über die längere Lebensdauer der Hochtemperatur-Tags und die zusätzlichen Einsparungen in den thermisch belasteten Zonen eine höhere Nettoeinsparung. Voraussetzung ist, dass die Hochtemperatur-Tags tatsächlich nur in den Zonen eingesetzt werden, in denen sie benötigt werden – eine pauschale Ausstattung aller Behälter mit Keramik-Tags wäre unwirtschaftlich.

## Fazit und Ausblick 2026–2027: Digitaler Produktpass (ESPR) als Treiber

Die EU-Ökodesign-Verordnung **ESPR (EU) 2024/1781** etabliert den Digitalen Produktpass (DPP) als zentrales Instrument für die Kreislaufwirtschaft. Die ersten produktgruppenspezifischen delegierten Rechtsakte werden ab 2026 für Eisen und Stahl, ab 2027 für Textilien und Reifen sowie ab 2029 für IKT-Produkte erwartet. Für die Recyclingindustrie bedeutet das: Jedes Produkt, das in den Stoffkreislauf zurückgeführt wird, muss potenziell über einen digitalen Datensatz identifizierbar sein. Die **EU-Batterieverordnung (EU) 2023/1542** macht den Anfang: Ab dem 18. Februar 2027 benötigen Industriebatterien über 2 kWh einen maschinenlesbaren Batteriepass, der über einen QR-Code zugänglich ist. UHF-RFID ist die einzige Technologie, die diese Anforderungen mit den Geschwindigkeiten und Umweltbedingungen moderner Sortieranlagen in Einklang bringen kann – vorausgesetzt, die Transponderklasse wird korrekt auf die thermische und mechanische Belastung abgestimmt. Die Jahre 2026–2027 werden zeigen, welche Anlagenbetreiber die Hybridstrategie aus Standard- und Hochtemperatur-Tags konsequent umsetzen und damit nicht nur die WEEE- und Batterie-Regulierung erfüllen, sondern auch von den Effizienzgewinnen der automatisierten Identifikation profitieren.

## Häufig gestellte Fragen (FAQ)

### Kann ein passiver UHF-Transponder einen Shredder überleben?

Nein. Die mechanische Belastung durch die rotierenden Messer eines Shredders zerstört jeden passiven Transponder. Die Identifikation muss daher entweder **vor** der Zerkleinerung (Pre-Sorting, WEEE-Module, Mehrweg-Tara) oder **nach** der Fraktionierung auf den nachgelagerten Förderbändern erfolgen. Die thermische Belastung (200–220 °C in Trocknungs- und Heißwaschzonen) wird von speziellen Hochtemperatur-Tags (PPS, Keramik) überstanden – die mechanische Zerkleinerung jedoch nicht.

### Warum Q = 4–6 und nicht Q = 8–12 auf dem Förderband?

Bei 3,0 m/s und einer Lesezone von 200–330 ms stehen nur wenige Slots zur Verfügung. Q = 4–6 (16–64 Slots) nutzt das Zeitfenster optimal. Q = 8–12 (256–4096 Slots) würde die Inventarrunde so weit verlängern, dass ein erheblicher Teil der Tags das Lesefenster unerkannt passiert. Die Modulationswahl FM0 oder Miller M=2 richtet sich nach der Störumgebung: FM0 für maximale Datenrate, Miller M=2 für höhere Störfestigkeit gegenüber Metallreflexionen.

### Welche Transponder für 200 °C auf Metall?

Für dauerhafte 200 °C auf metallischen Oberflächen sind **PPS-Hardtags mit gesintertem Ferrit** (Curie-Temperatur > 250 °C) oder **Keramik-On-Metal-Tags (Al₂O₃)** mit Gold-/Platin-Metallisierung erforderlich. Herkömmliche Polymer-Ferritfolien degradieren oberhalb von 125–150 °C. Die Preise liegen bei 2,50–6,50 € pro Tag – eine Investition, die sich angesichts der Belastung und der geforderten Lebensdauer rechtfertigt.

### Wie stören Wirbelstromscheider die UHF-Identifikation?

Der rotierende Magnetrotor eines Wirbelstromscheiders erzeugt ein niederfrequentes Magnetfeld (1–3 kHz), das als Störquelle auf die UHF-Kommunikation einwirkt. Die Portalantennen sollten daher mindestens 2,0 m Abstand zum Scheider haben, und die Koaxialkabel sind doppelt zu schirmen. In der Praxis hat sich diese Maßnahme in WEEE-Sortierlinien bewährt, um Leseraten über 99 % zu erreichen.

**Autor:** Yurii Kasian, RFID-Ingenieur · RFID Ukraine · Aktualisiert: 14. November 2026
