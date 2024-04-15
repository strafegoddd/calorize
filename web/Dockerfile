FROM node:18-alpine

WORKDIR /web

COPY package.json .

RUN npm i

COPY . .

CMD ["npm", "start"]