"""Temporary bootstrap: restore the full source manifest from bzip2 chunks."""
import base64, bz2, json
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
PARTS=[ROOT/"scripts"/f"starter_part_{i}.txt" for i in range(1,6)]
payload="".join(p.read_text(encoding="ascii") for p in PARTS)
records=json.loads(bz2.decompress(base64.b64decode(payload)).decode("utf-8"))
if not isinstance(records,dict) or len(records)!=17:
    raise ValueError("Unexpected source manifest")
for rel, content in records.items():
    path=Path(rel)
    if path.is_absolute() or ".." in path.parts or not isinstance(content,str):
        raise ValueError(f"Invalid file path: {rel}")
    dest=ROOT/path
    dest.parent.mkdir(parents=True,exist_ok=True)
    dest.write_text(content,encoding="utf-8")
for p in PARTS: p.unlink()
(ROOT/".github/workflows/restore-starter.yml").unlink()
Path(__file__).unlink()
print(f"Restored {len(records)} files")
