const toggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-mobile-menu]');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen); /* active l'animation croix sur le bouton */
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('open'); /* remet les 3 traits horizontaux à la fermeture */
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const form = document.querySelector('[data-demo-form]');
if (form) {
  const status = form.querySelector('[data-form-status]');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const missing = [...form.querySelectorAll('[required]')].filter((field) => !field.value.trim());
    missing.forEach((field) => field.setAttribute('aria-invalid', 'true'));
    if (missing.length) {
      if (status) status.textContent = 'Complétez les champs obligatoires pour tester le parcours.';
      return;
    }
    form.reset();
    if (status) status.textContent = 'Maquette portfolio : aucun message n’a été envoyé.';
  });
}
