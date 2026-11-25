---
title: Ambient IoT in der Industrie 4.0 – batterielose Sensorik für Predictive
  Maintenance
slug: ambient-iot-in-der-industrie-4-0-batterielose-sensorik-fur-predictive
description: "Technische Analyse von batterieloser Ambient-IoT-Sensorik in der
  deutschen Industrie 4.0: Wiliot IoT Pixels Gen3 (BLE, 900 MHz/2,4 GHz Energy
  Harvesting, AES-128) vs. PassiveBLE (RF-XOR-Backscatter, 974 kbit/s
  LE-2M-PHY). Belyser physikalische Grenzen bei Schwingungsanalyse, TCO-Matrix
  für 10.000 Messpunkte, EU-Batterieverordnung 2023/1542, ElektroG (WEEE
  2012/19/EU) und 3GPP Release 18/19."
date: 2026-06-08T22:00:00.000Z
image: industrial_uhf_rfid_applications-4_1.jpg
categories:
  - RFID Solutions
tags:
  - Ambient IoT
  - Wiliot Gen3
  - PassiveBLE
  - Predictive Maintenance
  - EU 2023/1542
  - Industrie 4.0
translationKey: ambient-iot-predictive-maintenance-industry40
---
In der deutschen Industrie 4.0 stehen Unternehmen 2026 vor einer paradoxen Situation: Drahtlose Sensorik ist technisch ausgereift, doch die Wartung tausender Batterien wird durch die EU-Batterieverordnung (EU) 2023/1542 und das ElektroG (WEEE 2012/19/EU) zu einem wachsenden OPEX-Faktor. Gleichzeitig erreicht batterielose Sensorik – Ambient IoT – mit kommerziellen BLE-Plattformen wie Wiliot IoT Pixels Gen3 und den kommenden 3GPP-Standards Release 18/19 eine Reifephase, die Predictive Maintenance und Anlagenüberwachung ohne Batteriewechsel wirtschaftlich macht. Dieser Artikel grenzt die kommerzielle BLE-Architektur klar von der Forschungstechnologie PassiveBLE ab, zeigt die physikalischen Grenzen bei der Schwingungsanalyse auf und liefert eine TCO-Vergleichsmatrix für 10.000 Messpunkte sowie eine Roadmap für 2026–2027.

## Wiliot IoT Pixels vs. PassiveBLE: Zwei grundverschiedene Architekturen

Die in der Praxis am weitesten verbreitete kommerzielle Ambient-IoT-Lösung sind die **Wiliot IoT Pixels Gen3**. Diese Sticker ernten RF-Energie in den Bereichen 900 MHz und 2,4 GHz über spezielle Energizer oder Gateways und senden **aktiv standardkonforme BLE-Advertising-Pakete** im 2,4-GHz-Band an handelsübliche Wi-Fi/BLE-Access-Points von Cisco, HPE Aruba oder Zebra. Die Kommunikation ist mit 128-Bit-AES hardwareverschlüsselt, und die typische Reichweite liegt bei 10–40 m, abhängig von der Gateway-Dichte. Diese Architektur ist heute produktionsreif und für die kontinuierliche Temperatur-, Feuchte- und Positionsüberwachung ausgelegt.

Davon zu unterscheiden ist die Forschungstechnologie **PassiveBLE**, die auf **RF-XOR-Modulation und Backscatter** basiert. Hier reflektiert der batterielose Tag das Signal eines externen Bluetooth-Senders und moduliert es so, dass ein kommerzieller BLE-Empfänger die Daten dekodieren kann. Im Labor wurden mit PassiveBLE Datenraten von bis zu **974 kbit/s im LE-2M-PHY-Modus** erreicht – ein Spitzenwert, der die Energieeffizienz und potenzielle Bandbreite batterieloser Sensorik demonstriert, aber noch nicht den Weg in kommerzielle Produkte gefunden hat. Während Wiliot-Pixels heute verfügbar sind, bleibt PassiveBLE ein Forschungsprojekt mit hohem Potenzial für zukünftige Standards wie IEEE 802.11bp (AMP) und 3GPP Release 19.

