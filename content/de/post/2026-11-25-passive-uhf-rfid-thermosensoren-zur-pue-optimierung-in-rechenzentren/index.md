---
title: Passive UHF-RFID-Thermosensoren zur PUE-Optimierung in Rechenzentren
slug: passive-uhf-rfid-thermosensoren-zur-pue-optimierung-in-rechenzentren
description: "Technische Analyse batterieloser UHF-RFID-Temperatursensoren
  (Axzon Magnus S3, Asygn AS321x) für PUE-Optimierung und BSI-C5-konforme
  Umgebungsüberwachung in deutschen Rechenzentren: EnEfG § 11 (PUE ≤ 1,2 ab Juli
  2026), DIN EN 50600-2-3/4-2, 3×2-Raster pro Rack, ΔT-Auswertung und
  DCIM-Integration über MQTT/BACnet/IP/Modbus TCP."
date: 2026-06-09T22:00:00.000Z
image: industry_4.0_identification-4_2.jpg
categories:
  - RFID Solutions
tags:
  - PUE-Optimierung
  - UHF RFID Sensor
  - BSI C5
  - DIN EN 50600
  - Axzon Magnus S3
  - DCIM
translationKey: data-center-pue-uhf-rfid-temperature-sensors
---
In deutschen Rechenzentren wird die Optimierung der Energieeffizienz (PUE) 2026 zur regulatorischen Pflicht: Das Energieeffizienzgesetz (EnEfG § 11) verlangt für neue Anlagen ab dem 1. Juli 2026 einen PUE von ≤ 1,2, und die DIN EN 50600-4-2 definiert die verbindliche Metrik zur Berechnung. Gleichzeitig steigen die Anforderungen an die Umgebungsüberwachung durch den BSI C5:2020-Kriterienkatalog, der im Bereich OPS (Physische Sicherheit und Umgebungsbedingungen) einen lückenlosen Audit-Trail für die Klimadaten fordert. Passive, batterielose UHF-RFID-Temperatursensoren auf Basis der Chips Axzon Magnus S3 und Asygn AS321x bieten hier einen ingenieurtechnisch sauberen Weg: Sie liefern präzise Temperaturmesswerte (±0,5 °C nach Kalibrierung), benötigen keine Batterien und lassen sich in bestehende DCIM-Plattformen integrieren. Dieser Artikel zeigt die technische Architektur, eine TCO/ROI-Betrachtung für 200 Racks und die Einbindung in die Normen DIN EN 50600-2-3 und BSI C5.

## Normativer Rahmen: EnEfG, DIN EN 50600 und BSI C5

Das Energieeffizienzgesetz (EnEfG) legt in § 11 fest, dass Rechenzentren, die ab dem 1. Juli 2026 in Betrieb gehen, eine Energieverbrauchseffektivität (PUE) von höchstens 1,2 erreichen müssen; für Bestandsanlagen gelten Übergangsfristen bis 2027 (PUE ≤ 1,5) und 2030 (PUE ≤ 1,3). Die DIN EN 50600-4-2 definiert dabei die verbindliche Methode zur PUE-Berechnung als Kategorie 2 (PUE2, mittlere Auflösung), während DIN EN 50600-2-3 die Anforderungen an die Regelung der Umgebungsbedingungen (Klimatisierung, Temperatur, Feuchte) spezifiziert. Der BSI C5:2020-Kriterienkatalog ergänzt diese technischen Normen um Sicherheitsanforderungen: Im Bereich OPS (Physische Sicherheit und Umgebungsbedingungen) müssen Rechenzentrumsbetreiber nachweisen, dass die Umgebungsüberwachung manipulationssicher dokumentiert und für Audits verfügbar ist.

Für die Praxis bedeutet diese Kombination: Wer den PUE optimieren will, muss die Temperaturverteilung im Kaltgang und im Heißgang präzise kennen – nicht nur als Momentaufnahme, sondern als kontinuierliche, auditierbare Zeitreihe. Genau hier setzen passive UHF-RFID-Temperatursensoren an, die ohne Batterie auskommen und dennoch bei jeder Abfrage einen kalibrierten Messwert liefern.

## Sensorik und Funktechnik: Axzon Magnus S3 und Asygn AS321x

Die passiven UHF-Temperatursensor-ICs der neuesten Generation sind für den Einsatz auf Metalloberflächen optimiert. Der **Axzon Magnus S3** ist ein batterieloser UHF-RFID-Chip mit integriertem Temperatursensor, der im Bereich von 0 °C bis 50 °C eine Genauigkeit von ±0,3 °C erreicht (nach Zweipunktkalibrierung) und im erweiterten Bereich von −40 °C bis +85 °C spezifiziert ist. Der **Asygn AS321x** (z. B. AS3211 oder AS3213T) ist ebenfalls ein passiver UHF-RFID-IC mit integriertem Temperatursensor; er deckt einen Messbereich von −40 °C bis +120 °C ab und wird in On-Metal-Inlays eingesetzt, die direkt auf metallischen Rackblenden oder Kaltgangseinhausungen montiert werden können. Beide Chips arbeiten nach ISO/IEC 18000-63:2021 (EPC Gen2v2) und sind mit handelsüblichen UHF-Readern kompatibel.

