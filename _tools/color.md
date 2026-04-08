---
layout: single
title: "颜色转换"
permalink: /tools/color/
author_profile: false
tool_js: "/assets/js/color-tool.js"
sidebar:
  nav: "tools"
---

<div id="colorApp">
  <div class="tool-notice">
    <h4><i class="fas fa-info-circle"></i>使用说明</h4>
    <p>在 HEX、RGB、HSL 颜色格式之间互转。支持颜色选择器和手动输入。</p>
  </div>

  <div class="tool-card">
    <div class="color-preview-box" id="colorPreview" style="background:#6c9e3b;"></div>

    <div style="display:flex;gap:16px;align-items:flex-start;flex-wrap:wrap;">
      <div>
        <label style="font-size:0.85rem;font-weight:600;color:#999;display:block;margin-bottom:4px;">取色器</label>
        <input type="color" id="colorPicker" value="#6c9e3b" style="width:60px;height:40px;border:1px solid #e8e8e8;border-radius:4px;padding:2px;cursor:pointer;">
      </div>
    </div>

    <hr class="tool-divider">

    <div class="input-group">
      <label for="hexInput">HEX</label>
      <div style="display:flex;gap:8px;">
        <input type="text" id="hexInput" value="#6c9e3b" placeholder="#RRGGBB" style="flex:1;padding:10px 12px;border:1px solid #e8e8e8;border-radius:4px;font-size:0.95rem;font-family:'SFMono-Regular',Consolas,monospace;">
        <button class="btn btn--outline" id="copyHex" style="padding:10px 14px;"><i class="far fa-copy"></i></button>
      </div>
    </div>

    <div class="input-group">
      <label for="rgbInput">RGB</label>
      <div style="display:flex;gap:8px;">
        <input type="text" id="rgbInput" placeholder="rgb(108, 158, 59)" style="flex:1;padding:10px 12px;border:1px solid #e8e8e8;border-radius:4px;font-size:0.95rem;font-family:'SFMono-Regular',Consolas,monospace;">
        <button class="btn btn--outline" id="copyRgb" style="padding:10px 14px;"><i class="far fa-copy"></i></button>
      </div>
    </div>

    <div class="input-group">
      <label for="hslInput">HSL</label>
      <div style="display:flex;gap:8px;">
        <input type="text" id="hslInput" placeholder="hsl(100, 45%, 43%)" style="flex:1;padding:10px 12px;border:1px solid #e8e8e8;border-radius:4px;font-size:0.95rem;font-family:'SFMono-Regular',Consolas,monospace;">
        <button class="btn btn--outline" id="copyHsl" style="padding:10px 14px;"><i class="far fa-copy"></i></button>
      </div>
    </div>

    <hr class="tool-divider">
    <h4 style="font-size:0.85rem;color:#999;margin-bottom:8px;">常用颜色</h4>
    <div class="color-swatches" id="colorSwatches"></div>
  </div>
</div>

<div class="notification" id="notification">
  <i class="fas fa-check-circle"></i>
  <span></span>
</div>

