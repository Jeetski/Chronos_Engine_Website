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

// Ensure a consistent navbar on all pages and add Guides dropdown
(function ensureNavbar(){
  try {
    const nav = document.getElementById('siteNav');
    if (!nav) return;
    const here = (p)=> window.location.pathname.replace(/\\+/g,'/');
    const isHome = /\/index\.html?$/.test(here()) || here() === '/' || here().endsWith('/Website/') || here().endsWith('/_site/');
    const featuresHref = isHome ? '#features' : '/index.html#features';
    const tpl = [
      `<a href="${featuresHref}">Features</a>`,
      `<a href="/pages/docs.html">Docs</a>`,
      `<div class="dropdown guides"><button class="menubtn" type="button">Guides</button><div class="menu">
         <a href="/pages/setup.html">Setup</a>
         <a href="/pages/dashboard.html">Dashboard Guide</a>
         <a href="/pages/template-builder.html">Template Builder</a>
         <a href="/pages/chs-scripting.html">CHS Scripting</a>
         <a href="/pages/conditions-cookbook.html">Conditions Cookbook</a>
         <a href="/pages/architecture.html">Architecture</a>
         <a href="/pages/settings.html">Settings</a>
         <a href="/pages/workflows.html">Workflows</a>
       </div></div>`,
      `<a href="/pages/agents.html">Agents</a>`,
      `<a href="/pages/commands.html">Commands</a>`,
      `<a href="/pages/license.html">License</a>`,
      `<a href="/pages/setup.html" class="cta">Get Started</a>`
    ].join('');
    nav.innerHTML = tpl;
    // Wire dropdown
    const dd = nav.querySelector('.dropdown.guides');
    if (dd){
      const btn = dd.querySelector('.menubtn');
      btn && btn.addEventListener('click', (e)=>{ e.stopPropagation(); dd.classList.toggle('open'); });
      document.addEventListener('click', ()=> dd.classList.remove('open'));
    }
  } catch {}
})();
