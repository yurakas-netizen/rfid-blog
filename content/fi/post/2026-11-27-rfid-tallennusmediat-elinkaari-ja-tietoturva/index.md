---
title: "RFID-tallennusmediat: elinkaari ja tietoturva"
slug: rfid-tallennusmediat-elinkaari-ja-tietoturva
description: Tekninen analyysi RFID-tunnisteiden elinkaaren hallinnasta ja
  tietoturvasta, keskittyen AES-128-salaukseen, Access- ja Kill-salasanoihin
  sekä GDPR- ja NIS2-vaatimusten mukaiseen hallittuun hävitykseen.
date: 2026-11-15T10:00:00.000Z
image: image01_7.webp
categories:
  - UHF RFID
  - Tietoturva
tags:
  - AES-128
  - GDPR
  - NIS2
  - Kill-komento
  - EPCIS 2.0
  - TCO
translationKey: uhf-rfid-storage-media-lifecycle-security
---
RFID-tunnisteet eivät ole vain tunnistimia, vaan niitä voidaan pitää tallennusmedioina: niiden EPC- ja User-muistipankkeihin voidaan kirjoittaa huoltohistoriaa, sertifikaatteja ja jopa henkilötietoja. Tämä luo merkittävän tietoturvariskin. Kun 50 000 laitetta poistetaan käytöstä, pelkkä fyysinen silppuaminen ei riitä, jos tunnisteen siru on edelleen luettavissa ennen silppua. GDPR:n (EU 2016/679) ja NIS2-direktiivin mukaisesti data on suojattava salauksella (AES-128, ISO/IEC 29167) ja poistettava tai tuhottava hallitusti. Tämä tekninen analyysi vertaa manuaalista tietoturvapoistoa kryptografiseen UHF RFID -arkkitehtuuriin, jossa on Access- ja Kill-salasanat, sekä 5 vuoden TCO:hon euroina.

## Normatiivinen kehys: GDPR, NIS2 ja salausstandardit

UHF RFID -järjestelmät Euroopassa noudattavat standardia ISO/IEC 18000-63:2021 ilmarajapinnan osalta sekä ETSI EN 302 208:a taajuusalueella 865–868 MHz. Tietoturvan osalta keskeinen standardi on ISO/IEC 29167-10, joka määrittelee AES-128-salauksen RFID-tunnisteille. GDPR (EU 2016/679) velvoittaa rekisterinpitäjää varmistamaan henkilötietojen asianmukaisen suojan ja poistamisen (oikeus tulla unohdetuksi, 17 artikla). NIS2-direktiivi (EU 2022/2555) laajentaa kyberturvallisuusvaatimukset kriittisen infrastruktuurin toimitusketjuihin. GS1 EPCIS 2.0 tarjoaa tapahtumamallin, jolla tunnisteen elinkaaren tapahtumat (luonti, päivitys, poisto) kirjataan. Suorituskykyä mitataan ISO/IEC 18046-3:n mukaisesti, ja ilmarajapinnan yhdenmukaisuus varmistetaan ISO/IEC 18047-6:lla. Lisäksi RAIN RFID Alliance suosittelee salattujen Access-salasanojen käyttöä kaikissa tuotantoympäristöissä.

## Muistipankit, salaus ja Kill-komento

Gen2-tunnisteen muisti jaetaan neljään pankkiin: Reserved (Kill- ja Access-salasanat), EPC (96-bittinen tuotekoodi), TID (valmistajan yksilöivä, pysyvä) ja User (jopa 512 bittiä sovellusdataa). Access-salasanalla suojataan kirjoitus- ja lukuoperaatiot, kun taas Kill-salasanalla tunniste voidaan pysyvästi poistaa käytöstä. Pelkkä Kill-komento ei kuitenkaan täytä GDPR:n vaatimuksia, jos EPC-muistissa on henkilötietoja: tunniste on edelleen luettavissa ennen Kill-komennon suorittamista. Siksi tarvitaan salaus (AES-128), joka estää luvattoman lukemisen jo ennen elinkaaren loppua.

Fyysinen silppuaminen ei ole ratkaisu tietoturvaan. Jos tunniste silputaan ennen datan poistoa, sirun fragmentit voivat edelleen sisältää luettavaa dataa, jos silppu ei ole tarpeeksi hienojakoista. Toisaalta, jos data poistetaan ohjelmallisesti (User-pankin nollaus ja Kill-komento), fyysinen silppuaminen on vain materiaalin kierrätystä. Tämä kaksivaiheinen prosessi (salaus → ohjelmallinen poisto → fyysinen hävitys) on ainoa tapa täyttää sekä GDPR että NIS2 vaatimukset.

Protokollatasolla salatut tunnisteet käyttävät AES-128-salausavainta, joka tallennetaan turvallisesti (esim. HSM-moduuliin). Lukija todentaa itsensä tunnisteelle ennen kuin se voi lukea User-pankkia. Tämä estää sivullisten lukijoiden pääsyn dataan. Suorituskykytestit ISO/IEC 18046-3:n mukaisesti osoittavat, että salaus ei heikennä lukuvarmuutta, mutta lisää hieman viivettä (noin 5–10 ms per todennus).

## Anonymisoidut elinkaaren hallinnan skenaariot

