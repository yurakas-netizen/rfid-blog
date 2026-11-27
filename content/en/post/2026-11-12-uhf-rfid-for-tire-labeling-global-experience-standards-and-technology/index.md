---
title: "UHF RFID for Tire Labeling: Global Experience, Standards and Technology"
slug: uhf-rfid-for-tire-labeling-global-experience-standards-and-technology
description: "Technical analysis of UHF RFID (ISO/IEC 18000-63) in the tire industry: vulcanized vs. tread tags, ISO 20909–20912 durability standards, ASTM D8331-21 testing, SGTIN-96 serialization, TPMS coexistence, and EU ESPR compliance for 2026–2027."
date: 2026-11-12T22:00:00.000Z
image: Image01_2.webp
categories:
  - RFID Технологии
tags:
  - ISO 20909
  - ASTM D8331
  - SGTIN-96
translationKey: uhf-rfid-tire-labeling-global-standards
---
The use of Ultra-High Frequency (UHF) RFID tags in the tire industry is a mature response to the complex challenges of global supply chains. The technology allows for unique identification of each tire, from the production stage to disposal, creating its digital twin. What began as an experimental approach is now becoming an industry standard for traceability, anti-counterfeiting, and automated logistics: the tag is either vulcanized into the tire's construction at the factory or applied as a tread label for warehouse and dealer operations, and the data it carries is anchored in a standards framework that spans ISO, ASTM, GS1, UNECE and the GDSO industry consortium.

## Implementation Context

UHF RFID in the tire industry responds to the realities of global supply chains: millions of SKUs moving across factories, ports, distribution centres, dealer networks, and fleets, with regulatory obligations that follow every unit to the moment of disposal. The tag gives each tire a permanent digital identity that survives manufacturing, storage, mounting, retreading, and end-of-life processing.

## Technological and Engineering Aspects

Integrating the tag into the tire's construction is the critical engineering step. Two deployment models dominate, and they are not interchangeable: the embedded (vulcanized) tag becomes part of the tire itself, while the tread label is a temporary identity used before the tire is mounted on a vehicle.

### Two Tag Architectures Compared

| Parameter | Embedded / Vulcanized Tag | Tread Label Tag |
| :--- | :--- | :--- |
| **Placement** | Inside the tire carcass / sidewall during manufacturing | Applied to the tread surface after curing |
| **Antenna type** | Spring spiral antenna, mechanically decoupled from tire deformation | Standard label antenna with high-tack rubber adhesive |
| **Thermal tolerance** | +160 …+200 °C vulcanization cycle, plus millions of rolling-deformation cycles | Warehouse and dealer environment only; removed before mounting |
| **Read range** | 2 –4 m (through rubber and steel-cord layers) | 4 –6 m |
| **Primary use case** | Lifetime traceability, retreading, EPR compliance, digital twin | Warehouse, dealer, and fleet logistics before the tire is mounted |

### UHF Versus HF and TPMS Bands

The UHF band (860–960 MHz) offers clear operational advantages over HF (13.56 MHz) for tire identification: a read range of several metres, high inventory speed, and simultaneous multi-tag reading, which is what makes portal-based warehouse and dealer operations practical. It is also distinct from TPMS sensor bands — 433 MHz / 315 MHz or 2.4 GHz BLE — because TPMS is a pressure-measurement subsystem, while RFID carries the tire's identity. The two coexist in the same wheel without radio conflict when each is engineered for its own frequency plan and duty cycle.

## International Standards and Regulations

Implementation is impossible without unified standards that ensure equipment and data compatibility worldwide. The tire RFID ecosystem is governed by a stack of standards that covers tag placement, data encoding, durability testing, and regulatory reporting.

### The ISO 20909–20912 Series

The ISO 20909, ISO 20910, ISO 20911 and ISO 20912 series defines requirements for the placement, data encoding, and durability of RFID tags for tires across the full lifecycle. Durability of the embedded tag itself is validated under ASTM D8331-21, which specifies the mechanical and thermal test regime for tags that must survive vulcanization and millions of rolling cycles.

### Radio Interface and Data Encoding

The UHF air interface is governed by ISO/IEC 18000-63 with the EPC Gen2v2 specification, and the RAIN RFID Alliance publishes industry guidance for tire tagging within that framework. Tire identities follow the GS1 EPC Tag Data Standard, with SGTIN-96 providing item-level serialization so that every individual tire carries a globally unique identifier.

### European Regulation in 2026–2027

