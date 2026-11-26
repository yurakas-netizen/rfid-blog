---
title: "Ambient IoT en viñedos y retail de España: análisis técnico"
slug: ambient-iot-en-vinedos-y-retail-de-espana-analisis-tecnico
description: "Análisis técnico de Ambient IoT (backscatter ambiental y BLE
  harvesting) frente a UHF RFID pasivo en viñedos extensivos y tiendas de moda
  rápida: física de los mecanismos, marco normativo español (ETSI EN 300 220-2,
  EN 302 208 V3.4.1, EN 300 328), comparativa técnica, GS1 EPCIS 2.0, ESPR (EU)
  2024/1781 y TCO a cinco años en EUR para 50 sensores agrícolas y 500 etiquetas
  retail."
date: 2026-11-14T22:00:00.000Z
image: next-gen_industrial_rfid_applications-4_3.jpg
categories:
  - RFID Solutions
tags:
  - Ambient IoT
  - Backscatter
  - BLE Harvesting
  - Viñedo
  - Retail
  - GS1 EPCIS 2.0
translationKey: ambient-iot-agro-retail-spain
---
La monitorización de activos distribuidos en viñedos extensivos y en tiendas de moda rápida comparte un cuello de botella económico: desplegar lectores UHF-RFID dedicados por hectárea o por estante no es viable cuando el CAPEX por punto de lectura supera el valor del activo monitorizado. Ambient IoT —sensores sin batería que operan por backscatter o por harvesting BLE— reduce ese CAPEX al eliminar el lector dedicado y reutilizar señales ambientales o gateways existentes. Este artículo analiza la física de ambos mecanismos, los límites normativos aplicables en España, una comparativa técnica frente al RFID UHF clásico y un TCO a cinco años en EUR para un piloto de 50 etiquetas en agricultura y 500 en retail.

## Física del backscatter pasivo y del harvesting BLE

Un sensor pasivo UHF no genera su propia señal de radiofrecuencia. El interrogador transmite una onda continua y el tag responde modulando el coeficiente de reflexión de su antena, retrodispersando así una señal de información hacia el lector. A diferencia del RFID activo en 433 MHz (ISO/IEC 18000-7:2014), donde el tag tiene su propia batería y transmite activamente, el backscatter pasivo y el ambiental dependen completamente de la señal incidente. En un escenario de campo abierto sin lector dedicado, la misma física se aplica a señales ambientales existentes —torres 4G/5G en 700 MHz–2,6 GHz, emisores DVB-T2 en ~500–800 MHz, FM—: el sensor conmuta entre estados de alta y baja impedancia según la lectura del sensor, y un gateway dedicado demodula esos cambios. La diferencia crítica frente al UHF RFID clásico es que el enlace descendente no lo controla el operador, sino un tercero (operador móvil o radiodifusor), lo que introduce una variabilidad de cobertura que debe mapearse antes del despliegue.

En retail, el mecanismo es distinto: etiquetas BLE sin batería acumulan energía de la RF ambiental en un condensador y emiten paquetes de advertising no conectables cuando el condensador alcanza el umbral. No hay enlace bidireccional ni handshake; cualquier gateway BLE en modo promiscuo puede capturar el paquete. El compromiso de diseño es directo: a mayor densidad de Wi-Fi/BLE en tienda, menor intervalo entre paquetes (típicamente 30–120 s), pero también mayor probabilidad de colisión en el canal de advertising.

El marco normativo relevante para España combina el régimen general de SRD (ETSI EN 300 220-2 para 433 MHz, con límite de 10 mW ERP en 433,05–434,79 MHz) con el estándar armonizado UHF RFID ETSI EN 302 208 V3.4.1 (2023-10), que cubre 865–868 MHz hasta 2 W ERP, y 915–921 MHz hasta 4 W ERP en aquellos países de la UE donde la banda esté disponible a nivel nacional. Para el enlace de aire pasivo, la referencia es ISO/IEC 18000-63:2021. Cualquier piloto que combine backscatter ambiental con UHF RFID debe verificar por separado el cumplimiento de cada enlace: el ambiental no está armonizado por EN 302 208, y el UHF sí.

## Presupuesto de enlace y límites de datos

