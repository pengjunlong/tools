import { ToolManager } from './core/ToolManager.js';
import { toolsConfig } from './config/toolsConfig.js';

// =============================================
// 应用初始化
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    // 创建工具管理器
    const toolManager = new ToolManager();

    // 注册所有工具
    toolsConfig.forEach(config => {
        toolManager.registerTool(config.name, {
            title: config.title,
            icon: config.icon,
            component: config.component
        });
    });

    // 全局错误处理
    window.addEventListener('error', (event) => {
        console.error('全局错误:', event.error);
        toolManager.showNotification('发生未知错误，请刷新页面重试', 'error');
    });

    // 全局未处理的Promise拒绝
    window.addEventListener('unhandledrejection', (event) => {
        console.error('未处理的Promise拒绝:', event.reason);
        toolManager.showNotification('操作失败，请重试', 'error');
        event.preventDefault();
    });
});