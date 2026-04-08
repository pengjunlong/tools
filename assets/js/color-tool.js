document.addEventListener('DOMContentLoaded', function() {
  var hexInput = document.getElementById('hexInput');
  var rgbInput = document.getElementById('rgbInput');
  var hslInput = document.getElementById('hslInput');
  var colorPicker = document.getElementById('colorPicker');
  var colorPreview = document.getElementById('colorPreview');
  var copyHex = document.getElementById('copyHex');
  var copyRgb = document.getElementById('copyRgb');
  var copyHsl = document.getElementById('copyHsl');
  var swatchesContainer = document.getElementById('colorSwatches');
  var notification = document.getElementById('notification');

  function showNotification(msg, type) {
    var icon = type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle';
    notification.innerHTML = '<i class="fas ' + icon + '"></i> <span>' + msg + '</span>';
    notification.className = 'notification' + (type === 'error' ? ' error' : '');
    notification.classList.add('show');
    setTimeout(function() { notification.classList.remove('show'); }, 3000);
  }

  async function copyToClipboard(text) {
    try { await navigator.clipboard.writeText(text); showNotification('已复制: ' + text); }
    catch (err) { showNotification('复制失败', 'error'); }
  }

  // Color conversion functions
  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(function(c) { return c + c; }).join('');
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    return { r: r, g: g, b: b };
  }

  function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(function(c) { return c.toString(16).padStart(2, '0'); }).join('');
  }

  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  function hslToRgb(h, s, l) {
    h /= 360; s /= 100; l /= 100;
    var r, g, b;
    if (s === 0) { r = g = b = l; }
    else {
      function hue2rgb(p, q, t) {
        if (t < 0) t += 1; if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      }
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  }

  function parseRgb(str) {
    var m = str.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (!m) return null;
    return { r: parseInt(m[1]), g: parseInt(m[2]), b: parseInt(m[3]) };
  }

  function parseHsl(str) {
    var m = str.match(/(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?/);
    if (!m) return null;
    return { h: parseInt(m[1]), s: parseInt(m[2]), l: parseInt(m[3]) };
  }

  function isValidHex(hex) { return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex); }

  // Update all from RGB
  function updateFromRgb(r, g, b) {
    hexInput.value = rgbToHex(r, g, b);
    rgbInput.value = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    var hsl = rgbToHsl(r, g, b);
    hslInput.value = 'hsl(' + hsl.h + ', ' + hsl.s + '%, ' + hsl.l + '%)';
    colorPreview.style.background = rgbToHex(r, g, b);
    colorPicker.value = rgbToHex(r, g, b);
  }

  // Event listeners
  hexInput.addEventListener('input', function() {
    var val = hexInput.value.trim();
    if (!isValidHex(val)) return;
    var rgb = hexToRgb(val);
    updateFromRgb(rgb.r, rgb.g, rgb.b);
  });

  rgbInput.addEventListener('input', function() {
    var rgb = parseRgb(rgbInput.value);
    if (!rgb) return;
    if (rgb.r > 255 || rgb.g > 255 || rgb.b > 255) return;
    updateFromRgb(rgb.r, rgb.g, rgb.b);
  });

  hslInput.addEventListener('input', function() {
    var hsl = parseHsl(hslInput.value);
    if (!hsl) return;
    if (hsl.h > 360 || hsl.s > 100 || hsl.l > 100) return;
    var rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
    updateFromRgb(rgb.r, rgb.g, rgb.b);
  });

  colorPicker.addEventListener('input', function() {
    var rgb = hexToRgb(colorPicker.value);
    updateFromRgb(rgb.r, rgb.g, rgb.b);
  });

  copyHex.addEventListener('click', function() { copyToClipboard(hexInput.value); });
  copyRgb.addEventListener('click', function() { copyToClipboard(rgbInput.value); });
  copyHsl.addEventListener('click', function() { copyToClipboard(hslInput.value); });

  // Preset swatches
  var presets = [
    '#e74c3c','#e67e22','#f1c40f','#2ecc71','#1abc9c','#3498db','#9b59b6','#34495e',
    '#c0392b','#d35400','#f39c12','#27ae60','#16a085','#2980b9','#8e44ad','#2c3e50',
    '#ecf0f1','#bdc3c7','#95a5a6','#7f8c8d','#000000','#333333','#666666','#999999',
    '#6c9e3b','#c0392b','#8e44ad','#2980b9','#e67e22','#1abc9c'
  ];

  presets.forEach(function(color) {
    var swatch = document.createElement('div');
    swatch.className = 'color-swatch';
    swatch.style.background = color;
    swatch.title = color;
    swatch.addEventListener('click', function() {
      var rgb = hexToRgb(color);
      updateFromRgb(rgb.r, rgb.g, rgb.b);
    });
    swatchesContainer.appendChild(swatch);
  });

  // Initialize
  updateFromRgb(108, 158, 59);
});

