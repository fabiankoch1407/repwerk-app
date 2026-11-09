/* Fills [data-a] elements from window.ANBIETER and warns about missing required fields. */
(function () {
  var A = window.ANBIETER || {}, need = ['name', 'strasse', 'plz_ort', 'email'];
  var val = function (k) {
    if (k === 'anschrift') return [A.name, A.vertreten, A.strasse, A.plz_ort, A.land].filter(Boolean).join(', ');
    if (k === 'preise_hinweis') return A.kleinunternehmer ? 'Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.' : 'Alle Preise enthalten die gesetzliche Umsatzsteuer.';
    return A[k] || '';
  };
  document.querySelectorAll('[data-a]').forEach(function (el) {
    var k = el.getAttribute('data-a'), v = val(k);
    if (v) { el.textContent = v; if (k === 'email' && el.tagName === 'A') el.href = 'mailto:' + v; }
    else { el.textContent = '[' + k + ' fehlt]'; el.classList.add('missing'); }
  });
  document.querySelectorAll('[data-if]').forEach(function (el) { if (!val(el.getAttribute('data-if'))) el.remove(); });
  var miss = need.filter(function (k) { return !A[k]; });
  if (miss.length) {
    var b = document.createElement('div'); b.className = 'warn';
    b.textContent = 'Entwurf: Bitte die Anbieterdaten in legal/anbieter.js ausfüllen (fehlt: ' + miss.join(', ') + '). Lass die Texte vor dem Start anwaltlich prüfen.';
    document.body.insertBefore(b, document.body.firstChild);
  }
})();
