---
title: "RFID-Gate XR400 PoE+ UHF Reader (4-Port, IP67)"
slug: "rfid-gate-xr400-uhf-reader"
translationKey: "rfid-gate-xr400-uhf-reader"
description: "Industrial 4-port RAIN UHF RFID fixed reader featuring an embedded Linux GS1 EPCIS 2.0 edge engine, IEEE 802.3at PoE+ power, and rugged IP67 die-cast enclosure."
date: 2026-11-28T09:00:00Z
weight: 10
catalogType: "reader"
sku: "XR400-UHF-ETSI-POE"
manufacturer: "RFID Lab Engineering"
availability: "in_stock"
image: "/uploads/catalog/rfid-gate-xr400-uhf-reader/xr400-studio.jpg"
showPrice: true
price: 1480
currency: "EUR"
priceUnit: "/ unit"
commentsMode: "all"
math: true
highlights:
  - "4 independent RP-TNC antenna ports with integrated multiplexer and VSWR fault guard"
  - "Impinj E710 RF core · up to -90 dBm receiver sensitivity in Dense Reader Mode"
  - "Dual power architecture: IEEE 802.3at PoE+ or galvanically isolated 24 VDC"
  - "Embedded Docker/MQTT edge agent emitting native GS1 EPCIS 2.0 JSON-LD events"
  - "Die-cast aluminum IP67 chassis rated for -25 °C to +60 °C industrial operation"
specs:
  - group: "RF Architecture"
    label: "Frequency Band (ETSI / FCC)"
    value: "865.6–867.6 / 902–928"
    unit: "MHz"
  - group: "RF Architecture"
    label: "Conducted TX Output Power"
    value: "+10.0 … +33.0 (0.25 dB step)"
    unit: "dBm"
  - group: "RF Architecture"
    label: "Receiver Sensitivity"
    value: "-90"
    unit: "dBm"
  - group: "RF Architecture"
    label: "Air Interface Protocols"
    value: "ISO/IEC 18000-63 · EPC Gen2v2 · Gen2X"
  - group: "RF Architecture"
    label: "Antenna Ports"
    value: "4 × RP-TNC Female (50 Ω)"
  - group: "RF Architecture"
    label: "Peak Read Rate"
    value: "up to 1,300"
    unit: "tags/s"
  - group: "Edge Compute & Memory"
    label: "SoC & System Memory"
    value: "Dual-Core ARM Cortex-A53 · 1 GB LPDDR4"
  - group: "Edge Compute & Memory"
    label: "Host Integration Protocols"
    value: "LLRP v1.1 · MQTT · REST · GS1 EPCIS 2.0"
  - group: "Edge Compute & Memory"
    label: "Offline Store-and-Forward"
    value: "8 GB eMMC (up to 2.5M EPC events)"
  - group: "Power & Interfaces"
    label: "Network & PoE"
    value: "100/1000 Mbps Ethernet · IEEE 802.3at PoE+"
  - group: "Power & Interfaces"
    label: "Auxiliary DC Input"
    value: "18 … 30 (M12 A-coded)"
    unit: "VDC"
  - group: "Power & Interfaces"
    label: "Opto-Isolated GPIO"
    value: "4 × IN (5–24 V) · 4 × OUT (SSR 30 V / 0.5 A)"
  - group: "Mechanical & Environmental"
    label: "Ingress Protection"
    value: "IP67 / NEMA 4X (die-cast aluminum)"
  - group: "Mechanical & Environmental"
    label: "Operating Temperature"
    value: "-25 … +60"
    unit: "°C"
  - group: "Mechanical & Environmental"
    label: "Dimensions & Weight"
    value: "212 × 146 × 41 · 1.24 kg"
    unit: "mm"
