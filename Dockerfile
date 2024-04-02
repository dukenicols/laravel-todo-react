FROM php:8.1-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Add a non-root user
ARG USER_ID=1000
ARG GROUP_ID=1000
RUN groupadd -g $GROUP_ID www
RUN useradd -u $USER_ID -ms /bin/bash -g www www

# Copy existing application directory contents
COPY --chown=www:www . /var/www

# Change ownership of the storage and bootstrap/cache
RUN chown -R www:www /var/www/storage /var/www/bootstrap/cache

# Switch to non-root user
USER www
