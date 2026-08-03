package no.chirico.template

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test

class TemplateApplicationTest {

  @Test
  fun `application class can be instantiated`() {
    val app = TemplateApplication()
    assertThat(app).isNotNull()
  }
}
