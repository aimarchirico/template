package no.chirico.template

import com.tngtech.archunit.junit.AnalyzeClasses
import com.tngtech.archunit.junit.ArchTest
import com.tngtech.archunit.lang.ArchRule
import com.tngtech.archunit.lang.syntax.ArchRuleDefinition.classes
import com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses
import com.tngtech.archunit.library.dependencies.SlicesRuleDefinition.slices

@AnalyzeClasses(packages = ["no.chirico.template"])
class DependencyArchitectureTest {

    @ArchTest
    val coreShouldNotDependOnFeatures: ArchRule =
        noClasses().that().resideInAPackage("..core..")
            .should().dependOnClassesThat().resideInAPackage("..feature..")

    @ArchTest
    val coreShouldNotDependOnApp: ArchRule =
        noClasses().that().resideInAPackage("..core..")
            .should().dependOnClassesThat().resideInAPackage("..app..")

    @ArchTest
    val featureShouldNotDependOnApp: ArchRule =
        noClasses().that().resideInAPackage("..feature..")
            .should().dependOnClassesThat().resideInAPackage("..app..")

    @ArchTest
    val featuresShouldNotDependOnEachOther: ArchRule =
        slices().matching("..feature.(*)..").should().notDependOnEachOther()

    @ArchTest
    val controllerDependencies: ArchRule =
        classes().that().resideInAPackage("..controller..")
            .should().onlyDependOnClassesThat().resideOutsideOfPackages("..controller..")
            // A controller can depend on service, repository, model, etc.
            // but service/repository shouldn't depend on controller.
            
    @ArchTest
    val serviceShouldNotDependOnController: ArchRule =
        noClasses().that().resideInAPackage("..service..")
            .should().dependOnClassesThat().resideInAPackage("..controller..")

    @ArchTest
    val repositoryShouldNotDependOnControllerOrService: ArchRule =
        noClasses().that().resideInAPackage("..repository..")
            .should().dependOnClassesThat().resideInAnyPackage("..controller..", "..service..")

    @ArchTest
    val modelShouldNotDependOnOthers: ArchRule =
        noClasses().that().resideInAPackage("..model..")
            .should().dependOnClassesThat().resideInAnyPackage("..controller..", "..service..", "..repository..")
}
