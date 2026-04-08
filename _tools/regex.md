---
layout: single-tool
title: "正则表达式测试"
permalink: /tools/regex/
author_profile: false
tool_js: "/assets/js/regex-tool.js"
sidebar:
  nav: "tools"
---

<div id="regexApp">
  <div class="tool-notice">
    <h4><i class="fas fa-info-circle"></i>使用说明</h4>
    <p>输入正则表达式和测试文本，实时查看匹配结果。支持标志位设置和分组捕获高亮。</p>
  </div>

  <div class="tool-card">
    <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:16px;">
      <span style="font-weight:700;font-size:0.9rem;color:#333;">/</span>
      <input type="text" id="regexPattern" placeholder="输入正则表达式..." style="flex:1;min-width:200px;padding:8px 12px;border:1px solid #e8e8e8;border-radius:4px;font-family:'SFMono-Regular',Consolas,monospace;font-size:0.95rem;">
      <span style="font-weight:700;font-size:0.9rem;color:#333;">/</span>
      <input type="text" id="regexFlags" value="g" placeholder="gi" style="width:60px;padding:8px 12px;border:1px solid #e8e8e8;border-radius:4px;font-family:'SFMono-Regular',Consolas,monospace;font-size:0.95rem;">
    </div>

    <div class="options-panel" style="margin-top:0;margin-bottom:16px;">
      <label><input type="checkbox" id="flagG" checked> g (全局)</label>
      <label><input type="checkbox" id="flagI"> i (忽略大小写)</label>
      <label><input type="checkbox" id="flagM"> m (多行)</label>
      <label><input type="checkbox" id="flagS"> s (dotAll)</label>
    </div>

    <div class="btn-group" style="margin-bottom:16px;">
      <button id="templateEmail" class="btn btn--light" style="font-size:0.8rem;">邮箱</button>
      <button id="templatePhone" class="btn btn--light" style="font-size:0.8rem;">手机号</button>
      <button id="templateIP" class="btn btn--light" style="font-size:0.8rem;">IP 地址</button>
      <button id="templateURL" class="btn btn--light" style="font-size:0.8rem;">URL</button>
      <button id="templateChinese" class="btn btn--light" style="font-size:0.8rem;">中文</button>
    </div>
  </div>

  <div class="tool-card">
    <div class="input-group">
      <label for="regexText">测试文本</label>
      <textarea id="regexText" placeholder="输入测试文本..." rows="6"></textarea>
    </div>
  </div>

  <div class="tool-card" id="resultCard">
    <div class="status-bar" id="regexStatus">
      <span class="status-dot"></span>
      <span>等待输入</span>
    </div>
    <h4 style="margin:12px 0 8px;font-size:0.9rem;color:#333;">匹配结果</h4>
    <div class="regex-result" id="regexResult">在上方输入正则表达式和测试文本</div>
    <div id="matchGroups" style="margin-top:12px;"></div>
  </div>
</div>

<div class="notification" id="notification">
  <i class="fas fa-check-circle"></i>
  <span></span>
</div>

