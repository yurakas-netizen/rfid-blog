---
title: "Ambient IoT i dansk grøn logistik 2026–2027: BLE vs. 3GPP, TCO og CSRD"
slug: title-ambient-iot-i-dansk-gron-logistik-2026-2027-ble-vs-3gpp-tco-og-csrd
description: Teknisk TCO-analyse af batteribaserede BLE-loggere, semi-passive
  UHF RFID-sensorer og batteriløse Ambient IoT-stikkere til 10.000 årlige danske
  koldekædeforsendelser. Belyser EU-batteriforordning 2023/1542, WEEE
  2012/19/EU, CSRD Scope 3 og GS1 EPCIS 2.0-integration.
date: 2026-06-08T22:00:00.000Z
image: industrial_rfid_and_rtls_applications-2_3.jpg
categories:
  - RFID Solutions
tags:
  - Ambient IoT
  - BLE vs 3GPP
  - UHF RFID
  - CSRD Scope 3
  - Cold Chain TCO
translationKey: ambient-iot-cold-chain-logistics-tco
---
Danske logistikgiganter som Maersk, DSV og Dansk Supermarked står i 2026 over for et reguleringsmæssigt og kommercielt krydspres: Skal 10.000+ forsendelser i fødevare- og lægemiddelkoldekæden overvåges med batteribaserede loggere, semi-passive UHF RFID-sensorer eller næste generation af batteriløse Ambient IoT-stikkere? Svaret afhænger ikke længere kun af stykpris, men i stigende grad af TCO, batteriregulering (EU) 2023/1542, WEEE 2012/19/EU og de Scope 3-data, som CSRD 2022/2464 kræver dokumenteret efter GHG Protocol.

Ambient IoT er ikke én teknologi, men to separate økosystemer, som i ældre dansk markedsføring ofte blandes sammen. Den ene er den kommercielle BLE-baserede arkitektur (Wiliot IoT Pixels og lignende), hvor stikeren høster RF-energi i 900 MHz- og 2,4 GHz-båndene fra lokale energizere eller gateways og sender envejs BLE advertising-pakker på 2,4 GHz til standard Wi-Fi/BLE-access points (Cisco, Aruba, Zebra) inden for 10–30 m, krypteret med AES-128. Den anden er 3GPP's operatorstandardiserede 5G Advanced Ambient IoT (Release 18 / Release 19, TR 38.848), som definerer batteriløse enhedsklasser — Device Type A (ingen energilagring, backscatter), Device Type B (energilagring + backscatter) og Device Type C (energilagring + aktiv RF) — i licenseret 5G NR-spektrum uden brug af BLE.

## To teknologiske spor — og hvorfor de ikke kan sidestilles

### 1. BLE Ambient IoT: Wiliot-arkitekturen i dansk detail- og logistikmiljø

Wiliot IoT Pixels er batteriløse stikkere på størrelse med et frimærke, som høster RF-energi fra sub-1 GHz (902–928 MHz) og 2,4 GHz (2402–2483,5 MHz) via dedikerede energizere eller dual-band gateways. Stikeren transmitterer BLE advertising-pakker på 2,4 GHz, som kan opfanges af eksisterende Wi-Fi/BLE-access points fra Cisco, Aruba eller Zebra, typisk inden for 10–30 m afhængigt af antennemiljø og gateway-tæthed. Al kommunikation er AES-128-krypteret med hardware-baseret sandsynlighedsgenerator, og Wiliot Gen3 understøtter temperatur-, luftfugtigheds-, lys- og positionssensorik i driftstemperaturen −40 °C til +85 °C.

Stykprisen for Wiliot Gen3 IoT Pixel ligger i 2026 under 10 cent ved store volumenordrer, hvilket gør item-level tagging økonomisk realistisk i dansk dagligvare- og farmadistribution. Udfordringen er infrastrukturen: Uden tilstrækkelig energizing-dækning i lagerhaller, kølerum og omladningsterminaler falder læseraten, og BLE advertising-pakker har begrænset gennemtrængning gennem vægge og pallegods.

### 2. 3GPP 5G Advanced Ambient IoT (Release 18 / 19)

3GPP TR 38.848 specificerer tre enhedsklasser til operatorbaseret Ambient IoT i licenseret 5G NR-spektrum: Device Type A med peak-effektforbrug ≤10 µW og ren backscatter-transmission uden energilagring; Device Type B med energilagring og backscatter; samt Device Type C med energilagring og aktiv RF-transmission, typisk ≤1 mW peak. Arkitekturen forudsætter operatørdækning og standardiserede air-interface-profiler, hvilket betyder, at danske logistikvirksomheder ikke kan genbruge eksisterende BLE/Wi-Fi-infrastruktur, men må vente på kommercielle 5G Advanced-netværk og moden enhedsøkonomi.

## Europæisk og dansk regulering: batterier, WEEE og CSRD

