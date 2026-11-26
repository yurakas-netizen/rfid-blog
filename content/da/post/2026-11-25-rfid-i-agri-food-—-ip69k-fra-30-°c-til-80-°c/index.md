---
title: RFID i Agri-Food — IP69K fra -30 °C til +80 °C
slug: rfid-i-agri-food-ip69k-fra-30-c-til-80-c
description: Teknisk analyse af UHF RFID (ISO/IEC 18000-63), LF RFID (ISO
  11784/11785 ved 134,2 kHz) og IP69K-kapslede transpondere i dansk agri-food og
  akvakultur. Belyser ATEX Zone 21/22, Q-parameter ved >500 mærker, dielektrisk
  påvirkning fra is og sporbarhed efter Regulation (EC) 178/2002 og GS1 EPCIS
  2.0.
date: 2026-06-08T22:00:00.000Z
image: матриця_екстремальної_індустрії-4_3.jpg
categories:
  - RFID Solutions
tags:
  - UHF RFID
  - IP69K
  - ATEX Zone 21/22
  - ISO 11784/11785
  - Q-parameter
  - EPCIS 2.0
translationKey: agri-food-ip69k-uhf-rfid-traceability
---
I dansk agri-food og akvakultur er RFID ikke længere et spørgsmål om at "mærke noget og håbe på det bedste". Fra foderproduktionens støvede siloer over akvakulturens våde netbure til forarbejdningsanlæg, der vaskes ned med 80 °C højtryk, skal identifikationen fungere i miljøer, hvor vand, is, organisk støv og eksplosive atmosfærer er en del af hverdagen. De tre teknologier, der dækker disse domæner, er UHF RFID (ISO/IEC 18000-63), lavfrekvent induktiv RFID til dyr og fisk (ISO 11784/11785 ved 134,2 kHz) og de IP69K-kapslede industrielle transpondere, der tåler både −30 °C og +80 °C. Denne artikel gennemgår de tre typiske fejl i ældre danske agri-food-løsninger, ATEX-kravene i mølle- og foderstøvzoner, Q-parameterens betydning ved >500 mærker og den lovpligtige sporbarhed efter Regulation (EC) 178/2002.

## UHF RFID i foder og forarbejdning: ISO/IEC 18000-63 og ETSI EN 302 208

Over jorden — på sækkelinger, big-bags og pallelastere — arbejder UHF RFID efter ISO/IEC 18000-63 (EPC Gen2v2) i 865–868 MHz-båndet med en effektgrænse på 2 W ERP (33 dBm ERP) efter ETSI EN 302 208. En typisk portalløsning med 30 dBm port-effekt og 9 dBi antennegain giver 3–6 m læseafstand, hvilket er tilstrækkeligt ved palle- og sækkepassage. Udfordringen er den våde organisk støv og de 95 % relative luftfugtighed, som er normal i et dansk fiskefoderanlæg: Vandfilmen på sækkene detuner etiketantennen, og støv på antennehuse dæmper feltet. Begge dele kompenseres i praksis med AutoTune-chips (NXP UCODE 9 eller Impinj M730) og med hyppig rengøring af antennefronten.

## Q-parameteren ved >500 mærker: Hvorfor Q = 9 eller 10 slår Q = 12

EPC Gen2v2-standarden lader læseren styre antallet af svarslots gennem parameteren Q, hvor antallet af slots er 2<sup>Q</sup>. Ved en portalløsning med 300–600 mærker i læsezonen — typisk en palle med 40–60 sække eller en big-bag-stak — er Q = 9 (512 slots) eller Q = 10 (1.024 slots) det optimale valg. Q = 12 giver 4.096 slots og skaber dermed et stort antal tomme slots, som forlænger inventarrunden uden at forbedre læsningen. I praksis betyder det, at danske foderterminaler bør starte med Q = 9 og kun hæve til Q = 10, hvis mærketætheden dokumenteret overstiger 500 pr. portalpassage.

Det er samtidig vigtigt at skelne mellem metal- og dielektriske overflader: Ferritunderlag er kun nødvendigt på metalliske siloer og stålkonstruktioner. På sække, big-bags og plastkasser fungerer dielektriske etiketter med AutoTune-chips bedst, fordi de ikke introducerer unødig dæmpning.

## ATEX i mølle- og foderstøvzoner: Zone 21 og Zone 22

I siloer, møller og foderblandeanlæg kan ophvirvlet organisk støv danne en eksplosiv atmosfære. ATEX-direktivet 2014/34/EU og IEC 60079-serien definerer Zone 21 (støvforekomst sandsynlig i normal drift) og Zone 22 (støvforekomst usandsynlig eller kortvarig). RFID-udstyr i disse zoner skal ikke blot være kapslet mod støv; det skal også være certificeret til den relevante zone og have begrænset RF-effekt i overensstemmelse med IEC 60079-0. I praksis betyder det, at antenneafdækninger skal være antistatiske og jordforbundne, så hverken støv eller statisk elektricitet kan antændes.

## ISO 11784/11785: Individuel mærkning af fisk ved 134,2 kHz

Til individuel mærkning af fisk og dyr anvendes ikke UHF, men lavfrekvent induktiv RFID ved 134,2 kHz. De relevante standarder er ISO 11784 (strukturen af den 64-bit kode) og ISO 11785 (radiointerfacet, herunder FDX-B og HDX). PIT-tags til akvakultur er typisk glasskapslede transpondere, der injiceres i fisken og læses med en håndholdt eller stationær læser på 0,2–1,0 m afstand. Denne teknologi er passiv og batterifri og fungerer uafhængigt af vandets ledningsevne, fordi kommunikationen er magnetisk og ikke elektromagnetisk.

