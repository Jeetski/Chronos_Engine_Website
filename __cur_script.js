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

// Guides dropdown toggle (click to open/close)
(function(){
  try{
    document.querySelectorAll('.dropdown.guides .menubtn').forEach(function(btn){
      var dd = btn.closest('.dropdown.guides');
      btn.addEventListener('click', function(e){ e.stopPropagation(); dd.classList.toggle('open'); });
    });
    document.addEventListener('click', function(){
      document.querySelectorAll('.dropdown.guides').forEach(function(dd){ dd.classList.remove('open'); });
    });
  }catch(e){}
})();

