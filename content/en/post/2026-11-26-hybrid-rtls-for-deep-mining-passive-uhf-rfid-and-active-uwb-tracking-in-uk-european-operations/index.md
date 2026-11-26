---
title: "Hybrid RTLS for Deep Mining: Passive UHF RFID and Active UWB Tracking in
  UK & European Operations"
slug: hybrid-rtls-for-deep-mining-passive-uhf-rfid-and-active-uwb-tracking-in-uk
description: "Technical analysis of hybrid real-time location systems for UK
  deep-level potash and polyhalite mines: passive UHF RFID (ISO/IEC
  18000-63:2021) at shaft stations and crusher dumps, active HRP UWB (IEEE
  802.15.4z-2020, 500 MHz bandwidth, 2 ns resolution) on mobile machines, WLS
  trilateration and Bayesian RFID fusion, Ofcom IR 2030, UKEX/ATEX Group I,
  Mines Regulations 2014, and 5-year TCO in GBP for 1,200 assets / 18 km of
  drifts."
date: 2026-06-08T22:00:00.000Z
image: industrial_rfid_in_extreme_environments-1_4.jpg
categories:
  - RFID Solutions
tags:
  - Underground Mining
  - Hybrid RTLS
  - UWB
  - Passive UHF RFID
  - UKEX/ATEX
  - Mines Regulations 2014
translationKey: rtls-hybrid-mining-underground
---
In UK deep-level potash and polyhalite mines, European hard-rock underground mining operations, and tunnelling projects, real-time location systems (RTLS) face a radio environment that is fundamentally different from surface logistics. At depths of 1,000–1,500 m, the surrounding rock (granite, polyhalite) has a relative permittivity of ε<sub>r</sub> ≈ 4–6 and a conductivity of σ ≈ 10<sup>−4</sup> S/m, while irregular drift walls create multipath reflections with differential delays of 50–300 ns. Narrowband systems such as Wi-Fi (20 MHz) and Bluetooth Low Energy (2 MHz) suffer from frequency-selective fading and non-line-of-sight (NLOS) bias of 3–15 m, which is unacceptable for personnel safety and fleet dispatch. Ultra-wideband (UWB) according to IEEE 802.15.4z-2020, with a 500 MHz bandwidth and a time-domain resolution of approximately 2 ns, separates the direct path from reflections and achieves 10–30 cm accuracy. This guide explains the propagation physics, the mathematical fusion model, the UK regulatory and safety framework (Ofcom IR 2030, UKEX/ATEX Group I, Mines Regulations 2014), and a five-year TCO/ROI analysis in GBP £ for a mine with 1,200 tagged assets and 120 heavy machines across 18 km of drifts.

## Multipath Propagation in Hard-Rock Drifts: Why Wi-Fi/BLE RSSI Fails and UWB ToF/TDoA Succeeds

The underground drift is a dielectric waveguide with irregular walls. At 2.4 GHz (Wi-Fi/BLE), the 20 MHz and 2 MHz channels are narrow relative to the delay spread of 50–300 ns, so the received signal exhibits frequency-selective fading: some subcarriers fall into deep nulls while others remain strong. RSSI-based ranging therefore produces errors of 3–15 m under NLOS conditions. UWB with 500 MHz bandwidth has a time-domain resolution of about 2 ns, which is much shorter than the delay spread, so the direct path can be separated from reflections. Two-Way Ranging (ToF) and Time-Difference-of-Arrival (TDoA) are the two standard UWB ranging methods; TDoA requires the anchors to be synchronised to better than 1 ns, which is achieved through IEEE 1588-2019 Precision Time Protocol (PTP) over the mine's fibre backbone.

## Mathematical Model: Weighted Least Squares UWB Trilateration & Bayesian RFID Fusion

The UWB ranging measurements are fused into a position estimate using a linearised Weighted Least Squares (WLS) estimator. For a set of anchor ranges, the spherical equations are linearised and solved as **p̂ = (A<sup>T</sup> W A)<sup>−1</sup> A<sup>T</sup> W b**, where the weight matrix W assigns higher confidence to anchors with higher signal-to-noise ratio and lower estimated NLOS probability. The UWB position is then fused with the identification confidence from passive UHF RFID portals using a Bayesian update: each portal transit provides a discrete observation of the asset's identity, which resets the identification probability to near unity and corrects any accumulated drift in the UWB-only track. An Extended Kalman Filter (EKF) combines the UWB position, the RFID identification events, and inertial measurement unit (IMU) data from the mobile machines to produce a continuous, smoothed trajectory.

## Hybrid Architecture, UK Radio Compliance & ATEX/UKEX Safety

The hybrid architecture combines two complementary radio technologies. **Passive UHF RFID** (ISO/IEC 18000-63:2021) operates at 865–868 MHz under Ofcom UK IR 2030 and ETSI EN 302 208 V3.4.1, with a maximum radiated power of 2 W ERP (33 dBm ERP) and four 200 kHz channels in Dense Reader Mode. The protocol uses Q = 5–6 (32–64 slots) for the 20–50 assets that may be present at a shaft station or crusher dump, Miller M=4 modulation for multipath robustness, and Session S2 persistence to avoid re-reading already-identified assets. The tags are encapsulated in IP68/IP69K-rated On-Metal housings (£3.50–£6.00 each) because paper labels do not survive on mining equipment, metal wagons, or ore skips.

