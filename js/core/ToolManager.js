// =============================================
// 核心模块：工具管理器
// =============================================
export class ToolManager {
    constructor() {
        this.tools = new Map();
        this.currentTool = null;
        this.toolContainer = document.getElementById('toolContainer');
        this.toolNav = document.getElementById('toolNav');
        this.notification = document.getElementById('notification');
    }

    // 注册新工具
    registerTool(name, config) {
        this.tools.set(name, config);
        this.updateNavigation();

        // 如果是第一个工具，自动激活
        if (this.tools.size === 1) {
            this.activateTool(name);
        }
    }

    // 更新导航栏
    updateNavigation() {
        this.toolNav.innerHTML = '';

        this.tools.forEach((config, name) => {
            const tab = document.createElement('div');
            tab.className = 'tool-tab';
            tab.dataset.tool = name;
            tab.innerHTML = `<i class="fas ${config.icon}"></i> ${config.title}`;

            tab.addEventListener('click', () => this.activateTool(name));
            this.toolNav.appendChild(tab);
        });
    }

    // 激活工具
    async activateTool(name) {
        // 更新导航状态
        document.querySelectorAll('.tool-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tool === name);
        });

        // 清理当前工具
        if (this.currentTool) {
            this.currentTool.destroy();
        }

        // 显示加载状态
        this.toolContainer.innerHTML = `
            <div class="loading-placeholder">
                <h2 class="tool-title"><i class="fas fa-spinner fa-spin"></i> 加载 ${this.tools.get(name).title}...</h2>
            </div>
        `;

        try {
            // 获取工具配置
            const config = this.tools.get(name);

            // 创建工具实例
            this.currentTool = new config.component(this.toolContainer, this);

            // 初始化工具
            await this.currentTool.init();

        } catch (error) {
            console.error(`激活工具 ${name} 失败:`, error);
            this.toolContainer.innerHTML = `
                <div class="error-message">
                    <h2 class="tool-title"><i class="fas fa-exclamation-triangle"></i> 加载失败</h2>
                    <p>无法加载工具: ${error.message}</p>
                </div>
            `;
        }
    }

    // 显示通知
    showNotification(message, type = 'success') {
        const icon = type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle';
        this.notification.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
        this.notification.className = `notification ${type === 'error' ? 'error' : ''}`;
        this.notification.classList.add('show');

        setTimeout(() => {
            this.notification.classList.remove('show');
        }, 3000);
    }
}