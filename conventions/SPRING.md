# Spring Boot (Kotlin)

## Folder Structure
Modular monolith using Gradle multi-project builds. 
Each module maintains its own `src/main/kotlin/` directory. The module directories are as follows:

| Directory | Purpose |
| :--- | :--- |
| `app/` | Application entry point, system configuration, and security setups |
| `build-logic/` | Shared build conventions and custom build scripts |
| `core/domain/` | Shared pure business entities and interfaces without framework dependencies |
| `core/repository/` | Shared data access implementations and database migrations |
| `core/service/` | Shared application logic orchestrating domain and repository |
| `feature/<name>/` | Self-contained feature modules |

**Rules**:
- **Dependency Direction**: `core:domain` ← `core:repository` ← `core:service` ← `feature` ← `app`. Each module may only depend on modules below it. Enforced by ArchUnit.
- **Isolation**: cross-feature imports are prohibited. Enforced by ArchUnit.

## Language and Framework Standards
- **Kotlin**: Strict null-safety (`-Xjsr305=strict`). Prefer idiomatic Kotlin (data classes, extension functions, null-safe operators). Null-safety enforced by the compiler.
- **Patterns**: Constructor injection only; avoid field injection.

## Styling and Formatting
- **Style Guide**: Google Style via ktfmt.
- **Naming Conventions**: `camelCase` for functions and variables. `SCREAMING_SNAKE_CASE` for constants.
- **File Names**: all Kotlin source files must use `PascalCase`. Enforced by ArchUnit.
- **File Limits**: No file may exceed 300 lines. Enforced by ArchUnit.
- **Enforcement**: The Gradle tasks `test` (for ArchUnit) and `check` (for ktfmt) must all pass.
