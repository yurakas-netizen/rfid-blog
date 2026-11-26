---
title: Blind pallet – hvordan tætstablede varer blokerer RFID-signalet
slug: blind-pallet-hvordan-taetstablede-varer-blokerer-rfid-signalet
description: "Teknisk analyse af blinde paller i danske distributionscentre:
  dielektrisk tab, stående bølger og kapacitiv detuning i 865–868 MHz-båndet.
  Belyser ETSI EN 302 208 (2 W ERP), ISO/IEC 18000-63 Session S2/S3,
  AutoTune-chips (NXP UCODE 9, Impinj M730/M750) og tretrins-tunnelløsninger,
  der løfter læseraten fra 78 % til 99,3 % i et 20.000-palle-flow."
date: 2026-06-08T22:00:00.000Z
image: industry_4.0_identification-4_3.jpg
categories:
  - RFID Solutions
tags:
  - Blind Pallet
  - ETSI EN 302 208
  - Session S2 S3
  - AutoTune UCODE 9
  - UHF RFID Tunnel
translationKey: blind-pallet-uhf-rfid-tunnel-read-rate
---
I danske distributionscentre er den mest udbredte myte om UHF RFID, at "blinde paller" skyldes utilstrækkelig læsereffekt. I praksis er årsagen næsten altid fysisk: vand i bølgepap, tætstablede varer og metalfolie skaber dielektriske tab og stående bølger, som gør, at signalet aldrig når de centrale etiketter — uanset om læseren kører 30 dBm eller 33 dBm ERP. Denne artikel gennemgår de radiofysiske mekanismer bag blinde zoner, de to standarder, der styrer europæisk UHF RFID (ISO/IEC 18000-63 og ETSI EN 302 208), samt hvordan valg af session S2/S3, AutoTune-chips og tretrins-tunnelløsninger løfter læseraten fra 78 % til 99,3 % i et dansk 3PL-miljø med 20.000 pallebevægelser i døgnet.

## Hvorfor signalet dør inde i pallen: dielektrisk tab og stående bølger

UHF RFID arbejder i 865–868 MHz-båndet i Europa, hvor bølgelængden er ca. 34,6 cm i luft. Når bølgen rammer et tæt stablet pallegods af bølgepap og plast, falder den effektive bølgelængde markant, fordi materialernes dielektriske konstant er højere end luftens. Vand har ε′ ≈ 80 ved RFID-frekvenser, og selv fugtigt bølgepap kan have ε′ i intervallet 3–10 afhængigt af fugtindhold. Det giver to problemer: For det første absorberes og reflekteres en stor del af den indfaldende effekt i de yderste lag, før feltet når de centrale etiketter. For det andet opstår der stående bølger mellem pallefladerne, hvor feltstyrken svinger mellem nuller og maksima med få centimeters mellemrum. Etiketter, der tilfældigvis placeres i et feltminimum, forbliver blinde, uanset hvor meget læseren skruer op.

Samtidig ændrer den tætte placering af etiketter (< 20 mm mellem naboetiketter) den elektriske belastning af hver enkelt etikets antenne. Fænomenet kaldes kapacitiv detuning: Når to ledende strukturer er tæt på hinanden, flytter de etikettens resonansfrekvens væk fra 865–868 MHz, og læseren oplever etiketter, der "lytter" på den forkerte frekvens. Derfor er pallens kerne ofte det svageste punkt — ikke fordi læseren er svag, men fordi feltet og etiketternes impedans ikke længere passer sammen.

## ETSI EN 302 208: Effektgrænsen er 2 W ERP — ikke mere

I Europa er UHF RFID i 865,6–867,6 MHz-båndet reguleret af ETSI EN 302 208. Standarden fastsætter den maksimale effektive udstrålede effekt til **2 W ERP (33 dBm ERP)** på antennen. Det betyder, at en læserport typisk konfigureres til 27–30 dBm, afhængigt af antennens gain, så den samlede ERP ikke overskrider 33 dBm. Mange danske installationer kører med 30 dBm port-effekt og 6–8 dBi antennegain, hvilket giver en ERP tæt på grænsen — men ikke over.

