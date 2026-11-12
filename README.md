# Crescer Pediatria Integrada: landing page

Landing page estática (HTML + CSS + JS puro, sem build) da clínica Crescer Pediatria Integrada, Macapá-AP.
Fontes hospedadas no próprio site (sem requisições ao Google Fonts).

## Rodar localmente

```bash
python -m http.server 8000
# abra http://localhost:8000
```

## Estrutura

```
index.html                    página única
politica-de-privacidade.html  LGPD
assets/css/styles.css         estilos (paleta da marca nas variáveis :root)
assets/js/main.js             menu, formulário→WhatsApp, eventos, consentimento
assets/js/config.js           responsável técnico (CRM/RQE) e horário
assets/img/                   favicon, og-image e (opcional) hero.jpg
tools/set-gtm.mjs             troca o ID do GTM
TRACKING.md                   eventos e configuração de GTM/Ads/Meta
```

## Como editar

- **Textos e seções:** `index.html`.
- **Cores:** variáveis no topo de `assets/css/styles.css`.
- **Foto na capa:** salve uma foto vertical como `assets/img/hero.jpg`. Ela aparece sozinha no arco do topo.
- **CRM/RQE no rodapé:** preencha `responsavelTecnico` em `assets/js/config.js`.
- **GTM:** `node tools/set-gtm.mjs GTM-ABC1234` (detalhes em `TRACKING.md`).

## Pendências antes do go-live

Conteúdo levantado em fontes públicas (Google, Instagram, CNPJ). **Confirmar com a clínica:**

- [ ] Responsável técnico, CRM e RQE (exigência do CFM em publicidade médica).
- [ ] Lista final de especialidades e serviços (hoje: pediatria, gastropediatria, pneumologia pediátrica, hematopediatria, fisioterapia respiratória, nutrição infantil, amamentação/freios orais, desenvolvimento e comunicação).
- [ ] Atendimento por convênio (hoje o site manda perguntar pelo WhatsApp).
- [ ] Horário de funcionamento (campo `horario` em `config.js`).
- [ ] Número do WhatsApp oficial para anúncios: o site usa (96) 98107-4126; há um segundo, (96) 99810-7412, em posts de curso.
- [ ] Selo "4,8 no Google · 40 avaliações" e "4 anos de história" (conferir se querem manter).
- [ ] Fotos da clínica e da equipe (a landing foi feita sem fotos para não usar imagem sem autorização).
- [ ] Logo oficial em vetor (o ícone atual é uma recriação simples do símbolo do Instagram).
- [ ] Revisão jurídica da política de privacidade.
- [ ] IDs: GTM, Google Ads (conversão), GA4 e Pixel da Meta.

## Deploy (GitHub Pages)

Publicado a partir da branch `main`, pasta raiz. Para apontar o domínio `crescerpediatriaintegrada.com.br`
para o GitHub Pages (go-live), siga as instruções do registro DNS no repositório/handoff.
