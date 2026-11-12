/* Crescer Pediatria Integrada — comportamento da landing page.
   Sem dependências. Eventos de medição saem pelo dataLayer (ver TRACKING.md). */
(function () {
  'use strict';

  var cfg = window.CRESCER_CONFIG || {};
  window.dataLayer = window.dataLayer || [];

  function track(eventName, params) {
    var payload = { event: eventName };
    if (params) { for (var k in params) { if (Object.prototype.hasOwnProperty.call(params, k)) payload[k] = params[k]; } }
    window.dataLayer.push(payload);
  }
  function gtag() { window.dataLayer.push(arguments); }

  /* ---------- Utilidades ---------- */
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- Rodapé: ano e campos opcionais ---------- */
  var ano = $('#ano');
  if (ano) ano.textContent = new Date().getFullYear();

  var rt = $('#rt-line');
  if (rt) {
    var parts = [cfg.responsavelTecnico, cfg.horario].filter(Boolean);
    if (parts.length) { rt.textContent = parts.join(' · '); rt.hidden = false; }
  }

  /* ---------- Imagens opcionais (somem se o arquivo não existir) ---------- */
  $$('img[data-optional]').forEach(function (img) {
    var drop = function () { img.remove(); };
    if (img.complete && img.naturalWidth === 0) drop();
    else img.addEventListener('error', drop, { once: true });
  });

  /* ---------- Header e menu mobile ---------- */
  var header = $('.site-header');
  var onScrollHeader = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  var toggle = $('.menu-toggle');
  var mobileNav = $('#menu-mobile');
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    mobileNav.classList.toggle('is-open', open);
  }
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
    $$('a', mobileNav).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  /* ---------- Animação de entrada ---------- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Origem do tráfego: leva utm_source para a conversa do WhatsApp ----------
     Assim a clínica sabe de onde veio cada contato (ex.: "(origem: google)"). */
  var qs = new URLSearchParams(window.location.search);
  var src = qs.get('utm_source');
  if (src) {
    var camp = qs.get('utm_campaign');
    var tag = '(origem: ' + src + (camp ? ' / ' + camp : '') + ')';
    try { sessionStorage.setItem('crescer_origem', tag); } catch (e) {}
  }
  var origem = null;
  try { origem = sessionStorage.getItem('crescer_origem'); } catch (e) {}
  function withOrigem(url) {
    if (!origem) return url;
    try {
      var u = new URL(url);
      var t = u.searchParams.get('text') || '';
      u.searchParams.set('text', (t ? t + '\n\n' : '') + origem);
      return u.toString();
    } catch (e) { return url; }
  }
  if (origem) {
    $$('a[href^="https://wa.me/"]').forEach(function (a) { a.href = withOrigem(a.href); });
  }

  /* ---------- Medição: cliques ----------
     generate_lead é o evento de CONVERSÃO (Google Ads / Meta Lead).
     Os demais são eventos de apoio (análise). */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-track]');
    if (!el) return;
    var type = el.getAttribute('data-track');
    var location = el.getAttribute('data-location') || 'desconhecido';
    var base = { link_location: location };

    if (type === 'whatsapp') {
      track('whatsapp_click', base);
      track('generate_lead', { method: 'whatsapp', link_location: location });
    } else if (type === 'phone') {
      track('phone_click', base);
      track('generate_lead', { method: 'phone', link_location: location });
    } else if (type === 'maps') {
      track('maps_click', base);
    } else if (type === 'instagram') {
      track('instagram_click', base);
    }
  });

  /* ---------- Medição: profundidade de rolagem ---------- */
  var marks = [25, 50, 75, 90];
  var sent = {};
  var ticking = false;
  function checkScroll() {
    ticking = false;
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    if (max <= 0) return;
    var pct = Math.round((window.scrollY / max) * 100);
    marks.forEach(function (m) {
      if (pct >= m && !sent[m]) { sent[m] = true; track('scroll_depth', { percent: m }); }
    });
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(checkScroll); }
  }, { passive: true });

  /* ---------- Medição: FAQ ---------- */
  $$('.faq details').forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) track('faq_open', { question: d.querySelector('summary').textContent.trim() });
    });
  });

  /* ---------- Formulário -> WhatsApp ---------- */
  var form = $('#form-agendar');
  if (form) {
    var started = false;
    form.addEventListener('input', function () {
      if (!started) { started = true; track('form_start'); }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nome = form.nome.value.trim();
      var idade = form.idade.value;
      var motivo = form.motivo.value;
      var ok = true;

      [['nome', nome], ['idade', idade]].forEach(function (pair) {
        var field = form[pair[0]].closest('.field');
        var bad = !pair[1];
        field.classList.toggle('has-error', bad);
        if (bad) ok = false;
      });
      if (!ok) {
        var first = $('.field.has-error input, .field.has-error select', form);
        if (first) first.focus();
        return;
      }

      var msg = 'Olá! Meu nome é ' + nome + '. Gostaria de agendar uma consulta (' + idade + ').';
      if (motivo) msg += ' Motivo: ' + motivo + '.';
      var url = withOrigem('https://wa.me/5596981074126?text=' + encodeURIComponent(msg));

      track('form_submit', { form_id: 'agendar' });
      track('generate_lead', { method: 'form_whatsapp', link_location: 'formulario' });

      var win = window.open(url, '_blank', 'noopener');
      if (!win) window.location.href = url;
    });
  }

  /* ---------- Mapa: só carrega com clique (evita cookies de terceiros) ---------- */
  var loadMap = $('#load-map');
  if (loadMap) {
    loadMap.addEventListener('click', function () {
      var box = $('#map-box');
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.google.com/maps?q=0.0433638,-51.0766207&hl=pt-BR&z=16&output=embed';
      iframe.title = 'Mapa com a localização da Crescer Pediatria Integrada';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      box.textContent = '';
      box.appendChild(iframe);
      track('map_loaded');
    });
  }

  /* ---------- Botões fixos: saem de cena quando já há um botão grande na tela ---------- */
  var floaters = $$('.wa-float, .sticky-cta');
  var anchors = $$('#agendar, .cta-final, .site-footer');
  if (floaters.length && anchors.length && 'IntersectionObserver' in window) {
    var visible = new Set();
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) visible.add(en.target); else visible.delete(en.target);
      });
      var hide = visible.size > 0;
      floaters.forEach(function (f) { f.classList.toggle('is-hidden', hide); });
    }, { threshold: 0.15 });
    anchors.forEach(function (a) { io2.observe(a); });
  }

  /* ---------- Consentimento (LGPD / Consent Mode v2) ---------- */
  var consent = $('#consent');
  function applyConsent(granted) {
    var v = granted ? 'granted' : 'denied';
    gtag('consent', 'update', {
      ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v
    });
    store.set('crescer_consent', v);
    track('consent_update', { consent_state: v });
    consent.hidden = true;
  }
  if (consent) {
    if (!store.get('crescer_consent')) consent.hidden = false;
    $('#consent-aceitar').addEventListener('click', function () { applyConsent(true); });
    $('#consent-recusar').addEventListener('click', function () { applyConsent(false); });
    var reopen = $('#reabrir-consent');
    if (reopen) reopen.addEventListener('click', function (e) { e.preventDefault(); consent.hidden = false; });
  }
})();