## Predictive Maintenance: Wo Ambient IoT physikalisch an Grenzen stößt

Ambient IoT arbeitet mit einer Leistungsdichte von **1–100 µW/cm²** und deckt damit den kontinuierlichen Betrieb im Temperaturbereich von **−40 °C bis +85 °C** ab. Das macht die Technologie ideal für die Überwachung von **Lager- und Gehäusetemperaturen**, die Erkennung von **Überhitzung an Schaltschränken und Lagern** sowie die **Verfolgung von Werkzeug und Umlaufbehältern** innerhalb der Fabrikhalle. Genau hier liegt der große Hebel: Tausende solcher Punkte lassen sich ohne Verkabelung und ohne Batteriewechsel permanent überwachen.

Für die **hochfrequente Schwingungsanalyse** im kHz-Bereich – etwa zur frühzeitigen Erkennung von Lagerschäden an Hauptspindeln – reicht die Energieausbeute und Abtastrate von Ambient IoT jedoch nicht aus. Hier bleiben **kabelgebundene IEPE-Sensoren** oder batteriebetriebene Funkknoten (WirelessHART, LoRaWAN) die technisch korrekte Wahl, weil sie die notwendige Bandbreite und Abtastfrequenz liefern. Ambient IoT ergänzt diese Systeme, ersetzt sie aber nicht.

## EU-Batterieverordnung und ElektroG: Warum 10.000 Batterien zum Kostenfaktor werden

Die **EU-Batterieverordnung (EU) 2023/1542** verpflichtet Hersteller und Inverkehrbringer, die Kosten für Sammlung, Behandlung und Recycling von Altbatterien zu tragen. In Deutschland ergänzt das **ElektroG (WEEE 2012/19/EU)** die Rücknahmepflichten für Elektro- und Elektronikgeräte, zu denen auch batteriebetriebene Funksensoren zählen. Für ein Werk mit 10.000 batteriebetriebenen BLE- oder LoRa-Sensoren bedeutet das: Jede Batterie muss registriert, gesammelt, dokumentiert und fachgerecht entsorgt werden – ein administrativer und logistischer Aufwand, der mit der Anzahl der Messpunkte skaliert. Batterielose Ambient-IoT-Knoten entfallen als Kostenposition vollständig, weil sie keine Batterie enthalten und somit nicht unter die Rücknahmepflichten für Batterien fallen.

## TCO/OPEX-Vergleich für 10.000 Messpunkte

Die folgende Matrix vergleicht drei Technologieoptionen für ein industrielles Werk mit 10.000 Messpunkten. Die Preise sind gerundete Marktwerte für 2026 und dienen als engineeringbasierte Orientierung, nicht als Angebot.

| Kostenposition | Batterie-BLE/LoRa-Sensor | Passiver UHF RFID (ISO/IEC 18000-63) | Batterieloser BLE Ambient IoT (Wiliot Gen3) |
|---|---|---|---|
| Kosten pro Knoten | 25–60 EUR | 3–15 EUR (Sensor-Tag) | < 0,10 EUR (Pixel) |
| Batteriewechsel / Entsorgung (EU 2023/1542) | Ja, jährlich oder alle 2–5 Jahre, inkl. Dokumentation | Nein | Nein |
| Infrastruktur | BLE-Gateways oder LoRaWAN-Basisstationen | UHF-Portale und Handleser | Vorhandene Wi-Fi/BLE-Access-Points + Energizer |
| Telemetriefrequenz | Konfigurierbar (Sekunden bis Stunden) | Nur bei Lesevorgang (Ereignis) | Kontinuierlich / periodisch (z. B. alle 30 s) |
| Gesamtbetriebskosten (10.000 Punkte, 3 Jahre) | Hoch (Batterie-OPEX dominiert) | Mittel (Infrastruktur, begrenzte Daten) | Niedrig (keine Batterie-OPEX, hohe Datendichte) |

