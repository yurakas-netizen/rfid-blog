---
title: "UHF RFID in der Kühlkette: Technische Analyse für Tiefkühlfertigung und
  Logistik"
slug: uhf-rfid-in-der-kuhlkette-technische-analyse-fur-tiefkuhlfertigung-und-logistik
description: "Technische Analyse von UHF-RFID in der industriellen
  Tiefkühlfertigung: −35 °C Gefriertunnel, 2,0 m/s Förderband,
  Kondensat-Detuning, ETSI EN 302 208, ISO/IEC 18000-63, Q = 6–7, Miller M=4,
  passive Sensor-Transponder vs. semi-passive BAP-Logger mit FRAM, DIN EN
  12830:2018 und TCO für 15.000 Mehrwegbehälter."
date: 2026-06-08T22:00:00.000Z
image: industry_4.0_identification-1_1.jpg
categories:
  - RFID Solutions
tags:
  - UHF RFID
  - Cold Chain
  - DIN EN 12830
  - BAP Logger
  - FRAM
  - IP69K
translationKey: cold-chain-uhf-rfid-industrial-deep-freeze
---
In der industriellen Fertigung tiefgekühlter Lebensmittel treffen extreme thermische und radiofrequenztechnische Bedingungen aufeinander: Im Gefriertunnel herrschen −35 °C, im 18 m hohen Hochregallager −24 °C, und beim Übergang in die Kommissionierzone (+4 bis +12 °C) bilden sich innerhalb von Sekunden Reif und Kondensat auf jeder Oberfläche. Für UHF-RFID-Transponder bedeutet das eine doppelte Herausforderung: Die Dielektrizitätskonstante von flüssigem Wasser (ε<sub>r</sub> ≈ 80) absorbiert bei 866 MHz einen erheblichen Teil der Feldenergie und verschiebt die Resonanzfrequenz herkömmlicher Etiketten um 15–30 MHz nach unten, während Eis (ε<sub>r</sub> ≈ 3,2) zwar weniger dämpft, aber die Kapazität der Antenne verändert. Wer unter diesen Bedingungen stabile Leseraten und eine lückenlose Temperaturdokumentation nach DIN EN 12830:2018 erreichen will, muss die HF-Physik, die Protokollparameter und die Materialwahl exakt auf den Kühlkettenprozess abstimmen.

## Die ingenieurtechnische Aufgabe: −35 °C, 2,0 m/s und Kondensat

Eine typische Tiefkühlfertigung bewegt beladene Paletten mit 30–60 Kartons auf einem Förderband mit 2,0 m/s durch einen Gefriertunnel bei −35 °C. Am Tunnelausgang passiert die Ware eine Kommissionierzone mit +4 bis +12 °C, wo sich auf der Oberfläche der Kartons und der RFID-Transponder ein Wasserfilm aus Kondensat bildet. Dieser Wasserfilm wirkt als dielektrischer Verlustkörper: Bei 866 MHz dringt das Feld nur wenige Millimeter in Wasser ein, wird dort absorbiert und in Wärme umgewandelt. Gleichzeitig verschiebt die hohe Permittivität des Wassers die Resonanzfrequenz der Transponderantenne nach unten – ein Effekt, der ohne Gegenmaßnahmen die Leserate auf unter 70 % einbrechen lässt. Eis hingegen hat eine deutlich niedrigere Permittivität und verursacht geringere Verluste, verändert aber die kapazitive Last der Antenne, was ebenfalls zu Fehlanpassungen führt.

Hinzu kommt die Hygieneproblematik: Kunststoff-Mehrwegbehälter und Paletten in der Lebensmittelproduktion werden regelmäßig mit Hochdruckreinigern und Dampfstrahlern gereinigt. Die Schutzart IP69K nach ISO 20653:2013 und IEC 60529 definiert die Beständigkeit gegen Wasserstrahlen mit 80–100 bar bei 80 °C aus 10–15 cm Abstand bei einer Durchflussrate von 14–16 L/min. Ohne diese Schutzart degradieren Transponder innerhalb weniger Reinigungszyklen; mit ihr überstehen sie Tausende von CIP- und Sanitärwaschgängen.

## Radiofrequenzarchitektur: ETSI EN 302 208, ISO/IEC 18000-63 und FRAM-Sensorik

### Frequenzband und Leistungsgrenzen in Europa

ETSI EN 302 208 V3.4.1 (2023-12) regelt den Betrieb von UHF-RFID-Geräten im europäischen 865–868-MHz-Band mit einer maximalen Strahlungsleistung von 2 W ERP (33 dBm ERP). Das Band ist in vier Kanäle zu je 200 kHz aufgeteilt (865,7, 866,3, 866,9 und 867,5 MHz); im Dense Reader Mode (DRM) können mehrere Leser parallel betrieben werden, sofern sie die Kanalmaske und die Leistungsgrenzen einhalten. Das in einigen Ländern diskutierte 915–921-MHz-Band ist in Deutschland und der EU nicht als offener Standard für durchgängige Lieferketten verfügbar: Die ERC-Empfehlung 70-03 weist es speziellen SRD-Anwendungen mit begrenztem Duty Cycle zu; für die Lebensmittel-Kühlkette ist daher das 865–868-MHz-Band die regulatorisch belastbare Grundlage.

