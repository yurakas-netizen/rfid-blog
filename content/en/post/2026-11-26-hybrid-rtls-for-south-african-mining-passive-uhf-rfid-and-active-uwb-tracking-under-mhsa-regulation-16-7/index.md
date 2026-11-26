---
title: "Hybrid RTLS for South African Mining: Passive UHF RFID and Active UWB
  Tracking under MHSA Regulation 16.7"
slug: hybrid-rtls-for-south-african-mining-passive-uhf-rfid-and-active-uwb-tracking
description: "Technical analysis of hybrid real-time location systems for South
  African deep-level and surface mines under MHSA Regulation 16.7 (2025 Chapter
  16 amendment): passive UHF RFID (ISO/IEC 18000-63:2021) at choke points,
  active HRP UWB (IEEE 802.15.4z-2020) on mobile machines and personnel, WLS
  with Huber estimation, Bayesian RFID fusion, ICASA spectrum regulations, SANS
  10108/SANS 60079, and 5-year TCO in ZAR for 1,200 assets / 120 machines."
date: 2026-06-08T22:00:00.000Z
image: industry_4.0_identification-5_4.jpg
categories:
  - RFID Solutions
tags:
  - MHSA Regulation 16.7
  - SANS 10108
  - Hybrid RTLS
  - UWB
  - South African Mining
  - ICASA
translationKey: rtls-hybrid-mining-south-africa
---
In South African deep-level gold, platinum, and chromium mines, as well as surface iron-ore and manganese operations, the tracking of underground personnel, heavy mobile machinery, and high-value assets has moved from an operational convenience to a statutory obligation. The 2025 amendment to Chapter 16 of the Mine Health and Safety Act (MHSA) Regulations introduces Regulation 16.7, which requires that no person may go underground without an approved, intrinsically safe tracking device capable of identifying their last known location, and that employers must provide locating devices capable of determining precise position where risk assessments indicate a serious risk of employees going missing. The radio environment is equally demanding: narrowband Wi-Fi and BLE systems fail in the presence of conductive dust, irregular stope geometry, and dense metallic infrastructure, producing non-line-of-sight (NLOS) bias that makes them unsuitable for a Missing Person Locator System. This guide presents a hybrid architecture that combines passive UHF RFID (ISO/IEC 18000-63:2021) at fixed choke points with active HRP UWB (IEEE 802.15.4z-2020) on mobile machines and personnel, operating within the South African regulatory framework of ICASA spectrum regulations, SANS 10108, and the SANS 60079 series for explosive atmospheres. A five-year TCO/ROI analysis in South African rand (ZAR) is provided for a 1,200-asset, 120-machine operation.

## RF Propagation in Deep-Level and Dust-Laden Environments: Why UWB First Path Detection Succeeds

South African underground workings present two distinct propagation regimes. In deep-level gold and platinum mines, the rock mass is highly reflective, and the irregular stope geometry creates multipath delay spreads of 50–300 ns. At 2.4 GHz (Wi-Fi/BLE), the 20 MHz and 2 MHz channels are narrow relative to this delay spread, so the received signal exhibits frequency-selective fading. RSSI-based ranging under these conditions produces NLOS bias of 3–15 m, which is unacceptable for a system that must locate a missing worker within the response time required by emergency procedures. In surface iron-ore and manganese operations, airborne haematite and magnetite dust attenuates and scatters RF energy, compounding the problem.

HRP UWB according to IEEE 802.15.4z-2020 occupies a bandwidth of 500 MHz, providing a time-domain resolution of approximately 2 ns. This is much shorter than the delay spread, so the direct path can be separated from reflections using First Path Detection (FPD). FPD identifies the leading edge of the channel impulse response, rejecting later multipath components and reducing NLOS bias to below 30 cm in dusty and confined environments. The UWB anchors are synchronised via IEEE 1588-2019 Precision Time Protocol (PTP) over the mine's fibre backbone, achieving the sub-nanosecond timing alignment required for Time-Difference-of-Arrival (TDoA) positioning.

## Mathematical Model: Weighted Least Squares, Huber Estimation & Bayesian Fusion

The UWB ranging measurements are fused into a position estimate using a linearised Weighted Least Squares (WLS) estimator. For a set of anchor ranges, the spherical equations are linearised and solved as **p̂ = (A<sup>T</sup> W A)<sup>−1</sup> A<sup>T</sup> W b**, where the weight matrix W assigns higher confidence to anchors with higher signal-to-noise ratio and lower estimated NLOS probability. To suppress residual NLOS outliers, a Huber estimator is applied as a robust cost function, limiting the influence of gross errors on the final position solution.

The UWB position is then fused with the identification confidence from passive UHF RFID portals using a Bayesian update: each portal transit provides a discrete observation of the asset's identity, resetting the identification probability to near unity and correcting any accumulated drift in the UWB-only track. An Extended Kalman Filter (EKF) combines the UWB position, the RFID identification events, and inertial measurement unit (IMU) data from mobile machines to produce a continuous, smoothed trajectory. This fused estimate is what the Missing Person Locator System uses to report the last known location of a worker who fails to check out.

## Hybrid Architecture, ICASA Spectrum Compliance & SANS 10108 Safety