## IP69K, temperaturområde og dielektrisk påvirkning fra is

IP69K efter ISO 20653 og IEC 60529 specificerer beskyttelse mod højtryks- og damptransport ved 80 ± 5 °C, 80–100 bar og 14–16 L/min. For danske agri-food-anlæg, hvor forarbejdningslinjer rengøres med varmt vand og damp, er IP69K den relevante kapslingsklasse. Samtidig skal transponderen kunne fungere i driftsområdet fra −30 °C (frostlager) til +80 °C (vask og damp). Is på etiketten har en relativ permittivitet på ε′ ≈ 3,2, hvilket flytter etiketantennens resonansfrekvens 5–10 MHz ved et 2 mm islag og dermed reducerer læseafstanden, hvis chippen ikke kan kompensere. AutoTune-chips håndterer en del af denne forskydning, men i frostmiljøer bør man samtidig overveje opvarmede antenner og hyppig afisning.

## Tre typiske fejl i ældre danske agri-food-løsninger

### Fejl 1: Kun ISO/IEC 18000-2 til fisk

ISO/IEC 18000-2 er den generiske industrielle standard for LF RFID, men til individuel mærkning af dyr og fisk kræves de profilstandarder, der definerer kode struktur og radiointerface: ISO 11784 og ISO 11785 (FDX-B/HDX). Uden disse kan PIT-tagget ikke læses af ICAR-godkendte læsere eller indgå i avlsdatabaser.

### Fejl 2: Manglende ATEX-bevidsthed

I møller og foderblandeanlæg er organisk støv ikke bare et hygiejneproblem — det er en eksplosionsrisiko. RFID-udstyr i Zone 21/22 skal være ATEX-certificeret efter 2014/34/EU og IEC 60079, og RF-effekten skal begrænses i overensstemmelse med IEC 60079-0. Antistatiske afdækninger og korrekt jordforbindelse er lige så vigtige som kapslingsgraden.

### Fejl 3: Q = 12 som standard

Q = 12 giver 4.096 slots og er kun relevant ved meget store mærkemængder (flere tusinde i zonen). Ved 500 mærker skaber Q = 9 eller 10 tilstrækkelig kollisionsopløsning uden at spilde tid på tomme slots.

## Sporbarhed efter Regulation (EC) 178/2002 og GS1 EPCIS 2.0

EU's generelle fødevareforordning (EC) 178/2002 kræver, at fødevarer og foderstoffer kan spores "et skridt tilbage og et skridt frem" gennem hele kæden, og at Fødevarestyrelsen kan få dokumentationen på forlangende. RFID er ikke i sig selv et lovkrav, men det er den mest effektive måde at opfylde kravet på uden manuel registrering. Ved at koble UHF-mærker på sække og big-bags til GS1 SSCC-96 og PIT-tags til GS1 GRAI kan hver forsendelse og hvert individuelle dyr registreres som en EPCIS 2.0-begivenhed og deles med aftagere og myndigheder.

## Konklusion: Robust RFID-sporbarhed i dansk agri-food og akvakultur 2026–2027

I 2026–2027 vil danske foderproducenter og akvakulturvirksomheder i stigende grad kombinere tre RFID-teknologier: UHF RFID (ISO/IEC 18000-63) til sække, big-bags og pallelastere, LF RFID (ISO 11784/11785 ved 134,2 kHz) til individuel fiskemærkning og IP69K-kapslede transpondere til forarbejdningslinjer, der vaskes ved 80 °C. For at opfylde Regulation (EC) 178/2002 og Fødevarestyrelsens krav bør hver teknologi knyttes til GS1-identifikatorer (SSCC-96, GRAI) og EPCIS 2.0, så sporbarheden bliver digital og revisionssporbar. De tekniske forudsætninger er på plads: AutoTune-chips håndterer 95 % RH og vandfilm, Q = 9/10 sikrer hurtig inventar ved 500 mærker, og ATEX-certificerede antenner med antistatiske afdækninger gør det forsvarligt at arbejde i støvzoner.

## Ofte stillede spørgsmål (FAQ)

### Hvorfor Q = 9 eller 10 og ikke Q = 12 ved 500 mærker?

Q = 9 giver 512 slots og Q = 10 giver 1.024 slots, hvilket er tilstrækkeligt til 300–600 mærker i en portal. Q = 12 giver 4.096 slots og skaber mange tomme slots, som forlænger inventarrunden uden at øge læseraten.

### Hvilke standarder gælder for individuel mærkning af fisk?

ISO 11784 definerer den 64-bit kode struktur, og ISO 11785 definerer radiointerfacet (FDX-B eller HDX) ved 134,2 kHz. Disse er profilstandarder oven på den generiske ISO/IEC 18000-2.

### Hvad kræver ATEX i en foderstøvzone?

Udstyr i Zone 21/22 skal være certificeret efter 2014/34/EU og IEC 60079, have begrænset RF-effekt i henhold til IEC 60079-0 og være udstyret med antistatiske, jordforbundne afdækninger.

### Hvordan opfyldes sporbarhedskravet i 178/2002 med RFID?

Ved at koble UHF-mærker til GS1 SSCC-96 og PIT-tags til GS1 GRAI og registrere hver hændelse som en EPCIS 2.0-begivenhed. Det giver digital, revisionssporbar sporbarhed "et skridt tilbage og et skridt frem".

**Forfatter:** Yurii Kasian, RFID-ingeniør · RFID Ukraine · Opdateret: 14. november 2026
