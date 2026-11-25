---
title: RFID til havvindmøller — IP68/IP69K i saltvand og 100 m dybde
slug: rfid-til-havvindmoller-ip68-ip69k-i-saltvand-og-100-m-dybde
description: "Teknisk analyse af hybrid UHF RFID (ISO/IEC 18000-63, 865–868 MHz)
  og passiv induktiv LF RFID (125/134,2 kHz) til dansk havvind: radiofysik i
  havvand (σ ≈ 4 S/m, skin depth 8–9 mm), IP68 vs. IP69K, ISO 9227-saltspray,
  DNV-ST-0126 og GS1 GIAI/EPCIS 2.0 livscyklussporing."
date: 2026-06-08T22:00:00.000Z
image: industrial_rfid_and_rtls_applications-2_1.jpg
categories:
  - RFID Solutions
tags:
  - Offshore Wind
  - UHF RFID
  - LF RFID
  - IP68/IP69K
  - DNV-ST-0126
  - GS1 GIAI
translationKey: offshore-wind-rfid-ip68-subsea-traceability
---
I dansk havvind er sporgbarhed ikke et spørgsmål om bekvemmelighed, men om sikkerhed og økonomi: En enkelt offshore-servicegang koster mere end de fleste RFID-installationer, og en manglende identifikation af en vindmøllekomponent kan forsinke en hel park. Alligevel fejler mange RFID-projekter i Nordsøen, fordi de blander to vidt forskellige teknologier sammen: UHF RFID (865–868 MHz) til overfladeinspektion af laster, tårne og gondoler og passiv induktiv LF RFID (125/134,2 kHz) til ROV-inspektion af fundamenter under vand. Denne artikel gennemgår den radiofysiske baggrund for begge teknologier, de fire typiske fejl i ældre danske offshore-løsninger, IP68/IP69K-kravene samt hvordan GS1 GIAI og EPCIS 2.0 kan knytte RFID til en samlet livscyklusstrategi for havvindmøller i 2026–2027.

## UHF RFID over vand: ISO/IEC 18000-63 og ETSI EN 302 208

Over vandoverfladen arbejder UHF RFID efter ISO/IEC 18000-63 (EPC Gen2v2) i 865–868 MHz-båndet med en effektgrænse på 2 W ERP (33 dBm ERP) i Europa. I luft kan en UHF-læser med 30 dBm port-effekt og 6–9 dBi antennegain opnå læseafstande på 3–10 m, hvilket er tilstrækkeligt til droner, der inspicerer vinger, og til håndholdte læsere på servicefartøjer. Udfordringen er ikke rækkevidden, men materialerne: Kulfiberkomposit i vinger er elektrisk ledende og opfører sig som et metalplan, mens stål i tårn og flange skaber alvorlig detuning. Derfor kræver UHF-mærker til offshore brug enten anti-metal-konstruktion med standoff eller en dielektrisk tilpasning, der tager højde for den faktiske komposit- eller ståltykkelse.

## Fysikken i havvand: Hvorfor UHF ikke trænger igennem

Havvand har en ledningsevne på σ ≈ 4 S/m og en relativ permittivitet på ε<sub>r</sub> ≈ 80. Ved 865–868 MHz betyder det, at den elektromagnetiske bølge dæmpes med cirka 10 dB per centimeter — eller over 1.000 dB per meter — og at skinndybden kun er 8–9 mm. Derfor kan passiv UHF under vand kun læses, når ROV'ens antenne næsten rører mærket: 1–5 cm i saltvand og op til 20–30 cm i brakvand med et dielektrisk tilpasningsvindue. Til undervandsinspektion af fundamenter på 100–150 m dybde er UHF derfor ikke egnet — her kræves en anden teknologi.

## LF RFID til ROV: Passiv induktiv 125/134,2 kHz

LF RFID efter ISO/IEC 18000-2 arbejder ved 125 kHz eller 134,2 kHz og er **passiv induktiv**: Mærket forsynes af læserens magnetfelt og kræver ingen batteri. I vand kan LF opnå læseafstande på 0,2–1,0 m afhængigt af spolestørrelse og effekt, hvilket er velegnet til ROV-manipulatorer, der skal identificere enkeltkomponenter på fundamentet. Det er vigtigt at understrege, at LF ikke er "aktiv" — aktive hydroakustiske transpondere bruges til kommunikation over 10–100+ m og er en helt anden teknologi.

## Fire typiske fejl i ældre offshore-løsninger

### Fejl 1: UHF "kan også bruges under vand"

UHF fungerer kun under vand ved næsten direkte kontakt og er derfor uegnet til ROV-inspektion på afstand. Til fundamenter på 100–150 m dybde kræves LF (125/134,2 kHz) eller akustiske systemer.

### Fejl 2: "LF er en aktiv teknologi"

