---
title: "RFID på metall – val av underlag och antikollisionsalgoritmer: teknisk
  analys för tillverkningsindustrin"
slug: rfid-pa-metall-val-av-underlag-och-antikollisionsalgoritmer-teknisk-analys-for
description: Teknisk analys av UHF RFID-system på metallytor i
  tillverkningsindustrin. Behandlar on-metal-etiketter (ferrit, Al₂O₃), adaptiv
  Q-algoritm, GS1 EPCIS 2.0-integration och en 5-årig TCO-beräkning i SEK.
date: 2026-11-15T10:00:00.000Z
image: image01_8.webp
categories:
  - UHF RFID
  - Industriell automation
tags:
  - on-metal
  - Al₂O₃
  - Q-algoritm
  - EPCIS 2.0
  - TCO
  - IP69K
translationKey: uhf-rfid-on-metal-anti-collision-q-algorithm
---
Metallytor är en av de svåraste miljöerna för RFID-identifiering. Metallen reflekterar radiosignalen och gör att vanliga UHF-etiketter tappar läsbarheten redan vid 0,3–0,5 meter. Samtidigt passerar ofta 40–50 komponenter en läsport samtidigt i tillverkningsindustrin, vilket gör antikollisionsalgoritmen avgörande för tillförlitligheten. Denna tekniska analys jämför manuell streckkodspårning med en UHF RFID-arkitektur baserad på on-metal-etiketter (ferrit eller keramiskt distansmaterial), adaptiv Q-algoritm och GS1 EPCIS 2.0-integration, inklusive en femårig TCO i SEK kr.

## Normativt ramverk och standarder

UHF RFID-system i Europa följer standarden ISO/IEC 18000-63:2021 för luftgränssnittet och ETSI EN 302 208 för frekvensbandet 865–868 MHz, där maximal tillåten effekt är 2 W ERP. I Sverige är det Post- och telestyrelsen (PTS) som övervakar och tillämpar dessa regler, inklusive de undantag och effektbegränsningar som gäller för RFID i bandet. För fordonsindustrin, som ofta är en del av tillverkningskedjan, ställer IATF 16949:2016 (avsnitt 8.5.2) krav på full spårbarhet för varje komponent. VDA 5500 och VDA 5509 specificerar hur RFID ska användas för att spåra delar och behållare i fordonsindustrins logistik. För korrosionsbeständighet i industriella miljöer definierar ISO 12944 kategori CX (offshore och aggressiv industri), vilket är relevant för utomhus- eller kemiskt exponerade komponenter. Kapslingens täthetsklass enligt IEC 60529 (IP68/IP69K) avgör om etiketten klarar högtryckstvätt och nedsänkning. GS1 EPCIS 2.0 tillhandahåller händelsemodellen för att registrera varje förflyttning och koppla den till ett digitalt produktpass. Datastrukturen för EPC-koden definieras i GS1 TDS 2.1, inklusive SGTIN-96.

## Fysik på metall och antikollisionsalgoritmer

Metall reflekterar UHF-signalen nästan fullständigt och stör antennens impedansmatchning. En vanlig etikett fungerar därför inte på en metallisk yta. Lösningen är en on-metal-etikett med antingen en sintrad ferritskiva (μr 50–150) eller ett keramiskt distansmaterial (Al₂O₃) med en tjocklek på 1,5–4 mm, vilket motsvarar ungefär λ/10–λ/4 vid 866 MHz. Ferrit är lämplig upp till cirka 150 °C, medan keramiskt distansmaterial klarar högre temperaturer och är nödvändigt efter exempelvis en målningsugn eller lödd process. RAIN RFID Alliance rekommenderar cirkelpolariserade antenner med 9 dBi förstärkning och ett avstånd på 1,5–2 meter mellan läsare och etikett på metall. Utan denna anpassning är läsning på stål i praktiken omöjlig.

När det gäller antikollision delar Gen2-läsaren in tiden i ramar med 2^Q tidsluckor. Med fast Q=4 (16 luckor) är ram-effektiviteten maximal vid cirka 16 etiketter, men vid 40–50 komponenter i en port faller effektiviteten under 25 % och läsaren tvingas upprepa ramen. Adaptiv Q (start Q=6, dynamiskt 5–7) justerar antalet luckor efter populationen och stabiliserar läsningen. Den teoretiska övre gränsen för sloteffektivitet i Q-algoritmen är cirka 36,8 %, vilket uppnås när ramstorleken matchar antalet etiketter. Prestandatester enligt ISO/IEC 18046-3 dokumenterar läshastighet och tillförlitlighet, och ISO/IEC 18047-6 säkerställer överensstämmelse i luftgränssnittet.

## Anonymiserade implementeringsscenarier

### Scenario A: manuell streckkodspårning
Ett tillverkande företag producerar 30 000 metallkomponenter per år. Varje enhet märks med en streckkod och en pappersföljesedel. Efter anodisering eller målning är streckkoden oläsbar i 7–10 % av fallen. Operatörerna registrerar data manuellt, vilket leder till 6–9 % felaktig registrering och 250 000 SEK i årliga stilleståndskostnader. Kvalitetskontroll och IATF-liknande spårbarhet försvåras avsevärt.

