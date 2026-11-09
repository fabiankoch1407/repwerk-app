"""Builds index.html and the service worker from src/. Run: python3 build.py"""
import hashlib, pathlib
root = pathlib.Path(__file__).parent
src = root / 'src'
head = (src / 'head.html').read_text()
js = '\n'.join((src / f).read_text() for f in ['data.js', 'anim.js', 'i18n.js', 'smart.js', 'cloud.js', 'app.js'])
html = head + '<script>\n' + js + '\n</script>\n</body>\n</html>\n'
(root / 'index.html').write_text(html)
version = hashlib.sha1(html.encode()).hexdigest()[:10]
sw = (src / 'sw.template.js').read_text().replace('__VERSION__', version)
(root / 'sw.js').write_text(sw)
print('index.html', len(html), 'bytes, version', version)
