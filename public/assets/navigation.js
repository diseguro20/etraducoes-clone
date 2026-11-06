/* Navigation deliberately does not depend on the animation engine. */
(function () {
  'use strict';
  const root = document.documentElement;
  const aliases = { '/index.html': '/', '/index': '/' };
  function normalize(value) {
    const url = new URL(value, location.href);
    if (url.origin === location.origin) {
      url.pathname = aliases[url.pathname] || url.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
    }
    return url;
  }
  let hooks = {};
  let navigating = false;
  let destinationTimer;
  let recoveryTimer;
  let destination;
  function recover() {
    clearTimeout(destinationTimer);
    clearTimeout(recoveryTimer);
    navigating = false;
    destination = null;
    root.classList.remove('is-entering', 'is-loading-first', 'menu-open', 'cart-open', 'search-open', 'is-navigating');
    document.body?.classList.remove('is-loading');
    document.querySelectorAll('.liquid,.liquid-logo,.liquid-count,.loader-bg').forEach(el => {
      el.classList.remove('is-on');
      el.style.visibility = 'hidden';
      el.style.pointerEvents = 'none';
    });
    document.querySelectorAll('[data-brand-logo]').forEach(el => el.style.visibility = '');
    try { hooks.resume?.(); } catch (error) { console.warn('Navigation recovery:', error); }
  }
  window.TraduzTudoNavigation = {
    configure(value) { hooks = value; },
    ready() { clearTimeout(startupTimer); },
    recover,
    normalize
  };
  const startupTimer = setTimeout(() => {
    if (navigating) return;
    recover();
    root.classList.add('motion-recovered');
  }, 6500);
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href]');
    if (!link || event.defaultPrevented || event.button > 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const target = normalize(link.href);
    if (!/^https?:$/.test(target.protocol) || target.origin !== location.origin) return;
    const current = normalize(location.href);
    if (target.pathname === current.pathname && target.search === current.search) {
      if (target.hash) {
        let node;
        try { node = document.getElementById(decodeURIComponent(target.hash.slice(1))); } catch { return; }
        if (node) {
          event.preventDefault();
          recover();
          history.pushState(null, '', target.pathname + target.search + target.hash);
          try { if (hooks.scroll) hooks.scroll(node); else node.scrollIntoView({behavior:'smooth'}); }
          catch { node.scrollIntoView(); }
        }
      } else {
        event.preventDefault();
        recover();
        try { if (hooks.scroll) hooks.scroll(0); else window.scrollTo({top:0,behavior:'smooth'}); }
        catch { window.scrollTo(0,0); }
      }
      return;
    }
    // Native navigation remains the fallback even before animation initialization.
    link.href = target.href;
    if (!hooks.exit || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    event.preventDefault();
    if (navigating) return;
    navigating = true;
    root.classList.remove('menu-open', 'cart-open', 'search-open');
    root.classList.add('is-navigating');
    destination = target.href;
    const go = () => location.assign(target.href);
    destinationTimer = setTimeout(go, 850);
    recoveryTimer = setTimeout(recover, 6000);
    try { hooks.exit(); }
    catch (error) { clearTimeout(destinationTimer); go(); }
  });
  window.addEventListener('pageshow', event => { if (event.persisted) recover(); });
  function onFailure() {
    if (navigating && destination) {
      clearTimeout(destinationTimer);
      location.assign(destination);
      return;
    }
    recover();
    root.classList.add('motion-recovered');
  }
  window.addEventListener('error', onFailure);
  window.addEventListener('unhandledrejection', onFailure);
})();