The simplified claim that «RFID is mandatory for all tires in Europe» is not accurate. What is actually happening is more structured. UNECE Regulation No. 117 sets the tire certification regime, and EU Regulation 2020/740 governs tire labelling. On top of these, the ISO 20909–20912 series and the GDSO industry consortium are building a unified digital ecosystem for tire manufacturers, with particular focus on the commercial vehicle segments C2 and C3 and on retreading. This ecosystem prepares the industry for the EU digital product passports under the Ecodesign for Sustainable Products Regulation (EU ESPR) in 2026–2027, where a tire's identity, composition, and end-of-life route must be auditable through digital records.

## Areas of Application in Global Practice

*   **Production and quality control.** On the assembly line, the tag links the physical tire to its production data (date, shift, parameters). This allows automatic rejection of non-conforming products and precise record-keeping. Michelin, Bridgestone, Continental, and Pirelli have all moved beyond pilots into volume deployment of vulcanized RFID tags.
*   **Logistics and warehousing.** Loading and unloading entire truckloads of tires takes minutes instead of hours. The system knows exactly which model and size is on each pallet and at which point in the supply chain. Stationary portal readers from Impinj and Zebra Technologies, paired with handheld terminals, handle the read zones at gate lanes and dealer warehouses.
*   **Dealer centres and service stations.** Receiving and inventorying tires at the warehouse happens automatically as the pallet passes through an RFID gate. Manual entry errors are eliminated, and the same tag data flows into the dealer's inventory system without re-keying.
*   **Anti-counterfeiting.** A unique, cryptographically secured digital identifier makes forgery economically unviable and easily detectable when the tire passes through any instrumented check point.
*   **Ecology and disposal.** At the disposal stage, RFID enables tire verification, confirmation of origin, and proper routing for recycling, which is the technical foundation for extended producer responsibility (EPR) compliance.

## Engineering Notes on Embedded Hardware

The embedded tag is not a standard label with a rubber coating. Its antenna is a spring spiral designed to survive both the thermal shock of vulcanization at +160…+200 °C and the mechanical deformation of millions of rolling cycles. Specialised tire-RFID transponders of this type are produced by Hana Technologies, Murata, and Avery Dennison on RAIN RFID silicon. The trade-off for this robustness is read range: the tag sits behind rubber and steel-cord layers, so the practical read distance is 2–4 m, versus 4–6 m for a tread label that is read in open warehouse air.

## Conclusions and Prospects

Global experience demonstrates that RFID tire labelling is an infrastructure project requiring cooperation between manufacturers, technology suppliers, logistics companies, and regulators. The main driver is not isolated efficiency but the synergistic effect for the entire industry: from transparency in raw-material supply to responsible disposal. The technology is becoming the foundation for digital services such as tread-wear monitoring or automatic insurance-claim processing, and for the EU digital product passport regime that will require every tire to carry a verifiable identity from factory to end-of-life.

## Frequently Asked Questions

**Does the tag survive vulcanization at +160…+200 °C and high-speed operation?**
Yes, when the tag is engineered for it. Embedded tags are built with a spring spiral antenna that mechanically decouples from the surrounding rubber, and they are validated under ASTM D8331-21 to survive the vulcanization cycle at +160…+200 °C plus millions of rolling-deformation cycles at road speeds. A standard label tag would not survive either condition.

**What is the difference between embedded and tread label tags?**
Embedded (vulcanized) tags are placed inside the tire carcass or sidewall during manufacturing and stay with the tire for its entire life, with a read range of 2–4 m through rubber and steel cord. Tread label tags are applied to the tread surface with a high-tack rubber adhesive and are used in warehouse and dealer logistics before the tire is mounted, with a read range of 4–6 m. The two models serve different stages of the lifecycle and are usually deployed together.

**Is RFID compatible with TPMS on the same wheel?**
Yes. UHF RFID operates in the 860–960 MHz band (ISO/IEC 18000-63), while TPMS sensors typically operate at 433 MHz / 315 MHz or use 2.4 GHz BLE. The two systems use different frequency plans and duty cycles and can coexist in the same wheel without radio conflict.

**What role does RFID play in retreading and EPR disposal?**
The embedded tag persists through the retreading process, so the identity and history of a tire remain verifiable across multiple lifecycles. At disposal, that same identity confirms origin and routes the tire to the correct recycling stream, which is the technical basis for extended producer responsibility (EPR) compliance under ISO 20909–20912 and the EU digital product passport framework.
