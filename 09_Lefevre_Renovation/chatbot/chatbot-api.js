/**
 * chatbot-api.js — Lefèvre Rénovation
 * Version Claude API. Remplace chatbot-widget.js quand le backend /api/chat est actif.
 * Requiert : local-server.js avec endpoint POST /api/chat + variable ANTHROPIC_API_KEY
 * Usage : <script src="chatbot/chatbot-api.js"></script>
 */
(function () {
  'use strict';

  const API_ENDPOINT = '/api/chat';
  const MAX_HISTORY = 20; // messages conservés en mémoire (10 échanges)

  /* ================================================================
     CSS — identique au widget rule-based
  ================================================================ */
  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&display=swap');

    #lr-chatbot-btn {
      position: fixed; bottom: 28px; right: 28px; z-index: 9999;
      width: 58px; height: 58px; border-radius: 50%;
      background: #b8643a; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
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
      position: fixed; bottom: 100px; right: 28px; z-index: 9998;
      width: 370px; max-width: calc(100vw - 32px); max-height: 600px;
      background: #f6f1ea; border-radius: 18px;
      box-shadow: 0 8px 48px rgba(34,28,20,.22), 0 2px 8px rgba(34,28,20,.10);
      display: flex; flex-direction: column; overflow: hidden;
      font-family: 'Manrope', ui-sans-serif, sans-serif;
      transform-origin: bottom right;
      transform: scale(.85) translateY(12px); opacity: 0; pointer-events: none;
      transition: transform .3s cubic-bezier(.34,1.2,.64,1), opacity .25s;
    }
    #lr-chatbot-panel.lr-open { transform: scale(1) translateY(0); opacity: 1; pointer-events: all; }

    .lr-header {
      background: #221c14; padding: 18px 20px;
      display: flex; align-items: center; gap: 12px; flex-shrink: 0;
    }
    .lr-avatar {
      width: 38px; height: 38px; border-radius: 50%; background: #b8643a;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #fff;
    }
    .lr-header-info { flex: 1; }
    .lr-header-name { font-size: .875rem; font-weight: 600; color: #fff; line-height: 1.2; }
    .lr-header-status { font-size: .72rem; color: rgba(255,255,255,.5); display: flex; align-items: center; gap: 5px; }
    .lr-status-dot { width: 6px; height: 6px; border-radius: 50%; background: #7cc98d; }

    .lr-messages {
      flex: 1; overflow-y: auto; padding: 20px 16px;
      display: flex; flex-direction: column; gap: 14px; scroll-behavior: smooth;
    }
    .lr-messages::-webkit-scrollbar { width: 4px; }
    .lr-messages::-webkit-scrollbar-thumb { background: rgba(34,28,20,.15); border-radius: 99px; }

    .lr-msg {
      max-width: 88%; padding: 11px 15px; border-radius: 14px;
      font-size: .875rem; line-height: 1.6;
      animation: lr-fadein .3s ease forwards;
    }
    @keyframes lr-fadein {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .lr-msg-bot {
      background: #fff; color: #221c14; border-bottom-left-radius: 4px;
      box-shadow: 0 1px 4px rgba(34,28,20,.08); align-self: flex-start;
    }
    .lr-msg-user {
      background: #b8643a; color: #fff; border-bottom-right-radius: 4px;
      align-self: flex-end; text-align: right;
    }
    .lr-msg-error {
      background: #ffeaea; color: #c0392b; border-bottom-left-radius: 4px;
      font-size: .8rem; align-self: flex-start;
    }

    .lr-typing {
      display: flex; align-items: center; gap: 5px; padding: 11px 15px;
      background: #fff; border-radius: 14px; border-bottom-left-radius: 4px;
      align-self: flex-start; box-shadow: 0 1px 4px rgba(34,28,20,.08);
      animation: lr-fadein .3s ease forwards;
    }
    .lr-typing span {
      width: 7px; height: 7px; border-radius: 50%;
      background: #b8643a; opacity: .4;
      animation: lr-bounce 1.2s infinite ease-in-out;
    }
    .lr-typing span:nth-child(2) { animation-delay: .18s; }
    .lr-typing span:nth-child(3) { animation-delay: .36s; }
    @keyframes lr-bounce {
      0%, 80%, 100% { transform: scale(.7); opacity: .3; }
      40% { transform: scale(1); opacity: 1; }
    }

    .lr-input-row {
      display: flex; align-items: center; gap: 8px;
      padding: 12px 14px; border-top: 1px solid rgba(34,28,20,.08);
      background: #fbf8f3; flex-shrink: 0;
    }
    .lr-input {
      flex: 1; font-family: 'Manrope', ui-sans-serif, sans-serif;
      font-size: .875rem; color: #221c14; background: #fff;
      border: 1.5px solid rgba(34,28,20,.12); border-radius: 10px;
      padding: 9px 13px; outline: none; resize: none; max-height: 120px;
      transition: border-color .2s, box-shadow .2s;
    }
    .lr-input:focus { border-color: #b8643a; box-shadow: 0 0 0 3px rgba(184,100,58,.12); }
    .lr-input::placeholder { color: rgba(34,28,20,.35); }

    .lr-send-btn {
      width: 38px; height: 38px; border-radius: 10px; background: #b8643a;
      border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
      color: #fff; flex-shrink: 0;
      transition: background .2s, transform .15s;
    }
    .lr-send-btn:hover { background: #8e4a26; transform: scale(1.05); }
    .lr-send-btn:active { transform: scale(.95); }
    .lr-send-btn:disabled { background: rgba(34,28,20,.15); cursor: not-allowed; transform: none; }

    .lr-quick-replies {
      display: flex; flex-wrap: wrap; gap: 6px;
      padding: 0 14px 10px; flex-shrink: 0;
    }
    .lr-quick-chip {
      background: #fff; border: 1.5px solid rgba(184,100,58,.3);
      color: #4a4035; font-family: 'Manrope', ui-sans-serif, sans-serif;
      font-size: .75rem; font-weight: 500; padding: 5px 11px;
      border-radius: 99px; cursor: pointer;
      transition: background .18s, border-color .18s, color .18s;
    }
    .lr-quick-chip:hover { background: #b8643a; border-color: #b8643a; color: #fff; }

    @media (max-width: 480px) {
      #lr-chatbot-panel { right: 12px; bottom: 88px; width: calc(100vw - 24px); }
      #lr-chatbot-btn { right: 16px; bottom: 20px; }
    }
  `;

  /* ================================================================
     MESSAGE DE BIENVENUE + QUICK REPLIES INITIAUX
  ================================================================ */
  const WELCOME = 'Bonjour&nbsp;! Je suis l\'assistant de <strong>Lefèvre Rénovation</strong>. Posez-moi vos questions sur nos prestations, la zone d\'intervention, MaPrimeRénov\' ou le processus de devis.';
  const QUICK_REPLIES = [
    'Estimer mon projet', 'Vos prestations',
    'MaPrimeRénov\'', 'Zone d\'intervention', 'Demander un devis',
  ];

  /* ================================================================
     ÉTAT
  ================================================================ */
  let isOpen = false;
  let hasStarted = false;
  let isLoading = false;
  const history = []; // [{ role:'user'|'assistant', content:'' }]

  /* ================================================================
     INIT
  ================================================================ */
  function init() {
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    const btn = document.createElement('button');
    btn.id = 'lr-chatbot-btn';
    btn.setAttribute('aria-label', 'Ouvrir le chat');
    btn.innerHTML = `
      <svg class="lr-icon-chat" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      <svg class="lr-icon-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>`;

    const panel = document.createElement('div');
    panel.id = 'lr-chatbot-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Assistant Lefèvre Rénovation');
    panel.innerHTML = `
      <div class="lr-header">
        <div class="lr-avatar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
        </div>
        <div class="lr-header-info">
          <div class="lr-header-name">Assistant Lefèvre Rénovation</div>
          <div class="lr-header-status">
            <span class="lr-status-dot"></span>Propulsé par IA — répond en quelques secondes
          </div>
        </div>
      </div>
      <div class="lr-messages" id="lr-msgs" role="log" aria-live="polite"></div>
      <div class="lr-quick-replies" id="lr-quick-replies"></div>
      <div class="lr-input-row">
        <textarea class="lr-input" id="lr-input" placeholder="Votre question..." rows="1" maxlength="500"></textarea>
        <button class="lr-send-btn" id="lr-send" aria-label="Envoyer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>`;

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    btn.addEventListener('click', togglePanel);
    document.getElementById('lr-send').addEventListener('click', sendMessage);
    document.getElementById('lr-input').addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });
    autoResize();
  }

  function autoResize() {
    const textarea = document.getElementById('lr-input');
    if (!textarea) return;
    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    });
  }

  function togglePanel() {
    isOpen = !isOpen;
    const btn = document.getElementById('lr-chatbot-btn');
    const panel = document.getElementById('lr-chatbot-panel');
    btn.classList.toggle('lr-open', isOpen);
    panel.classList.toggle('lr-open', isOpen);
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (isOpen && !hasStarted) {
      hasStarted = true;
      showWelcome();
    }
    if (isOpen) document.getElementById('lr-input').focus();
  }

  function showWelcome() {
    addBotMessage(WELCOME);
    renderQuickReplies(QUICK_REPLIES);
  }

  /* ================================================================
     ENVOI D'UN MESSAGE
  ================================================================ */
  async function sendMessage() {
    const input = document.getElementById('lr-input');
    const text = input.value.trim();
    if (!text || isLoading) return;

    input.value = '';
    input.style.height = 'auto';
    clearQuickReplies();
    addUserMessage(text);
    history.push({ role: 'user', content: text });

    setLoading(true);
    showTyping();

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.slice(-MAX_HISTORY) }),
      });

      removeTyping();

      if (!response.ok) throw new Error(`Erreur serveur (${response.status})`);

      const data = await response.json();
      const reply = data.content || data.message || 'Désolé, je n\'ai pas pu répondre.';

      addBotMessage(reply);
      history.push({ role: 'assistant', content: reply });

      if (data.quickReplies) renderQuickReplies(data.quickReplies);

    } catch (err) {
      removeTyping();
      addErrorMessage('Une erreur est survenue. Appelez-nous directement ou utilisez le formulaire de contact.');
      console.error('[LR Chatbot API]', err);
    } finally {
      setLoading(false);
    }
  }

  /* ================================================================
     RENDERERS
  ================================================================ */
  function addBotMessage(html) {
    const msgs = document.getElementById('lr-msgs');
    const div = document.createElement('div');
    div.className = 'lr-msg lr-msg-bot';
    div.innerHTML = html;
    msgs.appendChild(div);
    scrollBottom();
  }

  function addUserMessage(text) {
    const msgs = document.getElementById('lr-msgs');
    const div = document.createElement('div');
    div.className = 'lr-msg lr-msg-user';
    div.textContent = text;
    msgs.appendChild(div);
    scrollBottom();
  }

  function addErrorMessage(text) {
    const msgs = document.getElementById('lr-msgs');
    const div = document.createElement('div');
    div.className = 'lr-msg lr-msg-error';
    div.textContent = text;
    msgs.appendChild(div);
    scrollBottom();
  }

  function showTyping() {
    const msgs = document.getElementById('lr-msgs');
    const div = document.createElement('div');
    div.className = 'lr-typing'; div.id = 'lr-typing';
    div.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(div);
    scrollBottom();
  }

  function removeTyping() {
    const t = document.getElementById('lr-typing');
    if (t) t.remove();
  }

  function renderQuickReplies(replies) {
    const container = document.getElementById('lr-quick-replies');
    container.innerHTML = '';
    replies.forEach(label => {
      const chip = document.createElement('button');
      chip.className = 'lr-quick-chip';
      chip.textContent = label;
      chip.addEventListener('click', () => {
        document.getElementById('lr-input').value = label;
        clearQuickReplies();
        sendMessage();
      });
      container.appendChild(chip);
    });
  }

  function clearQuickReplies() {
    const c = document.getElementById('lr-quick-replies');
    if (c) c.innerHTML = '';
  }

  function setLoading(val) {
    isLoading = val;
    const btn = document.getElementById('lr-send');
    const input = document.getElementById('lr-input');
    if (btn) btn.disabled = val;
    if (input) input.disabled = val;
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
