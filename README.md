# 🚀 Node.js + PostgreSQL + pgAdmin com Docker

Este projeto é uma base sólida para aplicações **Node.js** integradas com **PostgreSQL** e **pgAdmin**, totalmente configuradas via **Docker**.  
Ideal para começar um backend moderno e escalável com facilidade.

---

## 🧱 Tecnologias

- **Node.js 20+**
- **Express.js**
- **PostgreSQL 16**
- **pgAdmin 4**
- **Docker & Docker Compose**
- **dotenv**

---

## 📂 Estrutura do Projeto

meu-projeto/

├── docker-compose.yml

├── Dockerfile

├── .env

├── package.json

└── src/

└── index.js

yaml
Copy code

---

## ⚙️ Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Banco de dados
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=meu_banco
POSTGRES_PORT=5432

# pgAdmin
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin
PGADMIN_PORT=5050

```
## 🐳 Subindo os containers
1️⃣ Build e inicialização
Execute o comando abaixo para construir e subir os containers:

bash
Copy code
docker compose up -d --build
2️⃣ Verificando se tudo está rodando
bash
Copy code
docker ps
Você deverá ver três containers:

node_app → Aplicação Node.js

postgres_db → Banco de dados PostgreSQL

pgadmin → Interface gráfica do banco

## 🌐 Acessos
Serviço	URL	Usuário / Senha

API Node.js	http://localhost:3000	—

pgAdmin	http://localhost:5050	admin@admin.com / admin

## 🧭 Configurando o pgAdmin
Acesse http://localhost:5050

Faça login com:

```

Email: admin@admin.com

Senha: admin

Clique em "Add New Server"

Preencha:

Name: PostgreSQL Local

Host name/address: db

Username: postgres

Password: postgres

```

## 🧰 Scripts disponíveis
bash
Copy code
npm run dev   # Inicia o servidor em modo desenvolvimento
🧪 Testando a API
Após subir o projeto, acesse:

nginx
Copy code
GET http://localhost:3000/
Você deverá ver um JSON semelhante a:

json
Copy code
{ "time": "2025-11-03T22:10:00.000Z" }

## 🧹 Comandos úteis do Docker
bash
Copy code
docker compose logs -f app   # Ver logs da aplicação
docker compose down          # Parar e remover containers
docker compose restart app   # Reiniciar a aplicação