Die Funktechnik folgt dem europäischen Frequenzplan nach ETSI EN 302 208: Im Band 865–868 MHz steht eine maximale Strahlungsleistung von 2 W ERP (33 dBm ERP) zur Verfügung, wobei in der Praxis häufig mit 27–30 dBm Port-Leistung und 6–9 dBi Antennengewinn gearbeitet wird, um die Grenzwerte einzuhalten. Für die Kaltgangüberwachung bedeutet das: Die Sensoren können mit handelsüblichen UHF-Portalen oder Deckenantennen im Kaltgang ausgelesen werden, ohne dass in die bestehende Klimatisierung eingegriffen werden muss.

## Messkonzept: 3×2-Raster pro Rack und ΔT-Auswertung

Das in der Praxis bewährte Messkonzept für die PUE-Optimierung ist ein **3×2-Raster pro Rack**: Drei Sensoren im Kaltgang (auf den Höhen 6U, 24U und 42U) und drei Sensoren im Heißgang (auf denselben Höhen). Aus den sechs Messwerten pro Rack lassen sich drei zentrale Kenngrößen ableiten: die Zulufttemperatur im Kaltgang, die Ablufttemperatur im Heißgang und die Temperaturdifferenz ΔT zwischen Kalt- und Heißgang. Ein normaler ΔT-Wert liegt bei 12–20 °C. Ist ΔT < 8 °C, deutet dies auf eine Rezirkulation heißer Luft in den Kaltgang hin (häufig durch undichte Kabeldurchführungen oder fehlende Blindplatten). Ist ΔT > 22 °C, liegt entweder eine Leckage kalter Luft in den Heißgang vor oder ein lokaler Überhitzungspunkt, der auf eine unzureichende Luftführung im Rack hindeutet.

Die Sensoren werden mit einer Mindestdichte von 0,5 W/m² im Kaltgang betrieben, was einer Feldstärke entspricht, die von den meisten passiven UHF-Sensoren zuverlässig verarbeitet wird. Die Abfrage erfolgt je nach DCIM-Konfiguration alle 30–120 Sekunden, sodass auch kurzzeitige Temperaturschwankungen (z. B. beim Öffnen von Racktüren oder bei CRAC-Umschaltvorgängen) erfasst werden.

## TCO/ROI für 200 Racks (1.200 Sensoren)

Die folgende Matrix vergleicht drei Sensoroptionen für ein Rechenzentrum mit 200 Racks und 1.200 Messpunkten (3×2-Raster). Die Preise sind gerundete Marktwerte für 2026 und dienen als ingenieurtechnische Orientierung.

| Kostenposition | Kabelgebundene PT100/PT1000-Sensoren | Batteriebetriebene BLE/LoRa-Sensoren | Passive UHF-RFID-Sensoren (Axzon/Asygn) |
|---|---|---|---|
| Kosten pro Sensor | 80–150 € (inkl. Verkabelung) | 25–60 € | 5–15 € (On-Metal-Inlay) |
| Batterie / Entsorgung (EU 2023/1542) | Nein | Ja, jährlich / alle 2–5 Jahre | Nein |
| Infrastruktur | Kabeltrassen, Patchpanels, IO-Module | BLE-Gateways oder LoRaWAN-Basisstationen | UHF-Reader + Antennen (oft vorhanden) |
| Installationsaufwand | Hoch (Kabel, Bohren, Anschließen) | Mittel (Kleben, Pairing) | Niedrig (Aufkleben, sofort lesbar) |
| Gesamtkosten (1.200 Sensoren, 3 Jahre) | Hoch (CAPEX + Installations-OPEX) | Mittel (Batterie-OPEX dominiert) | Niedrig (keine Batterie-OPEX) |

Die Matrix zeigt: Der größte Kostenhebel liegt nicht im Stückpreis, sondern in den **Folgekosten für Verkabelung, Batteriewechsel und Entsorgung**. Passive UHF-Sensoren vermeiden diese OPEX-Positionen vollständig und lassen sich zudem ohne Eingriff in die Rackverkabelung nachrüsten – ein entscheidender Vorteil im laufenden Betrieb.

## Energieeinsparung: Was PUE-Reduktion um 0,1 wirklich bringt

