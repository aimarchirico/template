plugins {
  alias(libs.plugins.commons.kotlin)
  alias(libs.plugins.commons.spring)
  alias(libs.plugins.commons.postgresql)
  alias(libs.plugins.commons.web)
  alias(libs.plugins.commons.architecture)
}

version = "0.0.1-SNAPSHOT"

dependencies {
  implementation(platform(libs.spring.boot.dependencies))
  implementation("tools.jackson.module:jackson-module-kotlin")
  implementation("org.jetbrains.kotlin:kotlin-reflect")

  implementation(libs.commons.security)

  testImplementation(libs.commons.test)
}
