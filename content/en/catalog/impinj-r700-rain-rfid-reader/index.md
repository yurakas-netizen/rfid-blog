---
title: "Impinj R700 v2 RAIN RFID Reader (4-Port, PoE+, Gen2X)"
slug: "impinj-r700-rain-rfid-reader"
description: "Impinj R700 series fixed RAIN RFID reader: 4 RP-TNC ports, EPC Gen2v2 / ISO 18000-63 + Gen2X, -93 dBm conducted sensitivity, 10-33 dBm PoE+, Linux 6.6, REST/MQTT/LLRP."
translationKey: "impinj-r700-rain-rfid-reader"
date: 2026-11-29T09:00:00Z
weight: 10
catalogType: "reader"
sku: "IPJ-R700-241-B"
manufacturer: "Impinj, Inc."
availability: "order"
image: "/uploads/catalog/impinj-r700-rain-rfid-reader/Image02.webp"
showPrice: true
price: 1700
currency: "USD"
priceUnit: "/ шт."
commentsMode: "all"
math: true
highlights:
  - "4 monostatic RP-TNC ports; up to 32 antennas / 32 read zones via IPJ-A6010 antenna hub"
  - "Conducted sensitivity -93 dBm typical (CISC, 90% PSR, DRM M8); -88 dBm in challenging RF"
  - "Impinj Gen2X reader modes (5xxx): FastID, Authenticity, Protected Mode; up to 5 dB sensitivity gain"
  - "R700v2: dual-core Cortex-A53 1 GHz, 1 GB LPDDR4, 768 MB CAP, Linux kernel 6.6 (64-bit)"
  - "PoE+ (802.3at) only on R700v2; 10-33 dBm conducted, 0.25 dB step, +/-0.5 dB accuracy"
  - "IP50 die-cast aluminum, 0.96 kg, VESA 100x100, -20...+55 C at 31.5 dBm"
tags:
  - "UHF RFID"
  - "PoE+"
  - "Gen2X"
  - "Impinj"
  - "Dock Portal"
  - "LLRP"
  - "MQTT"
specs:
  - group: "RF Architecture"
    label: "Air Protocol"
    value: "ISO/IEC 18000-63 (EPC Gen2v2)"
  - group: "RF Architecture"
    label: "Operating Band"
    value: "865–868 / 902–928"
    unit: "MHz"
  - group: "RF Architecture"
    label: "TX Conducted Power"
    value: "+10 to +33"
    unit: "dBm"
  - group: "RF Architecture"
    label: "RX Sensitivity"
    value: "-88"
    unit: "dBm"
  - group: "RF Architecture"
    label: "Antenna Ports"
    value: "4× RP-TNC Female (50 Ω)"
  - group: "Power & Mechanics"
    label: "Supply"
    value: "PoE+ 802.3at / 12–48V DC"
  - group: "Power & Mechanics"
    label: "Ingress Protection"
    value: "IP67 Die-Cast Aluminum"
  - group: "Edge & Protocols"
    label: "Integration APIs"
    value: "LLRP 1.1, MQTT v5, EPCIS 2.0"
documents:
  - title: "Impinj R700 Series RAIN RFID Readers — Datasheet"
    docType: "datasheet"
    file: "/uploads/catalog/impinj-r700-rain-rfid-reader/Impinj-R700-Series-Datasheet-v2.4.pdf"
    version: "v2.4"
    lang: "EN"
  - title: "Impinj R700 Series Product Brief (EN-US)"
    docType: "brochure"
    file: "/uploads/catalog/impinj-r700-rain-rfid-reader/Impinj-R700-Reader-Series-Product-Brief-EN-US-042026.pdf"
    version: "04/2026"
    lang: "EN"
linkedArticles:
  - kind: "comparison"
    translationKey: "rfid-readers-poe-protocols-classification"
  - kind: "guide"
    translationKey: "rfid-antenna-polarization-gain-beamwidth"
---
## Engineering Overview & System Role

The **Impinj R700 series** is a four-port monostatic fixed RAIN RFID reader family for choke-point reading: dock doors, conveyor diverters, store exits and WIP portals. Three revisions are covered by datasheet v2.4: **R700v1 (IPJ-R700-xxx)**, **R700v2 (IPJ-R700-xxx-B)** and **R720 (IPJ-R720-xxx)**. The R720 is in the end-of-life process, so R700v2 is the reference platform for new designs.

