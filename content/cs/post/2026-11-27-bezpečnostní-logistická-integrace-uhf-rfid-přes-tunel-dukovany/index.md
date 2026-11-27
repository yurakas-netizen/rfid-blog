---
title: Bezpečnostní logistická integrace UHF RFID přes tunel Dukovany
slug: bezpecnostni-logisticka-integrace-uhf-rfid-pres-tunel-dukovany
description: Technická analýza UHF RFID systémů pro automatickou identifikaci
  vozidel a nákladu v bezpečnostní logistice tunelu Dukovany. Zabývá se
  adaptivním Q-algoritmem, kruhovou polarizací, integrací GS1 EPCIS 2.0 a 5letým
  výpočtem TCO v CZK.
date: 2026-11-15T10:00:00.000Z
image: image01_6.webp
categories:
  - UHF RFID
  - Průmyslová automatizace
tags:
  - bezpečnostní logistika
  - adaptivní Q
  - EPCIS 2.0
  - IATF 16949
  - TCO
  - IP69K
translationKey: uhf-rfid-tunnel-dukovany-security-logistics
---
Bezpečnostní logistika v prostředí s omezeným přístupem, jakým je tunel Dukovany, klade na identifikaci mimořádné nároky. Tunel slouží jako kritický dopravní uzel pro zásobování jaderné elektrárny a vyžaduje automatickou identifikaci vozidel a nákladu bez zastavení, v prostředí s hustou dopravou, omezeným signálem GNSS a přísnými bezpečnostními protokoly. Standardní čárové kódy selhávají při rychlosti nad 30 km/h, za zhoršených světelných podmínek a v tunelech, kde dochází k odrazům a rušení. Tato technická analýza porovnává ruční identifikaci s UHF RFID architekturou založenou na pasivních EPC Gen2 etiketách, adaptivním Q-algoritmu a integraci s GS1 EPCIS 2.0, včetně pětiletého TCO v CZK Kč.

## Normativní rámec pro bezpečnostní logistiku

UHF RFID v Evropě podléhá normě ISO/IEC 18000-63:2021 pro rádiové rozhraní a ETSI EN 302 208 pro frekvenční pásmo 865–868 MHz, s maximálním výkonem 2 W ERP. V České republice dohlíží na dodržování těchto parametrů Český telekomunikační úřad (ČTÚ). Pro automatickou identifikaci vozidel a nákladu v intermodální dopravě platí ČSN EN ISO 17262, která definuje číslování a datové struktury. V automobilovém průmyslu, který je klíčovým odběratelem komponentů proudících přes tunel, vyžaduje IATF 16949:2016 (článek 8.5.2) plnou sledovatelnost šarží a sérií, přičemž RFID je doporučeno jako primární technologie podle standardů GS1. Pro bezpečnostní složky a přepravu nebezpečných materiálů se aplikují požadavky na kybernetickou bezpečnost dle NIS2 (EU) 2022/2555. Standard GS1 EPCIS 2.0 poskytuje model událostí pro registraci každého průjezdu a propojení s digitálním produktovým pasem. Nařízení ESPR (EU) 2024/1781 postupně zavede digitální produktové pasy i pro železniční a logistické komponenty.

## Fyzika v tunelu: odrazy, rychlost a adaptivní Q

Tunel Dukovany představuje uzavřené prostředí s kovovým ostěním, které vytváří mnohacestné šíření signálu a stojaté vlnění. Na rozdíl od otevřeného prostoru zde vznikají interferenční uzly, kde může být signál zesílen nebo zcela potlačen. Proto se doporučuje použít kruhovou polarizaci antén a rozmístit čtecí brány tak, aby pokryly kritické body (vjezd, výjezd, případně kontrolní stanoviště). Při rychlosti průjezdu do 60 km/h a vzdálenosti mezi vozidly 20–30 metrů je nutné, aby čtecí zóna byla dostatečně dlouhá (minimálně 10–15 metrů) a aby algoritmus adaptivního Q dokázal zpracovat 40–50 etiket v zóně současně. Pevné Q=4 (16 slotů) při takovém počtu etiket vede k efektivitě pod 25 % a k opakovanému čtení rámců. Adaptivní Q (start Q=6, dynamicky 5–7) a modulace Miller M=8 stabilizují čtení i při rychlém průjezdu. Testy výkonnosti podle ISO/IEC 18046-3 dokumentují rychlost a spolehlivost v průmyslových podmínkách, a ISO/IEC 18047-6 zajišťuje shodu rádiového rozhraní.

## Anonymizované scénáře implementace

### Scénář A: ruční identifikace s čárovým kódem
Logistický operátor zajišťuje 50 000 průjezdů ročně tunelem Dukovany. Každé vozidlo je označeno čárovým kódem a papírovým průvodním listem. Identifikace probíhá ručně na vjezdu a výjezdu, přičemž průměrná doba odbavení je 15 minut na vozidlo. Při rychlosti nad 30 km/h se čárový kód stává nečitelným, a v tunelech se navíc zvyšuje prašnost a vlhkost. Míra chybovosti zápisu je 5–8 %, což vede k častým kontrolám a zpožděním. Roční náklady na ruční práci a prostoje dosahují 1 200 000 Kč.

