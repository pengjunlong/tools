document.addEventListener('DOMContentLoaded', function() {
  var input = document.getElementById('jsonInput');
  var output = document.getElementById('jsonOutput');
  var formatBtn = document.getElementById('formatBtn');
  var compressBtn = document.getElementById('compressBtn');
  var validateBtn = document.getElementById('validateBtn');
  var clearBtn = document.getElementById('clearBtn');
  var exampleBtn = document.getElementById('exampleBtn');
  var copyBtn = document.getElementById('copyBtn');
  var indentSize = document.getElementById('indentSize');
  var sortKeys = document.getElementById('sortKeys');
  var preserveEscape = document.getElementById('preserveEscape');
  var inputDot = document.getElementById('inputDot');
  var inputStatusText = document.getElementById('inputStatusText');
  var outputDot = document.getElementById('outputDot');
  var outputStatusText = document.getElementById('outputStatusText');
  var viewTabs = document.getElementById('viewTabs');
  var textTab = document.getElementById('textTab');
  var treeTab = document.getElementById('treeTab');
  var textView = document.getElementById('textView');
  var treeView = document.getElementById('treeView');
  var treeContainer = document.getElementById('treeContainer');
  var expandAllBtn = document.getElementById('expandAllBtn');
  var collapseAllBtn = document.getElementById('collapseAllBtn');
  var copyTreeBtn = document.getElementById('copyTreeBtn');
  var jsonInfo = document.getElementById('jsonInfo');
  var jsonType = document.getElementById('jsonType');
  var jsonSize = document.getElementById('jsonSize');
  var jsonKeys = document.getElementById('jsonKeys');
  var jsonDepth = document.getElementById('jsonDepth');
  var resultCard = document.getElementById('resultCard');
  var pathQuery = document.getElementById('pathQuery');
  var notification = document.getElementById('notification');

  var treeData = null;
  var expandedNodes = new Set();

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
    try {
      await navigator.clipboard.writeText(text);
      showNotification('已复制到剪贴板');
    } catch (err) { showNotification('复制失败', 'error'); }
  }

  // ========== 状态更新 ==========
  function updateInputStatus(type, msg) {
    inputDot.className = 'status-dot ' + type;
    inputStatusText.textContent = msg;
  }
  function updateOutputStatus(type, msg) {
    outputDot.className = 'status-dot ' + type;
    outputStatusText.textContent = msg;
  }

  // ========== 实时验证 ==========
  function validateInputRealtime() {
    var value = input.value.trim();
    if (!value) {
      updateInputStatus('', '等待输入');
      formatBtn.disabled = true; compressBtn.disabled = true; validateBtn.disabled = true;
      return;
    }
    try {
      JSON.parse(value);
      updateInputStatus('valid', 'JSON 格式正确');
      formatBtn.disabled = false; compressBtn.disabled = false; validateBtn.disabled = false;
    } catch (e) {
      updateInputStatus('invalid', '格式错误: ' + e.message);
      formatBtn.disabled = false; compressBtn.disabled = true; validateBtn.disabled = false;
    }
  }

  // ========== JSON 工具函数 ==========
  function sortObjectKeys(obj) {
    if (Array.isArray(obj)) return obj.map(sortObjectKeys);
    if (obj !== null && typeof obj === 'object') {
      var sorted = {};
      Object.keys(obj).sort().forEach(function(k) { sorted[k] = sortObjectKeys(obj[k]); });
      return sorted;
    }
    return obj;
  }

  function escapeStringWithPreservation(str) {
    var escaped = JSON.stringify(str);
    if (str.includes('\\')) {
      var map = { '\\n': '\\n', '\\t': '\\t', '\\r': '\\r', '\\"': '\\"', '\\\\': '\\\\', '\\/': '\\/' };
      for (var seq in map) {
        if (str.includes(seq)) {
          escaped = escaped.replace(new RegExp(seq.replace(/\\/g, '\\\\'), 'g'), map[seq]);
        }
      }
    }
    return escaped;
  }

  function stringifyWithEscapes(obj, indent) {
    var space = indent > 0 ? ' '.repeat(indent) : '';
    var newline = indent > 0 ? '\n' : '';
    return stringifyValue(obj, 0, space, newline);
  }

  function stringifyValue(value, depth, space, newline) {
    if (value === null) return 'null';
    if (typeof value === 'boolean' || typeof value === 'number') return String(value);
    if (typeof value === 'string') return preserveEscape.checked ? escapeStringWithPreservation(value) : JSON.stringify(value);
    if (Array.isArray(value)) return stringifyArray(value, depth, space, newline);
    if (typeof value === 'object') return stringifyObject(value, depth, space, newline);
    return JSON.stringify(value);
  }

  function stringifyArray(arr, depth, space, newline) {
    if (arr.length === 0) return '[]';
    var indent = space ? space.repeat(depth + 1) : '';
    var closeIndent = space ? space.repeat(depth) : '';
    var items = arr.map(function(item) { return indent + stringifyValue(item, depth + 1, space, newline); });
    return '[' + newline + items.join(',' + newline) + newline + closeIndent + ']';
  }

  function stringifyObject(obj, depth, space, newline) {
    var keys = Object.keys(obj);
    if (keys.length === 0) return '{}';
    var indent = space ? space.repeat(depth + 1) : '';
    var closeIndent = space ? space.repeat(depth) : '';
    var items = keys.map(function(key) {
      var keyStr = preserveEscape.checked ? escapeStringWithPreservation(key) : JSON.stringify(key);
      return indent + keyStr + ': ' + stringifyValue(obj[key], depth + 1, space, newline);
    });
    return '{' + newline + items.join(',' + newline) + newline + closeIndent + '}';
  }

  // ========== 核心操作 ==========
  function formatJson() {
    var val = input.value.trim();
    if (!val) { showNotification('请输入 JSON 数据', 'error'); return; }
    try {
      var jsonObj = JSON.parse(val);
      if (sortKeys.checked) jsonObj = sortObjectKeys(jsonObj);
      var indent = parseInt(indentSize.value) || 2;
      var formatted = preserveEscape.checked ? stringifyWithEscapes(jsonObj, indent) : JSON.stringify(jsonObj, null, indent);
      output.value = formatted;
      treeData = jsonObj;
      resultCard.style.display = '';
      updateOutputStatus('valid', '格式化成功 (' + formatted.length + ' 字符)');
      updateJsonInfo(jsonObj, formatted);
      showViewTabs();
      showNotification('JSON 格式化成功');
    } catch (e) {
      resultCard.style.display = '';
      updateOutputStatus('invalid', '格式化失败: ' + e.message);
      showNotification('JSON 格式化失败: ' + e.message, 'error');
      hideJsonInfo(); hideViewTabs();
    }
  }

  function compressJson() {
    var val = input.value.trim();
    if (!val) { showNotification('请输入 JSON 数据', 'error'); return; }
    try {
      var jsonObj = JSON.parse(val);
      if (sortKeys.checked) jsonObj = sortObjectKeys(jsonObj);
      var compressed = preserveEscape.checked ? stringifyWithEscapes(jsonObj, 0) : JSON.stringify(jsonObj);
      output.value = compressed;
      treeData = jsonObj;
      resultCard.style.display = '';
      updateOutputStatus('valid', '压缩成功 (' + compressed.length + ' 字符)');
      updateJsonInfo(jsonObj, compressed);
      showViewTabs();
      showNotification('JSON 压缩成功');
    } catch (e) {
      resultCard.style.display = '';
      updateOutputStatus('invalid', '压缩失败: ' + e.message);
      showNotification('JSON 压缩失败: ' + e.message, 'error');
      hideJsonInfo(); hideViewTabs();
    }
  }

  function validateJson() {
    var val = input.value.trim();
    if (!val) { showNotification('请输入 JSON 数据', 'error'); return; }
    try {
      var jsonObj = JSON.parse(val);
      updateInputStatus('valid', 'JSON 格式正确');
      resultCard.style.display = '';
      updateJsonInfo(jsonObj, val);
      showNotification('JSON 格式验证通过');
    } catch (e) {
      updateInputStatus('invalid', 'JSON 格式错误: ' + e.message);
      resultCard.style.display = '';
      showNotification('JSON 验证失败: ' + e.message, 'error');
      hideJsonInfo();
    }
  }

  function clearInput() {
    input.value = ''; output.value = ''; treeData = null; expandedNodes.clear();
    pathQuery.value = '';
    updateInputStatus('', '等待输入');
    updateOutputStatus('', '等待处理');
    hideJsonInfo(); hideViewTabs(); switchView('text');
    resultCard.style.display = 'none';
    formatBtn.disabled = true; compressBtn.disabled = true; validateBtn.disabled = true;
    showNotification('已清空');
  }

  function loadExample() {
    input.value = '{\n  "name": "张三",\n  "age": 30,\n  "city": "北京",\n  "hobbies": ["阅读", "游泳", "编程"],\n  "address": {\n    "street": "中关村大街1号",\n    "zipCode": "100080",\n    "coordinates": {\n      "latitude": 39.9042,\n      "longitude": 116.4074\n    }\n  },\n  "isActive": true,\n  "balance": 1250.75,\n  "friends": [\n    { "name": "李四", "age": 28, "relation": "同事" },\n    { "name": "王五", "age": 32, "relation": "朋友" }\n  ],\n  "metadata": {\n    "createdAt": "2023-01-15T10:30:00Z",\n    "version": "1.2.0"\n  }\n}';
    validateInputRealtime();
    formatJson();
  }

  // ========== 路径查询 ==========
  function queryPath(path) {
    if (!treeData || !path.trim()) return;
    try {
      var parts = path.trim().replace(/^\$\.?/, '').split(/\.|\[|\]/).filter(function(s) { return s.length > 0; });
      var current = treeData;
      for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        if (/^\d+$/.test(part)) {
          current = current[parseInt(part)];
        } else {
          current = current[part];
        }
        if (current === undefined) {
          output.value = '路径未找到: ' + path;
          updateOutputStatus('invalid', '路径不存在');
          return;
        }
      }
      var result = typeof current === 'object' ? JSON.stringify(current, null, 2) : String(current);
      output.value = result;
      switchView('text');
      updateOutputStatus('valid', '查询成功');
      showNotification('路径查询成功');
    } catch (e) {
      output.value = '查询错误: ' + e.message;
      updateOutputStatus('invalid', '路径格式错误');
      showNotification('路径格式错误', 'error');
    }
  }

  // ========== 视图切换 ==========
  function showViewTabs() { viewTabs.style.display = 'flex'; }
  function hideViewTabs() { viewTabs.style.display = 'none'; }
  function switchView(vt) {
    textTab.classList.toggle('active', vt === 'text');
    treeTab.classList.toggle('active', vt === 'tree');
    textView.style.display = vt === 'text' ? 'block' : 'none';
    treeView.style.display = vt === 'tree' ? 'block' : 'none';
    if (vt === 'tree' && treeData) renderTreeView();
  }

  function escapeHtml(t) { var d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

  // ========== 树状视图 ==========
  function renderTreeView() {
    if (!treeData) { treeContainer.innerHTML = '<div class="tree-placeholder">请先格式化 JSON 数据</div>'; return; }
    treeContainer.innerHTML = renderTreeNode(treeData, '', true);
    bindTreeEvents();
  }

  function renderTreeNode(data, path, isRoot) {
    var nodeId = path || 'root';
    var isExpanded = expandedNodes.has(nodeId) || isRoot;
    if (Array.isArray(data)) return renderArrayNode(data, path, isExpanded);
    if (data !== null && typeof data === 'object') return renderObjectNode(data, path, isExpanded);
    return renderValueNode(data);
  }

  function renderObjectNode(obj, path, isExpanded) {
    var nodeId = path || 'root'; var keys = Object.keys(obj); var isEmpty = keys.length === 0;
    var html = '<div class="tree-node object-node">';
    if (!isEmpty) html += '<span class="tree-toggle ' + (isExpanded ? 'expanded' : '') + '" data-node-id="' + nodeId + '"><i class="fas ' + (isExpanded ? 'fa-minus-square' : 'fa-plus-square') + '"></i></span>';
    html += '<span class="tree-bracket">{</span><span class="tree-info">' + keys.length + ' keys</span>';
    if (!isEmpty && isExpanded) {
      html += '<div class="tree-children">';
      keys.forEach(function(key, i) {
        var cp = path ? path + '.' + key : key;
        html += '<div class="tree-item"><span class="tree-key">"' + escapeHtml(key) + '"</span><span class="tree-colon">:</span>' + renderTreeNode(obj[key], cp) + (i < keys.length - 1 ? '<span class="tree-comma">,</span>' : '') + '</div>';
      });
      html += '</div>';
    }
    html += '<span class="tree-bracket">}</span></div>';
    return html;
  }

  function renderArrayNode(arr, path, isExpanded) {
    var nodeId = path || 'root'; var isEmpty = arr.length === 0;
    var html = '<div class="tree-node array-node">';
    if (!isEmpty) html += '<span class="tree-toggle ' + (isExpanded ? 'expanded' : '') + '" data-node-id="' + nodeId + '"><i class="fas ' + (isExpanded ? 'fa-minus-square' : 'fa-plus-square') + '"></i></span>';
    html += '<span class="tree-bracket">[</span><span class="tree-info">' + arr.length + ' items</span>';
    if (!isEmpty && isExpanded) {
      html += '<div class="tree-children">';
      arr.forEach(function(item, i) {
        var cp = path + '[' + i + ']';
        html += '<div class="tree-item"><span class="tree-index">[' + i + ']</span>' + renderTreeNode(item, cp) + (i < arr.length - 1 ? '<span class="tree-comma">,</span>' : '') + '</div>';
      });
      html += '</div>';
    }
    html += '<span class="tree-bracket">]</span></div>';
    return html;
  }

  function renderValueNode(value) {
    var className, displayValue;
    if (value === null) { className = 'tree-value null-value'; displayValue = 'null'; }
    else if (typeof value === 'string') { className = 'tree-value string-value'; displayValue = preserveEscape.checked ? escapeStringWithPreservation(value) : JSON.stringify(value); }
    else if (typeof value === 'boolean') { className = 'tree-value boolean-value'; displayValue = value.toString(); }
    else if (typeof value === 'number') { className = 'tree-value number-value'; displayValue = String(value); }
    else { className = 'tree-value'; displayValue = String(value); }
    return '<span class="' + className + '">' + escapeHtml(displayValue) + '</span>';
  }

  function bindTreeEvents() {
    treeContainer.querySelectorAll('.tree-toggle').forEach(function(t) {
      t.addEventListener('click', function(e) {
        e.stopPropagation();
        var id = t.dataset.nodeId;
        if (expandedNodes.has(id)) expandedNodes.delete(id); else expandedNodes.add(id);
        renderTreeView();
      });
    });
  }

  function collectAllNodeIds(data, path) {
    var ids = [];
    if (Array.isArray(data)) { if (path) ids.push(path); data.forEach(function(item, i) { ids = ids.concat(collectAllNodeIds(item, path + '[' + i + ']')); }); }
    else if (data !== null && typeof data === 'object') { if (path) ids.push(path); Object.keys(data).forEach(function(k) { ids = ids.concat(collectAllNodeIds(data[k], path ? path + '.' + k : k)); }); }
    return ids;
  }

  function expandAll() { collectAllNodeIds(treeData, '').forEach(function(id) { expandedNodes.add(id); }); renderTreeView(); showNotification('已展开所有节点'); }
  function collapseAll() { expandedNodes.clear(); renderTreeView(); showNotification('已折叠所有节点'); }

  // ========== JSON 信息 ==========
  function updateJsonInfo(obj, str) {
    jsonType.textContent = Array.isArray(obj) ? '数组' : obj === null ? 'null' : typeof obj === 'object' ? '对象' : typeof obj;
    var bytes = new Blob([str]).size;
    jsonSize.textContent = bytes < 1024 ? bytes + ' B' : (bytes / 1024).toFixed(2) + ' KB';
    function countKeys(o) { var c = 0; if (Array.isArray(o)) o.forEach(function(x) { c += countKeys(x); }); else if (o !== null && typeof o === 'object') { c += Object.keys(o).length; Object.values(o).forEach(function(v) { c += countKeys(v); }); } return c; }
    function maxDepth(o, d) { if (d === undefined) d = 0; if (Array.isArray(o)) return Math.max(d, o.length ? Math.max.apply(null, o.map(function(x) { return maxDepth(x, d + 1); })) : d); if (o !== null && typeof o === 'object') { var vals = Object.values(o); return Math.max(d, vals.length ? Math.max.apply(null, vals.map(function(v) { return maxDepth(v, d + 1); })) : d); } return d; }
    jsonKeys.textContent = countKeys(obj);
    jsonDepth.textContent = maxDepth(obj);
    jsonInfo.style.display = '';
  }
  function hideJsonInfo() { jsonInfo.style.display = 'none'; }

  function autoReformat() { if (output.value && !formatBtn.disabled) formatJson(); }

  // ========== 事件绑定 ==========
  formatBtn.addEventListener('click', formatJson);
  compressBtn.addEventListener('click', compressJson);
  validateBtn.addEventListener('click', validateJson);
  clearBtn.addEventListener('click', clearInput);
  exampleBtn.addEventListener('click', loadExample);
  copyBtn.addEventListener('click', function() { copyToClipboard(output.value); });
  copyTreeBtn.addEventListener('click', function() {
    if (!treeData) { showNotification('没有数据可复制', 'error'); return; }
    copyToClipboard(preserveEscape.checked ? stringifyWithEscapes(treeData, 2) : JSON.stringify(treeData, null, 2));
  });
  input.addEventListener('input', validateInputRealtime);
  indentSize.addEventListener('change', autoReformat);
  sortKeys.addEventListener('change', autoReformat);
  preserveEscape.addEventListener('change', autoReformat);
  textTab.addEventListener('click', function() { switchView('text'); });
  treeTab.addEventListener('click', function() { switchView('tree'); });
  expandAllBtn.addEventListener('click', expandAll);
  collapseAllBtn.addEventListener('click', collapseAll);
  pathQuery.addEventListener('keydown', function(e) { if (e.key === 'Enter') queryPath(pathQuery.value); });
});

