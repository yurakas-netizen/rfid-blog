---
title: "Q-algoritme vs adaptiv anti-kollision UHF RFID: Teknisk analyse for
  dansk logistik"
slug: q-algoritme-vs-adaptiv-anti-kollision-uhf-rfid-teknisk-analyse-for-dansk
description: Teknisk analyse af Dynamic Q-algoritmen i ISO/IEC 18000-63 (EPC
  Gen2v2) og adaptive anti-kollisionsmotorer (Impinj Autopilot/Gen2X, Zebra
  Dynamic Q) i danske højhastighedssorteringsanlæg. Belyser FM0 vs. Miller M=4 i
  ETSI EN 302 208 (865–868 MHz, 2 W ERP) og tre danske cases, hvor read rate
  løftes fra 89–90 % til 99,3–99,6 % uden hardwareudskiftning.
date: 2026-06-08T22:00:00.000Z
image: industrial_rfid_in_extreme_environments-5_2.jpg
categories:
  - RFID Solutions
tags:
  - Dynamic Q Algorithm
  - Adaptive Anti-Collision
  - FM0 vs Miller M4
  - Impinj Gen2X
  - High-Speed Sorting
translationKey: on-metal-anti-collision-q-algorithm
---
På et højhastighedstransportbånd i en dansk sorteringshal er spørgsmålet ikke, om UHF RFID virker — men om anti-kollisionsalgoritmen kan følge med. Når 200–300 mærker passerer en læsezone på under et sekund, afgør Dynamic Q-algoritmen i ISO/IEC 18000-63 (EPC Gen2v2) og de adaptive motorer i moderne læsere, om read rate ender på 90 % eller 99,6 %. Denne artikel gennemgår den matematiske forskel mellem standardens Q-kontrol og de proprietære adaptive algoritmer, FM0 versus Miller M=4 i ETSI EN 302 208, samt hvordan tre danske logistikscenarier — en portosorteringshal i København, et e-commerce-hub i Taulov og et frostlager i Aalborg — er løftet fra 89–90 % til 99,3–99,6 % ved at optimere anti-kollisionen frem for at skifte hardware.

## Q-algoritmen i ISO/IEC 18000-63: Query, QueryAdjust og QueryRep

EPC Gen2v2-standarden starter hver inventarrunde med kommandoen `Query`, der fastlægger Q og den session (S0–S3), som runden kører i. Hver mærke vælger en tilfældig slotværdi i intervallet 0 til 2^Q − 1. Mærker med slot 0 svarer straks med en RN16; de øvrige går i vente-position og tæller ned ved hver `QueryRep`. Når læseren oplever tomme slots eller kollisioner, kan den sende `QueryAdjust`, som ændrer Q og får alle ikke-læste mærker til at vælge en ny slot.

Standardens Q er et heltal fra 0 til 15, men læseren holder internt en floating-point-værdi Q<sub>fp</sub>, som justeres med et trin C (typisk 0,1–0,5) efter hver `QueryRep`. Den udsendte Q er `round(Q<sub>fp</sub>)`. Ved mange kollisioner øges Q<sub>fp</sub>; ved tomme slots sænkes den. Denne mekanisme giver en grov, rundebaseret tilpasning, men den reagerer først efter flere slots og kan ikke skelne mellem enkelte mærkegrupper inden for samme runde.

## Adaptiv anti-kollision: Impinj Autopilot, Gen2X og Zebra Dynamic Q

Moderne læsere erstatter eller supplerer standardens Q-loop med sub-rammebaserede adaptive motorer. Impinj Autopilot og Gen2X justerer slotfordelingen inden for mindre end 5 ms, afslutter tomme cyklusser tidligt og knytter anti-kollisionen til sessionerne S0–S3, så allerede læste mærker ikke generer nye runder. I Impinj-laboratorietester med R700-læsere og små M830-mærker øgede Gen2X læsehastigheden med mere end 30 % og dækningsområdet med op til 44 % sammenlignet med standard Gen2. Impinj R700 angives med læsehastigheder på op til 1.300+ mærker/s.

Zebra FX9600 er en fastmonteret industri-læser til netop højhastighedssortering og understøtter Dynamic Q-profiler, der tilpasser sig mængden af mærker i læsezonen. Fælles for de adaptive motorer er, at de ikke blot ændrer Q, men også tilpasser antallet af slots pr. sub-ramme, så en zone med 300 tætpakkede mærker ikke tvinger læseren til at køre 4.096 slots, når 256 slots med hurtig sub-rammejustering giver højere gennemstrømning.

## FM0 versus Miller M=4 i ETSI EN 302 208 (865–868 MHz)

I Europa arbejder UHF RFID i 865–868 MHz-båndet under ETSI EN 302 208 med en effektgrænse på 2 W ERP (33 dBm ERP). Inden for denne ramme står valget mellem to backscatter-kodninger: FM0 og Miller M=4. FM0 giver den højeste datahastighed og kan på højhastighedsbånd drive op mod 1.000–1.400 mærker/s, hvilket er nødvendigt ved transportbåndshastigheder på 2,9–3,1 m/s. Til gengæld er FM0 mere følsom over for bitfejl og refleksioner fra metalreoler.

Miller M=4 indfører en subcarrier, som øger signal/støj-forholdet og gør læsningen mere robust i Dense Reader Mode og i miljøer med mange refleksioner — for eksempel et frostlager ved −23 °C eller et lager med metalstativer. Prisen er lavere peak-gennemstrømning på grund af længere præambel og subcarrier. I praksis vælger danske sorteringsanlæg ofte FM0 på de hurtige transportbåndsstrækninger og Miller M=4 i portaler og frostmiljøer, hvor robusthed vejer tungere end spidsbelastning.

