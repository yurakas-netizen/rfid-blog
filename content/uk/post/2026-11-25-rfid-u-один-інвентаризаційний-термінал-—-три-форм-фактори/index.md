---
title: "RFID-U: один інвентаризаційний термінал — три форм-фактори"
slug: rfid-u-odin-inventarizatsiyniy-terminal-tri-form-faktori
description: "Технічний розбір RFID-U v1.4: одна база і один PWA-код на трьох
  форм-факторах, офлайн-режим, WebSocket-міст до UHF RFID, GDPR та 5-річний TCO
  в EUR."
date: 2026-11-25T15:33:00.000Z
categories:
  - rfid-u
tags:
  - RFID-U
  - PWA інвентаризація
  - UHF RFID
  - WebSocket міст
translationKey: rfid-u-web-app
---


{{< rawhtml >}}
<div class="rfid-u-article" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; color: #1e293b; line-height: 1.7;">
  <div style="max-width: 1120px; margin: 0 auto;">
    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; font-family: monospace; font-size: 13px; font-weight: 600;">
      <span style="padding: 4px 12px; border-radius: 999px; background: #e0f2fe; border: 1px solid #38bdf8; color: #0e7490;">v1.4 · Multi-Tenant PWA</span>
      <span style="padding: 4px 12px; border-radius: 999px; background: #e0f2fe; border: 1px solid #38bdf8; color: #0e7490;">UHF EPC-Gen2 · HID Wedge · Camera</span>
      <span style="padding: 4px 12px; border-radius: 999px; background: #e0f2fe; border: 1px solid #38bdf8; color: #0e7490;">Offline-first · Service Worker</span>
      <span style="padding: 4px 12px; border-radius: 999px; background: #ffedd5; border: 1px solid #f97316; color: #c2410c;">UA / EN / DA / DE / FR / RU</span>
    </div>

    <h2 style="font-size: 2rem; font-weight: 800; line-height: 1.2; color: #0f172a; margin: 0 0 14px;">RFID-U: один інвентаризаційний термінал — три форм-фактори</h2>
    <p style="max-width: 860px; font-size: 1.12rem; color: #475569; margin: 0 0 28px;">Технічний розбір PWA-інвентаризації ТМЦ, пломб і активів: одна база, один API і один код без змін працюють на ПК, смартфоні та планшеті.</p>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-bottom: 32px;">
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; padding: 16px;">
        <div style="font-family: monospace; font-size: 12px; color: #64748b; text-transform: uppercase;">Форм-факторів</div>
        <div style="font-size: 1.8rem; font-weight: 800; color: #0f172a; margin: 4px 0;">3</div>
        <div style="font-size: 0.92rem; color: #475569;">ПК · Смартфон · Планшет</div>
      </div>
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; padding: 16px;">
        <div style="font-family: monospace; font-size: 12px; color: #64748b; text-transform: uppercase;">Інсталяцій</div>
        <div style="font-size: 1.8rem; font-weight: 800; color: #0f172a; margin: 4px 0;">0</div>
        <div style="font-size: 0.92rem; color: #475569;">PWA через HTTPS-посилання</div>
      </div>
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; padding: 16px;">
        <div style="font-family: monospace; font-size: 12px; color: #64748b; text-transform: uppercase;">Мови інтерфейсу</div>
        <div style="font-size: 1.8rem; font-weight: 800; color: #0f172a; margin: 4px 0;">6</div>
        <div style="font-size: 0.92rem; color: #475569;">UA · EN · DA · DE · FR · RU</div>
      </div>
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; padding: 16px;">
        <div style="font-family: monospace; font-size: 12px; color: #64748b; text-transform: uppercase;">Зниження TCO</div>
        <div style="font-size: 1.8rem; font-weight: 800; color: #0f172a; margin: 4px 0;">≈ 79 %</div>
        <div style="font-size: 0.92rem; color: #475569;">проти виділених ТЗД</div>
      </div>
    </div>

    <h2 style="font-size: 1.45rem; font-weight: 700; color: #0f172a; border-left: 4px solid #0e7490; padding: 8px 14px; background: #f8fafc; margin: 28px 0 12px;">Що таке RFID-U і яке завдання вирішує</h2>
    <p><strong>RFID-U v1.4</strong> — кросплатформний PWA-термінал інвентаризації ТМЦ, основних засобів, обладнання та пломб. Працює як офлайн-інструмент і як клієнт до ізольованої бази компанії з експортом у GS1 EPCIS 2.0, XLSX, CSV, JSON і Markdown.</p>
    <p>Архітектура спирається на <strong>Service Worker</strong> для офлайн-черги, локальний або мережевий <strong>WebSocket-міст</strong> (за замовчуванням порт <code>5084</code>) для роботи з UHF RFID-зчитувачами по LLRP v1.1 в діапазоні 865–868 МГц (ISO/IEC 18000-63, ETSI EN 302 208) та синхронізацією часу за IEEE 1588 PTP.</p>

    <h2 style="font-size: 1.45rem; font-weight: 700; color: #0f172a; border-left: 4px solid #0e7490; padding: 8px 14px; background: #f8fafc; margin: 28px 0 12px;">Форм-фактори та інтерактивний стенд</h2>
    <p>Один і той самий PWA-додаток адаптується під робочу станцію, смартфон (камера 1D/2D/QR і Geiger-пошук за RSSI) та планшет у горизонтальній або вертикальній орієнтації.</p>

    <div style="margin: 20px auto; max-width: 860px; overflow-x: auto;">
      <div style="width: 860px; height: 540px; border: 12px solid #1e293b; border-radius: 14px; background: #0b1120; overflow: hidden;">
        <iframe style="width: 1280px; height: 800px; transform: scale(0.65); transform-origin: top left; border: 0; display: block;" allow="camera; clipboard-write; clipboard-read; fullscreen" title="RFID-U — Термінал" loading="lazy" src="https://rfid-u.netlify.app"></iframe>
      </div>
      <p style="text-align: center; font-size: 0.95rem; color: #64748b; margin-top: 8px;">
        Відкрити стенд окремо: <a href="https://rfid-u.netlify.app" style="color: #0e7490; font-weight: 600;" rel="noopener noreferrer" target="_blank">rfid-u.netlify.app →</a>
      </p>
    </div>

    <h2 style="font-size: 1.45rem; font-weight: 700; color: #0f172a; border-left: 4px solid #0e7490; padding: 8px 14px; background: #f8fafc; margin: 28px 0 12px;">TCO і ROI на 5 років (25 користувачів, EUR)</h2>
    <table style="width: 100%; border-collapse: collapse; margin: 16px 0 24px; font-size: 1rem;">
      <thead>
        <tr style="background: #0e7490; color: #ffffff; text-align: left;">
          <th style="padding: 12px; border: 1px solid #cbd5e1;">Стаття витрат (5 років)</th>
          <th style="padding: 12px; border: 1px solid #cbd5e1;">Варіант A: виділені ТЗД</th>
          <th style="padding: 12px; border: 1px solid #cbd5e1;">Варіант B: RFID-U PWA</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 10px 12px; border: 1px solid #cbd5e1; font-weight: 600;">Термінали / ТЗД</td>
          <td style="padding: 10px 12px; border: 1px solid #cbd5e1;">25 ТЗД × 1 200 € = 30 000 €</td>
          <td style="padding: 10px 12px; border: 1px solid #cbd5e1;">5 ТЗД для жорстких умов = 6 000 €</td>
        </tr>
        <tr style="background: #f8fafc;">
          <td style="padding: 10px 12px; border: 1px solid #cbd5e1; font-weight: 600;">10 UHF RFID-мостів + антени</td>
          <td style="padding: 10px 12px; border: 1px solid #cbd5e1;">8 000 €</td>
          <td style="padding: 10px 12px; border: 1px solid #cbd5e1;">4 000 €</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; border: 1px solid #cbd5e1; font-weight: 600;">Ліцензії / підписка (25 місць × 5 років)</td>
          <td style="padding: 10px 12px; border: 1px solid #cbd5e1;">50 000 €</td>
          <td style="padding: 10px 12px; border: 1px solid #cbd5e1;">10 000 €</td>
        </tr>
        <tr style="background: #f8fafc;">
          <td style="padding: 10px 12px; border: 1px solid #cbd5e1; font-weight: 600;">Сервіс та навчання</td>
          <td style="padding: 10px 12px; border: 1px solid #cbd5e1;">23 750 € (18 750 € сервіс + 5 000 € навчання)</td>
          <td style="padding: 10px 12px; border: 1px solid #cbd5e1;">3 000 € (сервіс у підписці + 3 000 € навчання)</td>
        </tr>
        <tr style="background: #e2e8f0; font-weight: 700;">
          <td style="padding: 12px; border: 1px solid #cbd5e1;">Разом TCO за 5 років</td>
          <td style="padding: 12px; border: 1px solid #cbd5e1;">111 750 €</td>
          <td style="padding: 12px; border: 1px solid #cbd5e1;">23 000 € (економія 88 750 € / 79,4 %)</td>
        </tr>
      </tbody>
    </table>

    <h2 style="font-size: 1.45rem; font-weight: 700; color: #0f172a; border-left: 4px solid #0e7490; padding: 8px 14px; background: #f8fafc; margin: 28px 0 12px;">FAQ</h2>
    <h3 style="font-size: 1.15rem; font-weight: 700; margin: 18px 0 6px;">Чому PWA, а не нативний додаток на Android/iOS?</h3>
    <p>Миттєві оновлення без модерації магазинів, єдина кодова база для всіх форм-факторів і офлайн-робота через Service Worker без необхідності встановлювати окремі пакети.</p>
    <h3 style="font-size: 1.15rem; font-weight: 700; margin: 18px 0 6px;">Як влаштована ізоляція даних та офлайн-синхронізація?</h3>
    <p>Авторизація через Google OAuth 2.0, ізоляція тенантів на рівні серверних правил, локальне кешування в браузері при втраті зв'язку та автоматична синхронізація черги з серверною міткою часу після відновлення мережі.</p>

    <p style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 0.95rem; color: #475569;">
      <strong>Автор:</strong> Юрій Касьян, Головний RFID-інженер · RFID Ukraine · Оновлено: 16 листопада 2026
    </p>
  </div>
</div>
{{< /rawhtml >}}