Die Matrix zeigt: Der größte Kostenhebel liegt nicht im Stückpreis, sondern in den **Folgekosten für Batteriewechsel und Entsorgung** sowie in der **Datendichte**. Batterielose Ambient-IoT-Pixel vermeiden die Batterie-OPEX vollständig und liefern gleichzeitig kontinuierliche Telemetrie – ein Vorteil, der bei 10.000 Punkten über drei Jahre die Anschaffungskosten der übrigen Optionen deutlich überkompensieren kann. Voraussetzung ist allerdings eine ausreichende Dichte an Energizern und Wi-Fi/BLE-Access-Points.

## Fazit: Ambient IoT in der deutschen Industrie 4.0 (2026–2027)

Für deutsche Industrieunternehmen ergibt sich 2026–2027 eine klare Roadmap: **Bereits heute** lassen sich batterielose BLE-Ambient-IoT-Pixel (Wiliot Gen3) mit vorhandenen Wi-Fi/BLE-Access-Points für Temperatur-, Feuchte- und Positionsüberwachung einsetzen. Die Telemetriedaten sollten in MES und die **Asset Administration Shell (AAS)** integriert werden, um sie für Predictive-Maintenance-Modelle und die digitale Produktakte nutzbar zu machen. **Ab 2028–2029** werden kommerzielle Netze auf Basis von 3GPP Release 19 Ambient IoT hinzukommen, die Device Type A/B/C mit standardisierten 5G-Advanced-Funktionen definieren. Bis dahin bleibt die BLE-basierte Ambient-IoT-Architektur die einzige sofort verfügbare, batterielose Option für die flächendeckende Sensorik in der Fabrik.

## Häufig gestellte Fragen (FAQ)

### Was unterscheidet Wiliot IoT Pixels von PassiveBLE?

Wiliot IoT Pixels sind kommerzielle, batterielose Sticker, die RF-Energie ernten und **aktiv standardkonforme BLE-Advertising-Pakete** senden, verschlüsselt mit 128-Bit-AES. PassiveBLE ist eine Forschungsarchitektur, die auf **Backscatter und RF-XOR-Modulation** basiert und im Labor bis zu 974 kbit/s erreicht, aber noch nicht als Produkt verfügbar ist.

### Kann Ambient IoT die Schwingungsanalyse ersetzen?

Nein. Für hochfrequente Schwingungsanalyse im kHz-Bereich reichen Energieausbeute und Abtastrate von Ambient IoT nicht aus. Hier bleiben kabelgebundene IEPE-Sensoren oder batteriebetriebene Knoten (WirelessHART, LoRaWAN) notwendig. Ambient IoT eignet sich für Temperatur, Überhitzung und Asset-Tracking.

### Warum ist die EU-Batterieverordnung für 10.000 Sensoren entscheidend?

Die Verordnung (EU) 2023/1542 macht Hersteller und Inverkehrbringer für Sammlung und Recycling von Altbatterien verantwortlich. Bei 10.000 batteriebetriebenen Sensoren entsteht ein erheblicher administrativer und logistischer Aufwand. Batterielose Ambient-IoT-Knoten fallen nicht unter diese Pflicht und reduzieren den OPEX entsprechend.

### Wann kommen 3GPP Release 19 Ambient-IoT-Netze?

Die Standardisierung in 3GPP Release 18/19 (TR 38.848) definiert Device Type A/B/C, aber kommerzielle Netze werden nicht vor 2028–2029 erwartet. Bis dahin bleibt BLE Ambient IoT (Wiliot) die einzige sofort verfügbare batterielose Option.

**Autor:** Yurii Kasian, RFID-Ingenieur · RFID Ukraine · Aktualisiert: 14. November 2026
