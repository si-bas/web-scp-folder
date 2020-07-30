FROM node:14-stretch-slim

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./

RUN npm i -g pm2

USER node
RUN npm i --quiet --no-package-lock

EXPOSE 8080

CMD ["pm2", "start", "ecosystem.config.js"]