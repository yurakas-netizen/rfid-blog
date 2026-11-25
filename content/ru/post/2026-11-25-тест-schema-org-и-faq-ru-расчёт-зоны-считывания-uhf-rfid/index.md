---
title: "Тест Schema.org и FAQ (RU): расчёт зоны считывания UHF RFID"
slug: test-schema-org-i-faq-ru-raschyot-zony-schityvaniya-uhf-rfid
description: Короткая тестовая заметка на русском языке для проверки
  автоматической генерации TechArticle, BreadcrumbList и FAQPage.
date: 2026-11-25T11:58:00.000Z
categories:
  - Архитектура RFID-систем
tags:
  - UHF RFID
  - Schema.org
  - Тест разметки
translationKey: test-schema-faq-ru
---
Короткий 2 технический материал для проверки микроразметки на продакшене:

* Рабочий диапазон частот ETSI: $865,6\text{–}867,6\text{ МГц}$.
* Максимальная излучаемая мощность в канале: $2\text{ Вт ERP}$ ($33\text{ дБм}$).
* Изолированный тестовый ключ `test-schema-faq-ru` без привязки к соседним языкам.

## FAQ: частые вопросы по тестовому стенду

### Как проверяется корректность JSON-LD на этой странице?

После публикации URL статьи прогоняется через валидатор Schema.org или Google Rich Results Test, где должны отобразиться сущности `TechArticle`, `BreadcrumbList` и `FAQPage`.

### Зачем в статье используется уникальный ключ `translationKey`?

Если переводов на другие языки пока нет, блок переключения языков не рендерится, а в микроразметке остаётся чистый `TechArticle` без лишних связей.

{{< rawhtml >}}
<div class="rfid-test-block" style="padding: 16px; border: 1px solid #cbd5e1; border-radius: 8px; margin: 16px 0;">
  <h3 style="margin-top: 0;">Минимальный тест HTML-блока</h3>
  <p>Проверка базовой вставки HTML через редактор без лишних элементов.</p>
  <table style="width: 100%; border-collapse: collapse;">
    <thead>
      <tr>
        <th style="text-align: left; border-bottom: 1px solid #cbd5e1; padding: 6px;">Параметр</th>
        <th style="text-align: left; border-bottom: 1px solid #cbd5e1; padding: 6px;">Значение</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 6px; border-bottom: 1px solid #e2e8f0;">Частота</td>
        <td style="padding: 6px; border-bottom: 1px solid #e2e8f0;">865.6–867.6 MHz</td>
      </tr>
    </tbody>
  </table>
</div>
{{< /rawhtml >}}
