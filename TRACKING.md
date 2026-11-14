# Medição: GTM, Google Ads, GA4 e Meta

O site só envia eventos para o `dataLayer`. **Toda tag fica dentro do GTM**, e o contêiner pronto está em [`gtm/crescer-gtm-container.json`](gtm/crescer-gtm-container.json).

## Estado atual (13/11/2026)

| Peça | Situação |
|---|---|
| **GTM** | `GTM-5RPK8QJW` (conta "Crescer Pediatria Integrada", criada no login da agência). Contêiner importado e **publicado** (versão 2). `VITE_GTM_ID` já está no `.env`. |
| **GA4** | `G-JLXBSWS3V8` (conta 416211754, propriedade 564283989, fluxo Web 16336339817, fuso Belém, moeda BRL). Medição otimizada sem "interações com formulário" e sem "pesquisa no site" (conflitariam com `form_start`/`form_submit` e não existem aqui). Hits conferidos: `page_view`, `section_view` e `generate_lead` chegam com o `G-JLXBSWS3V8`. |
| **Google Ads** | Conta "Crescer Pediatria Integrada", ID de conversão `AW-17632899275`. Criadas as conversões **Lead - WhatsApp**, **Lead - Telefone** e **Lead - Formulario** (categoria *Enviar formulário de lead*, contagem Uma, janela de 30 dias, valor 0). Variáveis `const - Ads …` preenchidas, 3 tags **ativas**, GTM **publicado (versão 3)**. Hit conferido: após aceitar cookies, o clique no WhatsApp envia `pagead/conversion/17632899275` com o rótulo certo e o `lead_id` como ID da transação; sem consentimento, nenhum pedido ao Ads. Marcação automática ligada e sufixo de URL final `utm_source=google&utm_medium=cpc&utm_campaign={campaignid}` na conta. Conversões otimizadas (dados do usuário) ficaram **desligadas** de propósito. A conversão antiga "SITE - Contato" (site antigo, 90 dias) segue na conta com status de configuração incorreta; não é usada pelo site novo. |
| **Meta Pixel** | **No ar (13/11/2026).** Pixel `31861617410149503` ("Pixel - Clínica Crescer", conjunto de dados do portfólio empresarial "Crescer Pediatria", criado pelo gestor de tráfego em 15/10/2025, domínio crescerpediatriaintegrada.com.br). `const - Meta Pixel ID` preenchida, as 2 tags `Meta Pixel` **ativas**, GTM **publicado (versão 4)**. Hit conferido no domínio real: sem consentimento, nenhum pedido ao Meta; depois de aceitar cookies, `facebook.com/tr?id=31861617410149503&ev=PageView` sai sem nenhum dado pessoal anexado. Configurações do Pixel conferidas: correspondência avançada automática **desativada**, rastreamento automático sem código **desativado**, configuração básica (restrição de parâmetros) ativada. O evento `Lead` dispara no `generate_lead` (mesmas condições do Ads). |
| **Evento principal no GA4** | Marcar `generate_lead` como evento principal (estrela) em Administrador > Exibição de dados > Eventos, assim que ele aparecer (depois dos primeiros dados). |

Como o Meta foi ligado: o convite do portfólio "Crescer Pediatria" (enviado pelo gestor de tráfego ao e-mail da agência) foi aceito; em Configurações da empresa > Fontes de dados > Conjuntos de dados e pixels já existia o Pixel, então só foi preciso preencher `const - Meta Pixel ID`, **despausar** as 2 tags `Meta Pixel` no GTM (editar a tag > banner "Pausada" > *Ativar* > Salvar) e publicar. **Domínio verificado no Meta (13/11/2026)** pela metatag `facebook-domain-verification` no `<head>` de `index.html` (não remover), com a Página da Crescer conectada ao domínio e o domínio na **lista de permissão** do Pixel (só `crescerpediatriaintegrada.com.br` e subdomínios enviam eventos; 0% do tráfego atual bloqueado). Medição agregada de eventos: o Meta retirou a tela de priorização (limite de 8 eventos) e a verificação do domínio virou opcional, então não há mais o que priorizar; o Pixel envia só `PageView` e `Lead`.

Falta também dar acesso à conta do GTM e do GA4 ao e-mail da clínica (Administrador > Gerenciamento de usuários).

## Colocar no ar (ordem)

