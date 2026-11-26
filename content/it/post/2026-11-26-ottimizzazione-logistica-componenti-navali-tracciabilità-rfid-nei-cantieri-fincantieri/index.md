---
title: "Ottimizzazione logistica componenti navali: tracciabilità RFID nei
  cantieri Fincantieri"
slug: ottimizzazione-logistica-componenti-navali-tracciabilita-rfid-nei-cantieri
description: "Analisi tecnica di UHF RFID on-metal e RTLS per la tracciabilità
  dei blocchi di scafo e dei componenti di allestimento nei cantieri navali
  distribuiti: EN 1090-2, DNV-CG-0339, Regolamento UE 2018/608, ISO 20816-3,
  architettura RFID+RTLS su chiatta e TCO a cinque anni in EUR per 5.000
  componenti critici."
date: 2026-11-14T22:00:00.000Z
image: матриця_екстремальної_індустрії-1_2.jpg
categories:
  - RFID Solutions
tags:
  - Shipbuilding RFID
  - On-Metal RFID
  - DNV-CG-0339
  - EN 1090
  - RTLS BLE/UWB
  - EPCIS 2.0
translationKey: shipbuilding-rfid-logistics-traceability
---
La costruzione navale distribuita di Fincantieri, con blocchi di scafo pre-fabbricati del peso di 300–800 tonnellate trasportati via chiatta tra siti come Monfalcone, Marghera e Castellammare di Stabia, richiede un tracciamento ininterrotto e a prova di errore. Un errore di allineamento o un lotto non identificato in bacino di carenaggio può generare ritardi con costi superiori a 50.000 €/ora. La tecnologia RFID UHF passiva, abbinata a RTLS (Real-Time Locating Systems) e a un gemello digitale O&M, offre una visibilità end-to-end dalla fabbricazione al trasporto fluviale/marittimo, fino all'assemblaggio finale e al ciclo di vita operativo della nave. Questo articolo analizza l'architettura tecnica, le norme applicabili (EN 1090, DNV-CG-0339, Regolamento UE 2018/608), due scenari di implementazione e un TCO a cinque anni in EUR per un cantiere che movimenta 30 trasporti via chiatta e 5.000 trasferimenti stradali all'anno.

## 1. Quadro normativo: EN 1090, DNV e Regolamento UE 2018/608

La tracciabilità dei componenti navali è regolata da un intreccio di norme europee e standard di classificazione. La EN 1090-2:2024, richiamata per le strutture in acciaio fino alla classe di esecuzione EXC 3, impone che ogni componente sia identificato con un codice univoco correlato al lotto di materia prima, alle operazioni di saldatura e ai certificati di qualità. Per le parti critiche destinate alla navigazione, il Regolamento di Esecuzione (UE) 2018/608 stabilisce che le etichette elettroniche per le apparecchiature marine devono operare nella banda 860–960 MHz secondo ISO/IEC 18000-6C, essere fissate in modo permanente e rimanere leggibili per l'intera vita utile del componente. A questi si aggiungono le specifiche delle società di classificazione: la DNV-CG-0339 definisce i profili di qualifica ambientale (nebbia salina IEC 60068-2-52, cicli termici da -40 °C a +70 °C, vibrazioni), mentre la ISO 20816-3:2022 fornisce i livelli di valutazione delle vibrazioni per le macchine di bordo. Infine, la IATF 16949 e la VDA 5500, pur essendo standard automobilistici, vengono sempre più spesso richiamati come riferimento per la gestione della qualità nella supply chain quando i componenti sono condivisi tra i due settori.

Sul piano della logistica, Fincantieri ha avviato un percorso di digitalizzazione che include un "Smart Warehouse Management System" per eliminare la carta e abilitare la tracciabilità in tempo reale di tutti i movimenti, oltre a un sistema di "Smart Positioning" per localizzare ogni materiale in ambienti complessi. La sfida è integrare questi sistemi con il gemello digitale del cantiere e con i MES/PLM dei diversi siti produttivi, mantenendo la continuità informativa anche durante il trasporto via chiatta.

## 2. Fisica e protocollo: UHF RFID su acciaio EH36 e ambienti multipath

