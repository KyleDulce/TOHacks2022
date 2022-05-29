FROM node:16

# Create app directory
WORKDIR /app

COPY ./Server .

RUN npm install
# If you are building your code for production
RUN npm ci --only=production
RUN npm install typescript -g
RUN npm install --save @types/express

EXPOSE 80
CMD ["npx", "ts-node", "./src/app.ts" ]