For danske virksomheder, der i dag anvender aktive BLE- eller LoRa-loggere med litiumbatterier, er den mest konsekvensrige ændring EU's batteriforordning Regulation (EU) 2023/1542 sammen med WEEE-direktivet 2012/19/EU. Fra 1. januar 2026 overgår det organisatoriske og finansielle ansvar for indsamling af udtjente batterier i Danmark fra kommunerne til producenternes kollektive ordninger, og kommunerne kan kun fortsætte indsamlingen via individuelle aftaler med de tildelte ordninger. Det betyder, at batteribaserede cold chain-loggere ikke længere kan afskrives som "engangsudstyr uden EPR-forpligtelse": Både logistikoperatøren og den danske importør/producent får dokumentations- og omkostningsforpligtelser for indsamling, genanvendelse og batteripasning i 2026–2027.

For farmaceutiske forsendelser i 2–8 °C-kæden kræver EU GDP (2013/C 343/01) og Lægemiddelstyrelsens bekendtgørelse om distribution af lægemidler, at temperaturen overvåges og dokumenteres under hele transporten, at måleudstyret er kalibreret mod sporbar reference, og at afvigelser undersøges og vurderes, før produktet frigives videre. GDP kræver ikke specifikt batteriløse sensorer, men dokumentationskravene gør det problematisk at bruge loggere, hvis data kun aflæses ved ankomst, hvis der ikke findes en revisionssporbar kontinuerlig målekæde.

CSRD (2022/2464) og Erhvervsstyrelsens implementeringsvejledning skærper samtidig kravene til Scope 3-opgørelse. Ifølge Erhvervsstyrelsen udgør Scope 3 en betydelig del af de største danske virksomheders klimaaftryk, og opgørelsen skal følge GHG Protocol's 15 kategorier, herunder indkøbte varer og transport. Danmarks Klimalov forpligter til 70 % CO₂e-reduktion i 2030 i forhold til 1990, og transportsektoren er et af de områder, hvor manglen fortsat er markant. En cold chain-løsning, der reducerer batteriforbrug og sensorvægt, giver derfor ikke kun lavere affaldsgebyr, men også lavere Scope 3-emissioner fra indkøbte sensorer og håndteret elektronikaffald.

## OPEX/TCO for 10.000 koldekædeforsendelser: tre teknologier sammenlignet

Tabellen nedenfor er en forenklet, men teknisk konsistent TCO-model for 10.000 årlige forsendelser i dansk koldekæde. Stykpriser er baseret på offentligt tilgængelige 2026-niveauer: aktive BLE-loggere 15–30 EUR/enhed; semi-passive UHF RFID-sensorer (ISO/IEC 18000-63) typisk 2,5–12,5 USD/enhed afhængigt af hukommelse og kalibrering; Wiliot Gen3 IoT Pixel under 10 cent ved volumen. Vedligeholdelse og batterihåndtering er medtaget som særskilt OPEX-post, fordi EU's batteriforordning og WEEE gør bortskaffelse til en direkte driftsomkostning fra 2026.

| Omkostningspost (10.000 forsendelser/år) | Aktive BLE/LoRa-loggere med batteri | Semi-passive UHF RFID-sensorer (ISO/IEC 18000-63) | Batteriløse Ambient IoT-stikkere (BLE-arkitektur) |
|---|---|---|---|
| Stykpris pr. enhed | 15–30 EUR | 2,5–12,5 USD | < 0,10 EUR |
| Anskaffelse (10.000 stk.) | 150.000–300.000 EUR | ca. 25.000–125.000 USD | ca. 1.000 EUR |
| Vedligeholdelse/opsætning pr. år | Høj: gateway-parring, batterilogistik, firmware | Middel: RFID-portaler/håndholdte læsere, kalibrering | Lav: eksisterende Wi-Fi/BLE-AP'er kan genbruges; ingen batteriskift |
| Batteri/EPR/WEEE-håndtering | Ja: indsamling, genanvendelse, batteripasning (EU 2023/1542) | Nej (passiv UHF) / begrænset (semi-passiv) | Nej: ingen batterier |
| ESG/CSRD-effekt (Scope 3) | Høj: batterier og elektronikaffald belaster Scope 3 | Middel: RFID-inlays og læserinfrastruktur | Lav: 15–40 g CO₂e pr. sensor mod 120–250 g CO₂e for batterilogger |

Bemærk, at semi-passive UHF RFID-sensorer kun indsamler temperaturdata, når de passerer en læserport eller aflæses med håndholdt udstyr; de giver ikke kontinuerlig strømning som BLE Ambient IoT. Omvendt kræver Ambient IoT en tæt energizing- og AP-infrastruktur, hvis dækning ikke matcher aktive loggeres 50–100 m rækkevidde. Valget er derfor ikke et spørgsmål om "bedste teknologi", men om hvorvidt forsendelsesmønstret har faste choke points (RFID), tæt lager-/butiksdækning (BLE Ambient IoT) eller et lukket højværdi-flow, hvor aktiv logging stadig er berettiget.

