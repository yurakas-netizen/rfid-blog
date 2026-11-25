---
title: "RFID-U: один інвентаризаційний термінал — три форм-фактори"
slug: rfid-u-odin-inventarizatsiyniy-terminal-tri-form-faktori
date: 2026-11-24T14:28:00.000Z
categories:
  - Програмне забезпечення
translationKey: rfid-u-web
---


{{< rawhtml >}}
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; color: #1e293b; line-height: 1.75;"><!-- HERO SECTION -->
<div style="max-width: 1120px; margin: 0 auto;">
<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;"><span style="display: inline-block; padding: 5px 14px; border-radius: 999px; background: #e0f2fe; border: 1px solid #38bdf8; font-family: 'SFMono-Regular', Consolas, monospace; font-size: 13px; font-weight: 600; color: #0e7490;">v1.4 &middot; Multi-Tenant PWA</span> <span style="display: inline-block; padding: 5px 14px; border-radius: 999px; background: #e0f2fe; border: 1px solid #38bdf8; font-family: 'SFMono-Regular', Consolas, monospace; font-size: 13px; font-weight: 600; color: #0e7490;">UHF EPC-Gen2 &middot; HID Wedge &middot; Camera</span> <span style="display: inline-block; padding: 5px 14px; border-radius: 999px; background: #e0f2fe; border: 1px solid #38bdf8; font-family: 'SFMono-Regular', Consolas, monospace; font-size: 13px; font-weight: 600; color: #0e7490;">Offline-first &middot; Service Worker</span> <span style="display: inline-block; padding: 5px 14px; border-radius: 999px; background: #ffedd5; border: 1px solid #f97316; font-family: 'SFMono-Regular', Consolas, monospace; font-size: 13px; font-weight: 600; color: #c2410c;">UA / EN / DA / DE / FR / RU</span></div>

