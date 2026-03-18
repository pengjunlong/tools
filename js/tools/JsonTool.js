import {ToolBase} from '../core/ToolBase.js';

// =============================================
// JSON格式化工具实现
// =============================================
export class JsonTool extends ToolBase {
    constructor(container, manager) {
        super(container, manager);
        this.treeData = null;
        this.expandedNodes = new Set();
    }

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
                    <p>此工具可以格式化压缩的JSON数据，使其更易阅读，也可以压缩格式化的JSON数据。支持语法高亮、错误检测和树状展开视图。</p>
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
                    <button id="treeViewBtn" class="btn-secondary" data-bind="treeViewBtn">
                        <i class="fas fa-sitemap"></i> 树状视图
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
                    <label>
                        <input type="checkbox" data-bind="preserveEscape" checked> 保留转义字符
                    </label>
                </div>

                <!-- 视图切换标签 -->
                <div class="view-tabs" data-bind="viewTabs" style="display: none;">
                    <div class="view-tab active" data-view="text" data-bind="textTab">
                        <i class="fas fa-file-alt"></i> 文本视图
                    </div>
                    <div class="view-tab" data-view="tree" data-bind="treeTab">
                        <i class="fas fa-sitemap"></i> 树状视图
                    </div>
                </div>

                <div class="result-container">
                    <!-- 文本视图 -->
                    <div class="text-view" data-bind="textView">
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

                    <!-- 树状视图 -->
                    <div class="tree-view" data-bind="treeView" style="display: none;">
                        <div class="tree-controls">
                            <button class="tree-control-btn" data-bind="expandAllBtn">
                                <i class="fas fa-plus-square"></i> 全部展开
                            </button>
                            <button class="tree-control-btn" data-bind="collapseAllBtn">
                                <i class="fas fa-minus-square"></i> 全部折叠
                            </button>
                            <button class="copy-btn" data-bind="copyTreeBtn">
                                <i class="far fa-copy"></i> 复制JSON
                            </button>
                        </div>
                        <div class="tree-container" data-bind="treeContainer">
                            <div class="tree-placeholder">请先格式化JSON数据</div>
                        </div>
                    </div>
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
        this.treeViewBtn = this.elements.treeViewBtn;
        this.validateBtn = this.elements.validateBtn;
        this.clearBtn = this.elements.clearBtn;
        this.exampleBtn = this.elements.exampleBtn;
        this.copyBtn = this.elements.copyBtn;
        this.indentSize = this.elements.indentSize;
        this.sortKeys = this.elements.sortKeys;
        this.preserveEscape = this.elements.preserveEscape;

        // 状态指示器
        this.inputStatus = this.elements.inputStatus;
        this.inputIndicator = this.elements.inputIndicator;
        this.inputStatusText = this.elements.inputStatusText;
        this.outputStatus = this.elements.outputStatus;
        this.outputIndicator = this.elements.outputIndicator;
        this.outputStatusText = this.elements.outputStatusText;

        // 视图相关
        this.viewTabs = this.elements.viewTabs;
        this.textTab = this.elements.textTab;
        this.treeTab = this.elements.treeTab;
        this.textView = this.elements.textView;
        this.treeView = this.elements.treeView;
        this.treeContainer = this.elements.treeContainer;
        this.expandAllBtn = this.elements.expandAllBtn;
        this.collapseAllBtn = this.elements.collapseAllBtn;
        this.copyTreeBtn = this.elements.copyTreeBtn;

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
        this.treeViewBtn.addEventListener('click', () => this.showTreeView());
        this.validateBtn.addEventListener('click', () => this.validateJson());
        this.clearBtn.addEventListener('click', () => this.clearInput());
        this.exampleBtn.addEventListener('click', () => this.loadExample());
        this.copyBtn.addEventListener('click', () => this.copyResult());
        this.copyTreeBtn.addEventListener('click', () => this.copyTreeResult());

        // 实时验证
        this.input.addEventListener('input', () => this.validateInputRealtime());

        // 选项变化时重新格式化
        this.indentSize.addEventListener('change', () => this.autoReformat());
        this.sortKeys.addEventListener('change', () => this.autoReformat());
        this.preserveEscape.addEventListener('change', () => this.autoReformat());

        // 视图切换
        this.textTab.addEventListener('click', () => this.switchView('text'));
        this.treeTab.addEventListener('click', () => this.switchView('tree'));

