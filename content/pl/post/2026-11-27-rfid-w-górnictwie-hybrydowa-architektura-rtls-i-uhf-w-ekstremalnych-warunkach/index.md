---
title: "RFID w górnictwie: hybrydowa architektura RTLS i UHF w ekstremalnych
  warunkach"
slug: rfid-w-gornictwie-hybrydowa-architektura-rtls-i-uhf-w-ekstremalnych-warunkach
description: Analiza techniczna wdrożeń hybrydowych systemów RTLS (aktywny RFID
  433 MHz) i pasywnego UHF w kopalniach podziemnych. Omówiono odporność baterii
  Li-SOCl₂ na temperatury -40°C, normy ATEX (IEC 60079), adaptacyjny algorytm Q
  oraz 5-letni TCO w PLN.
date: 2026-11-15T10:00:00.000Z
image: 123.webp
categories:
  - RTLS
  - UHF RFID
  - Przemysłowa automatyzacja
tags:
  - RTLS
  - ATEX
  - Li-SOCl₂
  - 433 MHz
  - EPCIS 2.0
  - TCO
translationKey: hybrid-uhf-rtls-mining-atex-500m
---
Górnictwo podziemne w ekstremalnych warunkach klimatycznych to jedno z najtrudniejszych środowisk dla systemów identyfikacji. Temperatury spadające do -40 °C, wysokie stężenie pyłu, wilgoć oraz wymóg zachowania ciągłej łączności i bezpieczeństwa na poziomach o długości 500 metrów sprawiają, że standardowe etykiety pasywne UHF są niewystarczające. Niniejsza analiza techniczna porównuje ręczną ewidencję z hybrydową architekturą RTLS (aktywny RFID 433 MHz o mocy 10 mW ERP do śledzenia załogi i maszyn) oraz pasywnym UHF (do bram i kontroli sprzętu). Omówiono normy ATEX (IEC 60079), odporność baterii Li-SOCl₂ na mróz oraz 5-letni TCO w PLN.

## Ramy normatywne i bezpieczeństwo w kopalni

Systemy UHF RFID podlegają normie ISO/IEC 18000-63:2021 oraz ETSI EN 302 208. Jednak do lokalizacji ciągłej na dystansie do 500 m stosuje się aktywny RFID w paśmie 433 MHz, regulowany przez ISO/IEC 18000-7:2014. Kluczowym ograniczeniem jest norma ETSI EN 300 220, która w Europie dopuszcza dla tego pasma maksymalną moc 10 mW ERP (10 dBm). W kopalniach węgla kamiennego i innych strefach zagrożenia wybuchem (metan, pył węglowy) urządzenia muszą posiadać certyfikację ATEX (grupa I, kategoria M1/M2) zgodnie z IEC 60079-0.

Z punktu widzenia bezpieczeństwa pracy (BHP) i zarządzania kryzysowego, systemy muszą być zgodne z ISO 45001, która wymaga natychmiastowej identyfikacji osób znajdujących się w strefie zagrożenia. Z kolei GS1 EPCIS 2.0 dostarcza model zdarzeń do śledzenia przepływu materiałów i sprzętu, umożliwiając integrację danych z systemami ERP i paszportami cyfrowymi. Wszelkie przerwy w transmisji danych z czujników i tagów mogą skutkować poważnymi konsekwencjami dla bezpieczeństwa załogi.

## Fizyka: -40 °C, baterie i zasięg 500 m

Standardowe baterie litowo-jonowe ulegają gwałtownej utracie pojemności w temperaturze -40 °C. Dlatego w tagach aktywnych stosuje się ogniwa Li-SOCl₂ (tlenek chlorku litu), które zachowują do 90% pojemności w zakresie od -55 °C do +85 °C. Zasięg 500 m w podziemnych korytarzach jest możliwy do osiągnięcia dzięki zastosowaniu rozproszonej sieci odbiorników (leaky feeder lub multiplekserów) oraz tagów aktywnych nadających z mocą 10 mW ERP. Należy pamiętać, że zasięg pasywnego UHF (np. na bramach kontrolnych) wynosi 6–10 m i nie nadaje się do ciągłego śledzenia na dystansie 500 m.

W warstwie protokołu pasywnego UHF, przy odczycie 40–50 tagów na palecie lub w bramie, stałe Q=4 (16 szczelin) powoduje kolizje i spadek wydajności poniżej 25%. Adaptacyjne Q (start Q=6, dynamicznie 5–7) stabilizuje proces. Testy wydajności według ISO/IEC 18046-3 dokumentują szybkość odczytu w warunkach przemysłowych, a ISO/IEC 18047-6 zapewnia zgodność interfejsu radiowego.

## Anonimowe scenariusze wdrożenia w kopalni

### Scenariusz A: ręczna ewidencja i papierowe książki
Kopalnia zatrudnia 800 osób i posiada 150 maszyn. Ręczna ewidencja wejść i wyjść z poziomów odbywa się za pomocą papierowych list i łączności radiowej. W temperaturze -40 °C terminale ręczne zawodzą, a papierowe listy ulegają zniszczeniu. Wskaźnik błędów przypisania maszyn do przodków wynosi 8–12%, co prowadzi do opóźnień w utrzymaniu ruchu. Czas potrzebny na zlokalizowanie osoby w sytuacji awaryjnej to nawet 45 minut.

