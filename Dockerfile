FROM node:carbon

WORKDIR /usr/src/videoService

COPY . .

RUN npm install

EXPOSE 8080

CMD [ "npm", "start" ]