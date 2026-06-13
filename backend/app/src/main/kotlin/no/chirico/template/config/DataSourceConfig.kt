package no.chirico.template.config

import com.zaxxer.hikari.HikariDataSource
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary

@Configuration
class DataSourceConfig {

  @Bean
  @Primary
  @ConfigurationProperties("spring.datasource.hikari")
  fun dataSource(properties: DataSourceProperties): HikariDataSource {
    return properties.initializeDataSourceBuilder().type(HikariDataSource::class.java).build()
  }
}
