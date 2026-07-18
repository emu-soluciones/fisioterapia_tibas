// ============================================================
// EDS Fisioterapia y Rehabilitación — Tibás
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  // Año en footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav con sombra al hacer scroll
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Menú móvil
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    const toggleMenu = (open) => {
      const willOpen = open !== undefined ? open : !mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open', willOpen);
      burger.classList.toggle('open', willOpen);
      burger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      mobileMenu.setAttribute('aria-hidden', willOpen ? 'false' : 'true');
      document.body.style.overflow = willOpen ? 'hidden' : '';
    };
    burger.addEventListener('click', () => toggleMenu());
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleMenu(false); });
  }

  // Reveal al hacer scroll (?noanim lo desactiva, útil para pruebas/capturas)
  if (new URLSearchParams(location.search).has('noanim')) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    document.documentElement.style.scrollBehavior = 'auto';
    document.querySelectorAll('img[loading="lazy"]').forEach(img => { img.loading = 'eager'; });
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        setTimeout(() => target.scrollIntoView(), 50);
        setTimeout(() => target.scrollIntoView(), 350);
      }
    }
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  // FAQ — solo una abierta a la vez
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        document.querySelectorAll('.faq-item').forEach(other => {
          if (other !== item) other.removeAttribute('open');
        });
      }
    });
  });

  // Pills del formulario
  document.querySelectorAll('[data-pill-group]').forEach(group => {
    const hidden = group.nextElementSibling;
    group.querySelectorAll('.pill').forEach(pill => {
      pill.addEventListener('click', () => {
        group.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        if (hidden && hidden.type === 'hidden') hidden.value = pill.dataset.value;
      });
    });
  });

  // Formulario de cita → WhatsApp
  const form = document.getElementById('apptForm');
  const formMsg = document.getElementById('formMsg');
  if (form && formMsg) {
    // Fecha mínima: hoy
    const dateInput = form.querySelector('#date');
    if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const svc = form.svc.value;
      const date = form.date.value;
      const slot = form.slot.value;
      const note = form.note.value.trim();

      if (!name) {
        formMsg.textContent = 'Por favor, escribí tu nombre.';
        formMsg.classList.add('show');
        return;
      }
      if (!svc) {
        formMsg.textContent = 'Seleccioná qué necesitás tratar.';
        formMsg.classList.add('show');
        return;
      }

      let msg = `Hola, soy ${name}. Quiero agendar una cita de fisioterapia.`;
      msg += `\n\nMotivo: ${svc}`;
      if (date) msg += `\nFecha preferida: ${date}`;
      if (slot) msg += `\nHorario preferido: ${slot}`;
      if (note) msg += `\n\nDetalle: ${note}`;

      const url = `https://wa.me/50689909030?text=${encodeURIComponent(msg)}`;
      formMsg.textContent = 'Abriendo WhatsApp con tu solicitud...';
      formMsg.classList.add('show');
      setTimeout(() => window.open(url, '_blank'), 400);
    });
  }
});
