FROM node:12.0.0
COPY . /node/app
WORKDIR /node/app
RUN npm install
RUN npm run build
