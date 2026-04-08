---
layout: single
title: "数字转换工具"
permalink: /tools/numbers/
author_profile: false
tool_js: "/assets/js/numbers-tool.js"
sidebar:
  nav: "tools"
---

<div id="numbersApp">
  <div class="tool-notice">
    <h4><i class="fas fa-info-circle"></i>使用说明</h4>
    <p>将多行数字在多种格式之间转换。支持逗号、换行、空格、分号等分隔符，提供去重、排序和统计功能。</p>
  </div>

  <div class="tool-card">
    <div class="input-group">
      <label for="numberInput">输入数字（支持多种分隔符）</label>
      <textarea id="numberInput" placeholder="每行一个数字，或用逗号、空格、分号分隔..." rows="8"></textarea>
      <div class="status-bar">
        <span class="status-dot" id="inputDot"></span>
        <span id="inputStatusText">等待输入</span>
      </div>
    </div>

    <div class="options-panel">
      <label>
        输出分隔符：
        <select id="separator" style="padding:4px 8px;border:1px solid #e8e8e8;border-radius:4px;font-size:0.875rem;">
          <option value=",">逗号 (,)</option>
          <option value="\n">换行</option>
          <option value=" ">空格</option>
          <option value=";">分号 (;)</option>
          <option value="|">竖线 (|)</option>
        </select>
      </label>
      <label>
        <input type="checkbox" id="removeDuplicate"> 去重
      </label>
      <label>
        <input type="checkbox" id="sortNumbers"> 排序
      </label>
      <label>
        <select id="sortOrder" style="padding:4px 8px;border:1px solid #e8e8e8;border-radius:4px;font-size:0.875rem;">
          <option value="asc">升序</option>
          <option value="desc">降序</option>
        </select>
      </label>
    </div>

    <div class="btn-group">
      <button id="convertBtn" class="btn btn--primary">
        <i class="fas fa-exchange-alt"></i> 转换
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
      <label for="numberOutput">转换结果</label>
      <textarea id="numberOutput" readonly placeholder="转换结果将显示在这里..." rows="8"></textarea>
      <button class="btn btn--outline copy-btn" id="copyBtn">
        <i class="far fa-copy"></i> 复制
      </button>
    </div>

    <div class="stats-panel" id="statsPanel">
      <div class="stat-item">
        <div class="stat-value" id="statCount">0</div>
        <div class="stat-label">数量</div>
      </div>
      <div class="stat-item">
        <div class="stat-value" id="statSum">0</div>
        <div class="stat-label">求和</div>
      </div>
      <div class="stat-item">
        <div class="stat-value" id="statAvg">0</div>
        <div class="stat-label">平均值</div>
      </div>
      <div class="stat-item">
        <div class="stat-value" id="statMin">0</div>
        <div class="stat-label">最小值</div>
      </div>
      <div class="stat-item">
        <div class="stat-value" id="statMax">0</div>
        <div class="stat-label">最大值</div>
      </div>
    </div>
  </div>
</div>

<div class="notification" id="notification">
  <i class="fas fa-check-circle"></i>
  <span></span>
</div>

