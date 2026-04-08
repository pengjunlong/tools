---
layout: single
title: "Unicode 转换"
permalink: /tools/unicode/
author_profile: false
tool_js: "/assets/js/unicode-tool.js"
sidebar:
  nav: "tools"
---

<div id="unicodeApp">
  <div class="tool-notice">
    <h4><i class="fas fa-info-circle"></i>使用说明</h4>
    <p>在字符与 Unicode 码点之间互转。支持 \uXXXX、\UXXXXXXXX、HTML 实体等多种格式。</p>
  </div>

  <div class="tool-card">
    <div class="input-group">
      <label for="unicodeInput">输入内容</label>
      <textarea id="unicodeInput" placeholder="输入字符或 Unicode 转义序列..." rows="4"></textarea>
    </div>

    <div class="btn-group">
      <button id="toUnicodeBtn" class="btn btn--primary">
        <i class="fas fa-arrow-right"></i> 字符 → Unicode
      </button>
      <button id="toCharBtn" class="btn btn--primary">
        <i class="fas fa-arrow-left"></i> Unicode → 字符
      </button>
      <button id="toHtmlBtn" class="btn btn--outline">
        <i class="fas fa-code"></i> 转 HTML 实体
      </button>
      <button id="toJsBtn" class="btn btn--outline">
        <i class="fab fa-js"></i> 转 JS 转义
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
      <label for="unicodeOutput">转换结果</label>
      <textarea id="unicodeOutput" readonly rows="4"></textarea>
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