### Scénář B: UHF RFID s adaptivním Q a EPCIS 2.0
Stejný operátor instaluje 6 UHF bran (3 na vjezdu, 3 na výjezdu) s kruhově polarizovanými anténami. Vozidla jsou vybavena pasivními EPC Gen2 etiketami s ochranou IP69K, které odolávají prachu a vlhkosti. Každý průjezd je automaticky zaznamenán v EPCIS 2.0 a propojen s dispečinkem. Doba odbavení klesá na 45 sekund, chybovost na 0,3 %, a roční náklady na ruční práci a prostoje se snižují na 200 000 Kč.

## Srovnávací matice

| Kritérium | Čárový kód | Standardní UHF | UHF s adaptivním Q |
| :--- | :--- | :--- | :--- |
| Rychlost průjezdu | Do 30 km/h | Do 60 km/h | Do 80 km/h |
| Spolehlivost čtení | 85–90 % | 94–96 % | 99,7 % |
| Doba odbavení | 15 min | 5 min | 45 s |
| Odolnost proti prachu a vlhkosti | Nízká | Střední | Vysoká (IP69K) |
| Soulad s IATF 16949 | Nízký | Částečný | Plný (EPCIS 2.0) |

## TCO a ROI za 5 let

*Všechny částky v CZK Kč.*

| Nákladová položka | Scénář A: ruční | Scénář B: UHF |
| :--- | :--- | :--- |
| Ruční terminály | 60 000 Kč | — |
| Čtečky, antény a kabeláž | — | 600 000 Kč |
| Middleware a integrace EPCIS | — | 250 000 Kč |
| Instalace a školení | — | 150 000 Kč |
| Čárové kódy (etikety) | 0,5 Kč × 50 000 × 5 = 125 000 Kč | — |
| RFID etikety (IP69K, 4 Kč/ks) | — | 4 Kč × 50 000 × 5 = 1 000 000 Kč |
| Ruční identifikace a dokumentace | 1 200 000 Kč/rok × 5 = 6 000 000 Kč | 200 000 Kč/rok × 5 = 1 000 000 Kč |
| Chyby a prostoje | 600 000 Kč/rok × 5 = 3 000 000 Kč | 80 000 Kč/rok × 5 = 400 000 Kč |
| Údržba | 50 000 Kč/rok × 5 = 250 000 Kč | 150 000 Kč/rok × 5 = 750 000 Kč |
| Software a cloud | 30 000 Kč/rok × 5 = 150 000 Kč | 100 000 Kč/rok × 5 = 500 000 Kč |
| **Celkové TCO** | **9 585 000 Kč** | **4 650 000 Kč** |

Dodatečný CAPEX pro scénář B činí 940 000 Kč (1 000 000 Kč vs 60 000 Kč). Roční úspora OPEX je 1 350 000 Kč/rok. Doba návratnosti (Payback) = 940 000 Kč / 1 350 000 Kč/rok × 12 ≈ 8,4 měsíce. Za 5 let je čistá úspora po odečtení dodatečného CAPEX 4 935 000 Kč, což představuje 51,5 % TCO scénáře A. Největší úspora pochází ze snížené ruční identifikace a méně chyb, nikoli z ceny etiket.

## Závěry a perspektivy

V bezpečnostní logistice, jakou představuje tunel Dukovany, jsou standardní čárové kódy nedostatečné. UHF RFID s adaptivním Q, kruhovou polarizací a integrací EPCIS 2.0 umožňuje automatickou identifikaci při rychlosti do 80 km/h se spolehlivostí 99,7 %, což odpovídá požadavkům IATF 16949 i NIS2. V následujících letech budou digitální produktové pasy (ESPR) vyžadovány i pro logistické komponenty, a RFID se stane standardem, nikoli volbou.

## FAQ

### Proč čárové kódy selhávají v tunelu Dukovany?
Čárové kódy vyžadují přímou viditelnost a jsou náchylné k poškození prachem a vlhkostí. V tunelech s omezeným osvětlením a při rychlosti nad 30 km/h je jejich čtení nespolehlivé. UHF RFID pracuje bez přímé viditelnosti a zvládá rychlost až 80 km/h.

### Jaké Q je potřeba pro 40–50 etiket v tunelu?
Při 40–50 etiketách je nutné použít adaptivní Q (start Q=6, dynamicky 5–7), protože pevné Q=4 vede k efektivitě pod 25 %. Adaptivní Q s modulací Miller M=8 stabilizuje čtení i při rychlém průjezdu.

### Jak RFID pomáhá splnit IATF 16949?
Každý průjezd je automaticky zaznamenán jako událost EPCIS 2.0, což zajišťuje plnou sledovatelnost šarží a sérií podle článku 8.5.2. Ruční zápis se eliminuje a chybovost klesá pod 0,3 %.

### Jaká je doba návratnosti v příkladu?
Dodatečný CAPEX je 940 000 Kč a roční úspora OPEX je 1 350 000 Kč. Doba návratnosti je přibližně 8,4 měsíce.

---
*Autor: Yurii Kasian, Hlavní RFID inženýr · RFID Ukraine · Aktualizováno: 15. listopadu 2026*
