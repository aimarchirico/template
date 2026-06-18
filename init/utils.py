import os
import shutil
import re

def pascal(name: str) -> str:
    words = re.findall(r'[a-zA-Z0-9]+', name)
    return "".join(word.capitalize() for word in words)

def lower(name: str) -> str:
    words = re.findall(r'[a-zA-Z0-9]+', name)
    return "".join(word.lower() for word in words)

def path(package: str) -> str:
    return package.replace('.', '/')

def replace_text(file_path: str, old_text: str, new_text: str):
    if not os.path.exists(file_path):
        return
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    if old_text in content:
        new_content = content.replace(old_text, new_text)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

def move_files(src_path: str, dest_path: str):
    if not os.path.exists(src_path):
        return
    dest_dir = os.path.dirname(dest_path)
    if dest_dir:
        os.makedirs(dest_dir, exist_ok=True)
    if os.path.exists(dest_path):
        if os.path.isdir(dest_path):
            shutil.rmtree(dest_path)
        else:
            os.remove(dest_path)
    shutil.move(src_path, dest_path)
    _clean_empty_parents(src_path)

def delete_files(path: str):
    if not os.path.exists(path):
        return
    if os.path.isdir(path):
        shutil.rmtree(path)
    else:
        os.remove(path)

def _clean_empty_parents(path: str):
    parent = os.path.dirname(path)
    stop_dirs = {".", "", "/", "backend", "frontend", "backend/app/src/main/kotlin", "backend/app/src/test/kotlin"}
    while parent and parent not in stop_dirs:
        try:
            if not os.listdir(parent):
                os.rmdir(parent)
                parent = os.path.dirname(parent)
            else:
                break
        except Exception:
            break
