FROM nginx:alpine

# Копіюємо React білд
COPY build/ /usr/share/nginx/html

# Копіюємо custom nginx конфіг
COPY ../nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