1. **GTM:** criar o contêiner Web em tagmanager.google.com e copiar o ID (`GTM-XXXXXXX`).
2. **Site:** trocar o ID no arquivo [`.env`](.env) (`VITE_GTM_ID=GTM-XXXXXXX`). É o único ID que o código precisa. Rodar `npm run build` e subir `dist/`.
3. **Importar o contêiner:** GTM > Admin > *Importar contêiner* > arquivo `gtm/crescer-gtm-container.json` > espaço de trabalho existente > **Mesclar**.
4. **Preencher as 6 variáveis `const -`** (GTM > Variáveis):

   | Variável | O que colocar |
   |---|---|
   | `const - GA4 Measurement ID` | `G-XXXXXXXXXX` (GA4 > Admin > Fluxos de dados) |
   | `const - Ads Conversion ID` | só os números do `AW-123456789` |
   | `const - Ads Label - WhatsApp` | rótulo da conversão "WhatsApp" |
   | `const - Ads Label - Telefone` | rótulo da conversão "Telefone" |
   | `const - Ads Label - Formulario` | rótulo da conversão "Formulário" |
   | `const - Meta Pixel ID` | número do Pixel |

5. **Pré-visualizar:** botão *Visualizar* do GTM, com a URL de produção. Confira que `generate_lead` dispara as tags certas (tabela abaixo) e que, antes de Aceitar, o Pixel não dispara.
6. **Publicar** a versão no GTM.
7. **Conferir em produção:** abrir `https://crescerpediatriaintegrada.com.br/?gtm_debug=x`, clicar em WhatsApp e ver a conversão no Google Ads (*Conversões > Diagnóstico*) e no GA4 (*Tempo real*).

Se o GTM reclamar de algum campo na importação, crie as tags à mão com a tabela "O que o contêiner faz".

## Como o GTM carrega

- O snippet fica em `index.html` e **só carrega no domínio de produção** (`crescerpediatriaintegrada.com.br`, com ou sem `www`). Na prévia do GitHub Pages ou no localhost, nada vai ao GTM, a não ser que a URL tenha `?gtm_debug=x` (o Tag Assistant faz isso) ou `?track=1`.
- Enquanto o ID for `GTM-XXXXXXX`, o GTM nunca carrega.
- O `<noscript>` do GTM está no `<body>`.

## Consent Mode v2 (LGPD)

- Tudo começa **negado** (`ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage`, `personalization_storage`), antes de o GTM carregar.
- O aviso de cookies (Aceitar/Recusar) envia `consent update` com os cinco sinais e o evento `consent_update`. A escolha fica em `localStorage` (`crescer-consent`); quem já aceitou tem o `update` aplicado **antes** do GTM carregar. O link "Preferências de cookies" no rodapé reabre o aviso.
- `url_passthrough` e `ads_data_redaction` ligados: sem consentimento, o Google mede conversões de forma anônima (sem cookies) e não guarda o identificador do clique.
- Modo **avançado**: as tags do Google disparam sempre, adaptando-se ao consentimento. **Meta Pixel só carrega com `ad_storage` concedido.** A política de privacidade já descreve isso; a revisão jurídica final continua pendente (README).

## O que o contêiner faz

| Tag | Quando | Observação |
|---|---|---|
| Google tag - GA4 | *Initialization - All Pages* | visitas; anônimo sem consentimento |
| GA4 - generate_lead | `generate_lead` | `method`, `link_location`, `lead_id` |
| GA4 - engajamento | `section_view`, `form_start`, `form_submit`, `faq_open`, `instagram_click`, `maps_click`, `google_reviews_click`, `doctor_open` | **só GA4**, nunca Ads nem Meta |
| Google Ads - Vinculador de conversões | All Pages | guarda o `gclid` |
| Google Ads - Lead - WhatsApp / Telefone / Formulário | `generate_lead` com `method` = `whatsapp` / `phone` / `form` | `lead_id` como ID da transação (sem duplicar); sem valor |
| Meta Pixel - PageView | All Pages e `consent_update` aceito | exige `ad_storage`; coleta automática desligada |
| Meta Pixel - Lead | `generate_lead` | exige `ad_storage`; sem parâmetros |

## Eventos do site

