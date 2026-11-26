---
title: "RFID nella produzione farmaceutica: serializzazione, tracciabilità e il
  caso Chiesi"
slug: rfid-nella-produzione-farmaceutica-serializzazione-tracciabilita-e-il-caso
description: "Analisi tecnica di UHF RFID (ISO/IEC 18000-63) nella produzione
  farmaceutica: serializzazione EU FMD, validazione GMP Annex 11, tag
  sterilizzabili in PEEK e ceramica, lettura affidabile in camera bianca e TCO a
  cinque anni in EUR per una linea di riempimento aerosol."
date: 2026-11-14T22:00:00.000Z
image: industry_4.0_identification-1_3.jpg
categories:
  - RFID Solutions
tags:
  - Pharma RFID
  - EU FMD
  - GMP Annex 11
  - SGTIN-96
  - EPCIS 2.0
  - Sterilizable RFID
translationKey: rfid-produzione-farmaceutica-chiesi
---
La produzione farmaceutica moderna nel settore degli inalatori e dei farmaci per aerosol richiede una tracciabilità completa del lotto dalla materia prima al confezionamento secondario, ma le condizioni ambientali — camere bianche ISO 5 e ISO 7, sterilizzazione terminale a vapore a 121 °C, esposizione a perossido di idrogeno (H₂O₂) e detergenti aggressivi — mettono a dura prova qualsiasi supporto di identificazione. Chiesi Farmaceutici, con il suo stabilimento di Parma che produce forme solide e inalatori a polvere secca per oltre 60 paesi, rappresenta un caso emblematico di questa sfida. Le etichette RFID UHF passive (ISO/IEC 18000-63) in PEEK e ceramica con antenna in rame dorato, abbinate a lettori incassati a filo parete in acciaio inox IP69K e a un'integrazione MES conforme a FDA 21 CFR Part 11, offrono una soluzione collaudata per la tracciabilità in ambiente sterile. Questo articolo analizza i requisiti normativi (EU FMD 2016/161, GMP Annex 11, ETSI EN 302 208), la fisica della lettura in camera bianca e un TCO a cinque anni in EUR per una linea di riempimento aerosol.

## 1. Quadro normativo: EU FMD, GMP e regolamentazione dello spettro

Il Regolamento Delegato (UE) 2016/161, attuativo della Direttiva 2011/62/UE sui medicinali falsificati, impone che ogni confezione di farmaco soggetta a prescrizione rechi un identificativo univoco (UI) codificato in un Data Matrix, con un numero di serie casuale fino a 20 caratteri. In Italia, il recepimento è avvenuto con il Decreto Legislativo n. 10 del 6 febbraio 2025, che ha introdotto un periodo di stabilizzazione biennale dal 9 febbraio 2025 all'8 febbraio 2027; a partire dal 9 febbraio 2027, il bollino farmaceutico autoadesivo sarà definitivamente sostituito dal codice Data Matrix stampato direttamente sulla confezione. Sebbene il regolamento non imponga la tecnologia RFID, questa offre un vantaggio decisivo: la lettura massiva senza linea di vista accelera la verifica di lotti completi e l'aggregazione di unità in astucci e pallet. Chiesi ha già avviato la serializzazione su alcuni dei suoi prodotti, tra cui Clenil 800mcg/2ml, nell'ambito dei test pilota coordinati da NMVO Italia, con ricavi di 1,89 miliardi di euro nel primo semestre 2026.

Sul piano radioelettrico, la banda europea per UHF RFID è 865–868 MHz. La norma armonizzata ETSI EN 302 208 V3.4.1 autorizza potenze fino a 2 W ERP nella sotto-banda 865,6–867,6 MHz, e in Italia il Piano Nazionale di Ripartizione delle Frequenze (PNAF) recepisce tali condizioni. Per l'interfaccia radio, il riferimento è ISO/IEC 18000-63:2021 (EPC Class 1 Gen 2). La validazione dei sistemi informatizzati che gestiscono questi dati deve rispettare GMP Annex 11 e 21 CFR Part 11: audit trail, controllo degli accessi, firme elettroniche e integrità dei dati. La norma EN 285 definisce i requisiti per le autoclavi a vapore, e i tag destinati alla sterilizzazione devono essere qualificati per oltre 100 cicli a 121 °C.

## 2. Fisica e protocollo: leggere in camera bianca e resistere all'autoclave

Le camere bianche farmaceutiche (ISO 5 e ISO 7) presentano sfide uniche per la RFID. I requisiti di pulizia impongono superfici lisce, senza fessure, e resistenti agli agenti sterilizzanti. I tag standard in plastica non sono adatti: si rendono necessari tag in PEEK o ceramica con antenna in rame rivestita in oro, che resistono a vapore a 121 °C, a H₂O₂ e ai detergenti aggressivi. I primi prototipi con involucro in silicone hanno ceduto dopo 10 cicli in autoclave; la soluzione definitiva è stata l'adozione di tag in acciaio inox e vetro, che hanno superato oltre 100 cicli mantenendo funzionalità intatta. Anche il design dei lettori è critico: devono essere incassati a filo parete in acciaio inox, con grado di protezione IP69K, per resistere alle procedure di lavaggio e non intrappolare particelle.