Den vigtige ingeniørmæssige pointe er, at **overskridelse af effektgrænsen ikke løser blinde zoner**. Når feltet allerede er dæmpet af dielektriske tab og stående bølger, vil yderligere effekt primært øge multipath-refleksioner, skabe flere nuller i feltet og forårsage desensibilisering af læserens modtager. Læseren "overhører" sig selv og naboetiketter, og read rate falder snarere end at stige. Derfor er ETSI-grænsen ikke en bureaukratisk begrænsning, men en fysisk meningsfuld ramme: Effektiviteten skal komme fra antennegeometri, session-valg og chipvalg — ikke fra mere watt.

## Session 2 og Session 3: To uafhængige registre, ikke en rangorden

ISO/IEC 18000-63 (EPC Gen2v2) definerer fire session-flag: S0, S1, S2 og S3. Hver session har to tilstande, A og B. Når en etiket læses i en given session, skifter flaget fra A til B og forbliver i B, indtil persistenstiden udløber, eller etiketten mister strøm. Forskellen mellem sessionerne er persistensen: S0 er flygtig (nogle millisekunder), S1 varer typisk 500 ms–5 s, mens **S2 og S3 begge har en persistens på mindst 2 sekunder uden strøm** og kan i praksis vare meget længere afhængigt af chippen.

Det afgørende punkt, som ofte beskrives forkert: S2 og S3 er **to separate, uafhængige registre** med samme persistensegenskaber. De er ikke "S3 er stærkere end S2". Derfor kan man i en flerantenne-tunnel eller et to-trins læsekredsløb konfigurere første læser/antennegruppe til at inventoryere på S2 og anden gruppe på S3. Etiketter, der allerede er læst i S2, skifter S2-flaget til B, men S3-flaget forbliver A — og omvendt. Det giver to fordele: Man undgår, at den anden læser "ser" de samme etiketter igen og spilder lufttid på allerede læste emner, og man undgår, at den første læser nulstiller flagene for den anden. I praksis fungerer S2 og S3 som to uafhængige "huskelister", der hver især kan holde styr på, hvad der er læst inden for deres respektive dækningszone.

## AutoTune-chips: NXP UCODE 9 og Impinj M730/M750

De nyeste UHF RFID-chips adresserer detuningproblemet direkte i silicium. NXP UCODE 9 har en indbygget **Self Adjust**-funktion (auto-tune), som dynamisk tilpasser chippens indgangsimpedans til den faktiske antennebelastning i driftmiljøet. Ifølge NXP og inlay-producenter som Avery Dennison giver dette markant højere tolerance over for detuning på svært etiketterbare materialer som bølgepap, plast og glas — og dermed mere stabil læsning på fugtigt pap og i tætte etiketmiljøer.

Impinj M730 og M750 har tilsvarende **Impinj AutoTune** (V2 i M700-serien), som løbende optimerer etiketantennens elektriske match, når omgivelserne ændrer sig. M750 har 96-bit EPC og 32-bit brugerhukommelse, mens M730 har 128-bit EPC; begge fokuserer på høj følsomhed og hurtig kodning i logistikmiljøer. I praksis betyder AutoTune, at når en palle med fugtigt gods og < 20 mm etiketafstand kører gennem en tunnel, kan chippen kompensere for en del af den kapacitive detuning, som ellers ville have gjort etiketten "død" i nogle sekunder. Det eliminerer ikke fysikken, men det hæver den nedre grænse for, hvor lidt feltstyrke der er brug for — og det er netop dét, der gør en forskel i den centrale del af pallen.

## Fra 78 % til 99,3 %: Sådan konfigureres danske distributionscentre

Nedenstående tabel er en praktisk sammenligning af tre konfigurationer, som danske 3PL- og distributionscentre typisk vælger imellem. Tallene for læserate og omløbstid er erfaringsbaserede intervaller fra tilsvarende installationer; det præcise resultat afhænger af palletype, etiketplacering og varenes dielektriske egenskaber. Investeringsestimatet er ekskl. WMS/EPCIS-integration.

