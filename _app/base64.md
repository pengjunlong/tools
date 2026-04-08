---
layout: single
title: "Base64 编码工具"
author_profile: false
tool_js: "/assets/js/base64-tool.js"
sidebar:
  nav: "tools"
---

<div id="base64App">
  <div class="tool-notice">
    <h4><i class="fas fa-info-circle"></i>使用说明</h4>
    <p>对文本进行 Base64 编码或解码，支持 UTF-8 中文字符，自动检测输入类型。</p>
  </div>

  <div class="tool-card">
    <div class="input-group">
      <label for="base64Input">输入内容</label>
      <textarea id="base64Input" placeholder="输入需要编码的文本，或需要解码的 Base64 字符串..." rows="6"></textarea>
      <div class="status-bar">
        <span class="status-dot" id="inputDot"></span>
        <span id="inputStatusText">等待输入</span>
      </div>
    </div>

    <div class="options-panel">
      <label>
        输出换行：
        <select id="lineBreak" style="padding:4px 8px;border:1px solid #e8e8e8;border-radius:4px;font-size:0.875rem;">
          <option value="none">不换行</option>
          <option value="76">每 76 字符（MIME 标准）</option>
          <option value="64">每 64 字符</option>
        </select>
      </label>
      <label>
        <input type="checkbox" id="urlSafe"> URL 安全模式（- _ 替代 + /）
      </label>
    </div>

    <div class="btn-group">
      <button id="encodeBtn" class="btn btn--primary">
        <i class="fas fa-lock"></i> 编码
      </button>
      <button id="decodeBtn" class="btn btn--primary">
        <i class="fas fa-unlock"></i> 解码
      </button>
      <button id="swapBtn" class="btn btn--outline">
        <i class="fas fa-exchange-alt"></i> 交换输入输出
      </button>
      <button id="clearBtn" class="btn btn--danger">
        <i class="fas fa-trash-alt"></i> 清空
      </button>
      <button id="exampleBtn" class="btn btn--light">
        <i class="fas fa-lightbulb"></i> 示例
      </button>
    </div>
  </div>

  <div class="tool-card" id="resultCard" style="display:none;">
    <div class="result-container">
      <label for="base64Output">输出结果</label>
      <textarea id="base64Output" readonly placeholder="结果将显示在这里..." rows="6"></textarea>
      <button class="btn btn--outline copy-btn" id="copyBtn">
        <i class="far fa-copy"></i> 复制
      </button>
    </div>
    <div class="info-grid" id="base64Info" style="margin-top:12px;">
      <div class="info-item">
        <span class="info-label">输入长度</span>
        <span class="info-value" id="infoInputLen">-</span>
      </div>
      <div class="info-item">
        <span class="info-label">输出长度</span>
        <span class="info-value" id="infoOutputLen">-</span>
      </div>
      <div class="info-item">
        <span class="info-label">操作</span>
        <span class="info-value" id="infoOperation">-</span>
      </div>
    </div>
  </div>
</div>

<div class="notification" id="notification">
  <i class="fas fa-check-circle"></i>
  <span></span>
</div>

