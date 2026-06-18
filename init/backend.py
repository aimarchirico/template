import os
from utils import pascal, lower, path, replace_text, move_files, delete_files

def setup_backend(default_mod, config_mod):
    def_pkg = default_mod["package"]
    cfg_pkg = config_mod["package"]
    def_name = default_mod["name"]
    cfg_name = config_mod["name"]
    def_img = default_mod["image"]
    cfg_img = config_mod["image"]

    def_pkg_path = path(def_pkg)
    cfg_pkg_path = path(cfg_pkg)
    def_pascal = pascal(def_name)
    cfg_pascal = pascal(cfg_name)
    def_lower = lower(def_name)
    cfg_lower = lower(cfg_name)

    pkg_files = [
        "backend/build-logic/convention/build.gradle.kts",
        "backend/app/build.gradle.kts",
        f"backend/app/src/test/kotlin/{def_pkg_path}/ArchitectureTest.kt",
        f"backend/app/src/main/kotlin/{def_pkg_path}/{def_pascal}Application.kt",
        f"backend/app/src/main/kotlin/{def_pkg_path}/config/CorsConfig.kt",
        f"backend/app/src/main/kotlin/{def_pkg_path}/security/ProxyValidationFilter.kt"
    ]

    for f in pkg_files:
        replace_text(f, def_pkg, cfg_pkg)

    replace_text("backend/compose.prod.yml", def_img, cfg_img)
    replace_text("backend/app/src/main/resources/application.yml", def_name, cfg_name)

    app_file = f"backend/app/src/main/kotlin/{def_pkg_path}/{def_pascal}Application.kt"
    replace_text(app_file, f"{def_pascal}Application", f"{cfg_pascal}Application")

    lower_files = [
        ".github/workflows/backend-deploy.yml",
        "backend/app/src/main/resources/application.yml",
        "backend/compose.yml",
        "backend/compose.prod.yml",
        "backend/settings.gradle.kts",
        "backend/gradle/libs.versions.toml",
        "backend/app/build.gradle.kts"
    ]
    for f in lower_files:
        replace_text(f, def_lower, cfg_lower)

    # File & Folder Moves
    move_files(
        f"backend/build-logic/convention/src/main/kotlin/{def_lower}.kotlin.gradle.kts",
        f"backend/build-logic/convention/src/main/kotlin/{cfg_lower}.kotlin.gradle.kts"
    )

    # Rename Application file in-place before moving the package directory
    src_app = f"backend/app/src/main/kotlin/{def_pkg_path}/{def_pascal}Application.kt"
    tmp_app = f"backend/app/src/main/kotlin/{def_pkg_path}/{cfg_pascal}Application.kt"
    if os.path.exists(src_app):
        os.rename(src_app, tmp_app)

    # Move backend source packages
    move_files(
        f"backend/app/src/main/kotlin/{def_pkg_path}",
        f"backend/app/src/main/kotlin/{cfg_pkg_path}"
    )

    # Move backend test packages
    move_files(
        f"backend/app/src/test/kotlin/{def_pkg_path}",
        f"backend/app/src/test/kotlin/{cfg_pkg_path}"
    )

def delete_backend():
    delete_files("backend")
    # Delete GitHub workflow files matching .github/workflows/backend-*.yml
    import glob
    for f in glob.glob(".github/workflows/backend-*.yml"):
        delete_files(f)
