---
title: "RFID i gruvdrift: 99,9 % tillförlitlighet vid −40 °C och 500 meter"
slug: rfid-i-gruvdrift-99-9-tillforlitlighet-vid-40-c-och-500-meter
description: Teknisk analys av hybrid-RTLS-arkitektur (aktiv 433 MHz och passiv
  UHF) för identifiering och positionering i underjordsgruvor. Behandlar
  ATEX-krav, Li-SOCl₂-batteriers köldtålighet, adaptiv Q-algoritm och en 5-årig
  TCO-beräkning i SEK.
date: 2026-11-15T10:00:00.000Z
image: image01_1.webp
categories:
  - RTLS
  - UHF RFID
  - Industriell automation
tags:
  - RTLS
  - ATEX
  - Li-SOCl₂
  - 433 MHz
  - EPCIS 2.0
  - TCO
translationKey: hybrid-uhf-rtls-mining-atex-500m
---
Underjordsgruvor är en av de mest utmanande miljöerna för RFID-identifiering. På upp till 500 meters djup råder extrem kyla ner till −40 °C, hög luftfuktighet, aggressivt damm och omfattande metallkonstruktioner som reflekterar radiosignaler. För att uppnå 99,9 % lässäkerhet vid spårning av malmflöden, fordon och personal krävs en hybridarkitektur: passiv UHF (865–868 MHz) för portaler och fordonsidentifiering, kompletterat med aktiv RFID på 433 MHz (10 mW ERP enligt ETSI EN 300 220) för kontinuerlig positionering över 500 meter. Denna tekniska analys jämför manuell avläsning med en hybridlösning baserad på ATEX-certifierade taggar, adaptiv Q-algoritm och GS1 EPCIS 2.0-integration, inklusive en femårig TCO i SEK kr.

## Normativt ramverk och säkerhetskrav

UHF RFID i Europa följer ISO/IEC 18000-63:2021 för luftgränssnittet och ETSI EN 302 208 för frekvensbandet 865–868 MHz, med maxeffekt 2 W ERP. För aktiv RFID på 433 MHz gäller ISO/IEC 18000-7:2014, och ETSI EN 300 220 begränsar uteffekten till 10 mW ERP (10 dBm) med en duty cycle på högst 10 %. I gruvor med metangas eller kolstoft klassas utrymmena som explosiva (ATEX-zon 1 eller 2), vilket kräver att all utrustning – läsare, antenner och taggar – är certifierad enligt IEC 60079-0 (grupp I, kategori M1/M2). Arbetsmiljölagen och ISO 45001:2018 ställer krav på att personer i riskzoner snabbt kan lokaliseras, vilket gör kontinuerlig positionering till en säkerhetsfråga, inte bara en logistikfråga. Litiumtionylkloridbatterier (Li-SOCl₂) i aktiva taggar måste uppfylla IEC 60086-4:2019 för att säkerställa driftsäkerhet vid −40 °C. GS1 EPCIS 2.0 tillhandahåller händelsemodellen för att registrera varje förflyttning och koppla den till underhålls- och säkerhetsdata. Europeiska kommissionens ESPR (EU) 2024/1781 kommer successivt att omfatta gruvutrustning och digitala produktpass.

## Fysik: kyla, damm och 500-metersräckvidd

Vid −40 °C förlorar vanliga litiumjonbatterier nästan all kapacitet. Därför används Li-SOCl₂-celler i aktiva taggar, vilka behåller upp till 90 % av kapaciteten mellan −55 °C och +85 °C. För passiv UHF på metall (malmvagnar, borriggar) krävs on-metal-taggar med ferrit (μr 50–150) eller keramiskt distansmaterial (Al₂O₃) på 1,5–4 mm för att undvika att antennen kortsluts av metallen. Damm är en annan utmaning: ett lager av finkornigt malmdamm på 0,5–1 mm dämpar signalen med 5–10 dB vid 866 MHz, vilket kräver cirkulärt polariserade antenner med 9 dBi förstärkning och regelbunden tryckluftsrengöring.

Räckvidden på 500 meter uppnås inte med passiv UHF, vars praktiska gräns är 6–15 meter. Istället används aktiv RFID på 433 MHz, där en tagg med 10 mW ERP kan nå upp till 500 meter i öppna tunnlar med hjälp av en distribuerad nätverksarkitektur (leaky feeder eller multipla basstationer). Gen2-luftgränssnittet för passiv UHF delar tiden i ramar med 2^Q luckor; vid 40–50 taggar i en portal faller effektiviteten under 25 % med fast Q=4, medan adaptiv Q (start Q=6, dynamiskt 5–7) och Miller-modulering M=8 stabiliserar läsningen. Prestandatester enligt ISO/IEC 18046-3 dokumenterar läshastighet och tillförlitlighet under vibration och damm, och ISO/IEC 18047-6 säkerställer överensstämmelse i luftgränssnittet.

## Anonymiserade implementeringsscenarier

### Scenario A: manuell avläsning och papperslistor
En underjordsgruva med 800 anställda och 150 maskiner använder manuell avläsning vid tre nivåer. Personalen checkar in och ut med handterminaler, men vid −40 °C blir skärmarna tröga och batterierna tappar 40 % kapacitet. Papperslistorna förstörs av fukt och damm. Vid en nödsituation kan det ta upp till 45 minuter att lokalisera en person. Stilleståndskostnaderna på grund av felaktig maskinidentifiering uppgår till 400 000 kr per år.

