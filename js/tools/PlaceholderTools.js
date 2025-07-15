import { ToolBase } from '../core/ToolBase.js';


// =============================================
// Base64工具占位符
// =============================================
export class Base64Tool extends ToolBase {
    async init() {
        this.container.innerHTML = `
            <div class="tool-content active">
                <h2 class="tool-title"><i class="fas fa-lock"></i> Base64编码工具</h2>
                <div class="tool-description">
                    <h3>功能说明</h3>
                    <p>此工具可将文本进行Base64编码或解码。</p>
                </div>
                <div style="text-align: center; padding: 50px 20px; background: var(--light); border-radius: 8px;">
                    <h3><i class="fas fa-tools"></i> 功能开发中</h3>
                    <p>Base64编码功能将在后续版本中发布</p>
                </div>
            </div>
        `;
    }
}