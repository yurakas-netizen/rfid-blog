---
title: "Classification of Industrial UHF Readers: PoE Power Classes, Protocols, and Standards"
slug: classification-of-industrial-uhf-readers-poe-power-classes-protocols-and
description: "Technical overview of industrial UHF readers: distinguishing 2 W ERP (ETSI EN 302 208) from 4 W EIRP (FCC Part 15.247), choosing between PoE+ and PoE++, the role of IEEE 1588 PTP, management protocols (LLRP v1.1, OPC UA, EPCIS 2.0), and a 5-year TCO model in EUR."
date: 2026-11-19T22:00:00.000Z
image: Image01.webp
categories:
  - Архитектура RFID-систем
tags:
  - UHF RFID
  - PoE+
  - IEEE 802.3bt
  - LLRP v1.1
  - IEEE 1588 PTP
  - OPC UA
translationKey: rfid-readers-poe-protocols-classification
---
Selecting an industrial UHF RFID reader is not merely about transmitter power and the number of antenna ports. The key parameters defining the reliability of an industrial network are the power class (PoE / PoE+ / PoE++), conducted versus radiated power, supported management protocols (LLRP v1.1, MQTT, REST, OPC UA, EPCIS 2.0), and time synchronisation accuracy (NTP versus IEEE 1588 PTP). Incorrect reader classification leads to PoE port overload, unstable anti-collision performance in Dense Reader Mode, and ultimately, conveyor downtime. This technical article — the first of 14 topics in the "RFID System Architecture" hub — classifies industrial UHF readers along these axes, provides a conducted/radiated power model (2 W ERP / 33 dBm ERP per ETSI EN 302 208 versus 4 W EIRP per FCC Part 15.247), deployment scenarios, and a 5-year TCO model in EUR.

## Regulatory Landscape and Reader Classes

In Europe, an industrial UHF reader operates in the 865–868 MHz band under ETSI EN 302 208, with a maximum radiated power of 2 W ERP (33 dBm ERP) per antenna. In the US and several other countries, FCC Part 15.247 in the 902–928 MHz band permits 1 W of conducted power and up to 4 W EIRP with an antenna up to 6 dBi — approximately 3 dB higher than the European norm due to the ERP ↔ EIRP conversion (EIRP = ERP + 2.15 dB). These distinctions are critical during procurement: an FCC-certified reader cannot operate at maximum power on an EU site. The air interface protocol is standardised as ISO/IEC 18000-63:2021 (Gen2 Type C).

By power class, readers fall into three groups. The first uses an external 24 V DC source with an individual power supply; typical conducted power is 30 dBm (1 W) per port. The second is industrial PoE+ (IEEE 802.3at), delivering 30 W at the PSE and 25.5 W at the PD: this is sufficient for 4 ports at 33 dBm, accounting for an 85% efficiency rate. The third is PoE++ (IEEE 802.3bt): Type 3 (60 W PSE / 51 W PD) and Type 4 (90 W PSE / 71 W PD), designed for edge readers with built-in data processing and an OPC UA server. PoE Class 0 (802.3af, 15.4 W / 12.95 W) is insufficient for industrial 4-port UHF readers: four ports at 33 dBm with real-world efficiency require 18–22 W.

## Management Protocols and Synchronisation

The lower management layer is governed by LLRP v1.1 (Low Level Reader Protocol by GS1), which standardises operations over slots, antennas, and EPC-based filtering. LLRP is essential when multiple readers must operate as a unified reader network with a shared slot plan — without it, Dense Reader Mode (DRM) degrades into chaotic collisions. The upper layer comprises MQTT for event publishing and REST API for configuration; OPC UA (IEC 62541) serves as the standard bridge to MES/SCADA systems. For business-level events, the GS1 EPCIS 2.0 standard is utilised.

Time synchronisation is not "cosmetic". NTP provides a typical error margin of 1–10 ms; for anti-collision in DRM, for phase-based localisation (PDoA/AoA) on an antenna array, and for coordinated TDMA polling of dense portal networks, this is far too coarse. IEEE 1588 PTP with hardware timestamping ensures <1 μs accuracy and is mandatory if more than 8 readers operate in the network with multiple antennas on the same frequency. The RAIN RFID Alliance recommends PTP for "warehouse/production" tier networks, reserving NTP solely for monitoring. A common design flaw: a reader connected to an NTP network with 5 ms jitter on a fast conveyor generates up to 5% duplicate events — forcing the middleware to filter them and sacrificing throughput.

## Deployment Scenarios (Anonymised)

### Scenario A: External 24 V DC Power Supply

A production line deploys 24 readers with 4 ports each, powered by external 24 V DC power supplies. Management is via REST API, synchronisation via NTP. At peak load (30 dBm × 4 ports), accounting for amplifier and processor efficiency, each reader draws ~14–16 W per port during multiplexing. This overloads cheap, unmanaged 24 V power supplies lacking inrush current headroom — causing two or three readers per shift to shut down via thermal protection. Events arrive with up to 4 ms of jitter; the WMS records 4–6% duplicates and 1.8% missed reads during sorting.

### Scenario B: Industrial PoE+ and PTP

