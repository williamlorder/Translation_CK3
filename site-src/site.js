(function () {
  var root = document.documentElement.getAttribute('data-root') || '';

  var menu = document.querySelector('.menu-toggle');
  if (menu) menu.addEventListener('click', function () { document.body.classList.toggle('menu-open'); });

  var themeBtn = document.querySelector('.theme-toggle');
  function themeLabel() {
    var dark = document.documentElement.getAttribute('data-theme') !== 'light';
    var label = themeBtn && themeBtn.querySelector('.tt-label');
    if (label) label.textContent = dark ? '浅色模式' : '深色模式';
  }
  if (themeBtn) {
    themeLabel();
    themeBtn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('ck3zh-theme', next); } catch (e) { /* storage unavailable */ }
      themeLabel();
    });
  }

  // Title search over the page index
  var input = document.getElementById('search');
  var box = document.getElementById('search-results');
  var index = null, active = -1;
  // Loaded through a script tag so search also works when the site is opened from disk.
  function load(cb) {
    if (index) return cb();
    if (window.CK3_SEARCH_INDEX) { index = window.CK3_SEARCH_INDEX; return cb(); }
    var s = document.createElement('script');
    s.src = root + 'search-index.js';
    s.onload = function () { index = window.CK3_SEARCH_INDEX || []; cb(); };
    s.onerror = function () { index = []; cb(); };
    document.head.appendChild(s);
  }
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function render() {
    var q = input.value.trim().toLowerCase();
    active = -1;
    if (!q) { box.classList.remove('open'); box.innerHTML = ''; return; }
    var hits = index.filter(function (p) { return p.z.toLowerCase().indexOf(q) >= 0 || p.e.toLowerCase().indexOf(q) >= 0; }).slice(0, 25);
    box.innerHTML = hits.length
      ? hits.map(function (p) { return '<a href="' + root + p.u + '">' + esc(p.z) + '<span class="en">' + esc(p.e) + '</span></a>'; }).join('')
      : '<div class="empty">没有找到匹配的页面</div>';
    box.classList.add('open');
  }
  if (input && box) {
    input.addEventListener('input', function () { load(render); });
    input.addEventListener('focus', function () { load(render); });
    input.addEventListener('keydown', function (e) {
      var links = box.querySelectorAll('a');
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!links.length) return;
        active = (active + (e.key === 'ArrowDown' ? 1 : links.length - 1)) % links.length;
        links.forEach(function (a, i) { a.classList.toggle('active', i === active); });
      } else if (e.key === 'Enter') {
        var target = links[active >= 0 ? active : 0];
        if (target) location.href = target.href;
      } else if (e.key === 'Escape') { box.classList.remove('open'); }
    });
    document.addEventListener('click', function (e) { if (!e.target.closest('.search')) box.classList.remove('open'); });
  }

  // Collapsible tables/blocks
  document.querySelectorAll('.mw-collapsible').forEach(function (el) {
    var t = document.createElement('span');
    t.className = 'mw-collapsible-toggle';
    var host = el.tagName === 'TABLE' ? el.querySelector('tr > th, tr > td') : el;
    if (!host) return;
    function label() { t.textContent = el.classList.contains('mw-collapsed') ? '[展开]' : '[折叠]'; }
    t.addEventListener('click', function () { el.classList.toggle('mw-collapsed'); label(); });
    label();
    host.insertBefore(t, host.firstChild);
  });

  // Sortable tables
  document.querySelectorAll('table.sortable').forEach(function (table) {
    var head = table.querySelector('tr');
    if (!head) return;
    Array.prototype.forEach.call(head.children, function (th, col) {
      if (th.tagName !== 'TH' || th.classList.contains('unsortable') || th.colSpan > 1) return;
      th.classList.add('headerSort');
      var asc = true;
      th.addEventListener('click', function () {
        var body = table.tBodies[0];
        var rows = Array.prototype.slice.call(body.rows).filter(function (r) { return r !== head && r.cells.length === head.cells.length; });
        rows.sort(function (a, b) {
          var x = (a.cells[col].getAttribute('data-sort-value') || a.cells[col].textContent).trim();
          var y = (b.cells[col].getAttribute('data-sort-value') || b.cells[col].textContent).trim();
          var nx = parseFloat(x.replace(/[^0-9.+-]/g, '')), ny = parseFloat(y.replace(/[^0-9.+-]/g, ''));
          var r = (!isNaN(nx) && !isNaN(ny) && /\d/.test(x) && /\d/.test(y)) ? nx - ny : x.localeCompare(y, 'zh');
          return asc ? r : -r;
        });
        rows.forEach(function (r) { body.appendChild(r); });
        asc = !asc;
      });
    });
  });
})();