        // 树状视图控制
        this.expandAllBtn.addEventListener('click', () => this.expandAll());
        this.collapseAllBtn.addEventListener('click', () => this.collapseAll());
    }

    validateInputRealtime() {
        const value = this.input.value.trim();
        if (!value) {
            this.updateInputStatus('waiting', '等待输入');
            this.formatBtn.disabled = true;
            this.compressBtn.disabled = true;
            this.treeViewBtn.disabled = true;
            this.validateBtn.disabled = true;
            return;
        }

        try {
            JSON.parse(value);
            this.updateInputStatus('valid', 'JSON格式正确');
            this.formatBtn.disabled = false;
            this.compressBtn.disabled = false;
            this.treeViewBtn.disabled = false;
            this.validateBtn.disabled = false;
        } catch (error) {
            this.updateInputStatus('invalid', `JSON格式错误: ${error.message}`);
            this.formatBtn.disabled = false;
            this.compressBtn.disabled = true;
            this.treeViewBtn.disabled = true;
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
            let formatted;

            // 根据是否保留转义字符来处理
            if (this.preserveEscape.checked) {
                formatted = this.stringifyWithEscapes(jsonObj, indentSize);
            } else {
                formatted = JSON.stringify(jsonObj, null, indentSize);
            }
            this.output.value = formatted;
            this.treeData = jsonObj;
            this.updateOutputStatus('success', '格式化成功');
            this.updateJsonInfo(jsonObj, formatted);
            this.showViewTabs();
            this.manager.showNotification('JSON格式化成功');

        } catch (error) {
            this.updateOutputStatus('error', `格式化失败: ${error.message}`);
            this.manager.showNotification(`JSON格式化失败: ${error.message}`, 'error');
            this.hideJsonInfo();
            this.hideViewTabs();
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

            let compressed;

            // 根据是否保留转义字符来处理
            if (this.preserveEscape.checked) {
                compressed = this.stringifyWithEscapes(jsonObj, 0);
            } else {
                compressed = JSON.stringify(jsonObj);
            }
            this.output.value = compressed;
            this.treeData = jsonObj;
            this.updateOutputStatus('success', '压缩成功');
            this.updateJsonInfo(jsonObj, compressed);
            this.showViewTabs();
            this.manager.showNotification('JSON压缩成功');

        } catch (error) {
            this.updateOutputStatus('error', `压缩失败: ${error.message}`);
            this.manager.showNotification(`JSON压缩失败: ${error.message}`, 'error');
            this.hideJsonInfo();
            this.hideViewTabs();
        }
    }

    // 自定义JSON字符串化方法，保留转义字符
    stringifyWithEscapes(obj, indent = 0) {
        const space = indent > 0 ? ' '.repeat(indent) : '';
        const newline = indent > 0 ? '\n' : '';

        return this.stringifyValue(obj, 0, space, newline);
    }

    stringifyValue(value, depth, space, newline) {
        if (value === null) {
            return 'null';
        }

        if (typeof value === 'boolean' || typeof value === 'number') {
            return String(value);
        }

        if (typeof value === 'string') {
            // 保留原始转义字符
            return this.preserveEscape.checked ?
                this.escapeStringWithPreservation(value) :
                JSON.stringify(value);
        }

        if (Array.isArray(value)) {
            return this.stringifyArray(value, depth, space, newline);
        }

        if (typeof value === 'object') {
            return this.stringifyObject(value, depth, space, newline);
        }

        return JSON.stringify(value);
    }

    stringifyArray(arr, depth, space, newline) {
        if (arr.length === 0) {
            return '[]';
        }

        const indent = space ? space.repeat(depth + 1) : '';
        const closeIndent = space ? space.repeat(depth) : '';

        const items = arr.map(item =>
            indent + this.stringifyValue(item, depth + 1, space, newline)
        );

        return `[${newline}${items.join(`,${newline}`)}${newline}${closeIndent}]`;
    }

    stringifyObject(obj, depth, space, newline) {
        const keys = Object.keys(obj);
        if (keys.length === 0) {
            return '{}';
        }

        const indent = space ? space.repeat(depth + 1) : '';
        const closeIndent = space ? space.repeat(depth) : '';

        const items = keys.map(key => {
            const keyStr = this.preserveEscape.checked ?
                this.escapeStringWithPreservation(key) :
                JSON.stringify(key);
            const valueStr = this.stringifyValue(obj[key], depth + 1, space, newline);
            return `${indent}${keyStr}: ${valueStr}`;
        });

        return `{${newline}${items.join(`,${newline}`)}${newline}${closeIndent}}`;
    }

    // 保留转义字符的字符串处理
    escapeStringWithPreservation(str) {
        // 首先进行标准JSON转义
        let escaped = JSON.stringify(str);

        // 如果原字符串中包含已转义的字符，尝试保留它们
        if (str.includes('\\')) {
            // 处理常见的转义序列
            const escapeMap = {
                '\\n': '\\n',   // 换行符
                '\\t': '\\t',   // 制表符
                '\\r': '\\r',   // 回车符
                '\\b': '\\b',   // 退格符
                '\\f': '\\f',   // 换页符
                '\\"': '\\"',   // 双引号
                '\\\\': '\\\\', // 反斜杠
                '\\/': '\\/'    // 斜杠
            };

            // 检查原字符串是否包含这些转义序列
            for (const [escaped_seq, preserve_seq] of Object.entries(escapeMap)) {
                if (str.includes(escaped_seq)) {
                    // 在最终输出中保留这些转义序列
                    escaped = escaped.replace(
                        new RegExp(escaped_seq.replace(/\\/g, '\\\\'), 'g'),
                        preserve_seq
                    );
                }
            }
        }

        return escaped;
    }

    showTreeView() {
        const input = this.input.value.trim();
        if (!this.validateRequired(input, 'JSON数据')) {
            return;
        }

        try {
            let jsonObj = JSON.parse(input);

            if (this.sortKeys.checked) {
                jsonObj = this.sortObjectKeys(jsonObj);
            }

            this.treeData = jsonObj;
            this.showViewTabs();
            this.switchView('tree');
            this.renderTreeView();
            this.updateJsonInfo(jsonObj, JSON.stringify(jsonObj));
            this.manager.showNotification('树状视图生成成功');

        } catch (error) {
            this.manager.showNotification(`生成树状视图失败: ${error.message}`, 'error');
        }
    }

    // 视图切换相关方法
    showViewTabs() {
        this.viewTabs.style.display = 'flex';
    }

    hideViewTabs() {
        this.viewTabs.style.display = 'none';
    }

    switchView(viewType) {
        // 更新标签状态
        this.textTab.classList.toggle('active', viewType === 'text');
        this.treeTab.classList.toggle('active', viewType === 'tree');

        // 切换视图
        this.textView.style.display = viewType === 'text' ? 'block' : 'none';
        this.treeView.style.display = viewType === 'tree' ? 'block' : 'none';

        // 如果切换到树状视图且有数据，渲染树状视图
        if (viewType === 'tree' && this.treeData) {
            this.renderTreeView();
        }
    }

    // 树状视图渲染
    renderTreeView() {
        if (!this.treeData) {
            this.treeContainer.innerHTML = '<div class="tree-placeholder">请先格式化JSON数据</div>';
            return;
        }

        this.treeContainer.innerHTML = this.renderTreeNode(this.treeData, '', true);
        this.bindTreeEvents();
    }

    renderTreeNode(data, path = '', isRoot = false) {
        const nodeId = path || 'root';
        const isExpanded = this.expandedNodes.has(nodeId) || isRoot;

        if (Array.isArray(data)) {
            return this.renderArrayNode(data, path, isExpanded);
        } else if (data !== null && typeof data === 'object') {
            return this.renderObjectNode(data, path, isExpanded);
        } else {
            return this.renderValueNode(data);
        }
    }

    renderObjectNode(obj, path, isExpanded) {
        const nodeId = path || 'root';
        const keys = Object.keys(obj);
        const isEmpty = keys.length === 0;

        let html = `<div class="tree-node object-node">`;

        if (!isEmpty) {
            html += `
                <span class="tree-toggle ${isExpanded ? 'expanded' : ''}" data-node-id="${nodeId}">
                    <i class="fas ${isExpanded ? 'fa-minus-square' : 'fa-plus-square'}"></i>
                </span>
            `;
        }

        html += `
            <span class="tree-bracket">{</span>
            <span class="tree-info">${keys.length} keys</span>
        `;

        if (!isEmpty && isExpanded) {
            html += `<div class="tree-children">`;
            keys.forEach((key, index) => {
                const childPath = path ? `${path}.${key}` : key;
                const isLast = index === keys.length - 1;

                html += `
                    <div class="tree-item">
                        <span class="tree-key">"${this.escapeHtml(key)}"</span>
                        <span class="tree-colon">:</span>
                        ${this.renderTreeNode(obj[key], childPath)}
                        ${!isLast ? '<span class="tree-comma">,</span>' : ''}
                    </div>
                `;
            });
            html += `</div>`;
        }

        html += `<span class="tree-bracket">}</span>`;
        html += `</div>`;

        return html;
    }

    renderArrayNode(arr, path, isExpanded) {
        const nodeId = path || 'root';
        const isEmpty = arr.length === 0;

        let html = `<div class="tree-node array-node">`;

        if (!isEmpty) {
            html += `
                <span class="tree-toggle ${isExpanded ? 'expanded' : ''}" data-node-id="${nodeId}">
                    <i class="fas ${isExpanded ? 'fa-minus-square' : 'fa-plus-square'}"></i>
                </span>
            `;
        }

        html += `
            <span class="tree-bracket">[</span>
            <span class="tree-info">${arr.length} items</span>
        `;

        if (!isEmpty && isExpanded) {
            html += `<div class="tree-children">`;
            arr.forEach((item, index) => {
                const childPath = `${path}[${index}]`;
                const isLast = index === arr.length - 1;

                html += `
                    <div class="tree-item">
                        <span class="tree-index">[${index}]</span>
                        ${this.renderTreeNode(item, childPath)}
                        ${!isLast ? '<span class="tree-comma">,</span>' : ''}
                    </div>
                `;
            });
            html += `</div>`;
        }

        html += `<span class="tree-bracket">]</span>`;
        html += `</div>`;

        return html;
    }

    renderValueNode(value) {
        const type = typeof value;
        let className = `tree-value ${type}-value`;
        let displayValue = value;

        if (value === null) {
            className = 'tree-value null-value';
            displayValue = 'null';
        } else if (type === 'string') {
            // 在树状视图中显示转义字符
            displayValue = this.preserveEscape.checked ?
                this.escapeStringWithPreservation(value) :
                JSON.stringify(value);
        } else if (type === 'boolean') {
            displayValue = value.toString();
        }

        return `<span class="${className}">${this.escapeHtml(displayValue)}</span>`;
    }

    // HTML转义辅助方法
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    bindTreeEvents() {
        const toggles = this.treeContainer.querySelectorAll('.tree-toggle');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleNode(toggle);
            });
        });
    }

    toggleNode(toggleElement) {
        const nodeId = toggleElement.dataset.nodeId;
        const isExpanded = toggleElement.classList.contains('expanded');

        if (isExpanded) {
            this.expandedNodes.delete(nodeId);
        } else {
            this.expandedNodes.add(nodeId);
        }

        this.renderTreeView();
    }

    expandAll() {
        this.collectAllNodeIds(this.treeData, '').forEach(nodeId => {
            this.expandedNodes.add(nodeId);
        });
        this.renderTreeView();
        this.manager.showNotification('已展开所有节点');
    }

    collapseAll() {
        this.expandedNodes.clear();
        this.renderTreeView();
        this.manager.showNotification('已折叠所有节点');
    }

    collectAllNodeIds(data, path = '') {
        const nodeIds = [];

        if (Array.isArray(data)) {
            if (path) nodeIds.push(path);
            data.forEach((item, index) => {
                const childPath = `${path}[${index}]`;
                nodeIds.push(...this.collectAllNodeIds(item, childPath));
            });
        } else if (data !== null && typeof data === 'object') {
            if (path) nodeIds.push(path);
            Object.keys(data).forEach(key => {
                const childPath = path ? `${path}.${key}` : key;
                nodeIds.push(...this.collectAllNodeIds(data[key], childPath));
            });
        }

        return nodeIds;
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
        this.treeData = null;
        this.expandedNodes.clear();
        this.updateInputStatus('waiting', '等待输入');
        this.updateOutputStatus('waiting', '等待处理');
        this.hideJsonInfo();
        this.hideViewTabs();
        this.switchView('text');
        this.formatBtn.disabled = true;
        this.compressBtn.disabled = true;
        this.treeViewBtn.disabled = true;
        this.validateBtn.disabled = true;
        this.manager.showNotification('已清空输入');
    }

    loadExample() {
        this.input.value = `{
  "name": "张三",
  "age": 30,
  "city": "北京",
  "description": "这是一个包含转义字符的示例：\\n换行符\\t制表符\\\"双引号",
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
    "version": "1.2.0",
    "notes": "包含特殊字符：\\\\反斜杠 \\/斜杠"
  }
}`;
        this.validateInputRealtime();
        this.formatJson();
    }

    async copyResult() {
        await this.copyToClipboard(this.output.value);
    }

    async copyTreeResult() {
        if (!this.treeData) {
            this.manager.showNotification('没有数据可复制', 'error');
            return;
        }

        let jsonString;
        if (this.preserveEscape.checked) {
            jsonString = this.stringifyWithEscapes(this.treeData, 2);
        } else {
            jsonString = JSON.stringify(this.treeData, null, 2);
        }
        await this.copyToClipboard(jsonString);
    }
}
