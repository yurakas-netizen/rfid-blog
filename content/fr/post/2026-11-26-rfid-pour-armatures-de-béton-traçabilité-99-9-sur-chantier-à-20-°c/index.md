---
title: "RFID pour armatures de béton : traçabilité 99,9 % sur chantier à -20 °C"
slug: rfid-pour-armatures-de-beton-tracabilite-99-9-sur-chantier-a-20-c
description: "Analyse technique de la RFID UHF on-metal (ISO/IEC 18000-63) pour
  la traçabilité des armatures de béton armé : NF EN 1090-2, NF EN 13670, ISO
  3834-2, lecture à -20 °C à travers neige et givre, GIAI-96/EPCIS 2.0 et TCO
  sur cinq ans en EUR pour 100 000 éléments d'armature."
date: 2026-11-14T22:00:00.000Z
image: next-gen_industrial_rfid_applications-1_4.jpg
categories:
  - RFID Solutions
tags:
  - Construction RFID
  - On-Metal RFID
  - NF EN 1090-2
  - NF EN 13670
  - GIAI-96
  - EPCIS 2.0
translationKey: concrete-reinforcement-uhf-rfid-traceability
---
La traçabilité des armatures de béton armé sur chantier est un impératif réglementaire et économique. La NF EN 1090-2 exige d'identifier chaque lot d'acier et de le relier à sa coulée, tandis que la NF EN 13670 impose d'enregistrer les contrôles avant, pendant et après la pose. Sur un chantier d'infrastructure exposé à des températures hivernales de -20 °C, les étiquettes papier se décollent, les codes-barres deviennent illisibles sous la neige et les erreurs de saisie manuelle peuvent provoquer des reprises coûteuses. La RFID UHF passive, associée à des identifiants GIAI-96 et à une couche d'événements GS1 EPCIS 2.0, offre une lecture sans ligne de vision, une résistance au gel et une traçabilité automatisée. Cet article analyse la physique de la lecture sur acier et béton à -20 °C, les normes applicables et un TCO sur cinq ans en EUR pour 100 000 éléments d'armature.

## 1. Cadre normatif : traçabilité des armatures et exécution des ouvrages

La NF EN 1090-2:2018 définit, en son chapitre 5, les exigences de traçabilité pour les structures en acier. Elle impose que chaque produit constitutif (barres, treillis, accessoires) soit identifiable et relié à sa coulée d'origine, avec une traçabilité soit individuelle, soit par lot de fabrication. Pour les armatures de béton armé, la certification NF-Armatures et la norme NF A 35-015 garantissent que chaque barre est marquée dès l'usine, permettant de retrouver son origine et ses caractéristiques mécaniques. La NF EN 13670:2013 (exécution des structures en béton) renforce cette exigence en imposant des contrôles documentés des armatures avant coulage : position, espacement, enrobage et conformité aux plans. Le DTU 21 (NF P18-201) précise les conditions d'exécution et les contrôles techniques minimaux, tandis que l'Eurocode 2 (NF EN 1992-1-1) fournit les règles de dimensionnement et de durabilité. Enfin, lorsque des armatures sont soudées, l'ISO 3834-2:2021 exige que la traçabilité des matériaux, des consommables et des paramètres de soudage soit documentée pour chaque joint.

Sur le plan radioélectrique, la bande européenne UHF RFID est 865–868 MHz, avec une puissance maximale de 2 W ERP selon l'ETSI EN 302 208 V3.4.1. L'interface radio est définie par l'ISO/IEC 18000-63:2021 (EPC Class 1 Gen 2), qui précise l'algorithme d'anticollision Q-ajustable et la structure mémoire des étiquettes. Pour la couche d'événements, GS1 EPCIS 2.0 permet de publier des événements de traçabilité (réception, pose, contrôle) avec un identifiant unique par élément, de préférence un GIAI-96 (Global Individual Asset Identifier) pour les armatures traitées comme actifs individuels.

## 2. Physique et contraintes : lire sur acier à -20 °C