The same line transitions to 24 industrial readers powered by PoE+ (802.3at, 30 W PSE / 25.5 W PD), utilising LLRP v1.1, PTP synchronisation, and OPC UA integration for MES. PoE+ eliminates external power supplies and overheating, PTP stabilises slots in DRM, and OPC UA publishes events directly to SCADA. Jitter drops to <50 μs, duplicates fall to 0.2%, and missed reads drop to 0.3%.

## Comparative Matrix

| Criterion | Entry-level 24 V DC | Industrial PoE+ | Industrial PoE++ / Edge |
|---|---|---|---|
| Conducted Power | up to 30 dBm (1 W) | up to 33 dBm (2 W) | up to 33 dBm (2 W) |
| Radiated Power | 2 W ERP / 4 W EIRP | 2 W ERP / 4 W EIRP | 2 W ERP / 4 W EIRP |
| Power Supply | External 24 V PSU | IEEE 802.3at (30/25.5 W) | IEEE 802.3bt (60/51 or 90/71 W) |
| Protocols | REST API | LLRP + MQTT + REST | LLRP + MQTT + OPC UA + REST |
| Synchronisation | NTP | NTP + IEEE 1588 PTP | IEEE 1588 PTP + edge processing |
| Operating Temperature | 0 … +50 °C | −20 … +55 °C | −30 … +60 °C |
| Cost per Port | ≈ 380 € | ≈ 620 € | ≈ 1 100 € |

## 5-Year TCO and ROI

All figures are presented in EUR (€).

| Cost Item | Scenario A (24 V DC) | Scenario B (PoE+) |
|---|---|---|
| Readers (24 units) | 380 € × 24 = 9 120 € | 620 € × 24 = 14 880 € |
| 24 V PSUs / PoE+ Switches | 24 × 25 € + cabling 2 640 € = 3 240 € | PoE+ Switches 2 × 1 400 € = 2 800 € |
| Installation and Configuration | 1 200 € | 1 800 € (including PTP and OPC UA) |
| Electricity | 420 €/year × 5 = 2 100 € | 504 €/year × 5 = 2 520 € |
| Downtime due to Failures | 2 400 €/year × 5 = 12 000 € | 240 €/year × 5 = 1 200 € |
| Manual Reconfiguration | 800 €/year × 5 = 4 000 € | 150 €/year × 5 = 750 € |
| PSU Replacement / Maintenance | (100 + 400) €/year × 5 = 2 500 € | 300 €/year × 5 = 1 500 € |
| **Total 5-Year TCO** | **34 160 €** | **25 450 €** |

The additional CAPEX for Scenario B is 5 920 € (19 480 € versus 13 560 €). Annual OPEX savings amount to 2 926 €/year. Payback Period (months) = Additional CAPEX / Annual OPEX Savings × 12 = 5 920 € / 2 926 €/year × 12 ≈ 24.3 months. Over 5 years, the net savings after deducting the additional CAPEX total 8 710 €, representing a 25.5% reduction relative to Scenario A's TCO. The primary savings stem from the elimination of downtime and reduced manual reconfiguration, not from the reader unit price itself.

## Conclusions and Outlook

The classification of an industrial UHF reader is determined not by "wattage", but by a combination of four parameters: PoE class (af for 1–2 ports; at for 4 ports at 33 dBm; bt for edge processing), management protocols (LLRP v1.1 for the network, MQTT for events, OPC UA for MES, EPCIS 2.0 for the business layer), synchronisation (NTP is insufficient above 8 readers — IEEE 1588 PTP is required), and the distinction between conducted power (30/33 dBm) and radiated power (2 W ERP / 4 W EIRP). In the coming years, with the rise of edge processing and the implementation of Digital Product Passports (ESPR), the role of industrial PoE++ and PTP will only grow.

## FAQ

### Why is PoE 802.3af insufficient for a 4-port UHF reader?

802.3af provides 15.4 W at the PSE and 12.95 W at the PD after cable losses. Four ports at 33 dBm (2 W) with 85% efficiency require 18–22 W. Insufficient power leads to transmitter throttling and unstable anti-collision. PoE+ (802.3at, 30/25.5 W) or PoE++ (802.3bt, 60/51 or 90/71 W) is required.

### What is the difference between conducted and radiated power (ERP/EIRP)?

Conducted power is the power at the antenna port before the cable: up to 33 dBm (2 W) in the EU, and up to 30 dBm (1 W) under FCC rules. Radiated power is the product of conducted power and antenna gain: 2 W ERP (33 dBm ERP) in the EU, and 4 W EIRP (36 dBm EIRP) under FCC rules. The ratio is: EIRP = ERP + 2.15 dB.

### Why is IEEE 1588 PTP needed if NTP exists?

NTP introduces 1–10 ms of jitter. For anti-collision in Dense Reader Mode, for phase-based localisation (PDoA/AoA), and for coordinated TDMA polling of dense portal networks, this is too coarse: on fast conveyors, NTP jitter generates 4–6% duplicate events. PTP with hardware timestamping provides <1 μs accuracy, making it mandatory for networks with >8 readers.

### How does LLRP v1.1 differ from REST API in an industrial network?

REST API is intended for configuration and CRUD operations. LLRP v1.1 provides low-level control over slots, antennas, and filtering, which is mandatory when multiple readers must operate as a unified reader network with a shared slot plan. Without LLRP, Dense Reader Mode degrades into chaotic collisions.

---

**Author:** Yurii Kasian, Principal RFID Engineer · RFID Ukraine · **Updated:** 20 November 2026
