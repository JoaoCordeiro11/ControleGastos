# Controle de Gastos

Sistema de controle de gastos residenciais, com cadastro de pessoas, cadastro de transações (receitas e despesas) e consulta de totais por pessoa e geral.

Desenvolvido como desafio técnico de processo seletivo para estágio em TI (Desenvolvimento).

## Tecnologias

- **Back-end:** .NET / C#, Entity Framework Core, SQLite
- **Front-end:** React, TypeScript, Vite

## Funcionalidades

### Cadastro de pessoas
- Criação, listagem e exclusão.
- Ao excluir uma pessoa, todas as suas transações são apagadas em cascata.
- Campos: identificador (gerado automaticamente), nome e idade.

### Cadastro de transações
- Criação e listagem.
- Pessoas menores de 18 anos só podem ter despesas cadastradas (não podem cadastrar receitas).
- Campos: identificador (gerado automaticamente), descrição, valor, tipo (receita/despesa) e pessoa vinculada.

### Consulta de totais
- Lista todas as pessoas com o total de receitas, despesas e saldo (receita − despesa) de cada uma.
- Exibe o total geral (receitas, despesas e saldo líquido) somando todas as pessoas.

## Estrutura do projeto

ControleGastos/
├── backend/ API em .NET/C# (Controllers, Models, DTOs, Services, Data, Migrations)
└── frontend/ Aplicação em React + TypeScript (Vite)


## Como rodar o projeto

### Pré-requisitos

- [.NET SDK](https://dotnet.microsoft.com/download) (versão 8 ou compatível)
- [Node.js](https://nodejs.org/) (versão 18+)

### 1. Back-end

```bash
cd backend
dotnet restore
dotnet run
```

Por padrão, a API sobe em `http://localhost:5094` e o Swagger fica disponível em `http://localhost:5094/swagger`.

O banco SQLite é criado automaticamente (via migrations do Entity Framework) na primeira execução, e os dados persistem em um arquivo local — não é necessário nenhuma configuração adicional de banco de dados.

> Se a API subir em uma porta diferente de 5094 na sua máquina, ajuste a `baseURL` em `frontend/src/services/api.ts` para o endereço correto.

### 2. Front-end

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

A aplicação abre em `http://localhost:5173`.

> O back-end já está configurado (CORS) para aceitar requisições vindas de `http://localhost:5173`. Se o front subir em outra porta, é necessário liberar essa origem em `backend/Program.cs`.

## Endpoints principais da API

| Método | Rota              | Descrição                          |
|--------|-------------------|-------------------------------------|
| GET    | `/api/Pessoas`    | Lista todas as pessoas              |
| POST   | `/api/Pessoas`    | Cadastra uma pessoa                 |
| DELETE | `/api/Pessoas/{id}` | Exclui uma pessoa e suas transações |
| GET    | `/api/Transacoes` | Lista todas as transações           |
| POST   | `/api/Transacoes` | Cadastra uma transação              |
| GET    | `/api/Totais`     | Retorna os totais por pessoa e geral |

A documentação interativa completa (com todos os campos esperados) fica disponível no Swagger após subir o back-end.