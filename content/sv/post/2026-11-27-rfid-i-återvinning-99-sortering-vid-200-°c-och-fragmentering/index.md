---
title: "RFID i återvinning: 99 % sortering vid 200 °C och fragmentering"
slug: rfid-i-atervinning-99-sortering-vid-200-c-och-fragmentering
description: Teknisk analys av UHF RFID-system för materialåtervinning,
  inklusive keramiska och on-metal-taggar, adaptiv Q-algoritm och GS1 EPCIS
  2.0-integration, med en 5-årig TCO-beräkning i SEK.
date: 2026-11-15T10:00:00.000Z
image: image01_2.webp
categories:
  - UHF RFID
  - Industriell automation
tags:
  - materialåtervinning
  - WEEE
  - ESPR
  - Al₂O₃
  - EPCIS 2.0
  - TCO
translationKey: uhf-rfid-recycling-sorting-200c
---
Materialåtervinning är en av de svåraste miljöerna för RFID-identifiering. I en modern svensk återvinningsanläggning passerar 50 000 enheter per år genom fragmenterings- och tvättprocesser som når 200 °C, och målet är 99 % sorteringsnoggrannhet enligt kraven i WEEE-direktivet (2012/19/EU) och ESPR (EU) 2024/1781. Passiva UHF-taggar kan inte överleva fragmenteringskvarnen — läsningen måste ske före fragmenteringen eller på det separerade materialflödet efter. Denna tekniska analys jämför manuell sortering med en UHF RFID-arkitektur baserad på keramiska (Al₂O₃) och on-metal-taggar, adaptiv Q-algoritm och GS1 EPCIS 2.0-integration, inklusive en femårig TCO i SEK kr.

## Normativt ramverk för återvinning och digitala produktpass

UHF RFID i Europa följer ISO/IEC 18000-63:2021 för luftgränssnittet och ETSI EN 302 208 för frekvensbandet 865–868 MHz, där maxeffekten är 2 W ERP. För återvinning av elektriskt och elektroniskt avfall gäller WEEE-direktivet 2012/19/EU, som kräver att 65 % av det insamlade avfallet förbereds för återanvändning eller materialåtervinns. ESPR (EU) 2024/1781 inför digitala produktpass för textilier, batterier och elektronik, med krav på att materialsammansättning, återvunnet innehåll och demonteringsinstruktioner ska vara maskinläsbara. Kapslingens täthetsklass enligt IEC 60529 (IP68/IP69K) är avgörande för att taggen ska överleva tvätt- och separationsprocesser fram till fragmenteringen. GS1 EPCIS 2.0 tillhandahåller händelsemodellen för att registrera varje materialslag och koppla det till digitala produktpass. Datastrukturen för EPC-koden definieras i GS1 TDS 2.1 (SGTIN-96 och GRAI). Europeiska kommissionens ESPR-riktlinjer betonar att materialåtervinnare måste kunna verifiera digitala produktpass för att uppnå 99 % sorteringsnoggrannhet.

## Fysik: 200 °C, fragmentering och läshastighet

Den vanligaste missuppfattningen inom återvinnings-RFID är att taggen ska överleva fragmenteringskvarnen. Det gör den inte. Vid fragmentering slits taggen sönder mekaniskt, och även keramiska Al₂O₃-taggar med stålhölje krossas. Läsningen måste därför ske **före** fragmenteringen (på hela enheter i insamlingsflödet) eller **efter** (på det separerade materialflödet, där taggens fragment kan sitta kvar på plast- eller metallbitar). I tvättprocesser före fragmentering kan temperaturen nå 80–90 °C, medan vissa plaståtervinningsflöden kan nå 200 °C vid smältning — där krävs keramiska taggar eller att taggen avlägsnas före smältning.

Textilier (bomull εr ≈ 1,5–2,0, polyester εr ≈ 2,5) kräver etiketter med textilkompatibel antenn, medan metallfraktioner kräver on-metal-taggar med ferrit (μr 50–150) eller keramiskt distansmaterial. Vid en transportbana med 3 m/s och 40–50 enheter per meter är fast Q=4 (16 luckor) otillräckligt — effektiviteten faller under 25 % — medan adaptiv Q (start Q=6, dynamiskt 5–7) och Miller-modulering M=8 stabiliserar läsningen. Prestandatester enligt ISO/IEC 18046-3 dokumenterar läshastighet och tillförlitlighet i industriella återvinningsmiljöer, och ISO/IEC 18047-6 säkerställer överensstämmelse i luftgränssnittet.

## Anonymiserade implementeringsscenarier

### Scenario A: manuell sortering med streckkod
En svensk återvinningsanläggning hanterar 50 000 enheter per år (textilier, elektronik och batterier). Manuell sortering sker vid transportbandet med handterminaler och streckkodsläsare. Streckkoder skadas eller smutsas ned i 15–20 % av fallen, vilket ger en sorteringsnoggrannhet på endast 85–90 %. Manuell sortering kräver 6 operatörer per skift, och stilleståndskostnaderna på grund av felsortering uppgår till 300 000 kr per år. Kraven på 99 % enligt WEEE och ESPR uppfylls inte.

