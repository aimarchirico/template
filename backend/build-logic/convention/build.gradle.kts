plugins {
    `kotlin-dsl`
}

group = "no.chirico.template.buildlogic"

java {
    sourceCompatibility = JavaVersion.VERSION_21
    targetCompatibility = JavaVersion.VERSION_21
}

dependencies {
    implementation(libs.kotlin.gradlePlugin)
    implementation(libs.kotlin.allopen)
    implementation(libs.kotlin.noarg)
    implementation(libs.spring.boot.gradlePlugin)
    implementation(libs.spring.dependency.management.gradlePlugin)
    implementation(libs.ktfmt.gradlePlugin)
}