<div style="margin: 0 0 18px; font-size: clamp(2rem, 4.2vw, 2.8rem); font-weight: 800; line-height: 1.15; letter-spacing: -0.02em; color: #0f172a;">RFID-U: один інвентаризаційний термінал &mdash; три форм-фактори</div>
<p style="max-width: 860px; font-size: 1.18rem; line-height: 1.75; color: #475569; margin: 0 0 36px;">Технічний розбір PWA-інвентаризації ТМЦ, пломб і активів. Показано, як одна база, один API і один код без змін працюють на робочій станції, смартфоні та планшеті &mdash; і кожна з трьох форм закриває своє польове завдання.</p>
<!-- KPI CARDS -->
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
<div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 20px;">
<div style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 12px; font-weight: 600; color: #64748b; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 8px;">Форм-факторів</div>
<div style="font-size: 2rem; font-weight: 800; color: #0f172a; line-height: 1;">3</div>
<div style="font-size: 0.95rem; color: #475569; margin-top: 8px;">ПК &middot; Смартфон &middot; Планшет</div>
</div>
<div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 20px;">
<div style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 12px; font-weight: 600; color: #64748b; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 8px;">Інсталяцій</div>
<div style="font-size: 2rem; font-weight: 800; color: #0f172a; line-height: 1;">0</div>
<div style="font-size: 0.95rem; color: #475569; margin-top: 8px;">PWA через HTTPS-посилання</div>
</div>
<div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 20px;">
<div style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 12px; font-weight: 600; color: #64748b; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 8px;">Мови інтерфейсу</div>
<div style="font-size: 2rem; font-weight: 800; color: #0f172a; line-height: 1;">6</div>
<div style="font-size: 0.95rem; color: #475569; margin-top: 8px;">UA &middot; EN &middot; DA &middot; DE &middot; FR &middot; RU</div>
</div>
<div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 20px;">
<div style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 12px; font-weight: 600; color: #64748b; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 8px;">Зниження TCO</div>
<div style="font-size: 2rem; font-weight: 800; color: #0f172a; line-height: 1;">&asymp; 79 %</div>
<div style="font-size: 0.95rem; color: #475569; margin-top: 8px;">проти виділених ТЗД</div>
</div>
</div>
</div>
<!-- SECTION 1 -->
<h2 style="font-size: 1.6rem; font-weight: bold; color: #0f172a; background: #f8fafc; border-left: 4px solid #0e7490; padding: 12px 18px; border-radius: 0 6px 6px 0; margin: 2.5rem 0 1.2rem;">Що таке RFID-U і яке завдання вирішує</h2>
<p style="font-size: 1.18rem; margin: 0 0 16px; color: #1e293b;"><strong>RFID-U v1.4</strong> &mdash; кросплатформний PWA-термінал інвентаризації, який закриває облік ТМЦ, основних засобів, обладнання та охоронних пломб на об'єктах будь-якої інфраструктури: офіси, склади, будмайданчики, виробництво, логістика та сервісні виїзди. Продукт не є &laquo;ще одним ТЗД-клієнтом&raquo; &mdash; це веб-додаток, який працює і як самостійний офлайн-інструмент, і як корпоративний клієнт до ізольованої бази даних компанії.</p>
<p style="font-size: 1.18rem; margin: 0 0 16px; color: #1e293b;">В основі архітектури лежать три технологічні рівні. Перший &mdash; <strong>Service Worker</strong> і кеш браузера, які забезпечують повноцінну роботу при втраті інтернету.<a href="#ref-5" style="color: #0e7490; font-weight: 600; text-decoration: none;"><sup>&#91;5&#93;</sup></a> Другий &mdash; <strong>локальний або мережевий WebSocket-міст</strong> до апаратних UHF RFID-зчитувачів, оскільки браузер не має доступу до сирого TCP/LLRP.<a href="#ref-6" style="color: #0e7490; font-weight: 600; text-decoration: none;"><sup>&#91;6&#93;</sup></a><a href="#ref-4" style="color: #0e7490; font-weight: 600; text-decoration: none;"><sup>&#91;4&#93;</sup></a> Третій &mdash; <strong>серверна ізоляція</strong> між компаніями та події GS1 EPCIS 2.0 для передачі даних в облікові системи.<a href="#ref-3" style="color: #0e7490; font-weight: 600; text-decoration: none;"><sup>&#91;3&#93;</sup></a> Вхід через <strong>Google OAuth 2.0</strong>,<a href="#ref-7" style="color: #0e7490; font-weight: 600; text-decoration: none;"><sup>&#91;7&#93;</sup></a> зберігання в Google Cloud з DPA-угодою,<a href="#ref-10" style="color: #0e7490; font-weight: 600; text-decoration: none;"><sup>&#91;10&#93;</sup></a> відповідність GDPR<a href="#ref-8" style="color: #0e7490; font-weight: 600; text-decoration: none;"><sup>&#91;8&#93;</sup></a>.</p>
<p style="font-size: 1.18rem; margin: 0 0 16px; color: #1e293b;">З боку повітряного інтерфейсу система працює з пасивними UHF-мітками стандарту ISO/IEC 18000-63:2021 (Gen2 Type C) в європейському спектрі 865&ndash;868 МГц за ETSI EN 302 208.<a href="#ref-1" style="color: #0e7490; font-weight: 600; text-decoration: none;"><sup>&#91;1&#93;</sup></a><a href="#ref-2" style="color: #0e7490; font-weight: 600; text-decoration: none;"><sup>&#91;2&#93;</sup></a> У мості до зчитувача застосовується точна синхронізація часу за IEEE 1588 PTP &mdash; інакше мультипортальна мережа втрачає стабільність на стику слотів і збільшує дублювання подій.<a href="#ref-9" style="color: #0e7490; font-weight: 600; text-decoration: none;"><sup>&#91;9&#93;</sup></a></p>
<!-- SECTION 2 -->
<h2 style="font-size: 1.6rem; font-weight: bold; color: #0f172a; background: #f8fafc; border-left: 4px solid #0e7490; padding: 12px 18px; border-radius: 0 6px 6px 0; margin: 2.5rem 0 1.2rem;">Форм-фактори: один код, одна база, різні режими роботи</h2>
<p style="font-size: 1.18rem; margin: 0 0 16px; color: #1e293b;">Нижче &mdash; чотири вікна одного і того ж додатка, відкритих на різних ширинах екрана. Жодних нативних збірок, жодних інсталяційних пакетів: та ж сама база даних, той самий API, той самий інтерфейс, але кожна ширина рендерить своє розташування. Інженеру важливо бачити цю різницю, щоб вибрати правильний інструмент під кожну ділянку роботи.</p>
<!-- PC -->
<h3 style="font-size: 1.25rem; font-weight: bold; color: #1e293b; margin: 32px 0 14px;">Робоча станція (ПК) &mdash; режим диспетчера</h3>
<p style="font-size: 1.18rem; margin: 0 0 16px; color: #1e293b;">Робоче місце комірника, бригадира або диспетчера &mdash; на великому екрані. Тут виконуються всі операції, які не можна комфортно зробити з телефона: імпорт довідника ТМЦ з 1С/Excel (включаючи <code style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 0.88em; padding: 2px 7px; border-radius: 5px; background: #e0f2fe; color: #0e7490;">Ctrl+V</code> вставку таблиць цілком), робота з 500+ позиціями без втрати контексту в таблиці, фінальна верифікація документа і підготовка акта. Екран 1080&ndash;1920 px відкриває одночасно 9 модулів, поле &laquo;п'ять прапорців стану картки&raquo; (<code style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 0.88em; padding: 2px 7px; border-radius: 5px; background: #e0f2fe; color: #0e7490;">s1&ndash;s5</code>) і повний набір реквізитів. Основні аксесуари &mdash; клавіатура, миша і можливість <strong>drag &amp; drop</strong> файлів у блок імпорту.</p>
<!-- DESKTOP MOCKUP (1280x800 scaled to 0.65, height adjusted) -->
<div style="margin: 28px auto; display: flex; justify-content: center; padding: 10px 0; overflow-x: auto;">
<div style="width: 860px; height: 560px; box-sizing: border-box; flex-shrink: 0;">
<div style="width: 100%; height: 100%; border: 14px solid #1e293b; border-radius: 16px; box-shadow: 0 24px 48px rgba(15,23,42,0.2); background: #0b1120; overflow: hidden; box-sizing: border-box;"><iframe style="width: 1280px; height: 800px; transform: scale(0.65); transform-origin: top left; border: 0; display: block;" allow="camera; clipboard-write; clipboard-read; fullscreen; autoplay" title="RFID-U &mdash; Десктопний термінал" loading="lazy" src="https://rfid-u.netlify.app"></iframe></div>
</div>
</div>
<p style="text-align: center; font-size: 1rem; color: #64748b; margin-top: -8px; margin-bottom: 24px;">Відкрити повну версію: <a href="https://rfid-u.netlify.app" style="color: #0e7490; font-weight: 600; text-decoration: none; border-bottom: 1px dashed #0e7490; padding-bottom: 2px;" rel="noopener noreferrer" target="_blank">rfid-u.netlify.app &rarr;</a></p>
<!-- PHONE -->
<h3 style="font-size: 1.25rem; font-weight: bold; color: #1e293b; margin: 32px 0 14px;">Смартфон &mdash; режим польового термінала</h3>
<p style="font-size: 1.18rem; margin: 0 0 16px; color: #1e293b;">Android або iPhone в руці інвентаризатора &mdash; найчастіша форма використання. Камера смартфона стає <strong>скануючим сканером 1D/2D-штрихкодів і QR-пломб</strong>, а екран &mdash; <strong>Geiger-індикатором</strong> для пошуку конкретної RFID-мітки за рівнем сигналу RSSI (дБм) і звуковим супроводом. Всі дані кешуються локально через Service Worker, тому при обриві LTE або Wi-Fi інвентаризація не зупиняється: події складаються в офлайн-чергу і йдуть на сервер при першій можливості. Екран смартфона 390&ndash;430 px гарантує роботу однією рукою і в рукавичках.</p>
<!-- PHONE MOCKUP (390x872 scaled to 1.0, height increased to avoid navbar cut) -->
<div style="margin: 28px auto; display: flex; justify-content: center; padding: 10px 0; overflow-x: auto;">
<div style="width: 414px; height: 912px; box-sizing: border-box; flex-shrink: 0;">
<div style="width: 100%; height: 100%; border: 12px solid #1e293b; border-radius: 36px; box-shadow: 0 24px 48px rgba(15,23,42,0.2); background: #0b1120; overflow: hidden; box-sizing: border-box;"><iframe style="width: 390px; height: 872px; transform: scale(1); transform-origin: top left; border: 0; display: block;" allow="camera; clipboard-write; clipboard-read; fullscreen; autoplay; geolocation" title="RFID-U &mdash; Смартфон" loading="lazy" src="https://rfid-u.netlify.app"></iframe></div>
</div>
</div>
<p style="text-align: center; font-size: 1rem; color: #64748b; margin-top: -8px; margin-bottom: 24px;">Відкрити на телефоні: <a href="https://rfid-u.netlify.app" style="color: #0e7490; font-weight: 600; text-decoration: none; border-bottom: 1px dashed #0e7490; padding-bottom: 2px;" rel="noopener noreferrer" target="_blank">rfid-u.netlify.app &rarr;</a></p>
<!-- TABLET LANDSCAPE -->
<h3 style="font-size: 1.25rem; font-weight: bold; color: #1e293b; margin: 32px 0 14px;">Планшет (горизонтальний) &mdash; режим аудиту</h3>
<p style="font-size: 1.18rem; margin: 0 0 16px; color: #1e293b;">Планшет 10&ndash;11 дюймів у горизонтальній орієнтації &mdash; ідеальний компроміс для роботи на виїзді та в цеху. Широкий екран вміщає весь рядок з 10+ атрибутів картки об'єкта і дозволяє демонструвати акт приймання замовнику без скролінгу. Введення &mdash; палець, стилус, камера або HID-сканер через USB-C. Технічно це той самий PWA без встановлення і з тим самим офлайн-кешем.</p>
<!-- TABLET LANDSCAPE MOCKUP (1024x768 scaled to 0.7, height adjusted) -->
<div style="margin: 28px auto; display: flex; justify-content: center; padding: 10px 0; overflow-x: auto;">
<div style="width: 745px; height: 596px; box-sizing: border-box; flex-shrink: 0;">
<div style="width: 100%; height: 100%; border: 14px solid #1e293b; border-radius: 20px; box-shadow: 0 24px 48px rgba(15,23,42,0.2); background: #0b1120; overflow: hidden; box-sizing: border-box;"><iframe style="width: 1024px; height: 768px; transform: scale(0.7); transform-origin: top left; border: 0; display: block;" allow="camera; clipboard-write; clipboard-read; fullscreen; autoplay" title="RFID-U &mdash; Планшет горизонтальний" loading="lazy" src="https://rfid-u.netlify.app"></iframe></div>
</div>
</div>
<p style="text-align: center; font-size: 1rem; color: #64748b; margin-top: -8px; margin-bottom: 24px;">Відкрити в горизонтальному розташуванні: <a href="https://rfid-u.netlify.app" style="color: #0e7490; font-weight: 600; text-decoration: none; border-bottom: 1px dashed #0e7490; padding-bottom: 2px;" rel="noopener noreferrer" target="_blank">rfid-u.netlify.app &rarr;</a></p>
<!-- TABLET PORTRAIT -->
<h3 style="font-size: 1.25rem; font-weight: bold; color: #1e293b; margin: 32px 0 14px;">Планшет (вертикальний) &mdash; режим брифінгу</h3>
<p style="font-size: 1.18rem; margin: 0 0 16px; color: #1e293b;">Вертикальна орієнтація планшета зручна для ранкових брифінгів, читання довгих інструкцій або роботи в тісних проходах між стелажами, де горизонтальний планшет може зачіпати полиці. Інтерфейс перебудовується в дві колонки (або одну довгу), зберігаючи всі функції.</p>
<!-- TABLET PORTRAIT MOCKUP (768x1024 scaled to 0.6, height adjusted) -->
<div style="margin: 28px auto; display: flex; justify-content: center; padding: 10px 0; overflow-x: auto;">
<div style="width: 489px; height: 664px; box-sizing: border-box; flex-shrink: 0;">
<div style="width: 100%; height: 100%; border: 14px solid #1e293b; border-radius: 20px; box-shadow: 0 24px 48px rgba(15,23,42,0.2); background: #0b1120; overflow: hidden; box-sizing: border-box;"><iframe style="width: 768px; height: 1024px; transform: scale(0.6); transform-origin: top left; border: 0; display: block;" allow="camera; clipboard-write; clipboard-read; fullscreen; autoplay" title="RFID-U &mdash; Планшет вертикальний" loading="lazy" src="https://rfid-u.netlify.app"></iframe></div>
</div>
</div>
<p style="text-align: center; font-size: 1rem; color: #64748b; margin-top: -8px; margin-bottom: 24px;">Відкрити у вертикальному розташуванні: <a href="https://rfid-u.netlify.app" style="color: #0e7490; font-weight: 600; text-decoration: none; border-bottom: 1px dashed #0e7490; padding-bottom: 2px;" rel="noopener noreferrer" target="_blank">rfid-u.netlify.app &rarr;</a></p>
<!-- SECTION 3 -->
<h2 style="font-size: 1.6rem; font-weight: bold; color: #0f172a; background: #f8fafc; border-left: 4px solid #0e7490; padding: 12px 18px; border-radius: 0 6px 6px 0; margin: 2.5rem 0 1.2rem;">Архітектура: що відбувається між зчитувачем і базою</h2>
<p style="font-size: 1.18rem; margin: 0 0 16px; color: #1e293b;">Три рівні архітектури видно ще до першого сканування. <strong>Рівень клієнта</strong> &mdash; це PWA-додаток у браузері, який працює в трьох розташуваннях (телефон, планшет, ПК) на одному і тому ж коді. <strong>Рівень мосту</strong> &mdash; WebSocket-сервіс (<code style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 0.88em; padding: 2px 7px; border-radius: 5px; background: #e0f2fe; color: #0e7490;">ws://</code> / <code style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 0.88em; padding: 2px 7px; border-radius: 5px; background: #e0f2fe; color: #0e7490;">wss://</code>, за замовчуванням порт <code style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 0.88em; padding: 2px 7px; border-radius: 5px; background: #e0f2fe; color: #0e7490;">5084</code>) на локальному або мережевому хості, який тримає тривале з'єднання з апаратним UHF RFID-зчитувачем за LLRP v1.1 і транслює події в браузер.<a href="#ref-4" style="color: #0e7490; font-weight: 600; text-decoration: none;"><sup>&#91;4&#93;</sup></a><a href="#ref-6" style="color: #0e7490; font-weight: 600; text-decoration: none;"><sup>&#91;6&#93;</sup></a> <strong>Рівень сервера</strong> &mdash; хмарна база з ізоляцією по компаніях і API, куди йдуть нормалізовані події GS1 EPCIS 2.0 і запити на експорт в XLSX/CSV/JSON/Markdown.<a href="#ref-3" style="color: #0e7490; font-weight: 600; text-decoration: none;"><sup>&#91;3&#93;</sup></a></p>
<p style="font-size: 1.18rem; margin: 0 0 16px; color: #1e293b;">Два інженерних рішення, які відрізняють RFID-U від &laquo;просто веб-обгортки над ТЗД&raquo;. Перше &mdash; <strong>серверна прив'язка подій до конвеєрного енкодера</strong>: кожне спрацьовування фіксується з точністю до мілісекунд, інакше швидкий конвеєр породжує 4&ndash;6 % дублікатів, які доводиться відкидати в middleware. Друге &mdash; <strong>закриття документа на рівні серверних правил бази даних</strong>, а не лише в інтерфейсі: після фіналізації акта правила БД фізично забороняють <code style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 0.88em; padding: 2px 7px; border-radius: 5px; background: #e0f2fe; color: #0e7490;">UPDATE</code> і <code style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 0.88em; padding: 2px 7px; border-radius: 5px; background: #e0f2fe; color: #0e7490;">DELETE</code> для цього протоколу та його рядків, що робить історію аудиту незмінною навіть при спробі обходу UI.</p>
<div style="border-radius: 10px; padding: 18px 22px; margin: 24px 0; border-left: 4px solid #0e7490; background: #ecfeff; color: #0c4a6e; font-size: 1.1rem; line-height: 1.7;"><strong>Офлайн-режим.</strong> Service Worker кешує сам PWA-бандл, довідники та чергу операцій. При втраті зв'язку додаток продовжує працювати в повному обсязі; черга синхронізується автоматично при поверненні в мережу. Всі події, що потрапили в кеш, позначаються тимчасовою міткою і після синхронізації займають своє місце в загальній історії компанії.</div>
<!-- SECTION 4 -->
<h2 style="font-size: 1.6rem; font-weight: bold; color: #0f172a; background: #f8fafc; border-left: 4px solid #0e7490; padding: 12px 18px; border-radius: 0 6px 6px 0; margin: 2.5rem 0 1.2rem;">Порівняльна матриця режимів використання</h2>
<table style="width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 1.05rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
<thead> 
<tr>
<th style="padding: 14px 16px; border: 1px solid #cbd5e1; text-align: left; background: #0e7490; color: #ffffff; font-weight: bold;">Критерій</th> <th style="padding: 14px 16px; border: 1px solid #cbd5e1; text-align: left; background: #0e7490; color: #ffffff; font-weight: bold;">ПК</th> <th style="padding: 14px 16px; border: 1px solid #cbd5e1; text-align: left; background: #0e7490; color: #ffffff; font-weight: bold;">Смартфон</th> <th style="padding: 14px 16px; border: 1px solid #cbd5e1; text-align: left; background: #0e7490; color: #ffffff; font-weight: bold;">Планшет</th>
</tr>
</thead> 
<tbody>
<tr>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #ffffff; font-weight: 600; color: #0f172a;">Ширина екрана</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #ffffff; color: #1e293b;">1080&ndash;1920 px</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #ffffff; color: #1e293b;">390&ndash;430 px</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #ffffff; color: #1e293b;">768&ndash;1024 px</td>
</tr>
<tr>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #f8fafc; font-weight: 600; color: #0f172a;">Основний сценарій</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #f8fafc; color: #1e293b;">Імпорт з 1С/Excel, фіналізація актів, звіти</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #f8fafc; color: #1e293b;">Польова інвентаризація, сканування камерою, Geiger-пошук</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #f8fafc; color: #1e293b;">Аудит складів з обходом, показ акта замовнику, брифінг</td>
</tr>
<tr>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #ffffff; font-weight: 600; color: #0f172a;">Введення даних</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #ffffff; color: #1e293b;">Клавіатура, миша, drag &amp; drop, <code style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 0.88em; padding: 2px 7px; border-radius: 5px; background: #e0f2fe; color: #0e7490;">Ctrl+V</code></td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #ffffff; color: #1e293b;">Камера, тач, HID-сканер через Bluetooth</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #ffffff; color: #1e293b;">Тач, стилус, камера, HID-сканер через USB-C</td>
</tr>
<tr>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #f8fafc; font-weight: 600; color: #0f172a;">Офлайн-робота</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #f8fafc; color: #1e293b;">Так (Service Worker + IndexedDB)</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #f8fafc; color: #1e293b;">Так, пріоритетно</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #f8fafc; color: #1e293b;">Так</td>
</tr>
<tr>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #ffffff; font-weight: 600; color: #0f172a;">Ключова перевага</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #ffffff; color: #1e293b;">Багатозадачність, великі таблиці, звіти</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #ffffff; color: #1e293b;">Мобільність, робота однією рукою</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #ffffff; color: #1e293b;">Компроміс: широкий екран + мобільність</td>
</tr>
</tbody>
</table>
<!-- SECTION 5 -->
<h2 style="font-size: 1.6rem; font-weight: bold; color: #0f172a; background: #f8fafc; border-left: 4px solid #0e7490; padding: 12px 18px; border-radius: 0 6px 6px 0; margin: 2.5rem 0 1.2rem;">TCO і ROI на 5 років</h2>
<p style="font-size: 1.18rem; margin: 0 0 16px; color: #1e293b;">Порівняння двох підходів до інвентаризації на середньому об'єкті (25 співробітників з правом сканування). Варіант A &mdash; класичний парк промислових ТЗД з виділеним ПЗ. Варіант B &mdash; RFID-U v1.4 на вже наявних пристроях співробітників, плюс кілька промислових ТЗД для екстремальних умов. Всі суми в EUR (&euro;).</p>
<table style="width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 1.05rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
<thead> 
<tr>
<th style="padding: 14px 16px; border: 1px solid #cbd5e1; text-align: left; background: #0e7490; color: #ffffff; font-weight: bold;">Стаття витрат (5 років)</th> <th style="padding: 14px 16px; border: 1px solid #cbd5e1; text-align: left; background: #0e7490; color: #ffffff; font-weight: bold;">Варіант A: виділені ТЗД</th> <th style="padding: 14px 16px; border: 1px solid #cbd5e1; text-align: left; background: #0e7490; color: #ffffff; font-weight: bold;">Варіант B: RFID-U PWA</th>
</tr>
</thead> 
<tbody>
<tr>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #ffffff; font-weight: 600; color: #0f172a;">Закупівля 25 промислових ТЗД (&asymp; 1 200 &euro;/шт.)</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #ffffff; color: #1e293b;">30 000 &euro;</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #ffffff; color: #1e293b;">&mdash;</td>
</tr>
<tr>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #f8fafc; font-weight: 600; color: #0f172a;">5 промислових ТЗД для екстремальних умов</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #f8fafc; color: #1e293b;">&mdash;</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #f8fafc; color: #1e293b;">6 000 &euro;</td>
</tr>
<tr>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #ffffff; font-weight: 600; color: #0f172a;">10 UHF RFID-мостів + антенний комплект</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #ffffff; color: #1e293b;">8 000 &euro;</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #ffffff; color: #1e293b;">4 000 &euro;</td>
</tr>
<tr>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #f8fafc; font-weight: 600; color: #0f172a;">Ліцензії / підписка на 25 місць</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #f8fafc; color: #1e293b;">400 &euro;/місце &times; 25 &times; 5 років = 50 000 &euro;</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #f8fafc; color: #1e293b;">80 &euro;/місце &times; 25 &times; 5 років = 10 000 &euro;</td>
</tr>
<tr>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #ffffff; font-weight: 600; color: #0f172a;">Техпідтримка і обслуговування парку</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #ffffff; color: #1e293b;">150 &euro;/шт. &times; 25 &times; 5 років = 18 750 &euro;</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #ffffff; color: #1e293b;">включено в підписку = 0 &euro;</td>
</tr>
<tr>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #f8fafc; font-weight: 600; color: #0f172a;">Навчання персоналу</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #f8fafc; color: #1e293b;">5 000 &euro;</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #f8fafc; color: #1e293b;">3 000 &euro;</td>
</tr>
<tr>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #e2e8f0; font-weight: bold; color: #0f172a; font-size: 1.1rem;">Разом TCO за 5 років</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #e2e8f0; font-weight: bold; color: #0f172a; font-size: 1.1rem;">111 750 &euro;</td>
<td style="padding: 14px 16px; border: 1px solid #cbd5e1; background: #e2e8f0; font-weight: bold; color: #0f172a; font-size: 1.1rem;">23 000 &euro;</td>
</tr>
</tbody>
</table>
<p style="font-size: 1.18rem; margin: 0 0 16px; color: #1e293b;">Додатковий CAPEX відсутній: RFID-U не вимагає закупівлі повного парку ТЗД, оскільки основна робота переходить на вже наявні у співробітників смартфони та планшети. Економія за 5 років: <strong>111 750 &euro; &minus; 23 000 &euro; = 88 750 &euro;</strong>, або <strong>79,4 % від TCO варіанта A</strong>. Кеш-ефект: річна підписка на RFID-U (2 000 &euro;) повністю перекривається скасуванням річних ліцензій з виділеного парку ТЗД (10 000 &euro;), тобто програмна частина рішення окупає себе в перші 3 місяці.</p>
<div style="border-radius: 10px; padding: 18px 22px; margin: 24px 0; border-left: 4px solid #047857; background: #ecfdf5; color: #064e3b; font-size: 1.1rem; line-height: 1.7;"><strong>Ключовий висновок.</strong> Основна економія RFID-U &mdash; не &laquo;дешевше софт&raquo;, а &laquo;не потрібно купувати виділений парк ТЗД на 25 осіб, коли у 20 з них вже є смартфон або планшет&raquo;. Промислові ТЗД залишаються лише там, де вони фізично потрібні (мороз &minus;30 &deg;C, IP69K-мийка, робота в рукавичках), &mdash; і це радикально змінює структуру бюджету проєкту.</div>
<!-- SECTION 6 -->
<h2 style="font-size: 1.6rem; font-weight: bold; color: #0f172a; background: #f8fafc; border-left: 4px solid #0e7490; padding: 12px 18px; border-radius: 0 6px 6px 0; margin: 2.5rem 0 1.2rem;">FAQ</h2>
<h3 style="font-size: 1.25rem; font-weight: bold; color: #1e293b; margin: 32px 0 14px;">Чому PWA, а не нативний додаток на Android/iOS?</h3>
<p style="font-size: 1.18rem; margin: 0 0 16px; color: #1e293b;">Три причини. По-перше, PWA оновлюється миттєво для всіх пристроїв &mdash; не потрібно чекати модерації в App Store / Google Play. По-друге, один код на всі три форм-фактори без окремих збірок і різних API. По-третє, офлайн-режим через Service Worker дає ту ж стійкість до обриву зв'язку, що й нативний додаток, але без встановлення і без необхідності в дозволах на доступ до заліза &mdash; всі системні можливості (камера, буфер обміну, сканер HID) доступні прямо з браузера.</p>
<h3 style="font-size: 1.25rem; font-weight: bold; color: #1e293b; margin: 32px 0 14px;">Чи відповідає рішення вимогам GDPR? Де зберігаються дані?</h3>
<p style="font-size: 1.18rem; margin: 0 0 16px; color: #1e293b;">Так. Аутентифікація &mdash; <strong>Google OAuth 2.0</strong>, зберігання &mdash; <strong>Google Cloud</strong> за стандартним Data Processing Addendum (DPA), регіон хмари узгоджується при комерційному розгортанні. Кожна компанія отримує ізольовану базу даних на рівні серверних правил авторизації: запит до чужого робочого простору фізично повертає порожній результат &mdash; це перевіряється на рівні правил, а не в інтерфейсі. Експорт повного локального бекапу в JSON/XLSX/CSV доступний в будь-який момент.</p>
<h3 style="font-size: 1.25rem; font-weight: bold; color: #1e293b; margin: 32px 0 14px;">Що відбувається з даними при втраті інтернету на об'єкті?</h3>
<p style="font-size: 1.18rem; margin: 0 0 16px; color: #1e293b;">Інвентаризація продовжується в повному обсязі. Service Worker кешує PWA-бандл, довідник ТМЦ і чергу операцій. Скани, створені документи, позначки <code style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 0.88em; padding: 2px 7px; border-radius: 5px; background: #e0f2fe; color: #0e7490;">s1&ndash;s5</code> і мітки тампера зберігаються в локальне сховище браузера. При поверненні в мережу черга автоматично синхронізується, кожна операція отримує серверну тимчасову мітку, а конфлікти версій вирішуються за правилом &laquo;останній запис прив'язаний до оригінального клієнта&raquo;.</p>
<h3 style="font-size: 1.25rem; font-weight: bold; color: #1e293b; margin: 32px 0 14px;">Що потрібно для роботи з фізичними UHF RFID-зчитувачами?</h3>
<p style="font-size: 1.18rem; margin: 0 0 16px; color: #1e293b;">Оскільки браузер не працює безпосередньо з протоколом LLRP, зчитувач підключається через легкий WebSocket-міст на локальному або мережевому хості (за замовчуванням порт <code style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 0.88em; padding: 2px 7px; border-radius: 5px; background: #e0f2fe; color: #0e7490;">5084</code>; при наявності локального LLRP-демона на цьому ж порту вибирається інший вільний). Міст тримає LLRP-з'єднання зі зчитувачем і транслює події в браузер по <code style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 0.88em; padding: 2px 7px; border-radius: 5px; background: #e0f2fe; color: #0e7490;">ws://</code> або <code style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 0.88em; padding: 2px 7px; border-radius: 5px; background: #e0f2fe; color: #0e7490;">wss://</code>. Жодних плагінів, жодних драйверів на робочих станціях &mdash; тільки мережевий доступ до мосту.</p>
<!-- AUTHOR -->
<p style="margin-top: 48px; font-size: 1rem; color: #475569; border-top: 2px solid #e2e8f0; padding-top: 20px;"><strong>Автор:</strong> Юрій Касьян, Головний RFID-інженер &middot; RFID Ukraine &middot; Оновлено: 16 листопада 2026</p>
<!-- RELATED ARTICLES -->
<h2 style="font-size: 1.6rem; font-weight: bold; color: #0f172a; background: #f8fafc; border-left: 4px solid #0e7490; padding: 12px 18px; border-radius: 0 6px 6px 0; margin: 2.5rem 0 1.2rem;">Пов'язані статті архітектури RFID</h2>
<div style="background: #f7f5f0; border: 1px solid #d4cfc5; border-radius: 8px; padding: 16px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; font-size: 1.05rem;">
<ul style="margin: 0; padding-left: 1.3rem; line-height: 1.75; color: #1e293b;">
<li><a href="/ukr/blog/rfid-system-architecture-design-guide/rfid-readers-classification-poe-protocols-guide/" style="color: #0e7490; font-weight: 600; text-decoration: none;">Класифікація RFID-зчитувачів: промислові класи, живлення PoE/PoE+ та протоколи</a> &mdash; Архітектура зчитувачів, PoE+ і синхронізація PTP (UA).</li>
<li><a href="/ukr/blog/rfid-system-architecture-design-guide/mobile-handheld-rfid-systems-vehicle-mounted-wifi-5g/" style="color: #0e7490; font-weight: 600; text-decoration: none;">Мобільні RFID-рішення: ТЗД та носимі термінали</a> &mdash; Ергономіка, сканери HID і мобільні сценарії інвентаризації (UA).</li>
<li><a href="/ukr/blog/rfid-system-architecture-design-guide/epcis-gs1-standards-core-business-vocabulary-event-model/" style="color: #0e7490; font-weight: 600; text-decoration: none;">EPCIS 2.0 та стандарти GS1: модель подій</a> &mdash; ObjectEvent, AggregationEvent та SGTIN-96 для передачі даних в ERP (UA).</li>
<li><a href="/ukr/blog/rfid-system-architecture-design-guide/rfid-middleware-filtering-deduplication-ale/" style="color: #0e7490; font-weight: 600; text-decoration: none;">RFID Middleware: фільтрація, дедуплікація та буферизація</a> &mdash; Архітектура фільтрації подій та ALE для офлайн-синхронізації (UA).</li>
</ul>
</div>
<!-- SOURCES -->
<h2 style="font-size: 1.6rem; font-weight: bold; color: #0f172a; background: #f8fafc; border-left: 4px solid #0e7490; padding: 12px 18px; border-radius: 0 6px 6px 0; margin: 2.5rem 0 1.2rem;">Джерела та стандарти</h2>
<ol style="font-size: 1.05rem; line-height: 1.8; padding-left: 24px; color: #1e293b;">
<li id="ref-1"><a href="https://iso.org" style="color: #0e7490; font-weight: 600; text-decoration: none;" rel="noopener noreferrer" target="_blank">ISO/IEC 18000-63:2021</a> &mdash; <em>Information technology &mdash; Radio frequency identification for item management &mdash; Part 63: Air interface communications at 860 MHz to 960 MHz Type C.</em> ISO/IEC, 2021.</li>
<li id="ref-2"><a href="https://etsi.org" style="color: #0e7490; font-weight: 600; text-decoration: none;" rel="noopener noreferrer" target="_blank">ETSI EN 302 208</a> &mdash; <em>Radio Frequency Identification Equipment operating in the band 865 MHz to 868 MHz with power levels up to 2 W ERP.</em> ETSI, 2023.</li>
<li id="ref-3"><a href="https://gs1.org" style="color: #0e7490; font-weight: 600; text-decoration: none;" rel="noopener noreferrer" target="_blank">GS1 EPCIS 2.0</a> &mdash; <em>EPC Information Services (EPCIS) Standard, Version 2.0.</em> GS1, 2022.</li>
<li id="ref-4"><a href="https://gs1.org" style="color: #0e7490; font-weight: 600; text-decoration: none;" rel="noopener noreferrer" target="_blank">GS1 LLRP v1.1</a> &mdash; <em>Low Level Reader Protocol Standard, Version 1.1.</em> GS1, 2017.</li>
<li id="ref-5"><a href="https://w3.org" style="color: #0e7490; font-weight: 600; text-decoration: none;" rel="noopener noreferrer" target="_blank">W3C Service Workers / PWA</a> &mdash; <em>Service Workers Working Draft; Web App Manifest specification.</em> W3C, 2023.</li>
<li id="ref-6"><a href="https://ietf.org" style="color: #0e7490; font-weight: 600; text-decoration: none;" rel="noopener noreferrer" target="_blank">RFC 6455</a> &mdash; <em>The WebSocket Protocol.</em> IETF, 2011.</li>
<li id="ref-7"><a href="https://ietf.org" style="color: #0e7490; font-weight: 600; text-decoration: none;" rel="noopener noreferrer" target="_blank">RFC 6749</a> &mdash; <em>The OAuth 2.0 Authorization Framework.</em> IETF, 2012.</li>
<li id="ref-8"><a href="https://europa.eu" style="color: #0e7490; font-weight: 600; text-decoration: none;" rel="noopener noreferrer" target="_blank">GDPR (EU) 2016/679</a> &mdash; <em>General Data Protection Regulation.</em> EU, 2016.</li>
<li id="ref-9"><a href="https://ieee.org" style="color: #0e7490; font-weight: 600; text-decoration: none;" rel="noopener noreferrer" target="_blank">IEEE 1588-2019 (PTPv2.1)</a> &mdash; <em>IEEE Standard for a Precision Clock Synchronization Protocol for Networked Measurement and Control Systems.</em> IEEE, 2019.</li>
<li id="ref-10"><a href="https://cloud.google.com" style="color: #0e7490; font-weight: 600; text-decoration: none;" rel="noopener noreferrer" target="_blank">Google Cloud Data Processing Addendum</a> &mdash; <em>Standard contractual terms for cloud data processing under GDPR.</em> Google, 2024.</li>
</ol></div>
<!-- JSON-LD -->
<script type="application/ld+json">// <![CDATA[
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "inLanguage": "uk",
      "datePublished": "2026-11-16",
      "dateModified": "2026-11-16",
      "url": "https://rfid.org.ua/ukr/blog/rfid-u/",
      "headline": "RFID-U: один інвентаризаційний термінал — три форм-фактори",
      "author": {
        "@type": "Person",
        "name": "Yurii Kasian",
        "jobTitle": "Principal RFID Engineer"
      },
      "publisher": {
        "@type": "Organization",
        "name": "RFID Ukraine"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "RFID Ukraine", "item": "https://rfid.org.ua/"},
        {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://rfid.org.ua/blog/"},
        {"@type": "ListItem", "position": 3, "name": "RFID-U", "item": "https://rfid.org.ua/ukr/blog/rfid-u/"}
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Чому PWA, а не нативний додаток на Android/iOS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "PWA оновлюється миттєво для всіх пристроїв без модерації в App Store і Google Play; один код на три форм-фактори без окремих збірок; офлайн-режим через Service Worker дає ту ж стійкість до обриву зв'язку, що й нативний додаток, але без встановлення."
          }
        },
        {
          "@type": "Question",
          "name": "Чи відповідає рішення вимогам GDPR? Де зберігаються дані?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Аутентифікація через Google OAuth 2.0, зберігання в Google Cloud за стандартним DPA, регіон хмари узгоджується при комерційному розгортанні. Кожна компанія отримує ізольовану базу даних на рівні серверних правил; експорт повного бекапу в JSON/XLSX/CSV доступний в будь-який момент."
          }
        },
        {
          "@type": "Question",
          "name": "Що відбувається з даними при втраті інтернету на об'єкті?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Інвентаризація продовжується в повному обсязі: Service Worker кешує PWA-бандл, довідник ТМЦ і чергу операцій. При поверненні в мережу черга автоматично синхронізується, кожна операція отримує серверну тимчасову мітку, конфлікти версій вирішуються за правилом останнього запису клієнта."
          }
        },
        {
          "@type": "Question",
          "name": "Що потрібно для роботи з фізичними UHF RFID-зчитувачами?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Браузер не працює безпосередньо з LLRP, тому зчитувач підключається через WebSocket-міст на локальному або мережевому хості (за замовчуванням порт 5084). Міст тримає LLRP-з'єднання зі зчитувачем і транслює події в браузер по ws:// або wss://. Жодних плагінів і драйверів на робочих станціях не потрібно."
          }
        }
      ]
    }
  ]
}
// ]]></script>
{{< /rawhtml >}}
