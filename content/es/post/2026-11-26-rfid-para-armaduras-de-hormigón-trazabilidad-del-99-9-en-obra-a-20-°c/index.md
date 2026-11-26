---
title: "RFID para armaduras de hormigón: trazabilidad del 99,9 % en obra a -20 °C"
slug: rfid-para-armaduras-de-hormigon-trazabilidad-del-99-9-en-obra-a-20-c
description: "Análisis técnico de UHF RFID on-metal (ISO/IEC 18000-63) para
  trazabilidad de armaduras de hormigón: EN 1090-2, ISO 3834-2, lectura embebida
  a 5–10 cm, GIAI-96/EPCIS 2.0 e integración BIM (IFC), con TCO a cinco años en
  EUR para 10.000 unidades."
date: 2026-11-14T22:00:00.000Z
image: industrial_rfid_ecosystem-5_3.jpg
categories:
  - RFID Solutions
tags:
  - Construction RFID
  - On-Metal RFID
  - EN 1090-2
  - ISO 3834-2
  - GIAI-96
  - EPCIS 2.0
translationKey: concrete-reinforcement-uhf-rfid-traceability
---
La trazabilidad de las armaduras de hormigón en obra es un requisito normativo, no una opción: la EN 1090-2 exige identificar cada lote de acero y vincularlo a su colada, y la ISO 3834-2 exige mantener la trazabilidad de las soldaduras. En una obra de infraestructura ferroviaria en el norte de España, con temperaturas invernales de -20 °C, la identificación manual mediante etiquetas de papel o pintura se degrada, y el error humano en la recepción de armaduras puede provocar rechazos y retrasos. Este artículo analiza la física de la lectura UHF RFID sobre acero embebido en hormigón, los requisitos normativos aplicables, dos escenarios de implementación y un TCO a cinco años en EUR para 10.000 unidades de armadura.

## Marco normativo: trazabilidad de armaduras y soldadura

La EN 1090-2:2024 establece en su capítulo 5.2 que los fabricantes de estructuras de acero deben mantener un sistema de identificación que permita rastrear cada producto constituyente hasta su colada de origen. En el caso de armaduras pasivas para hormigón, el Código Estructural español (RD 470/2021) exige que el suministrador facilite un certificado de trazabilidad firmado, declarando los fabricantes y las coladas de cada suministro, y que se realicen ensayos de contraste sobre una de cada cuatro coladas. La UNE-EN 13670:2011 refuerza esta exigencia al requerir que los materiales se identifiquen y registren antes, durante y después de la ejecución.

Cuando la armadura incluye elementos soldados, la ISO 3834-2:2021 exige que la identificación y la trazabilidad se mantengan a lo largo de todo el proceso de fabricación, vinculando cada unión soldada al número de colada del metal base, al lote de material de aporte, al soldador y al procedimiento de soldadura. En obra, esta trazabilidad se rompe con frecuencia porque las etiquetas de papel se desprenden o se vuelven ilegibles con la humedad y el hielo. La EN 1992-1-1:2023 (Eurocódigo 2) no impone un método de identificación concreto, pero sí exige que el hormigón y las armaduras cumplan las especificaciones de proyecto, lo que en la práctica obliga a disponer de un registro fiable de materiales.

## Física de la lectura UHF RFID sobre acero y hormigón

El acero es un conductor: al acercar una etiqueta UHF pasiva a una superficie metálica, el campo electromagnético induce corrientes parásitas que desintonizan la antena y reducen drásticamente la distancia de lectura. Para evitarlo, las etiquetas on-metal incorporan una capa dieléctrica (separador) entre la antena y el metal, o utilizan un diseño de antena con plano de masa integrado. Las etiquetas UHF para hormigón (ISO/IEC 18000-63) suelen emplear una carcasa de PPS o cerámica con un separador de 1,5–4 mm, y logran lecturas de 4–4,5 m cuando se embeben a 5 cm de profundidad, y de 2–3 m a 10 cm de profundidad.

