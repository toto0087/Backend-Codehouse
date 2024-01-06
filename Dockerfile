FROM node:lts-alpine
ENV NODE_ENV=production
ENV ADMIN_EMAIL=adminCoder@coder.com
ENV ADMIN_PASSWORD=adminCod3r123
ENV ADMIN_FIRST_NAME="Administrador coder"
ENV ADMIN_CART=653bb65e8619f8ed2c4864aa
ENV GITHUB_CLIENT_ID=Iv1.475526a610ca29d2
ENV GITHUB_CLIENT_SECRET=484e7ec8546c17dd41a9b8b9e5d5dc6369d598b5
ENV GITHUB_CALLBACK_URL=http://localhost:3000/api/sessions/github
ENV GOOGLE_CLIENT_ID=1034671111148-18q35h4mq5h9mvihls3dur35bcp2ract.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET=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
ENV GOOGLE_CALLBACK_URL=http://localhost:3000/api/sessions/google
ENV GMAIL_USER=tobisape5@gmail.com
ENV GMAIL_PASSWORD=cayeoefidnihpvga
ENV ENVIROMENT=development
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "test"]
