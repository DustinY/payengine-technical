FROM node:alpine

ENV NODE_ENV=$nodenv
ENV PG_CONNECTION_STRING=$pgconnstr
WORKDIR /app
RUN mkdir -p /app/server
RUN mkdir -p /app/client
# RUN mkdir -p /app/server/public
# COPY ./server/package.json ./server/
# COPY ./server/package-lock.json ./server/
# COPY ./server/server.js ./server
# COPY ./server/migrations ./server/migrations/
# COPY ./client/package.json /app/client/
# COPY ./client/package-lock.json /app/client/
# COPY ./client/public /app/client/public/
# COPY ./client/src /app/client/src

COPY ./server/* /app/server/
COPY ./server/migrations ./server/migrations/
COPY ./server/seeds ./server/seeds/
COPY ./client/* /app/client/
COPY ./client/public /app/client/public/
COPY ./client/src /app/client/src

WORKDIR /app/client
RUN npm install
RUN npm run build
RUN mv /app/client/build /app/server/public

WORKDIR /app/server
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "deploy"]