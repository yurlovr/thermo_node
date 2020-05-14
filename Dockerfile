#FROM node:alpine
#ARG NODE_ENV=development
#ENV NODE_ENV=development
#WORKDIR /app

#COPY package*.json ./

#RUN npm install

#COPY ./index.js ./
#COPY ./src ./src

#EXPOSE 3000

#CMD [ "node", "index.js" ]

FROM node:alpine
ARG NODE_ENV=development
ENV NODE_ENV=development

WORKDIR /app

COPY . ./
RUN yarn

# COPY ./build.sh ./
#COPY ./index.js ./
# COPY ./src ./src

EXPOSE 3000

CMD [ "node", "index.js" ]