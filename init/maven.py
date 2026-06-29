import glob
from text import pascal, lower, path
from fs import replace_text, move_files, delete_files, remove_dependabot_ecosystem

def setup_maven(default_mod, config_mod):
    def_name = default_mod["name"]
    cfg_name = config_mod["name"]
    def_pkg = default_mod["package"]
    cfg_pkg = config_mod["package"]
    def_img = default_mod["image"]
    cfg_img = config_mod["image"]

    def_pkg_path = path(def_pkg)
    cfg_pkg_path = path(cfg_pkg)
    def_pascal = pascal(def_name)
    cfg_pascal = pascal(cfg_name)
    def_lower = lower(def_name)
    cfg_lower = lower(cfg_name)

    # Replace package
    pkg_files = [
        "maven/app/build.gradle.kts",
        f"maven/app/src/test/kotlin/{def_pkg_path}/ArchitectureTest.kt",
        f"maven/app/src/main/kotlin/{def_pkg_path}/{def_pascal}Application.kt"
    ]
    for f in pkg_files:
        replace_text(f, def_pkg, cfg_pkg)

    # Replace image and name
    replace_text("maven/compose.prod.yml", def_img, cfg_img)
    replace_text("maven/app/src/main/resources/application.yml", def_name, cfg_name)

    # Replace pascal case name
    app_file = f"maven/app/src/main/kotlin/{def_pkg_path}/{def_pascal}Application.kt"
    replace_text(app_file, f"{def_pascal}Application", f"{cfg_pascal}Application")

    # Replace lower case name
    lower_files = [
        ".github/workflows/maven-deploy.yml",
        "maven/app/src/main/resources/application.yml",
        "maven/compose.yml",
        "maven/compose.prod.yml",
        "maven/settings.gradle.kts",
        "maven/gradle/libs.versions.toml",
        "maven/app/build.gradle.kts"
    ]
    for f in lower_files:
        replace_text(f, def_lower, cfg_lower)

    # Move main package
    move_files(
        f"maven/app/src/main/kotlin/{def_pkg_path}",
        f"maven/app/src/main/kotlin/{cfg_pkg_path}"
    )

    # Move test package
    move_files(
        f"maven/app/src/test/kotlin/{def_pkg_path}",
        f"maven/app/src/test/kotlin/{cfg_pkg_path}"
    )

    # Note: build-logic convention plugin is now in Core, no local file to rename.

    # move Application file
    move_files(
        f"maven/app/src/main/kotlin/{cfg_pkg_path}/{def_pascal}Application.kt",
        f"maven/app/src/main/kotlin/{cfg_pkg_path}/{cfg_pascal}Application.kt"
    )

def delete_maven():
    delete_files("maven")
    # Delete GitHub workflows
    for f in glob.glob(".github/workflows/maven-*.yml"):
        delete_files(f)
    remove_dependabot_ecosystem("/maven")