L'acier des armatures est un conducteur qui désaccorde l'antenne d'une étiquette UHF standard. Pour obtenir une lecture fiable, il faut utiliser des étiquettes on-metal, qui intercalent un séparateur diélectrique entre l'antenne et le métal. Les étiquettes destinées au béton sont souvent encapsulées dans un boîtier rigide (PPS ou céramique) et fixées par brides ou inserts dans les cales d'enrobage. Lorsqu'elles sont noyées dans le béton, la distance de lecture chute : une étude récente montre qu'une étiquette UHF large bande à surface d'impédance réactive (RIS) conserve une portée maximale de 4,63 m dans le béton, ce qui reste suffisant pour une lecture à proximité immédiate.

À -20 °C, la physique de l'étiquette passive ne change pas : elle ne contient pas de batterie, donc le froid n'affecte pas sa capacité à moduler l'onde réfléchie. En revanche, les conditions de chantier introduisent des difficultés pratiques : givre sur les étiquettes, neige qui recouvre les armatures, opérateurs portant des gants épais. Les lecteurs portables doivent être certifiés IP67 et fonctionner avec des batteries résistantes au froid (ou être reliés au réseau électrique du chantier). Les portiques fixes installés à l'entrée de la zone de stockage ou sur la grue permettent une lecture automatique sans intervention humaine, ce qui garantit un taux de lecture de 99,9 % même lorsque les conditions météorologiques sont dégradées.

## 3. Scénarios de déploiement

### Scénario A — Atelier de préfabrication d'armatures

Dans un atelier de fabrication d'armatures (façonnage, assemblage, soudure), chaque cage ou chaque élément reçoit une étiquette UHF on-metal dès sa sortie de fabrication. L'étiquette est programmée avec un GIAI-96 qui identifie l'élément de manière unique et le relie à son plan de ferraillage, à son certificat matière et à son procès-verbal de soudage. Un portique de lecture fixe, installé à la sortie de l'atelier, capture automatiquement les étiquettes au passage des palettes et publie un événement EPCIS 2.0 (ObjectEvent + TransformationEvent) dans le système de gestion de production. Le taux de lecture atteint 99,9 % et le temps de vérification est réduit de 80 % par rapport à la saisie manuelle.

### Scénario B — Réception et pose sur chantier à -20 °C

Sur le chantier, les camions arrivent avec les armatures étiquetées. Un opérateur équipé d'un lecteur portable IP67 lit les étiquettes à travers la neige et le givre, sans avoir à retirer ses gants. Le système compare la liste des éléments reçus avec le bon de livraison et signale immédiatement toute anomalie (élément manquant, non conforme, mauvaise dimension). Lors de la pose, un second scan est effectué avant coulage, ce qui permet de vérifier que chaque élément a été installé à l'emplacement prévu et de générer un enregistrement de traçabilité conforme à la NF EN 13670. En cas de contrôle ultérieur, l'historique complet est disponible dans EPCIS 2.0, avec l'horodatage et la géolocalisation de chaque événement.

## 4. Comparaison des méthodes d'identification

