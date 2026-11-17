"""Build the standalone student page of «بوصلة التخصص» (bawsala/index.html).

usage: build_bawsala.py <handoff_dir> <out.html>

Inlines questionnaires.global.js (the same questions and scoring as the platform)
and two weights of the Thmanyah Sans font, so the page works from one small file.
"""
import base64, pathlib, sys

src_dir, out = map(pathlib.Path, sys.argv[1:3])
fonts = next(src_dir.glob("_ds/*/assets/fonts"))
html = (src_dir / "bawsala.src.html").read_text(encoding="utf-8")
q = (src_dir / "questionnaires.global.js").read_text(encoding="utf-8").replace("</script", "<\\/script")


def face(file, weight):
    data = base64.b64encode((fonts / file).read_bytes()).decode()
    return ('@font-face{font-family:"Thmanyah Sans";font-weight:%d;font-style:normal;font-display:swap;'
            'src:url(data:font/woff2;base64,%s) format("woff2")}' % (weight, data))


for marker in ("/*FONTS*/", "/*QUESTIONNAIRES*/"):
    assert html.count(marker) == 1, marker
html = html.replace("/*FONTS*/", face("thmanyahsans-Regular.woff2", 400) + "\n" + face("thmanyahsans-Bold.woff2", 700))
html = html.replace("/*QUESTIONNAIRES*/", q)

out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(html, encoding="utf-8")
print(out, round(len(html.encode()) / 1e3), "KB")
