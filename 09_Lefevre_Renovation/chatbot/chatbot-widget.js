/**
 * chatbot-widget.js — Lefèvre Rénovation
 * Chatbot rule-based auto-contenu. Aucune dépendance externe.
 * Usage : <script src="chatbot/chatbot-widget.js"></script>
 */
(function () {
  'use strict';

  /* ================================================================
     FLOWS DE CONVERSATION
     Chaque nœud : { botMessage, choices }
     choice : { label, next? } ou { label, action:'link', href }
  ================================================================ */
  const FLOWS = {
    welcome: {
      botMessage: 'Bonjour&nbsp;! Je suis l\'assistant de <strong>Lefèvre Rénovation</strong>.<br>Comment puis-je vous aider ?',
      choices: [
        { label: '🏠 Estimer mon projet', next: 'qualify_type' },
        { label: '🛠 Nos prestations', next: 'services' },
        { label: '💡 MaPrimeRénov\'', next: 'energy' },
        { label: '📍 Zone d\'intervention', next: 'zone' },
        { label: '📞 Contacter l\'équipe', next: 'contact' },
      ],
    },

    qualify_type: {
      botMessage: 'Quel type de travaux souhaitez-vous réaliser&nbsp;?',
      choices: [
        { label: 'Rénovation complète', next: 'qualify_surface' },
        { label: 'Peinture & plâtrerie', next: 'qualify_surface' },
        { label: 'Sols — parquet / carrelage', next: 'qualify_surface' },
        { label: 'Salle de bain', next: 'qualify_surface' },
        { label: 'Rénovation énergétique', next: 'energy' },
      ],
    },

    qualify_surface: {
      botMessage: 'Quelle est la surface approximative concernée&nbsp;?',
      choices: [
        { label: 'Moins de 30 m²', next: 'qualify_budget' },
        { label: '30 à 80 m²', next: 'qualify_budget' },
        { label: '80 à 150 m²', next: 'qualify_budget' },
        { label: 'Plus de 150 m²', next: 'qualify_budget' },
      ],
    },

    qualify_budget: {
      botMessage: 'Quel est votre budget approximatif pour ce projet&nbsp;?',
      choices: [
        { label: 'Moins de 5 000 €', next: 'budget_low' },
        { label: '5 000 – 15 000 €', next: 'qualify_cta' },
        { label: '15 000 – 30 000 €', next: 'qualify_cta' },
        { label: 'Plus de 30 000 €', next: 'qualify_cta' },
        { label: 'Je ne sais pas encore', next: 'qualify_cta' },
      ],
    },

    budget_low: {
      botMessage: 'Nous intervenons sur des chantiers à partir de <strong>5&nbsp;000&nbsp;€</strong> afin de garantir la qualité et le suivi que nos clients méritent.<br><br>Votre projet est-il susceptible d\'évoluer dans cette fourchette&nbsp;?',
      choices: [
        { label: 'Le budget peut augmenter', next: 'qualify_cta' },
        { label: 'Non, mon budget est fixe', next: 'budget_low_end' },
      ],
    },

    budget_low_end: {
      botMessage: 'Pas de souci&nbsp;! N\'hésitez pas à revenir vers nous si votre projet évolue — nous serons ravis de vous accompagner. Bonne continuation&nbsp;!',
      choices: [
        { label: '↩ Recommencer', next: 'welcome' },
      ],
    },

    qualify_cta: {
      botMessage: 'Parfait&nbsp;! Pour vous proposer une estimation précise, Martin Lefèvre peut se déplacer <strong>gratuitement</strong> pour établir votre devis. Souhaitez-vous prendre contact&nbsp;?',
      choices: [
        { label: '📋 Formulaire de devis', action: 'link', href: '/contact/' },
        { label: '📞 Appeler l\'équipe', action: 'link', href: 'tel:+33474000000' },
        { label: 'Autre question', next: 'welcome' },
      ],
    },

    services: {
      botMessage: 'Voici nos domaines d\'expertise. Quelle prestation vous intéresse&nbsp;?',
      choices: [
        { label: 'Rénovation complète', next: 'service_reno' },
        { label: 'Peinture & plâtrerie', next: 'service_peinture' },
        { label: 'Sols — parquet & carrelage', next: 'service_sols' },
        { label: 'Salle de bain', next: 'service_sdb' },
        { label: 'Rénovation énergétique', next: 'energy' },
      ],
    },

    service_reno: {
      botMessage: 'Pour une <strong>rénovation complète</strong>, nous coordonnons tous les corps d\'état&nbsp;: plâtrerie, peinture, sols, électricité, plomberie. Martin est votre <strong>interlocuteur unique</strong> du début à la fin du chantier.',
      choices: [
        { label: '📋 Demander un devis', action: 'link', href: '/contact/' },
        { label: '📷 Voir nos réalisations', action: 'link', href: '/realisations/' },
        { label: '← Toutes les prestations', next: 'services' },
      ],
    },

    service_peinture: {
      botMessage: 'Notre équipe réalise tous types de <strong>peinture et plâtrerie</strong>&nbsp;: murs, plafonds, boiseries, enduits décoratifs. Finitions soignées, délais respectés.',
      choices: [
        { label: '📋 Demander un devis', action: 'link', href: '/contact/' },
        { label: '📷 Voir nos réalisations', action: 'link', href: '/realisations/' },
        { label: '← Toutes les prestations', next: 'services' },
      ],
    },

    service_sols: {
      botMessage: 'Parquet massif, parquet contrecollé, carrelage grand format, tomettes… Nous posons tous types de <strong>revêtements de sols</strong> avec une attention particulière aux finitions.',
      choices: [
        { label: '📋 Demander un devis', action: 'link', href: '/contact/' },
        { label: '📷 Voir nos réalisations', action: 'link', href: '/realisations/' },
        { label: '← Toutes les prestations', next: 'services' },
      ],
    },

    service_sdb: {
      botMessage: 'De la dépose à la livraison <strong>clé en main</strong>, nous réalisons votre salle de bain&nbsp;: carrelage, faïence, plomberie, menuiserie, lumière. Un espace pensé pour durer.',
      choices: [
        { label: '📋 Demander un devis', action: 'link', href: '/contact/' },
        { label: '📷 Voir nos réalisations', action: 'link', href: '/realisations/' },
        { label: '← Toutes les prestations', next: 'services' },
      ],
    },

    energy: {
      botMessage: 'Lefèvre Rénovation est certifié <strong>RGE</strong> (Reconnu Garant de l\'Environnement) — condition indispensable pour bénéficier de <strong>MaPrimeRénov\'</strong>.<br><br>Quel type d\'isolation envisagez-vous&nbsp;?',
      choices: [
        { label: 'Isolation des combles', next: 'energy_combles' },
        { label: 'Isolation des murs', next: 'energy_murs' },
        { label: 'Isolation du sol', next: 'energy_sol' },
        { label: 'Comment ça marche ?', next: 'energy_info' },
      ],
    },

    energy_combles: {
      botMessage: 'L\'isolation des combles est l\'intervention la plus rentable&nbsp;: jusqu\'à <strong>30% d\'économies</strong> sur la facture de chauffage. MaPrimeRénov\' peut financer une part significative selon vos revenus.',
      choices: [
        { label: '📋 Demander un devis', action: 'link', href: '/contact/' },
        { label: '← Autres isolations', next: 'energy' },
        { label: '↩ Accueil', next: 'welcome' },
      ],
    },

    energy_murs: {
      botMessage: 'L\'isolation des murs par l\'intérieur (ITI) ou par l\'extérieur (ITE) réduit considérablement les déperditions thermiques. Éligible <strong>MaPrimeRénov\'</strong> et aux CEE.',
      choices: [
        { label: '📋 Demander un devis', action: 'link', href: '/contact/' },
        { label: '← Autres isolations', next: 'energy' },
        { label: '↩ Accueil', next: 'welcome' },
      ],
    },

    energy_sol: {
      botMessage: 'L\'isolation du plancher bas (sous-sol, vide sanitaire) peut représenter jusqu\'à <strong>10% d\'économies</strong> sur le chauffage. Éligible MaPrimeRénov\' sous conditions.',
      choices: [
        { label: '📋 Demander un devis', action: 'link', href: '/contact/' },
        { label: '← Autres isolations', next: 'energy' },
        { label: '↩ Accueil', next: 'welcome' },
      ],
    },

    energy_info: {
      botMessage: 'MaPrimeRénov\' est une aide de l\'État calculée selon vos revenus et le type de travaux. Le montant peut couvrir jusqu\'à <strong>70% du coût total</strong> pour les ménages modestes.<br><br>Votre artisan doit être certifié RGE — c\'est notre cas.',
      choices: [
        { label: '🔗 Vérifier mon éligibilité', action: 'link', href: 'https://www.maprimerenov.gouv.fr' },
        { label: '📋 Demander un devis', action: 'link', href: '/contact/' },
        { label: '← Retour', next: 'energy' },
      ],
    },

    zone: {
      botMessage: 'Nous intervenons principalement dans ces secteurs&nbsp;:<br><br>📍 Villefranche-sur-Saône et agglomération<br>📍 Nord du département du Rhône<br>📍 Saône-et-Loire<br>📍 Beaujolais viticole<br><br>Votre projet est-il dans notre zone&nbsp;?',
      choices: [
        { label: '✅ Oui, je suis dans la zone', next: 'qualify_cta' },
        { label: '❓ Je ne suis pas sûr(e)', next: 'zone_unsure' },
        { label: 'Non, je suis ailleurs', next: 'zone_out' },
      ],
    },

    zone_unsure: {
      botMessage: 'Pas de problème&nbsp;! Indiquez votre commune dans le formulaire — Martin reviendra vers vous pour confirmer si votre chantier entre dans notre zone.',
      choices: [
        { label: '📋 Envoyer ma commune', action: 'link', href: '/contact/' },
        { label: '↩ Accueil', next: 'welcome' },
      ],
    },

    zone_out: {
      botMessage: 'Nous intervenons principalement sur le Nord du Rhône et la Saône-et-Loire. Pour des projets hors zone, nous pouvons nous déplacer selon l\'envergure du chantier. Contactez-nous pour en discuter.',
      choices: [
        { label: '📋 Nous contacter quand même', action: 'link', href: '/contact/' },
        { label: '↩ Accueil', next: 'welcome' },
      ],
    },

    contact: {
      botMessage: 'Plusieurs façons de nous joindre&nbsp;:',
      choices: [
        { label: '📋 Formulaire de devis', action: 'link', href: '/contact/' },
        { label: '📞 Appeler Martin Lefèvre', action: 'link', href: 'tel:+33474000000' },
        { label: '✉️ Envoyer un e-mail', action: 'link', href: 'mailto:contact@lefevre-renovation.fr' },
        { label: '↩ Accueil', next: 'welcome' },
      ],
    },
  };

  /* ================================================================
     CSS INJECTÉ
  ================================================================ */
  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&display=swap');

    #lr-chatbot-btn {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 9999;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: #b8643a;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(184,100,58,.45);
      transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s;
      color: #fff;
    }
    #lr-chatbot-btn:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(184,100,58,.55); }
    #lr-chatbot-btn:active { transform: scale(.96); }
    #lr-chatbot-btn .lr-icon-chat,
    #lr-chatbot-btn .lr-icon-close { transition: opacity .2s, transform .2s; position: absolute; }
    #lr-chatbot-btn .lr-icon-close { opacity: 0; transform: rotate(-45deg) scale(.7); }
    #lr-chatbot-btn.lr-open .lr-icon-chat { opacity: 0; transform: rotate(45deg) scale(.7); }
    #lr-chatbot-btn.lr-open .lr-icon-close { opacity: 1; transform: rotate(0) scale(1); }

    #lr-chatbot-panel {
      position: fixed;
      bottom: 100px;
      right: 28px;
      z-index: 9998;
      width: 370px;
      max-width: calc(100vw - 32px);
      max-height: 600px;
      background: #f6f1ea;
      border-radius: 18px;
      box-shadow: 0 8px 48px rgba(34,28,20,.22), 0 2px 8px rgba(34,28,20,.10);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      font-family: 'Manrope', ui-sans-serif, sans-serif;
      transform-origin: bottom right;
      transform: scale(.85) translateY(12px);
      opacity: 0;
      pointer-events: none;
      transition: transform .3s cubic-bezier(.34,1.2,.64,1), opacity .25s;
    }
    #lr-chatbot-panel.lr-open {
      transform: scale(1) translateY(0);
      opacity: 1;
      pointer-events: all;
    }

    .lr-header {
      background: #221c14;
      padding: 18px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }
    .lr-avatar {
      width: 38px; height: 38px;
      border-radius: 50%;
      background: #b8643a;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      color: #fff;
    }
    .lr-header-info { flex: 1; }
    .lr-header-name { font-size: .875rem; font-weight: 600; color: #fff; line-height: 1.2; }
    .lr-header-status { font-size: .72rem; color: rgba(255,255,255,.5); display: flex; align-items: center; gap: 5px; }
    .lr-status-dot { width: 6px; height: 6px; border-radius: 50%; background: #7cc98d; }

    .lr-messages {
      flex: 1;
      overflow-y: auto;
      padding: 20px 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      scroll-behavior: smooth;
    }
    .lr-messages::-webkit-scrollbar { width: 4px; }
    .lr-messages::-webkit-scrollbar-track { background: transparent; }
    .lr-messages::-webkit-scrollbar-thumb { background: rgba(34,28,20,.15); border-radius: 99px; }

    .lr-msg {
      max-width: 88%;
      padding: 11px 15px;
      border-radius: 14px;
      font-size: .875rem;
      line-height: 1.6;
      animation: lr-fadein .3s ease forwards;
    }
    @keyframes lr-fadein {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .lr-msg-bot {
      background: #fff;
      color: #221c14;
      border-bottom-left-radius: 4px;
      box-shadow: 0 1px 4px rgba(34,28,20,.08);
      align-self: flex-start;
    }
    .lr-msg-user {
      background: #b8643a;
      color: #fff;
      border-bottom-right-radius: 4px;
      align-self: flex-end;
      text-align: right;
    }

    .lr-typing {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 11px 15px;
      background: #fff;
      border-radius: 14px;
      border-bottom-left-radius: 4px;
      align-self: flex-start;
      box-shadow: 0 1px 4px rgba(34,28,20,.08);
      animation: lr-fadein .3s ease forwards;
    }
    .lr-typing span {
      width: 7px; height: 7px;
      border-radius: 50%;
      background: #b8643a;
      opacity: .4;
      animation: lr-bounce 1.2s infinite ease-in-out;
    }
    .lr-typing span:nth-child(2) { animation-delay: .18s; }
    .lr-typing span:nth-child(3) { animation-delay: .36s; }
    @keyframes lr-bounce {
      0%, 80%, 100% { transform: scale(.7); opacity: .3; }
      40% { transform: scale(1); opacity: 1; }
    }

    .lr-choices {
      display: flex;
      flex-direction: column;
      gap: 7px;
      padding: 4px 16px 18px;
      flex-shrink: 0;
      animation: lr-fadein .35s .1s ease both;
    }
    .lr-choice-btn {
      background: #fff;
      border: 1.5px solid rgba(184,100,58,.3);
      color: #4a4035;
      font-family: 'Manrope', ui-sans-serif, sans-serif;
      font-size: .8rem;
      font-weight: 500;
      padding: 9px 14px;
      border-radius: 10px;
      cursor: pointer;
      text-align: left;
      transition: background .18s, border-color .18s, color .18s, transform .15s;
    }
    .lr-choice-btn:hover {
      background: #b8643a;
      border-color: #b8643a;
      color: #fff;
      transform: translateX(3px);
    }
    .lr-choice-btn:active { transform: scale(.97); }

    .lr-reset-bar {
      padding: 10px 16px;
      border-top: 1px solid rgba(34,28,20,.07);
      display: flex;
      justify-content: center;
      flex-shrink: 0;
    }
    .lr-reset-btn {
      background: none;
      border: none;
      font-family: 'Manrope', ui-sans-serif, sans-serif;
      font-size: .72rem;
      color: rgba(34,28,20,.4);
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 6px;
      transition: color .2s, background .2s;
    }
    .lr-reset-btn:hover { color: #b8643a; background: rgba(184,100,58,.08); }

    @media (max-width: 480px) {
      #lr-chatbot-panel { right: 12px; bottom: 88px; width: calc(100vw - 24px); }
      #lr-chatbot-btn { right: 16px; bottom: 20px; }
    }
  `;

  /* ================================================================
     INIT — injecte CSS + DOM
  ================================================================ */
  function init() {
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    const btn = document.createElement('button');
    btn.id = 'lr-chatbot-btn';
    btn.setAttribute('aria-label', 'Ouvrir le chat');
    btn.innerHTML = `
      <svg class="lr-icon-chat" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      <svg class="lr-icon-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>`;

    const panel = document.createElement('div');
    panel.id = 'lr-chatbot-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Assistant Lefèvre Rénovation');
    panel.innerHTML = `
      <div class="lr-header">
        <div class="lr-avatar" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
        </div>
        <div class="lr-header-info">
          <div class="lr-header-name">Assistant Lefèvre Rénovation</div>
          <div class="lr-header-status">
            <span class="lr-status-dot" aria-hidden="true"></span>
            En ligne — réponse immédiate
          </div>
        </div>
      </div>
      <div class="lr-messages" id="lr-msgs" role="log" aria-live="polite" aria-label="Conversation"></div>
      <div class="lr-choices" id="lr-choices" role="group" aria-label="Options de réponse"></div>
      <div class="lr-reset-bar">
        <button class="lr-reset-btn" id="lr-reset">↩ Recommencer la conversation</button>
      </div>`;

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    btn.addEventListener('click', togglePanel);
    document.getElementById('lr-reset').addEventListener('click', () => goTo('welcome'));

    startConversation();
  }

  /* ================================================================
     ÉTAT
  ================================================================ */
  let isOpen = false;
  let hasStarted = false;

  function togglePanel() {
    isOpen = !isOpen;
    const btn = document.getElementById('lr-chatbot-btn');
    const panel = document.getElementById('lr-chatbot-panel');
    btn.classList.toggle('lr-open', isOpen);
    panel.classList.toggle('lr-open', isOpen);
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    btn.setAttribute('aria-label', isOpen ? 'Fermer le chat' : 'Ouvrir le chat');
    if (isOpen && !hasStarted) {
      hasStarted = true;
      goTo('welcome');
    }
  }

  /* ================================================================
     MOTEUR DE CONVERSATION
  ================================================================ */
  function startConversation() {}

  function goTo(nodeId) {
    const node = FLOWS[nodeId];
    if (!node) return;

    clearChoices();
    showTyping().then(() => {
      addBotMessage(node.botMessage);
      if (node.choices && node.choices.length > 0) {
        renderChoices(node.choices);
      }
    });
  }

  function showTyping() {
    const msgs = document.getElementById('lr-msgs');
    const typing = document.createElement('div');
    typing.className = 'lr-typing';
    typing.id = 'lr-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(typing);
    scrollBottom();
    return new Promise(resolve => setTimeout(() => {
      const t = document.getElementById('lr-typing');
      if (t) t.remove();
      resolve();
    }, 900));
  }

  function addBotMessage(html) {
    const msgs = document.getElementById('lr-msgs');
    const msg = document.createElement('div');
    msg.className = 'lr-msg lr-msg-bot';
    msg.innerHTML = html;
    msgs.appendChild(msg);
    scrollBottom();
  }

  function addUserMessage(text) {
    const msgs = document.getElementById('lr-msgs');
    const msg = document.createElement('div');
    msg.className = 'lr-msg lr-msg-user';
    msg.textContent = text;
    msgs.appendChild(msg);
    scrollBottom();
  }

  function renderChoices(choices) {
    const container = document.getElementById('lr-choices');
    container.innerHTML = '';
    choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'lr-choice-btn';
      btn.textContent = choice.label;
      btn.addEventListener('click', () => handleChoice(choice));
      container.appendChild(btn);
    });
  }

  function handleChoice(choice) {
    clearChoices();
    addUserMessage(choice.label);

    if (choice.action === 'link') {
      const href = choice.href;
      setTimeout(() => {
        if (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
          window.open(href, href.startsWith('http') ? '_blank' : '_self');
        } else {
          window.location.href = href;
        }
      }, 300);
      return;
    }

    if (choice.next) {
      setTimeout(() => goTo(choice.next), 300);
    }
  }

  function clearChoices() {
    const container = document.getElementById('lr-choices');
    if (container) container.innerHTML = '';
  }

  function scrollBottom() {
    const msgs = document.getElementById('lr-msgs');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  }

  /* ================================================================
     DÉMARRAGE
  ================================================================ */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
