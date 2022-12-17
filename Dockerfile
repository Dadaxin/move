FROM node:latest

RUN mkdir -p /code

COPY . /code

WORKDIR /code

RUN npm install

ENV PORT 3000

EXPOSE 3000

CMD ["node", "app.js"]