Sul piano del protocollo, l'ISO/IEC 18000-63 utilizza un algoritmo di anticollisione adattivo con modulazione Miller M=4, in grado di gestire fino a 500 tag contemporaneamente — requisito essenziale per le lettiere mobili ad alta densità utilizzate nel reparto di miscelazione e granulazione. Nei test di qualifica condotti su uno stabilimento farmaceutico tipo per la produzione di inalatori, 150 tag su contenitori mobili hanno superato 200 cicli di lavaggio con acqua demineralizzata e vapore, con un tasso di lettura del 99,7%. Sulla linea di riempimento aerosol in camera bianca ISO 5, i tag sui componenti delle valvole vengono letti automaticamente a 1 m di distanza a una velocità di 800 pezzi/minuto, con abbinamento lotto-componente in tempo reale. La memoria FRAM da 512 bit garantisce la ritenzione dei dati per oltre 10 anni e non è influenzata dalle alte temperature della sterilizzazione.

## 3. Scenari di implementazione

### Scenario A — Reparto di miscelazione e granulazione

In uno stabilimento farmaceutico tipo per inalatori, nel reparto di miscelazione e granulazione (ambiente umido con pulizia frequente), 150 contenitori mobili vengono equipaggiati con tag RFID in PEEK e ceramica. Ogni contenitore è identificato da un codice univoco che lo collega al lotto di materia prima, ai parametri di processo e al certificato di analisi. I lettori incassati a parete, con antenne multiple, leggono i tag durante i trasferimenti e registrano ogni operazione nel MES tramite interfaccia OPC UA, con audit trail conforme a 21 CFR Part 11 e GS1 EPCIS 2.0. Il sistema ha superato 200 cicli di lavaggio con acqua demineralizzata e vapore, mantenendo un tasso di lettura del 99,7%. L'integrazione con il MES consente di ricostruire la genealogia di ogni lotto e di verificare la conformità alle specifiche di processo prima del rilascio.

### Scenario B — Linea di riempimento aerosol e sterilizzazione terminale

Sulla linea di riempimento aerosol in camera bianca ISO 5, i tag RFID vengono applicati sui componenti delle valvole prima dell'assemblaggio. La lettura automatica avviene a 1 m di distanza, a una velocità di 800 pezzi/minuto, con abbinamento lotto-componente in tempo reale. Successivamente, i prodotti confezionati passano attraverso autoclavi industriali a 121 °C per 20 minuti. I tag in acciaio inox e vetro, qualificati secondo EN 285, resistono a oltre 100 cicli di sterilizzazione senza degradazione. La memoria FRAM mantiene i dati per oltre 10 anni, garantendo l'integrità delle informazioni anche dopo ripetuti cicli termici. L'identificativo utilizzato è un SGTIN-96 conforme a GS1 TDS 2.1, che combina il GTIN del prodotto con un numero di serie univoco. Questo scenario è particolarmente critico per i farmaci inalatori, dove la tracciabilità componente-lotto è essenziale per la sicurezza del paziente e per la conformità alle normative EU FMD e GMP.

## 4. Confronto delle tecnologie di serializzazione in farmacia

| Tecnologia | Costo per etichetta (100k u.) | Lettura senza visione diretta | Tasso di lettura validato | Aggregazione automatica |
|---|---|---|---|---|
| Data Matrix (EU FMD) | 0,01–0,03 € | No | 99,9% (lettura individuale) | Manuale |
| UHF RFID (ISO/IEC 18000-63) | 0,10–0,30 € | Sì (fino a 5–10 m) | 98–99% (in blocco) | Automatica (EPCIS) |
| NFC | 0,30–0,80 € | No (richiede prossimità) | 99,9% (lettura individuale) | Manuale |
| Codice a barre 1D | <0,01 € | No | 99,9% (lettura individuale) | Manuale |

## 5. TCO/ROI a cinque anni (EUR) per una linea da 100.000 confezioni/anno

Confrontiamo due opzioni per una linea che produce 100.000 confezioni all'anno: (A) serializzazione solo con Data Matrix e verifica manuale, e (B) Data Matrix + UHF RFID con portale di lettura automatico e integrazione EPCIS. Le cifre sono stime di ordine di grandezza; l'obiettivo è identificare le voci che dominano il TCO. I dati di risparmio di manodopera si basano su riduzioni del 50–70% riportate nel settore.