**Active HRP UWB** (IEEE 802.15.4z-2020) operates in the 6.5–8.5 GHz band under Ofcom IR 2030 and ETSI EN 302 065-1, with a mean e.i.r.p. spectral density limit of −41.3 dBm/MHz. UWB tags are fitted to LHD loaders, drill rigs, and underground locomotives, providing 10–30 cm position updates. The UWB anchors are mounted at 2.5–3.5 m height with 30–50 m spacing along the drifts and synchronised via IEEE 1588 PTP. All equipment deployed in the underground workings must be certified to **UKEX / ATEX Group I, Category M1 or M2** (IEC 60079-0), which covers equipment intended for mines susceptible to firedamp and/or combustible dust. The system also supports the statutory requirements of the **UK Mines Regulations 2014 (SI 2014/3248)**, including the record of persons below ground and the ability to alert personnel entering a hazardous zone within 2 seconds. Communication redundancy is provided by a fibre backbone plus leaky-feeder radio coverage in the production areas.

## 5-Year TCO & ROI Analysis in GBP £ (1,200 Assets, 120 Machines, 18 km of Drifts)

| Cost item (5 years) | Option A: Active UWB on all assets | Option B: Hybrid passive UHF + selective UWB |
|---|---|---|
| Tags / trackers | £151,800 (1,320 UWB tags × £115) | £33,150 (1,200 passive tags × £4.50 + 5%/year + 120 UWB trackers × £115) |
| Infrastructure (anchors / portals) | £216,000 (450 UWB anchors × £480) | £244,800 (380 UWB anchors × £480 + 24 UHF portals × £2,600) |
| Battery replacement / maintenance | £270,880 (3 replacement cycles + £32,000/year service) | £26,400 (battery service for 120 UWB trackers + passive tag replenishment) |
| Software, integration & annual service | £0 | £88,000 (£18,000 EPCIS 2.0 integration + £14,000/year × 5 years) |
| **Total TCO (5 years)** | **£638,680** | **£392,350** |

The net saving is £246,330 over five years, a 38.6% reduction in TCO. The additional capital investment in the hybrid architecture is recovered in approximately 24 months, while the mine achieves full compliance with the UK Mines Regulations 2014 and a localisation accuracy of 10–30 cm for mobile machines and sub-metre accuracy for personnel at portal choke points. All asset events are streamed to the mine management and HSE platform via GS1 EPCIS 2.0.

## Conclusion & 2026-2027 Outlook: Autonomous Underground Mining, GS1 EPCIS 2.0 and ESPR

The direction of UK and European underground mining is toward autonomous dispatch, real-time personnel tracking, and condition-based maintenance of heavy equipment. The hybrid RTLS architecture described here—passive UHF RFID at choke points and active UWB on mobile machines—provides the location and identification data that these systems require, within the strict limits of Ofcom IR 2030, UKEX/ATEX Group I, and the Mines Regulations 2014. GS1 EPCIS 2.0 provides the standard event interface for integrating the telemetry into mine management and HSE platforms, and it aligns with the Digital Product Passport requirements that will emerge from ESPR (EU) 2024/1781 for industrial equipment. Facilities that adopt this architecture today will meet the 2026–2027 regulatory and operational requirements without the cost and disruption of retrofitting later.

## Frequently Asked Questions (FAQ)

### Why does Wi-Fi RSSI fail in underground drifts?

The 20 MHz Wi-Fi channel is narrow relative to the 50–300 ns delay spread of the underground channel, which causes frequency-selective fading: some subcarriers are in deep nulls while others are strong. RSSI is an aggregate power measurement, so it cannot distinguish the direct path from reflected paths. NLOS conditions bias the range estimate by 3–15 m. UWB's 500 MHz bandwidth provides 2 ns time resolution, which resolves the direct path and enables accurate ToF or TDoA ranging.

### Why is UWB anchor synchronisation critical for TDoA?

TDoA computes position from the difference in arrival time at multiple anchors. A timing error of 1 ns corresponds to a distance error of approximately 30 cm. To achieve 10–30 cm accuracy, the anchors must be synchronised to better than 1 ns. IEEE 1588-2019 Precision Time Protocol (PTP) over the mine's fibre network provides sub-nanosecond synchronisation, which is why it is the recommended timing backbone for underground UWB TDoA systems.

### Why can't paper RFID labels be used on mining equipment?

Mining equipment, metal wagons, and ore skips are subject to abrasion, high-pressure washdown, and mechanical shock. A paper label at £0.12 disintegrates within days. The correct solution is an encapsulated On-Metal transponder rated to IP68/IP69K, with a cost of £3.50–£6.00 per unit. These tags are designed to survive the mechanical and environmental conditions of underground mining and to maintain reliable RF performance on metal surfaces.

### What UK safety regulations apply to underground tracking systems?

The Mines Regulations 2014 (SI 2014/3248) require the mine operator to keep a record of every person below ground and to provide suitable communication and signalling. Equipment used in potentially explosive atmospheres must be certified to UKEX / ATEX Group I, Category M1 or M2. The tracking system described here is designed to meet both the statutory record-keeping requirements and the equipment certification requirements for underground use.

**Author:** Yurii Kasian, Principal RFID Engineer · RFID Ukraine · Updated: 15 November 2026