### Scenario B: UHF RFID med on-metal-etiketter och adaptiv Q
Samma företag installerar fyra UHF-portar på produktionslinjen och inför on-metal-etiketter (ferrit för standardkomponenter och keramiska Al₂O₃ för komponenter som passerar målningsugnen). Varje komponent får en unik EPC-kod som läses automatiskt i varje steg och registreras som en EPCIS 2.0-händelse. Läsningssäkerheten når 99,6–99,8 %, felregistreringen sjunker till 0,3 % och stilleståndskostnaderna minskar till 40 000 SEK per år.

## Jämförelsematris

| Kriterium | Streckkod | Standard-UHF | UHF on-metal (ferrit/keramik) |
| :--- | :--- | :--- | :--- |
| Läsning på metall | Manuell | 0,3–0,5 m | 1,5–2 m (on-metal) |
| Värmetålighet (målningsugn) | Klarar ej | Max 150 °C | >250 °C (Al₂O₃) |
| Antikollision 40–50 etiketter | N/A | Fast Q=4 (<25 %) | Adaptiv Q=6–7 (>35 %) |
| Lässäkerhet | 91–94 % | 96–97 % | 99,6–99,8 % |
| IP-klassning | N/A | IP67 | IP68 / IP69K |

## TCO och ROI över fem år

*Alla belopp i SEK kr.*

| Kostnadspost | Scenario A: manuell | Scenario B: UHF |
| :--- | :--- | :--- |
| Handterminaler | 20 000 kr | — |
| Läsare, antenner och kablage | — | 250 000 kr |
| Middleware och EPCIS-integration | — | 120 000 kr |
| Installation och utbildning | — | 100 000 kr |
| Streckkodsetiketter | 0,50 kr × 30 000 × 5 år = 75 000 kr | — |
| RFID-etiketter (on-metal, 5 kr/st) | — | 5 kr × 30 000 × 5 år = 750 000 kr |
| Manuell kontroll och dokumentation | 400 000 kr/år × 5 = 2 000 000 kr | 80 000 kr/år × 5 = 400 000 kr |
| Fel och stillestånd | 250 000 kr/år × 5 = 1 250 000 kr | 40 000 kr/år × 5 = 200 000 kr |
| Underhåll | 30 000 kr/år × 5 = 150 000 kr | 100 000 kr/år × 5 = 500 000 kr |
| Mjukvara och moln | 20 000 kr/år × 5 = 100 000 kr | 60 000 kr/år × 5 = 300 000 kr |
| **Totalt TCO** | **3 595 000 kr** | **2 470 000 kr** |

Den extra CAPEX för scenario B uppgår till 450 000 kr (470 000 kr mot 20 000 kr). Den årliga OPEX-besparingen är 315 000 kr/år. Återbetalningstiden blir 450 000 kr / 315 000 kr/år × 12 ≈ 17,1 månader. Över fem år är nettobesparingen efter avdrag för extra CAPEX 1 125 000 kr, vilket motsvarar 31,3 % av TCO i scenario A. Den största besparingen kommer från minskad manuell kontroll och färre fel, inte från etikettpriset.

## Slutsatser och utsikter

I tillverkningsindustrin med metallytor och 40–50 samtidiga komponenter krävs både rätt etikettunderlag och rätt antikollisionsstrategi. Keramiska Al₂O₃-etiketter klarar 250 °C i målningsugnen, ferritetiketter fungerar upp till 150 °C, och adaptiv Q=6–7 upprätthåller över 99 % lässäkerhet i trånga portar. GS1 EPCIS 2.0 ger samtidigt spårbarhet som är kompatibel med IATF 16949 och kommande ESPR-digitala produktpass. Under de kommande åren blir digitala produktpass obligatoriska för allt fler metallkomponenter, och on-metal-etiketter är ett pragmatiskt första steg.

## FAQ

### Varför fungerar inte en vanlig UHF-etikett på metall?
Metall reflekterar radiosignalen och stör antennens impedansmatchning. Lösningen är en on-metal-etikett med ferritskiva (μr 50–150) eller keramiskt distansmaterial (Al₂O₃) med 1,5–4 mm tjocklek, vilket motsvarar ungefär λ/10–λ/4 vid 866 MHz.

### Vilket Q-värde krävs för 40–50 etiketter?
Q=4 ger 16 luckor och effektiviteten faller under 25 % vid 40 etiketter. Q=6 (64 luckor) eller Q=7 (128 luckor) upprätthåller över 35 % effektivitet. Adaptiv Q (5–7) justerar automatiskt efter populationen.

### Hur höga temperaturer klarar keramiska etiketter?
Keramiska Al₂O₃-etiketter klarar upp till 250 °C, medan PPS-etiketter smälter vid 150–180 °C. Ferritetiketter klarar cirka 150 °C och är avsedda för applikationer under 120 °C.

### Vad är återbetalningstiden i räkneexemplet?
Extra CAPEX är 450 000 kr och den årliga OPEX-besparingen är 315 000 kr. Återbetalningstiden är cirka 17,1 månader.

---
*Författare: Yurii Kasian, Ledande RFID-ingenjör · RFID Ukraine · Uppdaterad: 15 november 2026*
