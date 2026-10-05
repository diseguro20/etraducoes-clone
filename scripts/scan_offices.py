import os

keywords = ['marechal', 'calogeras', 'calógeras', 'madison', 'curitiba', 'joinville']

found_files = {}

for root, dirs, files in os.walk('src'):
    for f in files:
        if f.endswith(('.tsx', '.ts', '.css', '.json')):
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8', errors='ignore') as fp:
                c = fp.read().lower()
                matched = [k for k in keywords if k in c]
                if matched:
                    found_files[p] = matched

for p, m in sorted(found_files.items()):
    print(f"{p}: {m}")
