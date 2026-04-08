---
layout: single
title: "Hash 计算"
permalink: /tools/hash/
author_profile: false
tool_js: "/assets/js/hash-tool.js"
sidebar:
  nav: "tools"
---

<div id="hashApp">
  <div class="tool-notice">
    <h4><i class="fas fa-info-circle"></i>使用说明</h4>
    <p>计算文本的哈希值，支持 MD5、SHA-1、SHA-256、SHA-512。输入即时计算，无需点击按钮。</p>
  </div>

  <div class="tool-card">
    <div class="input-group">
      <label for="hashInput">输入文本</label>
      <textarea id="hashInput" placeholder="输入需要计算哈希的文本..." rows="6"></textarea>
    </div>
  </div>

  <div class="tool-card" id="resultCard">
    <div class="info-grid" style="grid-template-columns: 1fr;">
      <div class="info-item" style="flex-direction:column;align-items:stretch;gap:8px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span class="info-label">MD5</span>
          <button class="btn btn--outline" style="padding:4px 10px;font-size:0.75rem;" onclick="copyHash('hashMD5')"><i class="far fa-copy"></i></button>
        </div>
        <span class="info-value" id="hashMD5" style="font-family:'SFMono-Regular',Consolas,monospace;font-size:0.8rem;word-break:break-all;">-</span>
      </div>
      <div class="info-item" style="flex-direction:column;align-items:stretch;gap:8px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span class="info-label">SHA-1</span>
          <button class="btn btn--outline" style="padding:4px 10px;font-size:0.75rem;" onclick="copyHash('hashSHA1')"><i class="far fa-copy"></i></button>
        </div>
        <span class="info-value" id="hashSHA1" style="font-family:'SFMono-Regular',Consolas,monospace;font-size:0.8rem;word-break:break-all;">-</span>
      </div>
      <div class="info-item" style="flex-direction:column;align-items:stretch;gap:8px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span class="info-label">SHA-256</span>
          <button class="btn btn--outline" style="padding:4px 10px;font-size:0.75rem;" onclick="copyHash('hashSHA256')"><i class="far fa-copy"></i></button>
        </div>
        <span class="info-value" id="hashSHA256" style="font-family:'SFMono-Regular',Consolas,monospace;font-size:0.8rem;word-break:break-all;">-</span>
      </div>
      <div class="info-item" style="flex-direction:column;align-items:stretch;gap:8px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span class="info-label">SHA-512</span>
          <button class="btn btn--outline" style="padding:4px 10px;font-size:0.75rem;" onclick="copyHash('hashSHA512')"><i class="far fa-copy"></i></button>
        </div>
        <span class="info-value" id="hashSHA512" style="font-family:'SFMono-Regular',Consolas,monospace;font-size:0.8rem;word-break:break-all;">-</span>
      </div>
    </div>
  </div>
</div>

<div class="notification" id="notification">
  <i class="fas fa-check-circle"></i>
  <span></span>
</div>

