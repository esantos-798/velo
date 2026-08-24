# Casos de Teste - Velô Sprint

## CT01 - Acessar a Landing Page com sucesso

#### Objetivo
Validar que a Landing Page do Velô Sprint é carregada corretamente e exibe as informações principais e o call-to-action para o configurador.

#### Pré-Condições
- O sistema deve estar no ar e acessível.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Acessar a URL raiz (`/`) do sistema. | A página principal (Landing Page) é carregada sem erros. |
| 2  | Clicar no botão "Configurar o seu" (ou equivalente). | O usuário é redirecionado para o módulo de Configurador de Veículo (`/configure`). |

#### Resultados Esperados
- A Landing Page carrega completamente, e a navegação para o configurador ocorre com sucesso.

#### Critérios de Aceitação
- Navegação para `/configure` funciona.

---

## CT02 - Acessar Páginas Estáticas (Termos e Privacidade)

#### Objetivo
Validar o acesso às páginas estáticas de Termos de Uso e Política de Privacidade.

#### Pré-Condições
- N/A

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Acessar a URL `/termos`. | A página de Termos de Uso é exibida. |
| 2  | Acessar a URL `/privacidade`. | A página de Política de Privacidade é exibida. |

#### Resultados Esperados
- As páginas carregam com o conteúdo adequado.

#### Critérios de Aceitação
- Resposta sem erro 404 para `/termos` e `/privacidade`.

---

## CT03 - Acessar Rota Inexistente (404 Not Found)

#### Objetivo
Validar o comportamento do sistema ao acessar uma rota que não existe.

#### Pré-Condições
- N/A

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Acessar a URL `/rota-invalida-123`. | A página NotFound (404) é exibida. |

#### Resultados Esperados
- O sistema informa que a página não foi encontrada e possivelmente oferece um link para voltar à home.

#### Critérios de Aceitação
- Rota coringa `*` captura caminhos inválidos.

---

## CT04 - Configuração base do veículo (Sem opcionais)

#### Objetivo
Validar que o sistema calcula o preço corretamente quando o usuário escolhe a configuração base.

#### Pré-Condições
- O usuário deve estar na página `/configure`.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Visualizar o preço total do veículo na tela de configuração sem selecionar opcionais extras. | O preço total exibido é de R$ 40.000. |
| 2  | Clicar para avançar para o Checkout. | O usuário é redirecionado para `/order` com o valor de R$ 40.000. |

#### Resultados Esperados
- O preço total é calculado apenas com o valor base.

#### Critérios de Aceitação
- Valor total no checkout: R$ 40.000.

---

## CT05 - Configuração com opcionais 

#### Objetivo
Validar o cálculo do preço final quando o usuário seleciona opções extras de rodas e pacotes.

#### Pré-Condições
- Usuário em `/configure`.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Selecionar a opção "Rodas Sport" (+R$ 2.000) e "Precision Park" (+R$ 5.500) e "Flux Capacitor" (+R$ 5.000). | O preço total é atualizado dinamicamente. |
| 2  | Avançar para o Checkout. | A tela de Checkout `/order` exibe o valor somado corretamente (R$ 52.500) e lista os opcionais. |

#### Resultados Esperados
- O sistema soma os valores dos opcionais ao valor base corretamente.

#### Critérios de Aceitação
- Opcionais listados no resumo do checkout com seus respectivos valores somados no total.

---

## CT06 - Checkout - Formato de Pagamento À Vista

#### Objetivo
Validar o processamento do pedido selecionando a forma de pagamento "À Vista".

#### Pré-Condições
- Usuário na tela de Checkout `/order`.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher dados pessoais válidos e selecionar a loja de retirada. | Dados aceitos. |
| 2  | Selecionar a forma de pagamento "À Vista". | Nenhuma simulação de parcelas ou entrada é exibida. O total permanece o preço da configuração. |
| 3  | Confirmar pedido. | Pedido é criado e redirecionado para a página de Sucesso (`/success`). |

#### Resultados Esperados
- Pedido à vista é criado sem chamar validações restritas de score da API de crédito.

#### Critérios de Aceitação
- Pedido gerado com método de pagamento `avista`.

---

## CT07 - Checkout - Simulação de Financiamento

#### Objetivo
Validar a fórmula de cálculo do financiamento e juros.

#### Pré-Condições
- Usuário em `/order` com total de R$ 40.000.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Selecionar "Financiamento". | Campos de entrada e parcelas aparecem. |
| 2  | Inserir entrada de R$ 10.000. | Valor a financiar exibido como R$ 30.000. |
| 3  | Verificar o valor da parcela. | A parcela deve ser calculada como `(30.000 / 12) * 1.02` = R$ 2.550,00. O total financiado deve exibir R$ 30.600. |

#### Resultados Esperados
- O sistema calcula e exibe o valor correto baseado na fórmula linear `(Amount / 12) * 1.02` implementada no código.

#### Critérios de Aceitação
- O valor financiado e parcelas refletem com precisão a regra de juros fixos inserida no código.

---

