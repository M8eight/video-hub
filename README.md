![Videohub](https://images.emojiterra.com/google/noto-emoji/animated-emoji/1f976.gif)

# Videohub

Данное приложения это сайт-видеохостинг

## Запуск

На данный момент можно запускать с помощью `docker compose`, а можно запускать отдельно фронт и бек

### Docker compose
Напишите в корневой директории `docker compose` и приложение запуститься

### Frontend ./videohub-frontend
Для запуска фронтенд части нужно перейти в каталог `./videohub-frontend` и использовать стандартные команды `npm i` `npm start`.
#### `Фронтенд находится на порте 3000`

### Backend ./videohub-backend
Для запуска бекенд части нужно перейти в каталог `./videohub-backend` использовать среду разработки или запустить с помощью
 `./mvnw start`. Вместе с запуском приложения автоматически будет запущен docker-compose который поднимет бд и elasticsearch.
 #### `Бекенд находится на порте 8080`
 
 ***Ендпоинты***
 Для просмотра ендпоинтов можно открыть swagger (default: `localhost:8080/swagger-ui.html` )

***Предустановленные пользователи***

Админ
- Логин: `admin`
- Пароль: `admin`

Пользователь
- Логин: `user`
- Пароль: `user123`

## Структура приложения
Frontend написан на React, bootstrap, авторизация работает через jwt (Заголовок Authorization Bearer: ).

Backend написан на Spring, Rest Api, авторизация на Spring Security (JWT), Бд: Postgresql, ElasticSearch.
