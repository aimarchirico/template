plugins {
  alias(libs.plugins.commons.kotlin)
  alias(libs.plugins.commons.spring)
  alias(libs.plugins.commons.architecture)
}

version = "0.0.1-SNAPSHOT"

dependencies {
  implementation(platform(libs.spring.boot.dependencies))
  implementation("tools.jackson.module:jackson-module-kotlin")
  implementation("org.jetbrains.kotlin:kotlin-reflect")

  implementation("org.springframework.boot:spring-boot-starter-actuator")
  implementation("org.springframework.boot:spring-boot-starter-data-jpa")
  implementation("org.springframework.boot:spring-boot-starter-validation")
  implementation("org.springframework.boot:spring-boot-starter-web")
  implementation(libs.springdoc.openapi)
  implementation(libs.hypersistence.utils)
  implementation(libs.commons.security)

  runtimeOnly("org.postgresql:postgresql")
  implementation("org.springframework.boot:spring-boot-flyway")
  implementation("org.flywaydb:flyway-core")
  implementation("org.flywaydb:flyway-database-postgresql")

  testImplementation("org.springframework.boot:spring-boot-starter-test")
  testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
  testRuntimeOnly("org.junit.platform:junit-platform-launcher")
  testImplementation(libs.archunit)
  testImplementation(libs.commons.test)
}
