---
title: "RFID en producción farmacéutica: serialización, trazabilidad y el caso Merck"
slug: rfid-en-produccion-farmaceutica-serializacion-trazabilidad-y-el-caso-merck
description: "Análisis técnico de UHF RFID (ISO/IEC 18000-63) en producción
  farmacéutica: serialización EU FMD, validación GMP Annex 11, lectura fiable de
  líquidos y metales, y TCO a cinco años en EUR para una línea de envasado
  primario."
date: 2026-11-14T22:00:00.000Z
image: next-gen_industrial_rfid_applications-3_3.jpg
categories:
  - RFID Solutions
tags:
  - Pharma RFID
  - EU FMD
  - GMP Annex 11
  - SGTIN-96
  - EPCIS 2.0
  - Liquid Metal Reading
translationKey: pharma-uhf-rfid-serialization-merck-traceability
---
La producción farmacéutica moderna exige algo más que cumplir con la serialización: requiere demostrar que cada unidad es auténtica, que ha sido fabricada bajo condiciones controladas y que su historial es verificable en tiempo real. Merck KGaA, a través de su división Life Science, ha sido pionera en combinar etiquetas RFID UHF (ISO/IEC 18000-63) con identificadores GS1 y plataformas de gemelos digitales para garantizar la autenticidad de productos farmacéuticos y reactivos de laboratorio. Este artículo analiza los requisitos normativos (EU FMD, GMP, ETSI EN 302 208), la física de la lectura UHF en entornos con líquidos y metales, dos escenarios de implementación en plantas españolas y un TCO a cinco años en EUR para una línea de envasado primario.

## Marco normativo: EU FMD, GMP y regulación de espectro

El Reglamento Delegado (UE) 2016/161, que desarrolla la Directiva 2011/62/UE, establece que cada envase de medicamento sujeto a prescripción debe llevar un identificador único (UI) codificado en un DataMatrix, con un número de serie aleatorio de hasta 20 caracteres. Este identificador permite la verificación en el punto de dispensación a través del sistema EMVS (European Medicines Verification System). Aunque el reglamento no exige RFID, la tecnología UHF ofrece una ventaja clave: permite la lectura masiva sin línea de visión, lo que acelera la verificación de lotes completos y la agregación de unidades en cajas y palés. Merck KGaA ha integrado RFID en sus procesos de verificación de envíos, demostrando que contenedores con líquidos y objetos metálicos pueden leerse de forma fiable mediante estaciones de verificación UHF.

En el plano radioeléctrico, la banda europea para UHF RFID es 865–868 MHz. La norma armonizada ETSI EN 302 208 V3.4.1 permite potencias de hasta 2 W ERP en la sub-banda 865,6–867,6 MHz, y en España el CNAF (Orden ETD/1449/2021) confirma estas condiciones: los dispositivos RFID operan sin derechos exclusivos y con la obligación de no interferir. Para el enlace de aire pasivo, la referencia técnica es ISO/IEC 18000-63:2021. La validación de los sistemas informatizados que gestionan estos datos debe cumplir con GMP Annex 11 y 21 CFR Part 11, lo que exige auditoría de eventos, control de acceso y trazabilidad de cambios.

## Física y protocolo: leer líquidos y metales sin línea de visión

Los entornos farmacéuticos presentan un desafío particular para la identificación por radiofrecuencia: los líquidos absorben la energía UHF y los metales (blísteres, tapones, equipos) reflejan la señal. En las pruebas realizadas por Merck en Darmstadt con puertas RFID UHF convencionales, no todas las sustancias podían leerse con la rapidez y fiabilidad suficientes. La solución pasó por una estación de verificación de envíos (Shipment Verification Station) que combina un diseño de antena optimizado con un algoritmo de lectura en bloque (bulk reading) y una disposición física que minimiza las sombras de RF. Con este enfoque, Merck y Turck Vilant Systems demostraron que contenedores con líquidos y objetos metálicos podían identificarse de forma fiable y rápida.

