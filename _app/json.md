---
layout: single
title: "JSON 格式化工具"
author_profile: false
tool_js: "/assets/js/json-tool.js"
sidebar:
  nav: "tools"
---

<div id="jsonApp">
  <div class="tool-notice">
    <h4><i class="fas fa-info-circle"></i>使用说明</h4>
    <p>格式化或压缩 JSON 数据，支持语法验证、树状视图浏览和 JSONPath 路径查询。</p>
  </div>

  <div class="tool-card">
    <div class="input-group">
      <label for="jsonInput">输入 JSON 数据</label>
      <textarea id="jsonInput" placeholder="在此粘贴或输入 JSON 数据..." rows="10"></textarea>
      <div class="status-bar">
        <span class="status-dot" id="inputDot"></span>
        <span id="inputStatusText">等待输入</span>
      </div>
    </div>

    <div class="btn-group">
      <button id="formatBtn" class="btn btn--primary">
        <i class="fas fa-indent"></i> 格式化
      </button>
      <button id="compressBtn" class="btn btn--primary">
        <i class="fas fa-compress-alt"></i> 压缩
      </button>
      <button id="validateBtn" class="btn btn--outline">
        <i class="fas fa-check-circle"></i> 验证
      </button>
      <button id="clearBtn" class="btn btn--danger">
        <i class="fas fa-trash-alt"></i> 清空
      </button>
      <button id="exampleBtn" class="btn btn--light">
        <i class="fas fa-lightbulb"></i> 示例
      </button>
    </div>

    <div class="options-panel">
      <label>
        <input type="number" id="indentSize" value="2" min="1" max="8">
        缩进空格
      </label>
      <label>
        <input type="checkbox" id="sortKeys"> 键名排序
      </label>
      <label>
        <input type="checkbox" id="preserveEscape" checked> 保留转义
      </label>
    </div>
  </div>

  <div class="tool-card" id="resultCard" style="display:none;">
    <!-- 路径查询 -->
    <div class="path-query-input">
      <input type="text" id="pathQuery" placeholder="输入路径查询，如 address.street 或 friends[0].name">
      <span class="query-hint">JSONPath</span>
    </div>

    <!-- 视图切换 -->
    <div class="view-tabs" id="viewTabs">
      <div class="view-tab active" data-view="text" id="textTab">
        <i class="fas fa-file-alt"></i> 文本
      </div>
      <div class="view-tab" data-view="tree" id="treeTab">
        <i class="fas fa-sitemap"></i> 树状
      </div>
    </div>

    <!-- 文本视图 -->
    <div class="result-container" id="textView">
      <textarea id="jsonOutput" readonly placeholder="格式化结果将显示在这里..." rows="12"></textarea>
      <div class="status-bar">
        <span class="status-dot" id="outputDot"></span>
        <span id="outputStatusText">等待处理</span>
      </div>
      <button class="btn btn--outline copy-btn" id="copyBtn">
        <i class="far fa-copy"></i> 复制
      </button>
    </div>

    <!-- 树状视图 -->
    <div id="treeView" style="display:none;">
      <div class="tree-toolbar">
        <button class="btn btn--outline" id="expandAllBtn">
          <i class="fas fa-plus-square"></i> 全部展开
        </button>
        <button class="btn btn--outline" id="collapseAllBtn">
          <i class="fas fa-minus-square"></i> 全部折叠
        </button>
        <button class="btn btn--outline" id="copyTreeBtn">
          <i class="far fa-copy"></i> 复制 JSON
        </button>
      </div>
      <div class="tree-container" id="treeContainer">
        <div class="tree-placeholder">请先格式化 JSON 数据</div>
      </div>
    </div>

    <!-- JSON 信息 -->
    <div class="json-info-panel" id="jsonInfo" style="display:none;">
      <h4><i class="fas fa-chart-bar"></i> JSON 信息</h4>
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">类型</span>
          <span class="info-value" id="jsonType">-</span>
        </div>
        <div class="info-item">
          <span class="info-label">大小</span>
          <span class="info-value" id="jsonSize">-</span>
        </div>
        <div class="info-item">
          <span class="info-label">键数量</span>
          <span class="info-value" id="jsonKeys">-</span>
        </div>
        <div class="info-item">
          <span class="info-label">深度</span>
          <span class="info-value" id="jsonDepth">-</span>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="notification" id="notification">
  <i class="fas fa-check-circle"></i>
  <span></span>
</div>

