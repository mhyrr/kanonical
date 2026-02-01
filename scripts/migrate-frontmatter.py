#!/usr/bin/env python3
"""
Migrates Gatsby frontmatter to Hugo format.
Changes 'path:' to 'url:' in all markdown files.
"""

import os
import re
from pathlib import Path

BLOG_DIR = Path(__file__).parent.parent / "content" / "blog"

def migrate_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Only process if it has frontmatter
    if not content.startswith('---'):
        return False

    # Find the frontmatter section
    parts = content.split('---', 2)
    if len(parts) < 3:
        return False

    frontmatter = parts[1]
    body = parts[2]

    # Replace path: with url:
    if 'path:' in frontmatter:
        frontmatter = re.sub(r'^path:', 'url:', frontmatter, flags=re.MULTILINE)

        # Reconstruct the file
        new_content = f'---{frontmatter}---{body}'

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

        return True

    return False

def main():
    migrated = 0
    skipped = 0

    for filepath in BLOG_DIR.glob('*.md'):
        if filepath.name.startswith('_'):
            continue

        if migrate_file(filepath):
            print(f"Migrated: {filepath.name}")
            migrated += 1
        else:
            skipped += 1

    print(f"\nDone! Migrated {migrated} files, skipped {skipped}")

if __name__ == '__main__':
    main()
