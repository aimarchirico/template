import os
import shutil
import json

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
    if os.path.abspath(src_path) == os.path.abspath(dest_path):
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
    _clean_empty_parents(src_path, dest_path)

def delete_files(path: str):
    if not os.path.exists(path):
        return
    if os.path.isdir(path):
        shutil.rmtree(path)
    else:
        os.remove(path)

def _clean_empty_parents(src_path: str, dest_path: str):
    try:
        common = os.path.commonpath([os.path.abspath(src_path), os.path.abspath(dest_path)])
    except ValueError:
        common = os.path.abspath(".")

    parent = os.path.abspath(os.path.dirname(src_path))
    project_root = os.path.abspath(".")

    while parent and parent != common and parent != project_root:
        try:
            if not os.listdir(parent):
                os.rmdir(parent)
                parent = os.path.dirname(parent)
            else:
                break
        except Exception:
            break

def load_json(path: str) -> dict:
    if not os.path.exists(path):
        return {}
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)
