import glob
from .text import pascal, lower, path
from .fs import replace_text, move_files

def setup_backend(default_mod, config_mod):
    """Rename the backend's package, image, and app names to the configured values."""
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

    # Replace package declarations
    pkg_files = ["backend/app/build.gradle.kts"]
    for base in ("main", "test"):
        pkg_files.extend(
            glob.glob(
                f"backend/app/src/{base}/kotlin/{def_pkg_path}/**/*.kt", recursive=True
            )
        )
    for f in pkg_files:
        replace_text(f, def_pkg, cfg_pkg)

    # Replace image and name
    replace_text("backend/compose.prod.yaml", def_img, cfg_img)
    replace_text("backend/app/src/main/resources/application.yaml", def_name, cfg_name)

    # Replace pascal case name
    app_file = f"backend/app/src/main/kotlin/{def_pkg_path}/{def_pascal}Application.kt"
    replace_text(app_file, f"{def_pascal}Application", f"{cfg_pascal}Application")

    # Replace lower case name
    lower_files = [
        "backend/app/src/main/resources/application.yaml",
        "backend/compose.yaml",
        "backend/compose.prod.yaml",
        "backend/settings.gradle.kts",
        "backend/app/build.gradle.kts"
    ]
    for f in lower_files:
        replace_text(f, def_lower, cfg_lower)

    # Release please config component
    replace_text("tools/release-please-config.json", "template-api", f"{cfg_lower}-api")

    # Move main package
    move_files(
        f"backend/app/src/main/kotlin/{def_pkg_path}",
        f"backend/app/src/main/kotlin/{cfg_pkg_path}"
    )

    # Move test package
    move_files(
        f"backend/app/src/test/kotlin/{def_pkg_path}",
        f"backend/app/src/test/kotlin/{cfg_pkg_path}"
    )

    # move Application file
    move_files(
        f"backend/app/src/main/kotlin/{cfg_pkg_path}/{def_pascal}Application.kt",
        f"backend/app/src/main/kotlin/{cfg_pkg_path}/{cfg_pascal}Application.kt"
    )
