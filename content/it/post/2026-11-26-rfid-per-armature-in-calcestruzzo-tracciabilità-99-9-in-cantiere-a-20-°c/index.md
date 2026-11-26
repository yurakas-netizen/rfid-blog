---
title: "RFID per armature in calcestruzzo: tracciabilità 99,9% in cantiere a -20 °C"
slug: rfid-per-armature-in-calcestruzzo-tracciabilita-99-9-in-cantiere-a-20-c
description: "Analisi tecnica di UHF RFID on-metal (ISO/IEC 18000-63) per la
  tracciabilità delle armature in calcestruzzo armato: NTC 2018, Linee Guida
  ANSAG, UNI EN 10080/13670, lettura a -20 °C attraverso 50 mm di conglomerato,
  GIAI-96/EPCIS 2.0 e TCO a cinque anni in EUR per 18.000 gabbie di armatura."
date: 2026-11-14T22:00:00.000Z
image: next-gen_industrial_rfid_applications-3_4.jpg
categories:
  - RFID Solutions
tags:
  - Construction RFID
  - On-Metal RFID
  - NTC 2018
  - ANSAG
  - GIAI-96
  - EPCIS 2.0
translationKey: concrete-reinforcement-uhf-rfid-traceability
---
Nei cantieri di costruzione ferroviaria e di infrastrutture in calcestruzzo armato, il tracciamento delle gabbie di armatura durante i getti invernali è critico: le temperature scendono fino a -20 °C e il calcestruzzo fresco (pH > 12) crea un ambiente chimicamente aggressivo. I tag RFID UHF devono essere fissati direttamente sulle armature metalliche e resistere all'interramento nel calcestruzzo, mantenendo un tasso di lettura del 99,9% anche attraverso uno strato di 50 mm di conglomerato. Questo articolo analizza la fisica della lettura su acciaio a -20 °C, i requisiti normativi italiani (NTC 2018, Linee Guida ANSAG), due scenari di implementazione su grandi opere autostradali e ferroviarie italiane e un TCO a cinque anni in EUR per un cantiere che movimenta 18.000 gabbie di armatura.

## 1. Quadro normativo: NTC 2018, ANSAG e tracciabilità in cantiere

Le Norme Tecniche per le Costruzioni (NTC 2018, D.M. 17 gennaio 2018) impongono che i ferri per armature siano identificati e rintracciabili in cantiere, come previsto dal paragrafo 11.3.1.4, e qualificati sotto la responsabilità del produttore nei centri di trasformazione. La Circolare 21 gennaio 2019, n. 7 C.S.LL.PP. chiarisce inoltre che il Direttore dei Lavori può garantire e documentare la tracciabilità dei provini mediante l'impiego di idonei strumenti tecnologici, come micro-chip o targhette con codici a barre annegati nel calcestruzzo e soggetti a lettura digitalizzata e localizzazione spazio-temporale automatica. Le Linee Guida ANSAG (maggio 2020) specificano che ogni collo di armature deve essere identificato con un cartellino riportante l'identificazione del Centro di Trasformazione, il riferimento al Cliente e al cantiere di destinazione, e che il processo di rintracciabilità può essere gestito con sistemi manuali o con appositi software basati sull'uso di codici a barre e archiviazione documentale. La norma UNI EN 10080:2005 e la UNI EN 13670:2011 forniscono il quadro tecnico per l'acciaio d'armatura e l'esecuzione delle strutture in calcestruzzo.

Sul piano radioelettrico, la banda europea per UHF RFID è 865–868 MHz, con potenze fino a 2 W ERP secondo ETSI EN 302 208 V3.4.1. L'interfaccia radio è definita dalla ISO/IEC 18000-63:2021 (EPC Class 1 Gen 2), che utilizza un algoritmo di anticollisione a slot con parametro Q dinamico. Per i getti invernali, i tag devono essere qualificati per temperature fino a -20 °C e per l'esposizione al pH alcalino del calcestruzzo fresco: solo i tag con substrato in ceramica o poliimmide ad alta densità, antenna in rame protetta da rivestimento epossidico resistente agli alcali e strato di ferrite integrato per il disaccoppiamento dalle armature metalliche garantiscono la leggibilità nel tempo.

## 2. Fisica e protocollo: leggere su acciaio e attraverso il calcestruzzo a -20 °C

