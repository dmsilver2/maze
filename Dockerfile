FROM node:14.4 as frontend-build
WORKDIR /fullstack/frontend

COPY package.json package.json package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

FROM nginx:1.19-alpine
COPY --from=frontend-build /fullstack/frontend/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]