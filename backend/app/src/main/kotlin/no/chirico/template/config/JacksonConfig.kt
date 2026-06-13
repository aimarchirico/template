package no.chirico.template.config

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializationFeature
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.KotlinFeature
import com.fasterxml.jackson.module.kotlin.KotlinModule
import io.hypersistence.utils.hibernate.type.util.ObjectMapperSupplier
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary

@Configuration
class JacksonConfig : ObjectMapperSupplier {

  @Bean
  @Primary
  fun objectMapper(): ObjectMapper {
    return createObjectMapper()
  }

  override fun get(): ObjectMapper {
    return createObjectMapper()
  }

  private fun createObjectMapper(): ObjectMapper {
    return ObjectMapper().apply {
      registerModule(
        KotlinModule.Builder()
          .withReflectionCacheSize(512)
          .configure(KotlinFeature.NullToEmptyCollection, false)
          .configure(KotlinFeature.NullToEmptyMap, false)
          .configure(KotlinFeature.NullIsSameAsDefault, true)
          .configure(KotlinFeature.SingletonSupport, false)
          .build()
      )
      registerModule(JavaTimeModule())

      disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
      disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
      enable(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT)
    }
  }
}
