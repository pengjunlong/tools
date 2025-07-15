// =============================================
// 工具基类
// =============================================
export class ToolBase {
    constructor(container, manager) {
        this.container = container;
        this.manager = manager;
        this.elements = {};
    }

    async init() {
        // 由具体工具实现
        throw new Error('init方法必须由子类实现');
    }

    destroy() {
        // 清理工作
        this.container.innerHTML = '';
        this.elements = {};
    }

    // 绑定元素
    bindElements() {
        this.elements = {};
        const elements = this.container.querySelectorAll('[data-bind]');
        elements.forEach(el => {
            this.elements[el.dataset.bind] = el;
        });
    }

    // 通用复制功能
    async copyToClipboard(text) {
        if (!text) {
            this.manager.showNotification('没有内容可复制', 'error');
            return false;
        }

        try {
            await navigator.clipboard.writeText(text);
            this.manager.showNotification('已复制到剪贴板');
            return true;
        } catch (err) {
            console.error('复制失败:', err);
            this.manager.showNotification('复制失败', 'error');
            return false;
        }
    }

    // 通用验证方法
    validateRequired(value, fieldName) {
        if (!value || !value.trim()) {
            this.manager.showNotification(`请输入${fieldName}`, 'error');
            return false;
        }
        return true;
    }
}