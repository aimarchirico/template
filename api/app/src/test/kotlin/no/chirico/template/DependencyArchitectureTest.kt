package no.chirico.template

import com.tngtech.archunit.core.importer.ClassFileImporter
import com.tngtech.archunit.library.Architectures.layeredArchitecture
import no.chirico.core.test.BaseArchitectureTest
import org.junit.jupiter.api.Test

class DependencyArchitectureTest : BaseArchitectureTest("no.chirico.template") {

    @Test
    fun `layered architecture inside features should be respected`() {
        val rule = layeredArchitecture()
            .consideringOnlyDependenciesInLayers()
            .layer("Controller").definedBy("..*Controller")
            .layer("Service").definedBy("..*Service")
            .layer("Repository").definedBy("..*Repository")
            // The model is typically the classes without those suffixes, 
            // but for a simpler test we can just enforce the suffixes we know.

            .whereLayer("Controller").mayNotBeAccessedByAnyLayer()
            .whereLayer("Service").mayOnlyBeAccessedByLayers("Controller")
            .whereLayer("Repository").mayOnlyBeAccessedByLayers("Controller", "Service")
            
        rule.check(allClasses)
    }
}