El protocolo ISO/IEC 18000-63 utiliza un algoritmo de anticolisión basado en ranuras (Q-ajustable) que permite inventariar decenas de etiquetas simultáneamente. Para una línea de envasado primario con alta densidad de producto (por ejemplo, blísteres en cajas), el valor de Q debe ajustarse a 4–6 (16–64 ranuras) para maximizar la velocidad de lectura sin colisiones. La tasa de lectura en entornos farmacéuticos validados suele alcanzar el 98–99 %, lo que permite sustituir la verificación manual por un proceso automatizado que reduce el tiempo de agregación de lotes en un 50–70 %.

## Escenarios de implementación

### Escenario A — Línea de envasado primario con serialización y agregación

En una planta de producción de medicamentos sólidos orales, cada blíster lleva un DataMatrix con el identificador único (GTIN + número de serie) exigido por la EU FMD. Además, se añade una etiqueta UHF pasiva (ISO/IEC 18000-63) en la caja de cartón que contiene el blíster. Un pórtico de lectura fijo, situado al final de la línea de estuchado, captura automáticamente las etiquetas de todas las cajas que pasan por la cinta transportadora. Los eventos de agregación (caja → estuche → palé) se registran en GS1 EPCIS 2.0, lo que permite reconstruir la genealogía completa del lote y cumple con los requisitos de agregación de la EU FMD, aunque esta no los exija legalmente como obligatorios. El identificador UHF se codifica con un SGTIN-96, que combina el GTIN con un número de serie único para cada unidad.

### Escenario B — Verificación de envíos y logística inversa en almacén

En el almacén de producto terminado, una estación de verificación de envíos (Shipment Verification Station) lee de forma masiva todas las etiquetas UHF de un palé antes de su expedición. El sistema compara la lectura con la orden de envío y genera una alerta si falta alguna caja o si el número de serie no coincide con el registrado en el ERP. Merck implementó este enfoque en su planta de Darmstadt, demostrando que contenedores con líquidos y metales podían verificarse de forma fiable sin abrir las cajas. Para la logística inversa (devoluciones), la misma estación identifica cada unidad y la clasifica para reacondicionamiento o destrucción, reduciendo el tiempo de procesamiento en un 60 %.

## Comparativa de tecnologías de serialización en farmacia

| Tecnología | Coste por etiqueta (100k uds.) | Lectura sin visión directa | Tasa de lectura validada | Agregación automática |
|---|---|---|---|---|
| DataMatrix (EU FMD) | 0,01–0,03 € | No | 99,9 % (lectura individual) | Manual |
| UHF RFID (ISO/IEC 18000-63) | 0,10–0,30 € | Sí (hasta 5–10 m) | 98–99 % (en bloque) | Automática (EPCIS) |
| NFC | 0,30–0,80 € | No (requiere proximidad) | 99,9 % (lectura individual) | Manual |
| Código de barras 1D | <0,01 € | No | 99,9 % (lectura individual) | Manual |

## TCO/ROI a cinco años (EUR)

Se comparan dos opciones para una línea que produce 100.000 cajas al año: (A) serialización solo con DataMatrix y verificación manual, y (B) DataMatrix + UHF RFID con pórtico de lectura automático e integración EPCIS. Las cifras son estimaciones de orden de magnitud; el objetivo es identificar las partidas que dominan el TCO. Los datos de ahorro de mano de obra se basan en reducciones del 50–70 % reportadas en la industria.

| Partida (5 años) | Opción A: DataMatrix manual | Opción B: DataMatrix + UHF RFID |
|---|---|---|
| Etiquetas (100.000 uds. × 5 años) | 10.000 € (0,02 €/ud. × 100.000 × 5 años) | 50.000 € (0,10 €/ud. × 100.000 × 5 años) |
| Lectores e infraestructura | 5.000 € (escáneres manuales) | 35.000 € (pórtico de lectura + antenas) |
| Mano de obra (verificación y agregación) | 150.000 € (3.000 h/año × 25 €/h × 5 años) | 37.500 € (750 h/año × 25 €/h × 5 años) |
| Coste de errores de agregación | 25.000 € (rechazos y retrabajo) | 3.000 € (verificación automática) |
| Integración software (EPCIS + ERP) | 0 € | 15.000 € |
| **TCO total 5 años** | **190.000 €** | **140.500 €** |

