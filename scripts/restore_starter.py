"""One-time import of Zim Safe Minds starter from the bundled local snapshot.

The bootstrap payload has no secrets or personal information.
"""
import base64
import gzip
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "scripts" / "starter_payload.txt"
records = json.loads(gzip.decompress(base64.b64decode(DATA.read_text(encoding="ascii"))).decode("utf-8"))
if not isinstance(records, dict) or len(records) != 17:
    raise ValueError("Unexpected starter manifest")
for rel, content in records.items():
    file_path = Path(rel)
    if file_path.is_absolute() or ".." in file_path.parts or not isinstance(content, str):
        raise ValueError(f"Unsafe source path: {rel}")
    target = ROOT / file_path
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(content, encoding="utf-8")
# One-time import tools are deleted after restoration.
DATA.unlink()
(ROOT / ".github/workflows/restore-starter.yml").unlink()
Path(__file__).unlink()
print(f"Restored {len(records)} source files.")
