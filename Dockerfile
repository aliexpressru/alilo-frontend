# этап сборки (build stage)
FROM node:20-alpine AS build-stage

ARG DEPLOY_ENV=production
ENV REACT_APP_DEPLOY_ENV=${DEPLOY_ENV}

WORKDIR /
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# этап production (production-stage)
FROM openresty/openresty:1.21.4.1-0-alpine AS production-stage

WORKDIR /
RUN env
COPY --from=build-stage /build /usr/share/nginx/html
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/host.nginx.conf

EXPOSE 80 84
CMD ["nginx", "-g", "daemon off;"]
