import { ToolBase } from '../core/ToolBase.js';

// =============================================
// JSON格式化工具实现
// =============================================
export class JsonTool extends ToolBase {
    async init() {
        // 渲染UI
        this.container.innerHTML = this.getTemplate();

        // 绑定元素
        this.bindElements();

        // 设置事件监听
        this.setupEventListeners();

        // 加载示例
        this.loadExample();
    }

    getTemplate() {
        return `
            <div class="tool-content active">
                <h2 class="tool-title"><i class="fas fa-code"></i> JSON格式化工具</h2>

                <div class="tool-description">
                    <h3>使用说明</h3>
                    <p>此工具可以格式化压缩的JSON数据，使其更易阅读，也可以压缩格式化的JSON数据。支持语法高亮和错误检测。</p>
                </div>

                <div class="input-group">
                    <label for="jsonInput">输入JSON数据：</label>
                    <textarea id="jsonInput" data-bind="input" placeholder="在此粘贴或输入JSON数据..."></textarea>
                    <div class="json-status" data-bind="inputStatus">
                        <span class="status-indicator" data-bind="inputIndicator">●</span>
                        <span data-bind="inputStatusText">等待输入</span>
                    </div>
                </div>

                <div class="btn-group">
                    <button id="formatBtn" class="btn-secondary" data-bind="formatBtn">
                        <i class="fas fa-indent"></i> 格式化
                    </button>
                    <button id="compressBtn" class="btn-secondary" data-bind="compressBtn">
                        <i class="fas fa-compress-alt"></i> 压缩
                    </button>
                    <button id="validateBtn" data-bind="validateBtn">
                        <i class="fas fa-check-circle"></i> 验证
                    </button>
                    <button id="clearBtn" class="btn-danger" data-bind="clearBtn">
                        <i class="fas fa-trash-alt"></i> 清空
                    </button>
                    <button id="exampleBtn" data-bind="exampleBtn">
                        <i class="fas fa-lightbulb"></i> 加载示例
                    </button>
                </div>

                <div class="json-options">
                    <label>
                        <input type="number" data-bind="indentSize" value="2" min="1" max="8" style="width: 60px;">
                        缩进空格数
                    </label>
                    <label>
                        <input type="checkbox" data-bind="sortKeys"> 排序键名
                    </label>
                </div>

                <div class="result-container">
                    <label for="jsonOutput">格式化结果：</label>
                    <textarea id="jsonOutput" data-bind="output" readonly placeholder="格式化结果将显示在这里..."></textarea>
                    <div class="json-status" data-bind="outputStatus">
                        <span class="status-indicator" data-bind="outputIndicator">●</span>
                        <span data-bind="outputStatusText">等待处理</span>
                    </div>
                    <button class="copy-btn" id="copyBtn" data-bind="copyBtn">
                        <i class="far fa-copy"></i> 复制结果
                    </button>
                </div>

                <div class="json-info" data-bind="jsonInfo" style="display: none;">
                    <h4><i class="fas fa-info-circle"></i> JSON信息</h4>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-label">类型:</span>
                            <span data-bind="jsonType">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">大小:</span>
                            <span data-bind="jsonSize">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">键数量:</span>
                            <span data-bind="jsonKeys">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">深度:</span>
                            <span data-bind="jsonDepth">-</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    bindElements() {
        super.bindElements();
        this.input = this.elements.input;
        this.output = this.elements.output;
        this.formatBtn = this.elements.formatBtn;
        this.compressBtn = this.elements.compressBtn;
        this.validateBtn = this.elements.validateBtn;
        this.clearBtn = this.elements.clearBtn;
        this.exampleBtn = this.elements.exampleBtn;
        this.copyBtn = this.elements.copyBtn;
        this.indentSize = this.elements.indentSize;
        this.sortKeys = this.elements.sortKeys;
        
        // 状态指示器
        this.inputStatus = this.elements.inputStatus;
        this.inputIndicator = this.elements.inputIndicator;
        this.inputStatusText = this.elements.inputStatusText;
        this.outputStatus = this.elements.outputStatus;
        this.outputIndicator = this.elements.outputIndicator;
        this.outputStatusText = this.elements.outputStatusText;
        
        // JSON信息
        this.jsonInfo = this.elements.jsonInfo;
        this.jsonType = this.elements.jsonType;
        this.jsonSize = this.elements.jsonSize;
        this.jsonKeys = this.elements.jsonKeys;
        this.jsonDepth = this.elements.jsonDepth;
    }

    setupEventListeners() {
        this.formatBtn.addEventListener('click', () => this.formatJson());
        this.compressBtn.addEventListener('click', () => this.compressJson());
        this.validateBtn.addEventListener('click', () => this.validateJson());
        this.clearBtn.addEventListener('click', () => this.clearInput());
        this.exampleBtn.addEventListener('click', () => this.loadExample());
        this.copyBtn.addEventListener('click', () => this.copyResult());
        
        // 实时验证
        this.input.addEventListener('input', () => this.validateInputRealtime());
        
        // 选项变化时重新格式化
        this.indentSize.addEventListener('change', () => this.autoReformat());
        this.sortKeys.addEventListener('change', () => this.autoReformat());
    }

    validateInputRealtime() {
        const value = this.input.value.trim();
        
        if (!value) {
            this.updateInputStatus('waiting', '等待输入');
            this.formatBtn.disabled = true;
            this.compressBtn.disabled = true;
            this.validateBtn.disabled = true;
            return;
        }

        try {
            JSON.parse(value);
            this.updateInputStatus('valid', 'JSON格式正确');
            this.formatBtn.disabled = false;
            this.compressBtn.disabled = false;
            this.validateBtn.disabled = false;
        } catch (error) {
            this.updateInputStatus('invalid', `JSON格式错误: ${error.message}`);
            this.formatBtn.disabled = false; // 仍允许尝试格式化
            this.compressBtn.disabled = true;
            this.validateBtn.disabled = false;
        }
    }

    updateInputStatus(type, message) {
        const colors = {
            waiting: '#6c757d',
            valid: '#28a745',
            invalid: '#dc3545'
        };
        
        this.inputIndicator.style.color = colors[type];
        this.inputStatusText.textContent = message;
    }

    updateOutputStatus(type, message) {
        const colors = {
            waiting: '#6c757d',
            success: '#28a745',
            error: '#dc3545'
        };
        
        this.outputIndicator.style.color = colors[type];
        this.outputStatusText.textContent = message;
    }

    formatJson() {
        const input = this.input.value.trim();
        if (!this.validateRequired(input, 'JSON数据')) {
            return;
        }

        try {
            let jsonObj = JSON.parse(input);
            
            // 如果需要排序键名
            if (this.sortKeys.checked) {
                jsonObj = this.sortObjectKeys(jsonObj);
            }
            
            const indentSize = parseInt(this.indentSize.value) || 2;
            const formatted = JSON.stringify(jsonObj, null, indentSize);
            
            this.output.value = formatted;
            this.updateOutputStatus('success', '格式化成功');
            this.updateJsonInfo(jsonObj, formatted);
            this.manager.showNotification('JSON格式化成功');
            
        } catch (error) {
            this.updateOutputStatus('error', `格式化失败: ${error.message}`);
            this.manager.showNotification(`JSON格式化失败: ${error.message}`, 'error');
            this.hideJsonInfo();
        }
    }

    compressJson() {
        const input = this.input.value.trim();
        if (!this.validateRequired(input, 'JSON数据')) {
            return;
        }

        try {
            let jsonObj = JSON.parse(input);
            
            // 如果需要排序键名
            if (this.sortKeys.checked) {
                jsonObj = this.sortObjectKeys(jsonObj);
            }
            
            const compressed = JSON.stringify(jsonObj);
            
            this.output.value = compressed;
            this.updateOutputStatus('success', '压缩成功');
            this.updateJsonInfo(jsonObj, compressed);
            this.manager.showNotification('JSON压缩成功');
            
        } catch (error) {
            this.updateOutputStatus('error', `压缩失败: ${error.message}`);
            this.manager.showNotification(`JSON压缩失败: ${error.message}`, 'error');
            this.hideJsonInfo();
        }
    }

    validateJson() {
        const input = this.input.value.trim();
        if (!this.validateRequired(input, 'JSON数据')) {
            return;
        }

        try {
            const jsonObj = JSON.parse(input);
            this.updateInputStatus('valid', 'JSON格式正确');
            this.updateJsonInfo(jsonObj, input);
            this.manager.showNotification('JSON格式验证通过');
        } catch (error) {
            this.updateInputStatus('invalid', `JSON格式错误: ${error.message}`);
            this.manager.showNotification(`JSON验证失败: ${error.message}`, 'error');
            this.hideJsonInfo();
        }
    }

    autoReformat() {
        if (this.output.value && !this.formatBtn.disabled) {
            this.formatJson();
        }
    }

    sortObjectKeys(obj) {
        if (Array.isArray(obj)) {
            return obj.map(item => this.sortObjectKeys(item));
        } else if (obj !== null && typeof obj === 'object') {
            const sorted = {};
            Object.keys(obj).sort().forEach(key => {
                sorted[key] = this.sortObjectKeys(obj[key]);
            });
            return sorted;
        }
        return obj;
    }

    updateJsonInfo(jsonObj, jsonString) {
        this.jsonType.textContent = this.getJsonType(jsonObj);
        this.jsonSize.textContent = this.formatBytes(new Blob([jsonString]).size);
        this.jsonKeys.textContent = this.countKeys(jsonObj);
        this.jsonDepth.textContent = this.getMaxDepth(jsonObj);
        this.jsonInfo.style.display = 'block';
    }

    hideJsonInfo() {
        this.jsonInfo.style.display = 'none';
    }

    getJsonType(obj) {
        if (Array.isArray(obj)) return '数组';
        if (obj === null) return 'null';
        if (typeof obj === 'object') return '对象';
        if (typeof obj === 'string') return '字符串';
        if (typeof obj === 'number') return '数字';
        if (typeof obj === 'boolean') return '布尔值';
        return typeof obj;
    }

    countKeys(obj, count = 0) {
        if (Array.isArray(obj)) {
            obj.forEach(item => {
                count = this.countKeys(item, count);
            });
        } else if (obj !== null && typeof obj === 'object') {
            count += Object.keys(obj).length;
            Object.values(obj).forEach(value => {
                count = this.countKeys(value, count);
            });
        }
        return count;
    }

    getMaxDepth(obj, depth = 0) {
        if (Array.isArray(obj)) {
            return Math.max(depth, ...obj.map(item => this.getMaxDepth(item, depth + 1)));
        } else if (obj !== null && typeof obj === 'object') {
            return Math.max(depth, ...Object.values(obj).map(value => this.getMaxDepth(value, depth + 1)));
        }
        return depth;
    }

    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    clearInput() {
        this.input.value = '';
        this.output.value = '';
        this.updateInputStatus('waiting', '等待输入');
        this.updateOutputStatus('waiting', '等待处理');
        this.hideJsonInfo();
        this.formatBtn.disabled = true;
        this.compressBtn.disabled = true;
        this.validateBtn.disabled = true;
        this.manager.showNotification('已清空输入');
    }

    loadExample() {
        this.input.value = `{
  "name": "张三",
  "age": 30,
  "city": "北京",
  "hobbies": ["阅读", "游泳", "编程"],
  "address": {
    "street": "中关村大街1号",
    "zipCode": "100080",
    "coordinates": {
      "latitude": 39.9042,
      "longitude": 116.4074
    }
  },
  "isActive": true,
  "balance": 1250.75,
  "friends": [
    {
      "name": "李四",
      "age": 28,
      "relation": "同事"
    },
    {
      "name": "王五",
      "age": 32,
      "relation": "朋友"
    }
  ],
  "metadata": {
    "createdAt": "2023-01-15T10:30:00Z",
    "updatedAt": "2023-12-01T15:45:30Z",
    "version": "1.2.0"
  }
}`;
        this.validateInputRealtime();
        this.formatJson();
    }

    async copyResult() {
        await this.copyToClipboard(this.output.value);
    }
}