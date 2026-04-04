# Coding Conventions: Spring Boot (Kotlin)

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