### Scenario B: Hybrid RTLS – passiv UHF och aktiv 433 MHz
Samma gruva installerar 20 basstationer för aktiv RFID (433 MHz, 10 mW ERP) i tunnlarna och 10 UHF-portaler vid kritiska punkter. Alla anställda bär aktiva taggar med Li-SOCl₂-batterier, och maskinerna förses med on-metal-taggar (ferrit). Varje förflyttning registreras automatiskt i EPCIS 2.0. Tiden för att lokalisera en person i en nödsituation sjunker till 15 sekunder, feldokumentationen minskar från 8–12 % till 0,3 %, och stilleståndskostnaderna faller till 60 000 kr per år.

## Jämförelsematris

| Kriterium | Manuell avläsning | Endast passiv UHF | Hybrid (UHF + aktiv 433 MHz) |
| :--- | :--- | :--- | :--- |
| Räckvidd | Manuell | 6–15 m | 500 m (aktiv) |
| Tålighet vid −40 °C | Nej (papper/terminaler) | Passiv UHF (ok) | Li-SOCl₂ (ok) |
| ATEX-zon 1/2 | Manuell | Kräver ATEX | Fullt ATEX-certifierad |
| Lokaliseringstid (nödläge) | 45 min | Ej tillämpligt | 15 sekunder |
| Spårbarhet (ISO 45001) | Låg | Medel | Hög |

## TCO och ROI över fem år

*Alla belopp i SEK kr.*

| Kostnadspost | Scenario A: manuell | Scenario B: hybrid |
| :--- | :--- | :--- |
| Handterminaler | 30 000 kr | — |
| Basstationer, läsare och antenner (ATEX) | — | 1 200 000 kr |
| Middleware och EPCIS-integration | — | 300 000 kr |
| Installation och utbildning | — | 200 000 kr |
| Aktiva taggar (433 MHz, 400 kr/st) | — | 400 kr × (800+150) = 380 000 kr |
| Passiva UHF-taggar (5 kr/st) | — | 5 kr × 2000 × 5 = 50 000 kr |
| Manuell avläsning och dokumentation | 1 000 000 kr/år × 5 = 5 000 000 kr | 120 000 kr/år × 5 = 600 000 kr |
| Stillestånd och fel | 400 000 kr/år × 5 = 2 000 000 kr | 60 000 kr/år × 5 = 300 000 kr |
| Underhåll | 50 000 kr/år × 5 = 250 000 kr | 150 000 kr/år × 5 = 750 000 kr |
| Mjukvara och moln | 30 000 kr/år × 5 = 150 000 kr | 100 000 kr/år × 5 = 500 000 kr |
| **Totalt TCO** | **7 430 000 kr** | **4 280 000 kr** |

Den extra CAPEX för scenario B uppgår till 2 100 000 kr (2 130 000 kr mot 30 000 kr). Den årliga OPEX-besparingen är 1 050 000 kr/år. Återbetalningstiden blir 2 100 000 kr / 1 050 000 kr/år × 12 ≈ 24,0 månader. Över fem år är nettobesparingen efter avdrag för extra CAPEX 3 150 000 kr, vilket motsvarar 42,4 % av TCO i scenario A. Den största besparingen kommer från minskad manuell avläsning och färre stillestånd, inte från taggpriset.

## Slutsatser och utsikter

I underjordsgruvor är varken passiv UHF eller aktiv RFID ensamt tillräckligt. En hybridarkitektur med passiv UHF för portaler och aktiv RFID på 433 MHz för kontinuerlig positionering över 500 meter är den enda skalbara lösningen som klarar −40 °C, ATEX-zon 1/2 och ISO 45001:s krav på personsäkerhet. Under de kommande åren kommer ESPR (EU) 2024/1781 och digitala produktpass att ställa allt högre krav på spårbarhet även för gruvutrustning, och hybrid-RFID är ett pragmatiskt första steg.

## FAQ

### Varför räcker inte passiv UHF för 500 meters räckvidd?
Passiv UHF har en praktisk gräns på 6–15 meter på grund av effektförluster och metallreflektioner. För 500 meter krävs aktiv RFID på 433 MHz (10 mW ERP enligt ETSI EN 300 220) med en distribuerad nätverksarkitektur av basstationer eller leaky feeder.

### Varför fungerar inte vanliga batterier vid −40 °C?
Litiumjonbatterier tappar nästan all kapacitet vid −40 °C. I aktiva taggar används Li-SOCl₂-celler som behåller upp till 90 % av kapaciteten mellan −55 °C och +85 °C, certifierade enligt IEC 60086-4.

### Vilka ATEX-krav gäller för RFID i gruvor?
I gruvor med metangas eller kolstoft klassas utrymmena som explosiva (zon 1 eller 2). All utrustning – läsare, antenner och taggar – måste vara ATEX-certifierad enligt IEC 60079-0 (grupp I, kategori M1/M2).

### Vad är återbetalningstiden i räkneexemplet?
Extra CAPEX är 2 100 000 kr och den årliga OPEX-besparingen är 1 050 000 kr. Återbetalningstiden är cirka 24,0 månader.

---
*Författare: Yurii Kasian, Ledande RFID-ingenjör · RFID Ukraine · Uppdaterad: 15 november 2026*