La frecuencia de operación en Europa es 865–868 MHz, con un límite de 2 W ERP según ETSI EN 302 208 V3.4.1. A -20 °C, la velocidad de propagación de la onda no cambia de forma significativa, pero la rigidez del hormigón y la posible presencia de hielo en la superficie pueden alterar ligeramente la impedancia del medio. Las etiquetas industriales con certificación IP68 y rango de operación de -40 °C a +85 °C mantienen la legibilidad en estas condiciones. La tasa de lectura del 99,9 % en obra no proviene de una sola antena, sino de la combinación de una etiqueta robusta, una antena de lector con ganancia adecuada (8–12 dBi) y un algoritmo de anticolisión Q ajustado al número de etiquetas presentes (Q=4–6 para 10–50 etiquetas simultáneas).

## Escenarios de implementación

### Escenario A — Planta de prefabricados de hormigón

En una planta de dovelas para túnel, se colocan 10.000 etiquetas UHF on-metal sobre las jaulas de armadura antes del hormigonado. Cada etiqueta se programa con un GIAI-96 (Global Individual Asset Identifier) que identifica la dovela de forma única como activo de ingeniería, vinculándola a la colada de acero y a la fecha de fabricación. Un pórtico de lectura con dos antenas circulares (ganancia 9 dBi) captura automáticamente las etiquetas al paso del puente grúa, registrando la ubicación en el almacén y la salida a obra. Los eventos se publican en GS1 EPCIS 2.0, lo que permite al contratista consultar la trazabilidad sin necesidad de desarrollos propietarios. El sistema se integra con el modelo BIM mediante ISO 16739-1 (IFC), de modo que cada dovela queda vinculada a su geometría y a sus propiedades de material.

### Escenario B — Obra de infraestructura ferroviaria a -20 °C

En una obra de ferrocarril en el norte de España, durante los meses de invierno, las etiquetas de papel se desprenden o se cubren de hielo. Se sustituyen por etiquetas UHF atornilladas a las armaduras en el momento de la recepción. Un operario con lector de mano industrial (rango de -20 °C) recorre el acopio y lee cada etiqueta en menos de 2 segundos. La lectura se sincroniza con el albarán del suministrador, y si alguna etiqueta no se lee o el número de colada no coincide con el certificado, el lote se marca para inspección. Con esta verificación, la obra registra una trazabilidad del 99,9 % de las armaduras recibidas, frente al 85–90 % típico con etiquetas de papel.

## Comparativa de métodos de identificación de armaduras

| Método | Coste por unidad | Tiempo de lectura (100 uds.) | Tasa de lectura a -20 °C | Trazabilidad normativa (EN 1090-2) |
|---|---|---|---|---|
| Etiqueta de papel / pintura | 0,01–0,02 € | 60 min | 85–90 % (se degrada) | No (sin registro automático) |
| Código de barras 1D | 0,02–0,05 € | 30 min | 80–85 % (requiere visión) | Parcial (registro manual) |
| QR | 0,01–0,03 € | 30 min | 80–85 % (requiere visión) | Parcial (registro manual) |
| RAIN RFID (UHF) | 0,50–1,50 € | 2 min | 99,9 % | Sí (EPCIS 2.0 + IFC) |

## TCO/ROI a cinco años (EUR)

Se comparan dos opciones para 10.000 armaduras: (A) etiquetado manual con papel y verificación visual, y (B) RAIN RFID con lector de mano industrial e integración EPCIS. Los costes incluyen la reposición anual de etiquetas (20 % de pérdida en A, 5 % en B).

