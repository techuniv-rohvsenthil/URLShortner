FROM node

WORKDIR /app

COPY . .

EXPOSE 8080

RUN npm install

#CMD ["node", "index.js"]

ENTRYPOINT [ "/bin/bash", "./entrypoint.sh" ]