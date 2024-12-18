# Используем образ PHP
FROM php:8.1-cli

# Устанавливаем зависимости
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd \
    && docker-php-ext-install pdo pdo_mysql

# Копируем файлы проекта в контейнер
COPY . /var/www/html/

# Устанавливаем рабочую директорию
WORKDIR /var/www/html

# Открываем порты, которые будут слушать приложение
EXPOSE 5000

# Команда для старта PHP сервера
CMD php -S 0.0.0.0:5000 -t public
