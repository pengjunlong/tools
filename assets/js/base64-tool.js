document.addEventListener('DOMContentLoaded', function() {
  var input = document.getElementById('base64Input');
  var output = document.getElementById('base64Output');
  var encodeBtn = document.getElementById('encodeBtn');
  var decodeBtn = document.getElementById('decodeBtn');
  var swapBtn = document.getElementById('swapBtn');
  var clearBtn = document.getElementById('clearBtn');
  var exampleBtn = document.getElementById('exampleBtn');
  var copyBtn = document.getElementById('copyBtn');
  var lineBreak = document.getElementById('lineBreak');
  var urlSafe = document.getElementById('urlSafe');
  var inputDot = document.getElementById('inputDot');
  var inputStatusText = document.getElementById('inputStatusText');
  var resultCard = document.getElementById('resultCard');
  var infoInputLen = document.getElementById('infoInputLen');
  var infoOutputLen = document.getElementById('infoOutputLen');
  var infoOperation = document.getElementById('infoOperation');
  var notification = document.getElementById('notification');

  // ========== 通知 ==========
  function showNotification(message, type) {
    var icon = type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle';
    notification.innerHTML = '<i class="fas ' + icon + '"></i> <span>' + message + '</span>';
    notification.className = 'notification' + (type === 'error' ? ' error' : '');
    notification.classList.add('show');
    setTimeout(function() { notification.classList.remove('show'); }, 3000);
  }

  // ========== 复制 ==========
  async function copyToClipboard(text) {
    if (!text) { showNotification('没有内容可复制', 'error'); return; }
    try { await navigator.clipboard.writeText(text); showNotification('已复制到剪贴板'); }
    catch (err) { showNotification('复制失败', 'error'); }
  }

  // ========== UTF-8 安全的 Base64 ==========
  function utf8ToBase64(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode(parseInt(p1, 16));
    }));
  }

  function base64ToUtf8(str) {
    return decodeURIComponent(
      atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join('')
    );
  }

  // ========== 换行处理 ==========
  function addLineBreaks(str, width) {
    if (width <= 0) return str;
    var result = [];
    for (var i = 0; i < str.length; i += width) {
      result.push(str.substring(i, i + width));
    }
    return result.join('\n');
  }

  function removeLineBreaks(str) {
    return str.replace(/[\r\n]/g, '');
  }

  // ========== URL 安全模式 ==========
  function toUrlSafe(b64) {
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function fromUrlSafe(b64) {
    var padded = b64.replace(/-/g, '+').replace(/_/g, '/');
    while (padded.length % 4 !== 0) padded += '=';
    return padded;
  }

  // ========== 检测是否为 Base64 ==========
  function isLikelyBase64(str) {
    var cleaned = removeLineBreaks(str).trim();
    if (cleaned.length === 0) return false;
    // URL 安全 Base64
    if (/^[A-Za-z0-9\-_]+$/.test(cleaned) && cleaned.length % 4 === 0) return true;
    // 标准 Base64
    if (/^[A-Za-z0-9+/]+=*$/.test(cleaned) && cleaned.length % 4 === 0) return true;
    return false;
  }

  // ========== 输入验证 ==========
  function validateInput() {
    var val = input.value.trim();
    if (!val) {
      inputDot.className = 'status-dot';
      inputStatusText.textContent = '等待输入';
      return;
    }
    if (isLikelyBase64(val)) {
      inputDot.className = 'status-dot valid';
      inputStatusText.textContent = '检测到 Base64 编码';
    } else {
      inputDot.className = 'status-dot valid';
      inputStatusText.textContent = '检测到普通文本';
    }
  }

  // ========== 编码 ==========
  function encode() {
    var val = input.value;
    if (!val) { showNotification('请输入需要编码的文本', 'error'); return; }
    try {
      var encoded = utf8ToBase64(val);
      if (urlSafe.checked) encoded = toUrlSafe(encoded);
      var width = parseInt(lineBreak.value) || 0;
      if (width > 0 && !urlSafe.checked) encoded = addLineBreaks(encoded, width);
      output.value = encoded;
      resultCard.style.display = '';
      infoInputLen.textContent = val.length + ' 字符';
      infoOutputLen.textContent = encoded.length + ' 字符';
      infoOperation.textContent = '编码';
      showNotification('编码成功');
    } catch (e) {
      showNotification('编码失败: ' + e.message, 'error');
    }
  }

  // ========== 解码 ==========
  function decode() {
    var val = input.value.trim();
    if (!val) { showNotification('请输入需要解码的 Base64 字符串', 'error'); return; }
    try {
      var cleaned = removeLineBreaks(val);
      if (urlSafe.checked) cleaned = fromUrlSafe(cleaned);
      // 自动检测 URL 安全模式
      if (!urlSafe.checked && (cleaned.includes('-') || cleaned.includes('_'))) {
        cleaned = fromUrlSafe(cleaned);
      }
      var decoded = base64ToUtf8(cleaned);
      output.value = decoded;
      resultCard.style.display = '';
      infoInputLen.textContent = val.length + ' 字符';
      infoOutputLen.textContent = decoded.length + ' 字符';
      infoOperation.textContent = '解码';
      showNotification('解码成功');
    } catch (e) {
      showNotification('解码失败，请确认输入是有效的 Base64 字符串', 'error');
    }
  }

  // ========== 交换 ==========
  function swap() {
    var temp = input.value;
    input.value = output.value;
    output.value = temp;
    if (!resultCard.style.display || resultCard.style.display === 'none') {
      resultCard.style.display = '';
    }
    validateInput();
    showNotification('已交换输入输出');
  }

  // ========== 清空 ==========
  function clearAll() {
    input.value = ''; output.value = '';
    resultCard.style.display = 'none';
    inputDot.className = 'status-dot';
    inputStatusText.textContent = '等待输入';
    showNotification('已清空');
  }

  // ========== 示例 ==========
  function loadExample() {
    input.value = 'Hello, 你好世界！🎉';
    encode();
  }

  // ========== 事件绑定 ==========
  encodeBtn.addEventListener('click', encode);
  decodeBtn.addEventListener('click', decode);
  swapBtn.addEventListener('click', swap);
  clearBtn.addEventListener('click', clearAll);
  exampleBtn.addEventListener('click', loadExample);
  copyBtn.addEventListener('click', function() { copyToClipboard(output.value); });
  input.addEventListener('input', validateInput);

  // 初始化
  loadExample();
});

