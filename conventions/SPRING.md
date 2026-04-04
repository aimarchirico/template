# Coding Conventions: Spring Boot (Kotlin)

## Folder Structure
Modular monolith. Source is organised under `src/main/kotlin/<base-package>/` as follows:

| Directory | Purpose |
| :--- | :--- |
| `domain/` | Pure business entities and interfaces; no framework dependencies |
| `repository/` | Data access implementations (JPA, JDBC, etc.) |
| `service/` | Application logic; orchestrates domain and repository |
| `feature/` | Entry points: controllers, request/response DTOs, and mappers |

**Rules**: Dependency direction is `domain` ← `repository` ← `service` ← `feature`. Each layer may only depend on layers below it. Cross-feature imports are prohibited.

## Language Standards
Kotlin with strict null-safety (`-Xjsr305=strict`). Prefer idiomatic Kotlin (data classes, extension functions, null-safe operators).

## Framework Patterns
Constructor injection only; avoid field injection.

## Naming
`camelCase` for functions and variables. `SCREAMING_SNAKE_CASE` for constants.

## Styling
Google Style via ktfmt.

## Linting/Formatting
ktfmt formatting check must pass as part of the build (`check` task). Architecture tests must pass.

## Architecture Tests
ArchUnit tests verify the following at build time (against `src/main/` only):

- **Dependency direction**: `domain` <- `repository` <- `service` <- `feature`; each layer may only depend on layers below it; cross-feature imports are prohibited.
- **File naming**: all Kotlin source files must use `PascalCase`.
- **File size**: no file may exceed 300 lines.
