document.addEventListener('DOMContentLoaded', function() {
  var timestampInput = document.getElementById('timestampInput');
  var dateInput = document.getElementById('dateInput');
  var toDateBtn = document.getElementById('toDateBtn');
  var toTimestampBtn = document.getElementById('toTimestampBtn');
  var currentTimestampBtn = document.getElementById('currentTimestampBtn');
  var copyResultBtn = document.getElementById('copyResultBtn');
  var tsDot = document.getElementById('tsDot');
  var tsStatusText = document.getElementById('tsStatusText');
  var resultCard = document.getElementById('resultCard');
  var resultSeconds = document.getElementById('resultSeconds');
  var resultMillis = document.getElementById('resultMillis');
  var resultISO = document.getElementById('resultISO');
  var resultLocal = document.getElementById('resultLocal');
  var resultUTC = document.getElementById('resultUTC');
  var resultRelative = document.getElementById('resultRelative');
  var liveSeconds = document.getElementById('liveSeconds');
  var liveMillis = document.getElementById('liveMillis');
  var liveDatetime = document.getElementById('liveDatetime');
  var notification = document.getElementById('notification');

  var clockInterval = null;

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
    try { await navigator.clipboard.writeText(text); showNotification('已复制到剪贴板'); }
    catch (err) { showNotification('复制失败', 'error'); }
  }

  // ========== 时间格式化 ==========
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function formatLocal(date) {
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + ' ' +
           pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());
  }

  function formatUTC(date) {
    return date.getUTCFullYear() + '-' + pad(date.getUTCMonth() + 1) + '-' + pad(date.getUTCDate()) + ' ' +
           pad(date.getUTCHours()) + ':' + pad(date.getUTCMinutes()) + ':' + pad(date.getUTCSeconds()) + ' UTC';
  }

  function formatRelative(date) {
    var now = Date.now();
    var diff = date.getTime() - now;
    var abs = Math.abs(diff);
    var suffix = diff >= 0 ? '后' : '前';
    if (abs < 60000) return Math.floor(abs / 1000) + ' 秒' + suffix;
    if (abs < 3600000) return Math.floor(abs / 60000) + ' 分钟' + suffix;
    if (abs < 86400000) return Math.floor(abs / 3600000) + ' 小时' + suffix;
    if (abs < 2592000000) return Math.floor(abs / 86400000) + ' 天' + suffix;
    if (abs < 31536000000) return Math.floor(abs / 2592000000) + ' 个月' + suffix;
    return (abs / 31536000000).toFixed(1) + ' 年' + suffix;
  }

  // ========== 显示结果 ==========
  function showResult(date) {
    var secs = Math.floor(date.getTime() / 1000);
    var ms = date.getTime();
    resultSeconds.textContent = secs;
    resultMillis.textContent = ms;
    resultISO.textContent = date.toISOString();
    resultLocal.textContent = formatLocal(date);
    resultUTC.textContent = formatUTC(date);
    resultRelative.textContent = formatRelative(date);
    resultCard.style.display = '';
  }

  // ========== 检测时间戳单位 ==========
  function getTimestampUnit(value) {
    var radio = document.querySelector('input[name="tsUnit"]:checked');
    if (radio && radio.value !== 'auto') return radio.value;
    // 自动检测：13位视为毫秒，10位及以下视为秒
    return value > 9999999999 ? 'milliseconds' : 'seconds';
  }

  // ========== 输入验证 ==========
  function validateTimestampInput() {
    var val = timestampInput.value.trim();
    if (!val) {
      tsDot.className = 'status-dot';
      tsStatusText.textContent = '等待输入';
      return;
    }
    if (/^\d{1,13}$/.test(val)) {
      var unit = getTimestampUnit(parseInt(val));
      var ms = unit === 'milliseconds' ? parseInt(val) : parseInt(val) * 1000;
      var date = new Date(ms);
      if (!isNaN(date.getTime())) {
        tsDot.className = 'status-dot valid';
        tsStatusText.textContent = '有效时间戳 (' + (unit === 'milliseconds' ? '毫秒' : '秒') + ')';
        return;
      }
    }
    tsDot.className = 'status-dot invalid';
    tsStatusText.textContent = '无效的时间戳';
  }

  // ========== 转换操作 ==========
  function convertToDate() {
    var val = timestampInput.value.trim();
    if (!val) { showNotification('请输入时间戳', 'error'); return; }
    var num = parseInt(val);
    if (isNaN(num)) { showNotification('请输入有效的数字时间戳', 'error'); return; }
    var unit = getTimestampUnit(num);
    var ms = unit === 'milliseconds' ? num : num * 1000;
    var date = new Date(ms);
    if (isNaN(date.getTime())) { showNotification('时间戳无效', 'error'); return; }
    // 设置 datetime-local（不含毫秒）
    var iso = date.toISOString().slice(0, 19);
    dateInput.value = iso;
    showResult(date);
    showNotification('转换成功');
  }

  function convertToTimestamp() {
    var ds = dateInput.value;
    if (!ds) { showNotification('请选择日期时间', 'error'); return; }
    var date = new Date(ds);
    timestampInput.value = Math.floor(date.getTime() / 1000);
    showResult(date);
    showNotification('转换成功');
  }

  function updateCurrentTimestamp() {
    var now = new Date();
    timestampInput.value = Math.floor(now.getTime() / 1000);
    dateInput.value = now.toISOString().slice(0, 19);
    showResult(now);
    validateTimestampInput();
    showNotification('已更新为当前时间');
  }

  // ========== 实时时钟 ==========
  function startClock() {
    function tick() {
      var now = new Date();
      liveSeconds.textContent = Math.floor(now.getTime() / 1000);
      liveMillis.textContent = now.getTime();
      liveDatetime.textContent = formatLocal(now);
    }
    tick();
    clockInterval = setInterval(tick, 1000);
  }

  // ========== 复制全部结果 ==========
  copyResultBtn.addEventListener('click', function() {
    var text = '秒级时间戳: ' + resultSeconds.textContent + '\n' +
               '毫秒级时间戳: ' + resultMillis.textContent + '\n' +
               'ISO 8601: ' + resultISO.textContent + '\n' +
               '本地时间: ' + resultLocal.textContent + '\n' +
               'UTC 时间: ' + resultUTC.textContent + '\n' +
               '相对时间: ' + resultRelative.textContent;
    copyToClipboard(text);
  });

  // ========== 事件绑定 ==========
  toDateBtn.addEventListener('click', convertToDate);
  toTimestampBtn.addEventListener('click', convertToTimestamp);
  currentTimestampBtn.addEventListener('click', updateCurrentTimestamp);
  timestampInput.addEventListener('input', validateTimestampInput);

  // 监听时间戳单位切换
  document.querySelectorAll('input[name="tsUnit"]').forEach(function(radio) {
    radio.addEventListener('change', validateTimestampInput);
  });

  // 初始化
  startClock();
  updateCurrentTimestamp();
});

