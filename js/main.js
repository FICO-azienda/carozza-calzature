/* Carozza Calzature — interazioni del sito */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  /* ---------- Header compatto, barra mobile e scheda Visita ---------- */
  var header = document.querySelector('[data-header]');
  var quickbar = document.querySelector('.quickbar');
  var access = document.querySelector('[data-access]');
  var visit = document.getElementById('visita');

  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('is-compact', y > 60);
    if (quickbar) quickbar.classList.toggle('is-visible', y > 480);
    if (access) {
      access.classList.toggle('is-visible', y > window.innerHeight * 0.8);
      // Nascosta quando la sezione Orari e contatti è già sullo schermo
      var r = visit.getBoundingClientRect();
      access.classList.toggle('is-hidden-near', r.top < window.innerHeight && r.bottom > 0);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector('[data-menu-toggle]');
  var nav = document.querySelector('[data-nav]');

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.visually-hidden').textContent = open ? 'Chiudi il menu' : 'Apri il menu';
    nav.style.setProperty('--nav-top', header.getBoundingClientRect().bottom + 'px');
    nav.classList.toggle('is-open', open);
    header.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 1101px)').addEventListener('change', function (mq) {
    if (mq.matches) setMenu(false);
  });

  /* ---------- Voce di menu attiva ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav__list a'));
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          if (a.getAttribute('href') === '#' + entry.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (a) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) spy.observe(target);
    });
  }

  /* ---------- Orari: stato "aperto ora" calcolato sull'ora di Milano ---------- */
  // Orari dalla scheda Google Maps (minuti dalla mezzanotte). 0 = domenica.
  var TUE_SAT = [[570, 810], [930, 1170]];
  var HOURS = {
    0: [],
    1: [[600, 780], [930, 1170]],
    2: TUE_SAT, 3: TUE_SAT, 4: TUE_SAT, 5: TUE_SAT, 6: TUE_SAT
  };
  var DAY_NAMES = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];

  function fmt(min) {
    var h = Math.floor(min / 60), m = min % 60;
    return h + ':' + (m < 10 ? '0' : '') + m;
  }

  function romeNow() {
    try {
      var parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
      }).formatToParts(new Date());
      var map = {};
      parts.forEach(function (p) { map[p.type] = p.value; });
      var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(map.weekday);
      return { day: day, min: parseInt(map.hour, 10) * 60 + parseInt(map.minute, 10) };
    } catch (err) {
      var d = new Date();
      return { day: d.getDay(), min: d.getHours() * 60 + d.getMinutes() };
    }
  }

  function nextOpening(now) {
    for (var i = 0; i < 8; i++) {
      var day = (now.day + i) % 7;
      var slots = HOURS[day];
      for (var s = 0; s < slots.length; s++) {
        if (i > 0 || slots[s][0] > now.min) {
          var when = i === 0 ? 'oggi' : i === 1 ? 'domani' : DAY_NAMES[day];
          return when + ' alle ' + fmt(slots[s][0]);
        }
      }
    }
    return '';
  }

  function updateStatus() {
    var now = romeNow();
    var open = null;
    HOURS[now.day].forEach(function (slot) {
      if (now.min >= slot[0] && now.min < slot[1]) open = slot;
    });
    var text = open
      ? 'Aperto ora · chiude alle ' + fmt(open[1])
      : 'Chiuso ora · riapre ' + nextOpening(now);

    document.querySelectorAll('[data-status]').forEach(function (el) {
      el.classList.toggle('is-open', !!open);
      el.classList.toggle('is-closed', !open);
      el.querySelector('[data-status-text]').textContent = text;
    });
    document.querySelectorAll('.hours tr').forEach(function (row) {
      row.classList.toggle('is-today', Number(row.getAttribute('data-day')) === now.day);
    });
  }
  updateStatus();
  setInterval(updateStatus, 60 * 1000);

  /* ---------- Mappa caricata solo su richiesta ---------- */
  var mapBtn = document.querySelector('[data-map-load]');
  if (mapBtn) {
    mapBtn.addEventListener('click', function () {
      var map = document.querySelector('[data-map]');
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.google.com/maps?q=Carozza+Calzature,+Via+Luigi+Canonica+59,+20154+Milano&ll=45.47963,9.1725421&z=17&hl=it&output=embed';
      iframe.title = 'Mappa: Carozza Calzature, Via Luigi Canonica 59, Milano';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.setAttribute('allowfullscreen', '');
      map.appendChild(iframe);
      map.querySelector('[data-map-placeholder]').remove();
      iframe.focus();
    });
  }

  /* ---------- Comparsa allo scroll ---------- */
  var reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el, i) {
      // Piccolo ritardo a cascata per gli elementi fratelli (es. le card)
      var sibs = el.parentElement.querySelectorAll(':scope > [data-reveal]');
      if (sibs.length > 1) el.style.transitionDelay = (Array.prototype.indexOf.call(sibs, el) * 0.09) + 's';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Anno nel footer ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
