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
- **Curso "Descobrindo Novos Sabores" (nome definido pelo Fábio Pinheiro após reunião da clínica, 13/11/2026; passou por "Seletividade Alimentar na Prática" no mesmo dia). Textos: "Curso para pais e filhos" / "Transformando a Hora de Comer" / "Estratégias práticas…". O Fábio também mencionou o subtítulo "Curso prático para pais e filhos sobre dificuldades alimentares" (17:51); o site seguiu a versão final com a captura anotada (17:53):** fotos do álbum do Google Fotos enviado pela clínica (13/11/2026).
- **Fotos da equipe multiprofissional (Luara, Maira, Taynara e Tainan):** capas das galerias da fotógrafa Isabela Pimentel enviadas pelo Fábio (`/proof/s/dra-luara`, `dra-maira-branco-2`, `dra-taynara-lima-2`, `dra-tainan-s`), uma foto por pessoa, recorte quadrado no rosto. Arquivos `*-2.webp` (o sufixo evita o cache de 30 dias das fotos antigas). Atenção: a galeria chama a nutricionista de "Dra. Maira Branco"; o site segue a tabela oficial ("Maira Lima"). Confirmar o sobrenome.
- **Demais fotos:** posts do Instagram @crescer.pediatriaintegrada, recortadas sem os textos dos posts.
- **Equipe, CRM/RQE e serviços:** carrosséis "Seu filho precisa de qual especialista?" e "Além das consultas, o que você encontra na Crescer?" (terapia alimentar, bioimpedância, laserterapia, consultoria de amamentação, puericultura e curso para gestantes).
- **Endereço, CNPJ e avaliação:** Google Meu Negócio e cartão CNPJ.

## Pendências antes do go-live (confirmar com a clínica)

- [x] **Responsável técnica** no rodapé (exigência do CFM): Dra. Karla Bussons, CRM-AP 1528 · RQE 767, definido pelo Fábio Pinheiro em 13/11/2026 (campo `technicalDirector` em `src/data/site.ts`).
- [x] CRM/RQE de todas as médicas e registros da equipe conferidos com a tabela oficial enviada pela clínica (12/11/2026). Nome da nutricionista ajustado para Maira Lima, como na tabela.
- [ ] Autorização de uso das fotos e nomes da equipe no site (já são públicos no Instagram, mas vale o ok formal).
- [ ] **Avaliações do Google** (`GOOGLE_REVIEWS` e `reviews` das médicas em `src/data/site.ts`): textos reais copiados do Google Maps em 12/11/2026, com nomes abreviados. Ficaram de fora uma avaliação com comparação ("uma das melhores") e uma de pessoa com o mesmo sobrenome de uma médica. Pela Res. CFM 2.336/2023, depoimentos devem ser sóbrios e sem promessa de resultado; vale a clínica revisar a seleção.
- [x] Convênios: a Crescer não trabalha com convênios (FAQ atualizada). Horário: "8h às 18h" (campo `hours`; **os dias da semana não foram informados**, confirmar se é de segunda a sexta antes de exibir dias).
- [ ] Se quiserem, trocar as demais médicas e a equipe multiprofissional por fotos das galerias da fotógrafa (hoje vêm do carrossel do Instagram e da arte da equipe). Laila e Márcia não têm galeria nos links enviados.
- [ ] Conferir divergências entre a arte "Pediatria e subespecialidades" e a tabela oficial (o site segue a tabela): CRM da Dra. Helena (a arte repete o da Dra. Márcia), RQE da Dra. Laila (arte: 1122; tabela: 1103/1122), sobrenome da nutricionista Maira (arte: Branco; tabela: Lima) e título da Taynara (arte: Enfermeira Pediátrica, ENF ESP 76768).
- [x] GTM `GTM-5RPK8QJW` publicado e GA4 `G-JLXBSWS3V8` ligado (`TRACKING.md`).
- [x] **Google Ads:** 3 conversões criadas na conta da Crescer (`AW-17632899275`: WhatsApp, Telefone, Formulário), variáveis preenchidas, 3 tags ativas e GTM publicado (versão 3). Sufixo de URL final configurado; marcação automática já estava ligada.
- [ ] **Meta Pixel:** falta acesso ao Gerenciador de Negócios (hoje só pelo perfil pessoal da Dra. Regiane). Criar o Pixel, preencher `const - Meta Pixel ID` no GTM, despausar as 2 tags Meta e publicar.
- [ ] Vincular o Google Ads ao GA4 (precisa de admin nas duas contas) e marcar `generate_lead` como evento principal no GA4.
- [ ] Dar acesso de administrador do GTM e do GA4 ao e-mail da clínica.
- [ ] Revisão jurídica da política de privacidade.

## Go-live no domínio

**No ar desde 13/11/2026** em https://crescerpediatriaintegrada.com.br (HostGator, Plano P, servidor br230, `public_html`). Publicado com a opção 2 abaixo: `npm run build`, zip de `dist/` (caminhos com `/`), envio pelo Gerenciador de Arquivos do cPanel e extração em `public_html`. O `public/.htaccess` força HTTPS e remove o `www` com um único redirecionamento 301, envia HSTS (180 dias), comprime, define cache e aponta 404/403 para `404.html` (página própria). O certificado é o AutoSSL da HostGator (Let's Encrypt, curinga `*.crescerpediatriaintegrada.com.br`, renova sozinho; emitido em 12/11/2026 e válido até 10/02/2027). `favicon.svg`/`logo-mark*.svg` tiveram removido um pedaço do "r" do logotipo que sobrava na borda direita; há também `favicon-48.png` e `apple-touch-icon.png`. Para atualizar: repetir o build, enviar o zip com "Substituir arquivos existentes" marcado e extrair em `public_html`. O GTM só carrega nesse domínio (ou com `?track=1`/`?gtm_debug`).

O domínio está na HostGator (DNS ns230/ns231) com o Plano P ativo. Duas opções:

1. **GitHub Pages:** na zona DNS da HostGator, registros A da raiz para `185.199.108.153`, `185.199.109.153`, `185.199.110.153` e `185.199.111.153`, CNAME de `www` para `viniciusextremxd.github.io`; criar `public/CNAME` com o domínio, rodar `npm run build` (sem `VITE_BASE`) + `gh-pages -d dist`, e ativar *Enforce HTTPS*.
2. **HostGator (usa o plano pago):** `npm run build` e enviar o conteúdo de `dist/` para `public_html` pelo Gerenciador de Arquivos/FTP. O SSL gratuito (AutoSSL) é emitido pela própria HostGator.