En backscatter ambiental, la potencia disponible en el sensor es la integral de la densidad de potencia ambiental sobre la apertura efectiva de la antena. En zonas rurales con densidad moderada (~0,1–10 µW/cm²), el consumo del sensor debe mantenerse en el orden de decenas a cientos de nanovatios para que el ciclo de medición sea sostenible sin batería. La tasa de datos queda limitada por el ancho de banda de la señal ambiental y por la sensibilidad del gateway; en la práctica, para lecturas de humedad o temperatura cada 5–15 minutos, el enlace es suficiente, pero no debe dimensionarse para vídeo ni para telemetría de alta frecuencia.

En BLE harvesting, el enlace se rige por ETSI EN 300 328 V2.2.2 (2,4 GHz): el presupuesto depende de la energía cosechada por ciclo y el consumo del paquete de advertising. La distancia útil depende de la potencia de transmisión del paquete (típicamente en el rango de –20 a 0 dBm en etiquetas sin batería) y de la sensibilidad del gateway; en entorno comercial denso, 10 m es un valor de diseño razonable, no una garantía. El identificador de la prenda se transporta como EPC o como identificador propietario; para interoperabilidad con EPCIS 2.0, conviene que el esquema de identificadores sea compatible con GS1 Digital Link.

Para la capa de eventos, GS1 EPCIS 2.0 incorpora soporte nativo de datos de sensor y certificaciones asociadas a la cosecha, producción y ubicación. Esto es relevante porque el valor de Ambient IoT no está en la lectura aislada, sino en la secuencia temporal de eventos que puede integrarse en la cadena de trazabilidad sin desarrollo propietario.

## Escenarios de implementación

### Escenario A — Viñedo mediterráneo de 40 ha

Se despliegan 50 sensores de humedad de suelo por backscatter ambiental en 40 ha, con un gateway receptor en el punto más alto del perímetro. Antes del piloto se realiza un mapeo de densidad DVB-T2/4G en la parcela; si la densidad cae por debajo de ~0,1 µW/cm² en algún lote, se añade un repetidor pasivo o se reubica el sensor. La calibración se hace contra sondas TDR in-situ, con curvas de corrección por tipo de suelo. El KPI principal es la reducción del consumo de agua por hectárea, no el número de lecturas.

### Escenario B — Tienda de moda rápida con 500 etiquetas BLE

Se etiquetan 500 prendas con etiquetas BLE sin batería y se reutilizan los gateways BLE existentes de la tienda en modo promiscuo. El objetivo no es sustituir el inventario cíclico con RFID UHF, sino añadir una señal continua de «prenda probada / no probada» en el probador, con un detector de movimiento integrado. La integración se hace vía MQTT hacia el WMS/POS; si el retailer ya opera EPCIS 2.0, los eventos de sensor pueden publicarse en el mismo repositorio de eventos.

## Comparativa técnica: UHF RFID clásico vs. Ambient IoT

| Parámetro | UHF RFID pasivo (ISO/IEC 18000-63) | Ambient Backscatter | BLE Harvesting |
|---|---|---|---|
| Alimentación | CW del lector dedicado | Señal ambiental (DVB-T2 / 4G / FM) | RF ambiental Wi-Fi/BLE |
| Alcance típico | 3–10 m desde lector | 50-150 m en campo abierto | ~10 m en entorno comercial |
| Tasa de datos | Decenas de kbps en el enlace de aire | 100 bps – 10 kbps (dependiente de la señal) | Paquetes de advertising de pocos bytes |
| Infraestructura | Lectores + antenas + cableado | Gateways receptores + mapeo de señal | Gateways BLE existentes |
| Norma aplicable | ISO/IEC 18000-63; EN 302 208 (865–868 MHz, 2 W ERP) | Sin norma armonizada única; régimen SRD por banda | EN 300 328 (2,4 GHz) para el enlace BLE |

## TCO/ROI a cinco años (EUR)

La comparativa se hace entre dos opciones para el escenario retail de 500 etiquetas: (A) UHF RFID con dos portales dedicados y etiquetas pasivas, y (B) BLE harvesting reutilizando gateways existentes. Las cifras son estimaciones de orden de magnitud para un piloto, no una cotización; el objetivo es mostrar qué partidas dominan el TCO. El CAPEX de B excluye las etiquetas —se contabilizan aparte, sin doble cómputo—.

| Partida (5 años) | Opción A: UHF RFID (2 portales) | Opción B: BLE Harvesting (500 etiquetas) |
|---|---|---|
| CAPEX inicial (sin etiquetas) | 18.000 € (lectores, antenas, instalación) | 6.000 € (gateways + puesta en marcha, sin etiquetas) |
| Etiquetas / consumibles (500 × 0,50 € × 5 reposiciones) | 1.250 € | 1.250 € |
| Mantenimiento / soporte | 7.500 € (1.500 €/año) | 2.500 € (500 €/año) |
| Integración software | 5.000 € | 4.000 € |
| **TCO total 5 años** | **31.750 €** | **13.750 €** |