### Skenaario A: manuaalinen tietoturvapoisto
Yritys hallinnoi 50 000 IT-laitetta. Jokaisen laitteen RFID-tunnisteeseen on kirjoitettu käyttäjän nimi ja huoltohistoria. Käytöstä poiston yhteydessä operaattori ylikirjoittaa tiedot manuaalisesti kämmenterminaalilla ja silppuaa tunnisteen. Prosessi vie 15 minuuttia per laite, ja inhimillisten virheiden vuoksi 5–8 %:ssa tapauksista data jää osittain tunnisteeseen. Tämä aiheuttaa GDPR-riskin ja 200 000 euron vuotuiset compliance-kustannukset.

### Skenaario B: kryptografinen UHF RFID
Sama yritys ottaa käyttöön AES-128-salatut UHF-tunnisteet ja hallitun avaintenhallintajärjestelmän (HSM). Käytöstä poiston yhteydessä lukija lähettää Kill-komennon ja nollaa User-pankin automaattisesti. Prosessi vie 2 minuuttia per laite, ja virheiden osuus laskee alle 0,1 %:iin. Compliance-kustannukset laskevat 50 000 euroon vuodessa.

## Vertailumatriisi

| Kriteeri | Manuaalinen poisto | Vakio-UHF | Kryptografinen UHF (AES-128) |
| :--- | :--- | :--- | :--- |
| Tietoturva (GDPR) | Riski 5–8 % | Korkea riski | Alle 0,1 % (salattu) |
| Poistoaika per laite | 15 min | 10 min | 2 min |
| Luvaton lukeminen | Helppoa | Mahdollista | Estetty (salaus) |
| Yhteensopivuus NIS2:n kanssa | Ei | Osittain | Kyllä |

## TCO ja ROI viiden vuoden aikana

*Kaikki summat euroina (EUR €).*

| Kustannuserä | Skenaario A: manuaalinen | Skenaario B: kryptografinen UHF |
| :--- | :--- | :--- |
| Kämmenterminaalit | 20 000 € | — |
| Lukijat ja antennit | — | 150 000 € |
| Avaintenhallinta (HSM) ja EPCIS | — | 100 000 € |
| Kryptografiset UHF-tunnisteet (2 €/kpl) | — | 2 € × 50 000 × 1 erä (5 v) = 100 000 € |
| Manuaalinen tietoturvapoisto ja compliance | 200 000 €/v × 5 = 1 000 000 € | 50 000 €/v × 5 = 250 000 € |
| Ylläpito | 20 000 €/v × 5 = 100 000 € | 60 000 €/v × 5 = 300 000 € |
| **TCO yhteensä** | **1 120 000 €** | **900 000 €** |

Skenaarion B lisä-CAPEX on 330 000 € (350 000 € vastaan 20 000 €). Vuotuinen OPEX-säästö on 110 000 €/v (220 000 €/v − 110 000 €/v). Takaisinmaksuaika = 330 000 € / 110 000 €/v × 12 ≈ 36,0 kuukautta. Viiden vuoden aikana nettosäästö lisä-CAPEX:n jälkeen on 220 000 € eli 19,6 % skenaarion A TCO:sta. Suurin säästö syntyy manuaalisen tietoturvapoiston ja compliance-kustannusten vähenemisestä.

## Johtopäätökset ja näkymät

RFID-tunnisteiden elinkaaren hallinta on ennen kaikkea tietoturvakysymys. Pelkkä fyysinen silppuaminen ei riitä, jos tunnisteen muistiin on tallennettu henkilötietoja. AES-128-salaus (ISO/IEC 29167-10), Access- ja Kill-salasanat sekä hallittu avaintenhallinta (HSM) ovat ainoa tapa täyttää GDPR:n ja NIS2:n vaatimukset. Tulevina vuosina ESPR (EU) 2024/1781 ja digitaaliset tuotepassit tekevät salatusta datasta ja turvallisesta elinkaaren hallinnasta pakollisia kaikille RFID-järjestelmille.

## UKK

### Miksi pelkkä fyysinen silppuaminen ei riitä tietoturvaan?
Jos tunniste silputaan ennen datan poistoa, sirun fragmentit voivat edelleen sisältää luettavaa dataa. Siksi tarvitaan ensin ohjelmallinen poisto (Kill-komento ja User-pankin nollaus) ja vasta sitten fyysinen hävitys.

### Mikä on AES-128-salauksen rooli RFID:ssä?
AES-128 salaa User-pankin datan, jolloin vain oikean avaimen omaava lukija voi lukea sen. Tämä estää luvattoman lukemisen ja täyttää GDPR:n vaatimukset henkilötietojen suojasta.

### Mikä on Kill-komennon merkitys elinkaaren lopussa?
Kill-komento poistaa tunnisteen pysyvästi käytöstä. Se ei kuitenkaan tyhjennä muistia, joten se on tehtävä vasta, kun data on jo poistettu tai salattu. Kill-komento estää tunnisteen uudelleenkäytön ja varmistaa, ettei sitä voi enää lukea.

### Mikä on takaisinmaksuaika laskentaesimerkissä?
Lisä-CAPEX on 330 000 € ja vuotuinen OPEX-säästö 110 000 €. Takaisinmaksuaika on noin 36,0 kuukautta.

---
*Kirjoittaja: Yurii Kasian, Vanhempi RFID-insinööri · RFID Ukraine · Päivitetty: 15. marraskuuta 2026*
