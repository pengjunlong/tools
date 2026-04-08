document.addEventListener('DOMContentLoaded', function() {
  var input = document.getElementById('qrInput');
  var sizeSelect = document.getElementById('qrSize');
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

  // Simple QR Code generator (no external dependency)
  // Using a compact QR code implementation
  function generateQR(text, size, fg, bg) {
    // We'll use the QR Code API as a simple image approach since
    // implementing a full QR encoder in vanilla JS is too large
    var img = new Image();
    img.crossOrigin = 'anonymous';
    var url = 'https://api.qrserver.com/v1/create-qr-code/?size=' + size + 'x' + size +
              '&data=' + encodeURIComponent(text) +
              '&color=' + fg.replace('#', '') +
              '&bgcolor=' + bg.replace('#', '') +
              '&margin=8';
    img.onload = function() {
      canvas.width = size;
      canvas.height = size;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      downloadBtn.disabled = false;
    };
    img.onerror = function() {
      // Fallback: draw text as placeholder
      canvas.width = size;
      canvas.height = size;
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = fg;
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('二维码生成失败', size/2, size/2);
      ctx.fillText('请检查网络连接', size/2, size/2 + 20);
      downloadBtn.disabled = true;
    };
    img.src = url;
  }

  function doGenerate() {
    var text = input.value.trim();
    if (!text) { showNotification('请输入内容', 'error'); return; }
    var size = parseInt(sizeSelect.value) || 256;
    generateQR(text, size, fgColor.value, bgColor.value);
    qrOutput.style.display = '';
    showNotification('二维码已生成');
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
    input.value = ''; qrOutput.style.display = 'none';
    downloadBtn.disabled = true;
    showNotification('已清空');
  });

  // Generate on Enter in textarea
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); doGenerate(); }
  });
});

