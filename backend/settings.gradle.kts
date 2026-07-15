pluginManagement {
    repositories {
        mavenLocal()
        mavenCentral()
        gradlePluginPortal()
        maven {
            url = uri("https://maven.pkg.github.com/aimarchirico/commons")
            credentials {
                username = System.getenv("MAVEN_USERNAME") ?: providers.gradleProperty("gpr.user").orNull
                password = System.getenv("MAVEN_PASSWORD") ?: providers.gradleProperty("gpr.key").orNull
            }
        }
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        mavenLocal()
        mavenCentral()
        maven {
            url = uri("https://maven.pkg.github.com/aimarchirico/commons")
            credentials {
                username = System.getenv("MAVEN_USERNAME") ?: providers.gradleProperty("gpr.user").orNull
                password = System.getenv("MAVEN_PASSWORD") ?: providers.gradleProperty("gpr.key").orNull
            }
        }
    }
}

rootProject.name = "template"

include(":app")