Air interface: EPCglobal UHF Class 1 Gen2v2, standardized as **ISO/IEC 18000-63**, plus **Impinj Gen2X** protocol/application-layer enhancements (mode IDs `5xxx`). Gen2X inventories interoperate with plain Gen2 tags; the sensitivity and speed gains require Gen2X-capable tags. Gen2X Protection bundles **FastID** (high-speed verification), **Authenticity** (cryptographic authentication) and **Protected Mode** (tag data protection).

Architecturally the reader is an edge node, not a bare transponder gateway: Octane firmware runs on Linux with a **REST configuration API (OpenAPI)**, native **MQTT** transport via the Impinj IoT Device Interface, and a **CAP partition** (768 MB on v2, 256 MB on v1/R720) for custom on-reader C/C++ applications built with the embedded toolkit.

## RF Link Budget Sizing

Conducted power is configured at the reader RF port; the reader only exposes power steps that are legal for the configured region. For ETSI lower band (865–868 MHz, EN 302 208: 2 W ERP ≈ 35.15 dBm EIRP):

$$\text{EIRP} = P_{\text{TX}} - L_{\text{cable}} - L_{\text{conn}} + G_{\text{ant}}$$

$$\text{ERP} = \text{EIRP} - 2.15\ \text{dB}$$

Worked example — 4.6 m low-loss jumper (IPJ-A3114-000, assume $L_{\text{cable}} \approx 1.1\ \text{dB}$ at 866 MHz, verify against the cable datasheet), $L_{\text{conn}} \approx 0.3\ \text{dB}$, 9 dBic circular panel ($\approx 6\ \text{dBi}$ effective toward a linearly polarized tag):

$$P_{\text{TX}} \le 35.15 + 1.1 + 0.3 - 6.0 = 30.55\ \text{dBm} \Rightarrow \mathbf{30.5\ dBm}$$

Resulting EIRP = 35.1 dBm (ERP ≈ 1.97 W), inside the 2 W ERP limit. Power resolution is 0.25 dB, accuracy ±0.5 dB — keep that tolerance in the margin, not in the budget.

**Monostatic penalty:** all four ports are monostatic (RP-TNC, 50 Ω, return loss ≥ 10 dB), so coax loss attenuates both the forward carrier and the returning backscatter. In a backscatter-limited link, 1 dB of jumper loss costs roughly 2 dB of round-trip margin — shortening the jumper is usually cheaper than raising TX power.

## PoE+ Power & Opto-Isolated GPIO Wiring Matrix

There is **no DC input** on this family: power comes exclusively over Ethernet. R700v1 and R720 negotiate power via **LLDP**; if negotiation fails they fall back to 802.3af PoE and cap TX power (30 dBm and 20 dBm respectively). **R700v2 requires PoE+ (802.3at) for all operation.** Where the switch has no PoE+, use a midspan injector (IPJ-A2010 + region cord IPJ-A2041-xxx). Impinj recommends PoE+ whenever USB peripherals or GPO loads are sourced from the reader.

GPIO is exposed on a Phoenix Contact 9-position 3.81 mm header (mating terminal block required). Pin 1 is nearest the factory-reset push-pin.

| Pin | Signal | Electrical rating | Typical portal role |
| --- | --- | --- | --- |
| 1 | +5V | 500 mA max | Aux sensor supply (photo-eyes, loop detector) |
| 2 | Chassis GND | — | Shield / chassis reference |
| 3 | IN 0 | Logic 0: 0–0.8 V; Logic 1: 3–30 V | Trigger / presence detect |
| 4 | IN 1 | Logic 0: 0–0.8 V; Logic 1: 3–30 V | Direction photo-eye B |
| 5 | OUT 0 | Logic 1 ≈ V PLUS − 0.5 V; 1.5 A source/sink | Stack light "Go" |
| 6 | OUT 1 | Logic 1 ≈ V PLUS − 0.5 V; 1.5 A source/sink | Stack light "Hold" |
| 7 | OUT 2 | Logic 0: 0–0.5 V (ref. V MINUS) | Conveyor / barrier interlock |
| 8 | V MINUS | Return for external I/O supply | External 5–30 V return |
| 9 | V PLUS | 5–30 V (ref. V MINUS) | External I/O rail |