## CT08 - Financiamento - Score > 700 (Aprovado)

#### Objetivo
Validar a aprovação de crédito para clientes com alto score.

#### Pré-Condições
- Usuário no Checkout preenchendo Financiamento (Entrada < 50%).
- A simulação (mock) da API de crédito retorna Score = 750 para o CPF informado.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher dados e confirmar pedido. | O sistema consulta a API de crédito com o CPF. |
| 2  | Aguardar o redirecionamento. | Usuário é levado para a tela de Sucesso com o status do pedido definido como APROVADO. |

#### Resultados Esperados
- Score alto garante aprovação automática.

#### Critérios de Aceitação
- Status do pedido: `APROVADO`.

---

## CT09 - Financiamento - Score 501-700 (Em Análise)

#### Objetivo
Validar a análise manual para clientes com score médio.

#### Pré-Condições
- Entrada < 50%. API retorna Score = 600.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Confirmar pedido. | O sistema consulta a API de crédito. |
| 2  | Aguardar o processamento. | Usuário é redirecionado, e o status exibido é EM ANÁLISE. |

#### Resultados Esperados
- O pedido fica no status "Em Análise".

#### Critérios de Aceitação
- Status do pedido: `EM_ANALISE`.

---

## CT10 - Financiamento - Score <= 500 (Reprovado)

#### Objetivo
Validar a recusa automática de crédito para score baixo.

#### Pré-Condições
- Entrada < 50%. API retorna Score = 450.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Confirmar pedido. | O sistema consulta a API. |
| 2  | Visualizar o retorno do sistema. | O status do pedido é definido como REPROVADO. |

#### Resultados Esperados
- Crédito negado automaticamente.

#### Critérios de Aceitação
- Status do pedido: `REPROVADO`.

---

## CT11 - Financiamento - Exceção (Entrada >= 50%)

#### Objetivo
Validar que a regra de entrada alta (>= 50%) se sobrepõe ao score de crédito baixo.

#### Pré-Condições
- Total do veículo: R$ 40.000.
- Entrada informada: R$ 20.000.
- API retorna Score = 400 (que causaria reprovação normal).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Confirmar pedido. | O sistema avalia as regras de decisão. Como a entrada é 50%, aprova. |
| 2  | Verificar o status final. | O pedido recebe o status APROVADO, ignorando o score de 400. |

#### Resultados Esperados
- A regra de entrada sobrepõe a restrição de score.

#### Critérios de Aceitação
- Status do pedido: `APROVADO`.

---

## CT12 - Checkout - Validação de Formulário

#### Objetivo
Validar que o formulário impede submissões com dados ausentes ou inválidos de acordo com o Zod schema do sistema.

#### Pré-Condições
- Usuário no Checkout.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher o campo Nome com apenas 1 letra. | Erro exibido ("Nome deve ter pelo menos 2 caracteres"). |
| 2  | Preencher Sobrenome com 1 letra. | Erro exibido. |
| 3  | Inserir e-mail sem '@' ou formato inválido. | Erro "Email inválido". |
| 4  | Não preencher CPF ou preencher incompleto (menos de 14 caracteres de máscara). | Erro "CPF inválido". |
| 5  | Deixar a Loja sem seleção. | Erro "Selecione uma loja". |
| 6  | Não marcar o checkbox dos Termos de Uso. | Erro "Aceite os termos". |
| 7  | Clicar em "Confirmar Pedido". | A requisição não é disparada e todos os erros são evidenciados. |

#### Resultados Esperados
- O frontend (Zod validation) bloqueia a criação de pedido inválido.

#### Critérios de Aceitação
- Validações corretas sendo disparadas no clique do botão.

---

## CT13 - Consulta de Pedidos com Sucesso

#### Objetivo
Validar a busca de um pedido existente na tela `/lookup`.

#### Pré-Condições
- O usuário possui um ID de pedido válido (ex: `123e4567-e89b-12d3-a456-426614174000`).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Acessar `/lookup`. | Formulário de consulta é exibido. |
| 2  | Inserir o ID do pedido e clicar em "Buscar Pedido". | O sistema faz a busca com spinner de carregamento. |
| 3  | Visualizar o resultado. | Detalhes do pedido (Status, configuração, cliente, pagamento) são renderizados na tela. |

#### Resultados Esperados
- O pedido correspondente é exibido.

#### Critérios de Aceitação
- O badge de status e os dados do cliente e configuração batem com os dados salvos.

---

## CT14 - Consulta de Pedidos Não Encontrado

#### Objetivo
Validar o tratamento visual ao consultar um ID de pedido inválido ou inexistente.

#### Pré-Condições
- Estar em `/lookup`.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Inserir ID `invalido-123` e buscar. | Sistema processa a busca. |
| 2  | Visualizar a tela. | Um card vermelho com ícone de erro indica "Pedido não encontrado". |

#### Resultados Esperados
- Usuário é alertado que o pedido não existe na base de dados.

#### Critérios de Aceitação
- Feedback visual claro de que a busca não retornou resultados.
