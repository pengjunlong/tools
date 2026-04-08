---
layout: single-tool
title: "文本对比"
permalink: /tools/text-diff/
author_profile: false
tool_js: "/assets/js/text-diff-tool.js"
sidebar:
  nav: "tools"
---

<div id="textDiffApp">
  <div class="tool-notice">
    <h4><i class="fas fa-info-circle"></i>使用说明</h4>
    <p>在左右两侧分别输入文本，点击"对比"按钮查看差异。绿色为新增内容，红色为删除内容。</p>
  </div>

  <div class="diff-container">
    <div>
      <div class="input-group">
        <label for="textLeft">原始文本</label>
        <textarea id="textLeft" placeholder="输入原始文本..." rows="12"></textarea>
      </div>
    </div>
    <div>
      <div class="input-group">
        <label for="textRight">修改后文本</label>
        <textarea id="textRight" placeholder="输入修改后文本..." rows="12"></textarea>
      </div>
    </div>
  </div>

  <div class="btn-group">
    <button id="diffBtn" class="btn btn--primary">
      <i class="fas fa-columns"></i> 对比差异
    </button>
    <button id="swapBtn" class="btn btn--outline">
      <i class="fas fa-exchange-alt"></i> 交换
    </button>
    <button id="clearBtn" class="btn btn--danger">
      <i class="fas fa-trash-alt"></i> 清空
    </button>
    <button id="exampleBtn" class="btn btn--light">
      <i class="fas fa-lightbulb"></i> 示例
    </button>
  </div>

  <div class="diff-output" id="diffOutput" style="display:none;">
    <div class="diff-stats-bar" id="diffStats"></div>
    <div id="diffResult" style="border:1px solid #e8e8e8;border-radius:4px;overflow:auto;max-height:500px;"></div>
    <div style="margin-top:12px;">
      <button class="btn btn--outline" id="copyDiffBtn">
        <i class="far fa-copy"></i> 复制差异结果
      </button>
    </div>
  </div>
</div>

<div class="notification" id="notification">
  <i class="fas fa-check-circle"></i>
  <span></span>
</div>

