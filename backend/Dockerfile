# --- Etapa 1: build con Maven ---
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copiar pom y descargar dependencias primero (cache de Docker)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiar el resto y empacar el JAR
COPY src ./src
RUN mvn clean package -DskipTests -B

# --- Etapa 2: runtime liviano con JDK 17 ---
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