Die PUE-Verbesserung um 0,1 hat eine unmittelbare finanzielle Wirkung. Bei einer IT-Last von **5 MW** entspricht eine PUE-Reduktion um 0,1 einer Einsparung von 0,5 MW an Nicht-IT-Energie. Über ein Jahr (8.760 Stunden) ergibt das **4.380 MWh/Jahr** (0,5 MW × 8.760 h). Bei einer kleineren Anlage mit 500 kW IT-Last beträgt die Einsparung entsprechend **438 MWh/Jahr** (0,05 MW × 8.760 h). Diese Zahlen machen deutlich, warum die präzise Temperaturüberwachung im Kaltgang kein „Nice-to-have" ist, sondern direkt auf die Betriebskosten einzahlt.

## Integration in DCIM und BSI-C5-konforme Auditierbarkeit

Die Messwerte der passiven UHF-Sensoren werden über handelsübliche UHF-Reader (z. B. Impinj R700 oder Zebra FX9600) erfasst und an die DCIM-Plattform übergeben. Für die Integration stehen die Industrieprotokolle **MQTT, BACnet/IP und Modbus TCP** zur Verfügung, die von Plattformen wie Schneider Electric EcoStruxure IT oder Sunbird DCIM unterstützt werden. Die Sensoren selbst werden über GS1 GIAI (Global Individual Asset Identifier) eindeutig identifiziert, sodass jede Messung einem bestimmten Rack und einer bestimmten Höhe zugeordnet werden kann.

Für die BSI-C5-Konformität ist entscheidend, dass die Telemetrie manipulationssicher ist. Das wird durch die kryptografische Signatur der Messwerte auf Gateway-Ebene erreicht; die Sensoren selbst können bei Bedarf mit einer kryptografischen Authentifizierung (z. B. über das im EPC Gen2v2-Standard definierte Security-Feature) ausgestattet werden. Die so erzeugten Audit-Trails erfüllen die Anforderungen an die physische Sicherheit und Umgebungsüberwachung im BSI C5:2020-Katalog.

## Fazit: Batterieloses Mikroklima-Monitoring in deutschen Rechenzentren 2026–2027

Die regulatorischen Anforderungen an deutsche Rechenzentren – PUE ≤ 1,2 nach EnEfG § 11 für Neuanlagen ab Juli 2026, DIN EN 50600-2-3 für die Klimaregelung und BSI C5:2020 für die Auditierbarkeit – lassen sich mit passiven UHF-RFID-Temperatursensoren effizient erfüllen. Die Technik ist ausgereift: Axzon Magnus S3 und Asygn AS321x liefern kalibrierte Messwerte auf Metalloberflächen, die 3×2-Topologie pro Rack erfasst die relevanten Kalt- und Heißgangtemperaturen, und die Integration in DCIM-Plattformen über MQTT/BACnet/IP ist Standard. Der Verzicht auf Batterien reduziert nicht nur den Wartungsaufwand, sondern vermeidet auch die Entsorgungspflichten nach EU 2023/1542 und BattG – ein Argument, das bei der TCO-Betrachtung über drei Jahre den Ausschlag geben kann.

## Häufig gestellte Fragen (FAQ)

### Wie genau sind passive UHF-Temperatursensoren im Vergleich zu PT100?

Nach Zweipunktkalibrierung erreichen Chips wie der Axzon Magnus S3 im Bereich 0–50 °C eine Genauigkeit von ±0,3 °C. Für die PUE-Überwachung sind sie damit ausreichend; lediglich für referenzierte amtliche Messungen bleiben Pt100-Widerstandsthermometer die erste Wahl.

### Warum 3×2-Sensoren pro Rack und nicht weniger?

Mit drei Höhen pro Gang (6U, 24U, 42U) lassen sich vertikale Temperaturschichtungen erkennen, die bei nur einem Sensor pro Gang verborgen blieben. Zusammen mit den drei Sensoren im Heißgang ergibt sich ein vollständiges Bild der ΔT-Verteilung, das für die Diagnose von Rezirkulation und Leckagen erforderlich ist.

### Wie werden die Sensoren in bestehende DCIM-Plattformen integriert?

Die UHF-Reader stellen die Messwerte über MQTT, BACnet/IP oder Modbus TCP bereit. Plattformen wie Schneider Electric EcoStruxure IT oder Sunbird DCIM können diese Protokolle direkt verarbeiten, sodass keine zusätzliche Middleware erforderlich ist. Die Sensoren werden über GS1 GIAI eindeutig identifiziert.

### Entfallen bei batterielosen Sensoren wirklich alle Entsorgungspflichten?

Ja. Da die Sensoren keine Batterie enthalten, fallen sie nicht unter die Rücknahmepflichten der EU-Batterieverordnung (EU) 2023/1542 oder des BattG. Das reduziert den administrativen Aufwand und die OPEX im Vergleich zu batteriebetriebenen Funksensoren erheblich.

**Autor:** Yurii Kasian, RFID-Ingenieur · RFID Ukraine · Aktualisiert: 14. November 2026
