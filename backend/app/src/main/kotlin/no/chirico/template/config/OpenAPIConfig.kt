package no.chirico.template.config

import io.swagger.v3.oas.models.Components
import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.info.Info
import io.swagger.v3.oas.models.security.SecurityRequirement
import io.swagger.v3.oas.models.security.SecurityScheme
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class OpenAPIConfig {

  @Bean
  fun customOpenAPI(@Value("\${info.version}") version: String): OpenAPI {
    val bearerScheme =
      SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")

    val components = Components().addSecuritySchemes("bearerAuth", bearerScheme)

    return OpenAPI()
      .info(Info().title("API").version(version))
      .components(components)
      .addSecurityItem(SecurityRequirement().addList("bearerAuth"))
  }
}
