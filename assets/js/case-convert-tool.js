document.addEventListener('DOMContentLoaded', function() {
  var input = document.getElementById('caseInput');
  var output = document.getElementById('caseOutput');
  var resultCard = document.getElementById('resultCard');
  var copyBtn = document.getElementById('copyBtn');
  var notification = document.getElementById('notification');

  function showNotification(msg, type) {
    var icon = type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle';
    notification.innerHTML = '<i class="fas ' + icon + '"></i> <span>' + msg + '</span>';
    notification.className = 'notification' + (type === 'error' ? ' error' : '');
    notification.classList.add('show');
    setTimeout(function() { notification.classList.remove('show'); }, 3000);
  }

  async function copyToClipboard(text) {
    try { await navigator.clipboard.writeText(text); showNotification('已复制到剪贴板'); }
    catch (err) { showNotification('复制失败', 'error'); }
  }

  // Simple case conversions
  function toUpper(t) { return t.toUpperCase(); }
  function toLower(t) { return t.toLowerCase(); }
  function toTitle(t) { return t.replace(/\b\w/g, function(c) { return c.toUpperCase(); }); }
  function toSentence(t) { return t.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, function(c) { return c.toUpperCase(); }); }
  function toToggle(t) { return t.split('').map(function(c) { return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase(); }).join(''); }

  // Naming convention conversions
  function splitWords(t) {
    // Split by spaces, underscores, hyphens, camelCase boundaries
    return t.trim().replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[_\-]+/g, ' ').split(/\s+/).filter(function(s) { return s.length > 0; });
  }
  function toCamelCase(t) { var w = splitWords(t); return w[0].toLowerCase() + w.slice(1).map(function(s) { return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(); }).join(''); }
  function toPascalCase(t) { return splitWords(t).map(function(s) { return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(); }).join(''); }
  function toSnakeCase(t) { return splitWords(t).map(function(s) { return s.toLowerCase(); }).join('_'); }
  function toKebabCase(t) { return splitWords(t).map(function(s) { return s.toLowerCase(); }).join('-'); }
  function toConstantCase(t) { return splitWords(t).map(function(s) { return s.toUpperCase(); }).join('_'); }

  var converters = {
    upper: toUpper, lower: toLower, title: toTitle, sentence: toSentence, toggle: toToggle,
    camelCase: toCamelCase, pascalCase: toPascalCase, snakeCase: toSnakeCase, kebabCase: toKebabCase, constantCase: toConstantCase
  };

  document.querySelectorAll('.case-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var val = input.value;
      if (!val) { showNotification('请输入文本', 'error'); return; }
      var mode = btn.dataset.mode;
      var result = converters[mode](val);
      output.value = result;
      resultCard.style.display = '';
      showNotification('转换完成');
    });
  });

  copyBtn.addEventListener('click', function() { copyToClipboard(output.value); });
});

