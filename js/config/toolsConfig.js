import {NumbersTool} from '../tools/NumbersTool.js';
import {TimestampTool} from '../tools/TimestampTool.js';
import {JsonTool} from '../tools/JsonTool.js';
import {Base64Tool} from '../tools/PlaceholderTools.js';

// =============================================
// 工具配置
// =============================================
export const toolsConfig = [
    {
        name: 'numbers',
        title: '数字转换',
        icon: 'fa-calculator',
        component: NumbersTool
    },
    {
        name: 'timestamp',
        title: '时间戳转换',
        icon: 'fa-clock',
        component: TimestampTool
    },
    {
        name: 'json',
        title: 'JSON工具',
        icon: 'fa-code',
        component: JsonTool
    },
    {
        name: 'base64',
        title: 'Base64工具',
        icon: 'fa-lock',
        component: Base64Tool
    }
];