### Scenario B: UHF RFID med keramiska taggar och adaptiv Q
Samma anläggning installerar 8 UHF-portar före fragmenteringen och 4 portar på det separerade materialflödet. Keramiska Al₂O₃-taggar (IP69K) används för textilier och elektronik, on-metal-taggar med ferrit för metallfraktioner, och taggarna avlägsnas före smältning. Varje EPC läses automatiskt vid passering och registreras i EPCIS 2.0, med koppling till digitala produktpass. Sorteringsnoggrannheten når 99 %, manuell sortering minskar från 6 till 1 operatör per skift, och stilleståndskostnaderna faller till 40 000 kr per år.

## Jämförelsematris

| Kriterium | Manuell streckkod | Standard-UHF | UHF keramisk/on-metal |
| :--- | :--- | :--- | :--- |
| Sorteringsnoggrannhet | 85–90 % | 94–96 % | 99 % (målsättning) |
| Tålighet vid 200 °C (tvätt/smältning) | Nej | Nej (max 150 °C) | Keramisk Al₂O₃ (upp till 250 °C) |
| Läsning vid 3 m/s transportbana | Manuell | Fast Q=4 (<25 %) | Adaptiv Q=6 (>35 %) |
| WEEE-efterlevnad | Låg | Delvis | Full (EPCIS 2.0) |
| Manuella operatörer per skift | 6 | 3 | 1 |

## TCO och ROI över fem år

*Alla belopp i SEK kr.*

| Kostnadspost | Scenario A: manuell | Scenario B: UHF |
| :--- | :--- | :--- |
| Handterminaler | 20 000 kr | — |
| Läsare, antenner och kablage | — | 300 000 kr |
| Middleware och EPCIS-integration | — | 150 000 kr |
| Installation och utbildning | — | 100 000 kr |
| Streckkodsetiketter | 0,5 kr × 50 000 × 5 = 125 000 kr | — |
| RFID-taggar (keramiska/on-metal, 5 kr/st) | — | 5 kr × 50 000 × 5 = 1 250 000 kr |
| Manuell sortering | 500 000 kr/år × 5 = 2 500 000 kr | 80 000 kr/år × 5 = 400 000 kr |
| Felsortering och stillestånd | 300 000 kr/år × 5 = 1 500 000 kr | 40 000 kr/år × 5 = 200 000 kr |
| Underhåll | 20 000 kr/år × 5 = 100 000 kr | 100 000 kr/år × 5 = 500 000 kr |
| Mjukvara och moln | 10 000 kr/år × 5 = 50 000 kr | 60 000 kr/år × 5 = 300 000 kr |
| **Totalt TCO** | **4 295 000 kr** | **3 200 000 kr** |

Den extra CAPEX för scenario B uppgår till 530 000 kr (550 000 kr mot 20 000 kr). Den årliga OPEX-besparingen är 550 000 kr/år. Återbetalningstiden blir 530 000 kr / 550 000 kr/år × 12 ≈ 11,6 månader. Över fem år är nettobesparingen efter avdrag för extra CAPEX 1 095 000 kr, vilket motsvarar 25,5 % av TCO i scenario A. Den största besparingen kommer från minskad manuell sortering och färre felsorteringar, inte från taggpriset.

## Slutsatser och utsikter

I svensk materialåtervinning är 99 % sorteringsnoggrannhet möjlig endast med UHF RFID och keramiska/on-metal-taggar som klarar 200 °C. Nyckeln är att läsa taggen före eller efter fragmenteringen — aldrig i själva kvarnen — och att använda adaptiv Q (Q=6) för att hantera täta flöden på 3 m/s. GS1 EPCIS 2.0 ger spårbarhet som är kompatibel med WEEE och ESPR, och digitala produktpass blir obligatoriska för textilier och batterier under de kommande åren.

## FAQ

### Kan en passiv UHF-tagg överleva fragmenteringskvarnen?
Nej. Vid fragmentering slits taggen sönder mekaniskt, även keramiska Al₂O₃-taggar med stålhölje. Läsningen måste ske före fragmenteringen (på hela enheter) eller efter (på det separerade materialflödet), aldrig i själva kvarnen.

### Vilket Q-värde krävs för 40–50 enheter per meter vid 3 m/s?
Fast Q=4 (16 luckor) faller under 25 % effektivitet vid täta flöden. Adaptiv Q (start Q=6, dynamiskt 5–7) med Miller-modulering M=8 stabiliserar läsningen och upprätthåller över 35 % effektivitet.

### Hur klarar taggarna 200 °C i tvätt- och smältprocesser?
Keramiska Al₂O₃-taggar klarar upp till 250 °C, medan vanliga polymertaggar (PPS/PET) smälter vid 150–180 °C. I plaståtervinningsflöden som når 200 °C måste taggen antingen vara keramisk eller avlägsnas före smältning.

### Vad är återbetalningstiden i räkneexemplet?
Extra CAPEX är 530 000 kr och den årliga OPEX-besparingen är 550 000 kr. Återbetalningstiden är cirka 11,6 månader.

---
*Författare: Yurii Kasian, Ledande RFID-ingenjör · RFID Ukraine · Uppdaterad: 15 november 2026*
