#build time
FROM node:15
WORKDIR /app
COPY package.json . 
RUN yarn 
COPY . ./
ENV PORT 3000
#runtime
EXPOSE $PORT
CMD ["yarn", "run", "dev"]