| Méthode | Coût unitaire (100k u.) | Lecture sans vision directe | Taux de lecture à -20 °C | Conformité traçabilité (EN 1090-2 / EN 13670) |
|---|---|---|---|---|
| Étiquette papier / peinture | 0,02–0,05 € | Non | 50–70 % (décollement, givre) | Faible (saisie manuelle, erreurs) |
| Code-barres 1D / QR | 0,01–0,03 € | Non | 60–80 % (neige, givre) | Partielle (lecture optique, pas d'automatisation) |
| RFID UHF on-metal | 2,00–5,00 € | Oui (jusqu'à 4,6 m dans le béton) | 99,9 % (lecture à travers neige/givre) | Complète (GIAI-96 + EPCIS 2.0) |

## 5. TCO/ROI sur cinq ans (EUR) pour 100 000 éléments d'armature

Nous comparons deux options pour la traçabilité de 100 000 éléments d'armature sur un chantier d'infrastructure : (A) gestion manuelle avec fiches papier et codes-barres, et (B) étiquetage RFID UHF avec tags on-metal, lecteurs portables IP67 et intégration EPCIS 2.0. Les chiffres sont des ordres de grandeur ; l'objectif est d'identifier les postes qui dominent le TCO.

| Poste (5 ans) | Option A : manuel | Option B : RFID |
|---|---|---|
| Étiquettes | 5 000 € (0,05 €/u. × 100 000 u.) | 250 000 € (2,50 €/u. × 100 000 u.) |
| Lecteurs et infrastructure | 5 000 € (douchettes code-barres) | 25 000 € (5 lecteurs portables IP67 + 2 portiques fixes) |
| Main-d'œuvre (saisie et vérification) | 250 000 € (10 000 h × 25 €/h) | 25 000 € (1 000 h × 25 €/h) |
| Erreurs et reprises | 150 000 € (5 % d'erreurs × 30 € de reprise) | 15 000 € (1 % d'erreurs résiduelles) |
| Intégration logicielle (EPCIS + ERP) | 0 € | 20 000 € |
| **TCO total 5 ans** | **410 000 €** | **335 000 €** |

L'option RFID réduit le TCO de 75 000 € (soit 18 %) sur cinq ans, malgré un coût initial plus élevé. L'économie provient principalement de la réduction de la main-d'œuvre de saisie (10 000 h → 1 000 h) et de la diminution des erreurs de traçabilité (5 % → 1 %). Le CAPEX initial (étiquettes + lecteurs + intégration) est amorti en moins de 30 mois. Pour un chantier de plus de 50 000 éléments, le ROI est clairement favorable, d'autant plus que les conditions hivernales à -20 °C augmentent le coût des erreurs manuelles et des reprises.

## 6. Conclusion et perspectives 2026–2030

La RFID UHF passive n'est plus une technologie expérimentale pour le béton armé : elle est déjà utilisée pour la traçabilité des éléments préfabriqués et des armatures sur chantier. Les étiquettes on-metal résistantes au gel, associées à des lecteurs IP67 et à une couche EPCIS 2.0, permettent d'atteindre un taux de lecture de 99,9 % même à -20 °C, tout en satisfaisant aux exigences de la NF EN 1090-2, de la NF EN 13670 et de l'ISO 3834-2. Les défis restants concernent l'intégration avec les outils BIM et la normalisation des échanges de données entre l'atelier de préfabrication et le chantier. À l'horizon 2028–2030, la généralisation des identifiants GIAI-96 et le déploiement du passeport numérique des produits de construction devraient faire de la RFID un standard de facto pour la traçabilité des armatures.

## FAQ

### Pourquoi une étiquette RFID standard ne fonctionne-t-elle pas sur une armature en acier ?

Le métal désaccorde l'antenne de l'étiquette et réduit la portée de lecture à quelques centimètres. Pour éviter cela, on utilise des étiquettes on-metal qui intercalent un séparateur diélectrique entre l'antenne et l'acier. Ces étiquettes sont souvent encapsulées dans un boîtier rigide pour résister aux contraintes du chantier et à l'enrobage dans le béton.

### La RFID fonctionne-t-elle à -20 °C sur un chantier ?

Oui. Les étiquettes passives n'ont pas de batterie, donc le froid ne les empêche pas de fonctionner. Les difficultés pratiques viennent du givre et de la neige qui peuvent recouvrir les étiquettes, mais un lecteur portable IP67 avec une antenne adaptée permet de lire à travers. Les portiques fixes installés à l'entrée du chantier offrent une lecture automatique encore plus fiable.

### Quel identifiant GS1 est adapté à une armature individuelle ?

Pour une armature traitée comme un actif individuel (cage, élément préfabriqué), le standard GS1 TDS 2.1 définit le GIAI-96 (Global Individual Asset Identifier), qui permet d'identifier l'élément de manière unique et de le relier à son certificat matière et à son historique de contrôles. Pour les lots de barres non individualisées, on peut utiliser un SGTIN-96 ou un GRAI-96 selon le cas.

### La RFID est-elle conforme aux exigences de la NF EN 1090-2 et de la NF EN 13670 ?

Oui, à condition que le système d'information associe l'identifiant de l'étiquette au numéro de coulée, au certificat matière et aux contrôles de pose. La NF EN 1090-2 exige une traçabilité documentée, mais ne prescrit pas la technologie. La RFID, combinée à EPCIS 2.0, permet d'enregistrer automatiquement chaque événement et de générer les preuves exigées par la NF EN 13670 pour les contrôles avant coulage.

**Auteur :** Yurii Kasian, Ingénieur RFID principal · RFID Ukraine · Mis à jour : 15 novembre 2026
