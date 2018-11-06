FROM node:alpine
WORKDIR /usr/src/page-time

COPY package*.json ./
RUN npm i

COPY . .

EXPOSE 5000

RUN npm run migrate

CMD [ "npm", "start" ]
