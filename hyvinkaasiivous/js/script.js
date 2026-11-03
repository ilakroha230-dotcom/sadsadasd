(function () {
  'use strict';

  function initNav() {
    const burger = document.getElementById('navBurger');
    const links = document.getElementById('navLinks');
    if (!burger || !links) return;
    burger.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }));
  }

  function initHeader() {
    const header = document.getElementById('siteHeader');
    if (!header) return;
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initReveal() {
    const els = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      els.forEach(e => e.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach(e => io.observe(e));
  }

  function initForm() {
    const form = document.getElementById('contactForm');
    const info = document.getElementById('formInfo');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const name = form.name.value.trim();
      const company = form.company.value.trim();
      const phone = form.phone.value.trim();
      const email = form.email.value.trim();
      const type = form.type.value;
      const message = form.message.value.trim();
      const subject = encodeURIComponent('Tarjouspyyntö: ' + type);
      const body = encodeURIComponent(
        'Nimi: ' + name + '\n' +
        'Yritys: ' + company + '\n' +
        'Puhelin: ' + phone + '\n' +
        'Sähköposti: ' + email + '\n' +
        'Palvelu: ' + type + '\n\n' +
        'Kohteen kuvaus:\n' + message
      );
      const mailto = 'mailto:myynti@hyvinkaansiivouspalvelu.com?subject=' + subject + '&body=' + body;
      window.location.href = mailto;
      if (info) info.hidden = false;
    });
  }

  function initYear() {
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  function initParallax() {
    const img = document.querySelector('.hero-bg__img');
    if (!img) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = null;
    window.addEventListener('scroll', () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY * 0.25;
        img.style.transform = 'scale(1.05) translateY(' + y + 'px)';
        raf = null;
      });
    }, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initHeader();
    initReveal();
    initForm();
    initYear();
    initParallax();
  });
})();