documents:
  - title: "XR400 UHF Reader — Technical Datasheet (ETSI / FCC)"
    docType: "datasheet"
    file: "/uploads/catalog/rfid-gate-xr400-uhf-reader/XR400-UHF-Reader-Datasheet-v2.4.pdf"
    version: "v2.4"
    lang: "EN"
  - title: "XR400 PoE+ & Opto-GPIO Wiring Integration Guide"
    docType: "manual"
    file: "/uploads/catalog/rfid-gate-xr400-uhf-reader/XR400-Integration-Wiring-Guide-v1.2.pdf"
    version: "v1.2"
    lang: "EN"
linkedArticles:
  - kind: "comparison"
    translationKey: "rfid-readers-poe-protocols-classification"
  - kind: "guide"
    translationKey: "rfid-antenna-polarization-gain-beamwidth"
tags:
  - "UHF RFID"
  - "PoE+"
  - "IP67"
  - "EPCIS 2.0"
  - "Dock Portal"
---

## Engineering Overview & System Role

The **RFID-Gate XR400** is engineered for demanding industrial choke points: cross-dock loading bays, high-speed conveyor diverters, and factory work-in-process portals operating under strict Dense Reader Mode (DRM) coexistence. Built around the **Impinj E710** RF front-end with active self-jammer cancellation (SJC), it maintains reliable tag population inventories across dense mixed-SKU pallets moving at forklift speeds up to **15 km/h**.

Unlike dumb transponder gateways that stream raw EPC frames to a central broker, the XR400 executes **edge deduplication, RSSI phase filtering, and directional vector logic** directly on its embedded Linux runtime, cutting upstream WMS traffic by more than 85%.

## RF Link Budget Sizing

When commissioning dock portals with coax run loss $L_{\text{cable}}$ and antenna gain $G_{\text{ant}}$, conducted reader power must be calibrated to stay within regulatory limits (ETSI EN 302 208: 2 W ERP $\approx 35.15\text{ dBm EIRP}$):

$$\text{EIRP} = P_{\text{TX}} - L_{\text{cable}} - L_{\text{conn}} + G_{\text{ant}}$$

* Using a 3 m LMR-240 jumper ($L_{\text{cable}} \approx 0.72\text{ dB}$ at 866 MHz) paired with an $8.5\text{ dBiC}$ circularly polarized panel antenna ($\approx 5.5\text{ dBi}$ linear effective gain), the recommended conducted TX setting is **+30.25 dBm**.
* An integrated directional coupler sweeps return loss across all four RP-TNC ports prior to RF emission; channels exceeding $\text{VSWR} > 2.2:1$ are automatically muted to protect the final PA stage.

## PoE+ & Opto-Isolated GPIO Wiring Matrix

The M12 12-pin industrial A-coded receptacle interfaces directly with optical light curtains, inductive floor loops, and stack-light beacons:

| Pin | Signal | Electrical Rating | Portal Role |
| :--- | :--- | :--- | :--- |
| Pin 1–2 | `IN1 / IN2` | Opto-isolated 5…24 VDC | Dual-beam direction photo-eyes (A → B) |
| Pin 3 | `IN3` | Edge-triggered input | Inductive floor loop / dock presence |
| Pin 4–5 | `OUT1 / OUT2` | Solid-state relay 30 V / 500 mA | Go / Hold LED stack light control |
| Pin 6 | `OUT3` | Dry contact (SSR) | Conveyor stop / barrier interlock |
| Pin 7–8 | `+24V / GND` | Auxiliary 18…30 VDC | Redundant supply when PoE+ is absent |

## Edge GS1 EPCIS 2.0 & WMS Integration

1. **LLRP v1.1 / Native Engine:** Sub-millisecond control over Gen2 RF modes (Miller M=4 / M=8, Session S2/S3, Dynamic Q) without external middleware dependencies.
2. **Embedded EPCIS 2.0 Emitter:** Translates validated portal crossings into schema-compliant `ObjectEvent` JSON-LD payloads carrying `bizLocation`, `readPoint`, directional disposition, and NTP/PTP timestamps.
3. **Store-and-Forward Resilience:** During WAN or broker outages, up to 2.5 million tag events are persisted to on-board industrial eMMC and flushed sequentially via MQTT QoS 1 upon reconnect.
