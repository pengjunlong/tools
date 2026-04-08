document.addEventListener('DOMContentLoaded', function() {
  var input = document.getElementById('urlInput');
  var output = document.getElementById('urlOutput');
  var encodeBtn = document.getElementById('encodeBtn');
  var decodeBtn = document.getElementById('decodeBtn');
  var swapBtn = document.getElementById('swapBtn');
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

  function getMode() {
    return document.querySelector('input[name="encodeMode"]:checked').value;
  }

  function encodeUrl() {
    var val = input.value;
    if (!val) { showNotification('请输入内容', 'error'); return; }
    try {
      var result = getMode() === 'uri' ? encodeURIComponent(val) : encodeURI(val);
      output.value = result;
      resultCard.style.display = '';
      showNotification('编码成功');
    } catch (e) { showNotification('编码失败', 'error'); }
  }

  function decodeUrl() {
    var val = input.value;
    if (!val) { showNotification('请输入内容', 'error'); return; }
    try {
      var result = decodeURIComponent(val);
      output.value = result;
      resultCard.style.display = '';
      showNotification('解码成功');
    } catch (e) {
      // Try decodeURI as fallback
      try {
        output.value = decodeURI(val);
        resultCard.style.display = '';
        showNotification('解码成功');
      } catch (e2) { showNotification('解码失败，请确认输入是有效的编码字符串', 'error'); }
    }
  }

  encodeBtn.addEventListener('click', encodeUrl);
  decodeBtn.addEventListener('click', decodeUrl);
  swapBtn.addEventListener('click', function() {
    var tmp = input.value; input.value = output.value; output.value = tmp;
    showNotification('已交换');
  });
  clearBtn.addEventListener('click', function() {
    input.value = ''; output.value = ''; resultCard.style.display = 'none';
    showNotification('已清空');
  });
  exampleBtn.addEventListener('click', function() {
    input.value = 'https://example.com/search?q=你好世界&lang=中文&page=1';
    encodeUrl();
  });
  copyBtn.addEventListener('click', function() { copyToClipboard(output.value); });
});

