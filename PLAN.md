# Project Documentation Plan

This plan serves as a blueprint for comprehensive project documentation. It defines the required structure, content, and standards for each documentation file to ensure consistency and maintainability.

## Guiding principle

Documentation is split by audience:
- **`docs/`** — system-level: how components connect, what infrastructure they run on, external dependencies. Nothing implementation-specific.
- **Sub-directory READMEs** — implementation-level: everything a developer needs to work on that part (tech stack, architectural pattern, coding conventions, env vars, setup, deployment).

## 1. README.md
The primary entry point and high-level overview of the project.

*   **1.1. Introduction**: Clear, concise statement of the project's purpose. What problem does it solve? Who is the target audience?
*   **1.2. Demo**: Visual evidence of the project in action. Placeholders for screenshots, GIFs, or links to live staging/production environments.
*   **1.3. Features**: High-level bullet points of the core functionality and value propositions.
*   **1.4. Getting Started**: Link to sub-directory READMEs for detailed technical setup.
*   **1.5. Documentation**: A directory map for the extended documentation located in the `docs/` folder.
*   **1.6. Workflow**: Link to contribution guidelines in `CONTRIBUTING.md`.

## 2. CONTRIBUTING.md
> Already exists in the repository. Do not generate, use as-is.

The governing rules for project collaboration.

*   **Issues**: Description of the issue hierarchy and template usage.
*   **Branching**: Git flow and development rules.
*   **Commits**: Specification for commit messages.
*   **Pull Requests**: Requirements for pull requests.

## 3. conventions/
> Already exists in the repository. Do not generate, used as inputs during documentation generation only. Each file covers folder structure (directory layout and module/layer boundary rules) and coding conventions (language standards, styling, and what is automatically enforced at build/lint time). The appropriate file is used to populate the folder structure and coding conventions sections of the relevant sub-directory README.

## 4. docs/ARCHITECTURE.md
System-level source of truth. Contains only what spans the whole system — nothing implementation-specific.

*   **4.1. High-Level Data Flow**: Mermaid diagram showing communication between frontend, backend, database, and external services.
*   **4.2. Infrastructure Overview**: Table of layers, technologies, and hosting locations (cloud providers, VPS, CDN, container registry).
*   **4.3. Project Structure**: Top-level directory tree explaining the purpose of each folder.

## 5. docs/DESIGN.md
Standards for UI, UX, and visual identity.

*   **5.1. Design System**: Definitions for the color palette, typography, spacing scales, and component library usage.
*   **5.2. User Flows**: Logical maps or descriptions of the most critical user journeys through the application.
*   **5.3. Assets**: Markdown illustrations, screenshots, or other visual assets used in the design system.

## 6. docs/API.md
Technical reference for internal and external interfaces.

*   **6.1. Authentication**: Detailed security protocol (e.g., OAuth2, JWT, API Keys). Instructions for obtaining and rotating credentials.
*   **6.2. Endpoints**: Summary of API resources. Link to interactive documentation (e.g., Swagger/Postman) if applicable.
*   **6.3. Data Models**: Schema definitions or descriptions of core domain entities and their relationships.

## 7. frontend/README.md
Technical documentation specific to the frontend application. All implementation-level detail lives here.

*   **7.1. Tech Stack**: Versioned list of all major languages, frameworks, and libraries used in the frontend.
*   **7.2. Folder Structure**: Populated from `conventions/` if applicable — directory layout and module boundary rules.
*   **7.3. Coding Conventions**: Populated from `conventions/` if applicable — language standards, styling, and enforcement rules.
*   **7.4. Environment Variables**: List of required keys and `.env.example` reference.
*   **7.5. Local Development**: Step-by-step installation, build, and execution commands.
*   **7.6. Deployment**: Build pipeline, environment-specific configurations, and hosting details.

## 8. backend/README.md
Technical documentation specific to the backend application. All implementation-level detail lives here.

*   **8.1. Tech Stack**: Versioned list of all major languages, frameworks, and libraries used in the backend.
*   **8.2. Folder Structure**: Populated from `conventions/` if applicable — directory layout and layer dependency rules.
*   **8.3. Coding Conventions**: Populated from `conventions/` if applicable — language standards, styling, and enforcement rules.
*   **8.4. Environment Variables**: List of required keys and `.env.example` reference.
*   **8.5. Local Development**: Runtime/SDK requirements, external dependency setup (e.g., Docker), and startup commands.
*   **8.6. Deployment**: Containerisation (Dockerfile), CI/CD triggers, workflows, and orchestration details.