## Integrationskrav: WMS/TMS, GS1 EPCIS 2.0 og Scope 3-automatisering

Uanset teknologivalg skal telemetrien ind i danske logistikvirksomheders WMS/TMS og kunne eksporteres som GS1 EPCIS 2.0-events, hvis den skal bruges til sporbarhed og CSRD-dokumentation. For BLE Ambient IoT betyder det, at gateway-laget skal mappe BLE-advertising-pakker til EPCIS-objekter (SSCC/GTIN) og tidsstemple temperatur-, fugt- og bevægelsesdata, så Scope 3-kategorierne "indkøbte varer" og "transport" kan beregnes automatisk frem for via manuelle skøn. Erhvervsstyrelsens Klimakompasset og GHG Protocol tillader gennemsnitsværdier, men CSRD-revisionen stiller krav om, at metoden og datakvaliteten kan dokumenteres. Derfor er sensorarkitekturen i praksis en Scope 3-infrastruktur, ikke kun en driftsteknologi.

## Konklusion: Ambient IoT i dansk grøn logistik 2026–2027

I 2026–2027 vil BLE Ambient IoT ikke erstatte aktiv logging i hele den danske koldekæde, men det vil vinde frem i de segmenter, hvor item-level-tæthed, batterifrihed og Scope 3-dokumentation vejer tungest: dagligvarekasser i butiks- og lagerled, returtransportenheder (RTI'er) og farmaceutiske forsendelser i lukkede korridorer med eksisterende Wi-Fi/BLE-dækning. De maritime og farmaceutiske korridorer mellem Danmark og Nordeuropa vil først tage Ambient IoT i brug, når energizing-infrastrukturen på terminaler og i containere er på plads, og når GS1 EPCIS 2.0-mappingen kan levere revisionssporbarhed uden manuelle mellemled. 3GPP Release 18/19 Ambient IoT (Device Type A/B/C) er på vej, men kræver operatørbaseret 5G Advanced-dækning og standardiserede enheder, som danske logistikvirksomheder ikke kan forvente at kunne indkøbe i volumen før 2028–2029. Indtil da er den kommercielle BLE-arkitektur den eneste batteriløse mulighed, der kan integreres med eksisterende enterprise Wi-Fi/BLE-access points.

## Ofte stillede spørgsmål (FAQ)

### Hvad er forskellen på BLE Ambient IoT og 3GPP Ambient IoT?

BLE Ambient IoT (f.eks. Wiliot) er en kommerciel arkitektur, der høster RF-energi i 900 MHz/2,4 GHz og sender BLE advertising-pakker til eksisterende Wi-Fi/BLE-access points inden for 10–30 m, AES-128-krypteret. 3GPP Ambient IoT (TR 38.848) er en operatorstandardiseret 5G Advanced-teknologi med Device Type A (≤10 µW, backscatter, ingen energilagring), Device Type B (energilagring + backscatter) og Device Type C (energilagring + aktiv RF, ≤1 mW) i licenseret 5G NR-spektrum uden BLE.

### Hvordan påvirker EU's batteriforordning TCO for 10.000 forsendelser?

Fra 1. januar 2026 overgår ansvaret for batteriindsamling i Danmark til producenternes kollektive ordninger, og batteribaserede loggere får dermed en direkte EPR- og WEEE-omkostning. For 10.000 aktive BLE-loggere med 15–30 EUR/stk. kommer batteriindsamling, genanvendelse og dokumentation oveni, mens batteriløse Ambient IoT-stikkere (<0,10 EUR/stk.) helt eliminerer denne OPEX-post.

### Kan semi-passive UHF RFID-sensorer opfylde GDP-kravene i 2–8 °C-kæden?

Kun delvist. Semi-passive UHF RFID-sensorer (ISO/IEC 18000-63) kan logge temperatur og alarm ved passage af en læserport, men de giver ikke kontinuerlig strømning. EU GDP (2013/C 343/01) kræver, at temperaturen overvåges og dokumenteres under hele transporten, og at afvigelser undersøges. I forsendelser uden faste RFID-portaler kan der derfor opstå blinde perioder, som ikke opfylder dokumentationskravet uden supplerende sensorer.

### Hvilken CO₂e-besparelse giver batteriløse sensorer i Scope 3?

Estimater for livscyklusvurdering (LCA) af sensorer peger på 15–40 g CO₂e pr. batteriløs sensor mod 120–250 g CO₂e for en batterilogger, primært på grund af batteriets materialer og bortskaffelsesbyrde. For 10.000 sensorer svarer det til en reduceret Scope 3-emission i størrelsesordenen 0,8–2,3 ton CO₂e, afhængigt af batterikemi og genanvendelsesgrad. Tallet skal verificeres mod den konkrete leverandørs EPD, før det indgår i CSRD-rapporteringen.

**Forfatter:** Yurii Kasian, RFID-ingeniør · RFID Ukraine · Opdateret: 14. november 2026
