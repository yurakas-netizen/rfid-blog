---
title: "RFID na kovu – volba podkladu a antikolizní algoritmy: technická analýza
  pro výrobní průmysl"
slug: rfid-na-kovu-volba-podkladu-a-antikolizni-algoritmy-technicka-analyza-pro
description: Technická analýza UHF RFID systémů na kovových površích ve výrobním
  průmyslu. Zabývá se on-metal etiketami (ferit, Al₂O₃), adaptivním
  Q-algoritmem, integrací GS1 EPCIS 2.0 a 5letým výpočtem TCO v CZK.
date: 2026-11-15T10:00:00.000Z
image: image01_4.webp
categories:
  - UHF RFID
  - Průmyslová automatizace
tags:
  - on-metal
  - Al₂O₃
  - Q-algoritmus
  - EPCIS 2.0
  - IATF 16949
  - TCO
translationKey: uhf-rfid-on-metal-anti-collision-q-algorithm
---
Kovové povrchy patří k nejnáročnějším prostředím pro RFID identifikaci. Kov odráží rádiový signál a běžné UHF etikety ztrácejí čitelnost již při vzdálenosti 0,3–0,5 metru. Současně ve výrobním průmyslu prochází čtecí branou často 40–50 komponentů najednou, což činí antikolizní algoritmus rozhodujícím pro spolehlivost. Tato technická analýza porovnává ruční sledování čárových kódů s architekturou UHF RFID založenou na on-metal etiketách (ferit nebo keramický distanční materiál), adaptivním Q-algoritmu a integraci s GS1 EPCIS 2.0, včetně pětiletého TCO v CZK Kč.

## Normativní rámec a standardy

UHF RFID v Evropě podléhá normě ISO/IEC 18000-63:2021 pro rádiové rozhraní a ETSI EN 302 208 pro frekvenční pásmo 865–868 MHz, s maximálním výkonem 2 W ERP. V České republice dohlíží na dodržování těchto parametrů Český telekomunikační úřad (ČTÚ). Pro automobilový průmysl, který je klíčovým odběratelem kovových komponentů, vyžaduje IATF 16949:2016 (článek 8.5.2) plnou sledovatelnost šarží a sérií. Standardy VDA 5500 a VDA 5509 specifikují, jak má být RFID využíváno pro sledování dílů a kontejnerů v automobilovém logistickém řetězci. Pro korozivzdornost v průmyslových prostředích definuje ISO 12944 kategorii CX (offshore a agresivní průmysl), relevantní pro venkovní nebo chemicky exponované komponenty. Stupeň krytí podle IEC 60529 (IP68/IP69K) určuje, zda etiketa odolá vysokotlakému mytí a ponoření. Standard GS1 EPCIS 2.0 poskytuje model událostí pro registraci každého pohybu a propojení s digitálním produktovým pasem. Datová struktura EPC kódu je definována v GS1 TDS 2.1 (SGTIN-96). Nařízení ESPR (EU) 2024/1781 postupně zavede digitální produktové pasy i pro kovové komponenty.

## Fyzika na kovu a antikolizní algoritmy

Kov odráží UHF signál téměř dokonale a narušuje impedanční přizpůsobení antény. Běžná etiketa na kovovém povrchu proto nefunguje. Řešením je on-metal etiketa buď se sintrovanou feritovou destičkou (μr 50–150), nebo s keramickým distančním materiálem (Al₂O₃) o tloušťce 1,5–4 mm, což odpovídá přibližně λ/10–λ/4 při 866 MHz. Ferit je vhodný do přibližně 150 °C, zatímco keramický distanční materiál zvládá vyšší teploty a je nezbytný po průchodu vypalovací pecí nebo pájecím procesem. RAIN RFID Alliance doporučuje kruhově polarizované antény se ziskem 9 dBi a vzdálenost 1,5–2 metru mezi čtečkou a etiketou na kovu. Bez tohoto přizpůsobení je čtení na oceli prakticky nemožné.

V otázce antikolize dělí Gen2 čtečka čas na rámce s 2^Q sloty. S pevným Q=4 (16 slotů) je efektivita rámce maximální při přibližně 16 etiketách, ale při 40–50 komponentech v bráně klesá efektivita pod 25 % a čtečka je nucena rámec opakovat. Adaptivní Q (start Q=6, dynamicky 5–7) upravuje počet slotů podle populace a stabilizuje čtení. Teoretický horní limit efektivity slotu v Q-algoritmu je přibližně 36,8 %, čehož je dosaženo, když velikost rámce odpovídá počtu etiket. Testy výkonnosti podle ISO/IEC 18046-3 dokumentují rychlost čtení a spolehlivost, a ISO/IEC 18047-6 zajišťuje shodu rádiového rozhraní.

## Anonymizované scénáře implementace

### Scénář A: ruční sledování s čárovým kódem
Výrobní podnik produkuje 30 000 kovových komponentů ročně. Každá jednotka je označena čárovým kódem a papírovým průvodním listem. Po anodizaci nebo lakování je čárový kód nečitelný v 7–10 % případů. Operátoři zapisují data ručně, což vede k 6–9 % chybovosti a 250 000 Kč ročních nákladů na prostoje. Kontrola kvality a sledovatelnost podobná IATF je značně ztížena.

