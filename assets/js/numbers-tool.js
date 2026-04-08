document.addEventListener('DOMContentLoaded', function() {
  var input = document.getElementById('numberInput');
  var output = document.getElementById('numberOutput');
  var convertBtn = document.getElementById('convertBtn');
  var clearBtn = document.getElementById('clearBtn');
  var exampleBtn = document.getElementById('exampleBtn');
  var copyBtn = document.getElementById('copyBtn');
  var separator = document.getElementById('separator');
  var removeDuplicate = document.getElementById('removeDuplicate');
  var sortNumbers = document.getElementById('sortNumbers');
  var sortOrder = document.getElementById('sortOrder');
  var inputDot = document.getElementById('inputDot');
  var inputStatusText = document.getElementById('inputStatusText');
  var resultCard = document.getElementById('resultCard');
  var statCount = document.getElementById('statCount');
  var statSum = document.getElementById('statSum');
  var statAvg = document.getElementById('statAvg');
  var statMin = document.getElementById('statMin');
  var statMax = document.getElementById('statMax');
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

  // ========== 解析输入 ==========
  function parseNumbers(text) {
    return text.split(/[,;\n\r\t|]+/)
      .map(function(s) { return s.trim(); })
      .filter(function(s) { return s.length > 0 && !isNaN(s); });
  }

  function validateInput() {
    var val = input.value.trim();
    if (!val) {
      inputDot.className = 'status-dot';
      inputStatusText.textContent = '等待输入';
      convertBtn.disabled = true;
      return;
    }
    var nums = parseNumbers(val);
    if (nums.length === 0) {
      inputDot.className = 'status-dot invalid';
      inputStatusText.textContent = '未检测到有效数字';
      convertBtn.disabled = true;
    } else {
      inputDot.className = 'status-dot valid';
      inputStatusText.textContent = '检测到 ' + nums.length + ' 个数字';
      convertBtn.disabled = false;
    }
  }

  function convertNumbers() {
    var val = input.value.trim();
    if (!val) { showNotification('请输入数字', 'error'); return; }
    var numbers = parseNumbers(val);
    if (numbers.length === 0) { showNotification('未检测到有效数字', 'error'); return; }

    // 转为数字
    var nums = numbers.map(Number);

    // 去重
    if (removeDuplicate.checked) {
      var seen = new Set();
      nums = nums.filter(function(n) {
        if (seen.has(n)) return false;
        seen.add(n);
        return true;
      });
    }

    // 排序
    if (sortNumbers.checked) {
      var asc = sortOrder.value === 'asc';
      nums.sort(function(a, b) { return asc ? a - b : b - a; });
    }

    // 输出
    var sep = separator.value === '\\n' ? '\n' : separator.value;
    output.value = nums.join(sep);

    // 统计
    var sum = nums.reduce(function(a, b) { return a + b; }, 0);
    var avg = sum / nums.length;
    statCount.textContent = nums.length;
    statSum.textContent = Number.isInteger(sum) ? sum : sum.toFixed(2);
    statAvg.textContent = avg.toFixed(2);
    statMin.textContent = Math.min.apply(null, nums);
    statMax.textContent = Math.max.apply(null, nums);

    resultCard.style.display = '';
    showNotification('转换成功，共 ' + nums.length + ' 个数字');
  }

  function clearInput() {
    input.value = ''; output.value = '';
    convertBtn.disabled = true;
    resultCard.style.display = 'none';
    inputDot.className = 'status-dot';
    inputStatusText.textContent = '等待输入';
    showNotification('已清空');
  }

  function loadExample() {
    input.value = '1369597\n1447935\n1046117\n1080479\n1108924\n1263918\n1105949\n1216145\n1235458\n1241864\n1241865\n1241866\n1241867\n1241889\n1241891\n1241893\n1241895\n1241896\n1241897\n1242500';
    convertNumbers();
  }

  convertBtn.addEventListener('click', convertNumbers);
  clearBtn.addEventListener('click', clearInput);
  exampleBtn.addEventListener('click', loadExample);
  copyBtn.addEventListener('click', function() { copyToClipboard(output.value); });
  input.addEventListener('input', validateInput);

  // 初始化
  loadExample();
});

