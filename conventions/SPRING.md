# Coding Conventions: Spring Boot (Kotlin)

## Folder Structure
Modular monolith. Source is organised under `src/main/kotlin/<base-package>/` as follows:

| Directory | Purpose |
| :--- | :--- |
| `core/domain/` | Shared pure business entities and interfaces; no framework dependencies |
| `core/repository/` | Shared data access implementations (JPA, JDBC, etc.) |
| `core/service/` | Shared application logic; orchestrates domain and repository |
| `feature/<name>/` | Entry points: controllers, request/response DTOs, and mappers |

**Rules**:
- **Dependency direction**: `domain` ← `repository` ← `service` ← `feature`. Each layer may only depend on layers below it. Enforced by ArchUnit against `src/main/`.
- **Isolation**: cross-feature imports are prohibited. Enforced by ArchUnit.

## Language Standards
Kotlin with strict null-safety (`-Xjsr305=strict`). Prefer idiomatic Kotlin (data classes, extension functions, null-safe operators). Null-safety enforced by the compiler.

## Naming Conventions
- **Code**: `camelCase` for functions and variables. `SCREAMING_SNAKE_CASE` for constants.
- **Files**: all Kotlin source files must use `PascalCase`. Enforced by ArchUnit.

## Framework Patterns
Constructor injection only; avoid field injection.

## Styling & Formatting
- Google Style via ktfmt. Enforced via Gradle plugin (`check` task).
- No file may exceed 300 lines. Enforced by ArchUnit.
