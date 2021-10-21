FROM node

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY . .

ENV PORT 8081
EXPOSE $PORT

CMD [ "yarn", "run", "start" ]