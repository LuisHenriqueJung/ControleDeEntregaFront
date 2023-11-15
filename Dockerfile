FROM node
WORKDIR /app
COPY package.json ./
RUN npm install -g @angular/cli@8.3.19
RUN npm install
COPY . .
EXPOSE 4200
CMD npm run start
