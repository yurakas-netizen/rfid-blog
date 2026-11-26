---
title: "Hybrid RTLS for Surface Mining: Passive UHF RFID and Active UWB Tracking
  in UK & European Operations"
slug: hybrid-rtls-for-surface-mining-passive-uhf-rfid-and-active-uwb-tracking-in-uk
description: "Technical analysis of hybrid real-time location systems for UK
  open-pit mines and ore processing plants: passive UHF RFID (ISO/IEC
  18000-63:2021) at choke points, active HRP UWB (IEEE 802.15.4z-2020, 500 MHz
  bandwidth, 2 ns resolution) on mobile machines, Weighted Least Squares with
  Huber estimation, Bayesian RFID fusion, Ofcom IR 2030, ISO 17757:2019,
  Quarries Regulations 1999, UKEX/ATEX Zone 21/22 and 5-year TCO in GBP for
  1,200 assets / 120 machines."
date: 2026-06-08T22:00:00.000Z
image: industrial_rfid_in_extreme_environments-3_4.jpg
categories:
  - RFID Solutions
tags:
  - Surface Mining
  - Hybrid RTLS
  - UWB
  - ISO 17757
  - Quarries Regulations 1999
  - UKEX/ATEX
translationKey: rtls-hybrid-mining-surface-open-pit
---
In UK and European open-pit mines, ore processing plants, and mineral terminals, the tracking of heavy mobile equipment, personnel, and high-value assets has become a regulatory and operational necessity. The environment is uniquely hostile to radio localisation: airborne haematite and magnetite dust attenuates UHF and UWB signals, dense metallic structures create severe multipath, and diesel-powered machinery generates broadband electromagnetic noise. Narrowband systems such as Wi-Fi and BLE fail under these conditions, with NLOS bias exceeding 10 m in dust-laden pits. This guide presents a hybrid architecture that combines passive UHF RFID (ISO/IEC 18000-63:2021) at fixed choke points with active HRP UWB (IEEE 802.15.4z-2020) on mobile machines, operating within the UK regulatory framework of Ofcom IR 2030, ETSI EN 302 208, ETSI EN 302 065-1, ISO 17757:2019, the Quarries Regulations 1999, and UKEX/ATEX Zone 21/22 requirements. A five-year TCO/ROI analysis in GBP £ for a 1,200-asset, 120-machine operation demonstrates a 38.6% reduction in total cost of ownership compared with an active-only deployment.

## RF Propagation in Dust-Laden Open-Pit Environments: Why UWB First Path Detection Succeeds

Airborne dust in haematite and magnetite mines consists of fine conductive particles that absorb and scatter RF energy. At 2.4 GHz (Wi-Fi/BLE), the 20 MHz and 2 MHz channels are narrow relative to the delay spread of 50–300 ns caused by pit walls and metallic structures, resulting in frequency-selective fading. RSSI-based ranging under these conditions produces NLOS bias of 3–15 m, which is unacceptable for collision avoidance and exclusion-zone enforcement under the Quarries Regulations 1999.

HRP UWB according to IEEE 802.15.4z-2020 occupies a 500 MHz bandwidth in the 6.5–8.5 GHz band, providing a time-domain resolution of approximately 2 ns. This is much shorter than the delay spread, so the direct path can be separated from reflections using First Path Detection (FPD). FPD identifies the leading edge of the channel impulse response, rejecting later multipath components and reducing NLOS bias to below 30 cm in dust-laden environments. The UWB anchors are synchronised via IEEE 1588-2019 Precision Time Protocol (PTP) over the site fibre backbone, achieving sub-nanosecond timing alignment required for TDoA positioning.

## Mathematical Model: Weighted Least Squares, Huber Estimation & Bayesian Fusion

The UWB ranging measurements are fused into a position estimate using a linearised Weighted Least Squares (WLS) estimator. For a set of anchor ranges, the spherical equations are linearised and solved as **p̂ = (A<sup>T</sup> W A)<sup>−1</sup> A<sup>T</sup> W b**, where the weight matrix W assigns higher confidence to anchors with higher signal-to-noise ratio and lower estimated NLOS probability. To further suppress residual NLOS outliers, a Huber estimator is applied as a robust cost function, which limits the influence of gross errors on the final position solution.

The UWB position is then fused with the identification confidence from passive UHF RFID portals using a Bayesian update: each portal transit provides a discrete observation of the asset's identity, resetting the identification probability to near unity and correcting any accumulated drift in the UWB-only track. An Extended Kalman Filter (EKF) combines the UWB position, the RFID identification events, and inertial measurement unit (IMU) data from the mobile machines to produce a continuous, smoothed trajectory. GNSS is used where available to bound the solution in open-pit areas.

## Hybrid Architecture, UK Radio Compliance & ATEX/UKEX Safety

**Passive UHF RFID** (ISO/IEC 18000-63:2021) operates at 865–868 MHz under Ofcom UK IR 2030 and ETSI EN 302 208 V3.4.1, with a maximum radiated power of 2 W ERP (33 dBm ERP). The protocol uses Q = 5–6 (32–64 slots) for 20–50 assets at choke points, Miller M=4 modulation for multipath robustness, and Session S2 persistence to avoid re-reading. Tags are encapsulated in IP68/IP69K-rated On-Metal housings (£3.50–£6.00 each) because paper labels do not survive on mining equipment, metal wagons, or ore skips.

