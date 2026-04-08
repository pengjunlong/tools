document.addEventListener('DOMContentLoaded', function() {
  var textLeft = document.getElementById('textLeft');
  var textRight = document.getElementById('textRight');
  var diffBtn = document.getElementById('diffBtn');
  var swapBtn = document.getElementById('swapBtn');
  var clearBtn = document.getElementById('clearBtn');
  var exampleBtn = document.getElementById('exampleBtn');
  var copyDiffBtn = document.getElementById('copyDiffBtn');
  var diffOutput = document.getElementById('diffOutput');
  var diffStats = document.getElementById('diffStats');
  var diffResult = document.getElementById('diffResult');
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

  // LCS-based line diff
  function computeDiff(oldLines, newLines) {
    var m = oldLines.length, n = newLines.length;
    // Build LCS table
    var dp = [];
    for (var i = 0; i <= m; i++) { dp[i] = []; dp[i][0] = 0; }
    for (var j = 0; j <= n; j++) dp[0][j] = 0;
    for (var i = 1; i <= m; i++) {
      for (var j = 1; j <= n; j++) {
        dp[i][j] = oldLines[i-1] === newLines[j-1] ? dp[i-1][j-1] + 1 : Math.max(dp[i-1][j], dp[i][j-1]);
      }
    }
    // Backtrack
    var result = [];
    var i = m, j = n;
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && oldLines[i-1] === newLines[j-1]) {
        result.unshift({ type: 'unchanged', oldLine: i, newLine: j, text: oldLines[i-1] });
        i--; j--;
      } else if (j > 0 && (i === 0 || dp[i][j-1] >= dp[i-1][j])) {
        result.unshift({ type: 'added', newLine: j, text: newLines[j-1] });
        j--;
      } else {
        result.unshift({ type: 'removed', oldLine: i, text: oldLines[i-1] });
        i--;
      }
    }
    return result;
  }

  function escapeHtml(t) { var d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

  function renderDiff(diff) {
    var added = 0, removed = 0, unchanged = 0;
    var html = '';
    diff.forEach(function(item) {
      if (item.type === 'added') { added++; html += '<div class="diff-line diff-added"><span class="diff-line-num">+' + item.newLine + '</span>' + escapeHtml(item.text) + '</div>'; }
      else if (item.type === 'removed') { removed++; html += '<div class="diff-line diff-removed"><span class="diff-line-num">-' + item.oldLine + '</span>' + escapeHtml(item.text) + '</div>'; }
      else { unchanged++; html += '<div class="diff-line diff-unchanged"><span class="diff-line-num"> ' + item.oldLine + '</span>' + escapeHtml(item.text) + '</div>'; }
    });
    diffStats.innerHTML = '<span class="added"><i class="fas fa-plus"></i> ' + added + ' 新增</span><span class="removed"><i class="fas fa-minus"></i> ' + removed + ' 删除</span><span class="unchanged">' + unchanged + ' 未变</span>';
    diffResult.innerHTML = html;
    diffOutput.style.display = '';
  }

  function doDiff() {
    var left = textLeft.value, right = textRight.value;
    if (!left && !right) { showNotification('请输入需要对比的文本', 'error'); return; }
    var oldLines = left.split('\n');
    var newLines = right.split('\n');
    var diff = computeDiff(oldLines, newLines);
    renderDiff(diff);
    showNotification('对比完成');
  }

  function loadExample() {
    textLeft.value = 'const app = {\n  name: "工具集",\n  version: "1.0",\n  tools: ["json", "base64"],\n  author: "admin"\n};';
    textRight.value = 'const app = {\n  name: "工具集",\n  version: "2.0",\n  tools: ["json", "base64", "url", "hash"],\n  description: "在线工具集合",\n  author: "developer"\n};';
    doDiff();
  }

  diffBtn.addEventListener('click', doDiff);
  swapBtn.addEventListener('click', function() {
    var tmp = textLeft.value; textLeft.value = textRight.value; textRight.value = tmp;
    showNotification('已交换');
  });
  clearBtn.addEventListener('click', function() {
    textLeft.value = ''; textRight.value = ''; diffOutput.style.display = 'none';
    showNotification('已清空');
  });
  exampleBtn.addEventListener('click', loadExample);
  copyDiffBtn.addEventListener('click', function() {
    var text = diffResult.innerText;
    copyToClipboard(text);
  });

  loadExample();
});

