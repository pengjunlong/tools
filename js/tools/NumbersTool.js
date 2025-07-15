import { ToolBase } from '../core/ToolBase.js';

// =============================================
// 数字转换工具实现
// =============================================
export class NumbersTool extends ToolBase {
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
                <h2 class="tool-title"><i class="fas fa-calculator"></i> 数字转换工具</h2>

                <div class="tool-description">
                    <h3>使用说明</h3>
                    <p>将多行数字转换为逗号分隔格式。每行输入一个数字，点击"转换"按钮后，所有数字将合并为一行，并用逗号分隔。</p>
                </div>

                <div class="input-group">
                    <label for="numberInput">输入数字（每行一个）：</label>
                    <textarea id="numberInput" data-bind="input" placeholder="在此输入数字，每行一个..."></textarea>
                </div>

                <div class="btn-group">
                    <button id="convertBtn" class="btn-secondary" data-bind="convertBtn">
                        <i class="fas fa-exchange-alt"></i> 转换
                    </button>
                    <button id="clearBtn" class="btn-danger" data-bind="clearBtn">
                        <i class="fas fa-trash-alt"></i> 清空
                    </button>
                    <button id="exampleBtn" data-bind="exampleBtn">
                        <i class="fas fa-lightbulb"></i> 加载示例
                    </button>
                </div>

                <div class="result-container">
                    <label for="numberOutput">转换结果：</label>
                    <textarea id="numberOutput" data-bind="output" readonly placeholder="转换结果将显示在这里..."></textarea>
                    <button class="copy-btn" id="copyBtn" data-bind="copyBtn">
                        <i class="far fa-copy"></i> 复制结果
                    </button>
                </div>
            </div>
        `;
    }

    bindElements() {
        super.bindElements();
        this.input = this.elements.input;
        this.output = this.elements.output;
        this.convertBtn = this.elements.convertBtn;
        this.clearBtn = this.elements.clearBtn;
        this.exampleBtn = this.elements.exampleBtn;
        this.copyBtn = this.elements.copyBtn;
    }

    setupEventListeners() {
        this.convertBtn.addEventListener('click', () => this.convertNumbers());
        this.clearBtn.addEventListener('click', () => this.clearInput());
        this.exampleBtn.addEventListener('click', () => this.loadExample());
        this.copyBtn.addEventListener('click', () => this.copyResult());
        this.input.addEventListener('input', () => this.validateInput());
    }

    validateInput() {
        const value = this.input.value.trim();
        this.convertBtn.disabled = !value;
    }

    convertNumbers() {
        const input = this.input.value.trim();
        if (!this.validateRequired(input, '数字')) {
            return;
        }

        // 分割输入为行，过滤空行，去除每行空格
        const numbers = input.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

        // 检查是否都是有效数字
        const allValid = numbers.every(num => !isNaN(num) && num.trim() !== '');

        if (!allValid) {
            this.manager.showNotification('输入包含非数字内容', 'error');
            return;
        }

        // 用逗号连接所有数字
        this.output.value = numbers.join(', ');
        this.manager.showNotification('转换成功');
    }

    clearInput() {
        this.input.value = '';
        this.output.value = '';
        this.convertBtn.disabled = true;
        this.manager.showNotification('已清空输入');
    }

    loadExample() {
        this.input.value = `1369597
1447935
1046117
1080479
1108924
1263918
1105949
1216145
1235458
1241864
1241865
1241866
1241867
1241889
1241891
1241893
1241895
1241896
1241897
1242500`;
        this.convertNumbers();
    }

    async copyResult() {
        await this.copyToClipboard(this.output.value);
    }
}