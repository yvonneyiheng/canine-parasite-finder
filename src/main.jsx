import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import {
  ingredients,
  parasiteProfiles,
  parasiteTypes,
  productCatalog,
  safetyNotes,
  sourceLinks,
} from './parasiteData.js';

const copy = {
  zh: {
    appName: '犬类驱虫查询',
    appSubtitle: '寄生虫科普、药品覆盖谱与成分机制的双语查询工具',
    nav: ['寄生虫科普', '驱虫药查询', '成分机制', '安全提示'],
    language: 'English',
    heroKicker: '面向犬主与临床沟通',
    heroTitle: '按寄生虫快速查看常见犬用驱虫药覆盖范围',
    heroText:
      '本工具整理常见犬用外寄生虫、内寄生虫和心丝虫预防信息，并链接到厂商或官方标签页。信息仅用于科普，不能替代兽医诊断、检测或处方。',
    chooseParasite: '选择要覆盖的寄生虫',
    allParasites: '全部寄生虫',
    productCount: '款药品匹配',
    clear: '清除筛选',
    coverage: '覆盖谱',
    ingredients: '有效成分',
    mechanism: '作用机制',
    source: '官网/标签',
    region: '地区',
    form: '剂型',
    age: '适用范围',
    prescription: '处方状态',
    notes: '注意事项',
    covers: '覆盖',
    partial: '搭配/有限',
    notCovered: '不覆盖',
    noMatch:
      '当前筛选没有找到单品明确覆盖。请查看组合方案，或咨询兽医按当地标签选择。',
    parasiteScience: '寄生虫科普',
    transmission: '感染途径',
    symptoms: '常见表现',
    risk: '主要风险',
    prevention: '预防重点',
    vet: '何时就医',
    ingredientLibrary: '成分与机制',
    safetyTitle: '安全提示',
    sourcesTitle: '资料来源',
    filterHint: '按寄生虫筛选后，卡片会高亮该药是否覆盖目标寄生虫。',
  },
  en: {
    appName: 'Canine Parasite Finder',
    appSubtitle:
      'A bilingual reference for parasite education, drug spectra, and active ingredients',
    nav: ['Parasites', 'Products', 'Ingredients', 'Safety'],
    language: '中文',
    heroKicker: 'For dog owners and vet conversations',
    heroTitle: 'Find common dog parasite products by coverage',
    heroText:
      'This tool summarizes common canine external parasites, intestinal worms, and heartworm prevention, with links to manufacturer or official label pages. It is educational only and does not replace veterinary diagnosis, testing, or prescriptions.',
    chooseParasite: 'Choose parasite target',
    allParasites: 'All parasites',
    productCount: 'matching products',
    clear: 'Clear filter',
    coverage: 'Spectrum',
    ingredients: 'Active ingredients',
    mechanism: 'Mechanism',
    source: 'Official source',
    region: 'Region',
    form: 'Form',
    age: 'Use range',
    prescription: 'Prescription',
    notes: 'Notes',
    covers: 'Covers',
    partial: 'Pair/limited',
    notCovered: 'Not covered',
    noMatch:
      'No single listed product clearly covers this target. Review combination options or ask a veterinarian to choose by local label.',
    parasiteScience: 'Parasite Education',
    transmission: 'Transmission',
    symptoms: 'Common signs',
    risk: 'Main risks',
    prevention: 'Prevention',
    vet: 'When to see a vet',
    ingredientLibrary: 'Ingredients and Mechanisms',
    safetyTitle: 'Safety Notes',
    sourcesTitle: 'Sources',
    filterHint:
      'After filtering by parasite, product cards highlight whether each product covers that target.',
  },
};

function tValue(value, lang) {
  if (typeof value === 'string') return value;
  return value?.[lang] ?? value?.zh ?? '';
}

