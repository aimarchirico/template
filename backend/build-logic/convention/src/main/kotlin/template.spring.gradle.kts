plugins {
    id("io.spring.dependency-management")
}

dependencyManagement {
    imports {
        mavenBom("org.springframework.boot:spring-boot-dependencies:4.1.0")
    }
}

dependencies {
    "implementation"("tools.jackson.module:jackson-module-kotlin")
    "implementation"("org.jetbrains.kotlin:kotlin-reflect")
}
