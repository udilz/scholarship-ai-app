FROM node:lts

WORKDIR /app

COPY . .

RUN npm install -g pnpm@latest 
RUN npm install -g bun
RUN pnpm install

EXPOSE 8000

CMD [ "bun", "dev" ]