function App() {
  const [lang, setLang] = useState('zh');
  const [selectedParasite, setSelectedParasite] = useState('all');
  const ui = copy[lang];

  const filteredProducts = useMemo(() => {
    if (selectedParasite === 'all') return productCatalog;
    return productCatalog.filter((product) => {
      const status = product.spectrum[selectedParasite];
      return status === 'covers' || status === 'partial';
    });
  }, [selectedParasite]);

  const selectedLabel =
    selectedParasite === 'all'
      ? ui.allParasites
      : tValue(parasiteTypes.find((item) => item.id === selectedParasite)?.label, lang);

  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="#top" aria-label={ui.appName}>
          <span className="brand-mark">K9</span>
          <span>
            <strong>{ui.appName}</strong>
            <small>{ui.appSubtitle}</small>
          </span>
        </a>
        <nav aria-label="Primary">
          {ui.nav.map((item, index) => (
            <a key={item} href={`#${['parasites', 'products', 'ingredients', 'safety'][index]}`}>
              {item}
            </a>
          ))}
        </nav>
        <button className="language-toggle" onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}>
          {ui.language}
        </button>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="kicker">{ui.heroKicker}</p>
            <h1 id="hero-title">{ui.heroTitle}</h1>
            <p>{ui.heroText}</p>
          </div>
          <div className="quick-panel" aria-label={ui.chooseParasite}>
            <label htmlFor="parasite-select">{ui.chooseParasite}</label>
            <select
              id="parasite-select"
              value={selectedParasite}
              onChange={(event) => setSelectedParasite(event.target.value)}
            >
              <option value="all">{ui.allParasites}</option>
              {parasiteTypes.map((parasite) => (
                <option key={parasite.id} value={parasite.id}>
                  {tValue(parasite.label, lang)}
                </option>
              ))}
            </select>
            <div className="stat-row">
              <strong>{filteredProducts.length}</strong>
              <span>{ui.productCount}</span>
            </div>
            <p>{ui.filterHint}</p>
          </div>
        </section>

        <section className="section" id="parasites" aria-labelledby="parasites-title">
          <div className="section-heading">
            <p className="kicker">{selectedLabel}</p>
            <h2 id="parasites-title">{ui.parasiteScience}</h2>
          </div>
          <div className="parasite-grid">
            {parasiteProfiles.map((parasite) => (
              <article className="info-card" key={parasite.id}>
                <div className="card-title-row">
                  <span className="icon-badge">{parasite.icon}</span>
                  <h3>{tValue(parasite.name, lang)}</h3>
                </div>
                <DefinitionList
                  items={[
                    [ui.transmission, parasite.transmission],
                    [ui.symptoms, parasite.symptoms],
                    [ui.risk, parasite.risk],
                    [ui.prevention, parasite.prevention],
                    [ui.vet, parasite.vet],
                  ]}
                  lang={lang}
                />
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="products" aria-labelledby="products-title">
          <div className="section-heading split">
            <div>
              <p className="kicker">{selectedLabel}</p>
              <h2 id="products-title">{ui.nav[1]}</h2>
            </div>
            {selectedParasite !== 'all' && (
              <button className="secondary-button" onClick={() => setSelectedParasite('all')}>
                {ui.clear}
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <p className="empty-state">{ui.noMatch}</p>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  lang={lang}
                  selectedParasite={selectedParasite}
                  ui={ui}
                />
              ))}
            </div>
          )}
        </section>

        <section className="section" id="ingredients" aria-labelledby="ingredients-title">
          <div className="section-heading">
            <p className="kicker">{ui.mechanism}</p>
            <h2 id="ingredients-title">{ui.ingredientLibrary}</h2>
          </div>
          <div className="ingredient-list">
            {ingredients.map((ingredient) => (
              <article className="ingredient-row" key={ingredient.name.en}>
                <div>
                  <h3>{tValue(ingredient.name, lang)}</h3>
                  <p>{tValue(ingredient.className, lang)}</p>
                </div>
                <p>{tValue(ingredient.mechanism, lang)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section safety-band" id="safety" aria-labelledby="safety-title">
          <div className="section-heading">
            <p className="kicker">{ui.notes}</p>
            <h2 id="safety-title">{ui.safetyTitle}</h2>
          </div>
          <div className="safety-grid">
            {safetyNotes.map((note) => (
              <article key={note.title.en}>
                <h3>{tValue(note.title, lang)}</h3>
                <p>{tValue(note.body, lang)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section sources" aria-labelledby="sources-title">
          <div className="section-heading">
            <p className="kicker">CAPC / ESCCAP / Labels</p>
            <h2 id="sources-title">{ui.sourcesTitle}</h2>
          </div>
          <div className="source-links">
            {sourceLinks.map((source) => (
              <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                {tValue(source.name, lang)}
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function ProductCard({ product, lang, selectedParasite, ui }) {
  const coverageStatus =
    selectedParasite === 'all' ? null : product.spectrum[selectedParasite] ?? 'notCovered';

  return (
    <article className="product-card">
      <div className="product-header">
        <div>
          <p className="region-tag">{tValue(product.region, lang)}</p>
          <h3>{tValue(product.name, lang)}</h3>
        </div>
        {coverageStatus && (
          <span className={`coverage-pill ${coverageStatus}`}>
            {coverageStatus === 'covers'
              ? ui.covers
              : coverageStatus === 'partial'
                ? ui.partial
                : ui.notCovered}
          </span>
        )}
      </div>

      <DefinitionList
        items={[
          [ui.ingredients, product.activeIngredients],
          [ui.mechanism, product.mechanism],
          [ui.form, product.form],
          [ui.age, product.useRange],
          [ui.prescription, product.prescription],
          [ui.notes, product.notes],
        ]}
        lang={lang}
      />

      <div className="spectrum-list" aria-label={ui.coverage}>
        {parasiteTypes.map((parasite) => {
          const status = product.spectrum[parasite.id] ?? 'notCovered';
          return (
            <span className={`spectrum-chip ${status}`} key={parasite.id}>
              {tValue(parasite.label, lang)}
            </span>
          );
        })}
      </div>

      <a className="source-button" href={product.sourceUrl} target="_blank" rel="noreferrer">
        {ui.source}
      </a>
    </article>
  );
}

function DefinitionList({ items, lang }) {
  return (
    <dl className="definition-list">
      {items.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{tValue(value, lang)}</dd>
        </div>
      ))}
    </dl>
  );
}

createRoot(document.getElementById('root')).render(<App />);
