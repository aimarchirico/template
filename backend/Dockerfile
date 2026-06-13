# Build stage
FROM eclipse-temurin:21-jdk AS builder
WORKDIR /app
COPY . .
RUN chmod +x ./gradlew
RUN ./gradlew bootJar --no-daemon

# Runtime stage
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /app/app/build/libs/app-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