### Scenariusz B: hybrydowy RTLS (433 MHz) i bramy UHF
Kopalnia instaluje 20 stacji bazowych RTLS (433 MHz, 10 mW ERP) w korytarzach o łącznej długości 500 m. Tagi aktywne Li-SOCl₂ noszą wszyscy pracownicy i są montowane na 150 maszynach. Bramy UHF (z adaptacyjnym Q) rejestrują wjazd i wyjazd sprzętu. System integruje się z EPCIS 2.0 i systemem BHP. Czas lokalizacji osoby spada do 15 sekund, a błędy przypisania maszyn do 0,5%.

## Matryca porównawcza

| Kryterium | Ręczna ewidencja | Tylko bramy UHF | Hybrydowy RTLS (433 MHz) |
| :--- | :--- | :--- | :--- |
| Zasięg lokalizacji | Brak | 6–10 m (tylko punkty) | 500 m (ciągły) |
| Czas lokalizacji osoby (awaria) | 45 min | Nie dotyczy | 15 sekund |
| Odporność na -40 °C | Brak (papier/terminale) | Pasywny UHF (OK) | Li-SOCl₂ (OK) |
| Bezpieczeństwo (ISO 45001) | Niskie | Niskie | Wysokie |

## TCO i ROI w horyzoncie 5 lat

*Wszystkie kwoty w PLN zł.*

| Pozycja kosztowa | Scenariusz A: ręczny | Scenariusz B: RTLS + UHF |
| :--- | :--- | :--- |
| Infrastruktura (stacje, bramy, anteny) | 50 000 zł | 1 000 000 zł |
| Tagi aktywne (433 MHz, 400 zł/szt.) | — | 400 zł × (800+150) = 380 000 zł |
| Tagi UHF (pasywne, 5 zł/szt.) | — | 5 zł × 2000 × 5 lat = 50 000 zł |
| Middleware, EPCIS i integracja BHP | — | 250 000 zł |
| Ręczna ewidencja i obsługa | 1 200 000 zł/rok × 5 = 6 000 000 zł | 150 000 zł/rok × 5 = 750 000 zł |
| Straty z tytułu przestojów i błędów | 800 000 zł/rok × 5 = 4 000 000 zł | 100 000 zł/rok × 5 = 500 000 zł |
| Utrzymanie i serwis | 100 000 zł/rok × 5 = 500 000 zł | 200 000 zł/rok × 5 = 1 000 000 zł |
| Software i chmura | 50 000 zł/rok × 5 = 250 000 zł | 100 000 zł/rok × 5 = 500 000 zł |
| **Całkowite TCO** | **10 800 000 zł** | **4 430 000 zł** |

Dodatkowy CAPEX dla scenariusza B wynosi 1 630 000 zł (1 680 000 zł vs 50 000 zł). Roczna oszczędność OPEX to 1 600 000 zł/rok. Okres zwrotu (Payback) = 1 630 000 zł / 1 600 000 zł/rok × 12 ≈ 12,2 miesiąca. W ciągu 5 lat oszczędność netto po odliczeniu dodatkowego CAPEX wynosi 6 370 000 zł, czyli 59,0% całkowitego TCO scenariusza A. Największe oszczędności pochodzą z redukcji przestojów maszyn oraz eliminacji ręcznej ewidencji.

## Wnioski i perspektywy

W ekstremalnych warunkach górniczych (-40 °C) standardowe etykiety pasywne UHF nie są w stanie zapewnić lokalizacji na dystansie 500 m. Hybrydowa architektura łącząca aktywny RFID 433 MHz (10 mW ERP, baterie Li-SOCl₂) z pasywnym UHF na bramach kontrolnych oraz integracja z EPCIS 2.0 to jedyne skalowalne rozwiązanie spełniające wymogi bezpieczeństwa i normy ATEX. W nadchodzących latach, wraz z rozwojem cyfrowych paszportów produktów i zaostrzeniem przepisów BHP, ciągła identyfikacja załogi i maszyn w kopalniach stanie się standardem.

## FAQ

### Dlaczego standardowe baterie nie sprawdzają się przy -40 °C?
Baterie litowo-jonowe tracą znaczną część pojemności w niskich temperaturach. W tagach aktywnych stosuje się ogniwa Li-SOCl₂, które zachowują do 90% pojemności w zakresie od -55 °C do +85 °C.

### Czy pasywny UHF może działać na dystansie 500 m?
Nie, zasięg pasywnego UHF wynosi zazwyczaj 6–10 m. Do lokalizacji na dystansie 500 m stosuje się aktywny RFID 433 MHz (10 mW ERP) z rozproszoną siecią stacji bazowych.

### Jakie są wymogi ATEX dla systemów RFID w kopalni?
W strefach zagrożenia wybuchem (metan, pył węglowy) wszystkie urządzenia (czytniki, tagi, stacje bazowe) muszą posiadać certyfikat ATEX grupy I, kategorii M1 lub M2, zgodnie z normą IEC 60079-0.

### Jaki jest okres zwrotu w przykładzie obliczeniowym?
Dodatkowy CAPEX wynosi 1 630 000 zł, a roczna oszczędność OPEX to 1 600 000 zł. Okres zwrotu wynosi około 12,2 miesiąca.

---
*Autor: Yurii Kasian, Główny inżynier RFID · RFID Ukraine · Zaktualizowano: 15 listopada 2026*