## Tre danske scenarier: fra 90 % til 99,6 % uden hardwareudskiftning

De tre nedenstående scenarier er anonymiserede, men tekniske benchmarkcases fra dansk logistik. De viser, hvordan adaptiv anti-kollision og korrekt session-/kodningsvalg løfter read rate markant — i to af tilfældene alene ved firmware- og profiloptimering på eksisterende læserplatforme.

| Scenarie | Båndhastighed / mærketæthed | Før | Efter | Ændring |
|---|---|---|---|---|
| Portosorteringshal, København | 2,7–3,1 m/s | 89–90 % | 99,3–99,6 % | Adaptiv anti-kollision + FM0 på transportbånd, Miller M=4 i portal |
| E-commerce-hub, Taulov | 100–400 mærker i zonen | — | 99,8 % | Sub-ramme-Q og UCODE 9 med −24 dBm følsomhed |
| Frostlager, Aalborg (−23 °C) | 5 m læseafstand | < 60 % | 96 % | Q-reset og Session 2 |

I København-scenariet var udfordringen ikke læserens råstyrke, men at standard-Q-loopet brugte for mange slots på tomme eller overfyldte sub-rammer. Ved at aktivere en adaptiv motor (Impinj Autopilot/Gen2X på R700 eller Zebra Dynamic Q på FX9600) og differentiere kodningen — FM0 på selve transportbåndet, Miller M=4 i portalåbningen — faldt antallet af genlæsninger, og read rate steg til 99,3–99,6 %. I Taulov-hubben var nøglen UCODE 9's følsomhed på −24 dBm, som gør det muligt at læse tætpakkede mærker i grupper på 300–400 stk. uden at øge effekten. I Aalborg krævede frostmiljøet en Q-reset-strategi og brug af Session 2, så mærker, der allerede var læst, ikke genererede nye kollisioner i den næste runde.

Det oprindelige spørgsmål fra den danske ingeniørgruppe var, om man kan nå ≥99,6 % på et 3,1 m/s-bånd med op til 300 mærker i zonen uden at skifte hardware. Svaret er betinget ja: Hvis den fysiske læsezone langs transportbåndet er mindst 1,2–1,5 m (svarende til 0,4–0,5 sekunders gennemløbstid), og der ikke er ukontrolleret krydslæsning fra nabobånd, kan en firmware-opgradering med adaptiv anti-kollision — for eksempel på Impinj R700/E710 eller Zebra FX9600 — hæve hastigheden fra ca. 650 til over 1.200 mærker/s og lukke opgaven. Hvis læsezonen derimod er kortere end ca. 1,2 m, eller hvis metalliske konstruktioner skaber blinde zoner, vil selv den bedste algoritme ikke kunne kompensere — der kræves fysisk ombygning eller ekstra læseporte.

## Konklusion: Valg af anti-kollisionsstrategi i dansk logistik 2026–2027

Danske 3PL- og e-commerce-hubs bevæger sig i 2026–2027 mod adaptiv anti-kollision som standard, fordi standardens Q-loop alene ikke kan følge med de hastigheder og mærketætheder, som moderne sorteringsanlæg kræver. Samtidig skal anti-kollisionen kobles til GS1 EPCIS 2.0, så hver læst SGTIN-96 eller SSCC-96 kan sendes som en standardiseret hændelse til WMS/ERP uden at bremse båndet. De tre danske cases viser, at investeringen i adaptiv firmware og korrekt session-/kodningsvalg ofte er billigere end nyt hardware — men at den fysiske læsezone og RF-afskærmningen stadig sætter den absolutte grænse.

## Ofte stillede spørgsmål (FAQ)

### Hvad er forskellen mellem standardens Q og adaptiv anti-kollision?

Standardens Q er et heltal fra 0–15, som læseren justerer via QueryAdjust/QueryRep med et fast trin C, typisk 0,1–0,5, efter hele inventarrunder. Adaptive motorer som Impinj Autopilot/Gen2X og Zebra Dynamic Q justerer slotfordelingen på sub-rammeniveau (<5 ms), afslutter tomme cyklusser tidligt og knytter anti-kollisionen til S0–S3.

### Hvorfor vælge FM0 frem for Miller M=4 på transportbåndet?

FM0 giver den højeste datahastighed og kan på højhastighedsbånd nå 1.000–1.400 mærker/s, hvilket er nødvendigt ved 2,9–3,1 m/s. Miller M=4 giver bedre signal/støj-forhold og robusthed i Dense Reader Mode og ved −23 °C, men lavere peak-gennemstrømning.

### Kan man nå ≥99,6 % på 3,1 m/s uden at skifte hardware?

Ja, forudsat at læsezonen er mindst 1,2–1,5 m (0,4–0,5 s gennemløb), og at der ikke er ukontrolleret krydslæsning. En firmware-opgradering med adaptiv anti-kollision på Impinj R700/E710 eller Zebra FX9600 kan hæve hastigheden fra ca. 650 til over 1.200 mærker/s.

### Hvilken rolle spiller NXP UCODE 9 for anti-kollisionen?

UCODE 9 har en læsefølsomhed på −24 dBm, hvilket gør det muligt at læse tætpakkede mærker i grupper på 300–400 stk. uden at øge sendereffekten. Chippen understøtter dermed den adaptive anti-kollision ved at reducere antallet af svage eller tabte svar i tætte klynger.

**Forfatter:** Yurii Kasian, RFID-ingeniør · RFID Ukraine · Opdateret: 14. november 2026