### Protokollparameter: Q = 6–7 und Miller M=4

ISO/IEC 18000-63:2021 (EPC Gen2v2) definiert den dynamischen Q-Algorithmus zur Kollisionsauflösung. Für eine Palette mit 30–60 Kartons, die mit 2,0 m/s durch ein Leseportal fährt, steht ein Zeitfenster von 100–150 ms zur Verfügung. In diesem Fenster ist ein Slot-Zähler Q = 6 (64 Slots) oder Q = 7 (128 Slots) optimal; ein höheres Q würde die Inventarisierung verlängern und das Fenster überschreiten. Die Modulation Miller M=4 bietet gegenüber FM0 eine höhere Störfestigkeit gegenüber Phasenrauschen und Mehrfachreflexionen von Stahlregalen und Wärmetauschern, was in Tiefkühllagern mit dichten Metallkonstruktionen entscheidend ist.

### Passive Sensor-Transponder vs. semi-passive BAP-Logger

Für die Temperaturmessung stehen zwei Architekturen zur Verfügung. Rein passive, batterielose Sensor-Transponder messen die Temperatur ausschließlich im Moment der Abfrage durch ein Lesegerät; sie liefern eine Momentaufnahme, aber keine kontinuierliche Zeitreihe. Semi-passive BAP-Logger (Battery-Assisted Passive) enthalten eine Primärzelle (Li-SOCl2, 3,6 V) und einen nichtflüchtigen FRAM-Speicher mit 64 kBit, der 10<sup>14</sup> Schreibzyklen bei −40 °C ohne Schreibverzögerung ermöglicht. Diese Logger zeichnen die Temperatur autonom in Intervallen von 30–120 s auf und erreichen nach DIN EN 12830:2018 die Genauigkeitsklasse 0,5 (zulässige Abweichung ±0,5 °C im Bereich −25 bis +8 °C). Die Verordnung (EG) Nr. 37/2005 schreibt für tiefgefrorene Lebensmittel in Transport- und Lagereinrichtungen eine dokumentierte Lufttemperaturüberwachung vor, die mit BAP-Loggern und einer EPCIS-2.0-Anbindung revisionssicher erfüllt werden kann.

## Vergleichsmatrix: passive Sensor-Transponder vs. semi-passive BAP-Logger

| Merkmal | Passiver Sensor-Transponder | Semi-passiver BAP-Logger (FRAM) |
|---|---|---|
| Energieversorgung | ausschließlich Lesefeld (batterielos) | Li-SOCl<sub>2</sub> 3,6 V, Lebensdauer 3–5 Jahre |
| Temperaturerfassung | nur bei Abfrage (Momentaufnahme) | autonom alle 30–120 s (Zeitreihe) |
| Speicher | kein Langzeitspeicher | FRAM 64 kBit, 10<sup>14</sup> Zyklen bei −40 °C |
| Genauigkeit | typ. ±0,5 °C nach Kalibrierung | ±0,3…0,5 °C (DIN EN 12830 Klasse 0,5) |
| Kosten pro Einheit | 0,35–0,80 € | 25–40 € |
| Typische Anwendung | Wareneingangskontrolle, Kommissionierung | Transport- und Lagermonitoring, GDP-Nachweis |

In der Praxis hat sich eine hybride Architektur bewährt: Passive IP69K-Transponder auf jedem Mehrwegbehälter und jeder Palette für die Identifikation und die Momentaufnahme am Wareneingang, ergänzt durch eine kleinere Anzahl semi-passiver BAP-Logger (etwa jeder zehnte Behälter) für die kontinuierliche Temperaturaufzeichnung während des Transports und der Lagerung.

## TCO- und ROI-Vergleich für 15.000 Mehrwegbehälter und 450.000 Sendungen pro Jahr (5 Jahre)

Die folgende Kalkulation vergleicht eine konventionelle Lösung (Papier-UHF-Etiketten plus USB-Logger in jeder zehnten Palette) mit einer integrierten UHF-RFID-Architektur (mehrfach verwendbare IP69K-On-Metal-Transponder plus semi-passive BAP-Sensoren mit EPCIS-2.0-Anbindung).

| Kostenposition (5 Jahre) | Variante A: Papieretiketten + USB-Logger | Variante B: Integrierte UHF-RFID-Architektur |
|---|---|---|
| Etiketten / Transponder | 315.000 € (450.000/Jahr × 0,14 € × 5) | 84.375 € (15.000 IP69K-Transponder à 4,50 € + 5 %/Jahr Ersatz) |
| Logger / Sensorik | 515.000 € (USB-Logger und manueller Aufwand, 103.000 €/Jahr) | 60.000 € (1.500 BAP-Logger à 32 € + 12.000 € Batteriewechsel im 3. Jahr) |
| Infrastruktur und Integration | 0 € (keine Portale, manuelle Erfassung) | 80.000 € (8 Portale à 6.500 € + 28.000 € Software/EPCIS) |
| Betrieb und Wartung | 180.000 € (Spesen durch späte Erkennung von Kühlkettenbrüchen, 36.000 €/Jahr) | 60.000 € (Wartung und minimierte Spesen, 12.000 €/Jahr) |
| **Gesamt-TCO (5 Jahre)** | **1.010.000 €** | **284.375 €** |

