FROM node:6.11.3

RUN mkdir -p /usr/sharks
VOLUME /usr/sharks
WORKDIR /usr/sharks

ENV NODE_ENV=development
EXPOSE 3000

CMD ["npm", "run", "mon"]
