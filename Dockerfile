FROM node:20-alpine AS build

WORKDIR /

COPY package*.json ./ 

RUN npm install 

COPY . .

RUN npm run build


# ----------------------------------------------------------------------
FROM node:20-alpine

WORKDIR /

COPY --from=build /package*.json ./
COPY --from=build /dist ./dist 
COPY --from=build /src ./src 

RUN npm install 

EXPOSE 3000

CMD ["node", "dist/main.js"]