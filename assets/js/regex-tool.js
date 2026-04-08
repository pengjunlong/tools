document.addEventListener('DOMContentLoaded', function() {
  var pattern = document.getElementById('regexPattern');
  var flags = document.getElementById('regexFlags');
  var regexText = document.getElementById('regexText');
  var regexResult = document.getElementById('regexResult');
  var regexStatus = document.getElementById('regexStatus');
  var matchGroups = document.getElementById('matchGroups');
  var flagG = document.getElementById('flagG');
  var flagI = document.getElementById('flagI');
  var flagM = document.getElementById('flagM');
  var flagS = document.getElementById('flagS');
  var notification = document.getElementById('notification');

  function showNotification(msg, type) {
    var icon = type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle';
    notification.innerHTML = '<i class="fas ' + icon + '"></i> <span>' + msg + '</span>';
    notification.className = 'notification' + (type === 'error' ? ' error' : '');
    notification.classList.add('show');
    setTimeout(function() { notification.classList.remove('show'); }, 3000);
  }

  function updateFlags() {
    var f = '';
    if (flagG.checked) f += 'g';
    if (flagI.checked) f += 'i';
    if (flagM.checked) f += 'm';
    if (flagS.checked) f += 's';
    flags.value = f;
    runRegex();
  }

  function escapeHtml(t) {
    return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function runRegex() {
    var pat = pattern.value.trim();
    var text = regexText.value;

    if (!pat) {
      regexResult.innerHTML = escapeHtml(text || '在上方输入正则表达式和测试文本');
      regexStatus.innerHTML = '<span class="status-dot"></span><span>等待输入</span>';
      matchGroups.innerHTML = '';
      return;
    }

    try {
      var flagStr = flags.value;
      var regex = new RegExp(pat, flagStr);
      var matches = [];
      var match;

      if (flagStr.includes('g')) {
        while ((match = regex.exec(text)) !== null) {
          matches.push({ index: match.index, length: match[0].length, groups: Array.from(match) });
          if (match[0].length === 0) regex.lastIndex++;
        }
      } else {
        match = regex.exec(text);
        if (match) matches.push({ index: match.index, length: match[0].length, groups: Array.from(match) });
      }

      // Highlight matches in text
      if (matches.length > 0) {
        var html = '';
        var lastIndex = 0;
        matches.forEach(function(m) {
          html += escapeHtml(text.substring(lastIndex, m.index));
          html += '<span class="regex-highlight">' + escapeHtml(text.substring(m.index, m.index + m.length)) + '</span>';
          lastIndex = m.index + m.length;
        });
        html += escapeHtml(text.substring(lastIndex));
        regexResult.innerHTML = html;

        regexStatus.innerHTML = '<span class="status-dot valid"></span><span>找到 ' + matches.length + ' 个匹配</span>';

        // Show capture groups
        var groupsHtml = '<h4 style="font-size:0.9rem;color:#333;margin:12px 0 8px;">捕获分组</h4><div class="match-group">';
        matches.forEach(function(m, idx) {
          m.groups.forEach(function(g, gidx) {
            var label = gidx === 0 ? '匹配' + (idx + 1) : '组' + gidx;
            groupsHtml += '<span class="match-tag"><span class="group-label">' + label + ':</span>' + escapeHtml(g || '(empty)') + '</span>';
          });
        });
        groupsHtml += '</div>';
        matchGroups.innerHTML = groupsHtml;
      } else {
        regexResult.innerHTML = escapeHtml(text);
        regexStatus.innerHTML = '<span class="status-dot"></span><span>无匹配</span>';
        matchGroups.innerHTML = '';
      }
    } catch (e) {
      regexResult.innerHTML = escapeHtml(text || '');
      regexStatus.innerHTML = '<span class="status-dot invalid"></span><span>' + e.message + '</span>';
      matchGroups.innerHTML = '';
    }
  }

  // Templates
  var templates = {
    email: { pattern: '[\\w.-]+@[\\w.-]+\\.\\w+', text: 'user@example.com\nadmin@test.org\nnot-an-email\nhello@world.co.uk' },
    phone: { pattern: '1[3-9]\\d{9}', text: '13800138000\n15912345678\n12345678901\n18600001111' },
    ip: { pattern: '\\b(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\b', text: '192.168.1.1\n10.0.0.1\n999.999.999.999\n127.0.0.1' },
    url: { pattern: 'https?://[\\w\\-]+(\\.[\\w\\-]+)+[/\\w\\-._~:?#@!$&\'()*+,;=%]*', text: 'https://example.com\nhttp://test.org/path?q=1\nnot-a-url\nftp://files.server.com' },
    chinese: { pattern: '[\\u4e00-\\u9fff]+', text: 'Hello 你好世界\nThis is 测试 text\n全部中文' }
  };

  document.getElementById('templateEmail').addEventListener('click', function() { applyTemplate('email'); });
  document.getElementById('templatePhone').addEventListener('click', function() { applyTemplate('phone'); });
  document.getElementById('templateIP').addEventListener('click', function() { applyTemplate('ip'); });
  document.getElementById('templateURL').addEventListener('click', function() { applyTemplate('url'); });
  document.getElementById('templateChinese').addEventListener('click', function() { applyTemplate('chinese'); });

  function applyTemplate(name) {
    pattern.value = templates[name].pattern;
    regexText.value = templates[name].text;
    runRegex();
    showNotification('已加载 ' + name + ' 模板');
  }

  pattern.addEventListener('input', runRegex);
  regexText.addEventListener('input', runRegex);
  flagG.addEventListener('change', updateFlags);
  flagI.addEventListener('change', updateFlags);
  flagM.addEventListener('change', updateFlags);
  flagS.addEventListener('change', updateFlags);
  flags.addEventListener('change', runRegex);
});

