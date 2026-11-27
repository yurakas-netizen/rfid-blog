---
title: RFID för havsbaserad vindkraft – 99,9 % IP69K, saltvatten och 100 meters djup
slug: rfid-for-havsbaserad-vindkraft-99-9-ip69k-saltvatten-och-100-meters-djup
description: Teknisk analys av hybrid RFID-arkitektur (UHF i luft, LF under
  vatten) för havsbaserad vindkraft. Behandlar IP69K-kapsling,
  korrosionsbeständighet (ISO 9227), GS1 EPCIS 2.0-integration och en 5-årig
  TCO-beräkning i SEK.
date: 2026-11-15T10:00:00.000Z
image: image01_3.webp
categories:
  - UHF RFID
  - Industriell automation
tags:
  - havsbaserad vindkraft
  - IP69K
  - LF RFID
  - EPCIS 2.0
  - ISO 9227
  - TCO
translationKey: uhf-rfid-offshore-wind-power-hybrid-lf
---
Havsbaserad vindkraft utsätter komponenter för extrema marina förhållanden: saltvatten, tryck och temperaturer från −20 °C till +50 °C. RFID-system måste spåra blad, tornsegment och undervattenskablar, men fysiken sätter gränser. UHF-vågor (865–868 MHz) dämpas kraftigt i saltvatten – typiskt 100 dB/m – vilket ger ett praktiskt läsavstånd på 20–30 cm för passiva taggar under vatten. För spårning över längre avstånd under vatten används istället LF (125 kHz) eller akustiska system. Denna tekniska analys jämför manuell inspektion med en hybrid RFID-arkitektur (UHF i luft, LF under vatten), IP69K-kapslade taggar och GS1 EPCIS 2.0-integration, inklusive en femårig TCO i SEK kr.

## Normativt ramverk för havsbaserad vindkraft

UHF RFID i Europa följer ISO/IEC 18000-63:2021 för luftgränssnittet och ETSI EN 302 208 för frekvensbandet 865–868 MHz, med maxeffekt 2 W ERP. För undervattensidentifiering används LF (125 kHz) enligt ISO/IEC 18000-2, vilket ger upp till 1 meters läsavstånd i vatten. Korrosionsbeständighet verifieras med saltspraytest enligt ISO 9227; för offshore-miljöer (C5-M) krävs minst 1 000–2 000 timmar utan rödrost. Vindturbiners strukturella integritet regleras av IEC 61400-1:2019, som definierar lastfall och säkerhetsmarginaler. DNV-ST-0361 specificerar maskinella komponenter i vindturbiner, inklusive krav på spårbarhet för kritiska delar. Kapslingens täthetsklass enligt IEC 60529 (IP68/IP69K) avgör om taggen klarar högtryckstvätt och kontinuerlig nedsänkning. GS1 EPCIS 2.0 tillhandahåller händelsemodellen för att registrera varje komponent och koppla den till ett digitalt produktpass. Europeiska kommissionens ESPR (EU) 2024/1781 kommer successivt att införa digitala produktpass även för vindkraftskomponenter.

## Fysik: saltvatten, 100 meters djup och UHF vs LF

Havsvatten är en elektrolyt med konduktivitet kring 4 S/m. Vid 865–868 MHz ger detta ett skinndjup på cirka 8–9 mm och en dämpning på ungefär 100 dB per meter. Det innebär att en passiv UHF-tagg under vatten endast kan läsas på 20–30 cm avstånd, och då krävs att ROV eller dykare befinner sig mycket nära taggen. För att spåra komponenter på 100 meters djup – exempelvis fundament och undervattenskablar – är UHF därför olämpligt som enda teknik. Istället används LF (125 kHz), vars magnetfält tränger igenom vattnet betydligt bättre och ger upp till 1 meters läsavstånd. I luft – för blad, torn och nacelle – fungerar UHF utmärkt med IP69K-kapslade taggar i PEEK eller keramisk fyllning, och läsavstånd på 3–10 meter uppnås med rätt antenn.

Korrosion är den andra stora utmaningen. Saltspray degraderar lim och polymerhöljen, och UV-strålning bryter ned oskyddade plaster. En tagg som klarar IP69K och är tillverkad i nickelpläterat stål med keramisk fyllning kan motstå kontinuerlig havsvattenexponering och UV under flera år. För att verifiera livslängden krävs saltspraytest enligt ISO 9227 i minst 1 000–2 000 timmar för C5-M-miljö. I luft tillämpas adaptiv Q (start Q=6, dynamiskt 5–7) för att hantera täta taggflöden vid inspektion, medan LF under vatten använder en helt annan protokollstack med spole och magnetisk koppling. Prestandan för UHF-taggar i marina miljöer verifieras enligt ISO/IEC 18046-3.

## Anonymiserade implementeringsscenarier

### Scenario A: manuell inspektion med streckkod
En havsvindpark med 50 turbiner inspekteras sex gånger per år. Varje besök kräver chartrat fartyg (200 000 kr per tur) och två tekniker i två dagar (80 000 kr), totalt 280 000 kr per besök. Komponenter på blad och torn är märkta med streckkod, men efter 6–9 månader i saltspray är 15–20 % av etiketterna oläsliga. Manuell dokumentation och efterföljande rekonstruktion kostar 250 000 kr per år, och felsortering av komponenter leder till stillestånd på 400 000 kr per år.

