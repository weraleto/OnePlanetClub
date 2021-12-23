FROM node:lts AS deps
WORKDIR /app
COPY ./package.json /app/
RUN npm i

from deps AS build
COPY . /app
ENV PATH "$PATH:/app/node_modules/.bin"
RUN gulp build

#Build nginx 
FROM nginx:alpine as main-site
COPY --from=build /app/build  /usr/share/nginx/html