| Partida (5 años) | Opción A: papel | Opción B: RFID |
|---|---|---|
| Soportes (10.000 uds. × 5 años, con reposición) | 1.500 € (0,015 €/ud. × 10.000 × 10 ciclos) | 50.000 € (1,00 €/ud. × 10.000 × 5 ciclos) |
| Equipos de lectura | 0 € (verificación visual) | 6.000 € (2 lectores de mano industriales) |
| Mano de obra (verificación 10.000 uds./año) | 125.000 € (25 €/h × 1.000 h/año × 5 años) | 12.500 € (25 €/h × 100 h/año × 5 años) |
| Coste de errores y rechazos | 20.000 € (rechazos por trazabilidad incompleta) | 2.000 € (verificación automática) |
| Integración software (EPCIS + BIM) | 0 € | 12.000 € |
| **TCO total 5 años** | **146.500 €** | **82.500 €** |

La opción RFID reduce el TCO en 64.000 € (un 44 %) gracias a la disminución de la mano de obra y a la eliminación de rechazos por trazabilidad incompleta. El CAPEX inicial de RFID (etiquetas + lectores + integración) se recupera en menos de 18 meses si se tiene en cuenta el ahorro de mano de obra y la reducción de rechazos. Para obras con más de 5.000 unidades de armadura y requisitos estrictos de trazabilidad, el ROI es claramente favorable.

## Conclusión y perspectivas 2026–2030

La combinación de una etiqueta UHF on-metal robusta, un lector de mano industrial y una capa de eventos GS1 EPCIS 2.0 permite alcanzar una trazabilidad del 99,9 % de las armaduras incluso a -20 °C. Esto no solo cumple con la EN 1090-2 y la ISO 3834-2, sino que sienta la base para el gemelo digital de la estructura: cada armadura queda vinculada a su colada, a su soldadura y a su ubicación en el modelo BIM (ISO 16739-1). A partir de 2027, la entrada en vigor del pasaporte digital de producto para materiales de construcción y la creciente exigencia de trazabilidad en licitaciones públicas harán que el RFID deje de ser una ventaja competitiva y se convierta en un requisito de entrada.

## FAQ

### ¿Por qué no se puede usar una etiqueta RFID normal sobre una armadura de acero?

El acero es un conductor: al acercar una etiqueta UHF convencional, el metal desintoniza la antena y la distancia de lectura cae a pocos centímetros. Para evitarlo se utilizan etiquetas on-metal, que incorporan un separador dieléctrico entre la antena y el metal. Estas etiquetas, además, suelen tener carcasas de PPS o cerámica para soportar el enterramiento en hormigón y las bajas temperaturas.

### ¿Qué distancia de lectura se obtiene cuando la etiqueta está embebida en hormigón?

Depende de la profundidad y del tipo de hormigón. Para etiquetas UHF de alta gama embebidas a 5 cm, la distancia típica es de 4–4,5 m; a 10 cm, de 2–3 m. En cualquier caso, la lectura en obra se realiza con el lector a menos de 1 m de la superficie, por lo que estas distancias son más que suficientes para identificar cada armadura de forma individual.

### ¿Cómo se garantiza que la etiqueta sobreviva al vertido y vibrado del hormigón?

Las etiquetas para hormigón deben tener certificación IP68 y una carcasa rígida (PPS, cerámica o incluso hormigón prefabricado). Se fijan a la armadura con bridas metálicas o tornillos antes del montaje del encofrado. La norma ISO/IEC 18000-63 no impone un método de fijación, pero los fabricantes suelen especificar la resistencia al impacto y a la compresión. En obra, la verificación se realiza leyendo la etiqueta después del desencofrado: si se lee, la trazabilidad está garantizada.

### ¿Es compatible el RFID con los requisitos de la EN 1090-2 para trazabilidad de coladas?

Sí, siempre que el sistema de información asocie el identificador de la etiqueta (GIAI-96 para el activo individual) al número de colada y al certificado del suministrador. La EN 1090-2 exige la identificación y la trazabilidad, pero no prescribe la tecnología. El RFID, combinado con GS1 EPCIS 2.0, permite registrar automáticamente cada evento de recepción, almacenamiento y montaje, lo que facilita la auditoría y el cumplimiento normativo.

**Autor:** Yurii Kasian, Ingeniero Principal de RFID · RFID Ukraine · Actualizado: 15 de noviembre de 2026