L'acciaio ad alta resistenza utilizzato negli scafi (EH36/EH40, conducibilità σ ≈ 6×10⁶ S/m) è un conduttore quasi perfetto che, se posto vicino a un'antenna UHF, induce correnti immagine e annulla il campo nel near-field. Per questo motivo le etichette standard falliscono e si rendono necessari tag on-metal con separatore dielettrico in ceramica di allumina (Al₂O₃ 96%, CTE ≈ 7×10⁻⁶/K) o compositi PTFE, in grado di mantenere l'adattamento di impedenza (VSWR < 2,0) anche dopo stress termici e meccanici. La norma EN 1090-2 richiede che l'identificazione avvenga tramite marcatura, incisione laser o tag RFID, purché il codice univoco sia correlato a tutti i documenti di qualità; nel caso del trasporto via chiatta, la lettura avviene tramite array di antenne montate sulle gru di assemblaggio, con portate di 8–12 m a 2 W ERP, e il sistema confronta la matrice EPC letta con il modello CAD/BIM della sezione di scafo per verificare l'allineamento millimetrico prima della saldatura.

Oltre alla lettura in bacino, la tracciabilità continua durante il trasporto via chiatta richiede l'integrazione di beacon RTLS attivi (BLE/UWB ibrido) con sensori di inclinazione e urto, i cui dati vengono trasmessi via rete privata 5G/LTE-M al centro di controllo logistico. In questo modo, ogni blocco di scafo mantiene un record di stato (fabbricazione → controllo qualità → trasporto → ricezione in secca → assemblaggio) che alimenta il gemello digitale della nave per l'intero ciclo di vita operativo di 30 anni.

## 3. Scenari di implementazione

### Scenario A — Tracciamento dei blocchi di scafo via chiatta e in secca

Nel cantiere di Monfalcone, i blocchi di scafo pre-fabbricati (300–800 t) vengono equipaggiati con tag UHF on-metal nei punti di sollevamento e con beacon RTLS attivi per la localizzazione durante il trasporto via chiatta. All'arrivo in bacino, un array di antenne montate sulla gru legge i tag e confronta la matrice EPC con il modello CAD/BIM, verificando la sequenza di posa e l'allineamento dei punti di saldatura. Eventuali discrepanze generano un alert automatico al supervisore. L'integrazione con il PLM centrale (AVEVA Marine o Siemens Teamcenter) consente di aggiornare lo stato del blocco in tempo reale e di collegare ogni scansione ai documenti di qualità richiesti dalla EN 1090-2. Fincantieri ha già implementato un sistema di Smart Positioning per la localizzazione precisa dei materiali in ambienti complessi, che funge da base per questo scenario.

### Scenario B — Logistica inbound e tracciabilità dei componenti di allestimento

Fincantieri movimenta ogni anno tra i 20 e i 30 trasporti via rimorchiatore e chiatta (costo 10–15 milioni di euro), 4.000–5.000 trasferimenti stradali di parti in acciaio (4–5 milioni di euro) e 1.300–1.600 spedizioni di materiali per progetti infrastrutturali. Per gestire questa complessità, i componenti di allestimento (motori, fumaioli, impianti) vengono etichettati con tag UHF passivi o codici Data Matrix secondo il Regolamento UE 2018/608, e letti tramite portali fissi alle baie di carico o lettori portatili industriali. La verifica di corrispondenza con la distinta base e la sequenza di assemblaggio avviene in tempo reale, riducendo gli errori di fornitura e i ritardi. L'architettura RFID funge da livello di visibilità end-to-end, collegando i MES dei singoli cantieri al PLM centrale e aggiornando lo stato di ogni componente (ordinato → ricevuto → in lavorazione → installato).

## 4. Confronto delle tecnologie di tracciamento in cantiere navale

| Tecnologia | Costo unitario (5.000 u.) | Lettura senza linea di vista | Durabilità in ambiente marino | Conformità EN 1090 / DNV |
|---|---|---|---|---|
| Tag UHF on-metal (acciaio 316L) | 25–60 € | Sì (8–12 m) | Alta (IP68/IP69K, -40 °C a +150 °C) | Sì (DNV-CG-0339, EN 1090 EXC3) |
| Beacon RTLS attivo (BLE/UWB) | 80–200 € | Sì (coordinate in tempo reale) | Media (batteria, scocca) | Complementare (non sostituisce il tag) |
| Codice Data Matrix (inciso) | <0,10 € | No | Alta (se inciso in modo permanente) | Sì (Reg. UE 2018/608) |

## 5. TCO/ROI a cinque anni (EUR) per un cantiere con 5.000 componenti

Confrontiamo due opzioni per la gestione logistica di 5.000 componenti critici in un cantiere Fincantieri: (A) gestione manuale con schede cartacee e codici a barre, e (B) tracciamento RFID UHF con tag on-metal, portali fissi e integrazione PLM/MES. Le cifre sono stime di ordine di grandezza; l'obiettivo è identificare le voci che dominano il TCO.

