---
layout: single
title: "二维码生成"
author_profile: false
tool_js: "/assets/js/qrcode-tool.js"
sidebar:
  nav: "tools"
---

<div id="qrcodeApp">
  <div class="tool-notice">
    <h4><i class="fas fa-info-circle"></i>使用说明</h4>
    <p>输入文本或 URL，即可生成二维码图片。支持调整大小和颜色。</p>
  </div>

  <div class="tool-card">
    <div class="input-group">
      <label for="qrInput">输入内容</label>
      <textarea id="qrInput" placeholder="输入文本或 URL..." rows="3"></textarea>
    </div>

    <div class="options-panel">
      <label>
        尺寸：
        <select id="qrSize" style="padding:4px 8px;border:1px solid #e8e8e8;border-radius:4px;font-size:0.875rem;">
          <option value="128">128px</option>
          <option value="200">200px</option>
          <option value="256" selected>256px</option>
          <option value="512">512px</option>
        </select>
      </label>
      <label>
        前景色：
        <input type="color" id="qrFgColor" value="#000000" style="width:32px;height:28px;border:1px solid #e8e8e8;border-radius:4px;padding:1px;cursor:pointer;">
      </label>
      <label>
        背景色：
        <input type="color" id="qrBgColor" value="#ffffff" style="width:32px;height:28px;border:1px solid #e8e8e8;border-radius:4px;padding:1px;cursor:pointer;">
      </label>
    </div>

    <div class="btn-group">
      <button id="generateBtn" class="btn btn--primary">
        <i class="fas fa-qrcode"></i> 生成二维码
      </button>
      <button id="downloadBtn" class="btn btn--outline" disabled>
        <i class="fas fa-download"></i> 下载图片
      </button>
      <button id="clearBtn" class="btn btn--danger">
        <i class="fas fa-trash-alt"></i> 清空
      </button>
    </div>
  </div>

  <div class="tool-card qr-output" id="qrOutput" style="display:none;">
    <canvas id="qrCanvas"></canvas>
  </div>
</div>

<div class="notification" id="notification">
  <i class="fas fa-check-circle"></i>
  <span></span>
</div>

