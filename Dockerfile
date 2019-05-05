FROM node:10.15.1

# Create app directory
WORKDIR /rota-web

COPY ./package.json .

RUN yarn install --production
# RUN npm install

COPY ./dist/ ./dist/
COPY ./.env .
COPY ./next.config.js .

ENV NODE_ENV production

EXPOSE 3000

CMD [ "node", "dist/production-server/index.js" ]