# Desafio Técnico Fullstack

Este é um projeto fullstack desenvolvido como parte de um desafio técnico. A aplicação consiste em um frontend em React utilizando Vite, um backend em Node.js com Express e um banco de dados MySQL. O objetivo do projeto é avaliar o domínio em desenvolvimento fullstack, incluindo organização, estilo de codificação e boas práticas.

## Funcionalidades

- **Gerenciamento de Participantes**: Cadastro, listagem, atualização e remoção de participantes.

## Tecnologias Utilizadas

- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **Banco de Dados**: MySQL
- **Docker**: Docker, Docker Compose

## Estrutura do Projeto

```
desafio_tecnico/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   └── ...
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.js
│   └── ...
├── db_participation.sql
├── docker-compose.yml
└── README.md
```

## Pré-requisitos

- Docker e Docker Compose instalados.

## Configuração

- Clone o repositório;
- Configure as variáveis de ambiente: configure sua senha no arquivo .env;
- Inicie os serviços:

```
docker-compose up --build

```

## Acesso à Aplicação

- Frontend: http://localhost:5173
- Backend: http://localhost:5001

## Rotas da API

- **GET /api/participants**: Listar todos os participantes.
- **POST /api/participants**: Criar um novo participante.
- **GET /api/participants/:id**: Obter um participante por ID.
- **PUT /api/participants/:id**: Atualizar um participante por ID.
- **DELETE /api/participants/:id**: Remover um participante por ID.
