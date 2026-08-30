import os
import sys
from pathlib import Path

# Agregar la carpeta demo-web-cuentabancaria al path para que los imports funcionen
demo_path = str(Path(__file__).parent.parent / "demo-web-cuentabancaria")
sys.path.insert(0, demo_path)
os.chdir(demo_path)

from app import app

export = app
