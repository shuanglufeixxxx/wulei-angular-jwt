FROM node:15.11.0-alpine3.10 AS dev
WORKDIR /wulei-angular

COPY . .

EXPOSE 4200

CMD ["npm", "start"]