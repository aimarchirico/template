import re

def pascal(name: str) -> str:
    """Join the alphanumeric words in name into a PascalCase string."""
    words = re.findall(r'[a-zA-Z0-9]+', name)
    return "".join(word.capitalize() for word in words)

def lower(name: str) -> str:
    """Join the alphanumeric words in name into a single lowercase string."""
    words = re.findall(r'[a-zA-Z0-9]+', name)
    return "".join(word.lower() for word in words)

def path(package: str) -> str:
    """Convert a dotted package name to a slash-separated path."""
    return package.replace('.', '/')