Die Nettoeinsparung beträgt 725.625 € über fünf Jahre, was einer TCO-Reduktion von 71,8 % entspricht. Die zusätzlichen Investitionen in Portale und Software amortisieren sich bei einer jährlichen Einsparung von rund 145.000 € in etwa elf Monaten.

## Fazit und Ausblick 2026–2027: DIN EN 12830, GS1 EPCIS 2.0 und Digitaler Produktpass

Die regulatorischen Anforderungen an die Lebensmittel-Kühlkette werden 2026–2027 weiter steigen. DIN EN 12830:2018 definiert die Genauigkeitsklassen für Temperaturregistriergeräte und ist für BAP-Logger mit FRAM-Speicher und Li-SOCl<sub>2</sub>-Zelle die maßgebliche Grundlage. GS1 EPCIS 2.0 ermöglicht die standardisierte Übertragung von Sensor- und Temperaturereignissen in Echtzeit an WMS- und ERP-Systeme, sodass Abweichungen von der Kühlkette sofort sichtbar werden und die Rückverfolgbarkeit über die gesamte Lieferkette gewährleistet ist. Der Digitale Produktpass (DPP) nach der ESPR-Verordnung (EU) 2024/1781 nimmt Lebensmittel zwar ausdrücklich von der direkten Passpflicht aus, doch die Verpackungs- und Logistikprozesse – und damit die RFID-Infrastruktur – werden von den Durchführungsrechtsakten erfasst. Wer heute in eine hybride UHF-RFID-Architektur mit IP69K-Transpondern und BAP-Loggern investiert, schafft die Datenbasis für die kommenden Anforderungen und senkt gleichzeitig die Betriebskosten um mehr als zwei Drittel.

## Häufig gestellte Fragen (FAQ)

### Warum bricht die Leserate beim Übergang von −35 °C in die Kommissionierzone ein?

Beim Übergang von −35 °C in die Kommissionierzone (+4 bis +12 °C) bildet sich innerhalb von Sekunden ein Wasserfilm aus Kondensat auf den Transpondern. Wasser hat bei 866 MHz eine Permittivität von ε<sub>r</sub> ≈ 80 und absorbiert einen großen Teil der Feldenergie, während es gleichzeitig die Resonanzfrequenz der Antenne um 15–30 MHz verschiebt. Ohne IP69K-geschützte Transponder mit optimierter Antennengeometrie oder eine zusätzliche dielektrische Entkopplung fällt die Leserate auf unter 70 %.

### Warum Q = 6 oder Q = 7 und nicht Q = 8 oder höher?

Bei 2,0 m/s und einem Leseportal von 100–150 ms Durchlaufzeit stehen nur wenige Slots zur Verfügung. Q = 6 (64 Slots) oder Q = 7 (128 Slots) reichen für 30–60 Kartons pro Palette aus. Ein höheres Q erzeugt leere Slots, verlängert die Inventarisierung und führt dazu, dass die Palette das Lesefenster verlässt, bevor alle Transponder erfasst sind.

### Warum FRAM und Li-SOCl₂ statt Flash und Lithium-Ionen-Akku?

FRAM (Ferroelectric RAM) bietet 10<sup>14</sup> Schreibzyklen ohne Schreibverzögerung – selbst bei −40 °C. Flash-Speicher hat typischerweise nur 10<sup>5</sup>–10<sup>6</sup> Zyklen und benötigt bei Kälte zusätzliche Wartezeiten. Li-SOCl<sub>2</sub>-Primärzellen (3,6 V) liefern auch bei −40 °C zuverlässig Energie und haben eine Lebensdauer von 3–5 Jahren, während Lithium-Ionen-Akkus bei Kälte stark an Kapazität verlieren.

### Wie erfüllt man die Dokumentationspflicht nach DIN EN 12830 und Verordnung (EG) Nr. 37/2005?

DIN EN 12830:2018 definiert die Genauigkeitsklassen (0,5 und 1) für Temperaturregistriergeräte; Verordnung (EG) Nr. 37/2005 schreibt die Überwachung der Lufttemperatur in Transport- und Lagereinrichtungen für tiefgefrorene Lebensmittel vor. BAP-Logger mit FRAM-Speicher und Li-SOCl<sub>2</sub>-Zelle erfüllen die Klasse 0,5 (±0,5 °C), zeichnen die Temperatur autonom in Intervallen von 30–120 s auf und übertragen die Daten über GS1 EPCIS 2.0 an das WMS/ERP, sodass ein lückenloser, auditierbarer Nachweis entsteht.

**Autor:** Yurii Kasian, Leitender RFID-Ingenieur · RFID Ukraine · Aktualisiert: 15. November 2026
