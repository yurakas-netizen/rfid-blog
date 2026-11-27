---
title: "RFID kaivosteollisuudessa: 99,9 % luotettavuus −40 °C:ssa ja 500 metrin
  matkalla"
slug: rfid-kaivosteollisuudessa-99-9-luotettavuus-40-c-ssa-ja-500-metrin-matkalla
description: Tekninen analyysi hybridi-RTLS-arkkitehtuurista (aktiivinen 433 MHz
  ja passiivinen UHF) maanalaisessa kaivosteollisuudessa. Käsittelee
  ATEX-vaatimuksia, Li-SOCl₂-paristojen pakkaskestävyyttä, adaptiivista
  Q-algoritmia ja 5 vuoden TCO-laskentaa.
date: 2026-11-15T10:00:00.000Z
image: image01_6.webp
categories:
  - RTLS
  - UHF RFID
  - Teollinen automaatio
tags:
  - RTLS
  - ATEX
  - Li-SOCl₂
  - 433 MHz
  - EPCIS 2.0
  - TCO
translationKey: hybrid-uhf-rtls-mining-atex-500m
---
Maanalainen kaivosteollisuus on yksi vaativimmista ympäristöistä RFID-identifioinnille. Lapin kaivoksissa lämpötila laskee talvella −40 °C:seen, tunnelit ovat jopa 500 metrin pituisia, ja pöly sekä kosteus heikentävät sekä lukijoiden että tunnisteiden toimintaa. Lisäksi kaivoslaissa ja ATEX-direktiivissä (IEC 60079-0, ryhmä I, kategoria M1/M2) edellytetään jatkuvaa työntekijöiden ja kaluston paikannusta. Tämä tekninen analyysi vertaa manuaalista kirjanpitoa hybridiin RTLS-arkkitehtuuriin: aktiivinen RFID 433 MHz (10 mW ERP, ETSI EN 300 220) jatkuvaan paikannukseen ja passiivinen UHF-portteihin sekä kaluston tunnistukseen. TCO lasketaan 5 vuodelle euroina.

## Normatiivinen kehys ja kaivosturvallisuus

UHF RFID -järjestelmät noudattavat standardia ISO/IEC 18000-63:2021 ja ETSI EN 302 208:a. Jatkuvaan paikannukseen 500 metrin matkalla käytetään aktiivista RFID:tä 433 MHz:n taajuudella, jota säätelee ISO/IEC 18000-7:2014. Euroopassa ETSI EN 300 220 rajoittaa tämän taajuusalueen lähetystehon 10 mW ERP:iin (10 dBm). Kaivoksissa, joissa on metaania tai hiilipölyä, kaikkien laitteiden (lukijat, antennit, tunnisteet) on oltava ATEX-sertifioituja (ryhmä I, kategoria M1/M2) standardin IEC 60079-0 mukaisesti. Työturvallisuuslaki ja ISO 45001 edellyttävät, että vaara-alueella olevat henkilöt voidaan tunnistaa välittömästi. Litiumparistojen turvallisuus (Li-SOCl₂) varmistetaan IEC 60086-4:2019:lla. GS1 EPCIS 2.0 tarjoaa tapahtumamallin, jolla jokainen siirto ja huoltotoimenpide kirjataan.

## Fysiikka: −40 °C, paristot ja 500 metrin kattavuus

Tavalliset litiumioniakut menettävät nopeasti kapasiteettinsa −40 °C:ssa. Siksi aktiivisissa tunnisteissa käytetään Li-SOCl₂-kennoja (litiumtioniylikloridi), jotka säilyttävät jopa 90 % kapasiteetistaan alueella −55 °C … +85 °C. 500 metrin kattavuus maanalaisissa tunneleissa saavutetaan hajautetulla vastaanottajaverkolla (leaky feeder tai multiplekserit) ja aktiivisilla tunnisteilla, jotka lähettävät 10 mW ERP:llä. On kuitenkin muistettava, että passiivisen UHF:n lukemaetäisyys (esim. portilla) on 6–10 metriä, eikä se sovellu jatkuvaan seurantaan 500 metrin matkalla.

Passiivisen UHF:n protokollatasolla 40–50 tunnisteen lukeminen portilla kiinteällä Q=4:llä (16 aikaväliä) johtaa alle 25 %:n hyötysuhteeseen ja toistuviin kehyksiin. Adaptiivinen Q (aloitus Q=6, dynaaminen 5–7) vakauttaa lukemisen. Suorituskykytestit ISO/IEC 18046-3:n mukaisesti dokumentoivat lukunopeuden ja -varmuuden teollisissa olosuhteissa, ja ISO/IEC 18047-6 varmistaa ilmarajapinnan yhdenmukaisuuden.

## Anonymisoidut kaivoskäyttöönoton skenaariot

### Skenaario A: manuaalinen kirjanpito ja paperiset kirjat
Kaivos työllistää 800 henkeä ja siellä on 150 konetta. Manuaalinen kirjanpito tasoille menemisistä ja poistumisista tehdään paperilistoilla ja radiolla. −40 °C:ssa kämmenterminaalit eivät toimi, ja paperilistat tuhoutuvat. Koneiden ja työpisteiden välisten virheiden osuus on 8–12 %, mikä viivästyttää kunnossapitoa. Henkilön paikantamiseen hätätilanteessa kuluu jopa 45 minuuttia.

