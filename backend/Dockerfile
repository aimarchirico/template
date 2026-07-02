# syntax=docker/dockerfile:1

# Build stage
FROM eclipse-temurin:25-jdk AS builder
WORKDIR /app
COPY . .
RUN chmod +x ./gradlew
ARG GITHUB_ACTOR
RUN --mount=type=secret,id=github_token \
    GITHUB_ACTOR="$GITHUB_ACTOR" \
    GITHUB_TOKEN="$(cat /run/secrets/github_token)" \
    ./gradlew bootJar --no-daemon

# Runtime stage
FROM eclipse-temurin:25-jre
WORKDIR /app
COPY --from=builder /app/app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