### Scénář B: UHF RFID s on-metal etiketami a adaptivním Q
Stejný podnik instaluje čtyři UHF brány na výrobní lince a zavádí on-metal etikety (ferit pro standardní komponenty a keramické Al₂O₃ pro komponenty procházející vypalovací pecí). Každý komponent obdrží jedinečný EPC kód, který je automaticky čten v každém kroku a zaznamenán jako událost EPCIS 2.0. Spolehlivost čtení dosahuje 99,6–99,8 %, chybovost klesá na 0,3 % a náklady na prostoje se snižují na 40 000 Kč ročně.

## Srovnávací matice

| Kritérium | Čárový kód | Standardní UHF | UHF on-metal (ferit/keramika) |
| :--- | :--- | :--- | :--- |
| Čtení na kovu | Manuální | 0,3–0,5 m | 1,5–2 m (on-metal) |
| Teplotní odolnost (vypalovací pec) | Nezvládá | Max. 150 °C | >250 °C (Al₂O₃) |
| Antikolize 40–50 etiket | N/A | Pevné Q=4 (<25 %) | Adaptivní Q=6–7 (>35 %) |
| Spolehlivost čtení | 91–94 % | 96–97 % | 99,6–99,8 % |
| Krytí IP | N/A | IP67 | IP68 / IP69K |

## TCO a ROI za 5 let

*Všechny částky v CZK Kč.*

| Nákladová položka | Scénář A: ruční | Scénář B: UHF |
| :--- | :--- | :--- |
| Ruční terminály | 30 000 Kč | — |
| Čtečky, antény a kabeláž | — | 300 000 Kč |
| Middleware a integrace EPCIS | — | 150 000 Kč |
| Instalace a školení | — | 120 000 Kč |
| Čárové kódy (etikety) | 0,50 Kč × 30 000 × 5 = 75 000 Kč | — |
| RFID etikety (on-metal, 5 Kč/ks) | — | 5 Kč × 30 000 × 5 = 750 000 Kč |
| Ruční kontrola a dokumentace | 500 000 Kč/rok × 5 = 2 500 000 Kč | 100 000 Kč/rok × 5 = 500 000 Kč |
| Chyby a prostoje | 250 000 Kč/rok × 5 = 1 250 000 Kč | 50 000 Kč/rok × 5 = 250 000 Kč |
| Údržba | 40 000 Kč/rok × 5 = 200 000 Kč | 120 000 Kč/rok × 5 = 600 000 Kč |
| Software a cloud | 30 000 Kč/rok × 5 = 150 000 Kč | 70 000 Kč/rok × 5 = 350 000 Kč |
| **Celkové TCO** | **4 205 000 Kč** | **3 020 000 Kč** |

Dodatečný CAPEX pro scénář B činí 540 000 Kč (570 000 Kč vs 30 000 Kč). Roční úspora OPEX je 480 000 Kč/rok. Doba návratnosti (Payback) = 540 000 Kč / 480 000 Kč/rok × 12 ≈ 13,5 měsíce. Za 5 let je čistá úspora po odečtení dodatečného CAPEX 1 185 000 Kč, což představuje 28,2 % TCO scénáře A. Největší úspora pochází ze snížené ruční kontroly a méně chyb, nikoli z ceny etiket.

## Závěry a perspektivy

Ve výrobním průmyslu s kovovými povrchy a 40–50 souběžnými komponenty je zapotřebí jak správný podklad etikety, tak správná antikolizní strategie. Keramické Al₂O₃ etikety zvládají 250 °C ve vypalovací peci, feritové etikety fungují do 150 °C a adaptivní Q=6–7 udržuje přes 99 % spolehlivosti čtení v hustých branách. GS1 EPCIS 2.0 zároveň poskytuje sledovatelnost kompatibilní s IATF 16949 a připravovanými digitálními produktovými pasy ESPR. V následujících letech se digitální produktové pasy stanou povinnými pro stále více kovových komponentů a on-metal etikety jsou pragmatickým prvním krokem.

## FAQ

### Proč běžná UHF etiketa nefunguje na kovu?
Kov odráží rádiový signál a narušuje impedanční přizpůsobení antény. Řešením je on-metal etiketa s feritovou destičkou (μr 50–150) nebo keramickým distančním materiálem (Al₂O₃) o tloušťce 1,5–4 mm, což odpovídá přibližně λ/10–λ/4 při 866 MHz.

### Jaké Q je zapotřebí pro 40–50 etiket?
Q=4 dává 16 slotů a při 40 etiketách klesá efektivita pod 25 %. Q=6 (64 slotů) nebo Q=7 (128 slotů) udržuje přes 35 % efektivity. Adaptivní Q (5–7) se automaticky přizpůsobuje populaci.

### Jak vysoké teploty zvládají keramické etikety?
Keramické Al₂O₃ etikety zvládají až 250 °C, zatímco PPS etikety se taví při 150–180 °C. Feritové etikety zvládají přibližně 150 °C a jsou určeny pro aplikace pod 120 °C.

### Jaká je doba návratnosti v příkladu výpočtu?
Dodatečný CAPEX je 540 000 Kč a roční úspora OPEX je 480 000 Kč. Doba návratnosti je přibližně 13,5 měsíce.

---
*Autor: Yurii Kasian, Hlavní RFID inženýr · RFID Ukraine · Aktualizováno: 15. listopadu 2026*