La diferencia de TCO es de 18.000 € a favor de BLE harvesting, impulsada principalmente por el CAPEX de portales y el mantenimiento anual. Sin embargo, la comparación no es neutral: la opción A entrega inventario cíclico con exactitud cercana al 99 % a nivel de artículo, mientras que la opción B entrega señal continua de interacción, no inventario. La diferencia de 18.000 € solo se materializa si el retailer puede operar sin la exactitud de inventario que entrega A. Si la pérdida de exactitud genera un coste de roturas de stock superior a 3.600 €/año (18.000 € en cinco años), A sigue siendo preferible a pesar de su mayor TCO; si es inferior, B es económicamente superior.

## Conclusión y perspectivas 2026–2030

Ambient IoT no sustituye al UHF RFID pasivo en inventario de alta exactitud; lo complementa en escenarios donde el coste de la infraestructura de lectura dedicada es la barrera. La decisión de diseño debe tomarse por enlace: si el caso de uso requiere identificar cada artículo con precisión, ISO/IEC 18000-63 sigue siendo la referencia; si requiere monitorización continua de condiciones o presencia sin lector dedicado, el backscatter ambiental o el BLE harvesting son candidatos. A partir de 2027, la combinación de GS1 EPCIS 2.0 —que ya soporta datos de sensor y certificaciones— con el Digital Product Passport del ESPR (EU) 2024/1781 crea un incentivo regulatorio para que los eventos de sensor se estandaricen. El ESPR exige identificación única del producto y del operador para permitir la trazabilidad a lo largo de la cadena de suministro. Las soluciones que ya emiten eventos compatibles con EPCIS 2.0 conforme a GS1 General Specifications v24 tendrán una ventaja de integración cuando los actos delegados del ESPR concreten los requisitos por categoría de producto.

## FAQ

### ¿Ambient Backscatter necesita licencia de espectro en España?

No en el sentido de una licencia individual, pero el enlace debe encajar en el régimen de SRD de la banda que utilice como portadora. Si el sensor opera en 433 MHz, aplica ETSI EN 300 220-2 con 10 mW ERP en 433,05–434,79 MHz. Si el enlace de datos se transporta en UHF RFID 865–868 MHz, aplica ETSI EN 302 208 V3.4.1 con 2 W ERP. La banda DVB-T2 no es SRD; el sensor no transmite en ella, solo la refleja, por lo que el análisis regulatorio se centra en el receptor y en el nivel de emisiones no deseadas.

### ¿Qué exactitud de inventario ofrece BLE harvesting frente a UHF RFID?

BLE harvesting no está diseñado para exactitud de inventario; está diseñado para presencia e interacción. UHF RFID pasivo, con portales y algoritmos de anticolisión, es la tecnología de referencia para exactitud a nivel de artículo. Si el KPI es exactitud de stock, BLE harvesting no es un sustituto; si el KPI es señal continua de prueba de prenda, UHF RFID con portales puntuales no lo entrega.

### ¿Cuántos gateways BLE se necesitan para una tienda de 500 m²?

Depende de la densidad de Wi-Fi/BLE y de la potencia de advertising de la etiqueta. En un entorno comercial denso, con etiquetas que emiten en el rango de –20 a 0 dBm, un gateway cada 150–200 m² suele ser suficiente para cobertura, pero la cifra debe validarse con un site survey BLE. No existe un número universal; el error común es dimensionar por área y no por eventos capturados.

### ¿Cómo se integra Ambient IoT con GS1 EPCIS 2.0?

EPCIS 2.0 admite eventos con datos de sensor y certificaciones, y define sintaxis JSON/JSON-LD y API REST para captura y consulta. El gateway debe transformar el paquete BLE o la lectura de backscatter en un evento EPCIS con identificador GS1 conforme a EPC Tag Data Standard 2.1 (por ejemplo, SGTIN o GRAI) y publicarlo en el repositorio de eventos. La dificultad no está en el estándar, sino en la calidad del identificador: si el EPC no es estable ni único, el evento EPCIS hereda ese defecto.

**Autor:** Yurii Kasian, Ingeniero Principal de RFID · RFID Ukraine · Actualizado: 15 de noviembre de 2026