### Skenaario B: hybridi RTLS (433 MHz) ja UHF-portit
Kaivos asentaa 20 RTLS-tukiasemaa (433 MHz, 10 mW ERP) tunneleihin, joiden yhteenlaskettu pituus on 500 metriä. Li-SOCl₂-aktiivitunnisteet ovat kaikilla työntekijöillä ja 150 koneessa. UHF-portit (adaptiivisella Q:lla) rekisteröivät kaluston sisään- ja ulosmenon. Järjestelmä integroidaan EPCIS 2.0:aan ja työturvallisuusjärjestelmään. Henkilön paikannusaika lyhenee 15 sekuntiin ja koneiden virheellisten kohdistusten määrä 0,5 %:iin.

## Vertailumatriisi

| Kriteeri | Manuaalinen kirjanpito | Vain UHF-portit | Hybridi RTLS (433 MHz) |
| :--- | :--- | :--- | :--- |
| Paikannuksen kattavuus | Ei | 6–10 m (vain pisteet) | 500 m (jatkuva) |
| Henkilön paikannusaika (hätä) | 45 min | Ei sovellu | 15 sekuntia |
| Kestävyys −40 °C:ssa | Ei toimi (paperi/terminaalit) | Passiivinen UHF (OK) | Li-SOCl₂ (OK) |
| Turvallisuus (ISO 45001) | Alhainen | Alhainen | Korkea |

## TCO ja ROI viiden vuoden aikana

*Kaikki summat euroina (EUR €).*

| Kustannuserä | Skenaario A: manuaalinen | Skenaario B: RTLS + UHF |
| :--- | :--- | :--- |
| Infrastruktuuri (tukiasemat, portit, antennit) | 50 000 € | 1 000 000 € |
| Aktiivitunnisteet (433 MHz, 400 €/kpl) | — | 400 € × (800+150) = 380 000 € |
| Passiiviset UHF-tunnisteet (5 €/kpl) | — | 5 € × 2000 × 5 v = 50 000 € |
| Middleware, EPCIS ja turvallisuusintegraatio | — | 250 000 € |
| Manuaalinen kirjanpito ja hallinnointi | 1 200 000 €/v × 5 = 6 000 000 € | 150 000 €/v × 5 = 750 000 € |
| Seisonta-ajat ja virheet | 800 000 €/v × 5 = 4 000 000 € | 100 000 €/v × 5 = 500 000 € |
| Ylläpito ja huolto | 100 000 €/v × 5 = 500 000 € | 200 000 €/v × 5 = 1 000 000 € |
| Ohjelmisto ja pilvi | 50 000 €/v × 5 = 250 000 € | 100 000 €/v × 5 = 500 000 € |
| **TCO yhteensä** | **10 800 000 €** | **4 430 000 €** |

Skenaarion B lisä-CAPEX on 1 630 000 € (1 680 000 € vastaan 50 000 €). Vuotuinen OPEX-säästö on 1 600 000 €/v. Takaisinmaksuaika = 1 630 000 € / 1 600 000 €/v × 12 ≈ 12,2 kuukautta. Viiden vuoden aikana nettosäästö lisä-CAPEX:n jälkeen on 6 370 000 € eli 59,0 % skenaarion A TCO:sta. Suurin säästö syntyy seisonta-aikojen vähenemisestä ja manuaalisen kirjanpidon poistumisesta.

## Johtopäätökset ja näkymät

Maanalaisessa kaivosteollisuudessa standardit UHF-tunnisteet eivät riitä −40 °C:ssa eivätkä 500 metrin tunneleissa. Hybridiarkkitehtuuri, jossa yhdistyvät aktiivinen RFID 433 MHz (10 mW ERP, Li-SOCl₂-paristot) ja passiivinen UHF-portit, sekä EPCIS 2.0 -integraatio, on ainoa skaalautuva ratkaisu, joka täyttää ATEX-vaatimukset ja ISO 45001 -turvallisuusstandardit. Tulevina vuosina digitalisaatio ESPR (EU) 2024/1781:n myötä ja digitaaliset tuotepassit tekevät jatkuvasta paikannuksesta standardin myös kaivoksissa.

## UKK

### Miksi tavalliset paristot eivät toimi −40 °C:ssa?
Litiumioniakut menettävät merkittävän osan kapasiteetistaan alhaisissa lämpötiloissa. Aktiivitunnisteissa käytetään Li-SOCl₂-kennoja, jotka säilyttävät jopa 90 % kapasiteetistaan alueella −55 °C … +85 °C.

### Voiko passiivinen UHF toimia 500 metrin matkalla?
Ei, passiivisen UHF:n lukemaetäisyys on tyypillisesti 6–10 metriä. 500 metrin paikannukseen käytetään aktiivista RFID:tä 433 MHz:n taajuudella (10 mW ERP) ja hajautettua tukiasemaverkkoa.

### Mitä ATEX-vaatimuksia kaivoksen RFID-järjestelmille on?
Räjähdysvaarallisilla alueilla (metaani, hiilipöly) kaikkien laitteiden (lukijat, tunnisteet, tukiasemat) on oltava ATEX-sertifioituja ryhmän I kategorioihin M1 tai M2 standardin IEC 60079-0 mukaisesti.

### Mikä on takaisinmaksuaika laskentaesimerkissä?
Lisä-CAPEX on 1 630 000 € ja vuotuinen OPEX-säästö 1 600 000 €. Takaisinmaksuaika on noin 12,2 kuukautta.

---
*Kirjoittaja: Yurii Kasian, Vanhempi RFID-insinööri · RFID Ukraine · Päivitetty: 15. marraskuuta 2026*
