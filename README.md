# Free QRCode Generator

Gerador de QR Code gratuito, sem cadastro e sem dependências de build. Roda diretamente no browser.

**Live:** [freeqr.almeidaoffsec.com](https://freeqr.almeidaoffsec.com)

## Features

- **7 tipos de QR Code:** Link, Texto, E-mail, Chamada, WhatsApp, V-Card, Wi-Fi
- **Logo central:** upload de imagem própria ou seleção de logos pré-definidas (redes sociais e marcas)
- **Customização visual:** cor do QR (escuro e claro) + frame opcional com texto personalizado
- **Controles de logo:** tamanho e padding via slider
- **Histórico local:** gerados salvos no `localStorage` com preview, download e clone
- **Download em PNG** de alta resolução (512×512)
- **Interface bilíngue:** PT-BR e EN-US
- **Zero dependência de rede:** biblioteca QR servida localmente com fallback para CDN

## Tech Stack

- HTML5 + JavaScript vanilla (sem framework, sem bundler)
- Tailwind CSS via CDN
- [qrcode@1.5.1](https://github.com/soldair/node-qrcode) — bundled localmente em `qrcode.min.js`

## Rodar Localmente

```bash
python3 -m http.server 5500
# abrir http://localhost:5500
```

Não há instalação, build step ou dependências. Basta servir os arquivos estáticos.

## Estrutura

```
.
├── index.html        # markup, Tailwind config e script tags
├── script.js         # toda a lógica da aplicação
├── style.css         # estilos customizados
├── qrcode.min.js     # biblioteca QR bundled (qrcode@1.5.1)
├── favicon.svg
├── robots.txt
├── CNAME
├── assets/brand/     # assets de marca
└── logos/            # logos pré-definidas para o QR
```

## Deploy

Copie os arquivos estáticos para qualquer servidor ou CDN:

```
index.html  script.js  qrcode.min.js  style.css  favicon.svg  robots.txt
```

Atualizar o `qrcode.min.js`:

```bash
curl -o qrcode.min.js https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js
```
