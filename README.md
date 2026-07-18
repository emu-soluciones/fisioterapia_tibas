# Fisioterapia y Rehabilitación — Embajadores de la Salud (Tibás)

Sitio web de la clínica de fisioterapia y rehabilitación **EDS — Embajadores de la Salud**, ubicada frente a COOPESAIN R.L., Tibás, San José, Costa Rica.

## Stack

- HTML5 + CSS3 + JavaScript vanilla (sin frameworks ni build tools)
- Tipografía: Bricolage Grotesque + Instrument Sans (Google Fonts)
- Imágenes en WebP optimizadas
- Formulario de citas con envío directo a WhatsApp
- Mapa de Google embebido (frente a COOPESAIN R.L.)
- SEO: schema.org MedicalClinic, Open Graph, robots.txt

## Estructura

```
├── index.html
├── css/styles.css
├── js/main.js
├── media/          (logo, favicon e imágenes WebP)
├── wrangler.jsonc  (Cloudflare Worker — assets estáticos)
├── .assetsignore
└── robots.txt
```

## Deploy

- Hosting: Cloudflare Workers (assets estáticos, deploy automático al pushear a `main` via Workers Builds).
- Deploy manual: `npx wrangler deploy`
- Al comprar dominio propio: agregar `<link rel="canonical">`, `og:url` y `sitemap.xml` con la URL final.

## Contacto del cliente

- Tel: 8990 9030
- Email: eds.fisioterapia@gmail.com
- Ubicación: Frente a COOPESAIN R.L., Tibás

---
Hecho por [EMU Soluciones](https://emusoluciones.com)