LF RFID (125/134,2 kHz) er passiv induktiv og batterifri. Aktive systemer er hydroakustiske og bruges til langtrækkende kommunikation — ikke til identifikation af enkelte komponenter.

### Fejl 3: IP69K er nok til 100 m dybde

IP69K (ISO 20653 / IEC 60529) beskytter mod højtryksvask på dæk og værft, men langvarig nedsænkning på 100–150 m (10–15 bar) kræver IP68 med dokumenteret trykprøvning efter DNV's regler. Mange PEEK-kapslede offshore-mærker er i dag certificeret til både IP68 og IP69K.

### Fejl 4: "DNV-GL" og ferrit til kompositvinger

Klassifikationsselskabet hedder i dag DNV (efter rebranding i 2021), og standarden for støttekonstruktioner er DNV-ST-0126. Ferrit bruges til at afkoble UHF-mærker fra metal — ikke fra kulfiberkomposit. Til vinger af glas- eller kulfiber skal der vælges dielektriske eller anti-metal-konstruktioner, der passer til den aktuelle fibertype og laminattykkelse.

## IP68 vs. IP69K og korrosionskrav: ISO 9227

Offshore-mærker skal typisk dokumentere både IP68 til nedsænkning (100–150 m, 10–15 bar) og IP69K til højtryksvask på servicefartøjer og værfter. Hertil kommer korrosionsbestandighed: ISO 9227-saltspraytest i minimum 2.000 timer er en udbredt dokumentationsstandard for maritime elektronikkapslinger. PEEK- og keramisk indkapslede transpondere fra Xerafy og HID Global angiver typisk både IP68/IP69K og kemisk resistens over for saltvand, NaOH og oliebaserede væsker.

## GS1 GIAI og EPCIS 2.0: Fra komponent til livscyklus

GS1 GIAI (Global Individual Asset Identifier) er den standardiserede nøgle til identificering af individuelle aktiver som vindmøllekomponenter, fundamenter og serviceværktøj. Kombineret med GS1 EPCIS 2.0 kan hver hændelse — inspektion, udskiftning, reparation, demontering — registreres som en standardiseret begivenhed og deles med parkoperatør, klassifikationsselskab og myndigheder. For danske havvindparkoperatører, der skal dokumentere materialepas og genanvendelse ved udfasning, giver denne kombination en direkte bro mellem det fysiske mærke og den digitale livscyklusjournal.

## Konklusion: Hybrid RFID-sporbarhed i dansk havvind 2026–2027

I 2026–2027 vil dansk havvind i stigende grad kombinere UHF RFID til overfladeinspektion af vinger, tårne og gondoler med passiv LF RFID (125/134,2 kHz) til ROV-inspektion af fundamenter under vand. Denne hybridmodel giver mening, fordi de to teknologier dækker hver sit fysiske domæne: UHF til luft og korte afstande gennem vand, LF til induktiv kontakt under overfladen. Ved at koble begge til GS1 GIAI og EPCIS 2.0 kan parkoperatører dokumentere komponenthistorik, inspektionsintervaller og materialegenanvendelse på en måde, der både opfylder DNV-ST-0126 og understøtter den cirkulære dagsorden. Udfordringen er ikke teknologien, men at vælge de rigtige mærker til de rigtige overflader og dokumentere IP68/IP69K og ISO 9227 korrekt fra første dag.

## Ofte stillede spørgsmål (FAQ)

### Kan UHF RFID læses under vand?

Kun ved næsten direkte kontakt. I saltvand er skinndybden 8–9 mm og dæmpningen ca. 10 dB/cm ved 866 MHz, så passiv UHF kræver 1–5 cm afstand i saltvand og 20–30 cm i brakvand med dielektrisk tilpasning. Til ROV-inspektion på afstand bruges LF (125/134,2 kHz).

### Er LF RFID aktivt eller passivt?

Passivt induktivt. LF-mærker ved 125/134,2 kHz forsynes af læserens magnetfelt og har ingen batteri. Aktive systemer er hydroakustiske og bruges til kommunikation over 10–100+ m.

### Hvad er forskellen på IP68 og IP69K?

IP68 dækker langvarig nedsænkning (typisk 100–150 m / 10–15 bar), mens IP69K dækker højtryks- og damptransport ved 80 °C og 80–100 bar. Offshore-mærker bør typisk opfylde begge.

### Hvorfor bruge GS1 GIAI til vindmøller?

GIAI giver en globalt unik identifikation af individuelle aktiver og muliggør standardiseret EPCIS 2.0-sporing gennem hele livscyklussen — fra inspektion og reparation til demontering og genanvendelse.

**Forfatter:** Yurii Kasian, RFID-ingeniør · RFID Ukraine · Opdateret: 14. november 2026