La opción RFID reduce el TCO en 49.500 € (un 26 %) a lo largo de cinco años. El ahorro proviene principalmente de la reducción de mano de obra en verificación y agregación. El CAPEX inicial de RFID (etiquetas + pórtico + integración) se recupera en menos de 24 meses si se tiene en cuenta el ahorro de mano de obra. Para una planta con un volumen superior a 50.000 cajas al año y requisitos estrictos de agregación, el ROI es claramente favorable. Los estudios de la industria confirman que, por cada euro invertido en RFID, se recuperan entre 4 y 5 euros en eficiencias operativas y reducción de errores.

## Conclusión y perspectivas 2026–2030

La combinación de etiquetas UHF, estaciones de verificación y una capa de eventos GS1 EPCIS 2.0 permite a Merck y a otros fabricantes farmacéuticos cumplir con la EU FMD y, al mismo tiempo, mejorar la eficiencia operativa. La experiencia de Merck en Darmstadt demuestra que incluso los productos más difíciles (líquidos, metales) pueden identificarse de forma fiable con el diseño adecuado. A partir de 2027, la entrada en vigor de los requisitos de agregación en la EU FMD y la creciente exigencia de trazabilidad en la cadena de suministro convertirán el RFID en un requisito de facto para los fabricantes que quieran mantener la competitividad. Las empresas que ya hayan integrado EPCIS y GS1 Digital Link podrán reutilizar la misma infraestructura para el Pasaporte Digital de Producto (DPP) y para las futuras exigencias de la EMA. Merck ya está explorando gemelos digitales basados en RFID y microchips de autenticación (p-Chip) para llevar la trazabilidad al siguiente nivel.

## FAQ

### ¿Es obligatorio el RFID para cumplir con la EU FMD?

No. La EU FMD exige un identificador único codificado en un DataMatrix, pero no impone la tecnología RFID. Sin embargo, el RFID UHF permite la lectura masiva sin línea de visión, lo que acelera la verificación de lotes completos y la agregación de unidades. Merck y otros fabricantes han adoptado RFID porque mejora la eficiencia operativa y reduce los errores humanos, no porque sea un requisito legal.

### ¿Cómo se garantiza la fiabilidad de la lectura en presencia de líquidos y metales?

Los líquidos absorben la energía UHF y los metales la reflejan, lo que puede degradar la lectura. La solución pasa por un diseño de antena optimizado, una disposición física que minimice las sombras de RF y un algoritmo de lectura en bloque (bulk reading) ajustado. Merck y Turck Vilant Systems demostraron en un PoC que, con una estación de verificación de envíos adecuada, contenedores con líquidos y objetos metálicos pueden leerse de forma fiable y rápida.

### ¿Qué identificador GS1 es el adecuado para una caja de medicamento?

Para unidades de inventario serializadas (cajas de medicamento), el estándar GS1 TDS 2.1 define el SGTIN-96 (Serialized Global Trade Item Number), que combina el GTIN del producto con un número de serie único. Para activos fijos (como equipos de laboratorio), se utiliza el GIAI-96. La elección depende de si el objeto se rastrea como unidad de inventario o como activo fijo.

### ¿Cómo se integra RFID con los requisitos de validación GMP (Annex 11)?

Los sistemas que gestionan datos RFID deben cumplir con GMP Annex 11 y 21 CFR Part 11: auditoría de eventos, control de acceso, trazabilidad de cambios y validación del software. La capa de eventos GS1 EPCIS 2.0 permite registrar cada lectura con marca de tiempo y usuario, lo que facilita la auditoría. La integración con el ERP debe documentarse y validarse según los procedimientos de la empresa.

**Autor:** Yurii Kasian, Ingeniero Principal de RFID · RFID Ukraine · Actualizado: 15 de noviembre de 2026
