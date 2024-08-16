# Twygo Technical Test

Este repositório contém a implementação de um teste técnico desenvolvido para a empresa **Twygo**. A aplicação é composta por um **frontend** em React, um **backend** em Node.js, e um banco de dados **MongoDB**, todos orquestrados utilizando **Docker Compose**.

## Visão Geral

A aplicação está organizada em três serviços principais:

- **Frontend:** Uma aplicação React responsável pela interface do usuário.
- **Backend:** Um servidor Node.js que expõe uma API RESTful para manipulação dos dados.
- **MongoDB:** Banco de dados NoSQL utilizado para persistência dos dados.

Um serviço adicional, o **Nginx**, é utilizado como proxy reverso para roteamento das requisições entre o frontend e o backend.

## Demonstração

Uma versão ao vivo da aplicação pode ser visualizada em: [twygo-tecnico.leohammes.dev](https://twygo-tecnico.leohammes.dev)

## Como Executar Localmente

Para rodar a aplicação em seu ambiente local, siga os passos abaixo:

### Pré-requisitos

- **Docker**
- **Docker Compose**

### Passos

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/twygo-tecnico.git
   cd twygo-tecnico
   ```

2. **Construa e inicie os contêineres:**

   ```bash
   docker-compose up --build
   ```

3. **Acesse a aplicação:**

   Abra o navegador e vá para [http://localhost:8080](http://localhost:8080).

## Estrutura do Docker Compose

O arquivo `docker-compose.yml` é responsável por orquestrar todos os serviços necessários para a aplicação:

- **nginx:** Proxy reverso que roteia as requisições para o frontend e backend.
- **backend:** Expondo a API na porta `5000`.
- **frontend:** Servindo a aplicação React na porta `3000`.
- **mongo:** Banco de dados MongoDB acessível na porta `27017`.

## Comandos Úteis

- **Iniciar a aplicação:** 

  ```bash
  docker-compose up
  ```

- **Parar a aplicação:** 

  ```bash
  docker-compose down
  ```

- **Rebuild da aplicação:** 

  ```bash
  docker-compose up --build
  ```

## Licença

Este projeto está licenciado sob os termos da [MIT License](./LICENSE).

---
