#!/usr/bin/env python3
"""Baixa as fotos do Wikimedia Commons com credito e verifica se sao JPEG."""
import json, pathlib, urllib.parse, urllib.request, time
root=pathlib.Path(__file__).resolve().parents[1]
catalog=json.loads((root/"frontend/public/produtos/catalogo.json").read_text(encoding="utf-8"))
dest=root/"frontend/public/produtos/imagens";dest.mkdir(parents=True,exist_ok=True)
for produto in catalog["produtos"]:
    target=dest/(produto["id"]+".jpg")
    if target.exists(): continue
    title="File:"+produto["arquivo_origem"]
    query=urllib.parse.urlencode({"action":"query","format":"json","prop":"imageinfo","iiprop":"url","iiurlwidth":720,"titles":title})
    request=urllib.request.Request("https://commons.wikimedia.org/w/api.php?"+query,headers={"User-Agent":"CafeQRComAmor/1.0 (github.com/claudio41cg-max/cafe-qr-com-amor)"})
    try:
        with urllib.request.urlopen(request,timeout=35) as resp: data=json.load(resp)
        page=next(iter(data["query"]["pages"].values()))
        imageinfo=page["imageinfo"][0]
        url=imageinfo.get("thumburl") or imageinfo["url"]
        with urllib.request.urlopen(urllib.request.Request(url,headers={"User-Agent":"CafeQRComAmor/1.0 (github.com/claudio41cg-max/cafe-qr-com-amor)"}),timeout=60) as resp: blob=resp.read()
        if not blob.startswith(bytes.fromhex("ffd8ff")): raise ValueError("Arquivo nao e JPEG")
        target.write_bytes(blob)
        print(f"OK {produto['id']} {len(blob)} bytes")
    except Exception as exc:
        print(f"ERRO {produto['id']}: {exc}")
    time.sleep(1)
