/* Nocturne · 夜航玻璃拟态主题脚本（无依赖） */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 导航：滚动后玻璃略微提亮、加深投影 ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 移动端菜单 ---------- */
  var menuBtn = document.getElementById('menuBtn');
  function closeMenu() {
    if (!nav || !menuBtn) return;
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  var mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 820) closeMenu();
  });

  /* ---------- 文章内容增强：表格包裹 + 代码工具条 ---------- */
  document.querySelectorAll('.article-entry table').forEach(function (table) {
    if (table.parentElement && table.parentElement.classList.contains('table-wrap')) return;
    var wrap = document.createElement('div');
    wrap.className = 'table-wrap';
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
  });

  document.querySelectorAll('.article-entry figure.highlight').forEach(function (fig) {
    if (fig.querySelector('.code-toolbar')) return;
    var toolbar = document.createElement('div');
    toolbar.className = 'code-toolbar';

    /* 语言标签：从 figure 的 class（highlight <lang>）中提取 */
    var lang = '';
    fig.classList.forEach(function (cls) {
      if (cls !== 'highlight' && cls !== 'hljs' && !lang) lang = cls;
    });
    var label = document.createElement('span');
    label.className = 'code-lang';
    label.textContent = lang || 'code';
    label.setAttribute('aria-hidden', 'true');
    toolbar.appendChild(label);

    /* 复制按钮 */
    var copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'code-copy';
    copy.textContent = '复制';
    copy.setAttribute('aria-label', '复制代码');
    copy.addEventListener('click', function () {
      var codeEl = fig.querySelector('td.code') || fig;
      var text = codeEl.innerText.replace(/\n+$/, '');
      var done = function () {
        copy.textContent = '已复制';
        copy.classList.add('copied');
        setTimeout(function () {
          copy.textContent = '复制';
          copy.classList.remove('copied');
        }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) { /* noop */ }
        document.body.removeChild(ta);
        done();
      }
    });
    toolbar.appendChild(copy);
    fig.appendChild(toolbar);
  });

  /* ---------- 入场渐显（IntersectionObserver + spring 缓动） ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.remove('reveal'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = parseInt(el.dataset.delay || '0', 10);
        el.style.setProperty('--d', delay + 'ms');
        el.classList.add('on');
        io.unobserve(el);
        /* 动画结束后摘掉 reveal 类，把 transform/transition 还给 hover */
        setTimeout(function () {
          el.classList.remove('reveal', 'on');
          el.style.removeProperty('--d');
        }, delay + 720);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 光斑视差：鼠标移动时三个光源轻微漂移 ---------- */
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var wells = [
    document.getElementById('well1'),
    document.getElementById('well2'),
    document.getElementById('well3')
  ].filter(Boolean);
  if (!reduced && fine && wells.length) {
    var depths = [26, -18, 14];
    var tx = 0, ty = 0, cx = 0, cy = 0, rafId = null;
    var step = function () {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      wells.forEach(function (w, i) {
        var d = depths[i] || 0;
        w.style.transform = 'translate3d(' + (-cx * d).toFixed(2) + 'px,' + (-cy * d).toFixed(2) + 'px,0)';
      });
      if (Math.abs(tx - cx) < 0.0005 && Math.abs(ty - cy) < 0.0005) {
        rafId = null;
        return;
      }
      rafId = requestAnimationFrame(step);
    };
    window.addEventListener('pointermove', function (e) {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      if (rafId === null) rafId = requestAnimationFrame(step);
    }, { passive: true });
  }
  /* ---------- 文章目录（TOC）：桌面端右侧粘性玻璃面板 ---------- */
  var entry = document.querySelector('.article-entry');
  var layout = document.getElementById('postLayout');
  var tocNav = document.getElementById('toc');
  if (entry && layout && tocNav) {
    var headings = entry.querySelectorAll('h2, h3');
    if (headings.length >= 3) {
      layout.classList.add('toc-on');
      headings.forEach(function (h, i) {
        if (!h.id) h.id = 'h-' + (i + 1);
        var a = document.createElement('a');
        a.className = 'toc-link toc-' + h.tagName.toLowerCase();
        a.href = '#' + h.id;
        a.textContent = h.textContent;
        a.setAttribute('data-target', h.id);
        tocNav.appendChild(a);
      });
      var links = tocNav.querySelectorAll('.toc-link');
      var setActive = function () {
        var current = headings[0];
        for (var i = 0; i < headings.length; i++) {
          if (headings[i].getBoundingClientRect().top <= 130) current = headings[i];
        }
        links.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('data-target') === current.id);
        });
      };
      var spyTicking = false;
      window.addEventListener('scroll', function () {
        if (!spyTicking) {
          spyTicking = true;
          requestAnimationFrame(function () { spyTicking = false; setActive(); });
        }
      }, { passive: true });
      setActive();
    }
  }
})();
