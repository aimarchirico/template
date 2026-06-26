plugins {
  alias(libs.plugins.template.kotlin)
  alias(libs.plugins.spring.boot)
}

group = "no.chirico.template"

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
  implementation(libs.core.security)

  runtimeOnly("org.postgresql:postgresql")
  implementation("org.flywaydb:flyway-core")
  implementation("org.flywaydb:flyway-database-postgresql")

  testImplementation("org.springframework.boot:spring-boot-starter-test")
  testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
  testRuntimeOnly("org.junit.platform:junit-platform-launcher")
  testImplementation(libs.archunit)
  testImplementation(libs.core.testing)
}

tasks.withType<org.springframework.boot.gradle.tasks.run.BootRun>().configureEach {
  val envFile = project.file("../.env")
  if (envFile.exists()) {
    envFile.readLines().forEach { line ->
      val trimmed = line.trim()
      if (trimmed.isNotEmpty() && !trimmed.startsWith("#") && trimmed.contains("=")) {
        val parts = trimmed.split("=", limit = 2)
        val key = parts[0].trim()
        var value = parts[1].trim()
        if (
          (value.startsWith("\"") && value.endsWith("\"")) ||
            (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.substring(1, value.length - 1)
        }
        environment(key, value)
      }
    }
  }
}
