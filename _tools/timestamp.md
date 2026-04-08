---
layout: single
title: "时间戳转换工具"
permalink: /tools/timestamp/
author_profile: false
tool_js: "/assets/js/timestamp-tool.js"
sidebar:
  nav: "tools"
---

<div id="timestampApp">
  <div class="tool-notice">
    <h4><i class="fas fa-info-circle"></i>使用说明</h4>
    <p>Unix 时间戳与可读日期时间互转，支持秒级和毫秒级时间戳，提供多种日期格式输出。</p>
  </div>

  <!-- 实时时钟 -->
  <div class="live-clock">
    <div class="clock-row">
      <div class="clock-item">
        <div class="clock-value" id="liveSeconds">-</div>
        <div class="clock-label">秒级时间戳</div>
      </div>
      <div class="clock-item">
        <div class="clock-value" id="liveMillis">-</div>
        <div class="clock-label">毫秒级时间戳</div>
      </div>
      <div class="clock-item">
        <div class="clock-value" id="liveDatetime">-</div>
        <div class="clock-label">当前时间</div>
      </div>
    </div>
  </div>

  <div class="tool-card">
    <div class="input-group">
      <label for="timestampInput">时间戳</label>
      <input type="text" id="timestampInput" placeholder="输入秒级或毫秒级时间戳...">
      <div class="status-bar">
        <span class="status-dot" id="tsDot"></span>
        <span id="tsStatusText">等待输入</span>
      </div>
    </div>

    <div class="options-panel">
      <label>
        <input type="radio" name="tsUnit" value="auto" checked> 自动检测
      </label>
      <label>
        <input type="radio" name="tsUnit" value="seconds"> 秒级 (10位)
      </label>
      <label>
        <input type="radio" name="tsUnit" value="milliseconds"> 毫秒级 (13位)
      </label>
    </div>

    <div class="btn-group">
      <button id="toDateBtn" class="btn btn--primary">
        <i class="fas fa-arrow-right"></i> 时间戳 → 日期
      </button>
      <button id="currentTimestampBtn" class="btn btn--outline">
        <i class="fas fa-sync"></i> 当前时间戳
      </button>
    </div>
  </div>

  <hr class="tool-divider">

  <div class="tool-card">
    <div class="input-group">
      <label for="dateInput">日期时间</label>
      <input type="datetime-local" id="dateInput" step="1">
    </div>

    <div class="btn-group">
      <button id="toTimestampBtn" class="btn btn--primary">
        <i class="fas fa-arrow-left"></i> 日期 → 时间戳
      </button>
    </div>
  </div>

  <!-- 转换结果 -->
  <div class="tool-card" id="resultCard" style="display:none;">
    <h4 style="margin:0 0 12px;font-size:0.95rem;color:#333;"><i class="fas fa-check-circle" style="color:#6c9e3b;margin-right:6px;"></i>转换结果</h4>
    <div class="info-grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));">
      <div class="info-item">
        <span class="info-label">秒级时间戳</span>
        <span class="info-value" id="resultSeconds">-</span>
      </div>
      <div class="info-item">
        <span class="info-label">毫秒级时间戳</span>
        <span class="info-value" id="resultMillis">-</span>
      </div>
      <div class="info-item">
        <span class="info-label">ISO 8601</span>
        <span class="info-value" id="resultISO" style="font-size:0.8rem;">-</span>
      </div>
      <div class="info-item">
        <span class="info-label">本地时间</span>
        <span class="info-value" id="resultLocal">-</span>
      </div>
      <div class="info-item">
        <span class="info-label">UTC 时间</span>
        <span class="info-value" id="resultUTC">-</span>
      </div>
      <div class="info-item">
        <span class="info-label">相对时间</span>
        <span class="info-value" id="resultRelative">-</span>
      </div>
    </div>
    <div style="margin-top:12px;">
      <button class="btn btn--outline" id="copyResultBtn">
        <i class="far fa-copy"></i> 复制全部结果
      </button>
    </div>
  </div>
</div>

<div class="notification" id="notification">
  <i class="fas fa-check-circle"></i>
  <span></span>
</div>

