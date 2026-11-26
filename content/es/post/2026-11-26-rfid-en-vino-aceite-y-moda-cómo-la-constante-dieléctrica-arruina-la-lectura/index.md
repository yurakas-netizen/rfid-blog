---
title: "RFID en vino, aceite y moda: cómo la constante dieléctrica arruina la lectura"
slug: rfid-en-vino-aceite-y-moda-como-la-constante-dielectrica-arruina-la-lectura
description: "Análisis técnico de UHF RFID en vino, aceite y textil: efecto de
  la permitividad dieléctrica, separadores de espuma, etiquetas on-metal con
  ferrita, polarización circular, ETSI EN 302 208, ISO/IEC 18000-63, GS1 EPCIS
  2.0 y TCO a cinco años en EUR para una bodega de 1.000 barricas."
date: 2026-11-14T22:00:00.000Z
image: next-gen_industrial_rfid_applications-4_2.jpg
categories:
  - RFID Solutions
tags:
  - Dielectric Constant
  - Liquid RFID
  - On-Metal RFID
  - Circular Polarization
  - EPCIS 2.0
  - Wine Traceability
translationKey: rfid-wine-oil-textile-dielectric-constant
---
La identificación por radiofrecuencia en el sector agroalimentario y textil español se enfrenta a un enemigo invisible: la física de los materiales. Una etiqueta UHF estándar pegada sobre una botella de vino o de aceite de oliva pierde prácticamente toda su capacidad de lectura porque el líquido, con una permitividad relativa (ε') cercana a 80, absorbe la energía de radiofrecuencia y desplaza la frecuencia de resonancia de la antena. En el textil, el problema es distinto pero igualmente crítico: las pilas de ropa generan un efecto condensador que desintoniza las etiquetas. Este artículo analiza las soluciones técnicas —separadores de espuma, etiquetas on-metal y polarización circular—, los estándares aplicables (ETSI EN 302 208, ISO/IEC 18000-63, GS1 EPCIS 2.0) y un TCO a cinco años en EUR para una bodega que necesita trazabilidad de 1.000 barricas.

## Física de los dieléctricos: por qué el vino, el aceite y el textil no son transparentes a la RF

La permitividad relativa (ε') mide la capacidad de un material para polarizarse bajo un campo eléctrico. El aire tiene ε' ≈ 1, el papel ≈ 2, el vidrio ≈ 5, pero el agua y los líquidos de base acuosa alcanzan ε' ≈ 80. El vino y el aceite de oliva, aunque con pérdidas dieléctricas diferentes, comparten una permitividad elevada que provoca dos efectos perjudiciales: absorción de energía (pérdida de alcance) y desplazamiento de la frecuencia de resonancia de la etiqueta (desadaptación de impedancia). En el textil, el problema no es la absorción —las fibras de algodón o poliéster tienen ε' baja—, sino el acoplamiento capacitivo entre etiquetas apiladas, que modifica la capacitancia parásita y desvía la frecuencia de sintonía.

La banda europea para UHF RFID es 865–868 MHz. La norma armonizada ETSI EN 302 208 V3.4.1 permite potencias de hasta 2 W ERP en la sub-banda 865,6–867,6 MHz, y en España el CNAF (Orden ETD/1449/2021) confirma estas condiciones. El protocolo de aire es ISO/IEC 18000-63:2021 (EPC Class 1 Gen 2), que define el algoritmo de anticolisión Q-ajustable y la estructura de memoria EPC. Para la trazabilidad de eventos, GS1 EPCIS 2.0 permite registrar cada lectura con marca de tiempo y ubicación, y GS1 Digital Link resuelve el identificador SGTIN-96 a una URL web con información del producto.

## Vino y aceite: separadores, posición en el cuello y etiquetas on-metal

La solución para botellas de vidrio con líquidos pasa por intercalar un separador de baja permitividad entre la etiqueta y el líquido. La espuma de polietileno (ε' ≈ 1,1) de 2–3 mm de grosor desacopla la antena del medio acuoso y permite alcanzar lecturas de 4–5 m con un lector de 2 W ERP. La posición óptima de la etiqueta no es el cuerpo de la botella, sino el cuello: la distancia física entre cuellos es mayor que entre cuerpos, lo que reduce el acoplamiento mutuo y mejora el rendimiento. Para el aceite de oliva, con menor absorción que el agua pero similar desadaptación de impedancia, el separador de espuma sigue siendo necesario; las pruebas experimentales muestran que la distancia de lectura en aceite puede ser de hasta 3,28 m frente a 1,14 m en agua, dependiendo del envase.

Para envases metálicos (latas de conservas, tapones corona), la solución es distinta: se requieren etiquetas on-metal con una lámina de ferrita (μ' ≈ 120) que concentra el campo magnético y evita el cortocircuito de la antena. En pruebas con latas de atún, este diseño alcanzó un 99,6 % de lectura a 1,5 m. En bodegas, la combinación de etiquetas con separador en el cuello de la botella y lectores de mano permite inventariar botellas individuales sin abrir cajas, algo impensable con código de barras.

## Textil: efecto condensador en pilas de ropa y polarización circular

Cuando varias prendas con etiqueta UHF se apilan, las antenas de las etiquetas quedan próximas entre sí y forman un condensador parásito. Este acoplamiento capacitivo desvía la frecuencia de resonancia y provoca lecturas intermitentes: solo se leen las primeras capas de la pila. La solución no es aumentar la potencia del lector (eso genera lecturas fantasma), sino cambiar la geometría: usar antenas con polarización circular (derecha o izquierda) y ganancia de 9 dBi, alinear las etiquetas a lo largo del pliegue de la prenda y mantener una separación mínima de 30 mm entre etiquetas adyacentes.

En el caso de prendas que se lavan industrialmente (lavandería hospitalaria, alquiler textil), las etiquetas deben cumplir con ISO/IEC 18000-63 y soportar más de 200 ciclos de lavado a 60–85 °C, con presión de hasta 60 bares y productos químicos como la sosa cáustica. Las etiquetas de tipo tejido (fabric tags) encapsuladas en silicona o PET son la opción habitual. La tasa de lectura en túneles de lavandería industrial supera el 99 % cuando se combinan etiquetas de calidad con antenas de polarización circular.

## Comparativa de soluciones por material

| Material / Producto | Causa física del fallo | Solución técnica | Alcance típico con 2 W ERP |
|---|---|---|---|
| Botella de vino (vidrio) | Alta permitividad (ε' ≈ 80), absorción y desadaptación | Separador de espuma 2–3 mm; etiqueta en el cuello | 4–5 m |
| Botella de aceite (vidrio/PET) | Permitividad elevada, pérdidas dieléctricas medias | Separador de espuma; lectura a través del cuello | 3–4 m |
| Lata metálica (conservas) | Cortocircuito de la antena por el metal | Etiqueta on-metal con ferrita | 1,5–2 m (99,6 % lectura) |
| Pila de ropa (textil) | Acoplamiento capacitivo entre etiquetas | Polarización circular, separación ≥30 mm, lectura por ambos lados | Hasta 35 prendas (lector de mano) |

## TCO/ROI a cinco años (EUR): bodega con 1.000 barricas

Se comparan dos opciones para una bodega que necesita trazabilidad de 1.000 barricas de vino: (A) inventario manual con libreta y código de barras en papel, y (B) RFID UHF con etiquetas on-metal para barricas y un lector de mano industrial. Las cifras son estimaciones de orden de magnitud; el objetivo es identificar las partidas que dominan el TCO.

| Partida (5 años) | Opción A: manual | Opción B: RFID UHF |
|---|---|---|
| Etiquetas (1.000 uds. × 5 años, con reposición) | 2.500 € (0,50 €/ud. × 1.000 × 5 años) | 15.000 € (3,00 €/ud. × 1.000 × 5 años) |
| Lectores e infraestructura | 500 € (escáner básico) | 4.000 € (lector de mano industrial) |
| Mano de obra (inventario anual) | 62.500 € (500 h/año × 25 €/h × 5 años) | 6.250 € (50 h/año × 25 €/h × 5 años) |
| Coste de errores (pérdidas, trazabilidad incompleta) | 15.000 € (reclasificaciones, mermas) | 2.000 € (detección temprana) |
| Integración software (EPCIS + ERP) | 0 € | 8.000 € |
| **TCO total 5 años** | **80.500 €** | **35.250 €** |

La opción RFID reduce el TCO en 45.250 € (un 56 %) a lo largo de cinco años. El ahorro proviene principalmente de la reducción de mano de obra en inventarios (de 500 h/año a 50 h/año) y de la disminución de errores de trazabilidad. El CAPEX inicial de RFID (etiquetas + lector + integración) se recupera en menos de 18 meses. Para bodegas con más de 500 barricas y requisitos de trazabilidad para exportación, el ROI es claramente favorable.

## Conclusión y perspectivas 2026–2030

La regla de oro para RFID en vino, aceite y moda es que la física manda: no se puede luchar contra la permitividad del líquido ni contra el acoplamiento capacitivo del textil, pero sí se puede diseñar alrededor de ellos. Separadores de espuma, etiquetas on-metal con ferrita, polarización circular y separación física entre etiquetas son las soluciones validadas. La combinación de estas técnicas con GS1 EPCIS 2.0 y GS1 Digital Link permite una trazabilidad completa desde la viña o la fábrica textil hasta el consumidor, y sienta las bases para el Pasaporte Digital de Producto (DPP) que el ESPR exigirá a partir de 2028. Las empresas que dominen la física de los materiales tendrán una ventaja competitiva difícil de replicar.

## FAQ

### ¿Se puede leer una botella de vino con RFID UHF sin abrir la caja?

Sí, si la etiqueta está colocada en el cuello de la botella con un separador de espuma de 2–3 mm y el lector tiene una antena de ganancia adecuada. La lectura a través de cartón es posible porque el cartón es transparente a la RF (ε' ≈ 2). La atenuación del vidrio y del líquido se mitiga con el separador, y el alcance típico es de 4–5 m con 2 W ERP.

### ¿Por qué el aceite de oliva da problemas si tiene menos agua que el vino?

El aceite tiene pérdidas dieléctricas bajas (absorbe menos energía que el agua), pero su permitividad sigue siendo elevada (ε' ≈ 3–5, dependiendo de la acidez) y acopla el campo eléctrico a la antena, desplazando la frecuencia de resonancia. El resultado es una desadaptación de impedancia similar a la del agua, aunque con menor absorción. Por eso se necesita separador de espuma, igual que en el vino.

### ¿Cuántas prendas se pueden leer en una pila con un lector de mano?

El récord documentado con antena circular y 30 dBm ERP es de 35 prendas, siempre que se abanique la pila o se lea por ambos lados. Para pilas más gruesas se requiere un túnel de lectura con múltiples antenas. La clave es la polarización circular y la separación de al menos 30 mm entre etiquetas.

### ¿Qué etiqueta RFID resiste mejor los lavados industriales?

Las etiquetas de tipo tejido (fabric tags) encapsuladas en silicona o PET, con chip Impinj M730 o Monza R6, cumplen con ISO/IEC 18000-63 y soportan más de 200 ciclos de lavado a 85 °C con sosa cáustica. Deben fijarse con adhesivo termosellable o coserse en un bolsillo de tela. Las etiquetas de papel estándar se destruyen en el primer lavado.

**Autor:** Yurii Kasian, Ingeniero Principal de RFID · RFID Ukraine · Actualizado: 15 de noviembre de 2026
