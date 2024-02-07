FROM openjdk:17-alpine

WORKDIR /app

COPY backend/pms/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","/app/app.jar"]