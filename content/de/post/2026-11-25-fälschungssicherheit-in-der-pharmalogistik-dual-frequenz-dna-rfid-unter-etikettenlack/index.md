---
title: "Fälschungssicherheit in der Pharmalogistik: Dual-Frequenz DNA-RFID unter
  Etikettenlack"
slug: falschungssicherheit-in-der-pharmalogistik-dual-frequenz-dna-rfid-unter
description: "Technische Analyse kryptografischer RFID-Architekturen für die
  Pharmalogistik: NXP NTAG 424 DNA (NFC, 13,56 MHz, SUN/AES-128) und NXP UCODE
  DNA (UHF, ISO/IEC 18000-63, ISO/IEC 29167-10), duale HF/UHF-Inleys (EM
  em|echo-V, Avery Dennison) sowie TCO-Vergleich für 100.000 Flaschen gegen
  EU-FMD (2011/62/EU, VO (EU) 2016/161) und securPharm."
date: 2026-06-08T22:00:00.000Z
image: industrial_uhf_rfid_applications-3_1.jpg
categories:
  - RFID Solutions
tags:
  - NTAG 424 DNA
  - UCODE DNA
  - EU-FMD
  - Dual-Frequency Inlay
  - GS1 Digital Link
  - securPharm
translationKey: pharma-anti-counterfeit-crypto-rfid-nfc-uhf
---
In der deutschen Pharmalogistik stößt die klassische Fälschungssicherheit 2026 an ihre Grenzen: Gedruckte DataMatrix-Codes und Hologramme lassen sich kopieren, und die EU-FMD (2011/62/EU sowie die Delegierte Verordnung (EU) 2016/161) verlangt seit dem 9. Februar 2019 eine end-to-end-Verifikation jeder verschreibungspflichtigen Packung über das securPharm-System – vom Hersteller bis zur Apotheke. Kryptografische RFID-Chips auf Basis von AES-128 bieten hier einen entscheidenden Schritt nach vorn: NXP NTAG 424 DNA für die NFC-Verifikation per Smartphone (ISO/IEC 14443-4) und NXP UCODE DNA für die UHF-Logistik (ISO/IEC 18000-63:2021) ermöglichen eine kryptografisch abgesicherte Echtheitsprüfung, die sich nicht klonen lässt. Dieser Artikel vergleicht beide Architekturen, zeigt die Rolle dualer HF/UHF-Inleys (EM Microelectronic em|echo-V, Avery Dennison) und liefert eine TCO-Betrachtung für 100.000 Flaschen sowie eine Integration in GS1 Digital Link und EPCIS 2.0.

## Zwei kryptografische Architekturen: NTAG 424 DNA (NFC) und UCODE DNA (UHF)

Die beiden von NXP entwickelten kryptografischen RFID-Chips verfolgen unterschiedliche Funkstandards und Einsatzgebiete. Der **NTAG 424 DNA** arbeitet im 13,56-MHz-Band nach ISO/IEC 14443-4 und ist für die NFC-Kommunikation mit Smartphones optimiert. Bei jedem „Tap" erzeugt der Chip eine dynamische SUN-Nachricht (Secure Unique NFC) mit einer AES-128-Kryptogramm, die einen Zählerwert und eine kryptografische Signatur enthält. Diese Signatur kann von einem Backend-System (Cloud, HSM) verifiziert werden, sodass eine Kopie des statischen Codes wertlos ist – jeder Lesevorgang erzeugt einen neuen, einmaligen Code. Der NTAG 424 DNA ist vollständig ISO/IEC 14443-konform (Layer 1–4) und unterstützt NFC Forum Tag Type 4. Für die Apotheken- oder Patientenverifikation ist keine spezielle App erforderlich: Das Smartphone öffnet eine durch GS1 Digital Link geschützte Webseite, auf der der Server die Einmal-Kryptogramm prüft.

Der **NXP UCODE DNA** hingegen ist ein UHF-RFID-Chip nach ISO/IEC 18000-63:2021 (EPC Gen2v2) für das 865–868-MHz-Band (ETSI EN 302 208, max. 2 W ERP). Er unterstützt eine zweiseitige kryptografische Authentifizierung mit AES-128 nach ISO/IEC 29167-10. Der Chip erreicht eine Lesegenauigkeit von −19 dBm und eine AES-Authentifizierungsempfindlichkeit von −18 dBm. UCODE DNA ist damit für die automatisierte Logistik geeignet – etwa für die portalbasierte Erfassung von Kartons bei 300 Tags/s – und bietet gleichzeitig eine kryptografische Echtheitsprüfung, die über die reine Seriennummer hinausgeht. Der entscheidende Unterschied: Während NTAG 424 DNA die NFC-Verifikation durch den Menschen (Apotheker, Patient) ermöglicht, sichert UCODE DNA die automatisierte Lieferkette gegen das Einschleusen gefälschter Packungen ab.

