# Medição: GTM, Google Ads e Meta

O site envia eventos pelo `dataLayer`. Toda a configuração de tags (GA4, Google Ads, Meta Pixel) é feita **dentro do GTM**, sem mexer no código.

## 1. O que falta para ligar

| Item | Onde pegar | Onde entra |
|---|---|---|
| ID do contêiner GTM (`GTM-XXXXXXX`) | tagmanager.google.com | `node tools/set-gtm.mjs GTM-ABC1234` |
| ID da conta Google Ads (`AW-XXXXXXXXX`) e rótulo da conversão | Google Ads > Metas > Conversões | Tag no GTM |
| ID do GA4 (`G-XXXXXXXXXX`) | analytics.google.com | Tag no GTM |
| ID do Pixel da Meta | Gerenciador de Eventos (BM da Drª Regiane) | Tag no GTM |

Enquanto o ID do GTM for o placeholder `GTM-XXXXXXX`, nada é carregado.

## 2. Eventos enviados pelo site

| Evento | Quando dispara | Parâmetros |
|---|---|---|
| **`generate_lead`** | Clique em WhatsApp ou telefone, ou envio do formulário | `method` (`whatsapp`, `phone`, `form_whatsapp`), `link_location` |
| `whatsapp_click` | Clique em qualquer botão/link de WhatsApp | `link_location` |
| `phone_click` | Clique em telefone | `link_location` |
| `form_start` / `form_submit` | Início e envio do formulário | `form_id` |
| `maps_click`, `instagram_click`, `map_loaded` | Cliques de apoio | `link_location` |
| `scroll_depth` | 25, 50, 75 e 90% da página | `percent` |
| `faq_open` | Abre uma pergunta do FAQ | `question` |
| `consent_update` | Visitante aceita ou recusa cookies | `consent_state` |

`link_location` indica de onde veio o clique: `header`, `menu_mobile`, `hero`, `especialidades`, `cursos`, `contato`, `formulario`, `localizacao`, `cta_final`, `rodape`, `flutuante`, `barra_mobile`.

**Conversão = `generate_lead`.** Use só ele como conversão principal (evita contar duas vezes). Os outros servem para análise.

Por privacidade e por regra das plataformas de anúncio, o site **não envia** o motivo da consulta, nem nome, nem dados de saúde em nenhum evento.

## 3. Configuração no GTM (passo a passo)

**Gatilhos** (tipo *Evento personalizado*):
- `generate_lead`
- `whatsapp_click`, `phone_click` (opcionais)
- `scroll_depth` (opcional)

**Variáveis** (tipo *Variável da camada de dados*): `method`, `link_location`, `percent`.

**Tags**
1. **Google Tag (GA4)**: ID `G-…`, gatilho *Initialization / All Pages*.
2. **GA4 Event**: nome `generate_lead`, parâmetros `method` e `link_location`; gatilho `generate_lead`.
3. **Google Ads: Vinculador de conversões**, gatilho *All Pages*.
4. **Google Ads: Acompanhamento de conversões**: ID e rótulo da conversão; gatilho `generate_lead`.
5. **Meta Pixel**: tag HTML ou template oficial.
   - `PageView` em *All Pages*.
   - `Lead` no gatilho `generate_lead`.
   - `Contact` no gatilho `whatsapp_click` (opcional).

**Consentimento:** o site usa o Consent Mode v2 (tudo `denied` por padrão). Em cada tag, abra *Configurações avançadas > Configurações de consentimento* e exija `ad_storage` / `analytics_storage` conforme o tipo. Ative "Consent overview" no contêiner para conferir.

## 4. Rastrear a origem do paciente

O site lê `utm_source` e `utm_campaign` da URL e acrescenta ao fim da mensagem de WhatsApp, por exemplo `(origem: google / 123456)`. Assim a recepção vê de qual anúncio cada contato veio.

**Google Ads** (modelo de acompanhamento no nível da conta):

```
{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={adgroupid}&utm_term={keyword}
```

**Meta Ads** (parâmetros de URL do anúncio):

```
utm_source=meta&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}
```

## 5. Como testar

1. GTM > **Visualizar** > informe a URL do site.
2. Clique em "Agendar pelo WhatsApp": deve aparecer `whatsapp_click` e `generate_lead`.
3. Confirme no Tag Assistant que as tags de conversão dispararam **depois** de aceitar os cookies.
4. No Google Ads, a conversão deve aparecer como "Registrando conversões" em até 24 h.

## 6. Atenção às regras das plataformas

- **CFM (Res. 2.336/2023):** anúncios e páginas de médicos devem trazer nome, CRM e RQE do responsável técnico (campo `responsavelTecnico` em `assets/js/config.js`) e não prometer resultados nem usar "antes e depois".
- **Google Ads:** a política de saúde restringe personalização/remarketing com base em informações de saúde. Prefira campanhas de busca e públicos genéricos.
- **Meta:** não envie dados de saúde pelo Pixel. Os eventos acima já são genéricos; mantenha assim.
