FROM node:latest

WORKDIR /src

COPY ./src/package*.json .

RUN npm install
RUN npm install -g nodemon

COPY ./src .

EXPOSE 9090

CMD [ "npm", "start"]