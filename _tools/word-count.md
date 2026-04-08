---
layout: single
title: "字数统计"
permalink: /tools/word-count/
author_profile: false
tool_js: "/assets/js/word-count-tool.js"
sidebar:
  nav: "tools"
---

<div id="wordCountApp">
  <div class="tool-notice">
    <h4><i class="fas fa-info-circle"></i>使用说明</h4>
    <p>输入或粘贴文本，实时统计字符数、单词数、行数、段落数、中文字数等详细信息。</p>
  </div>

  <div class="tool-card">
    <div class="input-group">
      <label for="wcInput">输入文本</label>
      <textarea id="wcInput" placeholder="在此输入或粘贴文本..." rows="10"></textarea>
    </div>
    <div class="btn-group">
      <button id="clearBtn" class="btn btn--danger">
        <i class="fas fa-trash-alt"></i> 清空
      </button>
      <button id="exampleBtn" class="btn btn--light">
        <i class="fas fa-lightbulb"></i> 示例
      </button>
    </div>
  </div>

  <div class="stats-panel" id="statsPanel">
    <div class="stat-item">
      <div class="stat-value" id="statChars">0</div>
      <div class="stat-label">总字符</div>
    </div>
    <div class="stat-item">
      <div class="stat-value" id="statCharsNoSpace">0</div>
      <div class="stat-label">字符(无空格)</div>
    </div>
    <div class="stat-item">
      <div class="stat-value" id="statWords">0</div>
      <div class="stat-label">单词</div>
    </div>
    <div class="stat-item">
      <div class="stat-value" id="statChinese">0</div>
      <div class="stat-label">中文</div>
    </div>
    <div class="stat-item">
      <div class="stat-value" id="statLines">0</div>
      <div class="stat-label">行数</div>
    </div>
    <div class="stat-item">
      <div class="stat-value" id="statParagraphs">0</div>
      <div class="stat-label">段落</div>
    </div>
    <div class="stat-item">
      <div class="stat-value" id="statSentences">0</div>
      <div class="stat-label">句子</div>
    </div>
    <div class="stat-item">
      <div class="stat-value" id="statBytes">0</div>
      <div class="stat-label">UTF-8 字节</div>
    </div>
  </div>
</div>

<div class="notification" id="notification">
  <i class="fas fa-check-circle"></i>
  <span></span>
</div>

