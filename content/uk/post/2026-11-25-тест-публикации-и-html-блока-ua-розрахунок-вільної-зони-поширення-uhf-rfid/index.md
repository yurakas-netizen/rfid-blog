---
title: "Тест публикации и HTML-блока (UA): розрахунок вільної зони поширення UHF RFID"
slug: test-publikatsii-i-html-bloka-ua-rozrakhunok-vilnoyi-zoni-poshirennya-uhf-rfid
description: Тестова стаття українською мовою з заповненими метаданими та
  безпечним HTML-віджетом для перевірки рендеру, мікроразметки та деплою.
date: 2026-11-25T12:45:00.000Z
categories:
  - Архітектура RFID-Систем
tags:
  - UHF RFID
  - Тест публікації
  - rawhtml
translationKey: test-ua-publish-rawhtml-check
---
Коротка перевірочна нотатка для контролю відображення статті в стрічці, роботи шорткода `rawhtml` та генерації `TechArticle` / `BreadcrumbList`.

* Діапазон ETSI: $865,6\text{–}867,6\text{ МГц}$.
* Затухання у вільному просторі (FSPL): $L_{\text{FSPL}} = 20\log_{10}(d) + 20\log_{10}(f) + 32,44\text{ дБ}$.

{{< rawhtml >}}
<div style="border: 1px solid #334155; border-radius: 10px; padding: 14px 16px; margin: 16px 0; background: rgba(15, 23, 42, 0.35);">
  <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; opacity: 0.75; margin-bottom: 6px;">Тестовий блок rawhtml</div>
  <div style="font-weight: 600;">Контроль вставки HTML без скриптів, що ламають мініфікацію.</div>
</div>
{{< /rawhtml >}}

## FAQ: типові питання щодо тестової публікації

### Чи підхоплюється стаття в списку та пошуку після деплою?
Після успішного білду з заповненими категоріями, тегами та датою стаття має з'явитися на головній, у категорії та в структурованих даних `TechArticle` і `BreadcrumbList`.

### Чому в тестовому HTML-блоці немає inline-скриптів?
Щоб на етапі збірки з `--minify` мініфікатор не зачепився за символ `/` або коментарі всередині `<script>`.
