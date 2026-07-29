package no.chirico.template

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

/** Main application class for the template backend. */
@SpringBootApplication class TemplateApplication

/**
 * Entry point for the template backend application.
 *
 * @param args command line arguments passed to the application
 */
fun main(args: Array<String>) {
  runApplication<TemplateApplication>(*args)
}
