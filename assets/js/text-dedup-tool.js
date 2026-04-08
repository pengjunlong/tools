document.addEventListener('DOMContentLoaded', function() {
  var input = document.getElementById('dedupInput');
  var output = document.getElementById('dedupOutput');
  var dedupBtn = document.getElementById('dedupBtn');
  var clearBtn = document.getElementById('clearBtn');
  var exampleBtn = document.getElementById('exampleBtn');
  var copyBtn = document.getElementById('copyBtn');
  var resultCard = document.getElementById('resultCard');
  var ignoreCase = document.getElementById('ignoreCase');
  var trimSpaces = document.getElementById('trimSpaces');
  var removeEmpty = document.getElementById('removeEmpty');
  var origCount = document.getElementById('origCount');
  var dedupCount = document.getElementById('dedupCount');
  var removedCount = document.getElementById('removedCount');
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

  function deduplicate() {
    var val = input.value;
    if (!val.trim()) { showNotification('请输入文本', 'error'); return; }
    var lines = val.split('\n');
    origCount.textContent = lines.length;

    if (removeEmpty.checked) lines = lines.filter(function(l) { return l.trim().length > 0; });

    var seen = new Set();
    var unique = [];
    lines.forEach(function(line) {
      var key = trimSpaces.checked ? line.trim() : line;
      if (ignoreCase.checked) key = key.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(trimSpaces.checked ? line.trim() : line);
      }
    });

    output.value = unique.join('\n');
    dedupCount.textContent = unique.length;
    removedCount.textContent = parseInt(origCount.textContent) - unique.length;
    resultCard.style.display = '';
    showNotification('去重完成，移除 ' + removedCount.textContent + ' 行');
  }

  dedupBtn.addEventListener('click', deduplicate);
  clearBtn.addEventListener('click', function() {
    input.value = ''; output.value = ''; resultCard.style.display = 'none';
    showNotification('已清空');
  });
  exampleBtn.addEventListener('click', function() {
    input.value = 'apple\nbanana\nApple\norange\nbanana\ngrape\nORANGE\nkiwi\napple\nmango';
    deduplicate();
  });
  copyBtn.addEventListener('click', function() { copyToClipboard(output.value); });
});

