FROM node

WORKDIR /app

COPY . .

EXPOSE 8080

RUN npm install
RUN npm run createdb
RUN npm rn migrate

CMD ["node", "index.js"]