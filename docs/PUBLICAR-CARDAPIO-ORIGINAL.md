# Publicação pública do Café com Bolo

## Objetivo
Preservar o painel original no Samsung S20 FE, e publicar uma cópia estática do cardápio real com endereço público e QR Code próprio. **Não** usar a vitrine simplificada (`docs/index.html`) como substituta do cardápio.

## Fonte dos dados reais
A API pública do aplicativo existente é:

`GET /api/public/menu/{businessSlug}/{menuSlug}?lang=pt`

Para o estabelecimento `cafe-com-amor`, consultar primeiro:

`http://192.168.101.3:8095/api/public/menu/cafe-com-amor?lang=pt`

Se houver mais de um cardápio, utilizar também o identificador de cardápio (menuSlug) exibido pelo painel. Esta URL só funciona dentro da rede do S20.

Salvar o JSON retornado, contendo os dados completos. Verificar `menu_resolved` e `business`, `categories` antes da publicação.

## Cuidados
- Nunca exportar senhas, sessões ou dados de administração.
- As imagens podem depender do servidor local: copiar cada imagem necessária para o repositório ou hospedagem pública e reescrever seus endereços. Sem isso, o site publicado perderá as imagens quando o S20 desligar.
- Manter o visual do componente original `MenuContent` e suas configurações de tema.
- Não publicar links `192.168.*` ou `localhost` nos QR Codes dos clientes.
- O GitHub Pages serve para testes estáticos; para clientes comerciais, confirmar as condições da plataforma de hospedagem.
- Mudanças feitas no S20 não se refletem automaticamente na cópia pública: é preciso exportar e republicar.
- Não publicar o JSON recebido sem validar que contém apenas campos públicos.
