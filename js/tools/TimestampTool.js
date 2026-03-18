import { ToolBase } from '../core/ToolBase.js';

// =============================================
// 时间戳转换工具实现
// =============================================
export class TimestampTool extends ToolBase {
    async init() {
        this.container.innerHTML = this.getTemplate();
        this.bindElements();
        this.setupEventListeners();
        this.updateCurrentTimestamp();
    }

    getTemplate() {
        return `
            <div class="tool-content active">
                <h2 class="tool-title"><i class="far fa-clock"></i> 时间戳转换工具</h2>

                <div class="tool-description">
                    <h3>使用说明</h3>
                    <p>将Unix时间戳转换为可读的日期时间格式，或将日期时间转换为Unix时间戳。</p>
                </div>

                <div class="input-group">
                    <label for="timestampInput">Unix时间戳（秒）：</label>
                    <input type="number" id="timestampInput" data-bind="timestampInput" placeholder="输入时间戳...">
                </div>

                <div class="input-group">
                    <label for="dateInput">日期时间：</label>
                    <input type="datetime-local" id="dateInput" data-bind="dateInput">
                </div>

                <div class="btn-group">
                    <button id="toDateBtn" class="btn-secondary" data-bind="toDateBtn">
                        <i class="fas fa-arrow-right"></i> 转换为日期
                    </button>
                    <button id="toTimestampBtn" class="btn-secondary" data-bind="toTimestampBtn">
                        <i class="fas fa-arrow-left"></i> 转换为时间戳
                    </button>
                    <button id="currentTimestampBtn" data-bind="currentTimestampBtn">
                        <i class="fas fa-sync"></i> 当前时间戳
                    </button>
                </div>

                <div class="result-container">
                    <label>当前时间戳：<span id="currentTimestamp" data-bind="currentTimestamp">-</span></label>
                </div>
            </div>
        `;
    }

    bindElements() {
        super.bindElements();
        this.timestampInput = this.elements.timestampInput;
        this.dateInput = this.elements.dateInput;
        this.toDateBtn = this.elements.toDateBtn;
        this.toTimestampBtn = this.elements.toTimestampBtn;
        this.currentTimestampBtn = this.elements.currentTimestampBtn;
        this.currentTimestamp = this.elements.currentTimestamp;
    }

    setupEventListeners() {
        this.toDateBtn.addEventListener('click', () => this.convertToDate());
        this.toTimestampBtn.addEventListener('click', () => this.convertToTimestamp());
        this.currentTimestampBtn.addEventListener('click', () => this.updateCurrentTimestamp());
    }

    convertToDate() {
        const timestamp = parseInt(this.timestampInput.value);
        if (isNaN(timestamp)) {
            this.manager.showNotification('请输入有效的时间戳', 'error');
            return;
        }

        const date = new Date(timestamp * 1000);
        this.dateInput.value = this.formatDateTime(date);
        this.manager.showNotification('转换成功');
    }

    convertToTimestamp() {
        const dateString = this.dateInput.value;
        if (!this.validateRequired(dateString, '日期时间')) {
            return;
        }

        const date = new Date(dateString);
        this.timestampInput.value = Math.floor(date.getTime() / 1000);
        this.manager.showNotification('转换成功');
    }

    updateCurrentTimestamp() {
        const now = Math.floor(Date.now() / 1000);
        this.currentTimestamp.textContent = now;
        this.timestampInput.value = now;
        this.dateInput.value = this.formatDateTime(new Date());
        this.manager.showNotification('已更新为当前时间');
    }

    formatDateTime(date) {
        return date.toISOString().slice(0, 16);
    }
}