FROM node:alpine
WORKDIR /usr/src/page-time

COPY package*.json ./
RUN npm i

COPY index.js ./
COPY tracking.js ./
COPY index.html ./

EXPOSE 5000

CMD [ "npm", "start" ]
