package no.chirico.template

import org.junit.jupiter.api.Test
import org.testcontainers.containers.PostgreSQLContainer
import org.testcontainers.junit.jupiter.Container
import org.testcontainers.junit.jupiter.Testcontainers
import org.testcontainers.utility.DockerImageName

@Testcontainers
class TemplateApplicationMainTest {

  companion object {
    @Container
    @JvmStatic
    val postgres =
      PostgreSQLContainer(DockerImageName.parse("postgres:18")).withDatabaseName("template")
  }

  @Test
  fun `main starts the application context`() {
    main(
      arrayOf(
        "--server.port=0",
        "--spring.datasource.url=${postgres.jdbcUrl}",
        "--spring.datasource.username=${postgres.username}",
        "--spring.datasource.password=${postgres.password}",
      )
    )
  }
}
