import subprocess

out = subprocess.check_output(['git', 'grep', '-i', 'traduztudo'], encoding='utf-8', errors='ignore')
for line in out.splitlines():
    if 'traduztudo.' in line or 'traduztudo/' in line or 'traduztudo-clone' in line:
        file_part = line.split(':')[0]
        match_part = ':'.join(line.split(':')[1:]).strip()
        print(f"{file_part}: {match_part[:120]}")
