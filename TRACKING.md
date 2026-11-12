# Medição: GTM, Google Ads, GA4 e Meta

Toda a configuração de tags fica **dentro do GTM**. O site só envia eventos para o `dataLayer`.

## Como o GTM carrega

- O snippet está em `index.html` com o placeholder `GTM-XXXXXXX`: troque pelo ID do contêiner.
- Ele **só carrega no domínio de produção** (`crescerpediatriaintegrada.com.br`). Na prévia do GitHub Pages ou no localhost, abra com `?gtm_debug=x` (o Tag Assistant faz isso) ou `?track=1`.
- **Consent Mode v2:** tudo começa `denied`. O aviso de cookies (Aceitar/Recusar) atualiza o consentimento e grava a escolha em `localStorage` (`crescer-consent`). O link "Preferências de cookies" no rodapé reabre o aviso.

## Eventos

| Evento | Quando | Parâmetros |
|---|---|---|
| **`generate_lead`** | Clique em WhatsApp ou telefone, ou envio do formulário | `method` (`whatsapp`, `phone`, `form`), `link_location` |
| `lead_click` | Mesmo momento do anterior (compatível com o padrão da Extin Seven) | `lead_channel`, `lead_location`, `lead_detail` |
| `form_start` / `form_submit` | Primeiro foco e envio do formulário | `form_id` |
| `instagram_click`, `maps_click` | Cliques de apoio | `link_location` |
| `faq_open` | Abre uma pergunta | `question` |
| `consent_update` | Aceita/recusa cookies | `consent_state` |

`link_location`: `nav`, `menu_mobile`, `hero`, `especialidades`, `cursos`, `como_agendar`, `faq`, `contato`, `formulario`, `rodape`, `botao_flutuante`, `barra_mobile`.

**Conversão principal = `generate_lead`.** Os links de WhatsApp/telefone também são `<a>` reais (`data-lead-channel`, `data-lead-location`) para quem preferir gatilho de clique em link.

Por privacidade (LGPD) e pelas políticas do Google e da Meta para saúde, **nenhum evento leva nome, telefone, mensagem ou a especialidade escolhida**.

## Configuração sugerida no GTM

1. **Variáveis da camada de dados:** `method`, `link_location`.
2. **Gatilho:** Evento personalizado `generate_lead`.
3. **Tags:**
   - Google Tag (GA4) em *Initialization – All Pages*.
   - GA4 Event `generate_lead` com `method` e `link_location`.
   - Google Ads: Vinculador de conversões (All Pages) + Acompanhamento de conversões no gatilho `generate_lead`.
   - Meta Pixel: `PageView` em All Pages e `Lead` no gatilho `generate_lead`.
4. Em cada tag, exigir consentimento (`ad_storage` / `analytics_storage`).

## Origem dos contatos no WhatsApp

Se a URL tiver `utm_source`/`utm_campaign`, a mensagem do WhatsApp termina com `(origem: google / 123456)`. A recepção vê de qual anúncio veio o paciente.

- Google Ads (modelo de acompanhamento): `{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}`
- Meta Ads (parâmetros de URL): `utm_source=meta&utm_medium=paid_social&utm_campaign={{campaign.name}}`

## Regras de publicidade médica

- **CFM 2.336/2023:** nome, CRM e RQE do diretor técnico nas peças e no site; sem promessa de resultado nem "antes e depois".
- **Google Ads:** sem remarketing baseado em condições de saúde. Prefira Rede de Pesquisa e públicos amplos.
- **Meta:** não enviar dados de saúde pelo Pixel (os eventos acima já são genéricos).
