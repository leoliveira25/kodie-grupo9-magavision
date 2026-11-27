# MagaVision — Central de Trocas e Devoluções

**Status:** Protótipo funcional em desenvolvimento e validação.

## Sobre o projeto

O **MagaVision** é uma aplicação web de pós-venda desenvolvida para facilitar a abertura, o acompanhamento e o gerenciamento de solicitações de troca e devolução de produtos.

O projeto busca centralizar o atendimento ao cliente, melhorar a comunicação com o Serviço de Atendimento ao Consumidor (SAC) e tornar o processo de pós-venda mais simples, organizado e transparente.

A aplicação foi desenvolvida com o apoio da plataforma [Lovable](https://lovable.dev) e encontra-se em fase de demonstração e testes de qualidade e privacidade.

## Funcionalidades

### Área do cliente

- Abertura de solicitações de troca e devolução.
- Consulta por número do pedido ou protocolo e contato cadastrado.
- Acompanhamento do status da solicitação.
- Inclusão de imagens relacionadas à solicitação.
- Página de nova solicitação (`/solicitacao`), sem necessidade de login, com confirmação de protocolo.

### Área do atendente (SAC)

- Tela de acesso demonstrativo para atendentes.
- Painel de atendimento com indicadores de solicitações.
- Busca e filtragem de solicitações.
- Gerenciamento e atualização do status dos atendimentos.
- Sugestões simuladas de respostas ao cliente.
- Atualização das informações compartilhadas com a área do cliente no mesmo ambiente local.

## Tecnologias utilizadas

| Tecnologia | Finalidade |
| --- | --- |
| React 19 e TypeScript | Desenvolvimento da aplicação e tipagem |
| TanStack Start e TanStack Router | Estrutura da aplicação e navegação |
| Vite | Desenvolvimento e build |
| Tailwind CSS 4 | Estilização da interface |
| shadcn/ui, Radix UI e Lucide | Componentes de interface e ícones |
| localStorage | Persistência local de solicitações e imagens |
| Vitest e Testing Library | Ferramentas de testes automatizados |
| ESLint e Prettier | Padronização e qualidade do código |
| Lovable | Plataforma de desenvolvimento |

## Como executar localmente

### Pré-requisitos

- Git.
- [Node.js](https://nodejs.org/) em versão compatível com as dependências do projeto.
- npm ou [Bun](https://bun.sh/).

Clone o repositório, substituindo os campos abaixo pelos dados reais:

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_REPOSITORIO>
```

Instale as dependências e inicie o servidor de desenvolvimento com npm:

```bash
npm install
npm run dev
```

Como o projeto possui um arquivo `bun.lock`, também é possível utilizar Bun:

```bash
bun install
bun run dev
```

Acesse a URL local exibida no terminal.

### Comandos disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o ambiente de desenvolvimento |
| `npm run build` | Gera o build da aplicação |
| `npm run build:dev` | Gera o build em modo de desenvolvimento |
| `npm run preview` | Visualiza o build localmente |
| `npm run lint` | Verifica o código com ESLint |
| `npm run format` | Formata os arquivos com Prettier |
| `npm test` | Executa os testes automatizados |
| `npm run test:watch` | Executa os testes em modo de monitoramento |

## Qualidade e testes (QA)

O projeto possui um planejamento inicial de testes manuais voltado à funcionalidade, usabilidade, compatibilidade e privacidade, além de configuração para testes automatizados com Vitest.

### Status dos testes manuais

Conforme os registros em `Testes.docx`:

| ID | Caso de teste | Situação |
| --- | --- | --- |
| CT01 | Acesso ao aplicativo | Aprovado |
| CT02 | Acesso à tela do atendente | Aprovado |
| CT03 | Autenticação do atendente | Em andamento |
| CT04–CT10 | Demais verificações planejadas | Sem resultado registrado |

**OBS-01:** credenciais demonstrativas visíveis na tela de acesso. Essa condição deve ser corrigida antes de uma eventual implantação em produção.

Os resultados devem ser registrados com evidências, comportamento esperado e observado e sugestões de melhoria. A configuração de testes automatizados, por si só, não comprova a aprovação dos testes.

## Privacidade e segurança

> [!WARNING]
> O MagaVision é um ambiente demonstrativo. Utilize exclusivamente dados fictícios e não insira informações pessoais reais, imagens sensíveis ou credenciais de produção.

- As solicitações e imagens são armazenadas no navegador por meio de `localStorage`.
- Os dados não são compartilhados automaticamente entre dispositivos ou navegadores.
- As notificações por e-mail e WhatsApp e as sugestões de IA são simuladas.
- A seleção de perfil e o acesso demonstrativo não constituem mecanismos seguros de autenticação ou autorização.
- O protótipo não deve ser utilizado para tratamento de dados reais ou considerado em conformidade comprovada com a LGPD.

## Roadmap

### Etapas registradas como concluídas

- [x] Área do cliente para abertura e acompanhamento de solicitações.
- [x] Painel SAC com filtros, gerenciamento e sugestões locais de resposta.
- [x] Persistência local com quatro solicitações de exemplo.
- [x] Telas de acesso separadas para cliente e atendente.
- [x] Página dedicada à abertura de solicitação com confirmação de protocolo.

### Próximas melhorias propostas

- [ ] Concluir os testes manuais e documentar as evidências.
- [ ] Ampliar a cobertura de testes automatizados.
- [ ] Implementar autenticação e controle de acesso seguros no servidor.
- [ ] Avaliar a integração com banco de dados e armazenamento seguro de imagens.
- [ ] Implementar notificações reais, caso previstas para a versão de produção.
- [ ] Revisar os requisitos de segurança, privacidade, acessibilidade e LGPD.

## Documentação do projeto

- `roadmap.md` — planejamento e evolução das funcionalidades.
- `Testes.docx` — plano de testes manuais e registros iniciais de QA.
- `AGENTS.md` — orientações de desenvolvimento e integração com o Lovable.
- `package.json` — dependências e comandos da aplicação.

## Considerações finais

O MagaVision tem como propósito melhorar a experiência de pós-venda, aproximando o cliente da equipe de atendimento por meio de uma solução digital centralizada. O projeto permanece em evolução, com foco na experiência do usuário, na qualidade do software e na proteção das informações.