**Active HRP UWB** (IEEE 802.15.4z-2020) operates in the 6.5–8.5 GHz band under Ofcom IR 2030 and ETSI EN 302 065-1, with a mean e.i.r.p. spectral density limit of −41.3 dBm/MHz. UWB tags are fitted to heavy loaders, drill rigs, and haul trucks, providing 10–30 cm position updates. The UWB anchors are mounted at 2.5–3.5 m height with 30–50 m spacing and synchronised via IEEE 1588 PTP. All equipment deployed in hazardous areas must be certified to **UKEX / ATEX Zone 21/22** (IEC 60079-0), covering equipment for dust-laden atmospheres. The system supports the statutory requirements of the **Quarries Regulations 1999 (SI 1999/2024)** and **ISO 17757:2019** for autonomous machine safety.

## 5-Year TCO & ROI Analysis in GBP £ (1,200 Assets, 120 Machines)

| Cost item (5 years) | Option A: Active UWB on all assets | Option B: Hybrid passive UHF + selective UWB |
|---|---|---|
| Tags / trackers | £151,800 (1,320 UWB tags × £115) | £33,150 (1,200 passive tags × £4.50 + 5%/year + 120 UWB trackers × £115) |
| Infrastructure (anchors / portals) | £216,000 (450 UWB anchors × £480) | £244,800 (380 UWB anchors × £480 + 24 UHF portals × £2,600) |
| Battery replacement / maintenance | £270,880 (3 replacement cycles + £32,000/year service) | £26,400 (battery service for 120 UWB trackers + passive tag replenishment) |
| Software, integration & annual service | £0 | £88,000 (£18,000 EPCIS 2.0 integration + £14,000/year × 5 years) |
| **Total TCO (5 years)** | **£638,680** | **£392,350** |

The net saving is £246,330 over five years, a 38.6% reduction in TCO. The additional capital investment in the hybrid architecture is recovered in approximately 24 months, while the site achieves full compliance with the Quarries Regulations 1999 and localisation accuracy of 10–30 cm for mobile machines. All asset events are streamed to the mine management and HSE platform via GS1 EPCIS 2.0.

## Conclusion & 2026-2027 Outlook: Autonomous Mining, GS1 EPCIS 2.0 and ESPR

The direction of UK and European surface mining is toward autonomous haulage, real-time personnel tracking, and condition-based maintenance. The hybrid architecture described here—passive UHF RFID at choke points and active UWB on mobile machines—provides the location and identification data that these systems require, within the limits of Ofcom IR 2030, UKEX/ATEX Zone 21/22, ISO 17757:2019, and the Quarries Regulations 1999. GS1 EPCIS 2.0 provides the standard event interface for integrating telemetry into mine management and HSE platforms, and it aligns with the Digital Product Passport requirements that will emerge from ESPR (EU) 2024/1781 for industrial equipment. Sites that adopt this architecture today will meet the 2026–2027 regulatory and operational requirements without the cost and disruption of retrofitting later.

## Frequently Asked Questions (FAQ)

### Why does UWB outperform Wi-Fi RSSI in dusty open-pit mines?

The 500 MHz bandwidth of HRP UWB provides 2 ns time resolution, which is much shorter than the 50–300 ns delay spread caused by pit walls and machinery. First Path Detection identifies the leading edge of the channel impulse response, rejecting later multipath and reducing NLOS bias to below 30 cm. Wi-Fi's 20 MHz channel cannot resolve these paths, so RSSI ranging is biased by 3–15 m in the same environment.

### Why is IEEE 1588 PTP critical for UWB TDoA in mining?

TDoA computes position from the difference in arrival time at multiple anchors. A timing error of 1 ns corresponds to a distance error of approximately 30 cm. To achieve 10–30 cm accuracy, the anchors must be synchronised to better than 1 ns. IEEE 1588-2019 PTP over the site fibre network provides sub-nanosecond synchronisation, which is why it is the recommended timing backbone for TDoA systems in mining.

### Why can't paper RFID labels be used on mining equipment?

Mining equipment, metal wagons, and ore skips are subject to abrasion, high-pressure washdown, and mechanical shock. A paper label at £0.12 disintegrates within days. The correct solution is an encapsulated On-Metal transponder rated to IP68/IP69K, with a cost of £3.50–£6.00 per unit. These tags are designed to survive the mechanical and environmental conditions of surface mining and to maintain reliable RF performance on metal surfaces.

### What UK safety regulations apply to autonomous mining equipment?

The Quarries Regulations 1999 (SI 1999/2024) require the operator to control vehicle movements, define exclusion zones, and maintain suitable communication. ISO 17757:2019 specifies safety requirements for autonomous and semi-autonomous machine systems. Equipment used in dusty hazardous areas must be certified to UKEX/ATEX Zone 21/22. The hybrid RTLS described here supports compliance with all three frameworks.

**Author:** Yurii Kasian, Principal RFID Engineer · RFID Ukraine · Updated: 15 November 2026