### Scenario B: hybrid RFID – UHF i luft och LF under vatten
Samma park installerar 10 UHF-portar vid servicehallen och på fartygsdäck, samt LF-läsare på ROV:ar för undervattensinspektion. Blad och torn förses med IP69K-kapslade UHF-taggar (PEEK/ferrit), fundament och kablar med LF-taggar (125 kHz). Varje komponent får ett unikt EPC som läses automatiskt och registreras i EPCIS 2.0. Antalet fartygsbesök minskar från 6 till 3 per år, rekonstruktion av dokumentation faller till 50 000 kr per år, och stilleståndskostnaderna sjunker till 80 000 kr per år.

## Jämförelsematris

| Kriterium | Manuell streckkod | Endast UHF | Hybrid UHF + LF |
| :--- | :--- | :--- | :--- |
| Läsavstånd i luft | Manuell | 3–10 m | 3–10 m (UHF) |
| Läsavstånd under vatten | Manuell | 20–30 cm | 1 m (LF) |
| Korrosionsbeständighet (ISO 9227) | Låg | IP69K (hög) | IP69K (hög) |
| Fartygsbesök per år | 6 | 3 | 3 |
| Spårbarhet (EPCIS 2.0) | Låg | Hög (luft) | Hög (luft + vatten) |

## TCO och ROI över fem år

*Alla belopp i SEK kr.*

| Kostnadspost | Scenario A: manuell | Scenario B: hybrid RFID |
| :--- | :--- | :--- |
| Handterminaler | 40 000 kr | — |
| Läsare, antenner (UHF + LF) | — | 400 000 kr |
| Middleware och EPCIS-integration | — | 200 000 kr |
| Installation och utbildning | — | 150 000 kr |
| Taggar (UHF 200 kr/st + LF 150 kr/st) | — | 200 kr × 500 + 150 kr × 200 = 130 000 kr |
| Manuell inspektion och dokumentation | 800 000 kr/år × 5 = 4 000 000 kr | 100 000 kr/år × 5 = 500 000 kr |
| Fartygsbesök och stillestånd | 400 000 kr/år × 5 = 2 000 000 kr | 80 000 kr/år × 5 = 400 000 kr |
| Underhåll | 50 000 kr/år × 5 = 250 000 kr | 80 000 kr/år × 5 = 400 000 kr |
| Mjukvara och moln | 30 000 kr/år × 5 = 150 000 kr | 60 000 kr/år × 5 = 300 000 kr |
| **Totalt TCO** | **6 440 000 kr** | **2 480 000 kr** |

Den extra CAPEX för scenario B uppgår till 840 000 kr (880 000 kr mot 40 000 kr). Den årliga OPEX-besparingen är 960 000 kr/år. Återbetalningstiden blir 840 000 kr / 960 000 kr/år × 12 ≈ 10,5 månader. Över fem år är nettobesparingen efter avdrag för extra CAPEX 3 960 000 kr, vilket motsvarar 61,5 % av TCO i scenario A. Den största besparingen kommer från minskade fartygsbesök och färre felsorteringar, inte från taggpriset.

## Slutsatser och utsikter

För havsbaserad vindkraft är RFID inte en fråga om att läsa genom 100 meter vatten – det är fysiskt omöjligt med UHF. Istället kombineras UHF i luft (IP69K, PEEK/ferrit) för blad, torn och nacelle med LF (125 kHz) för undervattenskomponenter, och EPCIS 2.0 binder samman dem. Under de kommande åren kommer ESPR (EU) 2024/1781 och digitala produktpass att ställa krav på spårbarhet även för offshore-komponenter, och en hybridarkitektur är det pragmatiska första steget.

## FAQ

### Kan UHF RFID läsas genom 100 meter saltvatten?
Nej. Vid 865–868 MHz dämpas signalen med cirka 100 dB per meter i saltvatten, vilket ger ett praktiskt läsavstånd på 20–30 cm för passiva taggar. 100 meter är djupet, inte RFID-räckvidden. För undervattensspårning används LF (125 kHz) med upp till 1 meters räckvidd.

### Vilken korrosionsklass krävs för offshore-taggar?
För C5-M-miljö (offshore) krävs saltspraytest enligt ISO 9227 i minst 1 000–2 000 timmar utan rödrost. IP69K-kapslade taggar i nickelpläterat stål eller PEEK med keramisk fyllning uppfyller detta.

### Varför används LF istället för UHF under vatten?
LF (125 kHz) använder magnetfält som tränger igenom vatten med låg dämpning, vilket ger upp till 1 meters läsavstånd. UHF dämpas för snabbt och kräver att läsaren är inom 20–30 cm från taggen.

### Vad är återbetalningstiden i räkneexemplet?
Extra CAPEX är 840 000 kr och den årliga OPEX-besparingen är 960 000 kr. Återbetalningstiden är cirka 10,5 månader.

---
*Författare: Yurii Kasian, Ledande RFID-ingenjör · RFID Ukraine · Uppdaterad: 15 november 2026*
