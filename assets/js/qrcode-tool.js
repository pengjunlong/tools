document.addEventListener('DOMContentLoaded', function() {
  var input = document.getElementById('qrInput');
  var sizeSelect = document.getElementById('qrSize');
  var eclSelect = document.getElementById('qrEcl');
  var fgColor = document.getElementById('qrFgColor');
  var bgColor = document.getElementById('qrBgColor');
  var generateBtn = document.getElementById('generateBtn');
  var downloadBtn = document.getElementById('downloadBtn');
  var clearBtn = document.getElementById('clearBtn');
  var qrOutput = document.getElementById('qrOutput');
  var canvas = document.getElementById('qrCanvas');
  var notification = document.getElementById('notification');

  function showNotification(msg, type) {
    var icon = type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle';
    notification.innerHTML = '<i class="fas ' + icon + '"></i> <span>' + msg + '</span>';
    notification.className = 'notification' + (type === 'error' ? ' error' : '');
    notification.classList.add('show');
    setTimeout(function() { notification.classList.remove('show'); }, 3000);
  }

  // Error correction level mapping
  var eclMap = { L: 1, M: 0, Q: 3, H: 2 };

  // Convert string to UTF-8 byte string for qrcode-generator
  function toUTF8ByteString(str) {
    var encoder = new TextEncoder();
    var bytes = encoder.encode(str);
    var result = '';
    for (var i = 0; i < bytes.length; i++) {
      result += String.fromCharCode(bytes[i]);
    }
    return result;
  }

  function generateQR(text, displaySize, eclLevel, fg, bg) {
    if (typeof qrcode === 'undefined') {
      throw new Error('QR 库未加载，请检查网络');
    }
    var ecl = eclMap[eclLevel] !== undefined ? eclMap[eclLevel] : 0;
    var qr = qrcode(0, ecl);
    qr.addData(toUTF8ByteString(text), 'Byte');
    qr.make();

    var moduleCount = qr.getModuleCount();
    var margin = 4;
    var totalModules = moduleCount + margin * 2;
    var cellSize = displaySize / totalModules;

    canvas.width = displaySize;
    canvas.height = displaySize;
    var ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, displaySize, displaySize);

    // Modules
    ctx.fillStyle = fg;
    for (var row = 0; row < moduleCount; row++) {
      for (var col = 0; col < moduleCount; col++) {
        if (qr.isDark(row, col)) {
          ctx.fillRect(
            Math.round((col + margin) * cellSize),
            Math.round((row + margin) * cellSize),
            Math.ceil(cellSize),
            Math.ceil(cellSize)
          );
        }
      }
    }
  }

  function doGenerate() {
    var text = input.value.trim();
    if (!text) {
      showNotification('请输入内容', 'error');
      return;
    }
    try {
      var size = parseInt(sizeSelect.value) || 256;
      generateQR(text, size, eclSelect.value, fgColor.value, bgColor.value);
      qrOutput.style.display = '';
      downloadBtn.disabled = false;
      showNotification('二维码已生成');
    } catch (e) {
      showNotification('生成失败: ' + e.message, 'error');
      downloadBtn.disabled = true;
    }
  }

  generateBtn.addEventListener('click', doGenerate);

  downloadBtn.addEventListener('click', function() {
    var link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    showNotification('下载成功');
  });

  clearBtn.addEventListener('click', function() {
    input.value = '';
    qrOutput.style.display = 'none';
    downloadBtn.disabled = true;
    showNotification('已清空');
  });

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); doGenerate(); }
  });
});