| Voce (5 anni) | Opzione A: manuale | Opzione B: RFID |
|---|---|---|
| Tag / etichette (5.000 u. + 20% ricambio) | 5.000 € (1,00 €/u. × 5.000 u.) | 180.000 € (30,00 €/u. × 6.000 u.) |
| Lettori / infrastruttura | 2.000 € (pistole code-barre) | 45.000 € (5 lettori industriali + 3 portali) |
| Manodopera (verifica e ricerca) | 375.000 € (3.000 h/anno × 25 €/h × 5 anni) | 37.500 € (300 h/anno × 25 €/h × 5 anni) |
| Errori e rilavorazioni (ritardi, scarti) | 150.000 € (ritardi in secca, penali) | 15.000 € (alert automatici) |
| Integrazione software (PLM + MES + gemello digitale) | 0 € | 60.000 € |
| **TCO totale 5 anni** | **532.000 €** | **337.500 €** |

L'opzione RFID riduce il TCO di 194.500 € (pari al 37%) su cinque anni. Il risparmio deriva principalmente dalla riduzione della manodopera per verifica e ricerca (da 3.000 h a 300 h all'anno) e dalla diminuzione dei ritardi in secca, che rappresentano la voce di costo più critica per un cantiere navale. Il punto di pareggio viene raggiunto in meno di 24 mesi. Per un cantiere che movimenta più di 2.000 componenti critici all'anno, il ROI è chiaramente favorevole, anche considerando il costo elevato dei tag on-metal qualificati per ambienti marini.

## 6. Conclusione e prospettive 2026–2030

La tracciabilità RFID dei componenti navali non è più un'opzione: è un requisito di qualità e di conformità normativa. I tag UHF on-metal qualificati secondo la DNV-CG-0339 e la EN 1090-2, abbinati a RTLS per la logistica via chiatta e a un gemello digitale del cantiere, consentono di seguire ogni blocco di scafo e ogni componente di allestimento dalla fabbricazione all'assemblaggio finale, riducendo ritardi e costi di rilavorazione. Fincantieri ha già avviato questo percorso con lo Smart Warehouse Management System e il gemello digitale dei cantieri, e con un portafoglio ordini record di 44,7 miliardi di euro al 30 settembre 2026, la pressione per una supply chain più efficiente è destinata a crescere. Nei prossimi anni, l'integrazione di sensori passivi (temperatura, umidità) e la standardizzazione dei formati di scambio dati (GS1 EPCIS 2.0) permetteranno di estendere la tracciabilità all'intero ciclo di vita della nave, fino alla demolizione e al riciclo.

## FAQ

### Perché un'etichetta RFID standard non sopravvive in un cantiere navale?

Un'etichetta standard è progettata per un uso interno o un'esposizione moderata. In cantiere navale, subisce nebbia salina (5% NaCl), cicli termici da -40 °C a +120 °C durante saldatura e verniciatura, urti meccanici (IK10) e vibrazioni. Solo i tag con custodia in acciaio inox 316L saldato al laser o PEEK con rivestimento fluoropolimero, qualificati secondo DNV-CG-0339, resistono a queste condizioni.

### Come si garantisce l'allineamento dei blocchi di scafo in secca?

Ogni blocco viene equipaggiato con tag UHF on-metal nei punti di riferimento strutturali. All'arrivo in bacino, un array di antenne montate sulle gru legge i tag e confronta la matrice EPC con il modello CAD/BIM della sezione di scafo. Il sistema verifica la corretta sequenza di posa e l'allineamento millimetrico dei punti di saldatura; qualsiasi discrepanza genera un alert automatico al supervisore.

### Quali normative regolano l'identificazione dei componenti navali?

La EN 1090-2:2024 per le strutture in acciaio (classi EXC 1–4), il Regolamento di Esecuzione (UE) 2018/608 per le etichette elettroniche delle apparecchiature marine (RFID 860–960 MHz, ISO/IEC 18000-6C), la DNV-CG-0339 per la qualifica ambientale e la ISO 20816-3:2022 per le vibrazioni delle macchine. Per la supply chain, si aggiungono la IATF 16949 e la VDA 5500 quando i componenti sono condivisi con il settore automobilistico.

### La RFID può tracciare i componenti anche durante il trasporto via chiatta?

Sì, combinando tag UHF on-metal per l'identificazione con beacon RTLS attivi (BLE/UWB) per la localizzazione. I beacon forniscono coordinate GPS-corrette e stato di integrità strutturale (sensori di inclinazione/urto), trasmessi via rete privata 5G/LTE-M al centro di controllo logistico. In questo modo, ogni blocco di scafo mantiene un record di stato continuo durante tutto il tragitto.

**Autore:** Yurii Kasian, Ingegnere RFID principale · RFID Ukraine · Aggiornato: 15 novembre 2026
