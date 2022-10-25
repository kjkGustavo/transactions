# Roadmap do desafio

## Visão

Minha visão sobre o desafio foi a contrução de uma aplicação web ~~urgente no caso real~~ para usuários backoffice com o intuito de fazer upload de um arquivo de vendas dos clientes e cadastrar todas as informações no banco de dados ~~da aplicação global~~. Para análise de dados e não perder os detalhes das vendas.

Os requisitos entregues pode ser encontrado [aqui](./CHALLENGE.md#requisitos-funcionais).

## Escolhas

Tecnologias escolhidas para aplicação e motivos da escolha

- NextJS
  - Por já ter uma experiência com o Framework
  - Autonomia na criação de APIs e servidores HTTP
  - SSR
  - Facilidade na integração de Autenticação com o NextAuth.
- TRPC.io
  - Comunicação entre client e server tipadas
  - Por ser uma aplicação ~~"urgente"~~, não achei que teria necessidade de construir um outro ecossistema backend para suprir uma aplicação ~~urgente~~ e simples.
  - Para aprendizado durante o desafio, nunca tinha usado. (Gostei, porém falta algumas features simples)
  - Client totalmente com hooks para o frontend.
- Prisma
  - Por ser bem intuitivo e fácil a integração do ORM.
  - Criação de Schema
  - ORM Gerado com tipagens
- PostgresSQL
  - Por já ter usado em outras aplicações
  - Documentação e pesquisas facilmente
- TypeScript
- react-hook-form
  - Para criação de formulários sem re-renders.
- NextAuth
  - Implementação de autenticação facilmente
  - Não precisaria implementar context, services de Auth do zero
  - Por ser um requisito bonus, não achei necessário a construção de todo o ecossistema
  - Acesso a sessão tanto no Server/Client

## Dificuldades

1. Durante o desafio tive um problema com a minha escolha do tRPC.io, ele não tinha suporte para upload de arquivos(multipart/form-data) e acabei seguindo com a comunicação de arquivos através do Base64 para não perder o uso de tipagens e não criar apenas uma rota especifíca para upload(do nextjs api). Sendo assim as requests ficaram um pouco maior. Em um caso real e com mais tempo tentaria implementar(o multipart/form-data) no tRPC.io.
2. Resolvi trabalhar com os valores das transações em `String` para evitar problemas de calculo com centavos.
3. De última hora tive um problema para importação das transações com o `Promise.all` e decide trocar para `for of`. Assim que possível vou apresentar uma nova soluçaõ.

## Documentações

- [Desafio](./CHALLENGE.md) - Desafio proposto
- [API Routes](./API.md) - Documentação da API
- [README](../README.md) - Iniciar o projeto, desenvolvimento e informações

## Timeline

_O processo de desenvolvimento da aplicação_

### Início

1. Definição de tecnologia e ferramentas
2. Criação das relações no banco de dados

### Meio

1. Criação das rotas do tRPC.io
2. Criação dos components
3. Implementação das telas
4. Criação de tests para as transactions
5. Autenticação

### Final

- Documentação
- "Dockerizando" a aplicação

## Conclusão

Tests: Creio que apenas o de `transactions` que ficou legal os casos de test, os outros não foi implementado.

Desenvolvimento: Gostei do resultado final, apesar de não ter implementado o upload corretamente sem base64, acredito que nas escolhas gerais de tecnologias foi bastante relevante e produtivas.

Deasfio: Gostei da regra de negócio do desafio, porém acredito que os requisitos foi um pouco extenso, bastante corrido para conseguir encaixar no tempo.
