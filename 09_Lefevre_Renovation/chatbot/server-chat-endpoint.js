/**
 * server-chat-endpoint.js — Lefèvre Rénovation
 * Endpoint POST /api/chat à greffer dans local-server.js (ou serveur WordPress/Node.js)
 * Requiert : npm install @anthropic-ai/sdk
 * Variable d'env : ANTHROPIC_API_KEY
 *
 * Pour l'intégration dans local-server.js : copier la fonction handleChat
 * et l'appeler dans le createServer avant le fs.readFile.
 */

const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

/* Charge la base de connaissance une seule fois au démarrage */
const KNOWLEDGE_BASE = fs.readFileSync(
  path.join(__dirname, 'knowledge-base.md'),
  'utf-8'
);

const SYSTEM_PROMPT = `${KNOWLEDGE_BASE}

---

## Instructions supplémentaires pour tes réponses

- Réponds toujours en français
- Vouvoie le visiteur (jamais "tu")
- Maximum 3-4 phrases par réponse — sois direct et clair
- Si un projet a un budget < 5 000€, oriente poliment vers le formulaire ou explique le seuil
- Termine chaque réponse par une proposition d'action concrète quand c'est pertinent (devis, appel, formulaire)
- Ne réponds pas aux questions sans rapport avec Lefèvre Rénovation ou la rénovation intérieure
- Si tu ne connais pas une information précise (tarif exact, disponibilité), dis-le honnêtement et propose le formulaire
`;

/**
 * Gère une requête POST /api/chat
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
async function handleChat(req, res) {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', async () => {
    try {
      const { messages } = JSON.parse(body);

      if (!Array.isArray(messages) || messages.length === 0) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'messages array required' }));
        return;
      }

      /* Sécurité : limiter à 20 messages et sanitiser */
      const safeMessages = messages
        .slice(-20)
        .filter(m => m.role && m.content && typeof m.content === 'string')
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.content.slice(0, 1000), // max 1000 chars par message
        }));

      const response = await client.messages.create({
        model: 'claude-haiku-4-5-20251001', // rapide + économique pour un chatbot
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages: safeMessages,
      });

      const content = response.content[0]?.text || 'Désolé, je n\'ai pas pu répondre. Contactez-nous directement.';

      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      });
      res.end(JSON.stringify({ content }));

    } catch (err) {
      console.error('[/api/chat]', err.message);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Erreur serveur', content: 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.' }));
    }
  });
}

/* ================================================================
   EXEMPLE D'INTÉGRATION dans local-server.js :

   const { handleChat } = require('./chatbot/server-chat-endpoint');

   http.createServer((req, res) => {
     // Ajouter avant le bloc fs.readFile existant :
     if (req.url === '/api/chat' || req.url.startsWith('/api/chat?')) {
       handleChat(req, res);
       return;
     }

     // ... reste du code local-server.js inchangé
   });

   Puis lancer : ANTHROPIC_API_KEY=sk-ant-... node local-server.js
================================================================ */

module.exports = { handleChat };
