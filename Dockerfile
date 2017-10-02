FROM node:8.6

RUN mkdir -p /usr/sharks
VOLUME /usr/sharks
WORKDIR /usr/sharks

ENV NODE_ENV=development
EXPOSE 3030

CMD ["npm", "run", "watch-windows"]
