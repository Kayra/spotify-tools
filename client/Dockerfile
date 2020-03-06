FROM node:16-alpine as build

RUN apk update
RUN apk upgrade --available

RUN mkdir /client
COPY . /client
WORKDIR /client

ENV PATH /client/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm install && npm update
RUN npm run build

FROM nginx:1.16.0-alpine
COPY --from=build /client/build /usr/share/nginx/html

ENV NODE_ENV PRODUCTION
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
