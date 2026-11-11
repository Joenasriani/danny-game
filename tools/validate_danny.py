#!/usr/bin/env python3
"""Read-only Danny validation: file integrity and syntax, NOT playtesting."""
import hashlib, json, re, subprocess, tempfile
from pathlib import Path
root=Path(__file__).resolve().parent.parent
m=json.loads((root/'DANNY_MANIFEST.json').read_text(encoding='utf-8'))
raw=(root/'index.html').read_bytes()
assert len(raw)==m['html_bytes'] and hashlib.sha256(raw).hexdigest()==m['html_sha256'], 'HTML checksum mismatch'
src=raw.decode('utf-8')
assert [int(x) for x in re.findall(r"name:\s*['\"]Level\s+(\d+)['\"]",src)]==m['level_numbers'],'Level numbering mismatch'
assert '<title>Danny' in src and 'The man who Sword the world!' in src,'Branding missing'
assert 'orbit.yaw - dx * 0.004' in src and 'orbit.pitch + dy * 0.0065' in src,'Camera mapping changed'
for path,sha in m['asset_sha256'].items():
    f=root/path
    assert f.exists(),f'Missing runtime file: {path}'
    assert hashlib.sha256(f.read_bytes()).hexdigest()==sha,f'Checksum mismatch: {path}'
scripts=[x for x in re.findall(r'<script(?:\s[^>]*)?>(.*?)</script>',src,re.S) if x.strip()]
assert len(scripts)==1,'Unexpected JS script blocks'
with tempfile.TemporaryDirectory() as d:
    script=Path(d)/'game.js'
    script.write_text(scripts[0],encoding='utf-8')
    p=subprocess.run(['node','--check',str(script)],capture_output=True,text=True)
    assert p.returncode==0,p.stderr
print('PASS: Danny title, 16 levels, camera, all assets, JS syntax')
print('NOT VERIFIED: browser gameplay, physical mobile devices, end-to-end levels')
