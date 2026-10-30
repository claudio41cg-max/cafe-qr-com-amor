# Café QR com Amor — atendimento a múltiplas cafeterias

## Objetivo
Uma única plataforma hospedada em um domínio público atende vários estabelecimentos. Cada cafeteria tem marca, menu, imagens, preços e QR próprios. O proprietário contrata o serviço e não precisa de login no painel; a equipe do operador executa as alterações.

## Regras confirmadas
1. Um único repositório e uma implantação do aplicativo; dados separados por `business_id`.
2. Um slug estável por cafeteria. Cardápio público em `/m/{business-slug}/{menu-slug}`, podendo evoluir para domínio próprio.
3. QR permanente por cardápio e, futuramente, opção de QR com identificador de mesa. Editar produtos não altera o URL.
4. Cadastro e publicação feitos somente por operadores autorizados. Acesso público apenas para visualização.
5. Cada produto inclui imagem pertinente, nome, preço em BRL, descrição detalhada e ingredientes verificados pelo estabelecimento.
6. Alterações em uma cafeteria nunca afetam outra. Não copiar credenciais entre clientes.

## Estado verificado no código em 30/10/2026
- Existentes: tabelas de businesses, menus, categories e products; menus ligados a business; suporte a rotas públicas com business slug; sessão de usuário associada a business id.
- Não existente: painel central para uma equipe gerir muitos businesses com troca de contexto autorizada.
- Registro de conta pública cria conta/empresa própria; isso não é o fluxo desejado para operação exclusiva da equipe.
- Exposição atual em IP do S20 FE é ambiente de testes de rede local, não serviço de produção.
- Revisar todos os handlers e consultas para comprovar isolamento por business antes de liberar multiempresa.

## Implementação em fases
### Fase 1 — autorização e isolamento
- Papéis explícitos: platform_admin, platform_editor (limitado a empresas atribuídas), business_owner (reservado para o futuro).
- Tabelas de operadores e atribuições (operator_business_access), sem dar acesso amplo por trocar ID na URL.
- Middleware resolve business por escopo autorizado e registra operações.
- Testes de vazamento entre dois estabelecimentos em edição, leitura, uploads, QR e analytics.

### Fase 2 — central de clientes
- Lista de cafeterias (buscar, criar, ativar/desativar, abrir configuração).
- Cadastro da identidade, endereço, contato, capa e cardápio inicial em BRL.
- Duplicar estrutura-modelo sem copiar dados sensíveis, mantendo originais independentes.
- Histórico de alteração, confirmação antes de exclusão e opção de reverter conteúdo.

### Fase 3 — publicação
- Endereço público HTTPS e domínio estável; QR contém URL do menu público, nunca `localhost` nem IP privado.
- Alterações publicadas de forma controlada, com prévia e botão Publicar.
- Backup automático, monitoramento e recuperação.

### Fase 4 — produto comercial
- Lista de solicitações recebidas de cada cliente, acompanhamento, datas e responsável.
- Gestão comercial de contratos e manutenção, sem expor painel administrativo ao consumidor.
- Testes no Android e iPhone, Wi-Fi e dados móveis.

## Cuidados antes do lançamento
- Substituir credenciais de banco expostas em captura de tela e revisar permissões.
- Proteger endpoints administrativos e uploads contra acesso de outra cafeteria.
- Não conectar a porta do S20 diretamente à Internet.
- Usar URL pública fixa, TLS, backup e termos de tratamento de dados.

## Critérios de aceite
1. Duas cafeterias têm nomes, logos e cardápios totalmente distintos.
2. Dois QR Codes abrem diretamente as páginas públicas correspondentes, sem login.
3. Alterar preço e imagem da cafeteria A não muda nada na B; QR da A permanece igual.
4. Usuário não autorizado não consegue editar nenhuma delas.
5. Equipe autorizada gerencia os dois negócios no mesmo painel.
