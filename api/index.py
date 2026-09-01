import os
import sys
from pathlib import Path

# Add demo-web-cuentabancaria directory to python path
demo_path = str(Path(__file__).resolve().parent.parent / "demo-web-cuentabancaria")
if demo_path not in sys.path:
    sys.path.insert(0, demo_path)

try:
    os.chdir(demo_path)
except Exception:
    pass

from app import app
