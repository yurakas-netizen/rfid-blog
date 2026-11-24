import fs from 'node:fs';
import path from 'node:path';
import * as sass from 'sass';

export function buildStylesheet(rootDir: string): string {
  const customScssPath = path.join(rootDir, 'assets', 'scss', 'custom.scss');
  let compiledCustom = '';
  if (fs.existsSync(customScssPath)) {
    compiledCustom = sass.compile(customScssPath, { style: 'expanded' }).css;
  }

  const baseCss = `
:root,
:root[data-scheme="light"] {
  --body-background: #f4f6fb;
  --accent-color: #0284c7;
  --accent-color-darker: #0369a1;
  --accent-color-text: #ffffff;
  --body-text-color: #334155;
  --card-background: #ffffff;
  --card-background-selected: #f1f5f9;
  --card-text-color-main: #0f172a;
  --card-text-color-secondary: #475569;
  --card-text-color-tertiary: #64748b;
  --card-separator-color: rgba(148, 163, 184, 0.24);
  --card-border-radius: 14px;
  --tag-border-radius: 6px;
  --shadow-l1: 0 4px 16px -4px rgba(15, 23, 42, 0.06), 0 0 1px rgba(15, 23, 42, 0.08);
  --code-background: #0f172a;
  --code-text-color: #e2e8f0;
}

*, *::before, *::after {
  box-sizing: border-box;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  background: var(--body-background);
  color: var(--body-text-color);
  font-family: "Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}

a {
  color: var(--accent-color);
  text-decoration: none;
  transition: color 0.15s ease, border-color 0.15s ease, background-color 0.15s ease;
}

a:hover {
  color: var(--accent-color-darker);
}

.container {
  margin-left: auto;
  margin-right: auto;
  max-width: 1280px;
  padding: 0 24px;
}

.main-container {
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding-top: 28px;
  padding-bottom: 56px;
  align-items: stretch;
  justify-content: center;
}

@media (min-width: 768px) {
  .main-container {
    flex-direction: row;
    align-items: flex-start;
  }
}

.left-sidebar {
  width: 100%;
  flex-shrink: 0;
}

@media (min-width: 768px) {
  .left-sidebar {
    width: 224px;
    position: sticky;
    top: 28px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
}

@media (min-width: 1280px) {
  .left-sidebar {
    width: 236px;
  }
}

.main {
  flex: 1 1 0%;
  min-width: 0;
  max-width: 760px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.right-sidebar {
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (min-width: 1024px) {
  .right-sidebar {
    width: 270px;
    position: sticky;
    top: 28px;
  }
}

@media (min-width: 1280px) {
  .right-sidebar {
    width: 290px;
  }
}

/* Left Sidebar Header */
.sidebar header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 4px;
}

.sidebar-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.hamburger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--card-background);
  color: var(--card-text-color-main);
  border: 1px solid var(--card-separator-color);
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
}

@media (min-width: 768px) {
  .hamburger {
    display: none;
  }
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--card-text-color-main);
}

.brand-icon {
  width: 44px;
  height: 44px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.16) 0%, rgba(56, 189, 248, 0.06) 100%);
  border: 1px solid rgba(56, 189, 248, 0.35);
  color: var(--accent-color);
  box-shadow: 0 4px 16px -4px rgba(14, 165, 233, 0.25);
  flex-shrink: 0;
}

.brand-icon svg {
  width: 24px;
  height: 24px;
}

.site-meta .site-name {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--card-text-color-main);
  line-height: 1.25;
}

.site-meta .site-name a {
  color: inherit;
}

.site-meta .site-description {
  margin: 2px 0 0;
  font-size: 0.86rem;
  font-weight: 400;
  color: var(--card-text-color-secondary);
  line-height: 1.45;
}

/* Menu */
.menu {
  list-style: none;
  padding: 0;
  margin: 0;
  display: none;
  flex-direction: column;
  gap: 4px;
}

.menu.show {
  display: flex;
}

@media (min-width: 768px) {
  .menu {
    display: flex;
  }
}

.menu li a {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--card-text-color-secondary);
  font-size: 0.94rem;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 9px;
}

.menu li a:hover {
  color: var(--card-text-color-main);
  background: var(--card-background-selected);
}

.menu li.current a {
  color: var(--accent-color);
  background: var(--card-background-selected);
  font-weight: 600;
}

.menu li svg {
  width: 18px;
  height: 18px;
  stroke-width: 1.75;
  flex-shrink: 0;
}

.menu-bottom-section {
  margin-top: 10px;
  padding-top: 14px;
  border-top: 1px solid var(--card-separator-color);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.i18n-switcher {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--card-text-color-secondary);
  background: var(--card-background);
  border: 1px solid var(--card-separator-color);
  border-radius: 9px;
  padding: 7px 12px;
}

.i18n-switcher svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.i18n-switcher select {
  width: 100%;
  min-width: 0;
  background: transparent;
  color: var(--card-text-color-main);
  border: 0;
  padding: 0;
  font-size: 0.86rem;
  cursor: pointer;
  outline: none;
}

.i18n-switcher select option {
  background: var(--card-background);
  color: var(--card-text-color-main);
}

.color-scheme-toggle {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 12px;
  background: var(--card-background);
  color: var(--card-text-color-secondary);
  border: 1px solid var(--card-separator-color);
  border-radius: 9px;
  padding: 8px 12px;
  font-size: 0.86rem;
  cursor: pointer;
  text-align: left;
}

.color-scheme-toggle svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.color-scheme-toggle:hover {
  color: var(--card-text-color-main);
  border-color: var(--accent-color);
}

/* Articles */
.article-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.article-list article,
.main-article,
.section-card {
  background: var(--card-background);
  border-radius: var(--card-border-radius);
  box-shadow: var(--shadow-l1);
  border: 1px solid var(--card-separator-color);
  overflow: hidden;
}

.section-card {
  padding: 26px 30px;
}

/* Edge-to-edge cover image cropping baked-in JPEG white borders/corners */
.article-image {
  position: relative;
  width: 100%;
  aspect-ratio: 21 / 9;
  max-height: 340px;
  overflow: hidden;
  background: #0b1220;
}

.article-image a {
  display: block;
  width: 100%;
  height: 100%;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform: scale(1.065);
  display: block;
  transition: transform 0.35s ease;
}

.article-list article:hover .article-image img {
  transform: scale(1.085);
}

.article-details {
  padding: 26px 30px 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.article-category {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.article-category a {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: var(--tag-border-radius);
  background: var(--accent-color);
  color: var(--accent-color-text);
}

.lang-badge {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 2px 7px;
  border-radius: 4px;
  background: var(--card-background-selected);
  color: var(--card-text-color-secondary);
  border: 1px solid var(--card-separator-color);
}

.article-title {
  margin: 0;
  font-size: 1.5rem;
  line-height: 1.32;
  font-weight: 700;
  color: var(--card-text-color-main);
  letter-spacing: -0.01em;
}

.article-title a {
  color: inherit;
}

.article-title a:hover {
  color: var(--accent-color);
}

.article-subtitle {
  margin: 0;
  font-size: 0.98rem;
  font-weight: 400;
  color: var(--card-text-color-secondary);
  line-height: 1.6;
}

.article-time {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 0.85rem;
  color: var(--card-text-color-tertiary);
}

.article-time > div {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.article-time svg {
  width: 15px;
  height: 15px;
}

/* Article Body */
.article-content {
  padding: 4px 30px 28px;
  color: var(--body-text-color);
  font-size: 1.02rem;
  line-height: 1.75;
  overflow-wrap: break-word;
}

.article-content h1,
.article-content h2,
.article-content h3,
.article-content h4 {
  color: var(--card-text-color-main);
  margin-top: 1.8em;
  margin-bottom: 0.65em;
  line-height: 1.3;
  scroll-margin-top: 24px;
}

.article-content h2 {
  font-size: 1.35rem;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--card-separator-color);
}

.article-content h3 {
  font-size: 1.15rem;
}

.header-anchor {
  margin-left: 8px;
  color: var(--card-text-color-tertiary);
  opacity: 0;
  font-weight: 400;
  font-size: 0.9em;
  transition: opacity 0.15s ease;
}

.article-content h2:hover .header-anchor,
.article-content h3:hover .header-anchor,
.article-content h4:hover .header-anchor {
  opacity: 0.75;
}

.article-content p {
  margin: 0 0 1.1em;
}

.article-content ul,
.article-content ol {
  margin: 0 0 1.2em;
  padding-left: 1.5em;
}

.article-content li {
  margin-bottom: 0.45em;
}

.article-figure {
  margin: 20px auto;
  text-align: center;
  overflow: hidden;
  border-radius: 12px;
}

.article-figure img {
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  cursor: zoom-in;
  display: block;
  transform: scale(1.03);
}

.article-figure figcaption {
  font-size: 0.85rem;
  color: var(--card-text-color-tertiary);
  margin-top: 8px;
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
  margin: 18px 0;
}

.image-gallery .article-figure {
  margin: 0;
}

.article-content blockquote {
  margin: 1.4em 0;
  padding: 14px 18px;
  border-left: 4px solid var(--accent-color);
  background: var(--card-background-selected);
  border-radius: 0 10px 10px 0;
  color: var(--card-text-color-secondary);
}

.article-content blockquote footer {
  margin-top: 8px;
  font-size: 0.88rem;
  color: var(--card-text-color-tertiary);
}

.highlight {
  position: relative;
  margin: 1.2em 0;
}

.highlight .code-lang {
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 0.72rem;
  text-transform: uppercase;
  color: #94a3b8;
  font-family: ui-monospace, monospace;
}

.article-content pre {
  background: var(--code-background);
  color: var(--code-text-color);
  padding: 16px;
  border-radius: 10px;
  overflow-x: auto;
  font-size: 0.88rem;
  line-height: 1.55;
  border: 1px solid var(--card-separator-color);
  margin: 0;
}

.article-content code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.88em;
}

.article-content :not(pre) > code {
  background: var(--card-background-selected);
  padding: 2px 6px;
  border-radius: 5px;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
  margin: 1.5em 0;
  border-radius: 10px;
  border: 1px solid var(--card-separator-color);
}

.article-content table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
}

.article-content th,
.article-content td {
  padding: 11px 14px;
  border-bottom: 1px solid var(--card-separator-color);
  border-right: 1px solid var(--card-separator-color);
  text-align: left;
  vertical-align: top;
}

.article-content th:last-child,
.article-content td:last-child {
  border-right: 0;
}

.article-content tr:last-child td {
  border-bottom: 0;
}

.article-content th {
  background: var(--card-background-selected);
  color: var(--card-text-color-main);
  font-weight: 600;
}

.katex-block {
  overflow-x: auto;
  padding: 10px 0;
}

.video-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 10px;
  margin: 16px 0;
}

.video-wrapper iframe,
.video-wrapper video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.embed-card {
  padding: 12px 16px;
  border-radius: 8px;
  background: var(--card-background-selected);
  border: 1px solid var(--card-separator-color);
  margin: 12px 0;
}

.embed-badge {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 4px;
  background: var(--accent-color);
  color: var(--accent-color-text);
  margin-right: 8px;
}

.article-footer {
  padding: 0 30px 26px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.article-tags a {
  font-size: 0.8rem;
  padding: 4px 10px;
  border-radius: var(--tag-border-radius);
  background: var(--card-background-selected);
  color: var(--card-text-color-secondary);
  border: 1px solid var(--card-separator-color);
}

.article-tags a:hover {
  color: var(--card-text-color-main);
  border-color: var(--accent-color);
}

.article-copyright {
  font-size: 0.84rem;
  color: var(--card-text-color-tertiary);
  padding-top: 12px;
  border-top: 1px solid var(--card-separator-color);
}

/* Related posts */
.related-section {
  background: var(--card-background);
  border-radius: var(--card-border-radius);
  padding: 22px 26px;
  border: 1px solid var(--card-separator-color);
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 14px;
  margin-top: 14px;
}

.related-card {
  display: block;
  padding: 14px;
  border-radius: 10px;
  background: var(--card-background-selected);
  border: 1px solid var(--card-separator-color);
}

/* Widgets */
.widget {
  background: var(--card-background);
  border-radius: var(--card-border-radius);
  box-shadow: var(--shadow-l1);
  border: 1px solid var(--card-separator-color);
  padding: 18px 20px;
}

.widget-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
  color: var(--card-text-color-main);
}

.widget-header svg {
  width: 17px;
  height: 17px;
  flex-shrink: 0;
  color: var(--accent-color);
}

.widget-title {
  margin: 0;
  font-size: 0.86rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--card-text-color-main);
}

.search-form {
  display: flex;
  position: relative;
}

.search-form input {
  width: 100%;
  background: var(--card-background);
  border: 1px solid var(--card-separator-color);
  color: var(--card-text-color-main);
  padding: 11px 44px 11px 14px;
  font-size: 0.92rem;
  border-radius: 12px;
  outline: none;
  transition: border-color 0.15s ease;
}

.search-form input:focus {
  border-color: var(--accent-color);
}

.search-form button {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: 0;
  color: var(--card-text-color-secondary);
  cursor: pointer;
  padding: 6px;
  display: flex;
}

.widget-archive-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.widget-archive-item {
  display: flex;
  justify-content: space-between;
  color: var(--card-text-color-secondary);
  font-size: 0.92rem;
  padding: 4px 0;
}

.widget-archive-item:hover {
  color: var(--accent-color);
}

.widget-archive-item .count {
  color: var(--card-text-color-tertiary);
  font-size: 0.85rem;
}

.tagCloud-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tagCloud-tags a {
  font-size: 0.82rem;
  padding: 5px 10px;
  border-radius: var(--tag-border-radius);
  background: var(--card-background-selected);
  color: var(--card-text-color-secondary);
}

.widget--toc-list ol {
  list-style: none;
  padding: 0 0 0 12px;
  margin: 0;
  border-left: 2px solid var(--card-separator-color);
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.widget--toc-list li a {
  font-size: 0.87rem;
  line-height: 1.45;
  color: var(--card-text-color-secondary);
  display: block;
}

.widget--toc-list li a:hover {
  color: var(--accent-color);
}

.widget--toc-list li.toc-level-3 {
  padding-left: 12px;
}

.widget--toc-list li.toc-level-4 {
  padding-left: 22px;
}

/* Archives, Search, Links */
.section-title {
  margin: 0 0 16px;
  font-size: 1.45rem;
  color: var(--card-text-color-main);
}

.section-subtitle {
  margin: 0;
  font-size: 0.92rem;
  color: var(--card-text-color-secondary);
}

.archives-group {
  margin-bottom: 24px;
}

.archives-year {
  font-size: 1.2rem;
  color: var(--accent-color);
  margin: 0 0 12px;
}

.article-list--compact {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.article-list--compact article {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: var(--card-background);
  border: 1px solid var(--card-separator-color);
  border-radius: var(--card-border-radius);
}

.compact-thumb {
  width: 96px;
  height: 64px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.compact-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  border-radius: 10px;
  background: var(--card-background-selected);
  border: 1px solid var(--card-separator-color);
}

.compact-item-title {
  font-weight: 600;
  color: var(--card-text-color-main);
}

.compact-item-date {
  font-size: 0.84rem;
  color: var(--card-text-color-tertiary);
  white-space: nowrap;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  border-radius: 10px;
  background: var(--card-background-selected);
  border: 1px solid var(--card-separator-color);
}

.link-card img {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  object-fit: cover;
}

.pagination {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 8px;
}

.page-link {
  padding: 8px 14px;
  border-radius: 8px;
  background: var(--card-background);
  border: 1px solid var(--card-separator-color);
  color: var(--card-text-color-main);
  font-size: 0.9rem;
}

.page-link.current {
  background: var(--accent-color);
  color: var(--accent-color-text);
  border-color: var(--accent-color);
}

.site-footer {
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid var(--card-separator-color);
  font-size: 0.84rem;
  color: var(--card-text-color-tertiary);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* Lightbox */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.9);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 24px;
}

.lightbox-overlay.open {
  display: flex;
}

.lightbox-overlay img {
  max-width: 92vw;
  max-height: 88vh;
  border-radius: 12px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.75);
}

.lightbox-close {
  position: fixed;
  top: 16px;
  right: 22px;
  font-size: 2rem;
  color: #fff;
  background: transparent;
  border: 0;
  cursor: pointer;
}
`;

  return `${baseCss}\n\n/* Custom SCSS from assets/scss/custom.scss */\n${compiledCustom}`;
}
