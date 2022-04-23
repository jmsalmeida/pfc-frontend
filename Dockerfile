FROM node:16

RUN mkdir /frontend
WORKDIR /frontend
COPY package*.json /frontend
COPY . /frontend

RUN npm install && npm install -g expo-cli

CMD [ "npm", "start" ]