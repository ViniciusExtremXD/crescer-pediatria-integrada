# Crescer Pediatria Integrada — site institucional

Site da clínica de especialidades pediátricas Crescer Pediatria Integrada (Macapá/AP).
Mesma stack dos sites da Extin Seven / Grupo Alvo: **Vite + React + TypeScript + Tailwind + framer-motion + Lenis + Phosphor**, com HTML pré-renderizado no build (SEO).

- Prévia: https://viniciusextremxd.github.io/crescer-pediatria-integrada/
- Produção (após o go-live): https://crescerpediatriaintegrada.com.br/

## Comandos

```bash
npm install
npm run dev          # http://localhost:5176
npm run build        # dist/ com HTML pré-renderizado + JSON-LD
npm run deploy:gh    # publica a prévia no GitHub Pages (branch gh-pages)
```

## Estrutura

```
src/data/site.ts        todo o conteúdo: contatos, equipe, especialidades, serviços, Instagram, FAQ
src/sections/*          uma seção por arquivo (Hero, About, Specialties, Team, Services, Space, Steps, Instagram, Faq, Contact, Footer)
src/components/motion   animações reutilizáveis (SplitWords, ScrollLitText, VelocityMarquee, ParallaxImage, ClipReveal, TiltCard, Magnetic, Counter)
src/components/chrome   preloader, menu, barra de progresso, WhatsApp flutuante, aviso de cookies (Consent Mode v2)
src/components/cta      links de WhatsApp/telefone com medição
public/                 logo vetorizado (4 versões), fotos (WebP), grade do Instagram, política de privacidade
```

## Performance das animações

- Animações infinitas (balanço, pulso, faixas) só rodam perto da tela: `src/lib/visibility.ts` pausa as que estão fora.
- `src/lib/scroll-progress.ts` substitui `useScroll({ target })` do framer-motion (media o layout a cada frame de rolagem).
- Carrossel de fotos do curso (`PolaroidReel`): baixa as fotos só quando a seção se aproxima, espera decodificar, anda sozinho a 42 px/s e só pausa com o mouse em cima (no toque não trava).
- Brilhos de fundo usam `.glow` (gradiente radial), não `blur-[120px]`; `backdrop-filter` ficou só onde há conteúdo passando por baixo (menu, cartões do modal).
- Não use `prefers-reduced-motion` para frear as animações: o app usa `MotionConfig reducedMotion="never"` de propósito (muitos PCs Windows reportam "reduzir movimento" sem o usuário ter pedido).

## De onde veio o conteúdo

- **Logo:** vetorizado a partir dos posts oficiais (nova identidade, out/2026). `logo-crescer.svg`, versão clara e só o símbolo.
- **Fotos das médicas:** ensaios oficiais. Karla e Lorena vêm das galerias da fotógrafa (Isabela Pimentel, links enviados pela clínica); as demais, do carrossel "Seu filho precisa de qual especialista?". Foto do grupo: post do Dia do Médico.
- **Consulta de Demanda:** roteiro do reel DeScte7iPC9 enviado pela clínica (13/11/2026). Sem foto, a pedido da clínica.
- **Curso de primeiros cuidados com o recém-nascido:** 7 fotos enviadas pelo Pinheiro por WhatsApp (13/11/2026). Aparecem pais e um bebê; vale a clínica confirmar a autorização de uso de imagem dos participantes.
- **Oficina "Seletividade Alimentar na Prática" (antes "Descobrindo Novos Sabores"; nome provisório, a clínica confirma):** fotos do álbum do Google Fotos enviado pela clínica (13/11/2026).
- **Demais fotos:** posts do Instagram @crescer.pediatriaintegrada, recortadas sem os textos dos posts.
- **Equipe, CRM/RQE e serviços:** carrosséis "Seu filho precisa de qual especialista?" e "Além das consultas, o que você encontra na Crescer?" (terapia alimentar, bioimpedância, laserterapia, consultoria de amamentação, puericultura e curso para gestantes).
- **Endereço, CNPJ e avaliação:** Google Meu Negócio e cartão CNPJ.

## Pendências antes do go-live (confirmar com a clínica)

- [ ] **Diretora técnica (CRM/RQE)** para o rodapé, exigência do CFM (campo `technicalDirector` em `src/data/site.ts`).
- [x] CRM/RQE de todas as médicas e registros da equipe conferidos com a tabela oficial enviada pela clínica (12/11/2026). Nome da nutricionista ajustado para Maira Lima, como na tabela.
- [ ] Autorização de uso das fotos e nomes da equipe no site (já são públicos no Instagram, mas vale o ok formal).
- [ ] **Avaliações do Google** (`GOOGLE_REVIEWS` e `reviews` das médicas em `src/data/site.ts`): textos reais copiados do Google Maps em 12/11/2026, com nomes abreviados. Ficaram de fora uma avaliação com comparação ("uma das melhores") e uma de pessoa com o mesmo sobrenome de uma médica. Pela Res. CFM 2.336/2023, depoimentos devem ser sóbrios e sem promessa de resultado; vale a clínica revisar a seleção.
- [ ] Convênios aceitos e horário de funcionamento.
- [ ] Se quiserem, trocar as demais médicas e a equipe multiprofissional por fotos das galerias da fotógrafa (hoje vêm do carrossel do Instagram e da arte da equipe). Laila e Márcia não têm galeria nos links enviados.
- [ ] Conferir divergências entre a arte "Pediatria e subespecialidades" e a tabela oficial (o site segue a tabela): CRM da Dra. Helena (a arte repete o da Dra. Márcia), RQE da Dra. Laila (arte: 1122; tabela: 1103/1122), sobrenome da nutricionista Maira (arte: Branco; tabela: Lima) e título da Taynara (arte: Enfermeira Pediátrica, ENF ESP 76768).
- [ ] IDs de GTM, Google Ads, GA4 e Meta Pixel (ver `TRACKING.md`).
- [ ] Revisão jurídica da política de privacidade.

## Go-live no domínio

O domínio está na HostGator (DNS ns230/ns231) com o Plano P ativo. Duas opções:

1. **GitHub Pages:** na zona DNS da HostGator, registros A da raiz para `185.199.108.153`, `185.199.109.153`, `185.199.110.153` e `185.199.111.153`, CNAME de `www` para `viniciusextremxd.github.io`; criar `public/CNAME` com o domínio, rodar `npm run build` (sem `VITE_BASE`) + `gh-pages -d dist`, e ativar *Enforce HTTPS*.
2. **HostGator (usa o plano pago):** `npm run build` e enviar o conteúdo de `dist/` para `public_html` pelo Gerenciador de Arquivos/FTP. O SSL gratuito (AutoSSL) é emitido pela própria HostGator.