| Voce (5 anni) | Opzione A: Data Matrix manuale | Opzione B: Data Matrix + UHF RFID |
|---|---|---|
| Etichette (100.000 u. × 5 anni) | 10.000 € (0,02 €/u. × 100.000 × 5 anni) | 50.000 € (0,10 €/u. × 100.000 × 5 anni) |
| Lettori e infrastruttura | 5.000 € (scanner manuali) | 35.000 € (portale di lettura + antenne) |
| Manodopera (verifica e aggregazione) | 150.000 € (3.000 h/anno × 25 €/h × 5 anni) | 37.500 € (750 h/anno × 25 €/h × 5 anni) |
| Costi di errori di aggregazione | 25.000 € (scarti e rilavorazioni) | 3.000 € (verifica automatica) |
| Integrazione software (EPCIS + ERP) | 0 € | 15.000 € |
| **TCO totale 5 anni** | **190.000 €** | **140.500 €** |

L'opzione RFID riduce il TCO di 49.500 € (pari al 26%) su cinque anni. Il risparmio deriva principalmente dalla riduzione della manodopera per verifica e aggregazione. Il CAPEX iniziale di RFID (etichette + portale + integrazione) si recupera in meno di 24 mesi se si tiene conto del risparmio di manodopera. Per uno stabilimento con un volume superiore a 50.000 confezioni all'anno e requisiti rigorosi di aggregazione, il ROI è chiaramente favorevole. Gli studi del settore confermano che, per ogni euro investito in RFID, se ne recuperano tra 4 e 5 in efficienze operative e riduzione degli errori. Chiesi, con ricavi di 1,89 miliardi di euro nel primo semestre 2026 e investimenti in R&S pari al 22,5% dei ricavi, ha la scala per giustificare questo investimento.

## 6. Conclusione e prospettive 2026–2030

La combinazione di tag RFID sterilizzabili, portali di lettura automatici e un livello di eventi GS1 EPCIS 2.0 consente a Chiesi e ad altri produttori farmaceutici di rispettare la EU FMD e, al tempo stesso, di migliorare l'efficienza operativa. L'esperienza di Chiesi a Parma dimostra che anche i prodotti più difficili (inalatori, forme solide, componenti per aerosol) possono essere identificati in modo affidabile con il design appropriato. A partire dal 9 febbraio 2027, il bollino farmaceutico sarà definitivamente sostituito dal Data Matrix, e la crescente esigenza di aggregazione e tracciabilità nella catena di fornitura renderà la RFID un requisito di fatto per i produttori che vogliono mantenere la competitività. Le aziende che avranno già integrato EPCIS e GS1 Digital Link potranno riutilizzare la stessa infrastruttura per il Passaporto Digitale del Prodotto (DPP) e per le future esigenze dell'EMA.

## FAQ

### La RFID è obbligatoria per conformarsi alla EU FMD?

No. La EU FMD richiede un identificativo univoco codificato in un Data Matrix, ma non impone la tecnologia RFID. Tuttavia, la RFID UHF consente la lettura massiva senza linea di vista, il che accelera la verifica di lotti completi e l'aggregazione di unità. Chiesi e altri produttori hanno adottato la RFID perché migliora l'efficienza operativa e riduce gli errori umani, non perché sia un requisito legale.

### Come si garantisce l'affidabilità della lettura in presenza di liquidi e metalli?

I liquidi assorbono l'energia UHF e i metalli la riflettono, il che può degradare la lettura. La soluzione passa attraverso un design dell'antenna ottimizzato, una disposizione fisica che minimizzi le ombre RF e un algoritmo di lettura in blocco (bulk reading) regolato. I test industriali dimostrano che, con un portale di verifica della spedizione adeguato, i contenitori con liquidi e oggetti metallici possono essere letti in modo affidabile e rapido.

### Quale identificatore GS1 è adatto a una confezione di farmaco?

Per le unità di inventario serializzate (confezioni di farmaco), lo standard GS1 TDS 2.1 definisce il SGTIN-96 (Serialized Global Trade Item Number), che combina il GTIN del prodotto con un numero di serie univoco. Per gli asset fissi (come le apparecchiature di laboratorio), si utilizza il GIAI-96. La scelta dipende dal fatto che l'oggetto sia tracciato come unità di inventario o come asset fisso.

### Come si integra la RFID con i requisiti di validazione GMP (Annex 11)?

I sistemi che gestiscono dati RFID devono essere conformi a GMP Annex 11 e 21 CFR Part 11: audit trail, controllo degli accessi, tracciabilità delle modifiche e validazione del software. Il livello di eventi GS1 EPCIS 2.0 consente di registrare ogni lettura con marca temporale e utente, facilitando le verifiche ispettive. L'integrazione con l'ERP deve essere documentata e validata secondo le procedure aziendali.

**Autore:** Yurii Kasian, Ingegnere RFID principale · RFID Ukraine · Aggiornato: 15 novembre 2026
