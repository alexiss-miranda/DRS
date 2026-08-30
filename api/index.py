import os
import sys
from pathlib import Path

demo_path = str(Path(__file__).parent.parent / "demo-web-cuentabancaria")
sys.path.insert(0, demo_path)
os.chdir(demo_path)

from app import app

# Vercel necesita que la app sea callable directamente
app = app
