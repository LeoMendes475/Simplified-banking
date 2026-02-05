# Etapa 1: build (Compilação e ambiente de DEV/CLI)
FROM node:20-alpine AS build

WORKDIR /

# 1. Copia arquivos de dependência (para que o cache funcione melhor)
COPY package*.json ./ 

RUN npm install 
# Este 'npm install' instala TUDO (dependencies e devDependencies, incluindo ts-node, etc.)

# 2. Copia o código-fonte (src, tsconfig, etc.)
COPY . .

# Compila o TypeScript para JS (gera /app/dist)
RUN npm run build


# ----------------------------------------------------------------------
# Etapa 2: execução (Produção - Apenas o necessário para rodar a API)
FROM node:20-alpine

WORKDIR /

# 1. Copia SÓ os arquivos necessários da Etapa 'build'
COPY --from=build /package*.json ./
COPY --from=build /dist ./dist 
# ⬇️ NOVO: Traz a pasta 'src' para o runtime, que é o que você precisa para o 'migration:generate'
COPY --from=build /src ./src 

# 2. Instala apenas dependências de produção (produção)
# Se você precisa do ts-node para rodar o TypeORM CLI, você DEVE remover o '--omit=dev'
# ou instalar as dependências de desenvolvimento nesta etapa.
# Como você quer rodar o CLI, mantenha o 'npm install' completo (sem '--omit=dev')
# ou garanta que as dependências do CLI estejam em 'dependencies'.
RUN npm install 

EXPOSE 3000

CMD ["node", "dist/main.js"]