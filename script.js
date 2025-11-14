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
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href.startsWith('pages/')) a.setAttribute('href', '/pages/' + href.slice(6));
      else if (href.startsWith('/Website/pages/')) a.setAttribute('href', href.replace('/Website/pages/','/pages/'));
      else if (needsFix(href) && href.indexOf('/') === -1) a.setAttribute('href', '/pages/' + href);
    });
  } catch {}
})();

// Inject Guides dropdown into navbar
(function(){
  const nav = document.getElementById('siteNav');
  if (!nav) return;
  // Avoid duplicate injection
  if (document.getElementById('guidesDropdown')) return;
  const dd = document.createElement('div');
  dd.className = 'dropdown';
  dd.id = 'guidesDropdown';
  dd.innerHTML = `
    <a href="#">Guides ▾</a>
    <div class="dropdown-menu">
      <a href="architecture.html">Architecture</a>
      <a href="dashboard.html">Dashboard</a>
      <a href="settings.html">Settings</a>
      <a href="workflows.html">Common Workflows</a>
      <a href="chs-scripting.html">CHS Scripting</a>
      <a href="conditions-cookbook.html">Conditions Cookbook</a>
    </div>
  `;
  nav.insertBefore(dd, nav.querySelector('.cta'));
  // Toggle on click for mobile
  dd.addEventListener('click', (e)=>{
    // If clicking a link, let it navigate
    if (e.target && e.target.tagName === 'A' && e.target.getAttribute('href') !== '#') return;
    e.preventDefault(); e.stopPropagation();
    dd.classList.toggle('open');
  });
  // Close when clicking elsewhere
  document.addEventListener('click', ()=> dd.classList.remove('open'));
})();
