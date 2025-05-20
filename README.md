# Takeat API

Takeat API é uma API criada para o contexto de um aplicativo de delivery.

## Passos para Utilização

### 1. Baixar arquivos e instalar dependências

Após baixar o repositório e abrir na sua IDE, abra o terminal e execute o comando abaixo para instalar todas as dependências necessárias para o projeto:

```bash
npm install
```

### 2. Criar banco de dados

Para rodar o banco de dados, você precisa ter o **PostgreSQL** ou **pgAdmin** instalado na sua máquina.

Antes de iniciar, crie um arquivo `.env` na raiz do projeto para declarar as variáveis de ambiente necessárias. Exemplo:

```env
ALLOWED_PROJECT=http://localhost:5173
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=takeat
DB_HOST=localhost
DB_DIALECT=postgres
```

- `ALLOWED_PROJECT` rota permitida a consumir api.
- `DB_USERNAME` owner do banco de dados.
- `DB_PASSWORD` senha do banco de dados.
- `DB_DATAB` nome do banco de dados.
- `DB_HOST` host do banco de dados.
- `DB_DIALECT` dialeto sql.


### 3. Rodar comandos do projeto

Para criar o banco de dados e todas as tabelas necessárias, execute o seguinte comando:

```bash
npm run sequelize
```
> **Obs:** não tente criar o banco de dados ou as tabelas antes de rodar o **Sequelize**. Só altere ou crie tabelas após rodar o **Sequelize**.

Projeto configurado. Rode para executar o projeto:

```bash
npm run dev
```
