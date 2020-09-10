FROM node:13-alpine as builder

WORKDIR /app
ENV NODE_ENV production

ADD package.json . 
ADD yarn.lock . 
RUN yarn install

ADD . .
RUN yarn build

FROM nginx:1.17-alpine

COPY --from=builder /app/build/ /usr/share/nginx/html/
ADD nginx.conf /etc/nginx/nginx.conf
