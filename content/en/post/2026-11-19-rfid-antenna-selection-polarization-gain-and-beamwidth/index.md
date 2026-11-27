---
title: "RFID Antenna Selection: Polarization, Gain, and Beamwidth"
slug: rfid-antenna-selection-polarization-gain-and-beamwidth
description: "Technical breakdown of RFID antenna selection: gain, polarization, beamwidth, VSWR/axial ratio, ETSI EN 302 208 and FCC Part 15.247 limits, deployment scenarios, and a 5-year TCO model in EUR."
date: 2026-11-19T22:00:00.000Z
image: Image01_1.webp
categories:
  - Архитектура RFID-систем
tags:
  - RFID-антенны
  - поляризация
  - усиление
  - диаграмма направленности
  - ETSI EN 302 208
  - VSWR
translationKey: rfid-antenna-polarization-gain-beamwidth
---
Choosing an RFID antenna often comes down to a formal comparison of "gain in dBi" and "price per unit". In practice, it is the antenna that determines the physical ceiling of the entire system: even with an ideal reader and the right tags, an error in polarization or radiation pattern can reduce the probability of detection from 99% to 70%. In this article — the fourth of 14 topics in the "RFID System Architecture" hub — we analyse four key parameters (gain, polarization, radiation pattern, VSWR/axial ratio), the regulatory limits of ETSI EN 302 208 and FCC Part 15.247, two anonymized deployment scenarios, and a 5-year TCO model in EUR.

## Regulatory framework and power budget

In Europe, UHF RFID operates in the 865–868 MHz band under ETSI EN 302 208 with a maximum radiated power of 2 W ERP (33 dBm ERP) per antenna. In the US, FCC Part 15.247 allows 1 W conducted power and up to 4 W EIRP (36 dBm EIRP) in the 902–928 MHz band. The 3 dB difference between ERP and EIRP (EIRP = ERP + 2.15 dB) is critical when purchasing: an antenna with 9 dBi gain certified for FCC cannot operate at full power in an EU project. The air interface protocol is ISO/IEC 18000-63:2021 (Gen2 Type C).

## Four parameters that determine the outcome

**Gain.** An antenna with 9 dBi gain "reaches" further, but its beam is narrower (typically 65°) than a 6 dBi antenna (around 90°). In an open warehouse, a narrow beam creates "blind spots" between racks; in a narrow portal, however, a narrow beam concentrates energy exactly where it is needed. Rule of thumb: 5–6 dBi for open zones, 8–9 dBi for portals and conveyors, 2–4 dBi for near-field (close-proximity) reading.

**Polarization.** Linear polarization provides greater range and a sharper beam, but only reads tags whose antennas are parallel to the wave plane. Circular polarization (RHCP/LHCP) reduces range by about 3 dB, but is independent of tag orientation — critical for goods on a pallet where tags are rotated randomly. The RAIN RFID Alliance recommends circular polarization for all scenarios where tag orientation is not rigidly fixed.

**Radiation pattern.** The −3 dB beamwidth determines the coverage area. A portal on a conveyor needs a narrow pattern in the vertical plane to avoid reading adjacent lines; a receiving area needs a wide pattern to cover the entire site without "dead zones". VSWR and axial ratio are secondary but important: a VSWR above 2.0 means mismatch and power loss; an axial ratio above 3 dB means ellipticity, at which circular polarization degrades to linear.

## Deployment scenarios (anonymized)

### Scenario A (wrong choice): narrow-beam linear antennas 9 dBi

A logistics warehouse with randomly oriented boxes installs four linear antennas with 9 dBi gain and a 65° beamwidth. Because of the narrow beam, "blind spots" form between the racks, and linear polarization fails to read tags rotated by 90°. Detection probability drops to 86–88%, resulting in 2 hours of downtime per month and 1 hour of manual checking per week. Attempting to compensate by increasing power hits the ETSI limit of 2 W ERP.

### Scenario B (engineering-correct choice): wide-beam circular antennas 6 dBi

The same warehouse switches to four circularly polarized antennas with 6 dBi gain (90° beamwidth). The wide beam evenly covers the receiving area, and circular polarization (RHCP/LHCP) reads tags in any orientation. Detection probability rises to 99.8%, cutting downtime by 10× and eliminating the need for manual checks. Although the antennas cost 160 € more, the savings on downtime and manual labour pay back the difference in less than a month.

## Comparison matrix

| Parameter | Linear 6 dBi | Linear 9 dBi | Circular 6 dBi | Circular 8.5 dBi |
|---|---|---|---|---|
| Beamwidth (−3 dB) | ~90° | ~65° | ~90° | ~65° |
| Relative range | ×1.0 | ×1.4 | ×0.7 | ×1.0 (but 3 dB below linear) |
| Tag orientation sensitivity | High | High | Low | Low |
| Typical price (EUR) | 120–180 € | 180–250 € | 200–300 € | 250–400 € |

## 5-Year TCO and ROI

All amounts in EUR (€).

| Item (5 years) | Scenario A (linear 9 dBi) | Scenario B (circular 6 dBi) |
|---|---|---|
| Antennas (4 units) | 4 × 220 € = 880 € | 4 × 260 € = 1 040 € |
| Cables and installation | 400 € | 400 € |
| Downtime due to misses (2 h/mo × 200 €/h) | 2 h × 200 € × 12 mo × 5 yrs = 24 000 € | 0.2 h × 200 € × 12 mo × 5 yrs = 2 400 € |
| Manual checking (1 h/wk × 25 €/h) | 1 h × 25 € × 52 wks × 5 yrs = 6 500 € | 0.2 h × 25 € × 52 wks × 5 yrs = 1 300 € |
| **Total 5-year TCO** | **31 780 €** | **5 140 €** |

The additional CAPEX for Scenario B is 160 € (1 440 € vs 1 280 €). Annual OPEX savings: (24 000 − 2 400)/5 + (6 500 − 1 300)/5 = 4 320 + 1 040 = 5 360 €/year. Payback = 160 € / 5 360 €/year × 12 ≈ 0.36 months. Over 5 years, net savings after deducting the additional CAPEX amount to 26 640 €, or 84% of Scenario A's TCO. The key takeaway: circular polarization pays back almost instantly by reducing downtime, even if the antenna price is higher.

## Conclusions and outlook

The antenna is not an "accessory" but the element that determines the line's budget and the probability of detection. Gain, polarization and beamwidth must be chosen for the geometry of the zone, not on the principle of "the more dBi, the better". In open warehouses, circular polarization at 6 dBi usually delivers a better overall result than linear 9 dBi due to robustness against