**Passive UHF RFID** (ISO/IEC 18000-63:2021) in South Africa operates under ICASA regulations. The 865–868 MHz band is allocated for RFID with a maximum radiated power of 100 mW ERP, 200 kHz channel spacing, and mandatory Listen Before Talk (LBT) to prevent interference with other short-range devices. The protocol uses Q = 5–6 (32–64 slots) for the 20–50 assets at shaft stations and crusher tips, Miller M=4 modulation for multipath robustness, and Session S2 persistence to avoid re-reading already-identified assets. Tags are encapsulated in IP68/IP69K-rated On-Metal housings (R70–R120 each) because paper labels do not survive on mining equipment, metal wagons, or ore skips.

**Active HRP UWB** (IEEE 802.15.4z-2020) operates in South Africa under ICASA's UWB provisions, which permit operation in the 3.1–10.6 GHz range with a maximum mean power spectral density of −41.3 dBm/MHz. UWB tags are fitted to load-haul-dump machines, drill rigs, and underground locomotives, providing 10–30 cm position updates. The UWB anchors are mounted at 2.5–3.5 m height with 30–50 m spacing and synchronised via IEEE 1588 PTP. All equipment deployed in underground workings must comply with **SANS 10108** for the classification of hazardous locations and the selection of explosion-protected apparatus, with equipment certification following the **SANS 60079 series** (equivalent to IEC 60079). The system also supports the statutory requirements of **MHSA Regulation 16.7** for a Missing Person Locator System and the Level 9 collision-avoidance provisions for trackless mobile machinery.

## 5-Year TCO & ROI Analysis in ZAR (1,200 Assets, 120 Machines)

| Cost item (5 years) | Option A: Active UWB on all assets | Option B: Hybrid passive UHF + selective UWB |
|---|---|---|
| Tags / trackers | R2,508,000 (1,320 UWB tags × R1,900) | R513,000 (1,200 passive tags × R70 + 5%/year + 120 UWB trackers × R1,900) |
| Infrastructure (anchors / portals) | R3,420,000 (450 UWB anchors × R7,600) | R3,012,000 (380 UWB anchors × R7,600 + 24 UHF portals × R23,000) |
| Battery replacement / maintenance | R2,850,000 (3 replacement cycles + R380,000/year service) | R427,500 (battery service for 120 UWB trackers + passive tag replenishment) |
| Software, integration & annual service | R0 | R950,000 (R180,000 EPCIS 2.0 integration + R154,000/year × 5 years) |
| **Total TCO (5 years)** | **R8,778,000** | **R4,902,500** |

The net saving is R3,875,500 over five years, a 44.1% reduction in TCO. The additional capital investment in the hybrid architecture is recovered in approximately 21 months, while the mine achieves compliance with MHSA Regulation 16.7 and a localisation accuracy of 10–30 cm for mobile machines and sub-metre accuracy for personnel at portal choke points. All asset events are streamed to the mine management and safety platform via GS1 EPCIS 2.0.

## Conclusion & 2026–2027 Outlook: MHSA 16.7, GS1 EPCIS 2.0 and Autonomous Mining

The regulatory direction in South African mining is toward enforceable, technology-agnostic performance requirements. MHSA Regulation 16.7 does not prescribe a specific technology; it requires that the mine be able to determine a missing worker's last known location, and that the device be intrinsically safe. The hybrid architecture described here—passive UHF RFID at choke points and active UWB on mobile machines and personnel—meets that requirement within the ICASA spectrum limits and the SANS 10108 / SANS 60079 explosion-protection framework. GS1 EPCIS 2.0 provides the standard event interface for integrating telemetry into mine management and safety platforms, and it aligns with the digital lifecycle data expectations that are emerging globally for industrial equipment. Operations that adopt this architecture today will meet the 2026–2027 enforcement expectations without the cost and disruption of retrofitting later.

## Frequently Asked Questions (FAQ)

### Why does UWB outperform Wi-Fi RSSI in deep-level and dusty South African mines?

The 500 MHz bandwidth of HRP UWB provides 2 ns time resolution, which is much shorter than the 50–300 ns delay spread caused by stope geometry and metallic infrastructure. First Path Detection identifies the leading edge of the channel impulse response, rejecting later multipath and reducing NLOS bias to below 30 cm. Wi-Fi's 20 MHz channel cannot resolve these paths, so RSSI ranging is biased by 3–15 m in the same environment.

### Why is IEEE 1588 PTP critical for UWB TDoA in mining?

TDoA computes position from the difference in arrival time at multiple anchors. A timing error of 1 ns corresponds to a distance error of approximately 30 cm. To achieve 10–30 cm accuracy, the anchors must be synchronised to better than 1 ns. IEEE 1588-2019 PTP over the mine's fibre network provides sub-nanosecond synchronisation, which is why it is the recommended timing backbone for TDoA systems in mining.

### Why can't paper RFID labels be used on mining equipment?

Mining equipment, metal wagons, and ore skips are subject to abrasion, high-pressure washdown, and mechanical shock. A paper label at R2 disintegrates within days. The correct solution is an encapsulated On-Metal transponder rated to IP68/IP69K, with a cost of R70–R120 per unit. These tags are designed to survive the mechanical and environmental conditions of South African mining and to maintain reliable RF performance on metal surfaces.

### What South African regulations apply to underground tracking systems?

MHSA Regulation 16.7 (introduced by the 2025 amendment to Chapter 16) requires that no person go underground without an approved, intrinsically safe tracking device capable of identifying their last known location. Equipment used in hazardous locations must be selected in accordance with SANS 10108 and certified to the SANS 60079 series. The system described here is designed to meet both the missing-person locator requirement and the explosion-protection requirements for underground use.

**Author:** Yurii Kasian, Principal RFID Engineer · RFID Ukraine · Updated: 15 November 2026
