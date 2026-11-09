/* Li Construction LLC: renders the page from data/site-data.js */
(function () {
  'use strict';

  var D = window.SITE_DATA;
  if (!D) {
    console.error('data/site-data.js did not load.');
    return;
  }
  document.documentElement.classList.add('js');

  /* ---------- helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function el(tag, props) {
    var node = document.createElement(tag);
    props = props || {};
    Object.keys(props).forEach(function (k) {
      var v = props[k];
      if (v === null || v === undefined || v === false) return;
      if (k === 'class') node.className = v;
      else if (k === 'text') node.textContent = v;
      else if (k === 'html') node.innerHTML = v; /* trusted icon markup only */
      else if (k.indexOf('on') === 0 && typeof v === 'function') node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v === true ? '' : v);
    });
    for (var i = 2; i < arguments.length; i++) {
      var kids = [].concat(arguments[i]);
      kids.forEach(function (c) {
        if (c === null || c === undefined || c === false) return;
        node.append(c.nodeType ? c : document.createTextNode(String(c)));
      });
    }
    return node;
  }

  var ICONS = {
    home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    bath: '<path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M6 12V6a2 2 0 0 1 2-2h1"/><path d="M7 19l-1 2M17 19l1 2"/>',
    roof: '<path d="M3 15l9-9 9 9"/><path d="M7 15l5-5 5 5"/><path d="M5 21h14"/>',
    paint: '<rect x="4" y="3" width="14" height="6" rx="1"/><path d="M18 6h2v5h-8v3"/><rect x="10" y="14" width="4" height="7" rx="1"/>',
    deck: '<path d="M3 9h18v3H3z"/><path d="M3 15h18v3H3z"/><path d="M6 12v3M18 12v3M6 18v3M18 18v3"/>',
    hammer: '<path d="M14 5l5 5-3 3-5-5z"/><path d="M12 9L4 17l3 3 8-8"/><path d="M16 4l4 4"/>',
    ruler: '<path d="M3 17L17 3l4 4L7 21z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    badge: '<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5A.5.5 0 0 1 14 8z"/>',
    instagram: '<rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.5"/><circle cx="17" cy="7" r=".6"/>',
    youtube: '<rect x="3" y="6" width="18" height="12" rx="3"/><path d="M10 9.5v5l4.5-2.5z"/>',
    google: '<circle cx="12" cy="12" r="8"/><path d="M12 12h7"/><path d="M19 12a7 7 0 0 1-7 7"/>'
  };
  function icon(name) {
    var path = ICONS[name] || ICONS.hammer;
    return el('span', { html: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + path + '</svg>' }).firstChild;
  }
  function telHref(p) { return 'tel:' + String(p || '').replace(/[^+\d]/g, ''); }
  function has(v) { return Array.isArray(v) ? v.length > 0 : !!v; }
  function hide(id) { var n = document.getElementById(id); if (n) n.hidden = true; }
  function sectionHead(target, titleId, s) {
    var node = document.getElementById(target);
    node.innerHTML = '';
    if (s.eyebrow) node.append(el('p', { class: 'eyebrow', text: s.eyebrow }));
    node.append(el('h2', { id: titleId, text: s.heading }));
    if (s.intro) node.append(el('p', { text: s.intro }));
  }
  function btn(b, cls) {
    return el('a', { class: 'btn ' + cls, href: b.href, text: b.label });
  }

  var C = D.company || {};

  /* ---------- meta + brand ---------- */
  if (D.seo) {
    document.title = D.seo.title;
    var md = $('meta[name="description"]');
    if (md) md.setAttribute('content', D.seo.description || '');
    var ogt = $('meta[property="og:title"]');
    var ogd = $('meta[property="og:description"]');
    if (ogt) ogt.setAttribute('content', D.seo.title || '');
    if (ogd) ogd.setAttribute('content', D.seo.description || '');
  }
  $$('[data-bind="brandName"]').forEach(function (n) { n.textContent = (C.name || '').toUpperCase(); });
  $$('[data-bind="brandSuffix"]').forEach(function (n) { n.textContent = C.suffix || ''; });

  /* ---------- header ---------- */
  var nav = $('#nav');
  (D.nav || []).forEach(function (n) { nav.append(el('a', { href: n.href, text: n.label })); });
  var hp = $('#headerPhone');
  if (C.phone) {
    hp.href = telHref(C.phone);
    hp.setAttribute('aria-label', 'Call ' + C.phone);
    hp.append(icon('phone'), el('span', { text: C.phone }));
  } else { hp.hidden = true; }

  var toggle = $('#navToggle');
  function setNav(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }
  toggle.addEventListener('click', function () { setNav(!nav.classList.contains('open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setNav(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setNav(false); });

  /* ---------- hero ---------- */
  var H = D.hero || {};
  $('#heroEyebrow').textContent = H.eyebrow || '';
  if (!H.eyebrow) $('#heroEyebrow').hidden = true;
  $('#heroHeadline').textContent = H.headline || '';
  $('#heroAccent').textContent = H.headlineAccent || '';
  $('#heroText').textContent = H.text || '';
  var hb = $('#heroButtons');
  if (H.primaryButton) hb.append(btn(H.primaryButton, 'btn-gold'));
  if (H.secondaryButton) hb.append(btn(H.secondaryButton, 'btn-outline-light'));
  if (H.image) $('#hero').style.setProperty('--hero-img', 'url("' + H.image + '")');
  var card = $('#heroCard');
  if (has(H.points)) {
    card.append(el('h2', { text: H.pointsTitle || '' }));
    card.append(el('ul', { class: 'check-list' }, H.points.map(function (p) {
      return el('li', {}, icon('check'), el('span', { text: p }));
    })));
  } else { card.hidden = true; }

  /* ---------- services ---------- */
  var S = D.services;
  if (S && has(S.items)) {
    sectionHead('servicesHead', 'servicesTitle', S);
    var sg = $('#servicesGrid');
    S.items.forEach(function (s) {
      sg.append(el('article', { class: 'card reveal' },
        el('div', { class: 'icon-badge' }, icon(s.icon)),
        el('h3', { text: s.title }),
        el('p', { text: s.description })
      ));
    });
  } else { hide('services'); }

  /* ---------- projects ---------- */
  var P = D.projects;
  var dialog = $('#projectDialog');
  var dialogBody = $('#dialogBody');
  var closeBtn = $('#dialogClose');
  closeBtn.append(icon('close'));
  var lastFocus = null;

  function placeholder() { return el('div', { class: 'placeholder', 'aria-hidden': 'true' }, icon('home')); }
  function media(src, alt) {
    return src ? el('img', { src: src, alt: alt || '', loading: 'lazy' }) : placeholder();
  }

  function openProject(p) {
    lastFocus = document.activeElement;
    dialogBody.innerHTML = '';
    dialogBody.append(el('div', { class: 'dialog-media' }, media(p.image, p.title)));
    var meta = el('div', { class: 'dialog-meta' });
    [p.category, p.location, p.year, p.scope].forEach(function (m) { if (m) meta.append(el('span', { text: m })); });
    dialogBody.append(el('div', { class: 'dialog-content' },
      el('h2', { id: 'dialogTitle', text: p.title }), meta, el('p', { text: p.summary || '' })));
    if (has(p.gallery)) {
      dialogBody.append(el('div', { class: 'dialog-gallery' }, p.gallery.map(function (g) {
        return el('img', { src: g, alt: p.title + ' photo', loading: 'lazy' });
      })));
    }
    if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
    closeBtn.focus();
  }
  closeBtn.addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close', function () { if (lastFocus) lastFocus.focus(); });

  if (P && has(P.items)) {
    sectionHead('projectsHead', 'projectsTitle', P);
    var grid = $('#projectsGrid');
    var filters = $('#projectFilters');
    var cats = ['All'];
    P.items.forEach(function (p) { if (p.category && cats.indexOf(p.category) < 0) cats.push(p.category); });

    var cards = P.items.map(function (p) {
      var b = el('button', { class: 'project reveal', type: 'button', 'data-cat': p.category || '', 'aria-label': 'View project: ' + p.title },
        el('div', { class: 'project-media' }, media(p.image, ''), p.category ? el('span', { class: 'project-tag', text: p.category }) : null),
        el('div', { class: 'project-info' },
          el('h3', { text: p.title }),
          el('p', { text: [p.location, p.year].filter(Boolean).join(' | ') }))
      );
      b.addEventListener('click', function () { openProject(p); });
      grid.append(b);
      return b;
    });

    if (cats.length > 2) {
      cats.forEach(function (c, i) {
        var f = el('button', { class: 'filter', type: 'button', 'aria-pressed': String(i === 0), text: c });
        f.addEventListener('click', function () {
          $$('.filter', filters).forEach(function (x) { x.setAttribute('aria-pressed', String(x === f)); });
          cards.forEach(function (card) { card.hidden = !(c === 'All' || card.getAttribute('data-cat') === c); });
        });
        filters.append(f);
      });
    } else { filters.hidden = true; }
  } else { hide('projects'); }

  /* ---------- about ---------- */
  var A = D.about;
  if (A) {
    var am = $('#aboutMedia');
    if (A.image) am.append(el('img', { src: A.image, alt: '', loading: 'lazy' }));
    else am.append(placeholder());
    var ac = $('#aboutCopy');
    if (A.eyebrow) ac.append(el('p', { class: 'eyebrow', text: A.eyebrow }));
    ac.append(el('h2', { id: 'aboutTitle', text: A.heading }));
    (A.paragraphs || []).forEach(function (t) { ac.append(el('p', { text: t })); });
    if (has(A.points)) {
      ac.append(el('ul', { class: 'check-list' }, A.points.map(function (p) {
        return el('li', {}, icon('badge'), el('span', { text: p }));
      })));
    }
  } else { hide('about'); }

  /* ---------- stats ---------- */
  if (has(D.stats)) {
    var sg2 = $('#statsGrid');
    D.stats.forEach(function (s) {
      sg2.append(el('div', {}, el('div', { class: 'stat-value', text: s.value }), el('div', { class: 'stat-label', text: s.label })));
    });
  } else { hide('stats'); }

  /* ---------- process ---------- */
  var PR = D.process;
  if (PR && has(PR.steps)) {
    sectionHead('processHead', 'processTitle', PR);
    var ps = $('#processSteps');
    PR.steps.forEach(function (s, i) {
      ps.append(el('li', { class: 'step reveal' },
        el('div', { class: 'step-num', text: String(i + 1) }),
        el('h3', { text: s.title }), el('p', { text: s.text })));
    });
  } else { hide('process'); }

  /* ---------- reviews ---------- */
  var R = D.reviews;
  if (R && has(R.items)) {
    sectionHead('reviewsHead', 'reviewsTitle', R);
    var rg = $('#reviewsGrid');
    R.items.forEach(function (r) {
      rg.append(el('figure', { class: 'review reveal', style: 'margin:0' },
        el('blockquote', { text: '“' + r.quote + '”' }),
        el('figcaption', {}, el('div', { class: 'review-name', text: r.name }), el('div', { class: 'review-detail', text: r.detail || '' }))));
    });
  } else { hide('reviews'); }

  /* ---------- CTA ---------- */
  var T = D.cta;
  if (T) {
    var ci = $('#ctaInner');
    ci.append(el('div', {}, el('h2', { id: 'ctaTitle', text: T.heading }), el('p', { text: T.text || '' })));
    if (T.button) ci.append(btn(T.button, 'btn-black'));
  } else { hide('cta'); }

  /* ---------- contact ---------- */
  var K = D.contact || {};
  var info = $('#contactInfo');
  if (K.eyebrow) info.append(el('p', { class: 'eyebrow', text: K.eyebrow }));
  info.append(el('h2', { id: 'contactTitle', text: K.heading || 'Contact' }));
  if (K.intro) info.append(el('p', { text: K.intro }));
  var list = el('ul', { class: 'info-list' });
  function infoItem(ic, label, content) {
    list.append(el('li', {}, el('div', { class: 'icon-badge' }, icon(ic)),
      el('div', {}, el('span', { class: 'info-label', text: label }), content)));
  }
  if (C.phone) infoItem('phone', 'Phone', el('a', { href: telHref(C.phone), text: C.phone }));
  if (C.email) infoItem('mail', 'Email', el('a', { href: 'mailto:' + C.email, text: C.email }));
  if (C.address) infoItem('pin', 'Address', el('span', { text: C.address }));
  if (C.hours) infoItem('clock', 'Hours', el('span', { text: C.hours }));
  if (has(C.serviceAreas)) infoItem('pin', 'Service areas', el('span', { text: C.serviceAreas.join(', ') }));
  if (C.license) infoItem('badge', 'License', el('span', { text: C.license }));
  info.append(list);

  var svc = $('#qService');
  svc.append(el('option', { value: '', text: 'Select a service' }));
  if (D.services && has(D.services.items)) {
    D.services.items.forEach(function (s) { svc.append(el('option', { value: s.title, text: s.title })); });
  }
  svc.append(el('option', { value: 'Other', text: 'Other' }));
  if (K.submitLabel) $('#qSubmit').textContent = K.submitLabel;

  var form = $('#quoteForm');
  var statusEl = $('#formStatus');
  function setStatus(msg, kind) {
    statusEl.textContent = msg;
    statusEl.className = 'form-status' + (kind ? ' ' + kind : '');
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = v; });
    if (data.website) return; /* honeypot */
    delete data.website;

    if (K.formEndpoint) {
      setStatus('Sending...', '');
      fetch(K.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (r) {
        if (!r.ok) throw new Error('bad response');
        setStatus('Thanks, we got your request and will be in touch soon.', 'ok');
        form.reset();
      }).catch(function () {
        setStatus('Something went wrong. Please call or email us instead.', 'error');
      });
    } else {
      var body = 'Name: ' + data.name + '\nPhone: ' + data.phone + '\nEmail: ' + data.email +
        '\nService: ' + (data.service || 'Not specified') + '\n\n' + data.message;
      var href = 'mailto:' + (C.email || '') + '?subject=' + encodeURIComponent('Quote request from ' + data.name) +
        '&body=' + encodeURIComponent(body);
      setStatus('Opening your email app. If nothing happens, email us at ' + (C.email || 'the address above') + '.', 'ok');
      window.location.href = href;
    }
  });

  /* ---------- footer ---------- */
  var fg = $('#footerGrid');
  var fb = el('div', {},
    el('div', { class: 'footer-brand' },
      el('img', { src: 'assets/logo-icon.svg', alt: '' }),
      el('div', { class: 'brand-text' },
        el('span', { class: 'brand-name', text: (C.name || '').toUpperCase() }),
        el('span', { class: 'brand-suffix', text: C.suffix || '' }))),
    el('p', { text: C.about || '' }));
  var soc = D.social || {};
  var socKeys = Object.keys(soc).filter(function (k) { return soc[k]; });
  if (socKeys.length) {
    fb.append(el('div', { class: 'social' }, socKeys.map(function (k) {
      return el('a', { href: soc[k], 'aria-label': k.charAt(0).toUpperCase() + k.slice(1), target: '_blank', rel: 'noopener' }, icon(k));
    })));
  }
  fg.append(fb);
  fg.append(el('div', {}, el('h3', { text: 'Explore' }),
    el('ul', { class: 'footer-links' }, (D.nav || []).map(function (n) { return el('li', {}, el('a', { href: n.href, text: n.label })); }))));
  var contactCol = el('div', {}, el('h3', { text: 'Contact' }));
  var cl = el('ul', { class: 'footer-links' });
  if (C.phone) cl.append(el('li', {}, el('a', { href: telHref(C.phone), text: C.phone })));
  if (C.email) cl.append(el('li', {}, el('a', { href: 'mailto:' + C.email, text: C.email })));
  if (C.address) cl.append(el('li', { text: C.address }));
  if (C.hours) cl.append(el('li', { text: C.hours }));
  contactCol.append(cl);
  fg.append(contactCol);

  var bottom = $('#footerBottom');
  bottom.append(el('span', { text: '© ' + new Date().getFullYear() + ' ' + (C.name || '') + ' ' + (C.suffix || '') + '. All rights reserved.' }));
  if (C.license) bottom.append(el('span', { text: C.license }));

  /* ---------- scroll effects ---------- */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (n) { io.observe(n); });
  } else {
    reveals.forEach(function (n) { n.classList.add('in'); });
  }

  if ('IntersectionObserver' in window) {
    var links = $$('a', nav);
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href')] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var a = map['#' + en.target.id];
        if (a && en.isIntersecting) {
          links.forEach(function (x) { x.removeAttribute('aria-current'); });
          a.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (a) {
      var t = document.getElementById((a.getAttribute('href') || '').slice(1));
      if (t) spy.observe(t);
    });
  }
})();
