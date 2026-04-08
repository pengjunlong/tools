---
layout: single-tool
title: "URL 编解码"
permalink: /tools/url-encode/
author_profile: false
tool_js: "/assets/js/url-encode-tool.js"
sidebar:
  nav: "tools"
---

<div id="urlEncodeApp">
  <div class="tool-notice">
    <h4><i class="fas fa-info-circle"></i>使用说明</h4>
    <p>对 URL 进行编码或解码。支持完整 URL 编码和组件编码两种模式。</p>
  </div>

  <div class="tool-card">
    <div class="input-group">
      <label for="urlInput">输入内容</label>
      <textarea id="urlInput" placeholder="输入需要编码的 URL 或已编码的字符串..." rows="4"></textarea>
    </div>

    <div class="options-panel">
      <label>
        <input type="radio" name="encodeMode" value="component" checked> 组件编码（编码空格为 %20）
      </label>
      <label>
        <input type="radio" name="encodeMode" value="uri"> URI 编码（编码空格为 +）
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
        <i class="fas fa-exchange-alt"></i> 交换
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
      <label for="urlOutput">输出结果</label>
      <textarea id="urlOutput" readonly rows="4"></textarea>
      <button class="btn btn--outline copy-btn" id="copyBtn">
        <i class="far fa-copy"></i> 复制
      </button>
    </div>
  </div>
</div>

<div class="notification" id="notification">
  <i class="fas fa-check-circle"></i>
  <span></span>
</div>