## Duale HF/UHF-Inleys: EM Microelectronic em|echo-V und Avery Dennison

Für viele pharmazeutische Anwendungen ist die Kombination beider Frequenzbereiche in einem einzigen Inlay die effizienteste Lösung. Der **EM Microelectronic em|echo-V** (EM4425) ist ein Dual-Frequenz-Chip, der sowohl RAIN RFID (UHF, EPC Gen2v2) als auch NFC (HF, ISO/IEC 15693 / NFC Forum Type 5) in einem einzigen Silizium-Die vereint. Der Chip teilt sich einen gemeinsamen Speicher und eine eindeutige ID, sodass dieselben Daten sowohl über UHF (für die Logistik) als auch über NFC (für die Verifikation) gelesen werden können. Avery Dennison bietet mit dem **AD Slim DF EM4425** ein ultradünnes Inlay (ca. 0,3 mm) an, das sich unter Etikettenlack applizieren lässt. Diese Bauform ist entscheidend, weil sie die physische Integrität der Packung nicht beeinträchtigt und gleichzeitig beide Funkstandards unterstützt – ein entscheidender Vorteil gegenüber zwei separaten Etiketten.

## SUN und GS1 Digital Link: Verifikation ohne App

Ein häufiges Missverständnis in älteren Lösungen betrifft die Notwendigkeit einer speziellen App. Bei NTAG 424 DNA mit SUN-Technologie (Secure Unique NFC) und GS1 Digital Link ist keine App-Installation erforderlich. Der Chip erzeugt bei jedem Tap eine dynamische URL, die den GS1 Digital Link (mit GTIN, Seriennummer, Chargennummer und Ablaufdatum) sowie eine AES-128-Kryptogramm enthält. Das Smartphone (iOS oder Android) öffnet diese URL im Browser, und der Cloud-Server (mit HSM, FIPS 140-3) verifiziert die Einmal-Kryptogramm. Ist die Signatur gültig, wird die Echtheit bestätigt; andernfalls wird der Vorgang blockiert. Dieses Verfahren ist für den Apotheker oder Patienten transparent und erfordert keine vorherige Registrierung oder App-Installation.

## Vier technische und wirtschaftliche Fehler älterer Lösungen

### Fehler 1: Krypto-RFID-Architekturen vermischt

NTAG 424 DNA (NFC, 13,56 MHz, SUN/AES-128) und UCODE DNA (UHF, 865–868 MHz, AES-128-Authentifizierung nach ISO/IEC 29167-10) sind keine austauschbaren Lösungen. Sie decken unterschiedliche Phasen der Lieferkette ab: UHF für die automatisierte Logistik, NFC für die menschliche Verifikation. Wer beide benötigt, kommt an dualen Inleys wie em|echo-V nicht vorbei.

### Fehler 2: App-Zwang für die NFC-Verifikation

Bei SUN mit GS1 Digital Link ist keine App erforderlich – der Browser des Smartphones öffnet die Verifikationsseite. Ältere Lösungen, die eine proprietäre App voraussetzen, scheitern an der Akzeptanz bei Apothekern und Patienten.

### Fehler 3: Unrealistische Preise für Dual-Frequenz-Tags

Duale kryptografische RFID-Tags (NFC + UHF) kosten bei großen Pharmatieragen realistisch **0,25–0,65 €** pro Stück – nicht 0,12 €. Ein einfacher 2D-DataMatrix-Code kostet etwa 0,02 €. Die Differenz ist der Preis für die kryptografische Absicherung, die sich durch die Vermeidung von Produktpiraterie und die Erfüllung der EU-FMD-Anforderungen amortisiert.

### Fehler 4: Q = 12 für die Portal-Erfassung

Für die Portal-Erfassung von Kartons mit typischerweise 100–200 Tags ist **Q = 8** (256 Slots) die optimale Wahl. Q = 12 erzeugt 4.096 Slots und verlängert den Inventarlauf durch leere Slots, ohne die Leserate zu verbessern.

## TCO-Vergleich für 100.000 Flaschen: DataMatrix vs. Dual-Frequenz-Krypto-RFID

