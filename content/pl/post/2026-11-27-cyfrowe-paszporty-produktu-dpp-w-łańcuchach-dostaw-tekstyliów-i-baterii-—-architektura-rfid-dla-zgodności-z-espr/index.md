---
title: Cyfrowe Paszporty Produktu (DPP) w łańcuchach dostaw tekstyliów i baterii
  — architektura RFID dla zgodności z ESPR
slug: cyfrowe-paszporty-produktu-dpp-w-lancuchach-dostaw-tekstyliow-i-baterii
description: "Analiza techniczna architektury DPP opartej na GS1 Digital Link i
  EPCIS 2.0 dla tekstyliów i baterii: ograniczenia pamięci pasywnej RFID
  (512–2048 bitów) wobec wymagań ESPR (8–10 kbit), fizyka anten w tkaninach i na
  obudowach Li-ion oraz 5-letnie TCO w PLN."
date: 2026-11-14T22:00:00.000Z
image: next-gen_industrial_rfid_applications-4_1.jpg
categories:
  - RFID Solutions
tags:
  - DPP
  - ESPR
  - GS1 Digital Link
  - EPCIS 2.0
  - On-Metal RFID
  - Tekstylia RFID
translationKey: dpp-espr-rfid-textile-batteries
---
Rozporządzenie ESPR (EU) 2024/1781 wprowadza obowiązkowe Cyfrowe Paszporty Produktu (DPP) dla tekstyliów i baterii, których pełny zestaw danych (~8–10 kbit) fizycznie nie mieści się w pamięci pasywnej etykiety UHF (512–2048 bitów). To fundamentalny paradoks: im więcej danych wymaga regulator (skład materiałowy, instrukcje recyklingu, ślad węglowy), tym mniej miejsca pozostaje na unikalny identyfikator. Niniejsza analiza techniczna przedstawia architekturę opartą na GS1 Digital Link, gdzie w pamięci RFID przechowywany jest wyłącznie wskaźnik URL, a reszta danych rezyduje w zewnętrznej bazie EPCIS 2.0. Omówiono fizyczne ograniczenia anten w tekstyliach (ε' 1,5–2,5) oraz konieczność stosowania etykiet on-metal na obudowach baterii Li-ion, wraz z 5-letnim TCO w PLN.

## Krajobraz regulacyjny: wymagania DPP według ESPR

Rozporządzenie w sprawie ekoprojektu dla zrównoważonych produktów (ESPR, EU 2024/1781) zastępuje dyrektywę ekoprojektu z 2009 roku i rozszerza zakres na niemal wszystkie produkty fizyczne wprowadzane na rynek UE. Załącznik III precyzuje, że produkty tekstylne oraz baterie przemysłowe i do pojazdów elektrycznych muszą posiadać DPP dostępny elektronicznie, zawierający skład materiałów, instrukcje naprawy, demontażu i recyklingu oraz szacowany okres użytkowania. Wspólne Centrum Badawcze KE (2024) szacuje objętość danych na 8–10 kbit na produkt — o rząd wielkości więcej niż pojemność pasywnej etykiety UHF.

Kluczowym standardem interoperacyjności jest GS1 Digital Link: URL (do 256 znaków, ~2 kbit) w pamięci EPC lub użytkownika, wskazujący na zewnętrzną bazę danych. Architektura ta jest zgodna z ISO/IEC 24791-1, która definiuje warstwę pośredniczącą między identyfikatorem fizycznym a systemami informatycznymi. GS1 EPCIS 2.0 dostarcza model zdarzeń do śledzenia przepływu produktów i powiązania ich z paszportem cyfrowym w całym łańcuchu dostaw. Bez spójnych zdarzeń EPCIS paszport staje się bezużyteczny w audycie zgodności.

## Fizyczne ograniczenia RFID w tekstyliach i bateriach

W tekstyliach stała dielektryczna materiału bezpośrednio wpływa na zasięg odczytu. Bawełna ma ε' ≈ 1,5–2,0, poliester ε' ≈ 2,5 przy 900 MHz. Gdy etykieta zostanie wszyta w szew, zasięg spada z 6–8 m do 2–3 m z powodu tłumienia i odstrojenia anteny przez tkaninę. Rozwiązaniem są etykiety z tekstylną płaszczyzną masową lub dipole zoptymalizowane pod kątem tkanin (np. Impinj M730). W bateriach litowo-jonowych metalowa obudowa (stal/aluminium) działa jak reflektor, wymuszając stosowanie etykiet on-metal z ferrytem (Curie > 250 °C) lub przekładką ceramiczną Al₂O₃ o grubości 1,5–4 mm. Bez tego odczyt z odległości większej niż 0,5 m jest niemożliwy.

Interfejs Gen2 (ISO/IEC 18000-63) dzieli czas na ramki z 2^Q szczelinami. Przy 40–50 etykietach na palecie stałe Q=4 (16 szczelin) daje wydajność poniżej 25%, powodując wielokrotne powtórzenia. Adaptacyjne Q (start Q=6, dynamicznie 5–7) stabilizuje odczyt. Testy zgodności według ISO/IEC 18047-6 zapewniają interoperacyjność interfejsu radiowego. Należy jednak pamiętać, że nawet najlepsza optymalizacja anteny nie rozwiąże problemu pojemności pamięci — dlatego architektura wskaźnikowa (GS1 Digital Link) jest jedynym skalowalnym rozwiązaniem.

## Anonimowe scenariusze wdrożenia

### Scenariusz A: tekstylia — ręczne paszporty papierowe

Producent odzieży sportowej wytwarza 200 000 sztuk rocznie. Każda partia otrzymuje papierowy paszport z ręcznie wpisywanym składem i instrukcją recyklingu. Przy audycie ESPR 15–20% paszportów jest niekompletnych lub nieczytelnych, co wymusza ręczne odtwarzanie danych. Koszt pracy administracyjnej to 400 000 zł/rok. Zasięg odczytu etykiet UHF wszytych w szwy jest niewystarczający (2–3 m) do automatycznej weryfikacji na bramach.

### Scenariusz B: baterie — etykiety on-metal z Digital Link

Producent baterii Li-ion montuje etykiety on-metal z ferrytem na 100 000 modułów rocznie. W pamięci EPC zapisany jest wyłącznie GS1 Digital Link (URL do zewnętrznej bazy EPCIS 2.0). Bramy UHF odczytują identyfikator z odległości 1,5–2 m, a system automatycznie łączy go z paszportem cyfrowym. Czas weryfikacji partii spada z 40 do 5 minut, a odsetek niekompletnych paszportów spada poniżej 1%.

## Matryca porównawcza

| Kryterium | Papierowy paszport | RFID z pełnymi danymi | RFID + GS1 Digital Link |
|---|---|---|---|
| Pojemność danych | Nieograniczona (papier) | 512–2048 bit (za mało) | ~2 kbit (URL) + baza zewn. |
| Zgodność z ESPR | Niska (błędy ludzkie) | Niemożliwa (brak miejsca) | Pełna (EPCIS 2.0) |
| Odczyt w tekstyliach | Ręczny | 2–3 m (szew) | 2–3 m z opt. anteną |
| Odczyt na obudowie baterii | Ręczny | 0,5 m (bez on-metal) | 1,5–2 m (on-metal) |

## TCO i ROI w horyzoncie 5 lat

*Wszystkie kwoty w PLN zł.*

| Pozycja kosztowa | Scenariusz A: papier | Scenariusz B: RFID + Digital Link |
|---|---|---|
| Czytniki i bramy UHF | 50 000 zł | 450 000 zł |
| Middleware EPCIS i integracja | — | 280 000 zł |
| Instalacja i szkolenie | — | 150 000 zł |
| Etykiety RFID (2,50 zł/szt.) | — | 2,50 zł × 100 000 × 5 lat = 1 250 000 zł |
| Ręczna weryfikacja DPP | 600 000 zł/rok × 5 = 3 000 000 zł | 100 000 zł/rok × 5 = 500 000 zł |
| Straty z tytułu niezgodności | 300 000 zł/rok × 5 = 1 500 000 zł | 50 000 zł/rok × 5 = 250 000 zł |
| Utrzymanie systemu | 50 000 zł/rok × 5 = 250 000 zł | 120 000 zł/rok × 5 = 600 000 zł |
| **Całkowite TCO** | **4 800 000 zł** | **3 230 000 zł** |

Dodatkowy CAPEX dla scenariusza B wynosi 830 000 zł (880 000 zł vs 50 000 zł). Roczna oszczędność OPEX to 520 000 zł/rok. Okres zwrotu (Payback) = 830 000 zł / 520 000 zł/rok × 12 ≈ 19,2 miesiąca. W ciągu 5 lat oszczędność netto po odliczeniu dodatkowego CAPEX wynosi 1 570 000 zł, czyli 32,7% całkowitego TCO scenariusza A. Największe oszczędności pochodzą z redukcji ręcznej weryfikacji DPP i uniknięcia kar za niezgodność.

## Wnioski i perspektywy

Architektura DPP oparta na GS1 Digital Link to jedyne skalowalne rozwiązanie problemu pojemności pamięci RFID. Przechowywanie pełnych danych (8–10 kbit) w etykiecie jest technicznie niemożliwe, a próby kompresji prowadzą do utraty krytycznych informacji. Wskaźnik URL (~2 kbit) w pamięci EPC lub użytkownika, wskazujący na bazę EPCIS 2.0, zapewnia zgodność z ESPR bez rezygnacji z automatycznego odczytu. W nadchodzących latach obowiązkowe DPP obejmie kolejne kategorie produktów, a GS1 Digital Link stanie się standardem interoperacyjności w łańcuchach dostaw tekstyliów i baterii.

## FAQ

### Dlaczego pełne dane DPP nie mieszczą się w pamięci RFID?

ESPR wymaga 8–10 kbit danych (skład, recykling, ślad węglowy), a pasywna etykieta UHF ma 512–2048 bitów. Dlatego w pamięci przechowuje się tylko identyfikator (GS1 Digital Link, ~2 kbit), a reszta danych rezyduje w zewnętrznej bazie EPCIS 2.0.

### Jakie są ograniczenia odczytu RFID w tekstyliach?

Bawełna (ε' ≈ 1,5–2,0) i poliester (ε' ≈ 2,5) tłumią pole elektromagnetyczne. Gdy etykieta jest wszyta w szew, zasięg spada z 6–8 m do 2–3 m. Rozwiązaniem są etykiety z tekstylną płaszczyzną masową lub dipole zoptymalizowane pod tkaniny.

### Dlaczego baterie wymagają etykiet on-metal?

Metalowa obudowa baterii Li-ion działa jak reflektor, odstrajając antenę etykiety. Bez ferrytu (Curie > 250 °C) lub przekładki ceramicznej Al₂O₃ (1,5–4 mm) odczyt z odległości większej niż 0,5 m jest niemożliwy.

### Jaki jest okres zwrotu w przykładzie obliczeniowym?

Dodatkowy CAPEX wynosi 830 000 zł, a roczna oszczędność OPEX to 520 000 zł. Okres zwrotu wynosi około 19,2 miesiąca.

**Autor:** Yurii Kasian, Główny inżynier RFID · RFID Ukraine · Zaktualizowano: 15 listopada 2026
