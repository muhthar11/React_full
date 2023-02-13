FROM node:alpine

WORKDIR /usr/src/react

COPY . .

WORKDIR /usr/src/react/clint

RUN npm install 

WORKDIR /usr/src/react/server

RUN npm install