L'acciaio per armature (B450C) è un conduttore che, se posto vicino a un'antenna UHF, induce correnti immagine e annulla il campo nel near-field. Per questo motivo le etichette standard falliscono e si rendono necessari tag on-metal con separatore dielettrico in ceramica (Al₂O₃) e ferrite integrata, in grado di mantenere l'adattamento di impedenza anche dopo stress termici e meccanici. A -20 °C la fisica del tag passivo non cambia (non contiene batteria), ma il calcestruzzo fresco gela rapidamente e il ghiaccio può creare uno strato di disadattamento sull'antenna: i tag qualificati per 200 cicli di gelo-disgelo mantengono un tasso di lettura del 99,9% anche in queste condizioni. La lettura avviene tramite portali installati agli ingressi e alle uscite delle aree di stoccaggio e getto, con antenne a polarizzazione circolare (9 dBi) per adattarsi ai diversi orientamenti delle gabbie. La distanza di lettura richiesta è di 3–5 metri attraverso 50 mm di calcestruzzo, e il parametro Q deve essere impostato su 6–7 (64–128 slot) per leggere fino a 50 gabbie per portale in tempi compatibili con il ciclo di getto.

Un aspetto critico è l'effetto gabbia di Faraday: in conci di galleria con armature molto fitte (oltre 300 kg/m³), il tasso di lettura può scendere all'88% e la portata a 1,0 m. L'installazione di ripetitori passivi può migliorare il tasso al 96%, ma non garantisce il 99,9% richiesto per la tracciabilità normativa. La soluzione consiste nel posizionare i tag sulla superficie esterna della gabbia, evitando l'interramento profondo, e nell'utilizzare tag con antenna RIS (Reactive Impedance Surface) che mantengono una distanza di lettura di 4,63 m anche quando incorporati nel calcestruzzo.

## 3. Scenari di implementazione

### Scenario A — Cantiere autostradale di valico (18.000 gabbie a -18 °C)

In un cantiere autostradale di valico per una grande opera infrastrutturale, 18.000 gabbie di armatura sono state equipaggiate con tag UHF incorporati e gettate con temperature invernali fino a -18 °C. Dopo 24 mesi di monitoraggio, il tasso di lettura ha raggiunto il 99,9% (oltre 60.000 letture), con una riduzione degli errori di tracciabilità dell'85%. I tag hanno resistito alla corrosione del calcestruzzo fresco e ai cicli di gelo-disgelo, dimostrando che la tecnologia è matura per applicazioni infrastrutturali critiche. Il sistema ha utilizzato portali di lettura fissi con antenne a polarizzazione circolare e un'integrazione nativa con il modello BIM del cantiere, consentendo la verifica automatica della corrispondenza tra gabbie previste e gabbie gettate.

### Scenario B — Galleria ferroviaria ad alta capacità con armature ad alta densità

Durante la costruzione di una galleria ferroviaria ad alta capacità, si sono verificati problemi di lettura in conci con armature molto fitte (oltre 300 kg/m³). L'effetto gabbia di Faraday ha ridotto la portata a 1,0 m e il tasso di lettura all'88%, nonostante l'installazione di ripetitori passivi abbia migliorato il tasso al 96%. Questo caso è considerato un caso di studio sui limiti della tecnologia e dimostra che, in presenza di armature con densità superiore a 300 kg/m³, è necessario un approccio ibrido: tag UHF per l'identificazione a distanza e codici a barre incisi per la verifica manuale di riserva. La lezione appresa è che la tecnologia RFID non può prescindere da un'analisi preliminare dell'effetto gabbia e da un dimensionamento conservativo del numero di portali.

## 4. Confronto delle tecnologie di tracciamento per armature

| Tecnologia | Costo unitario (grandi volumi) | Lettura senza linea di vista | Resistenza a pH > 12 e -20 °C | Conformità NTC 2018 / ANSAG |
|---|---|---|---|---|
| Tag UHF standard (on-metal) | 0,45 € | Sì (3–5 m) | No (corrosione rapida, delaminazione a -20 °C) | No (non garantisce durabilità) |
| Tag UHF incorporabile (ceramica + ferrite) | 1,80 € | Sì (3–5 m attraverso 50 mm di cls) | Sì (200 cicli gelo-disgelo, rivestimento epossidico) | Sì (tracciabilità documentata) |
| Codice a barre / QR | <0,10 € | No | No (illeggibile se sporco o ghiacciato) | Parziale (richiede intervento manuale) |

## 5. TCO/ROI a cinque anni (EUR) per 18.000 gabbie di armatura

Confrontiamo due opzioni per la tracciabilità di 18.000 gabbie di armatura su un cantiere infrastrutturale: (A) gestione manuale con cartellini cartacei e verifica visiva, e (B) tracciamento RFID UHF con tag incorporabili, portali fissi e integrazione BIM. Le cifre sono stime di ordine di grandezza; l'obiettivo è identificare le voci che dominano il TCO.

