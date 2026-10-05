import os, glob

search_terms = ['angelica', 'ang\u00e9lica', 'marechal', 'calogeras', 'cal\u00f3geras', 'madison', 'escrit\u00f3rio', 'escritorio']

matches = {}

for root, dirs, files in os.walk('src'):
    for f in files:
        if f.endswith(('.tsx', '.ts', '.js', '.jsx', '.json', '.html')):
            full_path = os.path.join(root, f)
            with open(full_path, 'r', encoding='utf-8', errors='ignore') as fp:
                content = fp.read()
                found = []
                for term in search_terms:
                    if term in content.lower():
                        found.append(term)
                if found:
                    matches[full_path] = found

for k, v in matches.items():
    print(f"{k}: {v}")