| Konfiguration | Forventet Read Rate | Læsehastighed | Risiko for nabopaller | Typisk tilbagebetaling |
|---|---|---|---|---|
| **1. Håndterminal i udskibningszonen** | 78–88 % | 2–5 sek./palle (manuel scanning) | Lav–middel | 6–12 mdr. (lav CAPEX) |
| **2. Toantenne-ramme ved port** | 90–96 % | 0,8–1,5 sek./palle | Middel (kræver Dense Reader Mode) | 12–24 mdr. |
| **3. Tretrins/firetrins afskærmet tunnel med S2/S3 og cirkulær polarisation** | 98,5–99,5 % (op til 99,3 % i referencecase) | 0,3–0,8 sek./palle | Lav (fysisk afskærmning + sessionsstyring) | 18–30 mdr. |

Forklaring til tabellen: Håndterminalen er billig og fleksibel, men read rate falder markant, når pallen er tæt pakket, fordi operatøren kun kan nå de yderste etiketter. Toantenne-rammen forbedrer dækningen, men uden afskærmning kan den læse nabopaller og skabe tvivl om, hvilken palle der faktisk passerede. Tretrins-tunnelen med afskærmende paneler, cirkulært polariserede antenner og S2/S3-sessionsstyring er den konfiguration, der i praksis løfter read rate fra 78 % til 99,3 % i et dansk 20.000-palle-flow. Tunnelen kombinerer fysisk afskærmning (som reducerer nabolæsning), flere antennepositioner (som dækker pallens centrale lag) og to uafhængige sessioner (som forhindrer, at den samme etiket læses igen i næste læsekredsløb).

## Konklusion: Optimering af palleaflæsning i dansk logistik 2026–2027

Danske 3PL-operatører bevæger sig i 2026–2027 mod standardiseret palle- og kollimærkning med GS1 SSCC-96 og SGTIN-96, fordi både detailkæder og medicinalvirksomheder kræver maskinlæsbar sporbarhed uden at åbne pallerne. Tunnellæsere, der er koblet til GS1 EPCIS 2.0, kan automatisk verificere, at alle forsendelsens paller og kartoner er læst, og sende en hændelse til WMS/ERP, før bilen forlader porten. Det fjerner manuel kontrol og reducerer fejlraten. For at nå dertil skal tre ting være på plads: Et fysisk afskærmet læsemiljø, AutoTune-chips (UCODE 9 eller Impinj M730/M750) på etiketterne, og en bevidst session-konfiguration (S2/S3), så flere læsere kan arbejde sammen uden at nulstille hinandens flag.

## Ofte stillede spørgsmål (FAQ)

### Hvorfor hjælper det ikke at skrue op for læsereffekten over 33 dBm ERP?

Fordi ETSI EN 302 208 allerede tillader op til 2 W ERP (33 dBm ERP), og mere effekt ikke ændrer den fysiske dæmpning i pallen. Tværtimod øger overeffekt multipath-refleksioner, skaber flere feltnuller og kan desensibilisere læserens modtager. Løsningen er bedre antennedækning, AutoTune-chips og korrekt session-valg — ikke højere watt.

### Er Session 3 bedre end Session 2?

Nej. S2 og S3 har samme persistens (mindst 2 sekunder uden strøm) og er to separate, uafhængige registre. Man bruger typisk S2 til én læser/antennegruppe og S3 til en anden, så de ikke nulstiller hinandens flag. Det giver to "huskelister" i stedet for én, hvilket er formålet i en flerantenne-tunnel.

### Hvad gør AutoTune i UCODE 9 og Impinj M730/M750?

AutoTune justerer dynamisk chippens indgangsimpedans, så den passer til etiketantennens faktiske belastning i det omgivende miljø. Det kompenserer for kapacitiv detuning fra fugtigt bølgepap og nærliggende etiketter (< 20 mm), så følsomheden ikke kollapser, når pallen er tæt pakket.

### Hvilken konfiguration løfter read rate fra 78 % til 99,3 %?

Tretrins- eller firetrins afskærmet tunnel med cirkulært polariserede antenner og S2/S3-sessionsstyring. Kombinationen af fysisk afskærmning, flere antennepositioner og to uafhængige sessioner giver både højere dækning og færre dobbeltlæsninger sammenlignet med håndterminal og åben toantenne-ramme.

**Forfatter:** Yurii Kasian, RFID-ingeniør · RFID Ukraine · Opdateret: 14. november 2026
