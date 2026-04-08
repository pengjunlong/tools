---
layout: single-tool
title: "大小写转换"
permalink: /tools/case-convert/
author_profile: false
tool_js: "/assets/js/case-convert-tool.js"
sidebar:
  nav: "tools"
---

<div id="caseConvertApp">
  <div class="tool-notice">
    <h4><i class="fas fa-info-circle"></i>使用说明</h4>
    <p>输入文本后点击对应按钮即可转换。支持大小写切换、命名风格转换（驼峰、下划线、短横线）。</p>
  </div>

  <div class="tool-card">
    <div class="input-group">
      <label for="caseInput">输入文本</label>
      <textarea id="caseInput" placeholder="输入需要转换的文本..." rows="4"></textarea>
    </div>

    <div class="btn-group">
      <button data-mode="upper" class="btn btn--primary case-btn"><i class="fas fa-arrow-up"></i> 全大写</button>
      <button data-mode="lower" class="btn btn--primary case-btn"><i class="fas fa-arrow-down"></i> 全小写</button>
      <button data-mode="title" class="btn btn--primary case-btn"><i class="fas fa-heading"></i> 首字母大写</button>
      <button data-mode="sentence" class="btn btn--primary case-btn"><i class="fas fa-paragraph"></i> 句首大写</button>
      <button data-mode="toggle" class="btn btn--outline case-btn"><i class="fas fa-exchange-alt"></i> 大小写互换</button>
    </div>

    <div class="btn-group" style="margin-top:0;">
      <button data-mode="camelCase" class="btn btn--outline case-btn"><i class="fas fa-code"></i> camelCase</button>
      <button data-mode="pascalCase" class="btn btn--outline case-btn"><i class="fas fa-code"></i> PascalCase</button>
      <button data-mode="snakeCase" class="btn btn--outline case-btn"><i class="fas fa-code"></i> snake_case</button>
      <button data-mode="kebabCase" class="btn btn--outline case-btn"><i class="fas fa-code"></i> kebab-case</button>
      <button data-mode="constantCase" class="btn btn--outline case-btn"><i class="fas fa-code"></i> CONSTANT_CASE</button>
    </div>
  </div>

  <div class="tool-card" id="resultCard" style="display:none;">
    <div class="result-container">
      <label for="caseOutput">转换结果</label>
      <textarea id="caseOutput" readonly rows="4"></textarea>
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