Die folgende Matrix vergleicht zwei Identifikationsoptionen für eine deutsche Pharmalinie mit 100.000 Flaschen hochwertiger Onkologika oder Biotechnologika. Die Preise sind gerundete Marktwerte für 2026 und dienen als ingenieurtechnische Orientierung.

| Kostenposition | 2D-DataMatrix (EU-FMD-konform) | Dual-Frequenz-Krypto-RFID (NFC + UHF) |
|---|---|---|
| Kosten pro Einheit | ~0,02 € | 0,25–0,65 € |
| Kopierschutz | Gering (statischer Code, leicht kopierbar) | Hoch (dynamische AES-128-Kryptogramm, nicht klonbar) |
| Verifikation in der Apotheke | Scan des DataMatrix-Codes gegen securPharm | NFC-Tap gegen Cloud-HSM (ohne App) |
| Logistik-Erfassung | Manuell / Kamera (langsam) | UHF-Portal, 300 Tags/s, 99,9 % |
| Gesamtkosten (100.000 Flaschen, 1 Jahr) | ~2.000 € (Etiketten) + Personal | 25.000–65.000 € (Etiketten + Leserinfrastruktur) |

Die Matrix zeigt: Die dualen Krypto-Tags sind pro Stück deutlich teurer als ein DataMatrix-Code, aber sie bieten einen Kopierschutz, der mit einem statischen Code nicht erreichbar ist, und ermöglichen gleichzeitig die automatisierte UHF-Logistik. Bei einem Flaschenwert im dreistelligen Euro-Bereich und dem Risiko von Produktrückrufen oder Regressansprüchen aufgrund gefälschter Ware amortisiert sich die Investition durch die Vermeidung von Betrugsfällen und die Erfüllung der EU-FMD-Anforderungen.

## Fazit: Kryptografischer Fälschungsschutz in der Pharmalogistik 2026–2027

Für deutsche Pharmahersteller und -logistiker ergibt sich 2026–2027 eine klare Strategie: Die Kombination aus **UHF-Krypto-RFID (UCODE DNA)** für die automatisierte Lieferkette und **NFC-Krypto-RFID (NTAG 424 DNA)** für die Verifikation durch Apotheker und Patienten bietet einen durchgängigen Fälschungsschutz, der über die Anforderungen der EU-FMD hinausgeht. Duale Inleys (em|echo-V, Avery Dennison) ermöglichen beide Funktionen in einem einzigen, ultradünnen Etikett (0,3 mm). Die Integration in GS1 Digital Link und GS1 EPCIS 2.0 stellt sicher, dass die Verifikationsereignisse standardisiert dokumentiert und für Audits verfügbar sind. Wer heute nur auf DataMatrix setzt, nutzt eine Technologie, die sich kopieren lässt – kryptografische RFID-Tags machen jede Kopie wertlos, weil sie bei jedem Lesevorgang einen neuen, einmaligen Code erzeugen.

## Häufig gestellte Fragen (FAQ)

### Was unterscheidet NTAG 424 DNA von UCODE DNA?

NTAG 424 DNA arbeitet im NFC-Band (13,56 MHz, ISO/IEC 14443-4) und erzeugt bei jedem Tap eine dynamische SUN-Kryptogramm für die Smartphone-Verifikation. UCODE DNA arbeitet im UHF-Band (865–868 MHz, ISO/IEC 18000-63) und bietet eine AES-128-Authentifizierung für die automatisierte Logistik. Beide sind nicht austauschbar, sondern ergänzen sich.

### Braucht man eine App für die NFC-Verifikation?

Nein. Bei SUN mit GS1 Digital Link öffnet das Smartphone eine geschützte Webseite, auf der der Cloud-HSM die Einmal-Kryptogramm prüft. Es ist keine spezielle App erforderlich – lediglich ein NFC-fähiges Smartphone mit Browser.

### Warum Q = 8 und nicht Q = 12 bei der Portal-Erfassung?

Q = 8 (256 Slots) ist für 100–200 Tags pro Karton ausreichend. Q = 12 (4.096 Slots) verlängert den Inventarlauf durch leere Slots, ohne die Leserate zu verbessern.

### Wie werden die Krypto-Tags in aluminiumkaschierte Kartons integriert?

Aluminiumschichten dämpfen das UHF-Signal. Die Lösung besteht in einer 45°-Drehung des Inleys relativ zur Kartonkante und einer dünnen Ferrit- oder dielektrischen Zwischenlage, die die Impedanzfehlanpassung kompensiert. In Tests steigt die Leserate damit von 85 % auf 99,9 %.

**Autor:** Yurii Kasian, RFID-Ingenieur · RFID Ukraine · Aktualisiert: 14. November 2026
