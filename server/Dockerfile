FROM node:24-alpine
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
CMD [ "sh", "-c", "npm run db:deploy && npm run start:dev" ]