Inputs and outputs are **optically isolated** (2 in / 3 out). Output current capability (1.5 A source or sink) is a switching rating, not a free power budget: the load rail must be supplied on V PLUS/V MINUS, and total draw still has to fit the PoE+ envelope.

## Edge Integration: REST / MQTT / LLRP

- **REST configuration API** — OpenAPI-compatible; reader settings, tag data streams, certificate management, events and alarms through the Impinj IoT Device Interface.
- **MQTT** — native RAIN data transport to the broker; no mandatory middleware layer for simple topologies.
- **LLRP 1.0.1 + Impinj extensions** — Octane LLRP toolkit for .NET, Java, C, C++; Octane SDK for host-based .NET/Java applications.
- **On-reader applications** — embedded toolkit (C/C++ compiler + precompiled Octane LLRP libraries) targeting the CAP partition; 1 GB RAM, 1 GB Flash.
- **Management** — IPv4/IPv6, SSH/HTTPS/SFTP/NTP/DHCP/mDNS, 802.1X port security, event logs with syslog forwarding, web-based and remote firmware upgrade.

Two honest boundaries versus typical "industrial edge" marketing: the reader does **not** publish GS1 EPCIS 2.0 events natively and does **not** run a container runtime — EPCIS mapping, deduplication and store-and-forward must be implemented in middleware or in a CAP application (USB flash can back the queue). Plan CAP size accordingly: 768 MB on v2 vs 256 MB on v1/R720.

## Gen2X Modes & Sensitivity Reference Conditions

Static and dynamic RF modes are exposed per region; Gen2X modes appear as `5xxx` and switch seamlessly between Gen2 and Gen2X inventories. For the lowest (best) receive sensitivity use **Dense Reader M8**.

Sensitivity is measured per RAIN Alliance / ISO/IEC 18046-2:2020 using CISC conducted testing at 90 % PSR, RF mode FCC DRM M8 @ 30 dBm:

| Condition | Time delay (ns) | Return loss (dB) | Sensitivity (dBm) |
| --- | --- | --- | --- |
| Ideal | 4.5 | 22+ | -94 |
| Typical | 6.0 | 15 | -93 |
| Challenging | 38.2 | 12 | -88 |

Use **-88 dBm** for conservative portal sizing in electrically noisy or poorly matched installations; -93 dBm is a bench-typical figure, not a site guarantee. Gen2X is stated to add up to 5 dB of sensitivity improvement — vendor modeling/test data, tag-dependent.

**Read rate:** datasheet v2.4 specifies **up to 1100 tags/s** for R700v1, R700v2 and R720, achievable only in reader mode 0 in an FCC-like region. The product brief quotes "1300+" for R700; treat that as a burst/marketing figure and size throughput from 1100 with DRM, session and Q overhead applied.

## Revision Matrix: R700v1 / R700v2 / R720

| Parameter | R700v1 | R700v2 | R720 (EOL process) |
| --- | --- | --- | --- |
| Processor | Dual-core 1 GHz Cortex-A7 | Dual-core 1 GHz Cortex-A53 (64-bit) | Quad-core 1.4 GHz ARM53 |
| RAM | 1 GB DDR3L 800 MHz | 1 GB LPDDR4 1.6 GHz | 1 GB DDR3L 800 MHz |
| CAP | 256 MB | 768 MB | 256 MB |
| Linux | 6.6 (32-bit) | 6.6 (64-bit) | 5.10 (32-bit) |
| Power | PoE / PoE+ (LLDP) | PoE+ only | PoE / PoE+ (LLDP) |
| TX on PoE | ≤ 30 dBm | n/a | ≤ 20 dBm |
| TX on PoE+ | 10–33 dBm (31.5 ETSI lower) | 10–33 dBm (31.5 ETSI lower) | 10–33 dBm (31.5 ETSI lower) |
| Sensitivity (typ.) | -93 dBm | -93 dBm | -93 dBm |
| Ports / zones / rate | 4 / 32 / 1100 | 4 / 32 / 1100 | 4 / 32 / 1100 |

## Deployment Limits

