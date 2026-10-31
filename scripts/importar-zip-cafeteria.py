#!/usr/bin/env python3
"""Importa lote ZIP de imagens para o cardápio público e a biblioteca."""
import hashlib, html, os, re, sys, zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "docs" / "imagens" / "cafe-com-bolo"
LIBRARY = ROOT / "biblioteca-produtos" / "cafe-com-bolo"
PAGE = ROOT / "docs" / "cafe-com-bolo" / "index.html"
LOOKUP = {
    "pao-de-queijo": "Pão de queijo",
    "empada-de-frango": "Empada de frango",
    "sanduiche-natural": "Sanduíche natural",
    "cafe-coado": "Café coado",
    "banoffee": "Banoffee",
    "pao-na-chapa": "Pão na chapa com amor",
    "bolo-do-dia": "Bolo do dia",
    "espresso-tonica": "Espresso tônica",
    "combo-bom-dia": "Combo bom dia",
    "combo-cafe-da-tarde": "Combo café da tarde",
}
EXT = {".webp", ".png", ".jpg", ".jpeg"}
packages = [Path(p) for p in sys.argv[1:]]
if not packages:
    packages = sorted((ROOT / "importar-imagens").glob("*.zip")) if (ROOT / "importar-imagens").exists() else []
if not packages:
    print("Nenhum ZIP recebido para importação.")
    sys.exit(0)

OUTPUT.mkdir(parents=True, exist_ok=True)
LIBRARY.mkdir(parents=True, exist_ok=True)
source = PAGE.read_text(encoding="utf-8")
imported = []
used_hashes = {hashlib.sha256(p.read_bytes()).hexdigest() for p in LIBRARY.iterdir() if p.is_file() and p.suffix.lower() in EXT}
total_bytes = 0

for archive in packages:
    if not archive.is_absolute():
        archive = ROOT / archive
    print(f"Processando: {archive.name}")
    with zipfile.ZipFile(archive) as z:
        entries = [x for x in z.infolist() if not x.is_dir() and Path(x.filename).suffix.lower() in EXT]
        if len(entries) > 300:
            raise ValueError("Máximo de 300 imagens por ZIP.")
        for item in entries:
            size = item.file_size
            if size > 6_000_000:
                raise ValueError(f"Imagem acima de 6 MB: {item.filename}")
            total_bytes += size
            if total_bytes > 80_000_000:
                raise ValueError("Pacote descompactado excede 80 MB.")
            original = Path(item.filename).name
            slug = Path(original).stem.lower()
            if not re.fullmatch(r"[a-z0-9-]{2,90}", slug):
                print(f"Ignorado nome não padronizado: {original}")
                continue
            blob = z.read(item)
            digest = hashlib.sha256(blob).hexdigest()
            if digest in used_hashes:
                print(f"Imagem repetida ignorada: {original}")
                continue
            used_hashes.add(digest)
            ext = Path(original).suffix.lower()
            filename = slug + ext
            (LIBRARY / filename).write_bytes(blob)
            (OUTPUT / filename).write_bytes(blob)
            product = LOOKUP.get(slug)
            if product:
                # Trocar somente a imagem de produto com alt idêntico (inclusive cards de destaque)
                pattern = re.compile(r'(<img\s+src=")[^"]+("\s+alt="' + re.escape(product) + r'"\s+loading="lazy")')
                source, changes = pattern.subn(lambda m: m.group(1) + "../imagens/cafe-com-bolo/" + filename + m.group(2), source)
                print(f"{product}: {changes} imagens atualizadas")
            imported.append(filename)

PAGE.write_text(source, encoding="utf-8")
print(f"Concluído: {len(imported)} imagens importadas, {len(used_hashes)} hashes únicos registrados.")