| Evento | Quando | Parâmetros |
|---|---|---|
| **`generate_lead`** (conversão) | clique em WhatsApp ou telefone, ou envio do formulário | `method` (`whatsapp`/`phone`/`form`), `link_location`, `lead_id` |
| `lead_click` | mesmo momento (padrão Extin Seven) | `lead_channel`, `lead_location`, `lead_id` |
| `form_start` / `form_submit` | primeiro foco / envio do formulário | `form_id` |
| `section_view` | seção vista pela 1ª vez (35% na tela) | `section_id` |
| `doctor_open` | abre o card de uma médica | nenhum |
| `instagram_click`, `maps_click`, `google_reviews_click` | cliques de apoio | `link_location`, `post` |
| `faq_open` | abre uma pergunta | `question` |
| `consent_update` | Aceitar/Recusar | `consent_state` |

`link_location`: `nav`, `menu_mobile`, `hero`, `especialidades`, `consulta_demanda`, `cursos`, `como_agendar`, `faq`, `contato`, `formulario`, `rodape`, `botao_flutuante`, `barra_mobile`, `card_medica`, `servicos`.

Regras que o código já cumpre:

- **Sem duplicar:** dois toques no mesmo canal em menos de 2 s contam uma conversão. Cada conversão tem `lead_id` único.
- **Sem dado de saúde nem pessoal:** nenhum evento leva nome, telefone, mensagem, assunto, médica ou especialidade. Por isso o Ads e o Meta recebem só "houve um contato", e o GA4 não sabe qual médica foi aberta.
- Os links de WhatsApp e telefone são `<a>` reais (`data-lead-channel`, `data-lead-location`) para quem preferir gatilho de clique em link.

## Google Ads: o que criar na conta

1. **Vincular** a conta de anúncios ao GA4 (Admin > Vínculos) e ligar a **marcação automática** (Conta > Configurações).
2. **Três ações de conversão** (Metas > Conversões > Nova > Site > *Configurar manualmente*), todas com *Usar valores diferentes: não*, contagem **Uma**, janela de 30 dias, categoria **Enviar formulário de lead** (WhatsApp e formulário) e **Ligação** ou **Contato** (telefone). Copie o **ID** (`AW-…`) e cada **rótulo** para as variáveis do GTM.
3. **Sufixo de URL final** (Conta > Configurações > Opções de URL):
   `utm_source=google&utm_medium=cpc&utm_campaign={campaignid}`
   Com isso a conversa no WhatsApp termina com `(origem: google / 123456)` e a recepção sabe de qual campanha veio. Sem o sufixo, o `gclid` sozinho já gera `(origem: google)`.
4. **Links de sitelink** podem usar as âncoras da página: `#consulta-de-demanda`, `#especialidades`, `#equipe`, `#servicos`, `#contato`.
5. Ligações pelo anúncio (extensão de chamada) são medidas dentro do Google Ads, à parte da tag.

## Meta Ads

- Parâmetros de URL: `utm_source=meta&utm_medium=paid_social&utm_campaign={{campaign.name}}`.
- Verificar o domínio no Gerenciador de Negócios; em *Medição agregada de eventos*, priorizar `Lead`.
- Em *Eventos > Configurações*, deixar a **correspondência avançada automática desligada** (o código do contêiner já desliga a configuração automática do Pixel).

## Regras de publicidade médica

- **CFM 2.336/2023:** nome, CRM e RQE do diretor técnico nas peças e no site (README: pendência); sem promessa de resultado nem "antes e depois".
- **Google Ads:** sem remarketing baseado em condições de saúde. Use Rede de Pesquisa e públicos amplos; não crie listas de visitantes por seção.
- **Meta:** não enviar dados de saúde pelo Pixel (os eventos acima já são genéricos) e não criar públicos personalizados de quem viu uma especialidade.

## Testar sempre que mudar algo

```bash
VITE_GTM_ID=GTM-TEST999 npm run build
npx vite preview --port 4177        # em outro terminal
npm run test:tracking -- http://localhost:4177/
```

O teste abre o site como um anúncio (`gclid` + `utm`) e confere 23 pontos: consentimento padrão negado e antes do GTM, GTM só com `?track=1`, conversões sem duplicar e com `lead_id`, origem no WhatsApp, formulário sem dado pessoal, `doctor_open` sem médica, `consent update` ao Aceitar e a volta de quem já aceitou. Depois do teste, rode `npm run build` de novo para voltar ao ID real.
