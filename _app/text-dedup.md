---
layout: single
title: "文本去重"
author_profile: false
tool_js: "/assets/js/text-dedup-tool.js"
sidebar:
  nav: "tools"
---

<div id="textDedupApp">
  <div class="tool-notice">
    <h4><i class="fas fa-info-circle"></i>使用说明</h4>
    <p>按行去重，保留每行首次出现的记录。可选择是否忽略大小写和首尾空格。</p>
  </div>

  <div class="tool-card">
    <div class="input-group">
      <label for="dedupInput">输入文本（每行一条）</label>
      <textarea id="dedupInput" placeholder="每行输入一条内容..." rows="10"></textarea>
    </div>

    <div class="options-panel">
      <label>
        <input type="checkbox" id="ignoreCase"> 忽略大小写
      </label>
      <label>
        <input type="checkbox" id="trimSpaces" checked> 去除首尾空格
      </label>
      <label>
        <input type="checkbox" id="removeEmpty" checked> 去除空行
      </label>
    </div>

    <div class="btn-group">
      <button id="dedupBtn" class="btn btn--primary">
        <i class="fas fa-filter"></i> 去重
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
      <label for="dedupOutput">去重结果</label>
      <textarea id="dedupOutput" readonly rows="10"></textarea>
      <button class="btn btn--outline copy-btn" id="copyBtn">
        <i class="far fa-copy"></i> 复制
      </button>
    </div>
    <div class="info-grid" style="margin-top:12px;">
      <div class="info-item">
        <span class="info-label">原始行数</span>
        <span class="info-value" id="origCount">0</span>
      </div>
      <div class="info-item">
        <span class="info-label">去重后</span>
        <span class="info-value" id="dedupCount">0</span>
      </div>
      <div class="info-item">
        <span class="info-label">移除</span>
        <span class="info-value" id="removedCount">0</span>
      </div>
    </div>
  </div>
</div>

<div class="notification" id="notification">
  <i class="fas fa-check-circle"></i>
  <span></span>
</div>

