# Chatbot Lefèvre Rénovation — Documentation

## Architecture

```
chatbot/
├── chatbot-widget.js        → Version rule-based (fonctionne sans backend)
├── chatbot-api.js           → Version Claude API (nécessite backend)
├── server-chat-endpoint.js  → Endpoint /api/chat à intégrer dans Node.js
├── knowledge-base.md        → Base de connaissance = system prompt Claude
└── README.md                → Ce fichier
```

---

## Mode 1 — Rule-based (demo immédiate, aucun backend requis)

Ajouter une seule ligne avant `</body>` dans chaque page HTML :

```html
<script src="/chatbot/chatbot-widget.js"></script>
```

**Ce que ça fait :**
- Arbre de décision avec quick replies
- 6 parcours : estimation projet, prestations, MaPrimeRénov', zone, contact, qualification budget
- Filtre les projets < 5 000€ avec message adapté
- Redirige vers le formulaire de devis ou le téléphone
- Aucun coût, aucun backend, fonctionne sur tout hébergement

---

## Mode 2 — Claude API (IA réelle, conversationnel)

### Prérequis
```bash
npm install @anthropic-ai/sdk
```

### Configuration

1. **Intégrer l'endpoint dans `local-server.js`** (voir commentaire en bas de `server-chat-endpoint.js`) :

```js
// En haut de local-server.js
const { handleChat } = require('./chatbot/server-chat-endpoint');

// Dans http.createServer, AVANT le bloc fs.readFile :
if (req.url === '/api/chat') {
  handleChat(req, res);
  return;
}
```

2. **Lancer le serveur avec la clé API :**
```bash
ANTHROPIC_API_KEY=sk-ant-xxxx node local-server.js
```

3. **Remplacer le script dans les pages HTML :**
```html
<!-- Remplacer chatbot-widget.js par : -->
<script src="/chatbot/chatbot-api.js"></script>
```

### Modèle utilisé
`claude-haiku-4-5-20251001` — rapide et économique pour un chatbot :
- ~0.0025€ pour 1 000 tokens en entrée
- ~0.0125€ pour 1 000 tokens en sortie
- Estimation : 0.01 à 0.04€ par conversation de 10 échanges

---

## Intégration WordPress (production)

### Option A — Theme functions.php
```php
function lefevre_chatbot_script() {
    wp_enqueue_script(
        'lefevre-chatbot',
        get_template_directory_uri() . '/chatbot/chatbot-widget.js',
        [], '1.0.0', true
    );
}
add_action('wp_enqueue_scripts', 'lefevre_chatbot_script');
```

### Option B — Code Snippets (plugin)
Ajouter dans un snippet PHP :
```php
add_action('wp_footer', function() {
    echo '<script src="' . get_template_directory_uri() . '/chatbot/chatbot-widget.js"></script>';
});
```

### Pour la version API sur WordPress
Utiliser un plugin comme **WP REST API** ou créer un endpoint custom dans `functions.php` :
```php
add_action('rest_api_init', function() {
    register_rest_route('lefevre/v1', '/chat', [
        'methods'  => 'POST',
        'callback' => 'lefevre_chat_handler',
        'permission_callback' => '__return_true',
    ]);
});

function lefevre_chat_handler($request) {
    // Appeler l'API Anthropic depuis PHP (bibliothèque PHP Anthropic ou curl)
    // Stocker ANTHROPIC_API_KEY dans wp-config.php ou .env
}
```

---

## Personnalisation

### Modifier les messages
Dans `chatbot-widget.js`, éditer l'objet `FLOWS` (lignes 15-260).  
Chaque nœud : `{ botMessage: 'HTML string', choices: [...] }`

### Modifier les couleurs
Chercher `#b8643a` (terracotta accent) dans `chatbot-widget.js` et `chatbot-api.js`.

### Modifier le numéro de téléphone
Chercher `tel:+33474000000` — remplacer par le vrai numéro de Martin.

### Modifier l'email de contact
Chercher `contact@lefevre-renovation.fr` — à confirmer avec le client.

---

## Mises à jour à faire avant livraison client

- [ ] Remplacer `tel:+33474000000` par le vrai numéro de Martin Lefèvre
- [ ] Remplacer `contact@lefevre-renovation.fr` par l'email réel
- [ ] Confirmer le handle Instagram dans `knowledge-base.md`
- [ ] Confirmer le seuil minimum (5 000€ — ok d'après le brief)
- [ ] Tester le parcours "budget < 5 000€" sur mobile
