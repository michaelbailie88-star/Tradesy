#!/usr/bin/env python3
import os

patterns = [
    ('text-indigo-600', 'text-primary-600'),
    ('text-indigo-700', 'text-primary-700'),
    ('text-indigo-500', 'text-primary-500'),
    ('bg-indigo-600', 'bg-primary-600'),
    ('bg-indigo-700', 'bg-primary-700'),
    ('bg-indigo-100', 'bg-primary-100'),
    ('bg-indigo-50', 'bg-primary-50'),
    ('hover:text-indigo-600', 'hover:text-primary-600'),
    ('hover:bg-indigo-200', 'hover:bg-primary-200'),
    ('hover:bg-indigo-700', 'hover:bg-primary-700'),
    ('hover:bg-indigo-600', 'hover:bg-primary-600'),
    ('hover:bg-indigo-50', 'hover:bg-primary-50'),
    ('focus:ring-indigo-500', 'focus:ring-primary-500'),
    ('focus:border-indigo-500', 'focus:border-primary-500'),
    ('border-indigo-600', 'border-primary-600'),
    ('ring-indigo-600', 'ring-primary-600'),
    ('ring-indigo-500', 'ring-primary-500'),
]

count = 0
for root, dirs, files in os.walk('/home/team/shared/tradesy-app/src'):
    for f in files:
        if f.endswith(('.tsx', '.ts')):
            path = os.path.join(root, f)
            try:
                with open(path, 'r') as fh:
                    content = fh.read()
                changed = False
                for old, new in patterns:
                    if old in content:
                        content = content.replace(old, new)
                        changed = True
                if changed:
                    with open(path, 'w') as fh:
                        fh.write(content)
                    print(f'Updated: {path}')
                    count += 1
            except PermissionError:
                print(f'Permission denied: {path}')
            except Exception as e:
                print(f'Error: {path}: {e}')

print(f'\nDone! Updated {count} files.')

# Final check
remaining = 0
for root, dirs, files in os.walk('/home/team/shared/tradesy-app/src'):
    for f in files:
        if f.endswith(('.tsx', '.ts')):
            path = os.path.join(root, f)
            try:
                with open(path, 'r') as fh:
                    content = fh.read()
                if 'indigo' in content.lower():
                    print(f'STILL HAS INDIGO: {path}')
                    remaining += 1
            except:
                pass
print(f'Files still with indigo: {remaining}')