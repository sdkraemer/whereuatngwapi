FROM node:latest

MAINTAINER Scott Kraemer

WORKDIR /var/www

RUN npm install -g pm2
RUN npm install

RUN mkdir -p /var/log/pm2

RUN apt-get update

EXPOSE 3000

ENTRYPOINT ["pm2", "start", "server.js", "--log", "/var/log/pm2/pm2.log", "--watch", "--no-daemon"]

