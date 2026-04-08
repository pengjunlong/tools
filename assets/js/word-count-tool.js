document.addEventListener('DOMContentLoaded', function() {
  var input = document.getElementById('wcInput');
  var clearBtn = document.getElementById('clearBtn');
  var exampleBtn = document.getElementById('exampleBtn');
  var notification = document.getElementById('notification');

  function showNotification(msg, type) {
    var icon = type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle';
    notification.innerHTML = '<i class="fas ' + icon + '"></i> <span>' + msg + '</span>';
    notification.className = 'notification' + (type === 'error' ? ' error' : '');
    notification.classList.add('show');
    setTimeout(function() { notification.classList.remove('show'); }, 3000);
  }

  function updateStats(text) {
    var chars = text.length;
    var charsNoSpace = text.replace(/\s/g, '').length;
    // Words: split by whitespace, filter empty
    var words = text.trim() ? text.trim().split(/\s+/).length : 0;
    // Chinese chars
    var chinese = (text.match(/[\u4e00-\u9fff]/g) || []).length;
    // Lines
    var lines = text ? text.split('\n').length : 0;
    // Paragraphs: non-empty lines groups
    var paragraphs = text.trim() ? text.trim().split(/\n\s*\n/).filter(function(p) { return p.trim().length > 0; }).length : 0;
    // Sentences
    var sentences = text.trim() ? (text.match(/[.!?。！？]+/g) || []).length : 0;
    if (sentences === 0 && text.trim().length > 0) sentences = 1;
    // UTF-8 bytes
    var bytes = new Blob([text]).size;

    document.getElementById('statChars').textContent = chars;
    document.getElementById('statCharsNoSpace').textContent = charsNoSpace;
    document.getElementById('statWords').textContent = words;
    document.getElementById('statChinese').textContent = chinese;
    document.getElementById('statLines').textContent = lines;
    document.getElementById('statParagraphs').textContent = paragraphs;
    document.getElementById('statSentences').textContent = sentences;
    document.getElementById('statBytes').textContent = bytes < 1024 ? bytes + ' B' : (bytes / 1024).toFixed(1) + ' KB';
  }

  input.addEventListener('input', function() { updateStats(input.value); });

  clearBtn.addEventListener('click', function() {
    input.value = ''; updateStats('');
    showNotification('已清空');
  });

  exampleBtn.addEventListener('click', function() {
    input.value = '这是一个示例文本。This is a sample text for word counting.\n\n它包含了中文和英文混合的内容。It contains mixed Chinese and English content.\n\n这段文字用来演示字数统计工具的各项功能：字符数、单词数、行数、段落数等。';
    updateStats(input.value);
  });

  updateStats('');
});

