# TODO App Laravel + React

Simple Laravel App + Docker

To run make sure docker and docker compose are installed

Run to bootstrap:
`docker compose up -d`

To configure the project, access the app container:
`docker compose exec app bash`

Inside the container, navigate to your Laravel project directory and run Composer to install dependencies:
`composer install`

While still inside the app container, migrate the database:
`php artisan migrate`

Generate a Laravel Application Key:
`php artisan key:generate`

Run UI
`npm install`
`npm run dev`
