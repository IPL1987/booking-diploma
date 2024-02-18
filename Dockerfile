FROM node:latest-alpine
WORKDIR /
COPY ./package*.json ./
RUN npm install
COPY . ./
CMD ["npm", "run", "start"]