- **IP50 only.** No dust/water protection for wash-down or open-air mounting. The Impinj water-resistant case reached end-of-life in July 2025 — outdoor use now requires a third-party enclosure with its own thermal budget.
- **Thermal derating is power-dependent:** -20…+55 °C at 31.5 dBm (ETSI lower band max), but only -20…+50 °C at 33 dBm (FCC / ETSI upper band max). Storage: -20…+70 °C, humidity 5–95 % non-condensing.
- **Antenna scaling:** IPJ-A6010 hub gives 8 antennas per port, 32 per reader, 32 read zones max — but antennas are time-multiplexed, so per-antenna dwell time and effective per-zone read rate drop as zones are added.
- **Regulatory:** FCC Part 15.247/15.249 requires professional installation; ETSI EN 302 208 v3.3.0, EN 301 489-3 v2.2.1, EN 300 489-1 v2.2.0; Japan ARIB STD-T106. UL listed, CE, RoHS3 2015/863.
- **Firmware entitlement:** updates are a purchasable item (IPJ-C2001, 1-year); include it in TCO alongside warranty extensions (IPJ-C205x).
- Vendor notice: not designed or authorized for hazardous uses (life support, aircraft control, nuclear facilities).

## Ordering Information

| Part number | Description |
| --- | --- |
| IPJ-R700-241-B | R700v2, 4-port, ETSI (865–868 / 915–921 MHz) |
| IPJ-R700-341-B | R700v2, 4-port, FGX global (902–928 MHz) |
| IPJ-R700-441-B | R700v2, 4-port, Japan (916.7–920.9 MHz) |
| IPJ-R700-241 / -341 / -441 | R700v1, ETSI / FGX / Japan |
| IPJ-R720-243 / -343 / -443 | R720, ETSI / FGX / Japan (EOL process) |
| IPJ-A6010 | Antenna hub, 8 antennas per port, 32 per reader |
| IPJ-A2010 | PoE+ midspan injector (no AC cord) |
| IPJ-A2041-xxx | AC cord for injector (EU1, USA, UK1, JPN, AUS, …) |
| IPJ-A0303-000 / IPJ-A0404-000 | Mini-Guardrail / Matchbox near-field antennas |
| IPJ-A300x-000 | RG58 cable, SMA-M → R-TNC-M, 2 / 4 / 8 m |
| IPJ-A311x-000 | Low-loss/high-flex, SMA-M → R-TNC-M, 2.1 / 4.6 m |
| IPJ-A312x-000 | Low-loss/high-flex, SMA-M → SMA-M, 2.1 / 4.6 m |
| IPJ-C205x / IPJ-C2001 | Warranty extension 1/2/3 years / firmware updates 1 year |

## Frequently Asked Questions (FAQ)

**Can R700v2 run on an 802.3af PoE switch port?**
No. R700v2 is PoE+ (802.3at) only. R700v1 and R720 do accept 802.3af via LLDP fallback, but cap conducted power at 30 dBm and 20 dBm respectively — a 13 dB reduction on R720 that will collapse a dock-portal read zone.

**Does the reader output GS1 EPCIS 2.0 events or buffer millions of events offline?**
Not natively. It emits RAIN data over MQTT/REST and LLRP; EPCIS 2.0 event mapping, deduplication and store-and-forward belong to middleware or a custom CAP application (768 MB on v2, 256 MB on v1/R720), optionally backed by USB flash.

**Which sensitivity figure should be used for portal sizing?**
-93 dBm is typical (6.0 ns delay, 15 dB return loss). For real installations with adjacent readers and imperfect matching use the challenging figure, -88 dBm (38.2 ns, 12 dB). All are conducted CISC measurements at 90 % PSR in DRM M8 @ 30 dBm, not field read-range guarantees.

**How are 32 antennas reached on a 4-port reader?**
With the IPJ-A6010 hub: 8 antennas per port, 32 total, 32 read zones maximum. The hub multiplexes, it does not add radios — inventory time is shared, so per-zone throughput scales down accordingly.

**Is 1100 or 1300+ tags/s the correct number?**
Datasheet v2.4 states up to 1100 tags/s for all three revisions, and only in reader mode 0 in an FCC-like region. The 1300+ figure appears in the product brief; engineering budgets should start from 1100 and derate for DRM, session/Q settings and tag population.

**Is the R700 suitable for outdoor or wash-down mounting?**
No. The enclosure is IP50 die-cast aluminum and the water-resistant case accessory is end-of-life. Use an external rated enclosure and re-check the thermal envelope, since 33 dBm operation is limited to +50 °C ambient.
