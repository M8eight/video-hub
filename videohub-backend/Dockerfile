FROM maven:3.8.6-eclipse-temurin-17 as build
WORKDIR /app
COPY pom.xml /app
RUN mvn dependency:resolve
COPY . /app
RUN mvn clean
RUN mvn package -DskipTests

FROM sapmachine:17
COPY --from=build /app/target/videohub-0.0.1-SNAPSHOT.jar /app/app.jar
COPY docker-compose.yml /app/docker-compose.yml

RUN apt-get -y update && apt-get -y upgrade && apt-get install -y ffmpeg
# RUN apt update && apt upgrade -y && apt install ffmpeg -y

ENTRYPOINT java -jar /app/app.jar