FROM node:alpine as front

WORKDIR /app/src
COPY university-system-fsd .
RUN npm install vite
RUN npm i

CMD ["npm", "run", "dev"]
