# Videohub

Данное приложения это сайт-видеохостинг

![Videohub](https://images.emojiterra.com/google/noto-emoji/animated-emoji/1f976.gif)

## Запуск

Самый простой через `docker compose up`
Есть варриант по отдельности каждый контейнер или через npm и mvn

## Структура приложения

![структура](https://i.postimg.cc/c4dgQLsr/b-LJTRX9-H4-Bx-Vfv-Zs2j8-Gxxqm9-KZz-IJK8-Qxr-Uu-KY9-91b-IOoc-ILbjl-I2cwet6c-Fe-J7s2xx-GQwo-FOLvho-HCq-VMSr-YHH98b-P6-U-R-QR.png)


React, bootstrap, авторизация jwt (Заголовок Authorization Bearer: ) 2 токена.

Backend Spring, монолит, авторизация на Spring Security (JWT)

Бд: Postgresql, tsvector для поиска.

## Компоненты:

### Frontend ./videohub-frontend
Для запуска фронтенд части нужно перейти в каталог `./videohub-frontend` и использовать стандартные команды `npm i` и `npm start`.
#### `Фронтенд находится на порте 3000`

### Backend ./videohub-backend
Для запуска бекенд части нужно перейти в каталог `./videohub-backend` использовать среду разработки или запустить с помощью
 `./mvnw start`. Вместе с запуском приложения автоматически будет запущен docker-compose который поднимет бд и elasticsearch.
 #### `Бекенд находится на порте 8080`
 
 ***Ендпоинты***
 Для просмотра open api 
 `localhost:8080/swagger-ui/index.html`

***Предустановленные пользователи***
Админ
- Логин: `admin`
- Пароль: `admin`

Пользователь
- Логин: `user`
- Пароль: `user123`

### Цикл создания видео

![видео](https://i.postimg.cc/pTNyy2GV/XLNTJjj-C4-Btt-Kmp-SV4645-Wk-AX22-IXLKBK7q-Eass-QTIGH8v-JLQg-GYFc-X4l-I7tb-Ig-Mbeg7i2-OM2oc-SLv-Xzeqw-Cok-J9-Gqq-KPJOS-Ri.png)


### Схема бд

![схема](https://i.postimg.cc/k5NS4Ffk/comments.png)