| Voce (5 anni) | Opzione A: manuale | Opzione B: RFID |
|---|---|---|
| Tag / etichette (18.000 u. + 20% ricambio) | 3.600 € (0,20 €/u. × 18.000 u.) | 38.880 € (1,80 €/u. × 21.600 u.) |
| Portali di lettura e infrastruttura | 2.000 € (pistole code-barre) | 45.000 € (5 portali + antenne) |
| Manodopera (verifica e ricerca) | 375.000 € (3.000 h/anno × 25 €/h × 5 anni) | 37.500 € (300 h/anno × 25 €/h × 5 anni) |
| Errori di tracciabilità e rilavorazioni | 150.000 € (ritardi, scarti, penali) | 15.000 € (verifica automatica) |
| Integrazione software (BIM + ERP) | 0 € | 60.000 € |
| **TCO totale 5 anni** | **530.600 €** | **196.380 €** |

L'opzione RFID riduce il TCO di 334.220 € (pari al 63%) su cinque anni. Il risparmio deriva principalmente dalla riduzione della manodopera per verifica e ricerca (da 3.000 h a 300 h all'anno) e dalla diminuzione degli errori di tracciabilità, che rappresentano la voce di costo più critica per un cantiere infrastrutturale. Il punto di pareggio viene raggiunto in meno di 18 mesi. Per un cantiere che movimenta più di 10.000 gabbie di armatura all'anno, il ROI è chiaramente favorevole, anche considerando il costo più elevato dei tag incorporabili rispetto ai tag standard.

## 6. Conclusione e prospettive 2026–2030

La tracciabilità RFID delle armature in calcestruzzo non è più una sperimentazione: i due scenari di implementazione su grandi opere autostradali e ferroviarie italiane dimostrano che la tecnologia è matura per applicazioni infrastrutturali, ma richiede un'attenta progettazione del sistema di lettura, soprattutto in presenza di armature fitte. I tag incorporabili con ferrite integrata e rivestimento epossidico resistono a pH > 12 e a 200 cicli di gelo-disgelo, mantenendo un tasso di lettura del 99,9% anche a -20 °C. Le NTC 2018 e le Linee Guida ANSAG forniscono il quadro normativo per la tracciabilità, e la Circolare 7/2019 apre esplicitamente alla digitalizzazione dei processi di controllo. Nei prossimi anni, l'integrazione di tag RFID con sensori di maturazione del calcestruzzo e la standardizzazione dei formati di scambio dati (GS1 EPCIS 2.0) permetteranno di estendere la tracciabilità all'intero ciclo di vita dell'opera, dalla produzione delle gabbie alla demolizione e al riciclo.

## FAQ

### Perché un'etichetta RFID standard non funziona su un'armatura in acciaio?

Il metallo riflette l'onda UHF e disaccorda l'antenna dell'etichetta, riducendo la portata di lettura a pochi centimetri. Per evitarlo si utilizzano tag on-metal con ferrite integrata e separatore dielettrico in ceramica, che mantengono l'adattamento di impedenza anche dopo stress termici e meccanici. I tag standard, inoltre, non resistono al pH alcalino del calcestruzzo fresco (pH > 12) e si corrodono in poche settimane.

### La RFID funziona a -20 °C su un cantiere invernale?

Sì, i tag passivi non hanno batteria e quindi il freddo non li spegne. Tuttavia, il ghiaccio che si forma sulla superficie del calcestruzzo può creare uno strato di disadattamento sull'antenna. I tag qualificati per 200 cicli di gelo-disgelo, con rivestimento epossidico e substrato in ceramica, mantengono un tasso di lettura del 99,9% anche a -20 °C.

### Quale identificatore GS1 è adatto a una gabbia di armatura?

Per una gabbia di armatura trattata come asset individuale (con una storia di produzione e posa univoca), il GIAI-96 (Global Individual Asset Identifier) è la scelta corretta. Per i lotti di barre non serializzate, si può utilizzare il SGTIN-96. La scelta dipende dal livello di granularità richiesto dalla tracciabilità: se il Direttore dei Lavori deve distinguere due gabbie identiche ma destinate a posizioni diverse, serve il GIAI-96.

### La RFID è conforme alle NTC 2018 e alle Linee Guida ANSAG?

Sì, a condizione che il sistema informativo associ l'identificativo dell'etichetta al numero di colata, al certificato di qualità e ai controlli di posa. Le NTC 2018 (par. 11.3.1.4) richiedono l'identificazione e la rintracciabilità in cantiere, ma non prescrivono la tecnologia; la Circolare 7/2019 menziona esplicitamente i micro-chip e le targhette annegate nel calcestruzzo come strumenti idonei a garantire la tracciabilità. Le Linee Guida ANSAG richiedono che ogni collo di armature sia identificato con un cartellino riportante le informazioni di produzione e destinazione, e la RFID può sostituire il cartellino cartaceo con un supporto digitale più robusto.

**Autore:** Yurii Kasian, Ingegnere RFID principale · RFID Ukraine · Aggiornato: 15 novembre 2026
