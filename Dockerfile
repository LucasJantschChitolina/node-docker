#build time
FROM node:15
WORKDIR /app
COPY package.json . 
RUN yarn 

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then yarn; \
        else yarn --only=production; \
        fi

COPY . ./
ENV PORT 3000
#runtime
EXPOSE $PORT
CMD ["node", "index.js"]