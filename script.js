// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('siteNav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => nav.classList.toggle('open'));
}

// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Smooth scroll for on-page anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id && id !== '#') {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    }
  });
});

// Normalize guide links to absolute /pages/... to avoid 404s from root
(function fixGuideLinks(){
  try {
    const isHttp = (h)=> /^https?:\/\//i.test(h);
    const needsFix = (h)=> h && h.endsWith('.html') && !h.startsWith('/pages/') && !isHttp(h) && !h.startsWith('#');
    const rewrite = (root)=>{
      (root.querySelectorAll ? root : document).querySelectorAll('a[href]').forEach(a => {
        const href = a.getAttribute('href') || '';
        if (href.startsWith('pages/')) a.setAttribute('href', '/pages/' + href.slice(6));
        else if (href.startsWith('/Website/pages/')) a.setAttribute('href', href.replace('/Website/pages/','/pages/'));
        else if (needsFix(href) && href.indexOf('/') === -1) a.setAttribute('href', '/pages/' + href);
      });
    };
    rewrite(document);
    try {
      const mo = new MutationObserver((muts)=>{
        muts.forEach(m=>{ m.addedNodes && m.addedNodes.forEach(n=>{ if (n && n.querySelectorAll) rewrite(n); }); });
      });
      mo.observe(document.documentElement, { childList: true, subtree: true });
    } catch {}
  } catch {}
})();
