document.addEventListener('DOMContentLoaded', function() {
  var input = document.getElementById('unicodeInput');
  var output = document.getElementById('unicodeOutput');
  var toUnicodeBtn = document.getElementById('toUnicodeBtn');
  var toCharBtn = document.getElementById('toCharBtn');
  var toHtmlBtn = document.getElementById('toHtmlBtn');
  var toJsBtn = document.getElementById('toJsBtn');
  var clearBtn = document.getElementById('clearBtn');
  var exampleBtn = document.getElementById('exampleBtn');
  var copyBtn = document.getElementById('copyBtn');
  var resultCard = document.getElementById('resultCard');
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

  function charToUnicode(str) {
    var result = [];
    for (var i = 0; i < str.length; i++) {
      var code = str.codePointAt(i);
      if (code > 0xFFFF) { i++; }
      result.push('U+' + code.toString(16).toUpperCase().padStart(4, '0'));
    }
    return result.join(' ');
  }

  function unicodeToChar(str) {
    return str.replace(/U\+([0-9A-Fa-f]{1,8})/g, function(m, hex) {
      return String.fromCodePoint(parseInt(hex, 16));
    });
  }

  function charToHtmlEntity(str) {
    var result = '';
    for (var i = 0; i < str.length; i++) {
      var code = str.codePointAt(i);
      if (code > 127) {
        if (code > 0xFFFF) i++;
        result += '&#' + code + ';';
      } else {
        result += str[i];
      }
    }
    return result;
  }

  function charToJsEscape(str) {
    var result = '';
    for (var i = 0; i < str.length; i++) {
      var code = str.codePointAt(i);
      if (code > 0xFFFF) {
        result += '\\u{' + code.toString(16) + '}';
        i++;
      } else if (code > 127) {
        result += '\\u' + code.toString(16).padStart(4, '0');
      } else {
        result += str[i];
      }
    }
    return result;
  }

  function showResult(text) {
    output.value = text;
    resultCard.style.display = '';
  }

  toUnicodeBtn.addEventListener('click', function() {
    if (!input.value) { showNotification('请输入内容', 'error'); return; }
    showResult(charToUnicode(input.value));
    showNotification('转换成功');
  });

  toCharBtn.addEventListener('click', function() {
    if (!input.value) { showNotification('请输入内容', 'error'); return; }
    showResult(unicodeToChar(input.value));
    showNotification('转换成功');
  });

  toHtmlBtn.addEventListener('click', function() {
    if (!input.value) { showNotification('请输入内容', 'error'); return; }
    showResult(charToHtmlEntity(input.value));
    showNotification('转换成功');
  });

  toJsBtn.addEventListener('click', function() {
    if (!input.value) { showNotification('请输入内容', 'error'); return; }
    showResult(charToJsEscape(input.value));
    showNotification('转换成功');
  });

  clearBtn.addEventListener('click', function() {
    input.value = ''; output.value = ''; resultCard.style.display = 'none';
    showNotification('已清空');
  });

  exampleBtn.addEventListener('click', function() {
    input.value = '你好世界 Hello 🎉';
    charToUnicode(input.value);
    showNotification('已加载示例');
  });

  copyBtn.addEventListener('click', function() { copyToClipboard(output.value); });
});

